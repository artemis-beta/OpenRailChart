import json
import os
import psycopg2
import psycopg2.extras
import re

import sys
sys.path.append(sys.path[0].replace('parsers', 'testing'))

from dummy_nodes import dummy_nodes

from tqdm import tqdm

class JSifyOSMSQL(object):
    def __init__(self, database='osm', username='osm'):
        self._tables = ['planet_osm_line', 'planet_osm_nodes',
                        'planet_osm_point', 'planet_osm_polygon',
                        'planet_osm_rels', 'planet_osm_roads',
                        'planet_osm_ways', 'spatial_ref_sys']

        self._connection = psycopg2.connect('dbname={} user={}'.format(database, username))
        self._cursor = self._connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    def query_node(self, out_name, query_str):
        if query_str[-1] != ';':
            query_str += ';'
        _node_table_query ='''SELECT
    *
FROM
    planet_osm_point AS pop
INNER JOIN
    planet_osm_nodes ON planet_osm_nodes.id = pop.osm_id 
WHERE
    pop.railway {}
'''.format(query_str)
        
        self._cursor.execute(_node_table_query)
        _res = self._cursor.fetchall()
        _out = []

        for row in _res:
            _out.append(dict(row))

        if out_name in dummy_nodes:
            print(out_name)
            _out += dummy_nodes[out_name]

        return self._convertToJS(out_name, _out)

    def _parse_postgis_latlon(self, postgis_str):
        _res = re.findall(r'([\d|\.|\-]+\s[\d|\.|\-]+)+', postgis_str)
        return [list(map(float, reversed(i.split(' ')))) for i in _res]

    def query_way(self, out_name, query_str):
        if query_str[-1] != ';':
            query_str += ';'
        _way_table_query ='''SELECT
        pol.osm_id, ST_AsText(ST_Transform(pol.way,4326))
    FROM
        planet_osm_roads por
    INNER JOIN
        planet_osm_line pol ON pol.osm_id = por.osm_id
    WHERE
        por.railway {}
    '''.format(query_str)

        self._cursor.execute(_way_table_query)
        _res = self._cursor.fetchall()
        _out = []

        for row in tqdm(_res):
            _dict = dict(row)
            _dict['nodes'] = self._parse_postgis_latlon(_dict['st_astext'])
            del _dict['st_astext']
            _out.append(_dict)
        
        return self._convertToJS(out_name, _out)


    def __exit__(self):
        self._cursor.close()
        self._connection.close()
        
    def _convertToJS(self, js_dict_name, dict_list):
        _out_str = 'const {} =  '.format(js_dict_name)
        _out_str += '{\n'

        for entry in dict_list:
            try:
                _out_str += '\t{}'.format(entry['osm_id']) + ' : {\n'
            except KeyError:
                _out_str += '\t{}'.format(entry['id']) + ' : {\n'
            for key in entry:
                _out_str += '"{}" : '.format(key)
                if entry[key] == None:
                    _out_str += 'null'
                elif isinstance(entry[key], int) or isinstance(entry[key],float) or isinstance(entry[key], list):
                    if key in ['lat', 'lon']:
                        entry[key] /= 1E7 # OSM gives lat, lon in x1E7
                    _out_str += str(entry[key])
                else:
                    _out_str += '"{}"'.format(entry[key])
                _out_str += ',\n'
            _out_str += '},\n'
        _out_str += '};\n'

        return _out_str

         


if __name__ in "__main__":
    _loc = '/'.join(__file__.split('/')[:-2])

    with open(os.path.join(_loc, 'db', 'stations.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('stations', "= 'station'"))

    with open(os.path.join(_loc, 'db', 'all.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('all_points', 'IS NOT NULL'))

    with open(os.path.join(_loc, 'db', 'signals.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('signals', " = 'signal'"))

    with open(os.path.join(_loc, 'db', 'buffers.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('buffers', " = 'buffer_stop'"))

    with open(os.path.join(_loc, 'db', 'ped_crossings.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('ped_crossings', " = 'crossing'"))

    with open(os.path.join(_loc, 'db', 'tram_stops.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('tram_stops', " = 'tram_stop'"))

    with open(os.path.join(_loc, 'db', 'halts.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('halt_stops', " = 'halt'"))

    with open(os.path.join(_loc, 'db', 'level_crossings.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('level_crossings', " = 'level_crossing'"))

    with open(os.path.join(_loc, 'db', 'tramways.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('tram_ways', " = 'tram'"))

    with open(os.path.join(_loc, 'db', 'mainlines.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('mainlines', " = 'rail'"))

    with open(os.path.join(_loc, 'db', 'heritage_lines.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('preserved', " = 'preserved'"))

    with open(os.path.join(_loc, 'db', 'miniature_railways.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('miniature_rails', " = 'miniature'"))

    with open(os.path.join(_loc, 'db', 'disused_railways.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('disused_rails', " = 'disused'"))

    with open(os.path.join(_loc, 'db', 'abandoned_railways.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_way('abandoned_rails', " = 'abandoned'"))

    with open(os.path.join(_loc, 'db', 'turntables.js'), 'w') as f:
        f.write(JSifyOSMSQL().query_node('turntables', " = 'turntable'"))
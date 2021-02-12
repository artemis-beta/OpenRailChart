###############################################################################
#                                                                             #
#                      OSM PBF Railway Data Extraction                        #
#                                                                             #
#   Extract railway data from .osm and .osm.pbf files convering it to GeoJSON #
#   to be used by the OpenRailChart.                                          #
#                                                                             #
#   @author  :  K. Zarebski                                                   #
#   @date    :  last modified 2021-02-13                                      #
#   @license :  GPL-v3                                                        #
#                                                                             #
###############################################################################
import subprocess
import os
import click
import shutil
import logging
import wget
import glob
import re
import multiprocessing
import numpy as np
import requests

from urllib.error import URLError

logging.basicConfig()

_dl_logger = logging.getLogger('ORC:Download')
_dl_logger.setLevel(logging.INFO)

_ex_logger = logging.getLogger('ORC:Extraction')
_ex_logger.setLevel(logging.INFO)


@click.command()
@click.argument('input_file')
@click.option('--value', help='Value for key=<value> tag', default=None, type=str)
@click.option('--verbose/--normal', help='run in verbose mode', default=False)
@click.option('--key', help='Key for <key>=value tag', default='railway', type=str)
@click.option('--overwrite/--keep', help='overwrite existing files', default=False)
def ex_cmd(**kwargs):
    extract_railway_data(**kwargs)

def extract_railway_data(input_file: str, key: str = None, value: str = None, verbose: bool = False, overwrite: bool = False) -> None:
    """Extract railway data from OSM.PBF file

    Parameters
    ----------
    input_file : str
        input file of type '.osm.pbf'
    value : str, optional
        value for key 'railway' in osm, by default None (all values)
    key : str, optional
        provide alternative key in search
    verbose : bool, optional
        run extraction in verbose mode
    overwrite : bool, optional
        overwrite existing files

    Raises
    ------
    FileNotFoundError
        if input file does not exist
    AssertionError:
        if 'osmium' command not found
    """
    if verbose:
        _ex_logger.setLevel(logging.DEBUG)
    if not shutil.which('osmium'):
        raise AssertionError(
            f"Could not find command 'osmium', is it "
            "'osmium-tool' installed?"
        )

    if not os.path.exists(input_file):
        raise FileNotFoundError(
            f"Extraction failed. Input file '{input_file}' does not exist."
        )

    _full_path = os.path.abspath(input_file)
    _label = os.path.join(
        os.path.dirname(_full_path),
        os.path.basename(_full_path).replace('-', '_').split('.', 1)[0]
    )

    _key_val = key.replace(':', '_')

    _rly_file = f'{_label}_{_key_val}.osm.pbf'

    _value = f'={value}' if value else ''

    _cmd = [
        'osmium',
        'tags-filter',
        '--overwrite',
        '-o',
        _rly_file,
        _full_path,
        f'nw/{key}{_value}'
    ]

    if not os.path.exists(_rly_file) or overwrite:
        _ex_logger.info(
            f"Extracting Railway data from '{input_file}'"
        )

        _ex_logger.debug(f' {" ".join(_cmd)}')

        subprocess.check_call(
            _cmd,
            shell=False
        )
    else:
        _ex_logger.warning(
            f"File '{_rly_file}' already exists, to overwrite "
            "run with '--overwrite'"
        )

    _tag_val = 'all' if not value else value.lower()
    _geo_file = f'{_label}_{_key_val}_{_tag_val}.geojson'

    _overwrite = '' if not overwrite else '--overwrite'

    _cmd = [
        'osmium',
        'export',
        _rly_file,
        '-o',
        _geo_file
    ]

    if overwrite:
        _cmd.append(overwrite)

    if not os.path.exists(_geo_file) or overwrite:
        _ex_logger.info(
            f"Writing results to GeoJSON file: '{_geo_file}'"
        )
        _ex_logger.debug(f' {" ".join(_cmd)}')

        subprocess.check_call(
            _cmd,
            shell=False
        )
    else:
        _ex_logger.warning(
            f"File '{_geo_file}' already exists, to overwrite "
            "run with '--overwrite'"
        )


@click.command()
@click.argument('search_string')
@click.option('--outdir', help='output location', type=str, default=os.getcwd())
def dl_cmd(**kwargs):
    fetch_geofabrik_data(**kwargs)

def fetch_geofabrik_data(search_string: str, outdir: str) -> None:
    """Download data from GeoFabrik website

    Parameters
    ----------
    search_string : str
        url address location for particular area to download recognised by GF,
        for example the GB would be 'europe/great-britain'
    outdir : str
        location to download data to

    Raises
    ------
    URLError
        if the created URL using the search string is not recognised
    """
    

    _root_url = 'http://download.geofabrik.de/'

    try:
        _url = os.path.join(_root_url, f'{search_string}-latest.osm.pbf')
        _out = os.path.join(outdir, os.path.basename(_url))

        _dl_logger.info(
            f"Attempting to download '{_url} -> {_out}',"
            " this may take some time..."
        )
        wget.download(_url, _out)
    except URLError:
        raise URLError(
            f"Failed to retrieve data, invalid constructed URL '{_url}'"
        )
    
    return _out

def _process_single_set(gf_region_group: str, candidate: str, output_dir: str, key: str, value: str, verbose: bool):
    print(f"Processing: {os.path.join(gf_region_group, candidate)}")
    _dl_file = fetch_geofabrik_data(
        os.path.join(gf_region_group, candidate), 
        output_dir
    )

    try:
        extract_railway_data(_dl_file, key, value, verbose)
    except FileNotFoundError as e:
        os.remove(_dl_file)
        raise e

    _spare_files = glob.glob(os.path.join(output_dir, f'*{candidate.replace("-", "_")}*.osm.pbf'))
    _spare_files += glob.glob(os.path.join(output_dir, f'*{candidate}*.osm.pbf'))

    for s in _spare_files:
        if os.path.exists(s):
            os.remove(s)

@click.command()
@click.argument('gf_region_group')
@click.option('--output-dir', help='output directory', default=os.getcwd(), type=str)
@click.option('--value', help='Value for railway=<value> tag', default=None, type=str)
@click.option('--key', help='main search key', default='railway', type=str)
@click.option('--processes', help='concurrency, process N files at a time', default=1, type=int)
@click.option('--verbose/--normal', help='run in verbose mode', default=False)
def update_all_for_group(gf_region_group: str, output_dir: str,
                         key: str = 'railway', value: str = None,
                         processes: int = 1, verbose: bool = False) -> None:
    """Build GeoJSON files for all regions in a GeoFabrik grouping

    Parameters
    ----------
    gf_region_group : str
        recognised GeoFabrik address containing OSM.PBF files, e.g.
        'europe/great-britain/england'
    output_dir : str
        output directory for files
    value : str, optional
        value for key 'railway' in osm, by default None (all values)
    key : str, optional
        provide a different key to search for, default is 'railway'
    processes : int, optional
        asynchronicity, process above one dataset at a time
    verbose : bool, optional
        run in verbose mode
    """

    try:
        _root_url = 'http://download.geofabrik.de/'
        _url = os.path.join(_root_url, gf_region_group)
        _data = requests.get(_url)
        if 'response [404]' in str(_data).lower():
            raise URLError('Error 404 Returned')
        _candidates = set(re.findall(
            r'([a-z\-]+)\-latest\.osm\.pbf',
            _data.text,
            re.IGNORECASE
        ))
    except (URLError, requests.exceptions.ConnectionError):
        _url = os.path.join(_root_url, f'{gf_region_group}-latest.osm.pbf')
        _data = requests.head(_url)
        if 'response [404]' in str(_data).lower():
            raise URLError(
                f"Failed to retrieve data, invalid constructed URL '{_url}'"
            )
        gf_region_group, _candidate = gf_region_group.rsplit("/", 1)
        _candidates = [_candidate]


    logging.getLogger('ORC:Download').setLevel(logging.ERROR)
    logging.getLogger('ORC:Extraction').setLevel(logging.ERROR)

    if processes == 1:
        for candidate in _candidates:
            _process_single_set(
                gf_region_group,
                candidate,
                output_dir,
                key,
                value,
                verbose
            )
    else:
        _candidates = list(_candidates)
        _groups = np.array_split(_candidates, processes)

        def _run_set(list_set):
            for item in list_set:
                _process_single_set(
                    gf_region_group,
                    item,
                    output_dir,
                    key,
                    value,
                    verbose
                )

        for group in _groups:
            p = multiprocessing.Process(target=_run_set, args=(group,))
            p.start()


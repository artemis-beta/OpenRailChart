###############################################################################
#                                                                             #
#                      OSM PBF Railway Data Extraction                        #
#                                                                             #
#   Extract railway data from .osm and .osm.pbf files convering it to GeoJSON #
#   to be used by the OpenRailChart.                                          #
#                                                                             #
#   @author  :  K. Zarebski                                                   #
#   @date    :  last modified 2021-02-10                                      #
#   @license :  GPL-v3                                                        #
#                                                                             #
###############################################################################
import subprocess
import json
import shutil
import os
import logging
import click
import wget

from urllib.error import URLError

logging.basicConfig()

from typing import Dict, List
from collections.abc import MutableMapping

OSM_LAYERS = [
    'lines',
    'points',
    'multilinestrings',
    'multipolygons',
    'other_relations'
]

class DataExtractor(MutableMapping):
    def __init__(self) -> None:
        """
        Extract data from OSM /OSM PBF files to a GeoJSON file, also store the
        contents locally as a dictionary
        """
        self._logger = logging.getLogger(self.__class__.__name__)
        self._logger.setLevel(logging.INFO)
        self._dataset: Dict = {}
        self._source_files: List[str] = []

    def __delitem__(self, key):
        del self._dataset[key]

    def __getitem__(self, key):
        return self._dataset[key]

    def __len__(self):
        return len(self._dataset)

    def __iter__(self):
        return iter(self._dataset)

    def __setitem__(self, key, value):
        self._dataset[key] = value

    def _convert_to_osm(self, filename: str, out_filename: str) -> None:
        """Convert PBF OSM file to OSM file

        Parameters
        ----------
        filename : str
            address of '.osm.pbf' file
        out_filename : str
            output file name

        Returns
        -------
        str
            address of output '.osm' file

        Raises
        ------
        AssertionError
            if the file type does not match expectation
        """
        filename = os.path.abspath(filename)
        _, _suffix = filename.split('.', 1)

        if not _suffix == 'osm.pbf':
            raise AssertionError(
                f"Expected input file of type '.osm.pbf', "
                f"but got type '{_suffix}'"
            )

        if not os.path.exists(out_filename):
            self._logger.info(
                f"Converting: '{filename}' -> '{out_filename}'" 
            )

            subprocess.check_call(
                ['osmconvert', filename, f'-o={out_filename}'],
                shell=False
            )

    def _filter_railway_data(self, osm_filename: str, out_filename: str, object: str='') -> None:
        """Filter out railway data from OSM data file

        Parameters
        ----------
        osm_filename : str
            data file of type '.osm'
        out_filename : str
            output file name
        object : str, optional
            value for the 'railway' key to narrow extraction data

        Returns
        -------
        str
            address of new output file containing only railway data
        """
        filename = os.path.abspath(osm_filename)

        if not os.path.exists(out_filename):
            self._logger.info(
                f"Extract Railway Data: '{osm_filename}' -> '{out_filename}'"
            )

            subprocess.check_call(
                [
                    'osmfilter',
                    filename,
                    f'--keep="railway={object}"',
                    f'-o={out_filename}'
                ],
                shell=False
            )

    def _get_layer_from_file(self, osm_railway_file: str, out_filename: str, layer: str) -> None:
        """Extract layer from railway data and save as GeoJSON

        Parameters
        ----------
        osm_railway_file : str
            file of type '.osm' containing railway tag data
        out_filename : str
            output file name
        layer : str
            name of layer to extract

        Returns
        -------
        str
            name of output GeoJSON file containing layer info
        """
        filename = os.path.abspath(osm_railway_file)    

        if not os.path.exists(out_filename):
            self._logger.info(
                f"Writing Layer Data: '{osm_railway_file}' -> '{out_filename}'"
            )

            subprocess.check_call(
                [
                    'ogr2ogr',
                    '-skipfailures',
                    '-f',
                    'GeoJSON',
                    out_filename,
                    filename,
                    layer
                ]
            )


    def extract_layer_from_file(self, osm_data: str, layer: str, object: str = '') -> None:
        """Extract data layer from an OSM or OSM PBF file to a JSON dict
        and store in this instance also

        Parameters
        ----------
        osm_data : str
            '.osm' or '.osm.pbf' datafile to extract data from
        layer : str
            name of layer to extract
        object : str, optional
            key value to filter to i.e. railway=`object`

        """
        if not os.path.exists(osm_data):
            raise FileNotFoundError(
                f"Could not load GeoJSON from file '{osm_data}', "
                "file not found."
            )

        layer = layer.lower()

        if layer not in OSM_LAYERS:
            raise AssertionError(
                f"Unrecognised layer '{layer}' specified, "
                f"recognised layers are: {', '.join(OSM_LAYERS)}"
            )
        
        for command in ['osmconvert', 'osmfilter']:
            if not shutil.which(command):
                raise AssertionError(
                    f"Command '{command}' was not found,"
                    " is osmctools installed?"
                )
        
        if not shutil.which('ogr2ogr'):
            raise AssertionError(
                f"Command 'ogr2ogr' was not found,"
                " is 'gdal-bin' or 'python3-gdal' installed?"
            )


        _file_label, _ = osm_data.split('.', 1)

        _osm_file = f'{_file_label}.osm'

        _rly_file = f'{_file_label}_railways.osm'

        _geo_json_file = f'{_file_label}_railway_{layer.lower()}.geojson'


        # Only run the stages that are required
        if not os.path.exists(_osm_file):
            self._convert_to_osm(osm_data, _osm_file)

        if not os.path.exists(_rly_file):
            self._filter_railway_data(_osm_file, _rly_file, object)

        if not os.path.exists(_geo_json_file):
            self._get_layer_from_file(_rly_file, _geo_json_file, layer)

        for source in [_osm_file, _rly_file]:
            if source not in self._source_files:
                self._source_files.append(source)

        with open(_geo_json_file) as f:
            self._dataset[layer] = json.load(f)
        
        self._logger.info(
            f"Extraction for layer '{layer}' completed succesfully."
        )

    def clear_cache(self, exception: List[str] = []):
        """Delete all source files

        Parameters
        ----------
        exception : List[str], optional
            files to keep, by default []
        """
        for source in self._source_files:
            if exception and source in exception:
                continue
            os.remove(source)
        self._source_files = []

@click.command()
@click.argument('input_file')
@click.option('--layers', help='comma separated layers list', type=str)
@click.option('--value', help='railway key value to extract, by default *', default='', type=str)
def convert_all_data_from_file(input_file: str = None, 
                               layers: str = None, value: str = '') -> None:

    if not input_file:
        raise ValueError("No input file specified.")

    if layers:
        layers = [i.strip() for i in layers.lower().split(',')]
    else:
        layers = OSM_LAYERS

    _extractor = DataExtractor()

    for layer in layers:
        _extractor.extract_layer_from_file(input_file, layer, value)

    _extractor.clear_cache(input_file)


@click.command()
@click.argument('search_string')
@click.option('--outdir', help='output location', type=str, default=os.getcwd())
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

        print(
            f"Attempting to download '{_url} -> {_out}',"
            " this may take some time..."
        )
        wget.download(_url, _out)
    except URLError:
        raise URLError(
            f"ERROR: Failed to retrieve data, invalid constructed URL '{_url}'"
        )


if __name__ in "__main__":
    convert_all_data_from_file()


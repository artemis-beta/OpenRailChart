###############################################################################
#                                                                             #
#                      OSM PBF Railway Data Extraction                        #
#                                                                             #
#   Extract railway data from .osm and .osm.pbf files convering it to GeoJSON #
#   to be used by the OpenRailChart.                                          #
#                                                                             #
#   @author  :  K. Zarebski                                                   #
#   @date    :  last modified 2021-02-11                                      #
#   @license :  GPL-v3                                                        #
#                                                                             #
###############################################################################
import subprocess
import os
import click
import shutil
import logging
import wget

from urllib.error import URLError

logging.basicConfig()


@click.command()
@click.argument('input_file')
@click.option('--value', help='Value for railway=<value> tag', default=None, type=str)
@click.option('--verbose/--normal', help='run in verbose mode', default=False)
@click.option('--overwrite/--keep', help='overwrite existing files', default=False)
def extract_railway_data(input_file: str, value: str = None, verbose: bool = False, overwrite: bool = False) -> None:
    """Extract railway data from OSM.PBF file

    Parameters
    ----------
    input_file : str
        input file of type '.osm.pbf'
    value : str, optional
        value for key 'railway' in osm, by default None (all values)
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
    _logger = logging.getLogger('ORC:Extraction')
    _logger.setLevel(logging.INFO if not verbose else logging.DEBUG)
    if not shutil.which('osmium'):
        raise AssertionError(
            f"Could not find command 'osmium', is it "
            "'osmium-tool' installed?"
        )

    _full_path = os.path.abspath(input_file)
    _label, _ = _full_path.split('.', 1)
    _label = _label.replace('-', '_')

    _rly_file = f'{_label}_railways.os.pbf'

    _value = f'={value}' if value else ''

    _cmd = [
        'osmium',
        'tags-filter',
        '--overwrite',
        '-R',
        '-o',
        _rly_file,
        _full_path,
        f'nw/railway{_value}'
    ]

    if not os.path.exists(_rly_file) or overwrite:
        _logger.info(
            f"Extracting Railway data from '{input_file}'"
        )

        _logger.debug(f' {" ".join(_cmd)}')

        subprocess.check_call(
            _cmd,
            shell=False
        )
    else:
        _logger.warning(
            f"File '{_rly_file}' already exists, to overwrite "
            "run with '--overwrite'"
        )

    _tag_val = 'all' if not value else value.lower()
    _geo_file = f'{_label}_{_tag_val}.geojson'

    _overwrite = '' if not overwrite else '--overwrite'

    _cmd = [
        'osmium',
        'export',
        _rly_file,
        '-o',
        _geo_file,
        _overwrite
    ]

    if not os.path.exists(_geo_file) or overwrite:
        _logger.info(
            f"Writing results to GeoJSON file: '{_geo_file}'"
        )
        _logger.debug(f' {" ".join(_cmd)}')

        subprocess.check_call(
            _cmd,
            shell=False
        )
    else:
        _logger.warning(
            f"File '{_geo_file}' already exists, to overwrite "
            "run with '--overwrite'"
        )


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
    _logger = logging.getLogger('ORC:Download')
    _logger.setLevel(logging.INFO)

    _root_url = 'http://download.geofabrik.de/'

    try:
        _url = os.path.join(_root_url, f'{search_string}-latest.osm.pbf')
        _out = os.path.join(outdir, os.path.basename(_url))

        _logger.info(
            f"Attempting to download '{_url} -> {_out}',"
            " this may take some time..."
        )
        wget.download(_url, _out)
    except URLError:
        raise URLError(
            f"ERROR: Failed to retrieve data, invalid constructed URL '{_url}'"
        )

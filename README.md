# OpenRailChart Project
|National Rail: Birmingham|Welsh Highland Railway: Beddgelert|
|---|---|
|![Midland Preview](docs/screenshots/westmidlands.png)|![Midland Preview](docs/screenshots/beddgelert.png)|
|Demo of UK Mainline Signals|Demo of WHR style signals|
|![Birmingham Junctions](docs/screenshots/birmingham_feathers.png)| |
|Concept for feather indicators as additions to main signals</br>The components are added separately depending on</br>the values under `railway:signal:route:states`.| |

Experimental project to superimpose railway information on OpenStreetMap. I wanted to create a base from which I could build a UK icon scheme possibly for OpenRailwayMap.
The project makes use of Leaflet Javascript and uses tiles from the OSM server. A local database is built for nodes using `osm2pgsql` and then parsed using a python script to
extract the information needed to build the layers.

## Objectives

* Demo various signal types in situ.

* Provide enough previews to be able to present project to ORM/OSM rail community and hopefully get these into the UK map.

* Determine a good and complete tagging scheme for UK railway signals, development of such a tagging scheme can be found [here](https://github.com/artemis-beta/ukosmrailtags/).

## Icons Directory

A directory of all current icons within this repository is given [here](docs/ORM_Icons.md).

## Data Store
Data is assembled and built by the contained Python module scripts, the data creation is automated via GitHub Actions then being deployed onto the `railgeodata` branch.

## Running

Website is deployed direct to GitHub pages [here](artemis-beta.github.io/OpenRailChart/). For developing locally you can use the Live Server pluging for VSCode however to emulate the subfolder "OpenRailChart" in the file paths you will need to make a soft symlink:
```bash
mkdir -p /path/to/repo/OpenRailChart
ln -s /path/to/repo/javascript /path/to/repo/OpenRailChart/javascript
```
make sure to exclude the new `OpenRailChart` folder from your git commits.

## Issues

I was unaware until later of the `-l` flag for `osm2pgsql` for latitude/longitude coordinates. As such the parser script assumes this has not been set when extracting Geofabrik data to the PostgreSQL database and converts the coordinates manually.

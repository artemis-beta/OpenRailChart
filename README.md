![Midland Preview](screenshots/westmidlands.png)

# OpenRailChart Project

Experimental project to superimpose railway information on OpenStreetMap. I wanted to create a base from which I could build a UK icon scheme possibly for OpenRailwayMap.
The project makes use of Leaflet Javascript and uses tiles from the OSM server. A local database is built for nodes using `osm2pgsql` and then parsed using a python script to
extract the information needed to build the layers.

## Running

Currently I use the `Live Server` plugin for VSCode to preview the project.

## Issues

I was unaware until later of the `-l` flag to `osm2pgsql` the parser script assumes this has not been set and converts manually.

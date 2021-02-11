# Install Instructions

- `brew install postgresql`

- `brew install postgis`

- `brew install osm2pgsql`

- Download data from [https://download.geofabrik.de/](GeoFabrik)

- ```
  psql postgres

  postgres=# CREATE USER osm;
  postgres=# CREATE DATABASE osm;
  postgres=# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO osm;
  postgres=# \q

  psql osm

  postgres=# CREATE EXTENSION hstore;
  
  ```
  
- `osm2pgsql --create --database osm --username osm --prefix planet_osm --slim --cache 2048 <data-file>`

- Can add additional files:
  `osm2pgsql --append --database osm --username osm --prefix planet_osm --slim --cache 2048 <data-file>`

- May need to switch to older version of OpenSSL in Brew
  `brew switch openssl 1.0.2s`

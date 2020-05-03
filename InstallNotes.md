# Install Instructions

- `brew install postresql`

- `brew install postgis`

- `brew install osm2pgsql`

- ```
  psql postgres

  postgres=# CREATE USER osm;
  postgres=# CREATE DATABASE osm;
  postgres=# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO osm;
  postgres=# \q

  psql osm

  postgres=# CREATE EXTENSION hstore;

- Installed Node.Js v12.16.3 from nodejs.org/en/download
 `npm install pg`

- Installed Browserify
  `npm install -g browserify`

- May need to switch to older version of OpenSSL in Brew
  `brew switch openssl 1.0.2s`

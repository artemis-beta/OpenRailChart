map = L.map( 'map', {
    // Centre view at lat=50, lon=-1, zoom=2, defZoom=2
    center: [53.48073, -1.88505],
    minZoom: 7,
    zoom: 7
});

const signal_appear_layer = 12;
const station_appear_layer = 9;

osm_signal_layers = [];
osm_lc_layers = [];
osm_station_layers = [];
osm_tram_stop_layers = [];
osm_turntable_layers = [];
osm_buffer_stop_layers = [];
osm_rail_layers = [];
osm_miniature_layers = [];
osm_preserved_layers = [];
osm_narrow_gauge_layers = [];
osm_tram_layers = [];

// For appending GeoJSON data to the global layers object
function append_lc_json_data(data)
{
    osm_lc_layers.push(L.geoJSON(data ,{
        onEachFeature: function(_, featureLayer) {
        featureLayer.bindPopup('Level Crossing');
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: lc_uk_icon
            });
        }
    }));
}

function append_crossing_json_data(data)
{
    osm_lc_layers.push(L.geoJSON(data ,{
        onEachFeature: function(_, featureLayer) {
        featureLayer.bindPopup('Foot Crossing');
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_ped_crossing
            });
        }
    }));
}

function append_turntable_json_data(data)
{
    osm_turntable_layers.push(L.geoJSON(data ,{
        onEachFeature: function(_, featureLayer) {
        featureLayer.bindPopup('Turntable');
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_turntable
            });
        }
    }));
}

function append_buffer_stop_json_data(data)
{
    osm_buffer_stop_layers.push(L.geoJSON(data ,{
        onEachFeature: function(_, featureLayer) {
        featureLayer.bindPopup('Buffer Stop');
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_buffer
            });
        }
    }));
}

function append_signal_json_data(data)
{
    signal_geojson = L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(signal_summary_string(feature, {minWidth: 100}));
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: check_if_signal_style_uk(feature, uk_mainline_signals)
            });
        }
    });

    osm_signal_layers.push(signal_geojson);
}

function append_station_json_data(data)
{
    osm_station_layers.push(L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(station_summary_string(feature, {minWidth: 100}));
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_station
            });
        }
    }));
}

function append_halt_json_data(data)
{
    osm_station_layers.push(L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(station_summary_string(feature, {minWidth: 100}));
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_halt
            });
        }
    }));
}

function append_tram_stop_json_data(data)
{
    osm_tram_stop_layers.push(L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(station_summary_string(feature, {minWidth: 100}));
        },
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: icon_tram_stop
            });
        }
    }));

}

function append_railway_json_data(data)
{
    var myGeoJsonGroup = L.geoJson(data, {style: {color: "#000000"}});
        myGeoJsonGroup.eachLayer(function (layer) {
        geo = layer.feature.geometry;
        coords = geo.coordinates;

        if (geo.type === "LineString") {
          myGeoJsonGroup.removeLayer(layer);
          myGeoJsonGroup.addData({
            type: "Feature",
            properties: layer.feature.properties,
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          })
        } else {
          myGeoJsonGroup.removeLayer(layer);
        }
    });
    osm_rail_layers.push(myGeoJsonGroup);
}

function append_miniature_json_data(data)
{
    var myGeoJsonGroup = L.geoJson(data, {style: {color: "#4CA54C"}});
        myGeoJsonGroup.eachLayer(function (layer) {
        geo = layer.feature.geometry;
        coords = geo.coordinates;

        if (geo.type === "LineString") {
          myGeoJsonGroup.removeLayer(layer);
          myGeoJsonGroup.addData({
            type: "Feature",
            properties: layer.feature.properties,
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          })
        } else {
          myGeoJsonGroup.removeLayer(layer);
        }
    });
    osm_miniature_layers.push(myGeoJsonGroup);
}

function append_narrow_gauge_json_data(data)
{
    var myGeoJsonGroup = L.geoJson(data, {style: {color: "#b28ade"}});
        myGeoJsonGroup.eachLayer(function (layer) {
        geo = layer.feature.geometry;
        coords = geo.coordinates;

        if (geo.type === "LineString") {
          myGeoJsonGroup.removeLayer(layer);
          myGeoJsonGroup.addData({
            type: "Feature",
            properties: layer.feature.properties,
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          })
        } else {
          myGeoJsonGroup.removeLayer(layer);
        }
    });
    osm_narrow_gauge_layers.push(myGeoJsonGroup);
}

function append_preserved_json_data(data)
{
    var myGeoJsonGroup = L.geoJson(data, {style: {color: "#73481D"}});
        myGeoJsonGroup.eachLayer(function (layer) {
        geo = layer.feature.geometry;
        coords = geo.coordinates;

        if (geo.type === "LineString") {
          myGeoJsonGroup.removeLayer(layer);
          myGeoJsonGroup.addData({
            type: "Feature",
            properties: layer.feature.properties,
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          })
        } else {
          myGeoJsonGroup.removeLayer(layer);
        }
    });
    osm_preserved_layers.push(myGeoJsonGroup);
}

function append_tram_json_data(data)
{
    var myGeoJsonGroup = L.geoJson(data, {style: {color: "#0000E5"}});
        myGeoJsonGroup.eachLayer(function (layer) {
        geo = layer.feature.geometry;
        coords = geo.coordinates;

        if (geo.type === "LineString") {
          myGeoJsonGroup.removeLayer(layer);
          myGeoJsonGroup.addData({
            type: "Feature",
            properties: layer.feature.properties,
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          })
        } else {
          myGeoJsonGroup.removeLayer(layer);
        }
    });
    osm_tram_layers.push(myGeoJsonGroup);
}


function filterAndAddMarker(marker) {
    if(!map.hasLayer(marker)) {
        if (marker._latlng) {
            if (map.getBounds().contains(marker._latlng)) map.addLayer(marker);
        }
        else {
            if (map.getBounds().contains(marker.getBounds())) map.addLayer(marker);
        }
    }
}

function removeMarker(marker) {
    if(map.hasLayer(marker)) {
        map.removeLayer(marker);
    }

}

function addLine(line) {
    var latLngs = line._latlngs;
    for(var i = 0; i < latLngs.length; i++) {
        if (map.getBounds().contains(latLngs[i])) {
          map.addLayer(line);
          break;
        }
    }
}

function removeLine(line) {
    if(map.hasLayer(line)) {
        map.removeLayer(line);
    }
}

function filterMarkers() {
    if(map.getZoom() > station_appear_layer)
    {
        Object.values(osm_station_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_tram_stop_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_station_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_tram_stop_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_rail_layers).forEach(layer => Object.values(layer._layers).forEach(addLine));
        Object.values(osm_miniature_layers).forEach(layer => Object.values(layer._layers).forEach(addLine));
        Object.values(osm_preserved_layers).forEach(layer => Object.values(layer._layers).forEach(addLine));
        Object.values(osm_tram_layers).forEach(layer => Object.values(layer._layers).forEach(addLine));
    }
    else
    {
        Object.values(osm_station_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_tram_stop_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_rail_layers).forEach(layer => Object.values(layer._layers).forEach(removeLine));
        Object.values(osm_miniature_layers).forEach(layer => Object.values(layer._layers).forEach(removeLine));
        Object.values(osm_preserved_layers).forEach(layer => Object.values(layer._layers).forEach(removeLine));
        Object.values(osm_tram_layers).forEach(layer => Object.values(layer._layers).forEach(removeLine));
    }
    if(map.getZoom() > signal_appear_layer)
    {
        Object.values(osm_signal_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_buffer_stop_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_lc_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_turntable_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_signal_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_buffer_stop_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_lc_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_turntable_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
    }
    else
    {
        Object.values(osm_signal_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_buffer_stop_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_lc_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_turntable_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
    }
}



map.on('zoomend', filterMarkers);
map.on('moveend', filterMarkers);


L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a>',
    subdomains: ['a','b','c']
}).addTo( map );

map = L.map( 'map', {
    // Centre view at lat=50, lon=-1, zoom=2, defZoom=2
    center: [53.48073, -1.88505],
    minZoom: 7,
    zoom: 7
});

var signal_appear_layer = 12;

osm_signal_layers = [];
osm_lc_layers = [];

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

function append_signal_json_data(data)
{
    osm_signal_layers.push(L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(signal_summary_string(feature));
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: check_if_signal_style_uk(feature, uk_mainline_signals)
            });
        }
    }));
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

function filterMarkers() {
    if(map.getZoom() > signal_appear_layer)
    {
        Object.values(osm_signal_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
        Object.values(osm_lc_layers).forEach(layer => Object.values(layer._layers).forEach(filterAndAddMarker));
    }
    else
    {
        Object.values(osm_signal_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
        Object.values(osm_lc_layers).forEach(layer => Object.values(layer._layers).forEach(removeMarker));
    }
}

map.on('zoomend', filterMarkers);
map.on('moveend', filterMarkers);
    

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a>',
    subdomains: ['a','b','c']
}).addTo( map );

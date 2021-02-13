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
        pointToLayer: function (_, latlng) {
            return L.marker(latlng, {
                icon: uk_mainline_signals.UK_Main_3AT
            });
        }
    }));
}

map.on('zoom', function(){
    if(map.getZoom() > signal_appear_layer)
    {
        for(layer in osm_signal_layers)
        {
            if(!map.hasLayer(osm_signal_layers[layer]))
            {
                osm_signal_layers[layer].addTo(map);
            }
        }
        for(layer in osm_lc_layers)
        {
            if(!map.hasLayer(osm_lc_layers[layer]))
            {
                osm_lc_layers[layer].addTo(map);
            }
        }
    }
    else
    {
        for(layer in osm_signal_layers)
        {
            map.removeLayer(osm_signal_layers[layer]);
        }
        for(layer in osm_lc_layers)
        {
            map.removeLayer(osm_lc_layers[layer]);
        }
    }
}

);
    

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a>',
    subdomains: ['a','b','c']
}).addTo( map );



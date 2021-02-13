map = L.map( 'map', {
    // Centre view at lat=50, lon=-1, zoom=2, defZoom=2
    center: [53.48073, -1.88505],
    minZoom: 7,
    zoom: 7
});

var signal_appear_layer = 10;

osm_layers = [];

// For appending GeoJSON data to the global layers object
function append_json_data(data)
{
    osm_layers.push(L.geoJSON(data ,{
        onEachFeature: function(feature, featureLayer) {
        featureLayer.bindPopup(feature.properties['ref']);
        }
        }));
    if(map.getZoom() > signal_appear_layer)
    {
        osm_layers[osm_layers.length-1].addTo(map);
    }
}

map.on('zoom', function(){
    if(map.getZoom() > signal_appear_layer)
    {
        for(layer in osm_layers)
        {
            osm_layers[layer].addTo(map);
        }
    }
    else
    {
        for(layer in osm_layers)
        {
            map.removeLayer(osm_layers[layer]);
        }
    }
}

);
    

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a>',
    subdomains: ['a','b','c']
}).addTo( map );

//map.addLayer(railroute_layer);
//map.addLayer(tramway_lines_layer);

var detailed_map_layers = [signals_layer]//, buffers_layer, crossings_layer, tramway_stops_layer, stations_layer, turntable_layer];

/*
var station_button = L.easyButton(station_button_icon, function(btn, map)
{
    if(map.getZoom() > 12)
    {
        map.hasLayer(railroute_layer) ? map.removeLayer(railroute_layer) : map.addLayer(railroute_layer);
    }
})
station_button.button.style.padding = '0px';
station_button.addTo(map);
*/


for(var i = 0; i < detailed_map_layers.length; ++i) map.removeLayer(detailed_map_layers[i]);

function plotStations()
{
    if(map.getZoom() < 13)
    {
        for(var i = 0; i < detailed_map_layers.length; ++i) map.removeLayer(detailed_map_layers[i]);
    }
    else
    {
        for(var i = 0; i < detailed_map_layers.length; ++i) map.addLayer(detailed_map_layers[i]);
    }
};

var bounds = map.getBounds();

let lat1 = bounds.getNorth();
let lat2 = bounds.getSouth();
let lon1 = bounds.getWest();
let lon2 = bounds.getEast();


function refresh()
{

    plotStations();

    var bounds = map.getBounds();

};

map.on('moveend', refresh);

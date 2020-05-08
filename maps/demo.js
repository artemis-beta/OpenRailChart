var map = L.map( 'map', {
    // Centre view at lat=50, lon=-1, zoom=2, defZoom=2
    center: [53.00825, -4.10648],
    minZoom: 8,
    zoom: 15
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

map.addLayer(railroute_layer);
map.addLayer(tramway_lines_layer);

var detailed_map_layers = [signals_layer, buffers_layer, crossings_layer, tramway_stops_layer, stations_layer, turntable_layer];

var station_button = L.easyButton(station_button_icon, function(btn, map)
{
    if(map.getZoom() > 12)
    {
        map.hasLayer(railroute_layer) ? map.removeLayer(railroute_layer) : map.addLayer(railroute_layer);
    }
})
station_button.button.style.padding = '0px';
station_button.addTo(map);


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



/*
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature).addTo(map);

var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

var myLayer = L.geoJSON(myLines).addTo(map);
*/
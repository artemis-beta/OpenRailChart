var tramway_lines = [];
var tramway_stops = [];

for(var tram_stop in tram_stops)
{
  tramway_stops.push(L.marker( [tram_stops[tram_stop].lat, tram_stops[tram_stop].lon], {icon: icon_tram_stop}));
  var popup = L.popup().setContent(tram_stops[tram_stop].name);
        tramway_stops[tramway_stops.length-1].bindPopup(popup);
}

for(var tramline in tram_ways)
{
    tramway_lines.push(L.polyline([tram_ways[tramline]['nodes']], {color : 'blue'}));
}

var tramway_stops_layer = L.layerGroup(tramway_stops);

var tramway_lines_layer = L.layerGroup(tramway_lines);
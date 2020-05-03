var tramway_components = [];

for(var tram_stop in tram_stops)
{
  tramway_components.push(L.marker( [tram_stops[tram_stop].lat, tram_stops[tram_stop].lon], {icon: icon_tram_stop}));
}

for(var tramline in tram_ways)
{
    tramway_components.push(L.polyline([tram_ways[tramline]['nodes']], {color : 'blue'}));
}

var tramways_layer = L.layerGroup(tramway_components);
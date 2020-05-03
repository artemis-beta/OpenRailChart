var mainline_markers = [];

for(var station in stations)
{
  mainline_markers.push(L.marker( [stations[station].lat, stations[station].lon], {icon: icon_station}));
}

for(var railway in mainlines)
{
  mainline_markers.push(L.polyline([mainlines[railway]['nodes']], {color : 'black'}));
}

var mainline_layer = L.layerGroup(mainline_markers);
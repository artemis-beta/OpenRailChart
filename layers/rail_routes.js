var railroute_markers = [];
var station_markers = [];

for(var station in stations)
{
  station_markers.push(L.marker( [stations[station].lat, stations[station].lon], {icon: icon_station}));
  var popup = L.popup().setContent(stations[station].name);
        station_markers[station_markers.length-1].bindPopup(popup);
}

for(var railway in mainlines)
{
  railroute_markers.push(L.polyline([mainlines[railway]['nodes']], {color : 'black'}));
}

for(var railway in preserved)
{
  railroute_markers.push(L.polyline([preserved[railway]['nodes']], {color : 'brown'}));
}

for(var railway in narrow_gauge)
{
  railroute_markers.push(L.polyline([narrow_gauge[railway]['nodes']], {color : 'orange'}));
}

for(var railway in miniature_rails)
{
  railroute_markers.push(L.polyline([miniature_rails[railway]['nodes']], {color : 'green'}));
}

for(var railway in disused_rails)
{
  railroute_markers.push(L.polyline([disused_rails[railway]['nodes']], {color : 'grey'}));
}

for(var railway in abandoned_rails)
{
  railroute_markers.push(L.polyline([abandoned_rails[railway]['nodes']], {color : 'grey', dashArray : 4}));
}

var railroute_layer = L.layerGroup(railroute_markers);

var stations_layer = L.layerGroup(station_markers);

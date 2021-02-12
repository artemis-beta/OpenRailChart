var turntable_markers = [];

for(var ttb in turntables)
{
  turntable_markers.push(L.marker( [turntables[ttb].lat, turntables[ttb].lon], {icon: icon_turntable}));
}

var turntable_layer = L.layerGroup(turntable_markers);
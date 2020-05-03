var crossing_markers = [];

for(var ped_crossing in ped_crossings)
{
  crossing_markers.push(L.marker( [ped_crossings[ped_crossing].lat, ped_crossings[ped_crossing].lon], {icon: icon_ped_crossing}));
}

for(var lev_crossing in level_crossings)
{

  crossing_markers.push(L.marker( [level_crossings[lev_crossing].lat, level_crossings[lev_crossing].lon], {icon: lc_uk_icon}));
}

var crossings_layer = L.layerGroup(crossing_markers);
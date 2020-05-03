var buffer_markers = [];

for(var buffer in buffers)
{
  buffer_markers.push(L.marker( [buffers[buffer].lat, buffers[buffer].lon], {icon: icon_buffer}));
}

var buffers_layer = L.layerGroup(buffer_markers);
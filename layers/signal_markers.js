var signal_markers = []

for(var signal in signals)
{
    signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Main_3AT"]}));
}

var signals_layer = L.layerGroup(signal_markers);
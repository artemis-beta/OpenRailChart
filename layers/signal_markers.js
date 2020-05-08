var signal_markers = []

for(var signal in signals)
{

    if (signals[signal]["railway:signal:whistle_board"] != null)
    {
        if(signals[signal]["railway:signal:whistle_board"] == "sound_whistle")
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whistle_boards["UK_SW"]}));
        }

        else if(signals[signal]["railway:signal:whistle_board"] == "whistle")
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whistle_boards["UK_WHISTLE"]}));
        }

        else
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whistle_boards["UK_Main"]}));
        }
    }

    else if(signals[signal]["railway:signal:main:form"] == "semaphore" && signals[signal]["railway:signal:main:type"] == "lower_quadrant")
    {
        signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Main_LQ"]}));
    }

    else if(signals[signal]["railway:signal:distant:form"] == "semaphore" && signals[signal]["railway:signal:distant:type"] == "lower_quadrant")
    {
        signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Distant_LQ"]}));
    }

    else if(signals[signal]["railway:signal:shunting"] == "GB-NR:shunting:disc")
    {
        signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Shunting_Disc"]}));
    }

    else if(signals[signal]["railway:signal:main"] == null)
    {
        signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Main_3AT"]}));
        var popup = L.popup().setContent(signals[signal].ref);
        signal_markers[signal_markers.length-1].bindPopup(popup);
    }
}

var signals_layer = L.layerGroup(signal_markers);
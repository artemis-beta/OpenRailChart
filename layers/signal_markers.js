var signal_markers = []

for(var signal in signals)
{
    if("railway:signal:route:states" in signals[signal] && signals[signal]["railway:signal:route:states"] != null)
    {
        var states = signals[signal]["railway:signal:route:states"].split(";");

        console.log(states);
        if(states.includes("position_1"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_1"]}));
        }
        if(states.includes("position_2"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_2"]}));
        }
        if(states.includes("position_3"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_3"]}));
        }
        if(states.includes("position_4"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_4"]}));
        }
        if(states.includes("position_5"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_5"]}));
        }
        if(states.includes("position_6"))
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_mainline_signals["UK_Feather_6"]}));
        }
    }
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

    else if (signals[signal]["railway:signal:main"] == "GB-WHR:main")
    {
        if(signals[signal]["railway:signal:main:form"] == "light")
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whr_signals["UK_WHR_HomeBoardLit"]}));
        }
        else
        {
            signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whr_signals["UK_WHR_HomeBoard"]}));
        }
    }

    else if (signals[signal]["railway:signal:distant"] == "GB-WHR:distant")
    {

        signal_markers.push(L.marker( [signals[signal].lat, signals[signal].lon], {icon: uk_whr_signals["UK_WHR_DistantBoard"]}));
  
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
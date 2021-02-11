var signal_markers = []

var signals_geo = L.geoJson(signals), geo, coords, first, last;
signals_geo.eachLayer(function (layer) {
  var coords = [];
  coords = layer.feature.geometry.coordinates;
  console.log(coords);
  var properties = layer.feature.properties;

    if(properties['railway:signal:route:states'] != null)
    {
        var states = properties['railway:signal:route:states'].split(";");

        console.log(states);
        if(states.includes("position_1"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_1"]}));
        }
        if(states.includes("position_2"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_2"]}));
        }
        if(states.includes("position_3"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_3"]}));
        }
        if(states.includes("position_4"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_4"]}));
        }
        if(states.includes("position_5"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_5"]}));
        }
        if(states.includes("position_6"))
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Feather_6"]}));
        }
    }
    if (properties['railway:signal:whistle_board'] != null)
    {
        if(properties['railway:signal:whistle_board'] == "sound_whistle")
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whistle_boards["UK_SW"]}));
        }

        else if(properties['railway:signal:whistle_board'] == "whistle")
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whistle_boards["UK_WHISTLE"]}));
        }

        else
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whistle_boards["UK_Main"]}));
        }
    }

    else if (properties['railway:signal:main'] == "GB-WHR_main")
    {
        if(properties['railway:signal:main:form'] == "light")
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whr_signals["UK_WHR_HomeBoardLit"]}));
        }
        else
        {
            signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whr_signals["UK_WHR_HomeBoard"]}));
        }
    }

    else if (properties['railway:signal:distant'] == "GB-WHR_distant")
    {

        signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_whr_signals["UK_WHR_DistantBoard"]}));

    }

    else if(properties['railway:signal:main:form'] == "semaphore" && properties['railway:signal:main:type'] == "lower_quadrant")
    {
        signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Main_LQ"]}));
    }

    else if(properties['railway:signal:distant:form'] == "semaphore" && properties['railway:signal:distant:type'] == "lower_quadrant")
    {
        signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Distant_LQ"]}));
    }

    else if(properties['railway:signal:distant:shunting'] == "GB-NR_shunting_disc")
    {
        signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Shunting_Disc"]}));
    }

    else if(properties['railway:signal:main'] != null)
    {
        signal_markers.push(L.marker(L.latLng(coords[1], coords[0]), {icon: uk_mainline_signals["UK_Main_3AT"]}));
        var popup = L.popup().setContent(properties['railway:signal:ref']);
        signal_markers[signal_markers.length-1].bindPopup(popup);
    }
});

var signals_layer = L.layerGroup(signal_markers);

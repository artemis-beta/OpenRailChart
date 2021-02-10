var signal_markers = []

var signals_geo = L.geoJson(signals), geo, coords, first, last;
signals_geo.eachLayer(function (layer) {
  geo = layer.feature.geometry;
  coordinates = geo.coordinates[0];
  var coords = [];
  coords.push(coordinates);

    if(layer.feature.properties.railway_signal_route_states != null)
    {
        var states = layer.feature.properties.railway_signal_route_states.split(";");

        console.log(states);
        if(states.includes("position_1"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_1"]}));
        }
        if(states.includes("position_2"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_2"]}));
        }
        if(states.includes("position_3"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_3"]}));
        }
        if(states.includes("position_4"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_4"]}));
        }
        if(states.includes("position_5"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_5"]}));
        }
        if(states.includes("position_6"))
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Feather_6"]}));
        }
    }
    if (layer.feature.properties.railway_signal_whistle_board != null)
    {
        if(layer.feature.properties.railway_signal_whistle_board == "sound_whistle")
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whistle_boards["UK_SW"]}));
        }

        else if(layer.feature.properties.railway_signal_whistle_board == "whistle")
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whistle_boards["UK_WHISTLE"]}));
        }

        else
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whistle_boards["UK_Main"]}));
        }
    }

    else if (layer.feature.properties.railway_signal_main == "GB-WHR_main")
    {
        if(layer.feature.properties.railway_signal_main_form == "light")
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whr_signals["UK_WHR_HomeBoardLit"]}));
        }
        else
        {
            signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whr_signals["UK_WHR_HomeBoard"]}));
        }
    }

    else if (layer.feature.properties.railway_signal_distant == "GB-WHR_distant")
    {

        signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_whr_signals["UK_WHR_DistantBoard"]}));

    }

    else if(layer.feature.properties.railway_signal_main_form == "semaphore" && layer.feature.properties.railway_signal_main_type == "lower_quadrant")
    {
        signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Main_LQ"]}));
    }

    else if(layer.feature.properties.railway_signal_distant_form == "semaphore" && layer.feature.properties.railway_signal_distant_type == "lower_quadrant")
    {
        signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Distant_LQ"]}));
    }

    else if(layer.feature.properties.railway_signal_shunting == "GB-NR_shunting_disc")
    {
        signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Shunting_Disc"]}));
    }

    else if(layer.feature.properties.railway_signal_main == null)
    {
        signal_markers.push(L.marker( coords[0], coords[1], {icon: uk_mainline_signals["UK_Main_3AT"]}));
        var popup = L.popup().setContent(signals[signal].ref);
        signal_markers[signal_markers.length-1].bindPopup(popup);
    }
});

var signals_layer = L.layerGroup(signal_markers);

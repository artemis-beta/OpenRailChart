import copy

_template = {
"osm_id" : 999999999,
"access" : None,
"addr:housename" : None,
"addr:housenumber" : None,
"addr:interpolation" : None,
"admin_level" : None,
"aerialway" : None,
"aeroway" : None,
"amenity" : None,
"area" : None,
"barrier" : None,
"bicycle" : None,
"brand" : None,
"bridge" : None,
"boundary" : None,
"building" : None,
"capital" : None,
"construction" : None,
"covered" : None,
"culvert" : None,
"cutting" : None,
"denomination" : None,
"disused" : None,
"ele" : None,
"embankment" : None,
"foot" : None,
"generator:source" : None,
"harbour" : None,
"highway" : None,
"historic" : None,
"horse" : None,
"intermittent" : None,
"junction" : None,
"landuse" : None,
"layer" : None,
"leisure" : None,
"lock" : None,
"man_made" : None,
"military" : None,
"motorcar" : None,
"name" : None,
"natural" : None,
"office" : None,
"oneway" : None,
"operator" : None,
"place" : None,
"population" : None,
"power" : None,
"power_source" : None,
"public_transport" : None,
"railway" : None,
"ref" : None,
"religion" : None,
"route" : None,
"service" : None,
"shop" : None,
"sport" : None,
"surface" : None,
"toll" : None,
"tourism" : None,
"tower:type" : None,
"tunnel" : None,
"water" : None,
"waterway" : None,
"wetland" : None,
"width" : None,
"wood" : None,
"z_order" : None,
"way" : "XXXXXXXXXXXXXXX",
"railway:signal:main" : None,
"railway:signal:direction" : None,
"railway:signal:position" : None,
"railway:signal:main:form" : None,
"railway:signal:main:substitute_signal" : None,
"railway:signal:main:function" : None,
"railway:signal:main:states" : None,
"railway:signal:main:design" : None,
"railway:signal:route" : None,
"railway:signal:route:design" : None,
"railway:signal:route:states" : None,
"railway:signal:route:form" : None,
"railway:signal:shunting" : None,
"railway:signal:shunting:form" : None,
"railway:signal:departure" : None,
"railway:signal:departure:form" : None,
"railway:signal:departure:states" : None,
"railway:signal:distant" : None,
"railway:signal:distant:form" : None,
"railway:signal:distant:function" : None,
"railway:signal:neutral_section" : None,
"railway:signal:whistle_board" : None,
"railway:signal:spad_indicator" : None,
"railway:signal:crossing" : None,
"railway:signal:crossing:form" : None,
"id" : 9999999999,
"lat" : 52.4556837,
"lon" : -2.142011,
}

dummy_nodes = {'signals' : [copy.deepcopy(_template) for i in range(20)]}

dummy_nodes['signals'][0].update({'railway:signal:whistle_board' : 'sound_whistle', 'lat' : 52.44409*1E7, 'lon' : -2.37055*1E7, 'osm_id' : 999999999991, 'id' : 999999999991})
dummy_nodes['signals'][1].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:main:type' : 'lower_quadrant', 'lat' : 52.44418*1E7, 'lon' : 1E7*-2.37058, 'osm_id' : 999999999992, 'id' : 999999999992})
dummy_nodes['signals'][2].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:main:type' : 'lower_quadrant', 'lat' : 52.44541*1E7, 'lon' : -2.37039*1E7, 'osm_id' : 999999999993, 'id' : 999999999993})
dummy_nodes['signals'][4].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:main:type' : 'lower_quadrant', 'lat' : 52.44387*1E7, 'lon' : 1E7*-2.37052, 'osm_id' : 999999999994, 'id' : 999999999994})
dummy_nodes['signals'][3].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:shunting' : 'GB-NR:shunting:disc', 'lat' : 52.44380*1E7, 'lon' : -2.37049*1E7, 'osm_id' : 999999999995, 'id' : 999999999995})
dummy_nodes['signals'][5].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:shunting' : 'GB-NR:shunting:disc', 'lat' : 52.44416*1E7, 'lon' : -2.37064*1E7, 'osm_id' : 999999999996, 'id' : 999999999996})
dummy_nodes['signals'][6].update({'railway:signal:whistle_board' : 'whistle', 'lat' : 52.44583*1E7, 'lon' : -2.37012*1E7, 'osm_id' : 999999999997, 'id' : 999999999997})
dummy_nodes['signals'][7].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:main:type' : 'lower_quadrant', 'lat' : 52.44611*1E7, 'lon' : -2.36990*1E7, 'osm_id' : 999999999998, 'id' : 999999999998})
dummy_nodes['signals'][8].update({'railway:signal:main:form' : 'semaphore', 'railway:signal:shunting' : 'GB-NR:shunting:disc', 'lat' : 52.44579*1E7, 'lon' : -2.37020*1E7, 'osm_id' : 999999999999, 'id' : 999999999999})
dummy_nodes['signals'][9].update({'railway:signal:main:form' : 'sign', 'railway:signal:main' : 'GB-WHR:main', 'lat' : 53.01248*1E7, 'lon' : -4.10922*1E7, 'osm_id' : 199999999999, 'id' : 199999999999})
dummy_nodes['signals'][10].update({'railway:signal:main:form' : 'sign', 'railway:signal:main' : 'GB-WHR:main', 'lat' : 53.01147*1E7, 'lon' : -4.10759*1E7, 'osm_id' : 299999999999, 'id' : 299999999999})
dummy_nodes['signals'][11].update({'railway:signal:main:form' : 'sign', 'railway:signal:main' : 'GB-WHR:main', 'lat' : 53.01244*1E7, 'lon' : -4.10927*1E7, 'osm_id' : 399999999999, 'id' : 399999999999})
dummy_nodes['signals'][12].update({'railway:signal:main:form' : 'sign', 'railway:signal:main' : 'GB-WHR:main', 'lat' : 53.01150*1E7, 'lon' : -4.10746*1E7, 'osm_id' : 499999999999, 'id' : 499999999999})
dummy_nodes['signals'][13].update({'railway:signal:main:form' : 'sign', 'railway:signal:distant' : 'GB-WHR:distant', 'lat' : 53.00825*1E7, 'lon' :-4.10648*1E7, 'osm_id' : 599999999999, 'id' : 599999999999})
dummy_nodes['signals'][14].update({'railway:signal:main:form' : 'light', 'railway:signal:main' : 'GB-WHR:main', 'lat' : 53.01312*1E7, 'lon' : -4.11093*1E7, 'osm_id' : 699999999999, 'id' : 699999999999})
dummy_nodes['signals'][15].update({'railway:signal:main:form' : 'sign', 'railway:signal:distant' : 'GB-WHR:distant', 'lat' : 53.01293*1E7, 'lon' : -4.11244*1E7, 'osm_id' : 799999999999, 'id' : 799999999999})




function signal_summary_string(signal_object)
{
    type_str = '';

    if('railway:signal:form' in signal_object.properties)
    {
        if('railway:signal:distant' in signal_object.properties)
        {
            type_str = 'Distant';
        }
        else
        {
            type_str = 'Main';
        }
    }

    if('railway:signal:main:states' in signal_object.properties)
    {
        states = signal_object.properties['railway:signal:main:states'];

        const has_dyel = states.includes('double_yellow');
        const has_yel = states.includes('yellow');
        const has_red = states.includes('red');
        const has_green = states.includes('green');

        if(has_dyel)
        {
            type_str = 'Main 4AT';
        }

        if(has_yel && has_red && has_green)
        {
            type_str = 'Main 3AT';
        }

        if(has_yel && has_green)
        {
            type_str = 'Distant 2AT';
        }

        if(has_red && has_green)
        {
            type_str = 'Main 2AT';
        }

    }

    out_str = '<center><b>Signal</b></center>'
    out_str += '<table style="width:200">'

    if(type_str !== '')
    {
        out_str += "<tr><td><b>Type</b></td><td>"+type_str+"</td></tr>";
    }

    if('ref' in signal_object.properties)
    {
        out_str += "<tr><td><b>ID</b></td><td>"+signal_object.properties.ref+"</td></tr>";
    }

    out_str += "</table>";

    return out_str;
}
function signal_summary_string(signal_object)
{
    out_str = '<center><b>Signal</b></center>'
    out_str += '<table style="width:100">'
    if('railway:signal:main' in signal_object.properties)
    {
        out_str += "<tr><td><b>Type</b></td><td>Main</td></tr>";
    }
    else if('railway:signal:distant' in signal_object.properties)
    {
        out_str += "<tr><td><b>Type</b></td><td>Distant</td></tr>";
    }
    if('ref' in signal_object.properties)
    {
        out_str += "<tr><td><b>ID</b></td><td>"+signal_object.properties.ref+"</td></tr>";
    }

    out_str += "</table>";

    return out_str;
}
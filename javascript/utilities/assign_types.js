function check_if_signal_style_uk(feature, style_list)
{
    const default_sig = style_list.UK_Main_3AT;

    if('railway:signal:shunting' in feature.properties)
    {
        return style_list.UK_Shunting_Dwarf;
    }

    if('railway:signal:form' in feature.properties)
    {
        if('railway:signal:distant' in feature.properties)
        {
            return style_list.UK_Distant_LQ;
        }
        else
        {
            return style_list.UK_Main_LQ;
        }
    }

    if('railway:signal:main:states' in feature.properties)
    {
        states = feature.properties['railway:signal:main:states'];

        const has_dyel = states.includes('double_yellow');
        const has_yel = states.includes('yellow');
        const has_red = states.includes('red');
        const has_green = states.includes('green');

        if(has_dyel)
        {
            return style_list.UK_Main_4AT;
        }

        if(has_yel && has_red && has_green)
        {
            return style_list.UK_Main_3AT;
        }

        if(has_yel && has_green)
        {
            return style_list.UK_Distant_2AT;
        }

        if(has_red && has_green)
        {
            return style_list.UK_Main_2AT;
        }

    }

    return default_sig;
}
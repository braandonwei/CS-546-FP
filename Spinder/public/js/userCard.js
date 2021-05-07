(function ($) {

    function createChart(divName, profile, profile2) {
        data = [{
            type: 'scatterpolar',
            r: [profile.danceability, profile.energy, profile.loudness, profile.acousticness, profile.valence],
            theta: ['Danceability', 'Energy', 'Loudness', 'Acousticness', 'Valence'],
            fill: 'toself',
            name: 'You'
        },
        {
            type: 'scatterpolar',
            r: [profile2.danceability, profile2.energy, profile2.loudness, profile2.acousticness, profile2.valence],
            theta: ['Danceability', 'Energy', 'Loudness', 'Acousticness', 'Valence'],
            fill: 'toself',
            name: 'Them'
        }
    ]

        layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 1]
                }
            },
            showlegend: false,
            margin: {
                l: 0,
                r: 0,
                t: 0,
                b: 0
            }
        }

        var config = {
            responsive: true,
            displayModeBar: false
        }

        Plotly.newPlot(divName, data, layout, config);
    }

    function getMusicalProfileAjax(id) {
        var requestConfig = {
            method: 'GET',
            url: '/profiles/' + id,
            success: function (data) {},
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function (err) {
                console.log(err);
            }
        };

        var response = $.ajax(requestConfig).responseText;
        return JSON.parse(response);
        
    }

    $(document).ready(function () {
        let curr_profile = getMusicalProfileAjax($('#curr_user_profile').attr('value'));
        
        $('.card-switch').each(function(i, obj) {
            let user = $(this).find('.card-header').attr('id');
            let profile = $(`#${user}-chart`).attr('href');
            let response = getMusicalProfileAjax(profile);
            if (response)
                createChart(`${user}-chart`, curr_profile.averageAudioFeatures, response.averageAudioFeatures);
            $(this).find('.flip').flip({trigger: 'hover'}); 
        });

    });
})(window.jQuery);
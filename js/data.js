var ehrID = '6f81d77a-26ef-4cf4-926f-40ccfafd8a1f';
var baseUrl = 'https://rest.ehrscape.com/rest/v1/view/';
var queryUrl = baseUrl + ehrID + '/';

var authorization = "Basic " + btoa("guidemo" + ":" + "gui?!demo123");


//pulz
$.ajax({
    url: queryUrl + "pulse",
    type: 'GET',
    headers: {
        "Authorization": authorization
    },
    success: function (res) {
            $("#pulseUnit").append(res[0].unit);
            $("#pulseValue").append(res[0].pulse);
    }
});

//temperatura
$.ajax({
    url: queryUrl + "body_temperature",
    type: 'GET',
    headers: {
        "Authorization": authorization
    },
    success: function (res) {
            $("#tempUnit").append(res[0].unit);
            $("#tempValue").append(res[0].temperature);
    }
});

//pritisk
$.ajax({
    url: queryUrl + "blood_pressure",
    type: 'GET',
    headers: {
        "Authorization": authorization
    },
    success: function (res) {
        $("#pressureSystolic").append(res[0].systolic);
        $("#pressureDiastolic").append( res[0].diastolic);
        $("#pressureUnit").append(res[0].unit);
    }
});


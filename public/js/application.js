// var apiKey = ENV['API_KEY']
// var userName = ENV['USERNAME']
// var fxml_url = "http://" + userName + ":" + apiKey + "@flightxml.flightaware.com/json/FlightXML2/";

var fxml_url = "http://NicholasDavidson:750167e2faf07dfbbb2f62ae463fe7651f8f9cf3@flightxml.flightaware.com/json/FlightXML2/";
$(document).ready(function() {
  flightDetails();


});

function flightDetails() {
  $('.list-group').on('click', "#flight_status", function(event) {
    event.preventDefault();
    // alert("You have stopped the thing");
    // var formData = .serialize();
    // console.log(this);
    // console.log($("#ident_text").val());

    $.ajax ({
      url: fxml_url + 'FlightInfoEx',
      method: 'GET',
      data: { 'ident': $("#ident_text").val(), 'howMany': 1, 'offset': 0 },
      error: function(data, text) { alert('Failed to fetch flight: ' + data); },
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      xhrFields: { withCredentials: true }
    })

    .done(function(response) {
      console.log(response);
      for (flight of response.FlightInfoExResult.flights) {
        if (flight.actualdeparturetime === 0) {
          $('#flight-status').html('Flight: ' + flight.ident + ' from ' + flight.origin + ' to ' + flight.destination);
        }
      }
    })

    .fail(function(response) {
      alert("Failed to fetch flight information");
    })
  })
}




// $('#go_button').click(function() {
//     $.ajax({
//         type: 'GET',
//         url: fxml_url + 'FlightInfoEx',
//         data: { 'ident': $('#ident_text').val(), 'howMany': 10, 'offset': 0 },
//         success : function(result) {
//             if (result.error) {
//                 alert('Failed to fetch flight: ' + result.error);
//                 return;
//             }
//             for (flight of result.FlightInfoExResult.flights) {
//                 if (flight.actualdeparturetime > 0) {
//                     // display some textual details about the flight.
//                     $('#results').html('Flight ' + flight.ident + ' from ' + flight.origin + ' to ' + flight.destination);

//                     // display the route on a map.
//                     fetchAndRenderRoute(flight.faFlightID);
//                     return;
//                 }
//             }
//             alert('Did not find any useful flights');
//         },
//         error: function(data, text) { alert('Failed to fetch flight: ' + data); },
//         dataType: 'jsonp',
//         jsonp: 'jsonp_callback',
//         xhrFields: { withCredentials: true }
//         });
//     });
// });

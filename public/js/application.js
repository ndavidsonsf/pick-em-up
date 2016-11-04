// var apiKey = ENV['API_KEY']
// var userName = ENV['USERNAME']
// var fxml_url = "http://" + userName + ":" + apiKey + "@flightxml.flightaware.com/json/FlightXML2/";

var fxml_url = "http://NicholasDavidson:c57d1ac4043b4a6f3d2b32f465dd8994d2ead64d@flightxml.flightaware.com/json/FlightXML2/";

$(document).ready(function() {
  flightDetails();
  showLogin();
  showNewUser();


});

function flightDetails() {
  $('.list-group').on('click', "#flight_status", function(event) {
    event.preventDefault();
    // alert("You have stopped the thing");
    // var formData = .serialize();
    // console.log(this);
    // console.log($("#ident_text").val());
    var clickedFlightStatus = $(this);
    // $("#ident_text").val()

    $.ajax ({
      url: fxml_url + 'FlightInfoEx',
      method: 'GET',
      data: { "ident": $("#ident_text").val(), howMany: 5, offset: 0 },
      error: function(data, text) { alert('Failed to fetch flight: ' + data); },
      dataType: 'jsonp',
      jsonp: 'jsonp_callback',
      xhrFields: { withCredentials: true }
    })

    .done(function(response) {
      console.log(response);
      for (flight of response.FlightInfoExResult.flights) {
        if ((Math.floor(Date.now() / 1000)) > (flight.actualdeparturetime) && (flight.actualarrivaltime === 0)) {
          clickedFlightStatus.parent().parent().find("#flight-status").html(flight.ident + " flight from " + flight.originCity + " to " + flight.destinationCity + "<br>" + "Scheduled to arrive at " + flight.destinationName + " in " + timeConverter(flight.estimatedarrivaltime));
        }
      }
    })

    .fail(function(response) {
      alert("Failed to fetch flight information");
    })
  })
}

function timeConverter(epoch) {
  var interval = (epoch - Math.floor(Date.now() / 1000));
  var hours = Math.floor(interval / 3600);
  var minutes = Math.floor((interval - hours * 3600) / 60);
  return hours + " hour(s) " + minutes + " minute(s)"
}

function showLogin() {
  $("#login").on("click", function(event) {
    event.preventDefault();
    // alert("this stopped");

    var loginURL = $(this).attr("href");

    $.ajax ({
      url: loginURL,
      method: "GET"
    })

    .done(function(response) {
      // console.log(response);
      $("#main-block").hide();
      // $(".jumbotron").toggle();

      $(".jumbotron").append(response);
    })
  })
}

function showNewUser() {
  $("#signup").on("click", function(event) {
    event.preventDefault();
    // alert("this stopped");

    var loginURL = $(this).attr("href");

    $.ajax ({
      url: loginURL,
      method: "GET"
    })

    .done(function(response) {
      console.log(response);
      $("#main-block").hide();
      $(".jumbotron").append(response);
    })
  })
}

$.ajax({
    url: "http://cs5610-am10.rhcloud.com/flight_schedule?format=jsonp",
    dataType: "jsonp",
    success: renderFlightSchedule
});

function renderFlightSchedule(flightsList) {
    var flightsTable = $("#flightScheduleList");
    flightsTable.empty();
    var head = $("<thead>");
    var headerRow = $("<tr>");
    $("<td>").append('<b>Origin</b>').appendTo(headerRow);
    $("<td>").append('<b>Destination</b>').appendTo(headerRow);
    $("<td>").append('<b>Airline</b>').appendTo(headerRow);
    $("<td>").append('<b>Departure</b>').appendTo(headerRow);
    $("<td>").append('<b>Terminal</b>').appendTo(headerRow);
    head.append(headerRow);
    flightsTable.append(head);
    for (var index in flightsList){
        var flight = flightsList[index];
        var row = $("<tr>");
        $("<td>").append(flight.origin).appendTo(row);
        $("<td>").append(flight.destination).appendTo(row);
        $("<td>").append(flight.airline).appendTo(row);
        $("<td>").append(flight.departure).appendTo(row);
        $("<td>").append(flight.terminal).appendTo(row);
        flightsTable.append(row);
    }
}
$(document).ready(function () {
    $("#spinStart").click(function () {
        console.log("click called");
        $("#spinImage").addClass("spinner");
    });

    $("#spinStop").click(function () {
        console.log("click called");
        $("#spinImage").removeClass("spinner");
    });

    $("#batman").hover(function () {
        var info = $("<h1>I am Batman!!!</h1>");
        $(this).after(info.fadeIn(500));
    }, function () {
        $(this).next().fadeOut(500);
    });

    $(".draggable").draggable();

    var countries = ["USA", "India", "Australia", "New Zealand"];
    $("#countries").autocomplete({ source: countries });

    $("#addRectangle").click(function () {
        console.log("add rect called");
        var r = $("<canvas class='canvas-rect'/>")
        r.draggable({ containment: "parent" });
        $(this).parent().parent().parent().find("#canvas").append(r);
    });

    $("#changeBlueBtn").click(function () {
        $(".canvas-rect").css("background-color", "blue");
    });

});

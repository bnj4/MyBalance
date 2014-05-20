console.log("load script exercise_list");

var db = null;
var results = 0;
var IdProg = null;

$(document).on('pagebeforeshow', '#page_exercise_list', function(event, ui) {

    // Übergabewert von page_program_list
    var url = document.location;
    IdProg = purl(url).param('IdProg');
    // console.log("IdProg: " + IdProg);
    if (IdProg != undefined)
        IdProg = decodeURIComponent(IdProg);
    console.log("IdProg nach Decoding: " + IdProg);

    db.transaction(getExerciseList, errorCB, successCB);
});

document.addEventListener("deviceready", function() {
    db = window.openDatabase("Physio", "1.0", "physio", 2000000);
    console.log("deviceready_exercise_list");
}, false);

function getExerciseList(tx) {
    console.log("IdProg: " + IdProg);
    tx.executeSql('SELECT Ref, idProgram, idExercise, E_Name, E_Description, S, R, W, D, Re FROM Program WHERE idProgram=' + IdProg, [], function(tx, results) {
        // WHERE idProgram="' + IdProg + '"

        $('#exercise_list').html('');
        for (var i = 0; i < results.rows.length; i++) {

            $('#exercise_list').append('<li><a onclick="doThisOnClick_ex(' + results.rows.item(i).idExercise + ')" id="idEx' + results.rows.item(i).idExercise + '"><img src="img/' + results.rows.item(i).Ref + '"><h3>' + results.rows.item(i).E_Name + '</h3></a></li>');

        }
        $('#exercise_list').listview('refresh');

    }, errorCB);
}

function doThisOnClick_ex(IdExe) {
     console.log("doThisOnClick_ex: " + IdExe);
    $.mobile.changePage("page_exercise_detail_therapy.html", {
        data : {
            IdExe : encodeURIComponent(IdExe)
        }
    });

}

function errorCB(tx, err) {
    // alert(err);
    console.log(err);
}

function successCB() {
    // alert("ok list filler");
    console.log("successCB_exercise_list");
}
console.log("script exercise_detail");

var db = null;
var results = 0;
var IdExe = null;

$(document).on('pagebeforeshow', '#page_exercise_detail_therapy', function(event, ui) {

    // Übergabewert von page_program_list
    var url = document.location;
    IdExe = purl(url).param('IdExe');
    // console.log("IdExe: " + IdExe);
    if (IdExe != undefined)
        IdExe = decodeURIComponent(IdExe);
    console.log("IdExe nach Decoding: " + IdExe);

    db.transaction(getExercises, errorCB, successCB);
});

document.addEventListener("deviceready", function() {
    db = window.openDatabase("Physio", "1.0", "physio", 2000000);
    // alert("deviceready_read_database");
}, false);

function getExercises(tx) {
    console.log("IdExe: " + IdExe);

    tx.executeSql('SELECT * FROM Program WHERE idExercise=' + IdExe, [], function(tx, results) {
        // WHERE idExercise=' + IdEx

        for (var i = 0; i < results.rows.length; i++) {
            document.getElementById('e_ref').src = 'img/' + results.rows.item(i).Reference;
            document.getElementById('e_name').innerHTML = results.rows.item(i).E_Name;
            document.getElementById('e_description').innerHTML = results.rows.item(i).E_Description;
            document.getElementById('set_value').value = results.rows.item(i).Set;
            document.getElementById('repetitions_value').value = results.rows.item(i).Repetition;
            document.getElementById('weight_value').value = results.rows.item(i).Weight;
            document.getElementById('duration_value').value = results.rows.item(i).Duration;
            document.getElementById('rest_value').value = results.rows.item(i).Rest;
        }
    }, errorCB);

}

function errorCB(tx, err) {
    console.log(err);
}

function successCB() {
    console.log("successCB_exercise_list");
}

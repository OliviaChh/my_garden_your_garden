var food_waste = 200;
var animal_waste = 500;
var green_waste = 300;

var food_obj = document.getElementById("food_w");
var animal_obj = document.getElementById("animal_w");
var green_obj = document.getElementById("green_w");

food_obj.innerHTML = 'Food waste amount: ' + food_waste + ' kg'
animal_obj.innerHTML = 'Animal waste amount: ' + animal_waste + ' kg'
green_obj.innerHTML = 'Green waste amount: ' + green_waste + ' kg'

var popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup");
}

var buttonCount = 0;

function changeWaste() {
    var waste_provide = document.getElementById("waste_owner");
    var waste_recive = document.getElementById("waste_another_owner");
    food_waste = food_waste - Number(waste_provide.value) + Number(waste_recive.value);
    food_obj.innerHTML = 'Food waste amount: ' + food_waste + ' kg';
    popup.classList.remove("open-popup");
}



function iterateRecords(results) {

    console.log(results);

    // Setup the map as per the Leaflet instructions:

    var myMap = L.map("map").setView([-27.5, 153], 12); // setView([coordinate, map size])
    // https://leafletjs.com/examples/quick-start/
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 50,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


    // Iterate over each record and add a marker using the Latitude field (also containing longitude)
    $.each(results.result.records, function(recordID, recordValue) {

        var recordLatitude = recordValue["Latitude"];
        var gardenName = recordValue["Garden_Name"];
        var recordLongitude = recordValue["Longitude"];
        var recordAddress = recordValue["Address"];
        var recordFacilities = recordValue["Facilities"];
        var recordPhone = recordValue["Phone"];
        var recordWebsite = recordValue["Website"];
        var recordOpeningTimes = recordValue["Opening_times"];
        var recordOtherInfo = recordValue["Other_information"];
        var foodAmount = Math.floor(Math.random() * 100) + 1;
        var animalAmount = Math.floor(Math.random() * 100) + 1;
        var greenAmount = Math.floor(Math.random() * 100) + 1;
        // Markers
        var marker = L.marker([recordLatitude, recordLongitude]).addTo(myMap);




        // Pop up msg
        //var popup = L.popup().setLatLng([51.513, -0.09]).setContent("I am a standalone popup.").openOn(myMap);
        marker.bindPopup("<br><h1>" + gardenName + "</h1>" +
            "<br><b>Address: </b><br>" + recordAddress +
            "<br><b>Facilities: </b><br>" + recordFacilities +
            "<br><b>Opening times: </b>" + recordOpeningTimes +
            "<br><b>Website: </b><br><a href='" + recordWebsite + "'>" + recordWebsite + "</a>" +
            "<br><b>Contact: </b><br>" + recordPhone +
            "<br><b>Other information: </b><br>" + recordOtherInfo +
            "<br><b>Food waste amount: </b><br>" + foodAmount + " / 100" +
            "<br><b>Animal waste amount: </b><br>" + animalAmount + " / 100" +
            "<br><b>Green waste amount: </b><br>" + greenAmount + " / 100" +
            "<br><b><button onclick=\"openPopup()\" id=" + buttonCount + "> Change waste </button>"
            // "<br><b><button id=" + buttonCount + "> Change waste </button>"
            /*+ "<br><b>Location: </b> [ " + recordLatitude + ", " + recordLongitude + " ]"*/
        ).openPopup();
        buttonCount = buttonCount + 1;

        // document.getElementById("Change").onclick = function() {
        //     alert("Hello");
        // }



        // Circles
        var circle = L.circle([recordLatitude, recordLongitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(myMap);

    });

}

$(document).ready(function() {

    var data = {
        resource_id: "b71a3b80-1cd9-4242-924e-5d9e2a4a985f"
            //limit: 100
    }

    $.ajax({
        url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true,
        success: function(results) {
            iterateRecords(results);
        }
    });



});
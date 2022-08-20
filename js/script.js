var food_waste = 20;
var animal_waste = 50;
var green_waste = 30;

var food_obj = document.getElementById("food_w");
var animal_obj = document.getElementById("animal_w");
var green_obj = document.getElementById("green_w");

food_obj.innerHTML = 'Food waste amount: ' + food_waste + ' kg';
animal_obj.innerHTML = 'Animal waste amount: ' + animal_waste + ' kg';
green_obj.innerHTML = 'Green waste amount: ' + green_waste + ' kg';

var popup = document.getElementById("popup");

function openPopup(data) {
    popup.classList.add("open-popup");
    buttonCount = data;
    console.log(data);
    console.log(buttonCount);
}

function closePopup() {
    popup.classList.remove("open-popup");
}

// Garden ID
var buttonCount = 0;

function changeWaste() {

    var provided_type = document.getElementById("waste_go").value;
    var recived_type = document.getElementById("waste_get").value;

    var provided_amount = document.getElementById("waste_owner");
    var recived_amount = document.getElementById("waste_another_owner");

    var garden_food_obj = document.getElementById("food" + buttonCount);
    var garden_animal_obj = document.getElementById("animal" + buttonCount);
    var garden_green_obj = document.getElementById("green" + buttonCount);
    var garden_id = document.getElementById(buttonCount);
    console.log("food from garden no: " + buttonCount);
    console.log(garden_id.value);

    // Update user's garden's data
    if (provided_type != recived_type && provided_type != 0 && recived_type != 0) {
        if (provided_type == 1) {
            food_waste = food_waste - Number(provided_amount.value);
            if (food_waste < 0) {
                alert("Please choose other kinds of waste to exchange or provide less amount of it.");
                food_waste = food_waste + Number(provided_amount.value);
            } else if (recived_type == 2) {
                animal_waste = animal_waste + Number(recived_amount.value);
            } else if (recived_type == 3) {
                green_waste = green_waste + Number(recived_amount.value);
            }
        } else if (provided_type == 2) {
            animal_waste = animal_waste - Number(provided_amount.value);
            if (animal_waste < 0) {
                alert("Please choose other kinds of waste to exchange or provide less amount of it.");
                animal_waste = animal_waste + Number(provided_amount.value);
            } else if (recived_type == 1) {
                food_waste = food_waste + Number(recived_amount.value);
            } else if (recived_type == 3) {
                green_waste = green_waste + Number(recived_amount.value);
            }
        } else if (provided_type == 3) {
            green_waste = green_waste - Number(provided_amount.value);
            if (green_waste < 0) {
                alert("Please choose other kinds of waste to exchange or provide less amount of it.");
                green_waste = green_waste + Number(provided_amount.value);
            } else if (recived_type == 1) {
                food_waste = food_waste + Number(recived_amount.value);
            } else if (recived_type == 2) {
                animal_waste = animal_waste + Number(recived_amount.value);
            }
        }

        // Display the update
        food_obj.innerHTML = 'Food waste amount: ' + food_waste + ' kg';
        animal_obj.innerHTML = 'Animal waste amount: ' + animal_waste + ' kg';
        green_obj.innerHTML = 'Green waste amount: ' + green_waste + ' kg';
        popup.classList.remove("open-popup");
    }

    var food = 0;
    var animal = 0;
    var green = 0;

    garden_value = garden_id.value.split("-");
    food = garden_value[0];
    animal = garden_value[1];
    green = garden_value[2];
    console.log(garden_value + "garden_value");


    console.log(food);
    console.log(animal);
    console.log(green);
    console.log(recived_type + "recive_type");
    console.log(provided_type + "provide_type");
    console.log("Food: " + food + " Animal: " + animal + " Green: " + green);

    /*food = garden_id.value.split(" ")[0];
    animal = garden_id.value.split(" ")[1];
    green = garden_id.value.split(" ")[2];*/

    // Update another garden's data
    if (provided_type != recived_type && provided_type != 0 && recived_type != 0) {
        if (provided_type == 1) {
            food = Number(food) + Number(provided_amount.value);
            if (recived_type == 2) {
                animal = Number(animal) - Number(recived_amount.value);
            } else if (recived_type == 3) {
                green = Number(green) - Number(recived_amount.value);
            }
        } else if (provided_type == 2) {
            animal = Number(animal) + Number(provided_amount.value);
            if (recived_type == 1) {
                food = Number(food) - Number(recived_amount.value);
            } else if (recived_type == 3) {
                green = Number(green) - Number(recived_amount.value);
            }
        } else if (provided_type == 3) {
            green = Number(green) + Number(provided_amount.value);
            if (recived_type == 1) {
                food = Number(food) - Number(recived_amount.value);
            } else if (recived_type == 2) {
                animal = Number(animal) - Number(recived_amount.value);
            }
        }

        console.log("Food: " + food + " Animal: " + animal + " Green: " + green);

        // Display the update
        garden_food_obj.innerHTML = 'Food waste amount: ' + food + ' kg';
        garden_animal_obj.innerHTML = 'Animal waste amount: ' + animal + ' kg';
        garden_green_obj.innerHTML = 'Green waste amount: ' + green + ' kg';
        garden_id.value = food + "-" + animal + "-" + green;
        // This line is important
    }


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
    $.each(results.result.records, function (recordID, recordValue) {

        var recordLatitude = recordValue["Latitude"];
        var gardenName = recordValue["Garden_Name"];
        var recordLongitude = recordValue["Longitude"];
        // var recordAddress = recordValue["Address"];
        // var recordFacilities = recordValue["Facilities"];
        // var recordPhone = recordValue["Phone"];
        // var recordWebsite = recordValue["Website"];
        // var recordOpeningTimes = recordValue["Opening_times"];
        // var recordOtherInfo = recordValue["Other_information"];
        var foodAmount = Math.floor(Math.random() * 100) + 1;
        var animalAmount = Math.floor(Math.random() * 100) + 1;
        var greenAmount = Math.floor(Math.random() * 100) + 1;
        // Markers
        var marker = L.marker([recordLatitude, recordLongitude]).addTo(myMap);




        // Pop up msg
        //var popup = L.popup().setLatLng([51.513, -0.09]).setContent("I am a standalone popup.").openOn(myMap);
        marker.bindPopup("<br><h1>" + gardenName + "</h1>" +
            /* "<br><b>Address: </b><br>" + recordAddress +
             "<br><b>Facilities: </b><br>" + recordFacilities +
             "<br><b>Opening times: </b>" + recordOpeningTimes +
             "<br><b>Website: </b><br><a href='" + recordWebsite + "'>" + recordWebsite + "</a>" +
             "<br><b>Contact: </b><br>" + recordPhone +
             "<br><b>Other information: </b><br>" + recordOtherInfo +*/
            "<br><b><div id=\"food" + buttonCount + "\" value=" + foodAmount + ">Food waste amount: </b><br>" + foodAmount + " / 100</div>" +
            "<br><b><div id=\"animal" + buttonCount + "\" value=" + animalAmount + ">Animal waste amount:</b><br>" + animalAmount + " / 100</div>" +
            "<br><b><div id=\"green" + buttonCount + "\" value=" + greenAmount + ">Green waste amount: </b><br>" + greenAmount + " / 100</div>" +
            "<br><b><button class='changeBtn' onclick=\"openPopup(" + buttonCount + " )\" id=" + buttonCount + " \" value=" + foodAmount + "-" + animalAmount + "-" + greenAmount + "> Change waste </button>"
            /* "<button id=" + buttonCount + "> Change waste </button>"
            + "<br><b>Location: </b> [ " + recordLatitude + ", " + recordLongitude + " ]"*/
        ).openPopup();
        buttonCount = buttonCount + 1;

        /* document.getElementById("Change").onclick = function() {
             alert("Hello");
         }*/



        // Circles
        var circle = L.circle([recordLatitude, recordLongitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(myMap);

    });

}

$(document).ready(function () {

    var data = {
        resource_id: "b71a3b80-1cd9-4242-924e-5d9e2a4a985f"
        //limit: 100
    }

    $.ajax({
        url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true,
        success: function (results) {
            iterateRecords(results);
        }
    });



});
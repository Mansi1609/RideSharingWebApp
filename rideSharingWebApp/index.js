// Initialize Firebase
var config = {
    apiKey: "AIzaSyApmRAMvcs-SDBL08lykImZENr2rifpqlg",
    authDomain: "ride-sharing-4c8e7.firebaseapp.com",
    databaseURL: "https://ride-sharing-4c8e7.firebaseio.com",
    projectId: "ride-sharing-4c8e7",
    storageBucket: "ride-sharing-4c8e7.appspot.com",
    messagingSenderId: "217057301737"
};
firebase.initializeApp(config);


var db = firebase.firestore();

//Listen for the form submit
document.getElementById('postingForm').addEventListener('submit', submitPostingForm);


//submitting form
function submitPostingForm(e) {
    e.preventDefault();

    /***Destination***/
    var destination = getInputValue('destination');
    /*if (fName == "") {
        alert("First name must be entered");
        return false;
    }*/

    var userID = localStorage.getItem('userID');

    var fullName = localStorage.getItem('userName');

    var wscEmail = localStorage.getItem('wscEmail');

    var phoneNum = localStorage.getItem('phoneNum');

    var location = getInputValue('location');

    var dateGoing = getInputValue('dateGoing');

    var departureTime = getInputValue('departureTime');

    var arrivalTime = getInputValue('arrivalTime');

    var returnTime = getInputValue('returnTime');

    var seats = getInputValue('seats');

    var tripDescription = getInputValue('tripDescription');



    savePost(userID, fullName, wscEmail, phoneNum, destination, location, dateGoing, departureTime, arrivalTime, returnTime, seats, tripDescription);


    //alert user registration was submitted
    // document.querySelector('.postedAlert').style.display = 'block';

    //here i want to put code to direct to index as a logged in user
}
//gets form values from the html form
function getInputValue(id) {
    return document.getElementById(id).value;
}

// saving user info in database
function savePost(userID, fullName, wscEmail, phoneNum, destination, location, dateGoing, departureTime, arrivalTime, returnTime, seats, tripDescription) {
    return db.collection("trips").add({
        //added 4/8/2019 with localStorage
        userID: userID,
        fullName: fullName,
        wscEmail: wscEmail,
        phoneNumber: phoneNum,
        flag: true,

        destination: destination,
        location: location,
        dateGoing: dateGoing,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        returnTime: returnTime,
        seats: seats,
        tripDescription: tripDescription
    }).then(function () {
        //window.location.href = 'https://www.google.com/';
        setTimeout(() => window.location.reload(true), 1000);
    });
}

// }
// DO WE NEED THIS???
const HTMLFEED = document.querySelector("#feed");

db.collection("trips").where("flag", "==", true)
    .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            //may need to take out these commented sections because of new methods of extracting data.
            //this info needs to be taken from the Users collection
            var fullName = doc.data().fullName;
            var wscEmail = doc.data().wscEmail;
            var phoneNum = doc.data().phoneNumber;

            //data that is from the trips collection
            var id = doc.data().ownerID;
            var idName = doc.id;
            var destination = doc.data().destination;
            var location = doc.data().location;
            var date = doc.data().dateGoing;
            var arrivalTime = doc.data().arrivalTime;
            var departureTime = doc.data().departureTime;
            var returnTime = doc.data().returnTime;
            var seats = doc.data().seats;
            var description = doc.data().tripDescription;


            feed.innerHTML += " \
                    <div'>\
                        <div class='post'>\
                            <div>\
                                <img src='circleProfile.png' alt='User photo'>\
                                <div class='name'> <p>" + fullName + "</p></div>\
                                <div>Destination: <span class='postInfo'>" + destination + "</span></div>\
                                <div>Location: <span class='postInfo'>" + location + "</span></div>\
                                <div>Date: <span class='postInfo'>" + date + "</span></div>\
                                <table>\
                                <tr>\
                                    <th>Departure</th>\
                                    <th>Arrival</th>\
                                    <th>Return</th>\
                                    <th>Seats</th>\
                                </tr>\
                                <tr>\
                                    <td>" + departureTime + "</td>\
                                    <td>" + arrivalTime + "</td>\
                                    <td>" + returnTime + "</td>\
                                    <td>" + seats + "</td>\
                                </tr>\
                                </table>\
                                <div>\
                                <p>Email: " + wscEmail + " <span class='postInfo'>" + phoneNum + "</span></p>\
                                </div>\
                                <div class='description'><p>" + description + "</p></div>\
                            </div>\
                            </div>\
                        </div>\
                    </div>";

        });

    });


function deletePost(id) {
    alert('The post has been deleted :' + id);
}

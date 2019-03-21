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
    
    var location = getInputValue('location');
    
    var dateGoing = getInputValue('dateGoing');
    
    var departureTime = getInputValue('departureTime');
    
    var arrivalTime = getInputValue('arrivalTime');
    
    var returnTime = getInputValue('returnTime');
    
    var seats = getInputValue('seats');
    
    var tripDescription = getInputValue('tripDescription');
    
    

    savePost(destination, location, dateGoing, departureTime, arrivalTime, returnTime, seats, tripDescription);
    
        
    //alert user registration was submitted
   // document.querySelector('.postedAlert').style.display = 'block';

    //here i want to put code to direct to index as a logged in user

}

//gets form values from the html form
function getInputValue(id) {
    return document.getElementById(id).value;
}

// saving user info in database
function savePost(destination, location, dateGoing, departureTime, arrivalTime,  returnTime, seats, tripDescription) {
    db.collection("trips").add({
        destination: destination,
        location: location,
        dateGoing: dateGoing,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        returnTime: returnTime,
        seats: seats,
        tripDescription: tripDescription
    });
}
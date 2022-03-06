// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD8gnbNJH3uPe9vh4oWatcRHMDTuM6kfK8",
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
console.log('testing');
//getting values

 const familyDrinks = document.querySelector("#feed");

db.collection("trips").get().then(function (querySnapshot) {
     querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());

         var idName = doc.id;
         var destination = doc.data().destination;
         var location = doc.data().location;
         var date = doc.data().dateGoing;
         var arrivalTime = doc.data().arrivalTime;
         var departureTime = doc.data().departureTime;
         var returnTime = doc.data().returnTime;
         var seats = doc.data().seats;
         var email = "temp@Email";
         var phoneNum = "(712) 111-2211";
         var description = doc.data().tripDescription;
         
         /*familyDrinks.innerHTML += " \
            <div class='fourColumn'>\
                <img class='image' src='" + photo + "'>\
                <h1 class='name'> " + name + " " +size + "</h1>\
                <p class='price'>$"+ price + " </p>\
                <button type='submit' onclick='addItem(\" " + idName + "\" )'>add</button>\
            </div>";*/
         
    
         
          feed.innerHTML += " \
            <div'>\
                <div class='post'>\
                    <div>\
                        <img src='circleProfile.png' alt='User photo'>\
                        <div class='name'>John Doe</div>\
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
                        <p>Email: "+ email +" <span class='postInfo'>"+ phoneNum + "</span></p>\
                        </div>\
                        <div class='description'><p>" + description + "</p></div>\
                    </div>\
                </div>\
            </div>";
         
         
         console.log(location);
         
         
         
         
    
     });
     
        
 });
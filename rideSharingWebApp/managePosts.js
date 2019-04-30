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


const HTMLFEED = document.getElementById("nfeed");
const updateCont = document.getElementById("updateContainer");

function getInputValue(id) {
    return document.getElementById(id).value;
}


//works
db.collection("trips").where("flag", "==", true).where('userID', "==", localStorage.getItem('userID')).get().then(function (querySnapshot) {
    /*    if (doc.exists) {    
            console.log("Document Found");
        } else {
            console.log("Document Not Found");
        }
    }).catch(function(error){
        console.log("Error getting document:", error);
    }) */
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

        HTMLFEED.innerHTML += "\
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
                                <div class='edtBtns'>\
                                <button class='formSubBtn' onclick='updatePost(this.id)' id=" + idName + ">Update</button>\
                                <button onclick='deletePost(this.id)' id=" + idName + " class='formSubBtn delBtn'> Delete</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    ";
        `
                <div class='post'> 
                    <form id='updatingForm'> 
                       
                            <img src='circleProfile.png' alt='User photo'> 
                            <div class='name' id='fullName'><p>` + fullName + `</p></div>
                            <div> 

                                    <div>Destination: <span class='postInfo'><input type='text' id='destination' value=` + destination + `></span></div>
                                    <div>Location: <input class='postInfo' type='text' id='location' value=` + location + `></div>
                                    <div>Date: <input class='postInfo' type='text' id='dateGoing' value=` + date + `></div>
                                    <br> 
                                    <table>
                                    <tr>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Return</th>
                                        <th>Seats</th>
                                    </tr>
                                    <tr>
                                        <td><input type='text' id='departureTime' value=` + departureTime + `></td>
                                        <td><input type='text' id='arrivalTime' value=` + arrivalTime + `></td>
                                        <td><input type='text' id='returnTime' value=` + returnTime + `></td>
                                        <td><input type='text' id='seats' value=` + seats + `> 
                                    </tr>
                                    </table>
                                    <div>
                                    <p>Email: ` + wscEmail + ` <span class='postInfo'>` + phoneNum + `</span></p>
                                    </div>
                                    <div class='description'>Description: <input class='description' type='text' id='tripDescription' value=` + description + `></div>
                                    <div class='manageButtom'> 
                                    <button class="formSubBtn" onclick='deletePost(this.id)' class='delbutton' id=` + idName + ` > Delete Me</button> 
                                    <button class="formSubBtn" onclick='updatePost(this.id)' class='updatebutton' id=` + idName + `> Update Me</button> </div>
                        </div> 
                        
                    </form>
                </div>`;
    });
});





function deletePost(id) {
    alert('The post has been deleted :' + id);
    var postRef = db.collection("trips").doc(id);

    return postRef.update({
            flag: false
        })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}



function updatePost(id) {
    var id = id;
    var docRef = db.collection("trips").doc(id);
    var dest = "";
    var loc = "";
    var dep = "";
    var arr = "";
    var ret = "";
    var seats = "";

    docRef.get().then(function (doc) {

        dest = doc.data().destination;
        loc = doc.data().location;
        date = doc.data().dateGoing;
        dep = doc.data().departureTime;
        arr = doc.data().arrivalTime;
        ret = doc.data().returnTime;
        seats = doc.data().seats;
        desc = doc.data().tripDescription;


    }).then(function () {
        window.scrollTo(0, 0);
        updateCont.innerHTML = `<form class="updateForm" id="postingForm">
  Destination:
  <input type="text" id="upFdest" name="Destination" value=` + dest + `>
  <br>
  Location:
  <input type="text" id="upLocation" name="Location" value=` + loc + `><br>
  Date: 
  <input type="text" id="upDate" value=` + date + `><br>
  Departure Time:
  <input type="text" id="upDeparture" value=` + dep + `><br>
  Arrival Time:
  <input type='text' id="upArrival"  value=` + arr + `><br>
  Return Time: 
  <input type='text' id="upReturn" value=` + ret + `><br>
  Seats:
  <input type='text' id="upSeats"  value=` + seats + `><br>
  Description: 
  <input type='text' id="upDesc" value=` + desc + `><br>

  <button class="formSubBtn">Submit</button>
</form>`;

    }).then(function () {

        document.getElementById('postingForm').addEventListener('submit', submitPostingForm);


        //submitting form
        function submitPostingForm(e) {
            e.preventDefault();

            var updatedDest = getInputValue('upFdest');
            var updatedLocation = getInputValue('upLocation');
            var updatedDate = getInputValue('upDate');
            var updatedDeparture = getInputValue('upDeparture');
            var updatedArrival = getInputValue('upArrival');
            var updatedReturn = getInputValue('upReturn');
            var updatedSeats = getInputValue('upSeats');
            var updatedDescription = getInputValue('upDesc');


            Promise.all([
            updateForm(id, updatedDest, updatedLocation, updatedDate, updatedDeparture, updatedArrival, updatedReturn, updatedSeats, updatedDescription)
  
])
            .then(updatedAlert);

        }

    })




}

function updateForm(id, destination, location, date, departure, arrival, returnT, seats, description) {
    db.collection('trips').doc(id).update({
        destination: destination,
        location: location,
        dateGoing: date,
        departureTime: departure,
        arrivalTime: arrival,
        returnTime: returnT,
        seats: seats,
        tripDescription: description
    })

}

function updatedAlert() {
    alert("Updated");
    setTimeout(() => location.reload(), 500);
}

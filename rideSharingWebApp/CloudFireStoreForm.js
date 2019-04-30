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
document.getElementById('secondForm').addEventListener('submit', submitPostingForm);

//submitting form
function submitPostingForm(e) {
    e.preventDefault();
    //testing the userID
    var newID = getInputValue('userID');

    var fName = getInputValue('fName');

    var lName = getInputValue('lName');

    var mName = getInputValue('mName');

    var otherEmail = getInputValue('otherEmail');

    var password = getInputValue('password');

    var phoneNumber = getInputValue('phoneNumber');

    var wscEmail = getInputValue('wscEmail');


    //userID is a test
    savePost(newID, fName, lName, mName, otherEmail, password, phoneNumber, wscEmail);

}

//gets form values from the html form
function getInputValue(id) {
    return document.getElementById(id).value;
}

// saving user info in database
function savePost(userID, fName, lName, mName, otherEmail, password, phoneNumber, wscEmail) {
    //userID and newID is test
    var newID = userID;
    db.collection("Users").doc(newID).set({
        fName: fName,
        lName: lName,
        mName: mName,
        otherEmail: otherEmail,
        password: password,
        phoneNumber: phoneNumber,
        wscEmail: wscEmail
    });
}

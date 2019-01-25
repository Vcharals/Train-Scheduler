
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvtDx06FbnyRW7HKbXwp5wLkRKfAgtbNk",
    authDomain: "train-scheduler-4ba57.firebaseapp.com",
    databaseURL: "https://train-scheduler-4ba57.firebaseio.com",
    projectId: "train-scheduler-4ba57",
    storageBucket: "train-scheduler-4ba57.appspot.com",
    messagingSenderId: "605962376835"
  };
  firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();

//Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

// Submit Button Click
$("#addTrains").on("click", function(event){
	event.preventDefault(); 
	
	// Code in the logic for storing and retrieving the most recent trains.
	trainName = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTime = $("#firstTrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();


    // console.log("Train name: " + trainName);
    // console.log("Destination: " + destination);
    // console.log("First time: " + firstTime);
    // console.log("Frequency: " + frequency);

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firstTrain-input").val("");
	$("#frequency-input").val("");

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency
	});


});

// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainName = childSnapshot.val().trainName;
      destination = childSnapshot.val().destination
      firstTime = childSnapshot.val().firstTime;
      frequency = childSnapshot.val().frequency;


      var firstTimeMoment = moment(firstTime, "HH:mm");
      // console.log("TIME CONVERTED: " + firsttimeMoment);
      
      // It is Now - moment
      var currentTime = moment();
      // console.log("Now TIME: " + currenttime);

      var minuteArrival = currentTime.diff(firstTimeMoment, 'minutes');
      var minuteLast = minuteArrival % frequency;
      var awayTrain = frequency - minuteLast;

      // console.log("Minutes: " + minuteArrival);
      // console.log("Minutes Last: " + minuteLast);
      // console.log("Away Train: " + awayTrain);

      var nextArrival = currentTime.add(awayTrain, 'minutes');
      var arrivalTime = nextArrival.format("HH:mm");
      // console.log("Away Arrival: " + nextArrival);
      // console.log("Arrival Time: " + arrivalTime);

      
    // full list of items to the well
	$("#AddTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + awayTrain + "</td>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

//Initialising connection to backendless
Backendless.initApp('DA177622-8268-9292-FF7D-A1E6BFE66100', 'DA98CD2A-640F-4863-96E9-E796101DBDD3' );

const PAGE_SIZE = 80

const dataQuery = Backendless.DataQueryBuilder.create().setPageSize(PAGE_SIZE)
//---------------------------------------------------------------------------------------------------


var loggedIn = window.localStorage.getItem('li');
console.log (loggedIn);

function homeScreen(){
	if (loggedIn==null){
		document.getElementById("topBarHomeButton").style.display = "none";
		document.getElementById("topBarMyCodeButton").style.display = "none";
		document.getElementById("topBarMyCardButton").style.display = "none";
		document.getElementById("StopBarMyCodeButton").style.display = "none";
		document.getElementById("StopBarMyCardButton").style.display = "none";
	}else if (loggedIn=="true"){
    window.location.href = "myHome.html";
  }

}


function register(){
var name= document.getElementById("name").value;
var email=  document.getElementById("email").value;
var password=  document.getElementById("password").value;


function userRegistered( user )
{
  console.log( "user has been registered" );
  Backendless.UserService.logout()
 .then( function() {
  })
 .catch( function( error ) {
  });
  window.location.href = "myHome.html";
}

function gotError( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}

var user = new Backendless.User();
user.name=name;
user.email = email;
user.password = password;

Backendless.UserService.register( user ).then( userRegistered ).catch( gotError );
	
}

function login(){

var login=  document.getElementById("email").value;
var password=  document.getElementById("password").value;

function userLoggedIn( user )
{
  console.log( "user has logged in" );
  localStorage.setItem('li', "true");
  window.location.href = "myHome.html";
}

function gotError( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}

Backendless.UserService.login( login, password, true )
 .then( userLoggedIn )
 .catch( gotError );
}


function uploadMedical(){
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var dateOfBirth = document.getElementById("dateOfBirth").value;
	var bloodType = document.getElementById("bloodType").value;
	var medicalInformation1 = document.getElementById("medicalInformation1").value;
	var medicalInformation2 = document.getElementById("medicalInformation2").value;
	var medicalInformation3 = document.getElementById("medicalInformation3").value;
	var medicalInformation4 = document.getElementById("medicalInformation4").value;
	var medicalInformation5 = document.getElementById("medicalInformation5").value;

	
	var patientEntry = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        bloodType: bloodType,
        medicalInfo1: medicalInformation1,
        medicalInfo2: medicalInformation2,
        medicalInfo3: medicalInformation3,
        medicalInfo4: medicalInformation4,
        medicalInfo5: medicalInformation5
    }
	
Backendless.Data.of( "patient" ).save( patientEntry )
  .then( function( savedObject ) {
  	 
      console.log( "Patient Added" );
    })
  .catch( function( error ) {
      console.log( "an error has occurred " + error.message );
    });

}

function test(){
	var userObjectId = Backendless.LocalCache.get("current-user-id");
	alert(userObjectId);
}


function getMedical(){

	var userObjectId = Backendless.LocalCache.get("current-user-id");
	var whereClause = "ownerId = '" + userObjectId + "'";
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    Backendless.Data.of("patient").find(queryBuilder).then(processSetResults).catch(error);

    function processSetResults(devices){

		for (var i = 0; i < devices.length; i++){
		document.getElementById("PdateOfBirth").innerHTML=devices[i].dateOfBirth;
		document.getElementById("PfullName").innerHTML=devices[i].firstName + " " + devices[i].lastName;
		document.getElementById("PbloodType").innerHTML=devices[i].bloodType;
		document.getElementById("PmedInfo1").innerHTML=devices[i].medicalInfo1;
		document.getElementById("PmedInfo2").innerHTML=devices[i].medicalInfo2;
		document.getElementById("PmedInfo3").innerHTML=devices[i].medicalInfo3;
	}
	
}

function error(err) {
        alert("fail: " + error);
    }
	
//
}


function getCode(){
	var userObjectId = Backendless.LocalCache.get("current-user-id");
	new QRCode(document.getElementById("qrcode"), userObjectId);

}

function myPFunction() {
  var txt;
  swal("Enter Pin:", {
  content: "input",
  })
  .then((value) => {
  var PIN = value;
    if (PIN == null || PIN == "") {
    txt = "User cancelled the prompt.";
  } else {
    var PID = document.getElementById("PID").value;
    var whereClause = "ownerId = '" + PID + "'";
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    Backendless.Data.of("patient").find(queryBuilder).then(processSetResults).catch(error);


    function processSetResults(devices){
      

    for (var i = 0; i < devices.length; i++){
    var intPPIN=parseInt(devices[i].patientPin);
    var userPIN=parseInt(PIN);

    if(userPIN==intPPIN){
    document.getElementById("PdateOfBirth").innerHTML=devices[i].dateOfBirth;
    document.getElementById("PfullName").innerHTML=devices[i].firstName + " " + devices[i].lastName;
    document.getElementById("PbloodType").innerHTML=devices[i].bloodType;
    document.getElementById("PmedInfo1").innerHTML=devices[i].medicalInfo1;
    document.getElementById("PmedInfo2").innerHTML=devices[i].medicalInfo2;
    document.getElementById("PmedInfo3").innerHTML=devices[i].medicalInfo3;
    document.getElementById("row1").hidden=false;
    document.getElementById("row2").hidden=false;
    document.getElementById("qrimage").hidden=true;
    document.getElementById("PID").hidden=true;
  }else{swal("Uh oh!", "That is not the correct pin", "error");}
  }
  

} 


function error(err) {
        alert("fail: " + error);
    }
  
//
}


  });

}

function logout(){

  Backendless.UserService.logout()
   .then( userLoggedOut )
   .catch( gotError );

function userLoggedOut()
{
  console.log( "user has been logged out" );
  localStorage.setItem('li', "");
  window.location.href = "index.html";

}

function gotError( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}

}



document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) 
{
   file = evt.target.files[0]; // FileList object
}

function uploadFileFunc()
{
  var callback = {};

   callback.success = function(result)
   {

   }

   callback.fault = function(result)
   {
       alert( "error - " + result.message );
   }

   Backendless.Files.upload( file, "my-folder" )
    .then( function( fileURLs ) {
       console.log( "File successfully uploaded. Path to download: " + result.fileURL );
     })
    .catch( function( error ) {
       console.log( "error - " + error.message );
     });
}

function patientScan(){
cordova.plugins.barcodeScanner.scan(
      function (result) {
            document.getElementById("PID").value = result.text;
            myPFunction();
          
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : false, // iOS and Android
          showTorchButton : false, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
};
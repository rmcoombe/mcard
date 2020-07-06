//Initialising connection to backendless
Backendless.initApp('0B256F0F-9791-937D-FF66-C8FAAB3E8600', 'BA8410D6-25F5-44D9-8E28-100D07959744' );
const PAGE_SIZE = 80

const dataQuery = Backendless.DataQueryBuilder.create().setPageSize(PAGE_SIZE)
//---------------------------------------------------------------------------------------------------


//-------Event Listeners and actions-------------------//
document.addEventListener("DOMContentLoaded", function() {
    //getPrinters();
	//getPractices();
	//getDropdown();
});



//-----Creation of Practices, Devices and Printers-----------//
function addWheel(){
	var wheelNo = document.getElementById("wheelNumber").value;

	
	var Wheelentry = {
        wheelNumber: wheelNo

    }
	
Backendless.Data.of( "wheel" ).save( Wheelentry )
  .then( function( savedObject ) {
  	  document.getElementById("wheelNumber").value ="";
      console.log( "Wheel Added" );
    })
  .catch( function( error ) {
      console.log( "an error has occurred " + error.message );
    });

}




//Function to add a practice to backendless
function createSet(){
	var setString = document.getElementById("setNo").value;
	var wheelNoString = document.getElementById("wheelNumber").value;
	var tpmNoString = document.getElementById("tpmNumber").value;
	var position = document.getElementById("postion").value;

	var wheelNo = parseInt(wheelNoString, 10);
	var tpmNo = parseInt(tpmNoString, 10);
	var set = parseInt(setString,10)
	var setTable="set"+ set;

	console.log(set);

	var setEntry = {
		set_no: set,
        wheel_No: wheelNo,
        tpm_no: tpmNo,
        position: position,
    }
    Backendless.Data.of( setTable ).save( setEntry )
  .then( function( savedObject ) {
  	  document.getElementById("wheelNumber").value ="";

      console.log( "Set Added" );
      alert("Added to set "+ set)
      location.reload();
    })
  .catch( function( error ) {
      console.log( "an error has occurred " + error.message );
    });

}



//----End of creation section------------------------------------------------------------------------//


//----Start of Retreival Section -------------------------------------------------------------------//


//Function to get the drop down lists on each page

function getSet() {
	var searchSet = "set1";
	var wheelNumber = document.getElementById("wheelNumber").value
	var whereClause = "wheel_no = '" + wheelNumber + "'";
	var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
	queryBuilder.setPageSize( 50 );
    Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
    x=2

    function processSetResults(devices){
    	var table = document.getElementById("table");

		for(var i = table.rows.length - 1; i > 0; i--)
		{
			table.deleteRow(i);
		}

	if (devices.length < 1 && x == 2 ){
		searchSet="set2";
		Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
		x++;
		
	} else if (devices.length < 1 && x == 3 ){
		searchSet="set3";
		Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
		x++;
	}
	else if (devices.length < 1 && x == 4 ){
		searchSet="set4";
		Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
		x++;
	}
	else if (devices.length < 1 && x == 5 ){
		searchSet="set5";
		Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
		x++;

	}
	else if (devices.length < 1 && x == 6 ){
		searchSet="set6";
		Backendless.Data.of(searchSet).find(queryBuilder).then(processSetResults).catch(error);
		x++;
	}
		else if (devices.length < 1 && x == 7 ){
			alert("Wheel not associated with any set");
	}
		 




	for (var i = 0; i < devices.length; i++){
		var obID = devices[i].objectId;
		var foundSet = devices[i].set_no;
		document.getElementById('obID').innerHTML = obID;
		document.getElementById('foundSet').innerHTML = foundSet;
		var table = document.getElementById("table");
		
		
		var row = table.insertRow(1);
		var cell6 = row.insertCell(0);
		var cell5 = row.insertCell(0);
		var cell4 = row.insertCell(0);
		var cell3 = row.insertCell(0);
		var cell2 = row.insertCell(0);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = devices[i].set_no;
		cell2.innerHTML = devices[i].wheel_no;
		cell3.innerHTML = devices[i].position;
		cell4.innerHTML = devices[i].tpm_no;
		cell5.innerHTML = devices[i].tyre_no;
		cell6.innerHTML = devices[i].weight;
	}
	
}

function error(err) {
        alert("fail: " + error);
    }
	
//
}

function updateWheel(){


	var obID = document.getElementById("obID").innerHTML;
	var foundSet = document.getElementById("foundSet").innerHTML;
	var updateSet = "set"+foundSet;
	var tyreString = document.getElementById("tyreNumber").value;
	var weightString = document.getElementById("weight").value;

	var tyre = parseInt(tyreString,10);
	var weight = parseInt(weightString,10);
	console.log(obID);


	var wheelSet = {
    objectId:obID,
    tyre_no: tyre,
    weight:weight,
}

Backendless.Data.of( updateSet).save( wheelSet )
  .then( function( savedObject ) {
      console.log( "Wheel has been updated" );
      getSet();
    })
  .catch( function( error ) {
      console.log( "an error has occurred " + error.message );
    });

}

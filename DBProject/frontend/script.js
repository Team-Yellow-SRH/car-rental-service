const carDets = document.getElementById('carDets');

async function findCars(e){
    e.preventDefault();

    if(longitude.value=='' || Latitude.value==''){
        alert("Enter Coordinate");
        return 0;
    }

    const sendBody ={

    }

    const res = await fetch("/",{
        'method':'POST',
        'headers':{
            'Content-Type':'application/json'
        },
        'body': JSON.stringify(sendBody)
    })

    var cars = await findCars();

}

async function getCars(){
    const res = await fetch('/');
    const data = await res.json();

    return data (cars=>{
        return{
            'Latitude':cars.Latitude,
            'longitude':cars.longitude
        }
    })
    var location = await res.json();
    var cars = await getCars();

    var latitude1 = location.Latitude;
    var longitude1 = location.longitude;

    for (var vol of cars){
        var latitude2 = vol.Latitude;
        var longitude2 = vol.longitude;
        var dis = calcCulateDistinces(latitude1,longitude1,latitude2,longitude2);
        vol.dispance = dis;
    }
    cars.sort((car1,car2)=>(car1.distance > car2.distance)? 1:-1);
}


document.querySelector('#find').addEventListener('click', fetchTest);


function calcCulateDistinces(lat1, lon1, lat2, lon2) {

    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
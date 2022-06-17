const path = require('path');
const express = require('express');
const cors = require('cors');
const route = express.Router();

//^ mongoDB connections
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017';
const { MongoClient } = require('mongodb');
const client = new MongoClient(mongoURI);
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
        console.log('Connection has been done!');
    }).on('error', function(error){
        console.log('Error is: ', error);
});
// remove the below line if it doesn't affect the working of the code
const { calculateObjectSize } = require('bson');

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const app= express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// app.get('/',(req,res)=>{
//     res.send("hi!");
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'frontend')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.post('/car', async(req,res)=>{
    let suspectedAccident=[];
    let carLongitude = req.body,longitude;
    let carLatitude = req.body.Latitude;
    let carColor = req.body.color;
    let driverDate = new Date(req.body.date);
    await client.connect();
    let filter ={};
    const db = client.db('car_rental');

    async function path(){
            const allCars = await find().toArray();
            allCars.forEach(async (accident)=>{
                const Starting = new Date(accident.start_date);
                const Ending = new Date(accident.end_date);

            if(driverDate >= Starting && driverDate <= Ending){
                suspectedAccident.push(accident);
            }
        })
        suspectedAccident.forEach(async accident=>{
            if(checkAccident(accident,carLatitude,carLongitude)){
                console.log("================");
                pathMatched.push(accident);
            }
            const carsColl = db.collection("Cars");
        for(let i=0;i<pathMatched.length;i++){
            const _id = pathMatched[i]._id;
            const car = await carsColl.findOne({_id:_id});
            pathMatched[i].car = car;
            }
        })

        async function getCars(){
            const res = await fetch('/');
            const data = await res.json();
        
            // return data (cars=>{
            //     return{
            //         'Latitude':cars.Latitude,
            //         'longitude':cars.longitude
            //     }
            // })
            var cars = await getCars();
        
            var latitude1 = location.Latitude;
            var longitude1 = location.longitude;
        
            for (var vol of cars){
                var latitude2 = vol.Latitude;
                var longitude2 = vol.longitude;
                   CulateDistinces<locationfield>{
                    $near:{
                        $geometry:{

                            type:"Point",
                            coordinates:[Latitude2,longitude2] 
                        },
                        $maxDistance:1000,
                        $minDistance:0
                    },
                }
                vol.dispance = dis;
            }
            cars.sort((car1,car2)=>(car1.distance > car2.distance)? 1:-1);
        }
        console.log(cars.sort);
        res.send(pathMatched);
    }
})

// function calcCulateDistinces(lat1, lon1, lat2, lon2) {

//     var R = 6371; // km
//     var dLat = toRad(lat2-lat1);
//     var dLon = toRad(lon2-lon1);
//     var lat1 = toRad(lat1);
//     var lat2 = toRad(lat2);

//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     var d = R * c;
// return d;
// }


app.route('/').post(async function(req,res){
    try{
        // const longitude =await 
    }
    catch{
        
    }
})




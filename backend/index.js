const express = require('express')
const cors = require('cors')
//neo4j connection
const neo4j = require('neo4j-driver');
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '1234';
const driver = neo4j.driver(uri, neo4j.auth.basic(user,password));

const app = express()
app.use(cors())
app.use(express.json())

const serStn =    [{
    "service station id":1,
    "Sevice station Name":"Parrnell",
    "Longitutde":8.65513,
    "Latitutde":49.41423,
    "Capacity":49
 },
 {
    "service station id":2,
    "Sevice station Name":"Karita",
    "Longitutde":8.46564,
    "Latitutde":49.48695,
    "Capacity":43
 },
 {
    "service station id":3,
    "Sevice station Name":"Dena",
    "Longitutde":8.55901,
    "Latitutde":49.45407,
    "Capacity":24
 },
 {
    "service station id":4,
    "Sevice station Name":"Morty",
    "Longitutde":-58.5069115,
    "Latitutde":-34.6093426,
    "Capacity":23
 }];

 const carRen = [{
    "CarRental_id":1,
    "CarRental_Name":"Krisha",
    "Longitude":8.65791,
    "Latitude":49.41253
 },
 {
    "CarRental_id":2,
    "CarRental_Name":"Olin",
    "Longitude":8.46993,
    "Latitude":49.48399
 },
 {
    "CarRental_id":3,
    "CarRental_Name":"Redford",
    "Longitude":-80.5443489,
    "Latitude":43.4426097
 },
 {
    "CarRental_id":4,
    "CarRental_Name":"Clarinda",
    "Longitude":121.0697978,
    "Latitude":14.7040142
 },
 {
    "CarRental_id":5,
    "CarRental_Name":"Sibeal",
    "Longitude":-65.5381671,
    "Latitude":-25.1042007
 },
 {
    "CarRental_id":6,
    "CarRental_Name":"Jayson",
    "Longitude":121.2769483,
    "Latitude":-8.6969761
 }];
// //mongodb connection
// const mongoURI ='mongodb://localhost:27017';
// const {calculateObjectSize} = require('bson');
// const {MongoClient} = require('mongodb');
// const client = new MongoClient(mongoURI);

//testing
app.get('/', (req,res) => {
    res.send('Api is running...')
})

// getting data from frontend for finding nearby rental centre
app.post('/nearby_rental_centre', async(req, res) => {
    const {lat, lon} = req.body;
    console.log(lat, lon);
    const session = driver.session();
    const distances1 =[];
    const distances2 =[];

    //for(let i=0;i<carRen.length;i++){
    const ses1 = await session.run(`MATCH (p:carRental), (x:serviceCentre)
    WITH point({longitude:toFloat(p.longitude), latitude:toFloat(p.latitude)}) as p1, point({ongitude:toFloat(x.Longitutde),latitude:toFloat(x.Latitude)}) as p2,p
    WITH p,p1,p2,point.distance(p1,p2)/1000 as d
    WHERE d<10
    return p1 ,d ,p.name`);
        distances1.push(await ses1.records[0]._fields[1]);
        distances2.push(await ses1.records[0]._fields[2]);
   // }
   // console.log(distances1);
    console.log(distances2);
    await session.close();
    res.json(distances1);

})

// getting data from frontend for finding nearby service centre
app.post('/nearby_service_centre', async(req, res) => {
    const {lat, lon} = req.body;
    console.log(lat, lon);
    const session = driver.session();
    const distances =[];
    const ses = await session.run(`MATCH (p:serviceCentre)
    WITH point({longitude:toFloat(p.longitude), latitude:toFloat(p.latitude)}) as p1, point({longitude:toFloat(${lon}),latitude:toFloat(${lat})}) as p2,p
    WITH p,p1,p2,point.distance(p1,p2)/1000 as d
    WHERE d < 50
    return  d,p.name`);
        distances.push(await ses.records[0]._fields[1]);
    await session.close();
    res.json(distances);

})


app.listen(process.env.PORT || 4000, () => console.log('Server is running on port 4000'))


//car location : cal.lat car.lon


//service centres: [sr1:{lat,lon}}, sr2{},sr3]


// mongowriteData(shortestDistance)
// {
//     client.connect();
//     const db = client.db('CarRental');
//     const collU = db.collection('UserTrip');

//     const result= await collU.insertOne(shortestDistance);

// }


// mongwriteData(result)
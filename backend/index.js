
const express = require('express')
const cors = require('cors')


<<<<<<< Updated upstream
=======
//neo4j connection
const neo4j = require('neo4j-driver');
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '1234';
const driver = neo4j.driver(uri, neo4j.auth.basic(user,password));
>>>>>>> Stashed changes

const app = express()
app.use(cors())
app.use(express.json())

<<<<<<< Updated upstream

//testing
app.get('/', (req,res) => {
    res.send('Api is running...')
})

// getting data from frontend
app.post('/nearby_service_center', async(req, res) => {
    console.log(req.body);
})


app.listen(process.env.PORT || 4000, () => console.log('Server is running on port 4000'))
=======
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



// getting data from frontend
app.post('/nearby_service_center', async(req, res) => {
    console.log(req.body);
app.post('/nearby_rental_center', async(req, res) => {
    const {lat, lon} = req.body;
    console.log(lat, lon);
    const session = driver.session();
    const distances =[];
    for(let i=0;i<serStn.length;i++){
    const ses = await session.run(`MATCH (p:person)
    WITH point({longitude:toFloat(p.longitude), latitude:toFloat(p.latitude)}) as p1, point({longitude:toFloat(${serStn[i].Latitutde}),latitude:toFloat(${lat})}) as p2,p
    WITH p,p1,p2,point.distance(p1,p2)/1000 as d
    WHere d<50
    return p1,d, p.carId`);
        distances.push(await ses.records[0]._fields[1]);
    }
console.log(ses);
    await session.close();
    res.json(distances);

})


app.listen(process.env.PORT || 4000, () => console.log('Server is running on port 4000'))
app.listen(process.env.PORT || 4000, () => console.log('Server is running on port 4000'))



>>>>>>> Stashed changes

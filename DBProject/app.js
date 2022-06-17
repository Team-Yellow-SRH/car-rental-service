const res = require('express/lib/response');
const { request } = require('express');
const axios = require('axios');
const express = require('express');
const  RedisClient= require('redis').createClient();const app = express();
 let i=0;

const {MongoClient}= require('mongodb');

 const mongoURI = 'mongodb://localhost:27017';

 const client = new MongoClient(mongoURI);
 const db = client.db('CarCo-ordinates');

app.use(express.json());
app.use(express.static("www"));

async function mongoWriteData(data){
    var lat = data.latitude;
    var lon=  data.longitude;
    await client.connect();
    const coll = db.collection('location');
    await coll.insertOne({latitude:lat,longitude:lon})
}


async function fetchData(){
    const reply= await axios.get('http://api.open-notify.org/iss-now.json');
    const data = JSON.stringify(reply.data.iss_position);
    storeData(data);
}



async function storeToMongo(){
    await RedisClient.connect();
    const posStack=[];
    const response = await RedisClient.keys('*');
     for(let j=0; j<response.length;j++){
        const position = JSON.parse(await RedisClient.get(`pos${j}`));
        console.log(`position${j}=lat:${position.latitude}, long:${position.longitude}`);
        posStack.push(position);
     }
     posStack.forEach((data)=>{
        mongoWriteData(data);
        console.log(data)
     })


     RedisClient.disconnect();
}



setTimeout(storeToMongo,10000);


async function redisGetData(){
    await RedisClient.connect();
    const result= await RedisClient.get('pos0');
    const data= JSON.parse(result);
    // console.log(data);
    RedisClient.disconnect();
}
async function storeData(reply){
    await RedisClient.connect();
    await RedisClient.set(`pos${i}`, reply);
    RedisClient.disconnect();
    console.log(`pos${i} Data written`);
    i++;
    
}

// redisGetData();
setInterval(fetchData,1000);
app.listen(3000);




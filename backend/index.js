const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const Centres = require('./serviceCentre');

mongoose.connect('mongodb+srv://vivek:567567@adbcases.xp5nbgp.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log('DB connected');
}).catch(err => {
    console.log('DB not connected');
})



const app = express()
app.use(cors())
app.use(express.json())

function middleware(req, res, next) {
    // console.log(req.nearestCentres);
    // console.log("hit there");
    next();
}


//testing
app.get('/', (req,res) => {
    res.send('Api is running...')
})

// getting data from frontend
app.post('/nearby_service_centre', middleware, async(req, res) => {
    // console.log(req.body);
    const lat = parseFloat(req.body.lat)
    const long = parseFloat(req.body.long)
    console.log(lat, long);
    const options = {
        location: {
            $geoWithin: {
                $centerSphere: [[lat, long], 200/3963.2]
            }
        }
        // location: {
        //     $nearSphere: {
        //         $geometry: {
        //             type: "Point",
        //             coordinates: [ 50.6548909, 24.44218 ]
        //         },
        //         $maxDistance: 5 * 1609.4
        //     }
        // }
    }

    Centres.find(options).then(data => {
        const nearestCentres = data.map((i)=>{
            return {Title: i.title, Contact: i.address} 
        })

        console.log(nearestCentres);

        // // sending list to client
        // app.get('/service_centres_list', cors(), async (req,res) => {
        //     res.send(nearestCentres)
        //     console.log("been hit!");
        // })
    })

    
})

// sending list to client
app.get('/service_centres_list', middleware, cors(), async (req,res) => {
    res.send(list)
    console.log(list);
})


app.listen(4000, () => console.log('Server is running on port 4000'))
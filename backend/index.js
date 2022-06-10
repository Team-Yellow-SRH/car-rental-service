const express = require('express')
const cors = require('cors')



const app = express()
app.use(cors())
app.use(express.json())


//testing
app.get('/', (req,res) => {
    res.send('Api is running...')
})

// getting data from frontend
app.post('/nearby_service_center', async(req, res) => {
    console.log(req.body);
})


app.listen(process.env.PORT || 4000, () => console.log('Server is running on port 4000'))
import React from 'react'
import axios from 'axios'

export const Replacement = () => {

  const nearbyServiceCenterUrl = 'http://localhost:4000/nearby_service_center'

  const submit = async (e) => {
    e.preventDefault();
    try{
        axios.post(url, {
            name: data.lat,
            email: data.long,
        })
        .then(res => {
              console.log(res.data)
        })
    }catch(error){

    }
    // console.log(data);

    // clear form
    // e.target.reset()
  }

  
  return (
    <div>Replacement</div>
  )
}

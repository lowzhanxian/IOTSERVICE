const express = require('express');
const router = express.Router();
const Device = require('../models/Todos')

// Get All Todo route
router.get('/', async (req, res) => {
  const device = await device.find();
  res.json(device)
})

// Create new Todo
router.post('/new', async (req, res) => {
  
  const newDevice = new Device(
    req.body // What the Vue App is sending
   /*{ 
       name: "Jsob",
      serialNumber: "879621",
      location:"grandplace",
      type:"energy",
      status:"active",
      } */
  ); 
  const savedDevice = await newDevice.save() // mongo save method
  res.json(savedDevice) 
});

// Getter by id
router.get('/get/:id', async (req, res) => {
  const t = await Device.findById({ _id : req.params.id })
  res.json(t)
})

// Delete a todo by id
router.delete('/delete/:id', async (req, res) => {
  const tDelete = await Device.findByIdAndDelete({ _id : req.params.id })
  res.json(tDelete)
})

// Update a todo by id
router.put('/update/:id', async (req, res) => {
  const tUpdate = await Device.updateOne(
    { _id: req.params.id }, 
    
    { $set: req.body }
    /* {
      name: "Jsoaa",
      serialNumber: "879621",
      location:"grandplace",
      type:"energy",
      status:"active"
      }*/
  )
  res.json(tUpdate)
})



module.exports = router
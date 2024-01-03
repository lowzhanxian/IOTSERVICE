
  
const mongoose = require('mongoose')
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Device name is required'] },
  serialNumber: { type: String, required: [true, 'Serial number is required'] },
  location: { type: String, required: [true, 'Location is required'] },
  type: { type: String, required: [true, 'Device type is required'] },
  status: { type: String, required: [true, 'Device status is required'] }},
  
  { versionKey: false });

module.exports = mongoose.model('device', deviceSchema, 'device');

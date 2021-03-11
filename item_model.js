const mongoose = require('mongoose');

 const nDate = new Date().toLocaleString('ap-south', {
    timeZone: 'Asia/Calcutta'
  });
 
var IventoryItemSchema =  new mongoose.Schema({
    name:{type: String ,required: true, minlength:3},
    description:{type: String }, 
    stock: { type: Number ,required: true},
    amount:{type:Number,required: true},
    _time :{type:Date, default:nDate}
});
 
mongoose.model('IventoryItem',IventoryItemSchema);
var IventoryItem = mongoose.model('IventoryItem'); 
exports.IventoryItem = IventoryItem;

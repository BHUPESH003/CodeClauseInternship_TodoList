const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please choose a appropriate username"],
  },
  status: {
    type: String,
    required: [true, "Please add the email"],
  },
  
},{
    timestamps:true,
});


module.exports=mongoose.model("Todo",todoSchema);
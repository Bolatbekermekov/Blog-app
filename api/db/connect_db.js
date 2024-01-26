import mongoose from "mongoose"
const connect_db = (url)=>{
  return mongoose.connect(url)
  .then(console.log("Connected to DB"))
  .catch(err=>console.log(err))
}

export default connect_db
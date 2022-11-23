const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./routes/UserRoutes");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/netflix",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connected successfully")
})

app.use("/api/user",userRouter);

app.listen(port,console.log("server started "));
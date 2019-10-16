const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/Items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
//"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
//"heroku-postbuild": "cd client && npm install && npm run build"
// const express = require("express");
// const mongoose = require("mongoose");
// //const bodyParse   "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"r = require("body-parser");
// const app = express();
// const path = require("path");
// const config = require("config");
// console.log("gooooddddddd");
// //const cors = require("cors");
// //body parser middleware
// //require("dotenv").config();
// //app.use(cors());
// //app.use(bodyParser.json());
// app.use(express.json());
// //const items = require("./routes/api/items");
// //DB config
// //const db = require("./config/keys").mongoURI;
// const db = config.get("mongoURI");
// //console.log(typeof db);
// //connect to mongo db
// //const db = process.env.MONGODB_URI;
// mongoose.connect(db,{ useNewUrlParser: true , useCreateIndex: true})
// .then(()=> console.log("Mongodb connected..."))
// .catch(err => console.log(err));
// //use Rotes
// app.use("/api/items",require("./routes/api/items"));
// app.use("/api/users",require("./routes/api/users"));
// app.use("/api/auth",require("./routes/api/auth"));

// //serve static asset if in production
// if (process.env.NODE_ENV === "production") {
//     //set static folder
//     app.use(express.static("client/build"));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname, "client","build","index.html"));
//     })
// }

// const port = process.env.PORT||5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");

const URL = require("./models/url");
const { connectToMongoDB } = require("./connection");

//routes are imported form the respective files.
const urlRoute = require("./routes/url");
const StaticRoute = require("./routes/StaticRouter.js")
const userRoute=require("./routes/user.js");
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly}=require("./middleware/auth.js")


const path = require("path");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Mongodb connected")
);

app.set('view engine',"ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//Routes are register here.
app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/",StaticRoute);
app.use("/user",userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT 8001`));

const express = require("express");
require("dotenv").config();
const axios = require("axios");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const cors = require("cors");
const schema = require("./server/schema");
const Models = require("./server/models");
const uploads = require("./server/libs/upload");
const FB_APP_ID = "263737057613276";
const FB_APP_SECRET = "345489f7577505d45467d560824655d7";
// const { generatePdf } = require("./server/libs/makepdf");


const app = express();

mongoose.connect(
  "mongodb://tuhin:abtuhin2011@ds131973.mlab.com:31973/golpokotha"
);
mongoose.connection.once("open", () => {
  console.log("DB connection to mLab successful");
});

app.use(cors("*"));

app.use(
  session({
    secret: "abgolpoonkosa",
    resave: true,
    saveUninitialized: true
  })
);

const fbOptions = {
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: "http://localhost:4000/auth/facebook/callback"
};

fbCallback = async (accessToken, refreshToken, profile, cb) => {
  const { id, displayName } = profile;
  try {
    let response = await axios.get(
      `https://graph.facebook.com/me?fields=id,picture{url},birthday,gender,name`,
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    const fbUser = await Models.User.find({ userId: id });
    if (!fbUser.length) {
      const user = new Models.User({
        userId: id,
        name: response.data.name,
        dateOfBirth: new Date(response.data.birthday).toISOString(),
        profileImage: response.data.picture.data.url,
        gender: response.data.gender,
        token: accessToken
      });
      await user.save();
    } else {
      const user = await Models.User.findOneAndUpdate(
        { userId: id },
        { token: accessToken }
      );
    }
    cb(null, profile);
  } catch (e) {
    console.log(e);
  }
};

app.use("/", express.static(path.join(__dirname)));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(fbOptions, fbCallback));

app.get("/favicon.ico", (req, res) => res.status(204));
app.get(
  "/flogin",
  passport.authenticate("facebook", {
    scope: ["email", "user_gender", "user_birthday"]
  })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.redirect("/graphql");
  }
);

const authMiddleWare = async (req, res) => {
  const token = req.headers.authorization;
  const user = await Models.User.findOne({ token: token });
  req.user = user;
  req.next();
};

app.use(authMiddleWare);

app.post("/upload", uploads.upload.single("imageUrl"), async (req, res) => {
  // check if user is authenticated
  res.send({ imageUrl: req.file.filename });
});

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    context: {
      Models: Models,
      user: req.user
    },
    graphiql: true
  }))
);

app.listen(process.env.PORT || 4000, () => {
  console.log("app running up and running");
});

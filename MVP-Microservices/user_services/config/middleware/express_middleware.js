const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
// const { createChannel } = require("../rabbitmq/index");
const userController = require("../../controller/user");
module.exports.expressMiddleware = async (app) => {
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(
    session({
      secret: "intelliblock_bnz_now_carbon_green",
      cookie: { maxAge: 60000 * 30 },
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(__dirname + "/public"));
  app.use(passport.initialize());
  app.use(passport.session());
  // const channel = await createChannel();
  // userController(channel);
};

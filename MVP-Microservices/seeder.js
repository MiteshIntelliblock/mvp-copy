const connectDB = require("./config/database/db");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const dotenv = require("dotenv");
dotenv.config();

connectDB();

const listOfUser = [
  {
    emailId: "balajee@intelliblock.com",
    password: "superadmin123@intelliblock",
    role: "superAdmin"
  }
];

const seeder = async () => {
  await User.deleteMany({ role: "superAdmin" });
  for (let i = 0; i < listOfUser.length; i++) {
    const newuser = new User({ ...listOfUser[i] });
    const salt = await bcrypt.genSalt(12);
    newuser.password = await bcrypt.hash(listOfUser[i].password, salt);
    await newuser.save();
  }
  console.log("operation done");
};
seeder();

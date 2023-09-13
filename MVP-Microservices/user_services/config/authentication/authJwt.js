const jwt = require("jsonwebtoken");
const JWT_ACC_ACTIVATE = "usingtokenforauthentication";
const User = require("../../models/user");
// module.exports.verifyToken = (req, res, next) => {
//   let token = req.headers["authorization"];
//   if (!token) {
//     return res.status(404).json({ message: "No token provided" });
//   }
//   jwt.verify(token, JWT_ACC_ACTIVATE, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Unauthorized user!" });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

module.exports.verifySuperAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && user.role == "superAdmin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized user!" });
  }
};

module.exports.verifier = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && (user.role == "verifier" || user.role == "superAdmin")) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized user!" });
  }
};

module.exports.admin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && (user.role == "admin" || user.role == "superAdmin")) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized user!" });
  }
};

module.exports.checkCompany = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && user.userType == "company") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized user!" });
  }
};

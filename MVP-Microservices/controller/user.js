const User = require("../models/user");
const bcrypt = require("bcrypt");
const AppError = require("../controlError/AppError");
const imageUploading = require("../helper/imageuploading");
const { publishMessage, createChannel } = require("../config/rabbitmq/index");
const customStatuandError = require("../controlError/httpStatusandError");
const { authSchema } = require("../helper/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helper/jwt_helper");
const error = customStatuandError();
const logger = require("../logger/index");
const { verifyToken } = require("../helper/jwt_helper");
const { randomkeygenerator } = require("../helper/stringGenerator");
require("dotenv").config();
let channel;

function userController(ch) {
  if (ch) {
    channel = ch;
  }
  const registerUser = async (req, res, next) => {
    const { emailId, password, userType } = req.body;
    try {
      await authSchema.validateAsync({ emailId, password });
      let user = await User.findOne({ emailId });
      if (user) {
        return next(new AppError(customStatuandError("user")["409"], 409));
      }
      // CREATING NEW USERR
      user = new User({
        emailId,
        password,
        userType,
      });

      const registerUser = await user.save();

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      // user.refreshTokenDetail.token =  refreshToken;

      return res.status(201).json({ registerUser, accessToken, refreshToken });
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      if (err.isJoi === true) {
        err.status = 422;
        throw new AppError(
          "password should be combination of at least one numeric digit, atleast one uppercase and one lowercase letter, and one special character",
          422
        );
      }
      next(err);
      // throw new AppError(error["500"], 500);
    }
  };

  const loginUser = async (req, res, next) => {
    try {
      let loginResult;
      const { emailId, password } = req.body;
      // await authSchema.validateAsync({ emailId, password });
      const user = await User.findOne({ emailId });
      if (!user) {
        return next(new AppError("Please enter correct credentials", 401));
      }

      if (!user.googleId) {
        loginResult = await user.isValidPassword(password);
      }
      if (loginResult || user.googleId) {
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        return res.status(200).json({
          message: "you are Logged In",
          accessToken,
          refreshToken,
          emailId,
          fullName: user.fullName,
          userType: user.userType,
          user,
        });
      } else {
        return res
          .status(404)
          .json({ message: "Please enter the correct credential" });
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      if (err.isJoi === true) {
        err.status = 422;
        throw new AppError("Please enter correct credentials", 422);
      }
      // throw new AppError(error["500"], 500);
      next(err);
    }
  };

  const logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return next(new AppError(error["401"], 401));
      const userId = await verifyRefreshToken(refreshToken);
      if (!userId) {
        return next(new AppError(error["500"], 500));
      }
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "refreshTokenDetail.token": null,
            "refreshTokenDetail.expiresAt": null,
          },
        },
        { new: true }
      );
      if (user) {
        return res
          .status(200)
          .json({ message: "You are loggedout successfully" });
      } else {
        return next(new AppError(error["500"], 500));
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      next(err);
    }
  };

  const allUser = async (_, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const currentUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return next(new AppError(error["500"], 500));
      }
      return res.status(200).json({ user });
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const checkingUserWithEmail = async (req, res, next) => {
    try {
      const { emailId } = req.body;
      const user = await User.findOne({ emailId });
      const payload = {
        event: "FIND_USER",
        data: { user },
      };
      const channel = await createChannel();
      const PROJECT_SERVICE = process.env.PROJECT_SERVICE;
      await publishMessage(channel, PROJECT_SERVICE, JSON.stringify(payload));
      if (!user) {
        return next(new AppError(customStatuandError("user")["404"], 404));
      }
      return res.status(200).json({ message: "User Existing" });
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const addPicture = async (req, res) => {
    try {
      const { userId } = req;
      await User.findByIdAndUpdate(
        userId,
        { profilePicture: req.file.filename },
        { new: true }
      );
      return res.status(200).json({ message: "Profile Picture added" });
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const resetPassword = async (req, res, next) => {
    const { usercredentialchecked, emailId, password } = req.body;
    try {
      if (!usercredentialchecked) {
        // await authSchema.validateAsync({ emailId, password });
        const user = await User.findOne({ emailId });
        const loginResult = await bcrypt.compare(password, user.password);
        if (loginResult) {
          return res.status(200).json({ message: "Please enter new password" });
        } else {
          return next(new AppError("Please enter correct credentials", 401));
        }
      } else {
        try {
          // await authSchema.validateAsync({ password });
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.findByIdAndUpdate(req.userId, {
            password: hashedPassword,
          });
          return res.status(200).json({ message: "Password reset successful" });
        } catch (err) {
          if (err.isJoi === true) {
            err.status = 422;
            throw new AppError(
              "password should be combination of at least one numeric digit, one uppercase or lowercase letter, and one special character",
              422
            );
          }
          throw new AppError(error["500"], 500);
        }
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      if (err.isJoi === true) {
        err.status = 422;
        throw new AppError("Please enter correct credentials", 422);
      }
      throw new AppError(error["500"], 500);
    }
  };

  const newUserForKyc = async (_, res) => {
    const newuserforverification = await User.find({
      $and: [
        { "userKyc.proofOfAddress.url": { $ne: null } },
        { "userKyc.proofOfIdentity.url": { $ne: null } },
        { "userKyc.bankDetails": { $ne: null } },
        { "userKyc.passportsizephoto.url": { $ne: null } },
        { verificationdone: false },
      ],
    });
    if (!newuserforverification) {
      throw new AppError("No new user applied for kyc", 404);
    }
    return res.status(200).json({ newuserforverification });
  };

  const newCompanyForKyc = async (_, res) => {
    const newuserforverification = await User.find({
      $and: [
        { "companyKyc.proofOfIdentity.url": { $ne: null } },
        { "companyKyc.certification.url": { $ne: null } },
        { "companyKyc.bankDetails": { $ne: null } },
        { verificationdone: false },
      ],
    });
    if (!newuserforverification) {
      throw new AppError("No new company applied for kyc", 404);
    }
    return res.status(200).json({ newuserforverification });
  };

  const kycForUserProcess = async (req, res, next) => {
    try {
      const { proofOfAddress, proofOfIdentity, passportsizephoto } = req.query;
      const { aadharNo, panNo } = req.body;
      // const imagePath = req.file.destination + "/" + req.file.filename;
      const imageResponse = await imageUploading({
        imageName: req.file.filename,
        proofOfAddress,
        proofOfIdentity,
        passportsizephoto,
        userId: req.userId,
        aadharNo,
        panNo,
      });
      // if (imageResponse) {
      //   fs.unlink(imagePath, (err) => {
      //     if (err) {
      //     } else {
      //     }
      //   });
      if (imageResponse) {
        return res
          .status(200)
          .json({ message: "Document Uploaded Successfully" });
      }
      return next(new AppError("Something went wrong. Please try again!", 500));
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const kycForCompanyProcess = async (req, res, next) => {
    try {
      const {
        proofOfIdentityforcompany,
        certification,
        moa,
        aoa,
        boardResolution,
      } = req.query;
      const imageResponse = await imageUploading({
        imageName: req.file.filename,
        proofOfIdentityforcompany,
        certification,
        moa,
        aoa,
        boardResolution,
        userId: req.userId,
      });
      if (imageResponse) {
        return res
          .status(200)
          .json({ message: "Document Uploaded Successfully" });
      } else {
        return next(
          new AppError("Something went wrong. Please try again!", 500)
        );
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const verifykyc = async (req, res) => {
    const {
      id,
      proofOfAddress,
      proofOfIdentityforuser,
      userVerified,
      proofOfIdentityforCompany,
      certification,
      moa,
      aoa,
      boardResolution,
      companyVerified,
    } = req.query;
    const user = await User.findById(id);
    if (proofOfAddress) {
      user.userKyc.proofOfAddress.status = true;
      await user.save();
      return res.status(200).json({ message: "Proof of Address verified" });
    } else if (proofOfIdentityforuser) {
      user.userKyc.proofOfIdentity.status = true;
      await user.save();
      return res.status(200).json({ message: "Proof of identity verified" });
    } else if (passportsizephoto) {
      user.userKyc.passportsizephoto.status = true;
      await user.save();
      return res.status(200).json({ message: "Profile pic verified" });
    } else if (userVerified) {
      if (
        user.userKyc.proofOfAddress.status &&
        user.userKyc.proofOfIdentity.status
      ) {
        user.userKyc.verificationdone = true;
        await user.save();
        return res.status(200).json({ message: "User verification done" });
      }
      return res
        .status(404)
        .json({ message: "Something went wrong, Please try again" });
    } else if (proofOfIdentityforCompany) {
      user.companyKyc.proofOfIdentity.status = true;
      await user.save();
      return res.status(200).json({ message: "Proof of identity verified " });
    } else if (certification) {
      user.companyKyc.certification.status = true;
      await user.save();
      return res.status(200).json({ message: "Certification verified" });
    } else if (moa) {
      user.companyKyc.moa.status = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "Memorandum of Association Verified" });
    } else if (aoa) {
      user.companyKyc.aoa.status = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "Articles of Association Verified" });
    } else if (boardResolution) {
      user.companyKyc.boardResolution.status = true;
      await user.save();
      return res.status(200).json({
        message: "Board Resolution or Letter of Authorization verified",
      });
    } else if (companyVerified) {
      if (
        user.companyKyc.proofOfIdentity.status &&
        user.companyKyc.certification.status
      ) {
        user.companyKyc.verificationdone = true;
        await user.save();
        return res.status(200).json({ message: "Company verification done" });
      }
      return res
        .status(404)
        .json({ message: "Something went wrong, Please try again" });
    }

    throw new AppError(error["500"], 500);
  };

  const deleteUser = async (req, res) => {
    const { emailId } = req.body;
    const user = await User.findOneAndDelete({ emailId });
    if (!user) {
      throw new AppError("user not found", 404);
    } else {
      return res.status(200).json({ message: "user deleted successfully" });
    }
  };

  const addBankDetail = async (req, res, next) => {
    try {
      console.log("Test!!!!!!!!!!");
      // console.log(`req.file: ${req.file.filename}`);
      console.log(`req.body: ${req.body}`);
      const userId = req.userId;
      const userUpdateResponse = await User.findByIdAndUpdate(
        userId,
        {
          $set: { "userKyc.bankDetails": { ...req.body } },
          "userKyc.bankDetails.cancelCheqe": req.file.filename,
        },
        { new: true }
      );

      if (userUpdateResponse) {
        return res.status(200).json({ message: "Bank Detail Added" });
      } else {
        return next(
          new AppError("Something went wrong. Please try again!", 500)
        );
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError("Something went wrong. Please try again!", 500);
    }
  };

  const verifyBankDetail = async (req, res) => {
    const { userId } = req.body;
    const userUpdateResponse = await User.findByIdAndUpdate(
      userId,
      { $set: { "userKyc.bankDetails.verificationdone": true } },
      { new: true }
    );
    if (userUpdateResponse) {
      return res
        .status(200)
        .json({ message: "Bank detail verified successfully" });
    } else {
      throw new AppError("Something went wrong. Please try again!", 500);
    }
  };

  const assignRole = async (req, res) => {
    try {
      const { emailId, role } = req.body;
      const password = `${role}@intelliblock123`;
      const user = await User.findOne({ emailId });
      if (user) {
        user.role = role;
        await user.save();
        return res.status(200).json({ message: "Role assigned successfully" });
      }
      if (!user) {
        const newUser = new User({ ...req.body });
        const salt = await bcrypt.genSalt(12);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        return res
          .status(200)
          .json({ message: `New user created with ${role}` });
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) next(new AppError(error["401"], 401));
      const userId = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refToken });
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      next(err);
    }
  };

  const forgetPassword = async (req, res, next) => {
    const { emailId, userAuthorised, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!userAuthorised) {
      if (!user) {
        return next(new AppError("Please enter correct email", 401));
      } else {
        return res.status(200).json({ userAuthorised: true });
      }
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Password changed successfully" });
    }
  };

  const detailOfUser = async (req, res, next) => {
    try {
      const {
        fullName,
        companyName,
        mobileNo,
        country,
        companysize,
        zipcode,
        state,
        city,
        address_one,
        address_two,
      } = req.body;
      const { userId } = req;
      const updateData = {
        "address.address_one": address_one,
        "address.address_two": address_two,
        "address.zipcode": zipcode,
        "address.country": country,
        "address.state": state,
        "address.city": city,
        fullName,
        companyName,
        companysize,
        mobileNo,
      };
      const userUpdateResponse = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
      if (userUpdateResponse) {
        return res.status(200).json({ message: "user updated successfully" });
      } else {
        logger.error(userUpdateResponse);
        return next(new AppError(error["500"], 500));
      }
    } catch (err) {
      logger.error(
        `${err.status} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );
      throw new AppError(error["500"], 500);
    }
  };

  const authHandler = async (req, res, next) => {
    return 200;
  };

  const uploadVirtual = async (req, res, next) => {
    const userId = req.userId;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: { "userKyc.virtualAuth.virtualVideo": req.file.filename } },
      { new: true }
    );
    return res.status(200).json({ updateUser });
  };

  const updatewithrandomkey = async (req, res, next) => {
    const keys = randomkeygenerator();
    const userId = req.userId;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: { "userKyc.virtualAuth.randomKey": keys } },
      { new: true }
    );
    return res.status(200).json({ updateUser });
  };

  const verifyVirtual = async (req, res, next) => {
    const userId = req.userId;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: { "userKyc.virtualAuth.status": true } },
      { new: true }
    );
    return updateUser;
  };

  const typeAfterGoogle = async (req, res, next) => {
    const { userType } = req.body;
    console.log(userType, "userrrrrtype okayyyyyyy");
    console.log(req.userId, "userId.....");
    try {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { userType },
        { new: true }
      );
      console.log(user, "user");
      if (!user) {
        return;
      }
      return res
        .status(200)
        .send({ message: "User updated successfully", user });
    } catch (e) {
      throw new AppError(error["500"], 500);
    }
  };

  return {
    registerUser,
    loginUser,
    logout,
    refreshToken,
    allUser,
    currentUser,
    checkingUserWithEmail,
    addPicture,
    resetPassword,
    newUserForKyc,
    kycForUserProcess,
    verifykyc,
    kycForCompanyProcess,
    newCompanyForKyc,
    addBankDetail,
    deleteUser,
    verifyBankDetail,
    assignRole,
    forgetPassword,
    detailOfUser,
    authHandler,
    uploadVirtual,
    updatewithrandomkey,
    verifyVirtual,
    typeAfterGoogle,
  };
}

module.exports = userController;

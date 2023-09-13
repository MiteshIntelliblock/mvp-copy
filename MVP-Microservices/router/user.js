const express = require("express");
const router = express.Router();
const wrapAsync = require("../controlError/wrapAsync");
const {
  verifySuperAdmin,
  verifier,
  admin,
  checkCompany,
} = require("../config/authentication/authJwt");
const passport = require("passport");
const { verifyToken } = require("../helper/jwt_helper");
const { signRefreshToken, signAccessToken } = require("../helper/jwt_helper");
const { upload } = require("../helper/multer");
const userController = require("../controller/user");
const userHandlers = userController();

require("../config/authentication/google_authentication");

/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     registerUser:
 *       type: object
 *       required:
 *         - userType
 *         - forUser
 *         - fullName
 *         - companyName
 *         - emailId
 *         - password
 *         - mobileNo
 *         - country
 *         - companysize
 *       properties:
 *         userType:
 *           type: string
 *           description: user type
 *         forUser:
 *           type: string
 *           description: for individual/company
 *         fullName:
 *           type: string
 *           description: user's nmae
 *         companyName:
 *           type: string
 *           description: user's company name
 *         emailId:
 *           type: string
 *           description: email id
 *         password:
 *           type: string
 *           description: password
 *         mobileNo:
 *           type: string
 *           description: mobile number
 *         country:
 *           type: string
 *           description: country
 *         companysize:
 *           type: string
 *           description: company size
 *
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *    summary: API to register user
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerUser'
 *    responses:
 *      200:
 *        description: user registration has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.post("/register", wrapAsync(userHandlers.registerUser));

router.post("/detail", [verifyToken], wrapAsync(userHandlers.detailOfUser));

/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     loginUser:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           description: email id
 *         password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *    summary: API to login user
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUser'
 *    responses:
 *      200:
 *        description: login has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.post("/login", wrapAsync(userHandlers.loginUser));

/**
 * @swagger
 * /api/user/:
 *   get:
 *    summary: API to Fetch all user
 *    tags:
 *      - User API
 *    responses:
 *      200:
 *        description: all user has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get("/", [verifyToken], wrapAsync(userHandlers.allUser));

/**
 * @swagger
 * /api/user/currentUser:
 *   get:
 *    summary: API to fetch a user via token
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: getowner has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get("/currentUser", [verifyToken], wrapAsync(userHandlers.currentUser));

/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     emailCheck:
 *       type: object
 *       required:
 *         - emailId
 *       properties:
 *         emailId:
 *           type: string
 *           description: emailId
 */

/**
 * @swagger
 * /api/user/emailCheck:
 *   post:
 *    summary: API to check email
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/emailCheck'
 *    responses:
 *      200:
 *        description: email is verification has done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

//  find user
router.post(
  "/usercheckwithemail",
  wrapAsync(userHandlers.checkingUserWithEmail)
);

/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     addPicture:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           format: binary
 */

/**
 * @swagger
 * /api/user/addPicture:
 *   post:
 *    summary: API to add picture
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: picture upload has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// update user model with new profile picture
router.post(
  "/addPicture",
  [verifyToken],
  upload.single("image"),
  wrapAsync(userHandlers.addPicture)
);

/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     resetPassword:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           description: email id
 *         password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /api/user/resetPassword:
 *   post:
 *    summary: API to reset password
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetPassword'
 *    responses:
 *      200:
 *        description: password reset has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// route handling forget passwordd
router.post(
  "/resetPassword",
  [verifyToken],
  wrapAsync(userHandlers.resetPassword)
);

/**
 * @swagger
 * /api/user/kycforuser:
 *   post:
 *    summary: API to kyc for user
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: proofOfAddress
 *        type: string
 *      - in: query
 *        name: proofOfIdentity
 *        type: string
 *        required: false
 *      - in: query
 *        name: passportsizephoto
 *        type: string
 *        required: false
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: kyc for user has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

//aadhar or pain uploading or say kyc for user.
router.post(
  "/kycforuser",
  [verifyToken],
  upload.single("image"),
  wrapAsync(userHandlers.kycForUserProcess)
);
//kyc for company.

/**
 * @swagger
 * /api/user/kycforcompany:
 *   post:
 *    summary: API to kyc for company
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: proofOfIdentityforcompany
 *        type: string
 *        required: false
 *      - in: query
 *        name: certification
 *        type: string
 *        required: false
 *      - in: query
 *        name: moa
 *        type: string
 *        required: false
 *      - in: query
 *        name: aoa
 *        type: string
 *        required: false
 *      - in: query
 *        name: boardResolution
 *        type: string
 *        required: false
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: kyc for company has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post(
  "/kycforcompany",
  [verifyToken, checkCompany],
  upload.single("image"),
  wrapAsync(userHandlers.kycForCompanyProcess)
);
// route to find all user who has applied for verification of kyc.

/**
 * @swagger
 * /api/user/newuserforkyc:
 *   get:
 *    summary: API to fetch a new user for kyc
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: new user for kyc has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get(
  "/newuserforkyc",
  [verifyToken, verifier],
  wrapAsync(userHandlers.newUserForKyc)
);

/**
 * @swagger
 * /api/user/newcompanyforkyc:
 *   get:
 *    summary: API to fetch new company for kyc
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: new company for kyc has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// route to find all company who has applied for verification of kyc.
router.get(
  "/newcompanyforkyc",
  [verifyToken, verifier],
  wrapAsync(userHandlers.newCompanyForKyc)
);

/**
 * @swagger
 * /api/user/verifykyc:
 *   get:
 *    summary: API to fetch verify kyc by aadhar and pan
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: id
 *        type: string
 *        required: true
 *      - in: query
 *        name: proofOfAddress
 *        type: string
 *        required: false
 *      - in: query
 *        name: proofOfIdentityforuser
 *        type: string
 *        required: false
 *      - in: query
 *        name: userVerified
 *        type: string
 *        required: false
 *      - in: query
 *        name: proofOfIdentityforCompany
 *        type: string
 *        required: false
 *      - in: query
 *        name: certification
 *        type: string
 *        required: false
 *      - in: query
 *        name: moa
 *        type: string
 *        required: false
 *      - in: query
 *        name: aoa
 *        type: string
 *        required: false
 *      - in: query
 *        name: boardResolution
 *        type: string
 *        required: false
 *      - in: query
 *        name: companyVerified
 *        type: string
 *        required: false
 *    responses:
 *      200:
 *        description: verify kyc by aadhar and pan has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// verifykyc by aadhar and pan
router.get(
  "/verifykyc",
  [verifyToken, verifier],
  wrapAsync(userHandlers.verifykyc)
);

// routes for google authentication
router.get(
  "/googleauth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googleauth/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    const authenticationSuccessful = true;
    const accessToken = await signAccessToken(req.id);
    const refreshToken = await signRefreshToken(req.id);
    if (authenticationSuccessful) {
      const newuser = req.newUser;
      newuser.accessToken = accessToken;
      console.log(newuser, "newuserrr");
      delete req.newUser;
      const script = `
      <script>
       const jsonData = ${JSON.stringify(newuser)};
        window.opener.postMessage(jsonData, "http://localhost:5173");
        window.close();
      </script>
    `;
      res.send(script);
    }
  }
);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *    summary: API to delete user
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/emailCheck'
 *    responses:
 *      200:
 *        description: user registration has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

//delete the user account
router.delete("/delete", wrapAsync(userHandlers.deleteUser));

router.post(
  "/addbankdetails",
  [verifyToken],
  upload.single("image"),
  wrapAsync(userHandlers.addBankDetail)
);

router.post(
  "/verifybankdetails",
  [verifyToken, verifier],
  wrapAsync(userHandlers.verifyBankDetail)
);

router.post(
  "/assignrole",
  [verifyToken, verifySuperAdmin],
  wrapAsync(userHandlers.assignRole)
);

router.delete("/logout", [verifyToken], wrapAsync(userHandlers.logout));

router.post("/refreshtoken", wrapAsync(userHandlers.refreshToken));

router.post("/forgetpassword", wrapAsync(userHandlers.forgetPassword));

router.get("/auth", [verifyToken], wrapAsync(userHandlers.authHandler));
router.post(
  "/typeupdate",
  [verifyToken],
  wrapAsync(userHandlers.typeAfterGoogle)
);

router.post(
  "/virtualauth",
  [verifyToken],
  upload.single("video"),
  wrapAsync(userHandlers.uploadVirtual)
);

router.post(
  "/randomkey",
  [verifyToken],
  wrapAsync(userHandlers.updatewithrandomkey)
);
router.post(
  "/verifyvirtual",
  [verifyToken, verifier],
  wrapAsync(userHandlers.verifyVirtual)
);

module.exports = router;

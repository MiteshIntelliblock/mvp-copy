const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bankDetailsSchema = new mongoose.Schema({
  accountHolderName: String,
  accountNo: String,
  ifscCode: String,
  bankName: String,
  swiftCode: String,
  branchName: String,
  city: String,
  country: String,
  verificationdone: {
    type: Boolean,
    default: false
  }
});

const UserSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["individual", "company"] //individual
    },

    // forAnyTypeOfUser: {
    //   type: String,
    //   enum: ["projectOwner", "trader", "generalUser"]
    // },
    fullName: String,
    googleId: String,
    companyName: String,
    profilePicture: String,

    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    }, //
    mobileNo: Number, //country code add

    companysize: String,

    address: {
      address_one: String,
      address_two: String,
      zipcode: String,
      country: String,
      state: String,
      city: String
    },

    // USER kyc
    userKyc: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: false
      },

      // aadhar
      proofOfAddress: {
        url: String,
        aadharNo: {
          type: String,
         
        },
        status: {
          type: Boolean,
          default: false
        }
      },
      // pan
      proofOfIdentity: {
        url: String,
        panNo: {
          type: String,
          
        },
        status: {
          type: Boolean,
          default: false
        }
      },

      passportsizephoto: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      bankDetails: {
        type: bankDetailsSchema
      },
      verificationdone: {
        type: Boolean,
        default: false
      }
    },

    // kyc for companyy
    companyKyc: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: false
      },
      proofOfIdentity: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      // Certificate of Incorporation/ Company Registration Certificate
      certification: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      // Memorandum of Association (MOA)
      moa: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      // Articles of Association (AOA)
      aoa: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      // Board Resolution or Letter of Authorization
      boardResolution: {
        url: String,
        status: {
          type: Boolean,
          default: false
        }
      },
      bankDetails: {
        type: bankDetailsSchema
      },
      verificationdone: {
        type: Boolean,
        default: false
      }
    },
    role: {
      type: String,
      enum: ["verifier", "admin", "superAdmin"]
    },

    refreshTokenDetail: {
      token: String,
      expiresAt: Number
    },

    onBoarededfees: {
      amount: Number,
      status: {
        type: Boolean,
        default: false
      }
    },
    //for other services purposee.
    transactionIds: [
      {
        type: String
      }
    ],
    projectIds: [
      {
        type: String
      }
    ]
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);

const User = require("../models/user");
const AppError = require("../controlError/AppError");
const imageUploading = async ({ imageName, proofOfAddress, proofOfIdentity, passportsizephoto, proofOfIdentityforcompany, certification, moa, aoa, boardResolution, userId, aadharNo, panNo }) => {
  // const imgHash = await imageUploadingHelper(imagePath);
  if (proofOfAddress) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "userKyc.proofOfAddress.url": imageName, "userKyc.proofOfAddress.aadharNo": aadharNo } }, { new: true });
    return userUpdateResponse;
  } else if (proofOfIdentity) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "userKyc.proofOfIdentity.url": imageName, "userKyc.proofOfIdentity.panNo": panNo } }, { new: true });
    return userUpdateResponse;
  } else if (passportsizephoto) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "userKyc.passportsizephoto.url": imageName } }, { new: true });
    return userUpdateResponse;
  } else if (proofOfIdentityforcompany) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "companyKyc.proofOfIdentity.url": imageName } }, { new: true });
    return userUpdateResponse;
  } else if (certification) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "companyKyc.certification.url": imageName } }, { new: true });
    return userUpdateResponse;
  } else if (moa) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "companyKyc.moa.url": imageName } }, { new: true });
    return userUpdateResponse;
  } else if (aoa) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "companyKyc.aoa.url": imageName } }, { new: true });
    return userUpdateResponse;
  } else if (boardResolution) {
    const userUpdateResponse = await User.findByIdAndUpdate(userId, { $set: { "companyKyc.boardResolution.url": imageName } }, { new: true });
    return userUpdateResponse;
  }
  throw new AppError("Something went wrong. Please try again!", 500);
};

module.exports = imageUploading;

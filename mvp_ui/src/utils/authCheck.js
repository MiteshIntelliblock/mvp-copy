export function authCheck({ isAuthenticated, user, navigate }) {
  const isIndividual = user?.userType === "individual";
  const individualKyc = user?.userKyc;

  const isCompany = user?.userType === "company";
  const companyKyc = user?.companyKyc;

  const hasIndividualKycCompleted =
    isIndividual &&
    individualKyc?.proofOfAddress?.status &&
    individualKyc?.proofOfIdentity?.status;

  const hasCompanyKycCompleted =
    isCompany &&
    companyKyc?.aoa &&
    companyKyc?.boardResolution &&
    companyKyc?.certification &&
    companyKyc?.moa &&
    companyKyc?.proofOfIdentity;

  if (!isAuthenticated) {
    navigate("/auth/sign-in");
  } else if (!user?.userType) {
    navigate("/auth/select-type");
  } else if (!hasIndividualKycCompleted || !hasCompanyKycCompleted) {
    navigate("/user-details");
  } else {
    navigate("/wallet/my-profile");
  }
}

export function individualKycCheck({ user, navigate }) {
  if (
    !user?.userKyc?.proofOfAddress?.status ||
    !user?.userKyc?.proofOfIdentity?.status
  ) {
    navigate("/user-details");
  } else {
    navigate("/wallet/my-profile");
  }
}

export function companyKycCheck({ user, navigate }) {
  if (
    !user?.companyKyc?.aoa ||
    !user?.companyKyc?.boardResolution ||
    !user?.companyKyc?.certification ||
    !user?.companyKyc?.moa ||
    !user?.companyKyc?.proofOfIdentity
  ) {
    navigate("/user-details");
  } else {
    navigate("/wallet/my-profile");
  }
}

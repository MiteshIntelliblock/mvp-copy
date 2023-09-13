import { useEffect, useState } from "react";
import {
  Accordion,
  Flex,
  Text,
  Input,
  Spinner,
  AccordionItem,
  FormLabel,
  FormControl,
  AccordionPanel,
  Link,
  useToast,
} from "@chakra-ui/react";
import KYCFormHeader from "../layouts/forms/KYCFormHeader";
import FileReader from "../layouts/forms/fileReader";
import SubmitBtn from "../layouts/forms/submitBtn";
import GreenBtn from "../layouts/greenBtn";
import {
  useUserKYCMutation,
  useRequestCodeMutation,
  useVirtualAuthMutation,
} from "../../features/api/apiSlice";
import { useSelector } from "react-redux";

export default function IndividualKYC({ handleNext }) {
  const [KYCDocs, setKYCDocs] = useState({
    IdProof: null,
    panNum: null,
    addProofDoc: null,
    aadharNum: null,
    passPortSizePhoto: null,
    virtualProof: null,
  });
  const toast = useToast();
  const {
    IdProof,
    addProofDoc,
    passPortSizePhoto,
    virtualProof,
    panNum,
    aadharNum,
  } = KYCDocs;

  const user = useSelector((state) => state.auth.user);
  function onChange(e) {
    if (e.target.files) {
      const doc = e.target.files[0];
      setKYCDocs((prevState) => ({
        ...prevState,
        [e.target.name]: doc,
      }));
    } else {
      setKYCDocs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function submitHandler() {
    // if (
    //   !IdProof ||
    //   !addProofDoc ||
    //   !passPortSizePhoto ||
    //   !panNum ||
    //   !aadharNum
    // ) {
    //   toast({
    //     description: `Please Fill the form`,
    //     status: "warning",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // } else {
    console.log(KYCDocs);
    handleNext();
    // }
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="1.25rem">
      <Text fontSize="2rem" fontWeight="500" pb="-0.625rem">
        Submit your KYC documents
      </Text>
      <Text fontSize="0.875rem" color="#830202" pb="-1.25rem">
        <Text as="span" fontWeight="500">
          NOTE
        </Text>
        : Please submit clear and valid documents to our KYC team. Rest assured,
        your information will be handled with the utmost confidentiality.
      </Text>
      <Accordion w="100%" allowToggle border="1px solid transparent">
        <Flex w="100%" alignItems="center" direction="column" gap="0.938rem">
          <ProofOfId
            IdProof={IdProof}
            panNum={panNum}
            onChange={onChange}
            doc={user.userKyc.proofOfIdentity}
          />
          <ProofOfAddress
            aadharNum={aadharNum}
            addProofDoc={addProofDoc}
            onChange={onChange}
            doc={user.userKyc.proofOfAddress}
          />
          <PassportSizePic
            passPortSizePhoto={passPortSizePhoto}
            onChange={onChange}
            doc={user.userKyc.passportsizephoto}
          />
          <VirtualProof
            virtualProof={virtualProof}
            onChange={onChange}
            doc={user.userKyc.virtualAuth.virtualVideo}
          />
        </Flex>
      </Accordion>
      <GreenBtn onClick={submitHandler}>Submit</GreenBtn>
    </Flex>
  );
}

function ProofOfId({ panNum, IdProof, onChange, doc }) {
  const [IdSaved, setIdSaved] = useState(false);
  const toast = useToast();
  const [userKYC, { data, isError, error, isLoading, isSuccess }] =
    useUserKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", IdProof);
    formData.append("panNo", panNum);
    formData.append("query", "proofOfIdentity");
    console.log(IdProof);
    userKYC({
      image: formData,
      query: "proofOfIdentity",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    if (doc?.url || data) {
      setIdSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader index={"1"} formState={IdSaved}>
        Proof of Identity{" "}
        <Text as="span" color="#8C8787" display={IdSaved ? "none" : "span"}>
          (Permanent Account Number (PAN) Card)
        </Text>
      </KYCFormHeader>
      <AccordionPanel
        p="0.625rem"
        border="1px solid #EEEEEE"
        borderRadius="0px 0px 6px 6px"
      >
        <form onSubmit={onSubmit}>
          <Flex w="100%" gap="0.625rem" alignItems="center">
            <FormControl>
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Enter PAN number
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter your Pan number"
                value={panNum}
                isRequired
                fontSize="0.875rem"
                onChange={onChange}
                name="panNum"
                size="sm"
                borderRadius="6px"
                _placeholder={{ color: "#D9D9D9" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Upload{" "}
                <Text as="span" color="#8C8787">
                  (Img ,PDF ,docs)
                </Text>
              </FormLabel>
              <FileReader
                loading={isLoading}
                variable={IdProof}
                variableName={"IdProof"}
                onChange={onChange}
              />
            </FormControl>
          </Flex>
          <Flex mt="0.625rem">
            <SubmitBtn
              fontSize="0.75rem"
              size="xs"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <Spinner /> : "Save & continue"}
            </SubmitBtn>
          </Flex>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

function ProofOfAddress({ aadharNum, addProofDoc, onChange, doc }) {
  const [AddressSaved, setAddressSaved] = useState(false);
  const toast = useToast();
  const [userKYC, { data, isError, error, isLoading, isSuccess }] =
    useUserKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", addProofDoc);
    formData.append("aadharNo", aadharNum);
    formData.append("query", "proofOfAddress");
    userKYC({
      aadharNo: aadharNum,
      image: formData,
      query: "proofOfAddress",
    });
  };

  useEffect(() => {
    if (data) {
      if (data) {
        toast({
          description: `${data.message}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    }

    if (doc?.url || data) {
      setAddressSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader index={"2"} formState={AddressSaved}>
        Proof of Address
      </KYCFormHeader>
      <AccordionPanel
        w="100%"
        border="1px solid #EEE"
        borderRadius="0px 0px 6px 6px"
      >
        <form onSubmit={onSubmit}>
          <Flex w="100%" alignItems="center" gap="0.625rem">
            <FormControl>
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Enter Aadhar card number
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter your Pan number"
                value={aadharNum}
                fontSize="0.875rem"
                isRequired
                onChange={onChange}
                name="aadharNum"
                size="sm"
                borderRadius="6px"
                _placeholder={{ color: "#D9D9D9" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Upload{" "}
                <Text as="span" color="#8C8787">
                  (Img ,PDF ,docs)
                </Text>
              </FormLabel>
              <FileReader
                loading={isLoading}
                variable={addProofDoc}
                variableName={"addProofDoc"}
                onChange={onChange}
              />
            </FormControl>
          </Flex>
          <Flex mt="0.625rem">
            <SubmitBtn
              fontSize="0.75rem"
              size="xs"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <Spinner /> : "Save & continue"}
            </SubmitBtn>
          </Flex>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

function PassportSizePic({ onChange, passPortSizePhoto, doc }) {
  const [photoSaved, setPhotoSaved] = useState(false);
  const toast = useToast();
  const [userKYC, { data, isError, error, isLoading, isSuccess }] =
    useUserKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(passPortSizePhoto);
    const formData = new FormData();
    formData.append("image", passPortSizePhoto);
    userKYC({
      image: formData,
      query: "passportsizephoto",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    if (doc?.url || data) {
      setPhotoSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader formState={photoSaved} index={"3"}>
        Passport size Photograph
      </KYCFormHeader>
      <AccordionPanel
        w="100%"
        border="1px solid #EEE"
        borderRadius="0px 0px 6px 6px"
      >
        <form onSubmit={onSubmit}>
          <FormControl w="50%">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload Photograph{" "}
              <Text as="span" color="#8C8787">
                (Img should be max of 2 mb)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={passPortSizePhoto}
              variableName={"passPortSizePhoto"}
              onChange={onChange}
            />
          </FormControl>
          <Flex mt="0.625rem">
            <SubmitBtn
              fontSize="0.75rem"
              size="xs"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <Spinner /> : "Save & continue"}
            </SubmitBtn>
          </Flex>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

function VirtualProof({ onChange, virtualProof, doc }) {
  const user = useSelector((state) => state.auth.user);
  const [photoSaved, setPhotoSaved] = useState(false);
  const [kycCode, setKycCode] = useState(null);
  const toast = useToast();
  const [
    requestCode,
    { data: code, error: codeError, isLoading: codeIsLoading },
  ] = useRequestCodeMutation();
  const [
    virtualAuth,
    {
      data: virData,
      error: virError,
      isSuccess,
      isError,
      isLoading: isvirLoading,
    },
  ] = useVirtualAuthMutation();

  const generateOTPFn = () => {
    requestCode();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(virtualProof);
    formData.append("video", virtualProof);
    virtualAuth({
      video: formData,
    });
  };

  useEffect(() => {
    if (user.userKyc.virtualAuth.randomKey) {
      setKycCode(user.userKyc.virtualAuth.randomKey);
    }
  }, [user]);

  // kyc code
  useEffect(() => {
    if (code) {
      console.log(code.updateUser.userKyc.virtualAuth.randomKey);
      setKycCode(code.updateUser.userKyc.virtualAuth.randomKey);
    }

    if (codeError) {
      toast({
        description: `Something went wrong!`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(codeError);
    }
  }, [code, codeError]);

  // video upload
  useEffect(() => {
    if (virData) {
      toast({
        description: "Video uploaded successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    if (virError) {
      console.log(virError);
    }

    if (doc || virData) {
      setPhotoSaved(true);
    }
  }, [isError, doc, virData, virError]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader formState={photoSaved} index={"4"}>
        Virtually Proof verification
        <Text as="span" color="#8C8787" display={photoSaved ? "none" : "span"}>
          (Video format)
        </Text>
      </KYCFormHeader>
      <AccordionPanel
        w="100%"
        border="1px solid #EEE"
        borderRadius="0px 0px 6px 6px"
      >
        <form onSubmit={onSubmit}>
          <Flex w="100%" direction="column">
            <Text fontSize="0.875rem" pb="5px">
              Generate OTP
            </Text>
            <Text fontSize="0.625rem" fontWeight="300" pb="0.625rem">
              Check your Email-ID a OTP has been sent for virtually proof
              verification
            </Text>
            <Flex alignItems="center" gap="7px">
              {kycCode ? (
                <Text>{kycCode}</Text>
              ) : (
                <GreenBtn
                  disabled={codeIsLoading}
                  onClick={generateOTPFn}
                  fontSize="0.875rem"
                  borderRadius="3px"
                >
                  Send code
                </GreenBtn>
              )}
              <Link
                fontSize="0.625rem"
                onClick={generateOTPFn}
                color="darkGreen"
                textDecor="underline"
              >
                Resend code
              </Link>
            </Flex>
          </Flex>
          {kycCode && (
            <FormControl w="50%" mt="0.75rem">
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Upload video
                <Text as="span" color="#8C8787">
                  (video should be max of 10 mb)
                </Text>
              </FormLabel>
              <FileReader
                loading={isvirLoading}
                variable={virtualProof}
                variableName={"virtualProof"}
                onChange={onChange}
              />
              <Flex mt="0.625rem">
                <SubmitBtn
                  fontSize="0.75rem"
                  size="xs"
                  disabled={isvirLoading || isSuccess}
                >
                  {isvirLoading ? <Spinner /> : "Save & continue"}
                </SubmitBtn>
              </Flex>
            </FormControl>
          )}
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

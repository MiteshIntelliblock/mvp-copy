import { useEffect, useState } from "react";
import {
  Accordion,
  Flex,
  Text,
  Spinner,
  AccordionItem,
  FormLabel,
  AccordionPanel,
  FormControl,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import KYCFormHeader from "../layouts/forms/KYCFormHeader";
import FileReader from "../layouts/forms/fileReader";
import SubmitBtn from "../layouts/forms/submitBtn";
import GreenBtn from "../layouts/greenBtn";
import {
  useCompanyKYCMutation,
  useVirtualAuthMutation,
} from "../../features/api/apiSlice";
import { useSelector } from "react-redux";

export default function CompanyKYC({ handleNext }) {
  const toast = useToast();
  const [KYCDocs, setKYCDocs] = useState({
    IdProof: null,
    panNum: null,
    companyRegistrationCerf: null,
    moa: null,
    aoa: null,
    boardResolution: null,
    virtualProof: null,
  });
  const {
    IdProof,
    panNum,
    companyRegistrationCerf,
    moa,
    aoa,
    boardResolution,
    virtualProof,
  } = KYCDocs;

  // to load previously uploaded documents
  const user = useSelector((state) => state.auth.user);
  console.log(user);

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
    //   !panNum ||
    //   !companyRegistrationCerf ||
    //   !moa ||
    //   !aoa ||
    //   !boardResolution
    // ) {
    //   toast({
    //     description: `Please Fill the form`,
    //     status: "warning",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // } else {
    //   handleNext();
    // }
    handleNext();
    console.log(KYCDocs);
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="1.25rem">
      <Text fontSize="2rem" fontWeight="500" pb="-0.625rem">
        Submit your KYC documents
      </Text>
      <Text fontSize="0.875rem" color="#830202" pb="-1.25rem">
        <Text as="span" fontWeight="500">
          NOTE
        </Text>{" "}
        : Please submit clear and valid documents to our KYC team. Rest assured,
        your information will be handled with the utmost confidentiality.
      </Text>
      <Accordion w="100%" allowToggle border="1px solid transparent">
        <Flex w="100%" alignItems="center" direction="column" gap="0.938rem">
          <ProofOfId
            IdProof={IdProof}
            panNum={panNum}
            onChange={onChange}
            doc={user?.companyKyc?.proofOfIdentity}
          />
          <CerfOfCRC
            companyRegistrationCerf={companyRegistrationCerf}
            onChange={onChange}
            doc={user?.companyKyc?.certification}
          />
          <Memorandum
            moa={moa}
            onChange={onChange}
            doc={user?.companyKyc?.moa}
          />
          <Article aoa={aoa} onChange={onChange} doc={user?.companyKyc?.aoa} />
          <BoardReso
            boardResolution={boardResolution}
            onChange={onChange}
            doc={user?.companyKyc?.boardResolution}
          />
          {/* <VirtualProof virtualProof={virtualProof} onChange={onChange} /> */}
        </Flex>
      </Accordion>
      <GreenBtn onClick={submitHandler}>Submit</GreenBtn>
    </Flex>
  );
}

function ProofOfId({ IdProof, onChange, doc, panNum }) {
  const [IdSaved, setIdSaved] = useState(false);
  const toast = useToast();
  const [companyKYC, { data, isError, isSuccess, isLoading, error }] =
    useCompanyKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", IdProof);
    companyKYC({
      image: formData,
      query: "proofOfIdentityforcompany",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data?.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      console.log(data);
    }

    if (doc?.url || data) {
      setIdSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader index={"1"} formState={IdSaved}>
        Proof of Identity
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
            {" "}
            <FormControl>
              <FormLabel fontSize="0.875rem" fontWeight="400">
                Enter PAN number
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter your Pan number"
                value={panNum}
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

function CerfOfCRC({ companyRegistrationCerf, onChange, doc }) {
  const [AddressSaved, setAddressSaved] = useState(false);
  const toast = useToast();
  const [companyKYC, { data, isError, isLoading, isSuccess, error }] =
    useCompanyKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", companyRegistrationCerf);
    companyKYC({
      image: formData,
      query: "certification",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data?.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    if (doc?.url || data) {
      setAddressSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader index={"2"} formState={AddressSaved}>
        Certificate of Incorporation/ Company Registration Certificate
      </KYCFormHeader>
      <AccordionPanel w="100%">
        <form onSubmit={onSubmit}>
          <FormControl w="50%">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload{" "}
              <Text as="span" color="#8C8787">
                (Img ,PDF ,docs)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={companyRegistrationCerf}
              variableName={"companyRegistrationCerf"}
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

function Memorandum({ onChange, moa, doc }) {
  const [photoSaved, setPhotoSaved] = useState(false);
  const toast = useToast();
  const [companyKYC, { data, isError, isSuccess, isLoading, error }] =
    useCompanyKYCMutation();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", moa);
    companyKYC({
      image: formData,
      query: "moa",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data?.message}`,
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
        Memorandum of Association (MOA)
      </KYCFormHeader>
      <AccordionPanel w="100%">
        <form onSubmit={onSubmit}>
          <FormControl w="50%">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload{" "}
              <Text as="span" color="#8C8787">
                (Img ,PDF ,docs)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={moa}
              variableName={"moa"}
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

function Article({ onChange, aoa, doc }) {
  const [photoSaved, setPhotoSaved] = useState(false);
  const toast = useToast();
  const [companyKYC, { data, isError, isLoading, isSuccess, error }] =
    useCompanyKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", aoa);
    companyKYC({
      image: formData,
      query: "aoa",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data?.message}`,
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
      <KYCFormHeader formState={photoSaved} index={"4"}>
        Articles of Association (AOA)
      </KYCFormHeader>
      <AccordionPanel w="100%">
        <form onSubmit={onSubmit}>
          <FormControl w="50%">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload{" "}
              <Text as="span" color="#8C8787">
                (Img ,PDF ,docs)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={aoa}
              variableName={"aoa"}
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

function BoardReso({ onChange, boardResolution, doc }) {
  const [photoSaved, setPhotoSaved] = useState(false);
  const toast = useToast();
  const [companyKYC, { data, isError, isLoading, isSuccess, error }] =
    useCompanyKYCMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", boardResolution);
    companyKYC({
      image: formData,
      query: "boardResolution",
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        description: `${data?.message}`,
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
      <KYCFormHeader formState={photoSaved} index={"5"}>
        Board Resolution or Letter of Authorization (For authorized signatories
      </KYCFormHeader>
      <AccordionPanel w="100%">
        <form onSubmit={onSubmit}>
          <FormControl w="50%">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload{" "}
              <Text as="span" color="#8C8787">
                (Img ,PDF ,docs)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={boardResolution}
              variableName={"boardResolution"}
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
  const [photoSaved, setPhotoSaved] = useState(false);
  const [virtualAuth, { data, isError, error, isLoading, isSuccess }] =
    useVirtualAuthMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(virtualProof);
    const formData = new FormData();
    formData.append("video", virtualProof);
    virtualAuth({
      video: formData,
    });
  };

  useEffect(() => {
    if (doc?.url || data) {
      setPhotoSaved(true);
    }
    if (isError) console.log(error);
  }, [data, isError, error, doc]);

  return (
    <AccordionItem w="100%" border="none">
      <KYCFormHeader formState={photoSaved} index={"4"}>
        Virtually Proof verification{" "}
        <Text as="span" color="#8C8787" display={photoSaved ? "none" : "span"}>
          (Video format)
        </Text>{" "}
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
              <GreenBtn fontSize="0.875rem" borderRadius="3px">
                Send code
              </GreenBtn>
              <Link fontSize="0.625rem" color="darkGreen" textDecor="underline">
                Resend code
              </Link>
            </Flex>
          </Flex>
          <FormControl w="50%" mt="0.75rem">
            <FormLabel fontSize="0.875rem" fontWeight="400">
              Upload video{" "}
              <Text as="span" color="#8C8787">
                (video should be max of 10 mb)
              </Text>
            </FormLabel>
            <FileReader
              loading={isLoading}
              variable={virtualProof}
              variableName={"virtualProof"}
              onChange={onChange}
            />
            <Flex mt="0.625rem">
              <SubmitBtn
                fontSize="0.75rem"
                size="xs"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? <Spinner /> : "Save & continue"}
              </SubmitBtn>
            </Flex>
          </FormControl>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

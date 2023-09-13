import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function MobileField({ setFormData, variable }) {
  const onChng = (num) => {
    setFormData((prevState) => ({
      ...prevState,
      mobileNo: num,
    }));
  };
  return (
    <PhoneInput
      value={variable}
      country={"in"}
      inputProps={{
        required: true,
        autoFocus: true,
      }}
      inputStyle={{
        fontSize: "0.75rem",
        height: "32px",
        width: "100%",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        backgroundColor: "transparent",
        padding: "4px 16px 4px 40px",
      }}
      buttonStyle={{
        backgroundColor: "transparent",
      }}
      containerStyle={{
        width: "100%",
        height: "32px",
        borderColor: "#D9D9D9",
        borderRadius: "6px",
      }}
      isValid
      onChange={(num) => onChng(num)}
    />
  );
}

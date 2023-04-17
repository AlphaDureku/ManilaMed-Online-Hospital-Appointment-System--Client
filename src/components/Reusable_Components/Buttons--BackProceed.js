import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function BackProceed(props) {
  return (
    <>
      <Button
        onClick={props.OnCloseHandler}
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#FF0000",
          fontFamily: "Inter",
        }}
      >
        {props.redButtonText}
      </Button>
      <Button
        type="submit"
        onClick={props.OnSubmitHandler}
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#24B7E9",
          fontFamily: "Inter",
        }}
      >
        {props.blueButtonText}
      </Button>
    </>
  );
}

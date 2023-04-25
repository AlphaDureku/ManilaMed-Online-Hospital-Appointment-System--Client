import Modal from "react-bootstrap/Modal";
import { Button } from "@mantine/core";

export default function BackProceed(props) {
  return (
    <>
      <Button
        onClick={props.OnCloseHandler}
        size= "sm"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#FF0000",
        }}
      >
        {props.redButtonText}
      </Button>
      <Button
        type="submit"
        size= "sm"
        onClick={props.OnSubmitHandler}
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#24B7E9",
        }}
      >
        {props.blueButtonText}
      </Button>
    </>
  );
}

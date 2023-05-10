import { Button } from "@mantine/core";
import Modal from "react-bootstrap/Modal";

export default function BackProceed(props) {
  const object = {
    color: props.backColor || "#FF0000",
  };

  return (
    <>
      <Button
        onClick={props.leftButton}
        size="sm"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: object.color,
        }}
      >
        {props.redButtonText || "Back"}
      </Button>
      <Button
        type="submit"
        size="sm"
        onClick={props.rightButton}
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

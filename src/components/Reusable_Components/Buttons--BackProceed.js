import { Button } from "@mantine/core";

export default function BackProceed(props) {
  const object = {
    color: props.backColor || "#FF0000",
  };

  const anotherobject = {
    color: props.rightColor || "#24B7E9",

  }

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
        disabled={props.isDisabled}
        type="submit"
        size="sm"
        onClick={props.rightButton}
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: anotherobject.color,
        }}
      >
        {props.blueButtonText}
      </Button>
    </>
  );
}

import { Alert } from "@mantine/core";

import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import SelectAvail from "./Steps_SubComponents/selectAvail";
export default function StepTwo(props) {
  const [error, setError] = useState(null);

  const calendar = useMemo(() => {
    return (
      <SelectAvail
        schedule={props.schedule}
        error={error}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
      />
    );
  }, []);

  return (
    <>
      {error && (
        <Container>
          <Alert color="red" title="Error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Container>
      )}
      {calendar}
    </>
  );
}

import { Group, Input, Radio, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { useContext } from "react";
import { IMaskInput } from "react-imask";
import { InsertAppointmentContext } from "../InsertAppointmentModal";
export default function InsertStep2({ errorEnabled }) {
  const { insertAppointmentDetails, setInsertAppointmentDetails } = useContext(
    InsertAppointmentContext
  );
  const {
    email,
    patient_first_name,
    patient_last_name,
    middle_name,
    contact_number,
    address,
    dateOfBirth,
    gender,
  } = insertAppointmentDetails.patient_info;

  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
    },
  };

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setInsertAppointmentDetails((prev) => ({
      ...prev,
      patient_info: {
        ...prev.patient_info,
        [name]: value,
      },
    }));
  };

  return (
    <div className="InsertAvailstep2-outContainer">
      <div className="insertStep2-Container">
        <Input.Wrapper
          label="First Name"
          withAsterisk
          error={
            !patient_first_name && errorEnabled ? "This Field is required" : ""
          }
        >
          <TextInput
            styles={formstyles}
            name="patient_first_name"
            value={patient_first_name}
            onChange={onChangeHandler}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Middle Name"
          className="mt-2"
          error={!middle_name && errorEnabled ? "This Field is required" : ""}
        >
          <TextInput
            styles={formstyles}
            name="middle_name"
            value={middle_name}
            onChange={onChangeHandler}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Last Name"
          className="mt-2"
          withAsterisk
          error={
            !patient_last_name && errorEnabled ? "This Field is required" : ""
          }
        >
          <TextInput
            styles={formstyles}
            name="patient_last_name"
            value={patient_last_name}
            onChange={onChangeHandler}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Email"
          className="mt-2"
          withAsterisk
          error={!email && errorEnabled ? "This Field is required" : ""}
        >
          <TextInput
            styles={formstyles}
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
        </Input.Wrapper>
        <Radio.Group
          label="Gender"
          className="mt-2"
          withAsterisk
          value={gender}
          error={!gender && errorEnabled ? "This Field is required" : ""}
          onChange={(event) =>
            setInsertAppointmentDetails((prev) => ({
              ...prev,
              patient_info: {
                ...prev.patient_info,
                gender: event,
              },
            }))
          }
        >
          <Group mt="xs">
            <Radio value="M" label="Male" />
            <Radio value="F" label="Female" />
          </Group>
        </Radio.Group>
        <Input.Wrapper
          label="Date of Birth"
          className="mt-2"
          name="dateOfBirth"
          value={dateOfBirth}
          withAsterisk
          error={!dateOfBirth && errorEnabled ? "This Field is required" : ""}
        >
          <DateInput
            styles={formstyles}
            value={dateOfBirth}
            onChange={(event) =>
              setInsertAppointmentDetails((prev) => ({
                ...prev,
                patient_info: {
                  ...prev.patient_info,
                  dateOfBirth: event,
                },
              }))
            }
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Contact Number"
          className="mt-2"
          withAsterisk
          error={
            !contact_number && errorEnabled ? "This Field is required" : ""
          }
        >
          <Input
            component={IMaskInput}
            styles={formstyles}
            value={contact_number}
            name="contact_number"
            onChange={onChangeHandler}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Address"
          className="mt-2"
          withAsterisk
          error={!address && errorEnabled ? "This Field is required" : ""}
        >
          <TextInput
            styles={formstyles}
            name="address"
            value={address}
            onChange={onChangeHandler}
          />
        </Input.Wrapper>
      </div>
    </div>
  );
}

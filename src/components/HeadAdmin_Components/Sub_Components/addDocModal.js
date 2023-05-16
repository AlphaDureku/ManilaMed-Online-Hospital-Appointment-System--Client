import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { TextInput, Select, Input, MultiSelect, NativeSelect, Button } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import axios from 'axios';

const AddDoctorModal = (props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    contactNumber: '',
    roomNumber: '',
    specialization: '',
    hmo: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Send a POST request to the backend server
    axios
      .post('/head-admin/add-doctor', {
        Fname: formData.firstName,
        Lname: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        contact: formData.contactNumber,
        room: formData.roomNumber,
        specialization_ID: formData.specialization,
        hmo_ID: formData.hmo,
      })
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  
  return (
    <Modal show={props.show} onHide={props.handleClose} centered size="md" keyboard={false} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto ps-3">ADD DOCTOR</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center', margin: '5%', fontWeight: '600' }}>
        <form onSubmit={handleSubmit}>
          <TextInput
            name="firstName"
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Select
            name="gender"
            label="Gender"
            placeholder="Gender"
            clearable
            data={['Male', 'Female']}
            value={formData.gender}
            onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, gender: value }))}
          />
          <Input.Wrapper label="Contact Number">
            <Input
              component={IMaskInput}
              mask="+63 0000000000"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, contactNumber: event.target.value }))}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Room Number">
            <Input
              component={IMaskInput}
              mask="000"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, roomNumber: event.target.value }))}
            />
          </Input.Wrapper>
          <NativeSelect
            name="specialization"
            data={['Specialization', 'React', 'Vue', 'Angular', 'Svelte']}
            label="Specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, specialization: event.target.value }))}
            />
        <MultiSelect
            name="hmo"
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
            label="Select HMO"
            placeholder="HMO"
            searchable
            clearable
            nothingFound="Nothing found"
            value={formData.hmo}
            onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, hmo: value }))}
        />
        <Button type="submit" onClick={handleSubmit}>ADD</Button>
        </form>
        </Modal.Body>
        </Modal>
    );
};

export default AddDoctorModal;
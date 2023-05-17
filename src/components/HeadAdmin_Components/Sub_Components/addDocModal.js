import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { TextInput, Select, Input, MultiSelect, NativeSelect, Button } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import axios from 'axios';
import { CloseButton } from 'react-bootstrap';
import { DashboardContext } from '../Main_Content/Dashboard'

const AddDoctorModal = (props) => {
  const dashboardData = useContext(DashboardContext);

  const { HmoLists, SpecializationList } = dashboardData?.data || {};

  // Access the values
  console.log(HmoLists);
  console.log(SpecializationList);


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
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    console.log(`token: ${token}`);
  
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
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  

  const formstyles = {
    input: { borderColor: 'rgba(0, 0, 0, 0.5);' ,
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },},

  };


  
  return (
    <Modal show={props.show} onHide={props.handleClose} centered size="md" keyboard={false} backdrop="static">
    
      <Modal.Body style={{ margin: '5%', fontWeight: '600' }}>
          <div style={{ display: 'flex', alignItems: 'center' }} className='mb-3'>
          <div style={{ flex: '1', textAlign: 'center' }} className='ms-4'>ADD DOCTOR</div>
          <div style={{ marginLeft: 'auto' }}>
            <CloseButton onClick={props.handleClose} />
          </div>
    </div>
        <form onSubmit={handleSubmit}>
        <Input.Wrapper label="First Name"
        className='mb-2' >
          <TextInput
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            styles={formstyles}
          
          />
          </Input.Wrapper>
          <Input.Wrapper label="Last Name"
            className='mb-2' >
          <TextInput
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            styles={formstyles}
          />
          </Input.Wrapper>
     
          <Input.Wrapper label="Gender"
            className='mb-2' >
          <Select
            name="gender"
            placeholder="Gender"
            clearable
            data={['Male', 'Female']}
            value={formData.gender}
            onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, gender: value }))}
            styles={formstyles}

          />
          </Input.Wrapper>
              <Input.Wrapper label="Specialization"
            className='mb-2' >
          <NativeSelect
            name="specialization"
            data={['Specialization', 'React', 'Vue', 'Angular', 'Svelte']}
            placeholder="Specialization"
            value={formData.specialization}
            onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, specialization: event.target.value }))}
            styles={formstyles}

            />
            </Input.Wrapper>
            <Input.Wrapper label="Select HMO"
              className='mb-2' >
        <MultiSelect
            name="hmo"
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
            placeholder="HMO"
            searchable
            clearable
            nothingFound="Nothing found"
            value={formData.hmo} 
            onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, hmo: value }))}
            styles={formstyles}

        />
        </Input.Wrapper>
        <Input.Wrapper label="Email"
            className='mb-2' >
          <TextInput
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            styles={formstyles}
          />
          </Input.Wrapper>
          <Input.Wrapper label="Contact Number"
            className='mb-2' >
            <Input
              component={IMaskInput}
              mask="+63 0000000000"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, contactNumber: event.target.value }))}
              styles={formstyles}

            />
          </Input.Wrapper>
          <Input.Wrapper label="Room Number"
            className='mb-2' >
            <Input
              component={IMaskInput}
              mask="000"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, roomNumber: event.target.value }))}
              styles={formstyles}

            />
          </Input.Wrapper>
      
        </form>
        <div className="addconfirmbuttonrow mt-3" style={{ textAlign: 'center',}}>
          <Button type='submit' onClick={handleSubmit}
          style={{backgroundColor: '#E0F7FF', color: '#000' , boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)', border: ' 1px solid #ced4da'}}>ADD</Button>
        </div>
    
        </Modal.Body>
     
    
        </Modal>
    );
};

export default AddDoctorModal;
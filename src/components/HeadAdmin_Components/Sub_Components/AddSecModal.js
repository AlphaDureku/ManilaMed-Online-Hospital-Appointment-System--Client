import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { TextInput, Input, PasswordInput, Button } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import axios from 'axios';
import { CloseButton } from 'react-bootstrap';

const AddSecModal = (props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Send a POST request to the backend server
    axios
      .post('/head-admin/add-nurse', {
        params: {
          Fname: formData.firstName,
          Lname: formData.lastName,
          email: formData.email,
          contact: formData.contactNumber,
          username: formData.username,
          password: formData.password
         
          },
          headers: {
        //   Authorization: `Bearer ${token}`,
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
    <Modal show={props.showSec} onHide={props.handleCloseSec} centered size="md" keyboard={false} backdrop="static">
    
      <Modal.Body style={{ margin: '5%', fontWeight: '600' }}>
          <div style={{ display: 'flex', alignItems: 'center' }} className='mb-3'>
          <div style={{ flex: '1', textAlign: 'center' }} className='ms-4'>ADD SECRETARY</div>
          <div style={{ marginLeft: 'auto' }}>
            <CloseButton onClick={props.handleCloseSec} />
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
          <Input.Wrapper label="Username"
            className='mb-2' >
            <TextInput
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                styles={formstyles}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Password"
            className='mb-2' >
          <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

export default AddSecModal;
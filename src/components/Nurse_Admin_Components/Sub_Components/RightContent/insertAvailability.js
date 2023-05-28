import React, { useRef, useState, useEffect } from 'react';
import { NumberInput, Input, Select, ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import BackProceed from '../../../Reusable_Components/Buttons--BackProceed';
import moment from 'moment';
import axios from 'axios';

export default function InsertAvailability(props) {
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const formattedDate = props.selectedDate ? moment(props.selectedDate).format('MM/DD/YYYY') : '';
    const formstyles = {
      input: {
        borderColor: 'rgba(0, 0, 0, 0.5);',
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
      },
    };
  
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [selectedInterval, setSelectedInterval] = useState(null);
    const [numberOfPatients, setNumberOfPatients] = useState();
    const [calculationDone, setCalculationDone] = useState(false);
    const [error, setError] = useState('');

  
    const handleDateChange = (event) => {
      props.setSelectedDate(event.target.value);
    };
  
    const handleStartTimeChange = (event) => {
      setStartTime(event.target.value);
    };
  
    const handleEndTimeChange = (event) => {
      setEndTime(event.target.value);
    };
  
    const handleIntervalChange = (value) => {
      const duration = moment.duration(value);
      const hours = duration.hours();
      const minutes = duration.minutes();
      const intervalInMinutes = hours * 60 + minutes;
      setSelectedInterval(intervalInMinutes);
    };
   const calculateNumberOfPatients = () => {
  if (startTime !== null && endTime !== null && selectedInterval !== null) {
    const start = moment(startTime, 'hh:mm A');
    const end = moment(endTime, 'hh:mm A');
    const duration = moment.duration(end.diff(start));

    if (selectedInterval > 0 && duration.asMinutes() > 0) {
      if (selectedInterval < 30 || duration.asMinutes() < 30) {
        setNumberOfPatients("");
        setCalculationDone(false);
        return;
      }

      const numberOfPatients = Math.floor(duration.asMinutes() / selectedInterval);
      setNumberOfPatients(numberOfPatients >= 0 ? numberOfPatients : "");
      setCalculationDone(true);
    } else {
      setNumberOfPatients("");
      setCalculationDone(false);
    }
  } else {
    setNumberOfPatients("");
    setCalculationDone(false);
  }
};

      
  
    useEffect(() => {
      if (startTime !== null && endTime !== null && selectedInterval !== null) {
        calculateNumberOfPatients();
      }
    }, [startTime, endTime, selectedInterval]);
  
    const handleSubmit = async () => {
        try {
          setError(''); // Clear any previous errors
          const token = localStorage.getItem("nurseToken");
      
          if (
            formattedDate &&
            startTime &&
            endTime &&
            selectedInterval &&
            numberOfPatients
          ) {
            const start = moment(startTime, 'hh:mm A');
            const end = moment(endTime, 'hh:mm A');
            const duration = moment.duration(end.diff(start));
      
            if (selectedInterval >= 30 && duration.asMinutes() >= selectedInterval) {
              const intervalDuration = moment.duration(selectedInterval, 'minutes');
              const hours = Math.floor(intervalDuration.asMinutes() / 60);
              const minutes = intervalDuration.asMinutes() % 60;
              const intervalTime = moment.utc()
                .hours(hours)
                .minutes(minutes)
                .seconds(0)
                .format('HH:mm:ss');
      
              const postData = {
                date: moment(formattedDate, 'MM/DD/YYYY').format('MM/DD/YY'),
                startTime: moment(startTime, 'hh:mm A').format('HH:mm:ss'),
                endTime: moment(endTime, 'hh:mm A').format('HH:mm:ss'),
                intervalTime: intervalTime,
                maxPatient: numberOfPatients.toString(),
              };
      
              console.log(postData);
      
              const response = await axios.post(
                process.env.REACT_APP_ONLINE + '/admin/add-doctorAvailability',
                postData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
      
              if (response === 200) {
                console.log('Availability added successfully');
                // Reset the form or perform any other necessary actions
              } else {
                console.error('Failed to add availability');
                setError('Network error');
                
              }
            } else {
              console.error('The interval time should be at least least the alloted time');
              setError('Availability schdule should be at least the alloted time');
              setNumberOfPatients("")
            }
          } else {
            console.error('Please fill all the required fields');
            setError('Please fill all the fields');
          }
        } catch (error) {
          setError('Network error');
          console.error('Failed to add availability:', error);
        }
      };
      
  
  return (
    <>
      <div className="">
        <div>
          <p>Clinic Hours</p>
          <p>Set the date and time according to the doctor's availability</p>
        </div>
        <div className="ms-3 insert-row">
          <div className="space1">
            <p>Selected Date</p>
          </div>
          <div style={{ width: '105px' }}>
            <Input styles={formstyles} value={formattedDate} onChange={handleDateChange} />
          </div>
        </div>
        <div className="ms-3 ">
          <p>Time Interval: </p>
        </div>
        <div className="ms-5 insert-row">
          <div className="space2">
            <p>Per Patient</p>
          </div>
          <div style={{ width: '175px' }}>
            <Select
              data={[
                { value: moment.duration(30, 'minutes').toISOString(), label: '30 minutes' },
                { value: moment.duration(45, 'minutes').toISOString(), label: '45 minutes' },
                { value: moment.duration(1, 'hour').toISOString(), label: '1 hour' },
                { value: moment.duration(1, 'hour').add(15, 'minutes').toISOString(), label: '1 hour 15 minutes' },
                { value: moment.duration(1, 'hour').add(30, 'minutes').toISOString(), label: '1 hour 30 minutes' },
                { value: moment.duration(1, 'hour').add(45, 'minutes').toISOString(), label: '1 hour 45 minutes' },
                { value: moment.duration(2, 'hours').toISOString(), label: '2 hours' },
              ]}
              styles={formstyles}
              searchable
              clearable
              onChange={handleIntervalChange}
              placeholder='Select Interval'
            />
          </div>
        </div>
        <div className="ms-3">
          <p>Selected Time: </p>
        </div>
        <div className="ms-5">
          <div className="insert-row">
            <div className="space3">
              <p>FROM: </p>
            </div>
            <div>
              <TimeInput
                ref={startTimeRef}
                rightSection={
                  <ActionIcon onClick={() => startTimeRef.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
                styles={formstyles}
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
          </div>
          <div className="mt-2 insert-row">
            <div className="space4">
              <p>TO: </p>
            </div>
            <div>
              <TimeInput
                ref={endTimeRef}
                rightSection={
                  <ActionIcon onClick={() => endTimeRef.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
                styles={formstyles}
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p>No. of Patients</p>
          <p>The maximum number of patients</p>
        </div>
        <div className="ms-3 insert-row">
          <div className="space5">
            <p>No. of Patients</p>
          </div>
          <div style={{ width: '90px' }}>
          <NumberInput
              styles={formstyles}
              value={numberOfPatients >= 0 ? numberOfPatients : "" }
              min={1}
              onChange={(value) => {
                setNumberOfPatients(value);
                setCalculationDone(false); 
              }}
            />
          </div>
          {calculationDone && (
          <div className='ms-3'>
            Recommended
          </div>
        )}
        </div>
        <div  className='insert-errormsg mt-3'>
        {error && <div>{error}</div>}
        </div>

      </div>
      <div className='Admin--SetButtonRow mt-3'>
      <BackProceed
        leftButton={props.handleCloseModal}
      rightButton={handleSubmit}
       redButtonText={"Cancel "}
       blueButtonText={"Set"}
      />
      </div>

    </>
  );
}

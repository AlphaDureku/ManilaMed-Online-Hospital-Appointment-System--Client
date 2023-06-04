import { Button } from "@mantine/core";
import { useState } from "react";
import InsertAppointmentModal from "./InsertAppointmentModal";

export default function CancelAllRow({ selectedDateChecker }) {


  const [openModal, setOpenModal] = useState(false);

  function openInsertModal () {
    setOpenModal(true);
  }

  function closeInsertModal () {
    setOpenModal(false);
  }



  return (

    <>
      <div className="CancelAll">
        <div>
          <div>Manually Set an Appointment</div>
          <Button onClick={openInsertModal} >
            Set Appointment
          </Button>
        </div>
        <div>
          {" "}
          <div>Notify patients on Cancellation </div>
          <Button onClick={() => selectedDateChecker("CancelAll")}>
            Cancel Appointments
          </Button>
        </div>

        <InsertAppointmentModal
        openModal={openModal}
        closeModal={closeInsertModal}
        />
      </div>
    </>
  );
}

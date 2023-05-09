import { Button } from "@mantine/core"
export default function BookingConfirmation(props){

    return(
        <div>
            <h1>Booking Confirmation</h1>
            <Button onClick={ () => console.log(props.appointmentDetails)}>
            Console
          </Button>
        </div>
    )
}
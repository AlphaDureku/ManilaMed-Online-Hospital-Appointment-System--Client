import { Button } from "@mantine/core";
export default function NotifyDoctor({ selectedDateChecker }) {
  return (
    <>
      <div className="NotifyDoctor">
        <div>Notify Doctor on Appointments</div>
        <Button onClick={() => selectedDateChecker("NotifyDoctor")}>
          Notify Doctor
        </Button>
      </div>
    </>
  );
}

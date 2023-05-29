import { Button } from "@mantine/core";

export default function NotifyPatients({ selectedDateChecker }) {
  return (
    <>
      <div className="NotifyPatients">
        <div>Notify Patients</div>
        <div>
          <Button onClick={() => selectedDateChecker("Arrived")}>
            Doctor Has Arrived
          </Button>
          <Button onClick={() => selectedDateChecker("Late")}>
            Doctor is Running Late
          </Button>
        </div>
      </div>
    </>
  );
}

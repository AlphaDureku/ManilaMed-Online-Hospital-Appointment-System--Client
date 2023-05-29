export default function CardContainer({ thatDaysPatient, renderCard }) {
  return (
    <>
      <div className="Calendar_Container--container">
        {thatDaysPatient.length === 0 ? (
          <div className="Empty">
            No Confirmed Appointments on Selected Date
          </div>
        ) : (
          renderCard
        )}
      </div>
    </>
  );
}

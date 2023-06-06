import AdminSkeleton from "../../../Reusable_Components/AdminSkeleton";

export default function CardContainer({
  thatDaysPatient,
  renderCard,
  loading,
}) {
  return (
    <>
      <div className="Calendar_Container--container">
        {loading ? (
          <AdminSkeleton />
        ) : thatDaysPatient.length === 0 ? (
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

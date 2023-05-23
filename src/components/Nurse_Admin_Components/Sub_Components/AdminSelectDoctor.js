export default function SelectedDoctor(props) {
  const { data } = props;
  return (
    <>
      <option value={data.doctor_ID}>
        {data.doctor_first_name} {data.doctor_last_name}
      </option>
    </>
  );
}

import MantineSearchBar from "./AdminSearchBar";
export default function SearchRowAndSelectDoctor(props) {
  const { selectedDoctor, onDoctorChangeHandler, renderSelectOptions } = props;
  return (
    <div className="search-row">
      <div>
        <MantineSearchBar />
      </div>
      <div>
        <select
          className="Admin--SelectDoctor"
          value={selectedDoctor}
          onChange={onDoctorChangeHandler}
        >
          {renderSelectOptions}
        </select>
      </div>
    </div>
  );
}

import MantineSearchBar from "./AdminSearchBar";
export default function SearchRowAndSelectDoctor(props) {
  const { selectedDoctor, onDoctorChangeHandler, renderSelectOptions } = props;

  return (
    <div className="search-row">
      <div>
        <MantineSearchBar
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
        />
      </div>
      <div>
        <select
          className="Admin--SelectDoctor"
          value={selectedDoctor}
          onChange={onDoctorChangeHandler}
        >
          {renderSelectOptions.length === 0 ? (
            <option value="" defaultValue>
              No Doctor Found
            </option>
          ) : (
            renderSelectOptions
          )}
        </select>
      </div>
    </div>
  );
}

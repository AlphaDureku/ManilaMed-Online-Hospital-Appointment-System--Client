import AddDS from "./AddDocandSec";
import AvailableDocandSec from "./availableDocandSec";
export default function Content(props) {
  return (
    <>
 <div className="Head--DashboardContainer">
  <div className="Head--Dashboard-left">
    <div className="search-row"></div>
    <div className="ContentTable">
    <AvailableDocandSec/>
    </div>
  </div>
  <div className="Head--Dashboard-right">
    <div className="DocSecTable"></div>
    <div className="DocSecInsert">
      <AddDS
      />
    </div>
  </div>
</div>

    </>
  );
}

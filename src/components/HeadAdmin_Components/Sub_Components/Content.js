import NavBar from "../../Booking Components/NavBar/NavBar";
import AddDS from "./AddDocandSec";
export default function Content() {
  return (
    <>
 <div className="Head--DashboardContainer">
  <div className="Head--Dashboard-left">
    <div className="search-row"></div>
    <div className="ContentTable"></div>
  </div>
  <div className="Head--Dashboard-right">
    <div className="DocSecTable"></div>
    <div className="DocSecInsert">
      <AddDS/>
    </div>
  </div>
</div>

    </>
  );
}

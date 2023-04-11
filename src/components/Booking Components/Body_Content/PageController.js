import FirstPage from "./FirstPage/1st_Page";
import SecondPage from "./SecondPage/2ndPage";

export default function PageController(props) {
  if (props.currentPage == 1) {
    return (
      <>
        <FirstPage setCurrentPage={props.setCurrentPage} />
      </>
    );
  } else if (props.currentPage == 2) {
    return (
      <>
        <SecondPage setCurrentPage={props.setCurrentPage} />
      </>
    );
  }
}

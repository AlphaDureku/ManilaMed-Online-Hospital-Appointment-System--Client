import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  const style = { margin: "10px", borderRadius: "8px" };
  return (
    <>
      <div style={style} className="LandingPage--Loading-Card">
        <Skeleton height={"125px"} baseColor={"white"} />
      </div>
      <div style={style} className="LandingPage--Loading-Card">
        <Skeleton height={"125px"} baseColor={"white"} />
      </div>
      <div style={style} className="LandingPage--Loading-Card">
        <Skeleton height={"125px"} baseColor={"white"} />
      </div>
      <div style={style} className="LandingPage--Loading-Card">
        <Skeleton height={"125px"} baseColor={"white"} />
      </div>
    </>
  );
}

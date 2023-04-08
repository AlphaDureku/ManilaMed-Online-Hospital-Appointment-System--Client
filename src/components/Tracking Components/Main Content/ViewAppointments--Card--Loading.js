import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  const style = { margin: "10px", borderRadius: "8px" };
  return (
    <div className="grid-container">
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
      <div style={style}>
        <Skeleton height={"200px"} />
      </div>
    </div>
  );
}

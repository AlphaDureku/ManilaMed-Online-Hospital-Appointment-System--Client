import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  const style = {
    margin: "10px 0",
  };
  return (
    <>
      <Skeleton height={"130px"} style={style} />
      <Skeleton height={"130px"} style={style} />
      <Skeleton height={"130px"} style={style} />
      <Skeleton height={"130px"} style={style} />
      <Skeleton height={"130px"} style={style} />
    </>
  );
}

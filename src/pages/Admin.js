import { useEffect } from "react";
export default function Admin() {
  useEffect(() => {
    document.title = "Administrator";
  }, []);
  return <div></div>;
}

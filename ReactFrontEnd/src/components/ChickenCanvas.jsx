import { useEffect } from "react";
import "../styles.css";

export default function ChickenCanvas() {
  useEffect(() => {
    import("../legacy_chicken/index.jsx");
  }, []);

  return (
    <>
      <canvas className="zdog-canvas"></canvas>
    </>
  );
}

import { useEffect } from "react";
import "../styles.css";

export default function ChickenCanvas() {
  useEffect(() => {
    import("../chicken_model/index.jsx");
  }, []);

  return (
    <>
      <canvas className="zdog-canvas"></canvas>
    </>
  );
}

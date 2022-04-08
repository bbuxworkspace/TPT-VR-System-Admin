import React from "react";
import TopKill from "../TopKill/TopKill";
import styles from "./ScreenV1.module.scss";

const ScreenV1 = () => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex justify-content-center">
      <TopKill />
      </div>
    </div>
  );
};

export default ScreenV1;

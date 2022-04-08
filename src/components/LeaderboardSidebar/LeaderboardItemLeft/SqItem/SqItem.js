import React from "react";
import styles from "./SqItem.module.scss";

const SqItem = ({ status }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        status === "done"
          ? styles.done
          : status === "active"
          ? styles.active
          : ""
      }`}
    ></div>
  );
};

export default SqItem;

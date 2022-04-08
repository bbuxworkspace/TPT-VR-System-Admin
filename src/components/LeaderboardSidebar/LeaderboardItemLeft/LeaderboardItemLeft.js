import React from "react";
import styles from "./LeaderboardItemLeft.module.scss";
import spikeImg from "../../../assets/leaderboard/Spike.svg";
import bottomLeftIcon from "../../../assets/leaderboard/bottomLeftIcon.png";
import targetIcon from "../../../assets/leaderboard/target.png";
import SqItem from "./SqItem/SqItem";

const LeaderboardItemLeft = ({
  ko,
  spike,
  img,
  name,
  gun,
  skill,
  progress,
  active,
  target,
}) => {
  const divList = () => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      list.push(
        <SqItem
          status={
            i < active - 1 ? "done" : i === active - 1 ? "active" : "pending"
          }
          key={i}
        />
      );
    }
    return list;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.img_wrapper}>
        {spike ? (
          <img src={spikeImg} className={styles.spike} alt="spike" />
        ) : null}
        <div className={styles.img_border}>
          <img src={img} className={styles.img} alt="" />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      {ko ? (
        <div className={styles.ko}>K.O</div>
      ) : (
        <div className={styles.infobar}>
          <div className={styles.shade}></div>
          <div className={styles.top}>
            <div className={styles.gun}>
              <img src={gun} className={styles.gun_img} alt="gun" />
            </div>
            <div className={styles.skills}>
              {skill.map((sk) => (
                <img
                  src={sk.image}
                  key={sk.id}
                  className={styles.skill_img}
                  alt="skill"
                />
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom_left}>
              <img
                src={bottomLeftIcon}
                className={styles.bottom_left_icon}
                alt="icon"
              />
              <div className={styles.bottom_left_progress}>
                <span className={styles.progress_text}>{progress}</span>
                <div className={styles.progress}>
                  <div className={styles.bar} style={{ width: progress }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              {divList()}
            </div>
            <div className="d-flex align-items-center">
              <img src={targetIcon} className={styles.target} alt="" />
              <span className={styles.target_text}>{target}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardItemLeft;

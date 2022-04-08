import React from "react";
import { LeaderboardItemLeft } from "./LeaderboardItemLeft";
import styles from "./LeaderboardSidebar.module.scss";
import playerLogo from "../../assets/Demo/playerLogo.png";
import gunLogo from "../../assets/Demo/gun.svg";
import skill1 from "../../assets/Demo/skill1.png";
import skill2 from "../../assets/Demo/skill2.png";
import skill3 from "../../assets/Demo/skill3.png";

const LeaderboardSidebar = () => {
  const demoSkill = [
    {
      id: 1,
      image: skill1,
    },
    {
      id: 2,
      image: skill2,
    },
    {
      id: 3,
      image: skill3,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <LeaderboardItemLeft img={playerLogo} name="Mahin" ko />
      <LeaderboardItemLeft
        spike
        img={playerLogo}
        name="TM24"
        skill={demoSkill}
        gun={gunLogo}
        progress={50}
        active={7}
        target={2000}
      />
      <LeaderboardItemLeft
        img={playerLogo}
        name="TEST"
        skill={demoSkill}
        gun={gunLogo}
        progress={40}
        active={4}
        target={1400}
      />
      <LeaderboardItemLeft
        img={playerLogo}
        name="NooB"
        skill={demoSkill}
        gun={gunLogo}
        progress={98}
        active={3}
        target={500}
      />
    </div>
  );
};

export default LeaderboardSidebar;

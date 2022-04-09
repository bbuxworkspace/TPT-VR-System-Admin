import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { BsFolderPlus } from "react-icons/bs";
import { TiCogOutline } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { logout } from "../../../actions/Dashboard.action";
import { connect } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineHome,
} from "react-icons/ai";
import { CgGames } from "react-icons/cg";

const Layout = ({ logout, children, title }) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const logoutHandeler = async () => {
    let check = await logout();
    if (check === true) {
      navigate("/");
    }
  };
  return (
    <div>
      <Container fluid>
        <Row className="position-relative">
          <Col
            md={2}
            className={`px-4 pt-md-4 pt-0 ${styles.wrapper} ${
              show ? styles.active : ""
            }`}
          >
            <div className="d-flex justify-content-between align-items-center w-100">
              <div
                className={`${styles.ham}  ms-auto`}
                onClick={() => setShow(!show)}
              >
                <GoThreeBars />
              </div>
            </div>

            <div className={styles.nav}>
              <NavLink to="/dashboard" className={styles.nav__item}>
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className={styles.nav__item_text}>Dashboard</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/users" className={styles.nav__item}>
                <span className={styles.icon}>
                  <AiOutlineUser />
                </span>
                <span className={styles.nav__item_text}>Dashboard</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/team" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BsPeople />
                </span>
                <span className={styles.nav__item_text}>Teams</span>
              </NavLink>
            </div>

            <div className={styles.nav}>
              <NavLink to="/add-game" className={styles.nav__item}>
                <span className={styles.icon}>
                  <CgGames />
                </span>
                <span className={styles.nav__item_text}>Add Game</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/category" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BsFolderPlus />
                </span>
                <span className={styles.nav__item_text}>Category</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/settings" className={styles.nav__item}>
                <span className={styles.icon}>
                  <TiCogOutline />
                </span>
                <span className={styles.nav__item_text}>Settings</span>
              </NavLink>
            </div>

            <div className={styles.nav}>
              <div className={styles.nav__item} onClick={logoutHandeler}>
                <span className={styles.icon}>
                  <FiLogOut />
                </span>
                <span className={styles.nav__item_text}>Logout</span>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-end align-items-center py-3">
              <div
                className={`${styles.ham}  me-auto`}
                onClick={() => setShow(!show)}
              >
                <GoThreeBars />
              </div>
              <h3 className="me-auto ps-4 fs-3 my-auto">{title}</h3>
              <NavLink to="/notification" className={styles.right__item}>
                <IoMdNotificationsOutline />
              </NavLink>
              <NavLink to="/settings" className={styles.right__item}>
                <TiCogOutline />
              </NavLink>
              {/* <UserInfoTopbar /> */}
            </div>
            <Container>{children}</Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { logout })(Layout);

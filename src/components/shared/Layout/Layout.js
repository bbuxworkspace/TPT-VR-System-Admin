import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Layout.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFolderPlus } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { logout } from "../../../actions/Dashboard.action";
import { connect } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { BiPrinter, BiBookBookmark } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { ImStack } from "react-icons/im";

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
              <NavLink to="/books" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BiBookBookmark />
                </span>
                <span className={styles.nav__item_text}>Books</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/collection" className={styles.nav__item}>
                <span className={styles.icon}>
                  <ImStack />
                </span>
                <span className={styles.nav__item_text}>Collection</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/shelf" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BsBookmarks />
                </span>
                <span className={styles.nav__item_text}>Book Shelf</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/series" className={styles.nav__item}>
                <span className={styles.icon}>
                  <MdOutlineCollectionsBookmark />
                </span>
                <span className={styles.nav__item_text}>Series</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/author" className={styles.nav__item}>
                <span className={styles.icon}>
                  <AiOutlineUser />
                </span>
                <span className={styles.nav__item_text}>Author</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/publisher" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BiPrinter />
                </span>
                <span className={styles.nav__item_text}>Publisher</span>
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
            {/* <div className={styles.nav}>
              <NavLink to="/settings" className={styles.nav__item}>
                <span className={styles.icon}>
                  <TiCogOutline />
                </span>
                <span className={styles.nav__item_text}>Settings</span>
              </NavLink>
            </div> */}

            <div className={styles.nav}>
              <div className={styles.nav__item} onClick={logoutHandeler}>
                <span className={styles.icon}>
                  <FiLogOut />
                </span>
                <span className={styles.nav__item_text}>Logout</span>
              </div>
            </div>
          </Col>
          <Col md={10} className="bg-light">
            <div className="d-flex justify-content-end align-items-center py-3">
              <div
                className={`${styles.ham}  me-auto`}
                onClick={() => setShow(!show)}
              >
                <GoThreeBars />
              </div>
              <h3 className="me-auto ps-4 fs-3 my-auto">{title}</h3>
              {/* <NavLink to="/notification" className={styles.right__item}>
                <IoMdNotificationsOutline />
              </NavLink> */}
              {/* <NavLink to="/settings" className={styles.right__item}>
                <TiCogOutline />
              </NavLink> */}
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

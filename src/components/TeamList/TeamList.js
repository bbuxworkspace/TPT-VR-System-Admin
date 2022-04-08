import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TeamList.module.scss";
import demoImg from "../../assets/Demo/plr.webp";
import { connect } from "react-redux";
import { AiOutlineDoubleRight, AiOutlineUserAdd } from "react-icons/ai";
import { getTeamList } from "../../actions/Team.action";

const TeamList = ({ team, getTeamList, selected_game }) => {
  const navigate = useNavigate();
  const [list, setList] = useState(team === null ? [] : team);
  useEffect(() => {
    if (selected_game === null) {
      navigate("/dashboard");
    } else if (team === null) {
      getTeamList(selected_game._id);
    }
    if (team !== null) {
      setList(team);
    }
  }, [team]);

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList(
        team.filter((item) => {
          return (
            item.teamName.toLowerCase().includes(text.toLowerCase()) ||
            item.teamUniqueId.toLowerCase().includes(text.toLowerCase()) ||
            item.mail.toLowerCase().includes(text.toLowerCase()) ||
            item.phone.toLowerCase().includes(text.toLowerCase()) ||
            item.tag.toLowerCase().includes(text.toLowerCase())
          );
        })
      );
    } else {
      setList(team);
    }
    setSearchText(text);
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Team</span>
          <Form.Control
            type="text"
            placeholder="Search team..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/team/add-team" className={styles.add}>
            <AiOutlineUserAdd />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {team === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {list !== null &&
                list.map((item, i) => (
                  <Row
                    key={item._id}
                    className={`mb-3 pb-3 ${
                      list.length - 1 === i ? "" : "border-bottom"
                    }`}
                  >
                    <Col md={2}>
                      <Row>
                        <Col
                          md={7}
                          className={`${styles.small} d-flex align-items-center`}
                        >
                          <div className={styles.img_wrapper}>
                            <img src={demoImg} alt="" className={styles.img} />
                          </div>
                        </Col>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={5} className="">
                      <div className="">
                        <Link
                          to={`/team/${item.teamUniqueId}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {item.teamName}{" "}
                        </Link>
                      </div>
                      <span className="d-block fw-normal">
                        <span className="fw-bold me-2">ID:</span>
                        {item.teamUniqueId}
                      </span>
                      <span className="d-block fw-light text-secondary">
                        <Moment format="dddd, MMMM DD YYYY">
                          {item.createdAt}
                        </Moment>
                      </span>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div className={styles.line}></div>
                    </Col>
                    <Col md={3} className="">
                      <span className="d-block fw-normal">
                        <span className=" me-2">Tag:</span>
                        {item.tag}
                      </span>
                      <span className="d-block fw-normal">
                        <span className=" me-2">Mail:</span>
                        {item.mail}
                      </span>
                      <span className="d-block fw-normal">
                        <span className=" me-2">Phone:</span>
                        {item.phone}
                      </span>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/team/${item.teamUniqueId}`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineDoubleRight />
                      </Link>
                    </Col>
                  </Row>
                ))}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  selected_game: state.game.selected_game,
  team: state.game.teams,
});

export default connect(mapStateToProps, { getTeamList })(TeamList);

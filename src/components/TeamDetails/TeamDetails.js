import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { FaRegSadCry } from "react-icons/fa";
import { AiFillTrophy, AiOutlineTeam } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import styles from "./TeamDetails.module.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeamDetails = ({ team }) => {
  return (
    <Container>
      <Row>
        <Col md={4} className="my-2">
          <div className="crd shadow px-0 ">
            <img
              src={team.pictureUrl}
              alt={team.teamName}
              className={styles.image}
            />
          </div>
        </Col>
        <Col md={8} className="my-2">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <Button as={Link} to="/players" className="btn_primary">
              Go Back
            </Button>
            <Button
              as={Link}
              to={`/team/${team.teamUniqueId}/edit`}
              className="btn_primary"
            >
              Edit
            </Button>
          </div>
          <Card className="crd shadow ">
            <Card.Body>
              <h4>
                Name: <span className="fw-normal">{team.teamName}</span>
              </h4>
              <h5>
                ID: <span className="fw-normal">{team.teamUniqueId}</span>
              </h5>
              <h5>
                Tag: <span className="fw-normal">{team.tag}</span>
              </h5>
              <h5>
                Email: <span className="fw-normal">{team.mail}</span>
              </h5>
              <h4 className="text-secondary fs-5">
                Joined:{" "}
                <span className="fw-normal ">
                  <Moment format="DD MMMM YYYY">{team.createdAt}</Moment>
                </span>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} className="my-2">
          <Card className="crd shadow hov__card">
            <Card.Body>
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center py-3"
                >
                  <span className={`${styles.icon}`}>
                    <IoGameController />
                  </span>
                </Col>
                <Col
                  xs={8}
                  className="d-flex justify-content-center flex-column"
                >
                  <span className="d-block fs-5">Total Match </span>
                  <span className="d-block fw-bold">0</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} className="my-2">
          <Card className="crd shadow hov__card">
            <Card.Body>
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center py-3"
                >
                  <span className={`${styles.icon}`}>
                    <AiFillTrophy />
                  </span>
                </Col>
                <Col
                  xs={8}
                  className="d-flex justify-content-center flex-column"
                >
                  <span className="d-block fs-5">Total Win </span>
                  <span className="d-block fw-bold">0</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} className="my-2">
          <Card className="crd shadow hov__card">
            <Card.Body>
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center py-3"
                >
                  <span className={`${styles.icon}`}>
                    <FaRegSadCry />
                  </span>
                </Col>
                <Col
                  xs={8}
                  className="d-flex justify-content-center flex-column"
                >
                  <span className="d-block fs-5">Total Loss </span>
                  <span className="d-block fw-bold">0</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {team && team.players && team.players.length > 0 ? (
        <Row>
          <Col md={12} className="my-2 text-center h2 pt-3">
            Players
          </Col>
          {team.players.map((player) => (
            <Col xs={6} md={3} className="my-2">
              <Card className="crd shadow hov__card">
                <Card.Body className={styles.player}>
                  <div className={styles.img_player_wrapper}>
                    <img
                      src={`${player.pictureUrl}`}
                      className={styles.img_player}
                      alt={player.name}
                    />
                  </div>
                  <div className="ps-3">
                    <Link
                      to={`/players/${player.playerUniqueId}`}
                      className={`d-block fs-6 fw-bold ${styles.link}`}
                    >
                      {player.name}
                    </Link>
                    <span className="d-block fs-6 ">
                      ID: {player.customGameId}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}
    </Container>
  );
};

export default TeamDetails;

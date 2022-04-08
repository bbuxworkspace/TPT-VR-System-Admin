import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { FaRegSadCry } from "react-icons/fa";
import { AiFillTrophy, AiOutlineTeam } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import styles from "./PlayerDetails.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { deletePlayer } from "../../actions/Player.action";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const PlayerDetails = ({ player, deletePlayer }) => {
  const modals = useModals();
  const navigate = useNavigate();
  const deleteHandeler = () =>
    modals.openConfirmModal({
      title: "Delete this player",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this player? This action is
          destructive and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(),
    });

  const confirmHandeler = async () => {
    let check = await deletePlayer(player.playerUniqueId);
    if (check === true) {
      toast.success("Player deleted successfully");
      navigate("/players");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Container>
      <Row>
        <Col md={4} className="my-2">
          <div className="crd shadow px-0 ">
            <img
              src={player.pictureUrl}
              alt={player.name}
              className={styles.image}
            />
          </div>
        </Col>
        <Col md={8} className="my-2">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <Button as={Link} to="/players" className="btn_primary">
              Go Back
            </Button>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="danger"
                className="btn_danger me-3"
                onClick={deleteHandeler}
              >
                Delete
              </Button>
              <Button
                as={Link}
                to={`/players/${player.playerUniqueId}/edit`}
                className="btn_primary"
              >
                Edit
              </Button>
            </div>
          </div>
          <Card className="crd shadow ">
            <Card.Body>
              <h4>
                Name: <span className="fw-normal">{player.name}</span>
              </h4>
              <h5>
                ID: <span className="fw-normal">{player.playerUniqueId}</span>
              </h5>
              <h4 className="text-secondary fs-5">
                Joined:{" "}
                <span className="fw-normal ">
                  <Moment format="DD MMMM YYYY">{player.createdAt}</Moment>
                </span>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={6}
          md={player.teamId && player.teamId !== null ? 3 : 4}
          className="my-2"
        >
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
                  <span className="d-block fw-bold">
                    {player.totalPlayedMatch}
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={6}
          md={player.teamId && player.teamId !== null ? 3 : 4}
          className="my-2"
        >
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
                  <span className="d-block fw-bold">{player.totalWin}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={6}
          md={player.teamId && player.teamId !== null ? 3 : 4}
          className="my-2"
        >
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
                  <span className="d-block fw-bold">{player.totalLoss}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={6}
          md={player.teamId && player.teamId !== null ? 3 : 4}
          className={`my-2 ${
            player.teamId && player.teamId !== null ? "" : "d-none"
          }`}
        >
          <Card className="crd shadow hov__card">
            <Card.Body>
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center py-3"
                >
                  <span className={`${styles.icon}`}>
                    <AiOutlineTeam />
                  </span>
                </Col>
                <Col
                  xs={8}
                  className="d-flex justify-content-center flex-column"
                >
                  <span className="d-block fs-5">Team </span>
                  <Link
                    to={`/team/${
                      player &&
                      player.teamId &&
                      player.teamId &&
                      player.teamId.teamUniqueId
                    }`}
                    className={`${styles.team} d-block fw-bold`}
                  >
                    {player.teamId && player.teamId !== null
                      ? player.teamId.teamName
                      : null}{" "}
                    <span>
                      <HiOutlineArrowNarrowRight />
                    </span>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, { deletePlayer })(PlayerDetails);

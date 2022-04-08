import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
  Container,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./AddTeamForm.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createTeam, updateTeam } from "../../actions/Team.action";
import { MultiSelect } from "@mantine/core";
import { getPlayerList } from "../../actions/Player.action";
import { toast } from "react-toastify";

const AddTeamForm = ({
  createTeam,
  selected_game,
  players,
  getPlayerList,
  updateTeam,
  update,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamMeamber, setTeamMeamber] = useState(
    update && data
      ? data.players.map((item, i) => ({
          key: i,
          label: `${item.name} - ${item.customGameId} - ${item.playerUniqueId}`,
          value: item._id,
        }))
      : []
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!selected_game) {
      navigate("/dashboard");
    }
    if (players === null) {
      getPlayerList(selected_game._id);
    }
    if (update) {
      setTeamMeamber(data.players.map((item) => item._id));
    }
  }, []);
  const onSubmitHandeler = async (values) => {
    console.log(teamMeamber);
    if (teamMeamber.length === 0 && !update) {
      toast.error("Please select at least one player");
      return;
    }
    setIsLoading(true);

    let check =
      update === true
        ? await updateTeam(
            values,
            selected_game._id,
            teamMeamber,
            data.teamUniqueId
          )
        : await createTeam(values, selected_game._id, teamMeamber);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/team");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    name: data && data.teamName ? data.teamName : "",
    teamUniqueId: data && data.teamUniqueId ? data.teamUniqueId : "",
    tag: data && data.tag ? data.tag : "",
    mail: data && data.mail ? data.mail : "",
    phone: data && data.phone ? data.phone : "",
    pictureUrl: data && data.pictureUrl ? data.pictureUrl : "",
    gameId: selected_game._id || "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Game Name is required!"),
    teamUniqueId: Yup.string().required("Team ID is required!"),
    tag: Yup.string().required("Team Tag is required!"),
    mail: Yup.string().required("Team Email is required!"),
    phone: Yup.string().required("Team Phone is required!"),
    pictureUrl: Yup.string().required("Game photo url is required!"),
  });
  return (
    <Container>
      <Card bg="white" text="dark" className={`crd shadow mb-4`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            {update ? "Update Team Information" : "Fill the form to add a team"}
          </h1>
          <Formik
            initialValues={initVals}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="name" className="d-block">
                      Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type name of the team..."
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="teamUniqueId" className="d-block">
                      Custom In Game ID
                    </label>
                    {errors.teamUniqueId && touched.teamUniqueId ? (
                      <small className="text-danger pt-2">
                        {errors.teamUniqueId}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type Custom Team ID..."
                    name="teamUniqueId"
                    isValid={!errors.teamUniqueId && touched.teamUniqueId}
                    type="text"
                    disabled={update}
                    className={`${styles.input} w-100`}
                    isInvalid={errors.teamUniqueId && touched.teamUniqueId}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="tag" className="d-block">
                      Team Tag
                    </label>
                    {errors.tag && touched.tag ? (
                      <small className="text-danger pt-2">{errors.tag}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type team tag..."
                    name="tag"
                    isValid={!errors.tag && touched.tag}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.tag && touched.tag}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="mail" className="d-block">
                      Team Email
                    </label>
                    {errors.mail && touched.mail ? (
                      <small className="text-danger pt-2">{errors.mail}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type team email..."
                    name="mail"
                    isValid={!errors.mail && touched.mail}
                    type="email"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.mail && touched.mail}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="phone" className="d-block">
                      Team Phone
                    </label>
                    {errors.phone && touched.phone ? (
                      <small className="text-danger pt-2">{errors.phone}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type team phone..."
                    name="phone"
                    isValid={!errors.phone && touched.phone}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.phone && touched.phone}
                  />
                </InputGroup>
                <div className="pb-3">
                  <MultiSelect
                    data={
                      players !== null
                        ? [
                            ...players.map((item, i) => ({
                              key: i,
                              label: `${item.name} - ${item.customGameId} - ${item.playerUniqueId}`,
                              value: item._id,
                            })),
                          ]
                        : []
                    }
                    value={teamMeamber}
                    onChange={(e) => setTeamMeamber(e)}
                    searchable={true}
                    label="Team members"
                    placeholder="Select team members..."
                  />
                </div>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="pictureUrl" className="d-block">
                      Photo URL link
                    </label>
                    {errors.pictureUrl && touched.pictureUrl ? (
                      <small className="text-danger pt-2">
                        {errors.pictureUrl}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type Photo URL link of team..."
                    name="pictureUrl"
                    isValid={!errors.pictureUrl && touched.pictureUrl}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.pictureUrl && touched.pictureUrl}
                  />
                </InputGroup>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn_primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : update ? "Save" : "Add Team"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  players: state.game.players,
  selected_game: state.game.selected_game,
});

export default connect(mapStateToProps, {
  createTeam,
  getPlayerList,
  updateTeam,
})(AddTeamForm);

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
import styles from "./AddCategoryForm.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createPlayer, updatePlayer } from "../../actions/Player.action";

const AddCategoryForm = ({ createPlayer, update, data, updatePlayer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check =
      update === true
        ? await updatePlayer(values, data.playerUniqueId)
        : await createPlayer(values);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/players");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    name: data && data.name ? data.name : "",
    customGameId: data && data.customGameId ? data.customGameId : "",
    pictureUrl: data && data.pictureUrl ? data.pictureUrl : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Game Name is required!"),
    customGameId: Yup.string().required("Short code is required!"),
    pictureUrl: Yup.string().required("Picture url is required!"),
  });
  return (
    <Container>
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">Fill the form to add a player</h1>
          <Formik
            initialValues={initVals}
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
                    placeholder="Type name of the game..."
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="customGameId" className="d-block">
                      Custom In Game ID
                    </label>
                    {errors.customGameId && touched.customGameId ? (
                      <small className="text-danger pt-2">
                        {errors.customGameId}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type Custom In Game ID..."
                    name="customGameId"
                    isValid={!errors.customGameId && touched.customGameId}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.customGameId && touched.customGameId}
                  />
                </InputGroup>
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
                    placeholder="Photo URL link..."
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
                    {isLoading ? "Loading..." : update ? "Save" : "Add Player"}
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
});

export default connect(mapStateToProps, { createPlayer, updatePlayer })(
  AddCategoryForm
);

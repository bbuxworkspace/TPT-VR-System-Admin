import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
  Container,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./AddGameForm.module.scss";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../actions/Game.action";

const AddGameForm = ({ createGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await createGame(values);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    name: "",
    code: "",
    gameUniqueId: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Game Name is required!"),
    code: Yup.string().required("Short code is required!"),
    gameUniqueId: Yup.string().required("Game Unique Id is required!"),
  });
  return (
    <Container>
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            Fill the form to add a new game
          </h1>
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
                    <label htmlFor="code" className="d-block">
                      Short Code
                    </label>
                    {errors.code && touched.code ? (
                      <small className="text-danger pt-2">{errors.code}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type short code of the game..."
                    name="code"
                    isValid={!errors.code && touched.code}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.code && touched.code}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="gameUniqueId" className="d-block">
                      Game Unique Id
                    </label>
                    {errors.gameUniqueId && touched.gameUniqueId ? (
                      <small className="text-danger pt-2">
                        {errors.gameUniqueId}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type Game Unique Id of the game..."
                    name="gameUniqueId"
                    isValid={!errors.gameUniqueId && touched.gameUniqueId}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.gameUniqueId && touched.gameUniqueId}
                  />
                </InputGroup>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn_primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Add Game"}
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

export default connect(null, { createGame })(AddGameForm);

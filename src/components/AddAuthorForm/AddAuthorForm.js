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
import styles from "./AddAuthorForm.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createAuthor, updateAuthor } from "../../actions/Author.action";
import { toast } from "react-toastify";

const AddAuthorForm = ({ createAuthor, update, data, updateAuthor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [AuthImage, setAuthImage] = useState(undefined);
  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check =
      update === true
        ? await updateAuthor(values, AuthImage, data._id)
        : await createAuthor(values, AuthImage);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(-1);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  //ONSELECT FILE HANDELER LOGO B
  const onSelectFile2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAuthImage(undefined);
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size must be less than 2MB");
      return;
    }
    // console.log(e.target.files[0]);
    setAuthImage(e.target.files[0]);
  };

  let initVals = {
    name: data && data.name ? data.name : "",
    birth: data && data.birth ? data.birth : "",
    death: data && data.death ? data.death : "",
    location: data && data.location ? data.location : "",
    description: data && data.description ? data.description : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    birth: Yup.string().required("Birthday is required!"),
    location: Yup.string().required("Location is required!"),
    description: Yup.string().required("Description is required!"),
    death: Yup.string().notRequired(),
  });
  return (
    <Container className="pb-4">
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            Fill the form to {update ? "update" : "add"} author
          </h1>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            enableReinitialize
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
                    placeholder="Type name of author..."
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="location" className="d-block">
                      Location
                    </label>
                    {errors.location && touched.location ? (
                      <small className="text-danger pt-2">
                        {errors.location}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type location..."
                    name="location"
                    isValid={!errors.location && touched.location}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.location && touched.location}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="description" className="d-block">
                      Description
                    </label>
                    {errors.description && touched.description ? (
                      <small className="text-danger pt-2">
                        {errors.description}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type description..."
                    name="description"
                    isValid={!errors.description && touched.description}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.description && touched.description}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="birth" className="d-block">
                      Birthday
                    </label>
                    {errors.birth && touched.birth ? (
                      <small className="text-danger pt-2">{errors.birth}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type birthday..."
                    name="birth"
                    isValid={!errors.birth && touched.birth}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.birth && touched.birth}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="death" className="d-block">
                      Death Year
                    </label>
                    {errors.death && touched.death ? (
                      <small className="text-danger pt-2">{errors.death}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Empty if still alive..."
                    name="death"
                    isValid={!errors.death && touched.death}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.death && touched.death}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="image" className="d-block">
                      Author Image
                    </label>
                  </div>
                  <BootstrapForm.Control
                    type="file"
                    id="image"
                    className={`${styles.logo} w-100`}
                    onChange={(e) => onSelectFile2(e)}
                  />
                </InputGroup>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn_primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : update ? "Save" : "Add Author"}
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

export default connect(mapStateToProps, {
  createAuthor,
  updateAuthor,
})(AddAuthorForm);

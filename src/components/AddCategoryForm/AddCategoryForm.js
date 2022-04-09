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
import { createCategory, updateCategory } from "../../actions/Category.action";

const AddCategoryForm = ({ createCategory, update, data, updateCategory }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check =
      update === true
        ? await updateCategory(values, data._id)
        : await createCategory(values);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/category");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    name: data && data.name ? data.name : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required!"),
  });
  return (
    <Container>
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            Fill the form to add a category
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
                    placeholder="Type name of the category..."
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn_primary"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Loading..."
                      : update
                      ? "Save"
                      : "Add Category"}
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

export default connect(mapStateToProps, { createCategory, updateCategory })(
  AddCategoryForm
);

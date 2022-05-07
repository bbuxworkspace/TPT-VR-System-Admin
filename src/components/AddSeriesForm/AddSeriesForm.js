import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
  Container,
  Spinner,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./AddSeriesForm.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createSeries, updateSeries } from "../../actions/Series.action";
import { getBookList } from "../../actions/Book.action";
import { BASE_URL } from "../../constants/URL";
import { MultiSelect } from "@mantine/core";

const AddSeriesForm = ({
  createSeries,
  update,
  data,
  updateSeries,
  bookData,
  getBookList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (bookData === null) {
      getBookList();
    }
  }, []);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check =
      update === true
        ? await updateSeries(values, books, data._id)
        : await createSeries(values, books);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(-1);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    name: data && data.name ? data.name : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Series name is required!"),
  });
  return (
    <Container className="pb-4">
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            Fill the form to {update ? "update" : "add"} Series
          </h1>
          {!bookData ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
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
                        <small className="text-danger pt-2">
                          {errors.name}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type name of Series..."
                      name="name"
                      isValid={!errors.name && touched.name}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.name && touched.name}
                    />
                  </InputGroup>

                  <MultiSelect
                    data={bookData.items.map((item) => ({
                      value: item._id,
                      label: item.name,
                      image: `${BASE_URL}/image/small/${item.image}`,
                    }))}
                    label="Books for this series"
                    placeholder="Pick the books for this series..."
                    name="books"
                    required
                    searchable
                    clearable
                    onChange={(value) => {
                      setBooks(value);
                    }}
                    defaultValue={books}
                  />

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
                        : "Add Series"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  bookData: state.book.book,
});

export default connect(mapStateToProps, {
  createSeries,
  updateSeries,
  getBookList,
})(AddSeriesForm);

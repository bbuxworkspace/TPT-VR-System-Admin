import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
  Container,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./AddBookForm.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createbook, updatebook } from "../../actions/Book.action";
import { getCategoryList } from "../../actions/Category.action";
import { getSubCategoryList } from "../../actions/SubCategory.action";
import { getAuthorList } from "../../actions/Author.action";
import { getPublisherList } from "../../actions/Publisher.action";
import { Select } from "@mantine/core";

const AddBookForm = ({
  category,
  subcategory,
  publisher,
  author,
  createbook,
  update,
  data,
  updatebook,
  getCategoryList,
  getSubCategoryList,
  getAuthorList,
  getPublisherList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [BookImage, setBookImage] = useState(undefined);
  const [AudioFile, setAudioFile] = useState(undefined);
  const [PdfFile, setPdfFile] = useState(undefined);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    data && data.categoryId ? data.categoryId : ""
  );

  useEffect(() => {
    if (author === null) {
      getAuthorList();
    }
    if (publisher === null) {
      getPublisherList();
    }
    if (category === null) {
      getCategoryList();
    }

    if (selectedCategory !== "" && subcategory === null) {
      getSubCategoryList(selectedCategory);
    }
    if (data && data.categoryId) {
      setSelectedCategory(data.categoryId);
      getSubCategoryList(data.categoryId);
    }
  }, [author, publisher, category]);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check =
      update === true
        ? await updatebook(values, BookImage, AudioFile, PdfFile, data._id)
        : await createbook(values, BookImage, AudioFile, PdfFile);
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
      setBookImage(undefined);
      return;
    }
    if (e.target.files[0].size > 2000000) {
      toast.error("File size must be less than 2MB");
      return;
    }
    // console.log(e.target.files[0]);
    setBookImage(e.target.files[0]);
  };
  //ONSELECT FILE HANDELER Audio
  const onSelectFileAudio = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAudioFile(undefined);
      return;
    }
    // if (e.target.files[0].size > 2000000) {
    //   toast.error("File size must be less than 2MB");
    //   return;
    // }
    // console.log(e.target.files[0]);
    setAudioFile(e.target.files[0]);
  };
  //ONSELECT FILE HANDELER PDF
  const onSelectFilePdf = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPdfFile(undefined);

      return;
    }
    //console.log(e.target.files[0].type);
    if (
      e.target.files[0].type !== "application/pdf" &&
      !e.target.files[0].type.includes("epub")
    ) {
      toast.error("File must be in PDF format");
      return;
    }
    // console.log(e.target.files[0]);
    setPdfFile(e.target.files[0]);
  };

  let initVals = {
    name: data && data.name ? data.name : "",
    price: data && data.price ? data.price : 0,
    page: data && data.page ? data.page : 0,
    //isbn: data && data.isbn ? data.isbn : "",
    year: data && data.year ? data.year : "",
    description: data && data.description ? data.description : "",
    edition: data && data.edition ? data.edition : "",
    publisher: data && data.publisher._id ? data.publisher._id : "",
    author: data && data.writer._id ? data.writer._id : "",
    language: data && data.language ? data.language : "",
    category: data && data.category._id ? data.category._id : "",
    subcategory: data && data.subCategory._id ? data.subCategory._id : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    price: Yup.string().required("Price is required!"),
    page: Yup.string().required("Page is required!"),
    year: Yup.string().required("Year is required!"),
    //isbn: Yup.string().required("ISBN is required!"),
    edition: Yup.string().required("Edition is required!"),
    description: Yup.string().required("Description is required!"),
    language: Yup.string().required("Language is required!"),
    author: Yup.string().required("Author is required!"),
    category: Yup.string().required("Category is required!"),
    subcategory: Yup.string().required("Subcategory is required!"),
  });
  return (
    <Container className="pb-4">
      <Card bg="white" text="dark" className={`crd shadow`}>
        <Card.Body>
          <h1 className="fs-4 fw-normal py-3">
            Fill the form to {update ? "update" : "add"} book
          </h1>
          {author === null || category === null || publisher === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 700 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <Formik
              initialValues={initVals}
              validationSchema={SignupSchema}
              enableReinitialize={true}
              onSubmit={(values) => onSubmitHandeler(values)}
            >
              {({ errors, touched, values, setFieldValue }) => (
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
                      placeholder="Type name of book..."
                      name="name"
                      isValid={!errors.name && touched.name}
                      type="text"
                      autoComplete="off"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.name && touched.name}
                    />
                  </InputGroup>
                  <Row>
                    <Col className="pb-3">
                      <label htmlFor="publisher" className="d-block">
                        Publisher
                      </label>
                      {publisher ? (
                        <Select
                          placeholder="Pick one publisher..."
                          data={
                            publisher &&
                            publisher.items.map((item) => {
                              return { value: item._id, label: item.name };
                            })
                          }
                          id="publisher"
                          autoComplete="off"
                          value={values.publisher}
                          onChange={(e) => {
                            setFieldValue("publisher", e);
                          }}
                          defaultValue={values.publisher}
                          searchable={true}
                          error={
                            errors.publisher && touched.publisher
                              ? errors.publisher
                              : null
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="pb-3">
                      <label htmlFor="author" className="d-block">
                        Author
                      </label>
                      {author ? (
                        <Select
                          placeholder="Pick one author..."
                          data={
                            author !== null
                              ? author.items.map((item) => {
                                  return { value: item._id, label: item.name };
                                })
                              : null
                          }
                          id="author"
                          defaultValue={values.author}
                          value={values.author}
                          autoComplete="off"
                          onChange={(e) => {
                            setFieldValue("author", e);
                          }}
                          searchable={true}
                          error={
                            errors.author && touched.author
                              ? errors.author
                              : null
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    {category !== null && (
                      <Col className="pb-3">
                        <label htmlFor="category" className="d-block">
                          Category
                        </label>
                        <Select
                          placeholder="Pick one category..."
                          data={
                            category !== null
                              ? category.map((item) => {
                                  return { value: item._id, label: item.name };
                                })
                              : null
                          }
                          id="category"
                          value={values.category}
                          autoComplete="off"
                          onChange={(e) => {
                            setFieldValue("category", e);
                            setSelectedCategory(e);
                            getSubCategoryList(e);
                          }}
                          searchable={true}
                          error={
                            errors.category && touched.category
                              ? errors.category
                              : null
                          }
                        />
                      </Col>
                    )}
                    {subcategory !== null && (
                      <Col className="pb-3">
                        <label htmlFor="subcategory" className="d-block">
                          Subcategory
                        </label>
                        <Select
                          placeholder="Pick one subcategory..."
                          autoComplete="off"
                          data={subcategory.map((item) => {
                            return { value: item._id, label: item.name };
                          })}
                          id="subcategory"
                          defaultValue={values.subcategory}
                          value={values.subcategory}
                          onChange={(e) => {
                            setFieldValue("subcategory", e);
                          }}
                          searchable={true}
                          error={
                            errors.subcategory && touched.subcategory
                              ? errors.subcategory
                              : null
                          }
                        />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="price" className="d-block">
                            Price
                          </label>
                          {errors.price && touched.price ? (
                            <small className="text-danger pt-2">
                              {errors.price}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Type price..."
                          name="price"
                          isValid={!errors.price && touched.price}
                          type="number"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.price && touched.price}
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="page" className="d-block">
                            Page
                          </label>
                          {errors.page && touched.page ? (
                            <small className="text-danger pt-2">
                              {errors.page}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          name="page"
                          isValid={!errors.page && touched.page}
                          type="number"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.page && touched.page}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="edition" className="d-block">
                            Edition
                          </label>
                          {errors.edition && touched.edition ? (
                            <small className="text-danger pt-2">
                              {errors.edition}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Edition..."
                          name="edition"
                          isValid={!errors.edition && touched.edition}
                          type="text"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.edition && touched.edition}
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="year" className="d-block">
                            Year
                          </label>
                          {errors.year && touched.year ? (
                            <small className="text-danger pt-2">
                              {errors.year}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Year..."
                          name="year"
                          isValid={!errors.year && touched.year}
                          type="text"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.year && touched.year}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="language" className="d-block">
                            Language
                          </label>
                          {errors.language && touched.language ? (
                            <small className="text-danger pt-2">
                              {errors.language}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="language..."
                          name="language"
                          isValid={!errors.language && touched.language}
                          type="text"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.language && touched.language}
                        />
                      </InputGroup>
                    </Col>
                    {/* <Col>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="isbn" className="d-block">
                            ISBN
                          </label>
                          {errors.isbn && touched.isbn ? (
                            <small className="text-danger pt-2">
                              {errors.isbn}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="ISBN..."
                          name="isbn"
                          isValid={!errors.isbn && touched.isbn}
                          type="text"
                          className={`${styles.input} w-100`}
                          isInvalid={errors.isbn && touched.isbn}
                        />
                      </InputGroup>
                    </Col> */}
                  </Row>

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
                      placeholder="Description..."
                      name="description"
                      isValid={!errors.description && touched.description}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.description && touched.description}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="image" className="d-block">
                        Book Image
                      </label>
                    </div>
                    <BootstrapForm.Control
                      type="file"
                      id="image"
                      className={`${styles.logo} w-100`}
                      onChange={(e) => onSelectFile2(e)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="pdf" className="d-block">
                        PDF File
                      </label>
                    </div>
                    <BootstrapForm.Control
                      type="file"
                      id="pdf"
                      className={`${styles.logo} w-100`}
                      onChange={(e) => onSelectFilePdf(e)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="audio" className="d-block">
                        Audio File
                      </label>
                    </div>
                    <BootstrapForm.Control
                      type="file"
                      id="audio"
                      className={`${styles.logo} w-100`}
                      onChange={(e) => onSelectFileAudio(e)}
                    />
                  </InputGroup>

                  <div className="pt-4">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn_primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : update ? "Save" : "Add Book"}
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
  category: state.category.category,
  subcategory: state.subcategory.subcategory,
  author: state.author.author,
  publisher: state.publisher.publisher,
});

export default connect(mapStateToProps, {
  createbook,
  updatebook,
  getCategoryList,
  getSubCategoryList,
  getAuthorList,
  getPublisherList,
})(AddBookForm);

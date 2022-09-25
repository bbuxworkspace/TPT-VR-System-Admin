import React, { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import styles from "./TopPublishers.module.scss";
import { connect } from "react-redux";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BASE_URL } from "../../constants/URL";
import {
  addBookToCollection,
  getCollectionDetails,
  removeBookToCollection,
} from "../../actions/Collection.action";
import { useModals } from "@mantine/modals";
import { Select, Text } from "@mantine/core";
import { BsTrash } from "react-icons/bs";
import { getPublisherList } from "../../actions/Publisher.action";

const TopPublishers = ({
  author,
  collection,
  getCollectionDetails,
  id,
  addBookToCollection,
  removeBookToCollection,
  getPublisherList,
}) => {
  useEffect(() => {
    getCollectionDetails(id);
    if (author === null) {
      getPublisherList(1);
    }
  }, [id]);
  const modals = useModals();

  const newHandeler = () => {
    modals.openModal({
      title: "Add Publisher",
      closeOnClickOutside: false,
      centered: true,
      children: (
        <>
          <form onSubmit={handelAddToCollection}>
            <FormGroup className="mb-3">
              <Form.Label>Search the publisher you want to add...</Form.Label>
              <Select
                placeholder="Publisher Name..."
                searchable
                nothingFound="Not Found..."
                data={author.items.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </FormGroup>
            <Button type="submit" className="btn_primary">
              Submit
            </Button>
          </form>
        </>
      ),
    });
  };

  const handelAddToCollection = async (e) => {
    e.preventDefault();
    let authorInput = e.target.elements[0].value;
    await addBookToCollection(authorInput, id);

    modals.closeAll();
  };

  const deleteHandeler = (authorIdToRemove) => {
    modals.openConfirmModal({
      title: `Remove this publisher from collection`,
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to remove this publisher from collection?
        </Text>
      ),
      labels: { confirm: "Remove publisher", cancel: "No don't remove it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => removeBookToCollection(authorIdToRemove, id),
    });
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-end align-items-center pb-3 ">
        <div className="text-right">
          <span className={styles.add} onClick={() => newHandeler()}>
            <AiOutlineFileAdd />
          </span>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {collection === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {collection !== null &&
                collection.publishers &&
                collection.publishers.length === 0 && (
                  <span className="d-block text-center fs-4 lead pb-4">
                    No Publisher Found!
                  </span>
                )}
              {collection !== null &&
                collection.publishers &&
                collection.publishers.map((authorItem, i) => (
                  <Row
                    key={authorItem._id}
                    className={`mb-3 pb-3 ${
                      collection.publishers.length - 1 === i
                        ? ""
                        : "border-bottom"
                    }`}
                  >
                    <Col md={2}>
                      <Row>
                        <Col
                          md={7}
                          className={`${styles.small} d-flex align-items-center`}
                        >
                          <div className={styles.img_wrapper}>
                            <img
                              crossOrigin="anonymous"
                              src={`${BASE_URL}/image/small/${authorItem.image}`}
                              alt={authorItem.name}
                              className={styles.img}
                            />
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
                    <Col md={9} className="">
                      <div className="d-flex align-items-center h-100">
                        <span className={` fw-bold`}>{authorItem.name}</span>
                      </div>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(authorItem._id)}
                      >
                        <BsTrash className="text-danger" />
                      </span>
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
  collection: state.collection.collection,
  author: state.publisher.publisher,
});

export default connect(mapStateToProps, {
  getCollectionDetails,
  addBookToCollection,
  removeBookToCollection,
  getPublisherList,
})(TopPublishers);

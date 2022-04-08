import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/shared/Layout/Layout";
import styles from "../../components/GameSelect/GameSelect.module.scss";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const ScreensPage = () => {
  return (
    <Layout title="Screens">
      <Container>
        <Row>
          <Col md={3}>
            <Card className="crd shadow py-5 px-4">
              <Card.Body>
                <Link to="/screens/v1" className={styles.name}>
                  v1 Starter
                </Link>
                <Link to="/screens/v1" className={styles.link}>
                  <AiOutlineDoubleRight />
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ScreensPage;

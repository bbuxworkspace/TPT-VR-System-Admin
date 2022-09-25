import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getDashboardData } from "../../actions/Dashboard.action";
import Layout from "../../components/shared/Layout/Layout";
import StatCard from "../../components/shared/StatCard/StatCard";
import { BsArrowLeft, BsPencil, BsPrinter } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiBook } from "react-icons/bi";

const DashboardPage = ({ data, getDashboardData }) => {
  useEffect(() => {
    if (data === null) {
      getDashboardData();
    }
  }, []);
  return (
    <Layout title="Dashboard">
      {data === null ? (
        <Spinner animation="grow" variant="dark" />
      ) : (
        <Row className="pt-4">
          <Col md={3} className="py-3">
            <StatCard title="Books" icon={<BiBook />} count={data.bookCount} />
          </Col>
          <Col md={3} className="py-3">
            <StatCard
              title="Authors"
              icon={<BsPencil />}
              count={data.authorCount}
            />
          </Col>
          <Col md={3} className="py-3">
            <StatCard
              title="Publisers"
              icon={<BsPrinter />}
              count={data.publisherCount}
            />
          </Col>
          <Col md={3} className="py-3">
            <StatCard title="Users" icon={<FiUsers />} count={data.userCount} />
          </Col>

          <Col md={12} className="py-3">
            <h2>Shortcuts</h2>
          </Col>
          <Col md={4} className="py-3">
            <StatCard
              title="Top Books"
              icon={<BsArrowLeft />}
              link="/collection/popular"
            />
          </Col>
          <Col md={4} className="py-3">
            <StatCard
              title="Top Authors"
              icon={<BsArrowLeft />}
              link="/popularAuthor"
            />
          </Col>
          <Col md={4} className="py-3">
            <StatCard
              title="Top Publishers"
              icon={<BsArrowLeft />}
              link="/topPublisher"
            />
          </Col>
        </Row>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth.dashboard,
});

export default connect(mapStateToProps, { getDashboardData })(DashboardPage);

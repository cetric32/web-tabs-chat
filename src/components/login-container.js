import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { updateProfile } from "./../store/actions";

function LoginContainer(props) {
  const [name, setName] = useState("");

  return (
    <Container className="w-100 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100 my-auto">
        <Col md={6}>
          <h1
            className="text-right 1-100"
            style={{ float: "right", position: "relative" }}
          >
            Web Chat
          </h1>
          <h3 className="mt-5">Login to your account</h3>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              props.updateProfile({ name });
              setName("");
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  updateProfile,
})(LoginContainer);

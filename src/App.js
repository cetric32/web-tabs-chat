//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Channel } from "./common/functions";
import { storeChats, storeOwnChats, updateProfile } from "./store/actions";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Button, Card, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import dayjs from "dayjs";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function App(props) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    Channel.addEventListener("message", (event) => {
      props.storeChats({ message: event.data });
    });
  });

  useEffect(() => {
    if (name) {
      document.title = `Web Chat | ${name}`;
    }
  }, [name]);

  if (_.get(props, "profile.name", "")) {
    return (
      <Container style={{ height: "90%" }}>
        <h1 className="" style={{ float: "right" }}>
          We Chat({_.get(props, "profile.name", "")})
        </h1>

        {props.chats.map((msg) => {
          return (
            <Row key={msg.key} style={{ width: "100%", marginBottom: 15 }}>
              <Col xs={6}>
                {msg.name === _.get(props, "profile.name", "") ? (
                  ""
                ) : (
                  <>
                    <Form.Text
                      className="text-muted"
                      style={{ float: "right" }}
                    >
                      {msg.name}
                    </Form.Text>
                    <Card
                      style={{
                        width: "100%",
                        background: "#E5E5EA",
                        color: "black",
                        float: "left",
                        clear: "both",
                        borderBottomLeftRadius: " 30px 0px9",
                      }}
                    >
                      <Card.Body>
                        <Card.Text>{`${msg.message}`}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Form.Text className="text-muted">
                      {dayjs(msg.date).fromNow()}
                    </Form.Text>
                  </>
                )}
              </Col>
              <Col xs={6}>
                {msg.name !== _.get(props, "profile.name", "") ? (
                  ""
                ) : (
                  <>
                    <Card
                      style={{
                        width: "100%",
                        background: " #00e34d",
                        color: "white",
                        float: "right",
                        clear: "both",
                        borderBottomRightRadius: "20px 0px9",
                      }}
                      m-1
                    >
                      <Card.Body>
                        <Card.Text>{`${msg.message}`}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Form.Text className="text-muted">
                      {dayjs(msg.date).fromNow()}
                    </Form.Text>
                  </>
                )}
              </Col>
            </Row>
          );
        })}

        <div class="fixed-bottom w-75 mx-auto">
          <Form
            onSubmit={(event) => {
              event.preventDefault();

              const message1 = {
                message: message,
                name: _.get(props, "profile.name", ""),
                key: uuidv4(),
                date: new Date().toISOString(),
              };

              Channel.postMessage(message1);
              props.storeOwnChats({ message: message1 });
              setMessage("");
            }}
          >
            <Form.Control
              type="text"
              placeholder="message..."
              required
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              size="md"
              className={"m-2 "}
            />
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </Container>
    );
  } else {
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
}

const mapStateToProps = (state) => {
  console.log("state", state);

  return {
    chats: state.chats.chats.concat(state.chats.myChats).sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    }),
    profile: state.chats.profile,
  };
};

export default connect(mapStateToProps, {
  storeChats,
  storeOwnChats,
  updateProfile,
})(App);

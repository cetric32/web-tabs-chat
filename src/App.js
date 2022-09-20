//import "./App.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Channel } from "./common/functions";
import { storeChats, storeOwnChats, updateProfile } from "./store/actions";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Button, Form, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function App(props) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    Channel.addEventListener("message", (event) => {
      //console.log("message event", event.data);
      props.storeChats({ message: event.data });
    });
  });

  console.log("====================================");
  console.log("props.chats", props.chats);
  console.log("====================================");

  if (_.get(props, "profile.name", "")) {
    return (
      <Container>
        <header className="App-header">
          <h1>Welcome {_.get(props, "profile.name", "")}</h1>
          <ListGroup>
            {props.chats.map((msg) => {
              return (
                <ListGroup.Item key={msg.key}>
                  {msg.name}: {msg.message}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <p>
            <form
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
              <input
                type="text"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
              <input type="submit" value="Send Message" />
            </form>
          </p>
        </header>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Login to your account</h1>
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

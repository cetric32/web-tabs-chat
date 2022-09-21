import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Channel } from "../common/functions";
import { v4 as uuidv4 } from "uuid";
import { storeOwnChats } from "../store/actions";
import { connect } from "react-redux";
import _ from "lodash";

function ChatForm(props) {
  const [message, setMessage] = useState("");

  return (
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
        placeholder="write message..."
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
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.chats.profile,
  };
};

export default connect(mapStateToProps, { storeOwnChats })(ChatForm);

import _ from "lodash";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getActualHeight } from "../common/functions";
import ChatForm from "./chat-form";
import ChatMessage from "./chat-message";

import background from "../img/bg.png";

function ChatContainer(props) {
  // always move to the bottom/latest chat
  useEffect(() => {
    const element = document.getElementById("message-box");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [props.chats]);

  return (
    <Container>
      <div className="row d-flex justify-content-end">
        <h1 className="" style={{ float: "right" }}>
          We Chat({_.capitalize(_.get(props, "profile.name", ""))})
        </h1>
      </div>

      <div
        class="border border-dark border-bottom-0 p-3 mt-4 rounded row"
        style={{
          height: `${getActualHeight() - 200}px`,
          overflow: "scroll",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "repeat",
        }}
        id="message-box"
      >
        {props.chats.map((msg) => {
          return (
            <Row
              key={msg.key}
              style={{
                width: "100%",
                marginBottom: 15,
              }}
            >
              <Col xs={6} className="rounded">
                {msg.name === _.get(props, "profile.name", "") ? (
                  ""
                ) : (
                  <ChatMessage
                    msg={msg}
                    style={{
                      width: "100%",
                      background: "#E5E5EA",
                      color: "black",
                      float: "left",
                      clear: "both",
                      borderBottomLeftRadius: " 30px 0px9",
                    }}
                    showName={true}
                  />
                )}
              </Col>
              <Col xs={6} className="rounded">
                {msg.name !== _.get(props, "profile.name", "") ? (
                  ""
                ) : (
                  <ChatMessage
                    msg={msg}
                    style={{
                      width: "100%",
                      background: " #00e34d",
                      color: "white",
                      float: "right",
                      clear: "both",
                      borderBottomRightRadius: "20px 0px9",
                    }}
                    showName={false}
                  />
                )}
              </Col>
            </Row>
          );
        })}
      </div>

      <div class="fixed-bottom w-75 mx-auto mb-4">
        <ChatForm />
      </div>
    </Container>
  );
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

export default connect(mapStateToProps, {})(ChatContainer);

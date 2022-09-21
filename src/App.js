//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Channel } from "./common/functions";
import { storeChats, storeOwnChats, updateProfile } from "./store/actions";
import _ from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatContainer from "./components/chat-container";
import LoginContainer from "./components/login-container";

dayjs.extend(relativeTime);

function App(props) {
  useEffect(() => {
    Channel.addEventListener("message", (event) => {
      props.storeChats({ message: event.data });
    });
  });

  useEffect(() => {
    const name = _.get(props, "profile.name", "");

    if (name) {
      document.title = `${_.capitalize(name)} | Web Chat `;
    }
  });

  if (_.get(props, "profile.name", "")) {
    return <ChatContainer />;
  } else {
    return <LoginContainer />;
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

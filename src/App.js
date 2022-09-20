import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Channel } from "./common/functions";
import { storeChats } from "./store/actions";
import { v4 as uuidv4 } from "uuid";

function App(props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    Channel.addEventListener("message", (event) => {
      console.log("message event", event.data);
      props.storeChats({ message: event.data });
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              Channel.postMessage({
                message: message,
                name: "",
                key: uuidv4(),
                date: new Date().toISOString(),
              });
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
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return { chats: state.chats };
};

export default connect(mapStateToProps, { storeChats })(App);

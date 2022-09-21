import { readFromStorage, saveToStorage } from "../../common/functions";
import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESSFUL,
  POST_OWN_MESSAGE_SUCCESSFUL,
  SET_PROFILE_SUCCESSFUL,
} from "../action-const";

let myStoredState = readFromStorage("myState");

console.log("====================================");
console.log("myStoredState", myStoredState);
console.log("====================================");

const initialState = myStoredState
  ? myStoredState
  : {
      chats: [],
      profile: {
        name: "",
        time: new Date().toUTCString(),
      },
      myChats: [],
    };

export default function chatsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case POST_MESSAGE_SUCCESSFUL:
      const existingObj = state.chats.find((c) => {
        return c.key === action.payload.key;
      });

      if (existingObj) {
        return state;
      } else {
        newState = {
          ...state,
          chats: state.chats.concat(action.payload),
        };

        saveToStorage("myState", newState);

        return newState;
      }

    case POST_OWN_MESSAGE_SUCCESSFUL:
      newState = {
        ...state,
        myChats: state.myChats.concat(action.payload),
      };

      saveToStorage("myState", newState);

      return newState;

    case SET_PROFILE_SUCCESSFUL:
      newState = {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload,
        },
      };

      saveToStorage("myState", newState);

      return newState;

    default:
      return state;
  }
}

import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESSFUL,
  POST_OWN_MESSAGE_SUCCESSFUL,
  SET_PROFILE_SUCCESSFUL,
} from "../action-const";

const initialState = {
  chats: [],
  profile: {
    name: "",
    time: new Date().toUTCString(),
  },
  myChats: [],
};

export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_MESSAGE_SUCCESSFUL:
      const existingObj = state.chats.find((c) => {
        return c.key === action.payload.key;
      });

      console.log("existingObj", existingObj);

      if (existingObj) {
        return state;
      } else {
        return {
          ...state,
          chats: state.chats.concat(action.payload),
        };
      }

    case POST_OWN_MESSAGE_SUCCESSFUL:
      return {
        ...state,
        myChats: state.myChats.concat(action.payload),
      };

    case SET_PROFILE_SUCCESSFUL:
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload,
        },
      };

    default:
      return state;
  }
}

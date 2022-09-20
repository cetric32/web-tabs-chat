import { POST_MESSAGE, POST_MESSAGE_SUCCESSFUL } from "../action-const";

const initialState = {
  chats: [],
  profile: {
    name: "cetric",
    time: Date.now(),
  },
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

    default:
      return state;
  }
}

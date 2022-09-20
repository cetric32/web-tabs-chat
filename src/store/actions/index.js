import { POST_MESSAGE, POST_MESSAGE_SUCCESSFUL } from "../action-const";

export const storeChats = (
  details,
  onSuccess = () => {},
  onFailure = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: POST_MESSAGE,
    });

    const { message } = details;

    dispatch({
      type: POST_MESSAGE_SUCCESSFUL,
      payload: message,
    });
  };
};

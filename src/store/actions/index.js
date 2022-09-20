import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESSFUL,
  POST_OWN_MESSAGE,
  POST_OWN_MESSAGE_SUCCESSFUL,
  SET_PROFILE,
  SET_PROFILE_SUCCESSFUL,
} from "../action-const";

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

export const storeOwnChats = (
  details,
  onSuccess = () => {},
  onFailure = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: POST_OWN_MESSAGE,
    });

    const { message } = details;

    dispatch({
      type: POST_OWN_MESSAGE_SUCCESSFUL,
      payload: message,
    });
  };
};

export const updateProfile = (
  details,
  onSuccess = () => {},
  onFailure = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE,
    });

    const { name } = details;

    dispatch({
      type: SET_PROFILE_SUCCESSFUL,
      payload: name,
    });
  };
};

import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,

  DELETE_USERS_STARTED,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  
} from "../actions/users";

const defaultState = {
  users: [],
  isLoading: false,
};

function userReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USERS_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        users: action.payload.data,
      });
    case GET_USERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        users: [],
      });
    default:
      return state;
  }
}

export default userReducer;

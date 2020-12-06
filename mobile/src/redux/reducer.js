export const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const initialState = {
  user: {
    id: 0,
    username: "",
    level: 0,
    wins: 0,
    bigger_score: 0,
    matches_played: 0,
  },
};

const rootReducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          level: action.payload.level,
          wins: action.payload.wins,
          bigger_score: action.payload.bigger_score,
          matches_played: action.payload.matches_played,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;

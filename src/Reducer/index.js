import { combineReducers } from "redux";

let gridRecords = [
    { firstName: "John", lastName: "Doe", active: false, id: 1 },
    { firstName: "Mary", lastName: "Moe", active: false, id: 2 },
    { firstName: "Peter", lastName: "Noname", active: true, id: 3 },
  ],
  detailsRecords = [
    {
      id: 1,
      name: "John Doe",
      about: "Nice guy",
      hobby: "Likes drinking milk",
      skills: ["html", "javascript", "redux"],
    },
    {
      id: 2,
      name: "Mary Moe",
      about: "Cute girl",
      hobby: "Likes playing piano",
      skills: ["Fortran", "Lua", "R#"],
    },
  ];

let gridState = {
  records: [...gridRecords],
  filter: "",
};

export function grid(state = gridState, action) {
  switch (action.type) {
    case "TOGGLE_ACTIVE":
      let newState = { ...state };
      newState.records = [...newState.records];
      newState.records[action.value] = {
        ...newState.records[action.value],
        active: !newState.records[action.value].active,
      };
      return newState;

    case "FILTER": {
      let newState = { ...state };
      newState.filter = action.value;
      return newState;
    }

    default:
      return state;
  }
}

export function details(state = detailsRecords, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  details,
  grid,
});

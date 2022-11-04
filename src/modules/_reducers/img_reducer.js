import { INIT_DATA_LIST_SET } from "../_actions/types";

const initialState = {
  fakeDummyData: '',
  LabalList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_DATA_LIST_SET:
      return {
        ...state,
        fakeDummyData: action.payload ? action.payload.thumbnail : ''
      };
    default:
      return state;
  }
}
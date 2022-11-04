import { INIT_DATA_LIST_SET, SET_IMG_LABEL } from "./types";
import { request } from '../api/fetch';

export function onSaveLabel(param) {
  return {
    type: SET_IMG_LABEL,
    payload: param
  };
}

export function onInitFakeDataList() {
  const data = request("get", "/products/1");
  return {
    type: INIT_DATA_LIST_SET,
    payload: data,
  };
}

import { combineReducers } from "redux";
import { order } from "./order";
import { booking } from "./booking";

export default combineReducers({
    order,
    booking
})
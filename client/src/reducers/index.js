import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import genres from "./genres";
import profile from "./profile";
import config from "./config";
import checkboxes from "./checkboxes";

export default combineReducers({
	alert,
	auth,
	genres,
	profile,
	config,
	checkboxes
});

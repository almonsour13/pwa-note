import { loadNote } from "./note.js";
import { loadLogin } from "./form/login.js";
//loadNote()

var logid = JSON.parse(localStorage.getItem('log-id')) || [];
if (logid.length > 0) {
    loadNote();
} else {
    loadLogin();
}

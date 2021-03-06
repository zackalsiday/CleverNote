import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root'
import configureStore from './store/store'
import {logout} from './actions/session_actions'
import fetchNotes from './actions/note_actions'
import { WatchIgnorePlugin } from "webpack";
document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    window.getState = store.getState;
    window.dispatch = store.dispatch
    window.logout = logout 
    window.fetchNotes = fetchNotes
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});
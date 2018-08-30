import "../sass/components/_users.scss"

/** ładujmey za pomoca webpack.ProvidePlugin */
// import $ from "jquery";

import template from "./views/users.hbs";

const API_URL = "http://jsonplaceholder.typicode.com/users";

/** przekazana lista userow -> do metody template() [handlebarsjs] */
function createHTML(data) {

    return template({
        users: data
    });

}
/** pobieramy userów z API */
function getUsers() {

    return $.getJSON(API_URL)
        .then(data => createHTML(data));

}
/** funkcja do tylko jako kontener i dla testu log() aby użyć go w devtool -> source-map*/
function getUsersHTML() {

    console.log('getUsersHTML');

    return getUsers();

}

export default getUsersHTML;

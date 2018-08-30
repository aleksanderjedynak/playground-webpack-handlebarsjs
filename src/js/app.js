import "../sass/main.scss";

/* wsparcie dla starczych przegladarek aby obslugiwaly .then() [npm es6-promise]*/
import "es6-promise/auto";
// import $ from "jquery";
/* asynchroniczne ladowanie kiedy klikniemy */
// import getUsersHTML from "./Users"; 

let container = $(".container"),
    button = $(".button");

button.on("click", function() {

    import("./Users")
        .then(function ({ default: getUsersHTML }){
            getUsersHTML()
                .then(html => {
                    container.append(html);
                });
        });
});
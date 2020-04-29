// uu
// require("./index.css")

// TODO why $
const $ = require("jquery")

function Ui () {

    const $view = $("<div>")
        .prop("id", "main-view")
        .text("Whats up")

    const $app = $("<div>")
        // .css("border-radius", "3px")
        // .css("overflow", "hidden")
        // .css("box-shadow", shadows.card1)
        // .css("max-width", "26rem")
        // .css("max-height", "40rem")
        // .css("width", "100%")
        // .css("height", "100%")
        .append($view)

    $(document.body).append($app)


}

Ui()

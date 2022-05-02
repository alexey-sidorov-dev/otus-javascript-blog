import "modern-css-reset";
import "../styles/scss/main.scss";

const page = require("../templates/page.hbs");

const div = document.createElement("div");
div.className = "content-wrapper";
div.innerHTML = page({ title: "О блоге" });
document.querySelector("#app").appendChild(div);

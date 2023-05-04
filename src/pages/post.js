import "modern-css-reset";
import "../styles/styles.scss";

const page = require("../templates/page.hbs");

const div = document.createElement("div");
div.className = "content-wrapper";
div.innerHTML = page({ title: "Написать пост" });
document.querySelector("#app").appendChild(div);

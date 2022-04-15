import "modern-css-reset";
import "../styles/css/main.css";

const el = document.createElement("div");
el.className = "content-wrapper";
el.innerHTML = `
    <header>
      <h1>
      Написать пост
      </h1>
      <nav>
        <a href="./index.html">Блог</a>
        <a href="./list.html">Список постов</a>
        <a href="./post.html">Написать пост</a>
        <a href="./feedback.html">Обратная связь</a>
        <a href="./about.html">О проекте</a>
      </nav>
    </header>
`;

document.querySelector("#app").appendChild(el);

import "modern-css-reset";
import "./styles/style.css";

(() => {
  const el = document.createElement("div");
  el.className = "content-wrapper";
  el.innerHTML = `
    <header>
      <h1>
        Личный блог
      </h1>
      <nav>
        <a href="/home">Блог</a>
        <a href="/list">Список постов</a>
        <a href="/write">Написать пост</a>
        <a href="/feedback">Обратная связь</a>
        <a href="/about">О проекте</a>
      </nav>
    </header>
`;

  document.querySelector("#app").appendChild(el);
})();

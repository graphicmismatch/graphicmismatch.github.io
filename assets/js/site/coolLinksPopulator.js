document.addEventListener("DOMContentLoaded", loadCoolLinks);

async function loadCoolLinks() {
    const jsonPath = "./coolLinks.json";
    const container = document.querySelector(".linkcontainer");
    if (!container) return;

    const res = await fetch(jsonPath);
    const links = await res.json();

    const ul = document.createElement("ul");

    // Header
    const headerLi = document.createElement("li");
    headerLi.innerHTML = "<b>Cool Links</b>";
    ul.appendChild(headerLi);
    const backLi = document.createElement("li");
backLi.innerHTML = `├─ <a href="./directory.html">../</a>`;
ul.appendChild(backLi);
    links.forEach((link, index) => {
        const isLast = index === links.length - 1;
        const li = document.createElement("li");

        const branch = isLast ? "└─ " : "├─ ";
        const connector = isLast ? "&nbsp;&nbsp;&nbsp;" : "│&nbsp;&nbsp;";

        li.innerHTML = `
            ${branch}<a href="${link.link}">${link.title}</a><br>
            ${connector}${link.description}
        `;

        ul.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(ul);
}
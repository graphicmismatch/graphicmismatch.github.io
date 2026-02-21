document.addEventListener("DOMContentLoaded", loadBlogs);

async function loadBlogs() {
    const jsonPath = "./blogs.json";
    const container = document.querySelector(".blogcontainer");
    if (!container) return;

    const res = await fetch(jsonPath);
    const blogs = await res.json();

    const ul = document.createElement("ul");

    // Header
    const headerLi = document.createElement("li");
    headerLi.innerHTML = "<b>Blogs</b>";
    ul.appendChild(headerLi);
    const backLi = document.createElement("li");
backLi.innerHTML = `├─ <a href="./directory.html">../</a>`;
ul.appendChild(backLi);
    blogs.forEach((blog, index) => {
        const isLast = index === blogs.length - 1;
        const li = document.createElement("li");

        const branch = isLast ? "└─ " : "├─ ";
        const connector = isLast ? "&nbsp;&nbsp;&nbsp;" : "│&nbsp;&nbsp;";

        li.innerHTML = `
            ${branch}<a href="${blog.link}">${blog.title}</a><br>
            ${connector}${blog.description}
        `;

        ul.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(ul);
}
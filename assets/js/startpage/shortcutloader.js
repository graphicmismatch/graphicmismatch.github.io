document.addEventListener("DOMContentLoaded", loadSkills);


async function loadSkills(){
    const jsonPath = "./data/shortcuts.json";
    const container = document.querySelector("#shortcut-content");
    if (!container) return;

    const res = await fetch(jsonPath);
    const shortcuts = await res.json();

    shortcuts.forEach((sc,index)=>{
        const contentHTML = `<div class="shortcut">
            <a href="${sc.link}">
                <img class="shortcut-img" src="${sc.image}">
                <p>${sc.caption}</p>
            </a>
          </div>`
      container.insertAdjacentHTML("beforeend",contentHTML);
    })
}
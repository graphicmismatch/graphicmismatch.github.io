document.addEventListener("DOMContentLoaded", loadPageContent);

function loadPageContent(){
    loadWorkExp();
    loadGamesShowcase();
    loadProjectsShowcase();
    loadSkills();
}

async function loadWorkExp() {
    const jsonPath = "./data/workExp.json";
    const container = document.querySelector("#career-content");
    if (!container) return;

    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const exps = await res.json();
        container.innerHTML = "";
        exps.forEach(( exp, index) => {
            let innerContent = "<ul>";
            exp.description.forEach((d) => {
                innerContent += `<li>${d}</li>`;
            });
            innerContent += "</ul>";
            const outerHTML = `<div class="experience-entry"><div class="exp-line"> <span class="exp-label">POSITION:</span> <span class="exp-value">${exp.position}</span> </div> <div class="exp-line"> <span class="exp-label">COMPANY:</span> <span class="exp-value">${exp.company}</span> </div> <div class="exp-line"> <span class="exp-label">PERIOD:</span> <span class="exp-value">${exp.period}</span> </div> <div class="exp-line"> <span class="exp-label">STATUS:</span> <span class="exp-status ${exp.status==="COMPLETE"?"complete":"active blink-slow"}">█ ${exp.status} █</span> </div> <div class="exp-description">${innerContent}</div> <div class="exp-ascii-separator flash"> ════════════════════════════════════════ </div> </div>`
            container.insertAdjacentHTML ("beforeend", outerHTML);
        });
    } catch (err) {
        container.innerHTML = `<p class="skill-load-error">[ CAREER DATA UNAVAILABLE ]</p>`;
        console.error("Failed to load work experience:", err);
    }
}

async function loadGamesShowcase(){
    const jsonPath = "./data/gameShowcase.json";
    const container = document.querySelector("#games-content");
    if (!container) return;

    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const games = await res.json();

        container.innerHTML = "";

        games.forEach((game,index)=>{

            let techTags = "";
            game.tech.forEach((tag,index)=>{
              techTags += `<span class=\"tag\">${tag}</span>`
            });
            let links = "";
            game.links.forEach((link,index)=>{
                links += `<a href=\"${Object.values(link)[0]}\" class = \"project-btn\">${Object.keys(link)[0]}</a>`;
            });
            const contentHTML = `<div class="project-card">
                <h3 class="project-title">${game.title}</h3>
                <div class="tech-tags">${techTags}</div>
                <p class="project-desc">${game.tagline}</p>
                <div class="project-links">${links}</div>
              </div>`
          container.insertAdjacentHTML("beforeend",contentHTML);
        })
    } catch (err) {
        container.innerHTML = `<p class="skill-load-error">[ GAMES DATA UNAVAILABLE ]</p>`;
        console.error("Failed to load games showcase:", err);
    }
}


async function loadProjectsShowcase(){
    const jsonPath = "./data/projectShowcase.json";
    const container = document.querySelector("#project-content");
    if (!container) return;

    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const projects = await res.json();

        container.innerHTML = "";

        projects.forEach((project,index)=>{

            let techTags = "";
            project.tech.forEach((tag,index)=>{
              techTags += `<span class=\"tag\">${tag}</span>`
            });
            let links = "";
            project.links.forEach((link,index)=>{
                links += `<a href=\"${Object.values(link)[0]}\" class = \"project-btn\">${Object.keys(link)[0]}</a>`;
            });
            const contentHTML = `<div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <div class="tech-tags">${techTags}</div>
                <p class="project-desc">${project.tagline}</p>
                <div class="project-links">${links}</div>
              </div>`
          container.insertAdjacentHTML("beforeend",contentHTML);
        })
    } catch (err) {
        container.innerHTML = `<p class="skill-load-error">[ PROJECTS DATA UNAVAILABLE ]</p>`;
        console.error("Failed to load projects showcase:", err);
    }
}

async function loadSkills(){
    const jsonPath = "./data/skills.json";
    const container = document.querySelector("#skills-content");
    if (!container) return;

    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const skills = Array.isArray(data) ? data : (data.skills ?? []);

        container.innerHTML = "";

        skills.forEach((category,index)=>{

            let skillTags = "";
            (category.skills ?? []).forEach((tag,index)=>{
              skillTags += `<span class=\"skill-tag\">${tag}</span>`
            });

            const contentHTML = `<div class="skill-category">
                <h3 class="skill-title">${category.category}</h3>
                <div class="skill-tags">${skillTags}</div>
              </div>`
          container.insertAdjacentHTML("beforeend",contentHTML);
        });
    } catch (err) {
        container.innerHTML = `<p class="skill-load-error">[ SKILLS DATA UNAVAILABLE ]</p>`;
        console.error("Failed to load skills:", err);
    }
}
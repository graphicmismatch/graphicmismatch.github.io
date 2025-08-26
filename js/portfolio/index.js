
class GlitchTextEveryWhere {
    constructor(options = {}) {
        this.minInterval = options.minInterval || 20;    
        this.maxInterval = options.maxInterval || 250;   
        this.minDuration = options.minDuration || 50;    
        this.maxDuration = options.maxDuration || 300;   
        
        this.chars = [ 
            '█', '▓', '▒', '░', '▄', '▀', '▐', '▌', '■', '□',
            '0', '1', '*', '#', '$', '%', '&', '!', '?', '/', '\\',
            'A','B','C','D','E','F','X','Y','Z',
            's', 'r', 'f', 'h', '0x', '>', '<', '_'
        ];
        
        this.glitchStyles = [

            (el) => { 
                el.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2); 
                el.style.transform = `translate(${Math.random()*6-3}px, ${Math.random()*6-3}px)`;
            },
            (el) => { 
                el.style.fontWeight = 'bold';
                el.style.color = '#33ff33';
                el.style.opacity = (Math.random() * 0.4 + 0.6).toFixed(2); 
                el.style.transform = `rotate(${Math.random()*4-2}deg) translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
            },
            (el) => { 
                el.style.fontSize = `${Math.floor(Math.random() * 6) + 10}px`; 
                el.style.textShadow = `1px 0px 0px #008800, -1px 0px 0px #004400`;
                el.style.letterSpacing = `${Math.random()*3-1.5}px`;
                el.style.opacity = (Math.random() * 0.3 + 0.5).toFixed(2); 
            }
        ];

        this.init();
    }

    getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    generateTextFragment() {
        const fragment = this.getRandomElement(this.chars);
        // Occasionally make fragments longer
        if (Math.random() < 0.15 && fragment.length < 4) {
            return fragment + this.getRandomElement(this.chars).charAt(0);
        }
        return fragment;
    }

    createGlitchElement() {
        const glitchEl = document.createElement('div');
        glitchEl.className = 'glitch-everywhere';
        glitchEl.textContent = this.generateTextFragment();

        glitchEl.style.fontSize = `${(Math.random() * 15) + 8}px`; 
        glitchEl.style.left = `${Math.random() * 100}vw`;
        glitchEl.style.top = `${Math.random() * 100}vh`;
        glitchEl.style.opacity = '1';

        const randomStyleFn = this.getRandomElement(this.glitchStyles);
        randomStyleFn(glitchEl);
        
        document.body.appendChild(glitchEl);

        const duration = Math.random() * (this.maxDuration - this.minDuration) + this.minDuration;
        
        setTimeout(() => {
            if (glitchEl.parentNode) {
                glitchEl.remove();
            }
        }, duration);
    }

    scheduleNextGlitch() {
        const interval = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;
        setTimeout(() => {
            this.createGlitchElement();
            this.scheduleNextGlitch(); 
        }, interval);
    }

    init() {
        for (let i = 0; i < 10; i++) { 
            setTimeout(() => this.createGlitchElement(), Math.random() * 100);
        }
        this.scheduleNextGlitch();
    }
}

// Glowing Green "å" Mouse Trail Effect


document.addEventListener('DOMContentLoaded', function() {

    new GlitchTextEveryWhere({
        minInterval: 50,   
        maxInterval: 1500,  
        minDuration: 500,   
        maxDuration: 1000   
    });


    const trailContainer = document.getElementById('trail-container');
    
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];
    let trailCounter = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail character only every 3rd mouse movement
        trailCounter++;
        if (trailCounter % 3 === 0) {
            createTrailChar();
        }
    });
    
    function createTrailChar() {
        // Limit number of trail elements
        if (trailElements.length > 20) {
            const oldElement = trailElements.shift();
            if (oldElement && oldElement.parentNode) {
                oldElement.parentNode.removeChild(oldElement);
            }
        }
        
        // Create new trail character
        const trailChar = document.createElement('span');
        const str = 'ăăăăăă‽▮■□∎å▨▩';
        trailChar.className = 'trail-char';
        trailChar.textContent = str.charAt(Math.floor(Math.random() * str.length));
        trailChar.style.left = (mouseX - 6) + 'px';
        trailChar.style.top = (mouseY - 6) + 'px';
        trailChar.style.color = '#00fa00';
        
        // Add slight random offset
        trailChar.style.transform = `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 6}px)`;
        
        trailContainer.appendChild(trailChar);
        trailElements.push(trailChar);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (trailChar && trailChar.parentNode) {
                trailChar.parentNode.removeChild(trailChar);
                const index = trailElements.indexOf(trailChar);
                if (index > -1) {
                    trailElements.splice(index, 1);
                }
            }
        }, 1000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add classic retro effects
    setInterval(() => {
        // Random border color flash for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (Math.random() < 0.05) { // 5% chance
                card.style.borderColor = '#ffff00';
                setTimeout(() => {
                    card.style.borderColor = '';
                }, 200);
            }
        });
        
        // Random text color flash for marquee elements
        const marqueeElements = document.querySelectorAll('.marquee, .marquee-reverse');
        marqueeElements.forEach(marquee => {
            if (Math.random() < 0.08) { // 8% chance
                marquee.style.color = '#ffff00';
                setTimeout(() => {
                    marquee.style.color = '';
                }, 300);
            }
        });
    }, 1000);
    
    // Add some random glitch effects to text elements

    
    // Console welcome message
    console.log(`
    ██████╗ ███████╗████████╗██████╗  ██████╗     ██████╗ ███████╗██╗   ██╗
    ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██╔══██╗██╔════╝██║   ██║
    ██████╔╝█████╗     ██║   ██████╔╝██║   ██║    ██║  ██║█████╗  ██║   ██║
    ██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝    ██████╔╝███████╗ ╚████╔╝ 
    ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝     ╚═════╝ ╚══════╝  ╚═══╝  
    
    Welcome to the retro zone! Thanks for checking out the source code.
    This portfolio was crafted with pure HTML, CSS, and minimal JavaScript.
    Keep creating awesome games! 🎮
    `);
});

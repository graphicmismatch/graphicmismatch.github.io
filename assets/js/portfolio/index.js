
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
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trailCounter++;
        if (trailCounter % 3 === 0) {
            createTrailChar();
        }
    });
    
    function createTrailChar() {
        if (trailElements.length > 30) {
            const oldElement = trailElements.shift();
            if (oldElement && oldElement.parentNode) {
                oldElement.parentNode.removeChild(oldElement);
            }
        }
        
        const trailChar = document.createElement('span');
        const str = 'ăăăăăă‽graphicmismatch▮■□∎å▨▩';
        trailChar.className = 'trail-char';
        trailChar.textContent = str.charAt(Math.floor(Math.random() * str.length));
        trailChar.style.left = (mouseX - 6) + 'px';
        trailChar.style.top = (mouseY - 6) + 'px';
        trailChar.style.color = '#00fa00';
        
        trailChar.style.transform = `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 6}px)`;
        
        trailContainer.appendChild(trailChar);
        trailElements.push(trailChar);
        
        setTimeout(() => {
            if (trailChar && trailChar.parentNode) {
                trailChar.parentNode.removeChild(trailChar);
                const index = trailElements.indexOf(trailChar);
                if (index > -1) {
                    trailElements.splice(index, 1);
                }
            }
        }, 1300);
    }
    
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
    


    }, 1000);
    

    console.log(`Check the source @ https://github.com/graphicmismatch/graphicmismatch.github.io`);

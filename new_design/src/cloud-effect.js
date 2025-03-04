// cloud effect implementation
class CloudSimulator {
    constructor(element) {
        this.element = element;
        this.clouds = [];
        this.template = [
            "                                                                  ...-                                                                                          ",
            "                                                         -.....-.   . -   -----                                                                                 ",
            "                                                       -.           -.- .   .--                                                                                 ",
            "                                                       .                        -++                                                                             ",
            "                                                  .   .                          .++                                                                            ",
            "                                             -.-+.....                          +-   ..-                                                                        ",
            "                                          -..                                           -                                                                       ",
            "                                          .                                         .-  .--                                                                     ",
            "                                      +-..                   .                            .-++                                                                  ",
            "                                     .          -+++  ++-.      .         -              ... -                                                                  ",
            "                                     -- -..   .  -  .--      .-.-..  ..---.. ---++-  ... ----                                                                   ",
            "                                     .+-+++++++----.     .----             ++++-+ ++-+.---                                                                      ",
            "                 .                                 ++++++++--+++--.-+++++++                                                                                     ",
            "              -..  .---...                                     .+++++                                                                                           ",
            "              .           ..                                                                                                                                    ",
            "           ...             -+   .....                                                                                                                           ",
            "         ..              -  --..     -                                                                                                                          ",
            "      .                  -             ..-                                                                                                                      ",
            "     .         ----               -+  .. -+                                                                                                                     ",
            "     - -+---.      .---  ++-.      ---.   -                                                                                                                     ",
            "    .+++++------....  ---   ..---      -++-                                                                                                                     ",
            "          --.. ...      .+----+++++++++-                                                                                                                        ",
            "          -+++++++++++++  -- -                                                                                                                                  "
        ];
        
        // create cloud container
        this.cloudWrapper = document.createElement('div');
        this.cloudWrapper.style.cssText = `
            position: absolute;
            white-space: pre;
            will-change: transform;
            z-index: 10;
            top: 0;
            left: 0;
        `;
        this.element.appendChild(this.cloudWrapper);
        
        // Add time tracking variable
        this.lastTime = 0;
        this.init();
        this.animate();
    }

    init() {
        this.createClouds();
    }

    createClouds() {
        const cloudHTML = this.template.map(row => 
            `<div class="cloud-row">${row.replace(/ /g, '&nbsp;')}</div>`
        ).join('');
        
        // Calculate cloud width for positioning
        const cloudWidth = this.template[0].length * 7;
        
        // Create multiple clouds and distribute them evenly on the screen
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.style.cssText = `
                position: absolute;
                top: ${20 + (i * 10)}%;
                opacity: 0.85;
                will-change: transform;
            `;
            cloud.innerHTML = cloudHTML;
            this.cloudWrapper.appendChild(cloud);
            
            // Distribute clouds evenly in horizontal direction
            const initialOffset = window.innerWidth * (i / 3) + i * (cloudWidth * 0.5);
            
            this.clouds.push({
                element: cloud,
                speed: 25 + Math.random() * 10, // Slightly randomize speed
                offset: initialOffset
            });
        }
    }

    animate(currentTime = 0) {
        // Calculate time difference (milliseconds)
        const deltaTime = this.lastTime ? currentTime - this.lastTime : 0;
        this.lastTime = currentTime;
        
        const cloudWidth = this.template[0].length * 7;
        const screenWidth = window.innerWidth;
        
        this.clouds.forEach(cloud => {
            // Use fixed speed multiplied by time difference to ensure constant motion
            const pixelsPerMs = 0.01;  // Pixels moved per millisecond
            const movement = deltaTime * pixelsPerMs;
            
            // New position equals current position minus movement
            cloud.offset -= movement;
            
            // When the cloud completely leaves the left edge of the screen
            if (cloud.offset < -cloudWidth) {
                // Recalculate offset to make the cloud appear on the right side
                // Add some extra space to prevent sudden appearance
                cloud.offset = screenWidth + (Math.random() * 50);
            }
            
            cloud.element.style.transform = `translateX(${cloud.offset}px)`;
        });

        requestAnimationFrame((time) => this.animate(time));
    }
}

// initialize cloud effect after page load
window.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.getElementById('cloud-container');
    if (cloudContainer) {
        new CloudSimulator(cloudContainer);
    } else {
        console.error('cannot find cloud-container element');
    }
}); 
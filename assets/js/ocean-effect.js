class PerlinNoise {
    constructor() {
      this.permutation = [];
      for (let i = 0; i < 256; i++) {
        this.permutation.push(i);
      }
      
      // shuffle array
      for (let i = 0; i < 256; i++) {
        const j = Math.floor(Math.random() * 256);
        [this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]];
      }
      
      // duplicate array
      this.permutation = this.permutation.concat(this.permutation);
    }
    
    // get noise value between 0-1
    noise(x) {
      const X = Math.floor(x) & 255;
      x -= Math.floor(x);
      
      const u = this.fade(x);
      
      const a = this.permutation[X];
      const b = this.permutation[X + 1];
      
      return this.lerp(u, this.grad(a, x), this.grad(b, x - 1));
    }
    
    fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    
    lerp(t, a, b) {
      return a + t * (b - a);
    }
    
    grad(hash, x) {
      const h = hash & 15;
      const grad = 1 + (h & 7);
      return (h & 8 ? -grad : grad) * x;
    }
  }

  // ocean ASCII art generator
  class ASCIIOcean {
    constructor(element) {
      // set element
      this.element = element;
      
      // initialize canvas
      this.canvas = [];
      this.waves = [];
      this.animationId = null;
      this.isRunning = false;
      this.noise = new PerlinNoise();
      this.offset = 0;
      this.lastTime = performance.now();
      
      // initialize
      this.init();
    }
    
    // initialize
    init() {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
      this.start();
    }
    
    // resize canvas
    resizeCanvas() {
      // get container size
      const containerWidth = window.innerWidth;
      const containerHeight = this.element.parentElement.clientHeight;
      
      // since we use monospace font, we use a baseline value to calculate
      const charWidth = 6;
      const charHeight = 12;
      
      // calculate number of characters that can be accommodated, ensuring full screen width
      this.cols = Math.ceil(containerWidth / charWidth) + 5; // add extra column to ensure full width
      this.rows = Math.floor(containerHeight / charHeight);
      
      // reset ASCII canvas
      this.canvas = new Array(this.rows);
      for (let y = 0; y < this.rows; y++) {
        this.canvas[y] = new Array(this.cols).fill(' ');
      }
      
      // create waves only on initialization, keep waves unchanged on window resize
      if (!this.waves || this.waves.length === 0) {
        this.createWaves();
      }
    }
    
    // create waves
    createWaves() {
      this.waves = [];
      
      // create waves with different characteristics for each layer
      for (let layer = 0; layer < CONFIG.basic.layerCount; layer++) {
        // number of waves per layer
        const wavesPerLayer = Math.floor(CONFIG.basic.waveCount / CONFIG.basic.layerCount);
        
        // get current layer parameters
        const layerParams = getLayerParams(layer);
        
        // set characteristics based on layer
        const layerRatio = layer / (CONFIG.basic.layerCount - 1); // 0 close, 1 far
        
        // calculate actual values using configuration parameters and layer ratio
        const baseSpeed = CONFIG.basic.speed * layerParams.speedRatio;
        const baseAmplitude = CONFIG.waveShape.baseAmplitude * layerParams.amplitudeRatio;
        const baseFrequency = CONFIG.waveShape.baseFrequency * layerParams.frequencyRatio;
        
        // vertical position of this layer (top is far, bottom is near)
        const baseY = Math.floor(this.rows / 2 * layerRatio);
        
        for (let i = 0; i < wavesPerLayer; i++) {
          // calculate vertical position micro-adjustment within layer
          const waveVariation = 0.2 + Math.random() * 0.6; // random variation factor
          
          this.waves.push({
            // layer identifier
            layer: layer,
            // vertical position of wave
            y: baseY + Math.floor(i * 2),
            // wave speed
            speed: baseSpeed * waveVariation,
            // wave amplitude (height)
            amplitude: baseAmplitude * waveVariation,
            // wave frequency (wavelength)
            frequency: -baseFrequency * waveVariation,
            // initial phase
            phase: Math.random() * Math.PI * 2,
            // wave shape adjustment
            shapeModifier: CONFIG.waveShape.shapeModifier * (0.6 + Math.random() * 0.4), // affects wave peak and valley shape
            noiseScale: CONFIG.noise.scale * (0.6 + Math.random() * 0.4) // noise scale
          });
        }
      }
    }
    
    //   start animation
    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.animate();
      }
    }
    
    // stop animation
    stop() {
      if (this.isRunning) {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
      }
    }
    
    // animation function
    animate() {
      const currentTime = performance.now();
      // use deltaTime scale factor from CONFIG
      const deltaTime = Math.min(
        (currentTime - this.lastTime) * CONFIG.timeControl.deltaTimeScale, 
        CONFIG.timeControl.maxDeltaTime
      );
      this.lastTime = currentTime;

      // clear canvas
      this.clearCanvas();
      
      // draw ocean
      this.drawOcean();
      
      // update and draw each wave
      this.drawWaves(deltaTime);
      
      // render ASCII canvas
      this.render();
      
      // update global offset (for noise function)
      this.offset += CONFIG.basic.offset * deltaTime; // use deltaTime to scale offset
      
      // continue to next frame
      if (this.isRunning) {
        this.animationId = requestAnimationFrame(() => this.animate());
      }
    }
    
    // clear canvas
    clearCanvas() {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          this.canvas[y][x] = ' ';
        }
      }
    }
    
    // draw ocean base
    drawOcean() {
      const charsLength = CONFIG.basic.chars.length - 1;
    }
    
    //  draw waves
    drawWaves(deltaTime) {
      const charsLength = CONFIG.basic.chars.length - 1;
      const speedScaleFactor = CONFIG.speedControl?.scaleFactor || 0.3; // add global speed scale factor
      
      // draw waves in order of layer, from far to near
      for (let layer = CONFIG.basic.layerCount - 1; layer >= 0; layer--) {
        // select waves of current layer
        const layerWaves = this.waves.filter(wave => wave.layer === layer);
        
        // iterate over each wave of current layer
        for (let wave of layerWaves) {
            // update wave phase, apply speed scale factor
          wave.phase -= Math.abs(wave.speed) * deltaTime * speedScaleFactor;
          
          // calculate wave curve
          for (let x = 0; x < this.cols; x++) {
            // combine sine wave and noise to create more natural wave
            const noiseX = (x * wave.noiseScale + wave.phase) * 0.1;
            const noiseValue = this.noise.noise(noiseX + this.offset) * 2 - 1;
            
            // create sine wave base
            const baseWave = Math.sin(x * wave.frequency + wave.phase);
            
            // apply wave shape modifier (make peak sharp, valley flat)
            const shapedWave = Math.pow(Math.abs(baseWave), wave.shapeModifier) * 
                (baseWave >= 0 ? 1 : CONFIG.waveShape.valleyFlatness);
            
            // combine noise and shape adjusted wave
            const waveHeight = (shapedWave * CONFIG.waveShape.waveNoiseBlend + 
                noiseValue * CONFIG.noise.influence) * wave.amplitude;
            
            // calculate final position
            const y = Math.floor(this.rows / 2 - wave.y - waveHeight);
            
            // select wave intensity corresponding character
            const intensityIndex = Math.floor(charsLength * 
                (CONFIG.charControl.baseOffset + Math.abs(waveHeight) / 
                (wave.amplitude * 2 * CONFIG.charControl.waveHeightScale) * 
                CONFIG.charControl.dynamicRange));
            const waveChar = CONFIG.basic.chars[Math.min(intensityIndex, charsLength)];
            
            // draw wave line
            if (y >= 0 && y < this.rows) {
              this.canvas[y][x] = waveChar;
              
              // add water texture below wave
              for (let fillY = y + 1; fillY < Math.floor(this.rows / 2) + wave.y; fillY++) {
                // calculate intensity based on distance to wave surface
                const depthRatio = (fillY - y) / 8 * CONFIG.charControl.depthInfluence;
                const charIndex = Math.min(
                  Math.floor(3 + depthRatio * 5 + Math.abs(noiseValue) * 2), 
                  charsLength
                );
                
                if (fillY >= 0 && fillY < this.rows) {
                  // draw only on previously unpainted positions
                  if (this.canvas[fillY][x] === ' ') {
                    this.canvas[fillY][x] = CONFIG.basic.chars[charIndex];
                  }
                }
              }
            }
          }
        }
      }
    }
    
    // render ASCII canvas to page
    render() {
      let output = '';
      for (let y = 0; y < this.rows; y++) {
        // ensure each line is full width
        const line = this.canvas[y].join('');
        output += line + '\n';
      }
      this.element.textContent = output;
      
      // ensure character spacing fits screen width
      this.element.style.letterSpacing = '0px'; // adjust character spacing to fit screen width
      this.element.style.width = '100%';
    }
  }
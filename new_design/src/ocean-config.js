// ocean-config.js

// import dat.gui library
const GUI = window.dat.GUI;

// main config object
const CONFIG = {
  // basic settings
  basic: {
    chars: "   .,~-=+*#%@", // character set, from empty to solid 
    speed: 0.0065,         // wave base speed  
    waveCount: 7,          // wave total count - updated
    layerCount: 7,         // layer: near, middle, far - updated
    offset: 0.9,           // global offset increment - updated
  },
  
  // noise settings
  noise: {
    influence: 0.66,        // noise influence on wave shape
    scale: 0.12,            // noise scale
  },
  
  // layer ratio control
  layers: {
    // near layer (layer 0)
    near: {
      speedRatio: 1.0,     // speed ratio 
      amplitudeRatio: 1.0, // amplitude ratio
      frequencyRatio: 1.0, // frequency ratio
    },
    // middle layer (layer 1)
    middle: {
      speedRatio: 0.7,     // speed ratio
      amplitudeRatio: 0.7, // amplitude ratio
      frequencyRatio: 0.8, // frequency ratio
    },
    // far layer (layer 2)
    far: {
      speedRatio: 0.5,     // speed ratio
      amplitudeRatio: 0.4, // amplitude ratio
      frequencyRatio: 0.6, // frequency ratio
    }
  },
  
  // wave shape control
  waveShape: {
    baseFrequency: 0.08,   // base frequency
    baseAmplitude: 2.5,    // base amplitude
    baseSpeed: 0.04,       // base speed
    shapeModifier: 0.5,    // shape modifier (wave peak sharpness)
    valleyFlatness: -0.4,  // wave valley flatness
    waveNoiseBlend: 0.7,   // blend ratio between sine wave and noise
  },
  
  // visual effect control
  visual: {
    oceanColor: "#0066cc",      // character color
    backgroundColor: "#e6f7ff", // background color for the entire page
  },
  
  // speed control
  speedControl: {
    scaleFactor: 0.3  // adjust this value to control overall speed (0.1-1.0)
  },
  
  
  charControl: {
    baseOffset: 0.21,       // base offset for character intensity
    dynamicRange: 0.69,     // dynamic range for character intensity
    depthInfluence: 0.51,   // depth influence on character selection
    waveHeightScale: 2.5    // wave height scale factor
  },
  
  // time scale control
  timeControl: {
    deltaTimeScale: 0.0001, // deltaTime scale factor
    maxDeltaTime: 0.055     // max deltaTime limit
  },
};

// initialize GUI controller - modified to not show GUI
function initGUI() {
  // do not create GUI instance, only keep function for compatibility with existing code
  console.log('GUI panel disabled');
  return null;
}

// update colors
function updateColors() {
  const ocean = document.getElementById('ocean');
  
  // update character color
  if (ocean) {
    ocean.style.color = CONFIG.visual.oceanColor;
  }
  
  // update overall background color
  document.body.style.backgroundColor = CONFIG.visual.backgroundColor;
}

// get parameters for a specific layer
function getLayerParams(layer) {
  const layerCount = CONFIG.basic.layerCount;
  
  // if it is the first layer (near)
  if (layer === 0) {
    return CONFIG.layers.near;
  }
  // if it is the last layer (far)
  else if (layer === layerCount - 1) {
    return CONFIG.layers.far;
  }
  // middle layer
  else {
    // get middle layer parameters as base
    return CONFIG.layers.middle;
  }
}

// load saved config
function loadSavedConfig() {
  const savedConfig = localStorage.getItem('oceanConfig');
  if (savedConfig) {
    try {
      // deep merge saved config to current config
      const parsed = JSON.parse(savedConfig);
      mergeConfigs(CONFIG, parsed);
      console.log('loaded saved config');
    } catch (e) {
      console.error('error loading config:', e);
    }
  }
}

// deep merge config objects
function mergeConfigs(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // if it is an object and exists in the target, then recursively merge
        if (!target[key]) target[key] = {};
        mergeConfigs(target[key], source[key]);
      } else {
        // otherwise, directly overwrite
        target[key] = source[key];
      }
    }
  }
}

// call on page load
window.addEventListener('DOMContentLoaded', () => {
  loadSavedConfig();
});

window.CONFIG = CONFIG;
window.initGUI = initGUI;
window.getLayerParams = getLayerParams;
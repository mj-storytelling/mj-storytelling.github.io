class StoryEngine {
  constructor() {
    this.nodes = {};
    this.currentNode = null;
    this.messageBox = document.querySelector('.message-box p');
    this.messageBoxContainer = document.querySelector('.message-box');
    this.buttonsContainer = document.querySelector('.buttons');
    this.boatImage = document.querySelector('.boat-image');
    this.isInitialLoad = true;
    
    // preload all boat images
    this.boatImages = {
      patchwork: 'img/boat_patchwork.png',
      woodcut: 'img/boat_woodcut.png',
      pixel: 'img/boat_pixel.png'
    };
    
    this.init();
  }
  
  init() {
    // Add floating animation to message box
    this.messageBoxContainer.style.animation = 'message-floating 5s ease-in-out infinite';
    
    // directly embed story data, not loading from a file
    const storyData = {
      "nodes": [
        {
          "id": "start",
          "text": "You see a patchwork sail capturing the winds of imagination.",
          "style": "patchwork",
          "choices": [
            {
              "text": "Follow the wind",
              "nextNode": "woodcut_tale"
            },
            {
              "text": "Find a harbor",
              "nextNode": "pixel_coast"
            }
          ]
        },
        {
          "id": "woodcut_tale",
          "text": "Resilient lines cut through deep waves, ancient stories engraved on time's wooden boards.",
          "style": "woodcut",
          "choices": [
            {
              "text": "Venture into the unknown",
              "nextNode": "pixel_stars"
            },
            {
              "text": "Pursue the past",
              "nextNode": "patchwork_memory"
            }
          ]
        },
        {
          "id": "pixel_coast",
          "text": "A coastline formed by blocks gradually becomes clear, each light point a fragment of memory.",
          "style": "pixel",
          "choices": [
            {
              "text": "Explore a new world",
              "nextNode": "woodcut_history"
            },
            {
              "text": "Reassemble memories",
              "nextNode": "patchwork_craft"
            }
          ]
        },
        {
          "id": "pixel_stars",
          "text": "Starlight dances on the digital sea surface, each pixel mapping the mysteries of the universe.",
          "style": "pixel",
          "choices": [
            {
              "text": "Set sail again",
              "nextNode": "start"
            },
            {
              "text": "Dive deeper into the code",
              "nextNode": "pixel_end"
            }
          ]
        },
        {
          "id": "patchwork_memory",
          "text": "Memories interweave like fabric scraps into a painting, each stitch narrating past voyages.",
          "style": "patchwork",
          "choices": [
            {
              "text": "Weave the future",
              "nextNode": "patchwork_end"
            },
            {
              "text": "Start anew",
              "nextNode": "start"
            }
          ]
        },
        {
          "id": "woodcut_history",
          "text": "Soft fabric solidifies into hardwood, the story's contours becoming deep and clear.",
          "style": "woodcut",
          "choices": [
            {
              "text": "Preserve ancient methods",
              "nextNode": "woodcut_end"
            },
            {
              "text": "Continue the cycle",
              "nextNode": "start"
            }
          ]
        },
        {
          "id": "patchwork_craft",
          "text": "Digital edges gradually soften, transforming into warm fabric and threads, memories sewn into every stitch.",
          "style": "patchwork",
          "choices": [
            {
              "text": "Embrace tradition",
              "nextNode": "patchwork_end"
            },
            {
              "text": "Seek new paths",
              "nextNode": "start"
            }
          ]
        },
        {
          "id": "pixel_end",
          "text": "In the depths of the pixel world, you find the essence of the digital ocean, countless possibilities flowing between the grids.",
          "style": "pixel",
          "choices": [
            {
              "text": "Journey again",
              "nextNode": "start"
            }
          ]
        },
        {
          "id": "woodcut_end",
          "text": "The power between black and white flows through the wood grain, you become the guardian of the story.",
          "style": "woodcut",
          "choices": [
            {
              "text": "A new journey",
              "nextNode": "start"
            }
          ]
        },
        {
          "id": "patchwork_end",
          "text": "Fragments pieced together into a complete picture, you find belonging in the colorful fabric.",
          "style": "patchwork",
          "choices": [
            {
              "text": "Begin a new chapter",
              "nextNode": "start"
            }
          ]
        }
      ]
    };
    
    // convert node data to accessible format
    storyData.nodes.forEach(node => {
      this.nodes[node.id] = node;
    });
    
    // set initial node
    this.navigateToNode('start');
  }
  
  navigateToNode(nodeId) {
    const node = this.nodes[nodeId];
    if (!node) {
      console.error(`Node ${nodeId} does not exist`);
      return;
    }
    
    this.currentNode = node;
    
    // update text content
    this.updateMessageText(node.text);
    
    // update button options
    this.updateChoiceButtons(node.choices);
    
    // update boat style
    this.updateBoatStyle(node.style);
  }
  
  updateMessageText(text) {
    // add fade out effect
    this.messageBox.style.opacity = 0;
    
    setTimeout(() => {
      this.messageBox.textContent = text;
      this.messageBox.style.opacity = 1;
    }, 300);
  }
  
  updateChoiceButtons(choices) {
    // clear current buttons
    this.buttonsContainer.innerHTML = '';
    this.buttonsContainer.style.opacity = 0;
    
    setTimeout(() => {
      // create buttons for each option
      choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'action-button';
        button.textContent = choice.text + ' >';
        button.addEventListener('click', () => this.navigateToNode(choice.nextNode));
        this.buttonsContainer.appendChild(button);
      });
      
      this.buttonsContainer.style.opacity = 1;
    }, 300);
  }
  
  updateBoatStyle(style) {
    // if it's the first time loading, set the image and floating animation
    if (this.isInitialLoad) {
      this.boatImage.src = this.boatImages[style];
      this.boatImage.style.animation = 'boat-floating 4s ease-in-out infinite';
      this.isInitialLoad = false; // set the flag to false, subsequent switches will use the animation
      return;
    }
    
    // pause the current floating animation, save the current transform state
    const currentTransform = window.getComputedStyle(this.boatImage).transform;
    this.boatImage.style.animation = 'none';
    this.boatImage.style.transform = currentTransform;
    
    // add the exit animation
    setTimeout(() => {
      this.boatImage.style.animation = 'boat-exit 0.5s forwards';
      
      setTimeout(() => {
        // update the boat image
        this.boatImage.src = this.boatImages[style];
        
        // apply the enter animation
        this.boatImage.style.animation = 'boat-enter 0.5s forwards';
        
        // restore the floating effect after the animation completes
        setTimeout(() => {
          this.boatImage.style.animation = 'boat-floating 4s ease-in-out infinite';
        }, 500);
      }, 500);
    }, 50); // small delay to ensure the transform is applied
  }
}

// initialize story engine after page load
window.addEventListener('DOMContentLoaded', () => {
  window.storyEngine = new StoryEngine();
}); 
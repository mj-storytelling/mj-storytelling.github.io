---
layout: project
title: "Patchview: LLM-Powered Worldbuilding with Generative Dust and Magnet Visualization"
pdf: "https://mkremins.github.io/publications/Patchview_UIST2024.pdf"
video: "https://drive.google.com/file/d/1Y5XcleOfkXhvA2bXRLET4Zt92bjOx7C_/preview?t=3"
image: "/img/projects/patchview/teaser.gif"
abstract: "Large language models (LLMs) can help writers build story worlds by generating world elements, such as factions, characters, and locations. However, making sense of many generated elements can be overwhelming. Moreover, if the user wants to precisely control aspects of generated elements that are difficult to specify verbally, prompting alone may be insufficient. We introduce Patchview, a customizable LLM-powered system that visually aids worldbuilding by allowing users to interact with story concepts and elements through the physical metaphor of magnets and dust. Elements in Patchview are visually dragged closer to concepts with high relevance, facilitating sensemaking. The user can also steer the generation with verbally elusive concepts by indicating the desired position of the element between concepts. When the user disagrees with the LLM's visualization and generation, they can correct those by repositioning the element. These corrections can be used to align the LLM's future behaviors to the user's perception. With a user study, we show that Patchview supports the sensemaking of world elements and steering of element generation, facilitating exploration during the worldbuilding process. Patchview provides insights on how customizable visual representation can help sensemake, steer, and align generative AI model behaviors with the user's intentions."
---
# Core concept
<div style="text-align: center">Patchview is a <span style="font-size:2em;">🌎 worldbuilding tool</span> that helps users to
<br/>
1. <span style="font-size:2em;">sensemake,</span> 2. <span style="font-size:2em;">steer,</span> and 3. <span style="font-size:2em;">correct </span> AI generations with 
<br/>
<span style="font-size:2em;">💨 Dust and 🧲 Magnet visualization.</span> 
<br/>
<br/>
That is, when using AI to generate story world elements (e.g., 👥 characters, 📦 props, 📍 places)
<br/>
to <span style="font-size:2em;"> sensemake </span> AI-generated world elements, 
<br/>
the user can first form a magnet space of the concept
<img style="width: 100%" src="/img/projects/patchview/concept_magnet.gif">
<span style="font-size:0.7em;">(Here, with concepts about factions)</span>
<br/>
and add world elements to organize them according to the concepts of interest
<img style="width: 100%" src="/img/projects/patchview/element_added.gif">
AI will automatically do positioning of these elements on behalf of the user!
<br/>
<br/>
For example, 
<img style="width: 100%" src="/img/projects/patchview/element_example.gif">
here, <i>Sir Pouncealot Whiskerton</i> is a spymaster of <i>Scratching Post Clan</i>, 
<br/>
and hence is positioned close to the magnet of the Clan.
<br/>
The user can 
<br/>
The user also <span style="font-size:2em;"> steer </span> AI generation in this magnet space,
<img style="width: 100%" src="/img/projects/patchview/steer.gif">
simply by placing a marker that indicates "generate element here." 
<br/><br/>
<img style="width: 100%" src="/img/projects/patchview/steer_result.gif">
See how Patchview generates an element with steering input!
<br/><br/>
When AI makes errors for visualizing and generating elements, 
<br/>
The user can <span style="font-size:2em;"> correct </span> these in the magnet space.
<br/><br/>
Simply, 
<img style="width: 100%" src="/img/projects/patchview/reposition.gif">
they can reposition the element when AI put it in a wrong place, 
<br/><br/>
<img style="width: 100%" src="/img/projects/patchview/rewrite.gif">
or ask AI to rewrite it to be placed in the new position
<br/>
when the user thinks the element should be revised.
<br/><br/>
<img style="width: 100%" src="/img/projects/patchview/correction_examples.gif">
Patchview uses these corrections to align its future behaviors to the user's expectations,
<br/>
by providing them as examples in the LLM prompts.
</div>

# Examples from the User Study
We conducted a user study to see how people use Patchview. Below are some examples.

<br/>
<img style="width: 100%" src="/img/projects/patchview/P4.png">
P4 created characters according to their physical power, magical prowess, and goodness-evilness.
<br/><br/>
<img style="width: 70%; display: block; margin: auto;" src="/img/projects/patchview/P6.png">
P6 organized and generated events along the timeline, with the start and the end magnet being the concept magnet. 
<br/><br/>
<img style="width: 100%" src="/img/projects/patchview/P2.png">
P4 generated characters considering four factions they can belong to.
<br/><br/>

## Bibtex

<div class="bibbox">
@inproceedings{chung2024patchview, 
  author = {Chung, John Joon Young and Kreminski, Max}, 
  title = {Patchview: LLM-powered Worldbuilding with Generative Dust and Magnet Visualization}, 
  year = {2024}, 
  publisher = {Association for Computing Machinery}, 
  address = {New York, NY, USA}, 
  booktitle = {Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology}, 
  url = {https://doi.org/10.1145/3654777.3676352}, 
  doi={10.1145/3654777.3676352}, 
  location = {Pittsburg, PA, USA},
  series = {UIST '24}
}
</div>
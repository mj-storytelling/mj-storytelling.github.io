---
layout: project
title: "Toyteller: AI-Powered Visual Storytelling Through Toy-Playing with Character Symbols"
authors: ["John Joon Young Chung", "Melissa Roemmele", "Max Kreminski"]
pdf: "https://arxiv.org/abs/2501.13284"
video: "https://drive.google.com/file/d/1JSI-WqmDIwqrQggNkN3lW2brWgrTF8Vr/preview?t=0"
image: "/img/projects/toyteller/teaser.gif"
abstract: "We introduce Toyteller, an AI-powered storytelling system where users generate a mix of story text and visuals by directly manipulating character symbols like they are toy-playing. Anthropomorphized symbol motions can convey rich and nuanced social interactions; Toyteller leverages these motions (1) to let users steer story text generation and (2) as a visual output format that accompanies story text. We enabled motion-steered text generation and text-steered motion generation by mapping motions and text onto a shared semantic space so that large language models and motion generation models can use it as a translational layer. Technical evaluations showed that Toyteller outperforms a competitive baseline, GPT-4o. Our user study identified that toy-playing helps express intentions difficult to verbalize. However, only motions could not express all user intentions, suggesting combining it with other modalities like language. We discuss the design space of toy-playing interactions and implications for technical HCI research on human-AI interaction."
---
# Core concept
<style>
  img{
    display: block;
    margin: auto;
    margin-bottom: 10px;
  }
</style>
<div>
<span style="font-size: 23px;">🫱🧸<span style="padding-left:20px">🦖🫲What if we can tell a story simply by playing with toys?</span></span>
<img style="width: 100%" src="/img/projects/toyteller/motivation1.gif">
<br/>
<span style="font-size: 23px;">🫱🧸<span style="padding-left:20px">🦖🤖What if we can do toy-playing with an AI to collaboratively tell a story?</span></span>
<img style="width: 100%" src="/img/projects/toyteller/motivation2.gif">
<br/>
<span style="font-size: 23px;">🧸✨📜 Toyteller enables such an interaction of <span style="font-weight: bold">toy-playing-based storytelling</span> with the power of <span style="font-weight: bold">generative AI</span>.</span>
<br/><br/><br/>
</div>

# Interaction
<div>
Toyteller allows users to do storytelling in a simple setting of two-character-interactions.
To do it, the user can first define their own two characters and the story setting. 
<br/>
<img style="width: 100%" src="/img/projects/toyteller/toyteller_setting.png">
<br/>
Then, in the tool, these characters will be rendered in character symbols, with which you can do toy-playing to generate stories.
<br/>
<img style="width: 100%" src="/img/projects/toyteller/toyteller_characters.png">
<br/>
For example, you can move one symbol to another, AI-controlled symbol, and AI will try to generate a story sentence that goes along well with the motion.
<br/>
<img style="width: 100%" src="/img/projects/toyteller/teaser.gif">
<br/>
You can also move two characters at once by yourself (in this case, one character chasing another) to make AI only generate the accompanying story sentence.
<br/>
<img style="width: 100%" src="/img/projects/toyteller/twocharacter_example.gif">
<br/>
You can also make AI only generate motions based on the sentence you wrote, like below, where AI is generating fighting-like motions.
<br/>
<img style="width: 100%" src="/img/projects/toyteller/motiongen_example.gif">
<br/>
So, basically, with 🧸✨📜Toyteller, you can do flexible toy-playing-based story co-creation with AI.
<br/><br/><br/>
</div>

# Technical Overview
<div>
To enable this interaction, we need to translate motions to texts and vice versa. 
<br/>
For such translation, we first tried to map the motions and texts onto the shared vector representaton of <b>action information layer</b>.
<br/>
<img style="width: 50%" src="/img/projects/toyteller/technical_overview.png">

The action information layer consists of two pieces of information, 
<br/>
1) <i>action embedding (action)</i>, which is about which event is happening between two characters, and 
<br/>
2) <i>active character indicator (char)</i>, which is about who is the active agent of the action. 
<br/>
Note that action embedding is derived from existing text embedding vector space and active character indicator is binary boolean.
<br/>
<br/>
<br/>
<img style="width: 75%" src="/img/projects/toyteller/technical_details.png">
The task of translating motions to action information (<span style="color: hotpink"><b>motion2action</b></span> and <span style="color: purple"><b>motion2char</b></span>) is done by our trained LSTM models.
Generating motions out of action informaiton (<span style="color: royalblue"><b>proactive action+char2motion</b></span> and <span style="color: teal"><b>proactive action+char2motion</b></span>) is also done by training our LSTM models.
<br/>
<br/>
<br/>
<img style="width: 75%" src="/img/projects/toyteller/action2text.png">
To generate texts out of action information (<span style="color: peru"><b>action+char2text</b></span> in the overview diagram), we mapped action embeddings to <i>soft prompts</i> in the LLM's input embedding space, so that we can use it within the prompt to generate a story. Active character indicator was also reflected onto the story generation prompt.
<br/>
For translating texts into action information (<span style="color: crimson"><b>text2action+char</b></span>), we used a combination of text embedding models and LLM classifications.
<br/><br/><br/>
</div>

# Technical Evaluation
<div>
We compared our approaches to GPT-4o, in terms of performances in 
<br/>
1) translating motions into action information (<span style="color: hotpink"><b>motion2action</b></span> and <span style="color: purple"><b>motion2char</b></span>), 
<br/>
2) generating story texts out of motions (<span style="color: hotpink"><b>motion2action</b></span> and <span style="color: purple"><b>motion2char</b></span> ➔ <span style="color: peru"><b>action+char2text</b></span>), and 
<br/>
3) generating motions out of action information (<span style="color: royalblue"><b>proactive action+char2motion</b></span> and <span style="color: teal"><b>proactive action+char2motion</b></span>). 
<br/>
<br/><br/>
<b>Overall, our system outperforms a competitive baseline, GPT-4o in many aspects.</b>
<br/>
<br/><br/>
<img style="width: 100%" src="/img/projects/toyteller/motion2action_eval.png">
<i style="font-size: 15px;">For 1) <span style="color: hotpink"><b>motion2action</b></span> and <span style="color: purple"><b>motion2char</b></span>, we evaluated if motion2action places gold standard actions in higher ranks (Action Rank) with more weights (Action Weight Ratio
to Top 1) in shorter times (Action Latency) compared to GPT-4o alternatives. We also compared motion2char to GPT-4o regarding
accuracy in classifying active characters (Character Correctness) and latency (Character Latency). GPT-4o-V uses motion images as input and GPT-4o-C uses textual coordinates as input.</i>
<br/><br/><br/>
<img style="width: 100%" src="/img/projects/toyteller/motion2text_eval.png">
<i style="font-size: 15px;">For 2) <span style="color: hotpink"><b>motion2action</b></span> and <span style="color: purple"><b>motion2char</b></span> ➔ <span style="color: peru"><b>action+char2text</b></span>, we assessed motion-text alignment, novelty/interestingness, coherence/grammaticality, latency, and diversity in text generation. Ours-top1 indicates the condition that does not use soft prompts.</i>
<br/><br/><br/>
<img style="width: 50%" src="/img/projects/toyteller/action2motion_eval.png">
<i style="font-size: 15px;">For 3) <span style="color: royalblue"><b>proactive action+char2motion</b></span> and <span style="color: teal"><b>proactive action+char2motion</b></span>, we evaluated alignment between actions and motions, realism of the motion (e.g., the motion does not have drastic jitters), and latency.</i>
<br/><br/><br/>
</div>

# Generated Samples

<div style="display: flex">
  <div style="width: 30%; padding: 10px;">
    <div><i>Input</i></div>
    <div style="font-size: 15px;">Black - Paul <br/>White - Nolly (who dislike Paul)</div>
    <img style="width: 100%; margin-top: 0px;" src="/img/projects/toyteller/sample1.gif">
  </div>
  <div style="width: 70%; padding: 10px;">
  <i>Output</i><br/>
  As Paul tried to leave the party, Nolly, who disliked him intensely, began to loudly whisper his name, causing Paul to feel embarrassed and eventually forced to leave, effectively being chased away by Nolly's unwanted attention.
  </div>
</div>


<div style="display: flex">
  <div style="width: 30%; padding: 10px;">
    <div><i>Input</i></div>
    <div style="font-size: 15px;">Black - Lyra Novax <br/> White - Zephyr Astro</div>
    <img style="width: 100%; margin-top: 0px;" src="/img/projects/toyteller/sample2.gif">
  </div>
  <div style="width: 70%; padding: 10px;">
  <i>Output</i><br/>
  As the gravity generators sputtered to life, Lyra Novax leaned in close to Zephyr Astro's ear and whispered, "Zeph, I've got the hack in place, now let's get out of here before the security forces follow our trail."
  </div>
</div>


<div style="display: flex">
  <div style="width: 30%; padding: 10px;">
    <div><i>Input</i></div>
    <div style="font-size: 15px;">Black - Jack <br/> White - Amy</div>
    <img style="width: 100%; margin-top: 0px;" src="/img/projects/toyteller/sample3.gif">
  </div>
  <div style="width: 70%; padding: 10px;">
  <i>Output</i><br/>
  As Jack's fingers danced across the worn wooden keys, he passionately argued with Amy about the merits of their favorite novel, his words pouring out in a fervent plea to sway her opinion.
  </div>
  
</div>
<br/><br/><br/>


# User Study
<div>
With the user study, we found that toy-playing holds different strengths and weaknesses than natural language prompting. 
<br/><br/>
Toy-playing was more adequate for expressing motion/action-related nuanced ideas or under-developed ideas that are yet hard to verbalize. 
<br/><br/>
On the other hand, natural language prompting was more adequate if the user wants to be specific on aspects that is irrelevant to actions/motions. 
<br/><br/>
As Toyteller allows users to use both interaction approaches, we could observe users using these approaches in mix, complementing these with each other. 
<br/><br/>
<img style="width: 50%" src="/img/projects/toyteller/mix1.png">
<i style="font-size: 15px;">A case of mixing motion and natural language prompt inputs.</i>
<br/><br/>
We could also observe users flexibly dividing roles with AI in terms of which aspects of artifacts will be created by whom.
<br/><br/>
<img style="width: 100%" src="/img/projects/toyteller/mix2.png">
<i style="font-size: 15px;">Various cases of user dividing roles with AI.</i>
<br/><br/>
<img style="width: 50%" src="/img/projects/toyteller/usage_pattern.png">
<i style="font-size: 15px;">The distribution of how participants created story sentences and motions. ‘Prompted’ means that the user input conditioning natural language prompts when generating text, and ‘edited’ means that the user edited story text after AI generated them. ‘Partial human motion’ indicates both human and machine contributed to creating motions. ‘B’ and ‘T’ denote ‘baseline’ and ‘Toyteller’, respectively.</i>
<br/><br/><br/>
</div>

# Design Space
<div>

We do not think that Toyteller is the only instantiation of toy-playing interactions. We imagine that there can be many other directions. Hoping to help future researchers, we lay out the design space of toy-playing interactions.<br/><br/>
<img style="width: 100%" src="/img/projects/toyteller/design_space.png"><br/>
<br/><br/> 
</div>

## Bibtex

<div class="bibbox">
@inproceedings{chung2025toyteller, 
  author = {Chung, John Joon Young and Roemmele, Melissa and Kreminski, Max},
  title = {Toyteller: AI-Powered Visual Storytelling Through Toy-Playing with Character Symbols}, 
  year = {2025}, 
  publisher = {Association for Computing Machinery}, 
  address = {New York, NY, USA}, 
  booktitle = {Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems}
  url = {https://doi.org/10.1145/3706598.3713435}, 
  doi={10.1145/3706598.3713435}, 
  location = {Yokohama, Japan},
  series = {CHI '25}
}
</div>
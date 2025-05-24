
# Game Development & Design.txt
- General Tips

Game Feel: Feedback to inform the player about the world. Enemies flashing, spilling blood, changing animations, or sounding off as they get shot. Recoil, gun sounds, etc. 

External links
	https://www.youtube.com/watch?v=216_5nu4aVQ

Gameplay first. Art, game design, programming, etc should all support this goal.
Easy to learn, difficult to master. Early gameplay should have simple mechanics and obvious objectives. As the game progresses, provide players with challenges that scale to the abilities of the player. 
Need a concept artist, modeller, sound designer, music artist, character artist, animator, technical artist, and fx artist. 

Fight Player Fatigue
	- vary play intensity
	- introduce novel situations
	- add new types of play
	- avoid confinement
	- bestow rewards for success
	- advertise progress
	- include subgames (not literally, things like customization and loadouts)
	- foreshadow victory
Maximize Expressive Potential (combat, movement, customization, etc)

Provide Clear Short-Term Goals
	- Supply goals directly or indirectly
	- Domain is General
	- Good way to "fight player fatigue"

Identify Constraints
	- Find your constraints as first step
	- Keep in mind throughout development
	- Domain is design process
	- Creative, technical, business, team

Let players turn the game off
	- construct good savegame systems
	- entertain, don't punish
	- design to hold player interest

- Mechanics and Teaching Players

Isolation principle: Introduce enemies by initially presenting them in smaller numbers than usual, or individually. Provide a safe environment for the player to figure out how to fight them. Once the player is confident in killing this enemy type, they're free to be used normally. After going through this area and assessing the player's ability, damage returns to standard levels, and adaptive difficulty takes root. 

Learn from Super Mario 64: Step 1, introduce the mechanic. Step 2, Twist its use. (e.g. jumping can be used to kill enemies), Step 3, add it to the gameplay.

Player freedom: When introducing the player to the game, give them freedom to explore the full extend of it's mechanics and let them move around without being told what to do. 

Mechanic over-saturation: Keep the player engaged by avoiding over-use of novel mechanics. e.g. Titanfall 2's time travel mechanic that was removed after the level was over. 

Setbacks: The game's setbacks are used to keep the player in the sweet spot of difficulty. Struggle, engagement, but doesn't make them want to stop. Obstacles with solutions. You fail in real life, but you can't go back to a previous check point. You've got to move forward. If the player is having a hard time with a particular fight, an NPC might suggest they retreat and find an alternative path. Setbacks. Player has an objective. If they fail that objective, the mission isn't over, the game goes on. Say for example, the squad was supposed to reach a door before it closes, they don't make it. Leave the player with an alternative route. Recoverable failure. Setbacks for consequential play. Modify the goal to overcome the setback. introduce new routes after multiple player failures. NPC can present new path and avoid boss or difficult area

- Art tips
The art in Star Wars: The Clone Wars had no specular (nothing in it was shiny), matte finish. Very painterly look, so all the textures were hand painted. Sort of surrealist approach to texture. Imperfection in texture work.
	Colorful neon lights don't equal sci-fi
	No holograms, AR is acceptable
	Grounded fictional technology, no hover cars or teleportation.
texture size
(1024x1024(1K), 2048x2048(2K), 4096x4096(4K), and 8192x8192(8K) which should be used? how would one implement all of these without putting an enormous dent in the game size?
consider accommodating dual-core CPUs. things like uncompressed audio to lessen CPU load

- Programming tips
Hidden health: DOOM values the last bit of health as more hit points than the rest of it to encourage a feeling of *just* surviving. Bioshock did this by making the player invulnerable for 1-2 seconds if they would've died. 

Smart camera: Third person game thumb stick correction is a favorite. The game detects collision blocks and steers player around them, ignoring direction of input. 

Controller accessibility: With controllers, utilize features like aim acceleration, snapping, soft lock (drags your view along with an enemy), friction (your aiming speed decreases when your cross hairs are on an enemy), and bullet magnetism to aid those using an inferior peripheral. 

- Optimization Tips
	Performance doesn't just concern the environment, leave a buffer for enemy rendering.
	CPU feeds the GPU. GPU unpacks the data sent by the CPU. 
	Squishy Performance Hammer. Work with art team to get things running well. If that doesn't work, use a sledge hammer. Balance performance and visual fidelity. 
	Per Frame budget. Identify critical costs. Negotiating for milliseconds. Finding the right mix, determine AI budgeting. Allow for overhead. Aim for 8.3ms (4K 120fps). GTX 1080ti
	Classify map areas to determine optimization goals. Is it combat heavy, environmental? Determine how to spend the per frame budget. 
	Early performance layout review
	Line of sight checking. (walk around the map, check to be sure it's all optimized)
	Performance tools. Render freeze. Toggle draw states. Heat mapping. CPU/GPU timing.
	Potential issues: Poor LODing. Small triangles, too many objects. (drawcalls)
	Potential solutions. Delete them, tune LOD (tweak object detail level) distance. 
	Performance techniques. Draw calls. Distance cull. (rendering needed objects)
	Performance techniques. Occlusion cards. Fog, bloom, imposter (texture map crossfade), view distance dependent. Hide an area and reveal objects behind it when its reached.
	Performance issues. Poor culling. Big meshes (cut large meshes up into sections so it's easier to render as the player crosses it). Expensive shaders. (many samplers/instructors)
	Performance technique: Refine portals to improve large scale culling. 
	Performance issues: Overdraw. Lots of overlapping transparent pixels. 
	Reduce overdraw. Tune fx. Low-res buffer. 
	Reduce transparents. Geometry/material tweaks. Skybox silhouette edge. Shore vs deep water. Optimize post-FX. Optimize collision meshes. 
	Lighting costs. Too many lights/influences. Too many dynamic lights. Change lights to a cheaper type. Reduce radius. Reduce number. 
	Callouts. Environment, Lighting, FX, Characters. Give them options for optimization.
	Be clever with level design. Cull using corners and door ways. Reduce performance cost.
	Modular loading (RAM), only load what you need. Good way to avoid loading screens.
	split up drall call budget. e.g. environment - 6.5ms characters, weapons, vehicles 1.8ms. run slightly under budget to account for cpu/gpu issues.
	Aim for 2560x1440p at 120fps or 1080p at 60fps
	8.3ms (4K 120fps) 1080ti
	don't run calculations per frame
	LODs should be screen sized based, not distance based

- Enemy design tips
Considerate enemies: In Half Life 1, if the player faces more than two enemies at once, only one would actually attack. The rest would run to random locations and bark lies. e.g. Flanking! Halo famously did this, and interestingly, the number that attack increases the closer to you to them, giving a feeling of pushing into the action or easing out of it.  

Artificial control: Halo 2 makes players feel like they have influence over battle by forcing Grunt NPCs to panic if Elites are killed nearby. Halo 3 embellishes this by having each fight act as a dance: first push forward, then fall-back and finally a last-stand against the player.

Missed on purpose: First shots from an enemy against you in BioShock always missed. In Half Life 2, if an enemy misses, the bullets are sent in a trajectory calculated to be the most 'interesting'. 

Distinguished silhouette: If the textures and shadows are removed from the 3D object. Are the enemies still easy to tell apart from one another? Enemies should use colors for contrast.

- Audio/music tips
	If there are transitions or loading screens, don't kill the audio. It ruins the atmosphere.

- Writing/AI Tips
Realistic ignoring: In Firewatch, when a player doesn't respond to dialogue prompt the game notes this as a choice. It reacts to non-response, and it helps create a feeling that ignoring someone has social consequence and the other person is 'real.'

Creating compelling characters
	Organic relationship
	Useful to player
	Never burden player
	Writing in the game needs to have context
	It must represent the character well
	Embrace the player's experience as story
	The ability to lie
	Characters with agency
	Player copes with the actions of an NPC
	Play can't always influence NPC actions
	NPCs don't immediately open up to player
	The protagonist can't always help people
	The protagonist isn't necessarily a hero
	Humor is important. Don't take everything seriously.

Creating compelling enemy AI
	Aggressive enemies hunt down and kill the player and their allies
	Enemies shouldn't be too weak. Their health affects the player's perception of them
	Good AI lets the player cheat, but not in a way that they would notice
	When the player pops up from cover the enemies have a 0% chance to hit the player, letting them pop off a few shots
	In the far cry series, only a few enemies will be allowed to shoot at you at once. improving your odds of winning the fight
	Good AI is predictable. Intentionality. The player's ability to devise their own goals through an understanding of a game's dynamics

External Links
	https://www.youtube.com/watch?v=k72sJZ7E7yI

Orthogonal Enemies
magnify small player vulnerabilities. drive unpredictability. game axies should be play-style agnostic. there can't be one enemy that prevents all styles of play. put pressure on the player, but also provide them with channels for surviving or overcoming those obstacles. 

AI Pathfinding
Don't overcomplicate AI pathing. Reduce total number of nav points. Keep them predictable.

creating morally difficult characters
establish factions, and the varying ideologies within those factions. nothing is black and white. add grey. nuanced. multiple motivations. represent variation of these perspectives using squad members dialogue. no one is 'the bad guy' humanizing details
link character motives to game goals. why do the humans fight the renlei, but not the menesk?
play to character motives or desires: honor, knowledge, law, faction, public image, trade, peace, resolve, personal goals, etc. reward the player for aligning to those character motives/desires. e.g. honor points. give them these points/rewards for doing things like slaughtering the forces of good. 
free to chase a character's small scale desires all over the place which inevitably leads them to some very dark decisions, while humanizing details distract them from the fact that they are behaving badly. 

World building
	World building must be specific. Specific both in terms of detail, and also specific to your world. 
	Always be world building. Every location, NPC, line of dialogue, objective, side quest, and loot pick up is an opportunity. 
	Say things about people. World building is a form of storytelling, and stories are about people. 

- Level Design
Negative Space in Maps
	https://www.youtube.com/watch?v=GZ99gAb4T0o
	Use negative space to anchor the player's attention. Easier to spot enemies, for example.
	Cluttered maps are difficult to navigate and fight in. Mimic Blood Gulch and Dust. 
	Blur, shrink, or squint. Is the map still readable? Where are the paths, enemies?
	Make sure the foreground and background work together. Focus player attention.
	Clarity is incredibly important for the player during gameplay.
	Use the palette filter in photoshop. Are the features still distinguished?
	Application of negative space design techniques increases map playability. 
	If you overwhelm your player with too much info, they'll likely have trouble processing it
	Remove clutter from maps. Ask where the player's eyes are going. Avoid distractions.
	Perceived complexity affects a player's ability to process visual information.
	Focused front ground delineation
	Organized presentation of detail
	Balance of light/colors/shapes
	Appropriate scale of visual and audio space
	Subtracting the obvious and only adding the meaningful

General map tips
	Each location has multiple entry points you can choose from.
	The main objective is always in the middle of the map.
	Provide multiple routes for the player to choose from.
	Routes must lead into each-other, connecting and bending to form a whole map.

Honest geography: No hidden walls in level design. Avoid falling debris or shouting squad leads; walls are walls, designed to be pushed against in case of a secret room or ammo depot. 

Navigation tips
	Conscious use of contrast everywhere in a level between light and dark areas.
	If a player can see outside that they should be able to somehow get there. (DOOM)
	Being strict about designing several secret areas on every level.
	Making my levels flow so the player will revisit areas several times.
	Creating easily recognizable landmarks in several places for easier navigation.

External Links
	Player Navigation: https://www.youtube.com/watch?v=k70_jvVOcG0

Design Steps
	Concept
	Layout
	Gameplay
	Decorate
	Polish
Interior Design and Environment Art - https://www.youtube.com/watch?v=WWXsmnlmADc
Do away with mini-maps and design levels that direct the player without it.

Good Level Design
	Good level design is fun to navigate
	the player should always know where to go. create a consistent visual language. e.g. warframe doors, mirror's edge runner's vision
	Good level design does not rely on words to tell the story. Tell the story through the environment. Mise-en-scene. 
	Good level design tells the player what to do (not necessarily verbally), but not how to do it.
	Good level design constantly teaches
	Good level design is surprising (keep things fresh, don't fall into a routine. introduce level design and enemy combination twists) fun is created by uncertainty. subversiveness
	Good level design empowers the player
	Good level design is easy, medium, and hard
	Good level design is efficient

Building Levels
Clearly defined requirements
	Target length
	Narrative
	Number of players/enemies
	Mechanic concept
Capture Intent, capturing the design of a level
	Concept
	Walkthrough - Scope, Major Objective, Major Beats
	Blockworld



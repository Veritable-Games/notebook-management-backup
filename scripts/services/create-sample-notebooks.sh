#!/bin/bash

echo "Creating sample notebooks for the Knowledge Constellation..."

# Create notebooks directory
mkdir -p /home/user/Notebooks

# Create project notebook directories
mkdir -p /home/user/Notebooks/on-command-wiki-pages
mkdir -p /home/user/Notebooks/noxii-wiki-pages
mkdir -p /home/user/Notebooks/reference-wiki-pages

# Create sample notebook files
cat > /home/user/Notebooks/on-command-wiki-pages/Game_Design.txt << 'EOL'
# On Command - Game Design Document

## Core Gameplay Loop

1. Receive mission briefing and objectives
2. Deploy team to mission area
3. Navigate terrain and overcome obstacles
4. Engage enemies using tactical positioning
5. Complete objectives and extract
6. Upgrade equipment and abilities between missions

## Key Features

- Squad-based tactical combat
- Real-time with pause gameplay
- Resource management and limited ammunition
- Dynamic mission environments
- Character progression and specialization
- Strategic base management between missions

## Visual Style

The game employs a stylized realistic approach with:
- High contrast lighting
- Focused color palette per environment
- Minimalist UI that integrates with the game world
- Environmental storytelling through level design

## Target Audience

- Primary: Players aged 18-35 who enjoy tactical strategy games
- Secondary: Sci-fi fans interested in near-future settings
- Tertiary: Narrative-focused players who enjoy military storylines
EOL

cat > /home/user/Notebooks/noxii-wiki-pages/Enemy_Design.txt << 'EOL'
# Noxii - Enemy Design Document

## The Noxii Entity

The primary antagonist is not a traditional enemy but a semi-sentient energy field that manifests in different forms.

### Properties

- Exists primarily as a field of dark energy
- Can temporarily coalesce into physical forms
- Adapts to player tactics over time
- Distorts electronic equipment when nearby
- Creates psychological effects on humans in proximity

### Manifestation Types

1. **Wisp Form**: Fast-moving scout entity with limited offensive capability
2. **Hunter Form**: Aggressive predator that actively pursues the player
3. **Barrier Form**: Stationary field that blocks pathways and must be dispersed
4. **Corruption Form**: Infects other creatures or machinery, creating hybrid enemies

### Player Interactions

- Direct combat is less effective than environmental countermeasures
- Light-based weapons can temporarily disperse concentrations
- Sound frequencies can disrupt its ability to maintain cohesion
- Temperature extremes slow its movement and reaction time
EOL

cat > /home/user/Notebooks/reference-wiki-pages/narrative-structure.txt << 'EOL'
# Narrative Structure Guidelines

## Three-Act Structure

### Act One: Setup (25%)
- Introduce protagonist and their normal world
- Establish key relationships
- Present inciting incident
- Decision to embark on journey

### Act Two: Confrontation (50%)
- Protagonist faces escalating challenges
- Allies and enemies are encountered
- Mid-point revelation changes understanding
- All seems lost moment near end

### Act Three: Resolution (25%)
- Protagonist makes final preparations
- Climactic confrontation occurs
- Loose ends are resolved
- New normal world is established

## Character Development Arc

1. **Initial State**: Character begins with flaws and misconceptions
2. **Challenge**: External events force character to question beliefs
3. **Resistance**: Character initially resists change
4. **Glimpse**: Brief moment of seeing potential new perspective
5. **Regression**: Return to old patterns under pressure
6. **Catalyst**: Significant event forces final choice
7. **Transformation**: Character embraces new understanding
8. **Integration**: New perspective is applied to resolve story

## Maintaining Narrative Tension

- Create clear stakes that matter to the character and audience
- Establish ticking clocks to create urgency
- Develop multiple layers of conflict (internal, interpersonal, external)
- Use scene structure with clear objectives, obstacles, and outcomes
- Balance exposition with action and reflection
EOL

echo "Sample notebooks created successfully."
echo "You can now access them through the Simple Notebook Browser."
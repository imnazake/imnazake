---
sidebar_position: 3
---

# Features

The `Gameplay Interactions` plugin provides a flexible, network-replicated interaction system framework based on the **Gameplay Ability System**, enabling developers to create dynamic gameplay experiences with customizable features.

:::info
**Important**: This plugin requires the setup of the **Gameplay Ability System** in your project with enhanced input handling to function properly. Check out the demo project source code for an example.
:::

## Key Features

### **Instant and Timed Interactions**
- Supports both instant and timed interactions by default, giving you full control over interaction behaviors in your game.

### **Entity Outline Drawing**
- Draws an outline around entities in the player's view, making them easy to identify for potential interactions.

### **Multiple Interaction Options**
- Supports multiple interaction options, allowing the player to select from different available actions when interacting with an entity or object.

### **Montages, Audio, and Effects**
- Trigger montages, audio cues, and apply various effects through interaction gameplay abilities to enrich the player's experience.

### **Interaction Policies**
- Includes flexible interaction policies such as:
  - **Default** – No restrictions on the number of interactors or the interactions themselves. Any player can interact at any time.
  - **Specific Number Of Players** – Restricts the number of concurrent interactors, allowing only a specified number of players to interact with the entity at once.
  - **Specific Players** – Limits interactions to a predefined set of players, ensuring only those players can engage with the entity or object.

---

## Code Modules

### **GameplayInteraction (Runtime)**
- Core functionality for handling interactions and their integration with the Gameplay Ability System.
### **GameplayInteractionEditor (Editor)**
- Provides tools and editor functionality to manage and customize interaction systems directly within the Unreal Engine editor.

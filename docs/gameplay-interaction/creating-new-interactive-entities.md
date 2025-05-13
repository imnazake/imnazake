---
sidebar_position: 3
---

# Creating New Interactive Entities

This guide walks you through the process of creating and configuring **Interactive Entities** for the **Gameplay Interaction Plugin**. 
Create new actors for players to interact with easily.

---

### 1. **Create a New Interaction Ability Blueprint**

To begin, you will need to create a new Interaction Ability Blueprint. This Blueprint will define the functionality for your interaction ability.

- In Unreal Engine, navigate to the **Content Browser**.
- Right-click in the directory where you want to store the new Blueprint.
- Select **Blueprint Class**.
- You can choose between two built-in types as the parent class of the new interaction ability:
    - **Instant Interaction** : `GA_Interaction_Instant`
    - **Timed Interaction** : `GA_Interaction_Timed`
- Name your new Blueprint (e.g., `GA_Interaction_Door_Open`).

> These base Gameplay Ability classes can be found in the plugin content folder:  
> `Core/Abilities/Templates`

:::info
You may also create custom interaction ability types if needed.
:::

---

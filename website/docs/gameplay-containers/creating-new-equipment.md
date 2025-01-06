---
sidebar_position: 3
---

# Creating New Equipment Items

This guide explains how to create equipment items for your game using the **Gameplay Containers**. The steps include setting up equipment definitions, configuring meshes, animations, and abilities, and spawning equipment actors for your game. Follow along to set up functional and dynamic equipment.

---

## 1. Create a Gameplay Equipment Definition Data Asset

Start by creating a **Gameplay Equipment Definition** data asset. This serves as the core definition for the equipment.

### Steps:
1. In the Content Browser, right-click and select **Miscellaneous** > **Data Asset** > **GameplayEquipmentDefinition**.
2. Name the asset (e.g., `GED_MyItem`).
3. Save the asset.

![Gameplay Equipment Definition](./images/02.png)

---

## 2. Set Up the Equipment Definition

Configure the equipment definition to specify what **equipment instance** should spawn when the item is equipped or active.

### Steps:
1. Open the equipment definition asset.
2. Locate the **Instance Class** field and select the appropriate class that inherits from `GameplayEquipmentInstance`.
3. Save your configuration.

---

## 3. Configure Modular Meshes

If your game uses **modular meshes** for equipment, define which meshes should be used. Each mesh is identified by a **tag** for later lookup.

### Steps:
1. In the equipment definition, locate the **Meshes** section.
2. Add entries for the required modular meshes.
   - **Tag**: Assign a unique identifier for each mesh.
   - **Mesh Reference**: Link the skeletal or static mesh.
3. Save the asset.

![Modular Meshes Configuration](./images/02.png)

---

## 4. Configure Animation Layers

Define animation layers that should be linked when the equipment is equipped or unequipped. Animation layers are identified by **tags** for lookup.

### Steps:
1. In the equipment definition, find the **Animation Layers** section.
2. Add entries for each required animation layer.
   - **Tag**: Assign a unique tag for the layer.
   - **Layer Class**: Specify the class of the animation layer to link.
3. Save the configuration.

![Animation Layers Setup](./images/02.png)

---

## 5. Configure Animation Montages

Set up animation montages to play during equipment transitions such as equipping, unequipping, or switching items. These are especially useful for **hotbar** systems.

### Steps:
1. In the equipment definition, navigate to the **Animation Montages** section.
2. Add entries for each montage.
   - **Tag**: Assign a unique tag for the montage.
   - **Montage Reference**: Link the animation montage asset.
3. Save the configuration.

![Animation Montages Setup](./images/02.png)

---

## 6. Configure Abilities, Effects, and Attributes

Create a **GameplayContainerAbilitySet** data asset to configure which **gameplay abilities**, **effects**, and **attributes** are granted to the player or object equipping the item. These are automatically removed upon unequipping.

### Steps:
1. In the Content Browser, right-click and select **Miscellaneous** > **Data Asset** > **GameplayContainerAbilitySet**.
2. Name the asset (e.g., `AbilitySet_MyItem`).
3. Open the asset and configure:
   - **Abilities**: Add gameplay ability classes.
   - **Effects**: Add gameplay effect classes.
   - **Attributes**: Add attribute sets.
4. Save the asset.

![Ability Set Configuration](./images/03.png)

---

## 7. Create an Equipment Actor

Create an actor that inherits from `GameplayEquipment`. This represents the equipment in the game world, containing meshes to attach to the player when equipped and destroyed when unequipped.

### Steps:
1. Create a new actor class that inherits from `GameplayEquipment`.
2. Add the required meshes to the actor as components.
3. Configure the collision settings for the meshes.
4. Save the actor.

![Gameplay Equipment Actor](./images/04.png)

---

## 8. Specify Equipment Spawning Info

Finally, configure how the equipment should spawn for the player, including actor details, attachment rules, and modular mesh information.

### Steps:
1. In the equipment definition asset, locate the **Spawning Info** section.
2. Configure the following:
   - **Actor Class**: Specify the equipment actor class to spawn.
   - **Attachment Rules**: Set rules for attachment (e.g., socket name, transform).
   - **Meshes to Attach**: Define which meshes to use, identified by tags matching the character's mesh component tags.
3. Save the configuration.

![Equipment Spawning Info](./images/02.png)

---

By following these steps, you can create fully functional and modular equipment items for your game.
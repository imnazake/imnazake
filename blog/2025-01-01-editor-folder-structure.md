---
title: Clean Folder Structure (Editor)
description: A maintainable content folder structure for Unreal Engine projects that scales with solo and team development.
authors: nazake
tags: [ue, editor, structure, blueprints]
slug: unreal-editor-folder-structure
date: 2025-01-01
---

Organizing your Unreal Engine project is one of the most underrated things you can do to stay productive and avoid chaos as your game grows.

Here’s a **clean and maintainable folder structure** that works great for both solo developers and teams. It’s battle-tested and follows industry best practices.

---

## 📁 Folder Structure

This goes inside your **`Content`** folder:

```plaintext
Content/
│
├── Art/
│   ├── Characters/
│   ├── Environments/
│   ├── Props/
│   └── UI/
│
├── Blueprints/
│   ├── Characters/
│   ├── Controllers/
│   ├── GameModes/
│   ├── Interfaces/
│   ├── Widgets/
│   └── Misc/
│
├── Maps/
│   ├── MainMenu/
│   ├── Levels/
│   └── Testing/
│
├── Materials/
│   ├── Master/
│   ├── Instances/
│   ├── Functions/
│   └── Textures/
│
├── Meshes/
│   ├── Characters/
│   ├── Environments/
│   ├── Props/
│   └── Vehicles/
│
├── Animations/
│   ├── Characters/
│   ├── Montages/
│   └── Blendspaces/
│
├── Audio/
│   ├── Music/
│   ├── SFX/
│   └── VO/
│
├── UI/
│   ├── Widgets/
│   ├── Fonts/
│   └── Textures/
│
├── FX/
│   ├── Particles/
│   ├── Niagara/
│   └── Decals/
│
├── Core/
│   ├── DataAssets/
│   ├── Enums/
│   ├── Structs/
│   └── Functions/
│
├── Game/
│   ├── Abilities/
│   ├── Inventory/
│   ├── Items/
│   ├── Weapons/
│   └── Mechanics/
│
└── Dev/
    ├── [YourName]/
    └── Sandbox/
```

---

## 🧠 Breakdown

### Art
External content and artist-friendly folders. Put concept art, references, and high-poly models here.

### Blueprints
Your game’s logic brain. Divide by type — characters, controllers, widgets, etc.

### Maps
Main levels, test levels, and menus — all organized for clarity.

### Materials
Split between `Master`, `Instances`, and `Functions` to make scaling easier.

### Meshes
Static Meshes and Skeletal Meshes. Organized by category like environment or props.

### Animations
Keep blendspaces, montages, and sequences tidy by character or category.

### Audio
Separate voice lines, SFX, and music for easy audio pipeline control.

### UI
Widgets, textures, and fonts for HUDs, menus, and UI elements.

### FX
Visual effects, particle systems, and decals go here — use Niagara for future-proofing.

### Core
Game-wide systems like enums, structs, utility functions, and DataAssets.

### Game
Gameplay logic: abilities (GAS), inventory, items, weapons, etc.

### Dev
For developer sandboxes, experiments, and WIP content — keep it outside your shipping build.

---

## ✍️ Naming Conventions

- Blueprints: `BP_` (e.g. `BP_PlayerCharacter`)
- Widgets: `WBP_` (e.g. `WBP_InventoryMenu`)
- Materials: `M_`, `MI_` (Material Instance), `MF_` (Function)
- Static Meshes: `SM_`, Skeletal Meshes: `SK_`
- Sounds: `SFX_`, `BGM_`, `VO_`
- Animations: `AS_` (AnimSequence), `AM_` (AnimMontage), `BS_` (Blendspace)

---

## ✅ Best Practices

- Use **Editor Utility Widgets** to automate organization and bulk operations.
- Consider **feature plugins** if you're building large modular systems.
- Keep `Dev/` out of version control or builds.
- Clean unused assets regularly using the reference viewer.

---

A well-structured project makes debugging easier, improves iteration speed, and reduces onboarding time for collaborators. Set it up right from the start — future you will thank you.

Got a better structure or plugin-friendly setup? Drop it in the comments!

---
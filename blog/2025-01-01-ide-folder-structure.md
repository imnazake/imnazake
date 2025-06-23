---
title: Clean Folder Structure (IDE)
description: A scalable C++ source folder structure for Unreal Engine that supports both solo and team development workflows.
authors: nazake
tags: [ue, ide, structure, c++]
slug: unreal-cpp-folder-structure
date: 2025-01-01
---

Unreal Engine's default C++ folder layout works, but it quickly becomes a mess as your game grows. A well-structured `Source` folder can save hours of debugging and onboarding headaches.

<!-- truncate -->

Here’s a **clean and modular C++ folder structure** that scales with solo and team development.

---

## 📁 Folder Structure

This goes inside your **`Source/YourProject`** directory:

```plaintext
Source/YourProject/
│
├── Core/
│   ├── YourProject.h           
│   ├── YourProject.cpp
│   ├── LogChannels.h             # Centralized log categories
│   └── Utility/                  # Macros, helpers, common utilities
│
├── Framework/                    # Game framework classes
│   ├── GameMode/                 
│   ├── GameState/                
│   ├── Player/                   # Player-specific logic
│   │   ├── Character/
│   │   ├── Controller/
│   │   └── State/
│   └── HUD/                     # HUD/UI related to gameplay
│
├── AI/                              # Artificial intelligence
│   ├── Controllers/                 # AAIController subclasses
│   ├── BehaviorTrees/               # BTs, services, tasks, decorators
│   ├── Perception/                  # Perception system classes
│   └── Data/                        # Blackboard data, config

├── Systems/                     # Self-contained gameplay systems
│   ├── Inventory/               # Inventory system implementation
│   │   ├── InventorySystem              # Core system classes
│   │   ├── InventoryComponents          # Component(s) related to inventory
│   │   ├── InventoryEnums               # Enums used by inventory system
│   │   ├── InventoryStructs             # Structs and data structures
│   │   ├── InventoryDataAssets          # UDataAsset definitions
│   │   ├── InventoryInterfaces          # Interfaces used by inventory system
│   │   └── [Etc...]
│   │
│   ├── Abilities/               # Gameplay abilities system
│   │   ├── AbilitySystem 
│   │   ├── AbilityComponents 
│   │   ├── AbilityEnums
│   │   ├── AbilityStructs
│   │   ├── AbilityDataAsset
│   │   ├── AbilityInterfaces
│   │   └── [Etc...]
│   │
│   ├── Interaction/            # Player or world interaction system
│   │   ├── InteractionSystem 
│   │   ├── InteractionComponents
│   │   ├── InteractionEnums 
│   │   ├── InteractionStructs 
│   │   ├── InteractionInterfaces
│   │   └── [Etc...]
│   │
│   └── [Other systems…]
│ 
├── Input/                           # Enhanced Input support
│   ├── Config/                      # InputMappingContexts, InputActions
│   └── Handlers/                    # Custom input logic or wrappers
│
├── UI/
│   ├── Widgets/                # UUserWidget classes
│   └── Data/                   # UI-related data assets and enums etc...
│ 
├── Editor/                     # Editor tools, widgets, etc.
│   ├── Widgets/                
│   └── Data/                   
│
├── Dev/                       # Temporary/test/dev-only code
│   └── Sandbox/
│
└── YourProject.Build.cs        # Build configuration file

```

## 🧠 Breakdown

### Core
Core headers, macros, and logging config. Usually where your precompiled header (`YourProject.h`) and main module file (`YourProject.cpp`) live.
Contains utilities and helper functions common across your entire project.

### Framework
Contains core gameplay framework logic such as `GameMode`, `GameState`, `HUD`, and player-specific classes like `Character`, `Controller`, and `PlayerState`.

### AI
Holds all AI-related logic including behavior trees, blackboard data, AI controllers, and perception components.

### Systems
Self-contained gameplay systems that encapsulate specific game mechanics. Designed to be modular for reuse or plugin conversion.

- Inventory
Implements all inventory-related features: core systems, components for inventory management, enums for item types or states, data structures for item definitions, UDataAssets for configurable data, and interfaces for interaction contracts.

- Abilities
Manages gameplay abilities including the ability system core, ability-related components, enums, structs, data assets, and interfaces to define ability behaviors and effects.

- Interaction
Handles player or world interaction systems: interaction logic, components, enums to define interaction types, data structs, and interfaces to implement consistent interaction contracts.

- Other systems
Add more gameplay systems as needed, following the same modular structure.

### Input
Contains all input-related logic and configuration, such as input mapping contexts, input actions, and input components.

### UI
Contains your `UUserWidget` C++ classes and any supporting UI logic or data (e.g. data tables, UI enums).

- **Widgets:** All UUserWidget subclasses for HUD elements, menus, and UI components.
- **Data:** UI-related data assets, enums, and supporting structures.

### Editor
Includes tools, custom editors, and development-only assets used to enhance the Unreal Editor experience.

### Dev
Temporary or experimental code and sandbox tests. Useful for prototyping and development without affecting production code. Should be excluded from shipping builds.

---

## ✍️ Naming Conventions

Stick to Unreal’s coding standards but you can adopt slight variations for clarity:

- **Classes:** `U`, `A`, `F`, `I` prefixes (e.g. `UUserWidget`, `AEnemy`, `FItemData`, `IInteractable`)
- **Components:** `UYourProject[Name]Component` (e.g. `UYourProjectHealthComponent`)
- **Systems:** Folder-level prefixes like `Inventory/`, `Abilities/`, etc.
- **Log Categories:** Use a centralized `LogChannels.h`

---

## ✅ Best Practices

- **1 class per file:** Avoid multiple classes in one file unless nested or private.
- **Minimal header includes:** Use forward declarations where possible.
- **Avoid circular dependencies:** Especially between systems — use interfaces or weak references.

---

A clean C++ folder structure reduces confusion, speeds up compile times, and helps new developers (or future you) navigate the codebase with confidence.

Got your own folder strategy or engine module setup? Share it in the comments!

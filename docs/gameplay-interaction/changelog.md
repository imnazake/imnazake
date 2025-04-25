---
sidebar_position: 3
---

# Change Logs

## Version 1.1

:::info
Unreal Engine 5.2 users will no longer receive plugin updates.
:::

### Features
- **Player Interaction Policies:**  
  - Added a system to dynamically allow or block specific players from interacting with entities based on their `UniqueNetId`.  
  - Introduced new server-only functions in the **Entity Interaction Component** for registering and unregistering players using the provided **Ability System Component**.

### Improvements
- **Flexible Interactive Entity Base Class:**  
  - Updated the base class for interactive entities to support **any actor** that implements both `IGameplayInteractiveEntityInterface` and `IOutlineDrawingEntityInterface`.  
  - Refactored relevant code to support this change across all components and systems.  
  - To get this update you should be at least on engine version **5.3** or higher.

--- 

## Version 1.0

### **Initial Release**
- The first stable release of the *Gameplay Interaction* plugin, featuring core functionality for gameplay interactions.

---
sidebar_position: 3
---

# Change Logs

## Version 1.4

### Features
- **Overflow Handling:** Implemented overflow handling for items to better manage item capacities.
- **Equipment Replication:** Improved equipment replication between clients and the server, including callbacks for linking animation layers and playing montages.
- **Container Access Permissions:** Added container access permissions and streamlined user registration logic.
- **Attachment System Update:** Moved the attachment widget to a new full-screen menu to enable dynamic item combining.
- **Sorting Functionality:**  
  - Added a sorting order parameter for improved customization.  
  - Introduced two new sorting options: **Sort by Type** and **Sort by Quantity**.
- **Item Details Menu:** Added a new menu for viewing detailed information about items, potentially replacing tooltip widgets.

### Improvements
  **Improved Input Detection:** Enhanced input detection for slot context menus, attachment menus, and all split stack operations.
- **Naming Changes:**  
  - Updated attachment-related names for clarity:  
    - `Attachments` → `Attachment Slots`.  
    - `Default Attachments` → `Startup Attachments`.  
  - Renamed tasks for better understanding:  
    - `DetachItems` → `DetachAllItems`.  
    - `TransferItems` → `TransferAllItems`.
- **Item Definition Updates:**  
  - Removed mesh and material selection options from the world fragment in item definitions. These should now be configured directly in the world item actor or a shared world item actor class.  
  - Removed the common properties data asset; instead, each item should have its own world item class or share one as needed.
- **Equipment Mesh Interface:**  
  - Created an interface to retrieve equipment meshes from character classes, allowing support for varying meshes.  
  - Added a function to fetch meshes by tag using existing component tags across all actor components.

### Bug Fixes
- **Hotbar Callback:** Fixed the `OnActiveSlotChanged` Blueprint callback to provide both the active slot and the last observed slot, as the previous pin name implied the wrong behavior.
- **Ability Duplication:** Fixed an issue where abilities granted by equipment were not revoked properly and were being duplicated upon re-granting.

### Maintenance
- Removed the **common properties data asset** to simplify item configuration.  
- Streamlined world item configurations to allow for unique or shared item actors as appropriate.

---

## Version 1.3

### **Features**
- **Expanded Blueprint Support**: Exposed additional delegates to Blueprints for greater flexibility and customization.
- **Container Event Functions**: Added more Blueprint-implementable functions to handle container events, such as item addition/removal and equipment status changes (equipped/unequipped).
- **Attachment Event Handling**: Introduced additional functions for handling attachment events—items being added, removed, updated, or changed.
- **Item Details Action**: Added a new action to allow users to view detailed information about items within containers.

### **Improvements**
- **Enhanced Client-side Detection**: Improved the detection of container changes on the client side, ensuring smoother interactions and responsiveness.
- **Clearer Blueprint Event Naming**: Renamed Blueprint events to be more descriptive and easier to understand, enhancing readability and usability.
- **Subsystem Refactor**: Changed the gameplay container subsystem to a local player subsystem, improving its performance and organization.

### **Bug Fixes**
- **Standalone Mode Fix**: Resolved an issue where the `OnEquipped` function in equipment instances was not being triggered in standalone mode.

### **Maintenance**
- **Code Cleanup**: Removed several unused classes and interfaces to streamline the codebase and improve maintainability.

---

## Version 1.2

### **News**
- **Plugin Support**: Unreal Engine 5.1 users will no longer receive plugin updates.

### **Enhancements**
- **Stack Fragment**: Introduced a stack fragment to support stacking items within containers.
- **Weight Fragment**: Added a weight fragment for managing item weight.
- **Actions Fragment**: Added a fragment for defining item-specific actions.
- **Attachment Fragment**: Enabled item attachment functionality through the new attachments fragment.
- **Weight Attribute Set**: Implemented a weight attribute set for managing item weights effectively.
- **Attachment System**: Introduced a robust attachment system allowing items to be attached to one another within the container.
- **Context Menus for Slots**: Implemented context menus for gameplay container slots, providing additional options for item interactions.
- **Customizable Item Actions**: Item actions are now customizable and can represent context menu options and primary actions.
- **Global Random Loot Generation**: Added a function to generate global random items based on loot tables, considering all available item assets.
- **Item Drop Location Customization**: Introduced an interface for customizing item drop locations within containers, allowing per-container configuration by the owning actor.

### **Fixes**
- **Refactoring and Improvements**: Refactored gameplay container component functions for improved clarity and performance.
- **Data Asset Integration**: Transitioned item and equipment definitions to utilize primary data assets for greater flexibility.
- **Container and Slot Data Assets**: Updated container and slot definitions to support data assets, enhancing customization and scalability.
- **Item Rarity Display Fix**: Fixed issues with the display of item rarities and tooltips.
- **Enhanced Rarity Fragment**: Improved the rarity fragment with additional premade examples to cover a broader range of use cases.
- **Ability System Integration**: Improved the interaction between gameplay container components and the ability system, enabling better activation of abilities through gameplay events.

---

## Version 1.1

### **Fixes**
- **Looting Crash Fix**: Resolved a crash that occurred when looting dropped world items.

### **Enhancements**
- **World Item Replication**: Introduced a function to enforce replication of world item content from the server to relevant clients, ensuring consistency across the network.
- **Partial Looting**: Added a new function that enables partial looting of world items, providing greater control over item interactions.
- **Expanded Blueprint Access**: Exposed additional gameplay container functions to Blueprints for more control and flexibility.
- **Gameplay Tag Support for Fragments**: Implemented gameplay tags for fragments, allowing easier retrieval via the `IGameplayTagAssetInterface`.
- **Gameplay Tag Access in Item Definitions**: Added a function to retrieve gameplay tags from all fragments or specific fragments within an item definition.
- **Rarity Fragments**: Incorporated rarity fragments into gameplay items, with custom widgets for representing rarity in slot and tooltip displays.
- **Item Sorting Improvements**: Enhanced item sorting within gameplay containers, initially supporting sorting by item name, with plans to extend to other item properties.
- **Item Transfer Functions**: Introduced functions for transferring items between gameplay containers, including partial transfers.
- **Random Loot Generation**: Added a new random loot generation fragment, enabling loot generation based on probability percentages and specified item tables.
- **Loot Generation Settings**: Created a class for configuring random loot generation settings per container, with customizable loot selection options.
- **Ability Tasks for Containers**: Introduced new ability tasks to handle item transfer, sorting, and looting operations.
- **Ability Costs**: Added new ability costs for using gameplay container items and item stats across different containers.
- **Base Classes for Item Abilities**: Introduced new base classes for abilities originating from items and equipment.

---

## Version 1.0
- **Initial Release**: The first stable release of the *Gameplay Containers Plugin*.




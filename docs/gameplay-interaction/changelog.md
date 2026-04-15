---
sidebar_position: 3
---

# Change Logs

---

# Version 2.0

:::warning Breaking Changes
Version 2.0 contains significant API and architecture changes. You need to be on version 5.5 or higher to get this update.
:::

:::info
Unreal Engine 5.3 and 5.4 users will no longer receive plugin updates.
:::

### New Features

- **Error Mapping System** — `UGameplayInteractionErrorMapping` data asset resolves failure tags into prioritised, localised UI entries. Assign one to `UGameplayInteractionComponent::ErrorMapping` and bind to `OnInteractionErrorDelegate` / `OnInteractionErrorClearedDelegate` in your HUD widget.

- **Outline Component** — `UOutlineComponent` replaces manual `DrawOutline_Implementation` / `RemoveOutline_Implementation` calls. Attach it to your entity, configure `DefaultMeshes` and `StateToStencil`, and the player-side component drives it automatically based on interaction availability.

- **Outline States** — Four discrete states (`None`, `Available`, `Unavailable`, `Disabled`) with per-state toggles (`bAllowAvailableState`, etc.) and configurable stencil values per entity.

- **Dynamic Option Auto-Selection** — `AutoSelectBestInteractionOption` now distinguishes between explicit player selections (via `CycleInteractionOption` / `PlayerSelectInteractionOption`) and automatic selections, preventing the system from overriding a player's intent until they activate or the option leaves the list.

- **Cooldown Tag Support** — `UGameplayInteractionOption::CooldownTags` checked against entity dynamic tags; produces `Gameplay.Interaction.Cooldown` failure tag without requiring a full Gameplay Effect cooldown.

- **Interaction State Tracking** — `FGameplayInteractionState` (`ActiveInteractionState`) on the player component tracks the active entity and option for use in termination and UI logic.

- **ForceTerminateInteraction** — Authority-only function that kills the active interaction ability and calls `FinishInteraction` on the entity directly, bypassing the gameplay event path.

- **Radial Menu Widgets** — `UGameplayInteractionRadialMenuWidget` and `UGameplayInteractionRadialMenuSliceWidget` provide a complete radial option selector with hover detection, mouse input, and icon positioning.

- **Server Validation Flags** — Individual toggles on `UGameplayAbility_Interaction` for camera origin, look direction, distance, and aim validation allow per-ability tuning of anti-cheat strictness.

- **Interaction Grant Result** — `FGameplayInteractionGrantResult` tracks applied effects and loose tags per phase (activation / finish) so they can be cleanly revoked without manual handle management.

- **`bEndAbilityOnExecute` Option Flag** — Persist the ability after execution for interactions that require an explicit exit (e.g. dialogue).

- **Context-Sensitive Feedback** — `UGameplayInteractionOption::QueryFeedback` selects cues, sounds, particles, and montages at runtime from `FeedbackConfigs` using hierarchical tag matching.

### Improvements

- `UGameplayInteractionComponent` is now a `UControllerComponent` (was `UActorComponent`). Attach it to the player controller, not the pawn or player state.
- `RegisterAbilitySystemComponent` replaces the old `RegisterWithAbilitySystem` name.
- `IEntityOutlineInterface` replaces `IOutlineDrawingEntityInterface`. The new interface returns a `UOutlineComponent` instead of implementing draw/remove methods directly.
- `UGameplayInteractiveEntityInterface` now requires `StartInteraction` and `FinishInteraction` to be implemented, giving entities full lifecycle hooks.
- `RefreshInteractionOptions` is re-entrance-guarded via `bIsRefreshingInteractionOptions`.
- Outline is updated on every relevant state change (entity in view change, option change, tag change, error change) without requiring manual calls.
- `EvaluateAndBroadcastErrorState` deduplicates broadcasts — the delegate only fires when the resolved error actually changes.

### Migration Guide

| Old | New |
|---|---|
| `IOutlineDrawingEntityInterface` | `IEntityOutlineInterface` — return a `UOutlineComponent*` from `GetOutlineComponent()` |
| `DrawOutline_Implementation` / `RemoveOutline_Implementation` | Handled automatically by `UOutlineComponent::SetOutlineState` / `ClearOutline` |
| `SupportsDrawingOutline_Implementation` | `SupportsOutline_Implementation` |
| `RegisterWithAbilitySystem(ASC)` | `RegisterAbilitySystemComponent(ASC)` |
| `FGameplayInteractionOption` (struct) | `UGameplayInteractionOption` (UDataAsset class) |
| `GetInteractionComponent()` on entity | `GetEntityInteractionComponent()` |
| `UGameplayInteractionComponent` | Should be on `APlayerController` or `AIController` |

---

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

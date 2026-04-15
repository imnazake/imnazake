---
sidebar_position: 3
---

# Features

The **Gameplay Interaction** plugin provides a production-ready, network-replicated interaction framework built on top of the **Gameplay Ability System (GAS)**. It is designed for both single-player and multiplayer games and covers everything from detection to execution to UI feedback.

:::info
This plugin requires the **Gameplay Ability System** and **Enhanced Input** to be configured in your project. See the [Setup](setup) page for full integration instructions.
:::

---

## Core Interaction

### Instant & Timed Interactions
Every interaction option can be configured as either:
- **Instant** — executes immediately when the player presses the interact input.
- **Timed** — requires the player to hold the input for a configurable duration before executing.

For timed interactions, a movement-restriction effect (immobility) can be automatically applied during the hold and removed on completion or cancellation.

### Multiple Interaction Options Per Entity
Entities can expose multiple interaction options (e.g. *Open*, *Lock*, *Inspect*) simultaneously. Players can cycle between them using a dedicated Switch Option ability. The system auto-selects the best available option, but respects explicit player selections until the intent is consumed or the entity changes.

### Option Cycling & Selection
- **Auto-selection** picks the first activatable option and updates automatically when entity state or player tags change.
- **Explicit selection** via `CycleInteractionOption()` or `PlayerSelectInteractionOption()` locks the player's choice until the interaction executes or the option leaves the entity's list.
- A **radial menu** widget is included for presenting and selecting multiple options with mouse or gamepad.

### Interaction Termination
Active interactions can be terminated externally at any time by sending the `GameplayEvent.Interaction.Terminate` gameplay event, or by calling `TerminateInteraction()` / `ForceTerminateInteraction()` on the player interaction component.

---

## Multiplayer & Server Validation

The ability performs full server-side anti-cheat validation before accepting a client's interaction request. Each check is individually toggleable:

| Validation Flag | Description |
|---|---|
| `bValidateRemoteClientCameraOrigin` | Rejects spoofed camera positions far from the avatar |
| `bValidateRemoteClientDirection` | Ensures server camera direction matches client-reported direction |
| `bValidateRemoteClientDistance` | Confirms the target entity is within max interaction range |
| `bValidateRemoteClientAim` | Validates the client's aim direction matches the actual hit point |

Client target data (entity reference, interaction option, look direction) is sent to the server via a custom `TargetData` task and re-validated with a server-side line trace.

---

## Interaction Options

Each `UGameplayInteractionOption` data asset defines a complete interaction configuration:

- **Matching rules** — `RequiredComponentTag`, player tag query (`PlayerRequirements`), entity tag query (`TargetRequirements`)
- **Execution** — `InteractionType` (Instant/Timed), `InteractionDuration`, `ActionTag`, `bEndAbilityOnExecute`
- **Cooldowns** — `CooldownTags` checked against the entity's dynamic tags
- **Tag grants** — temporary tags/effects applied to the player and entity on start, revoked on finish; persistent tags/effects applied on finish
- **Feedback** — context-sensitive cues, sounds, particles, and montages selected via a tag query at runtime
- **UI data** — `ActionText`, `ProgressText`, `Description`, `InteractionIcon`

---

## Entity Interaction Component

`UGameplayEntityInteractionComponent` is the server-authoritative state component on each interactive entity:

- Tracks active interactors (`Interactors` array, replicated)
- Manages **dynamic gameplay tags** (`GrantDynamicTags` / `RevokeDynamicTags`) that gate or describe interaction state
- Runs **policy checks** before allowing any interaction
- Notifies the player-side component via Client RPCs on interaction state change
- Cleanly terminates all interactions in `EndPlay`

---

## Interaction Policies

Policies control *who* can interact and *how many* players simultaneously:

| Policy | Description |
|---|---|
| `Default` | Unlimited — any player can interact any time (blocks re-entry by the same player mid-interaction) |
| `SpecificNumberOfPlayers` | Caps simultaneous interactors at a configurable limit |
| `SpecificPlayers` | Restricts access to explicitly registered players via `RegisterPlayerForInteraction` / `UnregisterPlayerFromInteraction` |

Custom policies can be created by subclassing `UGameplayInteractionPolicy`.

---

## Player Interaction Component

`UGameplayInteractionComponent` (a `UControllerComponent`) handles the local player side:

- **Periodic line trace** at a configurable interval and range to detect `Interactive`-tagged entity components
- Builds and filters the available options list based on `RequiredComponentTag`
- Binds to entity state delegates (dynamic tags, interactors, player IDs) to keep UI and option selection in sync
- Caches entity/component/direction at activation time for consistent ability state
- Drives outline rendering automatically on the detected entity
- Evaluates and broadcasts error states via the **Error Mapping** system

---

## Error Mapping System

`UGameplayInteractionErrorMapping` maps failure tags to human-readable error entries:

- Each entry has a **priority** (higher wins when multiple tags are present), a localised **message**, a **color**, an optional **icon**, and a **silent** flag
- Default entries cover all built-in tags: Unauthorized (100), Disabled (80), Busy (60), Cooldown (50), Blocked (40), Ongoing (30), Unavailable (10)
- Override or extend via a child Blueprint data asset for project-specific errors
- Silent entries (e.g. Cooldown, Ongoing) participate in priority resolution but don't broadcast UI events — ideal when a dedicated progress bar handles that feedback

---

## Outline System

`UOutlineComponent` drives custom depth / stencil values on mesh components for post-process outline rendering:

- Four states: `None`, `Available`, `Unavailable`, `Disabled`
- Per-state toggles (`bAllowAvailableState`, etc.) let individual entities opt out of specific outline visuals
- Configurable stencil values per state to match your post-process material
- Supports a default mesh list and a specific mesh override (for multi-part entities)
- Automatically clears stale meshes when the observed component changes

---

## UI Widgets

A set of base UMG widget classes is provided:

| Widget | Purpose |
|---|---|
| `UGameplayInteractionWidget` | Base widget that binds to all interaction component delegates; override events in Blueprint |
| `UGameplayTimedInteractionWidget` | Extends the base with a tick-driven progress update for timed interaction progress bars |
| `UGameplayInteractionRadialMenuWidget (Not Implemented Yet)` | Renders a radial slice menu for selecting between multiple options |
| `UGameplayInteractionRadialMenuSliceWidget (Not Implemented Yet)` | Individual slice within the radial menu; handles hover, click, and selection states |

---

## Code Modules

| Module | Type | Purpose |
|---|---|---|
| `GameplayInteraction` | Runtime | Core interaction system, GAS integration, UI base classes |


---
sidebar_position: 3
---

# UI Widgets

The plugin provides a hierarchy of UMG widget base classes. All interaction UI should inherit from these to get automatic delegate binding and easy Blueprint override points.

---

## UGameplayInteractionWidget

The base class for all interaction widgets. It holds a reference to `UGameplayInteractionComponent` and binds / unbinds from all of its delegates automatically.

### Registering the Component

```cpp
// Call this after the HUD is created and the player controller is valid
Widget->RegisterInteractionComponent(PlayerController->GetInteractionComponent());
```

Or in Blueprint:
```text
Self → Register Interaction Component → PlayerController.GetInteractionComponent()
```

To detach (e.g. when the HUD is destroyed):
```text
Self → Unregister Interaction Component
```

### Blueprint Override Events

| Event | Parameters | Purpose |
|---|---|---|
| `OnEntityInViewChanged` | `Entity`, `LastObservedEntity` | Show / hide the widget when a new entity enters or leaves view |
| `OnSelectedInteractionOptionChanged` | `SelectedOption` | Update the displayed action name and icon |
| `OnInteractionStarted` | `Entity` | Player began interacting — e.g. lock input display |
| `OnInteractionFinished` | `Entity` | Interaction ended normally |
| `OnInteractionStateChanged` | `Entity` | Entity state changed mid-interaction (another player started/finished) |
| `OnTimedInteractionStarted` | `InteractionTime` | A timed hold began — start a progress bar |
| `OnTimedInteractionFinished` | `bWasCancelled` | Hold ended — reset the progress bar |
| `OnEntityDynamicTagsChanged` | — | Entity tags updated — refresh availability display |
| `OnInteractionError` | `ErrorEntry` | Show an error message (check `ErrorEntry.bIsSilent` first) |
| `OnInteractionErrorCleared` | — | Hide the error message |
| `OnInteractionTerminated` | `Entity` | An external system terminated the interaction |

### Useful Accessors

| Function | Returns |
|---|---|
| `GetPlayerInteractionComponent()` | The bound interaction component |
| `GetInteractiveEntityInView()` | Entity currently in the player's crosshair |
| `GetCachedInteractiveEntityFromInteraction()` | Entity snapshotted at the moment the interact input was pressed |
| `GetAbilitySystemComponent()` | The local player's ASC (via `IAbilitySystemInterface` on the owning controller) |

---

## UGameplayTimedInteractionWidget

Extends `UGameplayInteractionWidget` with a tick-driven progress update loop for timed hold interactions.

### How It Works

When `OnTimedInteractionStarted` fires, it starts an internal timer that ticks at `TimerTickRate` (default 0.25 s). Each tick it calculates the normalised progress and calls `BP_OnProgressUpdate(Percent)`. When `OnTimedInteractionFinished` fires it clears the timer and resets to 0.

### Configuration

| Property | Default | Description |
|---|---|---|
| `TimerTickRate` | `0.25` | How often the progress event fires (seconds). Lower = smoother bar, higher CPU tick cost. |

### Blueprint Override

| Event | Parameters | Purpose |
|---|---|---|
| `BP_OnProgressUpdate` | `Percent` (0.0–1.0) | Drive a progress bar, ring fill, or animation curve |

### Example Widget Setup

1. Create a Blueprint inheriting `GameplayTimedInteractionWidget`.
2. Add a `ProgressBar` widget to the hierarchy.
3. Override `BP_OnProgressUpdate` → set the progress bar's percent to the `Percent` parameter.
4. Override `OnTimedInteractionStarted` → make the widget visible.
5. Override `OnTimedInteractionFinished` → hide the widget.

---

## UGameplayInteractionRadialMenuWidget (NOT IMPLEMENTED YET)

A radial slice selector for displaying and picking between multiple interaction options. Hover detection runs in `NativeTick` using the mouse position relative to the widget's center.

### Configuration (Class Defaults)

| Property | Default | Description |
|---|---|---|
| `NumSlices` | 6 | Total number of slices rendered |
| `SpacingDegrees` | 6.0 | Angular gap between adjacent slices |
| `InnerRadiusRatio` | 0.3 | Inner dead zone as a fraction of the widget's radius |
| `ImageSize` | 512 | Reference size of the slice image canvas (assumes square) |
| `DeadZone` | 0.0 | Extra dead zone radius around center to prevent accidental selection |

### Blueprint Override Events

| Event | Parameters | Purpose |
|---|---|---|
| `GetSlicesWidgets` | — | **Must override.** Return the array of slice widget references from your Widget Hierarchy |
| `BP_OnUpdateInnerCircleInfo` | `OptionInfo` | Called when the hovered slice changes — update the inner circle label/icon |

### Setup Steps

1. Create a Blueprint inheriting `GameplayInteractionRadialMenuWidget`.
2. Build your widget hierarchy: a Canvas Panel at root, one `UGameplayInteractionRadialMenuSliceWidget` per slice.
3. Override `GetSlicesWidgets` to return the array of slice widget references.
4. In `NativeOnInitialized` (handled by the base class), `SliceAngle` and cached geometry are initialised automatically.
5. Populate each slice with `SetInteractionOptionInfo(Option)` when the radial menu opens, using the options from `PlayerInteractionComponent->AvailableOptions`.

---

## UGameplayInteractionRadialMenuSliceWidget (NOT IMPLEMENTED YET)

Represents a single slice in the radial menu. Handles hover, unhover, mouse down, mouse up, and selection states.

### Key Functions

| Function | Description |
|---|---|
| `InitializeSlice(Index, NumSlices, SpacingDegrees, InnerRatio, ImageSize, IconSize, LockIconSize)` | Sets geometry and computes the icon position on the canvas |
| `SetInteractionOptionInfo(Option)` | Stores the option reference and fires `BP_OnInteractionOptionInfoSet` |
| `SetHovered(bHovered)` | Called by the parent radial menu; fires hover/unhover events |

### Blueprint Override Events

| Event | Purpose |
|---|---|
| `GetIconImage` | **Must override.** Return the `UImage` widget to position as the action icon |
| `GetLockIconImage` | **Must override.** Return the `UImage` widget for the locked/unavailable icon |
| `BP_OnInteractionOptionInfoSet` | Update icon, label, and availability display from `InteractionOptionInfo` |
| `BP_OnSliceHovered` | Highlight the slice |
| `BP_OnSliceUnhovered` | Remove highlight |
| `BP_OnSliceMouseDown` | Button down visual |
| `BP_OnSliceMouseUp` | Button up visual |
| `BP_OnSliceSelected` | Confirmed selection — call `PlayerInteractionComponent->PlayerSelectInteractionOption(InteractionOptionInfo)` here |

### Icon Positioning

`InitializeSlice` automatically computes the icon's canvas position at the midpoint of the slice arc (between inner and outer radius). It uses the `IconSize` vector to centre the image. The lock icon is overlaid at `LockIconSize`. Call `InitializeSlice` from the parent radial menu after building the slice list.

---

## Wiring the Radial Menu

A typical radial menu flow in Blueprint:

```text
[Input: Show Options pressed]
  → Show RadialMenu widget
  → For each Option in InteractionComponent.AvailableOptions:
       SlicesWidgets[i].SetInteractionOptionInfo(Option)
       SlicesWidgets[i].InitializeSlice(i, NumOptions, ...)
  → Set mouse cursor visible

[Slice BP_OnSliceSelected]
  → InteractionComponent.PlayerSelectInteractionOption(InteractionOptionInfo)
  → Hide RadialMenu widget
  → Set mouse cursor hidden
```

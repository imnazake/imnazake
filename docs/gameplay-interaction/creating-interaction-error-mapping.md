---
sidebar_position: 3
---

# Error Mapping

The **Error Mapping** system resolves interaction failure tags into human-readable UI entries. When `CanActivateInteractionOption` returns `false`, one or more failure tags are produced. The error mapping picks the highest-priority entry and broadcasts it to the UI — so the player sees a single, clear message rather than a raw tag name.

---

## How It Works

1. `UGameplayInteractionComponent` holds a reference to a `UGameplayInteractionErrorMapping` asset (`ErrorMapping` property).
2. After every option re-evaluation (`EvaluateAndBroadcastErrorState`), if the selected option is blocked, the component calls `ErrorMapping->GetHighestPriorityError(FailureTags)`.
3. The resolved `FGameplayInteractionErrorEntry` is broadcast via `OnInteractionErrorDelegate`.
4. When the option becomes activatable again, `OnInteractionErrorClearedDelegate` fires.

---

## FGameplayInteractionErrorEntry

| Field | Type | Purpose |
|---|---|---|
| `Priority` | `int32` | Higher value wins when multiple tags are present simultaneously |
| `Message` | `FText` | Localised text shown in the UI |
| `Color` | `FLinearColor` | Tint applied to the error widget |
| `Icon` | `UTexture2D*` | Optional icon alongside the message |
| `bIsSilent` | `bool` | If `true`, the entry wins priority resolution but broadcasts nothing — use for tags where a dedicated widget already handles feedback (e.g. Cooldown → progress bar) |

---

## Built-in Default Entries

All built-in interaction failure tags are pre-mapped in the constructor with sensible defaults:

| Tag | Priority | Default Message | Silent? |
|---|---|---|---|
| `Gameplay.Interaction.Unauthorized` | 100 | *"You are not authorized to use this."* | No |
| `Gameplay.Interaction.Disabled` | 80 | *"This is currently disabled."* | No |
| `Gameplay.Interaction.Busy` | 60 | *"Someone is already using this."* | No |
| `Gameplay.Interaction.Cooldown` | 50 | *"Please wait before interacting again."* | **Yes** |
| `Gameplay.Interaction.Blocked` | 40 | *"Interaction is blocked."* | No |
| `Gameplay.Interaction.Ongoing` | 30 | *"Already interacting."* | **Yes** |
| `Gameplay.Interaction.Unavailable` | 10 | *"Cannot interact."* | No |

`Cooldown` and `Ongoing` are silent by default because they are better communicated through dedicated widgets (a progress bar and the already-visible interaction UI respectively).

---

## Creating a Custom Error Mapping

1. In the Content Browser, navigate to **Miscellaneous → Data Asset**.
2. Select `GameplayInteractionErrorMapping` as the class.
3. Name it (e.g. `DA_InteractionErrors`).
4. Open it and override individual entries in the **Errors** map, or add entries for your project-specific failure tags.
5. Assign it to `UGameplayInteractionComponent::ErrorMapping` in your controller Blueprint or C++ defaults.

You only need to set the entries you want to change — the parent CDO pre-populates all built-in tags.

---

## Binding to Error Events in UI

In your `UGameplayInteractionWidget` subclass (Blueprint or C++), override:

| Event | When it fires |
|---|---|
| `OnInteractionError(ErrorEntry)` | A new highest-priority error was resolved |
| `OnInteractionErrorCleared()` | The selected option is now activatable — hide the error UI |

Or bind directly in Blueprint to the component delegates:

```text
InteractionComponent.OnInteractionErrorDelegate     → Show / update error widget
InteractionComponent.OnInteractionErrorClearedDelegate → Hide error widget
```

:::tip
Check `ErrorEntry.bIsSilent` before showing UI. Silent entries are broadcast for completeness (so you can react in C++ if needed) but the UI should ignore them.
:::

---

## Avoiding Duplicate Broadcasts

`EvaluateAndBroadcastErrorState` only fires `OnInteractionErrorDelegate` when the resolved error **changes**. If the same error is already displayed, the delegate is not re-fired. This means you don't need to debounce on the UI side.

---

## Adding Project-Specific Failure Tags

If your game has custom gating logic (e.g. `State.Door.RequiresQuest`), add it to the Errors map in your data asset with a descriptive message and appropriate priority:

```text
State.Door.RequiresQuest → Priority: 70, Message: "Complete the quest first.", Color: Orange
```

The `CanActivateInteractionOption` function in `UGameplayInteractionComponent` will naturally produce this tag if your policy or `TargetRequirements` generates it, and the mapping will resolve it to the correct entry.

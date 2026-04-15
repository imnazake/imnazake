---
sidebar_position: 3
---

# Gameplay Tags Reference

All built-in gameplay tags used by the plugin. These are defined as native tags in `GameplayInteractionTags.h` / `.cpp` and are available in any project that includes the plugin.

---

## Input Tags

Used to bind interaction abilities to Enhanced Input actions via dynamic ability tags.

| Tag | Purpose |
|---|---|
| `Input.Interact` | Bind `GA_Interact` to this tag. Pressed → activate, Released → cancel timed hold. |
| `Input.Interact.ShowOptions` | Bind `GA_ShowInteractionOptions` to this tag (open radial menu). |
| `Input.Interact.SwitchOption` | Bind `GA_Interaction_SwitchOption` to this tag (cycle options). |

---

## Gameplay Event Tags

| Tag | Purpose |
|---|---|
| `GameplayEvent.Interaction.Terminate` | Send this event to the player's ASC to cleanly end any active interaction ability. |
| `GameplayEvent.Interaction.OptionSelected` | Reserved for option selection events (e.g. from the radial menu). |

---

## Interaction State Tags

These tags describe why an interaction is blocked or in what state an entity or player currently is. They appear in `FGameplayTagContainer OutFailureTags` returned by `CanActivateInteractionOption`.

| Tag | Priority | Produced by | Meaning |
|---|---|---|---|
| `Gameplay.Interaction.Unauthorized` | 100 | `SpecificPlayers` policy | Player is not registered / not allowed |
| `Gameplay.Interaction.Disabled` | 80 | Entity blocking tags | Entity is hard-locked, powered off, or destroyed |
| `Gameplay.Interaction.Busy` | 60 | `SpecificNumberOfPlayers` policy | Interactor cap reached |
| `Gameplay.Interaction.Cooldown` | 50 | `CooldownTags` on option | Option is on cooldown |
| `Gameplay.Interaction.Blocked` | 40 | Player or entity blocking tags | Generic block |
| `Gameplay.Interaction.Ongoing` | 30 | Player has this tag granted at activation | Player is already mid-interaction |
| `Gameplay.Interaction.Unavailable` | 10 | Various null / missing component checks | Catch-all fallback |

### How Tags Flow

1. `UGameplayAbility_Interaction` grants `Ongoing` to the **player** via `PlayerTemporaryGrantedTagsOnStart` (set as default on every `UGameplayInteractionOption`).
2. `UGameplayAbility_Interaction` has `ActivationBlockedTags` containing `Ongoing`, `Blocked`, `Unauthorized`, and `Busy` — preventing the ability from being activated while any of these are present.
3. `UGameplayEntityInteractionComponent` has `BlockingTags` containing the full set above plus `Cooldown` and `Disabled` — these are checked against the entity's **dynamic tags** in `CanInteract`.

---

## Ability Tags

| Tag | Purpose |
|---|---|
| `Ability.Interaction` | Tag the interaction ability spec with this so `GetActiveInteractionAbilityInstance` and `ForceTerminateInteraction` can find it. |
| `Ability.Interaction.Active` | Reserved for marking the ability as actively executing. |

---

## State / Event Tags (Informational)

These are defined but not automatically applied — use them in your own abilities, cues, or Blueprint logic as descriptive state markers.

| Tag | Purpose |
|---|---|
| `Gameplay.Interaction.Started` | Mark that an interaction started |
| `Gameplay.Interaction.Finished` | Mark that an interaction finished |
| `Gameplay.Interaction.Timed.Started` | Mark that a timed hold started |
| `Gameplay.Interaction.Timed.Finished` | Mark that a timed hold finished |

---

## Adding Your Own Tags

Register project-specific tags in your project's `GameplayTags.ini` or as native tags in your own module:

```cpp
// YourGameplayTags.h
namespace YourTags
{
    UE_DECLARE_GAMEPLAY_TAG_EXTERN(TAG_State_Door_Locked);
}

// YourGameplayTags.cpp
namespace YourTags
{
    UE_DEFINE_GAMEPLAY_TAG(TAG_State_Door_Locked, "State.Door.Locked");
}
```

Use them in `TargetRequirements` on your options, in `GrantDynamicTags` / `RevokeDynamicTags` calls, and in your `UGameplayInteractionErrorMapping` asset.

---
sidebar_position: 3
---

# Creating Interaction Abilities

The plugin ships `UGameplayAbility_Interaction` as a fully functional reference ability. For most projects you will subclass it in Blueprint or C++ to add your own logic at specific points in the interaction lifecycle.

---

## How the Ability Works

```
ActivateAbility
  ├─ Snapshot: entity, component, option, look direction
  ├─ Spawn WaitInteraction task (sends target data client → server)
  ├─ Spawn WaitGameplayEvent task (listens for Terminate event)
  └─ Instant interaction:
       └─ StartInteraction → EntityInterface::StartInteraction
                           → grant temp tags/effects
                           → OnExecuteInteraction
                           → FinishInteraction (if bEndAbilityOnExecute)
     Timed interaction:
       └─ StartInteraction → apply ImmobilityEffect
                           → start hold timer
                           → HandleTimedInteractionExecution (on expiry)
                                → re-validate
                                → EntityInterface::StartInteraction
                                → grant temp tags/effects
                                → OnExecuteInteraction
                                → FinishInteraction (if bEndAbilityOnExecute)

EndAbility
  ├─ Remove ImmobilityEffect
  ├─ Revoke temp tags/effects (ActivationGrantResult)
  ├─ If completed: apply persistent finish tags/effects (FinishGrantResult)
  └─ EntityInterface::FinishInteraction
```

---

## Blueprint Subclassing

### Create the Blueprint

1. In the Content Browser, right-click → **Blueprint Class**.
2. Choose `GameplayAbility_Interaction` as the parent class (or a project-local copy of it if you've moved it — see note below).
3. Name it to describe the action (e.g. `GA_Door_Open`).

### Override the Extension Events

| Event | When it fires | Typical use |
|---|---|---|
| `BP_OnStartInteraction` | Interaction begins (before hold for Timed, at press for Instant) | Play start sound or animation |
| `BP_OnExecuteInteraction` | Action executes (immediately for Instant, after hold for Timed) | Apply damage, open door, etc. |
| `BP_OnFinishInteraction` | Ability ends normally | Play finish sound or VFX |
| `BP_OnCancelInteraction` | Ability ends cancelled (input released early, validation failed) | Play cancel sound, revert state |

### Useful Accessors in Blueprint

| Function | Returns |
|---|---|
| `GetCurrentEntity()` | The entity being interacted with |
| `GetCurrentOption()` | The `UGameplayInteractionOption` driving this execution |
| `GetCurrentComponent()` | The specific mesh component that was hit |
| `GetPlayerInteractionComponent()` | The player's `UGameplayInteractionComponent` |
| `CanExecuteInteraction()` | Whether the cached data still passes validation |

### Example — Play a Gameplay Cue on Execute

```text
Event BP_OnExecuteInteraction
  → GetCurrentOption → QueryFeedback (ContextTag) → OutFeedback
  → ExecuteGameplayCueWithParams (OutFeedback.GameplayCueTag, ...)
  → EndAbility (bWasCancelled = false)   ← only if bEndAbilityOnExecute is false
```

---

## C++ Subclassing

Override the native extension points instead of (or in addition to) the Blueprint events:

```cpp
// YourInteractionAbility.h
#pragma once

#include "Core/Abilities/GameplayAbility_Interaction.h"
#include "YourInteractionAbility.generated.h"

UCLASS()
class YOURPROJECT_API UYourInteractionAbility : public UGameplayAbility_Interaction
{
    GENERATED_BODY()

protected:

    virtual void OnStartInteraction()   override;
    virtual void OnExecuteInteraction() override;
    virtual void OnFinishInteraction()  override;
    virtual void OnCancelInteraction()  override;
};
```

```cpp
// YourInteractionAbility.cpp
void UYourInteractionAbility::OnStartInteraction()
{
    // Play a server-side start sound via a Gameplay Cue
}

void UYourInteractionAbility::OnExecuteInteraction()
{
    // The action itself — open the door, grant a reward, etc.
    // CurrentEntity and CurrentOption are available here.
}

void UYourInteractionAbility::OnFinishInteraction()
{
    // Cleanup or completion effects
}

void UYourInteractionAbility::OnCancelInteraction()
{
    // Revert any local prediction, play cancel feedback
}
```

---

## Configuring the Ability Defaults

Open the ability's Class Defaults (Blueprint) or set in the constructor (C++):

### Immobility Effect (Timed interactions only)

```cpp
// In your ability constructor or CDO
ImmobilityEffect      = UYourImmobilityEffect::StaticClass();
ImmobilityEffectLevel = FScalableFloat(1.f);
```

Or set `ImmobilityEffect` in the Blueprint Class Defaults under the **Effects** category. This effect is applied at hold start and removed automatically in `EndAbility`.

### Server-Side Validation Flags

| Property | Default | Description |
|---|---|---|
| `bValidateRemoteClientCameraOrigin` | `true` | Rejects spoofed remote camera positions |
| `bValidateRemoteClientDirection` | `false` | Validates client-reported look direction matches server |
| `bValidateRemoteClientDistance` | `true` | Rejects out-of-range targets |
| `bValidateRemoteClientAim` | `true` | Rejects mismatched aim direction vs. actual hit point |

:::tip
Disable `bValidateRemoteClientDirection` for **Timed** interactions where the player may look away during the hold but you still want the interaction to complete.
:::

### Activation Blocked / Owned Tags

The ability automatically blocks when the player has `Gameplay.Interaction.Ongoing`, `Busy`, `Blocked`, or `Unauthorized`. It grants `Gameplay.Interaction.Ongoing` while active. You can extend these in the Class Defaults under **Tags**.

---

## The Switch Option Ability

`UGameplayAbility_Interaction_SwitchOption` handles cycling between available options. The base C++ class performs the `CanActivateAbility` check (requires ≥ 2 options). The actual cycling is intentionally left to Blueprint:

```text
Event ActivateAbility
  → GetPlayerInteractionComponent
  → CycleInteractionOption (bForward = true/false)
  → EndAbility
```

Create a Blueprint subclass (`GA_SwitchOption`), override `ActivateAbility`, and implement the above pattern. Bind it to your cycle/scroll input action.

---

## Terminating an Active Interaction

From anywhere (e.g. the entity being destroyed), send the Terminate event:

```cpp
// From the player's ASC — fires the WaitGameplayEvent task in the ability
UGameplayInteractionLibrary::TerminateInteraction(PlayerASC);

// Or from the player's interaction component
InteractionComponent->TerminateInteraction();

// [Authority only] Force-cancel with no event (e.g. server-side cleanup)
InteractionComponent->ForceTerminateInteraction(/*bCancel=*/ true);
```

---

## Linking Abilities to Options

Interaction abilities are not assigned on the option asset. Instead:

1. Grant the ability once to the player (tied to the `Input.Interact` tag).
2. The ability reads `GetSelectedInteractionOption()` from the player's interaction component at activation time.
3. All option-specific logic (tags, effects, feedback) is driven by the `CurrentOption` data asset inside the single running ability.

This means **one granted ability handles all options** on all entities. You only need multiple ability classes if you need fundamentally different activation flows (e.g. a special ability that requires an animation before the interaction executes).

---

:::warning Circular Dependency
If your project has its own `UGameplayAbility` base class, do not reparent `UGameplayAbility_Interaction` directly inside the plugin — this creates circular module dependencies. Instead, copy the ability source files into your project module and reparent them to your base class there.
:::
---
sidebar_position: 3
---

# Creating Interactive Entities

An **interactive entity** is any world actor that players can detect, inspect, and interact with. This page covers both approaches: inheriting from the built-in base class or rolling your own actor with the required interfaces.

---

## Approach 1 — Inherit from `AInteractiveEntity` (Recommended)

The fastest path. `AInteractiveEntity` already implements both required interfaces and wires up `UGameplayEntityInteractionComponent` and `UOutlineComponent` for you.

1. Create a new Blueprint (or C++ class) using `AInteractiveEntity` as the parent.
2. Add your mesh(es) and set their collision preset to `Interaction` (see [Setup](setup#step-6-collision-setup)).
3. Tag the mesh component(s) with `Interactive` so the trace system and outline system can identify them.
4. Select the **Interaction Component** in the Details panel and configure it (see [Configuring the Interaction Component](#configuring-the-interaction-component) below).
5. In **Outline Component → Default Meshes**, add your visual mesh(es) so the outline system knows which meshes to highlight.

Blueprint extension points on `AInteractiveEntity`:

| Event | Called On | Purpose |
|---|---|---|
| `BP_OnPostInitializeComponents` | Server & Client | Run post-init setup |
| `BP_OnStartInteraction` | Server | Player began interacting |
| `BP_OnFinishInteraction` | Server | Player finished or cancelled |

---

## Approach 2 — Custom Actor with Interfaces (C++)

If you already have an actor hierarchy you don't want to change, implement the two interfaces directly.

### Required Interfaces

```cpp
#include "Core/IGameplayInteractiveEntityInterface.h"
#include "Entities/IEntityOutlineInterface.h"
```

| Interface | Responsibility |
|---|---|
| `IGameplayInteractiveEntityInterface` | Exposes options, interaction state, CanInteract / Start / Finish hooks |
| `IEntityOutlineInterface` | Exposes the `UOutlineComponent` for automatic outline management |

### Minimal C++ Example

```cpp
// YourInteractableActor.h
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Core/IGameplayInteractiveEntityInterface.h"
#include "Entities/IEntityOutlineInterface.h"
#include "YourInteractableActor.generated.h"

class UGameplayEntityInteractionComponent;
class UGameplayInteractionOptions;
class UOutlineComponent;
class UAbilitySystemComponent;

UCLASS(Blueprintable, BlueprintType)
class YOURPROJECT_API AYourInteractableActor : public AActor,
                                               public IEntityOutlineInterface,
                                               public IGameplayInteractiveEntityInterface
{
    GENERATED_BODY()

public:

    AYourInteractableActor(const FObjectInitializer& ObjectInitializer);

    // IEntityOutlineInterface
    virtual bool SupportsOutline_Implementation() const override;
    virtual UOutlineComponent* GetOutlineComponent() override;

    // IGameplayInteractiveEntityInterface
    virtual UGameplayInteractionOptions*        GetInteractionOptions() override;
    virtual UGameplayEntityInteractionComponent* GetEntityInteractionComponent() override;
    virtual bool CanInteract(UAbilitySystemComponent* Player, FGameplayTagContainer& FailureTags) override;
    virtual void StartInteraction(UAbilitySystemComponent* Player, UGameplayInteractionOption* Option) override;
    virtual void FinishInteraction(UAbilitySystemComponent* Player, UGameplayInteractionOption* Option, bool bWasCancelled) override;

protected:

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Interaction")
    TObjectPtr<UGameplayEntityInteractionComponent> InteractionComponent;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Outline")
    TObjectPtr<UOutlineComponent> OutlineComponent;
};
```

```cpp
// YourInteractableActor.cpp
#include "YourInteractableActor.h"
#include "Core/GameplayEntityInteractionComponent.h"
#include "Core/GameplayInteractionOptions.h"
#include "Entities/OutlineComponent.h"

AYourInteractableActor::AYourInteractableActor(const FObjectInitializer& ObjectInitializer)
    : Super(ObjectInitializer)
{
    bReplicates = true;
    SetReplicatingMovement(true);
    bReplicateUsingRegisteredSubObjectList = true;

    InteractionComponent = CreateDefaultSubobject<UGameplayEntityInteractionComponent>(TEXT("InteractionComponent"));
    InteractionComponent->SetIsReplicated(true);

    // OutlineComponent is cosmetic — no need to replicate
    OutlineComponent = CreateDefaultSubobject<UOutlineComponent>(TEXT("OutlineComponent"));
    OutlineComponent->SetIsReplicated(false);
}

bool AYourInteractableActor::SupportsOutline_Implementation() const
{
    return true;
}

UOutlineComponent* AYourInteractableActor::GetOutlineComponent()
{
    return OutlineComponent;
}

UGameplayInteractionOptions* AYourInteractableActor::GetInteractionOptions()
{
    return InteractionComponent ? InteractionComponent->GetInteractionOptions() : nullptr;
}

UGameplayEntityInteractionComponent* AYourInteractableActor::GetEntityInteractionComponent()
{
    return InteractionComponent;
}

bool AYourInteractableActor::CanInteract(UAbilitySystemComponent* Player, FGameplayTagContainer& FailureTags)
{
    return InteractionComponent && InteractionComponent->CanInteract(Player, FailureTags);
}

void AYourInteractableActor::StartInteraction(UAbilitySystemComponent* Player, UGameplayInteractionOption* Option)
{
    if (InteractionComponent)
    {
        InteractionComponent->StartInteraction(Player, Option);
    }
}

void AYourInteractableActor::FinishInteraction(UAbilitySystemComponent* Player, UGameplayInteractionOption* Option, bool bWasCancelled)
{
    if (InteractionComponent)
    {
        InteractionComponent->FinishInteraction(Player, Option, bWasCancelled);
    }
}
```

---

## Configuring the Interaction Component

Select the **Interaction Component** in the entity's Details panel. The key properties are:

### Interaction Policy

Controls *who* can interact and *how many* players simultaneously.

| Policy | Behaviour |
|---|---|
| **Default** | Any player can interact. Blocks re-entry while the same player is already interacting. |
| **SpecificNumberOfPlayers** | At most N players can interact simultaneously. Set `MaxNumberOfPlayers`. Additional players receive a `Gameplay.Interaction.Busy` failure tag. |
| **SpecificPlayers** | Only players explicitly registered via `RegisterPlayerForInteraction` can interact (or the inverse with `DenySpecifiedPlayersOnly`). |

To create a custom policy, subclass `UGameplayInteractionPolicy` and override `CanInteract`.

#### Registering players at runtime (SpecificPlayers policy)

```cpp
// Call on server only
InteractionComponent->RegisterPlayerForInteraction(PlayerASC);

// If unregistering while the player is actively interacting, also call:
InteractionComponent->FinishInteraction(PlayerASC, Option, /*bWasCancelled=*/ true);
InteractionComponent->UnregisterPlayerFromInteraction(PlayerASC);
```

### Interaction Options

Assign a `UGameplayInteractionOptions` data asset. This asset lists every `UGameplayInteractionOption` available on this entity. See [Creating Interaction Options](creating-new-interaction-options) for how to build them.

### Blocking Tags

The component ships with a default set of blocking tags (`Unauthorized`, `Blocked`, `Ongoing`, `Busy`, `Cooldown`, `Disabled`). Any tag from this set found on the entity's dynamic tag container will deny all interactions. You can extend this set in the Details panel.

### Dynamic Tags

You can set initial dynamic tags on the entity from the Details panel (`DynamicTags`). These are replicated and are checked against the blocking tag set in `CanInteract`. Modify them at runtime:

```cpp
// Grant a tag (e.g. mark the entity as disabled after use)
InteractionComponent->GrantDynamicTags(FGameplayTagContainer(TAG_Gameplay_Interaction_Disabled));

// Revoke a tag (e.g. re-enable the entity)
InteractionComponent->RevokeDynamicTags(FGameplayTagContainer(TAG_Gameplay_Interaction_Disabled));
```

Both functions replicate to clients automatically and fire `OnDynamicTagsChangedDelegate`.

---

## Configuring the Outline Component

Select the **Outline Component** in the Details panel.

### Default Meshes

Add all mesh components you want to receive outline stencil updates. When the player looks at the entity, the outline system will call `SetOutlineState` on these meshes.

:::tip
If your entity has multiple interactable sub-components (e.g. individual buttons), you can leave `DefaultMeshes` empty and pass the specific hit mesh to `SetOutlineState` from the interaction component directly.
:::

### Stencil Values

Map each `EOutlineState` to the stencil value your post-process material reads. Defaults are:

| State | Stencil | Meaning |
|---|---|---|
| `None` | 0 | No outline |
| `Available` | 1 | Player can interact |
| `Unavailable` | 2 | Entity in view but blocked/requirements not met |
| `Disabled` | 3 | Entity is hard-locked |

### Per-State Toggles

Disable `bAllowUnavailableState` if you don't want a "can't interact" outline on this entity. Disable `bAllowDisabledState` to hide the entity's disabled state from the player.

### Require Interactive Tag

When `bRequireInteractiveTag` is `true` (default), only mesh components tagged `Interactive` are eligible for outline rendering. This prevents accidentally highlighting non-interactable parts of a complex mesh hierarchy.

---

## Responding to Interaction Events

### From Blueprint (`AInteractiveEntity` subclass)

Override `BP_OnStartInteraction` and `BP_OnFinishInteraction`. These fire on the **server** when a player starts or finishes an interaction.

```text
BP_OnStartInteraction(PlayerASC, Option) → open the door
BP_OnFinishInteraction(PlayerASC, Option, bWasCancelled) → play finish sound
```

### From C++ (Custom Actor)

Override `StartInteraction` and `FinishInteraction` and add your logic before or after calling the base `InteractionComponent` functions.

### Binding to Component Delegates

```cpp
// Called whenever the interactor list changes (replicated)
InteractionComponent->OnInteractorsUpdatedDelegate.AddDynamic(this, &ThisClass::HandleInteractorsChanged);

// Called when dynamic tags change (replicated)
InteractionComponent->OnDynamicTagsChangedDelegate.AddDynamic(this, &ThisClass::HandleTagsChanged);
```

---

## Multi-Component Entities

Entities with multiple distinct interactable parts (e.g. a control panel with several buttons) use `RequiredComponentTag` on each `UGameplayInteractionOption` to route options to the correct mesh:

1. Tag each sub-mesh differently (e.g. `ButtonA`, `ButtonB`).
2. On each `UGameplayInteractionOption`, set `RequiredComponentTag` to the matching mesh tag.
3. The player-side component automatically filters options based on which tagged mesh the trace hit.

```cpp
// Utility to retrieve options for a specific component tag
TArray<UGameplayInteractionOption*> ButtonAOptions = GetInteractionOptionsForComponentTag(TEXT("ButtonA"));
```
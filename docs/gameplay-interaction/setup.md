---
sidebar_position: 3
---


# Setup

This guide walks through installing the plugin, integrating it with your project's GAS setup, and getting a first interactive entity working in a level.

---

## Step 1: Download & Install the Plugin

Download **Gameplay Interaction** from the Epic Games Launcher for your target engine version.

After downloading, copy the `GameplayInteraction` folder from:
```
{EngineDirectory}/Plugins/Marketplace/GameplayInteraction
```
into your project's `Plugins/` folder (create it if it doesn't exist). Then right-click your `.uproject` and select **Generate Visual Studio project files**.

---

## Step 2: Enable Dependencies

Open your project in the Unreal Editor and navigate to **Edit → Plugins**. Ensure the following are all enabled:

- **Gameplay Abilities**
- **Enhanced Input**
- **Gameplay Interaction** *(under the Gameplay category)*

:::note
If you're on a Blueprint-only project you must create at least one empty C++ class first to convert it to a C++ project before proceeding.
:::

---

## Step 3: Add Module Dependencies

Open `Source/YourProject/YourProject.Build.cs` and add the required modules:

```csharp
PublicDependencyModuleNames.AddRange(new string[]
{
    "Core",
    "CoreUObject",
    "Engine",
    "InputCore",
    "GameplayAbilities",
    "GameplayTags",
    "EnhancedInput",
    "GameplayInteraction",
});

PrivateDependencyModuleNames.AddRange(new string[]
{
    "UMG",
    "Slate",
    "SlateCore",
});
```

Regenerate project files and recompile.

---

## Step 4: Player Controller Setup

`UGameplayInteractionComponent` is a **Controller Component** and should be added to your `APlayerController` subclass. Your controller must also implement `IGameplayInteractionInterface` so the interaction ability can locate the component.

```cpp
// YourPlayerController.h
#include "Core/IGameplayInteractionInterface.h"
#include "Core/GameplayInteractionComponent.h"

UCLASS()
class YOURPROJECT_API AYourPlayerController : public APlayerController,
                                              public IAbilitySystemInterface,
                                              public IGameplayInteractionInterface
{
    GENERATED_BODY()

public:

    AYourPlayerController(const FObjectInitializer& ObjectInitializer);

    // IAbilitySystemInterface
    virtual UAbilitySystemComponent* GetAbilitySystemComponent() const override;

    // IGameplayInteractionInterface
    virtual UGameplayInteractionComponent* GetInteractionComponent() override;

    virtual void OnPossess(APawn* InPawn) override;
    virtual void OnRep_PlayerState() override;

protected:

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Interaction")
    TObjectPtr<UGameplayInteractionComponent> InteractionComponent;
};
```

```cpp
// YourPlayerController.cpp
AYourPlayerController::AYourPlayerController(const FObjectInitializer& ObjectInitializer)
    : Super(ObjectInitializer)
{
    InteractionComponent = CreateDefaultSubobject<UGameplayInteractionComponent>(TEXT("InteractionComponent"));
    InteractionComponent->SetIsReplicated(true);
}

UAbilitySystemComponent* AYourPlayerController::GetAbilitySystemComponent() const
{
    if (const AYourPlayerState* PS = GetPlayerState<AYourPlayerState>())
    {
        return PS->GetAbilitySystemComponent();
    }
    return nullptr;
}

UGameplayInteractionComponent* AYourPlayerController::GetInteractionComponent()
{
    return InteractionComponent;
}

void AYourPlayerController::OnPossess(APawn* InPawn)
{
    Super::OnPossess(InPawn);

    // Register the ASC so the trace timer and tag bindings activate
    if (AYourPlayerState* PS = GetPlayerState<AYourPlayerState>())
    {
        InteractionComponent->RegisterAbilitySystemComponent(PS->GetAbilitySystemComponent());
    }
}

void AYourPlayerController::OnRep_PlayerState()
{
    Super::OnRep_PlayerState();

    // Also called on the owning client — needed so the local trace starts
    if (AYourPlayerState* PS = GetPlayerState<AYourPlayerState>())
    {
        InteractionComponent->RegisterAbilitySystemComponent(PS->GetAbilitySystemComponent());
    }
}
```

:::info
Call `RegisterAbilitySystemComponent` in **both** `OnPossess` (server) and `OnRep_PlayerState` (owning client). The component guards against double-registration internally.
:::

When the player unpossesses or the ASC is torn down, call:

```cpp
InteractionComponent->UnregisterAbilitySystemComponent();
```

---

## Step 5: Grant the Interaction Abilities

The plugin ships two abilities that must be granted to the player:

| Ability | Tag | How to activate |
|---|---|---|
| `GA_Interact` | `Input.Interact` | Grant and bind to your interact input action |
| `GA_Interaction_SwitchOption` | `Input.Interact.SwitchOption` | Grant and bind to your cycle input action |

These abilities are located in the plugin content folder under `Core/Abilities/Templates`.

Grant them using your ability set system or directly via `GiveAbility`:

```cpp
// Grant GA_Interact and bind it to the Input.Interact tag
FGameplayAbilitySpec Spec(GA_Interact_Class, 1);
Spec.DynamicAbilityTags.AddTag(GameplayInteractionTags::TAG_Input_Interact);
AbilitySystemComponent->GiveAbility(Spec);

// Grant GA_Interaction_SwitchOption and bind to Input.Interact.SwitchOption
FGameplayAbilitySpec SwitchSpec(GA_SwitchOption_Class, 1);
SwitchSpec.DynamicAbilityTags.AddTag(GameplayInteractionTags::TAG_Input_Interact_SwitchOption);
AbilitySystemComponent->GiveAbility(SwitchSpec);
```

Then in your input processing, call `AbilityInputTagPressed` / `AbilityInputTagReleased` with the appropriate tags when the player triggers those input actions.

:::warning Circular Dependency
If you have your own `UGameplayAbility` subclass, copy the ability classes out of the plugin into your own project module and reparent them. This avoids circular module dependencies and lets you use your project-specific base class.
:::

---

## Step 6: Collision Setup

The interaction trace uses a dedicated collision channel. In **Project Settings → Collision**:

- Add a new **Trace Channel** named `Interaction` — set Default Response to **Block**.

The plugin maps `ECC_Interaction` to `ECC_GameTraceChannel1`. Adjust the channel number in `GameplayInteraction.h` if your project already uses that slot:

```cpp
#define ECC_Interaction ECC_GameTraceChannel1
```

On each mesh you want to be detectable, set the collision preset to `Interaction` and add the `Interactive` component tag.

---

## Step 7: Outline Post-Process Setup

For the outline visual to appear:

1. Add a **Post Process Volume** to your level and enable **Infinite Extent (Unbound)**.
2. In its **Post Process Materials** array, add `MI_Outline_White` from the plugin content folder.

:::note
If you can't see plugin content in the Content Browser, open the **Settings** dropdown (top-right of the browser) and enable **Show Plugin Content**.
:::

---

## Step 8: Interaction Camera (Optional)

By default the trace originates from the avatar actor's location. For a first-person or over-the-shoulder camera setup, tag a `UCameraComponent` on the avatar with the `Interaction` component tag. The component will automatically use it as the trace origin:

```cpp
// In your character constructor
CameraComponent->ComponentTags.Add(TEXT("Interaction"));
```

---

## Step 9: Add the HUD Widget

Add `W_Interaction_Indicator` (found in the plugin content `UI/` folder) to your main HUD. Position it at the screen center.

Set it to **Hidden/Collapsed** initially. Show it when `OnEntityInViewChanged` fires with a valid entity, and hide it when the entity is null.

In your widget or HUD Blueprint, call:

```cpp
Widget->RegisterInteractionComponent(PlayerController->GetInteractionComponent());
```

This binds the widget to all interaction delegates automatically.

---

## Step 10: Error Mapping (Optional)

To show contextual error messages (e.g. "Someone is already using this"), create a `UGameplayInteractionErrorMapping` child Blueprint data asset and assign it to `UGameplayInteractionComponent::ErrorMapping`.

Default entries for all built-in tags are pre-populated. Override the `Message`, `Color`, `Icon`, and `bIsSilent` fields per tag as needed. See the [Error Mapping](error-mapping) page for details.

---

## Step 11: Testing

Place an `AInteractiveEntity` Blueprint (or one of the presets from `Content/Entities/`) in your level. Press **Play**, walk up to it, and look at it — you should see:

- The outline appears on the entity mesh.
- The interaction indicator widget becomes visible.
- Pressing the interact input triggers the interaction.

If nothing happens, check:
- The mesh has the `Interactive` component tag.
- The mesh collision preset is set to `Interaction`.
- `RegisterAbilitySystemComponent` is being called on the controller.
- The interaction ability is granted and bound to the correct input tag.

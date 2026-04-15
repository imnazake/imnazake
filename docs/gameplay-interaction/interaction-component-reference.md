---
sidebar_position: 3
---

# Player Interaction Component Reference

`UGameplayInteractionComponent` is the player-side controller component that drives detection, option management, caching, outline updates, and UI notifications. This page is a full reference for its configuration properties, functions, and delegates.

---

## Configuration Properties

### Trace

| Property | Default | Description |
|---|---|---|
| `ScanRange` | `200.0` | Maximum detection distance (cm) |
| `ScanIntervalSeconds` | `0.0333` | How often the trace fires (~30 Hz). Reduce for performance. |
| `MinAimDot` | `0.8` | Minimum dot product between aim direction and entity direction. `-1` = anywhere, `1` = dead centre. |
| `MaxDistanceTolerance` | `100.0` | Added to `ScanRange` for server-side distance validation. Accommodates network jitter. |
| `TraceOffset` | `(0,0,0)` | Offset added to the trace start position (e.g. shift up to eye level). |
| `bTraceAffectsAimPitch` | `false` | When false, the controller view pitch is preserved even if the trace hits a surface at a different pitch. |
| `bDrawDebugTrace` | `false` | Draws debug lines and spheres for the trace. Only active in `ENABLE_DRAW_DEBUG` builds. |

### Tags

| Property | Description |
|---|---|
| `BlockingTags` | Tags that, when present on the **player's** ASC, block option activation. |
| `ObservedTags` | Tags that trigger option re-evaluation when they change on the player's ASC. Add any tag that affects which options are available (e.g. inventory, progression, items, or keys tags). |

### Visuals

| Property | Default | Description |
|---|---|---|
| `bAutoUpdateOutline` | `true` | When true, the component drives outline state on the entity in view automatically. Disable to take manual control. |

### Errors

| Property | Description |
|---|---|
| `ErrorMapping` | `UGameplayInteractionErrorMapping` asset used to resolve failure tags into UI entries. |

---

## Key Functions

### Ability System Registration

```cpp
void RegisterAbilitySystemComponent(UAbilitySystemComponent* NewAbilitySystem);
void UnregisterAbilitySystemComponent();
```

Call `RegisterAbilitySystemComponent` in `OnPossess` (server) **and** `OnRep_PlayerState` (owning client). Call `UnregisterAbilitySystemComponent` in `UnPossessed` or before the ASC is torn down.

### Entity in View

```cpp
AActor*          GetEntityInView();           // Live — updated every trace
UActorComponent* GetEntityComponentInView();  // Specific mesh component that was hit
AActor*          GetLastObservedEntity();      // Entity from the previous trace
bool             HasInteractiveEntityInView(); // True if entity + "Interactive" tagged component are both valid
```

### Option Management

```cpp
void                    RefreshInteractionOptions();                          // Rebuild from entity in view
bool                    CanActivateInteractionOption(Option, OutFailureTags); // Full validation check
int32                   GetNumberOfAvailableOptions();                        // Count of currently activatable options
UGameplayInteractionOption* GetFirstAvailableInteractionOption();             // First activatable option
UGameplayInteractionOption* GetSelectedInteractionOption();                   // Currently selected option
```

### Option Selection

```cpp
void SelectInteractionOption(Option);           // Select programmatically (no explicit-selection flag)
void PlayerSelectInteractionOption(Option);     // Select on player behalf (sets explicit-selection flag)
void CycleInteractionOption(bool bForward);     // Advance or reverse through available options
void AutoSelectBestInteractionOption();         // Auto-pick; respects explicit selection if still valid
void ClearSelectedInteractionOption();
```

### Activation Cache

Called by the interaction ability at activation time:

```cpp
void CacheEntityInViewForInteraction();              // Snapshot current entity, component, and look direction
AActor*          GetCachedEntityFromInteraction();
UActorComponent* GetCachedEntityComponentFromInteraction();
FVector          GetCachedInteractionDirection();
void ClearCachedEntityFromInteraction();
```

### Interaction Control

```cpp
void TerminateInteraction();                         // Send Terminate gameplay event to the running ability
void ForceTerminateInteraction(bool bCancel = false); // [Authority] Kill ability + call FinishInteraction directly
UGameplayAbility* GetActiveInteractionAbilityInstance();
```

### Utility

```cpp
bool GetCurrentFailureTags(FGameplayTagContainer& OutFailureTags); // Failure tags for the selected option
const FGameplayInteractionErrorEntry& GetLastBroadcastedError();
bool HasLineOfSight(TraceStart, TraceDirection, TargetActor);
EOutlineState GetOutlineStateForEntityInView();
```

---

## Delegates

Bind to these in UI widgets, HUD, or game logic. All are `BlueprintAssignable`.

| Delegate | Signature | Fires when |
|---|---|---|
| `OnEntityInViewChangedDelegate` | `(AActor* Entity, AActor* LastObserved)` | Trace hits a different entity (or none) |
| `OnInteractionOptionChangedDelegate` | `(UGameplayInteractionOption* Option)` | Selected option changes |
| `OnInteractionStartedDelegate` | `(AActor* Entity)` | Player began interacting (Client RPC) |
| `OnInteractionFinishedDelegate` | `(AActor* Entity)` | Interaction ended (Client RPC) |
| `OnInteractionStateChangedDelegate` | `(AActor* Entity)` | Entity interaction state changed (Client RPC) |
| `OnTimedInteractionStartedDelegate` | `(float InteractionTime)` | Timed hold began |
| `OnTimedInteractionFinishedDelegate` | `(bool bWasCancelled)` | Timed hold ended |
| `OnBegunObservingEntityDelegate` | `(AActor* Entity)` | Crosshair entered a new entity |
| `OnEndedObservingEntityDelegate` | `(AActor* Entity)` | Crosshair left the entity |
| `OnEntityDynamicTagsChangedDelegate` | `(AActor* Entity)` | Entity's dynamic tags changed |
| `OnInteractionErrorDelegate` | `(FGameplayInteractionErrorEntry)` | New highest-priority error resolved |
| `OnInteractionErrorClearedDelegate` | `()` | Selected option is now activatable |
| `OnInteractionTerminatedDelegate` | `(AActor* Entity)` | Interaction was terminated externally |

---

## Internal Flow Overview

```
PerformTrace (every ScanIntervalSeconds, local client only)
  → LineTrace using camera or avatar origin
  → Hit has "Interactive" tag on component?
      Yes → UpdateEntityInView(NewEntity, NewComponent)
               → NotifyEndedObservingEntity(OldEntity)
               → LastObservedEntity = OldEntity
               → EntityInView = NewEntity
               → NotifyBegunObservingEntity(NewEntity)
               → NotifyEntityInViewChanged()
                    → UnbindFromEntityStateDelegates (old entity)
                    → bPlayerHasExplicitSelection = false
                    → RefreshInteractionOptions
                    → BindToEntityStateDelegates (new entity)
                    → EvaluateAndBroadcastErrorState
      No  → UpdateEntityInView(nullptr, nullptr)
               → (same path, clears option list and selection)
```

Entity state delegate callbacks (`HandleEntityDynamicTagsChanged`, `HandleEntityInteractorsUpdated`, `HandleEntityPlayerIdsUpdated`) all trigger `AutoSelectBestInteractionOption` and `UpdateOutlineForEntityInView` to keep UI in sync with replicated entity state changes.

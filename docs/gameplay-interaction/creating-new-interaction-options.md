---
sidebar_position: 3
---

# Creating Interaction Options

An **Interaction Option** (`UGameplayInteractionOption`) is a data asset that fully describes one action a player can perform on an entity — what triggers it, what it does, what it costs, and how it looks in the UI.

A separate **Interaction Options** container (`UGameplayInteractionOptions`) holds the full list of options for a given entity.

---

## Step 1 — Create the Container Asset

1. In the Content Browser navigate to **Miscellaneous → Data Asset**.
2. Select `GameplayInteractionOptions` as the class.
3. Name it to describe the entity (e.g. `DA_Options_Door`).
4. Open it and add entries to the **Available Options** array — each entry is a reference to a `UGameplayInteractionOption` asset (see Step 2).

---

## Step 2 — Create an Interaction Option Asset

1. In the Content Browser navigate to **Miscellaneous → Data Asset**.
2. Select `GameplayInteractionOption` as the class.
3. Name it to describe the action (e.g. `DA_Option_Door_Open`).

---

## Step 3 — Configure the Option

Open the option asset. The properties are grouped by category:

### Matching

These control when the option appears in the player's available list.

| Property | Description |
|---|---|
| `RequiredComponentTag` | If set, the option only appears when the trace hits a mesh component carrying this tag. Leave empty to match any component on the entity. Use this for multi-part entities (e.g. `ButtonA`, `ButtonB`). |
| `PlayerRequirements` | Tag query evaluated against the player's owned gameplay tags. Default blocks when `Gameplay.Interaction.Ongoing` is present (prevents re-entry while mid-interaction). |
| `TargetRequirements` | Tag query evaluated against the entity's **dynamic tags**. Use to gate options on entity state (e.g. "only show Lock option when the entity has `State.Unlocked`"). |
| `CooldownTags` | If any of these tags are present on the entity's dynamic tags, this option shows a `Gameplay.Interaction.Cooldown` failure. Add a matching tag to the entity after use and remove it after the cooldown elapses. |

### Execution

| Property | Description |
|---|---|
| `InteractionType` | `Instant` — fires immediately on input press. `Timed` — requires holding for `InteractionDuration` seconds. |
| `InteractionDuration` | Hold duration in seconds for timed interactions. |
| `ActionTag` | Descriptive tag consumed by interactive entities implementing the interaction logic (e.g. `Interaction.Action.Door.Open`). |
| `bEndAbilityOnExecute` | When true the ability ends as soon as the action executes. Set false for interactions that must persist (e.g. dialogue that requires an explicit exit). |

### Player — On Start (Temporary)

Applied while the interaction is active, removed automatically when the ability ends.

| Property | Description |
|---|---|
| `PlayerTemporaryGrantedTagsOnStart` | Tags loosely granted to the player. Default includes `Gameplay.Interaction.Ongoing` to block re-entry. |
| `PlayerTemporaryRevokedTagsOnStart` | Tags removed from the player while the interaction is active. |
| `PlayerTemporaryEffectsOnStart` | Gameplay Effects applied for the duration. Handles returned and removed in `EndAbility`. |

### Player — On Finish (Persistent)

Applied when the interaction **successfully completes**. Not removed automatically.

| Property | Description |
|---|---|
| `PlayerPersistentGrantedTagsOnFinish` | Tags granted permanently on completion. |
| `PlayerPersistentRevokedTagsOnFinish` | Tags removed permanently on completion. |
| `PlayerPersistentEffectsOnFinish` | Gameplay Effects applied on completion. |

### Target — On Start (Temporary)

Applied to the entity's dynamic tag container while the interaction is active.

| Property | Description |
|---|---|
| `TargetTemporaryGrantedTagsOnStart` | Dynamic tags added to the entity on interaction start. |
| `TargetTemporaryRevokedTagsOnStart` | Dynamic tags removed from the entity on interaction start. |

### Target — On Finish (Persistent)

Applied to the entity's dynamic tags when the interaction completes.

| Property | Description |
|---|---|
| `TargetPersistentGrantedTagsOnFinish` | Dynamic tags added permanently on completion (e.g. add `Gameplay.Interaction.Disabled` so a single-use entity can't be used again). |
| `TargetPersistentRevokedTagsOnFinish` | Dynamic tags removed permanently on completion (e.g. remove `State.Locked` after unlock). |

### Feedback

Context-sensitive feedback selected via tag query at runtime.

| Property | Description |
|---|---|
| `FeedbackConfigs` | Array of `FGameplayInteractionFeedback` entries. Each entry has a `QueryTag`, a `GameplayCueTag`, an `AnimationMontage`, a `SoundOverride`, and a `ParticleOverride`. |
| `DefaultFeedback` | Fallback used when no `FeedbackConfigs` entry matches the query. |

Query feedback from your ability using:
```cpp
FGameplayInteractionFeedback Feedback;
if (CurrentOption->QueryFeedback(YourContextTag, Feedback))
{
    // Execute Feedback.GameplayCueTag, play Feedback.SoundOverride, etc.
}
```

Matching supports tag hierarchy — querying `Feedback.FPP.Injured` will match a config entry tagged `Feedback.FPP`.

### UI

| Property | Description |
|---|---|
| `ActionText` | Short label for the button prompt (e.g. *"Open"*, *"Hack"*). |
| `ProgressText` | Label shown during a timed hold (e.g. *"Opening..."*). |
| `Description` | Longer description for detail panels. Supports multi-line. |
| `InteractionIcon` | Icon displayed in the HUD prompt or radial menu slice. |

---

## Step 4 — Assign the Container to the Entity

1. Open your interactive entity Blueprint.
2. Select the **Interaction Component** in the Components panel.
3. In the Details panel, set **Interaction Options** to your `DA_Options_Door` container asset.

---

## Common Recipes

### Single-use entity (door that can only be opened once)

On `DA_Option_Door_Open`:
- `TargetPersistentGrantedTagsOnFinish` → add `Gameplay.Interaction.Disabled`

The entity's blocking tags include `Disabled` by default, so no further interaction will be possible after the first completion.

### Cooldown between uses

1. On the option, add your custom cooldown tag (e.g. `State.Door.Cooldown`) to `CooldownTags`.
2. On `TargetPersistentGrantedTagsOnFinish`, add `State.Door.Cooldown`.
3. After your cooldown timer elapses, call `RevokeDynamicTags` on the entity's Interaction Component to remove `State.Door.Cooldown`.

### Locked door requiring a key

On `DA_Option_Door_Open`:
- `PlayerRequirements` → `FGameplayTagQuery::MakeQuery_MatchAllTags({Item.Key.MasterKey})`

The option is hidden/unavailable until the player's ASC has the `Item.Key.MasterKey` tag.
Also make sure to add this tag to the ObservedTags on the player interaction component, so it updates the interaction whenever that tag is present.

### Two-sided interaction (Open / Close toggle)

Create two options:
- `DA_Option_Door_Open` — `TargetRequirements` matches when entity does **not** have `State.Door.Open`. `TargetPersistentGrantedTagsOnFinish` adds `State.Door.Open`.
- `DA_Option_Door_Close` — `TargetRequirements` matches when entity **has** `State.Door.Open`. `TargetPersistentRevokedTagsOnFinish` removes `State.Door.Open`.

Both live in the same `DA_Options_Door` container. The player-side component auto-selects the appropriate option based on current entity state.

---

## Step 5 — Assign an Interaction Ability

Each option drives execution through a Gameplay Ability. You do **not** set the ability class on the option asset itself — instead you grant the ability to the player and it reads `CurrentOption` from the cached state at activation time.

The plugin ships `GA_Interact` (wraps `UGameplayAbility_Interaction`) as a reference implementation. See [Creating Interaction Abilities](creating-new-interaction-abilities) for how to create custom logic per option.


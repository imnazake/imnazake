---
sidebar_position: 3
---

# Gameplay Containers

:::info
This guide is applicable for Gameplay Containers Plugin version **1.4 or higher**.
:::

---

## Step-by-Step Setup

### 1. Download the Demo Project  
- Download the demo project for Gameplay Containers from the GitHub repository.  
- Choose one of the branches shown in the image below, based on the Unreal Engine version you are using.  

![GitHub Branches](images/github-gc-branches-dev.png)

---

### 2. Download the Plugin  
- Obtain the plugin from the **Epic Games Launcher** or **Fab**.

---

### 3. Copy the Plugin to the Unify Demo Project  
- Navigate to the Unreal Engine directory where the plugin was installed.  
- Copy the plugin to the **Plugins** folder in the Unify demo project.  

---

### 4. Regenerate Visual Studio Solution Files  
- Regenerate the project solution files to ensure the plugin is integrated correctly.

---

### 5. Open the Project in Unreal Engine  
- Open the Unify demo project in Unreal Engine to proceed with further setup.

---

### 6. Create an Ability Set Data Asset  
- Navigate to the **Content Browser**.  
- Right-click and select **Miscellaneous > Data Asset**.  
- In the dialog box, select the appropriate class for the ability set (e.g., `UnifyAbilitySet`).  
- Name it `UAS_GameplayContainers` or any name of your choice.  
- Refer to the image below for guidance.  

![Reference Image for Ability Set](images/gc_ability_set_unify.png)
![Reference Image for Ability Set](images/gc_ability_set_created.png)

---

### 7. Reparent the Abilities Blueprints  
- Go to **Plugins > GameplayContainers > Core > Abilities**.  
- Select all the ability blueprints.  
- Right-click and navigate to **Script Asset Actions > Reparent Selected Blueprints**.  
- Choose `UnifyGameplayAbility` as the parent class and press **OK**.  
- Save all changes.

![Reference Image for Reparent Abilities](images/reparent_gc_abilities_01.png)
![Reference Image for Reparent Abilities](images/reparent_gc_abilities_02.png)

---

### 8. Add Abilities to the Ability Set  
- Select all abilities again.  
- Right-click and navigate to **Script Asset Actions > Add Selected Abilities to Ability Set**.  
- Choose the ability set you created earlier (`UAS_GameplayContainers` or your custom name).  
- Press **OK** and save all changes.

![Reference Image for Ability Set Config](images/gc_add_abilities_to_set_01.png)
![Reference Image for Ability Set Config](images/gc_add_abilities_to_set_02.png)


---

### 9. Add the Ability Set and Input Mapping Context  
1. **Add the Ability Set to the Character Blueprint:**  
   - Open the **Character Blueprint class**.  
   - Find the **AbilitySets** array.  
   - Add the `UAS_GameplayContainers` (or your custom ability set) to the array.  
   - Save the blueprint.  

![Reference Image for Character Config](images/character_gc_setup_01.png)
![Reference Image for Character Config](images/character_gc_setup_02.png)

2. **Add the Input Mapping Context:**  
   - Open your **Character Input Config** data asset.  
   - Add the input mapping context for the **Gameplay Containers** plugin to the asset.  
   - Save the changes.

![Reference Image for Character Input Config](images/gc_input_config_01.png)
![Reference Image for Character Input Config](images/gc_input_config_02.png)

---

### 10. Test the Plugin  
- Press the **Play** button to test the functionality of the plugin in the project.

---

You’re all set! If you encounter any issues, refer to the plugin documentation or contact support.  
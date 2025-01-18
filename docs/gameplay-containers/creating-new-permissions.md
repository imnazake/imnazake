---
sidebar_position: 3
---

# Creating New Permissions

This guide explains how to create and configure access permissions for containers in the Gameplay Containers plugin. These permissions define what actions users can perform when interacting with a container they do not own.  

---

## Step-by-Step Instructions  

### 1. Create a Permission Data Asset  
- Navigate to **Miscellaneous > Data Asset** in the Content Browser.  
- Select `GameplayContainerPermission` as the parent class.  
- Name the asset appropriately (e.g., `MyPermission`).  

![GameplayItemDefinition Properties](./images/permission_01.png)

---

### 2. Configure the Permission Data Asset  
- Open the newly created data asset.  
- Define what operations users can perform on containers by adding them to the **Operations Array**:  
  - If an operation is included, the user can perform it based on the selected **Policy**.  
  - If an operation is excluded, the user cannot perform it.  

#### Policies Explanation  

| **Policy**            | **Description**                                                                                                  |  
|------------------------|------------------------------------------------------------------------------------------------------------------|  
| **NoRestrictions**     | The operation can be performed without any limitation.                                                         |  
| **RestrictWithinSelf** | The operation can only be performed inside the container itself.                                                |  
| **RestrictIncoming**   | The operation is rejected if it originates from another container but is allowed if directed to/from the current container. |  
| **RestrictOutgoing**   | The operation is rejected if directed to another container but is allowed if coming from another container or the current one. |  
| **Custom**             | Custom logic can be defined by creating a blueprint inheriting from `GameplayContainerCustomOperationPolicy`.    |  

**Note:**  
For the **Custom** policy:  
- Override the function `CanPerformOperation` in your custom policy blueprint.  
- Implement your logic to determine if the operation is allowed and return the appropriate result.

![GameplayItemDefinition Properties](./images/custom_policy.png)

---

### 3. Assign the Permission to a Container  
- Open the container’s **Definition Data Asset**.  
- Add a **Permission Fragment** to the container.  
- Assign the permission data asset you created earlier as the active permission set for users.  

![GameplayItemDefinition Properties](./images/permission_assign_container.png)

#### Additional Note:  
- You can modify permissions dynamically at runtime by calling the `ModifyUserPermissions` function on the container component.  
- This function will replace the existing permission set with the new one, but only if **AllowUserPermissionModification** is enabled in the container’s **Definition Permissions Fragment**.  

---

### 4. Save and Test  
- Save all changes to your assets and configurations.  
- Test the permissions by interacting with the container and ensuring users can only perform the allowed operations.

:::info
In this case the container user can only move items within the same container or to different containers, all other operations are rejected.
:::

![GameplayItemDefinition Properties](./images/my_permission_test.png)

---

## Important Notes  

1. These permissions apply **only to users of the container**, i.e., players who do not own the container.  
2. The actor owning the container component has **full access** to all operations by default.  
3. Permissions apply only to **user actions**. Operations like adding items, handling overflow, etc., are explicitly reserved for the container owner or the server authority.  
"use strict";(self.webpackChunknazake=self.webpackChunknazake||[]).push([[2432],{1747:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"gameplay-containers/creating-new-slots","title":"creating-new-slots","description":"This guide walks you through the process of creating and configuring new container slots in your game using the Gameplay Containers Plugin. Slots are essential for organizing and managing items within a container.","source":"@site/docs/gameplay-containers/creating-new-slots.md","sourceDirName":"gameplay-containers","slug":"/gameplay-containers/creating-new-slots","permalink":"/imnazake/docs/gameplay-containers/creating-new-slots","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/gameplay-containers/creating-new-slots.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Creating New Containers","permalink":"/imnazake/docs/gameplay-containers/creating-new-containers"},"next":{"title":"Features","permalink":"/imnazake/docs/gameplay-interaction/features"}}');var s=t(4848),r=t(8453);const o={sidebar_position:3},a=void 0,l={},c=[{value:"1. Create a Container Slot Definition",id:"1-create-a-container-slot-definition",level:2},{value:"Steps:",id:"steps",level:3},{value:"2. Configure the Slot Definition",id:"2-configure-the-slot-definition",level:2},{value:"Steps:",id:"steps-1",level:3},{value:"3. Configure Slot Display Options",id:"3-configure-slot-display-options",level:2},{value:"Steps:",id:"steps-2",level:3},{value:"4. Configure Fragments for the Slot",id:"4-configure-fragments-for-the-slot",level:2},{value:"Available Fragments:",id:"available-fragments",level:3},{value:"5. Configure the UI Fragment",id:"5-configure-the-ui-fragment",level:2},{value:"Steps:",id:"steps-3",level:3},{value:"6. Configure Usage Blocking Tags",id:"6-configure-usage-blocking-tags",level:2},{value:"7. Play Sounds for Slot Events",id:"7-play-sounds-for-slot-events",level:2},{value:"Steps:",id:"steps-4",level:3}];function d(e){const n={code:"code",h2:"h2",h3:"h3",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["This guide walks you through the process of creating and configuring new container slots in your game using the ",(0,s.jsx)(n.strong,{children:"Gameplay Containers Plugin"}),". Slots are essential for organizing and managing items within a container."]}),"\n",(0,s.jsx)(n.h2,{id:"1-create-a-container-slot-definition",children:"1. Create a Container Slot Definition"}),"\n",(0,s.jsxs)(n.p,{children:["Start by creating a new container slot definition by creating a data asset that inherits from ",(0,s.jsx)(n.code,{children:"GameplayContainerSlotDefinition"}),". For this example, let's name it ",(0,s.jsx)(n.code,{children:"GCSD_MyNewSlot"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"steps",children:"Steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Right-click in the Content Browser and choose ",(0,s.jsx)(n.strong,{children:"Miscellaneous"})," > ",(0,s.jsx)(n.strong,{children:"Data Asset"})," > ",(0,s.jsx)(n.strong,{children:"GameplayContainerSlotDefinition"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Name the asset (e.g., ",(0,s.jsx)(n.code,{children:"GCSD_MyNewSlot"}),")."]}),"\n",(0,s.jsx)(n.li,{children:"Save the asset."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Slot Type Tag Example",src:t(9076).A+"",width:"1922",height:"469"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"2-configure-the-slot-definition",children:"2. Configure the Slot Definition"}),"\n",(0,s.jsx)(n.p,{children:"Next, configure the slot definition by giving it a type tag. This is required for slot-based containers, as the type tag helps define how the slot behaves in the context of a container."}),"\n",(0,s.jsx)(n.h3,{id:"steps-1",children:"Steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["In the ",(0,s.jsx)(n.strong,{children:"GameplayContainer.Slot.Type"})," parent tag, create a new sub-tag. For this example, call it ",(0,s.jsx)(n.code,{children:"MyNewType"})," (as shown in the picture below)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Slot Type Tag Example",src:t(2373).A+"",width:"1401",height:"532"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Select the newly created slot type to be used for this definition."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"3-configure-slot-display-options",children:"3. Configure Slot Display Options"}),"\n",(0,s.jsx)(n.p,{children:"Configure the slot if you want it to display context menus or tooltips when interacting with it."}),"\n",(0,s.jsx)(n.h3,{id:"steps-2",children:"Steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["In the slot section, check the checkboxes to enable or disable the following:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Context Menu"}),": Allow right-click interactions on the slot."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Tooltips"}),": Enable tooltips to display additional information about the slot."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Save the asset."}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"4-configure-fragments-for-the-slot",children:"4. Configure Fragments for the Slot"}),"\n",(0,s.jsx)(n.p,{children:"Gameplay Container Slots can have various fragments to define extra functionality, such as filtering items or binding attributes."}),"\n",(0,s.jsx)(n.h3,{id:"available-fragments",children:"Available Fragments:"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Fragment Type"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"Attribute Fragment"})}),(0,s.jsx)(n.td,{children:"Binds an attribute (e.g., inventory capacity) from an attribute set to a specific slot type."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"Filter Fragment"})}),(0,s.jsx)(n.td,{children:"Filters items that can be placed in the slot based on item tags or other criteria."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.strong,{children:"UI Fragment"})}),(0,s.jsx)(n.td,{children:"Defines the UI elements that display the slot on screen."})]})]})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"5-configure-the-ui-fragment",children:"5. Configure the UI Fragment"}),"\n",(0,s.jsxs)(n.p,{children:["In the ",(0,s.jsx)(n.strong,{children:"UI Fragment"}),", configure the widgets used for displaying the slot in the user interface. You can either use the default widgets or create a custom widget by inheriting from ",(0,s.jsx)(n.code,{children:"GameplayContainerSlotWidget"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"steps-3",children:"Steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Add the ",(0,s.jsx)(n.strong,{children:"UI Fragment"})," to the slot."]}),"\n",(0,s.jsxs)(n.li,{children:["Select or create the widget to display the slot. To customize the look of the slot:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Create a new ",(0,s.jsx)(n.strong,{children:"Widget Blueprint"})," that inherits from ",(0,s.jsx)(n.code,{children:"GameplayContainerSlotWidget"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Customize the appearance and behavior of the slot widget."}),"\n",(0,s.jsx)(n.li,{children:"You will have access to all slot data, making it easy to design how you want to display the slot."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Alternatively, you can use the ",(0,s.jsx)(n.strong,{children:"default widgets"})," or modify them if you prefer."]}),"\n",(0,s.jsx)(n.li,{children:"Save the asset."}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"6-configure-usage-blocking-tags",children:"6. Configure Usage Blocking Tags"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Usage Blocking Tags"}),' are special tags that prevent the use of the slot if they are present in the container\u2019s owned tags. This is useful if you want to "lock" a slot and prevent any actions from happening until the slot is "unlocked" by removing the blocking tag.']}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"7-play-sounds-for-slot-events",children:"7. Play Sounds for Slot Events"}),"\n",(0,s.jsx)(n.p,{children:"If you want to play sounds when certain events happen in the slot (e.g., when the slot is hovered over, or when a drag starts), you need to manually trigger the sounds."}),"\n",(0,s.jsx)(n.h3,{id:"steps-4",children:"Steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["In the appropriate event (e.g., in slot widget blueprint ",(0,s.jsx)(n.code,{children:"OnSlotHovered"}),", ",(0,s.jsx)(n.code,{children:"OnSlotDragStarted"}),"), you can manually call the ",(0,s.jsx)(n.code,{children:"PlaySound"})," function to trigger a sound cue."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"For example in C++ it looks like this:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"    void UGameplayContainerSlotWidget::NativeOnDragEnter(const FGeometry& InGeometry, const FDragDropEvent& InDragDropEvent, UDragDropOperation* InOperation)\r\n    {\r\n        BP_OnSlotDragHovered();\r\n        \r\n        if (DataObject && DataObject->GetSlotDefinition())\r\n        {\r\n            if (const UGameplayContainerSlotFragment_UI* UserInterfaceFragment = DataObject->GetSlotDefinition()->GetFragmentByClass<UGameplayContainerSlotFragment_UI>())\r\n            {\r\n                PlaySound(UserInterfaceFragment->DragHoveredSound);\r\n                BP_OnSlotBrushChanged(UserInterfaceFragment->DragHoveredBrush);\r\n            }\r\n        }\r\n        \r\n        Super::NativeOnDragEnter(InGeometry, InDragDropEvent, InOperation);\r\n    }\r\n\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},9076:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/slot-definition-6b4e0818c0163efd9f506c891fc8f14e.png"},2373:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/slot-type-tag-example-550d2f197d17b217dbbb1d2d055439c5.png"},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var i=t(6540);const s={},r=i.createContext(s);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);
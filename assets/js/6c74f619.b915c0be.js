"use strict";(self.webpackChunknazake=self.webpackChunknazake||[]).push([[2173],{6791:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"gameplay-containers/creating-new-items","title":"Creating New Items","description":"This guide will walk you through the steps of creating new items for your game using the Gameplay Containers. You\'ll learn how to define item properties, configure functionality, and enhance items with fragments. Images are included to visually guide you through the process.","source":"@site/docs/gameplay-containers/creating-new-items.md","sourceDirName":"gameplay-containers","slug":"/gameplay-containers/creating-new-items","permalink":"/imnazake/docs/gameplay-containers/creating-new-items","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/gameplay-containers/creating-new-items.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Setup","permalink":"/imnazake/docs/gameplay-containers/setup"},"next":{"title":"Creating New Equipment Items","permalink":"/imnazake/docs/gameplay-containers/creating-new-equipment"}}');var i=n(4848),r=n(8453);const a={sidebar_position:3},l="Creating New Items",o={},c=[{value:"1. Create a Data Asset",id:"1-create-a-data-asset",level:2},{value:"Steps:",id:"steps",level:3},{value:"2. Configure Item Properties",id:"2-configure-item-properties",level:2},{value:"Available Fragments:",id:"available-fragments",level:3},{value:"3. Choose the Item Instance Class",id:"3-choose-the-item-instance-class",level:2},{value:"Key Concepts:",id:"key-concepts",level:3},{value:"Steps:",id:"steps-1",level:3},{value:"5. Testing Your New Item",id:"5-testing-your-new-item",level:2}];function d(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"creating-new-items",children:"Creating New Items"})}),"\n",(0,i.jsxs)(t.p,{children:["This guide will walk you through the steps of creating new items for your game using the ",(0,i.jsx)(t.strong,{children:"Gameplay Containers"}),". You'll learn how to define item properties, configure functionality, and enhance items with fragments. Images are included to visually guide you through the process."]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"1-create-a-data-asset",children:"1. Create a Data Asset"}),"\n",(0,i.jsxs)(t.p,{children:["To begin, create a new ",(0,i.jsx)(t.strong,{children:"Data Asset"})," that inherits from ",(0,i.jsx)(t.code,{children:"GameplayItemDefinition"}),". This data asset will serve as the core definition of your item."]}),"\n",(0,i.jsx)(t.h3,{id:"steps",children:"Steps:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:["In the Content Browser, right-click and select ",(0,i.jsx)(t.strong,{children:"Miscellaneous"})," > ",(0,i.jsx)(t.strong,{children:"Data Asset"})," > ",(0,i.jsx)(t.strong,{children:"GameplayItemDefinition"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["Name your asset appropriately, such as ",(0,i.jsx)(t.code,{children:"GID_MyNewItem"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["Open the asset, give it a user interface fragment and configure the following properties:","\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Name"}),": Set the name of the item."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Description"}),": Provide a description of the item."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Icon"}),": Assign an image for UI representation."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.li,{children:"Save the asset."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"GameplayItemDefinition Properties",src:n(5581).A+"",width:"1920",height:"709"})}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"2-configure-item-properties",children:"2. Configure Item Properties"}),"\n",(0,i.jsxs)(t.p,{children:["Define additional functionality or behaviors for your item by using ",(0,i.jsx)(t.strong,{children:"fragments"}),". Fragments are modular components that extend the capabilities of the item."]}),"\n",(0,i.jsx)(t.h3,{id:"available-fragments",children:"Available Fragments:"}),"\n",(0,i.jsx)(t.p,{children:"Below is a list of all fragments currently available in the plugin. More fragments will be added in the future to expand functionality and customization options."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:(0,i.jsx)(t.strong,{children:"Fragment"})}),(0,i.jsx)(t.th,{children:(0,i.jsx)(t.strong,{children:"Description"})})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Actions"})}),(0,i.jsx)(t.td,{children:"Define actions the item can perform, such as using, removing, or dropping."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Attachments"})}),(0,i.jsx)(t.td,{children:"Enable attachment systems, such as weapon attachments."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Equipment"})}),(0,i.jsx)(t.td,{children:"Configure the item as equippable gear, like armor or weapons."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Grid"})}),(0,i.jsx)(t.td,{children:"Use for grid-based inventory systems, defining how the item fits into grids."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"RandomLootGeneration"})}),(0,i.jsx)(t.td,{children:"Set rules for generating the item as part of random loot drops."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Rarity"})}),(0,i.jsx)(t.td,{children:"Assign rarity levels to the item, such as Common, Rare, or Legendary."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Stack"})}),(0,i.jsx)(t.td,{children:"Enable stacking functionality and set stack limits."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Stats"})}),(0,i.jsx)(t.td,{children:"Define custom stats for the item, like durability or damage values."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"UI"})}),(0,i.jsx)(t.td,{children:"Configure UI-specific settings, such as item icons or tooltips."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"Weight"})}),(0,i.jsx)(t.td,{children:"Assign a weight to the item for inventory management systems."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:"World"})}),(0,i.jsx)(t.td,{children:"Configure how the item behaves when dropped into the game world."})]})]})]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"3-choose-the-item-instance-class",children:"3. Choose the Item Instance Class"}),"\n",(0,i.jsxs)(t.p,{children:["Select the ",(0,i.jsx)(t.strong,{children:"item instance class"})," that your item will use when instantiated. This determines how the item behaves dynamically in the game."]}),"\n",(0,i.jsx)(t.h3,{id:"key-concepts",children:"Key Concepts:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Item Definition"}),": Exists independently and is used for identification (e.g., in the game database or as a reference)."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Item Instance"}),': Created when the item "exists" in the world (e.g., in a player\'s inventory or as a dropped object).']}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"steps-1",children:"Steps:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:["In your item definition asset, locate the ",(0,i.jsx)(t.strong,{children:"Instance Class"})," field."]}),"\n",(0,i.jsxs)(t.li,{children:["Choose an appropriate class that inherits from ",(0,i.jsx)(t.code,{children:"GameplayItemInstance"}),"."]}),"\n",(0,i.jsx)(t.li,{children:"Save the asset."}),"\n"]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"5-testing-your-new-item",children:"5. Testing Your New Item"}),"\n",(0,i.jsx)(t.p,{children:"Once your item is defined, test it in the game:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Add the item to a player's inventory or spawn it in the world."}),"\n",(0,i.jsx)(t.li,{children:"Interact with the item to ensure all fragments and behaviors are functioning correctly."}),"\n",(0,i.jsx)(t.li,{children:"Debug any issues by revisiting the item's definition or fragments."}),"\n"]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.p,{children:"By following these steps, you can create fully functional and customizable items for your game."})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},5581:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/01-c599a44a36e76ca9bacea8c6dcb93d78.png"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>l});var s=n(6540);const i={},r=s.createContext(i);function a(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);
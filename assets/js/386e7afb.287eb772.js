"use strict";(self.webpackChunknazake=self.webpackChunknazake||[]).push([[709],{7608:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"unify/gameplay-containers-setup","title":"Gameplay Containers","description":"This guide is applicable for Gameplay Containers Plugin version 1.4 or higher.","source":"@site/docs/unify/gameplay-containers-setup.md","sourceDirName":"unify","slug":"/unify/gameplay-containers-setup","permalink":"/imnazake/docs/unify/gameplay-containers-setup","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/unify/gameplay-containers-setup.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Getting Started","permalink":"/imnazake/docs/unify/getting-started"},"next":{"title":"Features","permalink":"/imnazake/docs/gameplay-containers/features"}}');var s=t(4848),a=t(8453);const r={sidebar_position:3},l="Gameplay Containers",o={},c=[{value:"Step-by-Step Setup",id:"step-by-step-setup",level:2},{value:"1. Download the Demo Project",id:"1-download-the-demo-project",level:3},{value:"2. Download the Plugin",id:"2-download-the-plugin",level:3},{value:"3. Copy the Plugin to the Unify Demo Project",id:"3-copy-the-plugin-to-the-unify-demo-project",level:3},{value:"4. Regenerate Visual Studio Solution Files",id:"4-regenerate-visual-studio-solution-files",level:3},{value:"5. Open the Project in Unreal Engine",id:"5-open-the-project-in-unreal-engine",level:3},{value:"6. Create an Ability Set Data Asset",id:"6-create-an-ability-set-data-asset",level:3},{value:"7. Reparent the Abilities Blueprints",id:"7-reparent-the-abilities-blueprints",level:3},{value:"8. Add Abilities to the Ability Set",id:"8-add-abilities-to-the-ability-set",level:3},{value:"9. Add the Ability Set and Input Mapping Context",id:"9-add-the-ability-set-and-input-mapping-context",level:3},{value:"10. Test the Plugin",id:"10-test-the-plugin",level:3}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"gameplay-containers",children:"Gameplay Containers"})}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["This guide is applicable for Gameplay Containers Plugin version ",(0,s.jsx)(n.strong,{children:"1.4 or higher"}),"."]})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"step-by-step-setup",children:"Step-by-Step Setup"}),"\n",(0,s.jsx)(n.h3,{id:"1-download-the-demo-project",children:"1. Download the Demo Project"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Download the demo project for Gameplay Containers from the GitHub repository."}),"\n",(0,s.jsx)(n.li,{children:"Choose one of the branches shown in the image below, based on the Unreal Engine version you are using."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"GitHub Branches",src:t(6003).A+"",width:"998",height:"743"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"2-download-the-plugin",children:"2. Download the Plugin"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Obtain the plugin from the ",(0,s.jsx)(n.strong,{children:"Epic Games Launcher"})," or ",(0,s.jsx)(n.strong,{children:"Fab"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"3-copy-the-plugin-to-the-unify-demo-project",children:"3. Copy the Plugin to the Unify Demo Project"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Navigate to the Unreal Engine directory where the plugin was installed."}),"\n",(0,s.jsxs)(n.li,{children:["Copy the plugin to the ",(0,s.jsx)(n.strong,{children:"Plugins"})," folder in the Unify demo project."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"4-regenerate-visual-studio-solution-files",children:"4. Regenerate Visual Studio Solution Files"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Regenerate the project solution files to ensure the plugin is integrated correctly."}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"5-open-the-project-in-unreal-engine",children:"5. Open the Project in Unreal Engine"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Open the Unify demo project in Unreal Engine to proceed with further setup."}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"6-create-an-ability-set-data-asset",children:"6. Create an Ability Set Data Asset"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Navigate to the ",(0,s.jsx)(n.strong,{children:"Content Browser"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Right-click and select ",(0,s.jsx)(n.strong,{children:"Miscellaneous > Data Asset"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["In the dialog box, select the appropriate class for the ability set (e.g., ",(0,s.jsx)(n.code,{children:"UnifyAbilitySet"}),")."]}),"\n",(0,s.jsxs)(n.li,{children:["Name it ",(0,s.jsx)(n.code,{children:"UAS_GameplayContainers"})," or any name of your choice."]}),"\n",(0,s.jsx)(n.li,{children:"Refer to the image below for guidance."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"Reference Image for Ability Set",src:t(9384).A+"",width:"639",height:"217"}),"\r\n",(0,s.jsx)(n.img,{alt:"Reference Image for Ability Set",src:t(8873).A+"",width:"1767",height:"661"})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"7-reparent-the-abilities-blueprints",children:"7. Reparent the Abilities Blueprints"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Go to ",(0,s.jsx)(n.strong,{children:"Plugins > GameplayContainers > Core > Abilities"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Select all the ability blueprints."}),"\n",(0,s.jsxs)(n.li,{children:["Right-click and navigate to ",(0,s.jsx)(n.strong,{children:"Script Asset Actions > Reparent Selected Blueprints"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Choose ",(0,s.jsx)(n.code,{children:"UnifyGameplayAbility"})," as the parent class and press ",(0,s.jsx)(n.strong,{children:"OK"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Save all changes."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"Reference Image for Reparent Abilities",src:t(3091).A+"",width:"1636",height:"946"}),"\r\n",(0,s.jsx)(n.img,{alt:"Reference Image for Reparent Abilities",src:t(7336).A+"",width:"1333",height:"890"})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"8-add-abilities-to-the-ability-set",children:"8. Add Abilities to the Ability Set"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Select all abilities again."}),"\n",(0,s.jsxs)(n.li,{children:["Right-click and navigate to ",(0,s.jsx)(n.strong,{children:"Script Asset Actions > Add Selected Abilities to Ability Set"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Choose the ability set you created earlier (",(0,s.jsx)(n.code,{children:"UAS_GameplayContainers"})," or your custom name)."]}),"\n",(0,s.jsxs)(n.li,{children:["Press ",(0,s.jsx)(n.strong,{children:"OK"})," and save all changes."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"Reference Image for Ability Set Config",src:t(9192).A+"",width:"1478",height:"963"}),"\r\n",(0,s.jsx)(n.img,{alt:"Reference Image for Ability Set Config",src:t(4467).A+"",width:"1483",height:"898"})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"9-add-the-ability-set-and-input-mapping-context",children:"9. Add the Ability Set and Input Mapping Context"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Add the Ability Set to the Character Blueprint:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Open the ",(0,s.jsx)(n.strong,{children:"Character Blueprint class"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Find the ",(0,s.jsx)(n.strong,{children:"AbilitySets"})," array."]}),"\n",(0,s.jsxs)(n.li,{children:["Add the ",(0,s.jsx)(n.code,{children:"UAS_GameplayContainers"})," (or your custom ability set) to the array."]}),"\n",(0,s.jsx)(n.li,{children:"Save the blueprint."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"Reference Image for Character Config",src:t(1800).A+"",width:"1299",height:"440"}),"\r\n",(0,s.jsx)(n.img,{alt:"Reference Image for Character Config",src:t(8659).A+"",width:"1918",height:"872"})]}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Add the Input Mapping Context:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Open your ",(0,s.jsx)(n.strong,{children:"Character Input Config"})," data asset."]}),"\n",(0,s.jsxs)(n.li,{children:["Add the input mapping context for the ",(0,s.jsx)(n.strong,{children:"Gameplay Containers"})," plugin to the asset."]}),"\n",(0,s.jsx)(n.li,{children:"Save the changes."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"Reference Image for Character Input Config",src:t(9598).A+"",width:"1091",height:"478"}),"\r\n",(0,s.jsx)(n.img,{alt:"Reference Image for Character Input Config",src:t(6325).A+"",width:"1545",height:"696"})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"10-test-the-plugin",children:"10. Test the Plugin"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Press the ",(0,s.jsx)(n.strong,{children:"Play"})," button to test the functionality of the plugin in the project."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:"You\u2019re all set! If you encounter any issues, refer to the plugin documentation or contact support."})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1800:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/character_gc_setup_01-0624dc5a876217a8496d13895f537496.png"},8659:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/character_gc_setup_02-b732ad6d9f82703e93edf46a6fdb93a6.png"},8873:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_ability_set_created-dfde6affc7db9ff8bb82e7f571c4a760.png"},9384:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_ability_set_unify-0e2ecdc85012d03b8cba4018fa7eae7f.png"},9192:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_add_abilities_to_set_01-6c2831aa406e297d92f6c793da8bdd5b.png"},4467:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_add_abilities_to_set_02-4e6791b1844b54100f7a486e22ebfc3e.png"},9598:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_input_config_01-c8914c7dd4b14076b1c77c13699e27cb.png"},6325:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/gc_input_config_02-a12de827b27a776df2c75d18963ca051.png"},6003:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/github-gc-branches-dev-7906159f8faf9c91f9b5bab6b6d6ff08.png"},3091:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/reparent_gc_abilities_01-6f3eaef952af30716ec06adcb2a86487.png"},7336:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/reparent_gc_abilities_02-fa73ef91d75fb4ca68ea526b777fb237.png"},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var i=t(6540);const s={},a=i.createContext(s);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);
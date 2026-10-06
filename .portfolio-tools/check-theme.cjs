const fs=require('fs');const vm=require('vm');const assert=require('assert');
const script=fs.readFileSync(require('path').join(__dirname,'../mafe-portfolio/dist/theme.js'),'utf8');
for(const scenario of [{saved:null,system:false},{saved:null,system:true},{saved:'light',system:true},{saved:'invalid',system:false},{saved:null,system:true,blocked:true}]){
 const root={dataset:{}};const handlers={};const fields={};const attrs={};let persisted=scenario.saved;
 const button={hidden:true,setAttribute:(k,v)=>attrs[k]=v,querySelector:s=>fields[s]??=( {} ),addEventListener:(e,f)=>handlers[e]=f};
 const context={document:{documentElement:root,querySelector:()=>button,addEventListener:(e,f)=>handlers[e]=f},window:{matchMedia:()=>({matches:scenario.system,addEventListener:(e,f)=>handlers.system=f})},localStorage:{getItem:()=>{if(scenario.blocked)throw Error();return persisted},setItem:(k,v)=>{if(scenario.blocked)throw Error();persisted=v}}};
 vm.runInNewContext(script,context);const expected=scenario.saved==='light'?'light':scenario.system?'dark':'light';assert.equal(root.dataset.theme,expected);handlers.DOMContentLoaded();assert.equal(button.hidden,false);handlers.click();assert.equal(root.dataset.theme,expected==='dark'?'light':'dark');assert.equal(attrs['aria-pressed'],String(root.dataset.theme==='dark'));const chosen=root.dataset.theme;handlers.system({matches:chosen!=='dark'});assert.equal(root.dataset.theme,chosen);
}
console.log('Theme defaults, saved preferences, toggle, accessibility state, and blocked storage verified.');

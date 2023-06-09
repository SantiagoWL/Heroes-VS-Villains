(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const m={hero:{name:"Wizard",avatar:"images/wizard.png",health:60,diceCount:3,currentDiceScore:[]},orc:{name:"Orc",avatar:"images/orc.png",health:30,diceCount:1,currentDiceScore:[]},demon:{name:"Demon",avatar:"images/demon.png",health:25,diceCount:2,currentDiceScore:[]},goblin:{name:"Goblin",avatar:"images/goblin.png",health:20,diceCount:3,currentDiceScore:[]}};function p(r){return new Array(r).fill(0).map(()=>Math.floor(Math.random()*6)+1)}const y=(r,t)=>100*r/t;function D(r){return new Array(r).fill(0).map(()=>'<div class="placeholder-dice"></div>').join("")}class u{constructor(t){Object.assign(this,t),this.maxHealth=this.health,this.diceHtml=D(this.diceCount)}setDiceHtml(){this.currentDiceScore=p(this.diceCount),this.diceHtml=this.currentDiceScore.map(t=>`<div class="dice">${t}</div>`).join("")}takeDamage(t){const o=t.reduce((c,e)=>c+e);this.health-=o,this.health<=0&&(this.dead=!0,this.health=0)}getHealthBarHtml(){const t=y(this.health,this.maxHealth);return`<div class="health-bar-outer">
                    <div class="health-bar-inner ${t<26?"danger":""}" 
                            style="width:${t}%;">
                    </div>
                </div>`}getCharacterHtml(){const{elementId:t,name:o,avatar:c,health:e,diceCount:a,diceHtml:s}=this,v=this.getHealthBarHtml();return`
            <div class="character-card">
                <h4 class="name"> ${o} </h4>
                <img class="avatar" src="${c}" />
                <div class="health">health: <b> ${e} </b></div>
                ${v}
                <div class="dice-container">
                    ${s}
                </div>
            </div>`}}let f=["orc","demon","goblin"],l=!1;function g(){const r=m[f.shift()];return r?new u(r):{}}function H(){l||(i.setDiceHtml(),n.setDiceHtml(),i.takeDamage(n.currentDiceScore),n.takeDamage(i.currentDiceScore),d(),i.dead?h():n.dead&&(l=!0,f.length>0?setTimeout(()=>{n=g(),d(),l=!1},1500):h()))}function h(){l=!0;const r=i.health===0&&n.health===0?"No victors - all creatures are dead":i.health>0?"The Wizard Wins":"The monsters are Victorious",t=i.health>0?"🔮":"☠️";setTimeout(()=>{document.body.innerHTML=`
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${r}</h3>
                    <p class="end-emoji">${t}</p>
                </div>
                `},1500)}document.getElementById("attack-button").addEventListener("click",H);function d(){document.getElementById("hero").innerHTML=i.getCharacterHtml(),document.getElementById("monster").innerHTML=n.getCharacterHtml()}const i=new u(m.hero);let n=g();d();

import{d as v,b as y,o as D,c as i,C as e,a as A,t as E,G as d,F as q,J as _,V as w}from"./chunks/framework.762e4fc4.js";const x="/vp-blog/assets/05.ee8394df.png",S={key:0},R=["src"],P={key:1},k=["src"],V=v({__name:"Base64",setup(h){const t=y(""),B=y(""),b=y(""),u=y("");async function m(p){const s=p.target.files[0],o=performance.now();t.value=await g(s);const l=performance.now();B.value=`${l-o} ms`;const n=performance.now();b.value=await C(s);const a=performance.now();u.value=`${a-n} ms`}async function g(p){return new Promise(s=>{const o=new FileReader;o.addEventListener("load",function(){typeof this.result=="string"&&s(this.result)}),o.readAsDataURL(p)})}async function C(p){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=await p.arrayBuffer(),l=new Uint8Array(o);let n="",a=0,f=Math.floor(l.length/3)*3;for(;a<f;){let F=l[a]<<16|l[a+1]<<8|l[a+2];n+=s[F>>18],n+=s[F>>12&63],n+=s[F>>6&63],n+=s[F&63],a+=3}const r=l.length-a;if(r===0)return"data:image/png;base64,"+n;let c=l[a]<<16;return r===2&&(c|=l[a+1]<<8),n+=s[c>>18],n+=s[c>>12&63],r===2?(n+=s[c>>6&63],n+="="):r===1&&(n+="=="),"data:image/png;base64,"+n}return(p,s)=>(D(),i(q,null,[e("input",{type:"file",accept:"image/*",onChange:m},null,32),t.value?(D(),i("p",S,[A(" 耗时："+E(B.value)+" ",1),e("img",{src:t.value,width:"200",height:"200",alt:""},null,8,R)])):d("",!0),b.value?(D(),i("p",P,[A(" 耗时："+E(u.value)+" ",1),e("img",{src:b.value,width:"200",height:"200",alt:""},null,8,k)])):d("",!0)],64))}}),T=e("h2",{id:"playground",tabindex:"-1"},[A("Playground "),e("a",{class:"header-anchor",href:"#playground","aria-label":'Permalink to "Playground"'},"​")],-1),N=e("p",null,"你可以先在下方区域体验一下功能，它会分别以原生和我自己定义的编码函数将选择的图片编码。",-1),U=w("",31),O=JSON.parse('{"title":"手写 base64 编码","description":"通过手写 base64 编码，了解为什么编码后会增加三分之一大小","frontmatter":{"title":"手写 base64 编码","description":"通过手写 base64 编码，了解为什么编码后会增加三分之一大小","date":"2023-05-10T06:04:54.000Z","tags":["算法","Javascript"],"layout":"post","cover":{"image":"/vp-blog/covers/js.png"}},"headers":[],"relativePath":"docs/posts/base64.md","filePath":"docs/posts/base64.md","lastUpdated":1701855198000}'),L={name:"docs/posts/base64.md"},$=Object.assign(L,{setup(h){return(t,B)=>(D(),i("div",null,[T,N,_(V),U]))}});export{O as __pageData,$ as default};
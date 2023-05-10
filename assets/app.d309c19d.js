import{a5 as xt,d as J,o as g,c as $,C as m,I as A,e as f,D as G,_ as Q,u as X,b as Mt,q as lt,F as P,R as nt,G as I,t as j,a as F,S as pt,U as ht,J as mt,a6 as St,Q as at,a7 as bt,k as kt,s as Dt,a8 as Tt,a9 as Ct,aa as Ot,ab as jt,ac as At,ad as Vt,ae as Ht,af as Nt,ag as Bt,ah as It,ai as Et,aj as Lt,ak as Pt,M as Zt}from"./chunks/framework.09b837aa.js";import{u as Rt,a as Yt,V as zt,_ as Ft,b as Jt,t as Wt}from"./chunks/theme.a967dcd6.js";var Ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function Gt(n){if(n.__esModule)return n;var l=n.default;if(typeof l=="function"){var a=function u(){if(this instanceof u){var h=[null];h.push.apply(h,arguments);var w=Function.bind.apply(l,h);return new w}return l.apply(this,arguments)};a.prototype=l.prototype}else a={};return Object.defineProperty(a,"__esModule",{value:!0}),Object.keys(n).forEach(function(u){var h=Object.getOwnPropertyDescriptor(n,u);Object.defineProperty(a,u,h.get?h:{enumerable:!0,get:function(){return n[u]}})}),a}const K=Gt(xt),{createElementVNode:Qt,openBlock:Xt,createElementBlock:Kt}=K;var te=function(l,a){return Xt(),Kt("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[Qt("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"})])};const{createElementVNode:ee,openBlock:re,createElementBlock:ne}=K;var ae=function(l,a){return re(),ne("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[ee("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"})])};const{createElementVNode:se,openBlock:oe,createElementBlock:ie}=K;var ce=function(l,a){return oe(),ie("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[se("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"})])};const{createElementVNode:le,openBlock:ue,createElementBlock:de}=K;var pe=function(l,a){return ue(),de("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[le("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"})])},he=te,ft=ae,me=ce,fe=pe;const ve={class:"header"},ge={class:"container"},_e={class:"appearance flex items-center"},ye=J({__name:"Navbar",setup(n){const l=Rt(),a=Yt(l);async function u(h){if(!document.startViewTransition){a();return}const w=document.startViewTransition(()=>{a()}),x=(h==null?void 0:h.clientX)??innerWidth/2,M=(h==null?void 0:h.clientY)??innerHeight/2,T=Math.hypot(Math.max(x,innerWidth-x),Math.max(M,innerHeight-M));await w.ready,document.documentElement.animate({clipPath:[`circle(0 at ${x}px ${M}px)`,`circle(${T}px at ${x}px ${M}px)`]},{duration:500,easing:"ease-in",pseudoElement:"::view-transition-new(root)"})}return(h,w)=>(g(),$("header",ve,[m("div",ge,[A(zt),A(Ft),m("div",_e,[m("a",{href:"javascript:void(0);",onClick:u},[f(l)?(g(),G(f(me),{key:1,class:"w-6"})):(g(),G(f(fe),{key:0,class:"w-6"}))])]),A(Jt,{class:"social-links"})])]))}});const $e=Q(ye,[["__scopeId","data-v-f3888057"]]),ut=JSON.parse('[{"title":"两数之和","description":"Leetcode 1","cover":{"image":"/vp-blog/covers/06.jpeg"},"url":"/docs/两数之和.html","excerpt":"","date":{"time":1683716039000,"string":"2023-05-10 10:53:59"},"frontmatter":{"title":"两数之和","description":"Leetcode 1","date":"2023-05-10T10:53:59.000Z","tags":["算法"],"layout":"post","cover":{"image":"/vp-blog/covers/06.jpeg"}}},{"title":"三数之和","description":"Leetcode 15","cover":{"image":"/vp-blog/covers/06/jpeg"},"url":"/docs/三数之和.html","excerpt":"","date":{"time":1683674156000,"string":"2023-05-09 23:15:56"},"frontmatter":{"title":"三数之和","description":"Leetcode 15","date":"2023-05-09T23:15:56.000Z","tags":["算法"],"layout":"draft","cover":{"image":"/vp-blog/covers/06/jpeg"}}},{"title":"盛最多水的容器","description":"Leetcode 11","cover":{"image":"/vp-blog/covers/06/jpeg"},"url":"/docs/力扣-11-盛最多水的容器.html","excerpt":"","date":{"time":1683552947000,"string":"2023-05-08 13:35:47"},"frontmatter":{"title":"盛最多水的容器","description":"Leetcode 11","date":"2023-05-08T13:35:47.000Z","tags":["算法"],"layout":"post","cover":{"image":"/vp-blog/covers/06/jpeg"}}},{"title":"接雨水","description":"Leetcode 42","cover":{"image":"/vp-blog/covers/06/jpeg"},"url":"/docs/力扣-42-接雨水.html","excerpt":"","date":{"time":1683550260000,"string":"2023-05-08 12:51:00"},"frontmatter":{"title":"接雨水","description":"Leetcode 42","date":"2023-05-08T12:51:00.000Z","tags":["算法"],"layout":"post","cover":{"image":"/vp-blog/covers/06/jpeg"}}},{"title":"实践一个大文件上传","url":"/docs/大文件上传.html","excerpt":"","date":{"time":1683464177000,"string":"2023-05-07 12:56:17"},"frontmatter":{"title":"实践一个大文件上传","date":"2023-05-07T12:56:17.000Z","tags":["Javascript","go"],"layout":"post"}},{"title":"震惊，这段代码居然有 4 种执行结果","url":"/docs/震惊，这段代码居然后有 4  种执行结果.html","excerpt":"","date":{"time":1683288879000,"string":"2023-05-05 12:14:39"},"frontmatter":{"title":"震惊，这段代码居然有 4 种执行结果","date":"2023-05-05T12:14:39.000Z","tags":["Javascript"],"layout":"post"}},{"title":"仿一个 AppStore 效果","url":"/docs/仿一个-AppStore-效果.html","excerpt":"","date":{"time":1683200658000,"string":"2023-05-04 11:44:18"},"frontmatter":{"title":"仿一个 AppStore 效果","date":"2023-05-04T11:44:18.000Z","tags":["Vue","Javascript"],"layout":"post"}},{"title":"React Strict Mode 的作用","description":"为什么我的 useEffect 执行了两次","url":"/docs/React-Strict-Mode-的作用.html","excerpt":"","date":{"time":1683104119000,"string":"2023-05-03 08:55:19"},"frontmatter":{"title":"React Strict Mode 的作用","description":"为什么我的 useEffect 执行了两次","date":"2023-05-03T08:55:19.000Z","tags":["React.js","Javascript"],"layout":"post"}},{"title":"null 和 undefined 的区别","description":"看看祖师爷是怎么说的","cover":{"image":"/vp-blog/covers/05.png"},"url":"/docs/null-和-undefined-的区别.html","excerpt":"","date":{"time":1683025565000,"string":"2023-05-02 11:06:05"},"frontmatter":{"title":"null 和 undefined 的区别","description":"看看祖师爷是怎么说的","date":"2023-05-02T11:06:05.000Z","tags":["Javascript"],"layout":"post","cover":{"image":"/vp-blog/covers/05.png"}}},{"title":"在 gin 项目中使用 swagger","url":"/docs/在-gin-项目中使用-swagger.html","excerpt":"","date":{"time":1682416643000,"string":"2023-04-25 09:57:23"},"frontmatter":{"title":"在 gin 项目中使用 swagger","date":"2023-04-25T09:57:23.000Z","tags":["go","gin"],"layout":"post"}},{"title":"Node.js 打通微信小程序支付","url":"/docs/Node-js-打通微信小程序支付.html","excerpt":"","date":{"time":1682259908000,"string":"2023-04-23 14:25:08"},"frontmatter":{"title":"Node.js 打通微信小程序支付","date":"2023-04-23T14:25:08.000Z","tags":["微信小程序","Node.js","Javascript"],"layout":"post"}},{"title":"Flutter 与 iOS 通信：MethodChannel","url":"/docs/Flutter-与-iOS-通信：MethodChannel.html","excerpt":"","date":{"time":1682246324000,"string":"2023-04-23 10:38:44"},"frontmatter":{"title":"Flutter 与 iOS 通信：MethodChannel","date":"2023-04-23T10:38:44.000Z","tags":["Flutter","iOS","Swift"],"layout":"post"}},{"title":"Flutter 与 iOS 通信: BasicMessageChannel","url":"/docs/Flutter-与-iOS-通信-BasicMessageChannel.html","excerpt":"","date":{"time":1682165100000,"string":"2023-04-22 12:05:00"},"frontmatter":{"title":"Flutter 与 iOS 通信: BasicMessageChannel","date":"2023-04-22T12:05:00.000Z","tags":["Flutter","iOS","Swift"],"layout":"post"}},{"title":"手写 min-vue-router","url":"/docs/手写-min-vue-router.html","excerpt":"","date":{"time":1682074163000,"string":"2023-04-21 10:49:23"},"frontmatter":{"title":"手写 min-vue-router","date":"2023-04-21T10:49:23.000Z","tags":["Vue","Vue-router"],"layout":"post"}},{"title":"使 a === 1 && a === 2 && a === 3 为 true 的几种\\"下毒\\"方法","url":"/docs/a-1-a-2-a-3-的几种下毒方法.html","excerpt":"","date":{"time":1682013146000,"string":"2023-04-20 17:52:26"},"frontmatter":{"title":"使 a === 1 && a === 2 && a === 3 为 true 的几种\\"下毒\\"方法","date":"2023-04-20T17:52:26.000Z","tags":["Javascript"],"layout":"post"}},{"title":"Swift 原生应用与 WebView 互相通信","url":"/docs/Swift-原生应用与-WebView-互相通信.html","excerpt":"","date":{"time":1681989033000,"string":"2023-04-20 11:10:33"},"frontmatter":{"title":"Swift 原生应用与 WebView 互相通信","date":"2023-04-20T11:10:33.000Z","tags":["Swift","Javascript","iOS"],"layout":"post"}},{"title":"转换成小写字母，看看 ASCII 码的巧妙设计","description":"力扣 709，看看 ASCII 码的巧妙设计","cover":{"image":"/vp-blog/covers/06/jpeg"},"url":"/docs/Leetcode-709-转换成小写字母-看看-ASCII-码的巧妙设计.html","excerpt":"","date":{"time":1681723891000,"string":"2023-04-17 09:31:31"},"frontmatter":{"title":"转换成小写字母，看看 ASCII 码的巧妙设计","description":"力扣 709，看看 ASCII 码的巧妙设计","date":"2023-04-17T09:31:31.000Z","tags":["算法","位运算"],"layout":"post","cover":{"image":"/vp-blog/covers/06/jpeg"}}},{"title":"如何命名 ts 中的类型","url":"/docs/如何命名-ts-中的类型.html","excerpt":"","date":{"time":1681650736000,"string":"2023-04-16 13:12:16"},"frontmatter":{"title":"如何命名 ts 中的类型","date":"2023-04-16T13:12:16.000Z","tags":["Typescript"],"layout":"post"}},{"title":"iOS Swift 工程集成 React Native","url":"/docs/ios-swift-工程集成-react-native.html","excerpt":"","date":{"time":1681499629000,"string":"2023-04-14 19:13:49"},"frontmatter":{"title":"iOS Swift 工程集成 React Native","date":"2023-04-14T19:13:49.000Z","tags":["React Native","Swift","iOS"],"layout":"post"}},{"title":"Element Plus 文档导航效果模仿","url":"/docs/Element-Plus-文档导航效果模仿.html","excerpt":"","date":{"time":1681374319000,"string":"2023-04-13 08:25:19"},"frontmatter":{"title":"Element Plus 文档导航效果模仿","date":"2023-04-13T08:25:19.000Z","tags":["CSS"],"layout":"post"}},{"title":"常用的术语及英文缩写","description":"不定期更新","url":"/docs/常用的术语及英文缩写.html","excerpt":"","date":{"time":1681295576000,"string":"2023-04-12 10:32:56"},"frontmatter":{"title":"常用的术语及英文缩写","description":"不定期更新","date":"2023-04-12T10:32:56.000Z","tags":["计算机"],"layout":"post"}},{"title":"记一次 RN 第三方组件 react-native-htmlview 问题排查","url":"/docs/记一次-RN-第三方组件问题排查.html","excerpt":"","date":{"time":1681237200000,"string":"2023-04-11 18:20:00"},"frontmatter":{"title":"记一次 RN 第三方组件 react-native-htmlview 问题排查","date":"2023-04-11T18:20:00.000Z","tags":["React Native"],"layout":"post"}},{"title":"经典排序算法之冒泡排序","description":"我的冒泡排序原来一直写错了","cover":{"image":"/vp-blog/covers/06/jpeg"},"url":"/docs/冒泡排序.html","excerpt":"","date":{"time":1681043602000,"string":"2023-04-09 12:33:22"},"frontmatter":{"title":"经典排序算法之冒泡排序","description":"我的冒泡排序原来一直写错了","date":"2023-04-09T12:33:22.000Z","tags":["算法","排序"],"layout":"post","cover":{"image":"/vp-blog/covers/06/jpeg"}}}]'),st=n=>(pt("data-v-c09543ac"),n=n(),ht(),n),we=["href"],xe={class:"overflow-hidden"},Me=["src"],Se={class:"flex-shrink-0 flex-grow flex flex-col"},be={class:"text-xl font-semibold mb-3"},ke={key:0,class:"text-gray-500"},De=st(()=>m("div",{class:"flex-grow"},null,-1)),Te={class:"flex gap-2"},Ce={class:"flex gap-2 items-center text-sm"},Oe={class:"flex gap-2"},je={class:"flex justify-center p-4"},Ae=["disabled"],Ve=st(()=>m("svg",{"aria-hidden":"true",class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[m("path",{"fill-rule":"evenodd",d:"M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1)),He=["disabled"],Ne=st(()=>m("svg",{"aria-hidden":"true",class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[m("path",{"fill-rule":"evenodd",d:"M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)),Be=J({__name:"Home",setup(n){const{site:l}=X(),a=Mt(1),u=10,h=lt(()=>{const T=(a.value-1)*u;return ut.slice(T,T+u)}),w=lt(()=>Math.ceil(ut.length/u));function x(){a.value>1&&a.value--}function M(){a.value<w.value&&a.value++}return(T,C)=>(g(),$(P,null,[m("div",null,[(g(!0),$(P,null,nt(f(h),b=>(g(),$("a",{href:f(l).base.slice(0,-1)+b.url,key:b.url,class:"border my-4 flex gap-4 h-36 p-4 rounded-md"},[m("div",xe,[b.cover?(g(),$("img",{key:0,src:b.cover.image,class:"w-48 object-cover"},null,8,Me)):I("",!0)]),m("div",Se,[m("h1",be,j(b.title),1),b.description?(g(),$("div",ke,j(b.description),1)):I("",!0),De,m("div",Te,[m("div",Ce,[A(f(ft),{class:"w-4 h-4"}),F(" 发表于 "+j(b.date.string),1)]),m("div",Oe,[(g(!0),$(P,null,nt(b.frontmatter.tags,k=>(g(),$("span",{class:"tag",key:k},j(k),1))),128))])])])],8,we))),128))]),m("div",je,[a.value!==1?(g(),$("button",{key:0,onClick:x,disabled:a.value===1,class:"inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},[Ve,F(" 上一页 ")],8,Ae)):I("",!0),a.value!==f(w)?(g(),$("button",{key:1,onClick:M,disabled:a.value===f(w),class:"inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},[F(" 下一页 "),Ne],8,He)):I("",!0)])],64))}});const Ie=Q(Be,[["__scopeId","data-v-c09543ac"]]);var vt={exports:{}};(function(n,l){(function(a,u){n.exports=u()})(Ut,function(){var a=1e3,u=6e4,h=36e5,w="millisecond",x="second",M="minute",T="hour",C="day",b="week",k="month",ot="quarter",V="year",E="date",it="Invalid Date",_t=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,yt=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$t={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},tt=function(s,r,t){var o=String(s);return!o||o.length>=r?s:""+Array(r+1-o.length).join(t)+s},wt={s:tt,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),o=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+tt(o,2,"0")+":"+tt(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var o=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(o,k),c=t-e<0,i=r.clone().add(o+(c?-1:1),k);return+(-(o+(t-e)/(c?e-i:i-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:k,y:V,w:b,d:C,D:E,h:T,m:M,s:x,ms:w,Q:ot}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},R="en",B={};B[R]=$t;var et=function(s){return s instanceof U},W=function s(r,t,o){var e;if(!r)return R;if(typeof r=="string"){var c=r.toLowerCase();B[c]&&(e=c),t&&(B[c]=t,e=c);var i=r.split("-");if(!e&&i.length>1)return s(i[0])}else{var d=r.name;B[d]=r,e=d}return!o&&e&&(R=e),e||!o&&R},y=function(s,r){if(et(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new U(t)},p=wt;p.l=W,p.i=et,p.w=function(s,r){return y(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var U=function(){function s(t){this.$L=W(t.locale,null,!0),this.parse(t)}var r=s.prototype;return r.parse=function(t){this.$d=function(o){var e=o.date,c=o.utc;if(e===null)return new Date(NaN);if(p.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(_t);if(i){var d=i[2]-1||0,_=(i[7]||"0").substring(0,3);return c?new Date(Date.UTC(i[1],d,i[3]||1,i[4]||0,i[5]||0,i[6]||0,_)):new Date(i[1],d,i[3]||1,i[4]||0,i[5]||0,i[6]||0,_)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return p},r.isValid=function(){return this.$d.toString()!==it},r.isSame=function(t,o){var e=y(t);return this.startOf(o)<=e&&e<=this.endOf(o)},r.isAfter=function(t,o){return y(t)<this.startOf(o)},r.isBefore=function(t,o){return this.endOf(o)<y(t)},r.$g=function(t,o,e){return p.u(t)?this[o]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,o){var e=this,c=!!p.u(o)||o,i=p.p(t),d=function(L,D){var N=p.w(e.$u?Date.UTC(e.$y,D,L):new Date(e.$y,D,L),e);return c?N:N.endOf(C)},_=function(L,D){return p.w(e.toDate()[L].apply(e.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(D)),e)},v=this.$W,S=this.$M,H=this.$D,O="set"+(this.$u?"UTC":"");switch(i){case V:return c?d(1,0):d(31,11);case k:return c?d(1,S):d(0,S+1);case b:var Y=this.$locale().weekStart||0,z=(v<Y?v+7:v)-Y;return d(c?H-z:H+(6-z),S);case C:case E:return _(O+"Hours",0);case T:return _(O+"Minutes",1);case M:return _(O+"Seconds",2);case x:return _(O+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,o){var e,c=p.p(t),i="set"+(this.$u?"UTC":""),d=(e={},e[C]=i+"Date",e[E]=i+"Date",e[k]=i+"Month",e[V]=i+"FullYear",e[T]=i+"Hours",e[M]=i+"Minutes",e[x]=i+"Seconds",e[w]=i+"Milliseconds",e)[c],_=c===C?this.$D+(o-this.$W):o;if(c===k||c===V){var v=this.clone().set(E,1);v.$d[d](_),v.init(),this.$d=v.set(E,Math.min(this.$D,v.daysInMonth())).$d}else d&&this.$d[d](_);return this.init(),this},r.set=function(t,o){return this.clone().$set(t,o)},r.get=function(t){return this[p.p(t)]()},r.add=function(t,o){var e,c=this;t=Number(t);var i=p.p(o),d=function(S){var H=y(c);return p.w(H.date(H.date()+Math.round(S*t)),c)};if(i===k)return this.set(k,this.$M+t);if(i===V)return this.set(V,this.$y+t);if(i===C)return d(1);if(i===b)return d(7);var _=(e={},e[M]=u,e[T]=h,e[x]=a,e)[i]||1,v=this.$d.getTime()+t*_;return p.w(v,this)},r.subtract=function(t,o){return this.add(-1*t,o)},r.format=function(t){var o=this,e=this.$locale();if(!this.isValid())return e.invalidDate||it;var c=t||"YYYY-MM-DDTHH:mm:ssZ",i=p.z(this),d=this.$H,_=this.$m,v=this.$M,S=e.weekdays,H=e.months,O=function(D,N,rt,q){return D&&(D[N]||D(o,c))||rt[N].slice(0,q)},Y=function(D){return p.s(d%12||12,D,"0")},z=e.meridiem||function(D,N,rt){var q=D<12?"AM":"PM";return rt?q.toLowerCase():q},L={YY:String(this.$y).slice(-2),YYYY:this.$y,M:v+1,MM:p.s(v+1,2,"0"),MMM:O(e.monthsShort,v,H,3),MMMM:O(H,v),D:this.$D,DD:p.s(this.$D,2,"0"),d:String(this.$W),dd:O(e.weekdaysMin,this.$W,S,2),ddd:O(e.weekdaysShort,this.$W,S,3),dddd:S[this.$W],H:String(d),HH:p.s(d,2,"0"),h:Y(1),hh:Y(2),a:z(d,_,!0),A:z(d,_,!1),m:String(_),mm:p.s(_,2,"0"),s:String(this.$s),ss:p.s(this.$s,2,"0"),SSS:p.s(this.$ms,3,"0"),Z:i};return c.replace(yt,function(D,N){return N||L[D]||i.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,o,e){var c,i=p.p(o),d=y(t),_=(d.utcOffset()-this.utcOffset())*u,v=this-d,S=p.m(this,d);return S=(c={},c[V]=S/12,c[k]=S,c[ot]=S/3,c[b]=(v-_)/6048e5,c[C]=(v-_)/864e5,c[T]=v/h,c[M]=v/u,c[x]=v/a,c)[i]||v,e?S:p.a(S)},r.daysInMonth=function(){return this.endOf(k).$D},r.$locale=function(){return B[this.$L]},r.locale=function(t,o){if(!t)return this.$L;var e=this.clone(),c=W(t,o,!0);return c&&(e.$L=c),e},r.clone=function(){return p.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),ct=U.prototype;return y.prototype=ct,[["$ms",w],["$s",x],["$m",M],["$H",T],["$W",C],["$M",k],["$y",V],["$D",E]].forEach(function(s){ct[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),y.extend=function(s,r){return s.$i||(s(r,U,y),s.$i=!0),y},y.locale=W,y.isDayjs=et,y.unix=function(s){return y(1e3*s)},y.en=B[R],y.Ls=B,y.p={},y})})(vt);var Ee=vt.exports;const dt=qt(Ee),Le={class:"mt-32 text-center"},Pe={key:0,class:"m-4 text-gray-500"},Ze={class:"m-4 flex justify-center gap-4 text-gray-400"},Re={class:"icon-text"},Ye={key:0,class:"icon-text"},ze={class:"m-4 flex justify-center gap-2"},Fe={key:0,class:"border-solid border-2 p-1"},Je=["src"],We=J({__name:"Post",setup(n){const{site:l,page:a,frontmatter:u}=X();return(h,w)=>{const x=mt("Content");return g(),$(P,null,[m("header",Le,[m("h1",null,j(f(a).title),1),f(a).description?(g(),$("p",Pe,j(f(a).description),1)):I("",!0)]),m("div",Ze,[m("div",Re,[A(f(ft),{class:"icon"}),F(" 发表于 "+j(f(dt)(f(u).date).format("YYYY-MM-DD HH:mm:ss")),1)]),f(a).lastUpdated?(g(),$("div",Ye,[A(f(he),{class:"icon"}),F(" 更新于 "+j(f(dt)(f(a).lastUpdated).format("YYYY-MM-DD HH:mm:ss")),1)])):I("",!0)]),m("div",ze,[(g(!0),$(P,null,nt(f(u).tags,M=>(g(),$("span",{class:"tag",key:M},j(M),1))),128))]),f(u).cover?(g(),$("div",Fe,[m("img",{class:"w-full",src:f(u).cover.image,alt:""},null,8,Je)])):I("",!0),A(x,{class:"vp-doc prose"})],64)}}});const Ue=Q(We,[["__scopeId","data-v-6358aa0f"]]),qe=n=>(pt("data-v-31a1b38d"),n=n(),ht(),n),Ge={class:"container"},Qe={key:2},Xe=qe(()=>m("a",{href:"/"},"Home",-1)),Ke=J({__name:"TheLayout",setup(n){const{site:l,frontmatter:a}=X(),u=St();return u.onBeforeRouteChange=function(h){return new Promise(async w=>{if(!document.startViewTransition){w(h);return}document.startViewTransition(()=>{w(h)})})},(h,w)=>{const x=mt("Content");return g(),$(P,null,[A($e),m("div",Ge,[f(a).home?(g(),G(Ie,{key:0})):f(a).layout==="post"?(g(),G(Ue,{key:1})):(g(),$("div",Qe,[Xe,A(x)]))])],64)}}});const tr=Q(Ke,[["__scopeId","data-v-31a1b38d"]]),er={...Wt,Layout:tr};function gt(n){if(n.extends){const l=gt(n.extends);return{...l,...n,async enhanceApp(a){l.enhanceApp&&await l.enhanceApp(a),n.enhanceApp&&await n.enhanceApp(a)}}}return n}const Z=gt(er),rr=J({name:"VitePressApp",setup(){const{site:n}=X();return kt(()=>{Dt(()=>{document.documentElement.lang=n.value.lang,document.documentElement.dir=n.value.dir})}),Tt(),Ct(),Ot(),Z.setup&&Z.setup(),()=>jt(Z.Layout)}});async function nr(){const n=sr(),l=ar();l.provide(At,n);const a=Vt(n.route);return l.provide(Ht,a),l.component("Content",Nt),l.component("ClientOnly",Bt),Object.defineProperties(l.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),Z.enhanceApp&&await Z.enhanceApp({app:l,router:n,siteData:It}),{app:l,router:n,data:a}}function ar(){return Et(rr)}function sr(){let n=at,l;return Lt(a=>{let u=Pt(a);return n&&(l=u),(n||l===u)&&(u=u.replace(/\.js$/,".lean.js")),at&&(n=!1),Zt(()=>import(u),[])},Z.NotFound)}at&&nr().then(({app:n,router:l,data:a})=>{l.go().then(()=>{bt(l.route,a.site),n.mount("#app")})});export{nr as createApp};

(this.webpackJsonposa1=this.webpackJsonposa1||[]).push([[0],{15:function(t,e,n){t.exports=n(39)},38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),u=n(14),l=n(2),i=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return o.a.createElement("li",{className:"note"},e.content,o.a.createElement("button",{onClick:n},a))},m=function(t){var e=t.message;return null===e?null:o.a.createElement("div",{className:"error"},e)};m.defaultProps={message:null};var f=m,s=n(3),p=n.n(s),d=function(){return p.a.get("/api/notes").then((function(t){return t.data}))},E=function(t){return p.a.post("/api/notes",t).then((function(t){return t.data}))},b=function(t,e){return p.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},v=function(){return o.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},o.a.createElement("br",null),o.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},g=function(t){var e=Object(a.useState)([]),n=Object(l.a)(e,2),r=n[0],c=n[1],m=Object(a.useState)(""),s=Object(l.a)(m,2),p=s[0],g=s[1],h=Object(a.useState)(!0),O=Object(l.a)(h,2),j=O[0],S=O[1],k=Object(a.useState)(null),y=Object(l.a)(k,2),N=y[0],w=y[1];Object(a.useEffect)((function(){d().then((function(t){c(t)}))}),[]);var C=j?r:r.filter((function(t){return t.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(f,{message:N}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return S(!j)}},"show ",j?"important":"all")),o.a.createElement("ul",null,C.map((function(t){return o.a.createElement(i,{key:t.id,note:t,toggleImportance:function(){return function(t){console.log("importance of ",t," needs to be toggled");var e=r.find((function(e){return e.id===t})),n=Object(u.a)({},e,{important:!e.important});b(t,n).then((function(e){c(r.map((function(n){return n.id!==t?n:e})))})).catch((function(){w("Note '".concat(n.content,"' already deleted from server")),setTimeout((function(){w(null)}),5e3),c(r.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:p,date:(new Date).toISOString(),important:Math.random()>.5};E(e).then((function(t){c(r.concat(t)),g("")}))}},o.a.createElement("input",{value:p,onChange:function(t){console.log(t.target.value),g(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")),o.a.createElement(v,null))};n(38);c.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2ee2a4b9.chunk.js.map
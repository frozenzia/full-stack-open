(this.webpackJsonposa1=this.webpackJsonposa1||[]).push([[0],{16:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(3),l=n.n(u),i=n(15),s=n(2),m=function(e){var t=e.note,n=e.toggleImportance,a=t.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},t.content,r.a.createElement("button",{onClick:n},a))},f=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)};f.defaultProps={message:null};var p=f,d=function(e){var t=e.username,n=e.password,a=e.handleUsernameChange,o=e.handlePasswordChange,c=e.handleLogin;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"username",r.a.createElement("input",{type:"text",value:t,name:"Username",onChange:function(e){var t=e.target;return a(t.value)}})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"text",value:n,name:"Password",onChange:function(e){var t=e.target;return o(t.value)}})),r.a.createElement("button",{type:"submit"},"login"))},g=function(e){var t=e.newNote,n=e.handleNoteChange,a=e.addNote;return r.a.createElement("form",{onSubmit:a},r.a.createElement("input",{value:t,onChange:n}),r.a.createElement("button",{type:"submit"},"save"))},v=n(4),h=n.n(v),b=null,E=function(e){b="bearer ".concat(e)},w=function(){return h.a.get("/api/notes").then((function(e){return e.data}))},O=function(e){var t={headers:{authorization:b}};return h.a.post("/api/notes",e,t).then((function(e){return e.data}))},j=function(e,t){return h.a.put("".concat("/api/notes","/").concat(e),t).then((function(e){return e.data}))},S=function(e){var t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.a.awrap(h.a.post("/api/login",e));case 2:return t=n.sent,n.abrupt("return",t.data);case 4:case"end":return n.stop()}}))},y=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},N=function(e){var t=Object(a.useState)([]),n=Object(s.a)(t,2),o=n[0],c=n[1],u=Object(a.useState)(""),f=Object(s.a)(u,2),v=f[0],h=f[1],b=Object(a.useState)(!0),N=Object(s.a)(b,2),C=N[0],k=N[1],x=Object(a.useState)(null),I=Object(s.a)(x,2),U=I[0],D=I[1],P=Object(a.useState)(""),J=Object(s.a)(P,2),L=J[0],z=J[1],T=Object(a.useState)(""),B=Object(s.a)(T,2),H=B[0],M=B[1],q=Object(a.useState)(null),A=Object(s.a)(q,2),F=A[0],G=A[1];Object(a.useEffect)((function(){w().then((function(e){c(e)}))}),[]);var K=C?o:o.filter((function(e){return e.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(p,{message:U}),r.a.createElement("h2",null,"Login"),F?r.a.createElement("div",null,r.a.createElement("p",null,F.name," logged in"),r.a.createElement(g,{newNote:v,handleNoteChange:function(e){console.log(e.target.value),h(e.target.value)},addNote:function(e){e.preventDefault();var t={content:v,date:(new Date).toISOString(),important:Math.random()>.5};O(t).then((function(e){c(o.concat(e)),h("")}))}})):r.a.createElement(d,{username:L,password:H,handleUsernameChange:function(e){z(e)},handlePasswordChange:function(e){M(e)},handleLogin:function(e){var t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),n.prev=1,n.next=4,l.a.awrap(S({username:L,password:H}));case 4:t=n.sent,window.localStorage.setItem("loggedNoteappUser",JSON.stringify(t)),E(t.token),G(t),z(""),M(""),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(1),D("wrong creds"),setTimeout((function(){D(null)}),5e3);case 16:case"end":return n.stop()}}),null,null,[[1,12]])}}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return k(!C)}},"show ",C?"important":"all")),r.a.createElement("ul",null,K.map((function(e){return r.a.createElement(m,{key:e.id,note:e,toggleImportance:function(){return function(e){console.log("importance of ",e," needs to be toggled");var t=o.find((function(t){return t.id===e})),n=Object(i.a)({},t,{important:!t.important});j(e,n).then((function(t){c(o.map((function(n){return n.id!==e?n:t})))})).catch((function(){D("Note '".concat(n.content,"' already deleted from server")),setTimeout((function(){D(null)}),5e3),c(o.filter((function(t){return t.id!==e})))}))}(e.id)}})}))),r.a.createElement(y,null))};n(40);c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.3634d784.chunk.js.map
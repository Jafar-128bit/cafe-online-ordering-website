"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[746],{2746:function(t,n,e){e.r(n),e.d(n,{default:function(){return D}});var i=e(9434),o=e(2399),a=e(7689),s=e(1413),c=e(9439),r=e(2017),u=e(2571),l=e(4439),d=e(1034),_=e(7197),m=e(4390),h=e(3107),p=e(1087),v=e(2791),f=e(4665),x=e(184),j={initial:{x:0},animate:{x:[0,5,-5,3,-3,1,-1,0],transition:{ease:"easeIn",duration:.5}}},y={initial:{rotate:0},animate:{rotate:[0,5,-5,5,-5,5,-5,0],transition:{ease:"easeIn",duration:.45}}},z={hide:{y:-60},show:{y:0}},C=function(t){var n=t.theme,e=(0,i.I0)(),C=(0,a.s0)(),k=(0,a.TH)().pathname.split("/")[1],g=(0,i.v9)((function(t){return t.cartItems})),N=(0,i.v9)((function(t){return t.menuState.notificationMenuState})).State,S=(0,v.useState)(0),M=(0,c.Z)(S,2),I=M[0],b=M[1],T=(0,v.useState)(!1),Z=(0,c.Z)(T,2),Q=Z[0],E=Z[1],B=(0,v.useState)(null),A=(0,c.Z)(B,2),O=A[0],P=A[1],U=(0,v.useState)(!0),L=(0,c.Z)(U,2),W=L[0],w=L[1],H=(0,v.useState)(!1),D=(0,c.Z)(H,2),Y=D[0],V=D[1],G=function(){e((0,h.WR)({State:!N}))};(0,v.useEffect)((function(){b(g.map((function(t){return t.totalQuantity})).reduce((function(t,n){return t+n}),0)),E(!0),setTimeout((function(){E(!1)}),500),""===k?P(0):"menu"===k?P(1):"cart"===k?P(2):"event"===k&&P(3),w(""!==k)}),[g,k]),(0,v.useEffect)((function(){setInterval((function(){V(!1),setTimeout((function(){V(!0)}),500)}),15e3)}),[]);var K={color:"dark"===n?"var(--color04)":"var(--color02)",textDecoration:"none",textTransform:"uppercase",padding:"3px",margin:"0 10px",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"flex-start",justifyContent:"center",flexDirection:"column"};return(0,x.jsxs)("nav",{className:"navbar",children:[(0,x.jsx)("section",{className:"navbar__section_01",children:(0,x.jsxs)(o.E.button,{type:"button",className:"\n                    navbar__section_01__hideIconButton \n                    ".concat("dark"===n?"navbar__section_01__hideIconButton__dark":"navbar__section_01__hideIconButton__light","\n                    "),onClick:function(){e((0,h.WR)({State:!1})),C(-1)},variants:z,animate:W?"show":"hide",transition:{ease:"easeIn",duration:.25},children:[(0,x.jsx)(r.Z,{style:{color:"dark"===n?"var(--colorWhite)":"var(--colorBlack)",fontWeight:200}}),(0,x.jsx)("p",{children:"Go Back"})]})}),(0,x.jsxs)("section",{className:"navbar__section_02",children:[(0,x.jsxs)(p.OL,{to:"/",style:(0,s.Z)({},K),onClick:function(){return P(0)},children:["Home",(0,x.jsx)("div",{className:0===O?"navbar__section_02__line":"navbar__section_02__line__hide"})]}),(0,x.jsxs)(p.OL,{to:"/menu",style:(0,s.Z)({},K),onClick:function(){return P(1)},children:["Menu",(0,x.jsx)("div",{className:1===O?"navbar__section_02__line":"navbar__section_02__line__hide"})]}),(0,x.jsxs)(p.OL,{to:"/cart",style:(0,s.Z)({},K),onClick:function(){return P(2)},children:["Basket",(0,x.jsx)("div",{className:2===O?"navbar__section_02__line":"navbar__section_02__line__hide"})]}),(0,x.jsxs)(p.OL,{to:"/event",style:(0,s.Z)({},K),onClick:function(){return P(3)},children:["Event",(0,x.jsx)("div",{className:3===O?"navbar__section_02__line":"navbar__section_02__line__hide"})]})]}),(0,x.jsxs)("section",{className:"navbar__section_03",children:[(0,x.jsx)(o.E.button,{type:"button",className:"navbar__section_03__openMenuBtn",onClick:function(){return e((0,h.SN)({State:!0}))},children:(0,x.jsx)(m.Z,{style:{color:"dark"===n?"var(--colorWhite)":"var(--colorBlack)",fontSize:"35px",fontWeight:200}})}),(0,x.jsx)(o.E.button,{type:"button",className:"navbar__section_03__notificationMenuBtn",onClick:G,variants:y,initial:"initial",animate:Y?"animate":"",children:(0,x.jsx)(u.Z,{style:{color:"dark"===n?"var(--colorWhite)":"var(--colorBlack)",fontSize:"35px",fontWeight:200}})}),(0,x.jsxs)("button",{type:"button",className:"navbar__section_03__cartMenuBtn",onClick:G,children:[(0,x.jsx)(o.E.div,{className:"navbar__section_03__cartIcon",variants:j,animate:Q?"animate":"initial",transition:"transition",children:(0,x.jsx)(l.Z,{style:{color:"dark"===n?"var(--colorWhite)":"var(--colorBlack)",fontSize:"35px",fontWeight:200}})}),(0,x.jsx)(o.E.p,{className:"navbar__section_03__cart__indicator ".concat("dark"===n?"navbar__section_03__cart__indicator__dark":"navbar__section_03__cart__indicator__light"),animate:I>0?{y:0}:{y:-25},children:0===I?"1":I})]}),(0,x.jsxs)("button",{type:"button",onClick:function(){e("light"===n?(0,f._)({theme:"dark"}):(0,f._)({theme:"light"}))},className:"navbar__section_03__themeSwitcher",children:[(0,x.jsx)(o.E.div,{className:"themeSwitcherBackgroundNightMode",initial:{opacity:0},animate:"light"===n?{opacity:0}:{opacity:1},transition:{duration:.25}}),(0,x.jsx)(o.E.div,{className:"themeSwitcherBackgroundLightMode",initial:{opacity:1},animate:"dark"===n?{opacity:0}:{opacity:1},transition:{duration:.25}}),(0,x.jsxs)(o.E.div,{className:"navbar__section_03__themeSwitcher__nobe ".concat("dark"===n?"themeSwitcherBackgroundLightMode":"themeSwitcherBackgroundNightMode"),initial:{x:0},animate:"dark"===n?{x:30,rotate:180}:{x:0,rotate:0},transition:{ease:"easeOut",duration:.25},children:[(0,x.jsx)(d.Z,{style:{color:"var(--colorWhite)",fontSize:"14px",opacity:"light"===n?1:0,position:"absolute"}}),(0,x.jsx)(_.Z,{style:{color:"var(--colorBlack)",fontSize:"14px",opacity:"dark"===n?1:0,position:"absolute"}})]})]})]})]})},k=e(1598),g=e(5274),N=e(3965),S=e(2499),M={show:{x:0},hide:{x:-150}},I=function(){var t=(0,a.TH)().pathname,n=(0,a.s0)(),e=(0,i.I0)(),s=(0,v.useState)(0),r=(0,c.Z)(s,2),u=r[0],d=r[1],_=(0,i.v9)((function(t){return t.menuState.menuBarState})),m=(0,i.v9)((function(t){return t.cartItems})),p=(0,i.v9)((function(t){return t.themeSwitchSlices})).theme;(0,v.useEffect)((function(){d(m.map((function(t){return t.totalQuantity})).reduce((function(t,n){return t+n}),0))}),[m]);var f=[{id:1,optionName:"Home",optionIcon:"/"===t?(0,x.jsx)(g.Z,{style:{color:"var(--colorWhite)",zIndex:5,fontSize:"30px"}}):(0,x.jsx)(g.Z,{style:{color:"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontSize:"32px"}}),goto:""},{id:2,optionName:"Menu",optionIcon:"menu"===t.split("/")[1]?(0,x.jsx)(N.Z,{style:{color:"var(--colorWhite)",zIndex:5,fontSize:"30px"}}):(0,x.jsx)(N.Z,{style:{color:"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontSize:"32px"}}),goto:"menu"},{id:3,optionName:"Basket",optionIcon:"cart"===t.split("/")[1]?(0,x.jsx)(l.Z,{style:{color:"var(--colorWhite)",zIndex:5,fontSize:"30px"}}):(0,x.jsx)(l.Z,{style:{color:"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontSize:"32px"}}),goto:"cart"},{id:4,optionName:"Event",optionIcon:"event"===t.split("/")[1]?(0,x.jsx)(S.Z,{style:{color:"var(--colorWhite)",zIndex:5,fontSize:"30px"}}):(0,x.jsx)(S.Z,{style:{color:"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontSize:"32px"}}),goto:"event"}];return(0,x.jsxs)(o.E.nav,{className:"menubar ".concat("dark"===p?"menubar__dark":"menubar__light"),variants:M,animate:_.State?"show":"hide",transition:{ease:"easeInOut",duration:.25},children:[(0,x.jsx)("button",{type:"button",className:"menubar__closeBtn",onClick:function(){return e((0,h.SN)({State:!1}))},children:(0,x.jsx)(k.Z,{style:{color:"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontSize:"32px"}})}),(0,x.jsx)("div",{className:"menubar__container",children:f.map((function(i){return(0,x.jsxs)(o.E.div,{className:"menubar__option",onClick:function(){return t=i.goto,n(t),void e((0,h.SN)({State:!1}));var t},whileTap:{scale:.8},transition:{type:"spring",stiffness:350,damping:25,duration:.1},children:[i.optionIcon,(0,x.jsx)(o.E.div,{className:"menubar__option__sudoElement \n                                ".concat("dark"===p?"menubar__option__sudoElement__dark":"menubar__option__sudoElement__light"),initial:{opacity:0},animate:t.split("/")[1]===i.goto?{opacity:1}:{opacity:0},transition:{ease:"easeOut",duration:.15}}),"Basket"===i.optionName&&(0,x.jsx)(o.E.p,{className:"menubar__option__cartQuantity \n                                    ".concat("dark"===p?"menubar__option__cartQuantity__dark":"menubar__option__cartQuantity__light"),initial:{y:-20},animate:u>0?{y:0}:{y:-20},children:u>0?u:1}),(0,x.jsx)("p",{className:"menubar__option__optionName",style:{color:t.split("/")[1]===i.goto||"dark"===p?"var(--colorWhite)":"var(--colorBlack)",fontWeight:t.split("/")[1]===i.goto?700:300},children:i.optionName})]},i.id)}))})]})},b=e(3433),T=e(6544),Z=e(2132),Q=e(4624),E=[].concat((0,b.Z)(T.ZG),(0,b.Z)(T.Fz),(0,b.Z)(T.Il),(0,b.Z)(T.dS),(0,b.Z)(T.LL),(0,b.Z)(T.QA),(0,b.Z)(T.eh),(0,b.Z)(T.T1)),B=function(t){var n=t.quantity,e=t.subTotal,i=t.navigate,o=t.closeNotificationMenu,a=t.themeMode;return(0,x.jsxs)("div",{className:"cartInfoCard",children:[(0,x.jsx)("h4",{className:"cartInfoCard__title \n                    ".concat("dark"===a?"cartInfoCard__title__dark":"cartInfoCard__title__light"),children:"Basket info"}),0!==n&&(0,x.jsxs)("div",{className:"cartInfoCard__cartItems \n                        ".concat("dark"===a?"cartInfoCard__cartItems__dark":"cartInfoCard__cartItems__light"),children:[(0,x.jsx)("p",{children:"Your basket is brimming with a delightful assortment of total"}),(0,x.jsxs)("span",{children:[(0,x.jsx)("p",{children:n>10?n:"0".concat(n)}),(0,x.jsx)("p",{children:"Items"})]})]}),0!==n&&(0,x.jsxs)("div",{className:"cartInfoCard__cartItems \n                        ".concat("dark"===a?"cartInfoCard__cartItems__dark":"cartInfoCard__cartItems__light"),children:[(0,x.jsxs)("p",{children:["With ",n," items in your basket, your subtotal is a delightful"]}),(0,x.jsxs)("span",{children:[(0,x.jsxs)("p",{children:[(0,x.jsx)("small",{children:"\u20b9"}),e>10?e:"0".concat(e)]}),(0,x.jsx)("p",{children:"only"})]})]}),0===n&&(0,x.jsx)("p",{className:"cartInfoCard__cartEmptyMessage \n                        ".concat("dark"===a?"cartInfoCard__cartEmptyMessage__dark":"cartInfoCard__cartEmptyMessage__light"),children:"Start your culinary adventure! Your basket is brimming with tempting delights, and your subtotal is ready to be discovered. Begin your feast now!"}),(0,x.jsx)("button",{type:"button",className:"cartInfoCard__basketLinkBtn \n                    ".concat("dark"===a?"cartInfoCard__basketLinkBtn__dark":"cartInfoCard__basketLinkBtn__light"),onClick:function(){o(),i("".concat(n>0?"/cart":"/menu"))},children:n>0?"Goto Basket?":"Explore Menu!"})]})},A=function(t){var n=t.couponCode,e=t.discount,i=t.couponType,o=t.validProductIDs,a=t.purchaseLimit,s=t.closeNotificationMenu,r=t.navigate,u=t.dispatch,l=t.themeMode,d=(0,v.useState)([]),_=(0,c.Z)(d,2),m=_[0],h=_[1];(0,v.useEffect)((function(){if("on-Product"===i){var t=E.filter((function(t){return null===o||void 0===o?void 0:o.includes(t.id)}));h((0,b.Z)(t))}else h([])}),[o,i]);return(0,x.jsxs)("div",{className:"couponInfoCard__details \n                ".concat("dark"===l?"couponInfoCard__details__dark":"couponInfoCard__details__light"),children:[(0,x.jsxs)("div",{className:"couponInfoCard__details__discount \n                    ".concat("dark"===l?"couponInfoCard__details__discount__dark":"couponInfoCard__details__discount__light"),children:[(0,x.jsxs)("p",{children:[e,"%"]}),(0,x.jsx)("p",{children:"OFF"})]}),(0,x.jsxs)("div",{className:"couponInfoCard__details__Info",children:[(0,x.jsxs)("div",{className:"couponInfoCard__details__message \n                        ".concat("dark"===l?"couponInfoCard__details__message__dark":"couponInfoCard__details__message__light"),children:["on-Product"===i&&(0,x.jsxs)("p",{children:["Unlock a delightful ",e,"% off \u2013 a delightful treat for your basket items awaits!"]}),"on-Purchase"===i&&(0,x.jsxs)("p",{children:["Unlock an exclusive ",e,"% discount on your order when you spend over \u20b9",a,"!"]})]}),(0,x.jsxs)("div",{className:"couponInfoCard__details__couponCode \n                        ".concat("dark"===l?"couponInfoCard__details__couponCode__dark":"couponInfoCard__details__couponCode__light"),children:[(0,x.jsx)("p",{children:n}),(0,x.jsx)("button",{type:"button",onClick:function(){s(),"on-Product"===i?(u((0,Q.a_)(m)),r("/menu/offerProducts")):r("/menu")},children:"on-Product"===i?"Explore!":"Shop More!"})]})]})]})},O=function(t){var n=t.theme,e=(0,i.I0)(),s=(0,a.s0)(),r=(0,v.useState)(0),u=(0,c.Z)(r,2),l=u[0],d=u[1],_=(0,v.useState)(0),m=(0,c.Z)(_,2),p=m[0],f=m[1],j=(0,v.useState)([]),y=(0,c.Z)(j,2),z=y[0],C=y[1],g=(0,i.v9)((function(t){return t.cartItems})),N=(0,i.v9)((function(t){return t.menuState.notificationMenuState})),S=N.State,M=N.zIndex,I=function(){return e((0,h.WR)({State:!1}))};return(0,v.useEffect)((function(){d(g.map((function(t){return t.totalQuantity})).reduce((function(t,n){return t+n}),0)),f(g.map((function(t){return t.totalPrice})).reduce((function(t,n){return t+n}),0))}),[e,g]),(0,v.useEffect)((function(){setInterval((function(){var t=(0,Z.qB)(3,1,T.uD.length-1),n=T.uD.filter((function(n){return t.some((function(t){return t===n.id}))&&(0,Z.O)(n.endDate,!0)}));C((0,b.Z)(n))}),15e3)}),[]),(0,x.jsxs)(o.E.div,{className:"notificationMenu noScroll\n                ".concat("dark"===n?"darkGlass50":"whiteGlass50"),style:{zIndex:M},initial:{opacity:0,y:0},animate:S?{opacity:1,y:0}:{opacity:0,y:-450},transition:{ease:"easeOut",duration:.3},children:[(0,x.jsx)("button",{type:"button",className:"notificationMenu__closeBtn \n                    ".concat("dark"===n?"notificationMenu__closeBtn__dark":"notificationMenu__closeBtn__light"),onClick:I,children:(0,x.jsx)(k.Z,{style:{color:"dark"===n?"var(--colorBlack)":"var(--colorWhite)",fontSize:"21.7px"}})}),(0,x.jsx)("h3",{className:"notificationMenu__title \n                ".concat("dark"===n?"notificationMenu__title__dark":"notificationMenu__title__light"),children:"Info Area"}),(0,x.jsx)(B,{themeMode:n,quantity:l,subTotal:p,navigate:s,closeNotificationMenu:I}),(0,x.jsxs)("div",{className:"couponInfoCard",children:[(0,x.jsx)("h4",{className:"couponInfoCard__title \n                        ".concat("dark"===n?"couponInfoCard__title__dark":"couponInfoCard__title__light"),children:"Available Coupons"}),z.map((function(t,i){return(0,x.jsx)(A,{index:i,themeMode:n,couponCode:t.couponCode,discount:t.discount,couponType:t.type,validProductIDs:null===t||void 0===t?void 0:t.validProduct,purchaseLimit:null===t||void 0===t?void 0:t.purchaseLimit,navigate:s,closeNotificationMenu:I,dispatch:e},t.id+i)}))]})]})},P=e(8054),U=e(1241),L=e(7432),W=e(5224),w=function(t){var n=t.data,e=(0,i.I0)(),a=(0,v.useState)(""),s=(0,c.Z)(a,2),r=s[0],u=s[1],l=(0,i.v9)((function(t){return t.cartItems})),d=n.customizeOptions,_=n.subCategories;(0,v.useEffect)((function(){u(l.find((function(t){return t.id===n.id})).customizeOptions[0].message)}),[l,n.id]);var m=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=e.map((function(t,n){return t.price*i[n].eatQuantity})).reduce((function(t,n){return t+n}),0),a=e.map((function(t,n){return t.price*i[n].packQuantity})).reduce((function(t,n){return t+n}),0);return t?n:o+a},h=function(){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:""){case"EAT-QUANTITY":var o;if("dec"===t&&n.totalQuantity>1)o=n.customizeOptions[i].eatQuantity-1;else{if("inc"!==t)return;o=n.customizeOptions[i].eatQuantity+1}e((0,W.xu)({actionType:"UPDATE-EAT-QUANTITY",actionData:{id:n.id,data:o,index:i}}));break;case"PACK-QUANTITY":var a;if("dec"===t&&n.totalQuantity>1)a=n.customizeOptions[i].packQuantity-1;else{if("inc"!==t)return;a=n.customizeOptions[i].packQuantity+1}e((0,W.xu)({actionType:"UPDATE-PACK-QUANTITY",actionData:{id:n.id,data:a,index:i}}));break;default:return}},p=function(){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:""){case"TOTAL-QUANTITY":var i;if("dec"===t&&n.totalQuantity>1)i=n.totalQuantity-1;else{if("inc"!==t)return;i=n.totalQuantity+1}e((0,W.xu)({actionType:"UPDATE-TOTAL-QUANTITY",actionData:{id:n.id,data:i}}));break;case"CANDLE-QUANTITY":var o;if("dec"===t&&n.customizeOptions[1].candlesQuantity>1)o=n.customizeOptions[1].candlesQuantity-2;else{if("inc"!==t)return;o=n.customizeOptions[1].candlesQuantity+2}e((0,W.xu)({actionType:"UPDATE-CANDLE-QUANTITY",actionData:{id:n.id,data:o}}));break;case"CAKE-MESSAGE":e((0,W.xu)({actionType:"UPDATE-CAKE-MESSAGE",actionData:{id:n.id,data:r}}));break;default:return}};return(0,x.jsx)("section",{className:"orderCustomizationMenu whiteGlass50",children:(0,x.jsxs)("div",{className:"orderCustomizationMenu__card",children:[(0,x.jsxs)("button",{type:"button",className:"orderCustomizationMenu__menuCloseBtn",onClick:function(){return e((0,L.I)({isPopUpOpen:!1,popUpType:"",itemId:null}))},children:[(0,x.jsx)(k.Z,{style:{color:"var(--colorWhite)",fontSize:"18px"}}),"Close"]}),(0,x.jsx)("h2",{className:"orderCustomizationMenu__menuTitle",children:"Customize Your Order"}),(0,x.jsxs)("section",{className:"orderCustomizationMenu__productInfoContainer",children:[(0,x.jsx)("img",{src:n.productImage,alt:n.productName}),(0,x.jsxs)(o.E.div,{className:"orderCustomizationMenu__productInfo",initial:{y:150},animate:{y:0},transition:{ease:"easeOut",duration:.5},children:[(0,x.jsx)("h3",{className:"orderCustomizationMenu__productInfo__title",children:n.productName}),(0,x.jsxs)("p",{className:"orderCustomizationMenu__productInfo__price",children:[(0,x.jsx)("small",{children:"\u20b9"}),m("cakes"===n.categories,n.totalPrice,null===n||void 0===n?void 0:n.subCategories,null===n||void 0===n?void 0:n.customizeOptions),".00"]}),(0,x.jsx)("div",{className:"orderCustomizationMenu__productInfo__customizeOptions",children:d.map((function(t,e){return(0,x.jsxs)(o.E.div,{style:{width:"calc((100% / ".concat(d.length,") - 5px)")},initial:{y:70},animate:{y:0},transition:{delay:.25*(e+1)},children:[(0,x.jsx)("p",{children:t.title}),"cakes"!==n.categories&&(0,x.jsx)("p",{children:(0,x.jsxs)("small",{children:["Price \u20b9",n.subCategories[e].price]})}),"cakes"===n.categories&&n.customizeOptions[e].price&&(0,x.jsx)("p",{children:(0,x.jsxs)("small",{children:["Price \u20b9",n.customizeOptions[e].price]})})]},e)}))})]})]}),(0,x.jsxs)("section",{className:"orderCustomizationMenu__customizationSetting",children:[(0,x.jsxs)("p",{className:"orderCustomizationMenu__customizationSetting__infoContainer",children:["Total price is \u20b9",m("cakes"===n.categories,n.totalPrice,null===n||void 0===n?void 0:n.subCategories,null===n||void 0===n?void 0:n.customizeOptions)," And Total Quantity is ",n.totalQuantity,", added to basket."]}),"cakes"!==n.categories&&_.map((function(t,e){return(0,x.jsxs)(o.E.section,{className:"orderCustomizationMenu__customizationSetting__optionsContainer",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.25*(e+1)},children:[(0,x.jsx)("h4",{className:"orderCustomizationMenu__customizationSetting__optionsTitle",children:t.title}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__option",children:[(0,x.jsx)("p",{children:"Eat here"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtnContainer",children:[(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return h("EAT-QUANTITY","dec",e)},children:(0,x.jsx)(U.Z,{})}),(0,x.jsx)("p",{className:"orderCustomizationMenu__customizationSetting__optionQtyCounter",children:n.customizeOptions[e].eatQuantity}),(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return h("EAT-QUANTITY","inc",e)},children:(0,x.jsx)(P.Z,{})})]}),(0,x.jsxs)("p",{children:["Price \u20b9",t.price*n.customizeOptions[e].eatQuantity]})]}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__option",children:[(0,x.jsx)("p",{children:"Pack"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtnContainer",children:[(0,x.jsx)("button",{type:"button",className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return h("PACK-QUANTITY","dec",e)},children:(0,x.jsx)(U.Z,{})}),(0,x.jsx)("p",{className:"orderCustomizationMenu__customizationSetting__optionQtyCounter",children:n.customizeOptions[e].packQuantity}),(0,x.jsx)("button",{type:"button",className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return h("PACK-QUANTITY","inc",e)},children:(0,x.jsx)(P.Z,{})})]}),(0,x.jsxs)("p",{children:["Price \u20b9",t.price*n.customizeOptions[e].packQuantity]})]})]},e+1)})),"cakes"===n.categories&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.E.section,{className:"orderCustomizationMenu__customizationSetting__optionsContainer",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.25},children:[(0,x.jsx)("h4",{className:"orderCustomizationMenu__customizationSetting__optionsTitle",children:"Quantity"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__option",children:[(0,x.jsx)("p",{children:"Quantity"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtnContainer",children:[(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return p("TOTAL-QUANTITY","dec")},children:(0,x.jsx)(U.Z,{})}),(0,x.jsx)("p",{className:"orderCustomizationMenu__customizationSetting__optionQtyCounter",children:n.totalQuantity}),(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return p("TOTAL-QUANTITY","inc")},children:(0,x.jsx)(P.Z,{})})]}),(0,x.jsxs)("p",{children:["Price \u20b9",n.totalPrice]})]})]}),(0,x.jsxs)(o.E.section,{className:"orderCustomizationMenu__customizationSetting__optionsContainer",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.5},children:[(0,x.jsx)("h4",{className:"orderCustomizationMenu__customizationSetting__optionsTitle",children:"Add message or names"}),(0,x.jsx)("textarea",{className:"orderCustomizationMenu__customizationSetting__cakeMessage noScroll",value:r,onChange:function(t){return u(t.target.value)},placeholder:"Kindly share the details of your message, and if you're ordering more than one cake, please provide a delightful description for each delectable creation here."}),(0,x.jsx)("button",{type:"button",className:"orderCustomizationMenu__customizationSetting__cakeMessageBtn",onClick:function(){return p("CAKE-MESSAGE")},children:"Update!"})]}),(0,x.jsxs)(o.E.section,{className:"orderCustomizationMenu__customizationSetting__optionsContainer",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.75},children:[(0,x.jsx)("h4",{className:"orderCustomizationMenu__customizationSetting__optionsTitle",children:"Add Candles"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__option",children:[(0,x.jsx)("p",{children:"Add Candles"}),(0,x.jsxs)("div",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtnContainer",children:[(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return p("CANDLE-QUANTITY","dec")},children:(0,x.jsx)(U.Z,{})}),(0,x.jsx)("p",{className:"orderCustomizationMenu__customizationSetting__optionQtyCounter",children:n.customizeOptions[1].candlesQuantity}),(0,x.jsx)("button",{className:"orderCustomizationMenu__customizationSetting__optionQtyBtn",onClick:function(){return p("CANDLE-QUANTITY","inc")},children:(0,x.jsx)(P.Z,{})})]}),(0,x.jsxs)("p",{children:["Price \u20b9",n.customizeOptions[1].price*n.customizeOptions[1].candlesQuantity]})]})]})]})]})]})})},H=function(t){var n=t.type,e=(0,i.v9)((function(t){return t.popUpMenus})),o=(0,i.v9)((function(t){return t.cartItems})).filter((function(t){return t.id===e.itemId}));return(0,x.jsx)(x.Fragment,{children:"orderCustomizationMenu"===n&&(0,x.jsx)(w,{data:o[0]})})};var D=function(){var t=(0,i.v9)((function(t){return t.menuState.menuBarState})),n=(0,i.v9)((function(t){return t.menuState.notificationMenuState})),e=(0,i.v9)((function(t){return t.popUpMenus})),s=(0,i.v9)((function(t){return t.themeSwitchSlices})).theme;return(0,x.jsxs)("main",{className:"app ".concat("dark"===s?"app__dark":"app__light"),children:[(0,x.jsx)(o.E.div,{className:"shade ".concat("dark"===s?"darkGlass50":"whiteGlass50"),style:{zIndex:null!==n&&void 0!==n&&n.State||null!==t&&void 0!==t&&t.State?(null===n||void 0===n?void 0:n.zIndex)-1:0},animate:null!==n&&void 0!==n&&n.State||null!==t&&void 0!==t&&t.State?{opacity:1}:{opacity:0},transition:{ease:"easeOut",duration:.25}}),(0,x.jsx)(O,{theme:s}),(0,x.jsx)(C,{theme:s}),(0,x.jsx)(a.j3,{}),e.isPopUpOpen&&(0,x.jsx)(H,{type:e.popUpType}),(0,x.jsx)(I,{theme:s})]})}},8054:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"AddOutlined");n.Z=s},2499:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"}),"CalendarMonthOutlined");n.Z=s},1598:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"}),"CloseOutlined");n.Z=s},3965:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)([(0,a.jsx)("path",{d:"M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"},"0"),(0,a.jsx)("path",{d:"M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83zm4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24z"},"1")],"MenuBookOutlined");n.Z=s},4390:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"MenuOutlined");n.Z=s},7197:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M9.5 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07 1.91-2.16 3.01-4.98 3.01-7.93s-1.1-5.77-3.01-7.93C8.82 4.02 9.16 4 9.5 4m0-2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65c1.47.85 3.18 1.35 5 1.35 5.52 0 10-4.48 10-10S15.02 2 9.5 2z"}),"ModeNightOutlined");n.Z=s},2571:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"}),"NotificationsOutlined");n.Z=s},1241:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M19 13H5v-2h14v2z"}),"RemoveOutlined");n.Z=s},5274:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M13 18h-2v-2h2v2zm2-4H9v6h6v-6zm4-4.7V4h-3v2.6L12 3 2 12h3l7-6.31L19 12h3l-3-2.7z"}),"RoofingOutlined");n.Z=s},4439:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8 14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"ShoppingBasketOutlined");n.Z=s},1034:function(t,n,e){var i=e(4836);n.Z=void 0;var o=i(e(5649)),a=e(184),s=(0,o.default)((0,a.jsx)("path",{d:"m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z"}),"WbSunnyOutlined");n.Z=s}}]);
//# sourceMappingURL=746.792d6b51.chunk.js.map
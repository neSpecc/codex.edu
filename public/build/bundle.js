var codex=function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),codex=function(e){"use strict";return e.nodes={content:null},e.init=function(){e.content.customCheckboxes.init(),e.content.approvalButtons.init(),e.autoresizeTextarea.init(),window.codexSpecial.init({blockId:"js-contrast-version-holder"}),e.scrollUp.init("js-layout-holder"),e.core.log("Initialized","CodeX","info")},e}({}),codex.docReady=function(e){/in/.test(document.readyState)?window.setTimeout(codex.docReady,9,e):e()},codex.core=n(3),codex.ajax=n(4),codex.transport=n(5),codex.content=n(6),codex.appender=n(7),codex.parser=n(8),codex.comments=n(9),codex.alerts=n(10),codex.islandSettings=n(12),codex.autoresizeTextarea=n(13),codex.profileSettings=n(14),codex.sharer=n(15),codex.writing=n(16),codex.loader=n(17),codex.scrollUp=n(18),codex.pages=n(19),e.exports=codex,codex.docReady(function(){codex.init()})},function(e,t){},,function(e,t){e.exports={log:function(e,t,n,o){var a=32;if(t){for(t=t.length<a?t:t.substr(0,a-2);t.length<a-1;)t+=" ";t+=":",e=t+e}n=n||"log";try{"console"in window&&window.console[n]&&(o?console[n](e,o):console[n](e))}catch(e){}},getOffset:function(e){var t,n,o,a;if(e)return e.getClientRects().length?(o=e.getBoundingClientRect(),o.width||o.height?(a=e.ownerDocument,n=window,t=a.documentElement,{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o):{top:0,left:0}},isElementOnScreen:function(e){var t=codex.core.getOffset(e).top,n=window.scrollY+window.innerHeight;return n>t},css:function(e){return window.getComputedStyle(e)},insertAfter:function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},replace:function(e,t){return e.parentNode.replaceChild(t,e)},insertBefore:function(e,t){e.parentNode.insertBefore(t,e)},random:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},delegateEvent:function(e,t,n,o){e.addEventListener(n,function(e){for(var n,a=e.target;a&&!n;)n=a.matches(t),n||(a=a.parentElement);n&&o.call(e.target,e,a)},!0)},nodeTypes:{TAG:1,TEXT:3,COMMENT:8,DOCUMENT_FRAGMENT:11},keys:{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,LEFT:37,UP:38,DOWN:40,RIGHT:39,DELETE:46,META:91},isDomNode:function(e){return e&&"object"==typeof e&&e.nodeType&&e.nodeType==this.nodeTypes.TAG},parseHTML:function(e){var t,n,o=[];t=document.createElement("div"),t.innerHTML=e.trim(),n=t.childNodes;for(var a,i=0;a=n[i];i++)(a.nodeType!=codex.core.nodeTypes.TEXT||a.textContent.trim())&&o.push(a);return o},isEmpty:function(e){return 0===Object.keys(e).length},isVisible:function(e){return null!==e.offsetParent},setCookie:function(e,t,n,o,a){var i=e+"="+t;n&&(i+="; expires="+n.toGMTString()),o&&(i+="; path="+o),a&&(i+="; domain="+a),document.cookie=i},getCookie:function(e){var t=document.cookie,n=e+"=",o=t.indexOf("; "+n);if(o==-1){if(o=t.indexOf(n),0!==o)return null}else o+=2;var a=document.cookie.indexOf(";",o);return a==-1&&(a=t.length),unescape(t.substring(o+n.length,a))}}},function(e,t){var n=function(){function e(e){return"function"==typeof e.append}var t=function(t){if(t&&t.url){var n=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP"),o=function(){};t.async=!0,t.type=t.type||"GET",t.data=t.data||"",t["content-type"]=t["content-type"]||"application/json; charset=utf-8",o=t.success||o,"GET"==t.type&&t.data&&(t.url=/\?/.test(t.url)?t.url+"&"+t.data:t.url+"?"+t.data),t.withCredentials&&(n.withCredentials=!0),t.beforeSend&&"function"==typeof t.beforeSend&&t.beforeSend.call(),n.open(t.type,t.url,t.async),e(t.data)||n.setRequestHeader("Content-type",t["content-type"]),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&o(n.responseText)},n.send(t.data)}};return{call:t}}();e.exports=n},function(e,t){e.exports=function(e){var t=null;e.input=null,e.init=function(a){if(!a.url)return void codex.core.log("can't send request because `url` is missed","Transport module","error");t=a;var i=document.createElement("INPUT");i.type="file",t&&t.multiple&&i.setAttribute("multiple","multiple"),t&&t.accept&&i.setAttribute("accept",t.accept),i.addEventListener("change",o,!1),e.input=i,n()};var n=function(){e.input.click()},o=function(){for(var n=t.url,o=t.beforeSend,a=t.success,i=t.error,r=new FormData,c=e.input.files,d=0;d<c.length;d++)r.append("files[]",c[d],c[d].name);codex.ajax.call({type:"POST",data:r,url:n,beforeSend:o,success:a,error:i})};return e}({})},function(e,t){e.exports=function(){var e=function(e,t){for(var n=document.querySelectorAll(e),o=n.length-1;o>=0;o--)n[o].classList.toggle(t)},t=function(e){var t=document.getElementById("js-mobile-menu-holder"),n="mobile-menu-holder--opened";t.classList.toggle(n),e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault()},n={CHECKED_CLASS:"checked",init:function(){var e=document.getElementsByClassName("js-custom-checkbox");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.customCheckboxes.clicked,!1)},clicked:function(){var e=this,t=this.querySelector("input"),n=this.classList.contains(codex.content.customCheckboxes.CHECKED_CLASS);e.classList.toggle(codex.content.customCheckboxes.CHECKED_CLASS),n?t.removeAttribute("checked"):t.setAttribute("checked","checked")}},o={CLICKED_CLASS:"click-again-to-approve",init:function(){var e=document.getElementsByClassName("js-approval-button");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.approvalButtons.clicked,!1)},clicked:function(e){var t=this,n=this.classList.contains(codex.content.approvalButtons.CLICKED_CLASS);n||(t.classList.add(codex.content.approvalButtons.CLICKED_CLASS),e.preventDefault())}};return{toggleMobileMenu:t,customCheckboxes:n,approvalButtons:o,toggle:e}}()},function(e,t){var n={page:1,settings:null,blockForItems:null,loadMoreButton:null,buttonText:null,init:function(e){return this.settings=e,this.loadMoreButton=document.getElementById(this.settings.buttonId),!!this.loadMoreButton&&(this.blockForItems=document.getElementById(this.settings.targetBlockId),!!this.blockForItems&&(this.page=e.currentPage,this.buttonText=this.loadMoreButton.innerHTML,this.settings.autoLoading&&(this.autoLoading.isAllowed=!0),void this.loadMoreButton.addEventListener("click",function(e){codex.appender.load(),e.preventDefault(),codex.appender.autoLoading.init()},!1)))},load:function(){var e=this.settings.url+(parseInt(this.page)+1);codex.ajax.call({type:"post",url:e,data:{},beforeSend:function(){codex.appender.loadMoreButton.classList.add("loading")},success:function(e){if(e=JSON.parse(e),e.success){if(!e.pages)return;codex.appender.blockForItems.innerHTML+=e.pages,codex.appender.page++,codex.appender.settings.autoLoading&&(codex.appender.autoLoading.canLoad=!0),e.next_page||codex.appender.disable()}else codex.core.showException("Не удалось подгрузить новости");codex.appender.loadMoreButton.classList.remove("loading")}})},disable:function(){codex.appender.loadMoreButton.style.display="none",codex.appender.autoLoading.isLaunched&&codex.appender.autoLoading.disable()},autoLoading:{isAllowed:!1,isLaunched:!1,canLoad:!0,init:function(){this.isAllowed&&(window.addEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!0)},disable:function(){window.removeEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!1},scrollEvent:function(){var e=window.pageYOffset+window.innerHeight>=document.body.clientHeight;e&&codex.appender.autoLoading.canLoad&&(codex.appender.autoLoading.canLoad=!1,codex.appender.load())}}};e.exports=n},function(e,t){var n={input:null,init:function(){var e=this;this.input.addEventListener("paste",function(){e.inputPasteCallback()},!1)},inputPasteCallback:function(){var e=this.input,t=this;window.setTimeout(function(){t.sendRequest(e.value)},100)},sendRequest:function(e){codex.core.ajax({type:"get",url:"/ajax/get_page",data:{url:e},success:function(t){var n,o,a;1==t.success?(n=document.getElementById("page_form_title"),o=document.getElementById("page_form_content"),a=document.getElementById("source_link"),n.value=t.title,o.value=t.article,a.value=e,document.getElementsByClassName("redactor_redactor")[0].innerHTML=t.article):codex.core.showException("Не удалось импортировать страницу")}})}};e.exports=n},function(e,t){e.exports=function(){function e(e){g=document.getElementById(e.listId),v&&f()}function t(e){if(!e.classList.contains(x.replyOpened)){var t={parentId:e.dataset.parentId,rootId:e.dataset.rootId,action:e.dataset.action},o=n(t);codex.core.insertAfter(e,o),e.classList.add(x.replyOpened),r(o).focus()}}function n(e){var t=o(),n=a(),i=document.createElement("DIV");return i.classList.add(x.replyForm),t.dataset.parentId=e.parentId,t.dataset.rootId=e.rootId,t.dataset.action=e.action,i.appendChild(t),i.appendChild(n),i}function o(){var e=document.createElement("TEXTAREA");return e.classList.add(x.replyTextarea),e.placeholder="Ваш комментарий",e.addEventListener("keydown",s,!1),e.addEventListener("blur",c,!1),codex.autoresizeTextarea.addListener(e),e}function a(){var e=document.createElement("DIV");return e.classList.add(x.replySubmitButton,"button","master"),e.textContent="Отправить",e.addEventListener("click",i,!1),e}function i(){var e=this,t=e.parentNode,n=r(t);l(n)}function r(e){return e.getElementsByTagName("TEXTAREA")[0]}function c(e){var t=e.target,n=t.parentNode,o=t.dataset.parentId;t.value.trim()||d(n,o)}function d(e,t){var n=document.getElementById("reply"+t);e.remove(),n.classList.remove(x.replyOpened)}function s(e){var t=e.ctrlKey||e.metaKey,n=13==e.keyCode,o=e.target;t&&n&&(l(o),e.preventDefault())}function l(e){var t=new FormData,n=e.parentNode,o=n.querySelector("."+x.replySubmitButton),a=e.dataset.rootId,i=e.dataset.parentId,r=e.dataset.action;t.append("root_id",a),t.append("parent_id",i),t.append("comment_text",e.value),t.append("csrf",window.csrf),codex.ajax.call({type:"POST",url:r,data:t,beforeSend:function(){o.classList.add("loading")},success:function(e){var t;return o.classList.remove("loading"),e=JSON.parse(e),e.success?(d(n,i),u(),t=codex.core.parseHTML(e.comment)[0],g.appendChild(t),window.scrollTo(0,document.body.scrollHeight),m(e.commentId),void p(t)):void codex.alerts.show(e.error)}})}function u(){var e=document.querySelector(".js-empty-comments");e&&e.remove()}function p(e){var t=e.querySelector(w);t&&codex.islandSettings.prepareToggler(t,w)}function m(e){var t=document.getElementById("comment"+e);t.classList.add(x.highlighted),window.setTimeout(function(){t.classList.remove(x.highlighted)},500)}function f(){var e,t=v.match(/\d+/);t&&(e=t[0],m(e))}function h(){var e=this,t=e.dataset.id;window.confirm("Подтвердите удаление комментария")&&(document.location="/delete-comment/"+t)}var g=null,v=document.location.hash,x={replyForm:"comments-form",replyTextarea:"comment-form__text",replyOpened:"comment-form__placeholder--opened",replySubmitButton:"comment-form__button",highlighted:"comment--highligthed"},w=".js-comment-settings";return{init:e,reply:t,remove:h}}()},function(e,t,n){e.exports=function(){function e(){return!!a||(a=document.createElement("DIV"),a.classList.add(o.wrapper),void document.body.appendChild(a))}function t(t){e();var n=document.createElement("DIV");n.classList.add(o.exception),n.innerHTML=t,a.appendChild(n),n.classList.add("bounceIn"),window.setTimeout(function(){n.remove()},8e3)}n(11);var o={wrapper:"exceptionWrapper",exception:"clientException"},a=null;return{show:t}}({})},function(e,t){},function(e,t){e.exports=function(){var e=null,t=[],n={menu:"island-settings__menu",item:"island-settings__item",showed:"island-settings__menu--showed"},o=function(e){var n=document.querySelectorAll(e.selector);t.push(e);for(var o=n.length-1;o>=0;o--)a(n[o],e.selector)},a=function(e,t){e.dataset.selector=t,e.addEventListener("mouseover",i,!1)},i=function(){var t,n=this;e||(e=l()),"true"!=e.dataset.opened&&(e.dataset.opened=!0,window.setTimeout(function(){e.dataset.opened=!1},300),t=r(n.dataset.selector),console.assert(t.items,"Menu items missed"),d(t.items,n),u(n))},r=function(e){return t.filter(c,e).pop()},c=function(e){return e.selector==this},d=function(t,n){var o,a,i;for(e.innerHTML="",o=0;a=t[o];o++){i=s(a);for(var r in n.dataset)i.dataset[r]=n.dataset[r];e.appendChild(i)}},s=function(e){var t=document.createElement("LI");return t.classList.add(n.item),console.assert(e.title,"islandSettings: item title is missed"),console.assert("function"==typeof e.handler,"islandSettings: item handler is not a function"),t.textContent=e.title,t.addEventListener("click",e.handler),t},l=function(){var e=document.createElement("UL");return e.classList.add(n.menu),e},u=function(t){t.appendChild(e),e.classList.add(n.showed)};return{init:o,prepareToggler:a}}()},function(e,t){e.exports=function(){var e=function(){var e=document.getElementsByClassName("js-autoresizable");if(e.length)for(var n=0;n<e.length;n++)t(e[n])},t=function(e){e.addEventListener("input",n,!1)},n=function(e){var t=e.target;o(t)},o=function(e){e.scrollHeight>e.clientHeight&&(e.style.height=e.scrollHeight+"px")};return{init:e,addListener:t}}()},function(e,t){e.exports=function(){var e=function(){t()},t=function(){var e=document.getElementById("repeat-email-confirmation");e.addEventListener("click",n)},n=function(e){var t=function(t){t=JSON.parse(t),codex.alerts.show(t.message),e.target.classList.remove("loading")};e.target.classList.add("loading"),codex.ajax.call({url:"/ajax/confirmation-email",success:t})};return{init:e}}()},function(e,t){var n={init:function(){for(var e=document.querySelectorAll(".js-share"),t=e.length-1;t>=0;t--)e[t].addEventListener("click",n.click,!0)},shareVk:function(e){var t="https://vk.com/share.php?";t+="url="+e.url,t+="&title="+e.title,t+="&description="+e.desc,t+="&image="+e.img,t+="&noparse=true",this.popup(t,"vkontakte")},shareFacebook:function(e){var t=0x62eef6f1917ee,n="https://www.facebook.com/dialog/share?display=popup";n+="&app_id="+t,n+="&href="+e.url,n+="&redirect_uri="+document.location.href,this.popup(n,"facebook")},shareTwitter:function(e){var t="https://twitter.com/share?";t+="text="+e.title,t+="&url="+e.url,t+="&counturl="+e.url,this.popup(t,"twitter")},shareTelegram:function(e){var t="https://telegram.me/share/url";t+="?text="+e.title,t+="&url="+e.url,this.popup(t,"telegram")},popup:function(e,t){window.open(e,"","toolbar=0,status=0,width=626,height=436"),window.yaCounter32652805&&window.yaCounter32652805.reachGoal("article-share",function(){},this,{type:t,url:e})},click:function(e){var t=e.target,o=t.dataset.shareType||t.parentNode.dataset.shareType;if(n[o]){var a={url:t.dataset.url||t.parentNode.dataset.url,title:t.dataset.title||t.parentNode.dataset.title,desc:t.dataset.desc||t.parentNode.dataset.desc,img:t.dataset.img||t.parentNode.dataset.title};n[o](a)}}};e.exports=n},function(e,t){e.exports=function(){function e(e){for(var t in e)a[t]=e[t]}function t(){var e=1,t=2;codex.editor.start({holderId:a.holderId,initialBlockPlugin:a.initialBlockPlugin,hideToolbar:a.hideEditorToolbar,tools:{paragraph:{type:"paragraph",iconClassname:"ce-icon-paragraph",render:window.paragraph.render,validate:window.paragraph.validate,save:window.paragraph.save,allowedToPaste:!0,showInlineToolbar:!0,destroy:window.paragraph.destroy,allowRenderOnPaste:!0},header:{type:"header",iconClassname:"ce-icon-header",appendCallback:window.header.appendCallback,makeSettings:window.header.makeSettings,render:window.header.render,validate:window.header.validate,save:window.header.save,destroy:window.header.destroy,displayInToolbox:!0},image:{type:"image",iconClassname:"ce-icon-picture",appendCallback:window.image.appendCallback,prepare:window.image.prepare,makeSettings:window.image.makeSettings,render:window.image.render,save:window.image.save,destroy:window.image.destroy,isStretched:!0,showInlineToolbar:!0,displayInToolbox:!0,renderOnPastePatterns:window.image.pastePatterns,config:{uploadImage:"/upload/"+e,uploadFromUrl:""}},attaches:{type:"attaches",displayInToolbox:!0,iconClassname:"cdx-attaches__icon",prepare:window.cdxAttaches.prepare,render:window.cdxAttaches.render,save:window.cdxAttaches.save,validate:window.cdxAttaches.validate,destroy:window.cdxAttaches.destroy,appendCallback:window.cdxAttaches.appendCallback,config:{fetchUrl:"/upload/"+t,maxSize:25e3}}},data:a.data}),document.getElementById(a.titleId).focus()}function n(e){var t=e.name,n=e.path.script,o=e.path.style;return Promise.all([codex.loader.importScript(n,t),codex.loader.importStyle(o,t)])}var o=!1,a={hideEditorToolbar:!1,titleId:"editorWritingTitle",initialBlockPlugin:"paragraph",data:{items:[]},resources:[],holderId:null,pageId:0,parentId:0},i=function(t){return e(t),d(a.resources).then(function(){o=!0})},r=function(){o&&t()},c=function(e,t,n){if(o){var a=e;document.getElementById(t).classList.remove("hide"),a.classList.add(n),a.onclick=null,r()}},d=function(e){return Promise.all(e.map(n))},s=function(){var e=document.forms.atlas;if(e){var t=document.createElement("TEXTAREA");return t.name="content",t.id="json_result",t.hidden=!0,e.appendChild(t),codex.editor.saver.saveBlocks(),e}},l=function(){var e=s();return""===e.elements.title.value.trim()?void codex.editor.notifications.notification({type:"warn",message:"Заполните заголовок"}):void window.setTimeout(function(){e.elements.content.innerHTML=JSON.stringify({items:codex.editor.state.jsonOutput}),codex.ajax.call({url:"/p/save",data:new FormData(e),success:u,type:"POST"})},500)},u=function(e){return e=JSON.parse(e),e.success?void(window.location=e.redirect):void codex.editor.notifications.notification({type:"warn",message:e.message})},p=function(){var e=s();window.setTimeout(function(){e.elements.content.innerHTML=JSON.stringify({items:codex.editor.state.jsonOutput}),e.submit()},500)};return{init:r,prepare:i,open:c,openEditorFullscreen:p,submit:l}}()},function(e,t){e.exports={prefixJS:"cdx-script-",prefixCSS:"cdx-style-",importScript:function(e,t){return new Promise(function(n,o){var a;t?document.getElementById(this.prefixJS+t)&&n(e):o("Instance name is missed"),a=document.createElement("SCRIPT"),a.async=!0,a.defer=!0,a.id=codex.loader.prefixJS+t,a.onload=function(){n(e)},a.onerror=function(){o(e)},a.src=e,document.head.appendChild(a)})},importStyle:function(e,t){return new Promise(function(n,o){var a;t?document.getElementById(this.prefixCSS+t)&&n(e):o("Instance name is missed"),a=document.createElement("LINK"),a.type="text/css",a.href=e,a.rel="stylesheet",a.id=codex.loader.prefixCSS+t,a.onload=function(){n(e)},a.onerror=function(){o(e)},a.src=e,document.head.appendChild(a)})}}},function(e,t){e.exports=function(){var e=300,t=0,n=null,o=null,a=function(e){var o=document.getElementById(e);return o?(t=o.offsetWidth,n=s(),n.addEventListener("click",i),window.addEventListener("scroll",r),window.addEventListener("resize",d,!1),c(),void r()):void codex.core.log("Layout center-col ID wissed","scrollUp","warn")},i=function(e){window.scrollTo(0,e)},r=function(){var t=window.pageYOffset>e;t?n.classList.add("show"):n.classList.remove("show")},c=function(){var e=document.body.clientWidth,o=(e-t)/2;n.style.width=o+"px"},d=function(){o&&window.clearTimeout(o),o=window.setTimeout(c,150)},s=function(){var e=document.createElement("DIV"),t=document.createElement("DIV");return e.classList.add("scroll-up"),t.classList.add("scroll-up__arrow"),e.appendChild(t),document.body.appendChild(e),e};return{init:a}}()},function(e,t){e.exports=function(){var e=null,t=function(){e=this;var t=e.dataset.id;document.location="/p/writing?id="+t},n=function(){e=this;var t=e.dataset.id;window.confirm("Подтвердите удаление страницы")&&codex.ajax.call({url:"/p/"+t+"/delete",success:r.delete})},o=function(){e=this;var t=e.dataset.id;document.location="/p/writing?parent="+t},a=function(){e=this;var t=e.dataset.id;codex.ajax.call({url:"/p/"+t+"/promote?list=menu",success:r.promote})},i=function(){e=this;var t=e.dataset.id;codex.ajax.call({url:"/p/"+t+"/promote?list=news",success:r.promote})},r={getResponse:function(e){try{e=JSON.parse(e)}catch(e){return{success:0,message:"Произошла ошибка, попробуйте позже"}}return e},delete:function(e){return e=r.getResponse(e),e.success?void window.location.replace(e.redirect):void codex.alerts.show(e.message)},promote:function(e){return e=r.getResponse(e),e.success?(e.menu&&(console.log(e.menu),r.replaceMenu(e.menu)),void codex.alerts.show(e.message)):void codex.alerts.show(e.message)},replaceMenu:function(e){var t=document.getElementById("menu"),n=codex.core.parseHTML(e)[0];codex.core.replace(t,n)}};return{openWriting:t,newChild:o,addToMenu:a,addToNews:i,remove:n}}()}]);
//# sourceMappingURL=bundle.js.map
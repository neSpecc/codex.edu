var codex=function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),codex=function(e){"use strict";return e.nodes={content:null},e.init=function(){e.content.customCheckboxes.init(),e.content.approvalButtons.init(),e.autoresizeTextarea.init(),window.codexSpecial.init({blockId:"js-contrast-version-holder"}),e.core.log("Initialized","App init","info")},e}({}),codex.docReady=function(e){/in/.test(document.readyState)?window.setTimeout(codex.docReady,9,e):e()},codex.core=n(3),codex.ajax=n(4),codex.transport=n(5),codex.content=n(6),codex.appender=n(7),codex.parser=n(8),codex.comments=n(9),codex.alerts=n(10),codex.autoresizeTextarea=n(12),codex.sharer=n(13),e.exports=codex,codex.docReady(function(){codex.init()})},function(e,t){},,function(e,t){e.exports={log:function(e,t,n,o){var a=32;if(t){for(t=t.length<a?t:t.substr(0,a-2);t.length<a-1;)t+=" ";t+=":",e=t+e}n=n||"log";try{"console"in window&&window.console[n]&&(o?console[n](e,o):console[n](e))}catch(e){}},getOffset:function(e){var t,n,o,a;if(e)return e.getClientRects().length?(o=e.getBoundingClientRect(),o.width||o.height?(a=e.ownerDocument,n=window,t=a.documentElement,{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o):{top:0,left:0}},isElementOnScreen:function(e){var t=codex.core.getOffset(e).top,n=window.scrollY+window.innerHeight;return n>t},css:function(e){return window.getComputedStyle(e)},insertAfter:function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},replace:function(e,t){return e.parentNode.replaceChild(t,e)},insertBefore:function(e,t){e.parentNode.insertBefore(t,e)},random:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},delegateEvent:function(e,t,n,o){e.addEventListener(n,function(e){for(var n,a=e.target;a&&!n;)n=a.matches(t),n||(a=a.parentElement);n&&o.call(e.target,e,a)},!0)},nodeTypes:{TAG:1,TEXT:3,COMMENT:8,DOCUMENT_FRAGMENT:11},keys:{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,LEFT:37,UP:38,DOWN:40,RIGHT:39,DELETE:46,META:91},isDomNode:function(e){return e&&"object"==typeof e&&e.nodeType&&e.nodeType==this.nodeTypes.TAG},parseHTML:function(e){var t,n,o=[];t=document.createElement("div"),t.innerHTML=e.trim(),n=t.childNodes;for(var a,i=0;a=n[i];i++)(a.nodeType!=codex.core.nodeTypes.TEXT||a.textContent.trim())&&o.push(a);return o},isEmpty:function(e){return 0===Object.keys(e).length},isVisible:function(e){return null!==e.offsetParent},setCookie:function(e,t,n,o,a){var i=e+"="+t;n&&(i+="; expires="+n.toGMTString()),o&&(i+="; path="+o),a&&(i+="; domain="+a),document.cookie=i},getCookie:function(e){var t=document.cookie,n=e+"=",o=t.indexOf("; "+n);if(o==-1){if(o=t.indexOf(n),0!==o)return null}else o+=2;var a=document.cookie.indexOf(";",o);return a==-1&&(a=t.length),unescape(t.substring(o+n.length,a))}}},function(e,t){var n=function(){function e(e){return"function"==typeof e.append}var t=function(t){if(t&&t.url){var n=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP"),o=function(){};t.async=!0,t.type=t.type||"GET",t.data=t.data||"",t["content-type"]=t["content-type"]||"application/json; charset=utf-8",o=t.success||o,"GET"==t.type&&t.data&&(t.url=/\?/.test(t.url)?t.url+"&"+t.data:t.url+"?"+t.data),t.withCredentials&&(n.withCredentials=!0),t.beforeSend&&"function"==typeof t.beforeSend&&t.beforeSend.call(),n.open(t.type,t.url,t.async),e(t.data)||n.setRequestHeader("Content-type",t["content-type"]),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&o(n.responseText)},n.send(t.data)}};return{call:t}}();e.exports=n},function(e,t){var n={transportURL:"/file/transport",input:null,type:null,keydownFinishedTimeout:null,files:{},prepare:function(){var e=document.createElement("INPUT");e.type="file",e.addEventListener("change",this.fileSelected),this.input=e},clearInput:function(){this.input=null,this.type=null},selectFile:function(e,t){this.prepare(),this.type=t,this.input.click()},fileSelected:function(){var e=n.type,t=this,o=t.files,a=new FormData;a.append("type",e),a.append("files",o[0],o[0].name),codex.ajax.call({type:"POST",url:n.transportURL,data:a,success:n.responseForPageForm,beforeSend:n.beforeSendPageForm}),n.clearInput()},beforeSendPageForm:function(){},responseForPageForm:function(e){e=JSON.parse(e),e.success&&e.title?n.storeFile(e):codex.alerts.show(e.message)},storeFile:function(e){e&&e.id&&(this.files[e.id]={title:e.title,id:e.id},this.appendFileRow(e))},appendFileRow:function(e){var t=document.getElementById("formAttaches"),n=document.createElement("div"),o=document.createElement("span"),a=document.createElement("span");switch(n.classList.add("item"),e.type){case"1":o.classList.add("item_file");break;case"2":o.classList.add("item_image")}o.textContent=e.title,o.setAttribute("contentEditable",!0),a.classList.add("fl_r","button-delete","icon-trash"),a.addEventListener("click",function(){this.parentNode.dataset.readyForDelete&&(delete codex.transport.files[e.id],this.parentNode.remove()),this.parentNode.dataset.readyForDelete=!0,this.classList.add("button-delete__ready-to-delete"),this.innerHTML="Удалить документ"},!1),n.appendChild(o),n.appendChild(a),t.appendChild(n),n.dataset.id=e.id,n.addEventListener("input",this.storeFileName,!1)},storeFileName:function(){codex.transport.keydownFinishedTimeout&&window.clearTimeout(codex.transport.keydownFinishedTimeout);var e=this;codex.transport.keydownFinishedTimeout=window.setTimeout(function(){var t=e.dataset.id,n=e.textContent.trim();n&&(codex.transport.files[t].title=n)},200)},submitAtlasForm:function(){var e=document.forms.atlas;if(e){var t=document.createElement("input");t.type="hidden",t.name="attaches",t.value=JSON.stringify(this.files),e.appendChild(t);var n=document.getElementById("json_result");codex.editor.saver.saveBlocks(),window.setTimeout(function(){var t=codex.editor.state.jsonOutput.length;t?n.innerHTML=JSON.stringify({data:codex.editor.state.jsonOutput}):n.innerHTML="",e.submit()},100)}},openEditorFullscrean:function(){var e=document.forms.atlas,t=document.createElement("input");t.type="hidden",t.name="openFullScreen",t.value=1,e.append(t),this.submitAtlasForm()}};e.exports=n},function(e,t){e.exports=function(){var e=function(e){var t=document.getElementById("js-mobile-menu-holder"),n="mobile-menu-holder--opened";t.classList.toggle(n),e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault()},t={CHECKED_CLASS:"checked",init:function(){var e=document.getElementsByClassName("js-custom-checkbox");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.customCheckboxes.clicked,!1)},clicked:function(){var e=this,t=this.querySelector("input"),n=this.classList.contains(codex.content.customCheckboxes.CHECKED_CLASS);e.classList.toggle(codex.content.customCheckboxes.CHECKED_CLASS),n?t.removeAttribute("checked"):t.setAttribute("checked","checked")}},n={CLICKED_CLASS:"click-again-to-approve",init:function(){var e=document.getElementsByClassName("js-approval-button");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.approvalButtons.clicked,!1)},clicked:function(e){var t=this,n=this.classList.contains(codex.content.approvalButtons.CLICKED_CLASS);n||(t.classList.add(codex.content.approvalButtons.CLICKED_CLASS),e.preventDefault())}};return{toggleMobileMenu:e,customCheckboxes:t,approvalButtons:n}}()},function(e,t){var n={page:1,settings:null,blockForItems:null,loadMoreButton:null,buttonText:null,init:function(e){return this.settings=e,this.loadMoreButton=document.getElementById(this.settings.button_id),!!this.loadMoreButton&&(this.blockForItems=document.getElementById(this.settings.target_block_id),!!this.blockForItems&&(this.page=e.current_page,this.buttonText=this.loadMoreButton.innerHTML,this.settings.autoLoading&&(this.autoLoading.isAllowed=!0),void this.loadMoreButton.addEventListener("click",function(e){codex.appender.load(),e.preventDefault(),codex.appender.autoLoading.init()},!1)))},load:function(){var e=this.settings.url+(parseInt(this.page)+1);codex.core.ajax({type:"post",url:e,data:{},beforeSend:function(){codex.appender.loadMoreButton.innerHTML=" ",codex.appender.loadMoreButton.classList.add("loading")},success:function(e){if(e=JSON.parse(e),e.success){if(!e.pages)return;codex.appender.blockForItems.innerHTML+=e.pages,codex.appender.page++,codex.appender.settings.autoLoading&&(codex.appender.autoLoading.canLoad=!0),e.next_page||codex.appender.disable()}else codex.core.showException("Не удалось подгрузить новости");codex.appender.loadMoreButton.classList.remove("loading"),codex.appender.loadMoreButton.innerHTML=codex.appender.buttonText}})},disable:function(){codex.appender.loadMoreButton.style.display="none",codex.appender.autoLoading.isLaunched&&codex.appender.autoLoading.disable()},autoLoading:{isAllowed:!1,isLaunched:!1,canLoad:!0,init:function(){this.isAllowed&&(window.addEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!0)},disable:function(){window.removeEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!1},scrollEvent:function(){var e=window.pageYOffset+window.innerHeight>=document.body.clientHeight;e&&codex.appender.autoLoading.canLoad&&(codex.appender.autoLoading.canLoad=!1,codex.appender.load())}}};e.exports=n},function(e,t){var n={input:null,init:function(){var e=this;this.input.addEventListener("paste",function(){e.inputPasteCallback()},!1)},inputPasteCallback:function(){var e=this.input,t=this;window.setTimeout(function(){t.sendRequest(e.value)},100)},sendRequest:function(e){codex.core.ajax({type:"get",url:"/ajax/get_page",data:{url:e},success:function(t){var n,o,a;1==t.success?(n=document.getElementById("page_form_title"),o=document.getElementById("page_form_content"),a=document.getElementById("source_link"),n.value=t.title,o.value=t.article,a.value=e,document.getElementsByClassName("redactor_redactor")[0].innerHTML=t.article):codex.core.showException("Не удалось импортировать страницу")}})}};e.exports=n},function(e,t){e.exports=function(){function e(e){f=document.getElementById(e.listID),m&&p()}function t(e){var t=e.target,o=t.parentNode,a=n(t);o.removeChild(t),o.appendChild(a),i(a).focus()}function n(e){var t=e.parentNode,n=o(e),i=a(),r=document.createElement("DIV");return r.classList.add("comments-form"),r.dataset.parentId=t.dataset.parentId,r.dataset.rootId=t.dataset.rootId,r.dataset.action=t.dataset.action,r.appendChild(n),r.appendChild(i),r}function o(e){var t=document.createElement("TEXTAREA");return t.classList.add("comment-form__text","js-autoresizable"),t.placeholder=e.innerHTML,t.rows=1,t.required=!0,t.addEventListener("keydown",u,!1),t.addEventListener("blur",d,!1),codex.autoresizeTextarea.addListener(t),t}function a(){var e=document.createElement("DIV");return e.classList.add("comment-form__button","button"),e.innerHTML="Оставить комментарий",e.addEventListener("click",l,!1),e}function i(e){return e.getElementsByTagName("TEXTAREA")[0]}function r(){var e=document.createElement("DIV");return e.classList.add("comment-form__placeholder"),e.addEventListener("click",t,!1),e.innerHTML="Ваш комментарий...",e}function d(e){var t=e.target,n=t.parentNode,o=n.dataset.parentId;t.value||s(o)}function s(e){var t=document.getElementById("replyFormToComment"+e),n=t.getElementsByClassName("comments-form")[0],o=r();n.remove(),t.appendChild(o)}function c(e){var e="comment_"+e,t=document.getElementById(e);t.classList.add("comment--highligthed"),window.setTimeout(function(){t.classList.add("comment--highligthed-transition"),t.classList.remove("comment--highligthed"),window.setTimeout(function(){t.classList.remove("comment--highligthed-transition")},500)},500)}function u(e){var t=e.ctrlKey||e.metaKey,n=13==e.keyCode;t&&n&&l(e)}function l(e){var t=e.target.parentNode,n=i(t).value,o=new FormData,a=t.dataset.rootId,r=t.dataset.parentId,d=t.dataset.action;o.append("root_id",a),o.append("parent_id",r),o.append("comment_text",n),o.append("csrf",window.csrf),codex.ajax.call({type:"POST",url:d,data:o,beforeSend:function(){},success:function(e){e=JSON.parse(e),e.success?(0==f.dataset.count&&(f.innerHTML=""),f.innerHTML+=e.comment,f.dataset.count++,window.scrollTo(0,document.body.scrollHeight),c(e.commentId),s(r)):codex.alerts.show(e.error)}})}function p(){var e=m.slice(m.lastIndexOf("_")+1);c(e)}var f=null,m=document.location.hash;return{init:e,appendForm:t}}()},function(e,t,n){e.exports=function(){function e(){return!!a||(a=document.createElement("DIV"),a.classList.add(o.wrapper),void document.body.appendChild(a))}function t(t){e();var n=document.createElement("DIV");n.classList.add(o.exception),n.innerHTML=t,a.appendChild(n),n.classList.add("bounceIn"),window.setTimeout(function(){n.remove()},8e3)}n(11);var o={wrapper:"exceptionWrapper",exception:"clientException"},a=null;return{show:t}}({})},function(e,t){},function(e,t){e.exports=function(){var e=function(){var e=document.getElementsByClassName("js-autoresizable");if(e.length)for(var n=0;n<e.length;n++)t(e[n])},t=function(e){e.addEventListener("input",n,!1)},n=function(e){var t=e.target;o(t)},o=function(e){e.scrollHeight>e.clientHeight&&(e.style.height=e.scrollHeight+"px")};return{init:e,addListener:t}}()},function(e,t){var n={init:function(){for(var e=document.querySelectorAll(".sharing .but, .sharing .main_but, .quiz__sharing .but"),t=e.length-1;t>=0;t--)e[t].addEventListener("click",n.click,!0)},shareVk:function(e){var t="https://vk.com/share.php?";t+="url="+e.url,t+="&title="+e.title,t+="&description="+e.desc,t+="&image="+e.img,t+="&noparse=true",this.popup(t,"vkontakte")},shareFacebook:function(e){var t=0x62eef6f1917ee,n="https://www.facebook.com/dialog/share?display=popup";n+="&app_id="+t,n+="&href="+e.url,n+="&redirect_uri="+document.location.href,this.popup(n,"facebook")},shareTwitter:function(e){var t="https://twitter.com/share?";t+="text="+e.title,t+="&url="+e.url,t+="&counturl="+e.url,this.popup(t,"twitter")},shareTelegram:function(e){var t="https://telegram.me/share/url";t+="?text="+e.title,t+="&url="+e.url,this.popup(t,"telegram")},popup:function(e,t){window.open(e,"","toolbar=0,status=0,width=626,height=436"),window.yaCounter32652805&&window.yaCounter32652805.reachGoal("article-share",function(){},this,{type:t,url:e})},click:function(e){var t=e.target,o=t.dataset.shareType||t.parentNode.dataset.shareType;if(n[o]){var a={url:t.dataset.url||t.parentNode.dataset.url,title:t.dataset.title||t.parentNode.dataset.title,desc:t.dataset.desc||t.parentNode.dataset.desc,img:t.dataset.img||t.parentNode.dataset.title};n[o](a)}}};e.exports=n}]);
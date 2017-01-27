var codex=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),codex=function(e){"use strict";return e.nodes={content:null},e.init=function(){e.transport.init(),e.content.customCheckboxes.init(),e.content.approvalButtons.init(),window.codexSpecial.init({blockId:"js-contrast-version-holder"}),e.core.log("Initialized","App init","info")},e}({}),codex.docReady=function(e){/in/.test(document.readyState)?window.setTimeout(codex.docReady,9,e):e()},codex.core=n(3),codex.ajax=n(4),codex.transport=n(5),codex.content=n(6),codex.appender=n(7),codex.parser=n(8),codex.comments=n(9),e.exports=codex,codex.docReady(function(){codex.init()})},function(e,t){},,function(e,t){e.exports={log:function(e,t,n,o){var i=32;if(t){for(t=t.length<i?t:t.substr(0,i-2);t.length<i-1;)t+=" ";t+=":",e=t+e}n=n||"log";try{"console"in window&&window.console[n]&&(o?console[n](e,o):console[n](e))}catch(e){}},getOffset:function(e){var t,n,o,i;if(e)return e.getClientRects().length?(o=e.getBoundingClientRect(),o.width||o.height?(i=e.ownerDocument,n=window,t=i.documentElement,{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o):{top:0,left:0}},isElementOnScreen:function(e){var t=codex.core.getOffset(e).top,n=window.scrollY+window.innerHeight;return n>t},css:function(e){return window.getComputedStyle(e)},insertAfter:function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},replace:function(e,t){return e.parentNode.replaceChild(t,e)},insertBefore:function(e,t){e.parentNode.insertBefore(t,e)},random:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},delegateEvent:function(e,t,n,o){e.addEventListener(n,function(e){for(var n,i=e.target;i&&!n;)n=i.matches(t),n||(i=i.parentElement);n&&o.call(e.target,e,i)},!0)},nodeTypes:{TAG:1,TEXT:3,COMMENT:8,DOCUMENT_FRAGMENT:11},keys:{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,LEFT:37,UP:38,DOWN:40,RIGHT:39,DELETE:46,META:91},isDomNode:function(e){return e&&"object"==typeof e&&e.nodeType&&e.nodeType==this.nodeTypes.TAG},parseHTML:function(e){var t,n,o=[];t=document.createElement("div"),t.innerHTML=e.trim(),n=t.childNodes;for(var i,a=0;i=n[a];a++)(i.nodeType!=codex.core.nodeTypes.TEXT||i.textContent.trim())&&o.push(i);return o},isEmpty:function(e){return 0===Object.keys(e).length},isVisible:function(e){return null!==e.offsetParent},setCookie:function(e,t,n,o,i){var a=e+"="+t;n&&(a+="; expires="+n.toGMTString()),o&&(a+="; path="+o),i&&(a+="; domain="+i),document.cookie=a},getCookie:function(e){var t=document.cookie,n=e+"=",o=t.indexOf("; "+n);if(o==-1){if(o=t.indexOf(n),0!==o)return null}else o+=2;var i=document.cookie.indexOf(";",o);return i==-1&&(i=t.length),unescape(t.substring(o+n.length,i))}}},function(e,t){var n=function(){var e=function(e){if(e&&e.url){var t=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP"),n=function(){};e.async=!0,e.type=e.type||"GET",e.data=e.data||"",e["content-type"]=e["content-type"]||"application/json; charset=utf-8",n=e.success||n,"GET"==e.type&&e.data&&(e.url=/\?/.test(e.url)?e.url+"&"+e.data:e.url+"?"+e.data),e.withCredentials&&(t.withCredentials=!0),e.beforeSend&&"function"==typeof e.beforeSend&&e.beforeSend.call(),t.open(e.type,e.url,e.async),t.setRequestHeader("Content-type",e["content-type"]),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),t.onreadystatechange=function(){4==t.readyState&&200==t.status&&n(t.responseText)},t.send(e.data)}};return{call:e}}();e.exports=n},function(e,t){var n={form:null,input:null,keydownFinishedTimeout:null,files:{},transportTypeInput:null,init:function(){return this.form=document.getElementById("transportForm"),this.input=document.getElementById("transportInput"),!(!this.form||!this.input)&&void this.input.addEventListener("change",this.fileSelected)},selectFile:function(e,t){this.prepareForm({type:t}),this.input.click()},fileSelected:function(){codex.transport.form.submit(),codex.transport.clear()},prepareForm:function(e){this.transportTypeInput||(this.transportTypeInput=document.createElement("input"),this.transportTypeInput.type="hidden",this.transportTypeInput.name="type",this.form.appendChild(this.transportTypeInput)),this.transportTypeInput.value=e.type},clear:function(){this.type=null,this.input.value=null},response:function(e){e.success&&e.title?this.storeFile(e):codex.core.showException(e.message)},storeFile:function(e){e&&e.id&&(this.files[e.id]={title:e.title,id:e.id},this.appendFileRow(e))},appendFileRow:function(e){var t=document.getElementById("formAttaches"),n=document.createElement("div"),o=document.createElement("span"),i=document.createElement("span");switch(n.classList.add("item"),e.type){case"1":o.classList.add("item_file");break;case"2":o.classList.add("item_image")}o.textContent=e.title,o.setAttribute("contentEditable",!0),i.classList.add("fl_r","button-delete","icon-trash"),i.addEventListener("click",function(){this.parentNode.dataset.readyForDelete&&(delete codex.transport.files[e.id],this.parentNode.remove()),this.parentNode.dataset.readyForDelete=!0,this.classList.add("button-delete__ready-to-delete"),this.innerHTML="Удалить документ"},!1),n.appendChild(o),n.appendChild(i),t.appendChild(n),n.dataset.id=e.id,n.addEventListener("input",this.storeFileName,!1)},storeFileName:function(){codex.transport.keydownFinishedTimeout&&window.clearTimeout(codex.transport.keydownFinishedTimeout);var e=this;codex.transport.keydownFinishedTimeout=window.setTimeout(function(){var t=e.dataset.id,n=e.textContent.trim();n&&(codex.transport.files[t].title=n)},300)},submitAtlasForm:function(){var e=document.forms.atlas;if(e){var t=document.createElement("input");t.type="hidden",t.name="attaches",t.value=JSON.stringify(this.files),e.appendChild(t);var n=document.getElementById("json_result");codex.editor.saver.saveBlocks(),window.setTimeout(function(){n.innerHTML=JSON.stringify(codex.editor.state.jsonOutput),e.submit()},100)}}};e.exports=n},function(e,t){e.exports=function(){var e=function(e){var t=document.getElementById("js-mobile-menu-holder"),n="mobile-menu-holder--opened";t.classList.toggle(n),e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault()},t={CHECKED_CLASS:"checked",init:function(){var e=document.getElementsByClassName("js-custom-checkbox");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.customCheckboxes.clicked,!1)},clicked:function(){var e=this,t=this.querySelector("input"),n=this.classList.contains(codex.content.customCheckboxes.CHECKED_CLASS);e.classList.toggle(codex.content.customCheckboxes.CHECKED_CLASS),n?t.removeAttribute("checked"):t.setAttribute("checked","checked")}},n={CLICKED_CLASS:"click-again-to-approve",init:function(){var e=document.getElementsByClassName("js-approval-button");if(e.length)for(var t=e.length-1;t>=0;t--)e[t].addEventListener("click",codex.content.approvalButtons.clicked,!1)},clicked:function(e){var t=this,n=this.classList.contains(codex.content.approvalButtons.CLICKED_CLASS);n||(t.classList.add(codex.content.approvalButtons.CLICKED_CLASS),e.preventDefault())}};return{toggleMobileMenu:e,customCheckboxes:t,approvalButtons:n}}()},function(e,t){var n={page:1,settings:null,blockForItems:null,loadMoreButton:null,buttonText:null,init:function(e){return this.settings=e,this.loadMoreButton=document.getElementById(this.settings.button_id),!!this.loadMoreButton&&(this.blockForItems=document.getElementById(this.settings.target_block_id),!!this.blockForItems&&(this.page=e.current_page,this.buttonText=this.loadMoreButton.innerHTML,this.settings.autoLoading&&(this.autoLoading.isAllowed=!0),void this.loadMoreButton.addEventListener("click",function(e){codex.appender.load(),e.preventDefault(),codex.appender.autoLoading.init()},!1)))},load:function(){var e=this.settings.url+(parseInt(this.page)+1);codex.core.ajax({type:"post",url:e,data:{},beforeSend:function(){codex.appender.loadMoreButton.innerHTML=" ",codex.appender.loadMoreButton.classList.add("loading")},success:function(e){if(e=JSON.parse(e),e.success){if(!e.pages)return;codex.appender.blockForItems.innerHTML+=e.pages,codex.appender.page++,codex.appender.settings.autoLoading&&(codex.appender.autoLoading.canLoad=!0),e.next_page||codex.appender.disable()}else codex.core.showException("Не удалось подгрузить новости");codex.appender.loadMoreButton.classList.remove("loading"),codex.appender.loadMoreButton.innerHTML=codex.appender.buttonText}})},disable:function(){codex.appender.loadMoreButton.style.display="none",codex.appender.autoLoading.isLaunched&&codex.appender.autoLoading.disable()},autoLoading:{isAllowed:!1,isLaunched:!1,canLoad:!0,init:function(){this.isAllowed&&(window.addEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!0)},disable:function(){window.removeEventListener("scroll",codex.appender.autoLoading.scrollEvent),codex.appender.autoLoading.isLaunched=!1},scrollEvent:function(){var e=window.pageYOffset+window.innerHeight>=document.body.clientHeight;e&&codex.appender.autoLoading.canLoad&&(codex.appender.autoLoading.canLoad=!1,codex.appender.load())}}};e.exports=n},function(e,t){var n={input:null,init:function(){var e=this;this.input.addEventListener("paste",function(){e.inputPasteCallback()},!1)},inputPasteCallback:function(){var e=this.input,t=this;window.setTimeout(function(){t.sendRequest(e.value)},100)},sendRequest:function(e){codex.core.ajax({type:"get",url:"/ajax/get_page",data:{url:e},success:function(t){var n,o,i;1==t.success?(n=document.getElementById("page_form_title"),o=document.getElementById("page_form_content"),i=document.getElementById("source_link"),n.value=t.title,o.value=t.article,i.value=e,document.getElementsByClassName("redactor_redactor")[0].innerHTML=t.article):codex.core.showException("Не удалось импортировать страницу")}})}};e.exports=n},function(e,t){var n=function(){function e(){u.form=document.getElementById("comment_form"),u.parentId=u.form.parentId,u.rootId=u.form.rootId,u.addCommentButton=u.form.addCommentButton,u.addAnswerTo=document.getElementById("addAnswerTo"),u.cancelAnswerButton=document.getElementById("cancel_answer"),u.textarea=u.form.add_comment_textarea,c=document.getElementById("page_comments"),s=document.getElementsByClassName("answer_button"),t(),u.textarea.addEventListener("input",a,!1);for(var e=0;e<s.length;e++)s[e].addEventListener("click",o,!1);u.cancelAnswerButton.addEventListener("click",n,!1),u.textarea.addEventListener("keydown",r,!1)}function t(){u.textarea.value=""}function n(){c.appendChild(u.form),i({parentId:0,rootId:0})}function o(e){var t,n;t=e.target.dataset.commentId?e.target:e.target.parentNode,n=document.getElementById("comment_"+t.dataset.commentId),n.appendChild(u.form),i({parentId:t.dataset.commentId,rootId:t.dataset.rootId})}function i(e){if(u.parentId.value=e.parentId,u.rootId.value=e.rootId,e.parentId){var t=document.querySelector("#comment_"+e.parentId+" .author_name").innerHTML;u.addAnswerTo.innerHTML='<i class="icon-right-dir"></i> '+t,u.addCommentButton.value="Ответить"}else u.addAnswerTo.innerHTML="",u.addCommentButton.value="Оставить комментарий"}function a(){d()}function d(){var e=u.textarea.value.trim();u.addCommentButton.disabled=!e}function r(e){var t=e.ctrlKey||e.metaKey,n=13==e.keyCode;t&&n&&u.form.submit()}var s=null,c=null,u={form:null,parentId:null,rootId:null,addCommentButton:null,addAnswerTo:null,cancelAnswerButton:null,textarea:""};return{init:e}}();e.exports=n}]);
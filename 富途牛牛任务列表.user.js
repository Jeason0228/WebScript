// ==UserScript==
// @name         富途牛牛任务列表
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mobile.futunn.com/credits-v2/index*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=futunn.com
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @connect      https://mobile.futunn.com/
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant GM_xmlhttpRequest
// @grant GM_openInTab
// @grant GM_getTab
// @grant unsafeWindow
// @grant window.close
// @grant window.focus2
// @grant window.onurlchange

// ==/UserScript==

(function () {
  "use strict";
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      console.log("Ready");

      const TaskList = {
        daily: "https://mobile.futunn.com/credits-api/daily-task",
        single: "https://mobile.futunn.com/credits-api/single-task?pkg_type=1",
        high: "https://mobile.futunn.com/credits-api/get-high-task",
        past: "https://mobile.futunn.com/credits-api/past-task?type=0&page_size=20&last_id=0",
      };
      for (let [key, value] of Object.entries(TaskList)) {
        // console.log(key + ':' + value);
        GM.xmlHttpRequest({
          method: "GET",
          url: value,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; VOG-AL10 Build/HUAWEIVOG-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.129 Mobile Safari/537.36 FutuNN_Android/12.44.9018 RequestSource/Http CliLang/zh-cn ClientFont/1.0 (quote:1; trade:1; news:1; nnc:1; sns:1; other:1) ClientSkinType/3 AppType/NiuNiu RequestSource/WebView ClientChannelType/407 PublishRegion/mainland",
            Accept: "text/xml",
          },
          onload: function (response) {
            let responseXML = null;
            // Inject responseXML into existing Object (only appropriate for XML content).
            if (!response.responseXML) {
              responseXML = new DOMParser().parseFromString(
                response.responseText,
                "text/xml"
              );
            }
            console.log(key, "responseStatus:", response.status);
            pdata(response.responseText);
          },
          onerror: function (response) {
            console.log(key, "Can't load file.");
          },
        });
      }

      function pdata(data) {
        const jsObject = JSON.parse(data);
        for (let i = 0; i <= jsObject.data.length; i++) {
          const task = {};
          task.name = jsObject?.data[i]?.task_name;
          task.link = jsObject?.data[i]?.task_link;
          console.log(task);
          if (task.link) {
            const NTab = GM_openInTab(
              task.link +
                "?&clientver=12.44.9018&main_broker=WzEwMDFd&user_id_type=1&user_id=158049&channel=4&clientlang=0&clienttype=13&user_main_broker=WzFd&is_visitor=0&skintype=3",
              { active: false, insert: true, setParent: true }
            );
            setTimeout(() => {
              NTab.close();
            }, 5 * 1000);
          } else {
            console.log();
          }
        }
      }
    }
  };
})();

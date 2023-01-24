// ==UserScript==
// @name         富途自动浇水
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-end
// @match        https://seed.futunn.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=futunn.com
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            function task() {

                console.log('定时任务开始执行:', new Date())
                let newPage = GM_openInTab('https://mobile.futunn.com/credits-v2/index', { active: true, insert: true, setParent :true });
                setTimeout(() => {
                    newPage.close()
                }, 10*1000);
            }

            function excuteTask(h, m, s, task) {
                var timerId = setInterval(function () {
                    var date = new Date();
                    if (date.getHours() === h && date.getMinutes() === m && date.getSeconds() === s) {
                        clearInterval(timerId)
                        task();
                        //每隔一天执行
                        setInterval(task, 30*60 * 1000)
                    }
                    console.log(date)
                }, 1000)
                }
            //比如在每天18:30执行
            excuteTask(0, 1, 0, task);

            let touchCount=0;
            console.log('Start');
            setTimeout(() => {
                if($('#useCanvas').length==1){
                    console.log('等待0');
                    setTimeout(() => { $('#useCanvas').trigger('click');},2000);
                    setTimeout("console.log('等待1')", 500 );
                    if($('body > div.floatBox01.seedDetailBox > div > div.exInfo > h2').text()=='积分种子'){
                        //立即使用
                        setTimeout(() => { $('body > div.floatBox01.seedDetailBox > div > div.btnBar01.ng-scope > a:nth-child(3)').trigger('click'); },2000);
                        console.log('等待2');
                        $('body > div.floatBox01.seedDetailBox > div > div.btnBar01.ng-scope > a:nth-child(3)').trigger('click');

                        setTimeout(() => { $('body > div.floatBox01.seedDetailBox > div > div.btnBar01.ng-scope > a:nth-child(3)').trigger('click'); },2000);
                        $('body > div:nth-child(13) > div > div.close').trigger('click');
                        location.reload();
                    }else if($('body > div.floatBox01.seedDetailBox > div > div.exInfo > h2').text()=='免佣种子'){
                        console.log('免佣种子,请手动使用');
                        setTimeout(() => { $('body > div.floatBox01.seedDetailBox > div > div.btnBar01.ng-scope > a:nth-child(2)').trigger('click'); },500);
                    }
                    setTimeout(() => {  $('body > div.floatBox01.seedDetailBox > div > div.close > .btn').trigger('click');},200);
                    //关闭
                }
            },1000*3);

            setInterval(()=>{
                $('#glowingCanvas').trigger('click');
                touchCount+=1;
                console.log(new Date().toLocaleString(),'互动种子...',touchCount);
            },Math.floor(Math.random()*10)*1000+5000);

            setTimeout(() => {
                $('#waterCanvas').trigger('click');
                console.log(new Date().toLocaleString(),'正在浇水...');
            },1000*3);

            setTimeout(() => {
                location.reload()
            },1000*60*30);

            console.log('End');
            // $('.avatar').trigger('click');

        }}

})();


const myid = chrome.i18n.getMessage("@@extension_id");
const url = `chrome-extension://${myid}/records.html`;

var info;
var data_flag = false;

chrome.storage.local.get("info", data => {
    if (typeof data.info != "undefined") {
        data_flag = true;
        info = data.info;
    }
});

chrome.storage.local.get("value", data => {
    if (data_flag && typeof data.value != "undefined") {
        document.getElementsByTagName('html')[0].style.height = '280px';
        document.getElementById('status').innerText = "";
        document.getElementById('text-container').innerHTML =
            `<b>${info[1]}　</b>${info[0]}｜${info[2]}`;
        document.getElementsByTagName('img')[0].remove();
        document.getElementById('btns').innerHTML =
            "<button id='show-data'>查看修課紀錄</button><button id='del-data'>刪除資料</button></div>"

        var show = document.getElementById('show-data');
        var del = document.getElementById('del-data');
        show.addEventListener('click', function () {
            chrome.tabs.query({ 'url': url }, function (tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { 'active': true });
                } else {
                    chrome.tabs.create({ 'url': url });
                }
            });
        });
        del.addEventListener('click', function () {
            chrome.storage.local.clear()
            del.disabled = true;
            show.disabled = true;
            document.getElementById('text-container').innerText = "已刪除資料！"
            chrome.tabs.query({ 'url': url }, function (tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.remove(tabs[0].id);
                }
            });
        });
    }
});
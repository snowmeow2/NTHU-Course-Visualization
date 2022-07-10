var table;
var mainFrame = document.getElementsByTagName('frame')[2];

mainFrame.addEventListener('load', function () {
    let content = window.frames["main"].document;
    let content_title = content.getElementsByClassName('title')[0];
    if (typeof content_title !== 'undefined') {
        if (content_title.innerText.includes('Grade Announcement')) {
            table = $(content.getElementsByTagName('table')[0]).find('tr');
            readTable(table);

            $(content_title).append('<br><h4 style="margin-top: 15px; padding: 10px; color:green;">已讀取修課紀錄！</h4>');
            // $(content_title).append('<br><button id="link-btn" style="margin-top: 15px; padding: 10px;">個人修課紀錄</button>');
            // let btn = window.frames["main"].document.getElementById('link-btn');
            // btn.addEventListener('click', function () {

            // });
            console.log(table);
        }
    }
})

function readTable(table) {
    var info_raw = table.eq(0).text().replace(/\n|\t/g, '').split('　　');
    var credits_raw = $(table.eq(1)).find('p').text().replace(/\n|\t/g, '').split('　');
    var info = [];
    var credits = [];
    var index = [];
    var Curriculum = [];

    info_raw.forEach(element => {
        info.push(element.split('：').pop())
    });
    info.pop();

    credits_raw.forEach(element => {
        credits.push(element.split('：').pop())
    });

    $(table.eq(2)).find('td').each(function () {
        index.push(this.innerHTML.split('<br>')[0].replace(/\n|\t/g, ''));
    })

    $(table.slice(3, -1)).each(function () {
        let course = [];
        $(this).find('td').each(function (k, v) {
            course.push($(v).text().replace(/\n|\t|\s|\u00a0|/g, '')
                .replace('----', '')
                .split('Syllabus')[0]
                .split(/(--)(?!.*--).*GEcourse/)[0])
        });
        Curriculum.push(course);
    })

    chrome.storage.local.set({ 'info': info });
    chrome.storage.local.set({ 'credits': credits });
    chrome.storage.local.set({ 'value': Curriculum });
}
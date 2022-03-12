var table = $("table:not([style='border-style:none;']):first").find('tr');
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

chrome.storage.local.set({'info': info});
chrome.storage.local.set({'credits': credits});
chrome.storage.local.set({'value': Curriculum});
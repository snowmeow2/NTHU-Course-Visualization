const year = new Set();

var Curriculum;
var show_Curriculum;
var moving = false;

chrome.storage.local.get("info", data => {
    if (typeof data.info == "undefined") {
        alert("ERR!");
    } else {
        info = data.info;
        d3.select("#student-id").text(info[0]);
        d3.select("#student-name").text(info[1]);
        d3.select("#student-department").text(info[2]);
    }
});
chrome.storage.local.get("value", data => {
    if (typeof data.value == "undefined") {
        alert("ERR!");
    } else {
        Curriculum = data.value;
        show_Curriculum = data.value;

        Curriculum.forEach(e => year.add(e[0]));
        let year_array = [];
        year.forEach(e => year_array.push({ 'data': e }))
        d3.select("#dropdown-year-menu")
            .selectAll('li')
            .data(year_array)
            .enter()
            .append('li')
            .html(d => `<span class="dropdown-item dropdown-year" data="${d.data}">${d.data} 學年</span>`)
            .on("click", function (d) {
                let b = d.data;
                d3.select("#btn-year span")
                    .text(b)
                    .attr("data", b);
                highlight(`:not([r_year='${b}'])`);
            });

        getTreejson(Curriculum)['children'].forEach(e => {
            color_map[e.name] = color(e.name);
        })
        plotTreemap(getTreejson(Curriculum));
    }
});

// plot treemap
var bar_width = d3.select("#bar-plot");
var width = d3.select("#tree-container");
var height = d3.select("body");

const color = d3.scaleOrdinal()
    .domain(["1", "2", "3", "4", "5", "6", "7", "8"])
    .range(["#5B6C5D", "#CA4F0C", "#9097C0", "#CC7306", "#34435E", "#6B9C46", "#327E67", "#41576C"])

var color_map = {};

const GPA_opacity = d3.scaleLinear()
    .domain([1.5, 4.3])
    .range([.5, 1])

var treemap = d3.treemap()
    .size([Number(width.style("width").slice(0, -2)), Number(height.style("height").slice(0, -2)) * 0.62])
    .paddingTop(30)
    .paddingRight(12)
    .paddingInner(3)      // Padding between each rectangle

// append the svg object to the body of the page
var svg = d3.select("#course_map")
    .append("svg")
    .attr("width", Number(width.style("width").slice(0, -2)))
    .attr("height", Number(height.style("height").slice(0, -2)) * 0.62)
    .append("g")
    .attr("transform", `translate(${0},${-30})`)

var bar_plot = d3.select("#bar-plot")
    .append('svg')
    .attr('width', Number(bar_width.style("width").slice(0, -2)) * 1)
    .attr('height', 60)
    .append('g')

var bar_card = d3.select("#card-container")
    .append('div')
    .attr("class", "overflow-hidden")
    .attr('id', 'card-bar')

function plotTreemap(table) {
    const root = d3.hierarchy(table).sum(d => d.credits)
    const leaves = treemap(root).leaves();
    const rects = svg.selectAll("rect")
        .data(leaves, d => d.data.cxid)
    var timer;

    cancel_highlight();
    stackedBar(table);

    rects.exit().remove();
    rects.transition().duration(800)
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0);

    rects.enter().append("rect")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr('r_year', d => d.data.year)
        .attr('r_semester', d => d.data.semester)
        .style("rx", "5px")
        .style("stroke", d => color(d.parent.data.name))
        .style("fill", d => color(d.parent.data.name))
        .on("mouseover", function (d) {
            d3.select(this)
                .style("fill", function () {
                    return d3.rgb(d3.select(this).style("fill")).darker(0.6);
                });
            if (!d3.select("#card_lock").property("checked")) {
                change_card(d);
            }
            timer = setTimeout(highlight, 1500, `:not([r_year='${d.data.year.toString()}'][r_semester='${d.data.semester.toString()}'])`);
        })
        .on("mouseout", function (d) {
            clearTimeout(timer);
            cancel_highlight();
            d3.select(this)
                .style("fill", function () {
                    return d3.rgb(d3.select(this).style("fill")).brighter(0.6);
                });
        })
        .on("click", function (d) {
            d3.select("#card_lock").property("checked", true);
            change_card(d);
        })
        .style("opacity", 0)
        .transition().duration(800)
        .style("opacity", d => GPA_opacity(GPA_dict[d.data.score]));

    // add the text labels
    const course_name = svg.selectAll(".course-container")
        .data(leaves, d => d.data.cxid);
    const check_width = d => {
        if (d.x1 - d.x0 - 30 < 0) {
            return "none"
        } else {
            return "table"
        }
    }

    course_name.exit().remove();
    course_name.transition().duration(800)
        .attr("transform", d => `translate(${d.x0 + 4},${d.y0 + 4})`)
        .attr("width", d => d.x1 - d.x0 - 8)
        .attr("height", d => d.y1 - d.y0 - 8)
    svg.selectAll(".course-text-container")
        .data(leaves, d => d.data.cxid)

        .style("width", d => d.x1 - d.x0 - 8)
        .style("height", d => d.y1 - d.y0 - 8)
        .style("display", d => check_width(d));

    course_name.enter().append("foreignObject")
        .attr('class', 'course-container')
        .attr("transform", d => `translate(${d.x0 + 4},${d.y0 + 4})`)
        .attr("width", d => d.x1 - d.x0 - 8)
        .attr("height", d => d.y1 - d.y0 - 8)

        .append("xhtml:div")
        .attr('class', 'course-text-container')
        .style("width", d => d.x1 - d.x0 - 8)
        .style("height", d => d.y1 - d.y0 - 8)
        .style("display", d => check_width(d))

        .append('xhtml:p')
        .attr("class", "course-text")
        .attr('r_year', d => { return d.data.year })
        .attr('r_semester', d => { return d.data.semester })
        .html(d => d.data.name)
        .style("opacity", 0)
        .transition().duration(800)
        .style("opacity", 1);

    // Add title for each depart
    const departs_name = svg.selectAll(".depart-text")
        .data(root.descendants().filter(d => d.depth == 1), d => d.data.name);

    departs_name.exit().remove();
    departs_name.transition().duration(800)
        .attr("x", d => d.x0)
        .attr("y", d => d.y0 + 21);

    departs_name.enter().append("text")
        .attr("class", "depart-text")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0 + 21)
        .text(d => d.data.name)
        .attr("font-size", "16px")
        .attr("fill", d => color(d.data.name))
        .style("opacity", 0)
        .on("mouseover", function () {
            d3.select(this)
                .transition().duration(150)
                .style("opacity", 0)
                .transition().duration(150)
                .style("opacity", 1)
                .text(function (d) {
                    const longname = departs_ZH_name[d.data.name]
                    const cut_longname = longname.slice(0, (d.x1 - d.x0) / 16 - 2);
                    return (cut_longname != longname) ? cut_longname + '...' : longname
                })
        })
        .on("mouseout", function () {
            d3.select(this).transition().duration(150)
                .style("opacity", 0)
                .transition().duration(150)
                .style("opacity", 1)
                .text(d => d.data.name)
        })
        .transition().duration(800)
        .style("opacity", 1)
}

function highlight(condition) {
    cancel_highlight();
    svg.selectAll("rect" + condition).classed("lowlight", true);
    svg.selectAll(".course-text" + condition).classed("lowlight", true)
}

function cancel_highlight() {
    svg.selectAll("rect").classed("lowlight", false);
    svg.selectAll(".course-text").classed("lowlight", false);
}

function change_card(d) {
    d3.select("#btn-year span").style("color", "white")
        .text(d.data.year)
        .attr("data", d.data.year)
        .transition().duration(300)
        .style("color", "black");
    d3.select("#btn-semester").style("color", "white")
        .text(semester_dict[d.data.semester])
        .attr("data", d.data.semester)
        .transition().duration(300)
        .style("color", "black");
    d3.select("#course-id").style("opacity", 0)
        .html(d.data.cid + " <sup>" + d.data.ge_type + "</sup>")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#course-name").style("opacity", 0)
        .text(d.data.name)
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#credits").style("opacity", 0)
        .text(d.data.credits)
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#score").style("opacity", 0)
        .text(d.data.score)
        .style("color", score_color[d.data.score])
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#rel-score").style("opacity", 0)
        .text(d.data.rel_score ? d.data.rel_score : "－")
        .attr("data", d.data.rel_score ? d.data.rel_score : "－")
        .attr("data2", function () {
            let e = d3.select(this).attr("data").split("/");
            return "前 " + (Number(e[0]) / Number(e[1]) * 100).toFixed(2) + " %";
        })
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#t-score").style("opacity", 0)
        .text(d.data.t_score ? d.data.t_score : "－")
        .attr("data", d.data.t_score ? d.data.t_score : "－")
        .attr("data2", function () {
            let e = d3.select(this).attr("data");
            return ((e - 50) >= 0 ? "+" : "-") + ((e - 50) / 10).toFixed(2) + "<span style='color:#6c757d'> 個標準差</span>";
        })
        .transition().duration(300)
        .style("opacity", 1);
}

function clear_card() {
    d3.select("#course-id").style("opacity", 0)
        .text("科號")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#course-name").style("opacity", 0)
        .text("科目名稱")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#credits").style("opacity", 0)
        .text("－")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#score").style("opacity", 0)
        .text("－")
        .style("color", "black")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#rel-score").style("opacity", 0)
        .text("－")
        .attr("data", "－")
        .attr("data2", "－")
        .transition().duration(300)
        .style("opacity", 1);
    d3.select("#t-score").style("opacity", 0)
        .text("－")
        .attr("data", "－")
        .attr("data2", "－")
        .transition().duration(300)
        .style("opacity", 1);
}

function stackedBar(table) {
    const data = getCourseStat(table);
    const total = d3.sum(data, d => d.total_credit);
    const _width = Number(bar_width.style("width").slice(0, -2)) * 1;

    // set up scales for horizontal placement
    const xScale = d3.scaleLinear()
        .domain([0, total])
        .range([0, _width])

    // stack rect for each data value
    var bars = bar_plot.selectAll('rect').data(data, d => d.name)

    bars.exit().remove();
    bars.transition().duration(800)
        .attr('x', d => xScale(d.cumulative))
        .attr('width', d => xScale(d.total_credit));

    bars.enter().append('rect')
        .attr('class', 'rect-stacked')
        .attr('x', d => xScale(d.cumulative))
        .attr('y', 0)
        .attr('height', 35)
        .attr('width', d => xScale(d.total_credit))
        .attr('name', d => d.name)
        .style('fill', d => color_map[d.name])
        .on("mouseover", function (d) {
            if (!moving) {
                d3.select(this)
                    .transition().duration(300)
                    .attr('y', 5)
            }
        })
        .on("mouseout", function (d) {
            if (!moving) {
                d3.select(this)
                    .transition().duration(300)
                    .attr('y', 0)
            }
        })
        .on('mousemove', function (d) {
            var offset = (d3.mouse(this)[0]) / _width;
            var card_offest = offset * 1 * (d3.select("#card-bar").property("scrollWidth") - d3.select("#card-bar").property("offsetWidth"));
            d3.select("#card-bar").property("scrollLeft", card_offest);
        })

    d3.select("#total-classes").text(d3.sum(data, d => d.classes) + " 門課")
        .style("color", "white")
        .transition().duration(600)
        .style("color", "black");
    d3.select("#total-credits").text(total + " 學分")
        .style("color", "white")
        .transition().duration(600)
        .style("color", "black");;

    d3.select("#card-bar").html("");
    var cards = bar_card.selectAll("div .card").data(data, d => d.name);

    cards.enter().append("div")
        .classed("card", true)
        .classed("depart-card", true)
        .classed("mx-1", true)
        .attr("name", d => d.name)
        .each(function (d) {
            d3.select(this).append("div")
                .classed("card-header", true)
                .classed("depart-card-header", true)
                .style("background-color", color_map[d.name])
                .text(d.name)
                .on("mouseover", function (d) {
                    if (!moving) {
                        d3.select(`#bar-plot rect[name=${d.name}]`)
                            .transition().duration(300)
                            .attr('y', 15)
                    }
                })
                .on("mouseout", function (d) {
                    if (!moving) {
                        d3.select(`#bar-plot rect[name=${d.name}]`)
                            .transition().duration(300)
                            .attr('y', 0)
                    }
                })
            d3.select(this).append("div")
                .classed("card-body", true)
                .each(function (d) {
                    d3.select(this).append("h4")
                        .classed("card-text", true)
                        .classed('percent-text', true)
                        .text(d.percent + ' %')
                    d3.select(this).append("small")
                        .classed("card-text", true)
                        .classed("score-text", true)
                        .text(function (d) {
                            const mode = d3.select("input:checked").attr("id");
                            switch (mode) {
                                case 'btn-score-abc':
                                    var t = (isNaN(d.average_score)) ? '－' : GPA_ABC_func(GPA_PER_dict[Number(d.average_score)]);
                                    return '平均等第 ' + t

                                case 'btn-score-per':
                                    var t = (isNaN(d.average_score)) ? '－' : GPA_PER_dict[Number(d.average_score)];
                                    return '平均 ' + t + ' 分'

                                case 'btn-score-gpa':
                                    var t = (isNaN(d.average_score)) ? '－' : d.average_score;
                                    return '平均 GPA ' + t;
                            }
                        });
                });
        })
        .style("opacity", 0)
        .style("top", 100)
        .transition().duration(600)
        .style("top", 0)
        .style("opacity", 1);

    let isDown = false;
    var slider = d3.select("#card-bar")
    slider
        .on("mousedown", function () {
            isDown = true;
            slider.classed("drag", true);
            startX = d3.mouse(this)[0] - slider.property("offsetLeft");
            scrollLeft = slider.property("scrollLeft");
        })
        .on("mouseup", function () {
            isDown = false;
            slider.classed("drag", null);
        })
        .on("mousemove", function () {
            if (isDown) {
                const x = d3.mouse(this)[0] - slider.property("offsetLeft");
                const walk = (x - startX) * 1.25; //scroll-fast
                slider.property("scrollLeft", scrollLeft - walk);
            }
        })
}

function getSemester(table, year, semester = '00') {
    var semester_table = [];
    table.forEach(element => {
        if (element[0] == year) {
            if (semester == '00' || element[1] == semester) {
                semester_table.push(element);
            } else if (semester == '20' && element[1] == '30') {
                semester_table.push(element);
            }
        }
    });
    return semester_table;
}

function getTreejson(table, drop_fail = false) {
    var tree = {
        name: 'NTHU',
        children: []
    };
    var departments = {};
    table.forEach(element => {
        let department = element[2].slice(0, -6);
        let course = {
            year: element[0],
            semester: element[1],
            cid: element[2],
            name: element[3],
            credits: Number(element[4]),
            score: element[5] == "成績未到GradeNotSubmitted" ? "成績未到" : element[5],
            ge_type: element[6],
            rel_score: element[7],
            t_score: element[8],
            cxid: element[0] + element[1] + element[2]
        };
        if (!drop_fail || GPA_dict[course.score] >= 1.7 || course.score == "成績未到") {
            if (!(department in departments)) {
                departments[department] = [course];
            } else {
                departments[department].push(course);
            }
        }
    });

    Object.entries(departments).forEach(([k, v]) => {
        if (!['PE', 'ZY', 'ZZ'].includes(k)) {
            tree.children.push({
                name: k,
                children: v
            })
        }
    });
    return tree;
}

function getCourseStat(table) {
    var stat_table = [];
    table['children'].forEach(e => {
        const total_class = e.children.length;
        let total_credit = 0;
        let _total_credit = 0;
        let average_score = 0;
        e.children.forEach(f => {
            if (!(f.score == '二退' || f.score == '成績未到' || f.score == '通過' || f.score == '不通過')) {
                average_score += f.credits * GPA_dict[f.score];
                _total_credit += f.credits;
            }
            total_credit += f.credits;
        })
        stat_table.push({
            'name': e.name,
            'total_credit': total_credit,
            'average_score': (average_score / _total_credit).toFixed(2),
            'classes': total_class
        })
    })
    stat_table.sort((a, b) => b.total_credit - a.total_credit);

    const total = d3.sum(stat_table, d => d.total_credit);
    const percent = d3.scaleLinear()
        .domain([0, total])
        .range([0, 100]);
    let cumulative = 0;
    return stat_table.map(d => {
        cumulative += d.total_credit;
        d['cumulative'] = cumulative - d.total_credit;
        d['percent'] = percent(d.total_credit).toFixed(2);
        return d;
    })
}

window.addEventListener('resize', function () {
    moving = true;
    treemap.size([Number(width.style("width").slice(0, -2)), Number(height.style("height").slice(0, -2)) * 0.65 - 30]);
    d3.select("#course_map svg")
        .attr("width", Number(width.style("width").slice(0, -2)))
        .attr("height", Number(height.style("height").slice(0, -2)) * 0.65 - 30);
    d3.select("#bar-plot svg")
        .attr("width", Number(bar_width.style("width").slice(0, -2)));
    plotTreemap(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
    setTimeout(() => { moving = false }, 900)
}, true);

d3.select("#btn-year")
    .on("mouseover", function () {
        let b = d3.select("#btn-year span").attr("data");
        highlight(`:not([r_year='${b}'])`);
    })
    .on("mouseout", cancel_highlight)
    .on("click", function () {
        if (d3.select("#btn-year span").text()) {
            clear_card();
            let b = d3.select("#btn-year span").attr("data");
            show_Curriculum = getSemester(Curriculum, b, '00');
            plotTreemap(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
        }
    })

d3.select("#btn-semester")
    .on("mouseover", function () {
        let b = d3.select(this).attr("data");
        let y = d3.select("#btn-year span").attr("data");
        highlight(`:not([r_year='${y}'][r_semester='${b}'])`);
    })
    .on("mouseout", cancel_highlight)
    .on("click", function () {
        if (d3.select("#btn-year span").text() && d3.select(this).text() != "學期") {
            clear_card();
            let b = d3.select(this).attr("data");
            let y = d3.select("#btn-year span").attr("data");
            show_Curriculum = getSemester(Curriculum, y, b);
            plotTreemap(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
        }
    })

d3.selectAll(".dropdown-semester").on("click", function () {
    let b = d3.select(this);
    let y = d3.select("#btn-year span").attr("data");
    d3.select("#btn-semester")
        .text(b.text())
        .attr("data", b.attr("data"));
    highlight(`:not([r_year='${y}'][r_semester='${b.attr("data")}'])`)
})

d3.select("#reset").on("click", function () {
    show_Curriculum = JSON.parse(JSON.stringify(Curriculum));
    plotTreemap(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
})

d3.select("#rel-score").on("click", function () {
    let b = d3.select(this);
    if (b.text() != "－") {
        b.html(b.attr("data") == b.text() ? b.attr("data2") : b.attr("data"))
            .style("opacity", 0)
            .transition().duration(300)
            .style("opacity", 1);
    }
});
d3.select("#t-score").on("click", function () {
    let b = d3.select(this);
    if (b.text() != "－") {
        b.html(b.attr("data") == b.text() ? b.attr("data2") : b.attr("data"))
            .style("opacity", 0)
            .transition().duration(300)
            .style("opacity", 1);
    }
});

d3.select("#score-radio").on("change", function () {
    const mode = d3.select("input:checked").attr("id");
    const text = d3.selectAll(".score-text")
    switch (mode) {
        case 'btn-score-abc':
            text.style("opacity", 0)
                .each(function (e, i, j) {
                    let t = (isNaN(e.average_score)) ? '－' : GPA_ABC_func(GPA_PER_dict[Number(e.average_score)]);
                    j[i].innerText = '平均等第 ' + t
                })
                .transition().duration(300)
                .style("opacity", 1)
            break;

        case 'btn-score-per':
            text.style("opacity", 0)
                .each(function (e, i, j) {
                    let t = (isNaN(e.average_score)) ? '－' : GPA_PER_dict[Number(e.average_score)];
                    j[i].innerText = '平均 ' + t + ' 分'
                })
                .transition().duration(300)
                .style("opacity", 1)
            break;

        case 'btn-score-gpa':
            text.style("opacity", 0)
                .each(function (e, i, j) {
                    let t = (isNaN(e.average_score)) ? '－' : e.average_score;
                    j[i].innerText = '平均 GPA ' + t;
                })
                .transition().duration(300)
                .style("opacity", 1)
            break;
    }
})

d3.select("#total-classes").on("click", function () {
    d3.selectAll(".percent-text")
        .style("opacity", 0)
        .each(function (e, i, j) {
            j[i].innerText = (j[i].innerText == e.classes + " 門課") ? (e.percent + " %") : (e.classes + " 門課")
        })
        .transition().duration(300)
        .style("opacity", 1)

});
d3.select("#total-credits").on("click", function () {
    d3.selectAll(".percent-text")
        .style("opacity", 0)
        .each(function (e, i, j) {
            j[i].innerText = (j[i].innerText == e.total_credit + " 學分") ? (e.percent + " %") : (e.total_credit + " 學分")
        })
        .transition().duration(300)
        .style("opacity", 1)
});

d3.select("#show_fail").on("change", function () {
    if (!d3.select(this).property("checked")) {
        clear_card();
        plotTreemap(getTreejson(show_Curriculum, true));
    } else {
        plotTreemap(getTreejson(show_Curriculum, false));
    }
})

d3.select("#hide-control-btn").on("click", function () {
    moving = true;
    if (!d3.select(this).classed("checked")) {
        d3.select(this).html("<i class='fas fa-compress'></i>");
        d3.select("#hide-control-btn").classed("checked", true);
        d3.selectAll(".controller").style("display", "none");
        d3.select("#bar-card").attr("class", "col-12");
        d3.select("#bar-plot svg")
            .attr("width", Number(bar_width.style("width").slice(0, -2)));
        stackedBar(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
        
    } else {
        d3.select(this).html("<i class='fas fa-expand'></i>");
        d3.select("#hide-control-btn").classed("checked", false);
        d3.selectAll(".controller").style("display", "block");
        d3.select("#bar-card").attr("class", "col-md-6");
        d3.select("#bar-plot svg")
            .attr("width", Number(bar_width.style("width").slice(0, -2)));

        stackedBar(getTreejson(show_Curriculum, !d3.select("#show_fail").property("checked")));
    }
    setTimeout(() => { moving = false }, 900)
})
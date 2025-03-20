import {EDITION_DATA} from "./edition-data.js";

$(document).ready(function () {
    $("body").on("click", ".title", function () {
        var node_id = $(this).parent().parent().data("id");
        if ($("#node_" + node_id).children(".node").length > 0) {
            if ($("#node_" + node_id).children(".node").css("display") == "none") {
                $("#node_" + node_id).children(".node").slideDown("fast");
                var span = $(this).children(".plusminus");
                if ($(span).html() == "+") $(span).html("&ndash;");
            } else {
                $("#node_" + node_id + " .node").slideUp("fast");
                $(this).parent().parent().find(".plusminus").each(function () {
                    if ($(this).html() == "\u2013") $(this).html("+");
                });
            }
        } else {
            getChildren($(this).parent().parent());
            var span = $(this).children(".plusminus");
            if ($(span).html() == "+") $(span).html("&ndash;");
        }
    });
});

function getChildren(_this) {
    const id = $(_this).data("id");
    const nodes = EDITION_DATA.nodes
        .filter(node => node.parent_id === id)
        .sort((a, b) => a.sort - b.sort);
    addChildren(_this, nodes);
}

function addChildren(_this, nodes) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ($("#node_" + node.id).length > 0) continue;

        var spacerWidth = (node.depth - 1) * 20;
        var titleWidth = 580 - spacerWidth;
        var html = "<div class='node' id='node_" + node.id + "' data-id='" + node.id + "'>";
        html += "<div class='item'>";
        html += "<div class='spacer' style='width: " + spacerWidth + "px;'>&nbsp;</div>";
        html += "<div class='title'><span class='plusminus'>" + (node.rightnr - node.leftnr > 1 ? "+" : "") + "</span><span class='text' style='width:" + titleWidth + "px;'>" + (node.url != "" ? "<a href='" + node.url + "' target='_blank'>" + node.title + "</a>" : node.title) + "</span></div>";
        html += "</div>";
        html += "</div>";

        $(html).appendTo($(_this)).hide().slideDown("fast");
    }

    if (nodes.length > 0) {
        var span = $(_this).children(".item").children(".title").children(".plusminus");
        if ($(span).html() == "+") $(span).html("&ndash;");
    }
}

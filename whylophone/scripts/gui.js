// Setup
var stepOnColour = "#f3cf63";

// Create UI
//var paper = Raphael(($(document).width()/2)-375, 110, 750, 450);
var paper = Raphael(($(document).width()/2)-400, 100, 800, 450);

// Draw sequencer
var chassis = paper.rect(74, 105, 652, 340, 5);
chassis.attr("fill", "#27363d");
chassis.attr("stroke-width","0");
chassis.attr("stroke-opacity",0);

var bar1 = paper.rect(79,110,640,330);
bar1.attr("stroke-width","0");
bar1.attr("stroke-opacity",0);

var note1 = paper.rect(85,115,70,320);
note1.attr("fill","#7c5cb1");
note1.attr("stroke-width","2");
note1.attr("stroke","#2e4c5a");
note1.attr("stroke-opacity",1);

var note1overlay = paper.rect(85,115,70,320);
note1overlay.attr("fill","#fff");
note1overlay.attr("stroke-width","2");
note1overlay.attr("stroke","#2e4c5a");
note1overlay.attr("stroke-opacity",1);
note1overlay.attr("fill-opacity",0);

var note2 = paper.rect(165,125,70,300);
note2.attr("fill","#fdfe02");
note2.attr("stroke-width","2");
note2.attr("stroke","#2e4c5a");
note2.attr("stroke-opacity",1);

var note2overlay = paper.rect(165,125,70,300);
note2overlay.attr("fill","#fff");
note2overlay.attr("stroke-width","2");
note2overlay.attr("stroke","#2e4c5a");
note2overlay.attr("stroke-opacity",1);
note2overlay.attr("fill-opacity",0);

var note3 = paper.rect(245,135,70,280);
note3.attr("fill","#6dbdfe");
note3.attr("stroke-width","2");
note3.attr("stroke","#2e4c5a");
note3.attr("stroke-opacity",1);

var note3overlay = paper.rect(245,135,70,280);
note3overlay.attr("fill","#fff");
note3overlay.attr("stroke-width","2");
note3overlay.attr("stroke","#2e4c5a");
note3overlay.attr("stroke-opacity",1);
note3overlay.attr("fill-opacity",0);

var note4 = paper.rect(325,145,70,260);
note4.attr("fill","#fb2ea9");
note4.attr("stroke-width","2");
note4.attr("stroke","#2e4c5a");
note4.attr("stroke-opacity",1);

var note4overlay = paper.rect(325,145,70,260);
note4overlay.attr("fill","#fff");
note4overlay.attr("stroke-width","2");
note4overlay.attr("stroke","#2e4c5a");
note4overlay.attr("stroke-opacity",1);
note4overlay.attr("fill-opacity",0);

var note5 = paper.rect(405,155,70,240);
note5.attr("fill","#fe2411");
note5.attr("stroke-width","2");
note5.attr("stroke","#2e4c5a");
note5.attr("stroke-opacity",1);

var note5overlay = paper.rect(405,155,70,240);
note5overlay.attr("fill","#fff");
note5overlay.attr("stroke-width","2");
note5overlay.attr("stroke","#2e4c5a");
note5overlay.attr("stroke-opacity",1);
note5overlay.attr("fill-opacity",0);

var note6 = paper.rect(485,165,70,220);
note6.attr("fill","#6161ac");
note6.attr("stroke-width","2");
note6.attr("stroke","#2e4c5a");
note6.attr("stroke-opacity",1);

var note6overlay = paper.rect(485,165,70,220);
note6overlay.attr("fill","#fff");
note6overlay.attr("stroke-width","2");
note6overlay.attr("stroke","#2e4c5a");
note6overlay.attr("stroke-opacity",1);
note6overlay.attr("fill-opacity",0);

var note7 = paper.rect(565,175,70,200);
note7.attr("fill","#6cf4fe");
note7.attr("stroke-width","2");
note7.attr("stroke","#2e4c5a");
note7.attr("stroke-opacity",1);

var note7overlay = paper.rect(565,175,70,200);
note7overlay.attr("fill","#fff");
note7overlay.attr("stroke-width","2");
note7overlay.attr("stroke","#2e4c5a");
note7overlay.attr("stroke-opacity",1);
note7overlay.attr("fill-opacity",0);

var note8 = paper.rect(645,185,70,180);
note8.attr("fill","#429c46");
note8.attr("stroke-width","2");
note8.attr("stroke","#2e4c5a");
note8.attr("stroke-opacity",1);

var note8overlay = paper.rect(645,185,70,180);
note8overlay.attr("fill","#fff");
note8overlay.attr("stroke-width","2");
note8overlay.attr("stroke","#2e4c5a");
note8overlay.attr("stroke-opacity",1);
note8overlay.attr("fill-opacity",0);

var setOpacity = function (level, drumNum) {
    var theNote = eval("note" + drumNum + "overlay");
    theNote.attr("fill-opacity",level);
}

var fadeOut = function (theNote) {
    for (i = 0; i <= 1; i += (1 / 20)) {
        setTimeout("setOpacity(" + (1 - i) + "," + theNote + ")", i * 500);
    }
}



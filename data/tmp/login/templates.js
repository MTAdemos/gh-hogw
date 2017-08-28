// templates for inserting standard patterns

var templatearr=new Array();

templatearr[templatearr.length]="templatedefault";
var templatedefault="";
templatedefault+="<div class='default editable'>Content goes here</div>";


templatearr[templatearr.length]="templatenewsitem";
var templatenewsitem="";
templatenewsitem+="<div class='newsitem templatenewsitem editable'>\n";
templatenewsitem+="  <div class='title  CanNotDelete'>Title</div>\n";
templatenewsitem+="  <div class='leader  CanNotDelete'>leader text</div>\n";
templatenewsitem+="<p>\n";
templatenewsitem+="Main text\n";
templatenewsitem+="</p>\n";
templatenewsitem+="  <div class='date  CanNotDelete'>date</div>\n";
templatenewsitem+="</div>\n\n\n";



templatearr[templatearr.length]="templateevent";
var templateevent=""
templateevent+="<div class='event editable templateevent'>\n";
templateevent+="  <div class=dateinfo>\n";
templateevent+="    <div class=hidden>\n";
templateevent+="      <div class=day></div>\n";
templateevent+="      <div class=month></div>\n";
templateevent+="      <div class=year></div>\n";
templateevent+="      <div class=textdate></div>\n";
templateevent+="      <div class=venue></div>\n";
templateevent+="    </div>\n";
templateevent+="  </div>\n";
templateevent+="<div class='dates CanNotDelete'>Dates</div>\n";
templateevent+="<div class='eventinfo'>\n";
templateevent+="  <div class='performer'><div class='name CanNotDelete'>Christopher Hogwood</div> <div class='instrument CanNotDelete'>conductor</div><div class=spaceholder></div></div>\n";
templateevent+="  <div class='performer'><div class='name CanNotDelete'>name</div> <div class='instrument CanNotDelete'>Instrument</div><div class=spaceholder></div></div>\n";
templateevent+="</div>\n";
templateevent+="<div class='program'>\n";
templateevent+="  <div class=work><div class='composer CanNotDelete'>composer</div><div class=spaceholder></div><div class='piece CanNotDelete'>piece</div></div>\n";
templateevent+="  <div class=work><div class='composer CanNotDelete'>composer</div><div class=spaceholder></div><div class='piece CanNotDelete'>piece</div></div>\n";
templateevent+="</div>\n";
templateevent+="<div class='eventinfo'>\n";
templateevent+="  <div class=performer>Other place for performer name <span class=instrument>Instrument</span><div class=spaceholder></div></div>\n";
templateevent+="  <b>Town</b><br>\n";
templateevent+="  Venue<br>\n";
templateevent+="  Date\n";
templateevent+="</div>\n";
templateevent+="<!-- event --></div>\n\n\n";

templatearr[templatearr.length]="templatepublication";
var templatepublication="";

templatepublication+="<div class='publication templatepublication editable'>\n";
templatepublication+="  <div class=textwrapper>\n"
templatepublication+="    <div class='date CanNotDelete'>date</div>\n";
templatepublication+="    <div class='title1 CanNotDelete'>title</div>\n";
templatepublication+="    <div class='title2 CanNotDelete'>attribution</div>\n";
templatepublication+="    <div class='publisher CanNotDelete'>publisher</div>\n";
templatepublication+="    <div class=reviewquote>quote from review</div>\n";
templatepublication+="  </div>\n";
templatepublication+="Image\n";
templatepublication+="<!-- publication --> </div>\n\n\n";

var calperformerstr="<div class=performer><div class='name CanNotDelete'>name</div> <div class='instrument CanNotDelete'>instrument</div><div class=spaceholder></div></div>";
var calworkstr="<div class=work><div class='composer CanNotDelete'>Composer</div><div class=spaceholder></div><div class='piece CanNotDelete'>piece</div></div>";

var templatediscogitem="";
                                            
templatediscogitem+="\n\n";
templatediscogitem+="<div class='discogitem templatediscogitem editable'>\n";
templatediscogitem+="  <div class='composer CanNotDelete'>Composer</div>\n";
templatediscogitem+="  <div class='title CanNotDelete'>Title</div>\n";
templatediscogitem+="\n    PHOTO\n";
templatediscogitem+="  <div class='repertoire CanNotDelete'>\n";
templatediscogitem+="    List of works\n";
templatediscogitem+="  </div>\n";
templatediscogitem+="\n";
templatediscogitem+="  <div class=performers>\n";
templatediscogitem+="    <div class=pwrap><div class='name CanNotDelete'>Name</div><div class=instrument>Instrument</div></div>\n";
templatediscogitem+="    <div class=pwrap><div class='name CanNotDelete'>Name</div><div class=instrument>Instrument</div></div>\n";
templatediscogitem+="    <div class=pwrap><div class='name CanNotDelete'>Name</div><div class=instrument>Instrument</div></div>\n";
templatediscogitem+="  </div>\n";
templatediscogitem+="\n";
templatediscogitem+="  <p class='info CanNotDelete'>\n";
templatediscogitem+="    Information\n";
templatediscogitem+="  </p>\n";
templatediscogitem+="\n";
templatediscogitem+="  <div class=recorded>\n";
templatediscogitem+="    <div class=tag>Recorded</div>  <div class=recordinginfo>Date</div>\n";
templatediscogitem+="  </div> <!-- recorded -->\n";
templatediscogitem+="\n";
templatediscogitem+="  <p class='info CanNotDelete'>\n";
templatediscogitem+="    Information\n";
templatediscogitem+="  </p>\n";
templatediscogitem+="\n";
templatediscogitem+="  <div class=released>\n";
templatediscogitem+="    <div class=tag>Released</div> <div class=date>Date</div>\n";
templatediscogitem+="    <div class=format>CD</div>\n";
templatediscogitem+="    <div class=number>Number</div>\n";
templatediscogitem+="  </div> <!-- released -->\n";
templatediscogitem+="  <p class='info CanNotDelete'>\n";
templatediscogitem+="    Information\n";
templatediscogitem+="  </p>\n";
templatediscogitem+="\n";
templatediscogitem+="  <div class=reissued>\n";
templatediscogitem+="    <div class=tag>Re-issued</div> <div class=date>Date</div>\n";
templatediscogitem+="    <div class=format>CD</div>\n";
templatediscogitem+="    <div class=number>Number</div>\n";
templatediscogitem+="  </div>\n";
templatediscogitem+="  <p class='info CanNotDelete'>\n";
templatediscogitem+="    Information\n";
templatediscogitem+="  </p>\n";
templatediscogitem+="\n";
templatediscogitem+="  <div class='note'>\n";
templatediscogitem+="    <div class='tag CanNotDelete'>Note tag</div><div class='notecontent CanNotDelete'>Detail</div>\n";
templatediscogitem+="  </div>\n";
templatediscogitem+="\n";
templatediscogitem+="</div> <!-- discogitem -->\n";

// diagnostic tool

function list_parents(ele){
  var c=0;
  var str="";
  ele.parents().map(function(){
    c++;
    str+=c+ " [" + this.tagName
    if($(this).attr("class")){str+=" " + $(this).attr("class");}
    str+= "]\n ";
  });
  alert(str);
}

// define global holders

// div we are editing
var containingID="";

// filename to write to
var filename="";

// default strings
var editflagsstr="<div class=editflags></div>";

var clicktoeditstr="";
clicktoeditstr+="<br clear=both class=clearbeforeclicktoedit> ";
clicktoeditstr+="<div class=clicktoedit> &#151; ";

clicktoeditstr+="<div class=inner0wrap> ";
clicktoeditstr+="<table class=inner0wrap cellpadding=0 cellspacing=0> ";
clicktoeditstr+="<tr><td><div class=inner0 id=inner0up onclick='$(this).up();'>&uarr; </div></td> ";
clicktoeditstr+="<tr><td><div class=inner0 id=inner0down onclick='$(this).down();'>&darr;</div></td> ";
clicktoeditstr+="</table> ";
clicktoeditstr+="</div> :: ";

clicktoeditstr+="<div class=inner0 onclick='$(this).parent().parent().parent().edit();'>click to edit </div> :: ";
clicktoeditstr+="<span class=ShowOnlyIfTemplateSet>";

clicktoeditstr+="<div class=inner1 onclick='$(this).parent().parent().parent().new_ele();'> new </div> :: ";
clicktoeditstr+="<div class=inner1 onclick='$(this).parent().parent().parent().delete_ele();'> delete </div> :: ";

clicktoeditstr+="</span>";

clicktoeditstr+="<div class=inner1 onclick='$(\"#maincontent\").save(0);'> save in /tmp </div> :: ";
clicktoeditstr+="<div class=inner1 onclick='$(\"#maincontent\").save(1);'> publish </div>";

if(location.pathname.indexOf("news.htm")>-1){
  clicktoeditstr+=" :: <div class=inner1 onclick='$(this).toarchive();'> to archive </div>";
}


clicktoeditstr+=" &#151;</div>";


function make_buttons(ID){

  var buttonsid ="buttons" + ID;
  var buttonsstr="<div class=clicktoedit onclick='javascript:$(\".beingedited\").end_edit();'><div class=clicktoendedit>&#151; click to end editing and preview &#151;</div></div>";

  buttonsstr+="<div class=buttons ID=" + buttonsid + ">";


  buttonsstr+="<button onclick='document.execCommand(\"bold\",false,null);'> bold</button>";
  buttonsstr+="<button onclick='document.execCommand(\"italic\",false,null);'> italic</button>";

  buttonsstr+="<button onclick='genfunc(\"h2\");'> heading-2</button>";
  buttonsstr+="<button onclick='genfunc(\"h3\");'> heading-3</button>";
  buttonsstr+="<button onclick='genfunc(\"p\");'> paragraph</button>";
  buttonsstr+="<button onclick='genfunc(\"pquote\");'>quote paragraph</button>";
  buttonsstr+="<button onclick='genfunc(\"brclearboth\");'>clear image</button>";
  buttonsstr+="<button onclick='createLink();'> create link</button>";

  buttonsstr+="<div class=specialcharacters>";
  buttonsstr+="<div class=label>Special characters: </div>";

  buttonsstr+="<button class=character onclick='replacecontent(\"145\");'> &#145;</button>";
  buttonsstr+="<button class=character onclick='replacecontent(\"146\");'> &#146;</button>";
  buttonsstr+="<button class=character onclick='replacecontent(\"147\");'> &#147;</button>";
  buttonsstr+="<button class=character onclick='replacecontent(\"148\");'> &#148;</button>";
  buttonsstr+="<button class=character onclick='replacecontent(\"150\");'> &#150;</button>";
  buttonsstr+="<button class=character onclick='replacecontent(\"151\");'> &#151;</button>";

  buttonsstr+="</div>";


  buttonsstr+="<br>";

  buttonsstr+="<button onclick='document.execCommand(\"justifyleft\",false,null);'> justify left</button>";
  buttonsstr+="<button onclick='document.execCommand(\"justifycenter\",false,null);'> justify center</button>";
  buttonsstr+="<button onclick='document.execCommand(\"justifyright\",false,null);'> justify right</button>";

  buttonsstr+="<br>";
  buttonsstr+="<button onclick='addImage(\"" + buttonsid + "\",\"imgleft\");'>Image left</button>";
  buttonsstr+="<button onclick='addImage(\"" + buttonsid + "\",\"imgcenter\");'> Image centre</button>";
  buttonsstr+="<button onclick='addImage(\"" + buttonsid + "\",\"imgright\");'>Image right</button>";
  buttonsstr+="<button onclick='addYoxviewImage(\"" + buttonsid + "\");'>Add secondary large image</button>";

  buttonsstr+="<p>";
  buttonsstr+="<hr>";

  buttonsstr+="<button onclick='alert($(\"#maincontent\").html());'> show maincontent</button>";
  buttonsstr+="<button onclick='alert($(this).parent().parent().parent().html());'> show content</button>";


  buttonsstr+="</p>";
  buttonsstr+="</div>";

  return buttonsstr;
}

function add_imageuploadformstr(ID,yoxviewflag){
  var imageuploadformstr="";
  imageuploadformstr+="<div class=imageuploadformwrapper contenteditable=false>";
  imageuploadformstr+="<form ID='imageform' enctype='multipart/form-data'> ";
  imageuploadformstr+="Image file: ";
  if(yoxviewflag<1){
    imageuploadformstr+="<input name='imagetoupload' ID='imagetoupload' type='file' onchange='$(\"#imageform\").imageupload();'>";
    }
  else{
    imageuploadformstr+="<input name='imagetoupload' ID='imagetoupload' type='file' onchange='$(\"#imageform\").imageupload_yoxview();'>";
  }  
  imageuploadformstr+="</form> ";
  imageuploadformstr+="</div>";
  $(eval(ID)).append(imageuploadformstr);
}

var insertedimgclass="";


function addImage(ID,pos){
  var sel=window.getSelection() + "";
  if(sel.length==0){
    alert("please select some text to replace with the image");
    return;
  }
  insertedimgclass=pos;

  document.execCommand("insertImage",false,"../upload/JUSTADDED.gif");

  // now find the image
  var imgadded;
  $("#" + ID).parents(".editable").find("img").each(function(){
    if($(this).attr("src").indexOf("JUSTADDED")>-1)imgadded=$(this);
  });
  if(typeof(imgadded)=="undefined"){
    alert("failed to find uploaded image");
    }
  else{
    imgadded.css("height","auto");   // added as these were being set to 30x300
    imgadded.css("width","auto");
    imgadded.wrap("<div class=" + insertedimgclass + ">");
    imgadded.after(generate_imageborderstr());

//alert("addimg: "  + imgadded.parent().html() + "\n\n*****\n\n" + imgadded.parent().parent().html());
    Add_click_handler(imgadded.parent());
    imgadded.after("<div class='caption CanNotDelete'>CAPTION</div>");
    imgadded.parent().find(".CanNotDelete").wrap("<span contenteditable=false class=CanNotDeleteWrapper></span>");
    imgadded.parent().find(".CanNotDelete").attr("contenteditable","true");
  }

  if($(".imageuploadformwrapper").length>0){
    $(".imageuploadformwrapper").each(function(){$(this).show();});
    }
  else{
    add_imageuploadformstr(ID,0);
  }

}


//function to add a second image tobe shown with yoxview

var workimgalign;
var workimgheight;
var workimgwidth;
var workimgsrc;
var workrange;
var workimgclassname;
var YoxviewExtraClassname;

function addYoxviewImage(ID){                                                                 
    // this needs to cope with either replacing a piece of text with an image, or adding a
    // second image to view with yoxview

  var sel=window.getSelection();

  var CanContinue=1;

  if(CanContinue>0){
    if(sel.rangeCount!=1){
    CanContinue=0;
    }
  }

  if(CanContinue>0){
    workrange=sel.getRangeAt(0);
    var workcontents=workrange.extractContents();
    if(workcontents.childNodes.length!=1){
      CanContinue=0;
    }
    if(!workcontents.firstChild){
      CanContinue=0;
    }
  }

  if(CanContinue>0){            
    if(workcontents.firstChild.tagName.toLowerCase()!="img"){
      alert("this doesn't appear to be an image");
      CanContinue=0;    
    }
  }

  if(CanContinue>0){
     // we know workcontents.firstChild is an image, so

     workimgalign=workcontents.firstChild.align;
     workimgheight=workcontents.firstChild.height;
     workimgwidth=workcontents.firstChild.width;
     workimgsrc=workcontents.firstChild.src;
     workimgclassname=workcontents.firstChild.className;    

     YoxviewExtraClassname="";
     if(workimgclassname.indexOf("imgleft")>-1)YoxviewExtraClassname="imgleft";
     if(workimgclassname.indexOf("imgcenter")>-1)YoxviewExtraClassname="imgcenter";
     if(workimgclassname.indexOf("imgright")>-1)YoxviewExtraClassname="imgright";

     if(YoxviewExtraClassname.length>0){
        workimgclassname=workimgclassname.replace(YoxviewExtraClassname,"");
     }  


     workimgsrc=workimgsrc.substr(workimgsrc.indexOf("upload"));

     if(typeof workimgalign==="undefined"){workimgalign="*";}else{if(workimgalign.length<1)workimgalign="*";}
     if(typeof workimgheight==="undefined")workimgheight="*";
     if(typeof workimgwidth==="undefined")workimgwidth="*";

     add_imageuploadformstr(ID,1); 
  }
  if(CanContinue<1){
    alert("Image selection failed: did the selection include things in addition to the image?");
  }      
}

//////////////////////

jQuery.fn.extend({
  imageupload_yoxview: function(arg){
    // get file object
    var file=$("#imagetoupload").get(0).files[0];

    // hide upload form
    $(".imageuploadformwrapper").each(function(){$(this).hide();});

    var reader=new FileReader();

    var xhr = new XMLHttpRequest();

    fileUpload = xhr.upload;

    xhr.open("POST", "../upload.php", true);

    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.setRequestHeader("X-File-Size", file.size);

    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    reader.readAsBinaryString(file);

    reader.onload=function(evt){
      xhr.sendAsBinary(evt.target.result);
    }

// process uploaded image names after this has loaded

    var str_arr;
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4 && xhr.status==200){

      var newcontent=document.createElement("div");
      newcontent.className="yoxview " + YoxviewExtraClassname;
      workrange.insertNode(newcontent);
      var newstring="";
      
      newstring="<a href='upload/" + file.name + "'>";
      newstring+="<img src='"+ workimgsrc + "' ";
      
      if(workimgwidth!="*"){newstring+="width=" + workimgwidth + " ";}
      if(workimgheight!="*"){newstring+="height=" + workimgheight + " ";}
      if(workimgalign!="*"){newstring+="align=" + workimgalign + " ";}
      if(workimgclassname!="*"){newstring+="class=" + workimgclassname + " ";}
      newstring+="></a>";

      newcontent.innerHTML=newstring;

      workrange.insertNode(newcontent);          

      }
    }

  }
});


jQuery.fn.extend({
  imageupload: function(arg){

    // get file object
    var file=$("#imagetoupload").get(0).files[0];

    // hide upload form
    $(".imageuploadformwrapper").each(function(){$(this).hide();});

    var reader=new FileReader();

    var xhr = new XMLHttpRequest();

    fileUpload = xhr.upload,

    fileUpload.onload = function() {

      // add  + "-className-" + insertedimgclass to add a class to the image,
      // and uncomment material further down which processes this

      var nmc=$("#maincontent").html().replace("../upload/JUSTADDED.gif",  "upload/" + file.name);
      $("#maincontent").html(nmc);
      $("#maincontent").find("img").each(function(){
      var imguploaded;

      if($(this).attr("src").indexOf(file.name)>-1){
        imguploaded=$(this);
        var savesrc=imguploaded.attr("src");
        imguploaded.attr("src","../upload/JUSTADDED.gif");

        imguploaded.load(function(){
         //   imguploaded.attr("width",imguploaded.width());
         //   imguploaded.attr("height",imguploaded.height());
         //   imguploaded.parent().css("width",imguploaded.width() + "px");
        }).attr("src",savesrc);
      }

    });

    }

    xhr.open("POST", "../upload.php", true);

    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.setRequestHeader("X-File-Size", file.size);

    xhr.setRequestHeader("Content-Type", "multipart/form-data");


//    xhr.setRequestHeader("Content-Type", "multipart/form-data;charset=utf-8; boundary= " + Math.random().toString().substr(2));


    reader.readAsBinaryString(file);

    reader.onload=function(evt){
      xhr.sendAsBinary(evt.target.result);
    }

// process uploaded image names after this has loaded

    var str_arr;
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4 && xhr.status==200){

      }
    }

  }
});



// facility to enable buttons that do anything
// for each new entity needed the argument is looked up in wrap_entities to get an
// appropriate HTML element, and in wrap_styles to get any special styling


var wrap_entities=new Array();
var wrap_CSS_class=new Array();

wrap_entities["p"]="p";
wrap_CSS_class["p"]="";

wrap_entities["h2"]="h2";
wrap_CSS_class["h2"]="";

wrap_entities["h3"]="h3";
wrap_CSS_class["h3"]="";

wrap_entities["pquote"]="p";
wrap_CSS_class["pquote"]="quote";

wrap_entities["brclearboth"]="br";
wrap_CSS_class["brclearboth"]="clearboth";

function genfunc(arg){
  var entity=wrap_entities[arguments[0]];
  if(typeof(entity)=="undefined"){alert("genfunc called with argument [" + arguments[0] + "] undefined in wrap_entities");return false;}
  var CSS_class=wrap_CSS_class[arguments[0]];
  if(typeof(CSS_class)=="undefined"){alert("genfunc called with argument [" + arguments[0] + "] undefined in wrap_CSS_class");return false;}

  var selObj=window.getSelection();
  var selRange=selObj.getRangeAt(0);
  var newNode=document.createElement(entity);

  if(CSS_class.length>0)newNode.className=CSS_class;
  selRange.surroundContents(newNode);
}

var replacecontent_array=new Array();
replacecontent_array["145"]="&#145";
replacecontent_array["146"]="&#146";
replacecontent_array["147"]="&#147";
replacecontent_array["148"]="&#148";
replacecontent_array["150"]="&#150";
replacecontent_array["151"]="&#151";


function replacecontent(arg){
  var newcontent=replacecontent_array[arguments[0]];
  if(typeof(newcontent)=="undefined"){alert("replacecontent called with argument [" + arguments[0] + "] undefined in replacecontent_array");return false;}

  var selObj=window.getSelection();
  var selRange=selObj.getRangeAt(0);
  selRange.deleteContents();
  var fragment=selRange.createContextualFragment(newcontent);
  selRange.insertNode(fragment);
}

function createLink(){
  var sel=window.getSelection() + "";
  if(sel.length==0){
    alert("please select some text to make into a link");
    return;
  }
  var urltext=prompt("Enter a URL for link:");
  if(urltext.indexOf("http")<0)urltext="http://" + urltext;

  var a_str="<A href='" + urltext + "' target='new'>" + sel + "</a>";
  document.execCommand("insertHTML",false,a_str);
}





function get_filename(){
  var pathname=location.pathname;
  if(pathname.indexOf("htm")<0)pathname=pathname + "/index.htm";
  return pathname.substr(pathname.lastIndexOf("/")+1);
}



// functions for editing

var thisID=0;

jQuery.fn.extend({
  enable_editing: function(){

    containingID=$(this).parent().prop("ID");
    filename=get_filename();

    // set an ID if there isn't one
    if(!($(this).attr("ID"))){
      while($('#ID' + thisID).length!=0){thisID++;}
      $(this).attr("ID","ID" + thisID);
    }


    if($(this).find(".editflags").length<1){
      $(this).append(editflagsstr);
    }

    $(this).children(".editflags").html(clicktoeditstr);

    if($(this).attr("class").indexOf("template")<0){
      $(".ShowOnlyIfTemplateSet").each(function(){$(this).remove()});
    }

  }
});


jQuery.fn.extend({
  disable_editing: function(){

    containingID=$(this).parent().prop("ID");
    filename=get_filename();

   // set an ID if there isn't one  ??? IS THIS NEEDED?
    if(!($(this).attr("ID"))){
      while($('#ID' + thisID).length!=0){thisID++;}
      $(this).attr("ID","ID" + thisID);
    }

    $(this).children(".editflags").remove();
  }
});



var calendareditstr="";
calendareditstr+="<div class=calendarsecondary>";
calendareditstr+="<div class=inner contenteditable=false onclick='$(this).new_row();'>new </div> :: ";
calendareditstr+="<div class=inner contenteditable=false onclick='$(this).delete_row();'> delete </div> ";
calendareditstr+="</div>";


jQuery.fn.extend({
  new_row: function(){
    if($(this).closest(".program").length>0){
      $(this).closest(".work").after(calworkstr);
      }
    else{
      $(this).closest(".performer").after(calperformerstr);
    }
    $(".event .spaceholder").html(calendareditstr);
  }
});


jQuery.fn.extend({
  delete_row: function(){
    if($(this).closest(".program").length>0){
      $(this).closest(".work").remove();
      }
    else{
      $(this).closest(".performer").remove();
    }
  }
});

var daylookup=new Array();
for(var i=0;i<31;i++){daylookup[i]=i+1;}

var monthlookup=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var yearlookup=new Array();
var currentyear=parseInt(new Date().getFullYear());
for(var i=0;i<3;i++){yearlookup[i]=currentyear+i;}


var dateinfoeditorstr="";
dateinfoeditorstr+="<div id=dateinfoeditor>\n";

dateinfoeditorstr+="<div class=documentation>The information in this box is used to add things to the  \n";
dateinfoeditorstr+="listing on the left. Events are sorted there by the day, year and month  \n";
dateinfoeditorstr+="in the boxes here. By default, each event will appear with just \n";
dateinfoeditorstr+="one day in that menu, but you can over-write this by typing alternative text \n";
dateinfoeditorstr+="in the &#147;alternative text for date&#148; box.</div><p> \n";



dateinfoeditorstr+="Day:<select id=day></select>\n";
dateinfoeditorstr+="Month:<select id=month></select>\n";
dateinfoeditorstr+="Year:<Select id=year></select>\n";
dateinfoeditorstr+="<p>\n";
dateinfoeditorstr+="Alternative text for date: <input id=textdate width=30 maxwidth=100></input>\n";
dateinfoeditorstr+="Venue: <input id=venue width=30 maxwidth=100></input>\n";
dateinfoeditorstr+="</div>\n";

jQuery.fn.extend({
  EnableDateEditing: function(){
    var day=parseInt($(this).find(".dateinfo .day").html());
    var month=$(this).find(".dateinfo .month").html();
    var year=parseInt($(this).find(".dateinfo .year").html());
    var textdate=$(this).find(".dateinfo .textdate").html();
    var venue=$(this).find(".dateinfo .venue").html();

    $(this).find(".dateinfo").append(dateinfoeditorstr);

    $("#dateinfoeditor").attr("contenteditable","false");

    // set years
    for(var i=0;i<yearlookup.length;i++){
      $("#dateinfoeditor #year").append("<option value='"+ i + "'>" + yearlookup[i] + "</option>");
    }

    // set months
    for(var i=0;i<monthlookup.length;i++){
      $("#dateinfoeditor #month").append("<option value='"+ i + "'>" + monthlookup[i] + "</option>");
    }

    // set days
    for(var i=0;i<daylookup.length;i++){
      $("#dateinfoeditor #day").append("<option value='"+ i + "'>" + daylookup[i] + "</option>");
    }

    // set current values
    var year_ind=0;
    for(var i=0;i<yearlookup.length;i++){if(yearlookup[i]==year)year_ind=i;}

    var month_ind=0;
    for(var i=0;i<monthlookup.length;i++){if(monthlookup[i].indexOf(month)>-1)month_ind=i;}

    var day_ind=0;
    for(var i=0;i<daylookup.length;i++){if(daylookup[i]==day)day_ind=i;}

    // set these
    $("#year").prop("selectedIndex",year_ind);
    $("#month").prop("selectedIndex",month_ind);
    $("#day").prop("selectedIndex",day_ind);

//    $("#year>option:selected").html(year);
//    $("#month>option:selected").html(monthlookup[month]);
//    $("#day>option:selected").html(day);
//
    $("#textdate").val(textdate);
    $("#venue").val(venue);

  }
});

var ComposerSelectionArr=new Array('composerA', 'composerB', 'composerC', 'composerD', 'composerE', 'composerF', 'composerG', 'composerH', 'composerI', 'composerJ', 'composerK',
'composerL', 'composerM', 'composerN', 'composerO', 'composerP', 'composerQ', 'composerR', 'composerS', 'composerT', 'composerU', 'composerV', 'composerW', 'composerX',
'composerY', 'composerZ', 'bach', 'beethoven', 'handel', 'haydn', 'martinu', 'mozart', 'purcell', 'vivaldi');

var ComposerSubSelectionArr=new Array( 'instrumental', 'sacredvocal', 'secularvocal', 'symphonies');

var ComposerSelectionStr="";
ComposerSelectionStr+="\n";
ComposerSelectionStr+="<div class=composerselect contenteditable=false>\n";
ComposerSelectionStr+="Which category should this be in?<br> \n";
ComposerSelectionStr+="Either select the composer first letter, or ";
ComposerSelectionStr+="the name of one of the composers shown separately. ";
ComposerSelectionStr+="<select id=composerselectdropdown>\n";
for(var i=0;i<ComposerSelectionArr.length;i++){
  ComposerSelectionStr+="  <option value='" + ComposerSelectionArr[i] +"'>" + ComposerSelectionArr[i] +"</option>\n";
}
ComposerSelectionStr+="</select>\n";
ComposerSelectionStr+="\n";
ComposerSelectionStr+="<div class=composerselectcat> \n";
ComposerSelectionStr+=" <p><p>Please select a section:  \n";
ComposerSelectionStr+="<select id=ComposerSubSelectiondropdown>\n";
for(var i=0;i<ComposerSubSelectionArr.length;i++){
  ComposerSelectionStr+="  <option value='" + ComposerSubSelectionArr[i] + "'>" + ComposerSubSelectionArr[i] + "</option>\n";
}
ComposerSelectionStr+="</select>\n";
ComposerSelectionStr+="</div>\n";  // cstcat
ComposerSelectionStr+="</div>\n";

jQuery.fn.extend({
  EnableComposerLabelEditing: function(){
    var classesStr=$(this).attr("class");
    var classes=classesStr.split(' ');

    // record composer info
    var ComposerLabel="unset";
    var ComposerLabelIndex=-1;
    for(var i=0;i<ComposerSelectionArr.length;i++){
      for(var j=0;j<classes.length;j++)if(classes[j]==ComposerSelectionArr[i]){
        ComposerLabel=ComposerSelectionArr[i];
        ComposerLabelIndex=i;
      }
    }

    // record subselection (if set)
    var ComposerSubSelection="unset";
    var ComposerSubSelectionIndex=-1;
    for(var i=0;i<ComposerSubSelectionArr.length;i++){
      for(var j=0;j<classes.length;j++)if(classes[j]==ComposerSubSelectionArr[i]){
        ComposerSubSelection=ComposerSubSelectionArr[i];
        ComposerSubSelectionIndex=i;
      }
    }

    // add editing string
    $(this).prepend(ComposerSelectionStr);

    // select current composer
    if(ComposerLabelIndex>-1){$('#composerselectdropdown').prop("selectedIndex",ComposerLabelIndex);}      

    // show SubSection selector, and highlight current choice only if ComposerLabel is not a named composer
    if(ComposerLabel.indexOf("composer")<0){

      $(".composerselectcat").show();}
      if(ComposerSubSelectionIndex>-1){$('#ComposerSubSelectiondropdown').prop("selectedIndex",ComposerSubSelectionIndex);}      
    else{
      $(".composerselectcat").hide();
    }

    //  recalculate this if composer changes
    $("#composerselectdropdown").on("change",function(){
      ComposerLabel=ComposerSelectionArr[$("#composerselectdropdown").prop("selectedIndex")];
      if(ComposerLabel.indexOf("composer")<0){
        $(".composerselectcat").show();}
      else{
        $(".composerselectcat").hide();
        ComposerSubSelection="unset"; // unset subselection
      }
    });
  }
});

var imgbordertogglecount=0;
var lastimgborderID;

function generate_imageborderstr(){
  lastimgborderID="imgbordertoggle" + imgbordertogglecount;
  imgbordertogglecount++;

  var imgbordertogglestr="";
  imgbordertogglestr+="<div class=imgbordertoggle contenteditable=false><form action=''>";
  imgbordertogglestr+="dark border to image: ";

  imgbordertogglestr+="<input type=checkbox name=" + lastimgborderID + " value='on'>";
  imgbordertogglestr+="</form>\n";
  imgbordertogglestr+="<div class=deleteimage contenteditable=false onclick='$(this).delete_image();'>delete image</div></form>\n";
  imgbordertogglestr+="</div>";
  return imgbordertogglestr;
}

jQuery.fn.extend({
  delete_image: function(){
    if($(this).parents(".yoxview").length>0){
      $(this).parents(".yoxview").remove();
      }
    else{
      if($(this).parents(".imgleft").length>0){$(this).parents(".imgleft").remove();}
      if($(this).parents(".imgcenter").length>0){$(this).parents(".imgcenter").remove();}
      if($(this).parents(".imgright").length>0){$(this).parents(".imgright").remove();}
    }
  }
});


function Add_click_handler(imgchanging){
  var formtocheck=imgchanging.next();

  if(imgchanging.parents(".yoxview").length>0){
    formtocheck=imgchanging.parents(".yoxview").find("form"); 
    imgchanging=imgchanging.parents(".yoxview").find("img");    
  }

  formtocheck.find("input").change(function(){
//    alert("CHANGED (" + this.checked + ")" );
    if(this.checked){
      imgchanging.addClass("imgdarkborder");
    }
    else{
      imgchanging.removeClass("imgdarkborder");
    }
  });
}


jQuery.fn.extend({
  up: function(){
    var curr=$(this).parents(".editable");
    var prevv=curr.prev();
    if(prevv.hasClass("editable")){
      var tmp=curr.html();
      curr.html(prevv.html());;
      prevv.html(tmp);
    }
    else{
      alert("Can't swap as the previous element is not editable");
    }
  }
});

jQuery.fn.extend({
  down: function(){
    var curr=$(this).parents(".editable");
    var nextv=curr.next();
    if(nextv.hasClass("editable")){     
      var tmp=curr.html();
      curr.html(nextv.html());;
      nextv.html(tmp);
      }
    else{
      alert("Can't swap as the previous element is not editable");
    }
  }
});

// discography editing
var discogpwrapstr="";
discogpwrapstr+="<div class='pwrapsecondary spaceholder'>";
discogpwrapstr+="<div class=inner contenteditable=false onclick='$(this).new_pwrap();'>new </div> :: ";
discogpwrapstr+="<div class=inner contenteditable=false onclick='$(this).delete_pwrap();'> delete </div> ";
discogpwrapstr+="</div>\n";

var pwrapstr="<div class=pwrap>" + discogpwrapstr +"<div class='name CanNotDelete'>name </div><div class='instrument CanNotDelete'>instrument</div></div>\n";  

jQuery.fn.extend({
  new_pwrap: function(){
    $(this).closest(".pwrap").after(pwrapstr);
    $(this).parent().parent().next().HandleCanNotDelete(0);
  }
});

jQuery.fn.extend({
  delete_pwrap: function(){
    $(this).parents(".pwrap").remove();
  }
});

var discogreissuestr1="\n\n\n";
var discogreissuestr2="\n\n\n";
discogreissuestr1+="<span contenteditable=false class=CanNotDeleteWrapper>";
discogreissuestr1+="  <div class='reissued CanNotDelete' contenteditable=true>\n";
discogreissuestr1+="    <div class=tag>Re-issued</div> <div class=date>Date</div>\n";
discogreissuestr1+="    <div class=format>CD</div>\n";
discogreissuestr1+="    <div class=number>Number</div>\n";
discogreissuestr1+="  </div>\n";
discogreissuestr1+="</span>\n";
discogreissuestr2+="<span contenteditable=false class=CanNotDeleteWrapper>";
discogreissuestr2+="  <p class='info CanNotDelete'>\n";
discogreissuestr2+="    Information\n";
discogreissuestr2+="  </p>\n";
discogreissuestr1+="</span>\n";


jQuery.fn.extend({
  new_reissue: function(){
    var AdditionPoint=$(this).parent().next();
    if(AdditionPoint.next().find(".info").length>0){AdditionPoint=AdditionPoint.next();}
    AdditionPoint.after(discogreissuestr1 + "\n" + discogreissuestr2);
  }
});

jQuery.fn.extend({
  delete_reissue: function(){
    $(this).parent().next().remove();         
  }
});


var notewrapstr="";
notewrapstr+="<div class='notewrapsecondary spaceholder'>";
notewrapstr+="<div class=inner contenteditable=false onclick='$(this).new_note();'>new note </div> :: ";
notewrapstr+="<div class=inner contenteditable=false onclick='$(this).delete_note();'> delete </div> ";
notewrapstr+="</div>\n";

var notestr="";
notestr+="  <div class=note>";
notestr+="    <div class=tag>Note</div> detail";
notestr+="  </div>";

jQuery.fn.extend({
  new_note: function(){
    $(this).closest(".note").after(notestr);
    $(this).parent().parent().next().HandleCanNotDelete(0);
  }
});

jQuery.fn.extend({
  delete_note: function(){
    $(this).parents(".note").remove();
  }
});


jQuery.fn.extend({
  HandleCanNotDelete: function(){
if(arguments.length>0)alert("HandleCanNotDelete: " + $(this).html());
    $(this).find(".CanNotDelete").each(function(){
//alert("inner HandleCanNotDelete: " + $(this).html());
      $(this).show();
      if($(this).html().length<1)$(this).html(" ");
      $(this).wrap("<span contenteditable=false class=CanNotDeleteWrapper></span>");
      $(this).attr("contenteditable","true");
//if(arguments.length>0)alert("returning: " + $(this).html());            
    }); 
//alert("handel returns: " + $(this).html());
  }
});

jQuery.fn.extend({
  edit: function(){

    $(".beingedited").end_edit(); // this must come before EnableDateEditing
                                  // to avoid over-writing date info

    // cope with things that are not allowed to be deleted

    // make them visible and wrap them
    $(this).HandleCanNotDelete();

    // special things for calendar page
    if($(".event").length>0){
      $(this).find(".spaceholder").html(calendareditstr);
      $(this).EnableDateEditing();
    }

    // special things for recording page
    if($(".discogitem").length>0){
      $(this).find(".pwrap").each(function(){
        $(this).html(discogpwrapstr +$(this).html());
      });
      $(this).find(".note").each(function(){
        $(this).html(notewrapstr +$(this).html());
      });



      var discogreissuesecondarystr="";
      discogreissuesecondarystr+="<div class='reissuesecondary spaceholder'>";
      discogreissuesecondarystr+="<div class=inner contenteditable=false onclick='$(this).new_reissue();'>new re-issue </div> :: ";
      discogreissuesecondarystr+="<div class=inner contenteditable=false onclick='$(this).delete_reissue();'>delete </div> "; 
      discogreissuesecondarystr+="</div>\n";

// add marker for re-issue after each re-issue, or after release if there is no re-issue
//  The insertion point is after the <p class=info> if there is one

      var ReissueAdded=0;
      $(this).find(".reissued").each(function(){
        $(this).before(discogreissuesecondarystr);      
        ReissueAdded=1;
      });

      if(ReissueAdded<1){
        var releasedlen=$(this).find(".released").length;       
        if(releasedlen>0){
          $(this).find(".released").eq(releasedlen-1).before(discogreissuesecondarystr);
          ReissueAdded=1;
        }
      }

      if(ReissueAdded<1)alert("Can't find the place to add a reissue. Please contact Mark");
      
      $(this).EnableComposerLabelEditing();
    }

    // enable border on images to altered and have the checkbox checked or not
    // according to the class of the image

    $(this).find("img").each(function(){
      if($(this).parents(".yoxview").length>0){
        $(this).parents(".yoxview").find("a").after(generate_imageborderstr());
        }
      else{
        $(this).after(generate_imageborderstr());
        $(this).next().find("input").prop("checked",$(this).hasClass("imgdarkborder"));
      }

      // install event handler for click to change border
      Add_click_handler($(this));


//      $(this).on("click",function(){
//alert ("************ REMOVE THIS ONCLICK HANDLER ***********");
//alert($(this).html());
//alert($(this).parent().html());
//alert($(this).parent().parent().html());
//});

    });

    // paste event handler
    $(this).unbind();
    $(this).on("paste",function(evt){

    // process paste
      var this_val=$(this);

      var this_initial_len=this_val.html().length;

      var setTimeout_run=0;

      setTimeout(function(){

        setTimeout_run++;
        var marker_str="MTA-EDIT-MARKER"
        var range=window.getSelection().getRangeAt(0);
        var node=range.createContextualFragment(marker_str);
        range.insertNode(node);
        var endmarkerpos=this_val.html().indexOf(marker_str);

        var startmarkerpos=endmarkerpos+this_initial_len-this_val.html().length+marker_str.length;

        var prestr=this_val.html().substr(0,startmarkerpos);

        var pastedstr_length=this_val.html().length-this_initial_len-marker_str.length;
        var pastedstr=this_val.html().substr(startmarkerpos,pastedstr_length);

        // alter pastedstr here

        $('#maincontent').append("<div ID='tagstripperdiv'>" + pastedstr + "</div>");

        pastedstr=$('#tagstripperdiv').text();
        $('#tagstripperdiv').remove();

      // now join together

        var remainder=this_val.html().substr(endmarkerpos,this_val.html().length);

        remainder=remainder.replace(marker_str,"");

        this_val.html(prestr + pastedstr + remainder);

    //end helper

      },100);
    })

    // end paste event handler

    $(this).addClass("beingedited");
    $(this).attr("contenteditable","true");
    $(this).children(".editflags").html(make_buttons($(this).attr("ID")));

    return false;
  }
});

var dupid=0;
function increase_dupid(){
  while($("ID" + dupid).length>0){
    dupid++;
  }
}




jQuery.fn.extend({
  new_ele: function(){
    var templatestr=templatedefault;
    increase_dupid();

    var classes=$(this).parent().attr("class").split(" ");

    $.each(classes,function(key,val){
      if(val.indexOf("template")==0){
        templatestr=eval(val);
      }
    });

    $(this).parent().after(templatestr);

    $(this).parent().next().attr("ID" + dupid);
    $(this).parent().next().enable_editing();

  }
});


jQuery.fn.extend({
  duplicate_ele: function(){
   // alert("this: " + $(this).html() + "\n\nthis.parent:\n\n " + $(this).parent().html());
    increase_dupid();

    $(this).next().html($(this).html());
    $(this).next().attr("ID" + dupid);
    $(this).next().disable_editing();
    $(this).next().enable_editing();
  }
});

jQuery.fn.extend({
  delete_ele: function(){
    if($(this).parents(".editable").find(".title")){
      var titlestr=$(this).parents(".editable").find(".title").text();

      $("#leftmenu li").each(function(){
        if($(this).html().indexOf(titlestr)>-1){$(this).remove();}
      });
    }
    $(this).parents(".editable").remove();
  }
});


jQuery.fn.extend({
  end_edit: function(){

    // show all hidden editable elements -- if there as been searching some may be hidden

    $(".editable").each(function(){
      $(this).show();
    });

    // remove any imgbordertoggle boxes
    $(".imgbordertoggle").remove();

    // handle CanNotDelete elements

   $(this).find(".CanNotDelete").each(function(){
       if($(this).html()==" ")$(this).html("");
       if($(this).text().length<1){$(this).hide();}
//alert("unwrap, this: " + $(this).html() + "  parent class: " + $(this).parent().attr("class"));
       $(this).unwrap();
       $(this).attr("contenteditable","false");

    });

    $(this).removeClass("beingedited");

    $(this).attr("contenteditable","false");
    $(this).children(".editflags").html(clicktoeditstr);

    $(this).children(".editflags").unbind("click");

    $(this).find(".spaceholder").each(function(){$(this).html("")});

// diary
    if($(".event").length>0){
      if($("#dateinfoeditor").length>0){  // this is not being called at the start of edit()
        $(this).find(".dateinfo .year").html(yearlookup[$("#year").prop("selectedIndex")])
        $(this).find(".dateinfo .month").html(monthlookup[$("#month").prop("selectedIndex")])
        $(this).find(".dateinfo .day").html(daylookup[$("#day").prop("selectedIndex")])

        $(this).find(".dateinfo .textdate").html($("#textdate").val());
        $(this).find(".dateinfo .venue").html($("#venue").val());
        $("#dateinfoeditor").remove();
      }
    $("#maincontent").RecalculateCalendar();
    }

//recordings
    if($(".discogitem").length>0){
//alert(5);

      $(".pwrapsecondary").remove();
      $(".reissuesecondary").remove();
      var ComposerLabelIndex=-1;
      var ComposerSubSelectionIndex=-1;
      if($(this).html()){
        ComposerLabelIndex=$('#composerselectdropdown').prop("selectedIndex");
        ComposerSubSelectionIndex=$('#ComposerSubSelectiondropdown').prop("selectedIndex");      
        $(".composerselect").remove();
        for(var i=0;i<ComposerSelectionArr.length;i++)$(this).removeClass(ComposerSelectionArr[i]);   
        for(var i=0;i<ComposerSubSelectionArr.length;i++)$(this).removeClass(ComposerSubSelectionArr[i]);
        if(ComposerLabelIndex>-1)$(this).addClass(ComposerSelectionArr[ComposerLabelIndex]);
        if(ComposerSubSelectionIndex>-1)$(this).addClass(ComposerSubSelectionArr[ComposerSubSelectionIndex]);
      }
    }  
                                                                                                  
    $(this).blur();
    return false;
  }
});


jQuery.fn.extend({
  RecalculateCalendar: function(){
    var nameind=0;

    // ensure there are name on all events
    $(".templateevent").each(function(){

      if($(this).find("a").length<1){
        $(this).find(".dates").before("<A name='unset'></a>\n  ");
        }
      else{
        if(!$(this).find("a").attr("name")){
          $(this).find(".dates").before("<A name='unset'></a>\n  ");
        }
      }
    });

    // now set them -- but only if the name is already there (to avoid adding name to from hrefs)
    var nextname=""
    $(".templateevent").each(function(){
      nextname="n"+ nameind++;

      $(this).find("a").each(function(){
        if($(this).attr("name")){
          $(this).attr("name",nextname);
        }
      });
    });

    var lastmonth="unset";
    var str="";
  //  var str+="<div class=title>Calendar</div>\n";
  //  str+="<div class='calendarnotice leftcolumnspace'>spaceholder</div>\n";

    $(".templateevent").each(function(){

      if($(this).find(".dates").html().indexOf("Dates")<0){ // this stops any dummy entries being included

        if($(this).find(".month").html().indexOf(lastmonth)<0){
          str+="<div class=calmonth>" + $(this).find(".month").html() + " " + $(this).find(".year").html() + "</div>\n";
        }

        lastmonth=$(this).find(".month").html();

        str+="<div class=caldate>";
        str+="<a href='#" + $(this).find("a").attr("name") + "'>";
        if($(this).find(".textdate").text().length>0){
          str+=$(this).find(".textdate").html();
          }
        else{
          str+=$(this).find(".day").html() + " " + $(this).find(".month").html();
        }
        str+="</a>"
        str+="</div>\n";

        str+="<div class=calvenue>" + $(this).find(".venue").html() + "</div>\n\n";
      }
    })
    $("#leftmenu").html(str);

  }
});


jQuery.fn.extend({
  find_template: function(){
    var templatefound="";
    var newtemplatefound="";
    for(var i=0;i<templatearr.length;i++){
      if($(this).find("." + templatearr[i]).length>0){
        newtemplatefound=templatearr[i];
        if((templatefound.length>0) && (templatefound.indexOf(newtemplatefound)!=0)){
          alert("more than one template found: " + templatefound + " and " + newtemplatefound + " (will only return one)");
        }
        templatefound=newtemplatefound;
      }
    }
    return templatefound;
  }
});


jQuery.fn.extend({
  AddNewTemplateLinkIfNeeded: function(){

    var template=$(this).find_template();

// sometimes this is being called twice, so prevent this (but there may be another bug
// causing it to be called twice):

    if($("#marker").length<1){
      $("." + template).eq(0).before("<Div id=marker> &#151; Add new item &#151; </div>");
    }
    $("#marker").on("click",function(){
      $(this).after(eval(template));

      increase_dupid();
      $("." + template).eq(0).attr("ID" + dupid);
      $("." + template).eq(0).enable_editing();

    })
  }
});


jQuery.fn.extend({
  RemoveNewTemplateLink: function(){
    if($("#marker").length>0){$("#marker").remove();}
  }
});


// strips html tags and spaces and returns length of what is left
jQuery.fn.extend({
  IsEmpty: function(){
   var teststr=$(this).text();
   teststr=teststr.replace(/\s{1,}/g, '');
   return teststr.length
  }
});

jQuery.fn.extend({
  toarchive: function(){

    // remove archivemenusection if it is there (in case someone clicks toarchive twice)
    // get menu

    $("#archivemenusection").remove();

    var str="";
    str+="Please click on one of the following headings  \n";
    str+="to indicate which section of the archive this is to be added to: <p></p> \n";

    $(this).parent().append("<div id=archivemenusection>" + str + "</div>");

    // copy entries from archive menu to this element

    $("#archive").find($(".m1")).each(function(){
      $("#archivemenusection").append("<div class=archivemenuitemm1>" + $(this).html() + "</div>\n");
    });

    $("#archivemenusection .archivemenuitemm1").each(function(){
      if($(this).find(".m3wrap").length>0){
        $(this).find(".m3wrap").remove();
        }
      else{
        $(this).find(".m2wrap").remove();
      }
    });

//// now move all up one

    $("#archivemenusection .m2").each(function(){
      $(this).insertBefore($(this).parent());
    });
    $("#archivemenusection .m3").each(function(){
      $(this).insertBefore($(this).parent());
    });
    $("#archivemenusection .m2wrap").remove();
    $("#archivemenusection .m3wrap").remove();

// deal with any hrefs
    $("#archivemenusection a").each(function(){
      $(this).parent().prepend($(this).html());
      $(this).remove();
    });

    $("#archivemenusection").html($("#archivemenusection").html().replace(/<!-- m2wrap -->/g,""));
    $("#archivemenusection").html($("#archivemenusection").html().replace(/<!-- m3wrap -->/g,""));

    $("#archivemenusection").html($("#archivemenusection").html().replace(/\s{2,}/g,' '));
    $("#archivemenusection").html($("#archivemenusection").html().replace(/\s{2,}/g,' '));
    $("#archivemenusection").html($("#archivemenusection").html().replace(/<div/g,'\n<div'));

// now change the classes to avoid picking up style from menu

    $("#archivemenusection .m2").each(function(){
      $(this).removeClass("m2");
      $(this).addClass("archivemenuitemm2");
    });

    $(".archivemenuitemm1").each(function(){
      if($(this).find(".archivemenuitemm2").length<1){
        $(this).removeClass("archivemenuitemm1");
        $(this).addClass("archivemenuitemm1NoChildren");
      }
    });


    var archivetitle=$(this).parents(".editable").find(".title").text();

    var timenow=new Date();
    var archivefilename="archive"+timenow.getFullYear() + timenow.getMonth() + timenow.getDate();
    var archivetitlearr=archivetitle.split(" ");
    archivefilename+=archivetitlearr[0];
    if(archivetitlearr.length>1){
      archivefilename+=archivetitlearr[1];
    }
    if(archivefilename.indexOf("<")>-1){
      archivefilename=archivefilename.substr(0,archivefilename.indexOf("<"));
    }
    archivefilename=archivefilename+".htm";

//alert("found: archivetitle: " + archivetitle + " archivefilename: " + archivefilename);


   var editable_parent=$(this).parents(".editable");

// functions to add to main menu
    $(".archivemenuitemm1NoChildren").on("click",function(){
      var mm1seekingtext=$(this).text();
      var menuele;
      $("#archive .m1").each(function(){
        if($(this).find(".m3").length<1){
          menuele=$(this).clone();
          menuele.find(".m2").remove();
          menuele.find(".m2wrap").remove();
          if(menuele.text().trim().indexOf(mm1seekingtext.trim())>-1){
            $(this).find(".m2wrap").append("         <div class=m2><a href='" + archivefilename + "'>" + archivetitle + "</a></div>\n");
            $(".highlighted").removeClass("highlighted");  // highlighted menu item
            WriteToFile("<div id='menu'>\n" + $("#menu").html() + "\n</div>\n","../menu.htm",0,0);
            $("#archivemenusection").remove();

            // save article
            var writeele=editable_parent.clone();
            editable_parent.remove();

            writeele.find(".editflags").remove();
            if(writeele.find(".date")){
              var dateele=writeele.find(".date").clone();
              writeele.find(".date").remove();
              writeele.find(".title").after("\n  <div class=date>" + dateele.html() + "</div>");
            }

            var string_to_write="<div class='archiveitem editable'>" + writeele.html() + "</div>";
            WriteToFile(string_to_write,"c-" + archivefilename,0,0);
            WriteToFile(string_to_write,"c-" + archivefilename,1,0);
            $("#maincontent").save(1);
// now call cgi script to create the archive file
    $.ajax({
      url: "/cgi-bin/archivesetup.cgi",
      cache: false,
      data: "archivefilename=" + archivefilename +  "&template=archive-template.htm",
    })
    .error(function(xqXHR,textStatus,errorThrown){
      alert("Error, status: " + textStatus + " error: " + errorThrown +"\n");
    })
    .success(function(returned){
    //  alert("Success, returned: " + returned);
    });

          }
        }
      });
    });

    $(".archivemenuitemm2").on("click",function(){
      var mm2seekingtext=$(this).text();
      var menuele;
      $("#archive .m2").each(function(){
        if($(this).find(".m3").length>0){
          menuele=$(this).clone();
          menuele.find(".m3").remove();
          menuele.find(".m3wrap").remove();
          if(menuele.text().trim().indexOf(mm2seekingtext.trim())>-1){
            $(this).find(".m3wrap").append("  <div class=m3><a href='" + archivefilename + "'>" + archivetitle + "</a></div>\n");
            $(".highlighted").removeClass("highlighted");  // highlighted menu item
            WriteToFile("<div id='menu'>\n" + $("#menu").html() + "\n</div>\n","../menu.htm",0,0);
            $("#archivemenusection").remove();

            // save article
            var writeele=editable_parent.clone();
            editable_parent.remove();
            writeele.find(".editflags").remove();

            if(writeele.find(".date")){
              var dateele=writeele.find(".date").clone();
              writeele.find(".date").remove();
              writeele.find(".title").after("\n  <div class=date>" + dateele.html() + "</div>");
            }

            var string_to_write="<div class='archiveitem editable'>" + writeele.html() + "</div>";
            WriteToFile(string_to_write,"c-" + archivefilename,0,0);
            WriteToFile(string_to_write,"c-" + archivefilename,1,1);
            $("#maincontent").save(1);
// now call cgi script to create the archive file
    $.ajax({
      url: "/cgi-bin/archivesetup.cgi",
      cache: false,
      data: "archivefilename=" + archivefilename +  "&template=archive-template.htm",
    })
    .error(function(xqXHR,textStatus,errorThrown){
      alert("Error, status: " + textStatus + " error: " + errorThrown +"\n");
    })
    .success(function(returned){alert("Success, returned: " + returned);});

          }
        }
      });
    });
  }
});





jQuery.fn.extend({
  save: function(pubflag){

    // stop saving on feedback form with the form itself hidden
    if(location.pathname.indexOf("feedback")>-1){
      if($("#feedbackform").length<1){
        alert("It's not possible to save the feedback page with the 'thank you' text in place of the form on the left");
        return(0);
      }
    }

    $(".newfeedback").removeClass("newfeedback");


    // spurious ps-scrollbar divs seem to get added and written to the files
    // as they are saved -- this appears to be dynamic content that can be
    // removed, so:

    $(".ps-scrollbar-x").remove();
    $(".ps-scrollbar-y").remove();

    // just in case any of the instrument reference boxes on instruments pages are live
    $('.instrefinfo').remove();

    // deal with blats
    $(".blat").each(function(){
      $(this).html($(this).find(".blat2").html());
    });


    // ////////////////////////////////////////////////////
    // end editing
    // ////////////////////////////////////////////////////

    $(".beingedited").end_edit();
    $(".editable").disable_editing();
    $("#maincontent").RemoveNewTemplateLink();


    // ////////////////////////////////////////////////////
    // special things for specific pages
    // ////////////////////////////////////////////////////


    if(location.pathname.indexOf("news.htm")>-1){

      // update labels
      var nind=0;
      var nindstr;
      var menunewsstr="";
      $(".newsitem").each(function(){
        nindstr="ID" + nind;
        $(this).attr("id",nindstr);
        $(this).find("a").eq(0).attr("name",nindstr);
        menunewsstr+="     <div class='m1'><a href='news.htm#" + nindstr + "'>" + $(this).find(".title").html() + "</a></div>\n";
        nind++;
      });

      // rebuild menu
      $("#menu #news .m1wrap").html(menunewsstr);

      if(pubflag>0){
        $("#news").removeClass("highlighted");
        WriteToFile("<div id='menu'>\n" + $("#menu").html() + "\n</div>\n","../menu.htm",0,0);
        $("#news").addClass("highlighted");
      }
    }


    // ////////////////////////////////////////////////////
    // save things
    // ////////////////////////////////////////////////////

    // Now save general maincontent
    // The archive section handles this differently as the archive menu
    // is in a server-side-include, which itself appears in maincontent.
    // As there are lots of files in the archive, the
    // test for this is the existence of "#archivemaincontent"


    var file_in_href=window.location.href.substr(window.location.href.lastIndexOf("/")+1);
    if(file_in_href.length<1)file_in_href="index.htm";
    if(file_in_href.indexOf("htm")<0){alert("file_in_href lacks .htm extension");}

    // remove # and what follows in filename

    if(file_in_href.indexOf("#")>-1){
      file_in_href=file_in_href.substr(0,file_in_href.indexOf("#"));
    }


    var SetUpToWrite=0;
    if($("#publicationscontent").length>0){  // in publications
      var file_to_write="c-" + file_in_href;
      var file_to_publish="../" + file_to_write;
      var div_to_write="#publicationscontent";
      SetUpToWrite=1;
    }

    if($("#archivemaincontent").length>0){  // in archive
      var file_to_write="c-" + file_in_href;
      var file_to_publish="../" + file_to_write;
      var div_to_write="#archivemaincontent";
      SetUpToWrite=1;
    }

    if(SetUpToWrite<1){
      var file_to_write="c-" + file_in_href;
      var file_to_publish="../" + file_to_write;
      var div_to_write="#maincontent";
    }

    WriteToFile($(div_to_write).html(),file_to_write,0,1);

    if(pubflag>0){
      WriteToFile($(div_to_write).html(),file_to_write,1,1);

    }
  }
});



function toHex(tohextstr){
  var retval="";
  var i;
  var hex;
  for(i=0;i<tohextstr.length;i++){
    hex=tohextstr.charCodeAt(i).toString(16);
    while(hex.length<2){hex="0"+hex;}
    retval=retval+hex;
  }
  return retval;
}

function mask_highbit(mhbstr){
  if(arguments.length<1)alert("mask_highbit called with no argument");
  var retval="";
  var i;

  for(i=0;i<mhbstr.length;i++){
    if(mhbstr.charCodeAt(i)<=127){
      retval+=mhbstr[i];
    }
    else{
      retval+="&#" + mhbstr.charCodeAt(i) +";";
    }
  }
  return(retval);
}



var WriteToFileCount=0;


function WriteToFile(wtfstr,filename,PublishFlag,ReloadFlag){
console.log("test WriteToFile for multiple files");
console.log("file: " + filename + " wtfstr: " + wtfstr);

//alert("file: " + filename + " wtfstr: " + wtfstr);


  var filetowrite=filename;

  if(PublishFlag==0)filetowrite="tmp/" + filetowrite;
  WriteToFileCount++;

//alert("about to post, wtfstr: " + wtfstr);
  $.post("/cgi-bin/edit.cgi",
    {filename: toHex(filetowrite), XML: toHex(mask_highbit(wtfstr))},
    function(data,status,xhr){

//alert("status: " + status);
      WriteToFileCount--;

      if(WriteToFileCount==0){
        if(ReloadFlag>0){
          setTimeout(function(){location.reload(false);},500);
          setTimeout(function(){location.reload(false);},600);
        }
      }
  });

}




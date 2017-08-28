// WebFontConfig = {
//   google: { families: [ 'Scada'] }
// };
// (function() {
//   var wf = document.createElement('script');
//   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//   wf.type = 'text/javascript';
//   wf.async = 'true';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(wf, s);
// })();
// 

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function loadscript(filename,scriptid){
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src",filename);
  fileref.setAttribute("id",scriptid);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}


var window_opened;
function openwin(fname){
  if(typeof window_opened != 'undefined'){
    if(window_opened){window_opened.close();}
  }

  var winname="audioplayer";
  var args="location=no,menubar=no,resizable=yes,status=no,toolbar=no,title=yes,top=0,left=0";
  args+=",width=450,height=300";
  window_opened=window.open(fname,winname,args);
}

var blatstrs=new Array();

var hogwstr=""
hogwstr+="@ho";
hogwstr+="gwo";
hogwstr+="od.";
hogwstr+="or";
hogwstr+="g";

blatstrs["office"]="off" + "ice"+hogwstr;
blatstrs["hogwood"]="hogw" + "ood"+hogwstr;

jQuery.fn.extend({
  blat: function(){
    var addr=blatstrs[$(this).html()];
    $(this).html("<span class=blat2>" + $(this).html() + "</span><a href=mailto:'" + addr + "'>" + addr + "</a>");
  }
});


// this has a bug as it will match the search string inside HTML tags as well
// possible solutions are regex: //var regex=new RegExp('(?<!<[^>]*?)' + searchstr,'g');
// but javascript sees not to support lookbehind
// or findAndReplaceDOMText() if I could make sense of the documentation


jQuery.fn.extend({
  searchfun: function(){
    $(this).submit(function(event){
      var searchstr=$(this).find('input:first').val();
      event.preventDefault();

      $("#searchbox .showall").show();
      $("#searchbox .showall").on("click",function(){
        $(".editable").show();
        $("#searchbox .showall").hide();
      });


      $(".editable").each(function(){
        if($(this).text().toLowerCase().indexOf(searchstr.toLowerCase())<0){
          $(this).hide();
          }
        else{
          var newstr=$(this).html().replace(new RegExp(searchstr,"ig"),'<span class=searchresult>' + searchstr + '</span>');
          $(this).html(newstr);
        }
      });

    });
  }
});


jQuery.fn.extend({
  Discogsearchfun: function(){
    $(this).submit(function(event){
      var searchstr=$(this).find('input:first').val();
      event.preventDefault();
      var found=0;
      var foundindex;
      $(".discogitem").each(function(){
        foundindex=$(this).text().toLowerCase().indexOf(searchstr.toLowerCase());
        if(foundindex<0){
          $(this).addClass("nodisplay");
          }
        else{
          if(!$(this).hasClass("symphonies")){
            var newstr=$(this).html().replace(new RegExp(searchstr,"ig"),'<span class=searchresult>' + searchstr + '</span>');
            $(this).html(newstr);
            found=1;
          }
        }
      $(".symphonies").addClass("nodisplay");  // hide the haydn & mozart symphonies so their hidden text dows not come up
      });
      if(found<1){
        $(".NoResultsText").removeClass("HideNoResultsText").addClass("ShowNoResultsText");
      }
    });
  }
});



function discogselect(){
  var arg1="";
  var arg2="";

  var LetterSearchStr="";
  var SearchStr_composer="";

  if(arguments.length==1){
    if(arguments[0].length==1){
      LetterSearchStr="composer" + arguments[0];
    }
  }

  if(arguments.length==2){
    SearchStr_composer=arguments[0];
    SearchStr_category=arguments[1];
  }

  // remove ShowEntry classes
  $(".ShowEntry").removeClass("ShowEntry");
  $(".nodisplay").removeClass("nodisplay");

  // hide default text (shown if there are no results found)
  $(".NoResultsText").addClass("HideNoResultsText").removeClass("ShowNoResultsText");

  if(arguments[0].indexOf("showall")>-1){             // only proceed if showall not selected
    $(".searchresult").removeClass("searchresult");     // remove highligting of search
    }
  else{

    if(LetterSearchStr.length>0){
      $("." + LetterSearchStr).addClass("ShowEntry");
    }

    if(SearchStr_composer.length>0){
      if(SearchStr_category.indexOf("all")<0){

        $("." + SearchStr_composer + "." + SearchStr_category).addClass("ShowEntry");
        }
      else{
        $("." + SearchStr_composer +".instrumental").addClass("ShowEntry");
        $("." + SearchStr_composer +".sacredvocal").addClass("ShowEntry");
        $("." + SearchStr_composer +".secularvocal").addClass("ShowEntry");
        $("." + SearchStr_composer +".symphonies").addClass("ShowEntry");
      }
    }

    $(".discogitem").not($(".ShowEntry")).addClass("nodisplay");

    if($(".ShowEntry").length<1){
      $(".NoResultsText").removeClass("HideNoResultsText").addClass("ShowNoResultsText");
    }
  }
}



function enable_sound(mus,id){
  $("#" + id).html("<iframe width=580 height=26 src='sound/" + mus + "'></iframe>");
}

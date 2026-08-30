
<script language="JavaScript">
  var j,l="",m="",p="",q="",z="",list= new Array()
  list[list.length]='images/random/1.jpg?&width=250&align=top';
  list[list.length]='images/random/2.jpg?&width=250&align=top';
  list[list.length]='images/random/3.jpg?&width=250&align=top';
  list[list.length]='images/random/4.jpg?&width=250&align=top';
  list[list.length]='images/random/5.jpg?&width=250&align=top';
  list[list.length]='images/random/6.jpg?&width=250&align=top';
  list[list.length]='images/random/7.jpg?&width=250&align=top';
  list[list.length]='images/random/8.jpg?&width=250&align=top';
  j=parseInt(Math.random()*list.length);
  j=(isNaN(j))?0:j;
  if (list[j].indexOf('?')==-1) {
    document.write("<img src='"+list[j]+"'>");
  }
  else {
    nvp=list[j].substring(list[j].indexOf('?')+2).split('&');
    for(var i=0;i<nvp.length;i++) {
      sub=nvp[i].split('=');
   	  switch(sub[0]) {
 	    case 'link':
          l="<a href='"+unescape(sub[1])+"'>";
          p="</a>";
		  break;
	    case 'target':
          q=" target='"+unescape(sub[1])+"'";
  		  break;
  	    default:
          m+=" "+sub[0]+"='"+unescape(sub[1])+"'";
  		  break;
      }
    }
    z=(l!="")?((q!="")?l.substring(0,l.length-1)+q+">":l):"";
    z+="<img src='"+list[j].substring(0,list[j].indexOf('?'))+"'"+m+">"+p;
  document.write(z);
  }
</script>


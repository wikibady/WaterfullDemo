
var listHeight=[];
var column=0;

function WhenToBottom(){//瀑布流1号
	$(":text")[0].value=Math.round($(window).scrollTop());
	$(":text")[1].value=$(document).height();
	$(":text")[2].value=$(window).height();
	$(":text")[3].value=$(document).height() - $(window).height();
	if (Math.round($(window).scrollTop()) > Math.round($(document).height()) - Math.round($(window).height())-5) {
		var list =$(".main");
		//alert("A");
		$.ajax({url:"./load.html",data:"html",success:function(result){
			SetMainHeight();
			list.append(result);
			boxlist=StartAtLeft(".box1");
			for(var i=0;i<boxlist.length;i++)
			{
				boxlist[i].className="box";
			}
			var j=0;
			for(var i =0;i<boxlist.length;i++)
				{
					j=getMin(listHeight);
					
					if(j==0)//第一行
						{
							
							var left = ($(".main").width()-column*200-50)/2+'px';
						}
					else 
					{
						  var left =($(".main").width()-column*200-50)/2+(j)*230+'px';
					}
					       
					boxlist[i].style.bottom="";
					boxlist[i].style.left=left;
					boxlist[i].style.top=listHeight[j];
					listHeight[j]=parseInt(listHeight[j])+parseInt(getComputedStyle(boxlist[i],null)["height"])+30+'px';
					//alert(listHeight);
				}
			//alert();
		} })
	}
}
function SetMainHeight (height) {
	if(!arguments.length)
		var heights=$(window).height()*1.4+$(window).scrollTop();

	else
	{
		var heights= height;
	}
	$('.main').height(heights);
	//alert($(window).height());
}
	
function StartAtLeft (classname) {
	var boxlist=$(classname);
	//for (box in boxlist){
		boxlist.css('left','0');
		boxlist.css('bottom','0');
		boxlist.css('opacity','1');
		boxlist.css('transition','3s');

	//}
	return boxlist;
}


function getColumn(){
	var main = $('.main');
	//alert(main.css('width'));
	var columnNum = Math.floor((parseInt(main.css('width'))-2*parseInt(main.css('padding-left')))/200);
	//alert(columnNum);
	return columnNum;
}

function setList(){
	column=getColumn();
	listHeight=new Array(column);

	for(var i = 0;i<listHeight.length;i++)
	{
		
		if(!listHeight[i])
		{
			listHeight[i]=0+"px";
		}
	}
	boxlist=StartAtLeft(".box");
	var j=0;
	for(var i =0;i<boxlist.length;i++)
	{
		
		j=getMin(listHeight);
		// /alert(j+"---"+listHeight);
		if(j==0)//第一行
			{
				
				var left = ($(".main").width()-column*200-50)/2+'px';
			}
		else 
		{
			    var left =($(".main").width()-column*200-50)/2+(j)*230+'px';

		}
		boxlist[i].style.bottom="";
		boxlist[i].style.left=left;
		boxlist[i].style.top=listHeight[j];
		listHeight[j]=parseInt(listHeight[j])+parseInt(getComputedStyle(boxlist[i],null)["height"])+30+'px';
		//alert(listHeight);
	}
	return listHeight;
}
function getMin(arry){
	var aim=new Array(arry.length) ;
	for(var i = 0;i<arry.length;i++)
	{	

		aim[i]=(parseInt(arry[i]));

	}
	// /alert(i);
	//alert("qian"+aim);
	function sortNumber(a,b)
	{
		return a - b;
	}
	aim.sort(sortNumber);
	//alert("hou"+aim);
	return arry.indexOf(aim[0]+"px");
}
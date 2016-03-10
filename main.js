
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
			
			for(var i =0;i<boxlist.length;i++)
				{
					if(i%6==0)//第一行
						{
							
							var left = ($(".main").width()-column*200-50)/2+'px';
						}
					else 
					{
						var left =parseInt(boxlist[i-1].style.left)+230+'px';
					}
					
					boxlist[i].style.bottom="";
					boxlist[i].style.left=left;
					boxlist[i].style.top=listHeight[i%6];
					listHeight[i%6]=parseInt(listHeight[i%6])+parseInt(getComputedStyle(boxlist[i],null)["height"])+30+'px';
					//alert(listHeight);
				}
			//alert();
		} })
	}
}
function SetMainHeight (height) {
	if(!arguments.length)
		var heights=$(window).height()*2+$(window).scrollTop();
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
			listHeight[i]=0;
		}
	}
	boxlist=StartAtLeft(".box");
	for(var i =0;i<boxlist.length;i++)
	{
		if(i%6==0)//第一行
			{
				
				var left = ($(".main").width()-column*200-50)/2+'px';
			}
		else 
		{
			var left =parseInt(boxlist[i-1].style.left)+230+'px';
		}
		boxlist[i].style.bottom="";
		boxlist[i].style.left=left;
		boxlist[i].style.top=listHeight[i%6];
		listHeight[i%6]=parseInt(listHeight[i%6])+parseInt(getComputedStyle(boxlist[i],null)["height"])+30+'px';
		//alert(listHeight);
	}
	return listHeight;
}
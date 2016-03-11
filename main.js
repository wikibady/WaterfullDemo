
			var listHeight=[];//存储每行高度
			var column=0;//计算每行列数

			function WhenToBottom(){//滚动监听，到底部加载
				if (Math.round($(window).scrollTop()) > Math.round($(document).height()) - Math.round($(window).height())-5) {
					var list =$(".main");
					$.ajax({url:"./load.html",data:"html",success:function(result){
						SetMainHeight();//调用成功更新页面高度
						list.append(result);//载入数据
						boxlist=StartAtLeft(".box1");//初始化位置
						for(var i=0;i<boxlist.length;i++)
						{
							boxlist[i].className="box";
						}
						putList(boxlist);//安序排放
					} })
				}
			}
			function SetMainHeight (height) {//改变页面高度
				if(!arguments.length)
				{

					var heights=parseInt(listHeight[getMax(listHeight)])+500+"px";
					
				}

				else
				{
					var heights= height;
				}
				$('.main').height(heights);
			}
				
			function StartAtLeft (classname) {//设置加载初始位置
				var boxlist=$(classname);
					boxlist.css('left','45%');
					boxlist.css('bottom','-20%');
					boxlist.css('opacity','1');
					boxlist.css('transition','5s');
				return boxlist;
			}


			function getColumn(){//计算列数
				var main = $('.main');
				var columnNum = Math.floor((parseInt(main.css('width'))-2*parseInt(main.css('padding-left')))/200);
				return columnNum;
			}

			function setList(){//精确排放
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
				putList(boxlist);
				return listHeight;
			}
			function getMin(arry){//获取最小值索引
				var aim=new Array(arry.length) ;
				for(var i = 0;i<arry.length;i++)
				{	

					aim[i]=(parseInt(arry[i]));

				}
				function sortNumber(a,b)
				{
					return a - b;
				}
				aim.sort(sortNumber);
				return arry.indexOf(aim[0]+"px");
			}
			function getMax(arry){//获取最大值索引
				var aim=new Array(arry.length) ;
				for(var i = 0;i<arry.length;i++)
				{	

					aim[i]=(parseInt(arry[i]));

				}
				function sortNumber(a,b)
				{
					return a - b;
				}
				aim.sort(sortNumber);
				return arry.indexOf(aim[arry.length-1]+"px");
			}
			function putList (boxlist) {//排放算法
				var j=0;
						for(var i =0;i<boxlist.length;i++)//
							{
								j=getMin(listHeight);
								
								if(j==0)//第一列
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
							}
				
			}
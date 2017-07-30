/**
 * Created by Haodong on 2017/5/26.
 */
(function () {
    /*
    * 用于记录日期，显示的时候，根据dataObj中的日期的年月显示
    * 
     */
	
	    var dateObj = (function () {
        var _date= new Date();
        return {
            getDate:function () {
                return _date;
            },
            setDate:function (date) {
                _date=date;
            }
        };
    })();

	    var allData=new Array();
	    getData();   
	    renderHtml();
	    showCalendarData();
	    modify();
	    //console.log(allData);


	
	

    
    
    //用来记录从数据库返回来的所有数据
    

    function getData(){

        $.ajax({
        	type:"post",
        	dataTyoe:"text",
        	url:"renderCalender.jsp",
        	async:false,
        	complete:function(XMLHttpRequest,textStatus){
        		//console.log(XMLHttpRequest.responseText);
        		//$("span.u-getAllData").text(XMLHttpRequest.responseText)
        		allData=eval(XMLHttpRequest.responseText);
        	}
        	
        });

    }


    /*
    * 渲染html结构
     */
    function renderHtml() {
    	//console.log("remder");
        var calendar = document.getElementById("calendar");
        var calendarBox = document.getElementById("calendar-box");
        var titleBox = document.createElement("div"); //表格的标题，显示几月
        var bodyBox = document.createElement("div"); //表格区

        var setYear = document.getElementById("selectYear");
        var setMonth = document.getElementById("selectMonth");

        //设置标题盒子中的html
        titleBox.className="calendar-title-box";
        titleBox.innerHTML="<span class='calendar-month' id='calendar-month'></span>";
        calendarBox.appendChild(titleBox);

        //设置表格区的html结构
        bodyBox.className="calendar-body-box";
        var _headHtml="<tr>"+
                "<th>sun</th>"+
                "<th>mon</th>"+
                "<th>tue</th>"+
                "<th>wed</th>"+
                "<th>thu</th>"+
                "<th>fri</th>"+
                "<th>sat</th>"+
                "</tr>";
        var _bodyHtml="";

        //一个月最多31天，所以一个月最多占6行表格
        for(var i = 0; i < 6; i++) {
            _bodyHtml += "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
        }
        bodyBox.innerHTML="<table id='calendarTable' class='calendar-table'>" +
            _headHtml + _bodyHtml +
            "</table>";
        //添加到calendarBox div中
        calendarBox.appendChild(bodyBox);
 
    }

    /*
     * 表格中显示数据，并设置类名
     */
           
    function showCalendarData() {
    	//console.log("showCalenderData");
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth()+1;

        var setYear = document.getElementById("selectYear");
        var setMonth = document.getElementById("selectMonth");

        //设置select中的信息
        var yearHtml="";
        var monthHtml="";
        var everyYear="";
        var everyMonth="";

        for( var m = -10;m <11; m++) {
            (function setYearSelect() {
                function setY() {
                    everyYear="<option>"+(_year+m).toString()+"</option>";
                    yearHtml+=everyYear;
                }
                setY();
            })(m);
        }

        setYear.innerHTML=yearHtml;

        for(var j =1;j <13;j++) {
            (function () {
                everyMonth="<option>"+j.toString()+"</option>";
                monthHtml+=everyMonth;
            })(j);
        }
        setMonth.innerHTML=monthHtml;
        var new_date=new Date();
        var year_index=new_date.getFullYear()-2007;
        var month_index=new_date.getMonth();
        document.getElementById("selectYear")[year_index].selected=true;
        document.getElementById("selectMonth")[month_index].selected=true;

        //设置标题栏中的信息
        var calendarTitle = document.getElementById("calendar-month");
        var cur_month = $("select.selectMonth :selected").text();
        
        calendarTitle.innerText=cur_month;

        //设置表格中的数据
        var _table = document.getElementById("calendarTable");
        var _tds = _table.getElementsByTagName("td");
        var cur_year = $("select.selectYear :selected").text();
        var cur_month = $("select.selectMonth :selected").text();
       
        var _firstDay = new Date(cur_year,cur_month-1,1); //选中当前年 当前月的第一天
        for(var i =0; i<_tds.length;i++) {
        	var dataStr;
            var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
            var bigSpan=document. createElement("span");
            bigSpan.className="u-getDay";
            bigSpan.innerText=_thisDay.getDate();
            _tds[i].appendChild(bigSpan);
            dataStr=""+cur_year+cur_month+_tds[i].innerText;
            //console.log("更新日期");
            for(var j=0; j<allData.length;j++) {
            	var oneData = JSON.parse(allData[j]);
            	//console.log("添加标志");
            	if(oneData.dataDate==dataStr) {
            		var bigImg = document.createElement("img");     //创建一个img元素 
            		var bigA=document.createElement("a");
            		bigA.className="u-dataLink"
            		bigImg.width="25";  //200个像素 不用加px   
            		bigImg.src="study/images/click_before.png";   //给img元素的src属性赋值 
            		bigA.appendChild(bigImg);
            		_tds[i].appendChild(bigA);      //为dom添加子元素img  
            		
            	}
            	
            }
        }

    }
    $("select.selectMonth").bind("change",allData,function () {
        reWrite();
        modify();
        //console.log(event.data);
    });
    $("select.selectYear").bind("change",allData,function () {
        reWrite();
        modify();
        //console.log(allData);
    });   
    function modify() {
    	$("a.u-dataLink").click(function() {
        	$("div.g-modify").show();
        	var year= $("select.selectYear :selected").text();
        	var month=$("select.selectMonth :selected").text();
        	var day=$(this).siblings(".u-getDay").text();
        	console.log($(this));
        	$("div.m-timeShow span").text("录入的时间为："+year+"年"+month+"月"+day+"日");
        	dataStr=""+year+month+day;
        	for(var i=0;i<allData.length;i++) {
        		var oneData = JSON.parse(allData[i]);
        		if(dataStr==oneData.dataDate) {
        			$("input.u-dataIn").val(oneData.dataIn);
        			$("input.u-dataOut").val(oneData.dataOut);
        			$("input.u-timeInfo").val(oneData.dataDate);
        		}
        		//console.log($("input.u-timeInfo").val());
        	
        	}
        	$("input.u-submitModify").click(function(){
        		if($("input.u-dataIn").length==0) {
        			alert("请输入修改的进项数据");
        			return false;
        		} else if($("input.u-dataOut").length==0) {
        			alert("请输入修改的销项数据");
        			return false;
        		} else {
        			alert("已经成功修改");
        			//console.log($("input.u-timeInfo").val());
        			return true;
        		}
        	})
        })
    }
    function reWrite() {
        //设置标题栏中的信息
    	
        var calendarTitle = document.getElementById("calendar-month");
        var cur_month = $("select.selectMonth :selected").text();
        calendarTitle.innerText=cur_month;

        //设置表格中的数据
        var _table = document.getElementById("calendarTable");
        var _tds = _table.getElementsByTagName("td");
        var _table=$("#calendarTable");
        var _tds=$("#calendarTable td");
        var cur_year = $("select.selectYear :selected").text();
        var _firstDay = new Date(cur_year,cur_month-1,1); //选中当前年 当前月的第一天
        for(var i =0; i<_tds.length;i++) {
           	var dataStr;
            var _thisDay = new Date(cur_year, cur_month - 1, i + 1 - _firstDay.getDay());
            var bigSpan=document. createElement("span");
            bigSpan.className="u-getDay";
            bigSpan.innerText=_thisDay.getDate();
            _tds[i].replaceChild(bigSpan,_tds[i].childNodes[0]);
            if(_tds[i].childNodes[1]){
            	_tds[i].removeChild(_tds[i].childNodes[1]);
            }
            dataStr=""+cur_year+cur_month+_tds[i].innerText;
            for(var j=0;j<allData.length;j++) {
            	var oneData = JSON.parse(allData[j]);
            	
            	if(oneData.dataDate==dataStr) {
            		var bigImg = document.createElement("img");     //创建一个img元素 
            		var bigA=document.createElement("a");
            		bigA.className="u-dataLink"
            		bigImg.width="25";  //200个像素 不用加px   
            		bigImg.src="study/images/click_before.png";   //给img元素的src属性赋值 
            		bigA.appendChild(bigImg);
            		_tds[i].appendChild(bigA);      //为dom添加子元素img  
            		
            	}
            	
            }

        }
        
        
    }
    $("div.m-title a").click(function(){
    	$("div.m-timeShow span").text("");
    	$("input.u-dataIn").val("");
    	$("input.u-dataOut").val("");
    	$("div.g-modify").hide();
    })
    

    
    //进项和销项数据插入
    $("button#confirmIn").click(function(){
    	var dataIn=$("div.inMoney input").val();
    	var dataOut=$("div.outMoney input").val();
    	var dateIn=""+$("div.moneyIn input.year").val()+$("div.moneyIn input.month").val()
    				+$("div.moneyIn input.day").val();
    	var dateOut=""+$("div.moneyOut input.year").val()+$("div.moneyOut input.month").val()
    				+$("div.moneyOut input.day").val();
    	if(dataIn.length==0 || dataOut.length==0) {
    		alert("请输入对应日期的进项和销项的数据再进行数据的录入");
    		return false;
    	} else if(Number(dataIn).toString().length!=dataIn.length || Number(dataOut).toString().length != dataOut.length){
    		console.log(Number(dataIn).toString().length);
    		alert("请检查进项和销项数据，只能以数字的形式输入");
    		return false;
    	}else if(dateIn.length==0||dateOut.length==0){
    		alert("请选择相应的日期");
    		return false;
    	}else if(Number(dateIn).toString().length!=dateIn.length || Number(dateOut).toString().length != dateOut.length){
    		alert("请输入正确的日期或点击日历进行选择");
    		return false;
    	}else if(($("div.moneyIn input.year").val().length==0) ||($("div.moneyIn input.month").val().length==0)||($("div.moneyIn input.day").val().length==0)){
    		alert("请检查进项对应日期，输入正确的年月日或点击日历进行选择");
    		return false;
    	}else if(($("div.moneyOut input.year").val().length==0)||($("div.moneyOut input.month").val().length==0)||($("div.moneyOut input.day").val().length==0)){
    		alert("请检查销项数据对应日期，输入正确的年月日或点击日历进行选择");
    		return false;
    	}else {
    	
    	
    	
    		
    		    $.ajax({
    		    	type:"post",
    		    	url:"insertData.jsp",
    		    	dataType:"text",
    		    	data:{_dataIn:dataIn,_dateIn:dateIn,_dataOut:dataOut,_dateOut:dateOut},
    		    	complete:function(XMLHttpRequest,textStatus){
    		    		if(textStatus="success"){
    		    			$("div.inMoney input").val("");
    		    			$("div.outMoney input").val("");
    		    			$('.J-datePicker').siblings("input").val("");
    		    			alert("已经成功录入");
    		    			
    		    		}
    		    	}
    		    })
    		    return true;
    	}

    })
    
    $("button#toAnalyze").click(function(){
    	$("div.input").val("");
    	window.location.href='AnalysisData_v1.jsp';
    	
    })
    

    
    


})();
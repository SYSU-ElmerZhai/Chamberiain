<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>录入界面</title>
	<link rel="stylesheet" href="study/css/public/3.3.6/bootstrap.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.theme.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.structure.min.css">
    <link rel="stylesheet" href="study/css/public/import.css">
    <link rel="stylesheet" href="./study/css/ImportData_v1.css">

</head>
<body>
<div class="header">
    <div class="title">
        <span class="chineseTitle">小管家</span>
        <div class="englishTitle">
            <span>Your Own</span>
            <span>Chamberiain</span>
        </div>
    </div>
    <div class="userInfo">
        <img src="study/images/Analysis_user.png">
        <span>用户</span>
        <span id="userName" class="userName">Elmer</span>
        <span id="greet">上午好！</span>
        <a href="FirstPage_v1.html">退出</a>
    </div>
</div>

<div class="calendar" id="calendar">
    <img src="study/images/CalendarTitle.png">
    <select class="selectMonth" id="selectMonth"></select>
    <select class="selectYear" id="selectYear"></select>
    <div class="calendar-box"  id="calendar-box"></div>
</div>

<div class="content">
    <div class="input moneyIn">
        <input type="text" class="year">
        <span>年</span>
        <input type="text" class="month">
        <span>月</span>
        <input type="text" class="day">
        <span>日</span>
        <input class="J-datePicker f-hide" readonly/>
        <div class="inputMoney inMoney">
            <span>进项数据</span>
            <input type="text">
            <span>元</span>
        </div>
        <div class="Chart inChart J-chart" data-type="0" data-name="进项">
            <span>这里是图</span>
        </div>
        <span class="u-introChart">最近一周进项数据展示</span>
    </div>
    <div class="input moneyOut">
        <input type="text" class="year">
        <span>年</span>
        <input type="text" class="month">
        <span>月</span>
        <input type="text" class="day">
        <span>日</span>
        <input class="J-datePicker f-hide" readonly/>
        <div class="inputMoney outMoney">
            <span>销项数据</span>
            <input type="text">
            <span>元</span>
        </div>
         <div class="Chart outChart J-chart" data-type="0" data-name="销项">
            <span>这里是图</span>
        </div>
        <span class="u-introChart">最近一周销项数据展示</span>
    </div>
    <div class="action">
        <button id="confirmIn">确认录入</button>
        <button id="toAnalyze">查看数据分析</button>
    </div>
</div>
<form action="resetData.jsp" method="post">
<div class="g-modify">
	<div class="m-title">
		<span>修改数据</span>
		<a href="javascript:;"><img src="study/images/cancel.png"></a>
	</div>
	<div class="m-timeShow">
		<span>录入的时间为：xxxx年xx月xx日</span>
	</div>
	<div class="m-dataInformation">
		<span>进项数据：</span>
		<input type="text" class="u-dataIn" name="u-dataIn">
	</div>
	<div class="m-dataInformation">
		<span>销项数据：</span>
		<input type="text" class="u-dataOut" name="u-dataOut">
	</div>
	<input type="submit" class="u-submitModify" value="保存修改">
	<input type="text" class="u-timeInfo" name="u-timeInfo">
</div>
</form>

<div class="footer">
    <span>企业税收统筹及经营状况分析首选品牌，倡导行业良性发展，一体化高效服务</span>
</div>
<script type="text/javascript" src="study/js/public/jquery.min.js"></script>
<script type="text/javascript" src="study/js/ImportData_v1.js"></script>
<script type="text/javascript" src="study/js/getData.js"></script>
<script type="text/javascript" src="study/js/public/jquery.min.js"></script>
<script type="text/javascript" src="study/js/public/bootstrap.min.js"></script>
<script type="text/javascript" src="study/js/public/jquery-ui.min.js"></script>
<script type="text/javascript" src="study/js/public/jQuery-ui-datepicker-zh-CN.js"></script>
<script type="text/javascript" src="study/js/public/echarts.js"></script>
<script type="text/javascript" src="study/js/EchartAPI.js"></script>
<script type="text/javascript">
// 获取数据
window.getData.getDataHandle();
var myName="<%=session.getAttribute("username")%>";
$("span.userName").text(myName);

// 画图
window.EchartsAPI.EchartsHandle('.J-chart');
$(function() {
    $('.J-datePicker').each(function(){
        var self = $(this);
        self.datepicker({
            showOn: "button",
            buttonImage: "study/images/not_click.png",
            buttonImageOnly: true,
            showButtonPanel: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yymmdd',
            onSelect:function(){
                // 在这里获取日期，打开F12的console台查看输出值
                //console.log($('.J-datePicker').val());
                self.siblings('.year').val(self.datepicker("getDate").getFullYear());
                self.siblings('.month').val(self.datepicker("getDate").getMonth()+1);
                self.siblings('.day').val(self.datepicker("getDate").getDate());
                /* 如果日期改变
                 * 先更新数据
                 * 然后调用window.EchartsAPI.ajaxEcharts('.J-chart')进行图表的更新
                 */
            }
        });
    });
});
</script>
</body>
</html>
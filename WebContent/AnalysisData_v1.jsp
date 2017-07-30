<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>数据分析页面</title>
    <link rel="stylesheet" href="study/css/public/3.3.6/bootstrap.min.css">
    <link rel="stylesheet" href="study/css/public/import.css">
    <link rel="stylesheet" href="study/css/Analysis_v1.css">
    
    <link rel="stylesheet" href="study/css/public/3.3.6/bootstrap.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.theme.min.css">
    <link rel="stylesheet" href="study/css/public/jquery-ui.structure.min.css">
    <link rel="stylesheet" href="study/css/public/import.css">
    
    <script type="text/javascript" src="study/js/public/jquery.min.js"></script>
    <script type="text/javascript" src="study/js/public/bootstrap.min.js"></script>
    <script type="text/javascript" src="study/js/public/jquery-ui.min.js"></script>
	<script type="text/javascript" src="study/js/public/jQuery-ui-datepicker-zh-CN.js"></script>
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

<div class="content" style="height: 565px">
    <div class="left-button">
        <div><button class="createPro">更新数据</button></div>
        <div><button class="returnIn">返回录入</button></div>

    </div>
    <div class="centerShow">
        <div class="top-choice">
            <input type="button" class="choice-week" disabled value="周">
            <input type="button" class="choice-month"  value="月">
            <input type="button" class="choice-year"   value="年">
            <input class="J-datePicker f-hide" readonly/>
             <input type="text" class="u-hideData" value="2017/6/21">
        </div>
        <div class="bottom-show J-bottom-show" data-type="1">
            <span>这里画图</span>
        </div>
    </div>
    <div class="right-show-choice">
        <span class="title"><img src="study/images/showimg.jpg"></span>
        <span class="title">智能显示</span>
        <div class="show-choice">
            <a class="choice J-choice"><img src="study/images/1.png"></a>
            <a class="choice J-choice"><img src="study/images/2.png"></a>
            <a class="choice J-choice"><img src="study/images/3.png"></a>
            <a class="choice J-choice"><img src="study/images/5.png"></a>
            <!-- <a class="choice J-choice"><img src="study/images/4.png"></a> -->
            <!-- <a class="choice J-choice"><img src="study/images/6.png"></a> -->
        </div>
        <div class="function f-hide">
            <a class="funcMark f-curMark J-funcMark">数据</a><a class="funcMark J-funcMark">标记</a><i></i>
            <div class="div-mark">
                <a class="funcMarkChoice"><img src="study/images/choose.png"> </a>
                <a class="funcMarkChoice"><img src="study/images/Mark.png"> </a>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <span>企业税收统筹及经营状况分析首选品牌，倡导行业良性发展，一体化高效服务</span>
</div>
<script type="text/javascript" src="study/js/getData.js"></script>
<script type="text/javascript" src="study/js/public/echarts.js"></script>
<script type="text/javascript" src="study/js/EchartAPI.js"></script>
<script type="text/javascript">
    // 获取数据
    window.getData.getDataHandle();
    //用户名设置
    var myName="<%=session.getAttribute("username")%>";
	$("span.userName").text(myName);
    // 画图
    window.EchartsAPI.EchartsHandle('.J-bottom-show');
    //    $('.J-funcMark').click(function() {
    //        $(this).addClass('f-curMark').siblings().removeClass('f-curMark');
    //        $('.funcMarkChoice').eq($(this).index()).show().siblings().hide();
    //    });
    $('.J-choice').click(function () {
        $(".J-bottom-show").data('type', $(this).index() + 1);
        window.EchartsAPI.changeEcharts('.J-bottom-show');
    });
    $(function () {
        function CategoryTime() {
            $("input.choice-week").click(function () {
                $("input.choice-week").attr("disabled", true);
                $("input.choice-month").attr("disabled", false);
                $("input.choice-year").attr("disabled", false);
                window.EchartsAPI.ajaxEcharts('.J-bottom-show');
            });
            $("input.choice-month").click(function () {
                $("input.choice-week").attr("disabled", false);
                $("input.choice-month").attr("disabled", true);
                $("input.choice-year").attr("disabled", false);
                window.EchartsAPI.ajaxEcharts('.J-bottom-show');
            });
            $("input.choice-year").click(function () {
                $("input.choice-week").attr("disabled", false);
                $("input.choice-month").attr("disabled", false);
                $("input.choice-year").attr("disabled", true);
                window.EchartsAPI.ajaxEcharts('.J-bottom-show');
            });
        }
        CategoryTime();

        $('.J-datePicker').each(function () {
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
                onSelect: function () {
                    self.siblings("input.u-hideData").val("" + self.datepicker("getDate").getFullYear() + "/" +
                            (self.datepicker("getDate").getMonth() + 1).toString() + "" + "/" +
                            self.datepicker("getDate").getDate());
                }
            });
        });
        $("button.returnIn").click(function(){
        	window.location.href='ImportData_v1.jsp';
        })
        $("button.createPro").click(function(){
            // 获取数据
            window.getData.getDataHandle();
            window.EchartsAPI.changeEcharts('.J-bottom-show');
        })
    });

</script>
</body>
</html>
var _getData = (function () {
    var Data = {
        init: function () {
            var self = this;
            self.$allData = [];
            self.$import_import = [];
            self.$import_output = [];
            self.$import_xAxixData = [];
            self.$analysis_import = [];
            self.$analysis_output = [];
            self.$analysis_xAxisData = [];
            self.getData();
        },
        getData: function () {
            $.ajax({
                type: "post",
                dataType: "text",
                url: "renderCalender.jsp",
                async: false,
                complete: function (XMLHttpRequest, textStatus) {
                    //console.log(XMLHttpRequest.responseText);
                    //$("span.u-getAllData").text(XMLHttpRequest.responseText)
                    self.$allData = eval(XMLHttpRequest.responseText);
                }
            });
        },
        getImport_Simple: function () {
            //var self = this;
            var data1 = [];
            var cur_day = new Date();
            var cur_str = "" + cur_day.getFullYear() + (cur_day.getMonth() + 1).toString() + cur_day.getDate();
            for (var i = 6; i >= 0; i--) {
                var exit = false;
                //console.log(self.$allData);
                for (var j = 0; j < self.$allData.length; j++) {
                    var oneData = JSON.parse(self.$allData[j]);
                    if (cur_str == oneData.dataDate) {
                        data1[i] = oneData.dataIn;//表示进项数据
                        exit = true;
                    }
                }
                if (!exit) data1[i] = 0;
                if (cur_day.getDate() == 1) {
                    var day = new Date(cur_day.getFullYear, cur_day.getMonth - 1, 0);
                    cur_str = "" + day.getFullYear() + (day.getMonth() + 1).toString() + day.getDate();
                } else {
                    var cur_number = Number(cur_str);
                    var next_number = cur_number - 1;
                    cur_str = next_number.toString();
                }
            }
            self.$import_import = data1;
            return self.$import_import;
            //console.log(self.$import_import);
        },
        getOutput_Simple: function () {
            var data2 = [];
            var cur_day = new Date();
            var cur_str = "" + cur_day.getFullYear() + (cur_day.getMonth() + 1).toString() + cur_day.getDate();
            for (var i = 6; i >= 0; i--) {
                var exit = false;
                for (var j = 0; j < self.$allData.length; j++) {
                    var oneData = JSON.parse(self.$allData[j]);
                    if (cur_str == oneData.dataDate) {
                        data2[i] = oneData.dataOut;//表示销项数据
                        exit = true;
                    }
                }
                if (!exit) data2[i] = 0;
                if (cur_day.getDate() == 1) {
                    var day = new Date(cur_day.getFullYear, cur_day.getMonth - 1, 0);
                    cur_str = "" + day.getFullYear() + (day.getMonth() + 1).toString() + day.getDate();
                } else {
                    var cur_number = Number(cur_str);
                    var next_number = cur_number - 1;
                    var cur_str = next_number.toString();
                }
            }
            self.$import_output = data2;
            return self.$import_output;
        },
        getXdata_Simple: function () {
            var cur_day = new Date();
            var data = [];
            for (var i = 6; i >= 0; i--) {
                var str = "" + cur_day.getFullYear() + "/"
                    + (cur_day.getMonth() + 1).toString() + "/" + cur_day.getDate();
                data[i] = str;
                if (cur_day.getDate() == 1) {
                    var cur_day = new Date(cur_day.getFullYear, cur_day.getMonth - 1, 0);

                } else {
                    var day = new Date(cur_day.getFullYear(), cur_day.getMonth(), cur_day.getDate() - 1);
                    cur_day = day;
                }

            }
            self.$import_xAxixData = data;
            return self.$import_xAxixData;
        },
        getAnalysis: function () {
            var data1 = [], data2 = [];
            if ($("input.choice-week").prop("disabled")) {
                var str = $("input.u-hideData").val();
                var cur_date = new Date(str);
                var cur_day = cur_date.getDay();
                var date_str = "" + cur_date.getFullYear() + (cur_date.getMonth() + 1).toString() + cur_date.getDate();
                var date = cur_date.getDate();
                for (var i = cur_day; i >= 0; i--) {
                    var before_exit;
                    for (var j = 0; j < self.$allData.length; j++) {
                        var oneData = JSON.parse(self.$allData[j]);
                        if (date_str == oneData.dataDate) {
                            data1[i] = oneData.dataIn;
                            data2[i] = oneData.dataOut;
                            before_exit = true;
                        }
                    }
                    if (!before_exit) {
                        data1[i] = 0;
                        data2[i] = 0;
                    }
                    date--;
                    var new_date = new Date(cur_date.getFullYear(), cur_date.getMonth(), date);
                    date_str = "" + new_date.getFullYear() + (new_date.getMonth() + 1).toString() + new_date.getDate();
                    //console.log(date_str);

                }
                date = cur_date.getDate() + 1;
                date_str = "" + cur_date.getFullYear() + (cur_date.getMonth() + 1).toString() + (cur_date.getDate() + 1).toString();
                //console.log(date_str);
                for (var m = cur_day + 1; m <= 6; m++) {
                    var after_exit;
                    for (var j = 0; j < self.$allData.length; j++) {
                        var oneData = JSON.parse(self.$allData[j]);
                        if (date_str == oneData.dataDate) {
                            data1[m] = oneData.dataIn;
                            data2[m] = oneData.dataOut;
                            after_exit = true;
                            console.log(data1[m])
                        }
                    }
                    if (!after_exit) {
                        data1[m] = 0;
                        data2[m] = 0;
                    }
                    date++;
                    var new_date = new Date(cur_date.getFullYear(), cur_date.getMonth(), date);
                    date_str = "" + new_date.getFullYear() + (new_date.getMonth() + 1).toString() + new_date.getDate();
                    //console.log(after_exit);

                }
                self.$analysis_import = data1;
                self.$analysis_output = data2;
                var analysis = [];
                analysis[0] = self.$analysis_import;
                analysis[1] = self.$analysis_output;
                return analysis;
            } else if ($("input.choice-month").prop("disabled")) {
                var str = $("input.u-hideData").val();
                var cur_date = new Date(str);
                var date_number = new Date(cur_date.getFullYear(), cur_date.getMonth(), 0).getDate();
                //var data_str=""+cur_date.getFullYear()+(cur_date.getMonth()+1).toString()+"1";
                for (var t = 0; t < date_number; t++) {
                    var data_str = "" + cur_date.getFullYear() + (cur_date.getMonth() + 1).toString() + (t + 1).toString();
                    var exit = false;
                    for (var t_data = 0; t_data < self.$allData.length; t_data++) {
                        var one_data = JSON.parse(self.$allData[t_data]);
                        if (data_str == one_data.dataDate) {
                            data1[t] = one_data.dataIn;
                            data2[t] = one_data.dataOut;
                            exit = true;
                            //console.log(data1[t]);
                        }
                    }
                    if (!exit) {
                        data1[t] = 0;
                        data2[t] = 0;
                    }
                    //console.log(exit);
                }
                self.$analysis_import = data1;
                self.$analysis_output = data2;
                //noinspection JSDuplicatedDeclaration
                var analysis = [];
                analysis[0] = self.$analysis_output;
                analysis[1] = self.$analysis_import;
                return analysis;

            } else {
                var str = $("input.u-hideData").val();
                var cur_date = new Date(str);
                var cur_year = cur_date.getFullYear();
                for (var i = 0; i < 12; i++) {
                    var new_date = new Date(cur_year, i + 1, 0);
                    var new_number = new_date.getDate();
                    data1[i] = 0;
                    data2[i] = 0;
                    for (var j = 0; j < new_number; j++) {
                        data_str = "" + cur_year + (i + 1).toString() + (j + 1).toString();
                        //console.log(data_str);
                        var exit = false;
                        for (var t = 0; t < self.$allData.length; t++) {
                            var one_data = JSON.parse(self.$allData[t]);
                            if (data_str == one_data.dataDate) {
                                data1[i] += Number(one_data.dataIn);
                                data2[i] += Number(one_data.dataOut);
                                exit = true;
                            }
                        }
                    }
                }
                self.$analysis_output = data2;
                self.$analysis_import = data1;
                //noinspection JSDuplicatedDeclaration
                var analysis = [];
                analysis[0] = self.$analysis_output;
                analysis[1] = self.$analysis_import;
                return analysis;
            }
        },
        getXdata: function () {
            if ($("input.choice-week").prop("disabled")) {
                self.$analysis_xAxisData = ['日', '一', '二', '三', '四', '五', '六'];
            } else if ($("input.choice-month").prop("disabled")) {
                var str = $("input.u-hideData").val();
                var cur_date = new Date(str);
                var date_number = new Date(cur_date.getFullYear(), cur_date.getMonth(), 0).getDate();
                for (var i = 0; i < date_number; i++) {
                    self.$analysis_xAxisData[i] = i + 1;
                }
            } else {
                var date = [];
                for (var j = 0; j < 12; j++) {
                    date[j] = j + 1;

                }
                self.$analysis_xAxisData = date;
            }
            return self.$analysis_xAxisData;
        }
    };

    function getDataHandle() {
        Data.init();
    }
    return {
        getDataHandle: getDataHandle,
        //插入数据页面的进项数据
        import_import: Data.getImport_Simple,
        //插入数据页面的销项数据
        import_output: Data.getOutput_Simple,
        //插入数据页面的x坐标
        import_xAxix: Data.getXdata_Simple,
        //分析页面的进项数据
        analysis_data: Data.getAnalysis,
        //分析页面x坐标
        analysis_xAxix: Data.getXdata
        //重新更新数据
    }
})();

window.getData = $.extend((window.getData || {}), _getData);
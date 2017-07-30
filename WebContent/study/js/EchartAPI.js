var _EchartsAPI = (function () {
    var EchartsArea = {
        init: function (EachartsDom) {
            var self = this;
            self.$chart = null;
            self.$option = null;
            self.$dom = null;
            self.$type = 0;
            // 分析数据页面的图的x轴的数据
            self.$xAxisData = [];
            // 导入数据页面的图的x轴的数据
            self.$xAxisData_simple = [];
            // data[0]表示销项数据，data[1]表示进项数据，都是正数集合
            self.$data = [];
            $(EachartsDom).each(function () {
                self.$dom = $(this);
                self.$chart = echarts.init(self.$dom[0]);
                self.view($(this).data('type'));
            });
        },
        /***** 数据模拟生成  ******/
        //random: function (max) {
        //    return (Math.random() * max).toFixed(2);
        //},
        proData_Simple: function () {
            var self = this;
            self.$xAxisData_simple[0] = window.getData.import_xAxix() || [];
            self.$xAxisData_simple[1] = window.getData.import_xAxix() || [];
            self.$data[0] = window.getData.import_import() || [];
            self.$data[1] = window.getData.import_output() || [];
            //console.log(self.$data[0]);
            //console.log(self.$data[1]);
        },
        proData: function () {
            var self = this;
            self.$xAxisData = window.getData.analysis_xAxix() || [];
            self.$data = window.getData.analysis_data() || [];
        },
        proData_Name: function () {
            var self = this,
                len = self.$data[0].length;
            for (var i = 0; i < len; i++) {
                self.$data[0][i] = {value: self.$data[0][i], name: self.$xAxisData[i]};
                self.$data[1][i] = {value: self.$data[1][i], name: self.$xAxisData[i]};
            }
        },
        minumOperation: function (array) {
            var res = [];
            for (var i = 0; i < array.length; i++) {
                res[i] = -array[i];
            }
            return res;
        },
        sumOperation: function (arrayIN, arrayOUT) {
            var sum = [];
            for (var i = 0; i < arrayIN.length; i++) {
                sum[i] = (arrayIN[i] - arrayOUT[i]).toFixed(2);
            }
            return sum;
        },
        dataUpdate: function (_type) {
            var self = this,
                _option = null;
            self.$chart.showLoading();
            switch (_type) {
                case 0:
                    self.proData_Simple();
                    var $Is_Out = 0;
                    if (self.$dom.data('name') == '进项') {
                        $Is_Out = 0;
                    }
                    else {
                        $Is_Out = 1;
                    }
                    _option = {
                        xAxis: {
                            data: self.$xAxisData_simple[$Is_Out]
                        },
                        series: [{
                            name: self.$dom.data('name'),
                            data: self.$data[$Is_Out]
                        }]
                    };
                    break;
                case 1:
                    self.proData();
                    _option = {
                        yAxis: [{
                            data: self.$xAxisData
                        }],
                        series: [
                            {
                                name: '利润',
                                data: self.sumOperation(self.$data[1], self.$data[0])
                            },
                            {
                                name: '销项',
                                data: self.$data[1]
                            },
                            {
                                name: '进项',
                                data: self.minumOperation(self.$data[0])
                            }
                        ]
                    };
                    break;
                case 3:
                    self.proData();
                    self.proData_Name();
                    _option = {
                        series: [
                            {
                                name: '进项',
                                data: self.$data[0]
                            },
                            {
                                name: '销项',
                                data: self.$data[1]
                            }
                        ]
                    };
                    break;
                case 2:
                case 4:
                    self.proData();
                    _option = {
                        xAxis: {
                            data: self.$xAxisData
                        },
                        series: [
                            {
                                name: '进项',
                                data: self.$data[0]
                            },
                            {
                                name: '销项',
                                data: self.$data[1]
                            }
                        ]
                    };
                    break;
                default:
                    break;
            }
            if (_option && typeof _option === "object") {
                self.$chart.setOption(_option);
                self.$chart.hideLoading();
            }
        },
        /******* 数据模拟结束   ********/
        view: function (_type) {
            var self = this;
            self.$chart.showLoading();
            switch (_type) {
                case 0:
                    self.simpleBrokenLineChart(self.$dom.data('name'));
                    break;
                case 1:
                    self.barChart_Plus_Minus();
                    break;
                case 2:
                    self.barChart();
                    break;
                case 3:
                    self.pieChart();
                    break;
                case 4:
                    self.brokenLineChart();
                    break;
                default:
                    self.$option = null;
                    break;
            }
            if (self.$option && typeof self.$option === "object") {
                self.$chart.setOption(self.$option, true);
                self.$chart.hideLoading();
            }
        },
        simpleBrokenLineChart: function (_name) {
            var self = this,
                $Is_Out = 0;
            self.$option = null;
            if (_name == '进项') {
                $Is_Out = 0;
            }
            else {
                $Is_Out = 1;
            }
            self.proData_Simple();
            self.$option = {
                axisPointer: {
                    show: 'true',
                    type: 'line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    data: self.$xAxisData_simple[$Is_Out]
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: _name,
                        type: 'line',
                        stack: '总额',
                        areaStyle: {normal: {}},
                        data: self.$data[$Is_Out]
                    }
                ]
            }
        },
        brokenLineChart: function () {
            var self = this;
            self.$option = null;
            self.proData();
            self.$option = {
                title: {
                    text: '进销项数据对比图',
                    left: 'center',
                    top: '10px'
                },
                legend: {
                    data: ['进项', '销项'],
                    left: '60%',
                    top: '15px'
                },
                axisPointer: {
                    show: 'true',
                    type: 'line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {},
                        dataView: {readOnly: false}
                    }
                },
                grid: {
                    left: '8%',
                    right: '6%',
                    top: '15%',
                    bottom: '21%',
                    containLabel: false
                },
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter',
                        bottom: '5%',
                        startValue: 0,
                        endValue: 11,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    data: self.$xAxisData
                },
                yAxis: {
                    type: 'value',
                    max: 'dataMax',
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: '进项',
                        type: 'line',
                        stack: '总额',
                        areaStyle: {normal: {}},
                        data: self.$data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '进项平均值'}
                            ]
                        }
                    },
                    {
                        name: '销项',
                        type: 'line',
                        stack: '总额',
                        areaStyle: {normal: {}},
                        data: self.$data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '进项平均值'}
                            ]
                        }
                    }
                ]
            }
        },
        barChart: function () {
            var self = this;
            self.$option = null;
            self.proData();
            self.$option = {
                title: {
                    text: '进销项数据对比图',
                    left: 'center',
                    top: '10px'
                },
                legend: {
                    data: ['进项', '销项'],
                    left: '60%',
                    top: '15px'
                },
                axisPointer: {
                    type: 'shadow'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {},
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {readOnly: false}
                    }
                },
                grid: {
                    left: '8%',
                    right: '6%',
                    top: '15%',
                    bottom: '21%',
                    containLabel: false
                },
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter',
                        bottom: '5%',
                        startValue: 0,
                        endValue: 11,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                xAxis: {
                    show: true,
                    type: 'category',
                    splitLine: {
                        show: true
                    },
                    data: self.$xAxisData
                },
                yAxis: {
                    type: 'value',
                    max: 'dataMax',
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: '进项',
                        type: 'bar',
                        stack: '总额',
                        areaStyle: {normal: {}},
                        data: self.$data[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '进项平均值'}
                            ]
                        }
                    },
                    {
                        name: '销项',
                        type: 'bar',
                        stack: '总额',
                        areaStyle: {normal: {}},
                        data: self.$data[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '进项平均值'}
                            ]
                        }
                    }
                ]
            }
        },
        barChart_Plus_Minus: function () {
            var self = this;
            self.$option = null;
            self.proData();
            self.$option = {
                title: {
                    text: '进销项数据对比图',
                    left: '35%',
                    top: '10px'
                },
                legend: {
                    data: ['利润', '进项', '销项'],
                    left: '56%',
                    top: '14px'
                },
                axisPointer: {
                    type: 'shadow'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {},
                        dataView: {readOnly: false}
                    }
                },
                grid: {
                    left: '8%',
                    right: '10%',
                    bottom: '10%',
                    top: '15%',
                    containLabel: false
                },
                dataZoom: [
                    {
                        id: 'dataZoomY',
                        type: 'slider',
                        yAxisIndex: 0,
                        filterMode: 'filter',
                        right: '3%',
                        startValue: 0,
                        endValue: 6,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                xAxis: [{
                    type: 'value'
                }],
                yAxis: [{
                    type: 'category',
                    axisTick: {show: false},
                    data: self.$xAxisData
                }],
                series: [
                    {
                        name: '利润',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: self.sumOperation(self.$data[1], self.$data[0])
                    },
                    {
                        name: '销项',
                        type: 'bar',
                        stack: '总额',
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        data: self.$data[1]
                    },
                    {
                        name: '进项',
                        type: 'bar',
                        stack: '总额',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        data: self.minumOperation(self.$data[0])
                    }
                ]
            }
        },
        pieChart: function () {
            var self = this;
            self.$option = null;
            self.proData();
            self.proData_Name();
            self.$option = {
                title: {
                    text: '进销项数据对比图',
                    left: 'center',
                    top: '10px'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b0} {a0}{c0}元<br/>({d0}%)'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {},
                        dataView: {readOnly: false}
                    }
                },
                series: [
                    {
                        name: '进项',
                        type: 'pie',
                        stack: '总额',
                        radius: '60%',
                        center: ['25%', '50%'],
                        data: self.$data[0]
                    },
                    {
                        name: '销项',
                        type: 'pie',
                        stack: '总额',
                        radius: '60%',
                        center: ['75%', '50%'],
                        data: self.$data[1]
                    }
                ]
            }
        }
    };

    function EchartsHandle(EachartsDom) {
        EchartsArea.init(EachartsDom);
    }

    function changeEcharts(_dom) {
        EchartsArea.view($(_dom).data('type'));
    }

    function ajaxEcharts(_dom) {
        EchartsArea.dataUpdate($(_dom).data('type'));
    }

    return {
        // 初始化所有图表
        EchartsHandle: EchartsHandle,
        // 异步更新数据
        ajaxEcharts: ajaxEcharts,
        // 切换图表模式
        changeEcharts: changeEcharts
    }
})();
window.EchartsAPI = $.extend((window.EchartsAPI || {}), _EchartsAPI);


import vaccination from '@/static/vaccination.json'
import _ from 'lodash'

var colorPalette = ['#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
  '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
  '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
  '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
];
var romaTheme = {

  color: colorPalette,

  visualMap: {
    color: ['#e01f54', '#e7dbc3'],
    textStyle: {
      color: '#333'
    }
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#e01f54',
        color0: '#001852',
        lineStyle: {
          width: 1,
          color: '#f5e8c8',
          color0: '#b8d2c7'
        }
      }
    }
  },

  graph: {
    color: colorPalette
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [[0.2, '#E01F54'], [0.8, '#b8d2c7'], [1, '#001852']],
        width: 8
      }
    }
  }
};
function getVaccinationDate() {
  let date = []
  var rows =[]
  for(let ele of vaccination){
    if(ele.SOC=="CHN"){
      rows.push(ele)
    }
  }
  rows.sort(function (a, b) {
    return Date.parse(a.date) - Date.parse(b.date);//时间正序
  });
  for (let country of rows) {
    date.push(country.date)
  }
  let date1 = _.uniq(date)
  return {date1,rows}
}
function getChinaVaccinationData(var1 = vaccination) {
  let ChinaTotalVaccinated = [];
  let ChinaDailyVaccinated = [];
  let ChinaPopulation=[]
  let rows = getVaccinationDate().rows
  for (let ele of rows) {
    if(ele.SOC=="CHN"){
      ChinaTotalVaccinated.push(ele.tV);
      ChinaDailyVaccinated.push(ele.dV)
      ChinaPopulation.push(1411780000)
    }
  }
  return {
    ChinaTotalVaccinated, ChinaDailyVaccinated,ChinaPopulation
  }
}
function getSevenContinentsData() {
  let date =[], OWID_AFR = [],OWID_ASI =[] ,OWID_EUR =[], OWID_NAM = [],OWID_OCE =[], OWID_SAM =[], OWID_WRL =[];
  for (let element of vaccination) {
    if (element.SOC == 'OWID_WRL') {
      date.push(element.date)
    }
  }
  for (let element of vaccination) {
    if (element.SOC == "OWID_AFR") {
      OWID_AFR.push(element.tV)
    }
    else if (element.SOC == "OWID_ASI") {
      OWID_ASI.push(element.tV)
    }
    else if (element.SOC == "OWID_EUR") {
      OWID_EUR.push(element.tV)
    }
    else if (element.SOC == "OWID_NAM") {
      OWID_NAM.push(element.tV)
    }
    else if (element.SOC == "OWID_OCE") {
      OWID_OCE.push(element.tV)
    }
    else if (element.SOC == "OWID_SAM") {
      OWID_SAM.push(element.tV)
    }
    else if (element.SOC == "OWID_WRL") {
      OWID_WRL.push(element.tV)
    }
  }
  let length1 = OWID_AFR.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_AFR.unshift(0)
  }
  length1 = OWID_ASI.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_ASI.unshift(0)
  }
  length1 = OWID_EUR.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_EUR.unshift(0)
  }
  length1 = OWID_NAM.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_NAM.unshift(0)
  }
  length1 = OWID_OCE.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_OCE.unshift(0)
  }
  length1 = OWID_SAM.length
  for (let i = 0; i < date.length - length1; i++) {
    OWID_SAM.unshift(0)
  }
  return { date, OWID_AFR, OWID_ASI, OWID_EUR, OWID_NAM, OWID_OCE, OWID_SAM,OWID_WRL }
}
var chinaChartsOption = {
  title: {
    text: '',
    // textStyle: {
    //   color: '#FFFFFF',
    // }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      // label: {
      //   backgroundColor: '#000000'
      // }
    },
  },
  legend: {
    data: ['累计新冠疫苗接种数', '每日新冠疫苗接种数','总人口'],
    top: '2%',
    left: '0'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    },
    // iconStyle: {
    //   color: '#FFFFFF',
    // }
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true
  },
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'filter'
    },
    {
      id: 'dataZoomY',
      type: 'inside',
      yAxisIndex: [0],
      filterMode: 'empty'
    }
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: getVaccinationDate().date1,
      axisLabel: {
        color: '',
        fontSize:10,
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '',
        fontSize:10,
      }
    }
  ],
  series: [
    {
      name: '累计新冠疫苗接种数',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: getChinaVaccinationData().ChinaTotalVaccinated,
    },
    {
      name: '每日新冠疫苗接种数',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: getChinaVaccinationData().ChinaDailyVaccinated,
    },
    {
      name: '总人口',
      type: 'line',
      stack: '人口',
      areaStyle: {},
      data: getChinaVaccinationData().ChinaPopulation,
    },
  ],
  // color: ['#d48265', '#2f4554', '#61a0a8', '#c23531']
}
var sevenContinentsChartsOption = {
  title: {
    text: '',
    // textStyle: {
    //     color: '#FFFFFF',
    // },
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    },
    // iconStyle: {
    //     color: '#FFFFFF',
    // }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      // label: {
      //     backgroundColor: '#000000'
      // }
    },
  },
  legend: {
    top: '2%',
    left:'0px',
    data: ['亚洲疫苗接种总数', '非洲', '欧洲', '北美洲', '南美洲', '大洋洲','世界'],
    // textStyle: {
    //     color: '#FFFFFF',
    // }
  },
  grid: {

    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true
  },
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'filter'
    },
    {
      id: 'dataZoomY',
      type: 'inside',
      yAxisIndex: [0],
      filterMode: 'empty'
    }
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: getSevenContinentsData().date,
      axisLabel: {
        color: '',
        fontSize:10,
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '',
        fontSize:10,
      }
    }
  ],
  series: [
    {
      name: '亚洲疫苗接种总数', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_ASI,
    },
    {
      name: '非洲', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_AFR,
    },
    {
      name: '欧洲', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_EUR,
    },
    {
      name: '北美洲', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_NAM,
    },
    {
      name: '南美洲', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_SAM,
    },
    {
      name: '大洋洲', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_OCE,
    },
    {
      name: '世界', // 系列名称
      type: 'line', // 类型：线
      data: getSevenContinentsData().OWID_WRL,
    },
  ]
};
export { chinaChartsOption, sevenContinentsChartsOption, romaTheme }
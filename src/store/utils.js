import vaccination from '@/static/vaccination.json'
import nationRegion from '@/static/nationRegion.json'

function queryCoronaData(date, citySum, cityPos) {
    let mapData = {
        type: "FeatureCollection",
        name: "cityNew",
        crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: []
    }
    let tableList = [],
        selectedPoint = [];
    let sumConfirmed = 0
    let sumCured = 0
    let sumDead = 0
    let sumSuspected = 0
    let sumCurrentConfirmed = 0
    var points = citySum
    let position = cityPos
    for (let point of points) {
        if (point.uT === date) {
            selectedPoint.push(point)
                //统计确诊
            sumConfirmed += parseInt(point.coC);
            //治愈
            sumCured += point.cuC;
            //死亡
            sumDead += parseInt(point.dC);
            //疑似
            sumSuspected += parseInt(point.sC);
            //现存确诊
            sumCurrentConfirmed += parseInt(point.cCC);
            //插入到tableList 数据表list中
            tableList.push(point)

        }
    }
    for (let pos of position) {
        for (let point of selectedPoint) {
            if (pos.city == point.cN) {
                let tempObj = { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [] } }
                tempObj.properties = point
                tempObj.geometry.coordinates = [pos.X, pos.Y]
                mapData.features.push(tempObj)
            }
        }
    }

    return {
        tableList,
        sumConfirmed,
        sumCured,
        sumDead,
        sumSuspected,
        sumCurrentConfirmed,
        mapData,
    }
}

function subSet(arr1, arr2) {
    var len = arr2.length;
    var arr = [];

    while (len--) {
        if (arr1.indexOf(arr2[len]) < 0) {
            arr.push(arr2[len]);
        }
    }

    return arr;
};

function getVaccinationDate() {
    let date = []
    var rows = vaccination;
    rows.sort(function(a, b) {
        return Date.parse(a.date) - Date.parse(b.date); //时间正序
    });
    for (let country of rows) {
        date.push(country.date)
    }
    let dateList = _.uniq(date)
    return { dateList }
}

function getVaccinationData(var1) {
    let mapData = {
        type: "FeatureCollection",
        name: "vaccination",
        crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: []
    }
    let tableList = []
    let selectByDay = []
    let collection = []
    let regionName = []
    let allRegionName = []
    let worldDV = 0
    let worldTV = 0
    let worldPV = 0
    for (let country of vaccination) {
        if (country.date == var1) {
            selectByDay.push(country)
        }
    }
    for (let region of nationRegion.features) {
        for (let country of selectByDay) {
            if (country.SOC == region.properties.SOC) {
                let newObj = { type: "Feature", properties: {} }
                newObj.geometry = region.geometry
                Object.assign(newObj.properties, region.properties, country)
                collection.push(newObj)
                regionName.push(newObj.properties.SOC)
                tableList.push(newObj.properties)
                worldDV += country.dV
                worldTV += country.tV
                worldPV += country.pV
            }
        }
        allRegionName.push(region.properties.SOC)
    }
    let res = subSet(regionName, allRegionName)
    for (let region of nationRegion.features) {
        for (let name of res) {
            if (name == region.properties.SOC) {
                collection.push(region)
            }
        }
    }
    for (let ele of collection) {
        ele.properties.percent = ele.properties.pV / (ele.properties.pop_all * 10000)
        if (!ele.properties.percent) {
            ele.properties.percent = 9
        }
    }
    mapData.features = collection
    return {
        mapData,
        tableList,
        worldDV,
        worldTV,
        worldPV
    }
}



export { queryCoronaData, getVaccinationDate, getVaccinationData }
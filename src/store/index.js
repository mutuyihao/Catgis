import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import { queryCoronaData, getVaccinationData, getVaccinationDate } from './utils'

const vaccinationDateList = getVaccinationDate().dateList
const vaccinationData = getVaccinationData(vaccinationDateList[vaccinationDateList.length - 1])
Vue.use(Vuex)
const state = {
    mainMap: null,
    corona: {},
    selectedDate: "2020/7/4",
    selectedData: '',
    deviceType: "",
    vaccinationData: vaccinationData,
    vaccinationDateList: vaccinationDateList,
    vaccinationDate: "2021-07-11"

}
const getters = {
    getMap(state) {
        return state.mainMap
    },
    getCorona(state) {
        return state.corona
    },
    getTableList(state) {
        return state.corona.tableList
    },
    getVaccinationDateList(state) {
        return state.vaccinationDateList
    },
    getVaccinationData(state) {
        return state.vaccinationData
    }
}
const mutations = {
    setMap(state, map) {
        state.mainMap = map
    },
    setSelectedDate(state, value) {
        state.selectedDate = value
    },
    updateCorona(state, value) {
        state.corona = queryCoronaData(value.date, value.data1, value.pos)
        state.mainMap.getSource('mapData').setData(state.corona.mapData)
        state.mainMap.getSource('mapData1').setData(state.corona.mapData)
    },
    setDeviceType(state, value) {
        state.deviceType = value
    },
    setVaccinationDate(state, value) {
        state.vaccinationDate = value
    },
    setVaccinationData(state, value) {
        state.vaccinationData = getVaccinationData(value)
        state.mainMap.getSource('vaccination').setData(state.vaccinationData.mapData)
    }
}
const actions = {
    setNewMap(context, map) {
        context.commit("setMap", map)
    },
    setNewSelectedDate(context, value) {
        context.commit("setSelectedDate", value)
        context.commit("setSelectedData", value)
    },
    setDeviceType(context, value) {
        context.commit("setDeviceType", value)
    },
    setNewVaccinationDate(context, value) {
        context.commit("setVaccinationDate", value)
        context.commit("setVaccinationData", value)
    },
}
const plugins = [vuexAlong]

const Store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins
})
export default Store
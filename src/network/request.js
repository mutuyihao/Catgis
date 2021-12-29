import axios from 'axios'

export function requestGeocoding(config) {
    const instance = axios.create({
        baseURL: 'https://restapi.amap.com/v3/geocode/geo?key=',
        timeout: 1000
    })
    return instance(config)
}
export function requestVaccination(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/get/',
        timeout: 1000
    })
    return instance(config)
}
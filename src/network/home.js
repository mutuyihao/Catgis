import { requestGeocoding, requestVaccination } from "./request.js"

export function getGeocoding(address) {
    return requestGeocoding({
        url: '',
        params: {
            address: address
        }

    })
}
export function queryVaccination(queryTime) {
    return requestVaccination({
        url: 'vaccinationdata/' + queryTime
    })
}
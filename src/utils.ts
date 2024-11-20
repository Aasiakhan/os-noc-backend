import {$} from 'bun'
import {type Service, Status} from "./types";

export async function isServiceOnline(service:Service) {
    return await $`nc -zvw 2 ${service.ip} ${service.port} &> /dev/null && printf ${Status.UP} || printf ${Status.DOWN}`.text() as Status
}

export async function readServicesFile(){
    const servicesFile = Bun.file('services.json',{type:"application/json"});
    try {
        const services:Service[] = JSON.parse(await servicesFile.text())
        return services
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function writeServicesFile(data:Service[]) {
    try { await Bun.write("services.json", JSON.stringify(data, null, 2)) }
    catch (err) { console.error("Error writing file:", err) }
}
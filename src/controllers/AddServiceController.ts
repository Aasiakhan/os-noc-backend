import {t} from "elysia";
import {readServicesFile, writeServicesFile} from "../utils";
import {Service} from "../types";


export const AddServiceBodySchema = {
    name: t.String({
        required: true,
        error:"Service name is required",
        maxLength: 30
    }),
    ip: t.String({
        format:"ipv4",
        required: true,
        error:"Please enter a valid IP address",
    }),
    port: t.Number({
        required: true,
        error:"Port number is required",
        maximum: 65535,
        min:80
    })
}

export async function AddServiceController({body : newService }:{body: Service}) {
    const services = await readServicesFile()
    const alreadyExistingService = services.find(service => service.name === newService.name)
    if(alreadyExistingService)
        return `Service name already exists with address:${alreadyExistingService.ip}:${alreadyExistingService.port}`
    await writeServicesFile([...services, newService])
    return "Service added successfully."

}
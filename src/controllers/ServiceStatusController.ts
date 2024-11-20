import {isServiceOnline, readServicesFile} from "../utils";

export const ServiceStatusController = async () => {
    const services = await readServicesFile()
    const data = await Promise.all(services.map(async (service) => {
        const serviceStatus = await isServiceOnline(service);
        if (serviceStatus==="UP") {
            return {...service, status: serviceStatus, last_online_at: new Date().toISOString()};
        }
        return {...service, status: serviceStatus};
    }))

    // Write to services.json
    try { await Bun.write("services.json", JSON.stringify(data, null, 2)) }
    catch (err) { console.error("Error writing file:", err) }

    return new Response(
        JSON.stringify({ updated_at: new Date().toISOString(), data }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
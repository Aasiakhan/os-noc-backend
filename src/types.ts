export interface Service {
    name:string,
    ip:Ip,
    port: Port,
    status:Status,
    last_online_at?:string
}

export enum Status {
    UP="UP",
    DOWN="DOWN",
}

export type Ip =`${number}.${number}.${number}.${number}`
export type Port = `${number}`
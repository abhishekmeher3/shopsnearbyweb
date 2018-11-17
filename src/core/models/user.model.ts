import {AgentExtra} from "./agentExtra.model"
export interface User{
    id: number,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    address: string,
    imageUrl: string,
    latitude: number,
    longitude: number,
    extraData: AgentExtra,
    type: string,
    active: boolean
}
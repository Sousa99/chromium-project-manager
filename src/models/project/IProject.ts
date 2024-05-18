import { ITicketData, ITicket } from "@models/ticket/ITicket"
import { IProjectModes } from "./IProjectModes"

export interface IProjectData {
    main_project: boolean,
    code: string,
    name: string,
    hidden: boolean,
    tickets: ITicketData[],
    modes?: IProjectModes,
}

export interface IProject extends IProjectData {
    id: string,
    tickets: ITicket[],
    modes: IProjectModes,
}
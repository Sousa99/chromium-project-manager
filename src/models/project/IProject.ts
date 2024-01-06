import { ITicketData, ITicket } from "@models/ticket/ITicket"

export interface IProjectData {
    main_project: boolean,
    code: string,
    name: string,
    hidden: boolean,
    tickets: ITicketData[],
}

export interface IProject extends IProjectData {
    id: string,
    tickets: ITicket[],
}
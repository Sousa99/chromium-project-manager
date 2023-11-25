import { ITicket } from "@models/ticket/ITicket"

export type IProject = {
    main_project: boolean,
    code: string,
    name: string,
    hidden: boolean,
    tickets: ITicket[],
}
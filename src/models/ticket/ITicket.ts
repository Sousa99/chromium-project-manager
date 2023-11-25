import { ITicketLink } from "./ITicketLink"
import { ITicketType } from "./ITicketType"

export type ITicket = {
    type: ITicketType,
    code: string,
    name: string,
    url?: string,
    hidden: boolean,
    links: ITicketLink[],
}
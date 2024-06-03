import { ITicketLink } from "./ITicketLink";
import { ITicketType } from "./ITicketType";

export interface ITicketData {
  type: ITicketType;
  code: string;
  name: string;
  url?: string;
  hidden: boolean;
  links: ITicketLink[];
}

export interface ITicket extends ITicketData {
  id: string;
}

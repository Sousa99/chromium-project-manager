import data from '@resources/checkers/IData-ti';
import project from '@resources/checkers/IProject-ti';
import ticket from '@resources/checkers/ITicket-ti';
import ticketLink from '@resources/checkers/ITicketLink-ti';
import ticketType from '@resources/checkers/ITicketType-ti';

import { IData } from './data/IData';

import {CheckerT, IErrorDetail, createCheckers} from "ts-interface-checker";

const checkers = createCheckers(data, project, ticket, ticketLink, ticketType) as {IData: CheckerT<IData>};
export const DataChecker = checkers.IData;

export const getSpecifiedError = (errorDetails: IErrorDetail[]): string => {
  let currentErrorDetail = errorDetails[0];
  while (currentErrorDetail.nested !== undefined) {
    currentErrorDetail = currentErrorDetail.nested[0];
  }

  return `${currentErrorDetail.path} ${currentErrorDetail.message}`;
}
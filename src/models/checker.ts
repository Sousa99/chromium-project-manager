import data from '@resources/checkers/IData-ti';
import project from '@resources/checkers/IProject-ti';
import projectModes from '@resources/checkers/IProjectModes-ti';
import ticket from '@resources/checkers/ITicket-ti';
import ticketLink from '@resources/checkers/ITicketLink-ti';
import ticketType from '@resources/checkers/ITicketType-ti';

import { IProjectsData } from './data/IData';

import {CheckerT, IErrorDetail, createCheckers} from "ts-interface-checker";

const checkers = createCheckers(data, project, projectModes, ticket, ticketLink, ticketType) as {IProjectsData: CheckerT<IProjectsData>};
export const DataChecker = checkers.IProjectsData;

export const getSpecifiedError = (errorDetails: IErrorDetail[]): string => {
  let currentErrorDetail = errorDetails[0];
  while (currentErrorDetail.nested !== undefined) {
    currentErrorDetail = currentErrorDetail.nested[0];
  }

  return `${currentErrorDetail.path} ${currentErrorDetail.message}`;
}
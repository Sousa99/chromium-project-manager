import { ITicketType } from "@models/ticket/ITicketType";

// Default Mode Configurations
/* eslint-disable no-template-curly-in-string */
export const DEFAULT_FEATURE_BRANCH_MODE =
  "${SEMTYPE}/${CODE}_${NAME_LOWER_NOSPACES}";
export const DEFAULT_PULL_REQUEST_MODE = "[${CODE}] ${SEMTYPE}: ${NAME}";
export const DEFAULT_REPORT_MODE = "[${PROJECT}]: [${CODE}]: ${NAME}";
/* eslint-enable no-template-curly-in-string */

export type TicketInfo = {
  project_main: boolean;
  project_code: string;
  type: ITicketType;
  code: string;
  name: string;
};

const RECOGNIZED_CODES: {
  [key: string]: {
    description: string;
    value: (info: TicketInfo) => string;
  };
} = {
  PROJECT: {
    description: "Code of the project associated with the ticket",
    value: (info: TicketInfo) => info.project_code,
  },
  SEMTYPE: {
    description: "Semantic type associated with the ticket.",
    value: (info: TicketInfo) => info.type,
  },
  CODE: {
    description: "Code meant to identify the ticket.",
    value: (info: TicketInfo) => info.code.toUpperCase(),
  },
  NAME: {
    description: "Description associated with the ticket.",
    value: (info: TicketInfo) => info.name,
  },
  NAME_LOWER_NOSPACES: {
    description: "Description associated with the ticket with no spaces.",
    value: (info: TicketInfo) =>
      info.name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z ]/g, " ")
        .replaceAll(/\s\s+/g, " ")
        .replaceAll(" ", "-"),
  },
};

export const checkValidityMode = (mode_format: string): boolean => {
  const regex = /\${([^}]+)}/g;
  const matches = Array.from(mode_format.matchAll(regex)).map(
    (match) => match[1],
  );

  return matches.every((match) => match in RECOGNIZED_CODES);
};

export const generateModeCode = (
  mode_format: string,
  info: TicketInfo,
): string => {
  const regex = /\${([^}]+)}/g;
  const matches = Array.from(mode_format.matchAll(regex)).map(
    (match) => match[1],
  );

  return matches.reduce((accumulator, match) => {
    const fullMatch = `\${${match}}`;
    const matchConfiguration = RECOGNIZED_CODES[match];
    const replaceValue = matchConfiguration.value(info);

    return accumulator.replace(fullMatch, replaceValue);
  }, mode_format);
};

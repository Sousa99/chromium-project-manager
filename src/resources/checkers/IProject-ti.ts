/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const IProject = t.iface([], {
  "main_project": "boolean",
  "code": "string",
  "name": "string",
  "hidden": "boolean",
  "tickets": t.array("ITicket"),
});

const exportedTypeSuite: t.ITypeSuite = {
  IProject,
};
export default exportedTypeSuite;
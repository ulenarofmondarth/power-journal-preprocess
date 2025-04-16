import { localize } from "@lib/helpers";

export default function (condition: string, truthyValue: string, falsyValue: string = ''): string {
  try {
    return eval?.(`"use strict";(${condition})`) ? truthyValue : falsyValue;
  } catch (e) {
    console.error(`ifMacro condition error: ${e}`);
    return localize("MON-PJE.ERROR.badifcond");
  }
}

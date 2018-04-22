import { Space } from "./Space";

let empty: Empty
export class Empty implements Space {
  static icon = '.'

  constructor() {
    if (!empty) empty = this
    return empty
  }

  toString() { return Empty.icon }
  inspect() { return Empty.icon }
}
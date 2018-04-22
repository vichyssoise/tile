import { Point, Direction } from "./types";
import { Manager } from "./Manager";
import { Space } from "./Space";

export abstract class Unit extends Space {
  position?: Point
  manager?: Manager
}



export class Player implements Unit {
  position?: Point
  manager?: Manager
  static icon = 'P'
  atk: number

  constructor(atk: number = 1) {
    this.atk = atk
  }

  moveOrAttack(direction: Direction) {
    this.manager!.interact(this, direction)
  }

  toString() { return Player.icon }
  inspect() { return Player.icon }
}



export class Enemy implements Unit {
  position?: Point
  manager?: Manager
  hp: number

  constructor(hp: number = 3) {
    this.hp = hp
  }

  beAttacked(atk: number) {
    this.hp = this.hp - atk

    if (this.hp <= 0)
      this.manager!.remove(this.position!)
  }

  toString() { return this.hp }
  inspect() { return this.hp }
}


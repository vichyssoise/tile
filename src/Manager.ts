import { Point, Direction } from "./types";
import { Space } from "./Space";
import { Empty } from "./Empty";
import { Unit, Player, Enemy } from "./Unit";

export class Manager {
  private size: number
  private map: Space[][]

  constructor(size: number) {
    this.size = size
    this.map = Array.apply(null, Array(10)).map(
      () => Array.apply(null, Array(10)).map(
        () => new Empty()
      )
    )
  }

  printMap() {
    console.log('\x1Bc');
    this.map.forEach(y => {
      console.log(y.join(' '))
    })
  }

  getPosition(origin: Point, direction: Direction) {
    const { size } = this
    switch (direction) {
      case 'up':
        return { y: (origin.y+size-1) % size, x: origin.x }
      case 'down':
        return { y: (origin.y+1) % size, x: origin.x }
      case 'right':
        return { y: origin.y, x: (origin.x+1) % size }
      case 'left':
        return { y: origin.y, x: (origin.x+size-1) % size }
    }
  }

  getSpace({x, y}: Point) {
    return this.map[y][x]
  }

  setSpace(unit: Unit, {x, y}: Point) {
    unit.position = {x, y}
    unit.manager = this
    this.map[y][x] = unit
  }

  remove({x, y}: Point) {
    this.map[y][x] = new Empty()
  }

  moveUnit(unit: Unit, to: Point) {
    this.remove(unit.position!)
    this.setSpace(unit, to)

  }

  interact(player: Player, direction: Direction) {
    const objectPosition = this.getPosition(player.position!, direction)!
    const object = this.getSpace(objectPosition)
    if (object instanceof Empty) {
      this.moveUnit(player, objectPosition)
    } else if (object instanceof Enemy) {
      object.beAttacked(player.atk)
    }
  }
}
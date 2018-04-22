import * as readline from 'readline'
import { Manager } from './Manager';
import { Player, Enemy } from './Unit';

const MAP_SIZE = 10
const manager = new Manager(MAP_SIZE)
const player = new Player()
manager.setSpace(player, { x: 0, y: 0 })
manager.setSpace(new Enemy(), { x: 3, y: 4 })
manager.setSpace(new Enemy(), { x: 3, y: 8 })
manager.setSpace(new Enemy(), { x: 7, y: 3 })
manager.setSpace(new Enemy(), { x: 9, y: 9 })


readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode!(true)
process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else {
    player.moveOrAttack(key.name)
    manager.printMap()
    console.log("Press arrow keys")
  }
})
manager.printMap()
console.log("Press arrow keys")

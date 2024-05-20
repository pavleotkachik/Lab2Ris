import { copyCommand } from './copy.js'
import { removeCommand } from './remove.js'

export async function moveCommand(args) {
    await copyCommand(args)
    await removeCommand(args)
}
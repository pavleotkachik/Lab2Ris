import {access, unlink} from 'fs/promises'

export async function removeCommand(args) {
    const [ fileName ] = args.filter((a) => typeof a === 'string')
    if (!fileName) throw new Error('Filename not found')

    await access(fileName)

    await unlink(fileName)
}
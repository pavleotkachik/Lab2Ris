import { stat } from 'fs/promises'
import { createReadStream } from 'fs'

export async function readContentCommand(args) {
    const [ fileName ] = args.filter((a) => typeof a === 'string')
    if (!fileName) throw new Error('Filename not found')

    const fileStat = await stat(fileName)
    if (!fileStat.isFile()) throw new Error('Not a file')

    const stream = createReadStream(fileName)
    stream.on('data', (chunk) => process.stdout.write(chunk))
    await new Promise((r) => stream.once('close', r))
}
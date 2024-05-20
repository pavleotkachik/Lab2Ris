import { stat, readFile } from 'fs/promises'
import { createHash } from 'crypto'

export async function hashCommand(args) {
    const [ fileName ] = args.filter((a) => typeof a === 'string')
    if (!fileName) throw new Error('Filename not found')

    const fileStat = await stat(fileName)
    if (!fileStat.isFile()) throw new Error('Not file')

    const content = await readFile(fileName)

    const hash = createHash('sha256').update(content).digest('hex')

    console.log('Hash of file: %s', hash)
}
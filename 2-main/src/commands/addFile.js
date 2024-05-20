import { writeFile } from 'fs/promises'

export async function addFileCommand(args) {
    const [ fileName ] = args.filter((a) => typeof a === 'string')
    if (!fileName) throw new Error('Filename not found')

    await writeFile(fileName, '', { flag: 'wx' })
}
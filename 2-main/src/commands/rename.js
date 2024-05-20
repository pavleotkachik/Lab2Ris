import { rename, access } from 'fs/promises'

export async function renameCommand(args) {
    const [ oldFileName, newFileName ] = args.filter((a) => typeof a === 'string')
    if (!(oldFileName && newFileName)) throw new Error('Not found old or new filename')

    await access(oldFileName)

    await rename(oldFileName, newFileName)
}
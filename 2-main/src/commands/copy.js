import { access, stat } from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'

export async function copyCommand(args) {
    const [ fileName, dirName ] = args.filter((a) => typeof a === 'string')
    if (!(fileName && dirName)) throw new Error('Not found filename or directory')

    await access(fileName)
    const dirStat = await stat(dirName)
    if (!dirStat.isDirectory()) throw new Error('Second argument is not a directory')

    const readStream = createReadStream(fileName)
    const writeStream = createWriteStream(join(dirName, fileName))

    await new Promise((r) =>
        readStream
            .pipe(writeStream)
            .once('finish', r)
    )
}
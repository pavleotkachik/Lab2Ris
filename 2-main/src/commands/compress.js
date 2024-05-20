import { stat } from 'fs/promises'
import { createBrotliCompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

export async function compressCommand(args) {
    const [ fileToCompress, archiveName ] = args.filter((a) => typeof a === 'string')
    if (!(fileToCompress && archiveName)) throw new Error('Not found filename or archive name')

    if (!archiveName.endsWith('.br')) throw new Error('archiveName should end with .br')
    const fileStat = await stat(fileToCompress)
    if (!fileStat.isFile()) throw new Error('Not a file')

    const brotli = createBrotliCompress()
    const sourceFileStream = createReadStream(fileToCompress)
    const archiveStream = createWriteStream(archiveName)

    await pipeline(sourceFileStream, brotli, archiveStream)
}
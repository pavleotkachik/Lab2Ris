import { stat } from 'fs/promises'
import { createBrotliDecompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

export async function decompressCommand(args) {
    const [ archiveToDecompress, fileName ] = args.filter((a) => typeof a === 'string')
    if (!(archiveToDecompress && fileName)) throw new Error('Not found archive name or filename')

    if (!archiveToDecompress.endsWith('.br')) throw new Error('archiveToDecompress should end with .br')
    const archiveStat = await stat(archiveToDecompress)
    if (!archiveStat.isFile()) throw new Error('Not a file')

    const deBrotli = createBrotliDecompress()
    const archiveFileStream = createReadStream(archiveToDecompress)
    const fileStream = createWriteStream(fileName)

    await pipeline(archiveFileStream, deBrotli, fileStream)
}
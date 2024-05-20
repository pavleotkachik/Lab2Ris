import { readdir } from 'fs/promises'
import { getFSType } from '../helpers.js'

export async function listCommand() {
    const dirFiles = await readdir(process.cwd(), { withFileTypes: true })
    if (!dirFiles.length) {
        console.log('Current directory is empty')
        return
    }

    console.table(dirFiles.map((o) =>  ({ name: o.name, type: getFSType(o) })))
}
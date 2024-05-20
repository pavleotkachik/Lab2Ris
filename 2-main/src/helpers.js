export function parseArgs(rawString) {
    if (!rawString?.length) return []

    const result = []

    const rawArgs = rawString.matchAll(/--(\S+)=([^ ]+)|--(\S+)|([^ ]+)/g)

    for (const matched of rawArgs) {
        result.push(matched[4]
            ? matched[4]
            : { name: matched[3] || matched[1], value: matched[2] || true })
    }

    return result
}

export function commandHeaderString() {
    return `You are currently in ${process.cwd()}`
}

export function promptString() {
    return '\n' + commandHeaderString() + '\n> '
}

export function getFSType(dirent) {
    if (dirent.isFile()) return 'file'
    if (dirent.isDirectory()) return 'directory'
    if (dirent.isSymbolicLink()) return 'symlink'
    if (dirent.isSocket()) return 'socket'
    if (dirent.isBlockDevice()) return 'blockDevice'
    if (dirent.isCharacterDevice()) return 'characterDevice'
    if (dirent.isFIFO()) return 'FIFO'

    return 'unknown'
}

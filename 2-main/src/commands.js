import {
    addFileCommand,
    changeDirectoryCommand, compressCommand, copyCommand, decompressCommand,
    exitCommand, hashCommand,
    listCommand, moveCommand, operatingSystemCommand,
    readContentCommand, removeCommand, renameCommand,
    upCommand
} from './commands/index.js'

export const commandsMap = {
    '.exit': exitCommand,
    'up': upCommand,
    'ls': listCommand,
    'cd': changeDirectoryCommand,
    'cat': readContentCommand,
    'add': addFileCommand,
    'rn': renameCommand,
    'cp': copyCommand,
    'mv': moveCommand,
    'rm': removeCommand,
    'os': operatingSystemCommand,
    'hash': hashCommand,
    'compress': compressCommand,
    'decompress': decompressCommand
}
export function exitCommand() {
    process.emit('SIGINT')
}
import { createInterface } from 'readline/promises'
import { parseArgs, promptString } from './helpers.js'
import { commandsMap } from './commands.js'
import { homedir } from 'os'

let username

function handleExit() {
    console.log('Thank you for using File Manager, %s, goodbye!', username)
}

process.on('SIGINT', () => {
    handleExit()
    process.exit()
})

async function bootstrap() {
    const args = process.argv.slice(2)

    const parsedArgs = parseArgs(args.join(' '))
    username = parsedArgs.find(a =>
        typeof a !== 'string' && a.name === 'username' && a.value !== true)?.value
    if (!username) {
        console.error('x Launch app with username!')
        return
    }

    process.chdir(homedir())
    console.log('Welcome to the File Manager, %s!', username)

    // printCommandHeader()

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: promptString()
    })

    rl.prompt()
    rl.on('line', async (line) => {
        const [ command, ...args ] = line.trim().split(' ')

        const commandFn = commandsMap[command]
        if (!commandFn) {
            console.log('Invalid input')
            rl.prompt()
            return
        }

        const processedArgs = parseArgs(args.join(' '))

        try {
            if (command === '.exit') rl.close()
            await commandFn(processedArgs)
        } catch (e) {
            console.log('Operation failed')
        }

        rl.setPrompt(promptString())
        rl.prompt()
    })

}

bootstrap()
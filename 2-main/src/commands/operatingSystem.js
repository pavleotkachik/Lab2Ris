import { EOL, cpus, homedir, userInfo } from 'os'

export async function operatingSystemCommand(args) {
    const flags = args.filter((a) => typeof a === 'object')

    for (const flag of flags) {
        switch (flag.name) {
            case 'EOL':
                console.log('Current EOL is:', JSON.stringify(EOL))
                break
            case 'cpus':
                const cpusInfo = cpus()
                console.log('CPU model: %s', cpusInfo[0].model)
                console.log('CPU threads: %d', cpusInfo.length)
                console.log('CPU speeds', cpusInfo.map(t => t.speed / 1e3 + ' GHz'))
                break
            case 'homedir':
                console.log('Home directory is: %s', homedir())
                break
            case 'username':
                console.log('Current username is: %s', userInfo().username)
                break
            case 'architecture':
                console.log('CPU architecture is: %s', process.arch)
                break
            default:
                break
        }
    }
}
export async function changeDirectoryCommand(args) {
    const [ changePath ] = args.filter((a) => typeof a === 'string')
    if (!changePath) throw new Error('Path not found')

    process.chdir(changePath)
}
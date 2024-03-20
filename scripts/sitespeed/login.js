module.exports = async function (context, commands) {
    await commands.navigate('http://localhost:3000')
    return commands.wait.byPageToComplete()
}

module.exports = app => {
    app.mongoose.connect(app.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        const msg = 'UHULL: Conectamos com sucesso ao MongoDB!'
        console.log('\x1b[1;31;42m%s\x1b[1;37m', msg, '\x1b[0m')
    })
    .catch(e => {
        const msg = 'ERRO: Não foi possível conectar com o MongoDB!'
        console.log('\x1b[1;31;41m%s\x1b[1;37m', msg, '\x1b[0m')
    })
    app.mongoose.set('useCreateIndex', true);
}
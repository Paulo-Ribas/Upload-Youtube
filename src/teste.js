//um teste para eu ter certeza absoluta do que eu estou fazendo no "peloErg" está correto e recapitular um pouco das promisses lol e quem sabe dominar 100% boy

function resolve() {
    return new Promise((resolve, reject) => {
        return resolve('Tetentou Resolver Mesmo O De Cima Falhando')
    })
    
}
function reject(){
    return new Promise((resolve, reject) => {
        return reject('Falhou')
    })
}

async function testandoTudo(params) {
    try {
        console.log('vir até aqui é ok')
        let cima = await reject()
        console.log('esse console não deve aparecer')
        let funcionou = await resolve()
        console.log(cima, funcionou, 'se vir até aqui, é porque não daria certo e o video seria salvo no uploadated mesmo nao tendo sido')
    } catch (error) {
        console.log(error, ', significa que pulou pro catch e a linha do resolve não foi lida, fazendo com que o video seja adicionado na lista de nao uploadated')
    }
}

testandoTudo()

// é, minha lógica e entendimento sobre, estavem 100% certos
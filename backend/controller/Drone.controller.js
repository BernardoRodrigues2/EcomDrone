const Cliente = require('../models/Cliente')
const Drone = require('../models/Drone')

const CryptoJS = require('crypto-js')
const Key = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.modelo || !valores.marca || !valores.numSerie || !valores.tipo ||!valores.idCliente) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente informado não existe!' })
        }
        
        const numSerieCript = CryptoJS.AES.encrypt(valores.numSerie, Key).toString()

        await Drone.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numSerie: numSerieCript,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })

        return res.status(201).json({ message: 'Dados cadastrados com sucesso! '})
    } catch (err) {
        console.error('Erro ao realizar operação!', err)
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}


const consultar = async (req, res) => {
    const id = req.params.id
    console.log(id)

    try {
        const drone = await Drone.findByPk(id)

        const bytes = CryptoJS.AES.decrypt(drone.numSerie, Key)
        console.log('bytes = ', bytes)

        const numSerieDescript = bytes.toString(CryptoJS.enc.Utf8)
        console.log('Numero de Série descriptografado = ', numSerieDescript)

        return res.status(200).json({
            codDrone: drone.codDrone,
            modelo: drone.modelo,
            marca: drone.marca,
            numSerie: numSerieDescript,
            tipo: drone.tipo,
            idCliente: drone.idCliente
        })

    } catch (err) {
        console.error('Erro ao realizar operação!', err)
        return res.status(500).json({ message: 'Erro ao realizar operação!' })
    }
}

module.exports = { cadastrar, consultar };
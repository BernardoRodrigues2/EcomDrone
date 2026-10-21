const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Drone = require('../models/Drone')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.data || !valores.hora || !valores.idCliente || !valores.idDrone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'Cliente não encontrado!'})
        }

        const drone = await Drone.findByPk(valores.idDrone)
        if(!drone){
            return res.status(404).json({ message: 'Drone não encontrado'})
        }

        const novoAgendamento = await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento registrado com sucesso!', agendamento: novoAgendamento })
        
    } catch (err) {
        console.error('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'}) 
    }
}

const listarAgenda = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Cliente,
                    as: 'clienteAgendamento',
                    attributes: ['codCliente', 'nome', 'email', 'telefone']
                },
                {
                    model: Drone,
                    as: 'droneAgendamento',
                    attributes: ['codDrone', 'modelo', 'marca', 'tipo']
                }
            ]
        })

        return res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'}) 
    }
}

module.exports = { cadastrar, listarAgenda };
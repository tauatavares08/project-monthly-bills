/*
    store => Cadastrar/Adicionar
    index => Listar vários  
    show  => Detalhar um único
    update => Atualizar um registro existente 
    delete => Deletar um registro existente
*/
const User = require("../models/Useres")
const Yup = require("Yup")
class UserController {
  async store(request, response) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      date: Yup.string().required(),
      card: Yup.string().required(),
      value: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(401).json({ error: err.errors })
    }
    const { name, date, card, value, location } = request.body

    const user = await User.create({
      name,
      date,
      card,
      value,
      location
    })
    return response.status(201).json({ id: user.id, name, date, card, value, location })
  }
  async index(request, response) {
    const user = await User.findAll()

    return response.json(user)
  }
  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        date: Yup.string().required(),
        card: Yup.string().required(),
        value: Yup.number().required()
      })
      try {
        await schema.validateSync(request.body, { abortEarly: false })
        // abortEarly para validar todos os erros e não aparecer somente um
        // request.body por onde vem os dados
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { id } = request.params

      const user = await User.findByPk(id)

      if (!user) {
        return response
          .status(401)
          .json({ message: 'Make sure your product ID is correct' })
      }

      const { name, date, card, value, location } = request.body

      await User.update({
        name,
        date,
        card,
        value,
        location
      },
        { where: { id } }
      )
      return response.status(200).json()

    } catch (err) {
      console.log(err)
    }
  }
  async delete(request, response) {
    try {
      const { id } = request.params

      const user = await User.findByPk(id)

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      await user.destroy()

      return response.status(200).json({ message: 'User deleted successfully' })
    } catch (err) {
      console.log(err)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}
module.exports = new UserController()
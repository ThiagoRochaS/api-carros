const express = require('express')

const app = express()

app.use(express.json())

const soCarroBala = [
    {
        marca: 'Honda',
        modelo: 'NSX'
    },
    {
        marca: 'Mazda',
        modelo: 'RX7'
    }
]

app.get('/', (req, res) => {
    res.send('Sejá bem vindo á API de carros!')
})


// CRUD

//CREATE
app.post('/api/carros', (req, res) => {
    const carro = req.body
 
    soCarroBala.push(carro)
 
    console.log(soCarroBala[0])
 
    res.status(201).send();
})
 
// READ
app.get('/api/carros', (req, res) => {
    const carros = soCarroBala
 
    if (!carros.length > 0) return res.status(404).send('Não tem carros')
 
    return res.status(200).send(carros)
})
 
app.get('/api/carros/:id', (req, res) => {
    const id = req.params.id
 
    if (!soCarroBala.length > 0) return res.status(404).send('Não tem carros')
 
    if (id > soCarroBala.length - 1) return res.status(400).send('Não existem carros com esse id')
 
    const carroAchado = soCarroBala[id]
    
    return res.status(200).send(carroAchado)
})
 
 
// UPDATE
app.put('/api/carros/:id', (req, res) => {
    const id = req.params.id
 
    if (!soCarroBala.length > 0) return res.status(404).send('Não tem carros')
 
    if (id > soCarroBala.length - 1) return res.status(400).send('Não existem carros com esse id')
 
    soCarroBala[id] = req.body     
    
    return res.status(204).send()
})
 
// DESTROY
app.delete('/api/carros/:id', (req, res) => {
    const id = req.params.id
 
    if (!soCarroBala.length > 0) return res.status(404).send('Não tem carros')
 
    if (id > soCarroBala.length - 1) return res.status(400).send('Não existem carros com esse id')
 
    const removido = soCarroBala.splice(id, 1)
    
    return res.status(200).send(removido)
})
 
app.listen(3000, () => {
    console.log('Server escutando na porta 3000')
})
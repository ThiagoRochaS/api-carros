const express = require('express')
const db = require('./db/mysql')

const app = express()
 
app.use(express.json())
 
// CRUD
 
//CREATE

app.post('/api/carros', (req, res) => {
    try {
        const carro = req.body
        let sql = `INSERT INTO Carro (Marca, Modelo) VALUES ("${carro.marca}", "${carro.modelo}")`
        db.query(sql, (err, result) => {
            if(err) throw err
            res.status(201).send({message: 'created'})
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
 
// READ
app.get('/api/carros', (req, res) => {
    try {
        let sql = `SELECT * FROM Carro`
        db.query(sql, (err, result) => {
            if(err) throw err
            if (!result.length > 0) return res.status(404).send('Não tem carros')
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
 
app.get('/api/carros/:id', (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT * FROM Carro WHERE ID = ${id}`
        db.query(sql, (err, result) => {
            if(err) throw err
            if (!result.length > 0) return res.status(404).send('Carro não encontrado')
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
 
 
// UPDATE
app.put('/api/carros/:id', (req, res) => {
    try {
        const id = req.params.id
        const carro = req.body
        let sql = `UPDATE Carro SET Marca = "${carro.marca}", Modelo = "${carro.modelo}" WHERE ID = ${id}`
        db.query(sql, (err, result) => {
            if(err) throw err
            res.status(200).send({message: 'updated'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
 
// DESTROY  
app.delete('/api/carros/:id', (req, res) => {
    try {
        const id = req.params.id
        const carro = req.body
        let sql = `DELETE FROM Carro WHERE ID = ${id}`
        db.query(sql, (err, result) => {
            if(err) throw err
            res.status(200).send({message: 'updated'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
 
app.listen(3000, () => {
    console.log('Server escutando na porta 3000')
})


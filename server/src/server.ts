import express, { Request, Response } from 'express'

const app = express()

app.get('/ads', (req: Request, res: Response) => {
    return res.json([
        { id: 1,name: 'Lucas '}, 
        { id: 2,name: 'Teste '},
        { id: 3,name: 'Teste '}
    ])
})

app.listen(3333)
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourStringToMinutes } from './utils/convert-hours-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

/*
    HTTP methods / API RESTful

    GET -> Listagem de recursos
    POST -> Cria recurso ou entidade
    PUT -> Edita uma entidade por completo ou grande parte
    PATCH -> Editar informação específica de uma entidade
    DELETE -> Remove recurso ou entidade

    Nunca utilizar verbos nas rotas. Ex: '/create-ad'
    Recurso da rota sempre no plural. Ex: '/ads' ou '/games'

    HTTP codes --> https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

    Parâmetros disponíveis nas rotas
    - Query: utiliza '?' -> Usado para persistir estado (ex: filtros)
    - Route: utiliza escrita simples -> Ex: 'ads/5'
    - Body: Várias infos em uma request só e mantém as informações privadas
*/

/*
    Padrão de url '/tabela/id/tabela
    Fica recurso-necessario/id-necessario/recurso-chamado/criado
 */

app.get('/games', async (req: Request, res: Response) => {
    // Esse include é tipo um join do SQL ou populate do Mongo
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    
    return res.json(games)
})

app.post('/games/:id/ads', async (req: Request, res: Response) => {
    const gameId = req.params.id
   
    const body: any = req.body

    // TO DO: Validação com Zod

    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,            
        }
    })

    return res.status(201).json(ad)
})

app.get('/games/:id/ads/', async (req: Request, res: Response) => {
    const gameId = req.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.json(ads.map(ad => (
        {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    )))
})

app.get('/ads/:id/discord/', async (req: Request, res: Response) => {
    const adId = req.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: { discord: true },
        where: { id: adId }
    })

    return res.json({
        discord: ad.discord
    })
})

app.listen(3333)
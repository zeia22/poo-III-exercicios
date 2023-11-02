import cors from "cors"
import express from "express"
import { Request, Response } from 'express'
import { CarController } from "./controller/CarContoller"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const carController = new CarController()

app.get("/cars",carController.getCars)

app.post("/cars",carController.postCars )

app.put("/cars", carController.putCars )
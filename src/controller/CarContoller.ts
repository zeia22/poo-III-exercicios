import { CarDatabase } from "../database/CarDatabase"
import { Request, Response } from 'express'
import { Cars } from "../models/Cars"
import { CarDB } from "../types"

export class CarController{
    async getCars(req: Request, res: Response):Promise<void>{
        
        try {
            const q = req.query.q as string | undefined
    
            const carsDatabase = new CarDatabase()
            const carsDB = await carsDatabase.getCars(q)
    
            const cars: Cars[] = carsDB.map((carsDB) => new Cars(
                carsDB.id,
                carsDB.marca,
                carsDB.modelo,
                carsDB.ano,
                carsDB.created_at
            ))
    
            res.status(200).send(cars)
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
    }
    async postCars (req: Request, res: Response):Promise<void> {
        try {
            const { id, marca, modelo, ano } = req.body
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof marca !== "string") {
                res.status(400)
                throw new Error("'marca' deve ser string")
            }
    
            if (typeof modelo !== "string") {
                res.status(400)
                throw new Error("'modelo' deve ser string")
            }
    
            if (typeof ano !== "string") {
                res.status(400)
                throw new Error("'ano' deve ser string")
            }
    
            const carsDatabase = new CarDatabase()
            const carsDBExists = await carsDatabase.postCarsById(id)
    
            if (carsDBExists) {
                res.status(400)
                throw new Error("'id' já existe")
            }
    
            const newCars = new Cars(
                id,
                marca,
                modelo,
                ano,
                new Date().toISOString()
            ) // yyyy-mm-ddThh:mm:sssZ
    
            const newCarsDB: CarDB = {
                id: newCars.getId(),
                marca: newCars.getMarca(),
                modelo: newCars.getModelo(),
                ano: newCars.getAno(),
                created_at: newCars.getCreatedAt()
            }
    
            await carsDatabase.putCars(newCarsDB)
    
            res.status(201).send(newCars)
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
    }
    async putCars(req: Request, res: Response): Promise<void>{
        try {
            const id = req.params.id
            const value = req.body.value
    
            if (typeof value !== "number") {
                res.status(400)
                throw new Error("'value' deve ser number")
            }
    
            const carsDatabase = new CarDatabase()
            const carsDB = await carsDatabase.postCarsById(id)
    
            if (!carsDB) {
                res.status(404)
                throw new Error("'id' não encontrado")
            }
    
            const cars = new Cars(
                carsDB.id,
                carsDB.marca,
                carsDB.modelo,
                carsDB.ano,
                carsDB.created_at
            )
            
            res.status(200).send(cars)
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
    }
    public deleteUser = async (req:Request , res:Response) =>{
        try {
            const idToDelete = req.params.id
    
            if (typeof idToDelete !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            const carsDataBase = new CarDatabase();
            const carsDBExists = await
    carsDataBase.postCarsById(idToDelete);

        if (!carsDBExists) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const cars = new Cars(
            carsDBExists.id,
            carsDBExists.marca,
            carsDBExists.modelo,
            carsDBExists.ano,
            carsDBExists.created_at
        )

        await carsDataBase.deleteUserById(cars.getId());

        res.status(200).send("Usuario deletado com sucesso")
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
  }
}
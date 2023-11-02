
import { CarDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CarDatabase extends BaseDatabase{
    static getCars(q: string | undefined) {
        throw new Error("Method not implemented.");
    }
    public static TABLE_CARS = "cars"

    public async getCars(q: string | undefined){
        let carDB ;
        if (q) {
            const result: CarDB[] = await BaseDatabase
                .connection(CarDatabase.TABLE_CARS)
                .where("marca", "LIKE", `%${q}%`)

                carDB = result
        } else {
            const result: CarDB[] = await BaseDatabase
                .connection(CarDatabase.TABLE_CARS)

                carDB = result
       
    }
    return carDB
}
public async postCarsById(id: string) {
    const [ carDB ]: CarDB[] | undefined[] = await BaseDatabase
        .connection(CarDatabase.TABLE_CARS)
        .where({ id })

    return carDB
}
public async putCars(newCarsDB: CarDB) {
    await BaseDatabase
        .connection(CarDatabase.TABLE_CARS)
        .insert(newCarsDB)
}
public async deleteUserById(id: string):Promise<void> {
    await BaseDatabase.connection(CarDatabase.TABLE_CARS).where({id}).del()
}
}
export class Cars {    
    constructor(
        private id: string,
        private marca: string,
        private modelo: string,
        private ano: string,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getMarca(): string {
        return this.marca
    }

    public setMarca(value: string): void {
        this.marca = value
    }

    public getModelo(): string {
        return this.modelo
    }

    public setModelo(value: string): void {
        this.modelo = value
    }

    public getAno(): string {
        return this.ano
    }

    public setAno(value: string): void {
        this.ano = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
}
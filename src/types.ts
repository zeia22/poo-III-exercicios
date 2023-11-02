export interface CarDB {
    id: string,
    marca: string,
    modelo: string,
    ano: string,
    created_at: string
}

// tipagem para criação (POST) sem created_at
export interface CarDBPost {
    id: string,
    marca: string,
    modelo: string,
    ano: string
}
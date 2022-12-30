export default interface Entreprise {
    id:number
    siret:number
    siren:number
    tva:string
    nom:string
    numeroVoie?:number
    typeVoie?:string
    libelleVoie:string
    codePostal:number
    libelleCommune:string
    dateCreation:Date
}

export const EmptyEntreprise: Entreprise = {
    id:0,
    siret:12345678999999,
    siren:123456789,
    tva:'FR00123456789',
    nom:'',
    numeroVoie:undefined,
    typeVoie:undefined,
    libelleVoie:'',
    codePostal:21000,
    libelleCommune:'',
    dateCreation: new Date(),
}
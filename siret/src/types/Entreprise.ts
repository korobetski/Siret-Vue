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
    siret:0,
    siren:0,
    tva:'',
    nom:'',
    numeroVoie:undefined,
    typeVoie:undefined,
    libelleVoie:'',
    codePostal:0,
    libelleCommune:'',
    dateCreation: new Date(),
}
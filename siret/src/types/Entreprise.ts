export default interface Entreprise {
    id?:number
    siret?:number
    siren?:number
    tva?:string
    nom?:string
    numeroVoie?:number
    typeVoie?:string
    libelleVoie?:string
    codePostal?:number
    libelleCommune?:string
    dateCreation?:Date
}

export const EmptyEntreprise: Entreprise = {
    id:undefined,
    siret:undefined,
    siren:undefined,
    tva:undefined,
    nom:undefined,
    numeroVoie:undefined,
    typeVoie:undefined,
    libelleVoie:undefined,
    codePostal:undefined,
    libelleCommune:undefined,
    dateCreation:undefined,
}
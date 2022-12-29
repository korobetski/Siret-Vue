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
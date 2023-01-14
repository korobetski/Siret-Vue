import http from "@/http-common";

class EntrepriseService {
  getAll(): Promise<any> {
    return http.get("/entreprises");
  }
  
  /**
   * Retourne la liste d'entreprises paginées
   * @param  string  url  au format suivant "/entreprises?page=1"
   */
  getAllPagination(url: string): Promise<any> {
    return http.get(`${url}`);
  }

  getPage(page: number = 1, limit:number = 6, query:string = ""): Promise<any> {
    return http.get(`/entreprises?page=${page}&limit=${limit}&query=${query}`);
  }

  get(id: number): Promise<any> {
    return http.get(`/entreprises/${id}`);
  }

  getInsee(siret: number): Promise<any> {
    return http.get(`/insee/${siret}`);
  }

  create(data: any): Promise<any> {
    return http.post("/entreprises", data);
  }

  createAuto(siret: number): Promise<any> {
    return http.post(`/entreprises/${siret}`);
  }

  update(id: number, data: any): Promise<any> {
    return http.put(`/entreprises/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return http.delete(`/entreprises/${id}`);
  }
}

export default new EntrepriseService();
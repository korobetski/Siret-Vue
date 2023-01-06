import http from "@/http-common";

class EntrepriseService {
  getAll(): Promise<any> {
    return http.get("/entreprises");
  }
  
  /**
   * Retourne la liste d'entreprises paginées
   * @param  string  url  au format suivant "/entreprises?page=1"
   */
  getAllPagination(url: any): Promise<any> {
    return http.get(`${url}`);
  }

  get(id: any): Promise<any> {
    return http.get(`/entreprises/${id}`);
  }

  getInsee(siret: any): Promise<any> {
    return http.get(`/insee/${siret}`);
  }

  create(data: any): Promise<any> {
    return http.post("/entreprises", data);
  }

  createAuto(siret: any): Promise<any> {
    return http.post(`/entreprises/${siret}`);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/entreprises/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/entreprises/${id}`);
  }
}

export default new EntrepriseService();
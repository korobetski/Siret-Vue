import http from "@/http-common";

class EntrepriseService {
  getAll(): Promise<any> {
    return http.get("/entreprises");
  }

  get(siret: any): Promise<any> {
    return http.get(`/entreprises/${siret}`);
  }

  create(data: any): Promise<any> {
    return http.post("/entreprises", data);
  }

  update(siret: any, data: any): Promise<any> {
    return http.put(`/entreprises/${siret}`, data);
  }

  delete(siret: any): Promise<any> {
    return http.delete(`/entreprises/${siret}`);
  }
}

export default new EntrepriseService();
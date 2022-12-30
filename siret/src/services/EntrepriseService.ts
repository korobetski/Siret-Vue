import http from "@/http-common";

class EntrepriseService {
  getAll(): Promise<any> {
    return http.get("/entreprises");
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

  update(id: any, data: any): Promise<any> {
    return http.put(`/entreprises/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/entreprises/${id}`);
  }
}

export default new EntrepriseService();
import http from "@/http-common";

class UserService {
  getUser(): Promise<any> {
    return http.get("/user");
  }
  
  register(data: any): Promise<any> {
    return http.post("/register", data);
  }
  
  login(data: any): Promise<any> {
    return http.post("/login", data);
  }

  logout(): Promise<any> {
    return http.get("/logout");
  }
}

export default new UserService();
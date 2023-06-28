import { URL_API_BASE } from "../constants";
export async function GenericService<T>(
    endpoint: string,
    method: string,
    token: string,
    body?: any
  ): Promise<T> {
    try {
      const options: RequestInit = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      if (body) {
        options.headers = new Headers(options.headers);
        options.headers.set("Content-Type", "application/json");
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(`${URL_API_BASE}/${endpoint}`, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json() as T;
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error! ${error}`);
    }
  }

import { Care, AnimalCare } from "@/types";
import { ApiService } from "./api";
const endpoint = "/Care";

export class CareApiService {

  static async getCares(): Promise<Care[]> {
    return await ApiService.get<Care[]>(endpoint);
  }

  static async getCare(id: number): Promise<Care> {
    return await ApiService.get<Care>(`${endpoint}/${id}`);
  }

  static async createCare(care: Omit<Care, "id">): Promise<Care> {
    return await ApiService.post<Care>(endpoint, care);
  }

  static async updateCare(care: Care): Promise<Care> {
    return await ApiService.put<Care>(`${endpoint}/${care.id}`, care);
  }

  static async deleteCare(id: number): Promise<void> {
    await ApiService.delete<void>(`${endpoint}/${id}`);
  }

  static async getAnimalCares(): Promise<AnimalCare[]> {
    return await ApiService.get<AnimalCare[]>(endpoint);
  }

  static async createAnimalCare(animalCare: Omit<AnimalCare, "id">): Promise<AnimalCare> {
    return await ApiService.post<AnimalCare>(endpoint, animalCare);
  }

  static async deleteAnimalCare(id: number): Promise<void> {
    await ApiService.delete<void>(`${endpoint}/${id}`);
  }
}

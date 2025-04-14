
import { Animal } from "@/types";
import { ApiService } from "./api";

const endpoint = '/Animal';
export class AnimalApiService {

  static async getAnimals(): Promise<Animal[]> {
    return await ApiService.get<Animal[]>(endpoint);
  }

  static async getAnimal(id: number): Promise<Animal> {
    console.log(2)
    return await ApiService.get<Animal>(`${endpoint}/${id}`);
  }

  static async createAnimal(animal: Omit<Animal, "id">): Promise<Animal> {
    return await ApiService.post<Animal>(endpoint, animal);
  }

  static async updateAnimal(animal: Animal): Promise<Animal> {
    return await ApiService.put<Animal>(`${endpoint}/${animal.id}`, animal);
  }

  static async deleteAnimal(id: number): Promise<void> {
    await ApiService.delete<void>(`${endpoint}/${id}`);
  }
}

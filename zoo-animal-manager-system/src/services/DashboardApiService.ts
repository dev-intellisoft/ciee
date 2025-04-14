
import { ApiService } from "./api";
// import { HabitatStat, CountryStat, CareStat, AgeGroup } from "@/viewmodels/DashboardViewModel";

export class DashboardApiService {
  private static endpoint = '/dashboard';

  static async getAnimalCount(): Promise<number> {
    return await ApiService.get<number>(`${this.endpoint}/animal-count`);
  }

  static async getCareCount(): Promise<number> {
    return await ApiService.get<number>(`${this.endpoint}/care-count`);
  }

  // static async getHabitatStats(): Promise<HabitatStat[]> {
  //   return await ApiService.get<HabitatStat[]>(`${this.endpoint}/habitat-stats`);
  // }
  //
  // static async getCountryStats(): Promise<CountryStat[]> {
  //   return await ApiService.get<CountryStat[]>(`${this.endpoint}/country-stats`);
  // }
  //
  // static async getCareStats(): Promise<CareStat[]> {
  //   return await ApiService.get<CareStat[]>(`${this.endpoint}/care-stats`);
  // }
  //
  // static async getAgeDistribution(): Promise<AgeGroup[]> {
  //   return await ApiService.get<AgeGroup[]>(`${this.endpoint}/age-distribution`);
  // }
}

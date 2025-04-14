
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal, Care } from '@/types';

interface HabitatStat {
  habitat: string;
  count: number;
}

interface CountryStat {
  country: string;
  count: number;
}

interface CareStat {
  careName: string;
  count: number;
}

interface AgeGroup {
  ageGroup: string;
  count: number;
}

interface DashboardState {
  animalCount: number;
  careCount: number;
  habitatStats: HabitatStat[];
  countryStats: CountryStat[];
  careStats: CareStat[];
  ageDistribution: AgeGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  animalCount: 0,
  careCount: 0,
  habitatStats: [],
  countryStats: [],
  careStats: [],
  ageDistribution: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Fetch dashboard data
    fetchDashboardDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAnimalCount: (state, action: PayloadAction<number>) => {
      state.animalCount = action.payload;
    },
    updateCareCount: (state, action: PayloadAction<number>) => {
      state.careCount = action.payload;
    },
    updateHabitatStats: (state, action: PayloadAction<HabitatStat[]>) => {
      state.habitatStats = action.payload;
    },
    updateCountryStats: (state, action: PayloadAction<CountryStat[]>) => {
      state.countryStats = action.payload;
    },
    updateCareStats: (state, action: PayloadAction<CareStat[]>) => {
      state.careStats = action.payload;
    },
    updateAgeDistribution: (state, action: PayloadAction<AgeGroup[]>) => {
      state.ageDistribution = action.payload;
    },
    fetchDashboardDataSuccess: (state) => {
      state.loading = false;
    },
    fetchDashboardDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;

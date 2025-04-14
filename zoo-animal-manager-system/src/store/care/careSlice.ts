
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Care, AnimalCare } from '@/types';

interface CareState {
  cares: Care[];
  selectedCare: Care | null;
  animalCares: AnimalCare[];
  loading: boolean;
  error: string | null;
}

const initialState: CareState = {
  cares: [],
  selectedCare: null,
  animalCares: [],
  loading: false,
  error: null,
};

const careSlice = createSlice({
  name: 'care',
  initialState,
  reducers: {
    // Fetch cares
    fetchCaresRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCaresSuccess: (state, action: PayloadAction<Care[]>) => {
      state.cares = action.payload;
      state.loading = false;
    },
    fetchCaresFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Fetch single care
    fetchCareRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCareSuccess: (state, action: PayloadAction<Care>) => {
      state.selectedCare = action.payload;
      state.loading = false;
    },
    fetchCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create care
    createCareRequest: (state, action: PayloadAction<Omit<Care, "id">>) => {
      state.loading = true;
      state.error = null;
    },
    createCareSuccess: (state, action: PayloadAction<Care>) => {
      state.cares.push(action.payload);
      state.loading = false;
    },
    createCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update care
    updateCareRequest: (state, action: PayloadAction<Care>) => {
      state.loading = true;
      state.error = null;
    },
    updateCareSuccess: (state, action: PayloadAction<Care>) => {
      const index = state.cares.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cares[index] = action.payload;
      }
      state.loading = false;
    },
    updateCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete care
    deleteCareRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteCareSuccess: (state, action: PayloadAction<number>) => {
      state.cares = state.cares.filter(care => care.id !== action.payload);
      state.loading = false;
    },
    deleteCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Fetch animal cares
    fetchAnimalCaresRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnimalCaresSuccess: (state, action: PayloadAction<AnimalCare[]>) => {
      state.animalCares = action.payload;
      state.loading = false;
    },
    fetchAnimalCaresFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create animal care
    createAnimalCareRequest: (state, action: PayloadAction<Omit<AnimalCare, "id">>) => {
      state.loading = true;
      state.error = null;
    },
    createAnimalCareSuccess: (state, action: PayloadAction<AnimalCare>) => {
      state.animalCares.push(action.payload);
      state.loading = false;
    },
    createAnimalCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete animal care
    deleteAnimalCareRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteAnimalCareSuccess: (state, action: PayloadAction<number>) => {
      state.animalCares = state.animalCares.filter(ac => ac.id !== action.payload);
      state.loading = false;
    },
    deleteAnimalCareFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Reset selected care
    resetSelectedCare: (state) => {
      state.selectedCare = null;
    },
  },
});

export const careActions = careSlice.actions;
export default careSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal } from '@/models';

interface AnimalState {
  animals: Animal[];
  selectedAnimal: Animal | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimalState = {
  animals: [],
  selectedAnimal: null,
  loading: false,
  error: null,
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    fetchAnimalsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnimalsSuccess: (state, action: PayloadAction<Animal[]>) => {
      console.log('action.payload=>', action.payload);
      state.animals = action.payload;
      state.loading = false;
    },
    fetchAnimalsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch single animal
    fetchAnimalRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnimalSuccess: (state, action: PayloadAction<Animal>) => {
      state.selectedAnimal = action.payload;
      state.loading = false;
    },
    fetchAnimalFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createAnimalRequest: (state, action: PayloadAction<Omit<Animal, "id">>) => {
      state.loading = true;
      state.error = null;
    },
    createAnimalSuccess: (state, action: PayloadAction<Animal>) => {
      state.animals.push(action.payload);
      state.loading = false;
    },
    createAnimalFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateAnimalRequest: (state, action: PayloadAction<Animal>) => {
      state.loading = true;
      state.error = null;
    },
    updateAnimalSuccess: (state, action: PayloadAction<Animal>) => {
      const index = state.animals.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.animals[index] = action.payload;
      }
      state.loading = false;
    },
    updateAnimalFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete animal
    deleteAnimalRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteAnimalSuccess: (state, action: PayloadAction<number>) => {
      state.animals = state.animals.filter(animal => animal.id !== action.payload);
      state.loading = false;
    },
    deleteAnimalFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset selected animal
    resetSelectedAnimal: (state) => {
      state.selectedAnimal = null;
    },
  },
});

export const animalActions = animalSlice.actions;
export default animalSlice.reducer;

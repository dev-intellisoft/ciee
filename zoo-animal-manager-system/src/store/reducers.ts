
import { combineReducers } from 'redux';
import animalSlice from '@/viewmodels/AnimalViewModel';
import careSlice from '@/viewmodels/CareViewModel';
import dashboardSlice from '@/viewmodels/DashboardViewModel';

export const rootReducer = combineReducers({
  animal: animalSlice,
  care: careSlice,
  dashboard: dashboardSlice,
});

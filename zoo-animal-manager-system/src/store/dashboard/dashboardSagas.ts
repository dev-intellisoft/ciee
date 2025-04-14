
import { call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from './dashboardSlice';
import { Animal } from '@/types';

function* fetchDashboardDataSaga() {
  try {
    // // Fetch all required data
    // const animals = yield call(fetchAnimals);
    // const cares = yield call(fetchCares);
    // const habitatStats = yield call(getAnimalsByHabitat);
    // const countryStats = yield call(getAnimalsByCountry);
    // const careStats = yield call(getAnimalsByCareType);

    // // Update dashboard state with fetched data
    // yield put(dashboardActions.updateAnimalCount(animals.length));
    // yield put(dashboardActions.updateCareCount(cares.length));
    // yield put(dashboardActions.updateHabitatStats(habitatStats));
    // yield put(dashboardActions.updateCountryStats(countryStats));
    // yield put(dashboardActions.updateCareStats(careStats));

    // Calculate age distribution
    // const ageGroups = calculateAgeDistribution(animals);
    // yield put(dashboardActions.updateAgeDistribution(ageGroups));

    yield put(dashboardActions.fetchDashboardDataSuccess());
  } catch (error) {
    yield put(dashboardActions.fetchDashboardDataFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

// Helper function to calculate age distribution
function calculateAgeDistribution(animals: Animal[]) {
  const currentYear = new Date().getFullYear();
  const ageGroups: { [key: string]: number } = {
    "0-2 years": 0,
    "3-5 years": 0,
    "6-10 years": 0,
    "10+ years": 0
  };

  animals.forEach(animal => {
    const birthYear = new Date(animal.birthDate).getFullYear();
    const age = currentYear - birthYear;

    if (age <= 2) ageGroups["0-2 years"]++;
    else if (age <= 5) ageGroups["3-5 years"]++;
    else if (age <= 10) ageGroups["6-10 years"]++;
    else ageGroups["10+ years"]++;
  });

  return Object.entries(ageGroups).map(([ageGroup, count]) => ({
    ageGroup,
    count
  }));
}

// Watcher Saga
export function* dashboardSagas() {
  yield takeLatest(dashboardActions.fetchDashboardDataRequest.type, fetchDashboardDataSaga);
}

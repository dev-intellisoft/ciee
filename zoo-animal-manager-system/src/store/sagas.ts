
import { all } from 'redux-saga/effects';
import { animalSagas } from './animal/animalSagas';
import { careSagas } from './care/careSagas';
import { dashboardSagas } from './dashboard/dashboardSagas';

export default function* rootSaga() {
  yield all([
    animalSagas(),
    careSagas(),
    dashboardSagas(),
  ]);
}

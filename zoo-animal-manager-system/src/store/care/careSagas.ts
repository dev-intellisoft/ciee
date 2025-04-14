
import { call, put, takeLatest } from 'redux-saga/effects';
import { careActions } from './careSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Care, AnimalCare } from '@/types';
import { CareApiService } from '@/services/CareApiService';
import { ApiConfig } from '@/utils/apiConfig';

// Worker Sagas
function* fetchCaresSaga() {
  try {
    const cares: Care[] = yield call(CareApiService.getCares);
    yield put(careActions.fetchCaresSuccess(cares));
  } catch (error) {
    yield put(careActions.fetchCaresFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* fetchCareSaga(action: PayloadAction<number>) {
  try {
    const care: Care = yield call(CareApiService.getCare, action.payload);

    if (care) {
      yield put(careActions.fetchCareSuccess(care));
    } else {
      yield put(careActions.fetchCareFailure('Care not found'));
    }
  } catch (error) {
    yield put(careActions.fetchCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* createCareSaga(action: PayloadAction<Omit<Care, "id">>) {
  try {
    const newCare: Care = yield call(CareApiService.createCare, action.payload);
    yield put(careActions.createCareSuccess(newCare));
  } catch (error) {
    yield put(careActions.createCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* updateCareSaga(action: PayloadAction<Care>) {
  try {
    const updatedCare: Care = yield call(CareApiService.updateCare, action.payload);
    yield put(careActions.updateCareSuccess(updatedCare));
  } catch (error) {
    yield put(careActions.updateCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* deleteCareSaga(action: PayloadAction<number>) {
  try {
    yield call(CareApiService.deleteCare, action.payload);
    yield put(careActions.deleteCareSuccess(action.payload));
  } catch (error) {
    yield put(careActions.deleteCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* fetchAnimalCaresSaga() {
  try {
    const animalCares: AnimalCare[] = yield call(CareApiService.getAnimalCares);
    yield put(careActions.fetchAnimalCaresSuccess(animalCares));
  } catch (error) {
    yield put(careActions.fetchAnimalCaresFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* createAnimalCareSaga(action: PayloadAction<Omit<AnimalCare, "id">>) {
  try {
    const newAnimalCare: AnimalCare = yield call(CareApiService.createAnimalCare, action.payload);
    yield put(careActions.createAnimalCareSuccess(newAnimalCare));
  } catch (error) {
    yield put(careActions.createAnimalCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* deleteAnimalCareSaga(action: PayloadAction<number>) {
  try {
    yield call(CareApiService.deleteAnimalCare, action.payload);
    yield put(careActions.deleteAnimalCareSuccess(action.payload));
  } catch (error) {
    yield put(careActions.deleteAnimalCareFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

// Watcher Saga
export function* careSagas() {
  yield takeLatest(careActions.fetchCaresRequest.type, fetchCaresSaga);
  yield takeLatest(careActions.fetchCareRequest.type, fetchCareSaga);
  yield takeLatest(careActions.createCareRequest.type, createCareSaga);
  yield takeLatest(careActions.updateCareRequest.type, updateCareSaga);
  yield takeLatest(careActions.deleteCareRequest.type, deleteCareSaga);
  yield takeLatest(careActions.fetchAnimalCaresRequest.type, fetchAnimalCaresSaga);
  yield takeLatest(careActions.createAnimalCareRequest.type, createAnimalCareSaga);
  yield takeLatest(careActions.deleteAnimalCareRequest.type, deleteAnimalCareSaga);
}


import { call, put, takeLatest } from 'redux-saga/effects';
import { animalActions } from './animalSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AnimalApiService } from '@/services/AnimalApiService';
import {Animal} from "@/models";

function* fetchAnimalsSaga() {
  try {
    const animals: Animal[] = yield call(AnimalApiService.getAnimals);
    console.log(animals)
    yield put(animalActions.fetchAnimalsSuccess(animals));
    console.log('success', animals);
  } catch (error) {
    console.log(error)
    yield put(animalActions.fetchAnimalsFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* fetchAnimalSaga(action: PayloadAction<number>) {
  try {
    const animal: Animal = yield call(AnimalApiService.getAnimal, action.payload);
    if (animal) {
      yield put(animalActions.fetchAnimalSuccess(animal));
    } else {
      yield put(animalActions.fetchAnimalsFailure('Animal not found'));
    }
  } catch (error) {
    yield put(animalActions.fetchAnimalFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* createAnimalSaga(action: PayloadAction<Omit<Animal, "id">>) {
  try {
    const newAnimal: Animal = yield call(AnimalApiService.createAnimal, action.payload);
    yield put(animalActions.createAnimalSuccess(newAnimal));
  } catch (error) {
    yield put(animalActions.createAnimalFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* updateAnimalSaga(action: PayloadAction<Animal>) {
  try {
    const updatedAnimal: Animal = yield call(AnimalApiService.updateAnimal, action.payload);
    yield put(animalActions.updateAnimalSuccess(updatedAnimal));
  } catch (error) {
    yield put(animalActions.updateAnimalFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

function* deleteAnimalSaga(action: PayloadAction<number>) {
  try {
    yield call(AnimalApiService.deleteAnimal, action.payload);
    yield put(animalActions.deleteAnimalSuccess(action.payload));
  } catch (error) {
    yield put(animalActions.deleteAnimalFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
  }
}

export function* animalSagas() {
  yield takeLatest(animalActions.fetchAnimalsRequest.type, fetchAnimalsSaga);
  yield takeLatest(animalActions.fetchAnimalRequest.type, fetchAnimalSaga);
  yield takeLatest(animalActions.createAnimalRequest.type, createAnimalSaga);
  yield takeLatest(animalActions.updateAnimalRequest.type, updateAnimalSaga);
  yield takeLatest(animalActions.deleteAnimalRequest.type, deleteAnimalSaga);
}

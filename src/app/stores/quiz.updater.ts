import { PartialStateUpdater } from "@ngrx/signals";
import { IQuizState } from "./quiz.state";

export const addAnswerUpdater = (index: number): PartialStateUpdater<IQuizState> => (state) => ({
    answers: [...state.answers, index],
})

export const resetUpdater = (): PartialStateUpdater<IQuizState> => (_) => ({
    answers: []
})
import { computed } from "@angular/core";
import { QUESTIONS } from "../data/questions";
import { Question } from "../models/question.model";
import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
import { addAnswerUpdater, resetUpdater } from "./quiz.updater";

export interface IQuizState {
  questions: Question[];
  answers: number[];
}

export const initialQuizState: IQuizState = {
  questions: QUESTIONS,
  answers: [],
};

export const QuizStore = signalStore(
    { providedIn: 'root' },
    withState<IQuizState>(initialQuizState),
    withComputed(({ questions, answers }) => {
        const currentQuestionIndex = computed(() => answers().length);
        const currentQuestion = computed(() => {
          let cqi = currentQuestionIndex();
          cqi = cqi === questions().length ? cqi - 1 : cqi;
          return questions()[cqi];
        });
        const isDone = computed(() => currentQuestionIndex() === questions().length)

        return { currentQuestionIndex, currentQuestion, isDone }
    }),
    withMethods(store => ({
      addAnswer: (index: number) => patchState(store, addAnswerUpdater(index)),
      reset: () => patchState(store, resetUpdater())
    }))
);
import { Component, computed, inject, signal } from '@angular/core';
import { DoneComponent } from './components/done/done.component';
import { ProgressComponent } from './components/progress/progress.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from './shared/shared-module';
import { QuizStore } from './stores/quiz.state';

@Component({
  imports: [SharedModule, QuestionPresenterComponent, ToolbarComponent, ProgressComponent, DoneComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly quizStore = inject(QuizStore);
  protected readonly correctAnswers = computed(() => {
    const answers = this.quizStore.answers();
    const questions = this.quizStore.questions();
    const count = answers.reduce((acc, val, index) => {
        if(val === questions[index].correctIndex) return acc + 1;
        return acc;
    }, 0);
    return count;
  })
}

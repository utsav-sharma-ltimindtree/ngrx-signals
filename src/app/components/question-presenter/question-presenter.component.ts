import { Component, signal } from '@angular/core';
import { Question } from '../../models/question.model';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  readonly question = signal<Question>({
    caption: ['Red', 'Green'],
    answers: ['Red', 'Green', 'Blue', 'Yellow'],
    correctIndex: 3
  });
}

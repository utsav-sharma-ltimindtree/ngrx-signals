import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { QuizStore } from '../../stores/quiz.state';

@Component({
    selector: 'app-toolbar',
    imports: [SharedModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected readonly quizStore = inject(QuizStore);
  readonly caption = input.required<string>();

  readonly icon = input('');

}

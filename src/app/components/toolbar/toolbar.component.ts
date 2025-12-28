import { Component, input } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: 'app-toolbar',
    imports: [SharedModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  readonly caption = input.required<string>();

  readonly icon = input('');

}

import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDouble()',
    '[class.w-2/4]': 'isDouble()',
  },
})
export class CalculatorButton {
  public isCommand = input(false, {
    transform: booleanAttribute,
  });

  public isDouble = input(false, {
    transform: booleanAttribute,
  });
}

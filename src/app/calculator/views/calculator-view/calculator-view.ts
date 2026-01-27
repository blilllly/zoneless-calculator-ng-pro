import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  imports: [],
  templateUrl: './calculator-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorView {}

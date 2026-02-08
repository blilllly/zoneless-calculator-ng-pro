import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator-service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'updateValue($event)',
  },
})
export class Calculator {
  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  public calculatorButtons = viewChildren(CalculatorButton);

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  updateValue(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': '⨉',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}

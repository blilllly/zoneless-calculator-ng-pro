import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('3');
    service.constructNumber('4');

    expect(service.resultText()).toBe('34');
  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '⨉', '/', '÷'];

    operators.forEach((operator) => {
      service.resultText.set('123');
      service.constructNumber(operator);

      expect(service.resultText()).toBe('0');
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('⨉');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('6');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('.');

    expect(service.resultText()).toBe('1.');
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('.');
    service.constructNumber('.');

    expect(service.resultText()).toBe('0.');
  });

  it('should handle sign change +/-', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace with negative numbers', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('+/-');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('-1');
  });

  it('should handle max length', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    consoleSpy.mockImplementation(() => {});

    for (let i = 0; i < 12; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);
    expect(service.resultText()).toBe('1111111111');
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith('Max length reached');
  });

  it('should handle invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    consoleSpy.mockImplementation(() => {});

    service.constructNumber('a');
    service.constructNumber('a');

    expect(service.resultText()).toBe('0');
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith('invalid input', 'a');
  });

  it('should handle negative zero input correctly', () => {
    service.constructNumber('+/-');
    service.constructNumber('1');

    expect(service.resultText()).toBe('-1');
  });
});

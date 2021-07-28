// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import {calculateMortgage} from './calculate';
import {fromEvent} from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';

type stringOrNumber = string | number;

function attemptCalculation(loanInterest: number, loanAmount: number, loanLength: number): stringOrNumber {
  const someParameterIsNegative: boolean = loanInterest < 0 || loanAmount < 0 || loanLength < 0;
  if (!(loanInterest && loanAmount && loanLength)) {
    return `Please, specify all parameters`;
  } else if (someParameterIsNegative) {
    return `Parameters must be positive`;
  }
  return calculateMortgage(loanInterest, loanAmount, loanLength);
}

const $loanAmountInputEl = document.getElementById('loanAmount');
const $loanInterestInputEl = document.getElementById('loanInterest');
const $loanLengthSelectEl = document.getElementById('loanLength');
const $resultDivEl = document.getElementById('result');

let lA: number = 0;
let lI: number = 0;
let lL: number = +$loanLengthSelectEl.value;
const timePeriod = 150;

// observing loan amount change
const loanAmountSource = fromEvent($loanAmountInputEl, 'input');
const loanAmountStream$ = loanAmountSource.pipe(
  debounceTime(timePeriod),
  map(event => {
    lA = +event.target.value;
    return attemptCalculation(lI, lA, lL);
  })
);
const loanAmountSub$ = loanAmountStream$.subscribe(val => {
  $resultDivEl.innerText = val as string;
});

// observing interest rate change
const loanInterestSource = fromEvent($loanInterestInputEl, 'input');
const loanInterestStream$ = loanInterestSource.pipe(
  debounceTime(timePeriod),
  map(event => {
    lI = +event.target.value;
    return attemptCalculation(lI, lA, lL);
  })
);
const loanInterestSub$ = loanInterestStream$.subscribe(val => {
  $resultDivEl.innerText = val as string;
});

// observing loan length modification
const loanLengthSource = fromEvent($loanLengthSelectEl, 'change');
const loanLengthStream$ = loanLengthSource.pipe(
  debounceTime(timePeriod),
  map(event => {
    lL = +event.target.value;
    return attemptCalculation(lI, lA, lL);
  })
);
const loanLengthSub$ = loanLengthStream$.subscribe(val => {
  $resultDivEl.innerText = val as string;
});

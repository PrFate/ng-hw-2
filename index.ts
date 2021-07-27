// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import {calculateMortgage} from './calculate';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

const $loanAmountInputEl = document.getElementById('loanAmount');
const $loanInterestInputEl = document.getElementById('loanInterest');
const $loanLengthSelectEl = document.getElementById('loanLength');

// console.log($loanAmountInputEl);

// $loanAmountInputEl.addEventListener('input', (e) => {
//   console.group('Hello');
//   console.log(e.target.value);
//   console.groupEnd();
// });

const loanAmounStream$ = fromEvent($loanAmountInputEl, 'input');

// $loanAmountInputEl.addEventListener('input', (e) => {
//   console.dir(e.target);
// });

const loanAmountSub = loanAmounStream$
.subscribe((e) => console.log(e));


// grab button reference
// const button = document.getElementById('myButton');

// button.addEventListener('click', (e) => {
//   console.log(e.target);
// });

// // create an observable of button clicks
// const myObservable = fromEvent(button, 'click');

// // for now, let's just log the event on each click
// const subscription = myObservable.subscribe(event => console.log(event));

/*
const observable1 = interval(400);
const observable2 = interval(300);
 
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
*/
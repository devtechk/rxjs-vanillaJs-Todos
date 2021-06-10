import { of, Observable, fromEvent, Subject, from } from 'rxjs';
import { elementAt, map, distinct } from 'rxjs/operators';
import { TodosItems } from './model/Todo';

let btnEl = document.getElementById('btn');
let listTodos: Array<TodosItems> = [];
let filteredArr;
let inputValue;
const getInputValue: Observable<any> = new Observable(subscriber => {
  inputValue = (document.getElementById('inputForm') as HTMLInputElement).value;
  subscriber.next(inputValue);
});

const clickListener = fromEvent(btnEl, 'click');

clickListener.subscribe(() => {
  getInputValue.subscribe(currentDescription => {
    console.log(listTodos.length);
    if (currentDescription && !listTodos.length) {
      listTodos.forEach(itemTodos => {
        if (itemTodos.description !== currentDescription) {
          listTodos.push({ description: currentDescription, checked: false });
        }
      });

      /*       const uniqueTodos = Array.from(
        new Set(listTodos.map(a => a.description))
      ).map(description => {
        return listTodos.find(a => a.description === description);
      }); */

      document.getElementById('container').innerHTML += `<div>
        ${currentDescription}<label><input type="checkbox" /></label>
      </div>`;

      console.log('listTodasdos', listTodos);
    }
  });
  (document.getElementById('inputForm') as HTMLInputElement).value = '';
});

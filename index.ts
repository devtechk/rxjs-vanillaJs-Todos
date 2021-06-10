import { of, Observable, fromEvent, Subject } from 'rxjs';
import { elementAt, map } from 'rxjs/operators';
import { TodosItems } from './model/Todo';

let btnEl = document.getElementById('btn');
let listTodos: Array<TodosItems> = [];
let inputValue;
const getInputValue = new Observable(subscriber => {
  inputValue = (document.getElementById('inputForm') as HTMLInputElement).value;
  subscriber.next(inputValue);
});

const clickListener = fromEvent(btnEl, 'click');

clickListener.subscribe(() => {
  getInputValue.subscribe(el => {
    if (el) {
      listTodos.push({
        description: el,
        checked: false
      });

      document.getElementById('container').innerHTML += `<div>
    ${el}<label><input type="checkbox" /></label>
  </div>`; //Safer to avoid duplicated item on view but not good for scalability, I need to iterate the listTodos: TODO
    }

    console.log('listTodos', listTodos);
  });
  (document.getElementById('inputForm') as HTMLInputElement).value = '';
  console.log('listTodos', inputValue);
});

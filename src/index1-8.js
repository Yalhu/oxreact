// 1-8
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
        //   <ul>{listItems}</ul>
        numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
        )

    );
}
console.log('test module')
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);


registerServiceWorker();

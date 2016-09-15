'use strict';

let task_root = 'http://rwcbook08.herokuapp.com/task/';


let startup =  () => {
  console.log('startup');
  let result = Promise.resolve($.get(task_root));

  result.then(checking => console.log(checking));
};

/*
- get URL
  - CORS
- receive HAL
- parse HAL
- look for _links that start 'http:'
  - for each such link that returns a HAL-FORMS
    - print a form on the page which can be used to satisfy the HAL-FORMS
      - form has to be AJAXy and the result of that can stqart over at "receive HAL"
*/




$(document).ready(() => startup());

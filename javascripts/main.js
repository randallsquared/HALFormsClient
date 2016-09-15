'use strict';

let task_root = 'https://rwcbook08.herokuapp.com/task/';


let halstart = (doc) => {
  let hal = Promise.resolve($.get(doc))
    .then(haldoc => JSON.parse(haldoc));
  hal.then(doc => console.log(doc._links));
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




$(document).ready(() => halstart(task_root));

'use strict';

let task_root = 'https://rwcbook08.herokuapp.com/task/';

let showform = (halform) {
  console.log('showing form...');
};

let getform = (link) => {
  console.log(link.key);
};

let halstart = (doc) => {
  let response = Promise.resolve($.get(doc))
  let hal = response.then(haldoc => JSON.parse(haldoc)).tap(console.log);
  let links = hal.then(doc => {
    let links = [];
    for (key in doc._links) {
      if (key.substring(0, 3) === "http") {
        links.push({ key: key, meta: doc._links[key] });
      }
    }
    return links;
  });
  links.tap(console.log);
  Promise.props(links, (linkObject) => {
    return getform(linkObject).then(showform);
  });
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




$(document).ready(() => gethal(task_root));

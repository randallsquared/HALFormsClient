'use strict';

let task_root = 'https://rwcbook08.herokuapp.com/task/';

let showform = (halform) => {
  console.log('showing form...');
};

let getform = (link) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: link.key,
      method: "GET",
      done: (data, textSuccess, xhr) => {
        console.log(xhr);
        resolve();
      },
      fail: () => reject()
    });
  });

};

let gethal = (doc) => {
  let response = Promise.resolve($.get(doc))
  let hal = response.then(haldoc => JSON.parse(haldoc)).tap(console.log);
  let linkObjects = hal.then(doc => {
    let links = [];
    for (let key in doc._links) {
      console.log('link', key.substring(0, 4));
      if (key.substring(0, 4) === "http") {
        console.log("was http...");
        links.push({ key: key, meta: doc._links[key] });
      }
    }
    return links;
  });
  linkObjects.tap(console.log);
  Promise.map(linkObjects, (linkObject) => {
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

'use strict';

let task_root = 'https://rwcbook08.herokuapp.com/task/';

let loadtemplate = (name) => {
  return $(`#${name}`).innerText;
};

let showforms = (halform) => {
  console.log('showing form...:', halform);
  let templates = halform._templates;
  for (let key in templates) {
    let stringtemplate = loadtemplate(formtemplate);
    stringtemplate.replace('{{formid}}', templates[key]);
    stringtemplate.replace('{{title}}', templates[key].title);
    stringtemplate.replace('{{method}}', templates[key].method);
    console.log(stringtemplate);
  }
  return true;
};

let getform = (link) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: link.key,
      headers: {Accept: 'application/prs.hal-forms+json'},
      method: "GET",
      success: (data, textSuccess, xhr) => {
        console.log(xhr);
        resolve(xhr.responseJSON);
      },
      fail: (xhr) => {
        console.log(xhr);
        reject();
      }
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

        links.push({ key: 'https'+key.substring(4), meta: doc._links[key] });
      }
    }
    return links;
  });
  linkObjects.tap(console.log);
  Promise.map(linkObjects, (linkObject) => {
    return getform(linkObject).then(showforms);
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




$(document).ready(() => {
  gethal(task_root);
});

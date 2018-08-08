const moment = require('moment');


/*
 var date = moment();
date.add(1,'year').subtract(9, 'months');

console.log(date.format('MMM Do YYYY'));

*/

/*console.log(date.format('h:mm a'))*/

var someTime = moment().valueOf();
console.log(someTime);

var date = moment(someTime);
console.log(date.format('h:mm a'));
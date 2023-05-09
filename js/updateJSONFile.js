// node updateJSONFile.js

const fs = require('fs');

let data = fs.readFileSync('json/wykaz_imion.json', 'utf8');
let names = Object.values(JSON.parse(data));
let arr_obj = [];
let arr_obj2 = [];
//console.log(Object.values(names));

let i = 1;
for(let x of names) {
    let obj = {};
    obj.nr = i;
    obj.name = x.name;
    obj.s = x.s;
    obj.count = parseInt(x.count);
    arr_obj.push(obj);
    i++;
}

for(let x of arr_obj) {
    if(x.name.length >= 3) arr_obj2.push(x);
}

fs.writeFileSync('../json/posortowane_imiona.json', JSON.stringify(Object.assign({}, arr_obj2), null, 2));

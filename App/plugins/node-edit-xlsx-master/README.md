# edit-xlsx

Edit an existing xlsx file. Things to be able to do are simple. Read and write cell values. That's all. Available data types are boolean, number and string, not formula.


## Install

```shell
npm install edit-xlsx --save-dev
```


## Usage

```js
var EditXlsx = require('edit-xlsx');

var data = {
  title: 'AKIRA',
  creator: 'Katsuhiro Otomo',
  year: 1988
};

var xlsx = new EditXlsx('src.xlsx');
var sheet = xlsx.sheet(0);

sheet.update('A1', 'Title');
sheet.update([2, 1], 'Creator');
sheet.update('C1', 'Year');

sheet.update([1, 2], data.title);
sheet.update('B2', data.creator);
sheet.update('C2', data.year);

sheet = xlsx.sheet(1);
sheet.update('A1', 'test');

xlsx.save('output.xlsx');


xlsx = new EditXlsx('output.xlsx');
sheet = xlsx.sheet(0);
console.log(sheet.value('B2')); //=> 'Katsuhiro Otomo'
console.log(sheet.value([1, 2], 'C2')); //=> ['AKIRA', 1988]
```


## Test

```shell
npm test
```


## License

Licensed under the MIT license.


## Special thanks to

* [Keiko Kitagawa](http://official.stardust.co.jp/keiko/)

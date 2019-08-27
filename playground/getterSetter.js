
class NumberWrapper {
    constructor(value) {
        this._value = value;
    }
    // `_value`プロパティの値を返すgetter
    // get value() {
    //     console.log("getter");
    //     return this._value;
    // }
    // // `_value`プロパティに値を代入するsetter
    // set value(newValue) {
    //     console.log("setter");
    //     this._value = newValue;
    // }
}

const numberWrapper = new NumberWrapper(1);
// "getter"とコンソールに表示される
console.log(numberWrapper._value); // => 1
// "setter"とコンソールに表示される
numberWrapper._value = 42;
// "getter"とコンソールに表示される
console.log(numberWrapper._value); // => 42

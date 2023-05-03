const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
// let ar = ['Whole', 'Decimal','Fractional']
// ,{ test: "", value:"", exp: '', fun: 'getNum'}
let ar = [{test: "Whole", value: "32l", exp: '32', fun: 'getNum'},
{ test: "Decimal", value:"5.4mi", exp: '5.4', fun: 'getNum'},
{test: "Fractional", value: "6/3mi", exp: '2', fun: 'getNum'},
{test: "Fractional Decimal", value: "6.2/3.2mi", exp: '1.9375', fun: 'getNum'},
{test: "Fractional Error", value: "6/2/3mi", exp: undefined, fun: 'getNum'},
{test: "1 Default", value: "mi", exp: "1", fun: 'getNum'},
{test: "ValidInput", value: "6/2mi", exp: "mi", fun: 'getUnit'},
{test: "InvalidInput", value: "6/2mil", exp: undefined, fun: 'getUnit'},
{test: "Return Unit", value: "6/2mi", exp: 'km', fun: 'getReturnUnit'},
{test: "SpellOutUnit", value: "mi", exp: "miles", fun: 'spellOutUnit'},
{test: "Gallons to Liters", value: "gal", exp: "L", fun: 'getReturnUnit'},
{test: "Liters to Gallons", value: "L", exp: "gal", fun: 'getReturnUnit'},
{test: "Miles to Kilometers", value: "mi", exp: "km", fun: 'getReturnUnit'},
{test: "Kilometers to Miles", value: "km", exp: "mi", fun: 'getReturnUnit'},
{test: "Pounds to Kilograms", value: "lbs", exp: "kg", fun: 'getReturnUnit'},
{test: "Kilograms to Pounds", value: "kg", exp: "lbs", fun: 'getReturnUnit'}]
suite('Unit Tests', function(){
    ar.forEach(a => {
        // console.log(convertHandler.getNum(a.value));//
        test(`${a.test} number input`, function(done){

            assert.equal(convertHandler[a.fun](a.value), a.exp);
            done();
        })
    })
    
    // test('Whole number input', function(done){
    //     let input = '32L';
    //     assert.equal(convertHandler.getNum(input), 32);
    //     done();
    // })
    // test('Decimal number input', function(done){        
    //     let input = '1.25l';
    //     assert.equal(convertHandler.getNum(input), 1.25);
    //     done();
    // })
    // test('Fractional number input', function(done){
    //     let input = '5/3mi';
    //     assert.equal(convertHandler.getNum(input), 5/3);
    //     done();
    // })
});
const { init } = require("../server");

function numSplitter(input){
  let num = input.match(/[.\d\/]+/g) || ["1"];  
  // console.log(num);
  let unit = input.match(/[a-zA-Z]+/g)[0];
  return [num[0], unit];
}

function checkDiv(posFraction){
  let nums = posFraction.split("/");
  if(nums.length > 2){return false;}
  return nums;
}

function ConvertHandler() {
  let real = ['km','mi','gal','l','lbs','kg'];
  let change = ['mi','km','L','gal','kg','lbs'];
  let inUnit = ['kilometers','miles','gallons','liters','pounds','kilograms'];
  let outUnit = ['miles','kilometers','liters','gallons','kilograms','pounds'];
  let index = 0;
  this.getNum = function(input) {  
    let res = numSplitter(input)[0];  
    let nums = checkDiv(res);        
    
    if(!nums){return undefined;}

    let n1 = nums[0];
    let n2 = nums[1] || "1";

    res = parseFloat(n1) / parseFloat(n2);

    if(isNaN(n1) || isNaN(n2)){return undefined;}
    return res; 
  };
  
  this.getUnit = function(input) {
    let res = numSplitter(input)[1].toLowerCase();
    this.spellOutUnit(res);
    if(real.indexOf(res) !== -1){
      if(res == 'l'){res = 'L';}
      res = res;
    }else{res = undefined;};
    
    return res;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = this.getUnit(initUnit).toLowerCase();
    return change[real.indexOf(result)];
  };

  this.spellOutUnit = function(unit) {
    index = real.indexOf(unit);
    // console.log([inUnit[index], outUnit[index]]);
    return [inUnit[index], outUnit[index]];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit){
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
            }
    
    console.log(result);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${inUnit[index]} converts to ${returnNum} ${outUnit[index]}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;

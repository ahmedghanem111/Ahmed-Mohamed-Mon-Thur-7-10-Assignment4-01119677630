// 1
let st = "123"
let num = Number(st) + 7 ;
console.log(num);

// 2
function checkFalsy(value){
    if(!value){
        return "inValid"
    }else return "valid"
}
console.log(checkFalsy(0));

// 3
for(let i = 1; i <= 10; i++){
    if(i%2 != 0 ){
        console.log(i);        
    }
}

// 4
let arr = [1, 2, 3, 4, 5];
let evenNumber = arr.filter(x => x%2 == 0);
console.log(evenNumber);

// 5  *note for me: you should put ... before the variable to take multiple parameters from user
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let mergedArr = [...arr1, ...arr2]
console.log(mergedArr);

// 6
function theDays(num){
    if(num == 1)return "Sunday"
    if(num == 2)return "Monday"
    if(num == 3)return "Tuesday"
    if(num == 4)return "Wednesday"
    if(num == 5)return "Thursday"
    if(num == 6)return "Friday"
    if(num == 7)return "Saturday"
    return "Invalid"
}
console.log(theDays(5));

// 7
let array = ["a", "ab", "abc"]
let Length = array.map(len => len.length)
console.log(Length);

// 8
function check(num){
    if(num%3 == 0 && num%5 == 0){
        return "Divisible by both"
    }
    return "It did not divide"
}
console.log(check(20));

// 9
function squire(num){
    let squireNumber =num * num;
    return squireNumber  
}
console.log(squire());

// 10
function obj(person){
const {name, age } = person;
return `${name} is ${age} years old`
}
console.log(obj({name: "Ahmed",age: 22}))

// 11   *note for me: like question 5
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// 12   note: I did not understand it 
function getPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Success");
    }, 3000);
  });
}

getPromise().then(console.log); 

// 13
function LargestArr(arr) {
  return Math.max(...arr);
}

console.log(LargestArr([1, 3, 7, 2, 4]));

// 14
function Keys(obj) {
  return Object.keys(obj);
}
console.log(Keys({ name: "John", age: 30 }));

// 15
function Split(str) {
  return str.split(" ");
}

console.log(Split("The quick brown fox"));







// Q2

// 1- forEach is an array method used to iterate over elements in an array and it did not support break and continue.
//    you should use it if you do not need loop control

//    For is a loop that works with any iterable object such as arrays, string and you can use break and continue 
//    you should use it if you wanted more flexibility



// 2- Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope before execution.
//    example like that 
      console.log(x);
      var x = 5;

//    The TDZ refers to the period between entering a scope and the variable declaration where variables declared with let and const cannot be accessed
//    example like that 
      console.log(y);
      let y = 10;
 


// 3- (==) is the loose equality operator. It compares values after performing type coercion (automatic type conversion)
//    like 
      console.log("5" == 5); // true
//    (===) is the strict equality operator. It compares both value and type without type conversion
//    like
      console.log("5" === 5); // false
      

      
// 4- The try-catch statement is used to handle errors in JavaScript.
//    Code that may throw an error is placed inside the try block, and if an error occurs, it is caught in the catch block.  

 

// 5- Type Conversion (Explicit Conversion) occurs when the developer manually converts a value from one type to another
//    like that
      let n = Number("123");

//    Type Coercion (Implicit Conversion) occurs when JavaScript automatically converts one type to another during an operation.
//    like that 
      console.log("5" * 2);      
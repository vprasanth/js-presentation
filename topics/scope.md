# Scope
[![Scope](http://imgs.xkcd.com/comics/laser_scope.jpg)](https://xkcd.com/101/)

#### Outline
- [What is scope?](#what-the-hell-is-it?)
- [Variable Scope](#variable-scope)
  - [Global Scope](#global-scope)
  - [Local Scope](#local-scope)
  - ~~[Variable Hoisting](#variable-hoisting)~~
- [Function Scope](#function-scope)
- [Lexical Scope](#lexical-scope)
- [The Scope Chain](#the-scope-chain)
- ~~Closures~~
- ~~This is that~~
- ~~Best Practices~~
- ~~Private/Public Scope~~

## What the hell is it?
Scope is the context in which your code 'takes place in'.

```javascript
function() {
  // scope
  var iExistWithinThisFunction = '';
}
```
## Variable Scope

### Global Scope
Global scope is sort of plan that all code exists on. Anything defined within the global scope can be accessed and altered from _anywhere_ in the code, it becomes a _global variable_.

To define a global variable simply degine a variable outside of a `function` block.

```javascript
// global scope
sum = 0;

function count() {
  sum++;
}
```

Using a variable that was not initialized also creates a global variable.

```javascript
function printMsg() {
  console.log(msg); // output: undefined
}
```

`msg` was never initialized (i.e `var msg = 'hello!';`). Instead of throwing an error. the interpreter will implicitly create a global variable with that name in the global scope and use it (all unassigned initialized variables have the value `undefined`).

Using global variables and polluting the global scope can result in unreliable, buggy code; susceptible to changes outside of your control, so don't use them.

#### Aside
What's the big deal about using `var` and not using it (including the imlicitly created ones) when declaring global variables? Turns out, pretty big. When you create a global variable, you are actually creating a property on the **global object** with the same name as the variable and with its value equal to the variable's. When `var` is used, that property actually can't be deleted using the `delete` operator. Yeah... going in to details about why this behavior is out of this document's scope (pun unintended). However, if you are still [go here](http://perfectionkills.com/understanding-delete/).

### Local Scope
Anything defined within a `function` block using the `var` statement.

```javascript
function newsCaster() {
  // local scope
  var morbo;
}
```

`morbo` is only accessible within the `newsCaster` function. Nothing outside of that function can affect it, i.e. it does not pollute the global scope. Note. If `morbo` was also defined in the global scope, the local version takes precedence.

### Variable Hoisting
Todo

## Function Scope
Variables defined within functions are visible within that function and any nested functions. What does that mean? It means, variables created within other blocks such as: `if`, `for`, `switch`, `while` are accessible throughout the whole parent function (ex. 2).

 ```javascript
 // ex. 1
 // Scope a (global)
 var myFunction = function () {
   // Scope b
   var myOtherFunction = function () {
     // Scope c
   };
 };
```

Even though the variable is defined within the `if` block, it is accessible outside the block.

```javascript
// ex. 2
function car(x){
  if(x){
    var tesla = 'model s';
  }
  return console.log(tesla);
}

car(false); //output: undefined
car(true); //output: model s
```

JavaScript does **not** have block scope (Unless you're using ES6 and the `let` statement :D).

## Lexical Scope
When you see functions within functions, the inner functions also have access to the variable scopes of the outer functions. This also means, functions are executed using the variable scope that was in effect when they were **defined**, not the variable scope in effect when they are invoked (more on this in [Closures](#closures)).

```javascript
var person = 'pv'; // using global scope here as an example
function a() {
  var cat = 'meow';
  // person and cat is available here
  function b() {
    var dog = 'bark';
    // person, cat, and dog available here too
    function c() {
      var snake = 'ssss';
      // person, cat, dog, and snake available here
    };
  };
};
```

Note. Lexical scoping does not resolve backwards. For exmaple: `b()` can access `person`, `cat`, and `dog`, but it does not have `snake` in its context, therefore it can not access it.


## The Scope Chain

```javascript
function first(){
    second();
    function second(){
        third();
        function third(){
            fourth();
            function fourth(){
                // do something
            }
        }
    }
}
first();
```

We understand the order of execution here, that's simple. However, each time we enter a function we need to carry over the scope from the previous function. This connection between the nested scopes is the _scope chain_. It gets more fun.

Running this code would result in the nested functions being executed all the way down to the `fourth` function, at this point the scope chain would be, from top to bottom: fourth, third, second, first, global. The fourth would have access going all the way up.

It gets even more more fun. Any look-up always starts from local scope, traveling upwards to global scope. So if you have something like this:

```javascript
var fed = 'eddie'
function first(){
    second();
    function second(){
        third();
        function third(){
            fourth();
            function fourth(){
                var fed = 'ralston'
                return console.log(fed);
            }
        }
    }
}
first(); //output ralston
```
You will get _ralston_ but you haven't changed the `fed` in global. What does this mean? If you have variables with the same name in different scopes, the one resolved first will get used. **Local variables with the same name take precedence** (_they also hide the global variable with the same name_).

## Closures



## Best Practices

### \#8 Minimize global scope
- avoid polluting the global scope/global object
- define variables as locally as required
- use global variables for feature detection

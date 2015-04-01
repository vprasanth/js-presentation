# Scope
![scope](http://imgs.xkcd.com/comics/laser_scope.jpg)

#### Outline
- What is scope?
- Global Scope
- Local Scope
- Function Scope
- Lexical Scope
- Scope Chain
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

## Global Scope
Global scope is sort of plan that all code exists on. Anything defined within the global scope can be accessed and altered from _anywhere_.

What this means is, anything defined outside of a `function` block gets defined in the global scope.

```javascript
// global scope
var sum = 0;

function count() {
  sum++;
}
```

This also defines a variable on the global scope:

```javascript
function count() {
  sum++; // automatically defined on the global scope
}
```

`sum` was never initialized (i.e `var sum;`). The interpreter will implicitly create it on the global scope instead for you before it uses it.

Using variables and polluting the global scope can result in unreliable code, susceptible changes outside of your control.

## Local Scope
Anything defined within a `function` block.

```javascript
function newsCaster() {
  // local scope
  var morbo;
}
```

`morbo` is only accessible within the `newsCaster` function. Nothing outside of that function can affect it, i.e. it does not pollute the global scope.

## Function Scope
All scopes within JavaScript get created for only functions. What does that mean? It means, scopes don't get created within other blocks such as: `if`, `for`, `switch`, `while`.  

 ```javascript
 // Scope a (global)
 var myFunction = function () {
   // Scope b
   var myOtherFunction = function () {
     // Scope c
   };
 };
```

Even though the function is defined within the `if` block, it returns.

```javascript
function car(x){
  if(x){
    var tesla = 'model s';
  }
  return console.log(tesla);
}

car(false); //output: undefined
car(true); //output: model s
```

## Lexical Scope
When you see functions within functions, the inner functions also have access to the scopes of the outer functions.

```javascript
var name = 'pv'; // using global scope here as an example
function () {
  // name is available here
  function () {
    // name is available here too
    function () {
      // name is also available here
    };
  };
};
```

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

We understand the order of execution here, that's simple. However, each time we enter a function we need to carry over the scope from the previous function. This connection between the nested functions is the _scope chain_. It gets more fun.

Running this code would result in the nested functions being executed al the way down to the `fourth` function, at this point the scope chain would be, from top to bottom: fourth, third, second, first, global. The fourth would have access going all the way up.

It gets even more more fun. Any look-up down is always happen from local traveling upwards to global. So if you have something like this:

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
You will get _ralston_ but you haven't changed the fed in global.


## Best Practices

### \#8 Minimize global scope
- avoid polluting the global scope/global object
- define variables as locally as required
- use global variables for feature detection

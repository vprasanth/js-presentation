// item 15. unportable scoping of block-local function declarations

function f() {
  return 'global';
}

function test(x){

  function f() {
    return 'local';
  }

  var result = [];
  if (x) {
    result.push(f());
  }
  result.push(f());
  return result;
}

console.log(test(true));
console.log(test(false));

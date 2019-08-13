/*
 * 출처: 인사이드 자바스크립트, 송형주/고현준, 한빛미디어
 */

function HelloFunc(func) {
  this.greeting = 'hello';
}

// 파라미터 함수 호출, 없으면 this.func() 호출
HelloFunc.prototype.call = function(paramFunc) {
  paramFunc ? paramFunc(this.greeting) : this.func(this.greeting);
}

var userFunc = function(greeting) {
  console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;

objHello.call();

//

function saySomething(obj, methodName, name) {
  return (function(greeting) {
    return obj[methodName](greeting, name);
  });
}

// 객체의 메소드에 파라미터로 함수 호출
function newObj(obj, name) {
  obj.func = saySomething(this, 'who', name);
  return obj;
}

newObj.prototype.who = function(greeting, name) {
  console.log(greeting + ' ' + (name || 'everyone'));
}

var obj1 = new newObj(objHello);
// objHello.func = userFunc에서 saySomething으로 변경
// saySomething은 who 함수 호출

obj1.call();
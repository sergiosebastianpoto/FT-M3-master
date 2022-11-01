"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function")
    throw TypeError("executor debe ser una function");
  this._state = "pending";
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}
$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};
$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};
$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  this._handlerGroups.push({
    successCb,
    errorCb,
  });
  if (this._state !== "pending") {
    this._callHandlers();
  }
};
$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    var handler = this._handlerGroups.shift();
    //como saber si esta resuelta o rechazada --> por el estado
    if (this._state === "fulfilled") {
      handler.successCb && handler.successCb(this._value);
    } else {
      handler.errorCb && handler.errorCb(this._value);
    }
  }
};
$Promise.prototype.catch = function (errorCb) {
  // el catch es un maquillaje, es un then con null en 1er parametro
  this.then(null, errorCb);
};
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:
​
module.exports = $Promise;
​
Entonces en proyectos Node podemos esribir cosas como estas:
​
var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

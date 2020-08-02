"use strict";
var calculadora = /** @class */ (function () {
    function calculadora(valor) {
        this.numero = valor;
    }
    calculadora.prototype.mostrar = function () {
        return this.numero * 2;
    };
    return calculadora;
}());
var calc = new calculadora(10);
console.log(calc.mostrar());

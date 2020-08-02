class calculadora {
    numero:number;
    constructor(valor:number){
        this.numero = valor;
    }
    mostrar(){
        return this.numero*2;
    }
}
let calc = new calculadora(10);
console.log(calc.mostrar());
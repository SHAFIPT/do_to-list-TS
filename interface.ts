//Interface
interface Person {
    name : string;
    age : number;
    place : string;
    getName : () => void;
}
let person1 : Person = {
    name : 'shafi',
     age : 23,
    place : 'kollam',
    getName() {
        console.log(this.name);
    }
}
 person1.getName()
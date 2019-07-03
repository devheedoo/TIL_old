/* TypeScript in 5 minutes */

class Student {
    fullName: string;
    constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string) {
        this.fullName = firstName + " "  + middleInitial + " " + lastName;
    };
    age: number = 27;
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

// let user = "Jane User";
// let user = [0, 1, 2];
// let user = { firstName: "Heedo", lastName: "Kim"};
let user = new Student("Heedo", "D.", "Kim");

document.body.innerHTML = greeter(user);



/* Introduction */

/* String */
let sentence: string = `Hello, my name is ${ user.fullName }.

I'll be ${ user.age + 1 } years old nex month.`;
// is same as
let jsSentence = "Hello, my name is " + user.fullName + ".\n\n" +
"I'll be " + (user.age + 1) + " years old next month.";

/* Tuple */
let x: [string, number];
x = ["hello", 10];
// x = [10, "hello"];
// > Error


#MobX `observable` modifier 변경 비교

- 변경하는 modifier: `deep`, `shallow`, `ref`, `struct`
- velopert님의 Vanilla JS MobX Boilerplate를 이용했다.
  - 좌측 Explorer 메뉴에서 Dependencies의 MobX 버전을 5.9.4로 변경했다.
  - 좌측 configuration files 메뉴에서 tsconfig.json을 생성한 후, `compilerOptions` 맨 아래에 `"experimentalDecorators": true`를 추가했다.

## observable object

- CodeSandbox: https://codesandbox.io/s/vanilla-js-mobx-boilerplate-5ye92

object 데이터 변경 시 어떻게 MobX의 autorun이 어떻게 실행되는지 확인했다. 변경 조건은 전체 객체(choco), 내부 객체(fullName), 내부 객체의 문자열(firstName), 숫자(age), 문자열(job)이다.

```javascript
import { observable, autorun, action, computed, extendObservable } from "mobx";

class TestDeep {
  // object - deep
  @observable choco = {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  };

  @action setObject(obj) {
    this.choco = obj;
  }

  @action setFullName(fullName) {
    this.choco.fullName = fullName;
  }

  @action setFirstName(firstName) {
    this.choco.firstName = firstName;
  }

  @action setAge(age) {
    this.choco.age = age;
  }

  @action setJob(job) {
    this.choco.job = job;
  }
}

class TestShallow {
  // object - shallow
  @observable.shallow choco = {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  };

  @action setObject(obj) {
    this.choco = obj;
  }

  @action setFullName(fullName) {
    this.choco.fullName = fullName;
  }

  @action setFirstName(firstName) {
    this.choco.firstName = firstName;
  }

  @action setAge(age) {
    this.choco.age = age;
  }

  @action setJob(job) {
    this.choco.job = job;
  }
}

class TestRef {
  // object - ref
  @observable.ref choco = {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  };

  @action setObject(obj) {
    this.choco = obj;
  }

  @action setFullName(fullName) {
    this.choco.fullName = fullName;
  }

  @action setFirstName(firstName) {
    this.choco.firstName = firstName;
  }

  @action setAge(age) {
    this.choco.age = age;
  }

  @action setJob(job) {
    this.choco.job = job;
  }
}

class TestStruct {
  // object - struct
  @observable.struct choco = {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  };

  @computed get allAboutChoco() {
    return (
      this.choco.fullName.firstName +
      "|" +
      this.choco.fullName.lastName +
      "|" +
      this.choco.age +
      "|" +
      this.choco.job
    );
  }

  @action setObject(obj) {
    this.choco = obj;
  }

  @action setFullName(fullName) {
    this.choco.fullName = fullName;
  }

  @action setFirstName(firstName) {
    this.choco.firstName = firstName;
  }

  @action setAge(age) {
    this.choco.age = age;
  }

  @action setJob(job) {
    this.choco.job = job;
  }
}

const testDeep = new TestDeep();
const testShallow = new TestShallow();
const testRef = new TestRef();
const testStruct = new TestStruct();

console.log("\n----//// deep start ////----\n");
autorun(() => console.log(`autorun - deep - object: ${testDeep.choco}`));
autorun(() =>
  console.log(`autorun - deep - fullName: ${testDeep.choco.fullName}`)
);
autorun(() =>
  console.log(`autorun - deep - firstName: ${testDeep.choco.firstName}`)
);
autorun(() => console.log(`autorun - deep - age: ${testDeep.choco.age}`));
autorun(() => console.log(`autorun - deep - job: ${testDeep.choco.job}`));
console.log("---- Initial autorun end ----");
testDeep.setObject({
  fullName: {
    firstName: "Choco",
    lastName: "Corn"
  },
  age: "29",
  job: "Corn developer"
});
console.log("---- setObject end ----");
testDeep.setFullName({
  firstName: "ChocoFirst",
  lastName: "KimLast"
});
console.log("---- setFullName end ----");
testDeep.setFirstName("Coco");
console.log("---- setFirstName end ----");
testDeep.setAge(33);
console.log("---- setAge end ----");
testDeep.setJob("Engineer");
console.log("---- setJob end ----");

testDeep.setJob({
  name: "Developer",
  Type: "FullStack"
});
console.log("---- setJob as an Object end ----");
extendObservable(testDeep, { gender: "male" });
console.log("---- extendObservable end ----");
testDeep.setObject([1, 2, 3]);
console.log("---- setObject as an Array end ----");

console.log("\n----//// shallow start ////----\n");
autorun(() => console.log(`autorun - shallow - object: ${testShallow.choco}`));
autorun(() =>
  console.log(`autorun - shallow - fullName: ${testShallow.choco.fullName}`)
);
autorun(() =>
  console.log(`autorun - shallow - firstName: ${testShallow.choco.firstName}`)
);
autorun(() => console.log(`autorun - shallow - age: ${testShallow.choco.age}`));
autorun(() => console.log(`autorun - shallow - job: ${testShallow.choco.job}`));
console.log("---- Initial autorun end ----");
testShallow.setObject({
  fullName: {
    firstName: "Choco",
    lastName: "Corn"
  },
  age: "29",
  job: "Corn developer"
});
console.log("---- setObject end ----");
testShallow.setFullName({
  firstName: "ChocoFirst",
  lastName: "KimLast"
});
console.log("---- setFullName end ----");
testShallow.setFirstName("Coco");
console.log("---- setFirstName end ----");
testShallow.setAge(33);
console.log("---- setAge end ----");
testShallow.setJob("Engineer");
console.log("---- setJob end ----");

testShallow.setJob({
  name: "Developer",
  Type: "FullStack"
});
console.log("---- setJob as an Object end ----");
extendObservable(testShallow, { gender: "male" });
console.log("---- extendObservable end ----");
testShallow.setObject([1, 2, 3]);
console.log("---- setObject as an Array end ----");


console.log("\n----//// ref start ////----\n");
autorun(() => console.log(`autorun - ref - object: ${testRef.choco}`));
autorun(() =>
  console.log(`autorun - ref - fullName: ${testRef.choco.fullName}`)
);
autorun(() =>
  console.log(`autorun - ref - firstName: ${testRef.choco.firstName}`)
);
autorun(() => console.log(`autorun - ref - age: ${testRef.choco.age}`));
autorun(() => console.log(`autorun - ref - job: ${testRef.choco.job}`));
console.log("---- Initial autorun end ----");
testRef.setObject({
  fullName: {
    firstName: "Choco",
    lastName: "Corn"
  },
  age: "29",
  job: "Corn developer"
});
console.log("---- setObject end ----");
testRef.setFullName({
  firstName: "ChocoFirst",
  lastName: "KimLast"
});
console.log("---- setFullName end ----");
testRef.setFirstName("Coco");
console.log("---- setFirstName end ----");
testRef.setAge(33);
console.log("---- setAge end ----");
testRef.setJob("Engineer");
console.log("---- setJob end ----");

testRef.setJob({
  name: "Developer",
  Type: "FullStack"
});
console.log("---- setJob as an Object end ----");
extendObservable(testRef, { gender: "male" });
console.log("---- extendObservable end ----");
testRef.setObject([1, 2, 3]);
console.log("---- setObject as an Array end ----");


console.log("\n----//// struct start ////----\n");
autorun(() => console.log(`autorun - struct - object: ${testStruct.choco}`));
autorun(() =>
  console.log(`autorun - struct - fullName: ${testStruct.choco.fullName}`)
);
autorun(() =>
  console.log(`autorun - struct - firstName: ${testStruct.choco.firstName}`)
);
autorun(() => console.log(`autorun - struct - age: ${testStruct.choco.age}`));
autorun(() => console.log(`autorun - struct - job: ${testStruct.choco.job}`));
console.log("---- Initial autorun end ----");
testStruct.setObject({
  fullName: {
    firstName: "Choco",
    lastName: "Corn"
  },
  age: "29",
  job: "Corn developer"
});
console.log("---- setObject end ----");
testStruct.setFullName({
  firstName: "ChocoFirst",
  lastName: "KimLast"
});
console.log("---- setFullName end ----");
testStruct.setFirstName("Coco");
console.log("---- setFirstName end ----");
testStruct.setAge(33);
console.log("---- setAge end ----");
testStruct.setJob("Engineer");
console.log("---- setJob end ----");

testStruct.setJob({
  name: "Developer",
  Type: "FullStack"
});
console.log("---- setJob as an Object end ----");
extendObservable(testStruct, { gender: "male" });
console.log("---- extendObservable end ----");
testStruct.setObject([1, 2, 3]);
console.log("---- setObject as an Array end ----");
```

테스트 결과:

```

---//// deep start ////----
 
autorun - deep - object: [object Object] 
autorun - deep - fullName: [object Object] 
autorun - deep - firstName: undefined 
autorun - deep - age: 27 
autorun - deep - job: wave developer 
---- Initial autorun end ---- 
autorun - deep - object: [object Object] 
autorun - deep - fullName: [object Object] 
autorun - deep - firstName: undefined 
autorun - deep - age: 29 
autorun - deep - job: Corn developer 
---- setObject end ---- 
autorun - deep - fullName: [object Object] 
---- setFullName end ---- 
autorun - deep - firstName: Coco 
---- setFirstName end ---- 
autorun - deep - age: 33 
---- setAge end ---- 
autorun - deep - job: Engineer 
---- setJob end ---- 
autorun - deep - job: [object Object] 
---- setJob as an Object end ---- 
---- extendObservable end ---- 
autorun - deep - object: 1,2,3 
autorun - deep - fullName: undefined 
autorun - deep - firstName: undefined 
autorun - deep - age: undefined 
autorun - deep - job: undefined 
---- setObject as an Array end ---- 

----//// shallow start ////----
 
autorun - shallow - object: [object Object] 
autorun - shallow - fullName: [object Object] 
autorun - shallow - firstName: undefined 
autorun - shallow - age: 27 
autorun - shallow - job: wave developer 
---- Initial autorun end ---- 
autorun - shallow - object: [object Object] 
autorun - shallow - fullName: [object Object] 
autorun - shallow - firstName: undefined 
autorun - shallow - age: 29 
autorun - shallow - job: Corn developer 
---- setObject end ---- 
autorun - shallow - fullName: [object Object] 
---- setFullName end ---- 
autorun - shallow - firstName: Coco 
---- setFirstName end ---- 
autorun - shallow - age: 33 
---- setAge end ---- 
autorun - shallow - job: Engineer 
---- setJob end ---- 
autorun - shallow - job: [object Object] 
---- setJob as an Object end ---- 
---- extendObservable end ---- 
autorun - shallow - object: 1,2,3 
autorun - shallow - fullName: undefined 
autorun - shallow - firstName: undefined 
autorun - shallow - age: undefined 
autorun - shallow - job: undefined 
---- setObject as an Array end ---- 

----//// ref start ////----
 
autorun - ref - object: [object Object] 
autorun - ref - fullName: [object Object] 
autorun - ref - firstName: undefined 
autorun - ref - age: 27 
autorun - ref - job: wave developer 
---- Initial autorun end ---- 
autorun - ref - object: [object Object] 
autorun - ref - fullName: [object Object] 
autorun - ref - firstName: undefined 
autorun - ref - age: 29 
autorun - ref - job: Corn developer 
---- setObject end ---- 
---- setFullName end ---- 
---- setFirstName end ---- 
---- setAge end ---- 
---- setJob end ---- 
---- setJob as an Object end ---- 
---- extendObservable end ---- 
autorun - ref - object: 1,2,3 
autorun - ref - fullName: undefined 
autorun - ref - firstName: undefined 
autorun - ref - age: undefined 
autorun - ref - job: undefined 
---- setObject as an Array end ---- 

----//// struct start ////----
 
autorun - struct - object: [object Object] 
autorun - struct - fullName: [object Object] 
autorun - struct - firstName: undefined 
autorun - struct - age: 27 
autorun - struct - job: wave developer 
---- Initial autorun end ---- 
autorun - struct - object: [object Object] 
autorun - struct - fullName: [object Object] 
autorun - struct - firstName: undefined 
autorun - struct - age: 29 
autorun - struct - job: Corn developer 
---- setObject end ---- 
---- setFullName end ---- 
---- setFirstName end ---- 
---- setAge end ---- 
---- setJob end ---- 
---- setJob as an Object end ---- 
---- extendObservable end ---- 
autorun - struct - object: 1,2,3 
autorun - struct - fullName: undefined 
autorun - struct - firstName: undefined 
autorun - struct - age: undefined 
autorun - struct - job: undefined 
---- setObject as an Array end ----
```

결론:

- deep, shallow는 결과가 같았다.
  - 내부 JS 객체를 변경하면 각각의 객체에 해당하는 autorun만 실행한다.
- ref, struct는 결과가 같았다.
  - 내부 JS 객체를 변경하면 구조가 바뀌지 않을 경우 autorun이 실행되지 않는다.
  - 내부 JS 객체를 string에서 object로 변경하거나, 새 객체를 추가했는데도 autorun이 실행되지 않는다.
- 전체 객체를 변경할 경우 모든 autorun을 실행한다.
- object 비교 시 structural 비교가 일반 비교와 어떻게 다른지 모르겠다.

## observable array

- CodeSandbox: https://codesandbox.io/s/vanilla-js-mobx-boilerplate-u55f9

array 데이터 변경 시 어떻게 MobX의 autorun이 어떻게 실행되는지 확인했다. 변경 조건은 전체 배열, 일부 배열 변경, 배열 항목 추가(push), 배열 항목 삭제(pop)이다.

```javascript
import { observable, autorun, action } from "mobx";

class TestDeep {
  // object - deep
  @observable people = [
    {
      fullName: {
        firstName: "Choco",
        lastName: "Kim"
      },
      age: "27",
      job: "wave developer"
    },
    {
      fullName: {
        firstName: "Vanilla",
        lastName: "Choi"
      },
      age: "17",
      job: "wave designer"
    },
    {
      fullName: {
        firstName: "Strawberry",
        lastName: "Lee"
      },
      age: "37",
      job: "wave person"
    }
  ];

  @action setObject(obj) {
    this.people = obj;
  }

  @action setNthObject(n, obj) {
    if (n < this.people.length) {
      this.people[n] = obj;
    } else {
      console.log('n is over the length.');
    }
  }

  @action pushObject(obj) {
    this.people.push(obj);
  }

  @action popObject() {
    this.people.pop();
  }
}

const testDeep = new TestDeep();

console.log("\n----//// deep start ////----\n");
autorun(() => console.log(`autorun - deep - object: ${testDeep.people}`));
console.log("---- Initial autorun end ----");
testDeep.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  },
  {
    fullName: {
      firstName: "Strawberry",
      lastName: "Lee"
    },
    age: "37",
    job: "wave person"
  }
]);
console.log("---- setObject as same end ----");
testDeep.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  }
]);
console.log("---- setObject as less end ----");
testDeep.setNthObject(0, 6);
console.log("---- setNthObject as number end ----");
testDeep.setNthObject(0, "Coco");
console.log("---- setNthObject as string end ----");
testDeep.setNthObject(1, { name: 'choco' });
console.log("---- setNthObject as object end ----");
testDeep.pushObject(33);
console.log("---- pushObject number end ----");
testDeep.pushObject('String');
console.log("---- pushObject string end ----");
testDeep.pushObject({ lastName: 'Kim' });
console.log("---- pushObject object end ----");
testDeep.popObject();
console.log("---- popObject 1st end ----");
testDeep.popObject();
console.log("---- popObject 2nd end ----");
testDeep.popObject();
console.log("---- popObject 3rd end ----");



class TestShallow {
  // object - deep
  @observable.shallow people = [
    {
      fullName: {
        firstName: "Choco",
        lastName: "Kim"
      },
      age: "27",
      job: "wave developer"
    },
    {
      fullName: {
        firstName: "Vanilla",
        lastName: "Choi"
      },
      age: "17",
      job: "wave designer"
    },
    {
      fullName: {
        firstName: "Strawberry",
        lastName: "Lee"
      },
      age: "37",
      job: "wave person"
    }
  ];

  @action setObject(obj) {
    this.people = obj;
  }

  @action setNthObject(n, obj) {
    if (n < this.people.length) {
      this.people[n] = obj;
    } else {
      console.log('n is over the length.');
    }
  }

  @action pushObject(obj) {
    this.people.push(obj);
  }

  @action popObject() {
    this.people.pop();
  }
}

const testShallow = new TestShallow();

console.log("\n----//// shallow start ////----\n");
autorun(() => console.log(`autorun - shallow - object: ${testShallow.people}`));
console.log("---- Initial autorun end ----");
testShallow.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  },
  {
    fullName: {
      firstName: "Strawberry",
      lastName: "Lee"
    },
    age: "37",
    job: "wave person"
  }
]);
console.log("---- setObject as same end ----");
testShallow.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  }
]);
console.log("---- setObject as less end ----");
testShallow.setNthObject(0, 6);
console.log("---- setNthObject as number end ----");
testShallow.setNthObject(0, "Coco");
console.log("---- setNthObject as string end ----");
testShallow.setNthObject(1, { name: 'choco' });
console.log("---- setNthObject as object end ----");
testShallow.pushObject(33);
console.log("---- pushObject number end ----");
testShallow.pushObject('String');
console.log("---- pushObject string end ----");
testShallow.pushObject({ lastName: 'Kim' });
console.log("---- pushObject object end ----");
testShallow.popObject();
console.log("---- popObject 1st end ----");
testShallow.popObject();
console.log("---- popObject 2nd end ----");
testShallow.popObject();
console.log("---- popObject 3rd end ----");




class TestRef {
  // object - deep
  @observable.ref people = [
    {
      fullName: {
        firstName: "Choco",
        lastName: "Kim"
      },
      age: "27",
      job: "wave developer"
    },
    {
      fullName: {
        firstName: "Vanilla",
        lastName: "Choi"
      },
      age: "17",
      job: "wave designer"
    },
    {
      fullName: {
        firstName: "Strawberry",
        lastName: "Lee"
      },
      age: "37",
      job: "wave person"
    }
  ];

  @action setObject(obj) {
    this.people = obj;
  }

  @action setNthObject(n, obj) {
    if (n < this.people.length) {
      this.people[n] = obj;
    } else {
      console.log('n is over the length.');
    }
  }

  @action pushObject(obj) {
    this.people.push(obj);
  }

  @action popObject() {
    this.people.pop();
  }
}

const testRef = new TestRef();

console.log("\n----//// ref start ////----\n");
autorun(() => console.log(`autorun - ref - object: ${testRef.people}`));
console.log("---- Initial autorun end ----");
testRef.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  },
  {
    fullName: {
      firstName: "Strawberry",
      lastName: "Lee"
    },
    age: "37",
    job: "wave person"
  }
]);
console.log("---- setObject as same end ----");
testRef.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  }
]);
console.log("---- setObject as less end ----");
testRef.setNthObject(0, 6);
console.log("---- setNthObject as number end ----");
testRef.setNthObject(0, "Coco");
console.log("---- setNthObject as string end ----");
testRef.setNthObject(1, { name: 'choco' });
console.log("---- setNthObject as object end ----");
testRef.pushObject(33);
console.log("---- pushObject number end ----");
testRef.pushObject('String');
console.log("---- pushObject string end ----");
testRef.pushObject({ lastName: 'Kim' });
console.log("---- pushObject object end ----");
testRef.popObject();
console.log("---- popObject 1st end ----");
testRef.popObject();
console.log("---- popObject 2nd end ----");
testRef.popObject();
console.log("---- popObject 3rd end ----");




class TestStruct {
  // object - deep
  @observable.struct people = [
    {
      fullName: {
        firstName: "Choco",
        lastName: "Kim"
      },
      age: "27",
      job: "wave developer"
    },
    {
      fullName: {
        firstName: "Vanilla",
        lastName: "Choi"
      },
      age: "17",
      job: "wave designer"
    },
    {
      fullName: {
        firstName: "Strawberry",
        lastName: "Lee"
      },
      age: "37",
      job: "wave person"
    }
  ];

  @action setObject(obj) {
    this.people = obj;
  }

  @action setNthObject(n, obj) {
    if (n < this.people.length) {
      this.people[n] = obj;
    } else {
      console.log('n is over the length.');
    }
  }

  @action pushObject(obj) {
    this.people.push(obj);
  }

  @action popObject() {
    this.people.pop();
  }
}

const testStruct = new TestStruct();

console.log("\n----//// struct start ////----\n");
autorun(() => console.log(`autorun - struct - object: ${testStruct.people}`));
console.log("---- Initial autorun end ----");
testStruct.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  },
  {
    fullName: {
      firstName: "Strawberry",
      lastName: "Lee"
    },
    age: "37",
    job: "wave person"
  }
]);
console.log("---- setObject as same end ----");
testStruct.setObject([
  {
    fullName: {
      firstName: "Choco",
      lastName: "Kim"
    },
    age: "27",
    job: "wave developer"
  },
  {
    fullName: {
      firstName: "Vanilla",
      lastName: "Choi"
    },
    age: "17",
    job: "wave designer"
  }
]);
console.log("---- setObject as less end ----");
testStruct.setNthObject(0, 6);
console.log("---- setNthObject as number end ----");
testStruct.setNthObject(0, "Coco");
console.log("---- setNthObject as string end ----");
testStruct.setNthObject(1, { name: 'choco' });
console.log("---- setNthObject as object end ----");
testStruct.pushObject(33);
console.log("---- pushObject number end ----");
testStruct.pushObject('String');
console.log("---- pushObject string end ----");
testStruct.pushObject({ lastName: 'Kim' });
console.log("---- pushObject object end ----");
testStruct.popObject();
console.log("---- popObject 1st end ----");
testStruct.popObject();
console.log("---- popObject 2nd end ----");
testStruct.popObject();
console.log("---- popObject 3rd end ----");
```

테스트 결과:

```

---//// deep start ////----
 
autorun - deep - object: [object Object],[object Object],[object Object] 
---- Initial autorun end ---- 
autorun - deep - object: [object Object],[object Object],[object Object] 
---- setObject as same end ---- 
autorun - deep - object: [object Object],[object Object] 
---- setObject as less end ---- 
autorun - deep - object: 6,[object Object] 
---- setNthObject as number end ---- 
autorun - deep - object: Coco,[object Object] 
---- setNthObject as string end ---- 
autorun - deep - object: Coco,[object Object] 
---- setNthObject as object end ---- 
autorun - deep - object: Coco,[object Object],33 
---- pushObject number end ---- 
autorun - deep - object: Coco,[object Object],33,String 
---- pushObject string end ---- 
autorun - deep - object: Coco,[object Object],33,String,[object Object] 
---- pushObject object end ---- 
autorun - deep - object: Coco,[object Object],33,String 
---- popObject 1st end ---- 
autorun - deep - object: Coco,[object Object],33 
---- popObject 2nd end ---- 
autorun - deep - object: Coco,[object Object] 
---- popObject 3rd end ---- 

----//// shallow start ////----
 
autorun - shallow - object: [object Object],[object Object],[object Object] 
---- Initial autorun end ---- 
autorun - shallow - object: [object Object],[object Object],[object Object] 
---- setObject as same end ---- 
autorun - shallow - object: [object Object],[object Object] 
---- setObject as less end ---- 
autorun - shallow - object: 6,[object Object] 
---- setNthObject as number end ---- 
autorun - shallow - object: Coco,[object Object] 
---- setNthObject as string end ---- 
autorun - shallow - object: Coco,[object Object] 
---- setNthObject as object end ---- 
autorun - shallow - object: Coco,[object Object],33 
---- pushObject number end ---- 
autorun - shallow - object: Coco,[object Object],33,String 
---- pushObject string end ---- 
autorun - shallow - object: Coco,[object Object],33,String,[object Object] 
---- pushObject object end ---- 
autorun - shallow - object: Coco,[object Object],33,String 
---- popObject 1st end ---- 
autorun - shallow - object: Coco,[object Object],33 
---- popObject 2nd end ---- 
autorun - shallow - object: Coco,[object Object] 
---- popObject 3rd end ---- 

----//// ref start ////----
 
autorun - ref - object: [object Object],[object Object],[object Object] 
---- Initial autorun end ---- 
autorun - ref - object: [object Object],[object Object],[object Object] 
---- setObject as same end ---- 
autorun - ref - object: [object Object],[object Object] 
---- setObject as less end ---- 
---- setNthObject as number end ---- 
---- setNthObject as string end ---- 
---- setNthObject as object end ---- 
---- pushObject number end ---- 
---- pushObject string end ---- 
---- pushObject object end ---- 
---- popObject 1st end ---- 
---- popObject 2nd end ---- 
---- popObject 3rd end ---- 

----//// struct start ////----
 
autorun - struct - object: [object Object],[object Object],[object Object] 
---- Initial autorun end ---- 
---- setObject as same end ---- 
autorun - struct - object: [object Object],[object Object] 
---- setObject as less end ---- 
---- setNthObject as number end ---- 
---- setNthObject as string end ---- 
---- setNthObject as object end ---- 
---- pushObject number end ---- 
---- pushObject string end ---- 
---- pushObject object end ---- 
---- popObject 1st end ---- 
---- popObject 2nd end ---- 
---- popObject 3rd end ----
```

결론:

- deep, shallow는 결과가 같았다. 모든 변경에 대해 autorun이 실행된다.
- ref는 배열 전체를 변경할 때만 autorun이 실행된다.
- struct는 배열 전체를 변경할 때만 autorun이 실행되는데, 이전 배열과 완벽히 동일할 경우에는 실행되지 않는다.
- structural 비교는 비교 대상이 배열일 경우 배열 내부까지 비교한다.
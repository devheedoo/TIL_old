# Utility Types

## `Partial<T>`

`T` 의 모든 프로퍼티를 선택 옵션으로 하는 타입을 생성한다.

```typescript
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
});
Readonly<T>
```

## `Readonly<T>`

`T` 의 모든 프로퍼티를 `readonly` 옵션으로 하는 타입을 생성한다.

`Object.freeze` 로 같은 효과를 얻을 수 있다:

```typescript
function freeze<T>(obj: T): Readonly<T>;
```

## `Record<K, T>`

`K` 의 프로퍼티들을 타입 `T` 로 생성한다.

```typescript
interface PageInfo {
    title: string;
}

type Page = 'home' | 'about' | 'contact';

const x: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    home: { title: 'home' },
};
```

## `Pick<T,K>`

`T` 에서 프로퍼티 집합 `K` 를 집어서 타입을 생성한다.

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};
```

## `Omit<T,K>`

`T` 의 프로퍼티를 복제하고 `K` 집합을 제거한 타입을 생성한다.

(이하 생략)

- `Exclude<T,U>` : `T` - `U`
- `Extract<T.U>` : `T` and `U`
- `NonNullable<T>` : `T` - `null` - `undefined`
- `ReturnType<T>` : return types of `T`
- `InstanceType<T>` : instance types of `T`
- `Required<T>` : required types of `T`
- `ThisType<T>` : this types fo `T`


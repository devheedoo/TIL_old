# Enums

## Enums

Enum은 상수들의 묶음을 정의한다.

### Numeric enums

`enum` 키워드를 사용한다. 첫 번째 인덱스를 따로 설정하지 않으면 0이다.

```typescript
enum Direction { Up = 1, Down, Left, Right, }
```

### String enums

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

문자열 enum은 코드 실행 전에는 값이 할당되지 않는다.

### Heterogeneous enums

```typescript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

권장하지 않음

### Computed and constant members

literal하거나 이러한 enum을 가공한 값들은 enum으로 사용 가능하다.

```typescript
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```

### Union enums and enum member types

(중략)
# Module Resolution

> 모듈에 대한 지식이 필요한 내용입니다.

Module Resolution 은 import 가 어떤 것을 참조하는지 결정하기 위해 컴파일러가 사용하는 프로세스다. `import { a } from "moduleA"` 구문이 있으면 컴파일러는 `a` 에 대해 알기 위해 `moduleA` 의 정의를 확인해야 한다.

`moduleA` 는 `.ts` / `.tsx` 파일에 있을 수도 있고, `.d.ts` 파일에 있을 수도 있다. 여기서도 찾지 못하면 오류가 발생한다.

## Relative vs. Non-relative module imports

모듈  import 는 경로가 상대적인지 아닌지에 따라 다르게 처리된다.

상대적인 import 는 해당 경로에서 파일을 찾으며 ambient 모듈 선언으로 처리할 수 없다. 런타임에도 경로에 문제가 없도록 잘 처리해야 한다.

절대적인 import 는 `baseURL` 이나 경로 매핑 또는 ambient 모듈 선언으로 처리할 수 있다. 외부의 의존성을 import 할 때는 절대경로를 사용하자.

## Module Resolution Strategies

### Classic

relative import in source file /root/src/folder/A.ts :

```typescript
import { b } from "./moduleB"
```

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`

non-relative import in source file /root/src/folder/A.ts :

```typescript
import { b } from "moduleB"
```

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`
3. `/root/src/moduleB.ts`
4. `/root/src/moduleB.d.ts`
5. `/root/moduleB.ts`
6. `/root/moduleB.d.ts`
7. `/moduleB.ts`
8. `/moduleB.d.ts`

(나머지 경우는 사전적 자료 - 생략)


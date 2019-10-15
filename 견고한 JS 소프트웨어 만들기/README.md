# 견고한 JS 소프트웨어 만들기

> 강좌: [견고한 JS 소프트웨어 만들기 - 김정환 | 인프런](https://www.inflearn.com/course/tdd-견고한-소프트웨어-만들기/dashboard)

카운터를 리팩토링하면서 [Jasmine](https://github.com/jasmine/jasmine)을 이용해 단위 테스트를 작성한다.

## 소개

JavaScript는 타입 없이 변수를 정의하고, 빌드가 없기 때문에 실행 시 에러를 확인할 수 있다. 따라서 테스트가 버그와 에러를 막는 최선의 선택지다.

- 단위: 특정 조건에서 어떻게 동작할 지 정의한 것을 말한다. 즉, JavaScript에서는 함수다.
- 단위 테스트 코드는 준비(arrange) - 실행(act) - 단언(assertion) 패턴으로 작성한다.
- 단위 테스트 작성 과정은 적-녹-청 순환식이다:
  - 적: 기능 구현 전에 테스트를 작성한다. 당연히 실패한다.
  - 녹: 테스트를 통과하도록 기능을 구현한다. 테스트는 성공한다.
  - 청: 통과한 코드를 더 나은 코드로 리팩토링한다.

## Jasmine

단위 테스트 라이브러리는 Node의 Mocha, React의 Jest, JavaScript의 Jasmine이 있다.

강의에서는 Jasmine을 사용한다:

- 중첩가능한 `describe` 문 안에 `it` 키워드로 테스트 스펙을 작성한다.
- `it` 문 안에서 `expect(결과값).toBe(기댓값);` 코드로 테스트한다.
- `spyOn()` 함수를 사용하면 특정 함수가 실행되는 경우를 지켜볼 수 있다.
- `expect(결과값).toThrowError();` 코드로 에러를 테스트할 수 있다.

## 기타 사항

- 단위 테스트를 위해 비즈니스 로직과 UI를 분리해야 하며, 별도의 JavaScript 파일로 관리한다.
- 모듈 패턴: 임의 함수 vs 즉시 실행 함수
- DRY: Don't Repeat Yourself
- SOLID:
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion


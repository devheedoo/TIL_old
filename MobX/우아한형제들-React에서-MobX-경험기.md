# React에서 MobX 경험기

http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html

MobX를 이해하는데 중점을 두고, Redux와 비교하는 부분은 정리에서 제외했습니다.

## 장점

- 객체지향적
- Spring 프레임워크와 유사한 구조
- Decorator 제공
- 캡슐화

## 사용 목적

- 다중 계층 컴포넌트에서 데이터 접근 용이성
- 컴포넌트에서 비즈니스 로직 분리

## 소개

### 동작 원리

1. 렌더링할 State를 관찰 대상으로 지정
2. State 변경을 감지
3. 리렌더링 등 파생되는 작업

### vs. Spring

| 레이어 구분      | MobX             | Spring        |
| ---------------- | ---------------- | ------------- |
| Service Layer    | Store            | Service       |
| Model Layer      | Model Class      | Entity or DTO |
| Repository Layer | Repository Class | Repository    |

- Store = Service
- Repository = Repository
- Model = Entity or DTO

**NOTE:** Store는 싱글톤으로 유지해야 합니다.

**NOTE:** Mobx의 Observable State가 작동하는 경우와 그렇지 않는 경우는 공식문서에 나와 있는 설명을 잘 살펴 보아야 합니다.분명히 @observable 데코레이터로 지정하고 값을 변경했는데 Rerendering이 되지 않는 경우의 케이스를 잘 파악해 놓아야 삽질을 피할 수 있습니다.

? `@Autobind`

## React로 프로젝트를 구성할 때 하는 고민들

*React + MobX + Material-UI 조합을 선택했습니다.*

효율적인 디렉토리 구조를 고민해서 결정했습니다:

- 기본적으로는 페이지별로 디렉토리를 나눴습니다. 페이지별로 template, container, module, style 폴더를 사용합니다.
- 공통 컴포넌트는 [Atomic Design](https://brunch.co.kr/@ultra0034/63) 개념을 도입해 구성했습니다. Atoms - Molecules - Organisms - Templates - Pages 단계로 나뉩니다.

일반적인 React 컴포넌트 유형 구분은 2가지입니다:

- 클래스형 컴포넌트: 내부에 state, lifecycle 메소드, props 모두 사용
- 함수형 컴포넌트: 내부에 state와 lifecycle 메소드 없이 props만 사용

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 글을 바탕으로 3가지 유형의 컴포넌트를 사용했습니다:

- Container 컴포넌트 - 컨트롤러 역할. Presentational 컴포넌트와 state, event 메소드를 연결
- Presentational 컴포넌트 - props만 이용해 HTML Template을 렌더링
- Component - 위 두 가지가 혼합된 형태

Front-End 특성상 UI 표현과 동작이 React 코드와 밀접하게 상호 작용을 합니다. MobX와 함께 사용하는 경우 Form Validation 라이브러리, Router 라이브러리 등과 궁합이 좋아야 합니다. Reactstrap, React-Bootstrap, Material-UI 중 Material-UI를 선택했습니다:

1. 모바일 환경까지 적용가능한 Google Material Design 스타일
2. CSS 변경해서 리빌드하지 않고 코드로 테마 변경 가능
3. JSS 방식 사용 가능
4. 향상된 UX (?)

Form Validation을 위해 `mobx-react-form` 라이브러리를 사용했습니다.

- [MobX React Form | GitHub](https://github.com/foxhound87/mobx-react-form)



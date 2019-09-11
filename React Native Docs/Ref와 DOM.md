# Ref와 DOM

> https://ko.reactjs.org/docs/refs-and-the-dom.html 에서 필요한 부분 정리

Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.

- 일반적인 데이터 플로우에서 벗어나 직접적으로 자식을 수정해야 하는 경우도 가끔씩 있습니다.
  - 수정할 자식이 React 컴포넌트의 인스턴스
  - 수정할 자식이 DOM 요소
- Ref의 바람직한 사용 사례는 다음과 같습니다.
  - 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때
  - 애니메이션을 직접적으로 실행시킬 때
  - 서드 파티 DOM 라이브러리를 React와 같이 사용할 때
- 함수 컴포넌트는 인스턴스가 없기 때문에 함수 컴포넌트에 ref 어트리뷰트를 사용할 수 없습니다.
- 부모 컴포넌트에게 DOM ref를 공개하기: [Forwarding Refs](https://ko.reactjs.org/docs/forwarding-refs.html)을 사용한다.
- 컴포넌트의 인스턴스가 마운트 될 때 React는 `ref` 콜백을 DOM 엘리먼트와 함께 호출합니다. 그리고 컴포넌트의 인스턴스의 마운트가 해제될 때, `ref` 콜백을 `null`과 함께 호출합니다. `ref` 콜백들은 `componentDidMount` 또는 `componentDidUpdate`가 호출되기 전에 호출됩니다.
- 인라인 함수로 선언되있다면 `ref` 콜백은 업데이트 과정 중에 처음에는 `null`로, 그 다음에는 DOM 엘리먼트로, 총 두 번 호출됩니다. 이러한 현상은 ref 콜백을 클래스에 바인딩된 메서드로 선언함으로써 해결할 수 있습니다.

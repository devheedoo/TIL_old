# CSS Diner

> 출처1: [선택자 공부 팁 - CSS](https://opentutorials.org/module/2367/13354)
>
> 출처2: [CSS Diner - Where we feast on CSS Selectors!](https://flukeout.github.io/)

- `A + B` : A 요소 바로 뒤에 있는 B 요소를 선택
- `A ~ B` : A 요소 뒤에 있는 모든 B 요소들을 선택
- `:first-child`, `:only-child`, `:last-child`, `:nth-child` : 자식 선택자
- `:first-of-type`, `:only-of-type`, `:last-of-type`, `:nth-of-type(An+B)` : 타입 선택자
- `:empty`, `:not` : 빈/반대 선택자
- `[attribute^="VALUE"]`, `[attribute$="VALUE"]`, `[attribute*="VALUE"]` : 속성명 시작/끝/포함 선택자
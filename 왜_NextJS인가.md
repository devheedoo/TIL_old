# 왜 NextJS인가?

> 아래 두 글을 읽고 정리했다:
> - [NextJS는 왜 쓰는 걸까?](https://velog.io/@rjs1197/NextJS-입문하기)
> - [SSR과 CSR의 차이를 알아보자](https://velog.io/@rjs1197/SSR과-CSR의-차이를-알아보자)

가장 큰 이유는 React 프로젝트에서 SSR(Server Side Rendering)을 하기위함이라고 할 수 있을 것이다.

## 웹페이지 렌더링 방식의 종류

| | Server Side Rendering | Client Side Rendering |
| ---| -------------------------- | ----------------------- |
| 약자 | SSR | CSR |
| 비슷한 의미의 용어 | 전통적인 렌더링 방식 | Single Page Application의 렌더링 방식 |
| 초기 로딩 속도 | 빠르다 | 느리다 |
| SEO | 유리하다 | 불리하다 |
| 초기 로딩 후 화면 전환 | 느리다 (서버 부담 크다) | 빠르다 (서머 부담 적다) |

> **SEO(Search Engine Optimization, 검색 엔진 최적화)**:
>
> 서비스가 검색 엔진에서 검색이 잘 되게 하는 과정을 검색 엔진 최적화라고 부른다. 그런데 렌더링 방식에 따라 이 과정에 차이점이 생긴다.
>
> 검색 엔진에 노출되려면 서비스가 검색 엔진에 등록되어야 한다. 그런데 CSR처럼 JS를 이용해 뷰를 생성하는 경우, 검색 엔진에 등록해주는 크롤러가 이 JS를 해석하는 과정이 필요하다. 상대적으로 노출이 줄어든다고 볼 수 있다.

NextJS는 이 외에도 다음과 같은 기능을 제공한다:

- Automatic code splitting for faster page loads
- Simple client-side routing (page based)
- Webpack-based dev environment which supports HMR(Hot Module Replacement)
- Able to implement with Express ro any other Node.js HTTP server
- Customizable with your own Bable and Webpack configurations

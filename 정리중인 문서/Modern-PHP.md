# Modern PHP

> 출처: [Modern PHP | SlideShare](https://www.slideshare.net/wan2land/modern-php-64855200)

PHP를 이용해 RSS 관련 기능 개발 중 PHP의 원리를 간략히나마 파악해야 할 필요가 생겨서 공부했고, 원하는 부분을 찾았다: `1 Request = 1 Process`

## Modern은 무엇일까요?

- 최신 버전
- 패키지 매니저
- PSR
- 설계 방법

## 최신 버전

- PHP 5.6까지는 지원 종료
- 6.x 버전은 없으며 현재 최신 버전은 7.x 버전대
- PHP의 동작 원리: 1 Request = 1 Process, 페이지 요청 시 프로그램을 처음부터 실행한다.
- 위의 문제를 (어떻게인지까지는 다음에...) 해결해서 PHP 7부터 성능이 크게 개선됐다.

## 패키지 매니저

PHP의 패키지 매니저는 **Composer** 이며 https://packagist.org/ 에서 운영 중이다.

## PSR

- PHP Standard Recommendation
- www.php-fig.org/psr

(?) 이렇게 설명 끝

## 설계 방법

### Routing

- 확장자 숨김
- 파일 한개 != 하나의 페이지
- RESTFul
- MVC
- slimeframework, laravel

### Testable / Container

- 의존성 주입 / Mocking 이 필요하다.
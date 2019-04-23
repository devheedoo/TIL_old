[How connection pooling works in Java and JDBC](<https://www.java-samples.com/showtutorial.php?tutorialid=203>)

**요약**
- Connection Pooling 기술은 데이터베이스 드라이버의 표준이 되었다.
새 연결을 만드려면 큰 비용이 든다.
- 대부분의 웹 어플리케이션에서 사용자들은 작은 DB 요청을 많이 보낸다.
연결은 짧게 발생하고, 사용자 세션은 자주 한계에 다다른다.
- 커넥션 풀 기술을 사용하면 어플리케이션 서버가 실행될 때 커넥션들을 많이 만든다.
이 커넥션들은 pool manager에 의해 관리된다.
사용자들에게 나눠줬다가 다시 풀에 반환한다.

**결론**
- **Connection Pooling**이란 커넥션들을 미리 만들어놓고, 요청에 따라 사용자들에게 커넥션들을 할당/수거하는 방식이다.
- 커넥션이 짧아지고, 많아진 요즘의 웹 환경에서 효율적인 방식이다.

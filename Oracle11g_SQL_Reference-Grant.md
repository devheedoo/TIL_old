Oracle DB를 구축하고 처음 사용할 때에는 대부분 아래와 같이 권한을 부여하고 사용한다.

```sql
GRANT DBA, RESOURCE, CONNECT TO [USERNAME];
```

하지만 사용자가 많아지고, 나중에 여러 개발자들이 하나의 Oracle DB에 접속하여 작업하다보면 여러 가지 이슈가 생길 수 있다:
- 사용자/테이블스페이스 목록을 관리할 수 없다. 사용자가 사용자와 테이블스페이스를 만들기 때문이다.
- 외부 개발자와 협업이 필요해 평소에 하던대로 계정을 만들었다. 그런데 그 계정도 모든 테이블스페이스를 접속/수정할 수 있다.
- 테이블스페이스의 인코딩을 변경하려고 구글링한 쿼리를 실행했다. 실수로 DB 전체의 인코딩 설정을 바꾸어버렸다.
- 혹시라도 보안망이 뚫릴 경우 사용자 중 하나만 접속이 되어도 DB 전체 권한을 얻을 수 있게 된다.

따라서 권한에 대해 이해하는 것은 매우 중요하다. 그리고 사용자를 생성할 경우에는 꼭 필요한 권한만 부여해야 한다.


https://docs.oracle.com/cd/E18283_01/server.112/e17118/statements_9013.htm#i2062318

> 권한을 부여하기 전에 먼저 사용자에게 줄 수 있는 권한(Privileges) 종류를 구분해야 한다.

### 권한

![grant::=](https://docs.oracle.com/cd/E18283_01/server.112/e17118/img/grant.gif)

권한 종류는 크게 2가지로 나뉜다:
- 시스템 권한(System Privilege)
- 객체 권한(Object Privilege)

#### 시스템 권한

데이터베이스 접속, 테이블스페이스 생성/변경 등과 같은 권한.

[Table 18-1 System Privileges](https://docs.oracle.com/cd/E18283_01/server.112/e17118/statements_9013.htm#BABEFFEE)

#### 객체 권한

SELECT, UPDATE, INSERT과 같은 권한.

[Table 18-2 Object Privileges and the Operations They Authorize](https://docs.oracle.com/cd/E18283_01/server.112/e17118/statements_9013.htm#BGBCIIEG)

### 역할

추가로 역할(role)이 있다. ~~처음에는 역할과 권한을 정확히 구분하지 못한 채 문서를 읽고 있었다.~~
- Oracle DB에서 미리 정의해놓은 역할
- 사용자가 정의한 역할

사용자에게 역할을 부여하면 그 역할에 정의된 권한을 사용할 수 있다. 권한 묶음이라고 볼 수 있다.

# create-react-app에서 MobX + decorator 사용하기

create-react-app으로 만든 애플리케이션에서 MobX + decorator 환경을 구성하는 방법입니다. 구글링하면서 몇 번 포기했다가 겨우 정리됐습니다. 다음 두 글의 내용에 일부를 더해서 정리한 글입니다:

- [MobX (2) 리액트 프로젝트에서 MobX 사용하기 | Velopert](https://velog.io/@velopert/MobX-2-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-MobX-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-oejltas52z)
- [Adding decorator support to Create React App projects using react-app-rewired | Michiel Sikma](https://medium.com/@michielsikma/adding-decorator-support-to-create-react-app-projects-using-react-app-rewired-df48e7ffd636)

설정만 완료한 상태의 저장소입니다.

- 

그럼 환경을 구성하는 방법을 차례대로 설명하겠습니다.

1. create-react-app 생성 후 경로 이동

```bash
$ npx create-react-app react-mobx-decorator
$ cd react-mobx-decorator
```

2. MobX, typescript 라이브러리 추가

```bash
$ yarn add mobx mobx-react
```

3. typescript 라이브러리 추가

```bash
$ yarn add typescript
```

4. decorator 사용하기 위한 라이브러리 추가

```bash
$ yarn add --dev customize-cra react-app-rewired @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators 
```

5. package.json dependencies와 같은 첫 번째 depth에 아래 내용 추가

```json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  },
```

6. package.json scripts 수정

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

7. root 경로에 tsconfig.json 파일 추가 및 작성

```json
{
  "compilerOptions": {
    "module": "esnext",
    "jsx": "preserve",
    "esModuleInterop": true,
    "sourceMap": true,
    "allowJs": true,
    "lib": [
      "es6",
      "dom"
    ],
    "rootDir": "src",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "target": "es5",
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
```

8. root 경로에 config-overrides.js 파일 추가 및 작성

```javascript
const { override, addDecoratorsLegacy } = require('customize-cra')

// Adds legacy decorator support to the Webpack configuration.
module.exports = override(addDecoratorsLegacy()) 
```

9. App.js 수정해서 테스트해보기

```react
import React from 'react'

// Decorator that passes on a 'message' property to a class.
const addMessage = (str) => (component) => {
  component.prototype.message = str
}

@addMessage('Hello world!')
class App extends React.PureComponent {
  render() {
    return <div>{ this.message }</div>
  }
}
export default App;
```


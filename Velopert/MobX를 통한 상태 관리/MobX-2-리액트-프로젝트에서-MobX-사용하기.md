# MobX (2) 리액트 프로젝트에서 MobX 사용하기

MobX를 리액트에서 사용하면:

- 글로벌 상태 관리가 쉽습니다.
- `setState`를 사용할 필요가 없습니다.

## 2-1. MobX가 리액트를 만나면

create-react-app은 기본적으로 decorator를 사용하기 못하기 때문에 babel 설정을 해줘야 합니다.

decorator 없이 리액트에서 MobX 사용하는 방법입니다.

1. 프로젝트 준비하기

   ```
   $ npx create-react-app mobx-with-react
   $ cd mobx-with-react
   $ yarn add mobx mobx-react
   $ yarn start
   ```

2. 카운터 만들기

   - decorate, observable, action, observer를 사용해서 카운터를 만듭니다.
   - observer를 사용하면 Observable State가 변경될 때마다 렌더링해서 성능상 걱정이 될 수 있지만 최적화가 잘 되어있어서 걱정할 필요가 없다고 합니다.
   - 스토어를 만들 필요 없이 컴포넌트에 바로 적용할 수 있습니다.

3. Decorator와 함께 사용하기

   - (본문과 다른 부분) 이 [링크](https://medium.com/@michielsikma/adding-decorator-support-to-create-react-app-projects-using-react-app-rewired-df48e7ffd636) 참고해서 create-react-app에 decorator를 적용합니다.
   - observable, action, observer를 decorator로 적용했더니 훨씬 깔끔합니다.

## 2-2. MobX 스토어 분리시키기

Redux와 다르게 MobX는 스토어를 여러 개 만들 수 있습니다. 카운터의 상태 관련 로직을 분리해봅시다.

1. 스토어 만들기

   ```javascript
   export default class CounterStore { ... }
   ```

2. Provider로 프로젝트에 스토어 적용

   ```react
   //...
   import { Provider } from 'mobx-react';
   import CounterStore from './stores/CounterStore';
   
   const counterStore = new CounterStore();
   
   ReactDOM.render(
     <Provider counterStore={counterStore}>
       <App />
     </Provider>,
     document.getElementById('root');
   )
   // ...
   ```

3. inject로 컴포넌트에 스토어 주입

   ```react
   // ...
   import { observer, inject } from 'mobx-react';
   
   @inject('counterStore')
   @observer
   class Counter extends Component {
     render() {
       const { counterStore } = this.props;
       return (
         <div> ... </div>
       );
     }
   }
   // ...
   ```

   다른 방식으로 inject

   ```react
   @inject(stores => ({
   	counter: stores.counterStore.counter,
     increase: stores.counterStore.increase,
     decrease: stores.counterStore.decrease,
   }))
   // ...
   const { counter, increase, decrease } = this.props;
   ```


# React Native FlatList 최적화

## Infinite Scroll with React Native FlatList

> 출처: https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

- 일정 개수만큼의 데이터만 로딩 후 `onEndReached` 속성을 이용해 맨 아래 닿았을 때 추가로 데이터 로딩
- 예제 따라하기: https://github.com/devheedoo/ReactNativeInfiniteFlatList

## How to improve RN's FlatList performance?

> 출처: https://github.com/filipemerker/flatlist-performance-tips

### Props

- `removeClippedSubviews`: 화면 바깥으로 나간 컴포넌트를 unmount할지 여부 / default: `false`
- `maxToRenderPerBatch`: 한 번에 `FlatList`로 넘기는 `VirtualizedList`의 데이터 개수 / default: `10`
- `updateCellsBatchingPeriod`: 컴포넌트 렌더링 최소 주기(ms) / default: `50`
- `initialNumToRender`: 최초에 렌더링할 항목 개수 (렌더링 안 되면 빈 항목 상태) / default: `10`
- `windowSize`: 가운데 포함해 위아래로 몇 개를 메모리에 저장할 지 / default: `21(위10 + 가운데1 + 아래10)`
- `legacyImplementation`: 데이터량이 적을 경우, `VirtualizedList` 대신 기존의 `ListView` 사용

### List Items

- simple, light components
- `shouldComponentUpdate`: `PureComponent`'s shallow comparison is expensive here. Create strict rules for comparison, checking only props that potentially change.
- cached optimized images: **react-native-fast-image** from @DylanVann
- `getItemLayout`: if same height, passing this prop removes the need to dynamically calculate it every time.

```javascript
getItemLayout = (data, index) => ({
  length: 70,
  offset: 70 * index,
  index
});
```

- `keyExtractor={item => item.id}`

> `getItemLayout` 예제 추가 조사 필요


# React Native FlatList 최적화

## Infinite Scroll with React Native FlatList

> https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

- 일정 개수만큼의 데이터만 로딩 후 `onEndReached` 속성을 이용해 맨 아래 닿았을 때 추가로 데이터 로딩
- 예제 따라하기: https://github.com/devheedoo/ReactNativeInfiniteFlatList

## How to improve RN's FlatList performance?

### Props

- `removeClippedSubviews`: `false(default)`
- `maxToRenderPerBatch`: from `10(default)` to `20`
- `updateCellsBatchingPeriod`: from `50(default)` to `1000`
- `initialNumToRender`: from `10(default)` to `20`
- `windowSize`: from `21(default, 10-1-10)`to `11(5-1-5)`

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


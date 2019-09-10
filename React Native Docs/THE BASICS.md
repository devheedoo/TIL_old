# React Native Docs: THE BASICS

> https://facebook.github.io/react-native/docs/getting-started

## Learn the Basics

### Hello World

```react
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}
```

### What's going on here?

- ES2015 (a.k.a. ES6)
- JSX + React Native Components

## Styles

```react
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}
```

- `StyleSheet` 속성
- You can also pass an array of styles - the last style in the array has precedence, so you can use this to inherit styles.

## Layout with Flexbox

Flexbox is designed to provide a consistent layout on different screen sizes.

You will normally use a combination of `flexDirection`, `alignItems`, and `justifyContent` to achieve the right layout.

### Flex

**Flex Direction** controls the direction in which the children of a node are laid out:

- `row`, `column`, `row-reverse`, `column-reverse`

### Layout Direction

**Justify Content** describes how to align children within the main axis:

- `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`

**Align Items** describes how to align children along the cross axis of their container.

etc...

## Using List Views

The **FlatList** component displays a scrolling list of changing, but similarly structured, data. FlatList works well for long lists of data, where the number of items might change over time. Unlike the more generic ScrollView, the FlatList only renders elements that are currently showing on the screen, not all the elements at once.

FlatList requires 2 props: `data` and `renderItem`.

If you want to render a set of data broken into logical sections, then a **SectionList** is the way to go.

## Networking

### Using Fetch

Request:

```react
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
```

Response:

- Fetch methods will return a `Promise`.
- `async / await` from ES2017

```react
async function getMoviesFromApi() {
  try {
    let response = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}
```

### Using Other Networking Libraries

- `XMLHttpRequest API`
- `WebSockets`

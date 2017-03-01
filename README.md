# ReactAutoScroll

This component is a simple react auto scroll component which should be wrapped around a scrollable component and requires a **ref** to the container that it will scroll vertically.

If you'd like to see more different kinds of easeTypes, then feel free to check out the github project.

### Basic Example with linear scrolling
```js
export default class ScrollExample extends Component {
  render() {
    return (
      <ReactAutoScroll
        targetPosition={900}
        easeType={'linear'}
        speed={5}
        updateInterval={40}
        onScrollingDone={() => console.log('scrolling finished')}
        scrollTargetRef={this.refs.scrollExample}
        isEnabled
      >
        <div
          ref="scrollExample"
          style={{ overflow: 'scroll', backgroundColor: 'red', width: '300px', height: '300px' }}
          >
           <div style={{ height: '2000px' }}>
            content
           </div>
         </div>
     </ReactAutoScroll>
    );
  }
}
```   
### Different scroll type

```js
  <ReactAutoScroll
    targetPosition={900}
    easeType={'accelerated'}
    speed={0.05}
    updateInterval={40}
    onScrollingDone={() => console.log('accelerated scrolling finished')}
    scrollTargetRef={this.refs.scrollExample}
    isEnabled
  >
```

### But im using the React Infinite scroll component?
This also works with the infinite scroll component, exactly the same way:
```js
  <ReactAutoScroll
    targetPosition={900}
    easeType={'accelerated'}
    speed={0.05}
    updateInterval={40}
    onScrollingDone={() => console.log('accelerated scrolling finished')}
    scrollTargetRef={this.refs.scrollExample}
    isEnabled
  >

    <Infinite ref="scrollExample">
      stuff
    </Infinite>
  </ReactAutoScroll>
```

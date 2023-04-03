#### React Keep Alive

```jsx
import { KeepAlive, keepAlive } from 'keep-alive';

const AliveHome = keepAlive(Home, 'home');
const AliveAbout = keepAlive(About, 'about');

const App = () => {
  return (
    <KeepAlive>
      <Routes>
        <Route path='/' Component={<AliveHome {...props} />} />
        <Route path='/about' Component={<AliveAbout {...props} />} />
      </Routes>
    </KeepAlive>
  )
}

```

###### 实现原理

🧝 React 在销毁组件时, 其下面的子组件也会一起销毁, 那么当发生路由切换等操作时, 如何能保证原先的页面不变?

🚴 React 是通过状态去驱动视图, 只要 state 发生变化, 那么组件就会重新渲染. 也就是说, 只要组件 state 不变, 页面也不会改变.  
但是组件被销毁后, 再次渲染 state 又会重新开始计算, 因此可以通过将组件视图依赖的关键数据迁移到不变的地方进行存储来保证重新渲染时视图不变. (context / mobx / 接口请求 ...)

🚴‍♂️ 将组件内容迁移至外层渲染, 并且将结果缓存起来, 等到需要的时候再拿出来给到组件所在位置, 那么在逻辑上应该也是可以实现的.  
React 中 ref 也可以传递一个 function, React 在 dom 挂载后会将当前 dom 节点通过参数的方式传入到这个函数中.  
这个 dom 节点是 React 暴露出来的, 内部会将组件状态和这个 dom 节点映射起来, 也就是说, 我触发 state 变更, 这个 dom 也会更新视图.  
那么, 将要缓存的组件迁移到外层渲染后, 将渲染后的 dom 节点保存起来, 当需要渲染时, 将保存的 dom append 到组件应该存在的位置上, 可以实现视图不变.

###### RUN

```bash
npm i
npm run dev
```


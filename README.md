# element-v-tooltip

基于 element-ui Vue2 的 v-tooltip 指令，inspired by [v-tooltip](https://github.com/Akryum/v-tooltip.git)

兼容使用 element-ui tooltip 的配置。增加了 overfow 的 modifier，在内容超出了容器才展示 tooltip

## 安装

```bash
yarn add element-v-tootip
```

全局作为 plugin 安装

```javascript
// main.js
import ElementVTooltip from "element-v-tooltip";

// 如果项目中没有 element-ui 需要手动引入css 
// import 'element-v-tooltip/lib/element-v-tooltip.css'

Vue.use(ElementVTooltip);
```

## 使用方法

```vue
// component.vue
<div v-tooltip.right="'苟利国家生死以'">Hover 出现 tooltip</div>

// or
<div v-tooltip.top.overflow="'只有当文字overflow 才会出现的tooltip'">
  一段有点长的文字23333333333
</div>

// or
<div
  v-tooltip="{
    content: 'random content',
    placement: 'bottom-end',
  }"
>Hover 出现 tooltip</div>
```

## Run Example

```bash
yarn && yarn serve
```

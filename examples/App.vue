<template>
  <div id="app" class="max-w-screen-md m-auto mb-20">
    <a href="https://github.com/daolanfler/element-v-tooltip" class="fixed right-0 top-0"
      ><img
        loading="lazy"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
    /></a>

    <h1 class="text-2xl font-bold">Example of element-v-tooltip</h1>
    <div class="example">
      <b>Example1: </b>
      <div style="width: 160px" v-tooltip.top="'苟利国家生死以'">
        Hover 出现 tooltip
      </div>
      <pre><code class="language-html">{{ code1 }}</code></pre>
    </div>

    <div class="example">
      <b>Example2: </b>
      <div
        class="w-fit"
        v-tooltip="{
          content: 'random content',
          placement: 'top-start',
        }"
      >
        Hover 出现 tooltip，通过对象配置
      </div>
      <pre><code class="language-html">{{ code2 }}</code></pre>
    </div>

    <div class="example">
      <b>Example3: </b>
      <div
        :style="{ width: `${width1}px` }"
        class="ellipsis"
        v-tooltip.top.overflow="'只有当文字overflow 才会出现的tooltip'"
      >
        一段有点长的文字23333333333
      </div>
      <div>
        <label style="display: block">调整文字块的宽度：</label>
        <input
          type="range"
          min="100"
          max="300"
          v-model="width1"
          style="margin-top: 8px"
        />
      </div>
      <pre><code class="language-html">{{ code3 }}</code></pre>
    </div>

    <div class="example">
      <b>Example4: </b>
      <div v-tooltip="config4" class="w-fit">
        一段歌词
      </div>
      <!-- <pre><code class="language-html">{{ code4 }}</code></pre> -->
      <highlightjs :code="code4" autodetect />
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import { code4 } from "./code-strings";

export default {
  name: "App",
  components: {},
  data() {
    return {
      width1: 100,
      config4: {
        contentRender(h) {
          return <span>May you stay forever young!</span>;
        },
        placement: "bottom",
      },
    };
  },
  computed: {
    code1() {
      return `<div>
  <b>Example1: </b>
  <div style="width: 160px" v-tooltip.top="'苟利国家生死以'">
    Hover 出现 tooltip
  </div>
</div>

`;
    },
    code2() {
      return `<div>
  <b>Example2: </b>
  <div
    style="width: 160px"
    v-tooltip="{
      content: 'random content',
      placement: 'top-start',
    }"
  >
    Hover 出现 tooltip
  </div>
</div>
`;
    },
    code3() {
      return `<div>
  <b>Example3: </b>
  <div
    :style="{ width: \`\${width1}px\` }"
    class="ellipsis"
    v-tooltip.top.overflow="'只有当文字overflow 才会出现的tooltip'"
  >
    一段有点长的文字23333333333
  </div>
  <div>
    <label style="display: block">调整文字块的宽度：</label>
    <input
      type="range"
      min="100"
      max="300"
      v-model="width1"
      style="margin-top: 8px"
    />
  </div>
</div>
`;
    },
    code4() {
      return code4;
    },
  },
  mounted() {
    hljs.highlightAll();
  },
};
</script>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app > div {
  margin: auto;
  margin-top: 20px;
  text-align: left;
}
.ellipsis {
  margin-top: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

pre {
  @apply bg-slate-200;
}
pre > code {
  @apply rounded;
}
.example > div {
  @apply mb-2;
}
.example > b {
  @apply mb-2 block;
}
</style>

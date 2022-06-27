<template>
  <div id="app">
    <div>
      <b>Example1: </b>
      <div style="width: 160px" v-tooltip.right="'苟利国家生死以'">
        Hover 出现 tooltip
      </div>
    </div>
    <div>
      <b>Example2: </b>
      <div
        style="width: 160px"
        v-tooltip="{
          content: 'random content',
          placement: 'bottom-end',
        }"
      >
        Hover 出现 tooltip
      </div>
    </div>
    <div>
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
    </div>
    <div>
      <b>Example4: </b>
      <div
        :style="{ width: `${width1}px` }"
        class="ellipsis"
        v-tooltip="config4"
      >
        一段歌词
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style>
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
</style>

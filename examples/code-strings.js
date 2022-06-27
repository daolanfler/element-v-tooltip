export const code4 = `<template>
  <div>
    <b>Example4: </b>
    <div v-tooltip="config4">
      一段歌词
    </div>
  </div>
</template>

<script>
  export default {
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
  }
</script>
 `;

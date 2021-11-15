<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="name">c</div>
    <svg-icon icon-class="config"></svg-icon>
    <!-- <div>
      <a-button type="primary"> Primary </a-button>
      <a-button>Default</a-button>
      <a-button type="dashed"> Dashed </a-button>
      <a-button type="danger"> Danger </a-button>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary"> 按钮 </a-button>
      </a-config-provider>
      <a-button type="primary"> 按钮 </a-button>
      <a-button type="link"> Link </a-button>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      name: 123,
      a: 1,
    };
  },
  methods: {
    handleClick() {
      console.log(123123);
    },
  },
};
</script>

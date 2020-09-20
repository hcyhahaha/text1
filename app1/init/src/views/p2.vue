<template>
  <div>
    <div>这是p2</div>
    <div class="router-link">
      <router-link to="/p2/pp2">pp2</router-link>&nbsp;
      <router-link to="/p2/pp2pp">pp2pp</router-link>&nbsp;
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style>
.router-link a {
  margin: 10px;
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  border-radius: 30px;
  background-color: thistle;
}
.tximg {
  width: 50px;
  height: 50px;
}
</style>

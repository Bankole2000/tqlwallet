<template>
  <div class="account">
    <!-- <h1>This is the account page</h1> -->
    <transition name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   console.log(this.$router);
  // },
};
</script>

<style>
</style>
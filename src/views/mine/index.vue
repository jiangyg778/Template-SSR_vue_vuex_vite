<!--  -->
<template>
  <el-button type="" @click="jump">跳转</el-button>
</template>

<script setup>
import {} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const jump = () => {
  router.push("/home");
};
</script>

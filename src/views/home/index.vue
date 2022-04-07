<!--  -->
<template>
  <h1>SSR测试</h1>
  <div class="content">
    <div class="item" v-for="(item, index) in store.state.list" :key="index">
      <!-- <p>{{ item.title }}</p> -->
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.pictureUrl" class="image" />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ item.title }}</time>
            <el-button type="text" class="button" @click="handleTest"
              >点击测试</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const handleTest = () => {
      console.log("点击测试");
    };
    return {
      store,
      handleTest,
    };
  },

  asyncData({ store }) {
    return store.dispatch("fetchList");
  },
});
</script>
<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  width: 32%;
  margin-bottom: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>

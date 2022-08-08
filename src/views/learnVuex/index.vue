<template>
  <div>
    <!-- 回顾和学习vuex -->
    <!-- 访问state-方式1-通过直接 -->
    <div>count={{ $store.state.count }}</div>
    <div>count={{ count }}</div>
    <div>age={{ age }}</div>
    <div>
      <!-- 可以，不推荐，不会保存数据，不方便维护 -->
      <!-- <button @click="$store.state.count++">+1</button> -->
      <button @click="$store.commit('add')">+1</button>
      <button @click="$store.commit('addN', 3)">+N</button>
      <!-- 方法二：访问mutations 通过映射  -->
      <button @click="add">+1</button>
      <button @click="addN(3)">+N</button>
    </div>
    <div>
      <!-- 访问 actions 方法1 直接 -->
      <button @click="$store.dispatch('addSync')">+1 sync</button>
      <!-- 方法二 通过映射 -->
      <button @click="addSync">+1 sync</button>
      <button @click="addSyncN(2)">+N sync</button>
    </div>
    <div>
      getters原始访问：{{ $store.getters.showCount }}
      <br />
      getters辅助函数：{{ showCount }}
    </div>
    <!-- 取模块当中的state -->
    <div>token={{ $store.state.test.token }}</div>
    <!-- 调用模块当中的方法 -->
    <!-- <button @click="$store.commit('setToken', 1234)">setToken</button> -->
    <!-- 调用时增加模块名前缀 -->
    <button @click="$store.commit('setToken', 1234)">setToken根模块</button>
    <button @click="$store.commit('test/setToken', 1234)">
      setToken test模块
    </button>
    <!-- 方法一 - 直接调用 -->
    <button @click="$store.commit('test/setToken', 1234)">setToken</button>
    <!-- 方法二 - 映射调用 -->
    <button @click="setToken(1223)">setToken</button>
    <!-- 方法一 - 直接调用 -->
    <button @click="$store.dispatch('test/login')">login</button>
    <!-- 方法二 - 映射调用 -->
    <button @click="login">login-映射调用</button>

    <!-- 图标的使用 -->
    <div>
      <svg-icon icon-class="eye" class-name="color-red"></svg-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'LearnVuex',
  comments: {},
  props: {},
  data() {
    return {}
  },
  // 访问state-方式2.1-通过成计算属性
  // 访问state-方式2.2-通过mapState批量生成计算属性
  computed: {
    ...mapGetters(['showCount']),
    ...mapState(['count', 'age'])
    /*
    count() {
        return this.$store.state.count
    },
    age() {
        return this.$store.state.age
    }
    */
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions('test', ['login']),
    ...mapActions(['addSync', 'addSyncN']),
    ...mapMutations(['add', 'addN']),
    ...mapMutations('test', ['setToken']) // 通过映射的方法调用模块当中的方法
  }
}
</script>
<style scoped>
.color-red {
  color: red;
}
</style>

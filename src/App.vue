<template>
  <div id="app"> 
    <div class="container">
      <router-view/>
    </div>  
  </div>
</template>
<script>
import token from './api/token'
export default {
  created () {
    this.validateToken()
  },
  methods: {
    validateToken(){
      if(token.get()&&!token.validate ()){
        token.clear()
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

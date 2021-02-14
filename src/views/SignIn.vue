<template>
    <div class="signin">
        <h2>Sign in</h2>
        <div class="input-form-wrapper">
            <el-input type="text" placeholder="Username" v-model="user.username"/>
        </div>
        <div class="input-form-wrapper">
            <el-input type="password" placeholder="Password" v-model="user.password"/>
        </div>
        <el-button @click="signIn">Signin</el-button>
        <p>You don't have an account?
            
        </p>
    </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        user: { 
          username: '',
          password: ''
        }
      }
    },
    methods: {
      signIn: async function () {
        await axios.post('http://localhost:8080/signin', )
          .then(() => this.$router.push('/'))
          .catch(error => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          })
      },
    }
  }
</script>
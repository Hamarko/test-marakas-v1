<template>
    <div> 
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <h2>Login</h2>
                <form @submit.prevent="performLogin()">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input 
                            type="email"
                            v-model="username" name="email"
                            class="form-control" :class="{ 'is-invalid': submitted && !emailValid  }"
                        />
                        <div v-show="!emailValid && submitted" class="invalid-feedback">
                            Invalid email. Password must contain at least @ character
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            v-model="password" 
                            name="password" 
                            class="form-control" :class="{ 'is-invalid': !passwordValid && submitted }"
                        />
                        <div v-show="!passwordValid && submitted" class="invalid-feedback">
                            Invalid password. Password must contain at least 6 characters                    
                        </div>                        
                    </div> 
                    <label v-show="isError" id="Invalid">
                        {{error}}
                    </label>                   
                    <div class="form-group">
                        <button class="btn btn-primary">Login</button>                
                    </div>
                </form>
            </div>
        </div>   
    </div>
</template>

<script>
import api from '../api/api'
import token from '../api/token.js'
export default {
    name: 'Login',
    data () {
        return {
            username: 'admin@test.com',
            password: 'admin123',
            submitted: false,
            emailValid: true,
            passwordValid: true,                     
            errorServer:null,
            autetication:true,
            error:''
        }
    },

    computed: {
      isError(){
          return this.error !==''
      }
    },
    created() {        
        if (token.get() && token.validate()) {
            if (typeof redirect !== 'undefined') {
                this.$router.push({ path: redirect })
            } else {
                this.$router.push({ path: '/home' })
            }
        }
    },
    methods: {
        clearError () {
            this.emailValid= true,
            this.passwordValid= true,
            this.errorCode = '';
        },
        setError(error){
            this.error = error
        },
        formValidate (){
            this.clearError ()
            this.emailValid = this.username.includes("@")            
            this.passwordValid = this.password.length > 6 
            return this.emailValid && this.passwordValid
        },
        async performLogin () {            
            this.submitted = true        
            let redirect = this.$route.query.redirect
            if (this.emailValid && this.passwordValid){                
                try{
                    let response = await api.post('http://dummy-api.d0.acom.cloud/api/auth/login', {
                        email: this.username,
                        password: this.password
                    })
                    token.set(response.data.access_token)
                    if (typeof redirect !== 'undefined') {
                        this.$router.push({ path: redirect })
                    } else {
                        this.$router.push({ path: '/home' })
                    }
                    return response
                }catch(error){
                    if(error.response.status === 401){
                        this.setError('Ivalid password or email')
                    }else{
                        this.setError('Internal server error. Please try later')
                    }                    
                }
            }                        
        },
    }
};
</script>
<style scoped>
    #Invalid {
      color: red ;  
    }
</style>
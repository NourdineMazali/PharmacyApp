<template>
    <div class="card-content">
        <form action="" method="POST" @submit.prevent="login">
            <div class="card card-login card-hidden">
                <div class="card-header text-center"   >
                    <h4 class="card-title">Login</h4>
                </div>
                <div v-if="error!== ''" class="alert alert-danger">
                    <button @click="clear" type="button" aria-hidden="true" class="close">
                        <i class="material-icons">close</i>
                    </button>
                    <span>
                        <b> Error - </b> {{ error }}
                    </span>
                </div>
                <div class="card-content">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-group label-floating">
                            <label class="control-label">Email address</label>
                            <input v-validate="'required|email'" name="email" v-model="auth.email" type="email" class="form-control" required>
                        </div>
                        <span v-show="vErrors.has('email')" class="text-danger">{{ vErrors.first('email') }}</span>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock_outline</i>
                        </span>
                        <div class="form-group label-floating">
                            <label class="control-label">Password</label>
                            <input v-validate="'required'" name="password" v-model="auth.password" type="password" class="form-control" required>
                        </div>
                        <span v-show="vErrors.has('password')" class="text-danger">{{ vErrors.first('password') }}</span>
                    </div>
                </div>
                <div class="footer text-center">
                    <button type="submit" class="btn btn-rose btn-simple btn-wd btn-lg">login</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                auth : {
                    email : '',
                    password : ''
                },
                error: ''
            }
        },
        methods: {
            clear() {
                this.error = '';
            },
            login() {
                this.$http.post(`${this.$apiHost}/login`, this.auth)
                    .then(res => {

                        this.$root.$emit(
                            'showNotification',
                            {
                                message:  `Authentication is successful`,
                                type:     'success',
                                time: 3000
                            }
                        );
                        // Redirect to Index
                         this.$router.push({ name: 'patients'});
                    }, err => {
                        this.error = err.response.data.message;
                    })
            }
        }
    }
</script>

<style scoped>

</style>
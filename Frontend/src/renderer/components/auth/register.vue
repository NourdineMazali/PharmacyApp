<template>
    <div class="card-content">
        <form class="form" method="POST" @submit.prevent="register" >
            <div class="card card-login card-hidden">
                <div class="card-header text-center"   >
                    <h4 class="card-title">Register</h4>
                </div>
                <div class="card-content">
                    <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">face</i>
                    </span>
                        <input name="full_name"
                               v-validate="'required'"
                               v-model="pharmacy.full_name"
                               type="text" class="form-control"
                               placeholder="Full Name...">
                        <span v-show="vErrors.has('full_name')" class="text-danger">{{ vErrors.first('full_name') }}</span>

                    </div>
                    <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">email</i>
                    </span>
                        <input name="email"
                               v-validate="'required'"
                               v-model="pharmacy.email"
                               type="text" class="form-control"
                               placeholder="Email...">
                        <span v-show="vErrors.has('email')" class="text-danger">{{ vErrors.first('email') }}</span>
                    </div>
                    <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">business</i>
                    </span>
                        <input name="pharmacy_name"
                               v-validate="'required'"
                               v-model="pharmacy.pharmacy_name"
                               type="text" class="form-control"
                               placeholder="Pharmacy name..."/>
                        <span v-show="vErrors.has('pharmacy_name')" class="text-danger">{{ vErrors.first('pharmacy_name') }}</span>
                    </div>
                    <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">pin_drop</i>
                    </span>
                        <input name="pharmacy_address"
                               v-validate="'required'"
                               v-model="pharmacy.pharmacy_address"
                               type="text" class="form-control"
                               placeholder="pharmacy Address..."/>
                        <span v-show="vErrors.has('pharmacy_address')" class="text-danger">{{ vErrors.first('pharmacy_address') }}</span>
                    </div>
                    <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">lock_outline</i>
                    </span>
                        <input name="password"
                               v-validate="'required'"
                               v-model="pharmacy.password"
                               type="password"
                               placeholder="Enter password..." class="form-control" />
                        <span v-show="vErrors.has('password')" class="text-danger">{{ vErrors.first('password') }}</span>
                    </div>
                    <!-- If you want to add a checkbox to this form, uncomment this code -->
                    <div class="checkbox">
                        <label>
                            <input name="agreed"
                                   v-validate="'required'"
                                   v-model="pharmacy.agreed"
                                   type="checkbox">
                            I agree to the <a href="#something">terms and conditions</a>.
                            <span v-show="vErrors.has('agreed')" class="text-danger">
                            You must agree with the Terms and Conditions
                        </span>

                        </label>
                    </div>
                </div>
                <div class="footer text-center">
                    <button type="submit" class="btn btn-rose btn-simple btn-wd btn-lg">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                pharmacy: {
                    password: '',
                    full_name: '',
                    email: '',
                    pharmacy_name: '',
                    pharmacy_address: '',
                    agreed: 0,
                }
            }
        },
        methods: {
            register() {
                this.$http.post(`${this.$apiHost}/pharmacies`, this.pharmacy)
                    .then(res => {
                        // Redirect to Index
                        this.$root.$emit(
                            'showNotification',
                            {
                                message:  `You have successfully registered, try to login`,
                                type:     'success',
                                time: 3000
                            }
                        );
                        this.$router.push({ name: 'patients'});
                        //login

                    }, err => {

                    })
            }
        }
    }
</script>

<style scoped>

</style>
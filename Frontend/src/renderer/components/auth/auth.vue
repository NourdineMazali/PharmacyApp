<template>
    <div class="col-md-10 col-md-offset-1">
        <div class="card card-signup">
            <h2 class="card-title text-center">Welcome to Staged Supply</h2>
            <div class="row">
                <div class="col-md-5 col-md-offset-1">
                    <login></login>
                </div>
                <div class="col-md-5">
                    <register></register>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import login from './login'
    import register from './register'
    export default {
        name: "auth",
        components: {
            login,
            register
        }
    }
</script>

<style scoped>

</style>
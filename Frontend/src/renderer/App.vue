<template>
    <!--<div v-if="isAuth">-->
        <!--<auth></auth>-->
    <!--</div>-->
    <div>
        <!--<nav v-if="isAuth" class="navbar navbar-primary navbar-transparent navbar-absolute">-->
            <!--<div class="container">-->
                <!--<div class="navbar-header">-->
                    <!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">-->
                        <!--<span class="sr-only">Toggle navigation</span>-->
                        <!--<span class="icon-bar"></span>-->
                        <!--<span class="icon-bar"></span>-->
                        <!--<span class="icon-bar"></span>-->
                    <!--</button>-->
                    <!--<a class="navbar-brand" href=" ../dashboard.html ">Material Dashboard Pro</a>-->
                <!--</div>-->
                <!--<div class="collapse navbar-collapse">-->
                    <!--<ul class="nav navbar-nav navbar-right">-->
                        <!--<li>-->
                            <!--<a href="../dashboard.html">-->
                                <!--<i class="material-icons">dashboard</i> Dashboard-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li class="">-->
                            <!--<router-link :to="{ 'name' : 'register'}">-->
                                <!--Register-->
                            <!--</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</div>-->
        <!--</nav>-->
        <div
                :class="{
            'wrapper' : true,
            'wrapper-full-page': isAuth
         }"
        >
            <div
                    v-if="!isAuth"
                    class="sidebar"
                    data-active-color="rose"
                    data-background-color="black"
                    v-bind:data-image="sidebar_img"
            >
                <div class="logo">
                    <a href="/" class="simple-text">
                        Staged Supply
                    </a>
                </div>
                <div class="logo logo-mini">
                    <a href="/" class="simple-text">
                        SS
                    </a>
                </div>
                <div class="sidebar-wrapper">
                    <ul class="nav">
                        <li>
                            <router-link to="/patients">
                                <i class="material-icons">dashboard</i>
                                <p>Clients</p>
                            </router-link>
                        </li>

                    </ul>
                </div>
            </div>
            <div
            :class="{
                // 'full-page login-page' : isAuth,
                'main-panel' : !isAuth
            }"
            filter-color="black"
            >
                <nav v-if="!isAuth" class="navbar navbar-transparent navbar-absolute">
                    <div class="container-fluid">
                        <div class="navbar-minimize">
                            <button id="minimizeSidebar" class="btn btn-round btn-white btn-fill btn-just-icon">
                                <i class="material-icons visible-on-sidebar-regular">more_vert</i>
                                <i class="material-icons visible-on-sidebar-mini">view_list</i>
                            </button>
                        </div>
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" @click="$router.go(-1)">Back</a>
                            <a class="navbar-brand" @click="$router.go(+1)">Next</a>
                            <div v-if="!isLoggedIn">
                                <a href="#/auth/login">Login</a>
                                <a href="#/auth/register">Register</a>
                            </div>
                        </div>
                        <div class="collapse navbar-collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#pablo" class="dropdown-toggle" data-toggle="dropdown">
                                        <i class="material-icons">dashboard</i>
                                        <p class="hidden-lg hidden-md">Dashboard</p>
                                    </a>
                                </li>

                            </ul>
                            <form class="navbar-form navbar-right" role="search">
                                <div class="form-group form-search is-empty">
                                    <input type="text" class="form-control" placeholder="Search">
                                    <span class="material-input"></span>
                                </div>
                                <button type="submit" class="btn btn-white btn-round btn-just-icon">
                                    <i class="material-icons">search</i>
                                    <div class="ripple-container"></div>
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
                <div class="content">
                    <div
                        :class="{
                            'container' : isAuth
                        }">
                        <div
                        :class="{
                              'row' : isAuth,
                              'container-fluid' : !isAuth
                        }"
                                id="app">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from './components/auth/auth'

    export default {
        name: 'my-project',
        components: {auth},
        computed: {
            path() {
                return this.$route.name;
            }
        },
        watch: {
            path() {
                this.isAuth =
                    this.$route.name  === 'login' ||
                    this.$route.name  === 'register' ||
                    this.$route.name  === 'auth';
            }
        },
        data () {
            return {
                isAuth: false,
                sidebar_img: 'static/img/sidebar-1.jpg',
                isLoggedIn: false
            }
        },
        created() {
            this.isAuth = this.$route.name  === 'login' || this.$route.name  === 'register';

            this.$root.$on('showNotification', (notification) => {
                return this.showNotification(notification)
            });
        },
        methods: {
            showNotification(notification){
                let type = ['','info','success','warning','danger','rose','primary'];

                $.notify({
                    icon: "notifications",
                    message: notification.message

                },{
                    type: notification.type,
                    timer: notification.timer,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            },
            logout() {
                return this.$router.push({name : 'login'});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
    @import 'assets/css/bootstrap.min.css';
    @import 'assets/css/material-dashboard.css';
</style>

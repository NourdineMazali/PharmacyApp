<template>
    <div class="row">
        <div class="col-md-12">
            <router-link
                    class="btn btn-primary btn-raised btn-round add-new-supply"
                    :to="newUrl"
                 >
                Add new Supply
            </router-link>
            <!-- supplies list -->
            <list></list>
            <!--  End supplies list -->

            <!-- Modal -->
            <router-view></router-view>
            <!--<new-supply :action="action" />-->
            <!--  End Modal -->
        </div>
    </div>
</template>

<script>
    import list from './../supplies/list';
    import NewSupply from "./../supplies/newSupply";

    export default {
        name: "prescription",
        components: {list, NewSupply},
        data() {
            return {
                balance : 0,
                action: 'add',
                newUrl : ''
            }
        },
        created() {
            this.newUrl = `/patients/${this.$global.patient._id}/prescriptions/${this.$global.prescription._id}/new`;
            this.$root.$on('edit-supply', ()=> {
                this.action = 'edit';
                this.$router.push(`/patients/${this.$global.patient._id}/prescriptions/${this.$global.prescription._id}/edit`)
            });
            //calculate balance
            this.balance = this.$global.prescription.balance
                - (this.$global.prescription.dose * (this.$global.prescription.supplies.length));
        }
    }
</script>

<style scoped>

</style>
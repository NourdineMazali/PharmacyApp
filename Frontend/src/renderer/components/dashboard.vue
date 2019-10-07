<template>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-primary btn-raised btn-round add-new-supply" data-toggle="modal" data-target="#myModal">
                Add new Supply
            </button>
            <div class="card">
                <div class="card-header card-header-icon" data-background-color="rose">
                    <i class="material-icons">assignment</i>
                </div>
                <h4 class="card-title">john's Instalments</h4>

                <div class="card-content">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>No Days</th>
                                <th class="">No Tabs</th>
                                <th class="">Balance</th>
                                <th class="">Pharmacist Signature</th>
                                <th class="">Consumer Signature</th>
                                <th class="">Notes</th>
                                <th class="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="supply in supplies">
                                <td>{{ _formatToDate(supply.createdAt) }}</td>
                                <td>{{ _formatToTime(supply.createdAt) }}</td>
                                <td>4</td>
                                <td>{{ supply.tabs }}</td>
                                <td></td>
                                <td>
                                    <img :src="supply.phar_signature"/>
                                </td>
                                <td>
                                    <img :src="supply.cust_signature" />
                                </td>
                                <td>{{ supply.notes }}</td>
                                <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" class="btn btn-simple btn-info">
                                        <i class="material-icons">person</i>
                                    </button>
                                    <button type="button" rel="tooltip" class="btn btn-simple btn-success">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" class="btn btn-simple btn-danger">
                                        <i class="material-icons">close</i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <new-supply
                    class="modal fade"
                    id="myModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
            >

            </new-supply>
            <!--  End Modal -->
        </div>
    </div>
</template>

<script>
    import NewSupply from "./supply/newSupply";

    export default {
        name: "dashboard",
        components: {NewSupply},
        data(){
            return {
                supplies: {},
                error: ''
            }
        },
        created() {
            this.getSupplies();
        },
        methods: {
            getSupplies() {
                this.$http.get('http://localhost:3001/supplies')
                    .then(res => {
                        this.supplies = res.data;
                    }, error => {
                        this.error = error;
                        console.log(this.error);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
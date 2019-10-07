<template>
    <div class="row">
        <div class="col-md-12">
            <!-- prescription form -->
            <div class="card">

                        <div class="card-content">
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="headingOne">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <div class="card-header card-header-icon" data-background-color="rose">
                                                <i class="material-icons">border_color</i>
                                            </div>
                                            <h4 class="card-title">New Prescription
                                                <i class="material-icons">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>
                                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                        <div class="panel-body">
                                            <new-prescription>
                                            </new-prescription>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            <!--  End prescription form -->

            <!--prescriptions list for this patient-->
                <list>
                </list>
            <!--end prescriptions list for this patient-->

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NewPrescription from "./../prescriptions/new";
    import list from "./../prescriptions/list";

    export default {
        name: "patient",
        components: {
            NewPrescription,
            'list': list
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
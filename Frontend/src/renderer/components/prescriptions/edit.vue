<template>
    <!-- Modal -->
    <div
        class="modal fade"
        id="prescriptionModal"
        tabindex="-1"
        role="dialog"
        data-backdrop="false"
        aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="close">
                        <i class="material-icons">clear</i>
                    </button>

                    <h4 class="modal-title">Edit Prescription</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                            <form id="TypeValidation" class="form-horizontal" @submit.prevent="edit">
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <input class="form-control"
                                               v-model="prescription.name"
                                               v-validate="'required'"
                                               type="text"
                                               placeholder="Medicine name"
                                               required="true"
                                               name="prescription_name"
                                               ref="prescriptionName"
                                        />
                                        <span v-show="vErrors.has('prescription_name')" class="text-danger">
                                                {{ vErrors.first('prescription_name') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <select
                                                v-model="prescription.type"
                                                name="prescription_type"
                                                v-validate="'required'"
                                                class="form-control"
                                        >
                                            <option selected value="-1">Medicine type</option>
                                            <option v-for="med in $medsTypes" v-bind:value="med.name"> {{ med.name}} </option>
                                        </select>
                                        <span v-show="vErrors.has('prescription_type')" class="text-danger">
                                                {{ vErrors.first('prescription_type') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <input class="form-control"
                                               v-model="prescription.prescribed_by"
                                               v-validate="'required'"
                                               type="text"
                                               placeholder="prescribed by"
                                               name="prescribed_by"
                                        />
                                        <span v-show="vErrors.has('prescribed_by')" class="text-danger">
                                                {{ vErrors.first('prescribed_by') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <select
                                                v-model="prescription.schedule"
                                                name="schedule"
                                                v-validate="'required'"
                                                class="form-control"
                                        >
                                            <option selected value="-1">Schedule</option>
                                            <option v-for="s in $schedules" v-bind:value="s.id"> {{ s.name}} </option>
                                        </select>
                                        <span v-show="vErrors.has('schedule') || parseInt(prescription.schedule) === -1" class="text-danger">
                                                {{ vErrors.first('schedule') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <input class="form-control"
                                               v-model="prescription.balance"
                                               v-validate="'required'"
                                               type="number"
                                               placeholder="balance"
                                               name="balance"
                                        />
                                        <span v-show="vErrors.has('balance')" class="text-danger">
                                                {{ vErrors.first('balance') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <input class="form-control"
                                               v-model="prescription.dose"
                                               v-validate="'required'"
                                               type="number"
                                               placeholder="Dose"
                                               name="dose"
                                        />
                                        <span v-show="vErrors.has('dose')" class="text-danger">
                                                {{ vErrors.first('dose') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <button type="submit" class="btn btn-rose btn-fill">Edit prescription</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit",
        data() {
            return {
                prescription: {
                    name: '',
                    type: -1,
                    schedule: -1,
                    prescribed_by: '',
                    patient_id: this.$global.patient._id
                },
                status: 0,
                errors: {}
            }
        },
        mounted() {
            $('#prescriptionModal').modal('show');
        },
        created() {
            console.log(this.$global.prescription);
            this.prescription = this.$global.prescription;
        },
        methods: {
            edit() {
                this.$http.put(`${this.$apiHost}/medicines/${this.$global.prescription._id}`, this.prescription)
                    .then(
                        res => {
                            this.$root.$emit(
                                'showNotification',
                                {
                                    message: `Prescription ${this.$global.prescription.name} updated successfully`,
                                    type: 'success',
                                    time: 3000
                                }
                            );
                            //Update supplies list
                            this.$root.$emit('refresh-prescription-list');
                            //close modal
                            this.close();
                        },
                        err => {

                        }
                    )
            },
            close() {
                this.$router.push({name: 'patient', patientId: this.$global.patient._id});
                $('#prescriptionModal').modal('hide');
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <!-- Classic Modal -->
    <div class="">

        <div class="row">
            <form id="TypeValidation" class="form-horizontal" @submit.prevent="saveMedicine">
                <div class="col-md-3">
                    <div class="form-group label-floating is-empty">
                        <label class="control-label"></label>
                        <input class="form-control"
                               v-model="medicine.name"
                               v-validate="'required'"
                               type="text"
                               placeholder="Medicine name"
                               required="true"
                               name="medicine_name"
                               ref="medicineName"
                        />
                        <span v-show="vErrors.has('medicine_name')" class="text-danger">
                            {{ vErrors.first('medicine_name') }}
                        </span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group label-floating is-empty">
                        <label class="control-label"></label>
                        <select
                                v-model="medicine.type"
                                name="medicine_type"
                                v-validate="'required'"
                                class="form-control"
                        >
                            <option selected value="-1">Medicine type</option>
                            <option v-for="med in $medsTypes" v-bind:value="med.name"> {{ med.name}} </option>
                        </select>
                        <span v-show="vErrors.has('medicine_type')" class="text-danger">
                            {{ vErrors.first('medicine_type') }}
                        </span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group label-floating is-empty">
                        <label class="control-label"></label>
                        <input class="form-control"
                               v-model="medicine.prescribed_by"
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
                                v-model="medicine.schedule"
                                name="schedule"
                                v-validate="'required'"
                                class="form-control"
                        >
                            <option selected value="-1">Schedule</option>
                            <option v-for="s in $schedules" v-bind:value="s.id"> {{ s.name}} </option>
                        </select>
                        <span v-show="vErrors.has('schedule') || parseInt(medicine.schedule) === -1" class="text-danger">
                            {{ vErrors.first('schedule') }}
                        </span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group label-floating is-empty">
                        <label class="control-label"></label>
                        <input class="form-control"
                               v-model="medicine.balance"
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
                               v-model="medicine.dose"
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
                        <input class="form-control"
                               v-model="medicine.initial_balance"
                               v-validate="'required'"
                               type="number"
                               placeholder="Initial Balance"
                               name="initial_balance"
                        />
                        <span v-show="vErrors.has('initial_balance')" class="text-danger">
                            {{ vErrors.first('initial_balance') }}
                        </span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group label-floating is-empty">
                        <label class="control-label"></label>
                        <button type="submit" class="btn btn-rose btn-fill">Save prescription</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="alert alert-success" v-if="status === 1">
            <button type="button" aria-hidden="true" class="close" @click="close" >
                <i class="material-icons">close</i>
            </button>
            <span>
                <b> Success - </b> The prescription is successfully saved!
            </span>
        </div>
        <div class="alert alert-danger" v-if="status === 2">
            <button type="button" aria-hidden="true" class="close" @click="close">
                <i class="material-icons">close</i>
            </button>
            <span>
                <b> Error - </b> Please fix the following the validation errors
            </span>
        </div>
    </div>
    <!--  End Modal -->
</template>

<script>
    export default {
        name: "new-prescription",
        data(){
            return {
                medicine: {
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
        methods: {
            saveMedicine(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$http.post('http://localhost:3001/medicines', this.medicine)
                            .then( res => {
                                this.status = 1;
                                //refresh list
                                this.$root.$emit('refresh-prescription-list');
                                //clear fields
                                this.clear();
                                /*focus*/
                                this.$refs.medicineName.focus();

                            }, err => {
                                this.status = 2;

                            });
                    }else {
                        this.status = -2;
                    }
                });
            },
            clear() {
                this.medicine = {
                    name: '',
                    type: '',
                    prescribed_by: ''
                };
                //clear validation errors
                this.$nextTick()
                    .then(() => {
                        this.$validator.reset();
                        this.vErrors.clear();
                    });
            },
            close() {
                this.status = 0
            }
        }
    }
</script>

<style scoped>

</style>
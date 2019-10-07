<template>
    <div class="row col-sm-8 col-sm-offset-2">
        <div class="col-md-12">
            <div class="card">
                <form id="LoginValidation" action="" method="" @submit.prevent="savePatient">
                    <div class="card-header card-header-icon" data-background-color="rose">
                        <i class="material-icons">contacts</i>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title">New Patient</h4>
                        <a @click="fill" >fill</a>
                        <div class="form-group label-floating">
                            <label class="control-label">First name
                                <span>*</span>
                            </label>
                            <input
                                    class="form-control"
                                    v-model="patient.first_name" name="first_name"
                                    type="text"
                                    v-validate="'required'"
                                    required="true" />
                            <span v-show="vErrors.has('first_name')" class="text-danger">
                                {{ vErrors.first('first_name') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">Last name
                                <span>*</span>
                            </label>
                            <input class="form-control" v-validate="'required'" v-model="patient.last_name" name="last_name" type="text" required="true" />
                            <span v-show="vErrors.has('last_name')" class="text-danger">
                                {{ vErrors.first('last_name') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">Phone Number
                                <span>*</span>
                            </label>
                            <input class="form-control" v-validate="'required'" v-model="patient.phone_number" name="phone_number" required="true" />
                            <span v-show="vErrors.has('phone_number')" class="text-danger">
                                {{ vErrors.first('phone_number') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                Email
                            </label>
                            <input class="form-control" v-validate="'required'" v-model="patient.email" name="email" required="true" />
                            <span v-show="vErrors.has('email')" class="text-danger">
                                {{ vErrors.first('email') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                Medicare Number
                            </label>
                            <input class="form-control" v-validate="'required'" v-model="patient.medicare_num" name="medicare_num" required="true" />
                            <span v-show="vErrors.has('medicare_num')" class="text-danger">
                                {{ vErrors.first('medicare_num') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                Address
                            </label>
                            <textarea rows="5" class="form-control" v-validate="'required'" v-model="patient.address" name="address" required="true" />
                            <span v-show="vErrors.has('address')" class="text-danger">
                                {{ vErrors.first('address') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                Concession Card N
                            </label>
                            <input class="form-control" type="text" v-validate="'required'" v-model="patient.concession_num" name="concession_num" required="true" />
                            <span v-show="vErrors.has('concession_num')" class="text-danger">
                                {{ vErrors.first('concession_num') }}
                            </span>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                Fee
                            </label>
                            <input class="form-control" type="number" v-model="patient.fee" name="fee" required="true" />
                        </div>
                        <div class="category form-category">
                            <span>*</span> Required fields</div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-rose btn-fill btn-wd">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit"
    }
</script>

<style scoped>

</style>
<template>
    <!-- Modal -->
    <div
        class="modal fade"
        id="myModal"
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

                    <h4 class="modal-title">New Supply</h4>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <form id="TypeValidation" class="form-horizontal" @submit.prevent="add">
                            <div class="card-content">

                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Medicine</label>
                                    <div class="col-sm-10">
                                        <div class="form-group label-floating">
                                            <label class="control-label"></label>
                                            <input type="text" disabled class="form-control" :value="$global.prescription.name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Date Time</label>
                                    <div class="col-sm-10">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <div class="form-group label-floating is-empty">
                                                    <label class="control-label"></label>
                                                    <input
                                                        class="form-control"
                                                        v-model="supply.date"
                                                        v-validate="'required'"
                                                        :disabled="action==='edit'"
                                                        type="text"
                                                        name="date"
                                                        placeholder="Date"
                                                    >
                                                    <span v-show="vErrors.has('date')" class="text-danger">{{ vErrors.first('date') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="form-group label-floating is-empty">
                                                    <label class="control-label"></label>
                                                    <input
                                                       v-model="supply.time"
                                                       v-validate="'required'"
                                                       :disabled="action==='edit'"
                                                       type="text"
                                                       name="time"
                                                       class="form-control"
                                                       placeholder="Time"
                                                    >
                                                    <span v-show="vErrors.has('time')" class="text-danger">{{ vErrors.first('time') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Tabs</label>
                                    <div class="col-sm-10">
                                        <div class="form-group label-floating">
                                            <label class="control-label"></label>
                                            <input class="form-control"
                                                   v-model="supply.tabs"
                                                   v-validate="'required|numeric'"
                                                   type="number"
                                                   name="tabs"
                                                   number="true" />
                                            <span v-show="vErrors.has('tabs')" class="text-danger">{{ vErrors.first('tabs') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Notes</label>
                                    <div class="col-sm-10">
                                        <div class="form-group label-floating">
                                            <label class="control-label"></label>
                                            <textarea class="form-control"
                                                      v-model="supply.notes"
                                                      type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="action === 'add'">
                                    <label class="col-sm-2 label-on-left">Signatures</label>
                                    <div class="col-sm-10">
                                            <div class="col-md-5">
                                                <div class="form-group label-floating">

                                                <label class="control-label">Pharmacist</label>
                                                    <canvas
                                                            class="col-sm-12 signature"
                                                            ref="pharmacist_canvas"
                                                            v-on:mouseup="saveSignature('pharmacist')"
                                                    >
                                                    </canvas>
                                                </div>

                                                <span v-show="vErrors.has('pharmacist_signature')" class="text-danger">
                                                        {{ vErrors.first('pharmacist_signature') }}
                                                    </span>
                                                    <button type="button"
                                                        @click='clear("pharmacist")'
                                                        class="btn btn-danger btn-simple">Undo
                                                    </button>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Patient</label>
                                                    <canvas
                                                            ref="customer_canvas"
                                                            class="col-sm-12 signature"
                                                            v-on:mouseup="saveSignature('customer')"
                                                    >
                                                    </canvas>
                                                </div>

                                                <button type="button"
                                                    @click='clear("customer")'
                                                    class="btn btn-danger btn-simple">Undo</button>
                                                    <span v-show="vErrors.has('customer_signature')" class="text-danger">
                                                        {{ vErrors.first('customer_signature') }}
                                                    </span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit"  @click="exec" class="btn btn-success btn-fill">{{this.action}}</button>
                     <button type="button" class="btn btn-danger btn-simple" @click="close">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!--  End Modal -->
</template>

<script>
    import SignaturePad from 'signature_pad';

    export default {
        name: "new-supply",
        data() {
            return {
                supply: {
                    prescription_id: this.$global.prescription._id,
                    date: this._formatToDate(Date.now()),
                    time: this._formatToTime(Date.now()),
                    notes: null,
                    tabs: null,
                    signature: {
                        customer: null,
                        pharmacist: null
                    },
                },
                pad: {
                    customer: null,
                    pharmacist: null,
                },
                action : 'add'
            };
        },
        mounted() {
            $('#myModal').modal('show');

            let canvas          = document.querySelectorAll('canvas');
            this.pad.pharmacist =  new SignaturePad(canvas[0]);
            this.pad.customer   =  new SignaturePad(canvas[1]);
            console.log(this.$validator);
        },
        created() {
            this.action = this.$route.name  === 'editSupply'? 'edit' : 'add';
            if(this.action === 'edit') {
                this.supply.notes = this.$global.supply.notes;
                this.supply.tabs = this.$global.supply.tabs;
                this.supply.prescription_id = this.$global.prescription._id;
                this.supply.date = this._formatToDate(this.$global.supply.createdAt);
                this.supply.time = this._formatToTime(this.$global.supply.createdAt)
            }
        },
        methods: {
            clear(ref){
                if(ref === 'customer') {
                    this.pad.customer.clear();
                    this.supply.signature.customer = null;
                }
                else if(ref === 'pharmacist')  {
                    this.pad.pharmacist.clear();
                    this.supply.signature.pharmacist = null;
                }

            },
            saveSignature: function(ref) {
                if(ref === 'customer') {
                    this.supply.signature.customer = this.pad.customer.toDataURL();
                }
                else if(ref === 'pharmacist')  {
                    this.supply.signature.pharmacist = this.pad.pharmacist.toDataURL();
                }
            },
            exec() {
                switch (this.action) {
                    case 'add' :
                        this.add();
                        break;
                    case 'edit' :
                        this.edit();
                        break;
                }
            },
            edit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$http.put(`${this.$apiHost}/supplies/${this.$global.supply._id}`,
                            {
                                notes : this.supply.notes,
                                tabs : this.supply.tabs
                            })
                            .then( res =>{
                                this.$root.$emit(
                                    'showNotification',
                                    {
                                        message: `Supply for medicine ${this.$global.prescription.name} updated successfully`,
                                        type: 'success',
                                        time: 3000
                                    }
                                );
                                //Update supplies list
                                this.$root.$emit('refresh-supplies-list');
                                //update global prescription's supplies
                                this.$global.prescription.supplies.unshift(res.data._id);
                                //close modal
                                this.close();

                            }, err => {
                                console.log(err.data);
                            });
                        return;
                    }
                });
            },
            add() {
                if(this.supply.signature.pharmacist === null) {
                    this.$validator.errors.add('pharmacist_signature', 'Pharmacist Signature is required', 'input')
                }
                if(this.supply.signature.customer === null) {
                    this.$validator.errors.add('customer_signature', 'Customer Signature is required', 'input')
                }
                this.supply.phar_signature = this.supply.signature.pharmacist;
                this.supply.cust_signature = this.supply.signature.customer;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$http.post(`${this.$apiHost}/supplies`, this.supply)
                            .then( res =>{
                                this.$root.$emit(
                                    'showNotification',
                                    {
                                        message: `Supply for ${this.$global.prescription.name} added successfully`,
                                        type: 'success',
                                        time: 3000
                                    }
                                );
                                //Update supplies list
                                this.$root.$emit('refresh-supplies-list');
                                //update global prescription's supplies
                                this.$global.prescription.supplies.unshift(res.data._id);
                                //update balance
                                this.$global.prescription.balance = this.$global.prescription.balance - this.supply.tabs;
                                //close modal
                                this.close();

                            }, err => {
                                console.log(err.data);
                            });
                        return;
                    }
                });
            },
            close() {
                this.$router.push(`/patients/${this.$global.patient._id}/prescriptions/${this.$global.prescription._id}`)
                $('#myModal').modal('hide');

            }
        }
    }
</script>

<style scoped>
canvas {
    border: 1px solid #ccc;
    cursor: pointer;
}
</style>
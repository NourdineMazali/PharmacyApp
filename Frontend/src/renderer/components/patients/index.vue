<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-icon" data-background-color="blue">
                    <i class="material-icons">account_circle</i>
                </div>
                    <div class="card-content">
                        <h4 class="card-title">Clients</h4>
                        <div class="toolbar">
                            <router-link :to="{ name: 'new-patient', params: {action: 'add'}}" class="new-patient" >Add new Patient</router-link>
                            <!--        Here you can write extra buttons/actions for the toolbar              -->
                        </div>
                        <div class="material-datatables">
                            <div class="dataTables_wrapper form-inline dt-bootstrap">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <vuetable ref="vuetable"
                                                  :api-url="url"
                                                  :fields="fields"
                                                  :css="css.table"
                                                  :row-class="rowClass"
                                                  :multi-sort="true"
                                                  detail-row-component="my-detail-row"
                                                  @vuetable:cell-clicked="onCellClicked"
                                                  pagination-path="pagination"
                                                  @vuetable:pagination-data="onPaginationData"
                                        >
                                            <template slot="fullName" scope="props">
                                                <a @click="openPatientDetails(props.rowData)" >
                                                    {{ props.rowData.gender !== undefined ? props.rowData.gender : `Mr`}}
                                                    {{ `${props.rowData.first_name} ${props.rowData.last_name}`}}
                                                </a>
                                                <router-link :to="`/patients/${props.rowData._id}`">
                                                    -
                                                </router-link>
                                            </template>
                                            <template slot="prescriptions" scope="props">
                                                <a role="button"
                                                   data-toggle="collapse"
                                                   data-parent="#accordion"
                                                   :href="`#${props.rowData._id}`"
                                                   aria-expanded="true"
                                                   aria-controls="collapseOne">
                                                    <h4 class="panel-title">
                                                        +
                                                    </h4>
                                                </a>
                                                <div
                                                     :id="props.rowData._id"
                                                     class="panel-collapse collapse"
                                                     role="tabpanel"
                                                     aria-labelledby="headingOne"
                                                >
                                                    <ul>
                                                        <li v-for="med in props.rowData.medicines">
                                                            <a @click="onPrescriptionClicked(props.rowData, med)" > {{ med.name }} </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </template>
                                        </vuetable>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <vuetable-pagination-info
                                                ref="paginationInfo"
                                                class="dataTables_info"
                                                id="datatables_info"
                                                role="status"
                                                aria-live="polite"
                                        >
                                        </vuetable-pagination-info>
                                    </div>
                                    <div class="col-sm-7">
                                        <vuetable-pagination
                                                ref="pagination"
                                                :css="css.pagination"
                                                @vuetable-pagination:change-page="onChangePage"
                                        ></vuetable-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- end content-->
            </div>
            <!--  end card  -->
        </div>
        <!-- end col-md-12 -->
    </div>
    <!-- end row -->
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
    import Vue from 'vue'

    //actions component
    Vue.component('custom-action', {
        template: [
            '<div class="custom-actions">',
            '<button class="btn btn-warning" @click="itemAction(\'edit\', rowData)">' +
            '<i class="glyphicon glyphicon-pencil"></i></button>',
            '<button class="btn btn-danger" @click="itemAction(\'delete\', rowData)">' +
            '<i class="glyphicon glyphicon-remove"></i></button>',
            '</div>'
        ].join(''),
        //
        // vuetable will inject the row data via `row-data` prop
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            itemAction: function(action, data) {
                switch (action) {
                    case 'delete' :
                        this.$http.delete(`${this.$apiHost}/patients/${data._id}`)
                            .then( res => {
                                    this.$root.$emit('refresh-patients-list');
                                    this.$root.$emit(
                                    'showNotification',
                                    {   message: `Patient deleted successfully`,
                                        type: 'success',
                                        time: 3000
                                    }
                                );
                            },
                            err => {
                                //
                            });
                        break;
                    case 'edit' :
                        this.$global.patient        = data;
                        this.$router.push({ name: 'new-patient', params: {action: 'edit'}});
                        break;
                }
            }
        }
    });

    //List of medicines

    export default {
        components: {
            'vuetable': Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
        },
        name: "patients",
        data () {
            return {
                url: `${this.$apiHost}/patients`,
                fields: [
                    {
                        name: '__slot:prescriptions',
                        title: ' ',
                        dataClass: 'center',
                    },{
                        name: '__slot:fullName',
                        title: 'FullName',
                        sortField: 'first_name'
                    },

                    {
                        name: 'phone_number',
                        sortField: 'phone_number'
                    },
                    {
                        name: 'email',
                        sortField: 'email'
                    },
                    {
                        name: '__component:custom-action',
                        title: 'Actions'
                    },
                ],
                css: {
                    table: {
                        tableClass: 'table table-striped table-no-bordered table-hover',
                        ascendingIcon: 'glyphicon glyphicon-chevron-up',
                        descendingIcon: 'glyphicon glyphicon-chevron-down'
                    },
                    pagination: {
                        wrapperClass: 'dataTables_paginate paging_full_numbers',
                        activeClass: 'active',
                        disabledClass: 'disabled',
                        pageClass: 'paginate_button',
                        icons: {
                            first: '',
                            prev: '',
                            next: '',
                            last: '',
                        },
                    },
                    icons: {
                        first: 'glyphicon glyphicon-step-backward',
                        prev: 'glyphicon glyphicon-chevron-left',
                        next: 'glyphicon glyphicon-chevron-right',
                        last: 'glyphicon glyphicon-step-forward',
                    },
                },
            }
        },
        created() {
            this.$root.$on('refresh-patients-list',() => {
                this.$nextTick()
                    .then(() => {
                        this.$refs.vuetable.refresh();
                    })
            });
            //login status
            this.$http.get(`${this.$apiHost}/isLoggedIn`)
                .then(
                    res => {
                        this.isLoggedIn = true;
                    },
                    err => {
                        this.isLoggedIn = false;
                    }
                )
        },
        methods: {
            onCellClicked(){

            },
            onLoading(){

            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(parseInt(page))
            },
            onPaginationData (paginationData) {
                this.$refs.pagination.setPaginationData(paginationData)
                this.$refs.paginationInfo.setPaginationData(paginationData)
            },
            rowClass(i, item) {
                return i%2 === 0 ? 'even' : 'odd';
            },
            openPatientDetails(data) {
                this.$global.patient = data;
                this.$router.push({name: 'patient', params: {patientId: data._id}});
            },
            onPrescriptionClicked(patient, prescription) {
                this.$global.prescription   = prescription;
                this.$global.patient        = patient;
                this.$router.push({
                    name: 'supplies',
                    params: {patientId:patient._id , prescriptionId: prescription._id}
                });

            },
        }

    }
</script>

<style scoped>

</style>
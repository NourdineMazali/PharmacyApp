<template>
    <div class="card">
        <div class="card-header card-header-icon" data-background-color="rose">
            <i class="material-icons"></i>
        </div>
        <h4 class="card-title">Supplies for
            <b>{{$global.patient.first_name}}</b> prescription : {{$global.prescription.name}}
            <span class="balance-text">Balance : <b>{{$global.prescription.balance}}</b></span>
            <span class="balance-text">{{ this.remaining_days}} days</span>
        </h4>

        <div class="card-content">
            <vuetable
                ref="vuetable"
                :api-url="url"
                :fields="fields"
                :css="css.table"
                :row-class="rowClass"
                :multi-sort="true"
                detail-row-component="my-detail-row"
                pagination-path="pagination"
                @vuetable:loaded="loaded"
                @vuetable:pagination-data="onPaginationData"
            >
                <template slot="patient-signature" scope="props">
                    <img class="signature-img" :src="props.rowData.cust_signature">
                </template>
                <template slot="pharma-signature" scope="props">
                    <img class="signature-img" :src="props.rowData.phar_signature">
                </template>
            </vuetable>
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

            '<button class="btn btn-info" @click="itemAction(\'copy\', rowData)" >' +
                '<i class="glyphicon glyphicon-zoom-in"></i>' +
            '</button>',
            '<button class="btn btn-warning" @click="itemAction(\'edit\', rowData)">' +
                '<i class="glyphicon glyphicon-pencil"></i>' +
            '</button>',
            '<button class="btn btn-danger" @click="itemAction(\'delete\', rowData)">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
            '</button>',
            '</div>'
        ].join(''),
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            itemAction: function(action, data) {
                switch (action) {
                    case 'edit':
                        this.$global.supply = data;
                        this.$router.push(`/patients/${this.$global.patient._id}/prescriptions/${this.$global.prescription._id}/edit`)
                        break;
                    case 'copy' :
                        this.$http.post(`${this.$apiHost}/supplies`,
                            {
                                notes:           data.notes,
                                tabs:            data.tabs,
                                prescription_id: this.$global.prescription._id,
                                phar_signature : data.phar_signature,
                                cust_signature : data.cust_signature
                            },
                        ).then( res => {
                            this.$root.$emit(
                                'showNotification',
                                {
                                    message: `Supply for medicine ${data.name} copied successfully`,
                                    type: 'success',
                                    time: 3000
                                }
                            );
                            //Update supplies list
                            this.$root.$emit('refresh-supplies-list');
                        });
                        break;
                    case 'delete' :
                        this.$http.delete(`${this.$apiHost}/supplies/${data._id}`)
                            .then( res => {
                                this.$root.$emit(
                                    'showNotification',
                                    {
                                        message: `Supply for medicine ${data.name} deleted successfully`,
                                        type: 'success',
                                        time: 3000
                                    }
                                );
                                //Update supplies list
                                this.$root.$emit('refresh-supplies-list');
                            }, err => {
                                //
                            });
                        break;
                }
            }
        }
    });

    export default {
        name: "list",
        components: {
            'vuetable': Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
        },
        data(){
            return {
                supplies: {},
                error: '',
                fields: [
                    {
                        name: 'createdAt',
                        title: 'Date',
                        sortField: 'createdAt',
                        callback: '_formatToDate'
                    },
                    {
                        name: 'createdAt',
                        title: 'Time',
                        sortField: 'createdAt',
                        callback: '_formatToTime'
                    },
                    {
                        name: 'tabs',
                        title: 'Tabs',
                        sortField: 'tabs'
                    },
                    {
                      name: '__slot:patient-signature',
                      title: 'Patient Signature',
                      titleClass: 'center aligned signature-th',
                    },
                    {
                        name: '__slot:pharma-signature',
                        title: 'Pharmacist Signature',
                        titleClass: 'center aligned signature-th',
                    },
                    {
                        name: 'notes',
                        sortField: 'notes',
                        title: 'Notes'
                    },
                    {
                        name: '__component:custom-action',
                        title: 'Actions'
                    }
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
                url: `http://localhost:3001/prescription/${this.$global.prescription._id}/supplies`,
                balance: 0,
                remaining_days: 0
            }
        },
        computed:{
            getSupplies: function () {
                return this.$global.prescription.supplies;
            }
        },
        created() {
            this.$root.$on('refresh-supplies-list',() => {
                this.$nextTick()
                    .then(() => {
                        this.$refs.vuetable.refresh();
                    })
            });
        },
        watch: {
            getSupplies: function () {
            }
        },
        methods: {
            loaded() {
                let sum = 0;
                for (const s of this.$refs.vuetable.tableData) {
                    sum  = sum + parseInt(s.tabs);
                }
                this.remaining_days = parseInt(this.$global.prescription.balance / this.$global.prescription.dose);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(parseInt(page));
            },
            onPaginationData (paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
                this.$refs.paginationInfo.setPaginationData(paginationData);
            },
            rowClass(i, item) {
                return i%2 === 0 ? 'even' : 'odd';
            }
        }
    }
</script>

<style scoped>
    .signature-th {
        width: 15%;
    }
</style>
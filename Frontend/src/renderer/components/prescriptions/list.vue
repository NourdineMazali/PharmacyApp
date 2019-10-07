<template>
    <div class="card">
        <div class="card-header card-header-icon" data-background-color="rose">
            <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title"><b>{{$global.patient.first_name}}</b>'s Prescription(s)</h4>
        <div class="card-content">
            <div class="col-sm-12">
                <vuetable
                    ref="vuetable"
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
                    <template slot="supplies-link" scope="props">
                        <a @click="onRowClicked(props.rowData)">
                            <i class="material-icons">
                                loupe
                            </i>
                            {{props.rowData.name}}
                        </a>
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
            '<button class="btn btn-warning" @click="itemAction(\'edit\', rowData)">' +
            '<i class="glyphicon glyphicon-pencil"></i></button>',
            '<button class="btn btn-danger" @click="itemAction(\'delete\', rowData)">' +
            '<i class="glyphicon glyphicon-remove"></i></button>',
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
                        this.$global.prescription = data;
                        this.$router.push(`/patients/${this.$global.patient._id}/prescriptions/${data._id}/edit`)
                        break;
                    case 'delete' :
                        this.$http.delete(`${this.$apiHost}/medicines/${data._id}`)
                            .then( res => {
                                this.$root.$emit(
                                    'showNotification',
                                    {
                                        message: `Prescription ${data.name} deleted successfully`,
                                        type: 'success',
                                        time: 3000
                                    }
                                );
                                //Update supplies list
                                this.$root.$emit('refresh-prescription-list');
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
        data() {
            return {
                url: `${this.$apiHost}/patients/${this.$global.patient._id}/prescriptions`,
                fields: [
                    {
                        name: '__slot:supplies-link',
                        title: 'Medicine Name',
                        sortField: 'name'
                    },
                    {
                        name: 'type',
                        title: 'Medicine Type',
                        sortField: 'type'
                    },
                    {
                        name: 'prescribed_by',
                        title: 'Prescribed By',
                        sortField: 'prescribed_by'
                    },
                    {
                        name: 'schedule',
                        title: 'Schedule',
                        sortField: 'schedule'
                    },
                    {
                        name: 'dose',
                        title: 'Dose',
                        sortField: 'dose'
                    },
                    {
                        name: 'balance',
                        title: 'Balance',
                        sortField: 'balance'
                    },
                    {
                        name: 'createdAt',
                        sortField: 'createdAt',
                        title: 'Prescribed At'
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
            }
        },
        created(){
            console.log(this.$route);

            this.$root.$on('refresh-prescription-list',() => {
                this.$nextTick()
                    .then(() => {
                        this.$refs.vuetable.refresh();
                    })
            });
        },
        methods: {
            onRowClicked(item) {
                console.log(item);
                this.$global.prescription = item;
                this.$router.push({name: 'supplies', params: {prescriptionId: item._id}});
            },
            onCellClicked(){

            },
            onLoading(){

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

</style>
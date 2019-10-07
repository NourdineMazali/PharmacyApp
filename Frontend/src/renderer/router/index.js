import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: require('@/components/patients/index').default
        },
        {
            path: '/patients',
            name: 'patients',
            component: require('@/components/patients/index').default
        },
        {
            path: '/patients/:patientId/prescriptions',
            name: 'patient',
            component: require('@/components/patients/patient').default,
            children: [
                {
                    path: ':prescriptionId/edit',
                    name: 'editPrescription',
                    component: require('@/components/prescriptions/edit').default
                }
            ]
        },
        {
            path: '/patients/:patientId/prescriptions/:prescriptionId',
            name: 'supplies',
            component: require('@/components/prescriptions/prescription').default,
            children : [
                {
                    path: 'new',
                    name: 'newSupply',
                    component: require('@/components/supplies/newSupply').default
                },
                {
                    path: 'edit',
                    name: 'editSupply',
                    component: require('@/components/supplies/newSupply').default
                }
            ]
        },
        {
            path: '/patient',
            name: 'new-patient',
            component: require('@/components/patients/new').default
        },
        {
            path: '/auth',
            name: 'auth',
            component: require('@/components/auth/auth').default,
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: require('@/components/auth/login').default
                },
                {
                    path: 'register',
                    name: 'register',
                    component: require('@/components/auth/register').default
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});
router.replace({ path: '', redirect: '/' });

export default router

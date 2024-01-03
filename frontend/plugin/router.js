import {createRouter , createWebHistory} from 'vue-router'

const routes = [
    {path:'', name:'home',component :()=>import('../views/Home.vue')},
    {path:'/Device', name:'device',component :()=>import('../views/Device.vue')},
    {path:'/TodosView', name:'todos',component :()=>import('../views/TodosView.vue')},
    {path:'/todo/:id', name:'todo single',component :()=>import('../views/TodoDetails.vue')}


]

const router = createRouter({
    routes,
    history:createWebHistory(),
})

export default router
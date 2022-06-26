import { createRouter, createWebHistory } from "vue-router"
import PostIndex from '@/components/Posts/PostIndex'
import CreatePost from '@/components/Posts/CreatePost'
import EditPost from '@/components/Posts/EditPost'

const routes = [
    { path: '/', name: 'posts.index', component: PostIndex },
    { path: '/create', name: 'posts.create', component: CreatePost },
    { path: '/edit/:id', name: 'posts.edit', component: EditPost },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
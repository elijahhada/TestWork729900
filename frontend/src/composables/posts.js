import { ref, inject } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router'

export default function usePosts() {
    const posts = ref({})
    const post = ref({})
    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getPosts = async (page = 1, category = '') => {
        if(category){
            category = '&category=' + category
        }
        axios.get('http://localhost:8000/api/posts?page=' + page + category)
            .then(response => {
                posts.value = response.data;
            })
    }
    const getPost = async (id) => {
        axios.get('http://localhost:8000/api/posts/' + id)
            .then(response => {
                post.value = response.data.data;
            })
    }
    const storePost = async (post) => {
        if(isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in post) {
            if (Object.prototype.hasOwnProperty.call(post, item)) {
                serializedPost.append(item, post[item])
            }
        }
        axios.post('http://localhost:8000/api/posts', serializedPost)
            .then(res => {
                router.push({ name: 'posts.index' })
                swal({
                    icon: 'success',
                    title: 'Post saved',
                })
                console.log(res)
            }).catch((err) => {
                if (err.response.data) {
                    validationErrors.value = err.response.data.errors
                    console.log(validationErrors.value)
                }
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const updatePost = async (post) => {
        if(isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in post) {
            if (Object.prototype.hasOwnProperty.call(post, item)) {
                serializedPost.append(item, post[item])
            }
        }
        serializedPost.append('_method', 'PUT')

        axios.post('http://localhost:8000/api/posts/' + post.id, serializedPost)
            .then(res => {
                router.push({ name: 'posts.index' })
                swal({
                    icon: 'success',
                    title: 'Post saved',
                })
                console.log(res)
            }).catch((err) => {
                if (err.response.data) {
                    validationErrors.value = err.response.data.errors
                    console.log(validationErrors.value)
                }
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8000/api/posts/' + id)
                    .then(res => {
                        getPosts()
                        router.push({ name: 'posts.index' })
                        swal({
                            icon: 'success',
                            title: 'Post removed',
                        })
                        console.log(res)
                    }).catch((err) => {
                    console.log(err)
                    swal({
                        icon: 'error',
                        title: 'Something went wrong',
                    })
                })
            }
        })
    }

    return { posts, post, getPost, getPosts, storePost, updatePost, deletePost, validationErrors, isLoading }
}
<template>
  <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
    <div class="min-w-full align-middle">
      <div class="mb-4">
        <select v-model="selectedCategory" class="block mt-1 w-full sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="" selected>-- Filter by category --</option>
          <option v-for="category in categories" :value="category.id" v-bind:key = category.id>
            {{ category.title }}
          </option>
        </select>
      </div>
      <table class="min-w-full divide-y divide-gray-200 border">
        <thead>
        <tr>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
          </th>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
          </th>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
          </th>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
          </th>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
          </th>
          <th class="px-6 py-3 bg-gray-50 text-left">
            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</span>
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
        <tr v-for="post in posts.data" v-bind:key = post.id>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {{ post.id }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {{ post.title }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {{ post.body }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {{ post.category }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            {{ post.created_at }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
            <router-link :to="{ name: 'posts.edit', params: { id: post.id } }">Edit</router-link>
            <a href="#" class="ml-2" @click.prevent="deletePost(post.id)">Remove</a>
          </td>
        </tr>
        </tbody>
      </table>
      <Pagination :data="posts" @pagination-change-page="page => getPosts(page, selectedCategory)" />
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch  } from "vue";
import usePosts from "../../composables/posts";
import useCategories from "../../composables/categories";

export default {
    name: 'PostIndex',
    setup() {
      const selectedCategory = ref('')
      const { posts, getPosts, deletePost } = usePosts()
      const { categories, getCategories } = useCategories()
      onMounted(() => {
        getPosts()
        getCategories()
      })
      watch(selectedCategory, (current) => {
        getPosts(1, current)
      })
      return { posts, getPosts, categories, selectedCategory, deletePost }
  }
}
</script>
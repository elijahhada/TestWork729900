<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="storePost(post)" class="w-4/5">
      <!-- Title -->
      <div>
        <label for="post-title" class="block font-medium text-sm text-gray-700">
          Title
        </label>
        <input v-model="post.title" id="post-title" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <div class="text-red-600 mt-1">
          <div v-for="message in validationErrors.title" v-bind:key="message">
            {{ message }}
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="mt-4">
        <label for="post-content" class="block font-medium text-sm text-gray-700">
          Content
        </label>
        <textarea v-model="post.body" id="post-content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        <div class="text-red-600 mt-1">
          <div v-for="message in validationErrors.body" v-bind:key="message">
            {{ message }}
          </div>
        </div>
      </div>

      <!-- Category -->
      <div class="mt-4">
        <label for="post-category" class="block font-medium text-sm text-gray-700">
          Category
        </label>
        <select v-model="post.category_id" id="post-category" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="" selected>-- Choose category --</option>
          <option v-for="category in categories" :value="category.id" v-bind:key="category.id">
            {{ category.title }}
          </option>
        </select>
        <div class="text-red-600 mt-1">
          <div v-for="message in validationErrors.category_id" v-bind:key="message">
            {{ message }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label for="thumbnail" class="block font-medium text-sm text-gray-700">
          Thumbnail
        </label>
        <input @change="post.thumbnail = $event.target.files[0]" type="file" id="thumbnail" />
        <div class="text-red-600 mt-1">
          <div v-for="message in validationErrors.thumbnail" v-bind:key="message">
            {{ message }}
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-4">
        <button :disabled="isLoading" class="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-75 disabled:cursor-not-allowed">
          <div v-show="isLoading" class="inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-blue-600 rounded-full"></div>
          <span v-if="isLoading">Processing...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import usePosts from "../../composables/posts";
export default {
  setup() {
    const post = reactive({
      title: '',
      body: '',
      category_id: '',
      thumbnail: '',
    })
    const { categories, getCategories } = useCategories()
    const { storePost, validationErrors, isLoading } = usePosts()
    onMounted(() => {
      getCategories()
    })
    return { categories, post, storePost, validationErrors, isLoading }
  },
}
</script>
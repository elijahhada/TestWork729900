import { ref } from 'vue'
import axios from "axios";

export default function useCategories() {
    const categories = ref({})

    const getCategories = async () => {
        axios.get('http://localhost:8000/api/categories')
            .then(response => {
                categories.value = response.data.data;
            })
    }

    return { categories, getCategories }
}
import {ref, onMounted} from "vue";

const useHome = () => {
	const products = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const getProducts = async () => {
		loading.value = true;
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			);
			products.value = await response.json();
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		getProducts();
	});

	return {
		products,
		loading,
		error,
		getProducts,
	};
};

export default useHome;

import {ref} from "vue";
import {useRouter} from "vue-router";

const profile = ref(null);
const loading = ref(false);
const error = ref(null);

export const useAuth = () => {
	const router = useRouter();

	const getProfile = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
			return;
		}

		if (profile.value) return; // ✅ prevent re-fetch

		loading.value = true;
		error.value = null;

		try {
			const apiEndpoint = import.meta.env.VITE_API_URL;
			const res = await fetch(`${apiEndpoint}/api/auth/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				if (res.status === 401) {
					logout();
				}
				throw new Error(data.message || "Unauthorized");
			}

			profile.value = data.user;
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		profile.value = null;
		router.push("/login");
	};

	// 🔐 Role helpers
	const isAdmin = () => profile.value?.role === "admin";
	const isUser = () => profile.value?.role === "user";

	return {
		profile,
		loading,
		error,
		getProfile,
		logout,
		isAdmin,
		isUser,
	};
};

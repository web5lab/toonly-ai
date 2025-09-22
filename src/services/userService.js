import axiosInstance from "../axios/axiosInstance";

export const fetchUserData = async (token) => {
    const Response = await axiosInstance.get(`/auth/user-data`, {
        headers: {
            Authorization: `Bearer ${token}` // Add the token to the request headers
        }
    });
    return Response.data;
}
import axios from "axios";

const handleApiCall = async (
  url,
  data,
  successCallback,
  setIsLoading,
  setError
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(url, data);

    if (response.status === 200) {
      successCallback(response.data);
      setError("");
    } else {
      // Handle unexpected status codes or errors
      console.error("Unexpected response status:", response.status);
      setError("Unexpected error occurred");
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    setError(error.response?.data?.message || "Something went wrong");
  }
  setIsLoading(false);
};

export default handleApiCall;

import axios from "axios";
import { generateErrorMessage } from "./Error";

const handleApiCall = async (
  url,
  data,
  successCallback,
  setIsLoading,
  setErrors
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(url, data);

    if (response.status === 200) {
      successCallback(response.data);
      setErrors("");
    } else {
      // Handle unexpected status codes or errors
      console.error("Unexpected response status:", response.status);
      setErrors(generateErrorMessage({ response }));
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    console.log(generateErrorMessage(error));
    setErrors(generateErrorMessage(error));
  }
  setIsLoading(false);
};

export default handleApiCall;

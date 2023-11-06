export const generateErrorMessage = (error) => {
  if (error.response?.data.code === "INVALID_CODE")
    return "Your Given Otp Is Not Correct";
  else if (error.response?.data.code === "RETRY_OTP")
    return "Your have Given an incorrect otp";

  const serverErrorCode = error.response?.status;

  const errorMessages = {
    400: "Oops! Something's not quite right with your request. Please check your input and try again.",
    401: "Unauthorized. It seems you're not logged in. Please log in to access this feature.",
    403: "Access Denied. You don't have permission to view this page. If you believe this is an error, contact support.",
    404: "Page Not Found. The resource you're looking for could not be found. Double-check the URL or navigate back.",
    500: "Internal Server Error. Our apologies, something went wrong on our end. Please try again later.",
    // Add more mappings as needed
    default: "Oops! Something went wrong. Please try again later.",
  };

  return errorMessages[serverErrorCode] || errorMessages.default;
};

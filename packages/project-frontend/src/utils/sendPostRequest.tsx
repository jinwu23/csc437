type ApiResponse<T = any> = {
  type: "success" | "error";
  message: string;
  data?: T;
};

export async function sendPostRequest<T = any>(
  url: string | URL | Request,
  payload: any
): Promise<ApiResponse<T>> {
  try {
    console.log(`Sending POST request to: ${url}`, payload);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is valid JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (!response.ok) {
        return {
          type: "error",
          message:
            responseData.message ||
            `Request failed with status: ${response.status}`,
          data: responseData,
        };
      }

      return {
        type: "success",
        message: responseData.message || "Success!",
        data: responseData,
      };
    } else {
      // Handle non-JSON responses
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse);

      return {
        type: "error",
        message: `Server returned non-JSON response with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      type: "error",
      message:
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
    };
  }
}

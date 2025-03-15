import LoginModal from "../../components/LoginModal";
import { sendPostRequest } from "../../utils/sendPostRequest";
import { useNavigate } from "react-router";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginProps = {
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
};

function Login({ setAuthToken }: LoginProps) {
  const navigate = useNavigate();

  async function handleLogin({ email, password }: LoginCredentials) {
    let token = null;

    try {
      console.log("Logging in user:", email);
      const response = await sendPostRequest("/auth/login", {
        email,
        password,
      });

      if (response.data.data) {
        token = response.data.data.token;
      }

      if (response.type === "success" && token) {
        setAuthToken(token);
        navigate("/");
        return;
      } else {
        throw new Error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-12 bg-primary">
        <h1 className="mb-8 text-4xl text-center text-dark-text">
          Welcome, please sign in!
        </h1>
        <LoginModal onSubmit={handleLogin} />
      </div>
    </>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/events");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
                {/* Login Title */}
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form className="space-y-4">
                    {/* Email Section */}
                    <div>
                        <label className="block text-sm font-medium text-dark-text">Email</label>
                        <input type="email" className="mt-1 p-2 w-full border rounded-md" required />
                    </div>
                    {/* Password Section */}
                    <div>
                        <div className="flex justify-between">
                            <label className="block text-sm font-medium text-dark-text">Password</label>
                            <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="showPassword" 
                                className="mr-2"
                                onChange={() => setPasswordVisible(!passwordVisible)} 
                            />
                            <label htmlFor="showPassword" className="text-sm text-dark-text">Show Password</label>
                            </div>
                        </div>
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            className="mt-1 p-2 w-full border rounded-md" 
                            required 
                        />
                    </div>
                    {/* Login */}
                    <button 
                        type="button" 
                        className="w-full bg-background-dark text-light-text p-2 rounded-md"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;

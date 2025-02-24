import { useState } from "react";
import { useNavigate } from "react-router";

function CreateAccountModal() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
                {/* Create Account Title */}
                <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>
                <form className="space-y-4">
                    {/* Name Fields*/}
                    <div className="flex justify-between gap-4">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-dark-text">First Name</label>
                            <input type="text" className="mt-1 p-2 w-full border rounded-md" required />
                        </div>
                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-dark-text">Last Name</label>
                            <input type="text" className="mt-1 p-2 w-full border rounded-md" required />
                        </div>
                    </div>
                    
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
                    {/* Login Redirect Section */}
                    <div className="text-center mt-4">
                        <p>
                            Already have an account? 
                            <button 
                                type="button" 
                                className="underline ml-1"
                                onClick={handleLoginRedirect}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                    {/* Create Account Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-background-dark text-light-text p-2 rounded-md"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccountModal;


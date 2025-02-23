import LoginModal from "../components/LoginModal";

function LoginPage() {
    return (
        <>  
            
            <div className="flex flex-col items-center justify-center min-h-screen px-12 bg-primary">
            <h1 className="mb-8 text-4xl text-center">Welcome, please sign in!</h1>
                <LoginModal />
            </div>
        </>
        
    );
}

export default LoginPage;

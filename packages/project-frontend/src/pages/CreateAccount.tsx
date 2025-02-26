import CreateAccountModal from "../components/CreateAccountModal";

function CreateAccount() {
    return (
        <>  
            <div className="flex flex-col items-center justify-center min-h-screen px-12 bg-primary">
                <CreateAccountModal />
            </div>
        </>
        
    );
}

export default CreateAccount;

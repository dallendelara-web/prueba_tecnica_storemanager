import LoginForms from "@/components/LoginForms/LoginForms";

const LoginPage = () => {
    return(
        <div className="p-0">
            <div id="login-formulario" style={{width:"100%", margin: 0}}>
                <LoginForms />
            </div>
        </div>
    );
}

export default LoginPage;
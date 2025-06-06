import AuthComponent from './components/authComponent';
import './styles/main.css';
import Root from './components/root';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import AuthContainer from './components/authContainer';





function registerComponent(name: string, component: any) {
    if (!customElements.get(name)) {
        customElements.define(name, component);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');

    try {

        registerComponent('root-element', Root);
        registerComponent('login-form', LoginForm);
        registerComponent('register-form', RegisterForm);
        registerComponent('auth-container', AuthContainer);
        registerComponent('auth-component', AuthComponent);
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}); 

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBg from '../../assets/images/motibg.jpg';
import { ImSpinner9 } from 'react-icons/im';
import Api from '../../utils/network/api';
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ login, setLogin ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        setIsLoading(true);
        e.preventDefault()
        new Api()
            .login(login, password)
            .then(({data}) => {
                localStorage.setItem('moti_token', data.token);
                setIsLoading(false);
            })
            .then(() => {
                navigate('/categories')
            })
    }

    return (
        <div className="login__wrapper">
            <div className="login__container">
                <div className="login__img">
                    <img src={LoginBg} alt="Moti Login Bg" />
                </div>
                <div className="login__form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login"  className='form__label'>Login</label>
                            <input 
                                type="text" 
                                id='login'
                                value={login}
                                onChange={(e:{target: HTMLInputElement}) => setLogin(e.target.value)}    
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="password"  className='form__label'>Password</label>
                            <input 
                                type="password" 
                                id='password'
                                value={password}
                                onChange={(e:{target: HTMLInputElement}) => setPassword(e.target.value)}    
                                required    
                            />
                        </div>
                        <div className='form__btn'>
                            <button
                                disabled={isLoading}
                            >
                                {
                                    !isLoading ? "Submit" : (<span>
                                        <ImSpinner9 className="loader" />
                                    </span>) 
                                }    
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

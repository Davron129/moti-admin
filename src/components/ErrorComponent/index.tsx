import Logo from '../../assets/images/logo.png';
import Styles from './ErrorComponent.module.css';

const ErrorComponent = () => {


    return (
        <div className={Styles.wrapper} >
            <div className={Styles.img__wrapper}>
                <img src={Logo} alt="Moti Restaraunt Logo" />
            </div>
            <div>
                <span className={Styles.error__code}>404</span>
                <span className={Styles.error__content}>Страница не найдена</span>
            </div>
        </div>
    )
}

export default ErrorComponent
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Styles from './CategoryStyles.module.css';

const CreateNewCategory = () => {
    return (
        <Link 
            to={'/category/add'}
            className={Styles.category__card}
            style={{
                width: "100px",
                height: "50px",
                backgroundColor: "#C5C6D0",
                display: "flex",
                cursor: "pointer"
            }}
        >
            <AiOutlinePlus fill='#FFF' width={40} />
        </Link>
    )
}

export default CreateNewCategory
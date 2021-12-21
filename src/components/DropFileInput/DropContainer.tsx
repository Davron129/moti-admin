import DownloadIcon from '../../assets/images/downloadIcon.svg';
import Styles from './DropFileStyles.module.css';

type DropContainerProps = {
    isDropped: boolean
}

const DropContainer = ({ isDropped } : DropContainerProps) => {
    return (
        <div className={`${Styles.container} ${isDropped && Styles.dropped}`} >
            <div className={Styles.content} >
                <div className={Styles.img__wrapper}>
                    <img src={DownloadIcon} alt="Download Icon"/>
                </div>
                <span>
                    { isDropped ? "File Uploaded" : "Upload File"}
                </span>
            </div>
        </div>
    )
}

export default DropContainer


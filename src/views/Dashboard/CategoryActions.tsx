import styled from 'styled-components';
import Styles from './Dashboard.module.css';

import { GrEdit } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';

const ImgWrapper = styled.div`
    width: 20px;
    height: 20px;
    // margin-right: 12px;
    display: inline-block;
`;

type ActionProps = {
    setIsModalOpen: Function;
    openOverlay: Function;
    setActionName: Function;
}

const CategoryActions = ({ setIsModalOpen, openOverlay, setActionName} : ActionProps) => {
    return (
        <div className={Styles.category__actions}>
            <div className={Styles.category__action} onClick={() => setIsModalOpen(true)}>
                <ImgWrapper>
                    <AiOutlinePlus />
                </ImgWrapper>
                {/* <span>Add</span> */}
            </div>
            <div    
                className={`${Styles.category__action} ${Styles.edit}`} 
                onClick={() => { 
                    openOverlay(true);
                    setActionName("edit");
                }}>
                <ImgWrapper>
                    <GrEdit />
                </ImgWrapper>
                {/* <span>Edit</span> */}
            </div>
            <div 
                className={`${Styles.category__action} ${Styles.delete}`} 
                onClick={() => {
                    openOverlay(true);
                    setActionName("delete");
                }}>
                <ImgWrapper>
                    <RiDeleteBinFill />
                </ImgWrapper>
                {/* <span>Delete</span> */}
            </div>
        </div>
    )
}

export default CategoryActions
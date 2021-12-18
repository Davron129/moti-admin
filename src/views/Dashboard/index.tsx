import { useState, useEffect } from 'react';
import Api from '../../utils/network/api';

import styled from 'styled-components';
import { GrEdit } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import Styles from './Dashboard.module.css';
import AddCategory from '../../components/modals/AddCategory';

const ImgWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 12px;
    display: inlien-block;
`

interface Categoryinterface {
    id: string;
    name: string;
    foods: []
}

const Dashboard = () => {
    const [ categories, setCategories ] = useState<Categoryinterface[]>([]);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const getCategories = () => {
        new Api()
            .getCategory()
            .then(({data}) => {
                setCategories(data.data);
            })
    }

    useEffect(() => {
        getCategories();
    }, [isModalOpen])

    return (
        <div className="dashboard">
            <div className="category">
                <div className={Styles.category__actions}>
                    <div className={Styles.category__action} onClick={() => setIsModalOpen(true)}>
                        <ImgWrapper>
                            <AiOutlinePlus />
                        </ImgWrapper>
                        <span>Add</span>
                    </div>
                    <div className={`${Styles.category__action} ${Styles.edit}`}>
                        <ImgWrapper>
                            <GrEdit />
                        </ImgWrapper>
                        <span>Edit</span>
                    </div>
                    <div className={`${Styles.category__action} ${Styles.delete}`}>
                        <ImgWrapper>
                            <RiDeleteBinFill />
                        </ImgWrapper>
                        <span>Delete</span>
                    </div>
                </div>

                <div className="categories">
                    {
                        categories.map(category => (
                            <div className={Styles.category__action} key={category.id}>
                                <span>{ category.name }</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            Dashboard
            { isModalOpen && <AddCategory closeModal={setIsModalOpen} /> }
        </div>
    )
}

export default Dashboard;
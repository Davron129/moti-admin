import Api from '../../utils/network/api';
import { useState, useEffect } from 'react';
// modals
import CategoryActions from './CategoryActions';
import AddCategory from '../../components/modals/AddCategory';
import ConfirmModal from '../../components/modals/ConfirmModal';
// components
import CategoryList from './CategoryList';
import EditCategory from '../../components/modals/EditCategory';
// styles
import Styles from './Dashboard.module.css';

interface Categoryinterface {
    id: string;
    name: string;
    foods: []
};

const Dashboard = () => {
    const [ actionName, setActionName ] = useState<string>("");
    const [ selectedId, setSelectedId ] = useState<string>("");
    const [ categoryName, setCategoryName ] = useState<string>("");
    const [ isEditable, setIsEditable ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ isDeletable, setIsDeletable ] = useState<boolean>(false);
    const [ isOverlayOpen, setIsOverlayOpen ] = useState<boolean>(false);
    const [ isDateChanged, setIsDataChanged ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<Categoryinterface[]>([]);

    const getCategories = () => {
        new Api()
            .getCategory()
            .then(({data}) => setCategories(data.data) )
    }

    const addCategory = (name: string) => {
        new Api()
            .addCategory(name)
            .then(() => {
                setIsModalOpen(false);
                setIsDataChanged(!isDateChanged);
            })
    }

    const editCategory = (name: string) => {
        new Api()
            .editCategory(selectedId, name)
            .then(() => {
                setIsEditable(false);
                setIsDataChanged(!isDateChanged);
            })
    }

    const deleteCategory = (id: string) => {
        new Api()
            .deleteCategory(id)
            .then(() => {
                setIsDeletable(false);
                setIsDataChanged(!isDateChanged);
            })
    }

    const closeOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        (e.target as Element).getAttribute("data-overlay") && setIsOverlayOpen(false);
    }

    const handleClickCategory = (category: Categoryinterface) => {
        if(isOverlayOpen) {
            actionName === "edit" && setIsEditable(true);
            actionName === "delete" && setIsDeletable(true);
            setCategoryName(category.name);
            setIsOverlayOpen(false);
            setSelectedId(category.id);
        }
    }

    useEffect(() => {
        getCategories();
    }, [isDateChanged])

    return (
        <div className="dashboard">
            <div className="category">
                <CategoryActions 
                    setIsModalOpen={setIsModalOpen} 
                    openOverlay={setIsOverlayOpen} 
                    setActionName={setActionName} 
                />
                
                <CategoryList 
                    categories={categories}
                    isOverlayOpen={isOverlayOpen}
                    clickAction={handleClickCategory}
                />
            </div>

            { isModalOpen && <AddCategory 
                closeModal={setIsModalOpen} 
                addFunc={addCategory} 
            /> }
            { isEditable && <EditCategory 
                closeModal={setIsEditable} 
                editFunc={editCategory} 
                catName={categoryName}  
            />}
            { isOverlayOpen && <div 
                className={Styles.overlay} 
                onClick={(e) => closeOverlay(e)} 
                data-overlay={true}>
            </div>
            }
            { isDeletable && <ConfirmModal 
                closeModal={setIsDeletable} 
                acceptFunc={() => deleteCategory(selectedId)} 
                modalText={`Do you want to delete category ${categoryName}?`}
            />}
        </div>
    )
}

export default Dashboard;
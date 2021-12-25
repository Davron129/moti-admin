import Api from '../../utils/network/api';
import { useState, useEffect } from 'react';
// modals
import CategoryActions from './CategoryActions';
import AddCategory from '../../components/modals/AddCategory';
import ConfirmModal from '../../components/modals/ConfirmModal';
// components
import CategoryList from './CategoryList';
import EditCategory from '../../components/modals/EditCategory';
import CreateNewCategory from '../CategoryAdd/CreateNewCategory';
// styles
import Styles from './Dashboard.module.css';
import CategoryCard from '../../components/CategoryCard';

interface Categoryinterface {
    id: string;
    name: string;
    foods: []
};

interface ImageInterface {
    hashId?: string;
}

interface FoodInterface {
    creatAt: number;
    id: string;
    image: ImageInterface;
    name: string;
    sum: number;
}

const Dashboard = () => {
    const [ actionName, setActionName ] = useState<string>("");
    const [ selectedId, setSelectedId ] = useState<string>("");
    const [ categoryName, setCategoryName ] = useState<string>("");
    const [ isEditable, setIsEditable ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ isOverlayOpen, setIsOverlayOpen ] = useState<boolean>(false);
    const [ isDateChanged, setIsDataChanged ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<Categoryinterface[]>([]);
    // food delete qilguncha model qoshilishi kerak
    // const [ isFoodDeletable, setIsFoodDeletable ] = useState<boolean>(false);
    const [ categoryFoods, setCategoryFoods ] = useState<FoodInterface[]>([]);
    const [ isCategoryDeletable, setIsCategoryDeletable ] = useState<boolean>(false);
// get Categories
    const getCategories = () => {
        new Api()
            .getCategory()
            .then(({data}) => {
                setCategories(data.data);
                if(data.data.length !== 0) {
                    setCategoryFoods(data.data[0].foods);
                    setSelectedId(data.data[0].id);
                    localStorage.setItem("cat_id", data.data[0].id);
                }
            } )
    }
// Add Category
    const addCategory = (name: string) => {
        new Api()
            .addCategory(name)
            .then(() => {
                setIsModalOpen(false);
                setIsDataChanged(!isDateChanged);
            })
    }
// Edit Category
    const editCategory = (name: string) => {
        new Api()
            .editCategory(selectedId, name)
            .then(() => {
                setIsEditable(false);
                setIsDataChanged(!isDateChanged);
            })
    }
// delete Category
    const deleteCategory = (id: string) => {
        new Api()
            .deleteCategory(id)
            .then(() => {
                setIsCategoryDeletable(false);
                setIsDataChanged(!isDateChanged);
            })
    }
// delete Food
    const deleteFood = (id: string) => {
        new Api()
            .deleteFood(id)
            .then(() => {
                setIsDataChanged(!isDateChanged);
            })
    }
// close overlay 
    const closeOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        (e.target as Element).getAttribute("data-overlay") && setIsOverlayOpen(false);
    }

    const handleClickCategory = (category: Categoryinterface) => {
        if(isOverlayOpen) {
            actionName === "edit" && setIsEditable(true);
            actionName === "delete" && setIsCategoryDeletable(true);
            setCategoryName(category.name);
            setIsOverlayOpen(false);
            setSelectedId(category.id);
        }
        localStorage.setItem("cat_id", category.id);
        setCategoryFoods(category.foods);
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
                
                {
                    categories.length !== 0 
                        ? <CategoryList 
                            categories={categories}
                            isOverlayOpen={isOverlayOpen}
                            clickAction={handleClickCategory}
                        />
                        : <h1>No categories</h1>
                }
            </div>

            <div className={Styles.foods__list}>
                { categories.length !== 0 && (
                        <>
                            {
                                categoryFoods.map((food: FoodInterface) => (
                                    <CategoryCard 
                                        key={food.id}
                                        name={food.name}
                                        price={food.sum}
                                        imageSrc={food.image && food.image.hashId && `https://cafe-service-b.herokuapp.com/api/auth/file/preview/${food.image.hashId}`}
                                        deleteFunc={() => deleteFood(food.id)}
                                        id={food.id}
                                    />
                                ))
                            }
                            <CreateNewCategory />
                        </>
                    )
                }
                    
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
            { isCategoryDeletable && <ConfirmModal 
                closeModal={setIsCategoryDeletable} 
                acceptFunc={() => deleteCategory(selectedId)} 
                modalText={`Do you want to delete category ${categoryName}?`}
            />}
            
        </div>
    )
}

export default Dashboard;
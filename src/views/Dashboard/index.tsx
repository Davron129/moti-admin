import Api from '../../utils/network/api';
import { API } from '../../utils/constants';
import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// modalscategory
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
    foods: []
    id: string;
    name: string;
    image: {
        hashId: string
    }
};

interface ImageInterface {
    hashId?: string;
}

interface FoodInterface {
    id: string;
    sum: number;
    name: string;
    creatAt: number;
    description: string;
    image: ImageInterface;
}

const Dashboard = () => {
    const [ actionName, setActionName ] = useState<string>("");
    const [ selectedCategory, setSelectedCategory ] = useState<Categoryinterface>({
        foods: [],
        id: "",
        name: "",
        image: {
            hashId: ""
        }
    });
    
    const [ isEditable, setIsEditable ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false); 
    const [ isOverlayOpen, setIsOverlayOpen ] = useState<boolean>(false);
    const [ isDateChanged, setIsDataChanged ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<Categoryinterface[]>([]);
    const [ categoryFoods, setCategoryFoods ] = useState<FoodInterface[]>([]);
    const [ isCategoryDeletable, setIsCategoryDeletable ] = useState<boolean>(false);
// get Categories
    const getCategories = () => {
        new Api()
            .getCategory()
            .then(({data}) => {
                setCategories(data.data);
                if(data.data.length !== 0) {
                    setCategoryFoods(data.data[0].foods.sort((a: FoodInterface, b: FoodInterface) => {
                        if(a.creatAt < b.creatAt) return -1;
                        if(a.creatAt > b.creatAt) return 1;
                        return 0;
                    }));
                    localStorage.setItem("cat_id", data.data[0].id);
                }
            } )
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
// handle category click
    const handleClickCategory = (category: Categoryinterface) => {
        if(isOverlayOpen) {
            actionName === "edit" && setIsEditable(true);
            actionName === "delete" && setIsCategoryDeletable(true);
            setIsOverlayOpen(false);
            setSelectedCategory(category);
        }
        setCategoryFoods(category.foods);
        localStorage.setItem("cat_id", category.id);
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
                                        id={food.id}
                                        key={food.id}
                                        name={food.name}
                                        price={food.sum}
                                        description={food.description}
                                        deleteFunc={() => deleteFood(food.id)}
                                        imageSrc={food.image && food.image.hashId && `${API}/api/auth/file/preview/${food.image.hashId}`}
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
                handleDataChange={setIsDataChanged}
            /> }
            { isEditable && <EditCategory 
                closeModal={setIsEditable}
                handleDataChange={setIsDataChanged} 
                category={selectedCategory}
            />}
            { isOverlayOpen && <div 
                className={Styles.overlay} 
                onClick={(e) => closeOverlay(e)} 
                data-overlay={true}>
            </div>}
            { isCategoryDeletable && <ConfirmModal 
                closeModal={setIsCategoryDeletable} 
                acceptFunc={() => deleteCategory(selectedCategory.id)} 
                modalText={`Вы хотите удалить категорию ${selectedCategory.name}?`}
            />}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Dashboard;
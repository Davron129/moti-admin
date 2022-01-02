import axios from 'axios';
import Api from '../../utils/network/api';
import { API } from '../../utils/constants';
import { useState, useEffect, useRef, MutableRefObject } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { errorMsg, succesMsg } from '../../utils/functions/toast';
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
    foods: []
    id: string;
    name: string;
};

interface ImageInterface {
    hashId?: string;
}

interface FoodInterface {
    id: string;
    sum: number;
    name: string;
    creatAt: number;
    image: ImageInterface;
}

const Dashboard = () => {
    const [ progress, setProgress ] = useState<number>(0); // progress for file upload
    const [ actionName, setActionName ] = useState<string>("");
    const [ selectedId, setSelectedId ] = useState<string>(""); // selected category's id
    const [ categoryName, setCategoryName ] = useState<string>(""); 
    const [ isEditable, setIsEditable ] = useState<boolean>(false);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false); 
    const categoryRef = useRef() as MutableRefObject<HTMLInputElement>;
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
                    setCategoryFoods(data.data[0].foods);
                    setSelectedId(data.data[0].id);
                    localStorage.setItem("cat_id", data.data[0].id);
                }
            } )
    }
// Add Category
    const addCategory = (name: string) => {
        const imageFormData: FormData = new FormData();
        const file = categoryRef.current.files && categoryRef.current.files[0];
        if(file) {
            imageFormData.append("file", file);
    
            axios.post('/admin/file/save', imageFormData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('moti_token')}`,
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: (data) => {
                    setProgress(Math.round((100*data.loaded)/ data.total));
                }
            })
            .then(({data}) => {
                new Api()
                    .addCategory(data.data.hashId, name)
                    .then(() => {
                        setIsModalOpen(false);
                        setIsDataChanged(!isDateChanged);
                        succesMsg("Category saved succesfully");
                    })
            })
        } else {
            errorMsg("File not uploaded");
        }
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
// handle category click
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
                                        id={food.id}
                                        key={food.id}
                                        name={food.name}
                                        price={food.sum}
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
                addFunc={addCategory} 
                fileRef={categoryRef}
                progress={progress}
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
            </div>}
            { isCategoryDeletable && <ConfirmModal 
                closeModal={setIsCategoryDeletable} 
                acceptFunc={() => deleteCategory(selectedId)} 
                modalText={`Do you want to delete category ${categoryName}?`}
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
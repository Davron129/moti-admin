import axios from 'axios';

class Api {
    constructor() {
        this.headers = {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJpZCI6MiwibmFtZSI6IlJPTEVfQURNSU4iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2NDAzMzU4MjQsImV4cCI6MTczMjU2OTU0NH0.EB6bRWUax3AsPot8ZxEtJjp8s5MVfW4k-Ja4YlI1TQY`
        }
    }

    getCategory = () => {
        return axios.get("/admin/category/get-all", { headers: this.headers })
    }

    addCategory = (name) => {
        return axios.post("/admin/category/save", {
            "name": name   
        }, 
        { headers: this.headers })
    }

    editCategory = (id, name) => {
        return axios.put(`/admin/category/edit/${id}`, 
            { name: name }, 
            { headers: this.headers })
    }

    deleteCategory = (id) => {
        return axios.delete(`/admin/category/delete/${id}`, { headers: this.headers })
    }

    saveFile = (file) => {
        return axios.post('/admin/file/save', 
            file,
            { headers: {
                ...this.headers,
                'content-type': 'multipart/form-data'
            }}
        )
    }

    addFood = (cat_id, imageHashId, name, sum) => {
        return axios.post("/admin/food/save", 
            {
                "categoryId": cat_id,
                "imageHashId": imageHashId,
                "name": name,
                "sum": sum
            },
            { headers: this.headers }
        )
    }

    editFood = (cat_id, imageHashId, name, sum) => {
        return axios.put(`/admin/food/edit/${cat_id}`, 
            {
                "categoryId": cat_id,
                "imageHashId": imageHashId,
                "name": name,
                "sum": sum
            },
            { headers: this.headers }
        )
    }

    getFood = (id) => {
        return axios.get(`/admin/food/find/${id}`, 
            { headers: this.headers }
        )
    }

    deleteFood = (id) => {
        return axios.delete(`/admin/food/delete/${id}`, { headers: this.headers })
    }

    getBookings = () => {
        return axios.get('/admin/booking/get-all', { headers: this.headers })
    }
}

export default Api
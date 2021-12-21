import axios from 'axios';

class Api {
    constructor() {
        this.headers = {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJpZCI6MiwibmFtZSI6IlJPTEVfQURNSU4iLCJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2Mzk3MjQxMDIsImV4cCI6MTczMTk1NzgyM30.NYkCx3VOO02pmX1xM39knYWXwidtVI8huu2RQShGwPQ`
        }
    }

    getCategory = () => {
        return axios.get("/admin/category/get-all")
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
        return axios.delete(`/admin/category/delete/${id}`)
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
}

export default Api
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint='http://localhost:8000/api'

export const ShowProducts = () => {
    const [products, setProducts] = useState([])
    useEffect ( () => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/products`)
        setProducts(response.data)
    }

    const deleteProduct = async (id) => {
        const response = await axios.delete(`${endpoint}/product/${id}`)
        getAllProducts()
    }

    return (
        <div className='d-grip gap-2'>
            <div class="table-responsive">
                <table class="table table-primary">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                            {products.map ( (product) => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`}>Edit</Link>
                                        <button onClick={ ()=>deleteProduct(product.id) } className="btn btn-danger ms-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
        </div>
    )
}
export default ShowProducts

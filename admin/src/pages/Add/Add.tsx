import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from "react-toastify";



const Add = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  })

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name)
    formdata.append("description", data.description)
    formdata.append("price", Number(data.price).toString())
    formdata.append("category", data.category)
    if (image) {
      formdata.append("image", image);
    }
    const response = await axios.post(`${url}/api/food/add`, formdata)

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: ""
      })
      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);

    }
  }
  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(file);
          }} type="file" id='image' hidden required />
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea name="description" onChange={onChangeHandler} value={data.description} id="" rows={6} placeholder='Write here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input type="number" value={data.price} placeholder='$2' name='price' onChange={onChangeHandler} />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>

    </div>
  )
}

export default Add
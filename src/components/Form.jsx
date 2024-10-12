import { useState } from "react";
import { postData } from "../api/PostApi";

export const Form=({data,setData})=>{

      const[addData,setAddData] =useState({
            title:"",
            body:"",
      });

      const handleInputChange=(e)=>{
            const name =e.target.name;
            const value =e.target.value;

            setAddData((prev)=>{
       return{
      ...prev,
      [name]:value,
         };
            });
        };

        const addPostData= async()=>{
         const res = await postData(addData);
         console.log("res",res);
         if((res.status === 201)){
            setData([...data,res.status]);
            setAddData({title:"",body:""})
         }
        };

      //   handleformsubmit

      const handleFormSubmit=(e)=>{
            e.preventDefault();
            addPostData();
      };
      return (
            <form className="form-container" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                autoComplete="off"
                id="title"
                name="title"
                placeholder="Add Title"
                className="input-field"
                value={addData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Post</label>
              <input
                type="text"
                autoComplete="off"
                id="body"
                name="body"
                placeholder="Add Post"
                className="input-field"
                value={addData.body}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="submit-button">Add</button>
          </form>
                          );
};
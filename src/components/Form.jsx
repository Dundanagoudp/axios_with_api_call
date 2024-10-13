import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form=({data,setData ,updateDataApi,setUpdateDataApi})=>{

      const[addData,setAddData] =useState({
            title:"",
            body:"",
      });

      let isEmpty = Object.keys(updateDataApi).length ===0;

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

        useEffect(()=>{
          updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || "",

          });
        },[updateDataApi]);

        // update post

        const updatePostData=async()=>{
          try {
            const res = await updateData(updateDataApi.id, addData);
       console.log(res);
       setData((prev)=>{
        return prev.map((curEle)=>{
          return curEle,id === res.id ? res.data :curEle;
        })
       });

          } catch (error) {
            console.log(error);
          }
        };

      //   handleformsubmit

      const handleFormSubmit=(e)=>{
            e.preventDefault();
          const action = e.nativeEvent.submitter.value;
          if(action === "Add") {
            addPostData();
          } else if(action === "Edit"){
            updatePostData();
          }
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
            <button type="submit" className="submit-button" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
          </form>
                          );
};
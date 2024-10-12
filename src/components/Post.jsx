import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import { Form } from "./Form";
export const Posts = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

//   handle delete posts
 const handleDeletePost=async(id)=>{
      try {
            const res =await deletePost(id);
   if(res.status === 200){
     const newUpdatedPosts = data.filter((curPost)=>{
      return curPost.id !== id;
     });
     setData(newUpdatedPosts);
   } else{
      console.log("failed to the posts :", res.status)
   }
      } catch (error) {
            console.log(error);
            
      }
    };

  return (
    <>
    <section className="section-form">
      <Form data={data} setData={setData}/>
    </section>
    <section className="section-post">
      <ul className="grid 3-columns">
        {data.map((curEle) => {
          const { id, body, title } = curEle;
          return (
            <li key={id} className="post-card">
             <p className="post-id">ID:{id}</p>
              <h2 className="post-title">Title: {title}</h2>
              <p className="post-body">Body: {body}</p>
              <div className="btn-container">
                <button className="btn-edit">Edit</button>
                <button className="btn-delete" onClick={()=>handleDeletePost(id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
    </>
  );
};

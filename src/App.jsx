import { useEffect } from "react";
import { getPost,  } from "./api/PostApi"

export const App=()=>{

  

  const getPostData=async()=>{
 const res = await getPost();
 console.log(res)

  }

  useEffect(()=>{
    getPostData();
  },[])
  return <h1>Hello full stack app</h1>
}
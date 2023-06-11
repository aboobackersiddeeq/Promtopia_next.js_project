'use client';
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileComponents from '@components/Profile';
interface Post {
  _id: string;
}

const Profile = () => {
    const router = useRouter();
    const {data:session}:any=useSession()
    const [myPosts, setMyPosts] = useState([])
    const handleEdit = (post:any)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete =async(post:any)=>{
       const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
       if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id?.toString()}`,{
            method:'DELETE'
          })  
          const filteredPost = myPosts.filter((p:Post)=> p?._id !== post._id)
          setMyPosts(filteredPost)
        } catch (error) {
         console.log(error)   
        }
       }
    }
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/api/users/${session?.user.id}
          /posts`);
          const data = await response.json();
          setMyPosts(data);
        };
        if(session?.user.id)fetchData();
      }, []);
  return (
     <ProfileComponents 
     name='My'
     desc = 'Welcome to your presonalized profile page'
     data={myPosts}
     handleEdit={handleEdit}
     handleDelete ={handleDelete}
     />
  )
}

export default Profile
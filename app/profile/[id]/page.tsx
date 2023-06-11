'use client';
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileComponents from '@components/Profile';

const UserProfile = ({params}:any) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name")
    const {data:session}:any=useSession()
    const [userPosts, setUserPosts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/api/users/${params?.id}
          /posts`);
          const data = await response.json();
          setUserPosts(data);
        };
        if(params?.id)fetchData();
      }, [params.id]);
  return (
     <ProfileComponents 
     name={userName}
     desc = {`Welcome to ${userName} your presonalized profile page.Explore
     ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}

      data={userPosts}
     
     />
  )
}

export default UserProfile
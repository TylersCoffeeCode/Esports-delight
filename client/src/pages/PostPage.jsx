import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Client from "../services/api"


const PostPage = ({ user}) => {
    const navigate = useNavigate()


    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await Client.get('/posts')
        setPosts(res.data)
        console.log(res.data);
    }

    const createPost = () => {
        if (user) {
            navigate('/posts/create')
        } else navigate('/Account')
    }

    const viewPosts = () => {
        if (user) {
            navigate('/posts/create/myPosts')
        } else navigate('/Account')
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div className="bg-[rgb(0,31,63)] w-full h-[100vh] flex flex-wrap justify-center items-end">
            <div className="w-full h-8 mt-20 flex justify-center items-center">
                <div className="bg-[rgb(17,122,227)] text-white w-[250px] text-center rounded-xl cursor-pointer mr-2" onClick={()=>createPost()}>Create Post</div>
                <div onClick={()=>viewPosts()} className=" bg-white w-[250px] text-center rounded-xl cursor-pointer">My Posts</div>
            </div>
            <div className="w-2/4 h-[85%] overflow-y-scroll">
                <div className=" w-full">
                    {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                        <div className="bg-[rgb(17,122,227)] text-white w-full h-[550px] mb-8 border-4 border-black rounded-lg overflow-hidden">
                            <img src={post.image} alt="" className=" w-full h-4/5 border-b-4 border-black" />
                            <div className=" bg-black h-1/5">
                                <h1 className=" text-2xl font-bold ml-2">{post.content}</h1>
                                <h3 className="ml-2">{post.commentAuthor.userName}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
export default PostPage
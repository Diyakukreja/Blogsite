import React, {useEffect, useState} from 'react'
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Slug:", slug);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log("Fetched Post:", post);
                    setPost(post)
                }
                else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate]);

    const handleUpdate = (data) => {
        console.log("Updating Post:", data);
        // Call API to update the post
        appwriteService.updatePost(slug, data).then(() => {
            navigate(`/post/${slug}`);
        });
    };

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
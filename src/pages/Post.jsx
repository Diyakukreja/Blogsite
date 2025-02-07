import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false); // ✅ Track `isAuthor` separately
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth?.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                console.log("Fetched Post:", fetchedPost); 
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // ✅ Compute `isAuthor` AFTER post is fetched
    useEffect(() => {
        if (post && userData) {
            console.log("Checking author permissions...");
            console.log("Post User ID:", post?.userid); // ✅ Use `userid` instead of `userId`
            console.log("Current User ID:", userData?.$id);
            console.log("Post Data:", post);
            console.log("User Data:", userData);

            const authorCheck = post?.userid && userData?.$id && post.userid === userData.$id;
            console.log("User is author:", authorCheck);
            setIsAuthor(authorCheck);
        }
    }, [post, userData]); // ✅ Ensure it runs when post/userData updates

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.fimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {console.log("Rendering JSX - isAuthor:", isAuthor)}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post?.fimage && console.log("Featured Image ID:", post.fimage)}
                    <img
                        src={post.fimage ? appwriteService.getFilePreview(post.fimage) : "default-image-url.jpg"}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && ( // ✅ Now correctly updates
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}





// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth?.userData);

    


//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 console.log("Fetched Post:", post); // Log the fetched post data
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate,userData]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.fimage);
//                 navigate("/");
//             }
//         });
//     };

//     useEffect(() => {

//         const isAuthor = post?.userid && userData?.$id && post.userid === userData.$id;

//         console.log("Checking author permissions...");
//         console.log("Post User ID:", post?.userId);
//         console.log("Current User ID:", userData?.$id);
//         console.log("Post Data:", post);
//         console.log("User Data:", userData);
//         console.log("isAuthor:", isAuthor);
        
    
//         if (post && userData) {
//             console.log("User is author:", post?.userid === userData.$id);
//         }
//     }, [post, userData]);

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 {console.log("Rendering JSX - isAuthor:", isAuthor)}
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                 {post?.featuredImage && console.log("Featured Image ID:", post.featuredImage)}
//                     <img
//                         src={post.fimage ? appwriteService.getFilePreview(post.fimage) : "default-image-url.jpg"}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }
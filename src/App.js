import React, { useState, useEffect } from "react";
import * as $ from "jquery";
import ClipLoader from "react-spinners/ClipLoader";
import Post from "./components/Post";




export default function App() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // useEffect umesto didmount, poziva se nakon svakog rendera
    // useefect ima drugi param dodaje se da se ne bi pozivao posle svakog rendera
    useEffect(() => {
        getPosts();

        console.log("useEffect");
    }, []);

    const getPosts = () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        $.get(url, response => {
            setPosts(response);
            setIsLoading(false);
        });

    };

    if (isLoading) {
        return (
            <div>
                <ClipLoader />
            </div>
        );
    }

    console.log("posts", posts);

    return (
        <div>
            {posts.map(post => {
                return (
                    <Post key={post.id} post={post} />
                );
            })}
        </div>
    );
}


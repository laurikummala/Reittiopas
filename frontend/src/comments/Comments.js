import { useEffect } from "react";
import { useState } from "react";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi
} from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";


const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComments] = useState([])
    // Muuttuja, joka sallii aktiivisen(vastaus tilassa olevan) kommentin muokkauksen
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );

    // getReplies -funktio, joka palauttaa tietyn kommentin vastauksen

    const getReplies = (commentId) =>
        // Jos backendCommentin parentId on sama kuin vastauksen Id ->
        backendComments.filter((backendComment) => backendComment.parentId === commentId)
            // vastaus sortataan lähetysjärjestykseen
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

    const addComment = (text, parentId) => {
        console.log("addComment", text, parentId);
        // Api request
        createCommentApi(text, parentId).then((comment) => {
            // muokataan uusi kommentti kommenttien alkuun
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    // Funktio kommentin päivitystä varten
    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updateBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, teksti: text };
                }
                return backendComment;
            });
            setBackendComments(updateBackendComments);
            setActiveComment(null);
        });
    };

    // funktio kommentin poistamiseksi
    const deleteComment = (commentId) => {
        // Kysytään, halutaanko kommentti poistaa
        if (window.confirm("Haluatko varmasti poistaa kommentin?")) {
            deleteCommentApi().then(() => {
                const updateBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updateBackendComments);
            });
        }
    };

    // useEffect, koska halutaan fetchata tietoa api.js:stä
    // getCommentsApi palauttaa tiedon
    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComments(data);
        });
    }, []);
    return (
        <div className="comments">
            <h3 className="comments-title">Reitin kommentit</h3>
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId} // tarkistaa, onko käyttäjällä oikeuksia
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                ))}

            </div>
            <div className="comment-form-title">Kirjoita kommentti</div>
            <CommentForm submitLabel="Lähetä kommentti" handleSubmit={addComment} />
        </div>
    );
};

export default Comments;
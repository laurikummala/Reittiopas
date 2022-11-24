import { useEffect } from "react";
import { useState } from "react";
import {
    haeKommentit as getCommentsApi,
    luoKommentti as createCommentApi,
    poistaKommentti as deleteCommentApi,
    paivitaKommentti as updateCommentApi
} from "../features/kommentit/kommenttiService";
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

    const lisaaKommentti = (text, parentId) => {
        console.log("lisaaKommentti", text, parentId);
        // Api request
        createCommentApi(text, parentId).then((kommentti) => {
            // muokataan uusi kommentti kommenttien alkuun
            setBackendComments([kommentti, ...backendComments]);
            setActiveComment(null);
        });
    };

    // Funktio kommentin päivitystä varten
    const paivitaKommentti = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updateBackendComments = backendComments.map((backendComment) => {
                if (backendComment._id === commentId) {
                    return { ...backendComment, teksti: text };
                }
                return backendComment;
            });
            setBackendComments(updateBackendComments);
            setActiveComment(null);
        });
    };

    // funktio kommentin poistamiseksi
    const poistaKommentti = (commentId) => {
        // Kysytään, halutaanko kommentti poistaa
        if (window.confirm("Haluatko varmasti poistaa kommentin?")) {
            deleteCommentApi().then(() => {
                const updateBackendComments = backendComments.filter(
                    (backendComment) => backendComment._id !== commentId
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
            <h3 className="comments-title"> Reitin kommentit</h3>
            {backendComments.length > 0 ? (
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment._id}
                        kommentti={rootComment}
                        replies={getReplies(rootComment._id)}
                        currentUserId={currentUserId} // tarkistaa, onko käyttäjällä oikeuksia
                        poistaKommentti={poistaKommentti}
                        paivitaKommentti={paivitaKommentti}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        lisaaKommentti={lisaaKommentti}
                    />
                ))}

            </div>
             ) : (
                <h3>Reitillä ei ole vielä kommentteja.</h3>
              )}
            {/* <div className="comment-form-title">Kirjoita kommentti</div> */}
           
            <CommentForm submitLabel="Lähetä kommentti" handleSubmit={lisaaKommentti} />
            
        </div>
    );
};

export default Comments;
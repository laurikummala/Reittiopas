import { FaUserAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";

const Comment = ({
    kommentti,
    replies,
    currentUserId,
    poistaKommentti,
    paivitaKommentti,
    activeComment,
    lisaaKommentti,
    setActiveComment,
    parentId = null,
}) => {

    // Kommenttia voi muokata viiden minuutin ajan kommentin luomisen jälkeen
    const fiveMinutes = 3000;
    const timePassed = new Date() - new Date(kommentti.createdAt) > fiveMinutes;
    // Jos currentUserId on true, kommenttiin voi vastata
    const canReply = Boolean(currentUserId);
    // Jos currentUserId ja commentin userId ovat samoja, kommenttia voi muokata viiden minuutin sisällä
    const canEdit = currentUserId === kommentti.userId && !timePassed;
    // Jos currentUserId ja commentin userId ovat samoja, kommentin voi poistaa viiden minuutin sisällä
    const canDelete = currentUserId === kommentti.userId && replies.length === 0 && !timePassed;
    // Muutetaan kommentin luontiaika selkeämpään muotoon
    const createdAt = new Date(kommentti.createdAt).toLocaleString();

    const isReplying =
        activeComment &&
        activeComment._id === kommentti._id &&
        activeComment.type === "replying";

    const isEditing =
        activeComment &&
        activeComment._id === kommentti._id &&
        activeComment.type === "editing";

    const replyId = parentId ? parentId : kommentti._id;

    return (
        <div key={kommentti._id} className="comment">
            <div className="comment-image-container">
                <FaUserAlt />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{kommentti.user}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text">{kommentti.teksti}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Päivitä kommentti"
                        hasCancelButton
                        initialText={kommentti.teksti}
                        handleSubmit={(text) => paivitaKommentti(text, kommentti._id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions">

                    {canReply && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ _id: kommentti._id, type: "replying" })}>Vastaa
                        </div>
                    )}

                    {canEdit && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ _id: kommentti._id, type: "editing" })}>Muokkaa
                        </div>
                    )}

                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() =>
                                poistaKommentti(kommentti._id)}>Poista
                        </div>
                    )}
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Vastaa"
                        handleSubmit={(text) => lisaaKommentti(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                kommentti={reply}
                                key={reply._id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                paivitaKommentti={paivitaKommentti}
                                poistaKommentti={poistaKommentti}
                                lisaaKommentti={lisaaKommentti}
                                parentId={kommentti._id}
                                replies={[]}
                                // Jokaisessa vastauksessa oltava samat tiedot kuin alkuperäisessä kommentissa
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
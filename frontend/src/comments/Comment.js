import { FaUserAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";

const Comment = ({
    comment,
    replies,
    currentUserId,
    deleteComment,
    updateComment,
    activeComment,
    addComment,
    setActiveComment,
    parentId = null,
}) => {

    // Kommenttia voi muokata viiden minuutin ajan kommentin luomisen jälkeen
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    // Jos currentUserId on true, kommenttiin voi vastata
    const canReply = Boolean(currentUserId);
    // Jos currentUserId ja commentin userId ovat samoja, kommenttia voi muokata viiden minuutin sisällä
    const canEdit = currentUserId === comment.userId && !timePassed;
    // Jos currentUserId ja commentin userId ovat samoja, kommentin voi poistaa viiden minuutin sisällä
    const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
    // Muutetaan kommentin luontiaika selkeämpään muotoon
    const createdAt = new Date(comment.createdAt).toLocaleString();

    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";

    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";

    const replyId = parentId ? parentId : comment.id;

    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <FaUserAlt />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.body}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Päivitä kommentti"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions">

                    {canReply && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>Vastaa
                        </div>
                    )}

                    {canEdit && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>Muokkaa
                        </div>
                    )}

                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() =>
                                deleteComment(comment.id)}>Poista
                        </div>
                    )}
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Vastaa"
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                parentId={comment.id}
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
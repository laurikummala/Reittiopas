import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    initialText = "",
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    // Seuraava funktio ottaa tallenna napin pois päältä, jos tekstikenttä on tyhjä
    const isTextareaDisabled = text.length === 0;
    // onSubmit funktio, joka lähettää formin oletuksena
    const onSubmit = (event) => {
        event.preventDefault();
        // kutsutaan handleSubmit, joka kutsuu ulkopuolelta text:iä
        handleSubmit(text);
        // Kun kommentti on tallennettu, seuraava komento tyhjentää kommenttikentän
        setText("");
    };
    return (
        <form onSubmit={onSubmit}>
            <textarea
                className="comment-form-textarea"
                value={text}
                placeholder='Kirjoita kommentti...'
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="comment-form-button"
                disabled={isTextareaDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button" 
                    className="comment-form-button comment-form-cancel-button"
                    onClick={handleCancel}>
                    Peruuta
                </button>
            )}
        </form>
    );
};

export default CommentForm;
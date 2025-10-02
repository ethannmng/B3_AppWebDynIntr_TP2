async function fetchLastComments() {
    const API_URL = 'https://dummyjson.com/comments';

    try {
        const response = await fetch(`${API_URL}?limit=0`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        const totalComments = data.total;

        const skip = totalComments > 10 ? totalComments - 10 : 0;
        const finalResponse = await fetch(`${API_URL}?limit=10&skip=${skip}`);
        if (!finalResponse.ok) {
            throw new Error('Erreur lors de la récupération des commentaires');
        }

        const finalData = await finalResponse.json();
        return finalData.comments;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function addSingleCommentToDOM(comment) {
    const commentsList = document.getElementById('comments');
    const commentTemplate = document.getElementById('comment-template');
    const commentsCounter = document.getElementById('comments-counter');

    const commentNode = commentTemplate.content.cloneNode(true);
    commentNode.querySelector('.comment-author-name').textContent = comment.user.username;
    commentNode.querySelector('.comment-content').textContent = comment.body;
    commentNode.querySelector('.comment-author-photo').src = `https://i.pravatar.cc/32?u=${comment.user.id}`;
    
    commentsList.appendChild(commentNode);
    commentsCounter.textContent = parseInt(commentsCounter.textContent) + 1;
}

function displayComments(comments) {
    const commentsList = document.getElementById('comments');
    const commentTemplate = document.getElementById('comment-template');
    const commentsCounter = document.getElementById('comments-counter');

    commentsList.innerHTML = '';
    commentsCounter.textContent = comments.length;

    comments.forEach(comment => {
        const commentNode = commentTemplate.content.cloneNode(true);
        commentNode.querySelector('.comment-author-name').textContent = comment.user.username;
        commentNode.querySelector('.comment-content').textContent = comment.body;
        commentNode.querySelector('.comment-author-photo').src = `https://i.pravatar.cc/32?u=${comment.user.id}`;
        commentsList.appendChild(commentNode);
    });
}

(async () => {
    const comments = await fetchLastComments();
    displayComments(comments);

    const addCommentForm = document.getElementById('add-comment-form');
    const commentInput = document.getElementById('comment-input');

    addCommentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const commentBody = commentInput.value.trim();
        if (!commentBody) return;

        try {
            const response = await fetch('https://dummyjson.com/comments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: commentBody,
                    postId: 3,
                    userId: 1,
                })
            });

            const newComment = await response.json();
            addSingleCommentToDOM(newComment);
            commentInput.value = '';

        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
        }
    });
})();
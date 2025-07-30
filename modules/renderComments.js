// import { comments } from './comments.js'
import { initLikes, initComment } from './handler.js'
const commentsList = document.querySelector('.comments')

export function renderComments(comments) {
    commentsList.innerHTML = comments
        .map(
            (comment, index) => `
     <li class="comment" data-index="${index}" >
        <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${comment.date.toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })}</div>
            </div>
     <div class="comment-body">
     <div class="comment-text">${comment.text}</div>
     </div>
           <div class="comment-footer">
             <div class="likes">
               <span class="likes-counter">${comment.likes}</span>
               <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
             </div>
           </div>
     </li>
    `,
        )
        .join('')

    initLikes()
    initComment()
}
// renderComments(comments)

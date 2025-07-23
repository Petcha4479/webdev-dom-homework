import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

const textInput = document.querySelector('.add-form-text')

export const initLikes = () => {
    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = event.target.dataset.index
            const comment = comments[index]

            if (comment.isLiked) {
                comment.likes--
                comment.isLiked = false
            } else {
                comment.likes++
                comment.isLiked = true
            }
            renderComments(comments)
        })
    })
}

export const initComment = () => {
    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', (event) => {
            if (!event.target.closest('.like-button')) {
                const index = commentElement.dataset.index
                const comment = comments[index]
                textInput.value = `${comment.name}, : ${comment.text}`
                textInput.focus()
            }
        })
    })
}

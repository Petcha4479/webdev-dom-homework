import { comments, updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

export const fetchAndRender = () => {
    fetch('https://wedev-api.sky.pro/api/v1/:vady/comments', {
        method: 'GET',
    })
        .then((response) => {
            // Проверяем статус ответа
            if (!response.ok) {
                throw new Error(
                    `Ошибка сервера: ${response.status} ${response.statusText}`,
                )
            }
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments)
        })
        .catch((error) => {
            // Обрабатываем ошибки сети и другие ошибки
            console.error('Ошибка при загрузке комментариев:', error)

            // Можно добавить отображение сообщения об ошибке пользователю
            // Например:
            const commentsContainer = document.querySelector('.comments')
            if (commentsContainer) {
                commentsContainer.innerHTML = `
                    <div class="error-message">
                        <p>Не удалось загрузить комментарии. Пожалуйста, проверьте подключение к интернету и попробуйте снова.</p>
                        <p>${error.message}</p>
                    </div>
                `
            }
        })
}

'use strict'
import { renderComments } from './modules/renderComments.js'
import { comments, updateComments } from './modules/comments.js'
import { fetchAndRender } from './modules/fetchAndRender.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const button = document.querySelector('.add-form-button')
const form = document.querySelector('.add-form')
const loadingIndicator = document.createElement('div')

let savedName = ''
let savedText = ''

loadingIndicator.className = 'loading'
loadingIndicator.textContent = 'Комментарий добавляется...'
loadingIndicator.style.display = 'none'
form.parentNode.insertBefore(loadingIndicator, form)

document.querySelector('.comments').textContent = 'Загружаем комментарии...'

fetchAndRender()

button.addEventListener('click', () => {
    const name = nameInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const text = textInput.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }
    // Показываем индикатор загрузки и скрываем форму
    loadingIndicator.style.display = 'block'
    form.style.display = 'none'

    let newComment = {
        name: name,
        date: new Date(),
        text: text,
        likes: 0,
        isLiked: false,
    }

    fetch('https://wedev-api.sky.pro/api/v1/:vady/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный запрос. Проверьте введенные данные.')
            }
            if (response.status === 500) {
                throw new Error('Ошибка сервера. Попробуйте позже.')
            }
            if (!response.ok) {
                throw new Error(
                    `Ошибка ${response.status}: ${response.statusText}`,
                )
            }
            return response.json()
        })
        .then(() => {
            return fetch('https://wedev-api.sky.pro/api/v1/:vady/comments')
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Ошибка загрузки комментариев: ${response.status}`,
                )
            }
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments)
            // Очищаем форму только при успешной отправке
            nameInput.value = ''
            textInput.value = ''
            savedName = ''
            savedText = ''
        })
        .catch((error) => {
            console.error('Ошибка:', error)

            if (error.message.includes('Неверный запрос')) {
                alert(
                    'Неверно заполнены данные. Пожалуйста, проверьте и попробуйте снова.',
                )
            } else if (error.message.includes('Ошибка сервера')) {
                alert(
                    'Сервер временно недоступен. Пожалуйста, попробуйте позже.',
                )
            } else if (error.message.includes('Failed to fetch')) {
                alert(
                    'Проблемы с интернет-соединением. Проверьте подключение и попробуйте снова.',
                )
            } else {
                alert('Произошла неизвестная ошибка. Попробуйте еще раз.')
            }

            // Восстанавливаем введенные данные
            nameInput.value = savedName
            textInput.value = savedText
        })
        .finally(() => {
            // Всегда показываем форму обратно
            loadingIndicator.style.display = 'none'
            form.style.display = 'block'
        })
})

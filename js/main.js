document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector('.loading-screen');
    const content = document.querySelector('.your-page-content');
    const percentageText = document.querySelector('.loading-percentage');

    let loadedResources = 0;
    const totalResources = document.images.length + 1; // Учитываем изображения и основной контент

    const updateProgress = () => {
        const progress = Math.min(Math.round((loadedResources / totalResources) * 100), 100);
        percentageText.textContent = `${progress}%`;

        if (progress >= 100) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                content.classList.add('visible');
            }, 500); // Задержка перед скрытием прелоадера
        }
    };

    // Увеличение счетчика при загрузке каждого ресурса
    const incrementLoadedResources = () => {
        loadedResources += 1;
        updateProgress();
    };

    // Отслеживание загрузки изображений
    const images = document.images;
    for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
            incrementLoadedResources();
        } else {
            images[i].addEventListener('load', incrementLoadedResources);
            images[i].addEventListener('error', incrementLoadedResources);
        }
    }

    // Эмуляция загрузки основного контента
    setTimeout(() => {
        incrementLoadedResources();
    }, 1000); // Задержка для имитации
});




if (document.body.classList.contains('awards-page')) {
    document.querySelectorAll('.arrow-left, .arrow-right').forEach(arrow => arrow.remove());
}

const cookieNotification = document.getElementById('cookie-notification');
const cookiePopup = document.getElementById('cookie-popup');
const spaceCover = document.getElementById('space-cover');
const closePopupButton = document.getElementById('popup-close');
const customizeButton = document.getElementById('customize');
const acceptAllButton = document.getElementById('accept-all');
const rejectAllButton = document.getElementById('reject-all');
const acceptAllPopupButton = document.getElementById('accept-all-popup');
const rejectAllPopupButton = document.getElementById('reject-all-popup');
const savePreferencesButton = document.getElementById('save-preferences');
const settingsButton = document.getElementById('cookie-settings-button');

// Объект с чекбоксами
const toggles = {
    functional: document.getElementById('functional-cookies'),
    analytics: document.getElementById('analytics-cookies'),
    performance: document.getElementById('performance-cookies'),
    advertisement: document.getElementById('advertisement-cookies'),
    uncategorized: document.getElementById('uncategorized-cookies'),
};

// Функции для работы с cookies
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, val] = cookie.split('=');
        acc[key] = val;
        return acc;
    }, {});
    return cookies[name];
}

function applyCookiePreferences() {
    for (const key in toggles) {
        const toggle = toggles[key];
        const value = toggle.checked ? 'true' : 'false';
        setCookie(key + '_cookies', value);
    }
}

function loadCookiePreferences() {
    for (const key in toggles) {
        const toggle = toggles[key];
        const savedValue = getCookie(key + '_cookies');
        if (savedValue !== undefined) {
            toggle.checked = savedValue === 'true';
        }
    }
}

function disableScroll() {
    document.body.classList.add('no-scroll');
}

function enableScroll() {
    document.body.classList.remove('no-scroll');
}

// Отображение кнопки настроек
function showSettingsButton() {
    settingsButton.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const description = document.querySelector('.popup-description');
    const showMoreButton = document.createElement('span');

    // Добавляем кнопку "Show more"
    showMoreButton.className = 'popup-more';
    showMoreButton.textContent = 'Show more';
    description.parentNode.insertBefore(showMoreButton, description.nextSibling);

    // Логика переключения текста
    showMoreButton.addEventListener('click', () => {
        const isExpanded = description.classList.toggle('expanded');
        showMoreButton.textContent = isExpanded ? 'Show less' : 'Show more';
    });
});




// Проверка состояния куки и отображение уведомления
function checkCookies() {
    const functional = getCookie('functional_cookies');
    const analytics = getCookie('analytics_cookies');
    const performance = getCookie('performance_cookies');
    const advertisement = getCookie('advertisement_cookies');
    const uncategorized = getCookie('uncategorized_cookies');

    // Если хотя бы одна кука была установлена как 'true', скрываем уведомление
    if (
        functional === 'true' ||
        analytics === 'true' ||
        performance === 'true' ||
        advertisement === 'true' ||
        uncategorized === 'true'
    ) {
        cookieNotification.style.display = 'none';
        showSettingsButton(); // Показываем кнопку настроек, если куки были приняты
    } else {
        cookieNotification.style.display = 'block';
    }

    // Настройка состояния чекбоксов
    if (functional) toggles.functional.checked = functional === 'true';
    if (analytics) toggles.analytics.checked = analytics === 'true';
    if (performance) toggles.performance.checked = performance === 'true';
    if (advertisement) toggles.advertisement.checked = advertisement === 'true';
    if (uncategorized) toggles.uncategorized.checked = uncategorized === 'true';
}

// Обработчики событий
customizeButton.addEventListener('click', () => {
    cookiePopup.classList.add('active');
    spaceCover.classList.add('active');
    disableScroll();
});

closePopupButton.addEventListener('click', () => {
    cookiePopup.classList.remove('active');
    spaceCover.classList.remove('active');
    enableScroll();
});

spaceCover.addEventListener('click', () => {
    cookiePopup.classList.remove('active');
    spaceCover.classList.remove('active');
    enableScroll();
});

acceptAllButton.addEventListener('click', () => {
    for (const key in toggles) {
        setCookie(key + '_cookies', 'true');
    }
    cookieNotification.style.display = 'none';
    showSettingsButton();
});

rejectAllButton.addEventListener('click', () => {
    for (const key in toggles) {
        setCookie(key + '_cookies', 'false');
    }
    cookieNotification.style.display = 'none';
    showSettingsButton();
});

acceptAllPopupButton.addEventListener('click', () => {
    for (const key in toggles) {
        setCookie(key + '_cookies', 'true');
        toggles[key].checked = true;
    }
    cookiePopup.classList.remove('active');
    spaceCover.classList.remove('active');
    cookieNotification.style.display = 'none';
    enableScroll();
    showSettingsButton();
});

rejectAllPopupButton.addEventListener('click', () => {
    for (const key in toggles) {
        setCookie(key + '_cookies', 'false');
        toggles[key].checked = false;
    }
    cookiePopup.classList.remove('active');
    spaceCover.classList.remove('active');
    cookieNotification.style.display = 'none';
    enableScroll();
    showSettingsButton();
});

savePreferencesButton.addEventListener('click', () => {
    applyCookiePreferences();
    cookiePopup.classList.remove('active');
    spaceCover.classList.remove('active');
    enableScroll();
    cookieNotification.style.display = 'none';
    showSettingsButton();
});

// Инициализация
window.addEventListener('load', () => {
    // Загружаем сохраненные предпочтения
    loadCookiePreferences();

    // Проверяем, были ли приняты куки
    checkCookies();

    // Если куки еще не были приняты, показываем уведомление
    const anyCookieSet = Object.keys(toggles).some(key => getCookie(key + '_cookies') !== undefined);
    if (!anyCookieSet) {
        cookieNotification.style.display = 'block';
    }

    // Отображаем кнопку настроек, если куки приняты
    showSettingsButton();
});

// Обработчик для кнопки "Настройки куки"
settingsButton.addEventListener('click', () => {
    cookiePopup.classList.add('active');
    spaceCover.classList.add('active');
    disableScroll();
});




const burger = document.getElementById('burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('#space-cover');

burger.addEventListener('click', () => {
    menu.classList.toggle('menu_active'); // Добавляем/убираем класс для меню
    burger.classList.toggle('hamburger_active'); // Добавляем/убираем класс для анимации гамбургера
    overlay.classList.toggle('active'); // Добавляем/убираем затемнение
    if (menu.classList.contains('menu_active')) {
        disableScroll();
    } else {
        enableScroll();
    }
});

overlay.addEventListener('click', () => {
    menu.classList.remove('menu_active'); 
    burger.classList.remove('hamburger_active'); 
    overlay.classList.remove('active'); 
    enableScroll(); 
});

function positionBurger() {
    const menuWidth = menu.offsetWidth; 
    const burgerWidth = burger.offsetWidth; 
    const windowWidth = window.innerWidth; 

    if (windowWidth <= 768) {
        burger.style.right = '40px';
    } else {
        const leftPosition = windowWidth - menuWidth / 2 - burgerWidth / 2; 
        burger.style.left = `${leftPosition}px`;
    }
}

positionBurger();
window.addEventListener('resize', positionBurger);


// Видеопопап
document.querySelectorAll('.overlay video').forEach((vid, index, videos) => {
    vid.onclick = () => {
        const popup = document.querySelector('.popup-video');
        const popupVideo = document.querySelector('.popup-video video');
        const popupTitle = document.querySelector('.popup-title');
        const arrows = document.querySelectorAll('.popup-video .arrow-left, .popup-video .arrow-right');
    
        if (!popup || !popupVideo || !popupTitle) return;
    
        const videoSrc = vid.getAttribute('src');
        const videoTitle = vid.getAttribute('data-title');
    
        if (!videoSrc || !videoTitle) return;
    
        popupVideo.src = `${videoSrc}#t=0.1`;
        popupVideo.play();
        popupTitle.textContent = videoTitle;
        popup.classList.add('active');
    
        // Добавляем обработчик клика для закрытия при нажатии на пустую область
        popup.addEventListener('click', (e) => {
            // Проверяем, что клик был по самой области popup, а не по его дочерним элементам
            if (e.target === popup) {
                popup.classList.remove('active');
                setTimeout(() => {
                    popupVideo.pause();
                    popupVideo.src = '';
                }, 500);
            }
        });
    
        // Проверяем наличие стрелок
        if (arrows.length > 0) {
            arrows.forEach(arrow => {
                arrow.style.visibility = 'visible';
            });
    
            let currentIndex = Array.from(document.querySelectorAll('.overlay video')).indexOf(vid);
    
            const updatePopupContent = () => {
                const videos = document.querySelectorAll('.overlay video');
                const currentVideo = videos[currentIndex];
                popupVideo.src = `${currentVideo.getAttribute('src')}#t=0.1`;
                popupTitle.textContent = currentVideo.getAttribute('data-title');
                popupVideo.play();
            };
    
            document.querySelector('.arrow-left')?.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + videos.length) % videos.length;
                updatePopupContent();
            });
    
            document.querySelector('.arrow-right')?.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % videos.length;
                updatePopupContent();
            });
        }
    };
    
    // Добавляем обработчик закрытия при клике на крестик
    document.querySelector('.popup-video span')?.addEventListener('click', () => {
        const popup = document.querySelector('.popup-video');
        const popupVideo = document.querySelector('.popup-video video');
        if (popup) {
            popup.classList.remove('active');
            setTimeout(() => {
                if (popupVideo) {
                    popupVideo.pause();
                    popupVideo.src = '';
                }
            }, 500);
        }
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector('.popup-video span');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const popup = document.querySelector('.popup-video');
            const popupVideo = popup.querySelector('video');
            if (popup) {
                popup.classList.remove('active');
                setTimeout(() => {
                    if (popupVideo) {
                        popupVideo.pause();
                        popupVideo.src = ''; // Сбрасываем видео
                    }
                }, 500); // Задержка для плавного закрытия
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const galleryOverlay = document.getElementById('galleryOverlay');
    const mainPhoto = document.getElementById('mainPhoto');
    const photoTitle = document.getElementById('photoTitle');
    const photoDescription = document.getElementById('photoDescription');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const prevPreview = document.getElementById('prevPreview');
    const nextPreview = document.getElementById('nextPreview');
    const galleryClose = document.getElementById('galleryClose');
    const photos = document.querySelectorAll('.photo');
    const folderJsonPath = '/img/1 DIOR-JOY-Prints.json'; // Используйте относительный путь
    loadFolderImages(folderJsonPath);

    let currentIndex = 0;
    let currentPhotos = []; // Список фотографий из текущей папки

    if (!galleryOverlay || !photos.length) {
        return;
    }

    // Открытие попапа при клике на фото
    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            const folder = photo.dataset.folder; // Получаем папку текущей фотографии
            loadFolderImages(folder).then(images => {
                currentPhotos = images;
                currentIndex = 0; // Начинаем с первого изображения
                updateGallery(); // Обновляем попап
                galleryOverlay.classList.add('active'); // Показываем попап
            });
        });
    });

    // Закрытие попапа
    galleryClose.addEventListener('click', () => {
        galleryOverlay.classList.remove('active'); // Закрываем попап
    });

    galleryOverlay.addEventListener('click', (e) => {
        if (e.target === galleryOverlay) {
            galleryOverlay.classList.remove('active');
        }
    });

    // Стрелки навигации
    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentPhotos.length; // Переход к следующему фото
        updateGallery();
    });

    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length; // Переход к предыдущему фото
        updateGallery();
    });

    // Загрузка изображений из папки
    async function loadFolderImages(folderJsonPath) {
        try {
            const response = await fetch(folderJsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.images; // Возвращаем список изображений
        } catch (error) {
            return [];
        }
    }

    // Обновление галереи
    function updateGallery() {
        const currentPhoto = currentPhotos[currentIndex];
    
        if (!currentPhoto) return;
    
        // Обновление главного изображения
        mainPhoto.src = currentPhoto.src;
    
        // Обновление текста
        photoTitle.textContent = currentPhoto.title || 'Без названия'; // Заголовок или дефолтный текст
        photoDescription.textContent = currentPhoto.description || 'Описание отсутствует'; // Описание или дефолтный текст
    
        // Обновление превью стрелок
        const prevIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
        const nextIndex = (currentIndex + 1) % currentPhotos.length;
    
        prevPreview.src = currentPhotos[prevIndex]?.src || '';
        nextPreview.src = currentPhotos[nextIndex]?.src || '';
    }    
});

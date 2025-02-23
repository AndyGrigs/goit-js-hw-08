const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.gallery');

const galleryHtml = images
  .map(({ preview, original, description }) => {
    return `
        <li class="gallery-item">
            <a class="gallery-link" href="${original}">
                <img
                    class="gallery-image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
    `;
  })
  .join('');

galleryContainer.innerHTML = galleryHtml;

galleryContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  let currentIndex = images.findIndex(
    (img) => img.original === e.target.dataset.source
  );



  const modalHTML = `
        <div class="modal-content">
          <div class="modal-index"></div>
          <button class="modal-close">&times;</button>
          <img class="modal-image fade-in" src="${images[currentIndex].original}" alt="${images[currentIndex].description}" />
          <button class="modal-prev">&#10094;</button>
          <button class="modal-next">&#10095;</button>
          <div class="modal-caption"></div>
        </div>
      `;

  const instance = basicLightbox.create(modalHTML, { closable: false });
  instance.show();

  const modalElement = instance.element();
  const modalImage = modalElement.querySelector('.modal-image');
  const captionEl = modalElement.querySelector('.modal-caption');
  const modalIndex = modalElement.querySelector('.modal-index');
  const closeBtn = modalElement.querySelector('.modal-close');
  const prevBtn = modalElement.querySelector('.modal-prev');
  const nextBtn = modalElement.querySelector('.modal-next');


  // function updateModal(direction) {
  //   const exitClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  //   const enterClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
  
  //   modalImage.classList.add(exitClass);
  
  //   setTimeout(() => {
  //     modalImage.src = images[currentIndex].original;
  //     modalImage.alt = images[currentIndex].description;
  //     captionEl.textContent = images[currentIndex].description;
  //     modalIndex.textContent = `${currentIndex + 1}/${images.length}`;
  
  //     modalImage.classList.remove(exitClass);
  //     modalImage.classList.add(enterClass);
  //   }, 500);
  
  //   setTimeout(() => {
  //     modalImage.classList.remove(enterClass);
  //   }, 1000);
  // }

  function updateModal(direction) {
    const exitClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const enterClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
  
    // Додаємо клас для виходу старого зображення
    modalImage.classList.add(exitClass);
  
    setTimeout(() => {
      // Приховуємо зображення перед зміною src
      modalImage.style.visibility = "hidden";
  
      // Оновлюємо зображення після закінчення вихідної анімації
      modalImage.src = images[currentIndex].original;
      modalImage.alt = images[currentIndex].description;
      captionEl.textContent = images[currentIndex].description;
      modalIndex.textContent = `${currentIndex + 1}/${images.length}`;
  
      // Видаляємо клас виходу та додаємо клас входу
      modalImage.classList.remove(exitClass);
      modalImage.classList.add(enterClass);
  
      // Робимо зображення видимим після оновлення src
      modalImage.style.visibility = "visible";
    }, 400); // Таймер трохи менший за анімацію
  
    setTimeout(() => {
      modalImage.classList.remove(enterClass);
    }, 800); // Видаляємо клас входу після завершення анімації
  }
  
  // Оновлення обробників подій для кнопок
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal('prev');
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateModal('next');
  });
  

  closeBtn.addEventListener('click', ()=> instance.close());

  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal('prev');
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateModal('next');
  });
  

});

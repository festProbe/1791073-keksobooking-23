const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview > img');
const apartamentsPhotoChooser = document.querySelector('#images');
const apartamentsPhotosPreviewContainer = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

apartamentsPhotoChooser.addEventListener('change', () => {
  for (let i = 0; i < apartamentsPhotoChooser.files.length; i++) {
    const apartamentsPhoto = document.createElement('img');
    apartamentsPhoto.classList.add('ad-form__photo--element');
    const file = apartamentsPhotoChooser.files[i];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        apartamentsPhoto.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
    apartamentsPhotosPreviewContainer.appendChild(apartamentsPhoto);
  }
});

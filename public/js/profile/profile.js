window.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.querySelector('#profile-form');
  const inputAvatar = document.querySelector('#input-avatar');

  profileForm.addEventListener('click', () => {
    inputAvatar.click();
  })

  inputAvatar.addEventListener('change', () => {
    profileForm.submit();
  })
});
class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return this._userData;
  }

  setUserInfo( { name, about, avatar, _id } ) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}

export { UserInfo }

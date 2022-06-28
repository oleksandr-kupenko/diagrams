/* {isFilled: boolean, dogId: number | null, kletkaNumber: number} */
/* {id: number, name: string} */

//Вариант 1

class Priyut {
  _kletki = [
    { isFilled: boolean, dogId: number | null, kletkaNumber: 1 },
    { isFilled: boolean, dogId: number | null, kletkaNumber: 2 },
    { isFilled: boolean, dogId: number | null, kletkaNumber: 3 },
  ];

  _dogsList = [];

  addDog(dogName, kletkaNumber) {
    let currentKletka = this.kletki.find((k) => k.number == kletkaNumber);

    if (currentKletka.isFille) {
      return alert("Kletka is filled!!!");
    }

    const newDogId = _createNewDog(dogName);

    currentKletka = { ...currentKletka, filled: true, dogId: newDogId };
  }

  removeDog(kletkaNumber) {
    let currentKletka = this.kletki.find((k) => k.number == kletkaNumber);
    this.dogsList.filter((dog) => dog.id == currentKletka.dogId);
    this.currentKletka = { ...this.currentKletka, filled: false, dogId: null };
  }

  getDogsCount() {
    return this.dogsList.length;
  }

  getFilledKletkiCount() {
    return [...this.kletki].filter((k) => !k.isFilled).length;
  }

  getEmptyKletkiCount() {
    return [...this.kletki].filter((k) => !k.isFilled).length;
  }

  _createNewDog(dogName) {
    const id = Math.random().toString();
    this._dogsList.push({ id, name: dogName });
    return id;
  }
}

//************  Вариант 2

class Priyut {
  _kletki = [
    Kletka(1, false, null),
    Kletka(2, false, null),
    Kletka(3, false, null),
  ];

  _dogsList = [];

  addDog(dogName, kletkaNumber) {
    let currentKletka = this.kletki.find(
      (k) => k.getKletkaNumber() == kletkaNumber
    );

    if (currentKletka.checkIsFilled()) {
      return alert("Kletka is filled!!!");
    }

    this._dogsList.push(new Dog(dogName));
    const newDogId = this._dogsList[this.dogId.length - 1].getDogId;
    currentKletka.addDogToKletka(newDogId);
  }

  removeDog(kletkaNumber) {
    let currentKletka = this.kletki.find(
      (k) => k.getKletkaNumber() == kletkaNumber
    );
    this.dogsList.filter((dog) => dog.getId() == currentKletka.getDogId());
    this.currentKletka.clearKletka();
  }

  getDogsCount() {
    return this.dogsList.length;
  }

  getFilledKletkiCount() {
    return [...this.kletki].filter((k) => !k.checkIsFilled()).length;
  }

  getEmptyKletkiCount() {
    return [...this.kletki].filter((k) => !k.checkIsFilled()).length;
  }
}

class Kletka {
  _kletka = { number: this.number, isFilled: false, dogId: null };

  constructor(number, isFilled = false, dogId = null) {}

  getKletka() {
    return { number: this.number, isFilled: this.filled, dogId: this.dogId };
  }

  clearKletka() {
    this._kletka = { ...this.currentKletka, filled: false, dogId: null };
  }

  addDogToKletka(newDogId) {
    this._kletka = { ...currentKletka, filled: true, dogId: newDogId };
  }

  getDogId() {
    return this._kletka.dogId;
  }

  getKletkaNumber() {
    return this._kletka.number;
  }

  checkIsFilled() {
    return this._kletka.isFilled;
  }
}

class Dog {
  dog;

  constructor(name) {
    const id = Math.random().toString();
    this.dog = { id, name: name };
  }

  getDogId() {
    return this.dog.id;
  }

  getName() {
    return this.dog.name;
  }

  getId() {
    return this.dog.id;
  }
}

//******** ТРЕТИЙ ВАРИАНТ */

class Priyut {
  _kletki = [
    Kletka(1, false, null),
    Kletka(2, false, null),
    Kletka(3, false, null),
  ];

  _dogsList = [];

  addDog(dogName, kletkaNumber) {
    let currentKletka = this.kletki.find(
      (k) => k.getKletkaNumber() == kletkaNumber
    );

    if (currentKletka.checkIsFilled()) {
      return alert("Kletka is filled!!!");
    }

    const newDogId = _createNewDog(dogName);
    currentKletka.addDogToKletka(newDogId);
  }

  removeDog(kletkaNumber) {
    let currentKletka = this.kletki.find(
      (k) => k.getKletkaNumber() == kletkaNumber
    );
    this.dogsList.filter((dog) => dog.id == currentKletka.dogId);
    this.currentKletka.clearKletka();
  }

  getDogsCount() {
    return this.dogsList.length;
  }

  getFilledKletkiCount() {
    return [...this.kletki].filter((k) => !k.checkIsFilled()).length;
  }

  getEmptyKletkiCount() {
    return [...this.kletki].filter((k) => !k.checkIsFilled()).length;
  }

  _createNewDog(dogName) {
    const id = Math.random().toString();
    this._dogsList.push({ id, name: dogName });
    return id;
  }
}

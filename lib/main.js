export class Pawket {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  openPawket() {
    console.log('opening Pawket');
    window.open(this.baseUrl + '#/connect', 'Pawket', 'width=390,height=844');
    // do something else
  }
}

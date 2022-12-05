export class Pawket {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "https://wallet.pr.supernova.uchaindb.com/";
  }

  openPawket() {
    console.log("opening Pawket");
    window.open(this.baseUrl + "#/connect", "Pawket", "width=390,height=844");
    // do something else
  }
}

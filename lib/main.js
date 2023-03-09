export class Pawket {
  defaultOptions = {
    baseUrl: "https://pawket.app",
    network: "ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb",
    width: 390,
    height: 844,
    name: "Pawket",
    timeout: 2000,
  };

  constructor(GlobalOptions = {}) {
    this.configs = assignOptions({}, this.defaultOptions, GlobalOptions);
  }

  _openPawket(options = {}) {
    let configs = assignOptions({}, this.configs, options);
    this.pawket = window.open(
      configs.baseUrl + "#/connect",
      configs.name + Date.now(),
      `width=${configs.width},height=${configs.height}`
    );
  }

  _sendMessage(app, data, options = {}) {
    let configs = assignOptions({}, this.configs, options);
    setTimeout(
      () =>
        this.pawket?.postMessage(
          JSON.stringify({
            app: app,
            data: data,
            network: configs.network,
          }),
          configs.baseUrl
        ),
      configs.timeout
    );
  }

  _getMessage() {
    return new Promise((resolve, reject) => {
      window.onmessage = (event) => {
        if (event.data.status == "success") {
          resolve(event.data.msg);
        } else {
          reject(event.data.msg);
        }
      };
    });
  }

  async takeOffer(offerText, options = {}) {
    this._openPawket(options);
    this._sendMessage("take-offer", offerText, options);
    try {
      const res = await this._getMessage();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async send(address, options = {}) {
    this._openPawket(options);
    this._sendMessage("send", address, options);
    try {
      const res = await this._getMessage();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAddress(options = {}) {
    this._openPawket(options);
    this._sendMessage("get-address", {}, options);
    try {
      const res = await this._getMessage();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDid(options = {}) {
    this._openPawket(options);
    this._sendMessage("get-did", {}, options);
    try {
      const res = await this._getMessage();
      return res;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async signWithDid(did, message, options = {}) {
    this._openPawket(options);
    const data = JSON.stringify({ did: did, message: message });
    this._sendMessage("sign-with-did", data, options);
    try {
      const res = await this._getMessage();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}

function assignOptions(target, ...sources) {
  const options = sources.map((x) => {
    return Object.entries(x)
      .filter(([, value]) => value !== undefined)
      .reduce((obj, [key, value]) => ((obj[key] = value), obj), {});
  });
  return Object.assign(target, ...options);
}

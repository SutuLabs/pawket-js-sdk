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

  _sendMessage(cmd, data, options = {}) {
    let configs = assignOptions({}, this.configs, options);
    setTimeout(
      () =>
        this.pawket?.postMessage(
          JSON.stringify({
            cmd: cmd,
            data: data,
            network: configs.network,
          }),
          configs.baseUrl
        ),
      configs.timeout
    );
  }

  _getMessage(cmd) {
    const pawket = this.pawket;
    return new Promise((resolve, reject) => {
      let received = false;
      window.onmessage = (event) => {
        if (event.origin !== this.configs.baseUrl || event.data.cmd != cmd) return;
        received = true;
        if (event.data.status == "success") {
          resolve(event.data.msg);
        } else {
          if (!event.data.status) event.data.status = "unknown";
          reject(event.data);
        }
      };

      const timer = setInterval(function () {
        if (received) {
          clearInterval(timer);
          return;
        }

        if (pawket.closed) {
          clearInterval(timer);
          reject({ status: "closed" });
        }
      }, 1000);
    });
  }

  takeOffer(offerText, options = {}) {
    const cmd = "take-offer";
    this._openPawket(options);
    this._sendMessage(cmd, offerText, options);
    return this._getMessage(cmd);
  }

  send(address, options = {}) {
    const cmd = "send";
    this._openPawket(options);
    this._sendMessage(cmd, address, options);
    return this._getMessage(cmd);
  }

  getAddress(options = {}) {
    const cmd = "get-address";
    this._openPawket(options);
    this._sendMessage(cmd, {}, options);
    return this._getMessage(cmd);
  }

  getDid(options = {}) {
    const cmd = "get-did";
    this._openPawket(options);
    this._sendMessage(cmd, {}, options);
    return this._getMessage(cmd);
  }

  signWithDid(did, message, options = {}) {
    const cmd = "sign-with-did";
    this._openPawket(options);
    const data = JSON.stringify({ did: did, message: message });
    this._sendMessage(cmd, data, options);
    return this._getMessage(cmd);
  }

  addCat(id, name = "", options = {}) {
    const cmd = "add-cat";
    this._openPawket(options);
    const data = JSON.stringify({ id: id, name: name });
    this._sendMessage(cmd, data, options);
    return this._getMessage(cmd);
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

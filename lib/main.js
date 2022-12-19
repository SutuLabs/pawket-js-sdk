export class Pawket {
  defaultOptions = {
    baseUrl: "https://pawket.app",
    networkId: "ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb",
    width: 390,
    height: 844,
    name: "Pawket",
    timeout: 2000,
  };

  constructor(GlobalOptions = {}) {
    this.configs = assignOptions({}, this.defaultOptions, GlobalOptions);
  }

  _openPawket(options = {}) {
    let configs = assignOptions({}, this.defaultOptions, options);
    window.open(configs.baseUrl + "#/connect", configs.name, `width=${configs.width},height=${configs.height}`);
  }

  _sendMessage(app, data, options = {}) {
    let configs = assignOptions({}, this.defaultOptions, options);
    setTimeout(
      () =>
        pawket?.postMessage(
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

  takeOffer(offerText, options = {}) {
    this._openPawket(options);
    this._sendMessage("take-offer", offerText, options);
  }

  send(address, options = {}) {
    this._openPawket(options);
    this._sendMessage("send", address, options);
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
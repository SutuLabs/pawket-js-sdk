const { createApp } = Vue;
createApp({
  data() {
    return {
      baseUrl: "https://pawket.app",
      selected: "transfer",
      sendAddress: "",
      signDid: "",
      signAddress: "",
      signDidMessage: "",
      signAddressMessage: "",
      signDidRes: "",
      signAddressRes: "",
      accountAddress: "",
      accountDid: "",
      offerText: "",
      showToast: false,
      toastText: "",
      catName: "",
      catId: "",
    };
  },
  methods: {
    async signWithDid() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const res = await client.signWithDid(this.signDid, this.signDidMessage);
        this.signDidRes = res;
        this.openToast("success");
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async signWithAddress() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const res = await client.signWithAddress(this.signAddress, this.signAddressMessage);
        this.signAddressRes = res;
        this.openToast("success");
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async addCat() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const res = await client.addCat(this.catId, this.catName);
        this.openToast("success: " + res);
        this.catId = "";
        this.catName = "";
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async transfer() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const res = await client.send(this.sendAddress);
        this.openToast("success: " + res);
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async takeOffer() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const msg = await client.takeOffer(this.offerText);
        this.openToast("success: " + msg);
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async getAddress() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const address = await client.getAddress();
        this.accountAddress = address;
        this.openToast("success: " + address);
      } catch (error) {
        this.openToast(error.status);
      }
    },
    async getDid() {
      const client = new chia.Pawket({ baseUrl: this.baseUrl });
      try {
        const did = await client.getDid();
        this.accountDid = did;
        this.openToast("success");
      } catch (error) {
        this.openToast(error.status);
      }
    },
    openToast(text) {
      this.showToast = true;
      this.toastText = text;
      // reset time to 0 second
      clearTimeout(this.timer);

      // auto close toast after 5 seconds
      this.timer = setTimeout(() => {
        this.showToast = false;
      }, 5000);
    },
    closeToast() {
      this.showToast = false;
    },
    copy(copyText) {
      const textArea = document.createElement("textarea");
      textArea.value = copyText;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.warn("failed to copy: ", err);
      }

      this.openToast("Copied to Clipboard!");

      document.body.removeChild(textArea);
    },
  },
}).mount("#app");

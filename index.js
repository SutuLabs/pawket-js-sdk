const { createApp } = Vue;
createApp({
  data() {
    return {
      selected: "transfer",
      sendAddress: "",
      did: "",
      signMessage: "",
      signRes: "",
      accountAddress: "",
      accountDid: "",
      offerText: "",
      showToast: false,
      toastText: "",
    };
  },
  methods: {
    async signWithDid() {
      const client = new chia.Pawket();
      try {
        const res = await client.signWithDid(this.did, this.signMessage);
        this.signRes = res;
        this.openToast("success");
      } catch (error) {
        this.openToast(error);
      }
    },
    async transfer() {
      const client = new chia.Pawket();
      try {
        const res = await client.send(this.sendAddress);
        this.openToast("success: " + res);
      } catch (error) {
        this.openToast(error);
      }
    },
    async takeOffer() {
      const client = new chia.Pawket();
      try {
        const msg = await client.takeOffer(this.offerText);
        this.openToast("success: " + msg);
      } catch (error) {
        this.openToast(error);
      }
    },
    async getAddress() {
      const client = new chia.Pawket();
      try {
        const address = await client.getAddress();
        this.accountAddress = address;
        this.openToast("success: " + address);
      } catch (error) {
        this.openToast(error);
      }
    },
    async getDid() {
      const client = new chia.Pawket();
      try {
        const did = await client.getDid();
        this.accountDid = did;
        this.openToast("success");
      } catch (error) {
        this.openToast(error);
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

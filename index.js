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
    signWithDid() {
      const client = new chia.Pawket();
      client.signWithDid(this.did, this.signMessage);
      window.addEventListener("message", (event) => {
        if (event.origin == window.location.origin) return;
        this.signRes = event.data;
      });
    },
    transfer() {
      const client = new chia.Pawket();
      client.send(this.sendAddress);
    },
    takeOffer() {
      const client = new chia.Pawket();
      client.takeOffer(this.offerText);
    },
    getAddress() {
      const client = new chia.Pawket();
      client.getAddress();
      window.addEventListener("message", (event) => {
        if (event.origin == window.location.origin) return;
        this.accountAddress = event.data;
      });
    },
    getDid() {
      const client = new chia.Pawket();
      client.getDid();
      window.addEventListener("message", (event) => {
        if (event.origin == window.location.origin) return;
        this.accountDid = event.data;
      });
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

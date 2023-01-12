const { createApp } = Vue;
createApp({
  data() {
    return {
      selected: "transfer",
      sendAddress: "",
      did: "",
      signMessage: "",
      signRes: "",
      offerText: "",
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

      document.body.removeChild(textArea);
    },
  },
}).mount("#app");

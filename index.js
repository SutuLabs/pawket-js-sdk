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
  },
}).mount("#app");

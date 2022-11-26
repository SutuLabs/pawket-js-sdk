// This is a unconfigurable version of the script

const baseUrl = 'https://wallet.pr.supernova.uchaindb.com/';

export const openPawket = () => {
  console.log('opening Pawket');
  window.open(baseUrl + '#/connect', 'Pawket', 'width=390,height=844');
  // do something else
};

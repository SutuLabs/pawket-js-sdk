 sed 's/chia/chiaPawket/1' ./dist/pawket.iife.js;
 echo 'if (chia){chia.Pawket = chiaPawket.Pawket}else{var chia = chiaPawket}' >> ./dist/pawket.iife.js;
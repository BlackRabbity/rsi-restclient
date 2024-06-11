import axios from 'axios';


export function configureAxiosWithCert(certPath) {
  fetch(certPath)
    .then(response => response.arrayBuffer())
    .then(certBuffer => {
      const certData = new Uint8Array(certBuffer);
      console.log(certData, certPath);

      axios.defaults.httpsAgent = new window.https.Agent({ ca: certData });
    })
    .catch(error => {
      console.error('Error fetching certificate:', error);
    });
}

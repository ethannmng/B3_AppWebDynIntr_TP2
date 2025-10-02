async function sleep(ms) {
    return new Promise( (resolve, reject) => {
        if (typeof ms !== 'number' || ms < 0) {
            return reject(new Error('MS doit être un nombre.'));
        }

        setTimeout(() => resolve(), ms);
    })
}

sleep("Je ne suis pas un nombre")
    .then(() => console.log('Je ne devrais pas être appelé'))
    .catch(error => console.error('Erreur capturée:', error.message));

sleep(1000)
    .then(() => console.log('1 seconde...'));
sleep(2000)
    .then(() => console.log('2 secondes...'));
sleep(3000)
    .then(() => console.log('3 secondes...'));
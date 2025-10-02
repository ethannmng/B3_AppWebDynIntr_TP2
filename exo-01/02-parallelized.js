async function sleep(ms) {
    return new Promise( (resolve, reject) => {
        if (typeof ms !== 'number' || ms < 0) {
            return reject(new Error('MS doit être un nombre.'));
        }

        setTimeout(() => resolve(), ms);
    })
}

async function main() {
    await Promise.all([
        sleep(1000),
        sleep(2000),
        sleep(2000)
    ]);
}

console.log('Début');
console.time('execution');
main()
  .then(() => {
    console.timeEnd('execution');
  });
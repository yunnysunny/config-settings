process.on('uncaughtException', function(err) {
    console.error('excption uncaughted',err);
});
setInterval(function() {},2000);
// new Promise(function(resolve) {
//     resolve();
// }).then(function() {
//     setTimeout(function() {
//         throw new Error('xxxx');
//     });
    
// }).catch(function(err) {
//     throw err;
// });
// (function() {throw new Error('eee');})();

const p1 = new Promise(function(resolve) {
    resolve(1);
}).then(function() {
    return 2;
}).then(function(num) {
    console.log(num);
});

const p2 = new Promise(function(resolve, reject) {
    reject('p2 error');
}).then(function() {
    return 2;
}).then(function(num) {
    console.log(num);
});

Promise.all([p1,p2]).catch(function(err) {
    console.error(err);
});

const p3 = new Promise(function(resolve) {
    resolve(3);
}).then(function() {
    return 4;
});

(async function() {
    const n = await p3;
    console.log('p3',n);
})();
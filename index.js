
const fs = require('fs');

/** Blocking -> Synchronous way */
// const txtIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(txtIn);

// const txtOut = `This is what we know about avocado: \n${txtIn}
// \n Created on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', txtOut);
// console.log(txtOut);


/** Asynchronous -> Non blocking way */
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=> {

//     if (err) return console.log('ERROR.......!');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=> {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `File1: ${data2}\nFile2: ${data3}`, err => {
//                 console.log("You file has been written1️⃣");
//             });
//         });
//     });
// });
// console.log("Will read file...");
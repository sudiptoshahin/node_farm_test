
const fs = require('fs');
const http = require('http');
const url = require('url');

/************ FILES ***************/
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
/************* FILES ENDS *****************/

/********************************************/
/************ SERVER STARTS ****************/

/** PAGES */

/** replace template */
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;

}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {
    
    const pathName = request.url;
    //  OVERVIEW
    if (pathName === '/' || pathName === '/overview') {
        response.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        response.end(output);

    //  PRODUCT PAGE
    } else if(pathName === '/product') {
        response.end('This is product page');

    //  API
    } else if(pathName === '/api') {
        response.end(dataObj);
        // console.log(productData);

    //  NOT FOUND
    } else {
        response.writeHead(404, {
            "Content-type": "text/html",
            'my-own-header': 'hello-world header'
        });
        // console.log(response.getHeader('my-own-header'));
        response.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=> {
    console.log('Listening on port 8000........');
});

/*********SERER ENDS ************/

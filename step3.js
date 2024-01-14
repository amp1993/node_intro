const fs = require('fs');
const process = require('process');
const axios = require('axios')



function handleOutput(text, output) {
    if (output) {
        fs.writeFileSync(out, text, 'utf8', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

        });

    } else {
        console.log('text');
    }
}


function cat(path, output) {

    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);
        } else {
            handleOutput(data, output);
        }
    });
}


async function webCat(url, output) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
        handleOutput(res.data, output)
    }
    catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);

    }

}
let path 
let out

if (process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
} else {
    process.argv[2] 
}






if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}
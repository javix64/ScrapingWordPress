const axios = require('axios');
const fs = require('fs');

const partialSite = process.argv[2]
const site = 'https://'+partialSite+'/wp-json/wp/v2/'

let posts = site+'posts?per_page=100&page=';
let pages = site+'pages?per_page=100&page=';
axios.get(posts+1).then(r=>{
    let totalPages = parseInt(r.headers['x-wp-totalpages']);
    //obtengo el numero total de paginas
    // hago un bucle para que entre en cada una de las paginas y saquen todos los posts
    let promiseArr = [];
    for (let i = 1; i < totalPages+1; i++) {
        console.log('entro en el bucle',i);
        promiseArr.push(axios.get(posts+1));
    }
    console.log(promiseArr);
    Promise.all(promiseArr).then(res =>{
        let postsJSON = [];
        let arrayJson = {};
        res.forEach(e=>{
            let arr = e.data;
            arr.forEach(e => {
                let post = {
                    url : e.link
                }
                postsJSON.push(post);
                arrayJson.post= post;
                arrayJson= postsJSON;
                const data = JSON.stringify(arrayJson);
            })
        })
    })
    
});
//content : e.content.rendered
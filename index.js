const axios = require('axios');
const fs = require('fs');

const partialSite = process.argv[2]
const site = 'https://'+partialSite+'/wp-json/wp/v2/'

const postOrPage = ['posts','pages'];
let websPagesOrPosts = '?per_page=100';

let paginationPages = 0;
let paginationPosts = 0;
let arrPages = [];
let arrPosts = [];
axios.get(site+postOrPage[0]+websPagesOrPosts).then(r=>{
    paginationPosts = parseInt(r.headers['x-wp-totalpages']);
    console.log('Total posts: ',parseInt(r.headers['x-wp-total']))
    for (let i = 1; i < paginationPosts+1; i++) {
        axios.get(site+postOrPage[0]+websPagesOrPosts+'&page='+i).then(r=>{
            r.data.forEach(e => {
                let data = {
                    title : e.title.rendered,
                    link : e.link,
                    content : e.content.rendered
                }
                arrPosts.push(data);
            });
        }).then( r=> {
            let jsonPosts = {};
            jsonPosts.posts = arrPosts;
            fs.writeFileSync('posts.json',JSON.stringify(jsonPosts));
            if(paginationPosts===i){
                console.log('All posts written!');
            }
        })
    }
})

axios.get(site+postOrPage[1]+websPagesOrPosts).then(r=>{
    paginationPages = parseInt(r.headers['x-wp-totalpages']);
    console.log('Total pages: ',parseInt(r.headers['x-wp-total']))
    for (let i = 1; i < paginationPages+1; i++) {
        axios.get(site+postOrPage[1]+websPagesOrPosts+'&page='+i).then(r=>{
            r.data.forEach(e => {
                let data = {
                    title : e.title.rendered,
                    link : e.link,
                    content : e.content.rendered
                }
                arrPages.push(data);
            });
        }).then( r=> {
            let jsonPages = {};
            jsonPages.pages = arrPages;
            fs.writeFileSync('pages.json',JSON.stringify(jsonPages));
            if(paginationPages===i){
                console.log('All pages written!');
            }
        })
    }
})
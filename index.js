const axios = require('axios');
const fs = require('fs');

//////////////////////////////////////////////////////////////////////////
//
// If you are reading this, maybe you don't understand it. Me neither :')
//
//////////////////////////////////////////////////////////////////////////

const siteUrl = process.argv[2]

const sitePosts = `https://${siteUrl}/wp-json/wp/v2/posts?per_page=100`;
const sitePages = `https://${siteUrl}/wp-json/wp/v2/pages?per_page=100`;

// can i group it in one function?
const getAllPosts = (url) =>{
    return axios
        .get(url)
        .then(res =>{
            const totalPages = parseInt(res.headers['x-wp-totalpages'], 10);
            const totalItems = parseInt(res.headers['x-wp-total'], 10);
            return {
                totalPages,
                totalItems
            }
        });
}
const getAllPages = (url) => {
    axios.get(sitePages).then(res =>{

    });
}

const listPosts =  async (url) => {
    const urlPosts = await getAllPosts(url).then(e=>{
        const { totalItems, totalPages} = e;
        console.info('Total posts to download:', totalItems);
        const urlPages = [];
        for (let i = 1; i < totalPages +1; i++) {
            const pagePost = `${sitePosts}&page=${i}`;
            urlPages.push(pagePost);
        }
        return urlPages;
    })
    const promises = [];
    for (let i = 0; i < urlPosts.length; i++) {
        promises.push(axios.get(urlPosts[i]));
    }
    const data = Promise.all(promises).then(e=>{return e});
    const mapPosts = (await data).map((element)=>{return element.data})
    return mapPosts;
}
//////////////////////////////////////////////////////////////////////////
//
// It should be a better way to do the next function, but this is the only that i know is working.
// If you know some different way, open an issue. Thanks :D.
//
//////////////////////////////////////////////////////////////////////////
const downloadPosts = async (url) =>{
    await listPosts(url).then(e=>{e.map(i=>{
        i.map(il=>{
            console.log(il.title)
        })
    })});
}


const main = () => {
    downloadPosts(sitePosts);
}
main();
// STRUCTURE
// get total number of pages from pages/posts from: response.headers['x-wp-totalpages'];
// get total pages/posts from: response.headers['x-wp-total'];
// from each page/post extract:
//      title, link, content

// axios.get(site+postOrPage[0]+websPagesOrPosts).then(r=>{
//     paginationPosts = parseInt(r.headers['x-wp-totalpages']);
//     console.log('Total posts: ',parseInt(r.headers['x-wp-total']))
//     for (let i = 1; i < paginationPosts+1; i++) {
//         axios.get(site+postOrPage[0]+websPagesOrPosts+'&page='+i).then(r=>{
//             r.data.forEach(e => {
//                 let data = {
//                     title : e.title.rendered,
//                     link : e.link,
//                     content : e.content.rendered
//                 }
//                 arrPosts.push(data);
//             });
//         }).then( r=> {
//             let jsonPosts = {};
//             jsonPosts.posts = arrPosts;
//             fs.writeFileSync('posts.json',JSON.stringify(jsonPosts));
//             if(paginationPosts===i){
//                 console.log('All posts written!');
//             }
//         })
//     }
// })

// axios.get(site+postOrPage[1]+websPagesOrPosts).then(r=>{
//     paginationPages = parseInt(r.headers['x-wp-totalpages']);
//     console.log('Total pages: ',parseInt(r.headers['x-wp-total']))
//     for (let i = 1; i < paginationPages+1; i++) {
//         axios.get(site+postOrPage[1]+websPagesOrPosts+'&page='+i).then(r=>{
//             r.data.forEach(e => {
//                 let data = {
//                     title : e.title.rendered,
//                     link : e.link,
//                     content : e.content.rendered
//                 }
//                 arrPages.push(data);
//             });
//         }).then( r=> {
//             let jsonPages = {};
//             jsonPages.pages = arrPages;
//             fs.writeFileSync('pages.json',JSON.stringify(jsonPages));
//             if(paginationPages===i){
//                 console.log('All pages written!');
//             }
//         })
//     }
// })
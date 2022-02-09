const axios = require('axios');
const fs = require('fs');

//////////////////////////////////////////////////////////////////////////
//
// How i could join pages and posts, because i have copied almost everything
// split it only in two functions...
// right now is done
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
const getAllPages = (url) =>{
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

const listPosts =  async (url) => {
    const urlPosts = await getAllPosts(url).then(e=>{
        const { totalItems, totalPages} = e;
        console.info('Total posts for download:', totalItems);
        const urlPosts = [];
        for (let i = 1; i < totalPages +1; i++) {
            const pagePost = `${sitePosts}&page=${i}`;
            urlPosts.push(pagePost);
        }
        return urlPosts;
    })
    const promises = [];
    for (let i = 0; i < urlPosts.length; i++) {
        promises.push(axios.get(urlPosts[i]));
    }
    const data = Promise.all(promises).then(e=>{return e});
    const mapPosts = (await data).map((element)=>{return element.data})
    return mapPosts;
}

const listPages =  async (url) => {
    const urlPages = await getAllPages(url).then(e=>{
        const { totalItems, totalPages} = e;
        console.info('Total pages for download:', totalItems);
        const urlPages = [];
        for (let i = 1; i < totalPages +1; i++) {
            const pagePost = `${sitePages}&page=${i}`;
            urlPages.push(pagePost);
        }
        return urlPages;
    })
    const promises = [];
    for (let i = 0; i < urlPages.length; i++) {
        promises.push(axios.get(urlPages[i]));
    }
    const data = Promise.all(promises).then(e=>{return e});
    const mapPages = (await data).map((element)=>{return element.data})
    return mapPages;
}

const downloadPosts = async (url) =>{
    const arrayItems = []
    await listPosts(url).then(list=>{
        console.log('Downloading posts');
        list.map(array=>{
            array.map(el=>{
                const { date, title, content, link} = el;
                const item = {
                    date,
                    title: title.rendered,
                    content: content.rendered,
                    link
                };
                arrayItems.push(item);
            })

        })
    })
    const file = `./json_downloaded/${siteUrl}-posts.json`;
    fs.writeFileSync(file, JSON.stringify(arrayItems));
    console.info(`Posts downloaded and save it in: ${file}`)

}
const downloadPages = async (url) =>{
    const arrayItems = []
    await listPages(url).then(list=>{
        console.log('Downloading pages');
        list.map(array=>{
            array.map(el=>{
                const { date, title, content, link} = el;
                const item = {
                    date,
                    title: title.rendered,
                    content: content.rendered,
                    link
                };
                arrayItems.push(item);
            })

        })
    })
    const file = `./json_downloaded/${siteUrl}-pages.json`;
    fs.writeFileSync(file, JSON.stringify(arrayItems));
    console.info(`Pages downloaded and save it in: ${file}`)

}

const main = () => {
    downloadPosts(sitePosts);
    downloadPages(sitePages);
}
main();
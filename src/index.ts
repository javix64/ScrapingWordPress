import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';

class ScrapingWordPress{
    url: string;
    constructor(url:string){
        this.url = url;
    }
    extractDomain(url:string) {
        const domainWithParams = url.replace(/(^\w+:|^)\/\//, '');
        const parts = domainWithParams.split('/')[0];
        const domainWithoutParams = parts.split('?')[0];
        return domainWithoutParams;
    }
    inquirerInput(){
                
    }
};
/*

*/
// const baseUrl = `https://${siteUrl}/wp-json/wp/v2`;
// const perPage = 100;

// async function getAllItems(endpoint) {
//   try {
//     const response = await axios.get(`${baseUrl}/${endpoint}?per_page=${perPage}`);
//     const totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
//     const totalItems = parseInt(response.headers['x-wp-total'], 10);
//     return { totalPages, totalItems };
//   } catch (error) {
//     throw new Error(`Error fetching ${endpoint}: ${error.message}`);
//   }
// }

// async function fetchItems(endpoint) {
//   const { totalItems, totalPages } = await getAllItems(endpoint);
//   console.info(`Total ${endpoint} for download: ${totalItems}`);

//   const items = [];

//   for (let i = 1; i <= totalPages; i++) {
//     const response = await axios.get(`${baseUrl}/${endpoint}?per_page=${perPage}&page=${i}`);
//     items.push(...response.data);

//     // Calculate progress percentage
//     const progress = ((i / totalPages) * 100).toFixed(2);
//     console.info(`Fetching ${endpoint}... Progress: ${progress}%`);
//   }

//   return items;
// }

// async function downloadAndSaveItems(endpoint, fileName) {
//   const items = await fetchItems(endpoint);

//   const formattedItems = items.map((item) => ({
//     date: item.date,
//     title: item.title.rendered,
//     content: item.content.rendered,
//     link: item.link,
//   }));

//   const file = `./json_downloaded/${fileName}`;
//   try {
//     await fs.writeFile(file, JSON.stringify(formattedItems, null, 2));
//     console.info(`${fileName} downloaded and saved in: ${file}`);
//   } catch (error) {
//     throw new Error(`Error saving ${fileName}: ${error.message}`);
//   }
// }

// async function main() {
//   try {
//     await downloadAndSaveItems('posts', `${siteUrl}-posts.json`);
//     await downloadAndSaveItems('pages', `${siteUrl}-pages.json`);
//   } catch (error) {
//     console.error(error.message);
//   }
// }
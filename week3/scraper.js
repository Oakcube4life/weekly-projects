const https = require("https");
const readline = require("readline");

//create input/output interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//prompt for user input
rl.question("What youtube link are you scraping: ", (url) => {
    scrapeLink(url); 
    rl.close();
});

function scrapeLink(url) {
    if (url.startsWith("https://www.youtube.com/watch?v=")) {

        //send a GET request to the URL
        https.get(url, (response) => {
            let html = "";

            //get data chunks
            response.on("data", (chunk) => {
                html += chunk;
            });

            //process the data
            response.on("end", () => {
                if (response.statusCode === 200) {
                    //parse html for title element and print text
                    const regex = /<title>(.*?)<\/title>/gi;
                    
                    let videoTitleOriginalText = regex.exec(html)[0];
                    let videoTitleNewText = videoTitleOriginalText.substring(7, videoTitleOriginalText.length - 18);

                    console.log("Video title: " + videoTitleNewText);
                } else {
                    console.log("Failed to get page from url. Status code: " + response.statusCode);
                }
            }); 

        }).on("error", (error) => {
            console.error("Error fetching the page: ", error.message);
        });
    } else {
        console.log("URL is not a valid youtube link!");
    }
}
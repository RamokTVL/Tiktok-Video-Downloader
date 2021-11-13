const nano = require("nanoexpress");
const bodyParser = require('@nanoexpress/middleware-body-parser/cjs');
const app = nano();
app.use(bodyParser());
const puppeteer = require("puppeteer");
const fs = require("fs")

async function laver(sonzeub, avecuncotontige) {

    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"'
    ];

    const options = {
        args,
        headless: true,
        ignoreHTTPSErrors: true,
        userDataDir: './tmp'
    };

    const browser = await puppeteer.launch(options);





    app.post("/", async(req, res) => {
        req.body = JSON.parse(req.body)
        
        if(!req.body.tiktok) return res.status(400).json({message: "no link provided"})
        const page = await browser.newPage();

        if(!req.body.tiktok.includes("tiktok.com")) return res.status(400).json({message: "no link provided"})
        await page.goto(req.body.tiktok, {waitUntil: "networkidle0"});
        const preloadFile = fs.readFileSync('./preload.js', 'utf8');
        await page.evaluateOnNewDocument(preloadFile);
        const link = await page.evaluate(() => document.body.getElementsByTagName("video")[0].src);
        await page.close();
        res.json({
            link: link,
            message: "cc tiens ta vidéo fdp"
        }).status(203);
        
    });

    app.get("/:filename", async(req, res) => {
        if(fs.existsSync(req.params.filename)) {
            res.status(200).sendFile(req.params.filename);
        } else {
            res.status(404).json({
                code: 404,
                message: "The route does not exist"
            });
        }
        
    });
}

laver(null, null);

app.listen(8080);
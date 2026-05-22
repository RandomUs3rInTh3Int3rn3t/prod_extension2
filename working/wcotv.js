const mangayomiSources = [{
    "name": "WCOTV",
    "lang": "en",
    "baseUrl": "https://www.wco.tv",
    "apiUrl": "",
    "iconUrl": "https://www.wco.tv/favicon.ico",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.0.2",
    "dateFormat": "",
    "dateFormatLocale": "",
    "isNsfw": false,
    "hasCloudflare": true,
    "sourceCodeUrl": "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/prod_extension2/main/working/wcotv.js",
    "isFullData": false,
    "appMinVerReq": "0.5.0",
    "additionalParams": "",
    "sourceCodeLanguage": 1,
    "pkgPath": "working/wcotv.js",
    "id": 237905581
}];

class DefaultExtension extends MProvider {
    constructor() {
        super();
        this.client = new Client();
        this.baseUrl = "https://www.wco.tv";
    }

    cleanUrl(url) {
        if (!url) return "";
        if (url.startsWith("//")) return "https:" + url;
        if (url.startsWith("/")) return this.baseUrl + url;
        return url.replace(/https?:\/\/(?:[a-zA-Z0-9-]+\.)?wco(?:animedub|animesub|stream|flix|forever|fun|flik)\.(?:tv|net|com|org|co)/gi, this.baseUrl);
    }

    async getPopular(page) {
        if (page > 1) return { list: [], hasNextPage: false };
        const res = await this.client.get(this.baseUrl);
        return this.parseAnimeList(res.body);
    }

    async getLatestUpdates(page) {
        if (page > 1) return { list: [], hasNextPage: false };
        const res = await this.client.get(this.baseUrl);
        return this.parseAnimeList(res.body);
    }

    async search(query, page, filters) {
        if (query !== "") {
            const res = await this.client.post(`${this.baseUrl}/search`, {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }, `catara=${encodeURIComponent(query)}&konuara=series`);
            return this.parseAnimeList(res.body);
        }

        let category = "recent";
        if (filters) {
            for (const filter of filters) {
                if (filter.type === "category") {
                    category = filter.values;
                }
            }
        }

        if (category === "recent") {
            return this.getPopular(page);
        }

        let url = this.baseUrl;
        if (category === "dubbed") {
            url = `${this.baseUrl}/dubbed-anime-list`;
        } else if (category === "subbed") {
            url = `${this.baseUrl}/subbed-anime-list`;
        } else if (category === "cartoons") {
            url = `${this.baseUrl}/cartoon-list`;
        } else if (category === "movies") {
            url = `${this.baseUrl}/movie-list`;
        } else if (category === "ova") {
            url = `${this.baseUrl}/ova-list`;
        }

        if (page > 1) return { list: [], hasNextPage: false };

        const res = await this.client.get(url);
        return this.parseDirectoryList(res.body);
    }

    async getDetail(url) {
        let cleanUrl = this.cleanUrl(url);
        let res = await this.client.get(cleanUrl);
        let doc = new Document(res.body);

        if (!cleanUrl.includes("/anime/")) {
            const seriesLink = doc.selectFirst("h2 a[href*='/anime/']") || doc.selectFirst("a[href*='/anime/']");
            if (seriesLink) {
                const seriesUrl = this.cleanUrl(seriesLink.attr("href"));
                res = await this.client.get(seriesUrl);
                doc = new Document(res.body);
            }
        }

        const title = doc.selectFirst("h1")?.text.trim() || doc.selectFirst("#sidebar_cat h2")?.text.trim() || "";
        const description = doc.selectFirst("#cat-genre-desc p, #sidebar_cat p, .cat-desc")?.text.trim() || "";
        
        let imageUrl = doc.selectFirst("#sidebar_cat img, .cat-image img, img[src*='catimg']")?.attr("src") || "";
        imageUrl = this.cleanUrl(imageUrl);

        const genres = doc.select("a.genre-buton, .genre a").map(e => e.text.trim());

        const chapters = doc.select("#episodeList a, .dark-episode-box a, .cat-list-el a").map(e => {
            const epTitle = e.text.replace(/\r?\n|\r/g, " ").trim();
            const epUrl = this.cleanUrl(e.attr("href"));
            return {
                name: epTitle,
                url: epUrl
            };
        }).reverse();

        return {
            name: title,
            imageUrl: imageUrl,
            description: description,
            genre: genres,
            status: 0, // Ongoing
            chapters: chapters
        };
    }

    async getVideoList(url) {
        const cleanUrl = this.cleanUrl(url);
        const res = await this.client.get(cleanUrl, {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        });
        const html = res.body;

        let varName = "";
        let arrayStr = "";
        let offset = 0;

        const match = html.match(/var\s+(\w+)\s*=\s*\[([\s\S]*?)\]\s*;[\s\S]*?String\.fromCharCode\(parseInt\(atob\(\w+\)\.replace\(\/\\D\/g\s*,\s*['"]{2}\)\)\s*-\s*(\d+)\)/);
        if (match) {
            varName = match[1];
            arrayStr = match[2];
            offset = parseInt(match[3]);
        } else {
            const arrayMatch = html.match(/var\s+(\w+)\s*=\s*\[([\s\S]*?)\]\s*;/);
            const offsetMatch = html.match(/-\s*(\d+)\);/);
            if (arrayMatch && offsetMatch) {
                varName = arrayMatch[1];
                arrayStr = arrayMatch[2];
                offset = parseInt(offsetMatch[1]);
            }
        }

        if (!arrayStr || offset === 0) return [];

        const base64Strings = arrayStr.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(s => s.length > 0);
        let decryptedHtml = "";
        for (const s of base64Strings) {
            try {
                const decoded = this.base64Decode(s);
                const digits = decoded.replace(/\D/g, '');
                if (digits) {
                    decryptedHtml += String.fromCharCode(parseInt(digits) - offset);
                }
            } catch (e) {
                // ignore
            }
        }

        const iframeSrc = decryptedHtml.match(/<iframe[^>]+src="([^"]+)"/)?.[1];
        if (!iframeSrc) return [];

        const videoJsUrl = iframeSrc.replace("index.php", "video-js.php");
        const playerRes = await this.client.get(videoJsUrl, {
            "Referer": cleanUrl,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        });
        const playerHtml = playerRes.body;

        const apiMatch = playerHtml.match(/\$\.getJSON\s*\(\s*["']([^"']+)["']/);
        if (!apiMatch) return [];

        const apiPath = apiMatch[1];
        const apiUrl = "https://embed.wcostream.com" + apiPath;

        const apiRes = await this.client.get(apiUrl, {
            "Referer": videoJsUrl,
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        });

        const data = JSON.parse(apiRes.body);
        const server = data.server || data.cdn;
        if (!server) return [];

        const videos = [];
        const headers = {
            "Referer": "https://embed.wcostream.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        };

        if (data.enc) {
            videos.push({
                url: `${server}/getvid?evid=${data.enc}`,
                originalUrl: `${server}/getvid?evid=${data.enc}`,
                quality: "SD Quality",
                headers: headers
            });
        }
        if (data.hd) {
            videos.push({
                url: `${server}/getvid?evid=${data.hd}`,
                originalUrl: `${server}/getvid?evid=${data.hd}`,
                quality: "HD Quality",
                headers: headers
            });
        }
        if (data.fhd) {
            videos.push({
                url: `${server}/getvid?evid=${data.fhd}`,
                originalUrl: `${server}/getvid?evid=${data.fhd}`,
                quality: "FHD Quality",
                headers: headers
            });
        }

        return videos;
    }

    parseAnimeList(html, selector = "ul.items li, .items li, .items-list li") {
        const doc = new Document(html);
        const items = doc.select(selector);
        const anime = [];
        const seen = new Set();
        for (const item of items) {
            const a = item.selectFirst(".recent-release-episodes a") || item.selectFirst("a");
            if (!a) continue;
            const href = this.cleanUrl(a.attr("href"));
            if (!href) continue;
            if (seen.has(href)) continue;
            seen.add(href);
            const name = a.text.trim();
            let imageUrl = item.selectFirst("img")?.attr("src") || "";
            imageUrl = this.cleanUrl(imageUrl);
            anime.push({
                name: name,
                imageUrl: imageUrl,
                link: href
            });
        }
        return {
            list: anime,
            hasNextPage: false
        };
    }

    parseDirectoryList(html) {
        const doc = new Document(html);
        const items = doc.select(".ddmcc ul li a, .ddmcc li a, .series-list a");
        const anime = [];
        const seen = new Set();
        for (const item of items) {
            const href = this.cleanUrl(item.attr("href"));
            if (!href) continue;
            if (seen.has(href)) continue;
            seen.add(href);
            const name = item.text.trim();
            anime.push({
                name: name,
                imageUrl: "",
                link: href
            });
        }
        return {
            list: anime,
            hasNextPage: false
        };
    }

    base64Decode(input) {
        try {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var str = String(input).replace(/[=]+$/, '');
            if (str.length % 4 == 1) return ""; 
            for (
                var bc = 0, bs, buffer, idx = 0, output = '';
                buffer = str.charAt(idx++);
                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                buffer = chars.indexOf(buffer);
            }
            return output;
        } catch (e) {
            return "";
        }
    }

    getFilterList() {
        return [
            {
                type: "category",
                name: "Category",
                values: [
                    { name: "Recent Releases", value: "recent" },
                    { name: "Dubbed Anime", value: "dubbed" },
                    { name: "Subbed Anime", value: "subbed" },
                    { name: "Cartoons", value: "cartoons" },
                    { name: "Movies", value: "movies" },
                    { name: "OVA Series", value: "ova" }
                ]
            }
        ];
    }
}

const mangayomiSources = [{
    "name": "Animetsu",
    "lang": "en",
    "baseUrl": "https://animetsu.net",
    "apiUrl": "https://animetsu.net/v2/api",
    "iconUrl": "https://animetsu.net/favicon.ico",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.0.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "isNsfw": false,
    "hasCloudflare": false,
    "sourceCodeUrl": "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/prod_extension2/main/working/animetsu.js",
    "isFullData": false,
    "appMinVerReq": "0.5.0",
    "additionalParams": "",
    "sourceCodeLanguage": 1,
    "id": 491823904,
    "notes": "Animetsu anime streaming using their REST API.",
    "pkgPath": "working/animetsu.js"
}];

class DefaultExtension extends MProvider {
    constructor() {
        super();
        this.client = new Client();
        this.baseUrl = "https://animetsu.net";
        this.apiUrl = "https://animetsu.net/v2/api";
    }

    getHeaders() {
        return {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "Origin": "https://animetsu.net",
            "Referer": "https://animetsu.net/"
        };
    }

    getStreamHeaders() {
        return {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Referer": "https://animetsu.net/"
        };
    }


    async getPopular(page) {
        var url = this.apiUrl + "/anime/search?sort=popularity&page=" + page;
        var res = await this.client.get(url, this.getHeaders());
        var data = JSON.parse(res.body);
        var list = [];
        for (var item of (data.results || [])) {
            list.push({
                name: item.title.english || item.title.romaji || item.title.native || "Unknown Title",
                imageUrl: item.cover_image.large || item.cover_image.medium || item.cover_image.small || "",
                link: "https://animetsu.net/anime/" + item.id
            });
        }
        var hasNextPage = data.last_page > page;
        return { list: list, hasNextPage: hasNextPage };
    }

    async getLatestUpdates(page) {
        var url = this.apiUrl + "/anime/search?sort=date_desc&page=" + page;
        var res = await this.client.get(url, this.getHeaders());
        var data = JSON.parse(res.body);
        var list = [];
        for (var item of (data.results || [])) {
            list.push({
                name: item.title.english || item.title.romaji || item.title.native || "Unknown Title",
                imageUrl: item.cover_image.large || item.cover_image.medium || item.cover_image.small || "",
                link: "https://animetsu.net/anime/" + item.id
            });
        }
        var hasNextPage = data.last_page > page;
        return { list: list, hasNextPage: hasNextPage };
    }

    async search(query, page, filters) {
        var url = this.apiUrl + "/anime/search?page=" + page;
        if (query) {
            url += "&query=" + encodeURIComponent(query);
        }
        if (filters && filters.length > 0) {
            for (var filter of filters) {
                if (filter.type_name === "SelectFilter") {
                    var selectedValue = filter.values[filter.state].value;
                    if (selectedValue) {
                        if (filter.name === "Sort By") {
                            url += "&sort=" + selectedValue;
                        } else if (filter.name === "Status") {
                            url += "&status=" + selectedValue;
                        }
                    }
                }
            }
        }
        var res = await this.client.get(url, this.getHeaders());
        var data = JSON.parse(res.body);
        var list = [];
        for (var item of (data.results || [])) {
            list.push({
                name: item.title.english || item.title.romaji || item.title.native || "Unknown Title",
                imageUrl: item.cover_image.large || item.cover_image.medium || item.cover_image.small || "",
                link: "https://animetsu.net/anime/" + item.id
            });
        }
        var hasNextPage = data.last_page > page;
        return { list: list, hasNextPage: hasNextPage };
    }

    async getDetail(url) {
        var match = url.match(/\/anime\/([a-zA-Z0-9_\-]+)/);
        if (!match) throw new Error("Invalid URL: " + url);
        var id = match[1];

        var infoRes = await this.client.get(this.apiUrl + "/anime/info/" + id, this.getHeaders());
        var info = JSON.parse(infoRes.body);

        var epsRes = await this.client.get(this.apiUrl + "/anime/eps/" + id, this.getHeaders());
        var eps = JSON.parse(epsRes.body);

        var chapters = [];
        for (var ep of eps) {
            chapters.push({
                name: ep.name || ("Episode " + ep.ep_num),
                url: "https://animetsu.net/watch/" + id + "?ep=" + ep.ep_num,
                dateUpload: ep.aired_at ? String(new Date(ep.aired_at).getTime()) : null
            });
        }

        var status = 5; // Unknown
        if (info.status === "RELEASING") status = 0;
        else if (info.status === "FINISHED") status = 1;

        return {
            name: info.title.english || info.title.romaji || info.title.native || "Unknown Title",
            imageUrl: info.cover_image.large || info.cover_image.medium || info.cover_image.small || "",
            description: info.description ? info.description.replace(/<[^>]*>/g, '') : "",
            genre: info.genres || [],
            status: status,
            chapters: chapters
        };
    }

    async getVideoList(url) {
        var idMatch = url.match(/\/watch\/([a-zA-Z0-9_\-]+)/);
        var epMatch = url.match(/[?&]ep=(\d+)/);
        if (!idMatch || !epMatch) return [];

        var animeId = idMatch[1];
        var epNum = epMatch[1];
        var audioType = new SharedPreferences().get("stream_type") || "sub";

        var serversRes = await this.client.get(this.apiUrl + "/anime/servers/" + animeId + "/" + epNum, this.getHeaders());
        var servers = JSON.parse(serversRes.body);

        var videos = [];
        var streamHeaders = this.getStreamHeaders();

        for (var server of servers) {
            try {
                var sourceUrl = this.apiUrl + "/anime/oppai/" + animeId + "/" + epNum + "?server=" + server.id + "&source_type=" + audioType;
                var sourceRes = await this.client.get(sourceUrl, this.getHeaders());
                var sourceData = JSON.parse(sourceRes.body);

                var subtitles = [];
                if (sourceData.subs && Array.isArray(sourceData.subs)) {
                    for (var sub of sourceData.subs) {
                        subtitles.push({
                            label: sub.lang,
                            file: sub.url
                        });
                    }
                }

                if (sourceData.sources && Array.isArray(sourceData.sources)) {
                    for (var src of sourceData.sources) {
                        var videoUrl = src.url;
                        if (src.need_proxy) {
                            videoUrl = "https://swiftstream.top/proxy" + (videoUrl.startsWith("/") ? "" : "/") + videoUrl;
                        }
                        
                        var label = server.id.toUpperCase() + " - " + src.quality + " (" + audioType.toUpperCase() + ")";
                        videos.push({
                            url: videoUrl,
                            originalUrl: videoUrl,
                            quality: label,
                            subtitles: subtitles,
                            headers: streamHeaders
                        });
                    }
                }
            } catch (e) {
                console.log("Error fetching sources for server " + server.id + ": " + e);
            }
        }

        return videos;
    }

    async getPageList(url) {
        return [];
    }

    getFilterList() {
        return [
            {
                type_name: "SelectFilter",
                name: "Sort By",
                state: 0,
                values: [
                    { type_name: "SelectOption", name: "Trending", value: "trending" },
                    { type_name: "SelectOption", name: "Popularity", value: "popularity" },
                    { type_name: "SelectOption", name: "Average Score", value: "average_score" },
                    { type_name: "SelectOption", name: "Release Date", value: "date_desc" },
                    { type_name: "SelectOption", name: "Favourites", value: "favourites" }
                ]
            },
            {
                type_name: "SelectFilter",
                name: "Status",
                state: 0,
                values: [
                    { type_name: "SelectOption", name: "All", value: "" },
                    { type_name: "SelectOption", name: "Ongoing", value: "RELEASING" },
                    { type_name: "SelectOption", name: "Finished", value: "FINISHED" },
                    { type_name: "SelectOption", name: "Upcoming", value: "NOT_YET_RELEASED" },
                    { type_name: "SelectOption", name: "Cancelled", value: "CANCELLED" }
                ]
            }
        ];
    }

    getSourcePreferences() {
        return [
            {
                key: "stream_type",
                listPreference: {
                    title: "Preferred Audio Type",
                    summary: "Prefer subtitled (sub) or dubbed (dub) audio",
                    valueIndex: 0,
                    entries: ["Sub", "Dub"],
                    entryValues: ["sub", "dub"]
                }
            }
        ];
    }
}

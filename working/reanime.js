const mangayomiSources = [{
    "name": "ReAnime",
    "lang": "en",
    "baseUrl": "https://reanime.to",
    "apiUrl": "https://reanime.to",
    "iconUrl": "https://reanime.to/favicon.ico",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.1.3",
    "dateFormat": "",
    "dateFormatLocale": "",
    "isNsfw": false,
    "hasCloudflare": false,
    "sourceCodeUrl": "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/prod_extension2/main/working/reanime.js",
    "isFullData": false,
    "appMinVerReq": "0.5.0",
    "additionalParams": "",
    "sourceCodeLanguage": 1,
    "id": 847291854,
    "notes": "ReAnime streaming extension",
    "pkgPath": "working/reanime.js"
}];

var _K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
function _sha256Bytes(b){var m=[];for(var i=0;i<b.length;i++)m.push(b[i]);var bl=m.length*8;m.push(128);while(m.length%64!==56)m.push(0);m.push(0,0,0,0,(bl>>>24)&255,(bl>>>16)&255,(bl>>>8)&255,bl&255);var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];function rr(v,n){return(v>>>n)|(v<<(32-n));}for(var o=0;o<m.length;o+=64){var W=[];for(var t=0;t<16;t++)W[t]=(m[o+t*4]<<24)|(m[o+t*4+1]<<16)|(m[o+t*4+2]<<8)|m[o+t*4+3];for(var t=16;t<64;t++){W[t]=(W[t-16]+(rr(W[t-15],7)^rr(W[t-15],18)^(W[t-15]>>>3))+W[t-7]+(rr(W[t-2],17)^rr(W[t-2],19)^(W[t-2]>>>10)))|0;}var a=H[0],b2=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];for(var t=0;t<64;t++){var t1=(h+(rr(e,6)^rr(e,11)^rr(e,25))+((e&f)^(~e&g))+_K[t]+W[t])|0;var t2=((rr(a,2)^rr(a,13)^rr(a,22))+((a&b2)^(a&c)^(b2&c)))|0;h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b2;b2=a;a=(t1+t2)|0;}H[0]=(H[0]+a)|0;H[1]=(H[1]+b2)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;}var out=new Uint8Array(32);for(var i=0;i<8;i++){out[i*4]=(H[i]>>>24)&255;out[i*4+1]=(H[i]>>>16)&255;out[i*4+2]=(H[i]>>>8)&255;out[i*4+3]=H[i]&255;}return out;}
function _sha256(msg){var b=[];for(var i=0;i<msg.length;i++){var c=msg.charCodeAt(i);if(c<128)b.push(c);else if(c<2048){b.push(192|(c>>6));b.push(128|(c&63));}else{b.push(224|(c>>12));b.push(128|((c>>6)&63));b.push(128|(c&63));}}var h=_sha256Bytes(new Uint8Array(b));var hex='';for(var i=0;i<32;i++)hex+=('0'+(h[i]&255).toString(16)).slice(-2);return hex;}
function _b64Decode(s){var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var o=[];s=s.replace(/[=]+$/,'');for(var i=0,b=0,bits=0;i<s.length;i++){b=(b<<6)|c.indexOf(s[i]);bits+=6;while(bits>=8){bits-=8;o.push((b>>bits)&255);}}return new Uint8Array(o);}
var _SB=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var _ISB=new Array(256);for(var _i=0;_i<256;_i++)_ISB[_SB[_i]]=_i;
var _RC=[1,2,4,8,16,32,64,128,27,54];
function _xt(a){return((a<<1)^(a&128?27:0))&255;}
function _ml(a,b){var r=0;for(var i=0;i<8;i++){if(b&1)r^=a;a=_xt(a);b>>=1;}return r;}
function _aesDecryptCBC(ct,key,iv){var Nk=key.length/4,Nr=Nk+6,W=new Uint8Array(16*(Nr+1));for(var i=0;i<key.length;i++)W[i]=key[i];for(var i=Nk;i<4*(Nr+1);i++){var t=[W[(i-1)*4],W[(i-1)*4+1],W[(i-1)*4+2],W[(i-1)*4+3]];if(i%Nk===0){var tmp=t[0];t[0]=_SB[t[1]]^_RC[i/Nk-1];t[1]=_SB[t[2]];t[2]=_SB[t[3]];t[3]=_SB[tmp];}else if(Nk>6&&i%Nk===4){for(var x=0;x<4;x++)t[x]=_SB[t[x]];}W[i*4]=W[(i-Nk)*4]^t[0];W[i*4+1]=W[(i-Nk)*4+1]^t[1];W[i*4+2]=W[(i-Nk)*4+2]^t[2];W[i*4+3]=W[(i-Nk)*4+3]^t[3];}var out=[],prev=iv;for(var off=0;off<ct.length;off+=16){var s=new Uint8Array(16);for(var i=0;i<16;i++)s[i]=ct[off+i]^W[Nr*16+i];for(var r=Nr-1;r>=0;r--){var tt=s[13];s[13]=s[9];s[9]=s[5];s[5]=s[1];s[1]=tt;tt=s[10];s[10]=s[2];s[2]=tt;tt=s[14];s[14]=s[6];s[6]=tt;tt=s[3];s[3]=s[7];s[7]=s[11];s[11]=s[15];s[15]=tt;for(var i=0;i<16;i++)s[i]=_ISB[s[i]];for(var i=0;i<16;i++)s[i]^=W[r*16+i];if(r>0){var ns=new Uint8Array(16);for(var c=0;c<4;c++){var j=c*4;ns[j]=_ml(14,s[j])^_ml(11,s[j+1])^_ml(13,s[j+2])^_ml(9,s[j+3]);ns[j+1]=_ml(9,s[j])^_ml(14,s[j+1])^_ml(11,s[j+2])^_ml(13,s[j+3]);ns[j+2]=_ml(13,s[j])^_ml(9,s[j+1])^_ml(14,s[j+2])^_ml(11,s[j+3]);ns[j+3]=_ml(11,s[j])^_ml(13,s[j+1])^_ml(9,s[j+2])^_ml(14,s[j+3]);}s=ns;}}for(var i=0;i<16;i++)s[i]^=prev[i];for(var i=0;i<16;i++)out.push(s[i]);prev=ct.slice(off,off+16);}var p=out[out.length-1];if(p>0&&p<=16){var v=true;for(var i=0;i<p;i++)if(out[out.length-1-i]!==p)v=false;if(v)out.splice(out.length-p,p);}return out;}
function _runWasmScramble(wb64,f1,f2,f3,oH){var w=_b64Decode(wb64),mem=new Uint8Array(65536),g0=oH,kl=f1.length;var Y=1000,V=Y+kl,T=V+kl,O=T+kl;for(var i=0;i<kl;i++){mem[Y+i]=f1[i];mem[V+i]=f2[i];mem[T+i]=f3[i];}var p=8,fb=[];while(p<w.length){var si=w[p++],sl=0,sh=0;while(true){var b=w[p++];sl|=(b&127)<<sh;sh+=7;if(!(b&128))break;}if(si===10){var fc=0;sh=0;while(true){var b=w[p++];fc|=(b&127)<<sh;sh+=7;if(!(b&128))break;}for(var fi=0;fi<fc;fi++){var bl=0;sh=0;while(true){var b=w[p++];bl|=(b&127)<<sh;sh+=7;if(!(b&128))break;}var bd=[];for(var bi=0;bi<bl;bi++)bd.push(w[p++]);fb.push(bd);}break;}p+=sl;}if(fb.length<2)return f1;var c=fb[1],lc=[Y,V,T,O,kl],cp=0,sh2=0,ld=0;sh=0;while(true){var b=c[cp++];ld|=(b&127)<<sh;sh+=7;if(!(b&128))break;}for(var li=0;li<ld;li++){var cn=0;sh=0;while(true){var b=c[cp++];cn|=(b&127)<<sh;sh+=7;if(!(b&128))break;}cp++;for(var ci=0;ci<cn;ci++)lc.push(0);}var be={},bs2=[];for(var sp=cp;sp<c.length;sp++){var so=c[sp];if(so===2||so===3){sp++;bs2.push(sp-1);}else if(so===11){if(bs2.length>0)be[bs2.pop()]=sp;}else if(so===0x41||so===0x20||so===0x21||so===0x22||so===0x23||so===0x24||so===12||so===13){while(c[++sp]&128);}else if(so===0x2d||so===0x3a){while(c[++sp]&128);while(c[++sp]&128);}}var st=[],bs=[];function rl(){var v=0,s=0;while(true){var b=c[cp++];v|=(b&127)<<s;s+=7;if(!(b&128))break;}return v;}function rs(){var v=0,s=0,b;do{b=c[cp++];v|=(b&127)<<s;s+=7;}while(b&128);if(s<32&&(b&64))v|=(-1<<s);return v;}function br(d){for(var i=0;i<d;i++)bs.pop();var t=bs[bs.length-1];if(!t){cp=c.length;return;}if(t.t==='l')cp=t.p+2;else{bs.pop();cp=t.e+1;}}var mx=500000;while(cp<c.length&&mx-->0){var op=c[cp++];if(op===2||op===3){var bt=c[cp++];bs.push({t:op===2?'b':'l',p:cp-2,e:be[cp-2]});}else if(op===11){if(bs.length>0)bs.pop();else break;}else if(op===12){br(rl());}else if(op===13){var d=rl();if(st.pop())br(d);}else if(op===0x41)st.push(rs());else if(op===0x20)st.push(lc[rl()]);else if(op===0x21)lc[rl()]=st.pop();else if(op===0x22){var li=rl();lc[li]=st[st.length-1];}else if(op===0x24){rl();g0=st.pop();}else if(op===0x23){rl();st.push(g0);}else if(op===0x6a){var b2=st.pop();st.push((st.pop()+b2)|0);}else if(op===0x6b){var b2=st.pop();st.push((st.pop()-b2)|0);}else if(op===0x6c){var b2=st.pop();st.push(Math.imul(st.pop(),b2));}else if(op===0x71){var b2=st.pop();st.push(st.pop()&b2);}else if(op===0x72){var b2=st.pop();st.push(st.pop()|b2);}else if(op===0x73){var b2=st.pop();st.push(st.pop()^b2);}else if(op===0x74){var b2=st.pop();st.push(st.pop()<<b2);}else if(op===0x75){var b2=st.pop();st.push(st.pop()>>>b2);}else if(op===0x76){var b2=st.pop();st.push(st.pop()>>b2);}else if(op===0x2d){var a=rl(),o2=rl();st.push(mem[(st.pop()+o2)&0xffff]&255);}else if(op===0x3a){var a=rl(),o2=rl();var vl=st.pop();mem[(st.pop()+o2)&0xffff]=vl&255;}else if(op===0x45)st.push(st.pop()===0?1:0);else if(op===0x46){var b2=st.pop();st.push(st.pop()===b2?1:0);}else if(op===0x47){var b2=st.pop();st.push(st.pop()!==b2?1:0);}else if(op===0x48){var b2=st.pop();st.push(st.pop()<b2?1:0);}else if(op===0x49){var b2=st.pop();st.push((st.pop()>>>0)<(b2>>>0)?1:0);}else if(op===0x4a){var b2=st.pop();st.push(st.pop()>b2?1:0);}else if(op===0x4b){var b2=st.pop();st.push((st.pop()>>>0)>(b2>>>0)?1:0);}else if(op===0x4c){var b2=st.pop();st.push(st.pop()<=b2?1:0);}else if(op===0x4d){var b2=st.pop();st.push((st.pop()>>>0)<=(b2>>>0)?1:0);}else if(op===0x4e){var b2=st.pop();st.push(st.pop()>=b2?1:0);}else if(op===0x4f){var b2=st.pop();st.push((st.pop()>>>0)>=(b2>>>0)?1:0);}else if(op===1){}else break;}var r=new Uint8Array(kl);for(var i=0;i<kl;i++)r[i]=mem[O+i];return r;}
function _hmacSha256(k,m){if(k.length>64)k=_sha256Bytes(k);var ip=new Uint8Array(64),op=new Uint8Array(64);for(var i=0;i<64;i++){var kv=i<k.length?k[i]:0;ip[i]=kv^0x36;op[i]=kv^0x5c;}var inn=new Uint8Array(64+m.length);inn.set(ip);inn.set(m,64);var ih=_sha256Bytes(inn);var ou=new Uint8Array(96);ou.set(op);ou.set(ih,64);return _sha256Bytes(ou);}
function _pbkdf2Sha256(pw,salt,iter,dl){var r=new Uint8Array(dl);for(var bk=1;bk<=Math.ceil(dl/32);bk++){var sb=new Uint8Array(salt.length+4);sb.set(salt);sb[salt.length]=(bk>>>24)&255;sb[salt.length+1]=(bk>>>16)&255;sb[salt.length+2]=(bk>>>8)&255;sb[salt.length+3]=bk&255;var u=_hmacSha256(pw,sb),ac=new Uint8Array(u);for(var it=1;it<iter;it++){u=_hmacSha256(pw,u);for(var j=0;j<32;j++)ac[j]^=u[j];}var off=(bk-1)*32;for(var j=0;j<32&&off+j<dl;j++)r[off+j]=ac[j];}return r;}

// ============ Extension ============
class DefaultExtension extends MProvider {
    constructor() {
        super();
        this.client = new Client();
    }

    getPreference(key) {
        try { return new SharedPreferences().get(key); } catch (e) { return null; }
    }

    getHeaders() {
        var customUA = this.getPreference("custom_user_agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0";
        var cfClearance = this.getPreference("cf_clearance") || "2emQnzqAuEOAE4ViBfXN7xEf9euPr7l6oeYnEqKN75I-1784356100-1.2.1.1-uR61Z4ty5QfJP6qzO5scNCtROyWWjVdLw0ii9t0XryPv6xMTdocGCOee9DFvitgiNyQVxEODjlndVW.UeCBSJeVKpDJirPLlLsuafybyQnVEWvp3p7HpQ7glrQgkwnZ8XMPymBiBkoxNkCBiFLfg2j5RN5f_XaByYiFKQQzvAMD2zMN2Lk.k3U0ypSyhfCCNpwjB..A2HESnb.3Q_cynS1xN.c3yrzpoCRXj8Vvo74D1VqQzcr3u6XYjAJPRs1JLDDllA.bNOBLhBu_rHXTEhCPPGJY8Jigd3TZKJJhPMFpimamT9DOMy0V_Lkls1UU6dt8jvUPB_D995XqIKYMd1miTSTWR3TNAGrhoKZ3U5ttucao1pw1OXS6ND.PngKH1unamABl02KjAN1S_zxdoscIxlYXWzvxSP7oB8lHHjKTjgpRX1_Ftg87K.EkmOJOr";
        var headers = {
            "User-Agent": customUA,
            "Referer": "https://reanime.to/",
            "Accept": "application/json, text/plain, */*"
        };
        if (cfClearance) {
            headers["Cookie"] = "cf_clearance=" + cfClearance;
        }
        return headers;
    }

    unflatten(index, arr, cache) {
        if (!cache) cache = new Map();
        if (typeof index !== "number" || index < 0 || index >= arr.length) return index;
        if (cache.has(index)) return cache.get(index);
        var val = arr[index];
        if (Array.isArray(val)) {
            var res = [];
            cache.set(index, res);
            for (var i = 0; i < val.length; i++) res.push(this.unflatten(val[i], arr, cache));
            return res;
        } else if (val && typeof val === "object") {
            var obj = {};
            cache.set(index, obj);
            for (var k in val) obj[k] = this.unflatten(val[k], arr, cache);
            return obj;
        }
        return val;
    }

    async getPopular(page) {
        var limit = 30;
        var offset = (page - 1) * limit;
        try {
            var res = await this.client.get(
                "https://reanime.to/api/v1/search?q=&limit=" + limit + "&offset=" + offset + "&sort=POPULARITY_DESC",
                this.getHeaders()
            );
            var data = JSON.parse(res.body);
            var results = [];
            var total = 0;
            if (Array.isArray(data)) {
                results = data;
                total = data.length;
            } else if (data && typeof data === 'object') {
                results = data.results || data.data || data.list || data.anime || [];
                total = data.total || results.length;
            }
            var list = [];
            for (var item of results) {
                var name = item.name || (item.title ? (item.title.english || item.title.romaji || item.title.native || item.title) : "") || "";
                list.push({
                    name: name,
                    imageUrl: (item.cover_image && (item.cover_image.extra_large || item.cover_image.large)) || "",
                    link: item.anime_id || item.slug || ""
                });
            }
            var hasNextPage = offset + results.length < total;
            return { list: list, hasNextPage: hasNextPage };
        } catch (e) {
            console.log("ReAnime getPopular error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    async getLatestUpdates(page) {
        var limit = 30;
        try {
            var res = await this.client.get(
                "https://reanime.to/api/v1/home/latest-aired?limit=" + limit,
                this.getHeaders()
            );
            var data = JSON.parse(res.body);
            var results = [];
            if (Array.isArray(data)) {
                results = data;
            } else if (data && typeof data === 'object') {
                results = data.results || data.data || data.list || data.anime || [];
            }
            var list = [];
            for (var item of results) {
                var animeObj = item.anime || item;
                var name = animeObj.name || (animeObj.title ? (animeObj.title.english || animeObj.title.romaji || animeObj.title.native || animeObj.title) : "") || "";
                list.push({
                    name: name,
                    imageUrl: (animeObj.cover_image && (animeObj.cover_image.extra_large || animeObj.cover_image.large)) || "",
                    link: animeObj.anime_id || animeObj.slug || ""
                });
            }
            return { list: list, hasNextPage: false };
        } catch (e) {
            console.log("ReAnime getLatestUpdates error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    async search(query, page, filters) {
        try {
            var limit = 30;
            var offset = (page - 1) * limit;
            var res = await this.client.get(
                "https://reanime.to/api/v1/search?q=" + encodeURIComponent(query) + "&limit=" + limit + "&offset=" + offset,
                this.getHeaders()
            );
            var data = JSON.parse(res.body);
            var results = [];
            var total = 0;
            if (Array.isArray(data)) {
                results = data;
                total = data.length;
            } else if (data && typeof data === 'object') {
                results = data.results || data.data || data.list || data.anime || [];
                total = data.total || results.length;
            }
            var list = [];
            for (var item of results) {
                var name = item.name || (item.title ? (item.title.english || item.title.romaji || item.title.native || item.title) : "") || "";
                list.push({
                    name: name,
                    imageUrl: (item.cover_image && (item.cover_image.extra_large || item.cover_image.large)) || "",
                    link: item.anime_id || item.slug || ""
                });
            }
            var hasNextPage = offset + results.length < total;
            return { list: list, hasNextPage: hasNextPage };
        } catch (e) {
            console.log("ReAnime search error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    async getDetail(url) {
        try {
            var name = "", imageUrl = "", description = "", genre = [], status = 0, chapters = [];
            var anilistId = "";

            // Fetch SvelteKit watch page data directly
            var watchUrl = "https://reanime.to/watch/" + url + "/__data.json?ep=1&lang=sub";
            var res = await this.client.get(watchUrl, this.getHeaders());
            if (res.statusCode !== 200) {
                throw new Error("Watch data fetch returned " + res.statusCode);
            }
            var rawData = JSON.parse(res.body);
            var dataArray = null;
            for (var n = 0; n < rawData.nodes.length; n++) {
                if (rawData.nodes[n] && rawData.nodes[n].data) dataArray = rawData.nodes[n].data;
            }
            if (!dataArray) throw new Error("No data array in watch SvelteKit response");

            var decoded = this.unflatten(0, dataArray);
            var info = decoded.anime || (decoded.episodeSources && decoded.episodeSources.anime) || decoded;
            
            var t = info.title || {};
            name = t.english || t.romaji || t.native || info.name || "";
            imageUrl = (info.cover_image && (info.cover_image.extra_large || info.cover_image.large)) || info.banner_image || "";
            description = (info.description || "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "");
            genre = info.genres || [];
            
            // Resolve AniList ID
            if (info.anilist_id) {
                anilistId = info.anilist_id.toString();
            } else if (info.anilist) {
                anilistId = info.anilist.toString();
            } else {
                var coverUrl = imageUrl || "";
                var m = coverUrl.match(/\/bx(\d+)-/);
                if (m) {
                    anilistId = m[1];
                }
            }

            var s = info.status || "";
            if (s === "Finished" || s === "FINISHED") status = 1;
            else if (s === "Releasing" || s === "RELEASING") status = 0;
            else if (s === "NOT_YET_RELEASED") status = 4;
            else if (s === "CANCELLED") status = 3;

            // Resolve episode list directly from the watch page data
            var epList = decoded.episodes || (decoded.episodeSources && decoded.episodeSources.episodes) || [];
            for (var ep of epList) {
                var epNum = ep.number || ep.episodeNumber || ep.episode_number || 0;
                var epTitle = ep.title || ep.name || ("Episode " + epNum);
                if (!epTitle || epTitle === "") epTitle = "Episode " + epNum;
                chapters.push({
                    name: epTitle,
                    url: url + "/" + anilistId + "/" + epNum
                });
            }

            // Sort DESCENDING (newest episode first)
            chapters.sort(function (a, b) {
                var na = parseInt(a.url.split("/").pop()) || 0;
                var nb = parseInt(b.url.split("/").pop()) || 0;
                return nb - na;
            });

            return { name, imageUrl, description, genre, status, chapters };
        } catch (e) {
            console.log("ReAnime getDetail error: " + e);
            return { name: "", imageUrl: "", description: "", genre: [], status: 5, chapters: [] };
        }
    }

    async getVideoList(url) {
        // url format: {anime_id}/{anilist_id}/{episode_number}
        var parts = url.split("/");
        var animeId = parts[0];
        var anilistId = parts.length > 2 ? parts[1] : "";
        var epNum = parts.length > 2 ? parts[2] : parts[1];

        var prefDubType = this.getPreference("reanime_stream_subdub_type");
        if (!prefDubType || prefDubType.length === 0) prefDubType = ["sub", "dub"];

        var prefServer = this.getPreference("reanime_stream_server");
        if (!prefServer || prefServer.length === 0) prefServer = ["HD-1", "HD-2"];

        var list = [];

        // Fetch servers from the website's native flix API
        var flixRes = await this.client.get("https://reanime.to/api/flix/" + anilistId + "/" + epNum, this.getHeaders());
        if (flixRes.statusCode !== 200) {
            console.log("ReAnime Flix API call failed: " + flixRes.statusCode);
            return [];
        }
        var flixData = JSON.parse(flixRes.body);
        var servers = flixData.servers || [];

        for (var srv of servers) {
            if (!prefServer.includes(srv.serverName)) continue;
            if (!prefDubType.includes(srv.dataType)) continue;

            var originalUrl = srv.dataLink;
            var quality = srv.serverName + " (" + srv.dataType + ")";

            // FlixCloud HLS extraction
            if (originalUrl.includes("flixcloud.cc/e/")) {
                try {
                    var decoded = null;
                    var seed = null;
                    var wasmPayload = null;
                    var tokenId = null;
                    var frag2B64 = null;
                    var frag1B64 = null;
                    var ivB64 = null;
                    var flixSubs = [];

                    // Method A: Fetch SvelteKit data endpoint directly (fastest)
                    try {
                        var baseUrl = originalUrl.split("?")[0];
                        var qparams = originalUrl.split("?")[1] || "";
                        var embedUrl = baseUrl + "/__data.json" + (qparams ? "?" + qparams : "");
                        var embedRes = await this.client.get(embedUrl, {
                            "User-Agent": this.getHeaders()["User-Agent"],
                            "Referer": "https://reanime.to/",
                            "Accept": "*/*"
                        });
                        if (embedRes.statusCode === 200) {
                            var embedData = JSON.parse(embedRes.body);
                            var dataArray = null;
                            for (var n = 0; n < embedData.nodes.length; n++) {
                                if (embedData.nodes[n] && embedData.nodes[n].data) dataArray = embedData.nodes[n].data;
                            }
                            if (dataArray) {
                                decoded = this.unflatten(0, dataArray);
                            }
                        }
                    } catch (errA) {
                        console.log("FlixCloud Method A (data.json) failed: " + errA);
                    }

                    // Method B: Fallback to loading HTML page and extracting SSR data block
                    if (!decoded) {
                        try {
                            var embedRes = await this.client.get(originalUrl, {
                                "User-Agent": this.getHeaders()["User-Agent"],
                                "Referer": "https://reanime.to/",
                                "Accept": "*/*"
                            });
                            if (embedRes.statusCode === 200) {
                                var html = embedRes.body;
                                var m = html.match(/\{type:"data",data:(\{)/);
                                if (m) {
                                    var depth = 0;
                                    var start = html.indexOf("{", m.index + m[0].length - 1);
                                    var jsonStr = "";
                                    for (var i = start; i < html.length; i++) {
                                        if (html[i] === "{") depth++;
                                        else if (html[i] === "}") {
                                            if (--depth === 0) {
                                                jsonStr = html.slice(start, i + 1);
                                                break;
                                            }
                                        }
                                    }
                                    if (jsonStr) {
                                        var parsedSsr = eval("(" + jsonStr + ")");
                                        if (parsedSsr && parsedSsr.nodes) {
                                            var dataArray = null;
                                            for (var n = 0; n < parsedSsr.nodes.length; n++) {
                                                if (parsedSsr.nodes[n] && parsedSsr.nodes[n].data) dataArray = parsedSsr.nodes[n].data;
                                            }
                                            if (dataArray) {
                                                decoded = this.unflatten(0, dataArray);
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (errB) {
                            console.log("FlixCloud Method B (HTML parsing) failed: " + errB);
                        }
                    }

                    if (decoded) {
                        seed = decoded.obfuscation_seed;
                        wasmPayload = decoded.w_payload;

                        // Fetch subtitles
                        var customUA = this.getPreference("custom_user_agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0";
                        var videoHeaders = {
                            "User-Agent": customUA,
                            "Referer": "https://flixcloud.cc/",
                            "Origin": "https://flixcloud.cc",
                            "user-agent": customUA,
                            "referer": "https://flixcloud.cc/"
                        };

                        if (decoded.subtitles && Array.isArray(decoded.subtitles)) {
                            for (var sub of decoded.subtitles) {
                                if (sub && sub.url && sub.language) {
                                    flixSubs.push({ file: sub.url, label: sub.language });
                                }
                            }
                        }

                        if (seed && wasmPayload) {
                            var eStr = seed;
                            for (var hi = 0; hi < 3; hi++) eStr = _sha256(eStr + hi.toString());
                            var sStr = eStr;
                            for (var hi = 0; hi < 3; hi++) sStr = _sha256(sStr + hi.toString());

                            var tokenField = eStr.substring(48, 64) + '_' + eStr.substring(56, 64);
                            var keyFrag2Field = sStr.substring(0, 16) + '_' + sStr.substring(16, 24);
                            var containerName = "cd_" + eStr.substring(24, 32);
                            var arrayName = "ad_" + eStr.substring(32, 40);
                            var objectName = "od_" + eStr.substring(40, 48);
                            var keyField = "kf_" + eStr.substring(8, 16);
                            var ivField = "ivf_" + eStr.substring(16, 24);

                            var oHashParam = parseInt(seed.substring(0, 8), 16);

                            tokenId = decoded[tokenField];
                            var frag2B64 = decoded[keyFrag2Field];

                            var obfData = decoded.obfuscated_crypto_data;
                            var container = obfData ? obfData[containerName] : null;
                            var arr = container ? container[arrayName] : null;
                            var innerObj = arr ? arr[0][objectName] : null;

                            if (tokenId && innerObj && frag2B64) {
                                frag1B64 = innerObj[keyField];
                                ivB64 = innerObj[ivField];

                                // Fetch decrypted stream token payload
                                var apiHeaders = {
                                    "User-Agent": this.getHeaders()["User-Agent"],
                                    "Referer": originalUrl,
                                    "Accept": "*/*"
                                };
                                var cfClearance = this.getPreference("cf_clearance");
                                if (cfClearance) {
                                    apiHeaders["Cookie"] = "cf_clearance=" + cfClearance;
                                }
                                var apiRes = await this.client.get("https://flixcloud.cc/api/m3u8/" + tokenId, apiHeaders);

                                if (apiRes.statusCode === 200) {
                                    var apiData = JSON.parse(apiRes.body);
                                    var videoFieldName = _sha256(tokenId + "vid").substring(0, 10);
                                    var keyFieldName = _sha256(tokenId + "key").substring(0, 10);
                                    var videoB64 = apiData[videoFieldName];
                                    var frag3B64 = apiData[keyFieldName];

                                    if (videoB64 && frag3B64 && frag1B64 && ivB64) {
                                        var frag1 = _b64Decode(frag1B64);
                                        var frag2 = _b64Decode(frag2B64);
                                        var frag3 = _b64Decode(frag3B64);
                                        var ivBytes = _b64Decode(ivB64);
                                        var cipherBytes = _b64Decode(videoB64);

                                        // WebAssembly runtime scramble emulation
                                        var wasmKey = _runWasmScramble(wasmPayload, frag1, frag2, frag3, oHashParam);
                                        
                                        // PBKDF2 Key Derivation
                                        var seedBytes = [];
                                        for (var si = 0; si < seed.length; si++) seedBytes.push(seed.charCodeAt(si));
                                        var derived = _pbkdf2Sha256(wasmKey, new Uint8Array(seedBytes), 1000, 32);

                                        // XOR derived key material
                                        for (var xi = 0; xi < 32; xi++) derived[xi] ^= seed.charCodeAt(xi % seed.length);

                                        // Final SHA-256 AES Key hashing
                                        var finalKey = _sha256Bytes(derived);
                                        var decBytes = _aesDecryptCBC(cipherBytes, finalKey, ivBytes);
                                        
                                        var decryptedUrl = "";
                                        for (var i = 0; i < decBytes.length; i++) decryptedUrl += String.fromCharCode(decBytes[i]);

                                        if (decryptedUrl && decryptedUrl.includes(".m3u8")) {
                                            var autoObj = {
                                                url: decryptedUrl,
                                                originalUrl: decryptedUrl,
                                                quality: quality + " - Auto",
                                                headers: videoHeaders
                                            };
                                            if (flixSubs.length > 0) autoObj.subtitles = flixSubs;
                                            list.push(autoObj);
                                            continue;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log("ReAnime FlixCloud decryption failed: " + e);
                }
            }

            // Fallback: push the raw embed link
            list.push({
                url: originalUrl,
                originalUrl: originalUrl,
                quality: quality + " (Embed)",
                headers: this.getHeaders()
            });
        }
        return list;
    }

    async getPageList(url) { return []; }
    getFilterList() { return []; }

    getSourcePreferences() {
        return [
            {
                key: "reanime_stream_subdub_type",
                multiSelectListPreference: {
                    title: "Preferred stream sub/dub type",
                    summary: "Choose the types of streams you want to see",
                    values: ["sub", "dub"],
                    entries: ["Sub", "Dub"],
                    entryValues: ["sub", "dub"],
                },
            },
            {
                key: "reanime_stream_server",
                multiSelectListPreference: {
                    title: "Preferred server",
                    summary: "Choose the server/s you want to extract streams from",
                    values: ["HD-1", "HD-2"],
                    entries: ["HD-1", "HD-2"],
                    entryValues: ["HD-1", "HD-2"],
                },
            },
            {
                key: "cf_clearance",
                editTextPreference: {
                    title: "Cloudflare Clearance Cookie",
                    summary: "Enter your cf_clearance cookie value if getting 403 errors",
                    value: "",
                    dialogTitle: "cf_clearance cookie",
                    dialogMessage: "Enter the cf_clearance cookie value"
                }
            },
            {
                key: "custom_user_agent",
                editTextPreference: {
                    title: "Custom User Agent",
                    summary: "User agent associated with the cf_clearance cookie",
                    value: "",
                    dialogTitle: "User Agent",
                    dialogMessage: "Enter the browser User Agent string"
                }
            }
        ];
    }
}

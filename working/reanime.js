// =============================================================
// ReAnime Extension for Mangayomi
// Built from scratch via Playwright network analysis of reanime.to
//
// Confirmed API Endpoints (via Playwright network inspector):
//   Popular:  GET /api/v1/search?q=&limit=36&offset=0&sort=POPULARITY_DESC
//   Latest:   GET /api/v1/home/latest-aired?limit=30
//   Search:   GET /api/v1/search?q=<q>&limit=36&offset=<n>
//   Detail:   GET /api/v1/anime/<anime_id>
//   Episodes: GET /api/v1/anime/<anime_id>/episodes?limit=2000
//   Flix:     GET /api/flix/<anilist_id>/<episode_number>
//   m3u8 API: GET https://flixcloud.cc/api/m3u8/<token_id>
// =============================================================

const mangayomiSources = [{
    "name": "ReAnime",
    "lang": "en",
    "baseUrl": "https://reanime.to",
    "apiUrl": "https://reanime.to",
    "iconUrl": "https://reanime.to/favicon.ico",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.2.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "isNsfw": false,
    "hasCloudflare": false,
    "sourceCodeUrl": "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/mangayomi-extensionstet2/main/javascript/anime/src/en/working/reanime.js",
    "isFullData": false,
    "appMinVerReq": "0.5.0",
    "additionalParams": "",
    "sourceCodeLanguage": 1,
    "id": 847291854,
    "notes": "ReAnime — rebuilt from scratch via Playwright network analysis",
    "pkgPath": "anime/src/en/working/reanime.js"
}];

// ─── Crypto Helpers ──────────────────────────────────────────────────────────
// Pure JS SHA-256, AES-CBC, PBKDF2, Base64 — no external dependencies

var _K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,
0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,
0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,
0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,
0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,
0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,
0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,
0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3];
var W = new Uint32Array(64);

function _sha256Bytes(b) {
    var len = b.length;
    var padLen = 64 * Math.ceil((len + 9) / 64);
    var m = new Uint8Array(padLen);
    m.set(b);
    m[len] = 0x80;
    
    var bl = len * 8;
    m[padLen - 4] = (bl >>> 24) & 255;
    m[padLen - 3] = (bl >>> 16) & 255;
    m[padLen - 2] = (bl >>> 8) & 255;
    m[padLen - 1] = bl & 255;

    var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a,
        h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

    for (var o = 0; o < padLen; o += 64) {
        for (var t = 0; t < 16; t++) {
            var idx = o + t * 4;
            W[t] = (m[idx] << 24) | (m[idx + 1] << 16) | (m[idx + 2] << 8) | m[idx + 3];
        }
        for (var t = 16; t < 64; t++) {
            var w15 = W[t - 15];
            var w2 = W[t - 2];
            var s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
            var s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
            W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
        }

        var a = h0, b2 = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
        for (var t = 0; t < 64; t++) {
            var s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
            var ch = (e & f) ^ (~e & g);
            var t1 = (h + s1 + ch + _K[t] + W[t]) | 0;
            var s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
            var maj = (a & b2) ^ (a & c) ^ (b2 & c);
            var t2 = (s0 + maj) | 0;

            h = g; g = f; f = e; e = (d + t1) | 0;
            d = c; c = b2; b2 = a; a = (t1 + t2) | 0;
        }
        h0 = (h0 + a) | 0; h1 = (h1 + b2) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0; h5 = (h5 + f) | 0; h6 = (h6 + g) | 0; h7 = (h7 + h) | 0;
    }

    var out = new Uint8Array(32);
    out[0] = h0 >>> 24; out[1] = h0 >>> 16; out[2] = h0 >>> 8; out[3] = h0;
    out[4] = h1 >>> 24; out[5] = h1 >>> 16; out[6] = h1 >>> 8; out[7] = h1;
    out[8] = h2 >>> 24; out[9] = h2 >>> 16; out[10] = h2 >>> 8; out[11] = h2;
    out[12] = h3 >>> 24; out[13] = h3 >>> 16; out[14] = h3 >>> 8; out[15] = h3;
    out[16] = h4 >>> 24; out[17] = h4 >>> 16; out[18] = h4 >>> 8; out[19] = h4;
    out[20] = h5 >>> 24; out[21] = h5 >>> 16; out[22] = h5 >>> 8; out[23] = h5;
    out[24] = h6 >>> 24; out[25] = h6 >>> 16; out[26] = h6 >>> 8; out[27] = h6;
    out[28] = h7 >>> 24; out[29] = h7 >>> 16; out[30] = h7 >>> 8; out[31] = h7;
    return out;
}

function _sha256(msg) {
    var b=[];
    for (var i=0;i<msg.length;i++){
        var c=msg.charCodeAt(i);
        if(c<128)b.push(c);
        else if(c<2048){b.push(192|(c>>6));b.push(128|(c&63));}
        else{b.push(224|(c>>12));b.push(128|((c>>6)&63));b.push(128|(c&63));}
    }
    var h=_sha256Bytes(new Uint8Array(b));
    var hex='';
    for(var i=0;i<32;i++)hex+=('0'+(h[i]&255).toString(16)).slice(-2);
    return hex;
}

function _b64Decode(s) {
    var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var o=[];s=s.replace(/[=]+$/,'');
    for(var i=0,b=0,bits=0;i<s.length;i++){
        b=(b<<6)|c.indexOf(s[i]);bits+=6;
        while(bits>=8){bits-=8;o.push((b>>bits)&255);}
    }
    return new Uint8Array(o);
}

var _SB=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,
71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,
49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,
59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,
170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,
33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,
34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,
228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,
180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,
158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,
104,65,153,45,15,176,84,187,22];
var _ISB=new Array(256);
for(var _qi=0;_qi<256;_qi++)_ISB[_SB[_qi]]=_qi;
var _RC=[1,2,4,8,16,32,64,128,27,54];

function _xt(a){return((a<<1)^(a&128?27:0))&255;}
function _ml(a,b){var r=0;for(var i=0;i<8;i++){if(b&1)r^=a;a=_xt(a);b>>=1;}return r;}

function _aesDecryptCBC(ct,key,iv) {
    var Nk=key.length/4,Nr=Nk+6,W_aes=new Uint8Array(16*(Nr+1));
    for(var i=0;i<key.length;i++)W_aes[i]=key[i];
    for(var i=Nk;i<4*(Nr+1);i++){
        var t=[W_aes[(i-1)*4],W_aes[(i-1)*4+1],W_aes[(i-1)*4+2],W_aes[(i-1)*4+3]];
        if(i%Nk===0){var tmp=t[0];t[0]=_SB[t[1]]^_RC[i/Nk-1];t[1]=_SB[t[2]];t[2]=_SB[t[3]];t[3]=_SB[tmp];}
        else if(Nk>6&&i%Nk===4){for(var x=0;x<4;x++)t[x]=_SB[t[x]];}
        W_aes[i*4]=W_aes[(i-Nk)*4]^t[0];W_aes[i*4+1]=W_aes[(i-Nk)*4+1]^t[1];
        W_aes[i*4+2]=W_aes[(i-Nk)*4+2]^t[2];W_aes[i*4+3]=W_aes[(i-Nk)*4+3]^t[3];
    }
    var out=[],prev=iv;
    for(var off=0;off<ct.length;off+=16){
        var s=new Uint8Array(16);
        for(var i=0;i<16;i++)s[i]=ct[off+i]^W_aes[Nr*16+i];
        for(var r=Nr-1;r>=0;r--){
            var tt=s[13];s[13]=s[9];s[9]=s[5];s[5]=s[1];s[1]=tt;
            tt=s[10];s[10]=s[2];s[2]=tt;tt=s[14];s[14]=s[6];s[6]=tt;
            tt=s[3];s[3]=s[7];s[7]=s[11];s[11]=s[15];s[15]=tt;
            for(var i=0;i<16;i++)s[i]=_ISB[s[i]];
            for(var i=0;i<16;i++)s[i]^=W_aes[r*16+i];
            if(r>0){
                var ns=new Uint8Array(16);
                for(var cc=0;cc<4;cc++){
                    var j=cc*4;
                    ns[j]=_ml(14,s[j])^_ml(11,s[j+1])^_ml(13,s[j+2])^_ml(9,s[j+3]);
                    ns[j+1]=_ml(9,s[j])^_ml(14,s[j+1])^_ml(11,s[j+2])^_ml(9,s[j+3]);
                    ns[j+2]=_ml(13,s[j])^_ml(9,s[j+1])^_ml(14,s[j+2])^_ml(11,s[j+3]);
                    ns[j+3]=_ml(11,s[j])^_ml(13,s[j+1])^_ml(9,s[j+2])^_ml(14,s[j+3]);
                }
                s=ns;
            }
        }
        for(var i=0;i<16;i++)s[i]^=prev[i];
        for(var i=0;i<16;i++)out.push(s[i]);
        prev=ct.slice(off,off+16);
    }
    var p=out[out.length-1];
    if(p>0&&p<=16){var v=true;for(var i=0;i<p;i++)if(out[out.length-1-i]!==p)v=false;if(v)out.splice(out.length-p,p);}
    return out;
}

var opt_ip = new Uint8Array(64);
var opt_op = new Uint8Array(64);

function _hmacSha256(k, m) {
    var key = k;
    if (key.length > 64) key = _sha256Bytes(key);
    for (var i = 0; i < 64; i++) {
        var kv = i < key.length ? key[i] : 0;
        opt_ip[i] = kv ^ 0x36;
        opt_op[i] = kv ^ 0x5c;
    }
    var inn = new Uint8Array(64 + m.length);
    inn.set(opt_ip);
    inn.set(m, 64);
    var ih = _sha256Bytes(inn);
    var ou = new Uint8Array(96);
    ou.set(opt_op);
    ou.set(ih, 64);
    return _sha256Bytes(ou);
}

function _pbkdf2Sha256(pw, salt, iter, dl) {
    var r = new Uint8Array(dl);
    var numBlocks = Math.ceil(dl / 32);
    for (var bk = 1; bk <= numBlocks; bk++) {
        var sb = new Uint8Array(salt.length + 4);
        sb.set(salt);
        sb[salt.length] = (bk >>> 24) & 255;
        sb[salt.length + 1] = (bk >>> 16) & 255;
        sb[salt.length + 2] = (bk >>> 8) & 255;
        sb[salt.length + 3] = bk & 255;
        var u = _hmacSha256(pw, sb);
        var ac = new Uint8Array(u);
        for (var it = 1; it < iter; it++) {
            u = _hmacSha256(pw, u);
            for (var j = 0; j < 32; j++) ac[j] ^= u[j];
        }
        var off = (bk - 1) * 32;
        for (var j = 0; j < 32 && off + j < dl; j++) r[off + j] = ac[j];
    }
    return r;
};

// Minimal WASM bytecode scrambler — interprets the w_payload from FlixCloud
// to derive the third key fragment needed for AES decryption.
function _runWasmScramble(wb64, f1, f2, f3, oH) {
    var w=_b64Decode(wb64),mem=new Uint8Array(65536),g0=oH,kl=f1.length;
    var Y=1000,V=Y+kl,T=V+kl,O=T+kl;
    for(var i=0;i<kl;i++){mem[Y+i]=f1[i];mem[V+i]=f2[i];mem[T+i]=f3[i];}
    var p=8,fb=[];
    while(p<w.length){
        var si=w[p++],sl=0,sh=0;
        while(true){var bv=w[p++];sl|=(bv&127)<<sh;sh+=7;if(!(bv&128))break;}
        if(si===10){
            var fc=0;sh=0;
            while(true){var bv=w[p++];fc|=(bv&127)<<sh;sh+=7;if(!(bv&128))break;}
            for(var fi=0;fi<fc;fi++){
                var bl=0;sh=0;
                while(true){var bv=w[p++];bl|=(bv&127)<<sh;sh+=7;if(!(bv&128))break;}
                var bd=[];for(var bi=0;bi<bl;bi++)bd.push(w[p++]);fb.push(bd);
            }
            break;
        }
        p+=sl;
    }
    if(fb.length<2)return f1;
    var code=fb[1],lc=[Y,V,T,O,kl],cp=0;
    var ld=0,sh=0;
    while(true){var bv=code[cp++];ld|=(bv&127)<<sh;sh+=7;if(!(bv&128))break;}
    for(var li=0;li<ld;li++){
        var cn=0;sh=0;
        while(true){var bv=code[cp++];cn|=(bv&127)<<sh;sh+=7;if(!(bv&128))break;}
        cp++;for(var ci=0;ci<cn;ci++)lc.push(0);
    }
    var be={},bs2=[];
    for(var sp=cp;sp<code.length;sp++){
        var so=code[sp];
        if(so===2||so===3){sp++;bs2.push(sp-1);}
        else if(so===11){if(bs2.length>0)be[bs2.pop()]=sp;}
        else if(so===0x41||so===0x20||so===0x21||so===0x22||so===0x23||so===0x24||so===12||so===13){while(code[++sp]&128);}
        else if(so===0x2d||so===0x3a){while(code[++sp]&128);while(code[++sp]&128);}
    }
    var st=[],bs=[];
    function rl(){var v=0,s=0;while(true){var bv=code[cp++];v|=(bv&127)<<s;s+=7;if(!(bv&128))break;}return v;}
    function rs(){var v=0,s=0,bv;do{bv=code[cp++];v|=(bv&127)<<s;s+=7;}while(bv&128);if(s<32&&(bv&64))v|=(-1<<s);return v;}
    function br(d){for(var i=0;i<d;i++)bs.pop();var t=bs[bs.length-1];if(!t){cp=code.length;return;}if(t.t==='l')cp=t.p+2;else{bs.pop();cp=t.e+1;}}
    var mx=500000;
    while(cp<code.length&&mx-->0){
        var op=code[cp++];
        if(op===2||op===3){var bt=code[cp++];bs.push({t:op===2?'b':'l',p:cp-2,e:be[cp-2]});}
        else if(op===11){if(bs.length>0)bs.pop();else break;}
        else if(op===12){br(rl());}
        else if(op===13){var d=rl();if(st.pop())br(d);}
        else if(op===0x41)st.push(rs());
        else if(op===0x20)st.push(lc[rl()]);
        else if(op===0x21)lc[rl()]=st.pop();
        else if(op===0x22){var li2=rl();lc[li2]=st[st.length-1];}
        else if(op===0x24){rl();g0=st.pop();}
        else if(op===0x23){rl();st.push(g0);}
        else if(op===0x6a){var b2=st.pop();st.push((st.pop()+b2)|0);}
        else if(op===0x6b){var b2=st.pop();st.push((st.pop()-b2)|0);}
        else if(op===0x6c){var b2=st.pop();st.push(Math.imul(st.pop(),b2));}
        else if(op===0x71){var b2=st.pop();st.push(st.pop()&b2);}
        else if(op===0x72){var b2=st.pop();st.push(st.pop()|b2);}
        else if(op===0x73){var b2=st.pop();st.push(st.pop()^b2);}
        else if(op===0x74){var b2=st.pop();st.push(st.pop()<<b2);}
        else if(op===0x75){var b2=st.pop();st.push(st.pop()>>>b2);}
        else if(op===0x76){var b2=st.pop();st.push(st.pop()>>b2);}
        else if(op===0x2d){var a=rl(),o2=rl();st.push(mem[(st.pop()+o2)&0xffff]&255);}
        else if(op===0x3a){var a=rl(),o2=rl();var vl=st.pop();mem[(st.pop()+o2)&0xffff]=vl&255;}
        else if(op===0x45)st.push(st.pop()===0?1:0);
        else if(op===0x46){var b2=st.pop();st.push(st.pop()===b2?1:0);}
        else if(op===0x47){var b2=st.pop();st.push(st.pop()!==b2?1:0);}
        else if(op===0x48){var b2=st.pop();st.push(st.pop()<b2?1:0);}
        else if(op===0x49){var b2=st.pop();st.push((st.pop()>>>0)<(b2>>>0)?1:0);}
        else if(op===0x4a){var b2=st.pop();st.push(st.pop()>b2?1:0);}
        else if(op===0x4b){var b2=st.pop();st.push((st.pop()>>>0)>(b2>>>0)?1:0);}
        else if(op===0x4c){var b2=st.pop();st.push(st.pop()<=b2?1:0);}
        else if(op===0x4d){var b2=st.pop();st.push((st.pop()>>>0)<=(b2>>>0)?1:0);}
        else if(op===0x4e){var b2=st.pop();st.push(st.pop()>=b2?1:0);}
        else if(op===0x4f){var b2=st.pop();st.push((st.pop()>>>0)>=(b2>>>0)?1:0);}
        else if(op===1){}
        else break;
    }
    var result=new Uint8Array(kl);
    for(var i=0;i<kl;i++)result[i]=mem[O+i];
    return result;
}

// ─── Main Extension Class ────────────────────────────────────────────────────

class DefaultExtension extends MProvider {
    constructor() {
        super();
        this.client = new Client();
        this.BASE = "https://reanime.to";
    }

    // ── Preferences helper ───────────────────────────────────────────────────
    _pref(key) {
        try { return new SharedPreferences().get(key); } catch (e) { return null; }
    }

    // ── HTTP headers ─────────────────────────────────────────────────────────
    _headers(referer) {
        var ua = this._pref("custom_user_agent")
            || "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0";
        var cf = this._pref("cf_clearance");
        var h = {
            "User-Agent": ua,
            "Referer": referer || (this.BASE + "/"),
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9"
        };
        if (cf) h["Cookie"] = "cf_clearance=" + cf;
        return h;
    }

    // ── Status mapping ───────────────────────────────────────────────────────
    // Mangayomi: 0=Ongoing, 1=Completed, 2=Unknown, 3=Cancelled, 4=On Hiatus
    _mapStatus(s) {
        if (!s) return 2;
        var sl = s.toLowerCase();
        if (sl === "finished" || sl === "completed") return 1;
        if (sl === "releasing" || sl === "currently airing" || sl === "ongoing") return 0;
        if (sl === "cancelled") return 3;
        if (sl === "hiatus") return 4;
        return 2;
    }

    // ── Parse a single search/listing result item ────────────────────────────
    _parseItem(item) {
        var t = item.title || {};
        var name = t.english || t.romaji || t.native || item.name || "";
        var img = "";
        if (item.cover_image) {
            img = item.cover_image.extra_large || item.cover_image.large || item.cover_image.medium || "";
        }
        return { name: name, imageUrl: img, link: item.anime_id || "" };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // getPopular
    // GET /api/v1/search?q=&limit=36&offset=<n>&sort=POPULARITY_DESC
    // Response: { results: [{anime_id, title:{english,romaji,native}, cover_image, ...}], total }
    // ─────────────────────────────────────────────────────────────────────────
    async getPopular(page) {
        var limit = 36, offset = (page - 1) * limit;
        try {
            var url = this.BASE + "/api/v1/search?q=&limit=" + limit + "&offset=" + offset + "&sort=POPULARITY_DESC";
            var res = await this.client.get(url, this._headers());
            if (res.statusCode !== 200) throw new Error("HTTP " + res.statusCode);
            var data = JSON.parse(res.body);
            var results = data.results || [];
            var total = data.total || results.length;
            var list = results.map(item => this._parseItem(item));
            return { list: list, hasNextPage: (offset + results.length) < total };
        } catch (e) {
            console.log("[ReAnime] getPopular error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // getLatestUpdates
    // GET /api/v1/home/latest-aired?limit=30
    // Response: { data: [{anime_id, title, cover_image, ...}], has_more }
    // ─────────────────────────────────────────────────────────────────────────
    async getLatestUpdates(page) {
        var limit = 30;
        try {
            var url = this.BASE + "/api/v1/home/latest-aired?limit=" + limit;
            var res = await this.client.get(url, this._headers());
            if (res.statusCode !== 200) throw new Error("HTTP " + res.statusCode);
            var data = JSON.parse(res.body);
            var items = data.data || [];
            var list = items.map(item => this._parseItem(item));
            // API returns a single page; only page 1 has real data
            var hasNextPage = (page === 1) && (data.has_more === true);
            return { list: list, hasNextPage: hasNextPage };
        } catch (e) {
            console.log("[ReAnime] getLatestUpdates error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // search
    // GET /api/v1/search?q=<query>&limit=36&offset=<n>[&sort=<sort>]
    // Response: { results: [...], total }
    // ─────────────────────────────────────────────────────────────────────────
    async search(query, page, filters) {
        var limit = 36, offset = (page - 1) * limit;
        var sortParam = "";
        if (filters && filters.length > 0) {
            for (var f of filters) {
                if (f.type_name === "SelectFilter" && f.name === "Sort By" &&
                    f.state !== undefined && f.state > 0 && f.values) {
                    var v = f.values[f.state];
                    if (v) sortParam = "&sort=" + encodeURIComponent(v.value || v);
                }
            }
        }
        try {
            var url = this.BASE + "/api/v1/search?q=" + encodeURIComponent(query || "")
                    + "&limit=" + limit + "&offset=" + offset + sortParam;
            var res = await this.client.get(url, this._headers());
            if (res.statusCode !== 200) throw new Error("HTTP " + res.statusCode);
            var data = JSON.parse(res.body);
            var results = data.results || [];
            var total = data.total || results.length;
            var list = results.map(item => this._parseItem(item));
            return { list: list, hasNextPage: (offset + results.length) < total };
        } catch (e) {
            console.log("[ReAnime] search error: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // getDetail
    // url = anime_id slug, e.g. "attack-on-titan-p9y2p9"
    //
    // Step 1: GET /api/v1/anime/{anime_id}
    //   → { anilist_id, title, cover_image, banner_image, description,
    //        genres, status, episodes_total, subbed, dubbed }
    //
    // Step 2: GET /api/v1/anime/{anime_id}/episodes?limit=2000
    //   → { data: [{episode_number, title, thumbnail, aired}], total }
    //
    // Episode URL format: "{anime_id}/{anilist_id}/{episode_number}"
    // ─────────────────────────────────────────────────────────────────────────
    async getDetail(url) {
        var animeId = url.trim();
        try {
            // 1. Fetch anime metadata
            var metaRes = await this.client.get(
                this.BASE + "/api/v1/anime/" + animeId,
                this._headers()
            );
            if (metaRes.statusCode !== 200) throw new Error("Anime detail HTTP " + metaRes.statusCode);
            var meta = JSON.parse(metaRes.body);

            var t = meta.title || {};
            var name = t.english || t.romaji || t.native || "";
            var img = "";
            if (meta.cover_image) img = meta.cover_image.extra_large || meta.cover_image.large || "";
            img = img || meta.banner_image || "";
            var desc = (meta.description || "")
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]*>/g, "")
                .trim();
            var genre = meta.genres || [];
            var status = this._mapStatus(meta.status);
            var anilistId = String(meta.anilist_id || "");

            // 2. Fetch episode list
            var epRes = await this.client.get(
                this.BASE + "/api/v1/anime/" + animeId + "/episodes?limit=2000",
                this._headers()
            );
            var chapters = [];
            if (epRes.statusCode === 200) {
                var epData = JSON.parse(epRes.body);
                var epList = epData.data || [];
                for (var ep of epList) {
                    var epNum = ep.episode_number || 0;
                    var epTitle = (ep.title && ep.title.trim()) ? ep.title : ("Episode " + epNum);
                    chapters.push({
                        name: epTitle,
                        url: animeId + "/" + anilistId + "/" + epNum
                    });
                }
                // Sort descending (newest episode first)
                chapters.sort(function(a, b) {
                    var na = parseFloat(a.url.split("/").pop()) || 0;
                    var nb = parseFloat(b.url.split("/").pop()) || 0;
                    return nb - na;
                });
            }

            return { name, imageUrl: img, description: desc, genre, status, chapters };
        } catch (e) {
            console.log("[ReAnime] getDetail error: " + e);
            return { name: "", imageUrl: "", description: "", genre: [], status: 2, chapters: [] };
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // getVideoList
    // url = "{anime_id}/{anilist_id}/{episode_number}"
    //
    // Step 1: GET /api/flix/{anilist_id}/{episode_number}
    //   → { success: true, servers: [{serverName, dataLink, dataType, softsub}] }
    //
    // Step 2: For each FlixCloud server, call _resolveFlixCloud()
    //   to get a direct HLS m3u8 URL.
    // ─────────────────────────────────────────────────────────────────────────
    async getVideoList(url) {
        var parts = url.split("/");
        // url format: anime_id / anilist_id / episode_number
        // anilist_id is second-to-last, episode_number is last
        var anilistId = parts.length >= 3 ? parts[parts.length - 2] : "";
        var epNum = parts[parts.length - 1];

        var prefServers = this._pref("reanime_stream_server") || ["HD-1", "HD-2"];
        var prefTypes = this._pref("reanime_stream_subdub_type") || ["sub", "dub"];

        var list = [];
        try {
            var flixUrl = this.BASE + "/api/flix/" + anilistId + "/" + epNum;
            var flixRes = await this.client.get(flixUrl, this._headers());
            if (flixRes.statusCode !== 200) {
                console.log("[ReAnime] Flix API returned " + flixRes.statusCode);
                return [];
            }
            var flixData = JSON.parse(flixRes.body);
            if (!flixData.success || !flixData.servers) return [];

            for (var srv of flixData.servers) {
                var serverName = srv.serverName || "";
                var dataType = (srv.dataType || "sub").toLowerCase();
                var embedUrl = srv.dataLink || "";
                var label = serverName + " [" + dataType.toUpperCase() + "]";

                if (!prefServers.includes(serverName)) continue;
                if (!prefTypes.includes(dataType)) continue;
                if (!embedUrl) continue;

                // Try FlixCloud direct extraction
                if (embedUrl.includes("flixcloud.cc/e/")) {
                    await this._resolveFlixCloud(embedUrl, label, list);
                }

                // Fallback: raw embed URL for WebView playback
                list.push({
                    url: embedUrl,
                    originalUrl: embedUrl,
                    quality: label + " (Embed)",
                    headers: this._headers(this.BASE + "/")
                });
            }
        } catch (e) {
            console.log("[ReAnime] getVideoList error: " + e);
        }
        return list;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // _resolveFlixCloud
    // Extracts HLS m3u8 from a flixcloud.cc/e/{id} embed URL.
    //
    // Flow (confirmed via Playwright):
    //   1. GET flixcloud.cc/e/{id}/__data.json  → SvelteKit SSR data containing:
    //      obfuscation_seed, w_payload, obfuscated_crypto_data, subtitles
    //   2. Derive dynamic field names from obfuscation_seed via SHA-256 chains
    //   3. GET flixcloud.cc/api/m3u8/{tokenId}  → encrypted video URL + key fragment 3
    //   4. WASM scramble (w_payload) → AES key material → PBKDF2 → AES-CBC decrypt
    //   5. Decrypted URL is the HLS m3u8 stream
    // ─────────────────────────────────────────────────────────────────────────
    async _resolveFlixCloud(embedUrl, label, list) {
        var ua = this._pref("custom_user_agent")
            || "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0";
        var embedHeaders = {
            "User-Agent": ua,
            "Referer": this.BASE + "/",
            "Accept": "*/*"
        };

        // Step 1: Fetch SvelteKit data
        var baseEmbedUrl = embedUrl.split("?")[0];
        var qs = embedUrl.includes("?") ? "?" + embedUrl.split("?")[1] : "";
        var dataUrl = baseEmbedUrl + "/__data.json" + qs;

        var decoded = null;
        try {
            var dataRes = await this.client.get(dataUrl, embedHeaders);
            if (dataRes.statusCode === 200) {
                var svelteData = JSON.parse(dataRes.body);
                // Find the data array in the nodes
                var dataArray = null;
                for (var n = 0; n < (svelteData.nodes || []).length; n++) {
                    var node = svelteData.nodes[n];
                    if (node && node.data && Array.isArray(node.data)) {
                        dataArray = node.data;
                    }
                }
                if (dataArray) decoded = this._unflatten(0, dataArray);
            }
        } catch (e) {
            console.log("[ReAnime] FlixCloud __data.json error: " + e);
        }

        if (!decoded) return false;

        var seed = decoded.obfuscation_seed;
        var wasmPayload = decoded.w_payload;
        if (!seed || !wasmPayload) {
            console.log("[ReAnime] Missing obfuscation_seed or w_payload in FlixCloud data");
            return false;
        }

        // Step 2: Derive dynamic field names from seed
        // The site runs three SHA-256 iterations on the seed to build field names.
        var eStr = seed;
        for (var hi = 0; hi < 3; hi++) eStr = _sha256(eStr + hi.toString());
        var sStr = eStr;
        for (var hi = 0; hi < 3; hi++) sStr = _sha256(sStr + hi.toString());

        var tokenField    = eStr.substring(48, 64) + "_" + eStr.substring(56, 64);
        var frag2Field    = sStr.substring(0, 16) + "_" + sStr.substring(16, 24);
        var containerKey  = "cd_" + eStr.substring(24, 32);
        var arrayKey      = "ad_" + eStr.substring(32, 40);
        var objectKey     = "od_" + eStr.substring(40, 48);
        var keyFrag1Key   = "kf_" + eStr.substring(8, 16);
        var ivKey         = "ivf_" + eStr.substring(16, 24);
        var oHashParam    = parseInt(seed.substring(0, 8), 16) || 0;

        var tokenId    = decoded[tokenField];
        var frag2B64   = decoded[frag2Field];
        var obfData    = decoded.obfuscated_crypto_data;
        var container  = obfData ? obfData[containerKey] : null;
        var arr        = container ? container[arrayKey] : null;
        var innerObj   = (arr && arr[0]) ? arr[0][objectKey] : null;

        if (!tokenId || !innerObj || !frag2B64) {
            console.log("[ReAnime] FlixCloud: missing crypto fields. tokenId=" + tokenId
                      + " innerObj=" + !!innerObj + " frag2=" + !!frag2B64);
            return false;
        }

        var frag1B64 = innerObj[keyFrag1Key];
        var ivB64    = innerObj[ivKey];

        // Collect subtitles
        var subs = [];
        if (decoded.subtitles && Array.isArray(decoded.subtitles)) {
            for (var sub of decoded.subtitles) {
                if (sub && sub.url && sub.language) {
                    subs.push({ file: sub.url, label: sub.language });
                }
            }
        }

        // Step 3: Fetch encrypted video data from m3u8 API
        var m3u8Headers = {
            "User-Agent": ua,
            "Referer": embedUrl,
            "Accept": "*/*"
        };
        var m3u8Res = await this.client.get(
            "https://flixcloud.cc/api/m3u8/" + tokenId,
            m3u8Headers
        );
        if (m3u8Res.statusCode !== 200) {
            console.log("[ReAnime] FlixCloud m3u8 API returned " + m3u8Res.statusCode);
            return false;
        }
        var apiData = JSON.parse(m3u8Res.body);

        // Field names in the m3u8 API response are SHA-256 of tokenId+"vid" / tokenId+"key"
        var videoFieldName = _sha256(tokenId + "vid").substring(0, 10);
        var keyFieldName   = _sha256(tokenId + "key").substring(0, 10);
        var videoB64 = apiData[videoFieldName];
        var frag3B64 = apiData[keyFieldName];

        if (!videoB64 || !frag3B64 || !frag1B64 || !ivB64) {
            console.log("[ReAnime] FlixCloud: incomplete crypto payload");
            return false;
        }

        // Step 4: Decrypt
        try {
            var frag1    = _b64Decode(frag1B64);
            var frag2    = _b64Decode(frag2B64);
            var frag3    = _b64Decode(frag3B64);
            var ivBytes  = _b64Decode(ivB64);
            var ctBytes  = _b64Decode(videoB64);

            // WASM scramble produces the combined key material
            var wasmKey  = _runWasmScramble(wasmPayload, frag1, frag2, frag3, oHashParam);

            // PBKDF2(wasmKey, seedBytes, 1000 iterations, 32 bytes)
            var seedBytes = new Uint8Array(seed.length);
            for (var si = 0; si < seed.length; si++) seedBytes[si] = seed.charCodeAt(si);
            var derived = _pbkdf2Sha256(wasmKey, seedBytes, 1000, 32);

            // XOR derived key with seed characters
            for (var xi = 0; xi < 32; xi++) derived[xi] ^= seed.charCodeAt(xi % seed.length);

            // Final AES-256 key = SHA-256(derived)
            var aesKey  = _sha256Bytes(derived);
            var dec     = _aesDecryptCBC(ctBytes, aesKey, ivBytes);

            var decUrl = "";
            for (var i = 0; i < dec.length; i++) decUrl += String.fromCharCode(dec[i]);
            decUrl = decUrl.replace(/[^\x20-\x7E]/g, "").trim();

            if (decUrl && decUrl.startsWith("http") && decUrl.includes(".m3u8")) {
                var videoHeaders = {
                    "User-Agent": ua,
                    "Referer": "https://flixcloud.cc/",
                    "Origin": "https://flixcloud.cc"
                };
                var entry = {
                    url: decUrl,
                    originalUrl: decUrl,
                    quality: label,
                    headers: videoHeaders
                };
                if (subs.length > 0) entry.subtitles = subs;
                list.push(entry);
                return true;
            }
        } catch (e) {
            console.log("[ReAnime] FlixCloud AES decryption error: " + e);
        }
        return false;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // _unflatten — deserialize SvelteKit SSR flattened data array
    // SvelteKit stores page data as a flat array of primitives + reference indices.
    // ─────────────────────────────────────────────────────────────────────────
    _unflatten(index, arr, cache) {
        if (!cache) cache = new Map();
        if (typeof index !== "number" || index < 0 || index >= arr.length) return index;
        if (cache.has(index)) return cache.get(index);
        var val = arr[index];
        if (val === null || val === undefined) return val;
        if (Array.isArray(val)) {
            var res = [];
            cache.set(index, res);
            for (var i = 0; i < val.length; i++) res.push(this._unflatten(val[i], arr, cache));
            return res;
        } else if (typeof val === "object") {
            var obj = {};
            cache.set(index, obj);
            for (var k in val) {
                if (Object.prototype.hasOwnProperty.call(val, k)) {
                    obj[k] = this._unflatten(val[k], arr, cache);
                }
            }
            return obj;
        }
        return val;
    }

    // ─────────────────────────────────────────────────────────────────────────

    async getPageList(url) { return []; }

    // ─────────────────────────────────────────────────────────────────────────
    // Filter list
    // ─────────────────────────────────────────────────────────────────────────
    getFilterList() {
        return [
            {
                type_name: "SelectFilter",
                name: "Sort By",
                values: [
                    { name: "Popularity",  value: "POPULARITY_DESC"  },
                    { name: "Score",       value: "SCORE_DESC"       },
                    { name: "Trending",    value: "TRENDING_DESC"    },
                    { name: "Newest",      value: "START_DATE_DESC"  },
                    { name: "Oldest",      value: "START_DATE"       }
                ],
                state: 0
            }
        ];
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Source preferences
    // ─────────────────────────────────────────────────────────────────────────
    getSourcePreferences() {
        return [
            {
                key: "reanime_stream_subdub_type",
                multiSelectListPreference: {
                    title: "Preferred stream type",
                    summary: "Select which audio types to extract (sub/dub)",
                    values: ["sub", "dub"],
                    entries: ["Subbed", "Dubbed"],
                    entryValues: ["sub", "dub"]
                }
            },
            {
                key: "reanime_stream_server",
                multiSelectListPreference: {
                    title: "Preferred server",
                    summary: "Select which FlixCloud server(s) to use",
                    values: ["HD-1", "HD-2"],
                    entries: ["HD-1", "HD-2"],
                    entryValues: ["HD-1", "HD-2"]
                }
            },
            {
                key: "cf_clearance",
                editTextPreference: {
                    title: "Cloudflare Clearance Cookie (cf_clearance)",
                    summary: "Required if you see 403 errors. Copy the cf_clearance cookie from reanime.to in your browser.",
                    value: "",
                    dialogTitle: "cf_clearance Value",
                    dialogMessage: "Paste the cf_clearance cookie value here"
                }
            },
            {
                key: "custom_user_agent",
                editTextPreference: {
                    title: "Custom User Agent",
                    summary: "Must match the browser that generated your cf_clearance cookie",
                    value: "",
                    dialogTitle: "User Agent",
                    dialogMessage: "Paste your browser User Agent string here"
                }
            }
        ];
    }
}

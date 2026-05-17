const mangayomiSources = [{
    "name": "ReAnime",
    "lang": "en",
    "baseUrl": "https://reanime.to",
    "apiUrl": "https://reanime.to",
    "iconUrl": "https://reanime.to/favicon.ico",
    "typeSource": "single",
    "isManga": false,
    "itemType": 1,
    "version": "0.1.1",
    "dateFormat": "",
    "dateFormatLocale": "",
    "isNsfw": false,
    "hasCloudflare": true,
    "sourceCodeUrl": "https://raw.githubusercontent.com/RandomUs3rInTh3Int3rn3t/prod_extension2/main/working/reanime.js",
    "isFullData": false,
    "appMinVerReq": "0.5.0",
    "additionalParams": "",
    "sourceCodeLanguage": 1,
    "id": 847291854,
    "notes": "ReAnime (formerly Kuudere)",
    "pkgPath": "working/reanime.js"
}];

// ============ Pure JS SHA-256 ============
var _sha256K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];
function _sha256(msg) {
    var bytes = [];
    for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) bytes.push(c);
        else if (c < 2048) { bytes.push(192 | (c >> 6)); bytes.push(128 | (c & 63)); }
        else { bytes.push(224 | (c >> 12)); bytes.push(128 | ((c >> 6) & 63)); bytes.push(128 | (c & 63)); }
    }
    var bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    bytes.push(0, 0, 0, 0);
    bytes.push((bitLen >>> 24) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 8) & 0xff, bitLen & 0xff);
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    function rr(v, n) { return (v >>> n) | (v << (32 - n)); }
    for (var off = 0; off < bytes.length; off += 64) {
        var W = [];
        for (var t = 0; t < 16; t++) W[t] = (bytes[off + t * 4] << 24) | (bytes[off + t * 4 + 1] << 16) | (bytes[off + t * 4 + 2] << 8) | bytes[off + t * 4 + 3];
        for (var t = 16; t < 64; t++) {
            var s0 = rr(W[t - 15], 7) ^ rr(W[t - 15], 18) ^ (W[t - 15] >>> 3);
            var s1 = rr(W[t - 2], 17) ^ rr(W[t - 2], 19) ^ (W[t - 2] >>> 10);
            W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
        }
        var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
        for (var t = 0; t < 64; t++) {
            var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25), ch = (e & f) ^ (~e & g), t1 = (h + S1 + ch + _sha256K[t] + W[t]) | 0;
            var S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22), maj = (a & b) ^ (a & c) ^ (b & c), t2 = (S0 + maj) | 0;
            h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    var hex = '';
    for (var i = 0; i < 8; i++) hex += ('00000000' + (H[i] >>> 0).toString(16)).slice(-8);
    return hex;
}

// ============ Pure JS AES-CBC Decryption ============
var _SBOX = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
var _ISBOX = new Array(256); for (var _i = 0; _i < 256; _i++)_ISBOX[_SBOX[_i]] = _i;
var _RCON = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
function _xtime(a) { return ((a << 1) ^ (a & 128 ? 0x1b : 0)) & 0xff; }
function _mul(a, b) { var r = 0; for (var i = 0; i < 8; i++) { if (b & 1) r ^= a; a = _xtime(a); b >>= 1; } return r; }
function _aesExpandKey(key) {
    var Nk = key.length / 4, Nr = Nk + 6, W = new Uint8Array(16 * (Nr + 1));
    for (var i = 0; i < key.length; i++)W[i] = key[i];
    for (var i = Nk; i < 4 * (Nr + 1); i++) {
        var t = [W[(i - 1) * 4], W[(i - 1) * 4 + 1], W[(i - 1) * 4 + 2], W[(i - 1) * 4 + 3]];
        if (i % Nk === 0) { var tmp = t[0]; t[0] = _SBOX[t[1]] ^ _RCON[i / Nk - 1]; t[1] = _SBOX[t[2]]; t[2] = _SBOX[t[3]]; t[3] = _SBOX[tmp]; }
        else if (Nk > 6 && i % Nk === 4) { t[0] = _SBOX[t[0]]; t[1] = _SBOX[t[1]]; t[2] = _SBOX[t[2]]; t[3] = _SBOX[t[3]]; }
        W[i * 4] = W[(i - Nk) * 4] ^ t[0]; W[i * 4 + 1] = W[(i - Nk) * 4 + 1] ^ t[1]; W[i * 4 + 2] = W[(i - Nk) * 4 + 2] ^ t[2]; W[i * 4 + 3] = W[(i - Nk) * 4 + 3] ^ t[3];
    }
    return { w: W, nr: Nr };
}
function _aesDecryptBlock(block, ek) {
    var s = new Uint8Array(16), Nr = ek.nr, W = ek.w;
    for (var i = 0; i < 16; i++)s[i] = block[i] ^ W[Nr * 16 + i];
    for (var r = Nr - 1; r >= 0; r--) {
        var t = s[13]; s[13] = s[9]; s[9] = s[5]; s[5] = s[1]; s[1] = t;
        t = s[10]; s[10] = s[2]; s[2] = t; t = s[14]; s[14] = s[6]; s[6] = t;
        t = s[3]; s[3] = s[7]; s[7] = s[11]; s[11] = s[15]; s[15] = t;
        for (var i = 0; i < 16; i++)s[i] = _ISBOX[s[i]];
        for (var i = 0; i < 16; i++)s[i] ^= W[r * 16 + i];
        if (r > 0) {
            var ns = new Uint8Array(16);
            for (var c = 0; c < 4; c++) {
                var j = c * 4;
                ns[j] = _mul(14, s[j]) ^ _mul(11, s[j + 1]) ^ _mul(13, s[j + 2]) ^ _mul(9, s[j + 3]);
                ns[j + 1] = _mul(9, s[j]) ^ _mul(14, s[j + 1]) ^ _mul(11, s[j + 2]) ^ _mul(13, s[j + 3]);
                ns[j + 2] = _mul(13, s[j]) ^ _mul(9, s[j + 1]) ^ _mul(14, s[j + 2]) ^ _mul(11, s[j + 3]);
                ns[j + 3] = _mul(11, s[j]) ^ _mul(13, s[j + 1]) ^ _mul(9, s[j + 2]) ^ _mul(14, s[j + 3]);
            }
            s = ns;
        }
    }
    return s;
}
function _aesDecryptCBC(ct, key, iv) {
    var ek = _aesExpandKey(key), out = [];
    var prev = iv;
    for (var off = 0; off < ct.length; off += 16) {
        var block = ct.slice(off, off + 16);
        var dec = _aesDecryptBlock(block, ek);
        for (var i = 0; i < 16; i++)dec[i] ^= prev[i];
        for (var i = 0; i < 16; i++)out.push(dec[i]);
        prev = block;
    }
    var pad = out[out.length - 1];
    if (pad > 0 && pad <= 16) { var valid = true; for (var i = 0; i < pad; i++)if (out[out.length - 1 - i] !== pad) valid = false; if (valid) out.splice(out.length - pad, pad); }
    return out;
}
function _b64Decode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var out = []; str = str.replace(/[=]+$/, '');
    for (var i = 0, b = 0, bits = 0; i < str.length; i++) {
        b = (b << 6) | chars.indexOf(str[i]); bits += 6;
        while (bits >= 8) { bits -= 8; out.push((b >> bits) & 0xff); }
    }
    return new Uint8Array(out);
}

// ============ Minimal WASM Interpreter for FlixCloud key scramble ============
function _runWasmScramble(wasmB64, frag1, frag2, frag3, oHashParam) {
    var wasmBytes = _b64Decode(wasmB64);
    var memory = new Uint8Array(65536);
    var global0 = oHashParam;
    var keyLen = frag1.length;
    var Y = 1000, V = Y + keyLen, TT = V + keyLen, O = TT + keyLen;
    for (var i = 0; i < keyLen; i++) { memory[Y + i] = frag1[i]; memory[V + i] = frag2[i]; memory[TT + i] = frag3[i]; }
    // Parse WASM code section
    var pos = 8;
    var funcBodies = [];
    while (pos < wasmBytes.length) {
        var secId = wasmBytes[pos++];
        var secLen = 0, sh = 0;
        while (true) { var b = wasmBytes[pos++]; secLen |= (b & 0x7f) << sh; sh += 7; if (!(b & 0x80)) break; }
        if (secId === 0x0a) {
            var fc = 0; sh = 0;
            while (true) { var b = wasmBytes[pos++]; fc |= (b & 0x7f) << sh; sh += 7; if (!(b & 0x80)) break; }
            for (var fi = 0; fi < fc; fi++) {
                var bl = 0; sh = 0;
                while (true) { var b = wasmBytes[pos++]; bl |= (b & 0x7f) << sh; sh += 7; if (!(b & 0x80)) break; }
                var body = []; for (var bi = 0; bi < bl; bi++) body.push(wasmBytes[pos++]);
                funcBodies.push(body);
            }
            break;
        }
        pos += secLen;
    }
    if (funcBodies.length < 2) return frag1;
    var code = funcBodies[1];
    // Parse locals
    var locals = [Y, V, TT, O, keyLen];
    var cp = 0;
    var ldc = 0; sh = 0;
    while (true) { var b = code[cp++]; ldc |= (b & 0x7f) << sh; sh += 7; if (!(b & 0x80)) break; }
    for (var ld = 0; ld < ldc; ld++) {
        var cnt = 0; sh = 0;
        while (true) { var b = code[cp++]; cnt |= (b & 0x7f) << sh; sh += 7; if (!(b & 0x80)) break; }
        cp++; // skip val type
        for (var ci = 0; ci < cnt; ci++) locals.push(0);
    }
    var codeStart = cp;
    // Pre-scan to find matching 'end' positions for each block/loop
    // blockMap[openPos] = endPos
    var blockEndMap = {}, blockStack2 = [];
    for (var sp = cp; sp < code.length; sp++) {
        var sop = code[sp];
        if (sop === 0x02 || sop === 0x03) { sp++; blockStack2.push(sp - 1); } // block/loop: push open pos
        else if (sop === 0x0b) { if (blockStack2.length > 0) { var openPos = blockStack2.pop(); blockEndMap[openPos] = sp; } }
        else if (sop === 0x41 || sop === 0x20 || sop === 0x21 || sop === 0x22 || sop === 0x23 || sop === 0x24 || sop === 0x0c || sop === 0x0d) { var v=0,s=0; while(true){var bv=code[++sp];v|=(bv&0x7f)<<s;s+=7;if(!(bv&0x80))break;} }
        else if (sop === 0x2d || sop === 0x3a) { var v=0,s=0;while(true){var bv=code[++sp];v|=(bv&0x7f)<<s;s+=7;if(!(bv&0x80))break;}v=0;s=0;while(true){var bv=code[++sp];v|=(bv&0x7f)<<s;s+=7;if(!(bv&0x80))break;} }
    }
    // Execute
    var stack = [];
    // blockStack entries: {type: 'block'|'loop', openPos, endPos}
    var bStack = [];
    function readLeb() { var v=0,s=0; while(true){var bv=code[cp++];v|=(bv&0x7f)<<s;s+=7;if(!(bv&0x80))break;} return v; }
    function readSLeb() { var v=0,s=0,bv; do{bv=code[cp++];v|=(bv&0x7f)<<s;s+=7;}while(bv&0x80); if(s<32&&(bv&0x40))v|=(-1<<s); return v; }
    function doBranch(depth) {
        // pop depth blocks from stack, keeping the target
        for (var di = 0; di < depth; di++) bStack.pop();
        var target = bStack[bStack.length - 1];
        if (!target) { cp = code.length; return; }
        if (target.type === 'loop') {
            // Jump to loop body start (right after the block type byte)
            cp = target.openPos + 2; // skip opcode + blocktype
        } else {
            // Jump past end of block, pop it
            bStack.pop();
            cp = target.endPos + 1;
        }
    }
    var maxIter = 500000;
    while (cp < code.length && maxIter-- > 0) {
        var op = code[cp++];
        if (op === 0x02 || op === 0x03) {
            var bt = code[cp++]; // block type
            bStack.push({ type: op === 0x02 ? 'block' : 'loop', openPos: cp - 2, endPos: blockEndMap[cp - 2] });
        } else if (op === 0x0b) {
            if (bStack.length > 0) bStack.pop();
            else break;
        } else if (op === 0x0c) { var d = readLeb(); doBranch(d); }
        else if (op === 0x0d) { var d = readLeb(); if (stack.pop()) doBranch(d); }
        else if (op === 0x41) stack.push(readSLeb());
        else if (op === 0x20) stack.push(locals[readLeb()]);
        else if (op === 0x21) locals[readLeb()] = stack.pop();
        else if (op === 0x22) { var li = readLeb(); locals[li] = stack[stack.length - 1]; }
        else if (op === 0x24) { readLeb(); global0 = stack.pop(); }
        else if (op === 0x23) { readLeb(); stack.push(global0); }
        else if (op === 0x6a) { var b2 = stack.pop(); stack.push((stack.pop() + b2) | 0); }
        else if (op === 0x6b) { var b2 = stack.pop(); stack.push((stack.pop() - b2) | 0); }
        else if (op === 0x6c) { var b2 = stack.pop(); stack.push(Math.imul(stack.pop(), b2)); }
        else if (op === 0x71) { var b2 = stack.pop(); stack.push(stack.pop() & b2); }
        else if (op === 0x72) { var b2 = stack.pop(); stack.push(stack.pop() | b2); }
        else if (op === 0x73) { var b2 = stack.pop(); stack.push(stack.pop() ^ b2); }
        else if (op === 0x74) { var b2 = stack.pop(); stack.push(stack.pop() << b2); }
        else if (op === 0x75) { var b2 = stack.pop(); stack.push(stack.pop() >>> b2); }
        else if (op === 0x76) { var b2 = stack.pop(); stack.push(stack.pop() >> b2); }
        else if (op === 0x2d) { var al = readLeb(), of2 = readLeb(); stack.push(memory[(stack.pop() + of2) & 0xffff] & 0xff); }
        else if (op === 0x3a) { var al = readLeb(), of2 = readLeb(); var vl = stack.pop(); memory[(stack.pop() + of2) & 0xffff] = vl & 0xff; }
        else if (op === 0x45) stack.push(stack.pop() === 0 ? 1 : 0);
        else if (op === 0x46) { var b2 = stack.pop(); stack.push(stack.pop() === b2 ? 1 : 0); }
        else if (op === 0x47) { var b2 = stack.pop(); stack.push(stack.pop() !== b2 ? 1 : 0); }
        else if (op === 0x48) { var b2 = stack.pop(); stack.push(stack.pop() < b2 ? 1 : 0); }
        else if (op === 0x49) { var b2 = stack.pop(); stack.push((stack.pop() >>> 0) < (b2 >>> 0) ? 1 : 0); }
        else if (op === 0x4a) { var b2 = stack.pop(); stack.push(stack.pop() > b2 ? 1 : 0); }
        else if (op === 0x4b) { var b2 = stack.pop(); stack.push((stack.pop() >>> 0) > (b2 >>> 0) ? 1 : 0); }
        else if (op === 0x4c) { var b2 = stack.pop(); stack.push(stack.pop() <= b2 ? 1 : 0); }
        else if (op === 0x4d) { var b2 = stack.pop(); stack.push((stack.pop() >>> 0) <= (b2 >>> 0) ? 1 : 0); }
        else if (op === 0x4e) { var b2 = stack.pop(); stack.push(stack.pop() >= b2 ? 1 : 0); }
        else if (op === 0x4f) { var b2 = stack.pop(); stack.push((stack.pop() >>> 0) >= (b2 >>> 0) ? 1 : 0); }
        else if (op === 0x01) { /* nop */ }
        else break; // unreachable / return
    }
    var result = new Uint8Array(keyLen);
    for (var i = 0; i < keyLen; i++) result[i] = memory[O + i];
    return result;
}

// ============ Pure JS HMAC-SHA256 / PBKDF2 ============

function _sha256Bytes(bytes) {
    var _K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var msg = []; for (var mi = 0; mi < bytes.length; mi++) msg.push(bytes[mi]);
    var bitLen = msg.length * 8;
    msg.push(0x80);
    while (msg.length % 64 !== 56) msg.push(0);
    msg.push(0, 0, 0, 0);
    msg.push((bitLen >>> 24) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 8) & 0xff, bitLen & 0xff);
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    function rr(v, n) { return (v >>> n) | (v << (32 - n)); }
    for (var off = 0; off < msg.length; off += 64) {
        var W = [];
        for (var t = 0; t < 16; t++) W[t] = (msg[off+t*4]<<24)|(msg[off+t*4+1]<<16)|(msg[off+t*4+2]<<8)|msg[off+t*4+3];
        for (var t = 16; t < 64; t++) { var s0=rr(W[t-15],7)^rr(W[t-15],18)^(W[t-15]>>>3); var s1=rr(W[t-2],17)^rr(W[t-2],19)^(W[t-2]>>>10); W[t]=(W[t-16]+s0+W[t-7]+s1)|0; }
        var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
        for (var t = 0; t < 64; t++) { var S1=rr(e,6)^rr(e,11)^rr(e,25),ch=(e&f)^(~e&g),t1=(h+S1+ch+_K[t]+W[t])|0; var S0=rr(a,2)^rr(a,13)^rr(a,22),maj=(a&b)^(a&c)^(b&c),t2=(S0+maj)|0; h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0; }
        H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;
    }
    var out = new Uint8Array(32);
    for (var i = 0; i < 8; i++) { out[i*4]=(H[i]>>>24)&0xff; out[i*4+1]=(H[i]>>>16)&0xff; out[i*4+2]=(H[i]>>>8)&0xff; out[i*4+3]=H[i]&0xff; }
    return out;
}
function _hmacSha256(key, msg) {
    if (key.length > 64) key = _sha256Bytes(key);
    var ipad = new Uint8Array(64), opad = new Uint8Array(64);
    for (var i = 0; i < 64; i++) { var k = i < key.length ? key[i] : 0; ipad[i] = k ^ 0x36; opad[i] = k ^ 0x5c; }
    var inner = new Uint8Array(64 + msg.length); inner.set(ipad); inner.set(msg, 64);
    var innerHash = _sha256Bytes(inner);
    var outer = new Uint8Array(64 + 32); outer.set(opad); outer.set(innerHash, 64);
    return _sha256Bytes(outer);
}
function _pbkdf2Sha256(password, salt, iterations, dkLen) {
    var result = new Uint8Array(dkLen);
    var blockCount = Math.ceil(dkLen / 32);
    for (var block = 1; block <= blockCount; block++) {
        var saltBlock = new Uint8Array(salt.length + 4);
        saltBlock.set(salt); saltBlock[salt.length]=(block>>>24)&0xff; saltBlock[salt.length+1]=(block>>>16)&0xff; saltBlock[salt.length+2]=(block>>>8)&0xff; saltBlock[salt.length+3]=block&0xff;
        var u = _hmacSha256(password, saltBlock);
        var accum = new Uint8Array(u);
        for (var iter = 1; iter < iterations; iter++) { u = _hmacSha256(password, u); for (var j = 0; j < 32; j++) accum[j] ^= u[j]; }
        var offset = (block - 1) * 32;
        for (var j = 0; j < 32 && offset + j < dkLen; j++) result[offset + j] = accum[j];
    }
    return result;
}

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
        return {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://reanime.to/",
            "Accept": "application/json, text/plain, */*"
        };
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
        // Use search API with popularity sort — supports real pagination (30/page)
        var limit = 30;
        var offset = (page - 1) * limit;
        var res = await this.client.get(
            "https://reanime.to/api/search?q=&limit=" + limit + "&offset=" + offset + "&sort=POPULARITY_DESC",
            this.getHeaders()
        );
        var data = JSON.parse(res.body);
        var results = data.results || [];
        var total = data.total || 0;
        var list = [];
        for (var item of results) {
            var t = item.title || {};
            list.push({
                name: t.english || t.romaji || t.native || "",
                imageUrl: (item.cover_image && item.cover_image.extra_large) || "",
                link: item.anime_id || ""
            });
        }
        var hasNextPage = offset + results.length < total;
        return { list: list, hasNextPage: hasNextPage };
    }

    async getLatestUpdates(page) {
        var res = await this.client.get("https://reanime.to/home/__data.json", this.getHeaders());
        var rawData = JSON.parse(res.body);
        var dataArray = null;
        for (var n = 0; n < rawData.nodes.length; n++) {
            if (rawData.nodes[n] && rawData.nodes[n].data) dataArray = rawData.nodes[n].data;
        }
        if (!dataArray) return { list: [], hasNextPage: false };
        var decoded = this.unflatten(0, dataArray);
        var home = decoded.homeData || decoded;
        var items = home.latest_aired || [];
        var list = [];
        for (var item of items) {
            var t = item.title || {};
            list.push({
                name: t.english || t.romaji || t.native || "",
                imageUrl: (item.cover_image && item.cover_image.extra_large) || "",
                link: item.anime_id || ""
            });
        }
        return { list: list, hasNextPage: false };
    }

    async search(query, page, filters) {
        try {
            var limit = 30;
            var offset = (page - 1) * limit;
            var res = await this.client.get(
                "https://reanime.to/api/search?q=" + encodeURIComponent(query) + "&limit=" + limit + "&offset=" + offset,
                this.getHeaders()
            );
            var data = JSON.parse(res.body);
            var results = data.results || [];
            var total = data.total || 0;
            var list = [];
            for (var item of results) {
                var t = item.title || {};
                list.push({
                    name: t.english || t.romaji || t.native || item.title || "",
                    imageUrl: (item.cover_image && item.cover_image.extra_large) || "",
                    link: item.anime_id || ""
                });
            }
            var hasNextPage = offset + results.length < total;
            return { list: list, hasNextPage: hasNextPage };
        } catch (e) {
            console.log("ReAnime: " + e);
            return { list: [], hasNextPage: false };
        }
    }

    async getDetail(url) {
        try {
            var name = "", imageUrl = "", description = "", genre = [], status = 0, chapters = [];
            var anilistId = "";

            // Get anime info from SSR data
            var infoRes = await this.client.get("https://reanime.to/anime/" + url + "/__data.json", this.getHeaders());
            var rawData = JSON.parse(infoRes.body);
            var dataArray = null;
            for (var n = 0; n < rawData.nodes.length; n++) {
                if (rawData.nodes[n] && rawData.nodes[n].data) dataArray = rawData.nodes[n].data;
            }
            if (dataArray) {
                var decoded = this.unflatten(0, dataArray);
                var info = decoded.anime || decoded;
                var t = info.title || {};
                name = t.english || t.romaji || t.native || "";
                imageUrl = (info.cover_image && info.cover_image.extra_large) || (info.banner_image) || "";
                description = (info.description || "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "");
                genre = info.genres || [];
                anilistId = info.anilist_id || "";
                var s = info.status || "";
                if (s === "Finished" || s === "FINISHED") status = 1;
                else if (s === "Releasing" || s === "RELEASING") status = 0;
                else if (s === "NOT_YET_RELEASED") status = 2;
                else if (s === "CANCELLED") status = 3;
            }

            // Get episode list
            var epRes = await this.client.get("https://reanime.to/api/episodes/" + url, this.getHeaders());
            var epData = JSON.parse(epRes.body);
            var epList = epData.data || [];
            for (var ep of epList) {
                var epNum = ep.episode_number || 0;
                var epTitle = ep.title || ("Episode " + epNum);
                if (!epTitle || epTitle === "") epTitle = "Episode " + epNum;
                chapters.push({
                    name: epTitle,
                    url: url + "/" + anilistId + "/" + epNum
                });
            }

            // Sort DESCENDING (newest first)
            chapters.sort(function (a, b) {
                var na = parseInt(a.url.split("/").pop()) || 0;
                var nb = parseInt(b.url.split("/").pop()) || 0;
                return nb - na;
            });

            return { name, imageUrl, description, genre, status, chapters };
        } catch (e) {
            console.log("ReAnime getDetail: " + e);
            return { name: "", imageUrl: "", description: "", genre: [], status: 0, chapters: [] };
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

        // Fetch servers from flix API
        var flixRes = await this.client.get("https://reanime.to/api/flix/" + anilistId + "/" + epNum, this.getHeaders());
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
                    var baseUrl = originalUrl.split("?")[0];
                    var qparams = originalUrl.split("?")[1] || "";
                    var embedUrl = baseUrl + "/__data.json" + (qparams ? "?" + qparams : "");

                    var embedRes = await this.client.get(embedUrl, {
                        "User-Agent": this.getHeaders()["User-Agent"],
                        "Referer": "https://reanime.to/",
                        "Accept": "*/*"
                    });

                    var embedData = JSON.parse(embedRes.body);
                    var dataArray = null;
                    for (var n = 0; n < embedData.nodes.length; n++) {
                        if (embedData.nodes[n] && embedData.nodes[n].data) dataArray = embedData.nodes[n].data;
                    }
                    if (!dataArray) continue;

                    var decoded = this.unflatten(0, dataArray);
                    var seed = decoded.obfuscation_seed;

                    // FlixCloud subtitles
                    var flixSubs = [];
                    if (decoded.subtitles && Array.isArray(decoded.subtitles)) {
                        for (var sub of decoded.subtitles) {
                            if (sub && sub.url && sub.language) {
                                if (!sub.language.toLowerCase().includes("eng")) continue;
                                flixSubs.push({ file: sub.url, label: sub.language });
                            }
                        }
                    }

                    if (!seed) continue;

                    // FlixCloud uses triple-hash: hash seed 3x with index suffix
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

                    var tokenId = decoded[tokenField];
                    var frag2B64 = decoded[keyFrag2Field];
                    if (!tokenId) continue;

                    var obfData = decoded.obfuscated_crypto_data;
                    var container = obfData[containerName];
                    var arr = container[arrayName];
                    var innerObj = arr[0][objectName];

                    var frag1B64 = innerObj[keyField];
                    var ivB64 = innerObj[ivField];

                    var apiRes = await this.client.get("https://flixcloud.cc/api/m3u8/" + tokenId, {
                        "User-Agent": this.getHeaders()["User-Agent"],
                        "Referer": originalUrl,
                        "Accept": "*/*"
                    });

                    var apiData = JSON.parse(apiRes.body);
                    // m3u8 response uses dynamic field names
                    var videoFieldName = _sha256(tokenId + "vid").substring(0, 10);
                    var keyFieldName = _sha256(tokenId + "key").substring(0, 10);
                    var videoB64 = apiData[videoFieldName];
                    var frag3B64 = apiData[keyFieldName];

                    var frag1 = _b64Decode(frag1B64);
                    var frag2 = _b64Decode(frag2B64);
                    var frag3 = _b64Decode(frag3B64);
                    var ivBytes = _b64Decode(ivB64);
                    var cipherBytes = _b64Decode(videoB64);

                    // Step 1: WASM scramble to combine key fragments
                    var wasmPayload = decoded.w_payload;
                    var wasmKey = _runWasmScramble(wasmPayload, frag1, frag2, frag3, oHashParam);

                    // Step 2: PBKDF2 with wasmKey as password, seed as salt
                    var seedBytes = [];
                    for (var si = 0; si < seed.length; si++) seedBytes.push(seed.charCodeAt(si));
                    var derived = _pbkdf2Sha256(wasmKey, new Uint8Array(seedBytes), 1000, 32);

                    // Step 3: XOR with seed characters
                    for (var xi = 0; xi < 32; xi++) derived[xi] ^= seed.charCodeAt(xi % seed.length);

                    // Step 4: SHA-256 hash to get final AES key
                    var finalKey = _sha256Bytes(derived);

                    // Step 5: AES-CBC decrypt
                    var decBytes = _aesDecryptCBC(cipherBytes, finalKey, ivBytes);
                    var decryptedUrl = "";
                    for (var i = 0; i < decBytes.length; i++) decryptedUrl += String.fromCharCode(decBytes[i]);

                    if (decryptedUrl && decryptedUrl.includes(".m3u8")) {
                        try {
                            var masterRes = await this.client.get(decryptedUrl, {
                                "User-Agent": this.getHeaders()["User-Agent"],
                                "Referer": "https://flixcloud.cc/",
                                "Accept": "*/*"
                            });
                            var masterText = masterRes.body;
                            if (masterText.includes("RESOLUTION=")) {
                                var autoObj = {
                                    url: decryptedUrl,
                                    originalUrl: decryptedUrl,
                                    quality: quality + " - Auto",
                                    headers: { "Referer": "https://flixcloud.cc/" }
                                };
                                if (flixSubs.length > 0) autoObj.subtitles = flixSubs;
                                list.push(autoObj);

                                var lines = masterText.split("\n");
                                var currentResolution = "";
                                for (var i = 0; i < lines.length; i++) {
                                    var line = lines[i].trim();
                                    if (line.startsWith("#EXT-X-STREAM-INF:")) {
                                        var resMatch = line.match(/RESOLUTION=\d+x(\d+)/);
                                        if (resMatch) currentResolution = resMatch[1] + "p";
                                    } else if (line.length > 0 && !line.startsWith("#")) {
                                        var streamUrl = line.startsWith("http") ? line : decryptedUrl.substring(0, decryptedUrl.lastIndexOf("/") + 1) + line;
                                        var resQuality = quality + (currentResolution ? " - " + currentResolution : "");
                                        var videoObj = {
                                            url: streamUrl,
                                            originalUrl: streamUrl,
                                            quality: resQuality,
                                            headers: { "Referer": "https://flixcloud.cc/" }
                                        };
                                        if (flixSubs.length > 0) videoObj.subtitles = flixSubs;
                                        list.push(videoObj);
                                        currentResolution = "";
                                    }
                                }
                            } else {
                                var videoObj = {
                                    url: decryptedUrl,
                                    originalUrl: decryptedUrl,
                                    quality: quality,
                                    headers: { "Referer": "https://flixcloud.cc/" }
                                };
                                if (flixSubs.length > 0) videoObj.subtitles = flixSubs;
                                list.push(videoObj);
                            }
                        } catch (e) {
                            console.log("M3U8 Parse Error: " + e);
                            var videoObj = {
                                url: decryptedUrl,
                                originalUrl: decryptedUrl,
                                quality: quality + " (Auto)",
                                headers: { "Referer": "https://flixcloud.cc/" }
                            };
                            if (flixSubs.length > 0) videoObj.subtitles = flixSubs;
                            list.push(videoObj);
                        }
                        continue;
                    }
                } catch (e) {
                    console.log("ReAnime FlixCloud: " + e);
                }
            }

            // Fallback: push embed URL
            var fallbackObj = {
                url: originalUrl,
                originalUrl: originalUrl,
                quality: quality + " (Embed)",
                headers: this.getHeaders()
            };
            list.push(fallbackObj);
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
            }
        ];
    }
}


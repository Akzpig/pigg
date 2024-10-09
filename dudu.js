class U {
    constructor() {}

    get r() {
        return document.getElementById('root');
    }

    get c() {
        return document.querySelectorAll("input[type=text]").length > 0;
    }

    f = v => v != null;

    gN = o => o?.constructor?.name;

    gO = (a, n, i) => {
        if ((!a) || (!n) || (!i)) return;
        for (const c of a) {
            if (typeof c == 'object') {
                const p = c?.__proto__;
                const init = Object.values(p)[i];
                if (init?.toString()?.includes(n)) {
                    return c;
                }
            }
        }
    }

    e = (a, b) => a?.toUpperCase() === b?.toUpperCase();

    fS = (n, h) => {
        let hL = h.length, nL = n.length;
        if (nL > hL) return false;
        if (nL === hL) return n === h;

        outer: for (let i = 0, j = 0; i < nL; i++) {
            const nC = n.charCodeAt(i);
            while (j < hL) {
                if (h.charCodeAt(j++) === nC) continue outer;
            }
            return false;
        }
        return true;
    };

    fN = (o, n, i = -1, l = false, f = false) => {
        let count = 0;
        for (const k in o) {
            if (typeof o[k] === 'object' && (f ? this.fS(n, this.gN(o[k])) : this.e(this.gN(o[k]), n))) {
                if (i === -1 || i === count) return l ? [k, o[k]] : o[k];
                count++;
            }
        }
    };

    fP = (o, p) => {
        if (typeof p !== 'string' && !Array.isArray(p)) throw new Error(`Invalid path`);

        const pathArr = Array.isArray(p) ? p : p.split('.');
        let res = o;
        pathArr.forEach((name, idx) => {
            if (!res) return;

            const last = idx === pathArr.length - 1;
            if (res[name]) res = res[name];
            else if (name.startsWith('i:')) res = this.fI(res, name.slice(2), last);
            else if (name.startsWith('fuzzy:')) res = this.fN(res, name.slice(6), -1, last, true);
            else {
                const split = name.split(':');
                res = split.length === 2 ? this.fN(res, split[0], +split[1], last) : this.fN(res, name, -1, last);
            }

            if (typeof res !== 'object') return res;
        });

        return res;
    };

    gCN = el => {
        if (typeof el !== 'object' && typeof el !== 'function') return;
        const result = {};

        for (const [k, v] of Object.entries(el)) {
            if (Array.isArray(v)) {
                result[k] = v;
                continue;
            }

            if (typeof v === 'function' && v.callableName) {
                result[v.callableName] = el[k];
                continue;
            }

            const name = v?.constructor?.$metadata$?.simpleName;

            if (!name) continue;

            if (result[name]) {
                for (let i = 0; ; i++) {
                    const tempName = `${name}_${i}`;
                    if (!result[tempName]) {
                        result[tempName] = v;
                        break;
                    }
                }
            } else {
                result[name] = v;
            }
        }

        result['original'] = el;

        return result;
    }

    gB = (arr, name, index) => {
        if ((!arr) || (!name) || (!index)) return;
        for (const c of arr) {
            const p = c?.__proto__;
            const init = Object.values(p)[index];
            if (init?.toString()?.includes(name)) {
                return c;
            }
        }
    };

    fI = (o, i, last = false) => {
        const entry = Object.entries(o)?.[i];

        if (last)
            return entry;

        if (typeof entry?.[1] === 'object')
            return entry[1];

        return entry?.[0];
    };

    gBL = (o, l) => {
        let valid = [];
        for (let i = 0; i < o.length; i++) {
            let objArr = [];
            for (let k in o[i]) {
                if (typeof o[i][k] == 'object') {
                    objArr.push(o[i][k]);
                }
            }

            if (objArr.length == l) valid.push(objArr);
        }
        return valid;
    };

    cS = (o, v = new Set()) => {
        if (v.has(o)) return null;
        v.add(o);

        if (o?.constructor?.$metadata$?.simpleName === "ModalComponent") {
            return o;
        }

        for (let k in o) {
            if (typeof o[k] === "object") {
                const res = this.cS(o[k], v);
                if (res) return res;
            }
        }

        return null;
    };

    get rO() {
        if (this.r) {
            return this.cS(this.r);
        } else {
            return;
        }
    }

    get gR() {
        const comp = this.rO;
        if (!comp) return;

        const T = this.gB(comp, ""),
              S = this.gB(T, "");

        const L = Object.entries(S)?.[1]?.[1];

        if (L == void 0) return;

        const LV = Object.entries(L)?.[1]?.[1];
        const BE = this.gBL(LV, 3)?.[1]?.[0];

        return BE ? true : false;
    };

    gBN = (o, n) => {
        for (const k in o) {
            if (o[k]?.constructor?.name === n && typeof o[k] === "object") {
                return o[k];
            }
        }
    };

    gBSN = (o, sN) => {
        for (const k in o) {
            if (o[k]?.constructor?.$metadata$?.simpleName === sN && typeof o[k] === "object") {
                return o[k];
            }
        }
    };

    eL = t => {
        throw new Error('[Shizoval] ' + t);
    };

    n = (t, c) => {
        const l = document.createElement('div');
        l.innerHTML = t;
        l.style.backgroundColor = c;
        l.className = 'notify-message';
        document.body.appendChild(l);
        setTimeout(() => {
            l.style.top = "-100%";
        }, 2000);
    };

    r = (min, max) => {
        return Math.random() * (max - min) + min;
    };
};

const u = new U();

class G {
    constructor() {}
    get T() {
        return u.gBSN(u.rO, "");
    }

    get uN() {
        return u.fP(objects.gameObjects.user, "i:0.i:15")[1];
    }

    get s() {
        return u.gBSN(this.T, "");
    }

    get u() {
        return u.fP(objects.gameObjects.TOState, "i:3.i:4")[1];
    }

    w = {
        get w() {
            if (!u.gR) return;
            const c = u.rO,
                  T = u.gBSN(c, ""),
                  S = u.gBSN(T, ""),
                  L = Object.entries(S)[1][1];

            if (L == void 0) return;

            const LV = Object.entries(L)[1][1];
            const BE = u.gBL(LV, 3)[1][0];
            const w = u.gCN(Object.entries(BE)[1][1]);

            return w;
        }
    };

    get gM() {
        if (!u.gR) return;
        const w = this.w.w,
              t0 = u.gCN(w).ArrayList_0,
              t1 = Object.entries(t0)[1][1],
              t2 = u.gCN(t1[0]),
              t3 = Object.entries(t2.original)[5][1],
              gM = Object.entries(t3)[0][1];

        return gM;
    };

    get g() {
        return u.fP(objects.gameObjects.world.world, "ArrayList_0.i:1.0")
    };

    get m() {
        if (!u.gR) return;
        const mPath = Object.entries(u.gO(this.g, 'putMine', 1))[11][1]

        const mArr = u.fP(mPath, 'i:1')[1];
        const minesArray = Object.entries(mArr)[1][1];

        return minesArray;
    };
}

let objects = {
    gameObjects: void 0
};

function iO() {
    if (u.gR && (objects.gameObjects == void 0 || objects.features == void 0)) {
        objects.gameObjects = new G();
        requestAnimationFrame(iO);
    }
}

requestAnimationFrame(iO);

let f, a, c, o, n, l, b, p, x, y, z, q;

function mSToTime(s) {
    const pad = (n, z = 2) => ("00" + n).slice(-z);
    return (pad((s / 3.6e6) | 0) + ":" + pad(((s % 3.6e6) / 6e4) | 0) + ":" + pad(((s % 6e4) / 1000) | 0) + "." + pad(s % 1000, 3));
}

class cfng {
    constructor() {}
    rM = {
        rD: 2
    };
}

let cgf = new cfng;

class M {
    constructor() {}

    rAM = () => {
        const g = u.fP(objects?.gameObjects.world.world, "ArrayList_0.i:1.0"),
              aL = u.fP(g, "i:3")?.[1];

        aL?.forEach((e, index) => {
            if (!f) f = u.fP(e, "i:0")?.[0];
            if (!f) return;
            if (!a) a = u.fP(e[f], "i:0")?.[0];
            if (!a) return;

            if (e?.[f]?.[a]) {
                for (const t of e[f][a]) {
                    if (!c) {
                        c = u.fP(t, "i:1")?.[0];
                    }
                    if (t[c]?.callableName === "removeMines") {
                        const rM = aL[index + 5][f][a][0][c];
                        o = rM?.toString().split(".")[1].split(")")[0];
                        return rM();
                    }
                }
            }
        });
    };

    fD = (m) => {
        if (!aL) {
            aL = u.fP(m, "i:3")?.[0];
            if (!aL) return;
        }

        if (!x) {
            let count = 0;
            for (const e of m[aL].filter(u.f)) {
                if (!f || !a) {
                    f = u.fP(e, "i:0")?.[0] || '';
                    a = u.fP(e[f], "i:0")?.[0];
                    if (!f || !a) continue;
                }

                if (e?.[f]?.[a]) {
                    for (const t of e[f][a]) {
                        if (!count) {
                            count = u.fP(t, "i:1")?.[0];
                        }
                        if (t[count]?.["callableName"] === "deactivateMine") {
                            x = t[count];
                        }
                    }
                }
            }
        }
    };
};

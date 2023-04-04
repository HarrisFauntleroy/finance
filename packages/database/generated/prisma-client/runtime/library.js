'use strict';
var Ec = Object.create;
var Yt = Object.defineProperty;
var wc = Object.getOwnPropertyDescriptor;
var xc = Object.getOwnPropertyNames;
var vc = Object.getPrototypeOf,
  Tc = Object.prototype.hasOwnProperty;
var l = (e, t) => Yt(e, 'name', { value: t, configurable: !0 });
var I = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Jr = (e, t) => {
    for (var r in t) Yt(e, r, { get: t[r], enumerable: !0 });
  },
  qo = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of xc(t))
        !Tc.call(e, i) &&
          i !== r &&
          Yt(e, i, {
            get: () => t[i],
            enumerable: !(n = wc(t, i)) || n.enumerable,
          });
    return e;
  };
var M = (e, t, r) => (
    (r = e != null ? Ec(vc(e)) : {}),
    qo(
      t || !e || !e.__esModule
        ? Yt(r, 'default', { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  _c = (e) => qo(Yt({}, '__esModule', { value: !0 }), e);
var Uo = I((Ig, Yr) => {
  var Ac = (function () {
    var e = String.fromCharCode,
      t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$',
      n = {};
    function i(s, a) {
      if (!n[s]) {
        n[s] = {};
        for (var u = 0; u < s.length; u++) n[s][s.charAt(u)] = u;
      }
      return n[s][a];
    }
    l(i, 'getBaseValue');
    var o = {
      compressToBase64: function (s) {
        if (s == null) return '';
        var a = o._compress(s, 6, function (u) {
          return t.charAt(u);
        });
        switch (a.length % 4) {
          default:
          case 0:
            return a;
          case 1:
            return a + '===';
          case 2:
            return a + '==';
          case 3:
            return a + '=';
        }
      },
      decompressFromBase64: function (s) {
        return s == null
          ? ''
          : s == ''
          ? null
          : o._decompress(s.length, 32, function (a) {
              return i(t, s.charAt(a));
            });
      },
      compressToUTF16: function (s) {
        return s == null
          ? ''
          : o._compress(s, 15, function (a) {
              return e(a + 32);
            }) + ' ';
      },
      decompressFromUTF16: function (s) {
        return s == null
          ? ''
          : s == ''
          ? null
          : o._decompress(s.length, 16384, function (a) {
              return s.charCodeAt(a) - 32;
            });
      },
      compressToUint8Array: function (s) {
        for (
          var a = o.compress(s),
            u = new Uint8Array(a.length * 2),
            c = 0,
            p = a.length;
          c < p;
          c++
        ) {
          var f = a.charCodeAt(c);
          (u[c * 2] = f >>> 8), (u[c * 2 + 1] = f % 256);
        }
        return u;
      },
      decompressFromUint8Array: function (s) {
        if (s == null) return o.decompress(s);
        for (var a = new Array(s.length / 2), u = 0, c = a.length; u < c; u++)
          a[u] = s[u * 2] * 256 + s[u * 2 + 1];
        var p = [];
        return (
          a.forEach(function (f) {
            p.push(e(f));
          }),
          o.decompress(p.join(''))
        );
      },
      compressToEncodedURIComponent: function (s) {
        return s == null
          ? ''
          : o._compress(s, 6, function (a) {
              return r.charAt(a);
            });
      },
      decompressFromEncodedURIComponent: function (s) {
        return s == null
          ? ''
          : s == ''
          ? null
          : ((s = s.replace(/ /g, '+')),
            o._decompress(s.length, 32, function (a) {
              return i(r, s.charAt(a));
            }));
      },
      compress: function (s) {
        return o._compress(s, 16, function (a) {
          return e(a);
        });
      },
      _compress: function (s, a, u) {
        if (s == null) return '';
        var c,
          p,
          f = {},
          d = {},
          m = '',
          h = '',
          g = '',
          w = 2,
          y = 3,
          x = 2,
          b = [],
          E = 0,
          T = 0,
          C;
        for (C = 0; C < s.length; C += 1)
          if (
            ((m = s.charAt(C)),
            Object.prototype.hasOwnProperty.call(f, m) ||
              ((f[m] = y++), (d[m] = !0)),
            (h = g + m),
            Object.prototype.hasOwnProperty.call(f, h))
          )
            g = h;
          else {
            if (Object.prototype.hasOwnProperty.call(d, g)) {
              if (g.charCodeAt(0) < 256) {
                for (c = 0; c < x; c++)
                  (E = E << 1),
                    T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++;
                for (p = g.charCodeAt(0), c = 0; c < 8; c++)
                  (E = (E << 1) | (p & 1)),
                    T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                    (p = p >> 1);
              } else {
                for (p = 1, c = 0; c < x; c++)
                  (E = (E << 1) | p),
                    T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                    (p = 0);
                for (p = g.charCodeAt(0), c = 0; c < 16; c++)
                  (E = (E << 1) | (p & 1)),
                    T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                    (p = p >> 1);
              }
              w--, w == 0 && ((w = Math.pow(2, x)), x++), delete d[g];
            } else
              for (p = f[g], c = 0; c < x; c++)
                (E = (E << 1) | (p & 1)),
                  T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                  (p = p >> 1);
            w--,
              w == 0 && ((w = Math.pow(2, x)), x++),
              (f[h] = y++),
              (g = String(m));
          }
        if (g !== '') {
          if (Object.prototype.hasOwnProperty.call(d, g)) {
            if (g.charCodeAt(0) < 256) {
              for (c = 0; c < x; c++)
                (E = E << 1),
                  T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++;
              for (p = g.charCodeAt(0), c = 0; c < 8; c++)
                (E = (E << 1) | (p & 1)),
                  T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                  (p = p >> 1);
            } else {
              for (p = 1, c = 0; c < x; c++)
                (E = (E << 1) | p),
                  T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                  (p = 0);
              for (p = g.charCodeAt(0), c = 0; c < 16; c++)
                (E = (E << 1) | (p & 1)),
                  T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                  (p = p >> 1);
            }
            w--, w == 0 && ((w = Math.pow(2, x)), x++), delete d[g];
          } else
            for (p = f[g], c = 0; c < x; c++)
              (E = (E << 1) | (p & 1)),
                T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
                (p = p >> 1);
          w--, w == 0 && ((w = Math.pow(2, x)), x++);
        }
        for (p = 2, c = 0; c < x; c++)
          (E = (E << 1) | (p & 1)),
            T == a - 1 ? ((T = 0), b.push(u(E)), (E = 0)) : T++,
            (p = p >> 1);
        for (;;)
          if (((E = E << 1), T == a - 1)) {
            b.push(u(E));
            break;
          } else T++;
        return b.join('');
      },
      decompress: function (s) {
        return s == null
          ? ''
          : s == ''
          ? null
          : o._decompress(s.length, 32768, function (a) {
              return s.charCodeAt(a);
            });
      },
      _decompress: function (s, a, u) {
        var c = [],
          p,
          f = 4,
          d = 4,
          m = 3,
          h = '',
          g = [],
          w,
          y,
          x,
          b,
          E,
          T,
          C,
          A = { val: u(0), position: a, index: 1 };
        for (w = 0; w < 3; w += 1) c[w] = w;
        for (x = 0, E = Math.pow(2, 2), T = 1; T != E; )
          (b = A.val & A.position),
            (A.position >>= 1),
            A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
            (x |= (b > 0 ? 1 : 0) * T),
            (T <<= 1);
        switch ((p = x)) {
          case 0:
            for (x = 0, E = Math.pow(2, 8), T = 1; T != E; )
              (b = A.val & A.position),
                (A.position >>= 1),
                A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
                (x |= (b > 0 ? 1 : 0) * T),
                (T <<= 1);
            C = e(x);
            break;
          case 1:
            for (x = 0, E = Math.pow(2, 16), T = 1; T != E; )
              (b = A.val & A.position),
                (A.position >>= 1),
                A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
                (x |= (b > 0 ? 1 : 0) * T),
                (T <<= 1);
            C = e(x);
            break;
          case 2:
            return '';
        }
        for (c[3] = C, y = C, g.push(C); ; ) {
          if (A.index > s) return '';
          for (x = 0, E = Math.pow(2, m), T = 1; T != E; )
            (b = A.val & A.position),
              (A.position >>= 1),
              A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
              (x |= (b > 0 ? 1 : 0) * T),
              (T <<= 1);
          switch ((C = x)) {
            case 0:
              for (x = 0, E = Math.pow(2, 8), T = 1; T != E; )
                (b = A.val & A.position),
                  (A.position >>= 1),
                  A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
                  (x |= (b > 0 ? 1 : 0) * T),
                  (T <<= 1);
              (c[d++] = e(x)), (C = d - 1), f--;
              break;
            case 1:
              for (x = 0, E = Math.pow(2, 16), T = 1; T != E; )
                (b = A.val & A.position),
                  (A.position >>= 1),
                  A.position == 0 && ((A.position = a), (A.val = u(A.index++))),
                  (x |= (b > 0 ? 1 : 0) * T),
                  (T <<= 1);
              (c[d++] = e(x)), (C = d - 1), f--;
              break;
            case 2:
              return g.join('');
          }
          if ((f == 0 && ((f = Math.pow(2, m)), m++), c[C])) h = c[C];
          else if (C === d) h = y + y.charAt(0);
          else return null;
          g.push(h),
            (c[d++] = y + h.charAt(0)),
            f--,
            (y = h),
            f == 0 && ((f = Math.pow(2, m)), m++);
        }
      },
    };
    return o;
  })();
  typeof Yr < 'u' && Yr != null && (Yr.exports = Ac);
});
var Jo = I((Kg, Wo) => {
  'use strict';
  Wo.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  };
});
var gi = I((Qg, zo) => {
  var zt = Jo(),
    Yo = {};
  for (let e of Object.keys(zt)) Yo[zt[e]] = e;
  var P = {
    rgb: { channels: 3, labels: 'rgb' },
    hsl: { channels: 3, labels: 'hsl' },
    hsv: { channels: 3, labels: 'hsv' },
    hwb: { channels: 3, labels: 'hwb' },
    cmyk: { channels: 4, labels: 'cmyk' },
    xyz: { channels: 3, labels: 'xyz' },
    lab: { channels: 3, labels: 'lab' },
    lch: { channels: 3, labels: 'lch' },
    hex: { channels: 1, labels: ['hex'] },
    keyword: { channels: 1, labels: ['keyword'] },
    ansi16: { channels: 1, labels: ['ansi16'] },
    ansi256: { channels: 1, labels: ['ansi256'] },
    hcg: { channels: 3, labels: ['h', 'c', 'g'] },
    apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
    gray: { channels: 1, labels: ['gray'] },
  };
  zo.exports = P;
  for (let e of Object.keys(P)) {
    if (!('channels' in P[e]))
      throw new Error('missing channels property: ' + e);
    if (!('labels' in P[e]))
      throw new Error('missing channel labels property: ' + e);
    if (P[e].labels.length !== P[e].channels)
      throw new Error('channel and label counts mismatch: ' + e);
    let { channels: t, labels: r } = P[e];
    delete P[e].channels,
      delete P[e].labels,
      Object.defineProperty(P[e], 'channels', { value: t }),
      Object.defineProperty(P[e], 'labels', { value: r });
  }
  P.rgb.hsl = function (e) {
    let t = e[0] / 255,
      r = e[1] / 255,
      n = e[2] / 255,
      i = Math.min(t, r, n),
      o = Math.max(t, r, n),
      s = o - i,
      a,
      u;
    o === i
      ? (a = 0)
      : t === o
      ? (a = (r - n) / s)
      : r === o
      ? (a = 2 + (n - t) / s)
      : n === o && (a = 4 + (t - r) / s),
      (a = Math.min(a * 60, 360)),
      a < 0 && (a += 360);
    let c = (i + o) / 2;
    return (
      o === i ? (u = 0) : c <= 0.5 ? (u = s / (o + i)) : (u = s / (2 - o - i)),
      [a, u * 100, c * 100]
    );
  };
  P.rgb.hsv = function (e) {
    let t,
      r,
      n,
      i,
      o,
      s = e[0] / 255,
      a = e[1] / 255,
      u = e[2] / 255,
      c = Math.max(s, a, u),
      p = c - Math.min(s, a, u),
      f = l(function (d) {
        return (c - d) / 6 / p + 1 / 2;
      }, 'diffc');
    return (
      p === 0
        ? ((i = 0), (o = 0))
        : ((o = p / c),
          (t = f(s)),
          (r = f(a)),
          (n = f(u)),
          s === c
            ? (i = n - r)
            : a === c
            ? (i = 1 / 3 + t - n)
            : u === c && (i = 2 / 3 + r - t),
          i < 0 ? (i += 1) : i > 1 && (i -= 1)),
      [i * 360, o * 100, c * 100]
    );
  };
  P.rgb.hwb = function (e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      i = P.rgb.hsl(e)[0],
      o = (1 / 255) * Math.min(t, Math.min(r, n));
    return (
      (n = 1 - (1 / 255) * Math.max(t, Math.max(r, n))), [i, o * 100, n * 100]
    );
  };
  P.rgb.cmyk = function (e) {
    let t = e[0] / 255,
      r = e[1] / 255,
      n = e[2] / 255,
      i = Math.min(1 - t, 1 - r, 1 - n),
      o = (1 - t - i) / (1 - i) || 0,
      s = (1 - r - i) / (1 - i) || 0,
      a = (1 - n - i) / (1 - i) || 0;
    return [o * 100, s * 100, a * 100, i * 100];
  };
  function Pc(e, t) {
    return (e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2;
  }
  l(Pc, 'comparativeDistance');
  P.rgb.keyword = function (e) {
    let t = Yo[e];
    if (t) return t;
    let r = 1 / 0,
      n;
    for (let i of Object.keys(zt)) {
      let o = zt[i],
        s = Pc(e, o);
      s < r && ((r = s), (n = i));
    }
    return n;
  };
  P.keyword.rgb = function (e) {
    return zt[e];
  };
  P.rgb.xyz = function (e) {
    let t = e[0] / 255,
      r = e[1] / 255,
      n = e[2] / 255;
    (t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92),
      (r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92),
      (n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92);
    let i = t * 0.4124 + r * 0.3576 + n * 0.1805,
      o = t * 0.2126 + r * 0.7152 + n * 0.0722,
      s = t * 0.0193 + r * 0.1192 + n * 0.9505;
    return [i * 100, o * 100, s * 100];
  };
  P.rgb.lab = function (e) {
    let t = P.rgb.xyz(e),
      r = t[0],
      n = t[1],
      i = t[2];
    (r /= 95.047),
      (n /= 100),
      (i /= 108.883),
      (r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116),
      (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116),
      (i = i > 0.008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116);
    let o = 116 * n - 16,
      s = 500 * (r - n),
      a = 200 * (n - i);
    return [o, s, a];
  };
  P.hsl.rgb = function (e) {
    let t = e[0] / 360,
      r = e[1] / 100,
      n = e[2] / 100,
      i,
      o,
      s;
    if (r === 0) return (s = n * 255), [s, s, s];
    n < 0.5 ? (i = n * (1 + r)) : (i = n + r - n * r);
    let a = 2 * n - i,
      u = [0, 0, 0];
    for (let c = 0; c < 3; c++)
      (o = t + (1 / 3) * -(c - 1)),
        o < 0 && o++,
        o > 1 && o--,
        6 * o < 1
          ? (s = a + (i - a) * 6 * o)
          : 2 * o < 1
          ? (s = i)
          : 3 * o < 2
          ? (s = a + (i - a) * (2 / 3 - o) * 6)
          : (s = a),
        (u[c] = s * 255);
    return u;
  };
  P.hsl.hsv = function (e) {
    let t = e[0],
      r = e[1] / 100,
      n = e[2] / 100,
      i = r,
      o = Math.max(n, 0.01);
    (n *= 2), (r *= n <= 1 ? n : 2 - n), (i *= o <= 1 ? o : 2 - o);
    let s = (n + r) / 2,
      a = n === 0 ? (2 * i) / (o + i) : (2 * r) / (n + r);
    return [t, a * 100, s * 100];
  };
  P.hsv.rgb = function (e) {
    let t = e[0] / 60,
      r = e[1] / 100,
      n = e[2] / 100,
      i = Math.floor(t) % 6,
      o = t - Math.floor(t),
      s = 255 * n * (1 - r),
      a = 255 * n * (1 - r * o),
      u = 255 * n * (1 - r * (1 - o));
    switch (((n *= 255), i)) {
      case 0:
        return [n, u, s];
      case 1:
        return [a, n, s];
      case 2:
        return [s, n, u];
      case 3:
        return [s, a, n];
      case 4:
        return [u, s, n];
      case 5:
        return [n, s, a];
    }
  };
  P.hsv.hsl = function (e) {
    let t = e[0],
      r = e[1] / 100,
      n = e[2] / 100,
      i = Math.max(n, 0.01),
      o,
      s;
    s = (2 - r) * n;
    let a = (2 - r) * i;
    return (
      (o = r * i),
      (o /= a <= 1 ? a : 2 - a),
      (o = o || 0),
      (s /= 2),
      [t, o * 100, s * 100]
    );
  };
  P.hwb.rgb = function (e) {
    let t = e[0] / 360,
      r = e[1] / 100,
      n = e[2] / 100,
      i = r + n,
      o;
    i > 1 && ((r /= i), (n /= i));
    let s = Math.floor(6 * t),
      a = 1 - n;
    (o = 6 * t - s), (s & 1) !== 0 && (o = 1 - o);
    let u = r + o * (a - r),
      c,
      p,
      f;
    switch (s) {
      default:
      case 6:
      case 0:
        (c = a), (p = u), (f = r);
        break;
      case 1:
        (c = u), (p = a), (f = r);
        break;
      case 2:
        (c = r), (p = a), (f = u);
        break;
      case 3:
        (c = r), (p = u), (f = a);
        break;
      case 4:
        (c = u), (p = r), (f = a);
        break;
      case 5:
        (c = a), (p = r), (f = u);
        break;
    }
    return [c * 255, p * 255, f * 255];
  };
  P.cmyk.rgb = function (e) {
    let t = e[0] / 100,
      r = e[1] / 100,
      n = e[2] / 100,
      i = e[3] / 100,
      o = 1 - Math.min(1, t * (1 - i) + i),
      s = 1 - Math.min(1, r * (1 - i) + i),
      a = 1 - Math.min(1, n * (1 - i) + i);
    return [o * 255, s * 255, a * 255];
  };
  P.xyz.rgb = function (e) {
    let t = e[0] / 100,
      r = e[1] / 100,
      n = e[2] / 100,
      i,
      o,
      s;
    return (
      (i = t * 3.2406 + r * -1.5372 + n * -0.4986),
      (o = t * -0.9689 + r * 1.8758 + n * 0.0415),
      (s = t * 0.0557 + r * -0.204 + n * 1.057),
      (i = i > 0.0031308 ? 1.055 * i ** (1 / 2.4) - 0.055 : i * 12.92),
      (o = o > 0.0031308 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92),
      (s = s > 0.0031308 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92),
      (i = Math.min(Math.max(0, i), 1)),
      (o = Math.min(Math.max(0, o), 1)),
      (s = Math.min(Math.max(0, s), 1)),
      [i * 255, o * 255, s * 255]
    );
  };
  P.xyz.lab = function (e) {
    let t = e[0],
      r = e[1],
      n = e[2];
    (t /= 95.047),
      (r /= 100),
      (n /= 108.883),
      (t = t > 0.008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116),
      (r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116),
      (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116);
    let i = 116 * r - 16,
      o = 500 * (t - r),
      s = 200 * (r - n);
    return [i, o, s];
  };
  P.lab.xyz = function (e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      i,
      o,
      s;
    (o = (t + 16) / 116), (i = r / 500 + o), (s = o - n / 200);
    let a = o ** 3,
      u = i ** 3,
      c = s ** 3;
    return (
      (o = a > 0.008856 ? a : (o - 16 / 116) / 7.787),
      (i = u > 0.008856 ? u : (i - 16 / 116) / 7.787),
      (s = c > 0.008856 ? c : (s - 16 / 116) / 7.787),
      (i *= 95.047),
      (o *= 100),
      (s *= 108.883),
      [i, o, s]
    );
  };
  P.lab.lch = function (e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      i;
    (i = (Math.atan2(n, r) * 360) / 2 / Math.PI), i < 0 && (i += 360);
    let s = Math.sqrt(r * r + n * n);
    return [t, s, i];
  };
  P.lch.lab = function (e) {
    let t = e[0],
      r = e[1],
      i = (e[2] / 360) * 2 * Math.PI,
      o = r * Math.cos(i),
      s = r * Math.sin(i);
    return [t, o, s];
  };
  P.rgb.ansi16 = function (e, t = null) {
    let [r, n, i] = e,
      o = t === null ? P.rgb.hsv(e)[2] : t;
    if (((o = Math.round(o / 50)), o === 0)) return 30;
    let s =
      30 +
      ((Math.round(i / 255) << 2) |
        (Math.round(n / 255) << 1) |
        Math.round(r / 255));
    return o === 2 && (s += 60), s;
  };
  P.hsv.ansi16 = function (e) {
    return P.rgb.ansi16(P.hsv.rgb(e), e[2]);
  };
  P.rgb.ansi256 = function (e) {
    let t = e[0],
      r = e[1],
      n = e[2];
    return t === r && r === n
      ? t < 8
        ? 16
        : t > 248
        ? 231
        : Math.round(((t - 8) / 247) * 24) + 232
      : 16 +
          36 * Math.round((t / 255) * 5) +
          6 * Math.round((r / 255) * 5) +
          Math.round((n / 255) * 5);
  };
  P.ansi16.rgb = function (e) {
    let t = e % 10;
    if (t === 0 || t === 7)
      return e > 50 && (t += 3.5), (t = (t / 10.5) * 255), [t, t, t];
    let r = (~~(e > 50) + 1) * 0.5,
      n = (t & 1) * r * 255,
      i = ((t >> 1) & 1) * r * 255,
      o = ((t >> 2) & 1) * r * 255;
    return [n, i, o];
  };
  P.ansi256.rgb = function (e) {
    if (e >= 232) {
      let o = (e - 232) * 10 + 8;
      return [o, o, o];
    }
    e -= 16;
    let t,
      r = (Math.floor(e / 36) / 5) * 255,
      n = (Math.floor((t = e % 36) / 6) / 5) * 255,
      i = ((t % 6) / 5) * 255;
    return [r, n, i];
  };
  P.rgb.hex = function (e) {
    let r = (
      ((Math.round(e[0]) & 255) << 16) +
      ((Math.round(e[1]) & 255) << 8) +
      (Math.round(e[2]) & 255)
    )
      .toString(16)
      .toUpperCase();
    return '000000'.substring(r.length) + r;
  };
  P.hex.rgb = function (e) {
    let t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!t) return [0, 0, 0];
    let r = t[0];
    t[0].length === 3 &&
      (r = r
        .split('')
        .map((a) => a + a)
        .join(''));
    let n = parseInt(r, 16),
      i = (n >> 16) & 255,
      o = (n >> 8) & 255,
      s = n & 255;
    return [i, o, s];
  };
  P.rgb.hcg = function (e) {
    let t = e[0] / 255,
      r = e[1] / 255,
      n = e[2] / 255,
      i = Math.max(Math.max(t, r), n),
      o = Math.min(Math.min(t, r), n),
      s = i - o,
      a,
      u;
    return (
      s < 1 ? (a = o / (1 - s)) : (a = 0),
      s <= 0
        ? (u = 0)
        : i === t
        ? (u = ((r - n) / s) % 6)
        : i === r
        ? (u = 2 + (n - t) / s)
        : (u = 4 + (t - r) / s),
      (u /= 6),
      (u %= 1),
      [u * 360, s * 100, a * 100]
    );
  };
  P.hsl.hcg = function (e) {
    let t = e[1] / 100,
      r = e[2] / 100,
      n = r < 0.5 ? 2 * t * r : 2 * t * (1 - r),
      i = 0;
    return n < 1 && (i = (r - 0.5 * n) / (1 - n)), [e[0], n * 100, i * 100];
  };
  P.hsv.hcg = function (e) {
    let t = e[1] / 100,
      r = e[2] / 100,
      n = t * r,
      i = 0;
    return n < 1 && (i = (r - n) / (1 - n)), [e[0], n * 100, i * 100];
  };
  P.hcg.rgb = function (e) {
    let t = e[0] / 360,
      r = e[1] / 100,
      n = e[2] / 100;
    if (r === 0) return [n * 255, n * 255, n * 255];
    let i = [0, 0, 0],
      o = (t % 1) * 6,
      s = o % 1,
      a = 1 - s,
      u = 0;
    switch (Math.floor(o)) {
      case 0:
        (i[0] = 1), (i[1] = s), (i[2] = 0);
        break;
      case 1:
        (i[0] = a), (i[1] = 1), (i[2] = 0);
        break;
      case 2:
        (i[0] = 0), (i[1] = 1), (i[2] = s);
        break;
      case 3:
        (i[0] = 0), (i[1] = a), (i[2] = 1);
        break;
      case 4:
        (i[0] = s), (i[1] = 0), (i[2] = 1);
        break;
      default:
        (i[0] = 1), (i[1] = 0), (i[2] = a);
    }
    return (
      (u = (1 - r) * n),
      [(r * i[0] + u) * 255, (r * i[1] + u) * 255, (r * i[2] + u) * 255]
    );
  };
  P.hcg.hsv = function (e) {
    let t = e[1] / 100,
      r = e[2] / 100,
      n = t + r * (1 - t),
      i = 0;
    return n > 0 && (i = t / n), [e[0], i * 100, n * 100];
  };
  P.hcg.hsl = function (e) {
    let t = e[1] / 100,
      n = (e[2] / 100) * (1 - t) + 0.5 * t,
      i = 0;
    return (
      n > 0 && n < 0.5
        ? (i = t / (2 * n))
        : n >= 0.5 && n < 1 && (i = t / (2 * (1 - n))),
      [e[0], i * 100, n * 100]
    );
  };
  P.hcg.hwb = function (e) {
    let t = e[1] / 100,
      r = e[2] / 100,
      n = t + r * (1 - t);
    return [e[0], (n - t) * 100, (1 - n) * 100];
  };
  P.hwb.hcg = function (e) {
    let t = e[1] / 100,
      n = 1 - e[2] / 100,
      i = n - t,
      o = 0;
    return i < 1 && (o = (n - i) / (1 - i)), [e[0], i * 100, o * 100];
  };
  P.apple.rgb = function (e) {
    return [(e[0] / 65535) * 255, (e[1] / 65535) * 255, (e[2] / 65535) * 255];
  };
  P.rgb.apple = function (e) {
    return [(e[0] / 255) * 65535, (e[1] / 255) * 65535, (e[2] / 255) * 65535];
  };
  P.gray.rgb = function (e) {
    return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255];
  };
  P.gray.hsl = function (e) {
    return [0, 0, e[0]];
  };
  P.gray.hsv = P.gray.hsl;
  P.gray.hwb = function (e) {
    return [0, 100, e[0]];
  };
  P.gray.cmyk = function (e) {
    return [0, 0, 0, e[0]];
  };
  P.gray.lab = function (e) {
    return [e[0], 0, 0];
  };
  P.gray.hex = function (e) {
    let t = Math.round((e[0] / 100) * 255) & 255,
      n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
    return '000000'.substring(n.length) + n;
  };
  P.rgb.gray = function (e) {
    return [((e[0] + e[1] + e[2]) / 3 / 255) * 100];
  };
});
var Zo = I((Wg, Xo) => {
  var zr = gi();
  function Sc() {
    let e = {},
      t = Object.keys(zr);
    for (let r = t.length, n = 0; n < r; n++)
      e[t[n]] = { distance: -1, parent: null };
    return e;
  }
  l(Sc, 'buildGraph');
  function Cc(e) {
    let t = Sc(),
      r = [e];
    for (t[e].distance = 0; r.length; ) {
      let n = r.pop(),
        i = Object.keys(zr[n]);
      for (let o = i.length, s = 0; s < o; s++) {
        let a = i[s],
          u = t[a];
        u.distance === -1 &&
          ((u.distance = t[n].distance + 1), (u.parent = n), r.unshift(a));
      }
    }
    return t;
  }
  l(Cc, 'deriveBFS');
  function Oc(e, t) {
    return function (r) {
      return t(e(r));
    };
  }
  l(Oc, 'link');
  function Mc(e, t) {
    let r = [t[e].parent, e],
      n = zr[t[e].parent][e],
      i = t[e].parent;
    for (; t[i].parent; )
      r.unshift(t[i].parent),
        (n = Oc(zr[t[i].parent][i], n)),
        (i = t[i].parent);
    return (n.conversion = r), n;
  }
  l(Mc, 'wrapConversion');
  Xo.exports = function (e) {
    let t = Cc(e),
      r = {},
      n = Object.keys(t);
    for (let i = n.length, o = 0; o < i; o++) {
      let s = n[o];
      t[s].parent !== null && (r[s] = Mc(s, t));
    }
    return r;
  };
});
var ts = I((Yg, es) => {
  var hi = gi(),
    Nc = Zo(),
    bt = {},
    Rc = Object.keys(hi);
  function Ic(e) {
    let t = l(function (...r) {
      let n = r[0];
      return n == null ? n : (n.length > 1 && (r = n), e(r));
    }, 'wrappedFn');
    return 'conversion' in e && (t.conversion = e.conversion), t;
  }
  l(Ic, 'wrapRaw');
  function Dc(e) {
    let t = l(function (...r) {
      let n = r[0];
      if (n == null) return n;
      n.length > 1 && (r = n);
      let i = e(r);
      if (typeof i == 'object')
        for (let o = i.length, s = 0; s < o; s++) i[s] = Math.round(i[s]);
      return i;
    }, 'wrappedFn');
    return 'conversion' in e && (t.conversion = e.conversion), t;
  }
  l(Dc, 'wrapRounded');
  Rc.forEach((e) => {
    (bt[e] = {}),
      Object.defineProperty(bt[e], 'channels', { value: hi[e].channels }),
      Object.defineProperty(bt[e], 'labels', { value: hi[e].labels });
    let t = Nc(e);
    Object.keys(t).forEach((n) => {
      let i = t[n];
      (bt[e][n] = Dc(i)), (bt[e][n].raw = Ic(i));
    });
  });
  es.exports = bt;
});
var as = I((Xg, ss) => {
  'use strict';
  var rs = l(
      (e, t) =>
        (...r) =>
          `\x1B[${e(...r) + t}m`,
      'wrapAnsi16',
    ),
    ns = l(
      (e, t) =>
        (...r) => {
          let n = e(...r);
          return `\x1B[${38 + t};5;${n}m`;
        },
      'wrapAnsi256',
    ),
    is = l(
      (e, t) =>
        (...r) => {
          let n = e(...r);
          return `\x1B[${38 + t};2;${n[0]};${n[1]};${n[2]}m`;
        },
      'wrapAnsi16m',
    ),
    Xr = l((e) => e, 'ansi2ansi'),
    os = l((e, t, r) => [e, t, r], 'rgb2rgb'),
    Et = l((e, t, r) => {
      Object.defineProperty(e, t, {
        get: () => {
          let n = r();
          return (
            Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
            }),
            n
          );
        },
        enumerable: !0,
        configurable: !0,
      });
    }, 'setLazyProperty'),
    yi,
    wt = l((e, t, r, n) => {
      yi === void 0 && (yi = ts());
      let i = n ? 10 : 0,
        o = {};
      for (let [s, a] of Object.entries(yi)) {
        let u = s === 'ansi16' ? 'ansi' : s;
        s === t
          ? (o[u] = e(r, i))
          : typeof a == 'object' && (o[u] = e(a[t], i));
      }
      return o;
    }, 'makeDynamicStyles');
  function Fc() {
    let e = new Map(),
      t = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29],
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39],
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49],
        },
      };
    (t.color.gray = t.color.blackBright),
      (t.bgColor.bgGray = t.bgColor.bgBlackBright),
      (t.color.grey = t.color.blackBright),
      (t.bgColor.bgGrey = t.bgColor.bgBlackBright);
    for (let [r, n] of Object.entries(t)) {
      for (let [i, o] of Object.entries(n))
        (t[i] = { open: `\x1B[${o[0]}m`, close: `\x1B[${o[1]}m` }),
          (n[i] = t[i]),
          e.set(o[0], o[1]);
      Object.defineProperty(t, r, { value: n, enumerable: !1 });
    }
    return (
      Object.defineProperty(t, 'codes', { value: e, enumerable: !1 }),
      (t.color.close = '\x1B[39m'),
      (t.bgColor.close = '\x1B[49m'),
      Et(t.color, 'ansi', () => wt(rs, 'ansi16', Xr, !1)),
      Et(t.color, 'ansi256', () => wt(ns, 'ansi256', Xr, !1)),
      Et(t.color, 'ansi16m', () => wt(is, 'rgb', os, !1)),
      Et(t.bgColor, 'ansi', () => wt(rs, 'ansi16', Xr, !0)),
      Et(t.bgColor, 'ansi256', () => wt(ns, 'ansi256', Xr, !0)),
      Et(t.bgColor, 'ansi16m', () => wt(is, 'rgb', os, !0)),
      t
    );
  }
  l(Fc, 'assembleStyles');
  Object.defineProperty(ss, 'exports', { enumerable: !0, get: Fc });
});
var bi = I((eh, ls) => {
  'use strict';
  ls.exports = (e, t = process.argv) => {
    let r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--',
      n = t.indexOf(r + e),
      i = t.indexOf('--');
    return n !== -1 && (i === -1 || n < i);
  };
});
var Zr = I((th, cs) => {
  'use strict';
  var kc = require('os'),
    us = require('tty'),
    be = bi(),
    { env: Q } = process,
    Ge;
  be('no-color') || be('no-colors') || be('color=false') || be('color=never')
    ? (Ge = 0)
    : (be('color') || be('colors') || be('color=true') || be('color=always')) &&
      (Ge = 1);
  'FORCE_COLOR' in Q &&
    (Q.FORCE_COLOR === 'true'
      ? (Ge = 1)
      : Q.FORCE_COLOR === 'false'
      ? (Ge = 0)
      : (Ge =
          Q.FORCE_COLOR.length === 0
            ? 1
            : Math.min(parseInt(Q.FORCE_COLOR, 10), 3)));
  function Ei(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  l(Ei, 'translateLevel');
  function wi(e, t) {
    if (Ge === 0) return 0;
    if (be('color=16m') || be('color=full') || be('color=truecolor')) return 3;
    if (be('color=256')) return 2;
    if (e && !t && Ge === void 0) return 0;
    let r = Ge || 0;
    if (Q.TERM === 'dumb') return r;
    if (process.platform === 'win32') {
      let n = kc.release().split('.');
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586
        ? Number(n[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ('CI' in Q)
      return [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some((n) => n in Q) || Q.CI_NAME === 'codeship'
        ? 1
        : r;
    if ('TEAMCITY_VERSION' in Q)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Q.TEAMCITY_VERSION) ? 1 : 0;
    if (Q.COLORTERM === 'truecolor') return 3;
    if ('TERM_PROGRAM' in Q) {
      let n = parseInt((Q.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (Q.TERM_PROGRAM) {
        case 'iTerm.app':
          return n >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    return /-256(color)?$/i.test(Q.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          Q.TERM,
        ) || 'COLORTERM' in Q
      ? 1
      : r;
  }
  l(wi, 'supportsColor');
  function Lc(e) {
    let t = wi(e, e && e.isTTY);
    return Ei(t);
  }
  l(Lc, 'getSupportLevel');
  cs.exports = {
    supportsColor: Lc,
    stdout: Ei(wi(!0, us.isatty(1))),
    stderr: Ei(wi(!0, us.isatty(2))),
  };
});
var fs = I((nh, ps) => {
  'use strict';
  var $c = l((e, t, r) => {
      let n = e.indexOf(t);
      if (n === -1) return e;
      let i = t.length,
        o = 0,
        s = '';
      do (s += e.substr(o, n - o) + t + r), (o = n + i), (n = e.indexOf(t, o));
      while (n !== -1);
      return (s += e.substr(o)), s;
    }, 'stringReplaceAll'),
    jc = l((e, t, r, n) => {
      let i = 0,
        o = '';
      do {
        let s = e[n - 1] === '\r';
        (o +=
          e.substr(i, (s ? n - 1 : n) - i) +
          t +
          (s
            ? `\r
`
            : `
`) +
          r),
          (i = n + 1),
          (n = e.indexOf(
            `
`,
            i,
          ));
      } while (n !== -1);
      return (o += e.substr(i)), o;
    }, 'stringEncaseCRLFWithFirstIndex');
  ps.exports = { stringReplaceAll: $c, stringEncaseCRLFWithFirstIndex: jc };
});
var ys = I((oh, hs) => {
  'use strict';
  var Bc =
      /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
    ds = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
    qc = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
    Uc = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
    Gc = new Map([
      [
        'n',
        `
`,
      ],
      ['r', '\r'],
      ['t', '	'],
      ['b', '\b'],
      ['f', '\f'],
      ['v', '\v'],
      ['0', '\0'],
      ['\\', '\\'],
      ['e', '\x1B'],
      ['a', '\x07'],
    ]);
  function gs(e) {
    let t = e[0] === 'u',
      r = e[1] === '{';
    return (t && !r && e.length === 5) || (e[0] === 'x' && e.length === 3)
      ? String.fromCharCode(parseInt(e.slice(1), 16))
      : t && r
      ? String.fromCodePoint(parseInt(e.slice(2, -1), 16))
      : Gc.get(e) || e;
  }
  l(gs, 'unescape');
  function Vc(e, t) {
    let r = [],
      n = t.trim().split(/\s*,\s*/g),
      i;
    for (let o of n) {
      let s = Number(o);
      if (!Number.isNaN(s)) r.push(s);
      else if ((i = o.match(qc)))
        r.push(i[2].replace(Uc, (a, u, c) => (u ? gs(u) : c)));
      else
        throw new Error(
          `Invalid Chalk template style argument: ${o} (in style '${e}')`,
        );
    }
    return r;
  }
  l(Vc, 'parseArguments');
  function Kc(e) {
    ds.lastIndex = 0;
    let t = [],
      r;
    for (; (r = ds.exec(e)) !== null; ) {
      let n = r[1];
      if (r[2]) {
        let i = Vc(n, r[2]);
        t.push([n].concat(i));
      } else t.push([n]);
    }
    return t;
  }
  l(Kc, 'parseStyle');
  function ms(e, t) {
    let r = {};
    for (let i of t)
      for (let o of i.styles) r[o[0]] = i.inverse ? null : o.slice(1);
    let n = e;
    for (let [i, o] of Object.entries(r))
      if (!!Array.isArray(o)) {
        if (!(i in n)) throw new Error(`Unknown Chalk style: ${i}`);
        n = o.length > 0 ? n[i](...o) : n[i];
      }
    return n;
  }
  l(ms, 'buildStyle');
  hs.exports = (e, t) => {
    let r = [],
      n = [],
      i = [];
    if (
      (t.replace(Bc, (o, s, a, u, c, p) => {
        if (s) i.push(gs(s));
        else if (u) {
          let f = i.join('');
          (i = []),
            n.push(r.length === 0 ? f : ms(e, r)(f)),
            r.push({ inverse: a, styles: Kc(u) });
        } else if (c) {
          if (r.length === 0)
            throw new Error('Found extraneous } in Chalk template literal');
          n.push(ms(e, r)(i.join(''))), (i = []), r.pop();
        } else i.push(p);
      }),
      n.push(i.join('')),
      r.length > 0)
    ) {
      let o = `Chalk template literal is missing ${r.length} closing bracket${
        r.length === 1 ? '' : 's'
      } (\`}\`)`;
      throw new Error(o);
    }
    return n.join('');
  };
});
var ue = I((ah, Ts) => {
  'use strict';
  var Xt = as(),
    { stdout: vi, stderr: Ti } = Zr(),
    { stringReplaceAll: Qc, stringEncaseCRLFWithFirstIndex: Hc } = fs(),
    { isArray: tn } = Array,
    Es = ['ansi', 'ansi', 'ansi256', 'ansi16m'],
    xt = Object.create(null),
    Wc = l((e, t = {}) => {
      if (
        t.level &&
        !(Number.isInteger(t.level) && t.level >= 0 && t.level <= 3)
      )
        throw new Error('The `level` option should be an integer from 0 to 3');
      let r = vi ? vi.level : 0;
      e.level = t.level === void 0 ? r : t.level;
    }, 'applyOptions'),
    en = class {
      constructor(t) {
        return ws(t);
      }
    };
  l(en, 'ChalkClass');
  var ws = l((e) => {
    let t = {};
    return (
      Wc(t, e),
      (t.template = (...r) => vs(t.template, ...r)),
      Object.setPrototypeOf(t, rn.prototype),
      Object.setPrototypeOf(t.template, t),
      (t.template.constructor = () => {
        throw new Error(
          '`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.',
        );
      }),
      (t.template.Instance = en),
      t.template
    );
  }, 'chalkFactory');
  function rn(e) {
    return ws(e);
  }
  l(rn, 'Chalk');
  for (let [e, t] of Object.entries(Xt))
    xt[e] = {
      get() {
        let r = nn(this, _i(t.open, t.close, this._styler), this._isEmpty);
        return Object.defineProperty(this, e, { value: r }), r;
      },
    };
  xt.visible = {
    get() {
      let e = nn(this, this._styler, !0);
      return Object.defineProperty(this, 'visible', { value: e }), e;
    },
  };
  var xs = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];
  for (let e of xs)
    xt[e] = {
      get() {
        let { level: t } = this;
        return function (...r) {
          let n = _i(Xt.color[Es[t]][e](...r), Xt.color.close, this._styler);
          return nn(this, n, this._isEmpty);
        };
      },
    };
  for (let e of xs) {
    let t = 'bg' + e[0].toUpperCase() + e.slice(1);
    xt[t] = {
      get() {
        let { level: r } = this;
        return function (...n) {
          let i = _i(
            Xt.bgColor[Es[r]][e](...n),
            Xt.bgColor.close,
            this._styler,
          );
          return nn(this, i, this._isEmpty);
        };
      },
    };
  }
  var Jc = Object.defineProperties(() => {}, {
      ...xt,
      level: {
        enumerable: !0,
        get() {
          return this._generator.level;
        },
        set(e) {
          this._generator.level = e;
        },
      },
    }),
    _i = l((e, t, r) => {
      let n, i;
      return (
        r === void 0
          ? ((n = e), (i = t))
          : ((n = r.openAll + e), (i = t + r.closeAll)),
        { open: e, close: t, openAll: n, closeAll: i, parent: r }
      );
    }, 'createStyler'),
    nn = l((e, t, r) => {
      let n = l(
        (...i) =>
          tn(i[0]) && tn(i[0].raw)
            ? bs(n, vs(n, ...i))
            : bs(n, i.length === 1 ? '' + i[0] : i.join(' ')),
        'builder',
      );
      return (
        Object.setPrototypeOf(n, Jc),
        (n._generator = e),
        (n._styler = t),
        (n._isEmpty = r),
        n
      );
    }, 'createBuilder'),
    bs = l((e, t) => {
      if (e.level <= 0 || !t) return e._isEmpty ? '' : t;
      let r = e._styler;
      if (r === void 0) return t;
      let { openAll: n, closeAll: i } = r;
      if (t.indexOf('\x1B') !== -1)
        for (; r !== void 0; ) (t = Qc(t, r.close, r.open)), (r = r.parent);
      let o = t.indexOf(`
`);
      return o !== -1 && (t = Hc(t, i, n, o)), n + t + i;
    }, 'applyStyle'),
    xi,
    vs = l((e, ...t) => {
      let [r] = t;
      if (!tn(r) || !tn(r.raw)) return t.join(' ');
      let n = t.slice(1),
        i = [r.raw[0]];
      for (let o = 1; o < r.length; o++)
        i.push(String(n[o - 1]).replace(/[{}\\]/g, '\\$&'), String(r.raw[o]));
      return xi === void 0 && (xi = ys()), xi(e, i.join(''));
    }, 'chalkTag');
  Object.defineProperties(rn.prototype, xt);
  var on = rn();
  on.supportsColor = vi;
  on.stderr = rn({ level: Ti ? Ti.level : 0 });
  on.stderr.supportsColor = Ti;
  Ts.exports = on;
});
var er = I((ph, $s) => {
  'use strict';
  $s.exports = (e, t = 1, r) => {
    if (
      ((r = { indent: ' ', includeEmptyLines: !1, ...r }), typeof e != 'string')
    )
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
      );
    if (typeof t != 'number')
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
      );
    if (typeof r.indent != 'string')
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``,
      );
    if (t === 0) return e;
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return e.replace(n, r.indent.repeat(t));
  };
});
var Ni = I((fh, js) => {
  'use strict';
  js.exports = (function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1;
    }
    return (
      l(e, '_min'),
      function (t, r) {
        if (t === r) return 0;
        if (t.length > r.length) {
          var n = t;
          (t = r), (r = n);
        }
        for (
          var i = t.length, o = r.length;
          i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

        )
          i--, o--;
        for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
        if (((i -= s), (o -= s), i === 0 || o < 3)) return o;
        var a = 0,
          u,
          c,
          p,
          f,
          d,
          m,
          h,
          g,
          w,
          y,
          x,
          b,
          E = [];
        for (u = 0; u < i; u++) E.push(u + 1), E.push(t.charCodeAt(s + u));
        for (var T = E.length - 1; a < o - 3; )
          for (
            w = r.charCodeAt(s + (c = a)),
              y = r.charCodeAt(s + (p = a + 1)),
              x = r.charCodeAt(s + (f = a + 2)),
              b = r.charCodeAt(s + (d = a + 3)),
              m = a += 4,
              u = 0;
            u < T;
            u += 2
          )
            (h = E[u]),
              (g = E[u + 1]),
              (c = e(h, c, p, w, g)),
              (p = e(c, p, f, y, g)),
              (f = e(p, f, d, x, g)),
              (m = e(f, d, m, b, g)),
              (E[u] = m),
              (d = f),
              (f = p),
              (p = c),
              (c = h);
        for (; a < o; )
          for (w = r.charCodeAt(s + (c = a)), m = ++a, u = 0; u < T; u += 2)
            (h = E[u]), (E[u] = m = e(h, c, m, w, E[u + 1])), (c = h);
        return m;
      }
    );
  })();
});
var Qs = I((Rh, Ks) => {
  var Ot = 1e3,
    Mt = Ot * 60,
    Nt = Mt * 60,
    ut = Nt * 24,
    Jp = ut * 7,
    Yp = ut * 365.25;
  Ks.exports = function (e, t) {
    t = t || {};
    var r = typeof e;
    if (r === 'string' && e.length > 0) return zp(e);
    if (r === 'number' && isFinite(e)) return t.long ? Zp(e) : Xp(e);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(e),
    );
  };
  function zp(e) {
    if (((e = String(e)), !(e.length > 100))) {
      var t =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          e,
        );
      if (!!t) {
        var r = parseFloat(t[1]),
          n = (t[2] || 'ms').toLowerCase();
        switch (n) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return r * Yp;
          case 'weeks':
          case 'week':
          case 'w':
            return r * Jp;
          case 'days':
          case 'day':
          case 'd':
            return r * ut;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return r * Nt;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return r * Mt;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return r * Ot;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return r;
          default:
            return;
        }
      }
    }
  }
  l(zp, 'parse');
  function Xp(e) {
    var t = Math.abs(e);
    return t >= ut
      ? Math.round(e / ut) + 'd'
      : t >= Nt
      ? Math.round(e / Nt) + 'h'
      : t >= Mt
      ? Math.round(e / Mt) + 'm'
      : t >= Ot
      ? Math.round(e / Ot) + 's'
      : e + 'ms';
  }
  l(Xp, 'fmtShort');
  function Zp(e) {
    var t = Math.abs(e);
    return t >= ut
      ? bn(e, t, ut, 'day')
      : t >= Nt
      ? bn(e, t, Nt, 'hour')
      : t >= Mt
      ? bn(e, t, Mt, 'minute')
      : t >= Ot
      ? bn(e, t, Ot, 'second')
      : e + ' ms';
  }
  l(Zp, 'fmtLong');
  function bn(e, t, r, n) {
    var i = t >= r * 1.5;
    return Math.round(e / r) + ' ' + n + (i ? 's' : '');
  }
  l(bn, 'plural');
});
var Fi = I((Dh, Hs) => {
  function ef(e) {
    (r.debug = r),
      (r.default = r),
      (r.coerce = u),
      (r.disable = o),
      (r.enable = i),
      (r.enabled = s),
      (r.humanize = Qs()),
      (r.destroy = c),
      Object.keys(e).forEach((p) => {
        r[p] = e[p];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {});
    function t(p) {
      let f = 0;
      for (let d = 0; d < p.length; d++)
        (f = (f << 5) - f + p.charCodeAt(d)), (f |= 0);
      return r.colors[Math.abs(f) % r.colors.length];
    }
    l(t, 'selectColor'), (r.selectColor = t);
    function r(p) {
      let f,
        d = null,
        m,
        h;
      function g(...w) {
        if (!g.enabled) return;
        let y = g,
          x = Number(new Date()),
          b = x - (f || x);
        (y.diff = b),
          (y.prev = f),
          (y.curr = x),
          (f = x),
          (w[0] = r.coerce(w[0])),
          typeof w[0] != 'string' && w.unshift('%O');
        let E = 0;
        (w[0] = w[0].replace(/%([a-zA-Z%])/g, (C, A) => {
          if (C === '%%') return '%';
          E++;
          let F = r.formatters[A];
          if (typeof F == 'function') {
            let B = w[E];
            (C = F.call(y, B)), w.splice(E, 1), E--;
          }
          return C;
        })),
          r.formatArgs.call(y, w),
          (y.log || r.log).apply(y, w);
      }
      return (
        l(g, 'debug'),
        (g.namespace = p),
        (g.useColors = r.useColors()),
        (g.color = r.selectColor(p)),
        (g.extend = n),
        (g.destroy = r.destroy),
        Object.defineProperty(g, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () =>
            d !== null
              ? d
              : (m !== r.namespaces && ((m = r.namespaces), (h = r.enabled(p))),
                h),
          set: (w) => {
            d = w;
          },
        }),
        typeof r.init == 'function' && r.init(g),
        g
      );
    }
    l(r, 'createDebug');
    function n(p, f) {
      let d = r(this.namespace + (typeof f > 'u' ? ':' : f) + p);
      return (d.log = this.log), d;
    }
    l(n, 'extend');
    function i(p) {
      r.save(p), (r.namespaces = p), (r.names = []), (r.skips = []);
      let f,
        d = (typeof p == 'string' ? p : '').split(/[\s,]+/),
        m = d.length;
      for (f = 0; f < m; f++)
        !d[f] ||
          ((p = d[f].replace(/\*/g, '.*?')),
          p[0] === '-'
            ? r.skips.push(new RegExp('^' + p.slice(1) + '$'))
            : r.names.push(new RegExp('^' + p + '$')));
    }
    l(i, 'enable');
    function o() {
      let p = [...r.names.map(a), ...r.skips.map(a).map((f) => '-' + f)].join(
        ',',
      );
      return r.enable(''), p;
    }
    l(o, 'disable');
    function s(p) {
      if (p[p.length - 1] === '*') return !0;
      let f, d;
      for (f = 0, d = r.skips.length; f < d; f++)
        if (r.skips[f].test(p)) return !1;
      for (f = 0, d = r.names.length; f < d; f++)
        if (r.names[f].test(p)) return !0;
      return !1;
    }
    l(s, 'enabled');
    function a(p) {
      return p
        .toString()
        .substring(2, p.toString().length - 2)
        .replace(/\.\*\?$/, '*');
    }
    l(a, 'toNamespace');
    function u(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    l(u, 'coerce');
    function c() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
      );
    }
    return l(c, 'destroy'), r.enable(r.load()), r;
  }
  l(ef, 'setup');
  Hs.exports = ef;
});
var Ws = I((ge, En) => {
  ge.formatArgs = rf;
  ge.save = nf;
  ge.load = of;
  ge.useColors = tf;
  ge.storage = sf();
  ge.destroy = (() => {
    let e = !1;
    return () => {
      e ||
        ((e = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
        ));
    };
  })();
  ge.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ];
  function tf() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  l(tf, 'useColors');
  function rf(e) {
    if (
      ((e[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        e[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        En.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let t = 'color: ' + this.color;
    e.splice(1, 0, t, 'color: inherit');
    let r = 0,
      n = 0;
    e[0].replace(/%[a-zA-Z%]/g, (i) => {
      i !== '%%' && (r++, i === '%c' && (n = r));
    }),
      e.splice(n, 0, t);
  }
  l(rf, 'formatArgs');
  ge.log = console.debug || console.log || (() => {});
  function nf(e) {
    try {
      e ? ge.storage.setItem('debug', e) : ge.storage.removeItem('debug');
    } catch {}
  }
  l(nf, 'save');
  function of() {
    let e;
    try {
      e = ge.storage.getItem('debug');
    } catch {}
    return (
      !e && typeof process < 'u' && 'env' in process && (e = process.env.DEBUG),
      e
    );
  }
  l(of, 'load');
  function sf() {
    try {
      return localStorage;
    } catch {}
  }
  l(sf, 'localstorage');
  En.exports = Fi()(ge);
  var { formatters: af } = En.exports;
  af.j = function (e) {
    try {
      return JSON.stringify(e);
    } catch (t) {
      return '[UnexpectedJSONParseError]: ' + t.message;
    }
  };
});
var Ys = I((W, xn) => {
  var lf = require('tty'),
    wn = require('util');
  W.init = gf;
  W.log = ff;
  W.formatArgs = cf;
  W.save = df;
  W.load = mf;
  W.useColors = uf;
  W.destroy = wn.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  W.colors = [6, 2, 3, 4, 5, 1];
  try {
    let e = Zr();
    e &&
      (e.stderr || e).level >= 2 &&
      (W.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]);
  } catch {}
  W.inspectOpts = Object.keys(process.env)
    .filter((e) => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
        n = process.env[t];
      return (
        /^(yes|on|true|enabled)$/i.test(n)
          ? (n = !0)
          : /^(no|off|false|disabled)$/i.test(n)
          ? (n = !1)
          : n === 'null'
          ? (n = null)
          : (n = Number(n)),
        (e[r] = n),
        e
      );
    }, {});
  function uf() {
    return 'colors' in W.inspectOpts
      ? Boolean(W.inspectOpts.colors)
      : lf.isatty(process.stderr.fd);
  }
  l(uf, 'useColors');
  function cf(e) {
    let { namespace: t, useColors: r } = this;
    if (r) {
      let n = this.color,
        i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
        o = `  ${i};1m${t} \x1B[0m`;
      (e[0] =
        o +
        e[0]
          .split(
            `
`,
          )
          .join(
            `
` + o,
          )),
        e.push(i + 'm+' + xn.exports.humanize(this.diff) + '\x1B[0m');
    } else e[0] = pf() + t + ' ' + e[0];
  }
  l(cf, 'formatArgs');
  function pf() {
    return W.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
  }
  l(pf, 'getDate');
  function ff(...e) {
    return process.stderr.write(
      wn.format(...e) +
        `
`,
    );
  }
  l(ff, 'log');
  function df(e) {
    e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
  }
  l(df, 'save');
  function mf() {
    return process.env.DEBUG;
  }
  l(mf, 'load');
  function gf(e) {
    e.inspectOpts = {};
    let t = Object.keys(W.inspectOpts);
    for (let r = 0; r < t.length; r++)
      e.inspectOpts[t[r]] = W.inspectOpts[t[r]];
  }
  l(gf, 'init');
  xn.exports = Fi()(W);
  var { formatters: Js } = xn.exports;
  Js.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      wn
        .inspect(e, this.inspectOpts)
        .split(
          `
`,
        )
        .map((t) => t.trim())
        .join(' ')
    );
  };
  Js.O = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      wn.inspect(e, this.inspectOpts)
    );
  };
});
var zs = I(($h, ki) => {
  typeof process > 'u' ||
  process.type === 'renderer' ||
  process.browser === !0 ||
  process.__nwjs
    ? (ki.exports = Ws())
    : (ki.exports = Ys());
});
var la = I((Py, Nf) => {
  Nf.exports = {
    name: '@prisma/engines-version',
    version: '4.10.1-2.aead147aa326ccb985dcfed5b065b4fdabd44b19',
    main: 'index.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    author: 'Tim Suchanek <suchanek@prisma.io>',
    prisma: { enginesVersion: 'aead147aa326ccb985dcfed5b065b4fdabd44b19' },
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/engines-wrapper.git',
      directory: 'packages/engines-version',
    },
    devDependencies: { '@types/node': '16.11.64', typescript: '4.8.4' },
    files: ['index.js', 'index.d.ts'],
    scripts: { build: 'tsc -d' },
  };
});
var Bi = I((Pn) => {
  'use strict';
  Object.defineProperty(Pn, '__esModule', { value: !0 });
  Pn.enginesVersion = void 0;
  Pn.enginesVersion = la().prisma.enginesVersion;
});
var fa = I((jy, Ui) => {
  'use strict';
  var D = Ui.exports;
  Ui.exports.default = D;
  var k = '\x1B[',
    gr = '\x1B]',
    It = '\x07',
    On = ';',
    pa = process.env.TERM_PROGRAM === 'Apple_Terminal';
  D.cursorTo = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required');
    return typeof t != 'number'
      ? k + (e + 1) + 'G'
      : k + (t + 1) + ';' + (e + 1) + 'H';
  };
  D.cursorMove = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required');
    let r = '';
    return (
      e < 0 ? (r += k + -e + 'D') : e > 0 && (r += k + e + 'C'),
      t < 0 ? (r += k + -t + 'A') : t > 0 && (r += k + t + 'B'),
      r
    );
  };
  D.cursorUp = (e = 1) => k + e + 'A';
  D.cursorDown = (e = 1) => k + e + 'B';
  D.cursorForward = (e = 1) => k + e + 'C';
  D.cursorBackward = (e = 1) => k + e + 'D';
  D.cursorLeft = k + 'G';
  D.cursorSavePosition = pa ? '\x1B7' : k + 's';
  D.cursorRestorePosition = pa ? '\x1B8' : k + 'u';
  D.cursorGetPosition = k + '6n';
  D.cursorNextLine = k + 'E';
  D.cursorPrevLine = k + 'F';
  D.cursorHide = k + '?25l';
  D.cursorShow = k + '?25h';
  D.eraseLines = (e) => {
    let t = '';
    for (let r = 0; r < e; r++)
      t += D.eraseLine + (r < e - 1 ? D.cursorUp() : '');
    return e && (t += D.cursorLeft), t;
  };
  D.eraseEndLine = k + 'K';
  D.eraseStartLine = k + '1K';
  D.eraseLine = k + '2K';
  D.eraseDown = k + 'J';
  D.eraseUp = k + '1J';
  D.eraseScreen = k + '2J';
  D.scrollUp = k + 'S';
  D.scrollDown = k + 'T';
  D.clearScreen = '\x1Bc';
  D.clearTerminal =
    process.platform === 'win32'
      ? `${D.eraseScreen}${k}0f`
      : `${D.eraseScreen}${k}3J${k}H`;
  D.beep = It;
  D.link = (e, t) => [gr, '8', On, On, t, It, e, gr, '8', On, On, It].join('');
  D.image = (e, t = {}) => {
    let r = `${gr}1337;File=inline=1`;
    return (
      t.width && (r += `;width=${t.width}`),
      t.height && (r += `;height=${t.height}`),
      t.preserveAspectRatio === !1 && (r += ';preserveAspectRatio=0'),
      r + ':' + e.toString('base64') + It
    );
  };
  D.iTerm = {
    setCwd: (e = process.cwd()) => `${gr}50;CurrentDir=${e}${It}`,
    annotation: (e, t = {}) => {
      let r = `${gr}1337;`,
        n = typeof t.x < 'u',
        i = typeof t.y < 'u';
      if ((n || i) && !(n && i && typeof t.length < 'u'))
        throw new Error(
          '`x`, `y` and `length` must be defined when `x` or `y` is defined',
        );
      return (
        (e = e.replace(/\|/g, '')),
        (r += t.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation='),
        t.length > 0
          ? (r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join('|'))
          : (r += e),
        r + It
      );
    },
  };
});
var ga = I((By, ma) => {
  'use strict';
  var Df = Zr(),
    Dt = bi();
  function da(e) {
    if (/^\d{3,4}$/.test(e)) {
      let r = /(\d{1,2})(\d{2})/.exec(e);
      return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) };
    }
    let t = (e || '').split('.').map((r) => parseInt(r, 10));
    return { major: t[0], minor: t[1], patch: t[2] };
  }
  l(da, 'parseVersion');
  function Gi(e) {
    let { env: t } = process;
    if ('FORCE_HYPERLINK' in t)
      return !(
        t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0
      );
    if (
      Dt('no-hyperlink') ||
      Dt('no-hyperlinks') ||
      Dt('hyperlink=false') ||
      Dt('hyperlink=never')
    )
      return !1;
    if (Dt('hyperlink=true') || Dt('hyperlink=always') || 'NETLIFY' in t)
      return !0;
    if (
      !Df.supportsColor(e) ||
      (e && !e.isTTY) ||
      process.platform === 'win32' ||
      'CI' in t ||
      'TEAMCITY_VERSION' in t
    )
      return !1;
    if ('TERM_PROGRAM' in t) {
      let r = da(t.TERM_PROGRAM_VERSION);
      switch (t.TERM_PROGRAM) {
        case 'iTerm.app':
          return r.major === 3 ? r.minor >= 1 : r.major > 3;
        case 'WezTerm':
          return r.major >= 20200620;
        case 'vscode':
          return r.major > 1 || (r.major === 1 && r.minor >= 72);
      }
    }
    if ('VTE_VERSION' in t) {
      if (t.VTE_VERSION === '0.50.0') return !1;
      let r = da(t.VTE_VERSION);
      return r.major > 0 || r.minor >= 50;
    }
    return !1;
  }
  l(Gi, 'supportsHyperlink');
  ma.exports = {
    supportsHyperlink: Gi,
    stdout: Gi(process.stdout),
    stderr: Gi(process.stderr),
  };
});
var ya = I((Uy, hr) => {
  'use strict';
  var Ff = fa(),
    Vi = ga(),
    ha = l(
      (e, t, { target: r = 'stdout', ...n } = {}) =>
        Vi[r]
          ? Ff.link(e, t)
          : n.fallback === !1
          ? e
          : typeof n.fallback == 'function'
          ? n.fallback(e, t)
          : `${e} (\u200B${t}\u200B)`,
      'terminalLink',
    );
  hr.exports = (e, t, r = {}) => ha(e, t, r);
  hr.exports.stderr = (e, t, r = {}) => ha(e, t, { target: 'stderr', ...r });
  hr.exports.isSupported = Vi.stdout;
  hr.exports.stderr.isSupported = Vi.stderr;
});
var Ra = I((P0, Na) => {
  'use strict';
  Na.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|');
    return new RegExp(t, e ? void 0 : 'g');
  };
});
var Er = I((S0, Ia) => {
  'use strict';
  var Yf = Ra();
  Ia.exports = (e) => (typeof e == 'string' ? e.replace(Yf(), '') : e);
});
var Da = I((C0, Rn) => {
  'use strict';
  Rn.exports = (e = {}) => {
    let t;
    if (e.repoUrl) t = e.repoUrl;
    else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`;
    else
      throw new Error(
        'You need to specify either the `repoUrl` option or both the `user` and `repo` options',
      );
    let r = new URL(`${t}/issues/new`),
      n = [
        'body',
        'title',
        'labels',
        'template',
        'milestone',
        'assignee',
        'projects',
      ];
    for (let i of n) {
      let o = e[i];
      if (o !== void 0) {
        if (i === 'labels' || i === 'projects') {
          if (!Array.isArray(o))
            throw new TypeError(`The \`${i}\` option should be an array`);
          o = o.join(',');
        }
        r.searchParams.set(i, o);
      }
    }
    return r.toString();
  };
  Rn.exports.default = Rn.exports;
});
var Pl = I((iw, Rd) => {
  Rd.exports = {
    name: 'dotenv',
    version: '16.0.3',
    description: 'Loads environment variables from .env file',
    main: 'lib/main.js',
    types: 'lib/main.d.ts',
    exports: {
      '.': {
        require: './lib/main.js',
        types: './lib/main.d.ts',
        default: './lib/main.js',
      },
      './config': './config.js',
      './config.js': './config.js',
      './lib/env-options': './lib/env-options.js',
      './lib/env-options.js': './lib/env-options.js',
      './lib/cli-options': './lib/cli-options.js',
      './lib/cli-options.js': './lib/cli-options.js',
      './package.json': './package.json',
    },
    scripts: {
      'dts-check': 'tsc --project tests/types/tsconfig.json',
      lint: 'standard',
      'lint-readme': 'standard-markdown',
      pretest: 'npm run lint && npm run dts-check',
      test: 'tap tests/*.js --100 -Rspec',
      prerelease: 'npm test',
      release: 'standard-version',
    },
    repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
    keywords: [
      'dotenv',
      'env',
      '.env',
      'environment',
      'variables',
      'config',
      'settings',
    ],
    readmeFilename: 'README.md',
    license: 'BSD-2-Clause',
    devDependencies: {
      '@types/node': '^17.0.9',
      decache: '^4.6.1',
      dtslint: '^3.7.0',
      sinon: '^12.0.1',
      standard: '^16.0.4',
      'standard-markdown': '^7.1.0',
      'standard-version': '^9.3.2',
      tap: '^15.1.6',
      tar: '^6.1.11',
      typescript: '^4.5.4',
    },
    engines: { node: '>=12' },
  };
});
var Cl = I((ow, Un) => {
  var Id = require('fs'),
    Sl = require('path'),
    Dd = require('os'),
    Fd = Pl(),
    kd = Fd.version,
    Ld =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
  function $d(e) {
    let t = {},
      r = e.toString();
    r = r.replace(
      /\r\n?/gm,
      `
`,
    );
    let n;
    for (; (n = Ld.exec(r)) != null; ) {
      let i = n[1],
        o = n[2] || '';
      o = o.trim();
      let s = o[0];
      (o = o.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
        s === '"' &&
          ((o = o.replace(
            /\\n/g,
            `
`,
          )),
          (o = o.replace(/\\r/g, '\r'))),
        (t[i] = o);
    }
    return t;
  }
  l($d, 'parse');
  function ao(e) {
    console.log(`[dotenv@${kd}][DEBUG] ${e}`);
  }
  l(ao, '_log');
  function jd(e) {
    return e[0] === '~' ? Sl.join(Dd.homedir(), e.slice(1)) : e;
  }
  l(jd, '_resolveHome');
  function Bd(e) {
    let t = Sl.resolve(process.cwd(), '.env'),
      r = 'utf8',
      n = Boolean(e && e.debug),
      i = Boolean(e && e.override);
    e &&
      (e.path != null && (t = jd(e.path)),
      e.encoding != null && (r = e.encoding));
    try {
      let o = qn.parse(Id.readFileSync(t, { encoding: r }));
      return (
        Object.keys(o).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? (i === !0 && (process.env[s] = o[s]),
              n &&
                ao(
                  i === !0
                    ? `"${s}" is already defined in \`process.env\` and WAS overwritten`
                    : `"${s}" is already defined in \`process.env\` and was NOT overwritten`,
                ))
            : (process.env[s] = o[s]);
        }),
        { parsed: o }
      );
    } catch (o) {
      return n && ao(`Failed to load ${t} ${o.message}`), { error: o };
    }
  }
  l(Bd, 'config');
  var qn = { config: Bd, parse: $d };
  Un.exports.config = qn.config;
  Un.exports.parse = qn.parse;
  Un.exports = qn;
});
var Dl = I((gw, Il) => {
  var po = Symbol('arg flag'),
    le = class extends Error {
      constructor(t, r) {
        super(t),
          (this.name = 'ArgError'),
          (this.code = r),
          Object.setPrototypeOf(this, le.prototype);
      }
    };
  l(le, 'ArgError');
  function Nr(
    e,
    {
      argv: t = process.argv.slice(2),
      permissive: r = !1,
      stopAtPositional: n = !1,
    } = {},
  ) {
    if (!e)
      throw new le(
        'argument specification object is required',
        'ARG_CONFIG_NO_SPEC',
      );
    let i = { _: [] },
      o = {},
      s = {};
    for (let a of Object.keys(e)) {
      if (!a)
        throw new le(
          'argument key cannot be an empty string',
          'ARG_CONFIG_EMPTY_KEY',
        );
      if (a[0] !== '-')
        throw new le(
          `argument key must start with '-' but found: '${a}'`,
          'ARG_CONFIG_NONOPT_KEY',
        );
      if (a.length === 1)
        throw new le(
          `argument key must have a name; singular '-' keys are not allowed: ${a}`,
          'ARG_CONFIG_NONAME_KEY',
        );
      if (typeof e[a] == 'string') {
        o[a] = e[a];
        continue;
      }
      let u = e[a],
        c = !1;
      if (Array.isArray(u) && u.length === 1 && typeof u[0] == 'function') {
        let [p] = u;
        (u = l(
          (f, d, m = []) => (m.push(p(f, d, m[m.length - 1])), m),
          'type',
        )),
          (c = p === Boolean || p[po] === !0);
      } else if (typeof u == 'function') c = u === Boolean || u[po] === !0;
      else
        throw new le(
          `type missing or not a function or valid array type: ${a}`,
          'ARG_CONFIG_VAD_TYPE',
        );
      if (a[1] !== '-' && a.length > 2)
        throw new le(
          `short argument keys (with a single hyphen) must have only one character: ${a}`,
          'ARG_CONFIG_SHORTOPT_TOOLONG',
        );
      s[a] = [u, c];
    }
    for (let a = 0, u = t.length; a < u; a++) {
      let c = t[a];
      if (n && i._.length > 0) {
        i._ = i._.concat(t.slice(a));
        break;
      }
      if (c === '--') {
        i._ = i._.concat(t.slice(a + 1));
        break;
      }
      if (c.length > 1 && c[0] === '-') {
        let p =
          c[1] === '-' || c.length === 2
            ? [c]
            : c
                .slice(1)
                .split('')
                .map((f) => `-${f}`);
        for (let f = 0; f < p.length; f++) {
          let d = p[f],
            [m, h] = d[1] === '-' ? d.split(/=(.*)/, 2) : [d, void 0],
            g = m;
          for (; g in o; ) g = o[g];
          if (!(g in s))
            if (r) {
              i._.push(d);
              continue;
            } else
              throw new le(
                `unknown or unexpected option: ${m}`,
                'ARG_UNKNOWN_OPTION',
              );
          let [w, y] = s[g];
          if (!y && f + 1 < p.length)
            throw new le(
              `option requires argument (but was followed by another short argument): ${m}`,
              'ARG_MISSING_REQUIRED_SHORTARG',
            );
          if (y) i[g] = w(!0, g, i[g]);
          else if (h === void 0) {
            if (
              t.length < a + 2 ||
              (t[a + 1].length > 1 &&
                t[a + 1][0] === '-' &&
                !(
                  t[a + 1].match(/^-?\d*(\.(?=\d))?\d*$/) &&
                  (w === Number || (typeof BigInt < 'u' && w === BigInt))
                ))
            ) {
              let x = m === g ? '' : ` (alias for ${g})`;
              throw new le(
                `option requires argument: ${m}${x}`,
                'ARG_MISSING_REQUIRED_LONGARG',
              );
            }
            (i[g] = w(t[a + 1], g, i[g])), ++a;
          } else i[g] = w(h, g, i[g]);
        }
      } else i._.push(c);
    }
    return i;
  }
  l(Nr, 'arg');
  Nr.flag = (e) => ((e[po] = !0), e);
  Nr.COUNT = Nr.flag((e, t, r) => (r || 0) + 1);
  Nr.ArgError = le;
  Il.exports = Nr;
});
var kl = I((yw, Fl) => {
  'use strict';
  Fl.exports = (e) => {
    let t = e.match(/^[ \t]*(?=\S)/gm);
    return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0;
  };
});
var fo = I((bw, Ll) => {
  'use strict';
  var Vd = kl();
  Ll.exports = (e) => {
    let t = Vd(e);
    if (t === 0) return e;
    let r = new RegExp(`^[ \\t]{${t}}`, 'gm');
    return e.replace(r, '');
  };
});
var Ul = I((xo, vo) => {
  (function (e, t) {
    typeof require == 'function' &&
    typeof xo == 'object' &&
    typeof vo == 'object'
      ? (vo.exports = t())
      : (e.pluralize = t());
  })(xo, function () {
    var e = [],
      t = [],
      r = {},
      n = {},
      i = {};
    function o(m) {
      return typeof m == 'string' ? new RegExp('^' + m + '$', 'i') : m;
    }
    l(o, 'sanitizeRule');
    function s(m, h) {
      return m === h
        ? h
        : m === m.toLowerCase()
        ? h.toLowerCase()
        : m === m.toUpperCase()
        ? h.toUpperCase()
        : m[0] === m[0].toUpperCase()
        ? h.charAt(0).toUpperCase() + h.substr(1).toLowerCase()
        : h.toLowerCase();
    }
    l(s, 'restoreCase');
    function a(m, h) {
      return m.replace(/\$(\d{1,2})/g, function (g, w) {
        return h[w] || '';
      });
    }
    l(a, 'interpolate');
    function u(m, h) {
      return m.replace(h[0], function (g, w) {
        var y = a(h[1], arguments);
        return s(g === '' ? m[w - 1] : g, y);
      });
    }
    l(u, 'replace');
    function c(m, h, g) {
      if (!m.length || r.hasOwnProperty(m)) return h;
      for (var w = g.length; w--; ) {
        var y = g[w];
        if (y[0].test(h)) return u(h, y);
      }
      return h;
    }
    l(c, 'sanitizeWord');
    function p(m, h, g) {
      return function (w) {
        var y = w.toLowerCase();
        return h.hasOwnProperty(y)
          ? s(w, y)
          : m.hasOwnProperty(y)
          ? s(w, m[y])
          : c(y, w, g);
      };
    }
    l(p, 'replaceWord');
    function f(m, h, g, w) {
      return function (y) {
        var x = y.toLowerCase();
        return h.hasOwnProperty(x)
          ? !0
          : m.hasOwnProperty(x)
          ? !1
          : c(x, x, g) === x;
      };
    }
    l(f, 'checkWord');
    function d(m, h, g) {
      var w = h === 1 ? d.singular(m) : d.plural(m);
      return (g ? h + ' ' : '') + w;
    }
    return (
      l(d, 'pluralize'),
      (d.plural = p(i, n, e)),
      (d.isPlural = f(i, n, e)),
      (d.singular = p(n, i, t)),
      (d.isSingular = f(n, i, t)),
      (d.addPluralRule = function (m, h) {
        e.push([o(m), h]);
      }),
      (d.addSingularRule = function (m, h) {
        t.push([o(m), h]);
      }),
      (d.addUncountableRule = function (m) {
        if (typeof m == 'string') {
          r[m.toLowerCase()] = !0;
          return;
        }
        d.addPluralRule(m, '$0'), d.addSingularRule(m, '$0');
      }),
      (d.addIrregularRule = function (m, h) {
        (h = h.toLowerCase()), (m = m.toLowerCase()), (i[m] = h), (n[h] = m);
      }),
      [
        ['I', 'we'],
        ['me', 'us'],
        ['he', 'they'],
        ['she', 'they'],
        ['them', 'them'],
        ['myself', 'ourselves'],
        ['yourself', 'yourselves'],
        ['itself', 'themselves'],
        ['herself', 'themselves'],
        ['himself', 'themselves'],
        ['themself', 'themselves'],
        ['is', 'are'],
        ['was', 'were'],
        ['has', 'have'],
        ['this', 'these'],
        ['that', 'those'],
        ['echo', 'echoes'],
        ['dingo', 'dingoes'],
        ['volcano', 'volcanoes'],
        ['tornado', 'tornadoes'],
        ['torpedo', 'torpedoes'],
        ['genus', 'genera'],
        ['viscus', 'viscera'],
        ['stigma', 'stigmata'],
        ['stoma', 'stomata'],
        ['dogma', 'dogmata'],
        ['lemma', 'lemmata'],
        ['schema', 'schemata'],
        ['anathema', 'anathemata'],
        ['ox', 'oxen'],
        ['axe', 'axes'],
        ['die', 'dice'],
        ['yes', 'yeses'],
        ['foot', 'feet'],
        ['eave', 'eaves'],
        ['goose', 'geese'],
        ['tooth', 'teeth'],
        ['quiz', 'quizzes'],
        ['human', 'humans'],
        ['proof', 'proofs'],
        ['carve', 'carves'],
        ['valve', 'valves'],
        ['looey', 'looies'],
        ['thief', 'thieves'],
        ['groove', 'grooves'],
        ['pickaxe', 'pickaxes'],
        ['passerby', 'passersby'],
      ].forEach(function (m) {
        return d.addIrregularRule(m[0], m[1]);
      }),
      [
        [/s?$/i, 's'],
        [/[^\u0000-\u007F]$/i, '$0'],
        [/([^aeiou]ese)$/i, '$1'],
        [/(ax|test)is$/i, '$1es'],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
        [/(e[mn]u)s?$/i, '$1s'],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          '$1i',
        ],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
        [/(seraph|cherub)(?:im)?$/i, '$1im'],
        [/(her|at|gr)o$/i, '$1oes'],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
          '$1a',
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
          '$1a',
        ],
        [/sis$/i, 'ses'],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
        [/([^aeiouy]|qu)y$/i, '$1ies'],
        [/([^ch][ieo][ln])ey$/i, '$1ies'],
        [/(x|ch|ss|sh|zz)$/i, '$1es'],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
        [/(pe)(?:rson|ople)$/i, '$1ople'],
        [/(child)(?:ren)?$/i, '$1ren'],
        [/eaux$/i, '$0'],
        [/m[ae]n$/i, 'men'],
        ['thou', 'you'],
      ].forEach(function (m) {
        return d.addPluralRule(m[0], m[1]);
      }),
      [
        [/s$/i, ''],
        [/(ss)$/i, '$1'],
        [
          /(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,
          '$1fe',
        ],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
        [/ies$/i, 'y'],
        [
          /\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,
          '$1ie',
        ],
        [/\b(mon|smil)ies$/i, '$1ey'],
        [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
        [/(seraph|cherub)im$/i, '$1'],
        [
          /(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,
          '$1',
        ],
        [
          /(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,
          '$1sis',
        ],
        [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
        [/(test)(?:is|es)$/i, '$1is'],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          '$1us',
        ],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,
          '$1um',
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,
          '$1on',
        ],
        [/(alumn|alg|vertebr)ae$/i, '$1a'],
        [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
        [/(matr|append)ices$/i, '$1ix'],
        [/(pe)(rson|ople)$/i, '$1rson'],
        [/(child)ren$/i, '$1'],
        [/(eau)x?$/i, '$1'],
        [/men$/i, 'man'],
      ].forEach(function (m) {
        return d.addSingularRule(m[0], m[1]);
      }),
      [
        'adulthood',
        'advice',
        'agenda',
        'aid',
        'aircraft',
        'alcohol',
        'ammo',
        'analytics',
        'anime',
        'athletics',
        'audio',
        'bison',
        'blood',
        'bream',
        'buffalo',
        'butter',
        'carp',
        'cash',
        'chassis',
        'chess',
        'clothing',
        'cod',
        'commerce',
        'cooperation',
        'corps',
        'debris',
        'diabetes',
        'digestion',
        'elk',
        'energy',
        'equipment',
        'excretion',
        'expertise',
        'firmware',
        'flounder',
        'fun',
        'gallows',
        'garbage',
        'graffiti',
        'hardware',
        'headquarters',
        'health',
        'herpes',
        'highjinks',
        'homework',
        'housework',
        'information',
        'jeans',
        'justice',
        'kudos',
        'labour',
        'literature',
        'machinery',
        'mackerel',
        'mail',
        'media',
        'mews',
        'moose',
        'music',
        'mud',
        'manga',
        'news',
        'only',
        'personnel',
        'pike',
        'plankton',
        'pliers',
        'police',
        'pollution',
        'premises',
        'rain',
        'research',
        'rice',
        'salmon',
        'scissors',
        'series',
        'sewage',
        'shambles',
        'shrimp',
        'software',
        'species',
        'staff',
        'swine',
        'tennis',
        'traffic',
        'transportation',
        'trout',
        'tuna',
        'wealth',
        'welfare',
        'whiting',
        'wildebeest',
        'wildlife',
        'you',
        /pok[eé]mon$/i,
        /[^aeiou]ese$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /o[iu]s$/i,
        /pox$/i,
        /sheep$/i,
      ].forEach(d.addUncountableRule),
      d
    );
  });
});
var fu = I((Ux, pu) => {
  'use strict';
  pu.exports = (e) => Object.prototype.toString.call(e) === '[object RegExp]';
});
var mu = I((Gx, du) => {
  'use strict';
  du.exports = (e) => {
    let t = typeof e;
    return e !== null && (t === 'object' || t === 'function');
  };
});
var gu = I((_o) => {
  'use strict';
  Object.defineProperty(_o, '__esModule', { value: !0 });
  _o.default = (e) =>
    Object.getOwnPropertySymbols(e).filter((t) =>
      Object.prototype.propertyIsEnumerable.call(e, t),
    );
});
var Du = I((dT, Xm) => {
  Xm.exports = {
    name: '@prisma/client',
    version: '4.10.1',
    description:
      "Prisma Client is an auto-generated, type-safe and modern JavaScript/TypeScript ORM for Node.js that's tailored to your data. Supports MySQL, PostgreSQL, MariaDB, SQLite databases.",
    keywords: [
      'orm',
      'prisma2',
      'prisma',
      'client',
      'query',
      'database',
      'sql',
      'postgres',
      'postgresql',
      'mysql',
      'sqlite',
      'mariadb',
      'mssql',
      'typescript',
      'query-builder',
    ],
    main: 'index.js',
    browser: 'index-browser.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    engines: { node: '>=14.17' },
    homepage: 'https://www.prisma.io',
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/prisma.git',
      directory: 'packages/client',
    },
    author: 'Tim Suchanek <suchanek@prisma.io>',
    bugs: 'https://github.com/prisma/prisma/issues',
    scripts: {
      dev: 'DEV=true node -r esbuild-register helpers/build.ts',
      build: 'node -r esbuild-register helpers/build.ts',
      test: 'jest --verbose',
      'test:e2e': 'node -r esbuild-register tests/e2e/_utils/run.ts',
      'test:functional':
        'node -r esbuild-register helpers/functional-test/run-tests.ts',
      'test:memory': 'node -r esbuild-register helpers/memory-tests.ts',
      'test:functional:code':
        'node -r esbuild-register helpers/functional-test/run-tests.ts --no-types',
      'test:functional:types':
        'node -r esbuild-register helpers/functional-test/run-tests.ts --types-only',
      'test-notypes':
        'jest --verbose --testPathIgnorePatterns src/__tests__/types/types.test.ts',
      generate: 'node scripts/postinstall.js',
      postinstall: 'node scripts/postinstall.js',
      prepublishOnly: 'pnpm run build',
      'new-test':
        "NODE_OPTIONS='-r ts-node/register' yo ./helpers/generator-test/index.ts",
    },
    files: [
      'README.md',
      'runtime',
      'scripts',
      'generator-build',
      'edge.js',
      'edge.d.ts',
      'index.js',
      'index.d.ts',
      'index-browser.js',
    ],
    devDependencies: {
      '@faker-js/faker': '7.6.0',
      '@fast-check/jest': '1.6.0',
      '@jest/globals': '29.4.1',
      '@jest/test-sequencer': '29.4.1',
      '@opentelemetry/api': '1.4.0',
      '@opentelemetry/context-async-hooks': '1.9.1',
      '@opentelemetry/instrumentation': '0.35.1',
      '@opentelemetry/resources': '1.9.1',
      '@opentelemetry/sdk-trace-base': '1.9.1',
      '@opentelemetry/semantic-conventions': '1.9.1',
      '@prisma/debug': 'workspace:*',
      '@prisma/engine-core': 'workspace:*',
      '@prisma/engines': 'workspace:*',
      '@prisma/fetch-engine': 'workspace:*',
      '@prisma/generator-helper': 'workspace:*',
      '@prisma/get-platform': 'workspace:*',
      '@prisma/instrumentation': 'workspace:*',
      '@prisma/internals': 'workspace:*',
      '@prisma/migrate': 'workspace:*',
      '@prisma/mini-proxy': '0.6.4',
      '@swc-node/register': '1.5.5',
      '@swc/core': '1.3.32',
      '@swc/jest': '0.2.24',
      '@timsuchanek/copy': '1.4.5',
      '@types/debug': '4.1.7',
      '@types/fs-extra': '9.0.13',
      '@types/jest': '29.4.0',
      '@types/js-levenshtein': '1.1.1',
      '@types/mssql': '8.1.2',
      '@types/node': '14.18.36',
      '@types/pg': '8.6.6',
      '@types/yeoman-generator': '5.2.11',
      arg: '5.0.2',
      benchmark: '2.1.4',
      chalk: '4.1.2',
      'decimal.js': '10.4.3',
      esbuild: '0.15.13',
      execa: '5.1.1',
      'expect-type': '0.15.0',
      'flat-map-polyfill': '0.3.8',
      'fs-extra': '11.1.0',
      'fs-monkey': '1.0.3',
      'get-own-enumerable-property-symbols': '3.0.2',
      globby: '11.1.0',
      'indent-string': '4.0.0',
      'is-obj': '2.0.0',
      'is-regexp': '2.1.0',
      jest: '29.4.1',
      'jest-junit': '15.0.0',
      'jest-snapshot': '29.4.1',
      'js-levenshtein': '1.1.6',
      klona: '2.0.6',
      'lz-string': '1.4.4',
      mariadb: '3.0.2',
      memfs: '3.4.13',
      mssql: '9.1.1',
      'node-fetch': '2.6.9',
      pg: '8.9.0',
      'pkg-up': '3.1.0',
      pluralize: '8.0.0',
      resolve: '1.22.1',
      rimraf: '3.0.2',
      'simple-statistics': '7.8.2',
      'sort-keys': '4.2.0',
      'source-map-support': '0.5.21',
      'sql-template-tag': '5.0.3',
      'stacktrace-parser': '0.1.10',
      'strip-ansi': '6.0.1',
      'strip-indent': '3.0.0',
      'ts-jest': '29.0.5',
      'ts-node': '10.9.1',
      'ts-pattern': '4.1.3',
      tsd: '0.21.0',
      typescript: '4.9.5',
      'yeoman-generator': '5.7.0',
      yo: '4.3.1',
      zx: '7.1.1',
    },
    peerDependencies: { prisma: '*' },
    peerDependenciesMeta: { prisma: { optional: !0 } },
    dependencies: {
      '@prisma/engines-version':
        '4.10.1-2.aead147aa326ccb985dcfed5b065b4fdabd44b19',
    },
    sideEffects: !1,
  };
});
var Ng = {};
Jr(Ng, {
  DMMF: () => Ne,
  DMMFClass: () => Le,
  Debug: () => Li,
  Decimal: () => Pe,
  Engine: () => Xe,
  Extensions: () => fi,
  MetricsClient: () => lt,
  NotFoundError: () => Te,
  PrismaClientInitializationError: () => V,
  PrismaClientKnownRequestError: () => te,
  PrismaClientRustPanicError: () => pe,
  PrismaClientUnknownRequestError: () => J,
  PrismaClientValidationError: () => ie,
  Sql: () => Y,
  Types: () => di,
  decompressFromBase64: () => Mg,
  empty: () => ql,
  findSync: () => Bo,
  getPrismaClient: () => dc,
  join: () => Bl,
  makeDocument: () => Zn,
  makeStrictEnum: () => mc,
  objectEnumValues: () => mn,
  raw: () => Eo,
  sqltag: () => wo,
  transformDocument: () => bu,
  unpack: () => ei,
  warnEnvConflicts: () => yc,
});
module.exports = _c(Ng);
var bc = M(Uo());
var fi = {};
Jr(fi, { defineExtension: () => Go, getExtensionContext: () => Vo });
function Go(e) {
  return typeof e == 'function' ? e : (t) => t.$extends(e);
}
l(Go, 'defineExtension');
function Vo(e) {
  return e;
}
l(Vo, 'getExtensionContext');
var di = {};
Jr(di, { Extensions: () => Ko, Public: () => Qo, Utils: () => Ho });
var Ko = {};
var Qo = {};
var Ho = {};
var lt = class {
  constructor(t) {
    this._engine = t;
  }
  prometheus(t) {
    return this._engine.metrics({ format: 'prometheus', ...t });
  }
  json(t) {
    return this._engine.metrics({ format: 'json', ...t });
  }
};
l(lt, 'MetricsClient');
function mi(e, t) {
  for (let r of t)
    for (let n of Object.getOwnPropertyNames(r.prototype))
      Object.defineProperty(
        e.prototype,
        n,
        Object.getOwnPropertyDescriptor(r.prototype, n) ?? Object.create(null),
      );
}
l(mi, 'applyMixins');
var We = M(ue());
var vt = 9e15,
  He = 1e9,
  Ai = '0123456789abcdef',
  an =
    '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
  ln =
    '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
  Pi = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -vt,
    maxE: vt,
    crypto: !1,
  },
  Ss,
  Fe,
  N = !0,
  cn = '[DecimalError] ',
  Qe = cn + 'Invalid argument: ',
  Cs = cn + 'Precision limit exceeded',
  Os = cn + 'crypto unavailable',
  Ms = '[object Decimal]',
  Z = Math.floor,
  G = Math.pow,
  Yc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  zc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  Xc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  Ns = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  Ae = 1e7,
  O = 7,
  Zc = 9007199254740991,
  ep = an.length - 1,
  Si = ln.length - 1,
  v = { toStringTag: Ms };
v.absoluteValue = v.abs = function () {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), S(e);
};
v.ceil = function () {
  return S(new this.constructor(this), this.e + 1, 2);
};
v.clampedTo = v.clamp = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  if (((e = new i(e)), (t = new i(t)), !e.s || !t.s)) return new i(NaN);
  if (e.gt(t)) throw Error(Qe + t);
  return (r = n.cmp(e)), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n);
};
v.comparedTo = v.cmp = function (e) {
  var t,
    r,
    n,
    i,
    o = this,
    s = o.d,
    a = (e = new o.constructor(e)).d,
    u = o.s,
    c = e.s;
  if (!s || !a)
    return !u || !c ? NaN : u !== c ? u : s === a ? 0 : !s ^ (u < 0) ? 1 : -1;
  if (!s[0] || !a[0]) return s[0] ? u : a[0] ? -c : 0;
  if (u !== c) return u;
  if (o.e !== e.e) return (o.e > e.e) ^ (u < 0) ? 1 : -1;
  for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (s[t] !== a[t]) return (s[t] > a[t]) ^ (u < 0) ? 1 : -1;
  return n === i ? 0 : (n > i) ^ (u < 0) ? 1 : -1;
};
v.cosine = v.cos = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.d
    ? r.d[0]
      ? ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + O),
        (n.rounding = 1),
        (r = tp(n, ks(n, r))),
        (n.precision = e),
        (n.rounding = t),
        S(Fe == 2 || Fe == 3 ? r.neg() : r, e, t, !0))
      : new n(1)
    : new n(NaN);
};
v.cubeRoot = v.cbrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p = this,
    f = p.constructor;
  if (!p.isFinite() || p.isZero()) return new f(p);
  for (
    N = !1,
      o = p.s * G(p.s * p, 1 / 3),
      !o || Math.abs(o) == 1 / 0
        ? ((r = H(p.d)),
          (e = p.e),
          (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? '0' : '00'),
          (o = G(r, 1 / 3)),
          (e = Z((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          o == 1 / 0
            ? (r = '5e' + e)
            : ((r = o.toExponential()),
              (r = r.slice(0, r.indexOf('e') + 1) + e)),
          (n = new f(r)),
          (n.s = p.s))
        : (n = new f(o.toString())),
      s = (e = f.precision) + 3;
    ;

  )
    if (
      ((a = n),
      (u = a.times(a).times(a)),
      (c = u.plus(p)),
      (n = $(c.plus(p).times(a), c.plus(u), s + 2, 1)),
      H(a.d).slice(0, s) === (r = H(n.d)).slice(0, s))
    )
      if (((r = r.slice(s - 3, s + 1)), r == '9999' || (!i && r == '4999'))) {
        if (!i && (S(a, e + 1, 0), a.times(a).times(a).eq(p))) {
          n = a;
          break;
        }
        (s += 4), (i = 1);
      } else {
        (!+r || (!+r.slice(1) && r.charAt(0) == '5')) &&
          (S(n, e + 1, 1), (t = !n.times(n).times(n).eq(p)));
        break;
      }
  return (N = !0), S(n, e, f.rounding, t);
};
v.decimalPlaces = v.dp = function () {
  var e,
    t = this.d,
    r = NaN;
  if (t) {
    if (((e = t.length - 1), (r = (e - Z(this.e / O)) * O), (e = t[e]), e))
      for (; e % 10 == 0; e /= 10) r--;
    r < 0 && (r = 0);
  }
  return r;
};
v.dividedBy = v.div = function (e) {
  return $(this, new this.constructor(e));
};
v.dividedToIntegerBy = v.divToInt = function (e) {
  var t = this,
    r = t.constructor;
  return S($(t, new r(e), 0, 1, 1), r.precision, r.rounding);
};
v.equals = v.eq = function (e) {
  return this.cmp(e) === 0;
};
v.floor = function () {
  return S(new this.constructor(this), this.e + 1, 3);
};
v.greaterThan = v.gt = function (e) {
  return this.cmp(e) > 0;
};
v.greaterThanOrEqualTo = v.gte = function (e) {
  var t = this.cmp(e);
  return t == 1 || t === 0;
};
v.hyperbolicCosine = v.cosh = function () {
  var e,
    t,
    r,
    n,
    i,
    o = this,
    s = o.constructor,
    a = new s(1);
  if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
  if (o.isZero()) return a;
  (r = s.precision),
    (n = s.rounding),
    (s.precision = r + Math.max(o.e, o.sd()) + 4),
    (s.rounding = 1),
    (i = o.d.length),
    i < 32
      ? ((e = Math.ceil(i / 3)), (t = (1 / fn(4, e)).toString()))
      : ((e = 16), (t = '2.3283064365386962890625e-10')),
    (o = Tt(s, 1, o.times(t), new s(1), !0));
  for (var u, c = e, p = new s(8); c--; )
    (u = o.times(o)), (o = a.minus(u.times(p.minus(u.times(p)))));
  return S(o, (s.precision = r), (s.rounding = n), !0);
};
v.hyperbolicSine = v.sinh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  if (!i.isFinite() || i.isZero()) return new o(i);
  if (
    ((t = o.precision),
    (r = o.rounding),
    (o.precision = t + Math.max(i.e, i.sd()) + 4),
    (o.rounding = 1),
    (n = i.d.length),
    n < 3)
  )
    i = Tt(o, 2, i, i, !0);
  else {
    (e = 1.4 * Math.sqrt(n)),
      (e = e > 16 ? 16 : e | 0),
      (i = i.times(1 / fn(5, e))),
      (i = Tt(o, 2, i, i, !0));
    for (var s, a = new o(5), u = new o(16), c = new o(20); e--; )
      (s = i.times(i)), (i = i.times(a.plus(s.times(u.times(s).plus(c)))));
  }
  return (o.precision = t), (o.rounding = r), S(i, t, r, !0);
};
v.hyperbolicTangent = v.tanh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 7),
        (n.rounding = 1),
        $(r.sinh(), r.cosh(), (n.precision = e), (n.rounding = t)))
    : new n(r.s);
};
v.inverseCosine = v.acos = function () {
  var e,
    t = this,
    r = t.constructor,
    n = t.abs().cmp(1),
    i = r.precision,
    o = r.rounding;
  return n !== -1
    ? n === 0
      ? t.isNeg()
        ? _e(r, i, o)
        : new r(0)
      : new r(NaN)
    : t.isZero()
    ? _e(r, i + 4, o).times(0.5)
    : ((r.precision = i + 6),
      (r.rounding = 1),
      (t = t.asin()),
      (e = _e(r, i + 4, o).times(0.5)),
      (r.precision = i),
      (r.rounding = o),
      e.minus(t));
};
v.inverseHyperbolicCosine = v.acosh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.lte(1)
    ? new n(r.eq(1) ? 0 : NaN)
    : r.isFinite()
    ? ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
      (n.rounding = 1),
      (N = !1),
      (r = r.times(r).minus(1).sqrt().plus(r)),
      (N = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln())
    : new n(r);
};
v.inverseHyperbolicSine = v.asinh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return !r.isFinite() || r.isZero()
    ? new n(r)
    : ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
      (n.rounding = 1),
      (N = !1),
      (r = r.times(r).plus(1).sqrt().plus(r)),
      (N = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln());
};
v.inverseHyperbolicTangent = v.atanh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  return i.isFinite()
    ? i.e >= 0
      ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
      : ((e = o.precision),
        (t = o.rounding),
        (n = i.sd()),
        Math.max(n, e) < 2 * -i.e - 1
          ? S(new o(i), e, t, !0)
          : ((o.precision = r = n - i.e),
            (i = $(i.plus(1), new o(1).minus(i), r + e, 1)),
            (o.precision = e + 4),
            (o.rounding = 1),
            (i = i.ln()),
            (o.precision = e),
            (o.rounding = t),
            i.times(0.5)))
    : new o(NaN);
};
v.inverseSine = v.asin = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  return i.isZero()
    ? new o(i)
    : ((t = i.abs().cmp(1)),
      (r = o.precision),
      (n = o.rounding),
      t !== -1
        ? t === 0
          ? ((e = _e(o, r + 4, n).times(0.5)), (e.s = i.s), e)
          : new o(NaN)
        : ((o.precision = r + 6),
          (o.rounding = 1),
          (i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan()),
          (o.precision = r),
          (o.rounding = n),
          i.times(2)));
};
v.inverseTangent = v.atan = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c = this,
    p = c.constructor,
    f = p.precision,
    d = p.rounding;
  if (c.isFinite()) {
    if (c.isZero()) return new p(c);
    if (c.abs().eq(1) && f + 4 <= Si)
      return (s = _e(p, f + 4, d).times(0.25)), (s.s = c.s), s;
  } else {
    if (!c.s) return new p(NaN);
    if (f + 4 <= Si) return (s = _e(p, f + 4, d).times(0.5)), (s.s = c.s), s;
  }
  for (
    p.precision = a = f + 10,
      p.rounding = 1,
      r = Math.min(28, (a / O + 2) | 0),
      e = r;
    e;
    --e
  )
    c = c.div(c.times(c).plus(1).sqrt().plus(1));
  for (
    N = !1, t = Math.ceil(a / O), n = 1, u = c.times(c), s = new p(c), i = c;
    e !== -1;

  )
    if (
      ((i = i.times(u)),
      (o = s.minus(i.div((n += 2)))),
      (i = i.times(u)),
      (s = o.plus(i.div((n += 2)))),
      s.d[t] !== void 0)
    )
      for (e = t; s.d[e] === o.d[e] && e--; );
  return (
    r && (s = s.times(2 << (r - 1))),
    (N = !0),
    S(s, (p.precision = f), (p.rounding = d), !0)
  );
};
v.isFinite = function () {
  return !!this.d;
};
v.isInteger = v.isInt = function () {
  return !!this.d && Z(this.e / O) > this.d.length - 2;
};
v.isNaN = function () {
  return !this.s;
};
v.isNegative = v.isNeg = function () {
  return this.s < 0;
};
v.isPositive = v.isPos = function () {
  return this.s > 0;
};
v.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
v.lessThan = v.lt = function (e) {
  return this.cmp(e) < 0;
};
v.lessThanOrEqualTo = v.lte = function (e) {
  return this.cmp(e) < 1;
};
v.logarithm = v.log = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c = this,
    p = c.constructor,
    f = p.precision,
    d = p.rounding,
    m = 5;
  if (e == null) (e = new p(10)), (t = !0);
  else {
    if (((e = new p(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1)))
      return new p(NaN);
    t = e.eq(10);
  }
  if (((r = c.d), c.s < 0 || !r || !r[0] || c.eq(1)))
    return new p(r && !r[0] ? -1 / 0 : c.s != 1 ? NaN : r ? 0 : 1 / 0);
  if (t)
    if (r.length > 1) o = !0;
    else {
      for (i = r[0]; i % 10 === 0; ) i /= 10;
      o = i !== 1;
    }
  if (
    ((N = !1),
    (a = f + m),
    (s = Ke(c, a)),
    (n = t ? un(p, a + 10) : Ke(e, a)),
    (u = $(s, n, a, 1)),
    Zt(u.d, (i = f), d))
  )
    do
      if (
        ((a += 10),
        (s = Ke(c, a)),
        (n = t ? un(p, a + 10) : Ke(e, a)),
        (u = $(s, n, a, 1)),
        !o)
      ) {
        +H(u.d).slice(i + 1, i + 15) + 1 == 1e14 && (u = S(u, f + 1, 0));
        break;
      }
    while (Zt(u.d, (i += 10), d));
  return (N = !0), S(u, f, d);
};
v.minus = v.sub = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p,
    f,
    d,
    m = this,
    h = m.constructor;
  if (((e = new h(e)), !m.d || !e.d))
    return (
      !m.s || !e.s
        ? (e = new h(NaN))
        : m.d
        ? (e.s = -e.s)
        : (e = new h(e.d || m.s !== e.s ? m : NaN)),
      e
    );
  if (m.s != e.s) return (e.s = -e.s), m.plus(e);
  if (
    ((c = m.d), (d = e.d), (a = h.precision), (u = h.rounding), !c[0] || !d[0])
  ) {
    if (d[0]) e.s = -e.s;
    else if (c[0]) e = new h(m);
    else return new h(u === 3 ? -0 : 0);
    return N ? S(e, a, u) : e;
  }
  if (((r = Z(e.e / O)), (p = Z(m.e / O)), (c = c.slice()), (o = p - r), o)) {
    for (
      f = o < 0,
        f
          ? ((t = c), (o = -o), (s = d.length))
          : ((t = d), (r = p), (s = c.length)),
        n = Math.max(Math.ceil(a / O), s) + 2,
        o > n && ((o = n), (t.length = 1)),
        t.reverse(),
        n = o;
      n--;

    )
      t.push(0);
    t.reverse();
  } else {
    for (n = c.length, s = d.length, f = n < s, f && (s = n), n = 0; n < s; n++)
      if (c[n] != d[n]) {
        f = c[n] < d[n];
        break;
      }
    o = 0;
  }
  for (
    f && ((t = c), (c = d), (d = t), (e.s = -e.s)),
      s = c.length,
      n = d.length - s;
    n > 0;
    --n
  )
    c[s++] = 0;
  for (n = d.length; n > o; ) {
    if (c[--n] < d[n]) {
      for (i = n; i && c[--i] === 0; ) c[i] = Ae - 1;
      --c[i], (c[n] += Ae);
    }
    c[n] -= d[n];
  }
  for (; c[--s] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --r;
  return c[0]
    ? ((e.d = c), (e.e = pn(c, r)), N ? S(e, a, u) : e)
    : new h(u === 3 ? -0 : 0);
};
v.modulo = v.mod = function (e) {
  var t,
    r = this,
    n = r.constructor;
  return (
    (e = new n(e)),
    !r.d || !e.s || (e.d && !e.d[0])
      ? new n(NaN)
      : !e.d || (r.d && !r.d[0])
      ? S(new n(r), n.precision, n.rounding)
      : ((N = !1),
        n.modulo == 9
          ? ((t = $(r, e.abs(), 0, 3, 1)), (t.s *= e.s))
          : (t = $(r, e, 0, n.modulo, 1)),
        (t = t.times(e)),
        (N = !0),
        r.minus(t))
  );
};
v.naturalExponential = v.exp = function () {
  return Ci(this);
};
v.naturalLogarithm = v.ln = function () {
  return Ke(this);
};
v.negated = v.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s), S(e);
};
v.plus = v.add = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p,
    f = this,
    d = f.constructor;
  if (((e = new d(e)), !f.d || !e.d))
    return (
      !f.s || !e.s
        ? (e = new d(NaN))
        : f.d || (e = new d(e.d || f.s === e.s ? f : NaN)),
      e
    );
  if (f.s != e.s) return (e.s = -e.s), f.minus(e);
  if (
    ((c = f.d), (p = e.d), (a = d.precision), (u = d.rounding), !c[0] || !p[0])
  )
    return p[0] || (e = new d(f)), N ? S(e, a, u) : e;
  if (((o = Z(f.e / O)), (n = Z(e.e / O)), (c = c.slice()), (i = o - n), i)) {
    for (
      i < 0
        ? ((r = c), (i = -i), (s = p.length))
        : ((r = p), (n = o), (s = c.length)),
        o = Math.ceil(a / O),
        s = o > s ? o + 1 : s + 1,
        i > s && ((i = s), (r.length = 1)),
        r.reverse();
      i--;

    )
      r.push(0);
    r.reverse();
  }
  for (
    s = c.length,
      i = p.length,
      s - i < 0 && ((i = s), (r = p), (p = c), (c = r)),
      t = 0;
    i;

  )
    (t = ((c[--i] = c[i] + p[i] + t) / Ae) | 0), (c[i] %= Ae);
  for (t && (c.unshift(t), ++n), s = c.length; c[--s] == 0; ) c.pop();
  return (e.d = c), (e.e = pn(c, n)), N ? S(e, a, u) : e;
};
v.precision = v.sd = function (e) {
  var t,
    r = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Qe + e);
  return (
    r.d ? ((t = Rs(r.d)), e && r.e + 1 > t && (t = r.e + 1)) : (t = NaN), t
  );
};
v.round = function () {
  var e = this,
    t = e.constructor;
  return S(new t(e), e.e + 1, t.rounding);
};
v.sine = v.sin = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + O),
        (n.rounding = 1),
        (r = np(n, ks(n, r))),
        (n.precision = e),
        (n.rounding = t),
        S(Fe > 2 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
v.squareRoot = v.sqrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s = this,
    a = s.d,
    u = s.e,
    c = s.s,
    p = s.constructor;
  if (c !== 1 || !a || !a[0])
    return new p(!c || (c < 0 && (!a || a[0])) ? NaN : a ? s : 1 / 0);
  for (
    N = !1,
      c = Math.sqrt(+s),
      c == 0 || c == 1 / 0
        ? ((t = H(a)),
          (t.length + u) % 2 == 0 && (t += '0'),
          (c = Math.sqrt(t)),
          (u = Z((u + 1) / 2) - (u < 0 || u % 2)),
          c == 1 / 0
            ? (t = '5e' + u)
            : ((t = c.toExponential()),
              (t = t.slice(0, t.indexOf('e') + 1) + u)),
          (n = new p(t)))
        : (n = new p(c.toString())),
      r = (u = p.precision) + 3;
    ;

  )
    if (
      ((o = n),
      (n = o.plus($(s, o, r + 2, 1)).times(0.5)),
      H(o.d).slice(0, r) === (t = H(n.d)).slice(0, r))
    )
      if (((t = t.slice(r - 3, r + 1)), t == '9999' || (!i && t == '4999'))) {
        if (!i && (S(o, u + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        (r += 4), (i = 1);
      } else {
        (!+t || (!+t.slice(1) && t.charAt(0) == '5')) &&
          (S(n, u + 1, 1), (e = !n.times(n).eq(s)));
        break;
      }
  return (N = !0), S(n, u, p.rounding, e);
};
v.tangent = v.tan = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 10),
        (n.rounding = 1),
        (r = r.sin()),
        (r.s = 1),
        (r = $(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0)),
        (n.precision = e),
        (n.rounding = t),
        S(Fe == 2 || Fe == 4 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
v.times = v.mul = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p = this,
    f = p.constructor,
    d = p.d,
    m = (e = new f(e)).d;
  if (((e.s *= p.s), !d || !d[0] || !m || !m[0]))
    return new f(
      !e.s || (d && !d[0] && !m) || (m && !m[0] && !d)
        ? NaN
        : !d || !m
        ? e.s / 0
        : e.s * 0,
    );
  for (
    r = Z(p.e / O) + Z(e.e / O),
      u = d.length,
      c = m.length,
      u < c && ((o = d), (d = m), (m = o), (s = u), (u = c), (c = s)),
      o = [],
      s = u + c,
      n = s;
    n--;

  )
    o.push(0);
  for (n = c; --n >= 0; ) {
    for (t = 0, i = u + n; i > n; )
      (a = o[i] + m[n] * d[i - n - 1] + t),
        (o[i--] = a % Ae | 0),
        (t = (a / Ae) | 0);
    o[i] = (o[i] + t) % Ae | 0;
  }
  for (; !o[--s]; ) o.pop();
  return (
    t ? ++r : o.shift(),
    (e.d = o),
    (e.e = pn(o, r)),
    N ? S(e, f.precision, f.rounding) : e
  );
};
v.toBinary = function (e, t) {
  return Mi(this, 2, e, t);
};
v.toDecimalPlaces = v.toDP = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (ce(e, 0, He),
        t === void 0 ? (t = n.rounding) : ce(t, 0, 8),
        S(r, e + r.e + 1, t))
  );
};
v.toExponential = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  return (
    e === void 0
      ? (r = Me(n, !0))
      : (ce(e, 0, He),
        t === void 0 ? (t = i.rounding) : ce(t, 0, 8),
        (n = S(new i(n), e + 1, t)),
        (r = Me(n, !0, e + 1))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  );
};
v.toFixed = function (e, t) {
  var r,
    n,
    i = this,
    o = i.constructor;
  return (
    e === void 0
      ? (r = Me(i))
      : (ce(e, 0, He),
        t === void 0 ? (t = o.rounding) : ce(t, 0, 8),
        (n = S(new o(i), e + i.e + 1, t)),
        (r = Me(n, !1, e + n.e + 1))),
    i.isNeg() && !i.isZero() ? '-' + r : r
  );
};
v.toFraction = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p,
    f,
    d,
    m = this,
    h = m.d,
    g = m.constructor;
  if (!h) return new g(m);
  if (
    ((c = r = new g(1)),
    (n = u = new g(0)),
    (t = new g(n)),
    (o = t.e = Rs(h) - m.e - 1),
    (s = o % O),
    (t.d[0] = G(10, s < 0 ? O + s : s)),
    e == null)
  )
    e = o > 0 ? t : c;
  else {
    if (((a = new g(e)), !a.isInt() || a.lt(c))) throw Error(Qe + a);
    e = a.gt(t) ? (o > 0 ? t : c) : a;
  }
  for (
    N = !1,
      a = new g(H(h)),
      p = g.precision,
      g.precision = o = h.length * O * 2;
    (f = $(a, t, 0, 1, 1)), (i = r.plus(f.times(n))), i.cmp(e) != 1;

  )
    (r = n),
      (n = i),
      (i = c),
      (c = u.plus(f.times(i))),
      (u = i),
      (i = t),
      (t = a.minus(f.times(i))),
      (a = i);
  return (
    (i = $(e.minus(r), n, 0, 1, 1)),
    (u = u.plus(i.times(c))),
    (r = r.plus(i.times(n))),
    (u.s = c.s = m.s),
    (d =
      $(c, n, o, 1).minus(m).abs().cmp($(u, r, o, 1).minus(m).abs()) < 1
        ? [c, n]
        : [u, r]),
    (g.precision = p),
    (N = !0),
    d
  );
};
v.toHexadecimal = v.toHex = function (e, t) {
  return Mi(this, 16, e, t);
};
v.toNearest = function (e, t) {
  var r = this,
    n = r.constructor;
  if (((r = new n(r)), e == null)) {
    if (!r.d) return r;
    (e = new n(1)), (t = n.rounding);
  } else {
    if (((e = new n(e)), t === void 0 ? (t = n.rounding) : ce(t, 0, 8), !r.d))
      return e.s ? r : e;
    if (!e.d) return e.s && (e.s = r.s), e;
  }
  return (
    e.d[0]
      ? ((N = !1), (r = $(r, e, 0, t, 1).times(e)), (N = !0), S(r))
      : ((e.s = r.s), (r = e)),
    r
  );
};
v.toNumber = function () {
  return +this;
};
v.toOctal = function (e, t) {
  return Mi(this, 8, e, t);
};
v.toPower = v.pow = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a = this,
    u = a.constructor,
    c = +(e = new u(e));
  if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new u(G(+a, c));
  if (((a = new u(a)), a.eq(1))) return a;
  if (((n = u.precision), (o = u.rounding), e.eq(1))) return S(a, n, o);
  if (((t = Z(e.e / O)), t >= e.d.length - 1 && (r = c < 0 ? -c : c) <= Zc))
    return (i = Is(u, a, r, n)), e.s < 0 ? new u(1).div(i) : S(i, n, o);
  if (((s = a.s), s < 0)) {
    if (t < e.d.length - 1) return new u(NaN);
    if (
      ((e.d[t] & 1) == 0 && (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1)
    )
      return (a.s = s), a;
  }
  return (
    (r = G(+a, c)),
    (t =
      r == 0 || !isFinite(r)
        ? Z(c * (Math.log('0.' + H(a.d)) / Math.LN10 + a.e + 1))
        : new u(r + '').e),
    t > u.maxE + 1 || t < u.minE - 1
      ? new u(t > 0 ? s / 0 : 0)
      : ((N = !1),
        (u.rounding = a.s = 1),
        (r = Math.min(12, (t + '').length)),
        (i = Ci(e.times(Ke(a, n + r)), n)),
        i.d &&
          ((i = S(i, n + 5, 1)),
          Zt(i.d, n, o) &&
            ((t = n + 10),
            (i = S(Ci(e.times(Ke(a, t + r)), t), t + 5, 1)),
            +H(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = S(i, n + 1, 0)))),
        (i.s = s),
        (N = !0),
        (u.rounding = o),
        S(i, n, o))
  );
};
v.toPrecision = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  return (
    e === void 0
      ? (r = Me(n, n.e <= i.toExpNeg || n.e >= i.toExpPos))
      : (ce(e, 1, He),
        t === void 0 ? (t = i.rounding) : ce(t, 0, 8),
        (n = S(new i(n), e, t)),
        (r = Me(n, e <= n.e || n.e <= i.toExpNeg, e))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  );
};
v.toSignificantDigits = v.toSD = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (ce(e, 1, He), t === void 0 ? (t = n.rounding) : ce(t, 0, 8)),
    S(new n(r), e, t)
  );
};
v.toString = function () {
  var e = this,
    t = e.constructor,
    r = Me(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() && !e.isZero() ? '-' + r : r;
};
v.truncated = v.trunc = function () {
  return S(new this.constructor(this), this.e + 1, 1);
};
v.valueOf = v.toJSON = function () {
  var e = this,
    t = e.constructor,
    r = Me(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() ? '-' + r : r;
};
function H(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = '',
    s = e[0];
  if (i > 0) {
    for (o += s, t = 1; t < i; t++)
      (n = e[t] + ''), (r = O - n.length), r && (o += Ve(r)), (o += n);
    (s = e[t]), (n = s + ''), (r = O - n.length), r && (o += Ve(r));
  } else if (s === 0) return '0';
  for (; s % 10 === 0; ) s /= 10;
  return o + s;
}
l(H, 'digitsToString');
function ce(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(Qe + e);
}
l(ce, 'checkInt32');
function Zt(e, t, r, n) {
  var i, o, s, a;
  for (o = e[0]; o >= 10; o /= 10) --t;
  return (
    --t < 0 ? ((t += O), (i = 0)) : ((i = Math.ceil((t + 1) / O)), (t %= O)),
    (o = G(10, O - t)),
    (a = e[i] % o | 0),
    n == null
      ? t < 3
        ? (t == 0 ? (a = (a / 100) | 0) : t == 1 && (a = (a / 10) | 0),
          (s =
            (r < 4 && a == 99999) ||
            (r > 3 && a == 49999) ||
            a == 5e4 ||
            a == 0))
        : (s =
            (((r < 4 && a + 1 == o) || (r > 3 && a + 1 == o / 2)) &&
              ((e[i + 1] / o / 100) | 0) == G(10, t - 2) - 1) ||
            ((a == o / 2 || a == 0) && ((e[i + 1] / o / 100) | 0) == 0))
      : t < 4
      ? (t == 0
          ? (a = (a / 1e3) | 0)
          : t == 1
          ? (a = (a / 100) | 0)
          : t == 2 && (a = (a / 10) | 0),
        (s = ((n || r < 4) && a == 9999) || (!n && r > 3 && a == 4999)))
      : (s =
          (((n || r < 4) && a + 1 == o) || (!n && r > 3 && a + 1 == o / 2)) &&
          ((e[i + 1] / o / 1e3) | 0) == G(10, t - 3) - 1),
    s
  );
}
l(Zt, 'checkRoundingDigits');
function sn(e, t, r) {
  for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
    for (o = i.length; o--; ) i[o] *= t;
    for (i[0] += Ai.indexOf(e.charAt(s++)), n = 0; n < i.length; n++)
      i[n] > r - 1 &&
        (i[n + 1] === void 0 && (i[n + 1] = 0),
        (i[n + 1] += (i[n] / r) | 0),
        (i[n] %= r));
  }
  return i.reverse();
}
l(sn, 'convertBase');
function tp(e, t) {
  var r, n, i;
  if (t.isZero()) return t;
  (n = t.d.length),
    n < 32
      ? ((r = Math.ceil(n / 3)), (i = (1 / fn(4, r)).toString()))
      : ((r = 16), (i = '2.3283064365386962890625e-10')),
    (e.precision += r),
    (t = Tt(e, 1, t.times(i), new e(1)));
  for (var o = r; o--; ) {
    var s = t.times(t);
    t = s.times(s).minus(s).times(8).plus(1);
  }
  return (e.precision -= r), t;
}
l(tp, 'cosine');
var $ = (function () {
  function e(n, i, o) {
    var s,
      a = 0,
      u = n.length;
    for (n = n.slice(); u--; )
      (s = n[u] * i + a), (n[u] = s % o | 0), (a = (s / o) | 0);
    return a && n.unshift(a), n;
  }
  l(e, 'multiplyInteger');
  function t(n, i, o, s) {
    var a, u;
    if (o != s) u = o > s ? 1 : -1;
    else
      for (a = u = 0; a < o; a++)
        if (n[a] != i[a]) {
          u = n[a] > i[a] ? 1 : -1;
          break;
        }
    return u;
  }
  l(t, 'compare');
  function r(n, i, o, s) {
    for (var a = 0; o--; )
      (n[o] -= a), (a = n[o] < i[o] ? 1 : 0), (n[o] = a * s + n[o] - i[o]);
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return (
    l(r, 'subtract'),
    function (n, i, o, s, a, u) {
      var c,
        p,
        f,
        d,
        m,
        h,
        g,
        w,
        y,
        x,
        b,
        E,
        T,
        C,
        A,
        F,
        B,
        q,
        z,
        yt,
        Wr = n.constructor,
        pi = n.s == i.s ? 1 : -1,
        X = n.d,
        L = i.d;
      if (!X || !X[0] || !L || !L[0])
        return new Wr(
          !n.s || !i.s || (X ? L && X[0] == L[0] : !L)
            ? NaN
            : (X && X[0] == 0) || !L
            ? pi * 0
            : pi / 0,
        );
      for (
        u
          ? ((m = 1), (p = n.e - i.e))
          : ((u = Ae), (m = O), (p = Z(n.e / m) - Z(i.e / m))),
          z = L.length,
          B = X.length,
          y = new Wr(pi),
          x = y.d = [],
          f = 0;
        L[f] == (X[f] || 0);
        f++
      );
      if (
        (L[f] > (X[f] || 0) && p--,
        o == null
          ? ((C = o = Wr.precision), (s = Wr.rounding))
          : a
          ? (C = o + (n.e - i.e) + 1)
          : (C = o),
        C < 0)
      )
        x.push(1), (h = !0);
      else {
        if (((C = (C / m + 2) | 0), (f = 0), z == 1)) {
          for (d = 0, L = L[0], C++; (f < B || d) && C--; f++)
            (A = d * u + (X[f] || 0)), (x[f] = (A / L) | 0), (d = A % L | 0);
          h = d || f < B;
        } else {
          for (
            d = (u / (L[0] + 1)) | 0,
              d > 1 &&
                ((L = e(L, d, u)),
                (X = e(X, d, u)),
                (z = L.length),
                (B = X.length)),
              F = z,
              b = X.slice(0, z),
              E = b.length;
            E < z;

          )
            b[E++] = 0;
          (yt = L.slice()), yt.unshift(0), (q = L[0]), L[1] >= u / 2 && ++q;
          do
            (d = 0),
              (c = t(L, b, z, E)),
              c < 0
                ? ((T = b[0]),
                  z != E && (T = T * u + (b[1] || 0)),
                  (d = (T / q) | 0),
                  d > 1
                    ? (d >= u && (d = u - 1),
                      (g = e(L, d, u)),
                      (w = g.length),
                      (E = b.length),
                      (c = t(g, b, w, E)),
                      c == 1 && (d--, r(g, z < w ? yt : L, w, u)))
                    : (d == 0 && (c = d = 1), (g = L.slice())),
                  (w = g.length),
                  w < E && g.unshift(0),
                  r(b, g, E, u),
                  c == -1 &&
                    ((E = b.length),
                    (c = t(L, b, z, E)),
                    c < 1 && (d++, r(b, z < E ? yt : L, E, u))),
                  (E = b.length))
                : c === 0 && (d++, (b = [0])),
              (x[f++] = d),
              c && b[0] ? (b[E++] = X[F] || 0) : ((b = [X[F]]), (E = 1));
          while ((F++ < B || b[0] !== void 0) && C--);
          h = b[0] !== void 0;
        }
        x[0] || x.shift();
      }
      if (m == 1) (y.e = p), (Ss = h);
      else {
        for (f = 1, d = x[0]; d >= 10; d /= 10) f++;
        (y.e = f + p * m - 1), S(y, a ? o + y.e + 1 : o, s, h);
      }
      return y;
    }
  );
})();
function S(e, t, r, n) {
  var i,
    o,
    s,
    a,
    u,
    c,
    p,
    f,
    d,
    m = e.constructor;
  e: if (t != null) {
    if (((f = e.d), !f)) return e;
    for (i = 1, a = f[0]; a >= 10; a /= 10) i++;
    if (((o = t - i), o < 0))
      (o += O),
        (s = t),
        (p = f[(d = 0)]),
        (u = (p / G(10, i - s - 1)) % 10 | 0);
    else if (((d = Math.ceil((o + 1) / O)), (a = f.length), d >= a))
      if (n) {
        for (; a++ <= d; ) f.push(0);
        (p = u = 0), (i = 1), (o %= O), (s = o - O + 1);
      } else break e;
    else {
      for (p = a = f[d], i = 1; a >= 10; a /= 10) i++;
      (o %= O),
        (s = o - O + i),
        (u = s < 0 ? 0 : (p / G(10, i - s - 1)) % 10 | 0);
    }
    if (
      ((n =
        n ||
        t < 0 ||
        f[d + 1] !== void 0 ||
        (s < 0 ? p : p % G(10, i - s - 1))),
      (c =
        r < 4
          ? (u || n) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : u > 5 ||
            (u == 5 &&
              (r == 4 ||
                n ||
                (r == 6 &&
                  (o > 0 ? (s > 0 ? p / G(10, i - s) : 0) : f[d - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7)))),
      t < 1 || !f[0])
    )
      return (
        (f.length = 0),
        c
          ? ((t -= e.e + 1), (f[0] = G(10, (O - (t % O)) % O)), (e.e = -t || 0))
          : (f[0] = e.e = 0),
        e
      );
    if (
      (o == 0
        ? ((f.length = d), (a = 1), d--)
        : ((f.length = d + 1),
          (a = G(10, O - o)),
          (f[d] = s > 0 ? ((p / G(10, i - s)) % G(10, s) | 0) * a : 0)),
      c)
    )
      for (;;)
        if (d == 0) {
          for (o = 1, s = f[0]; s >= 10; s /= 10) o++;
          for (s = f[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, f[0] == Ae && (f[0] = 1));
          break;
        } else {
          if (((f[d] += a), f[d] != Ae)) break;
          (f[d--] = 0), (a = 1);
        }
    for (o = f.length; f[--o] === 0; ) f.pop();
  }
  return (
    N &&
      (e.e > m.maxE
        ? ((e.d = null), (e.e = NaN))
        : e.e < m.minE && ((e.e = 0), (e.d = [0]))),
    e
  );
}
l(S, 'finalise');
function Me(e, t, r) {
  if (!e.isFinite()) return Fs(e);
  var n,
    i = e.e,
    o = H(e.d),
    s = o.length;
  return (
    t
      ? (r && (n = r - s) > 0
          ? (o = o.charAt(0) + '.' + o.slice(1) + Ve(n))
          : s > 1 && (o = o.charAt(0) + '.' + o.slice(1)),
        (o = o + (e.e < 0 ? 'e' : 'e+') + e.e))
      : i < 0
      ? ((o = '0.' + Ve(-i - 1) + o), r && (n = r - s) > 0 && (o += Ve(n)))
      : i >= s
      ? ((o += Ve(i + 1 - s)),
        r && (n = r - i - 1) > 0 && (o = o + '.' + Ve(n)))
      : ((n = i + 1) < s && (o = o.slice(0, n) + '.' + o.slice(n)),
        r && (n = r - s) > 0 && (i + 1 === s && (o += '.'), (o += Ve(n)))),
    o
  );
}
l(Me, 'finiteToString');
function pn(e, t) {
  var r = e[0];
  for (t *= O; r >= 10; r /= 10) t++;
  return t;
}
l(pn, 'getBase10Exponent');
function un(e, t, r) {
  if (t > ep) throw ((N = !0), r && (e.precision = r), Error(Cs));
  return S(new e(an), t, 1, !0);
}
l(un, 'getLn10');
function _e(e, t, r) {
  if (t > Si) throw Error(Cs);
  return S(new e(ln), t, r, !0);
}
l(_e, 'getPi');
function Rs(e) {
  var t = e.length - 1,
    r = t * O + 1;
  if (((t = e[t]), t)) {
    for (; t % 10 == 0; t /= 10) r--;
    for (t = e[0]; t >= 10; t /= 10) r++;
  }
  return r;
}
l(Rs, 'getPrecision');
function Ve(e) {
  for (var t = ''; e--; ) t += '0';
  return t;
}
l(Ve, 'getZeroString');
function Is(e, t, r, n) {
  var i,
    o = new e(1),
    s = Math.ceil(n / O + 4);
  for (N = !1; ; ) {
    if (
      (r % 2 && ((o = o.times(t)), As(o.d, s) && (i = !0)),
      (r = Z(r / 2)),
      r === 0)
    ) {
      (r = o.d.length - 1), i && o.d[r] === 0 && ++o.d[r];
      break;
    }
    (t = t.times(t)), As(t.d, s);
  }
  return (N = !0), o;
}
l(Is, 'intPow');
function _s(e) {
  return e.d[e.d.length - 1] & 1;
}
l(_s, 'isOdd');
function Ds(e, t, r) {
  for (var n, i = new e(t[0]), o = 0; ++o < t.length; )
    if (((n = new e(t[o])), n.s)) i[r](n) && (i = n);
    else {
      i = n;
      break;
    }
  return i;
}
l(Ds, 'maxOrMin');
function Ci(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    u,
    c = 0,
    p = 0,
    f = 0,
    d = e.constructor,
    m = d.rounding,
    h = d.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new d(
      e.d
        ? e.d[0]
          ? e.s < 0
            ? 0
            : 1 / 0
          : 1
        : e.s
        ? e.s < 0
          ? 0
          : e
        : 0 / 0,
    );
  for (
    t == null ? ((N = !1), (u = h)) : (u = t), a = new d(0.03125);
    e.e > -2;

  )
    (e = e.times(a)), (f += 5);
  for (
    n = ((Math.log(G(2, f)) / Math.LN10) * 2 + 5) | 0,
      u += n,
      r = o = s = new d(1),
      d.precision = u;
    ;

  ) {
    if (
      ((o = S(o.times(e), u, 1)),
      (r = r.times(++p)),
      (a = s.plus($(o, r, u, 1))),
      H(a.d).slice(0, u) === H(s.d).slice(0, u))
    ) {
      for (i = f; i--; ) s = S(s.times(s), u, 1);
      if (t == null)
        if (c < 3 && Zt(s.d, u - n, m, c))
          (d.precision = u += 10), (r = o = a = new d(1)), (p = 0), c++;
        else return S(s, (d.precision = h), m, (N = !0));
      else return (d.precision = h), s;
    }
    s = a;
  }
}
l(Ci, 'naturalExponential');
function Ke(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    u,
    c,
    p,
    f,
    d,
    m = 1,
    h = 10,
    g = e,
    w = g.d,
    y = g.constructor,
    x = y.rounding,
    b = y.precision;
  if (g.s < 0 || !w || !w[0] || (!g.e && w[0] == 1 && w.length == 1))
    return new y(w && !w[0] ? -1 / 0 : g.s != 1 ? NaN : w ? 0 : g);
  if (
    (t == null ? ((N = !1), (p = b)) : (p = t),
    (y.precision = p += h),
    (r = H(w)),
    (n = r.charAt(0)),
    Math.abs((o = g.e)) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (g = g.times(e)), (r = H(g.d)), (n = r.charAt(0)), m++;
    (o = g.e),
      n > 1 ? ((g = new y('0.' + r)), o++) : (g = new y(n + '.' + r.slice(1)));
  } else
    return (
      (c = un(y, p + 2, b).times(o + '')),
      (g = Ke(new y(n + '.' + r.slice(1)), p - h).plus(c)),
      (y.precision = b),
      t == null ? S(g, b, x, (N = !0)) : g
    );
  for (
    f = g,
      u = s = g = $(g.minus(1), g.plus(1), p, 1),
      d = S(g.times(g), p, 1),
      i = 3;
    ;

  ) {
    if (
      ((s = S(s.times(d), p, 1)),
      (c = u.plus($(s, new y(i), p, 1))),
      H(c.d).slice(0, p) === H(u.d).slice(0, p))
    )
      if (
        ((u = u.times(2)),
        o !== 0 && (u = u.plus(un(y, p + 2, b).times(o + ''))),
        (u = $(u, new y(m), p, 1)),
        t == null)
      )
        if (Zt(u.d, p - h, x, a))
          (y.precision = p += h),
            (c = s = g = $(f.minus(1), f.plus(1), p, 1)),
            (d = S(g.times(g), p, 1)),
            (i = a = 1);
        else return S(u, (y.precision = b), x, (N = !0));
      else return (y.precision = b), u;
    (u = c), (i += 2);
  }
}
l(Ke, 'naturalLogarithm');
function Fs(e) {
  return String((e.s * e.s) / 0);
}
l(Fs, 'nonFiniteToString');
function Oi(e, t) {
  var r, n, i;
  for (
    (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;
    n++
  );
  for (i = t.length; t.charCodeAt(i - 1) === 48; --i);
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (e.e = r = r - n - 1),
      (e.d = []),
      (n = (r + 1) % O),
      r < 0 && (n += O),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= O; n < i; )
        e.d.push(+t.slice(n, (n += O)));
      (t = t.slice(n)), (n = O - t.length);
    } else n -= i;
    for (; n--; ) t += '0';
    e.d.push(+t),
      N &&
        (e.e > e.constructor.maxE
          ? ((e.d = null), (e.e = NaN))
          : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
  } else (e.e = 0), (e.d = [0]);
  return e;
}
l(Oi, 'parseDecimal');
function rp(e, t) {
  var r, n, i, o, s, a, u, c, p;
  if (t.indexOf('_') > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, '$1')), Ns.test(t))) return Oi(e, t);
  } else if (t === 'Infinity' || t === 'NaN')
    return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e;
  if (zc.test(t)) (r = 16), (t = t.toLowerCase());
  else if (Yc.test(t)) r = 2;
  else if (Xc.test(t)) r = 8;
  else throw Error(Qe + t);
  for (
    o = t.search(/p/i),
      o > 0
        ? ((u = +t.slice(o + 1)), (t = t.substring(2, o)))
        : (t = t.slice(2)),
      o = t.indexOf('.'),
      s = o >= 0,
      n = e.constructor,
      s &&
        ((t = t.replace('.', '')),
        (a = t.length),
        (o = a - o),
        (i = Is(n, new n(r), o, o * 2))),
      c = sn(t, r, Ae),
      p = c.length - 1,
      o = p;
    c[o] === 0;
    --o
  )
    c.pop();
  return o < 0
    ? new n(e.s * 0)
    : ((e.e = pn(c, p)),
      (e.d = c),
      (N = !1),
      s && (e = $(e, i, a * 4)),
      u && (e = e.times(Math.abs(u) < 54 ? G(2, u) : ke.pow(2, u))),
      (N = !0),
      e);
}
l(rp, 'parseOther');
function np(e, t) {
  var r,
    n = t.d.length;
  if (n < 3) return t.isZero() ? t : Tt(e, 2, t, t);
  (r = 1.4 * Math.sqrt(n)),
    (r = r > 16 ? 16 : r | 0),
    (t = t.times(1 / fn(5, r))),
    (t = Tt(e, 2, t, t));
  for (var i, o = new e(5), s = new e(16), a = new e(20); r--; )
    (i = t.times(t)), (t = t.times(o.plus(i.times(s.times(i).minus(a)))));
  return t;
}
l(np, 'sine');
function Tt(e, t, r, n, i) {
  var o,
    s,
    a,
    u,
    c = 1,
    p = e.precision,
    f = Math.ceil(p / O);
  for (N = !1, u = r.times(r), a = new e(n); ; ) {
    if (
      ((s = $(a.times(u), new e(t++ * t++), p, 1)),
      (a = i ? n.plus(s) : n.minus(s)),
      (n = $(s.times(u), new e(t++ * t++), p, 1)),
      (s = a.plus(n)),
      s.d[f] !== void 0)
    ) {
      for (o = f; s.d[o] === a.d[o] && o--; );
      if (o == -1) break;
    }
    (o = a), (a = n), (n = s), (s = o), c++;
  }
  return (N = !0), (s.d.length = f + 1), s;
}
l(Tt, 'taylorSeries');
function fn(e, t) {
  for (var r = e; --t; ) r *= e;
  return r;
}
l(fn, 'tinyPow');
function ks(e, t) {
  var r,
    n = t.s < 0,
    i = _e(e, e.precision, 1),
    o = i.times(0.5);
  if (((t = t.abs()), t.lte(o))) return (Fe = n ? 4 : 1), t;
  if (((r = t.divToInt(i)), r.isZero())) Fe = n ? 3 : 2;
  else {
    if (((t = t.minus(r.times(i))), t.lte(o)))
      return (Fe = _s(r) ? (n ? 2 : 3) : n ? 4 : 1), t;
    Fe = _s(r) ? (n ? 1 : 4) : n ? 3 : 2;
  }
  return t.minus(i).abs();
}
l(ks, 'toLessThanHalfPi');
function Mi(e, t, r, n) {
  var i,
    o,
    s,
    a,
    u,
    c,
    p,
    f,
    d,
    m = e.constructor,
    h = r !== void 0;
  if (
    (h
      ? (ce(r, 1, He), n === void 0 ? (n = m.rounding) : ce(n, 0, 8))
      : ((r = m.precision), (n = m.rounding)),
    !e.isFinite())
  )
    p = Fs(e);
  else {
    for (
      p = Me(e),
        s = p.indexOf('.'),
        h
          ? ((i = 2), t == 16 ? (r = r * 4 - 3) : t == 8 && (r = r * 3 - 2))
          : (i = t),
        s >= 0 &&
          ((p = p.replace('.', '')),
          (d = new m(1)),
          (d.e = p.length - s),
          (d.d = sn(Me(d), 10, i)),
          (d.e = d.d.length)),
        f = sn(p, 10, i),
        o = u = f.length;
      f[--u] == 0;

    )
      f.pop();
    if (!f[0]) p = h ? '0p+0' : '0';
    else {
      if (
        (s < 0
          ? o--
          : ((e = new m(e)),
            (e.d = f),
            (e.e = o),
            (e = $(e, d, r, n, 0, i)),
            (f = e.d),
            (o = e.e),
            (c = Ss)),
        (s = f[r]),
        (a = i / 2),
        (c = c || f[r + 1] !== void 0),
        (c =
          n < 4
            ? (s !== void 0 || c) && (n === 0 || n === (e.s < 0 ? 3 : 2))
            : s > a ||
              (s === a &&
                (n === 4 ||
                  c ||
                  (n === 6 && f[r - 1] & 1) ||
                  n === (e.s < 0 ? 8 : 7)))),
        (f.length = r),
        c)
      )
        for (; ++f[--r] > i - 1; ) (f[r] = 0), r || (++o, f.unshift(1));
      for (u = f.length; !f[u - 1]; --u);
      for (s = 0, p = ''; s < u; s++) p += Ai.charAt(f[s]);
      if (h) {
        if (u > 1)
          if (t == 16 || t == 8) {
            for (s = t == 16 ? 4 : 3, --u; u % s; u++) p += '0';
            for (f = sn(p, i, t), u = f.length; !f[u - 1]; --u);
            for (s = 1, p = '1.'; s < u; s++) p += Ai.charAt(f[s]);
          } else p = p.charAt(0) + '.' + p.slice(1);
        p = p + (o < 0 ? 'p' : 'p+') + o;
      } else if (o < 0) {
        for (; ++o; ) p = '0' + p;
        p = '0.' + p;
      } else if (++o > u) for (o -= u; o--; ) p += '0';
      else o < u && (p = p.slice(0, o) + '.' + p.slice(o));
    }
    p = (t == 16 ? '0x' : t == 2 ? '0b' : t == 8 ? '0o' : '') + p;
  }
  return e.s < 0 ? '-' + p : p;
}
l(Mi, 'toStringBinary');
function As(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
l(As, 'truncate');
function ip(e) {
  return new this(e).abs();
}
l(ip, 'abs');
function op(e) {
  return new this(e).acos();
}
l(op, 'acos');
function sp(e) {
  return new this(e).acosh();
}
l(sp, 'acosh');
function ap(e, t) {
  return new this(e).plus(t);
}
l(ap, 'add');
function lp(e) {
  return new this(e).asin();
}
l(lp, 'asin');
function up(e) {
  return new this(e).asinh();
}
l(up, 'asinh');
function cp(e) {
  return new this(e).atan();
}
l(cp, 'atan');
function pp(e) {
  return new this(e).atanh();
}
l(pp, 'atanh');
function fp(e, t) {
  (e = new this(e)), (t = new this(t));
  var r,
    n = this.precision,
    i = this.rounding,
    o = n + 4;
  return (
    !e.s || !t.s
      ? (r = new this(NaN))
      : !e.d && !t.d
      ? ((r = _e(this, o, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s))
      : !t.d || e.isZero()
      ? ((r = t.s < 0 ? _e(this, n, i) : new this(0)), (r.s = e.s))
      : !e.d || t.isZero()
      ? ((r = _e(this, o, 1).times(0.5)), (r.s = e.s))
      : t.s < 0
      ? ((this.precision = o),
        (this.rounding = 1),
        (r = this.atan($(e, t, o, 1))),
        (t = _e(this, o, 1)),
        (this.precision = n),
        (this.rounding = i),
        (r = e.s < 0 ? r.minus(t) : r.plus(t)))
      : (r = this.atan($(e, t, o, 1))),
    r
  );
}
l(fp, 'atan2');
function dp(e) {
  return new this(e).cbrt();
}
l(dp, 'cbrt');
function mp(e) {
  return S((e = new this(e)), e.e + 1, 2);
}
l(mp, 'ceil');
function gp(e, t, r) {
  return new this(e).clamp(t, r);
}
l(gp, 'clamp');
function hp(e) {
  if (!e || typeof e != 'object') throw Error(cn + 'Object expected');
  var t,
    r,
    n,
    i = e.defaults === !0,
    o = [
      'precision',
      1,
      He,
      'rounding',
      0,
      8,
      'toExpNeg',
      -vt,
      0,
      'toExpPos',
      0,
      vt,
      'maxE',
      0,
      vt,
      'minE',
      -vt,
      0,
      'modulo',
      0,
      9,
    ];
  for (t = 0; t < o.length; t += 3)
    if (((r = o[t]), i && (this[r] = Pi[r]), (n = e[r]) !== void 0))
      if (Z(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(Qe + r + ': ' + n);
  if (((r = 'crypto'), i && (this[r] = Pi[r]), (n = e[r]) !== void 0))
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (
          typeof crypto < 'u' &&
          crypto &&
          (crypto.getRandomValues || crypto.randomBytes)
        )
          this[r] = !0;
        else throw Error(Os);
      else this[r] = !1;
    else throw Error(Qe + r + ': ' + n);
  return this;
}
l(hp, 'config');
function yp(e) {
  return new this(e).cos();
}
l(yp, 'cos');
function bp(e) {
  return new this(e).cosh();
}
l(bp, 'cosh');
function Ls(e) {
  var t, r, n;
  function i(o) {
    var s,
      a,
      u,
      c = this;
    if (!(c instanceof i)) return new i(o);
    if (((c.constructor = i), Ps(o))) {
      (c.s = o.s),
        N
          ? !o.d || o.e > i.maxE
            ? ((c.e = NaN), (c.d = null))
            : o.e < i.minE
            ? ((c.e = 0), (c.d = [0]))
            : ((c.e = o.e), (c.d = o.d.slice()))
          : ((c.e = o.e), (c.d = o.d ? o.d.slice() : o.d));
      return;
    }
    if (((u = typeof o), u === 'number')) {
      if (o === 0) {
        (c.s = 1 / o < 0 ? -1 : 1), (c.e = 0), (c.d = [0]);
        return;
      }
      if ((o < 0 ? ((o = -o), (c.s = -1)) : (c.s = 1), o === ~~o && o < 1e7)) {
        for (s = 0, a = o; a >= 10; a /= 10) s++;
        N
          ? s > i.maxE
            ? ((c.e = NaN), (c.d = null))
            : s < i.minE
            ? ((c.e = 0), (c.d = [0]))
            : ((c.e = s), (c.d = [o]))
          : ((c.e = s), (c.d = [o]));
        return;
      } else if (o * 0 !== 0) {
        o || (c.s = NaN), (c.e = NaN), (c.d = null);
        return;
      }
      return Oi(c, o.toString());
    } else if (u !== 'string') throw Error(Qe + o);
    return (
      (a = o.charCodeAt(0)) === 45
        ? ((o = o.slice(1)), (c.s = -1))
        : (a === 43 && (o = o.slice(1)), (c.s = 1)),
      Ns.test(o) ? Oi(c, o) : rp(c, o)
    );
  }
  if (
    (l(i, 'Decimal'),
    (i.prototype = v),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.EUCLID = 9),
    (i.config = i.set = hp),
    (i.clone = Ls),
    (i.isDecimal = Ps),
    (i.abs = ip),
    (i.acos = op),
    (i.acosh = sp),
    (i.add = ap),
    (i.asin = lp),
    (i.asinh = up),
    (i.atan = cp),
    (i.atanh = pp),
    (i.atan2 = fp),
    (i.cbrt = dp),
    (i.ceil = mp),
    (i.clamp = gp),
    (i.cos = yp),
    (i.cosh = bp),
    (i.div = Ep),
    (i.exp = wp),
    (i.floor = xp),
    (i.hypot = vp),
    (i.ln = Tp),
    (i.log = _p),
    (i.log10 = Pp),
    (i.log2 = Ap),
    (i.max = Sp),
    (i.min = Cp),
    (i.mod = Op),
    (i.mul = Mp),
    (i.pow = Np),
    (i.random = Rp),
    (i.round = Ip),
    (i.sign = Dp),
    (i.sin = Fp),
    (i.sinh = kp),
    (i.sqrt = Lp),
    (i.sub = $p),
    (i.sum = jp),
    (i.tan = Bp),
    (i.tanh = qp),
    (i.trunc = Up),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      n = [
        'precision',
        'rounding',
        'toExpNeg',
        'toExpPos',
        'maxE',
        'minE',
        'modulo',
        'crypto',
      ],
        t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
  return i.config(e), i;
}
l(Ls, 'clone');
function Ep(e, t) {
  return new this(e).div(t);
}
l(Ep, 'div');
function wp(e) {
  return new this(e).exp();
}
l(wp, 'exp');
function xp(e) {
  return S((e = new this(e)), e.e + 1, 3);
}
l(xp, 'floor');
function vp() {
  var e,
    t,
    r = new this(0);
  for (N = !1, e = 0; e < arguments.length; )
    if (((t = new this(arguments[e++])), t.d)) r.d && (r = r.plus(t.times(t)));
    else {
      if (t.s) return (N = !0), new this(1 / 0);
      r = t;
    }
  return (N = !0), r.sqrt();
}
l(vp, 'hypot');
function Ps(e) {
  return e instanceof ke || (e && e.toStringTag === Ms) || !1;
}
l(Ps, 'isDecimalInstance');
function Tp(e) {
  return new this(e).ln();
}
l(Tp, 'ln');
function _p(e, t) {
  return new this(e).log(t);
}
l(_p, 'log');
function Ap(e) {
  return new this(e).log(2);
}
l(Ap, 'log2');
function Pp(e) {
  return new this(e).log(10);
}
l(Pp, 'log10');
function Sp() {
  return Ds(this, arguments, 'lt');
}
l(Sp, 'max');
function Cp() {
  return Ds(this, arguments, 'gt');
}
l(Cp, 'min');
function Op(e, t) {
  return new this(e).mod(t);
}
l(Op, 'mod');
function Mp(e, t) {
  return new this(e).mul(t);
}
l(Mp, 'mul');
function Np(e, t) {
  return new this(e).pow(t);
}
l(Np, 'pow');
function Rp(e) {
  var t,
    r,
    n,
    i,
    o = 0,
    s = new this(1),
    a = [];
  if (
    (e === void 0 ? (e = this.precision) : ce(e, 1, He),
    (n = Math.ceil(e / O)),
    this.crypto)
  )
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; )
        (i = t[o]),
          i >= 429e7
            ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (a[o++] = i % 1e7);
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes((n *= 4)); o < n; )
        (i =
          t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24)),
          i >= 214e7
            ? crypto.randomBytes(4).copy(t, o)
            : (a.push(i % 1e7), (o += 4));
      o = n / 4;
    } else throw Error(Os);
  else for (; o < n; ) a[o++] = (Math.random() * 1e7) | 0;
  for (
    n = a[--o],
      e %= O,
      n && e && ((i = G(10, O - e)), (a[o] = ((n / i) | 0) * i));
    a[o] === 0;
    o--
  )
    a.pop();
  if (o < 0) (r = 0), (a = [0]);
  else {
    for (r = -1; a[0] === 0; r -= O) a.shift();
    for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
    n < O && (r -= O - n);
  }
  return (s.e = r), (s.d = a), s;
}
l(Rp, 'random');
function Ip(e) {
  return S((e = new this(e)), e.e + 1, this.rounding);
}
l(Ip, 'round');
function Dp(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN;
}
l(Dp, 'sign');
function Fp(e) {
  return new this(e).sin();
}
l(Fp, 'sin');
function kp(e) {
  return new this(e).sinh();
}
l(kp, 'sinh');
function Lp(e) {
  return new this(e).sqrt();
}
l(Lp, 'sqrt');
function $p(e, t) {
  return new this(e).sub(t);
}
l($p, 'sub');
function jp() {
  var e = 0,
    t = arguments,
    r = new this(t[e]);
  for (N = !1; r.s && ++e < t.length; ) r = r.plus(t[e]);
  return (N = !0), S(r, this.precision, this.rounding);
}
l(jp, 'sum');
function Bp(e) {
  return new this(e).tan();
}
l(Bp, 'tan');
function qp(e) {
  return new this(e).tanh();
}
l(qp, 'tanh');
function Up(e) {
  return S((e = new this(e)), e.e + 1, 1);
}
l(Up, 'trunc');
v[Symbol.for('nodejs.util.inspect.custom')] = v.toString;
v[Symbol.toStringTag] = 'Decimal';
var ke = (v.constructor = Ls(Pi));
an = new ke(an);
ln = new ke(ln);
var Pe = ke;
var Ii = M(er()),
  Us = M(Ni());
var Ee = class {
  constructor(t, r, n, i) {
    (this.modelName = t),
      (this.name = r),
      (this.typeName = n),
      (this.isList = i);
  }
  _toGraphQLInputType() {
    return `${
      this.isList ? `List${this.typeName}` : this.typeName
    }FieldRefInput<${this.modelName}>`;
  }
};
l(Ee, 'FieldRefImpl');
var Bs = [
    'JsonNullValueInput',
    'NullableJsonNullValueInput',
    'JsonNullValueFilter',
  ],
  dn = Symbol(),
  Ri = new WeakMap(),
  me = class {
    constructor(t) {
      t === dn
        ? Ri.set(this, `Prisma.${this._getName()}`)
        : Ri.set(
            this,
            `new Prisma.${this._getNamespace()}.${this._getName()}()`,
          );
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return Ri.get(this);
    }
  };
l(me, 'ObjectEnumValue');
var _t = class extends me {
  _getNamespace() {
    return 'NullTypes';
  }
};
l(_t, 'NullTypesEnumValue');
var tr = class extends _t {};
l(tr, 'DbNull');
var rr = class extends _t {};
l(rr, 'JsonNull');
var nr = class extends _t {};
l(nr, 'AnyNull');
var mn = {
  classes: { DbNull: tr, JsonNull: rr, AnyNull: nr },
  instances: { DbNull: new tr(dn), JsonNull: new rr(dn), AnyNull: new nr(dn) },
};
function gn(e) {
  return ke.isDecimal(e)
    ? !0
    : e !== null &&
        typeof e == 'object' &&
        typeof e.s == 'number' &&
        typeof e.e == 'number' &&
        Array.isArray(e.d);
}
l(gn, 'isDecimalJsLike');
function qs(e) {
  if (ke.isDecimal(e)) return JSON.stringify(String(e));
  let t = new ke(0);
  return (t.d = e.d), (t.e = e.e), (t.s = e.s), JSON.stringify(String(t));
}
l(qs, 'stringifyDecimalJsLike');
var ee = l((e, t) => {
    let r = {};
    for (let n of e) {
      let i = n[t];
      r[i] = n;
    }
    return r;
  }, 'keyBy'),
  At = {
    String: !0,
    Int: !0,
    Float: !0,
    Boolean: !0,
    Long: !0,
    DateTime: !0,
    ID: !0,
    UUID: !0,
    Json: !0,
    Bytes: !0,
    Decimal: !0,
    BigInt: !0,
  };
var Gp = {
  string: 'String',
  boolean: 'Boolean',
  object: 'Json',
  symbol: 'Symbol',
};
function Pt(e) {
  return typeof e == 'string' ? e : e.name;
}
l(Pt, 'stringifyGraphQLType');
function or(e, t) {
  return t ? `List<${e}>` : e;
}
l(or, 'wrapWithList');
var Vp =
    /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/,
  Kp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function St(e, t) {
  let r = t?.type;
  if (e === null) return 'null';
  if (Object.prototype.toString.call(e) === '[object BigInt]') return 'BigInt';
  if (Pe.isDecimal(e) || (r === 'Decimal' && gn(e))) return 'Decimal';
  if (Buffer.isBuffer(e)) return 'Bytes';
  if (Qp(e, t)) return r.name;
  if (e instanceof me) return e._getName();
  if (e instanceof Ee) return e._toGraphQLInputType();
  if (Array.isArray(e)) {
    let i = e.reduce((o, s) => {
      let a = St(s, t);
      return o.includes(a) || o.push(a), o;
    }, []);
    return (
      i.includes('Float') && i.includes('Int') && (i = ['Float']),
      `List<${i.join(' | ')}>`
    );
  }
  let n = typeof e;
  if (n === 'number') return Math.trunc(e) === e ? 'Int' : 'Float';
  if (Object.prototype.toString.call(e) === '[object Date]') return 'DateTime';
  if (n === 'string') {
    if (Kp.test(e)) return 'UUID';
    if (new Date(e).toString() === 'Invalid Date') return 'String';
    if (Vp.test(e)) return 'DateTime';
  }
  return Gp[n];
}
l(St, 'getGraphQLType');
function Qp(e, t) {
  let r = t?.type;
  if (!Wp(r)) return !1;
  if (t?.namespace === 'prisma' && Bs.includes(r.name)) {
    let n = e?.constructor?.name;
    return (
      typeof n == 'string' && mn.instances[n] === e && r.values.includes(n)
    );
  }
  return typeof e == 'string' && r.values.includes(e);
}
l(Qp, 'isValidEnumValue');
function hn(e, t) {
  return t.reduce(
    (n, i) => {
      let o = (0, Us.default)(e, i);
      return o < n.distance ? { distance: o, str: i } : n;
    },
    {
      distance: Math.min(
        Math.floor(e.length) * 1.1,
        ...t.map((n) => n.length * 3),
      ),
      str: null,
    },
  ).str;
}
l(hn, 'getSuggestion');
function Ct(e, t = !1) {
  if (typeof e == 'string') return e;
  if (e.values)
    return `enum ${e.name} {
${(0, Ii.default)(e.values.join(', '), 2)}
}`;
  {
    let r = (0, Ii.default)(
      e.fields.map((n) => {
        let i = `${n.name}`,
          o = `${t ? We.default.green(i) : i}${
            n.isRequired ? '' : '?'
          }: ${We.default.white(
            n.inputTypes
              .map((s) => or(Hp(s.type) ? s.type.name : Pt(s.type), s.isList))
              .join(' | '),
          )}`;
        return n.isRequired ? o : We.default.dim(o);
      }).join(`
`),
      2,
    );
    return `${We.default.dim('type')} ${We.default.bold.dim(
      e.name,
    )} ${We.default.dim('{')}
${r}
${We.default.dim('}')}`;
  }
}
l(Ct, 'stringifyInputType');
function Hp(e) {
  return typeof e != 'string';
}
l(Hp, 'argIsInputType');
function ir(e) {
  return typeof e == 'string' ? (e === 'Null' ? 'null' : e) : e.name;
}
l(ir, 'getInputTypeName');
function sr(e) {
  return typeof e == 'string' ? e : e.name;
}
l(sr, 'getOutputTypeName');
function Di(e, t, r = !1) {
  if (typeof e == 'string') return e === 'Null' ? 'null' : e;
  if (e.values) return e.values.join(' | ');
  let n = e,
    i =
      t &&
      n.fields.every(
        (o) =>
          o.inputTypes[0].location === 'inputObjectTypes' ||
          o.inputTypes[1]?.location === 'inputObjectTypes',
      );
  return r
    ? ir(e)
    : n.fields.reduce((o, s) => {
        let a = '';
        return (
          !i && !s.isRequired
            ? (a = s.inputTypes.map((u) => ir(u.type)).join(' | '))
            : (a = s.inputTypes
                .map((u) => Di(u.type, s.isRequired, !0))
                .join(' | ')),
          (o[s.name + (s.isRequired ? '' : '?')] = a),
          o
        );
      }, {});
}
l(Di, 'inputTypeToJson');
function Gs(e, t, r) {
  let n = {};
  for (let i of e) n[r(i)] = i;
  for (let i of t) {
    let o = r(i);
    n[o] || (n[o] = i);
  }
  return Object.values(n);
}
l(Gs, 'unionBy');
function yn(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1);
}
l(yn, 'lowerCase');
function Vs(e) {
  return e.endsWith('GroupByOutputType');
}
l(Vs, 'isGroupByOutputName');
function Wp(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    typeof e.name == 'string' &&
    Array.isArray(e.values)
  );
}
l(Wp, 'isSchemaEnum');
var ar = class {
  constructor({ datamodel: t }) {
    (this.datamodel = t),
      (this.datamodelEnumMap = this.getDatamodelEnumMap()),
      (this.modelMap = this.getModelMap()),
      (this.typeMap = this.getTypeMap()),
      (this.typeAndModelMap = this.getTypeModelMap());
  }
  getDatamodelEnumMap() {
    return ee(this.datamodel.enums, 'name');
  }
  getModelMap() {
    return { ...ee(this.datamodel.models, 'name') };
  }
  getTypeMap() {
    return { ...ee(this.datamodel.types, 'name') };
  }
  getTypeModelMap() {
    return { ...this.getTypeMap(), ...this.getModelMap() };
  }
};
l(ar, 'DMMFDatamodelHelper');
var lr = class {
  constructor({ mappings: t }) {
    (this.mappings = t), (this.mappingsMap = this.getMappingsMap());
  }
  getMappingsMap() {
    return ee(this.mappings.modelOperations, 'model');
  }
};
l(lr, 'DMMFMappingsHelper');
var ur = class {
  constructor({ schema: t }) {
    this.outputTypeToMergedOutputType = l(
      (t) => ({ ...t, fields: t.fields }),
      'outputTypeToMergedOutputType',
    );
    (this.schema = t),
      (this.enumMap = this.getEnumMap()),
      (this.queryType = this.getQueryType()),
      (this.mutationType = this.getMutationType()),
      (this.outputTypes = this.getOutputTypes()),
      (this.outputTypeMap = this.getMergedOutputTypeMap()),
      this.resolveOutputTypes(),
      (this.inputObjectTypes = this.schema.inputObjectTypes),
      (this.inputTypeMap = this.getInputTypeMap()),
      this.resolveInputTypes(),
      this.resolveFieldArgumentTypes(),
      (this.queryType = this.outputTypeMap.Query),
      (this.mutationType = this.outputTypeMap.Mutation),
      (this.rootFieldMap = this.getRootFieldMap());
  }
  get [Symbol.toStringTag]() {
    return 'DMMFClass';
  }
  resolveOutputTypes() {
    for (let t of this.outputTypes.model) {
      for (let r of t.fields)
        typeof r.outputType.type == 'string' &&
          !At[r.outputType.type] &&
          (r.outputType.type =
            this.outputTypeMap[r.outputType.type] ||
            this.outputTypeMap[r.outputType.type] ||
            this.enumMap[r.outputType.type] ||
            r.outputType.type);
      t.fieldMap = ee(t.fields, 'name');
    }
    for (let t of this.outputTypes.prisma) {
      for (let r of t.fields)
        typeof r.outputType.type == 'string' &&
          !At[r.outputType.type] &&
          (r.outputType.type =
            this.outputTypeMap[r.outputType.type] ||
            this.outputTypeMap[r.outputType.type] ||
            this.enumMap[r.outputType.type] ||
            r.outputType.type);
      t.fieldMap = ee(t.fields, 'name');
    }
  }
  resolveInputTypes() {
    let t = this.inputObjectTypes.prisma;
    this.inputObjectTypes.model && t.push(...this.inputObjectTypes.model);
    for (let r of t) {
      for (let n of r.fields)
        for (let i of n.inputTypes) {
          let o = i.type;
          typeof o == 'string' &&
            !At[o] &&
            (this.inputTypeMap[o] || this.enumMap[o]) &&
            (i.type = this.inputTypeMap[o] || this.enumMap[o] || o);
        }
      r.fieldMap = ee(r.fields, 'name');
    }
  }
  resolveFieldArgumentTypes() {
    for (let t of this.outputTypes.prisma)
      for (let r of t.fields)
        for (let n of r.args)
          for (let i of n.inputTypes) {
            let o = i.type;
            typeof o == 'string' &&
              !At[o] &&
              (i.type = this.inputTypeMap[o] || this.enumMap[o] || o);
          }
    for (let t of this.outputTypes.model)
      for (let r of t.fields)
        for (let n of r.args)
          for (let i of n.inputTypes) {
            let o = i.type;
            typeof o == 'string' &&
              !At[o] &&
              (i.type = this.inputTypeMap[o] || this.enumMap[o] || i.type);
          }
  }
  getQueryType() {
    return this.schema.outputObjectTypes.prisma.find((t) => t.name === 'Query');
  }
  getMutationType() {
    return this.schema.outputObjectTypes.prisma.find(
      (t) => t.name === 'Mutation',
    );
  }
  getOutputTypes() {
    return {
      model: this.schema.outputObjectTypes.model.map(
        this.outputTypeToMergedOutputType,
      ),
      prisma: this.schema.outputObjectTypes.prisma.map(
        this.outputTypeToMergedOutputType,
      ),
    };
  }
  getEnumMap() {
    return {
      ...ee(this.schema.enumTypes.prisma, 'name'),
      ...(this.schema.enumTypes.model
        ? ee(this.schema.enumTypes.model, 'name')
        : void 0),
    };
  }
  hasEnumInNamespace(t, r) {
    return this.schema.enumTypes[r]?.find((n) => n.name === t) !== void 0;
  }
  getMergedOutputTypeMap() {
    return {
      ...ee(this.outputTypes.model, 'name'),
      ...ee(this.outputTypes.prisma, 'name'),
    };
  }
  getInputTypeMap() {
    return {
      ...(this.schema.inputObjectTypes.model
        ? ee(this.schema.inputObjectTypes.model, 'name')
        : void 0),
      ...ee(this.schema.inputObjectTypes.prisma, 'name'),
    };
  }
  getRootFieldMap() {
    return {
      ...ee(this.queryType.fields, 'name'),
      ...ee(this.mutationType.fields, 'name'),
    };
  }
};
l(ur, 'DMMFSchemaHelper');
var Je = class {
  constructor(t) {
    return Object.assign(this, new ar(t), new lr(t));
  }
};
l(Je, 'BaseDMMFHelper');
mi(Je, [ar, lr]);
var Le = class {
  constructor(t) {
    return Object.assign(this, new Je(t), new ur(t));
  }
};
l(Le, 'DMMFHelper');
mi(Le, [Je, ur]);
var Ne;
((t) => {
  let e;
  ((b) => (
    (b.findUnique = 'findUnique'),
    (b.findUniqueOrThrow = 'findUniqueOrThrow'),
    (b.findFirst = 'findFirst'),
    (b.findFirstOrThrow = 'findFirstOrThrow'),
    (b.findMany = 'findMany'),
    (b.create = 'create'),
    (b.createMany = 'createMany'),
    (b.update = 'update'),
    (b.updateMany = 'updateMany'),
    (b.upsert = 'upsert'),
    (b.delete = 'delete'),
    (b.deleteMany = 'deleteMany'),
    (b.groupBy = 'groupBy'),
    (b.count = 'count'),
    (b.aggregate = 'aggregate'),
    (b.findRaw = 'findRaw'),
    (b.aggregateRaw = 'aggregateRaw')
  ))((e = t.ModelAction || (t.ModelAction = {})));
})(Ne || (Ne = {}));
var vn = M(zs());
var hf = 100,
  cr = [];
typeof process < 'u' &&
  typeof process.stderr?.write != 'function' &&
  (vn.default.log = console.debug ?? console.log);
function yf(e) {
  let t = (0, vn.default)(e),
    r = Object.assign(
      (...n) => (
        (t.log = r.log),
        n.length !== 0 && cr.push([e, ...n]),
        cr.length > hf && cr.shift(),
        t('', ...n)
      ),
      t,
    );
  return r;
}
l(yf, 'debugCall');
var Li = Object.assign(yf, vn.default);
function Xs(e = 7500) {
  let t = cr.map((r) =>
    r.map((n) => (typeof n == 'string' ? n : JSON.stringify(n))).join(' '),
  ).join(`
`);
  return t.length < e ? t : t.slice(-e);
}
l(Xs, 'getLogs');
function Zs() {
  cr.length = 0;
}
l(Zs, 'clearLogs');
var U = Li;
var ea = typeof globalThis == 'object' ? globalThis : global;
var Ye = '1.4.0';
var ta = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function bf(e) {
  var t = new Set([e]),
    r = new Set(),
    n = e.match(ta);
  if (!n)
    return function () {
      return !1;
    };
  var i = { major: +n[1], minor: +n[2], patch: +n[3], prerelease: n[4] };
  if (i.prerelease != null)
    return l(function (u) {
      return u === e;
    }, 'isExactmatch');
  function o(a) {
    return r.add(a), !1;
  }
  l(o, '_reject');
  function s(a) {
    return t.add(a), !0;
  }
  return (
    l(s, '_accept'),
    l(function (u) {
      if (t.has(u)) return !0;
      if (r.has(u)) return !1;
      var c = u.match(ta);
      if (!c) return o(u);
      var p = { major: +c[1], minor: +c[2], patch: +c[3], prerelease: c[4] };
      return p.prerelease != null || i.major !== p.major
        ? o(u)
        : i.major === 0
        ? i.minor === p.minor && i.patch <= p.patch
          ? s(u)
          : o(u)
        : i.minor <= p.minor
        ? s(u)
        : o(u);
    }, 'isCompatible')
  );
}
l(bf, '_makeCompatibilityCheck');
var ra = bf(Ye);
var Ef = Ye.split('.')[0],
  pr = Symbol.for('opentelemetry.js.api.' + Ef),
  fr = ea;
function Tn(e, t, r, n) {
  var i;
  n === void 0 && (n = !1);
  var o = (fr[pr] =
    (i = fr[pr]) !== null && i !== void 0 ? i : { version: Ye });
  if (!n && o[e]) {
    var s = new Error(
      '@opentelemetry/api: Attempted duplicate registration of API: ' + e,
    );
    return r.error(s.stack || s.message), !1;
  }
  if (o.version !== Ye) {
    var s = new Error(
      '@opentelemetry/api: All API registration versions must match',
    );
    return r.error(s.stack || s.message), !1;
  }
  return (
    (o[e] = t),
    r.debug(
      '@opentelemetry/api: Registered a global for ' + e + ' v' + Ye + '.',
    ),
    !0
  );
}
l(Tn, 'registerGlobal');
function ct(e) {
  var t,
    r,
    n = (t = fr[pr]) === null || t === void 0 ? void 0 : t.version;
  if (!(!n || !ra(n)))
    return (r = fr[pr]) === null || r === void 0 ? void 0 : r[e];
}
l(ct, 'getGlobal');
function _n(e, t) {
  t.debug(
    '@opentelemetry/api: Unregistering a global for ' + e + ' v' + Ye + '.',
  );
  var r = fr[pr];
  r && delete r[e];
}
l(_n, 'unregisterGlobal');
var wf = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  xf = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  na = (function () {
    function e(t) {
      this._namespace = t.namespace || 'DiagComponentLogger';
    }
    return (
      l(e, 'DiagComponentLogger'),
      (e.prototype.debug = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return dr('debug', this._namespace, t);
      }),
      (e.prototype.error = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return dr('error', this._namespace, t);
      }),
      (e.prototype.info = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return dr('info', this._namespace, t);
      }),
      (e.prototype.warn = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return dr('warn', this._namespace, t);
      }),
      (e.prototype.verbose = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return dr('verbose', this._namespace, t);
      }),
      e
    );
  })();
function dr(e, t, r) {
  var n = ct('diag');
  if (!!n) return r.unshift(t), n[e].apply(n, xf([], wf(r), !1));
}
l(dr, 'logProxy');
var se;
(function (e) {
  (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.ERROR = 30)] = 'ERROR'),
    (e[(e.WARN = 50)] = 'WARN'),
    (e[(e.INFO = 60)] = 'INFO'),
    (e[(e.DEBUG = 70)] = 'DEBUG'),
    (e[(e.VERBOSE = 80)] = 'VERBOSE'),
    (e[(e.ALL = 9999)] = 'ALL');
})(se || (se = {}));
function ia(e, t) {
  e < se.NONE ? (e = se.NONE) : e > se.ALL && (e = se.ALL), (t = t || {});
  function r(n, i) {
    var o = t[n];
    return typeof o == 'function' && e >= i ? o.bind(t) : function () {};
  }
  return (
    l(r, '_filterFunc'),
    {
      error: r('error', se.ERROR),
      warn: r('warn', se.WARN),
      info: r('info', se.INFO),
      debug: r('debug', se.DEBUG),
      verbose: r('verbose', se.VERBOSE),
    }
  );
}
l(ia, 'createLogLevelDiagLogger');
var vf = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Tf = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  _f = 'diag',
  $i = (function () {
    function e() {
      function t(i) {
        return function () {
          for (var o = [], s = 0; s < arguments.length; s++)
            o[s] = arguments[s];
          var a = ct('diag');
          if (!!a) return a[i].apply(a, Tf([], vf(o), !1));
        };
      }
      l(t, '_logProxy');
      var r = this,
        n = l(function (i, o) {
          var s, a, u;
          if ((o === void 0 && (o = { logLevel: se.INFO }), i === r)) {
            var c = new Error(
              'Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation',
            );
            return (
              r.error((s = c.stack) !== null && s !== void 0 ? s : c.message),
              !1
            );
          }
          typeof o == 'number' && (o = { logLevel: o });
          var p = ct('diag'),
            f = ia((a = o.logLevel) !== null && a !== void 0 ? a : se.INFO, i);
          if (p && !o.suppressOverrideMessage) {
            var d =
              (u = new Error().stack) !== null && u !== void 0
                ? u
                : '<failed to generate stacktrace>';
            p.warn('Current logger will be overwritten from ' + d),
              f.warn(
                'Current logger will overwrite one already registered from ' +
                  d,
              );
          }
          return Tn('diag', f, r, !0);
        }, 'setLogger');
      (r.setLogger = n),
        (r.disable = function () {
          _n(_f, r);
        }),
        (r.createComponentLogger = function (i) {
          return new na(i);
        }),
        (r.verbose = t('verbose')),
        (r.debug = t('debug')),
        (r.info = t('info')),
        (r.warn = t('warn')),
        (r.error = t('error'));
    }
    return (
      l(e, 'DiagAPI'),
      (e.instance = function () {
        return this._instance || (this._instance = new e()), this._instance;
      }),
      e
    );
  })();
var Af = (function () {
    function e(t) {
      var r = this;
      (r._currentContext = t ? new Map(t) : new Map()),
        (r.getValue = function (n) {
          return r._currentContext.get(n);
        }),
        (r.setValue = function (n, i) {
          var o = new e(r._currentContext);
          return o._currentContext.set(n, i), o;
        }),
        (r.deleteValue = function (n) {
          var i = new e(r._currentContext);
          return i._currentContext.delete(n), i;
        });
    }
    return l(e, 'BaseContext'), e;
  })(),
  oa = new Af();
var Pf = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Sf = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  sa = (function () {
    function e() {}
    return (
      l(e, 'NoopContextManager'),
      (e.prototype.active = function () {
        return oa;
      }),
      (e.prototype.with = function (t, r, n) {
        for (var i = [], o = 3; o < arguments.length; o++)
          i[o - 3] = arguments[o];
        return r.call.apply(r, Sf([n], Pf(i), !1));
      }),
      (e.prototype.bind = function (t, r) {
        return r;
      }),
      (e.prototype.enable = function () {
        return this;
      }),
      (e.prototype.disable = function () {
        return this;
      }),
      e
    );
  })();
var Cf = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Of = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  ji = 'context',
  Mf = new sa(),
  aa = (function () {
    function e() {}
    return (
      l(e, 'ContextAPI'),
      (e.getInstance = function () {
        return this._instance || (this._instance = new e()), this._instance;
      }),
      (e.prototype.setGlobalContextManager = function (t) {
        return Tn(ji, t, $i.instance());
      }),
      (e.prototype.active = function () {
        return this._getContextManager().active();
      }),
      (e.prototype.with = function (t, r, n) {
        for (var i, o = [], s = 3; s < arguments.length; s++)
          o[s - 3] = arguments[s];
        return (i = this._getContextManager()).with.apply(
          i,
          Of([t, r, n], Cf(o), !1),
        );
      }),
      (e.prototype.bind = function (t, r) {
        return this._getContextManager().bind(t, r);
      }),
      (e.prototype._getContextManager = function () {
        return ct(ji) || Mf;
      }),
      (e.prototype.disable = function () {
        this._getContextManager().disable(), _n(ji, $i.instance());
      }),
      e
    );
  })();
var An = aa.getInstance();
var Wf = M(Bi());
var Sn = 'libquery_engine';
function mr(e, t) {
  let r = t === 'url';
  return e.includes('windows')
    ? r
      ? 'query_engine.dll.node'
      : `query_engine-${e}.dll.node`
    : e.includes('darwin')
    ? r
      ? `${Sn}.dylib.node`
      : `${Sn}-${e}.dylib.node`
    : r
    ? `${Sn}.so.node`
    : `${Sn}-${e}.so.node`;
}
l(mr, 'getNodeAPIName');
var Ta = M(require('child_process')),
  _a = M(require('fs')),
  Aa = M(require('os'));
var Cn = Symbol('@ts-pattern/matcher'),
  ua = '@ts-pattern/anonymous-select-key',
  ca = l(function (e) {
    return Boolean(e && typeof e == 'object');
  }, 'e'),
  qi = l(function (e) {
    return e && !!e[Cn];
  }, 'r'),
  Rf = l(function e(t, r, n) {
    if (ca(t)) {
      if (qi(t)) {
        var i = t[Cn]().match(r),
          o = i.matched,
          s = i.selections;
        return (
          o &&
            s &&
            Object.keys(s).forEach(function (u) {
              return n(u, s[u]);
            }),
          o
        );
      }
      if (!ca(r)) return !1;
      if (Array.isArray(t))
        return (
          !!Array.isArray(r) &&
          t.length === r.length &&
          t.every(function (u, c) {
            return e(u, r[c], n);
          })
        );
      if (t instanceof Map)
        return (
          r instanceof Map &&
          Array.from(t.keys()).every(function (u) {
            return e(t.get(u), r.get(u), n);
          })
        );
      if (t instanceof Set) {
        if (!(r instanceof Set)) return !1;
        if (t.size === 0) return r.size === 0;
        if (t.size === 1) {
          var a = Array.from(t.values())[0];
          return qi(a)
            ? Array.from(r.values()).every(function (u) {
                return e(a, u, n);
              })
            : r.has(a);
        }
        return Array.from(t.values()).every(function (u) {
          return r.has(u);
        });
      }
      return Object.keys(t).every(function (u) {
        var c,
          p = t[u];
        return (
          (u in r || (qi((c = p)) && c[Cn]().matcherType === 'optional')) &&
          e(p, r[u], n)
        );
      });
    }
    return Object.is(r, t);
  }, 't');
function pt(e) {
  var t;
  return (
    ((t = {})[Cn] = function () {
      return {
        match: function (r) {
          return { matched: Boolean(e(r)) };
        },
      };
    }),
    t
  );
}
l(pt, 'h');
var My = pt(function (e) {
  return !0;
});
var Ny = pt(function (e) {
    return typeof e == 'string';
  }),
  Ry = pt(function (e) {
    return typeof e == 'number';
  }),
  Iy = pt(function (e) {
    return typeof e == 'boolean';
  }),
  Dy = pt(function (e) {
    return typeof e == 'bigint';
  }),
  Fy = pt(function (e) {
    return typeof e == 'symbol';
  }),
  ky = pt(function (e) {
    return e == null;
  });
var Rt = l(function (e) {
    return new If(e, []);
  }, 'K'),
  If = (function () {
    function e(r, n) {
      (this.value = void 0),
        (this.cases = void 0),
        (this.value = r),
        (this.cases = n);
    }
    l(e, 'n');
    var t = e.prototype;
    return (
      (t.with = function () {
        var r = [].slice.call(arguments),
          n = r[r.length - 1],
          i = [r[0]],
          o = [];
        return (
          r.length === 3 && typeof r[1] == 'function'
            ? (i.push(r[0]), o.push(r[1]))
            : r.length > 2 && i.push.apply(i, r.slice(1, r.length - 1)),
          new e(
            this.value,
            this.cases.concat([
              {
                match: function (s) {
                  var a = {},
                    u = Boolean(
                      i.some(function (c) {
                        return Rf(c, s, function (p, f) {
                          a[p] = f;
                        });
                      }) &&
                        o.every(function (c) {
                          return c(s);
                        }),
                    );
                  return {
                    matched: u,
                    value:
                      u && Object.keys(a).length ? (ua in a ? a[ua] : a) : s,
                  };
                },
                handler: n,
              },
            ]),
          )
        );
      }),
      (t.when = function (r, n) {
        return new e(
          this.value,
          this.cases.concat([
            {
              match: function (i) {
                return { matched: Boolean(r(i)), value: i };
              },
              handler: n,
            },
          ]),
        );
      }),
      (t.otherwise = function (r) {
        return new e(
          this.value,
          this.cases.concat([
            {
              match: function (n) {
                return { matched: !0, value: n };
              },
              handler: r,
            },
          ]),
        ).run();
      }),
      (t.exhaustive = function () {
        return this.run();
      }),
      (t.run = function () {
        for (
          var r = this.value, n = void 0, i = 0;
          i < this.cases.length;
          i++
        ) {
          var o = this.cases[i],
            s = o.match(this.value);
          if (s.matched) {
            (r = s.value), (n = o.handler);
            break;
          }
        }
        if (!n) {
          var a;
          try {
            a = JSON.stringify(this.value);
          } catch {
            a = this.value;
          }
          throw new Error(
            'Pattern matching error: no pattern matches value ' + a,
          );
        }
        return n(r, this.value);
      }),
      e
    );
  })();
var Ki = require('util');
var ba = M(ue()),
  Ea = M(ya());
function yr(e) {
  return (0, Ea.default)(e, e, { fallback: (t) => ba.default.underline(t) });
}
l(yr, 'link');
var wa = M(ue());
var kf = { warn: wa.default.yellow('prisma:warn') },
  Lf = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
function br(e, ...t) {
  Lf.warn() && console.warn(`${kf.warn} ${e}`, ...t);
}
l(br, 'warn');
var $f = (0, Ki.promisify)(_a.default.readFile),
  jf = (0, Ki.promisify)(Ta.default.exec),
  he = U('prisma:get-platform'),
  Bf = ['1.0.x', '1.1.x', '3.0.x'];
async function Nn() {
  let e = Aa.default.platform(),
    t = process.arch;
  if (e === 'freebsd') {
    let o = await Ft(['freebsd-version']);
    if (o && o.trim().length > 0) {
      let a = /^(\d+)\.?/.exec(o);
      if (a)
        return { platform: 'freebsd', targetDistro: `freebsd${a[1]}`, arch: t };
    }
  }
  if (e !== 'linux') return { platform: e, arch: t };
  let r = await Uf(),
    n = await Hf();
  return {
    platform: 'linux',
    libssl: await Gf({
      arch: t,
      archFromUname: n,
      familyDistro: r.familyDistro,
    }),
    arch: t,
    archFromUname: n,
    ...r,
  };
}
l(Nn, 'getos');
function qf(e) {
  let t = /^ID="?([^"\n]*)"?$/im,
    r = /^ID_LIKE="?([^"\n]*)"?$/im,
    n = t.exec(e),
    i = (n && n[1] && n[1].toLowerCase()) || '',
    o = r.exec(e),
    s = (o && o[1] && o[1].toLowerCase()) || '',
    a = Rt({ id: i, idLike: s })
      .with({ id: 'alpine' }, ({ id: u }) => ({
        targetDistro: 'musl',
        familyDistro: u,
        originalDistro: u,
      }))
      .with({ id: 'raspbian' }, ({ id: u }) => ({
        targetDistro: 'arm',
        familyDistro: 'debian',
        originalDistro: u,
      }))
      .with({ id: 'nixos' }, ({ id: u }) => ({
        targetDistro: 'nixos',
        originalDistro: u,
        familyDistro: 'nixos',
      }))
      .with({ id: 'debian' }, { id: 'ubuntu' }, ({ id: u }) => ({
        targetDistro: 'debian',
        familyDistro: 'debian',
        originalDistro: u,
      }))
      .with(
        { id: 'rhel' },
        { id: 'centos' },
        { id: 'fedora' },
        ({ id: u }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: u,
        }),
      )
      .when(
        ({ idLike: u }) => u.includes('debian') || u.includes('ubuntu'),
        ({ id: u }) => ({
          targetDistro: 'debian',
          familyDistro: 'debian',
          originalDistro: u,
        }),
      )
      .when(
        ({ idLike: u }) => i === 'arch' || u.includes('arch'),
        ({ id: u }) => ({
          targetDistro: 'debian',
          familyDistro: 'arch',
          originalDistro: u,
        }),
      )
      .when(
        ({ idLike: u }) =>
          u.includes('centos') || u.includes('fedora') || u.includes('rhel'),
        ({ id: u }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: u,
        }),
      )
      .otherwise(({ id: u }) => ({
        targetDistro: void 0,
        familyDistro: void 0,
        originalDistro: u,
      }));
  return (
    he(`Found distro info:
${JSON.stringify(a, null, 2)}`),
    a
  );
}
l(qf, 'parseDistro');
async function Uf() {
  let e = '/etc/os-release';
  try {
    let t = await $f(e, { encoding: 'utf-8' });
    return qf(t);
  } catch {
    return {
      targetDistro: void 0,
      familyDistro: void 0,
      originalDistro: void 0,
    };
  }
}
l(Uf, 'resolveDistro');
function xa(e) {
  let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
  if (t) {
    let r = `${t[1]}.x`;
    return Pa(r);
  }
}
l(xa, 'parseOpenSSLVersion');
function va(e) {
  let t = /libssl\.so\.(\d)(\.\d)?/.exec(e);
  if (t) {
    let r = `${t[1]}${t[2] ?? '.0'}.x`;
    return Pa(r);
  }
}
l(va, 'parseLibSSLVersion');
function Pa(e) {
  let t = (() => {
    if (Ca(e)) return e;
    let r = e.split('.');
    return (r[1] = '0'), r.join('.');
  })();
  if (Bf.includes(t)) return t;
}
l(Pa, 'sanitiseSSLVersion');
async function Gf(e) {
  let t = Rt(e)
      .with(
        { familyDistro: 'musl' },
        () => (he('Trying platform-specific paths for "alpine"'), ['/lib']),
      )
      .with(
        { familyDistro: 'debian' },
        ({ archFromUname: u }) => (
          he('Trying platform-specific paths for "debian" (and "ubuntu")'),
          [`/usr/lib/${u}-linux-gnu`, `/lib/${u}-linux-gnu`]
        ),
      )
      .with(
        { familyDistro: 'rhel' },
        () => (
          he('Trying platform-specific paths for "rhel"'),
          ['/lib64', '/usr/lib64']
        ),
      )
      .otherwise(
        ({ familyDistro: u, arch: c, archFromUname: p }) => (
          he(
            `Don't know any platform-specific paths for "${u}" on ${c} (${p})`,
          ),
          []
        ),
      ),
    r = 'grep -v "libssl.so.0"',
    n = t.map((u) => `ls -v "libssl.so.0*" ${u} | grep libssl.so | ${r}`),
    i = await Ft(n);
  if (i) {
    he(`Found libssl.so file using platform-specific paths: ${i}`);
    let u = va(i);
    if ((he(`The parsed libssl version is: ${u}`), u)) return u;
  }
  he('Falling back to "ldconfig" and other generic paths');
  let o = await Ft([
    `ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${r}`,
    `ls /lib64 | grep libssl | ${r}`,
    `ls /usr/lib64 | grep libssl | ${r}`,
    `ls /lib | grep libssl | ${r}`,
  ]);
  if (o) {
    he(`Found libssl.so file using "ldconfig" or other generic paths: ${i}`);
    let u = va(o);
    if (u) return u;
  }
  let s = await Ft(['openssl version -v']);
  if (s) {
    he(`Found openssl binary with version: ${s}`);
    let u = xa(s);
    if ((he(`The parsed openssl version is: ${u}`), u)) return u;
  }
  let a = await Ft(['openssl version -v']);
  if (a) {
    let u = xa(a);
    if (u) return u;
  }
  he("Couldn't find any version of libssl or OpenSSL in the system");
}
l(Gf, 'getSSLVersion');
async function ze() {
  let { binaryTarget: e } = await Sa();
  return e;
}
l(ze, 'getPlatform');
function Vf(e) {
  return e.binaryTarget !== void 0;
}
l(Vf, 'isPlatformWithOSResultDefined');
async function Qi() {
  let { memoized: e, ...t } = await Sa();
  return t;
}
l(Qi, 'getPlatformWithOSResult');
var Mn = {};
async function Sa() {
  if (Vf(Mn)) return Promise.resolve({ ...Mn, memoized: !0 });
  let e = await Nn(),
    t = Kf(e);
  return (Mn = { ...e, binaryTarget: t }), { ...Mn, memoized: !1 };
}
l(Sa, 'getPlatformMemoized');
function Kf(e) {
  let {
    platform: t,
    arch: r,
    archFromUname: n,
    libssl: i,
    targetDistro: o,
    familyDistro: s,
    originalDistro: a,
  } = e;
  t === 'linux' &&
    !['x64', 'arm64'].includes(r) &&
    br(
      `Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`,
    );
  let u = '1.1.x';
  if (t === 'linux' && i === void 0) {
    let p = Rt({ familyDistro: s })
      .with(
        { familyDistro: 'debian' },
        () =>
          "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, you may also try to replace your base image with `node:lts-slim`, which already ships with OpenSSL installed.",
      )
      .otherwise(
        () =>
          'Please manually install OpenSSL and try installing Prisma again.',
      );
    br(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${u}".
${p}`);
  }
  let c = 'debian';
  if (
    (t === 'linux' &&
      o === void 0 &&
      br(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${c}".
Please report your experience by creating an issue at ${yr(
        'https://github.com/prisma/prisma/issues',
      )} so we can add your distro to the list of known supported distros.`),
    t === 'darwin' && r === 'arm64')
  )
    return 'darwin-arm64';
  if (t === 'darwin') return 'darwin';
  if (t === 'win32') return 'windows';
  if (t === 'freebsd') return o;
  if (t === 'openbsd') return 'openbsd';
  if (t === 'netbsd') return 'netbsd';
  if (t === 'linux' && o === 'nixos') return 'linux-nixos';
  if (t === 'linux' && r === 'arm64')
    return `${o === 'musl' ? 'linux-musl-arm64' : 'linux-arm64'}-openssl-${
      i || u
    }`;
  if (t === 'linux' && r === 'arm') return `linux-arm-openssl-${i || u}`;
  if (t === 'linux' && o === 'musl') {
    let p = 'linux-musl';
    return !i || Ca(i) ? p : `${p}-openssl-${i}`;
  }
  return t === 'linux' && o && i
    ? `${o}-openssl-${i}`
    : (t !== 'linux' &&
        br(
          `Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`,
        ),
      i ? `${c}-openssl-${i}` : o ? `${o}-openssl-${u}` : `${c}-openssl-${u}`);
}
l(Kf, 'getPlatformInternal');
async function Qf(e) {
  try {
    return await e();
  } catch {
    return;
  }
}
l(Qf, 'discardError');
function Ft(e) {
  return Qf(async () => {
    let t = await Promise.allSettled(e.map((o) => jf(o))),
      r = t.findIndex(({ status: o }) => o === 'fulfilled');
    if (r === -1) return;
    let { value: n } = t[r],
      i = String(n.stdout);
    return he(`Command "${e[r]}" successfully returned "${i}"`), i;
  });
}
l(Ft, 'getFirstSuccessfulExec');
async function Hf() {
  return (await Ft(['uname -m']))?.trim();
}
l(Hf, 'getArchFromUname');
function Ca(e) {
  return e.startsWith('1.');
}
l(Ca, 'isLibssl1x');
var Oa = M(require('fs'));
async function Hi() {
  let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY,
    t = e && Oa.default.existsSync(e),
    r = await Nn();
  if (!t && (r.arch === 'x32' || r.arch === 'ia32'))
    throw new Error(
      'The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)',
    );
}
l(Hi, 'isNodeAPISupported');
var Wi = [
  'darwin',
  'darwin-arm64',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-3.0.x',
  'linux-arm-openssl-1.1.x',
  'linux-arm-openssl-1.0.x',
  'linux-arm-openssl-3.0.x',
  'linux-musl',
  'linux-musl-openssl-3.0.x',
  'linux-musl-arm64-openssl-1.1.x',
  'linux-musl-arm64-openssl-3.0.x',
  'linux-nixos',
  'windows',
  'freebsd11',
  'freebsd12',
  'freebsd13',
  'openbsd',
  'netbsd',
  'arm',
];
var j = M(require('path')),
  Jf = M(Bi());
var f0 = U('prisma:engines');
function Ma() {
  return j.default.join(__dirname, '../');
}
l(Ma, 'getEnginesPath');
var d0 = 'libquery-engine';
j.default.join(__dirname, '../query-engine-darwin');
j.default.join(__dirname, '../query-engine-darwin-arm64');
j.default.join(__dirname, '../query-engine-debian-openssl-1.0.x');
j.default.join(__dirname, '../query-engine-debian-openssl-1.1.x');
j.default.join(__dirname, '../query-engine-debian-openssl-3.0.x');
j.default.join(__dirname, '../query-engine-rhel-openssl-1.0.x');
j.default.join(__dirname, '../query-engine-rhel-openssl-1.1.x');
j.default.join(__dirname, '../query-engine-rhel-openssl-3.0.x');
j.default.join(__dirname, '../libquery_engine-darwin.dylib.node');
j.default.join(__dirname, '../libquery_engine-darwin-arm64.dylib.node');
j.default.join(__dirname, '../libquery_engine-debian-openssl-1.0.x.so.node');
j.default.join(__dirname, '../libquery_engine-debian-openssl-1.1.x.so.node');
j.default.join(__dirname, '../libquery_engine-debian-openssl-3.0.x.so.node');
j.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.0.x.so.node',
);
j.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.1.x.so.node',
);
j.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-3.0.x.so.node',
);
j.default.join(__dirname, '../libquery_engine-linux-musl.so.node');
j.default.join(
  __dirname,
  '../libquery_engine-linux-musl-openssl-3.0.x.so.node',
);
j.default.join(__dirname, '../libquery_engine-rhel-openssl-1.0.x.so.node');
j.default.join(__dirname, '../libquery_engine-rhel-openssl-1.1.x.so.node');
j.default.join(__dirname, '../libquery_engine-rhel-openssl-3.0.x.so.node');
j.default.join(__dirname, '../query_engine-windows.dll.node');
var Xe = class {};
l(Xe, 'Engine');
var V = class extends Error {
  constructor(r, n, i) {
    super(r);
    (this.clientVersion = n), (this.errorCode = i), Error.captureStackTrace(V);
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientInitializationError';
  }
};
l(V, 'PrismaClientInitializationError');
var te = class extends Error {
  constructor(r, { code: n, clientVersion: i, meta: o, batchRequestIdx: s }) {
    super(r);
    (this.code = n),
      (this.clientVersion = i),
      (this.meta = o),
      (this.batchRequestIdx = s);
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientKnownRequestError';
  }
};
l(te, 'PrismaClientKnownRequestError');
var pe = class extends Error {
  constructor(r, n) {
    super(r);
    this.clientVersion = n;
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientRustPanicError';
  }
};
l(pe, 'PrismaClientRustPanicError');
var J = class extends Error {
  constructor(r, { clientVersion: n, batchRequestIdx: i }) {
    super(r);
    (this.clientVersion = n), (this.batchRequestIdx = i);
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientUnknownRequestError';
  }
};
l(J, 'PrismaClientUnknownRequestError');
var qa = M(ue()),
  Ji = M(Er());
var ka = M(Da());
var M0 = U('plusX');
function Fa(e) {
  return { fromEnvVar: null, value: e };
}
l(Fa, 'transformPlatformToEnvValue');
function La(e, t) {
  return (
    (e = e || []),
    e.find((r) => r.value === 'native') ? [...e, Fa(t)] : [Fa('native'), ...e]
  );
}
l(La, 'fixBinaryTargets');
function $a({
  title: e,
  user: t = 'prisma',
  repo: r = 'prisma',
  template: n = 'bug_report.md',
  body: i,
}) {
  return (0, ka.default)({ user: t, repo: r, template: n, title: e, body: i });
}
l($a, 'getGitHubIssueUrl');
function ja(e) {
  return e
    ? e
        .replace(/".*"/g, '"X"')
        .replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`)
    : '';
}
l(ja, 'maskQuery');
function Ba(e) {
  return e
    .split(
      `
`,
    )
    .map((t) =>
      t
        .replace(
          /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,
          '',
        )
        .replace(/\+\d+\s*ms$/, ''),
    ).join(`
`);
}
l(Ba, 'normalizeLogs');
function Ua({
  version: e,
  platform: t,
  title: r,
  description: n,
  engineVersion: i,
  database: o,
  query: s,
}) {
  let a = Xs(6e3 - (s?.length ?? 0)),
    u = Ba((0, Ji.default)(a)),
    c = n
      ? `# Description
\`\`\`
${n}
\`\`\``
      : '',
    p = (0,
    Ji.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${c}

## Logs
\`\`\`
${u}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? ja(s) : ''}
\`\`\`
`),
    f = $a({ title: r, body: p });
  return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${qa.default.underline(f)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
}
l(Ua, 'getErrorMessageWithLink');
function Ga({ error: e, user_facing_error: t }, r) {
  return t.error_code
    ? new te(t.message, {
        code: t.error_code,
        clientVersion: r,
        meta: t.meta,
        batchRequestIdx: t.batch_request_idx,
      })
    : new J(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
}
l(Ga, 'prismaGraphQLToJSError');
function Va(e, t) {
  let r = e.map(({ query: n }) => ({ query: n, variables: {} }));
  return !t || t.kind === 'itx'
    ? { batch: r, transaction: !1 }
    : { batch: r, transaction: !0, isolationLevel: t.options.isolationLevel };
}
l(Va, 'getBatchRequestPayload');
var Ka = M(er());
function Qa(e) {
  return String(new In(e));
}
l(Qa, 'printGeneratorConfig');
var In = class {
  constructor(t) {
    this.config = t;
  }
  toString() {
    let { config: t } = this,
      r = t.provider.fromEnvVar
        ? `env("${t.provider.fromEnvVar}")`
        : t.provider.value,
      n = JSON.parse(
        JSON.stringify({ provider: r, binaryTargets: zf(t.binaryTargets) }),
      );
    return `generator ${t.name} {
${(0, Ka.default)(Xf(n), 2)}
}`;
  }
};
l(In, 'GeneratorConfigClass');
function zf(e) {
  let t;
  if (e.length > 0) {
    let r = e.find((n) => n.fromEnvVar !== null);
    r ? (t = `env("${r.fromEnvVar}")`) : (t = e.map((n) => n.value));
  } else t = void 0;
  return t;
}
l(zf, 'getOriginalBinaryTargetsValue');
function Xf(e) {
  let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0);
  return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${Zf(n)}`).join(`
`);
}
l(Xf, 'printDatamodelObject');
function Zf(e) {
  return JSON.parse(
    JSON.stringify(e, (t, r) =>
      Array.isArray(r)
        ? `[${r.map((n) => JSON.stringify(n)).join(', ')}]`
        : JSON.stringify(r),
    ),
  );
}
l(Zf, 'niceStringify');
var Ha = typeof globalThis == 'object' ? globalThis : global;
var Ze = '1.3.0';
var Wa = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function ed(e) {
  var t = new Set([e]),
    r = new Set(),
    n = e.match(Wa);
  if (!n)
    return function () {
      return !1;
    };
  var i = { major: +n[1], minor: +n[2], patch: +n[3], prerelease: n[4] };
  if (i.prerelease != null)
    return l(function (u) {
      return u === e;
    }, 'isExactmatch');
  function o(a) {
    return r.add(a), !1;
  }
  l(o, '_reject');
  function s(a) {
    return t.add(a), !0;
  }
  return (
    l(s, '_accept'),
    l(function (u) {
      if (t.has(u)) return !0;
      if (r.has(u)) return !1;
      var c = u.match(Wa);
      if (!c) return o(u);
      var p = { major: +c[1], minor: +c[2], patch: +c[3], prerelease: c[4] };
      return p.prerelease != null || i.major !== p.major
        ? o(u)
        : i.major === 0
        ? i.minor === p.minor && i.patch <= p.patch
          ? s(u)
          : o(u)
        : i.minor <= p.minor
        ? s(u)
        : o(u);
    }, 'isCompatible')
  );
}
l(ed, '_makeCompatibilityCheck');
var Ja = ed(Ze);
var td = Ze.split('.')[0],
  wr = Symbol.for('opentelemetry.js.api.' + td),
  xr = Ha;
function kt(e, t, r, n) {
  var i;
  n === void 0 && (n = !1);
  var o = (xr[wr] =
    (i = xr[wr]) !== null && i !== void 0 ? i : { version: Ze });
  if (!n && o[e]) {
    var s = new Error(
      '@opentelemetry/api: Attempted duplicate registration of API: ' + e,
    );
    return r.error(s.stack || s.message), !1;
  }
  if (o.version !== Ze) {
    var s = new Error(
      '@opentelemetry/api: All API registration versions must match',
    );
    return r.error(s.stack || s.message), !1;
  }
  return (
    (o[e] = t),
    r.debug(
      '@opentelemetry/api: Registered a global for ' + e + ' v' + Ze + '.',
    ),
    !0
  );
}
l(kt, 'registerGlobal');
function $e(e) {
  var t,
    r,
    n = (t = xr[wr]) === null || t === void 0 ? void 0 : t.version;
  if (!(!n || !Ja(n)))
    return (r = xr[wr]) === null || r === void 0 ? void 0 : r[e];
}
l($e, 'getGlobal');
function Lt(e, t) {
  t.debug(
    '@opentelemetry/api: Unregistering a global for ' + e + ' v' + Ze + '.',
  );
  var r = xr[wr];
  r && delete r[e];
}
l(Lt, 'unregisterGlobal');
var rd = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  nd = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  Ya = (function () {
    function e(t) {
      this._namespace = t.namespace || 'DiagComponentLogger';
    }
    return (
      l(e, 'DiagComponentLogger'),
      (e.prototype.debug = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return vr('debug', this._namespace, t);
      }),
      (e.prototype.error = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return vr('error', this._namespace, t);
      }),
      (e.prototype.info = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return vr('info', this._namespace, t);
      }),
      (e.prototype.warn = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return vr('warn', this._namespace, t);
      }),
      (e.prototype.verbose = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return vr('verbose', this._namespace, t);
      }),
      e
    );
  })();
function vr(e, t, r) {
  var n = $e('diag');
  if (!!n) return r.unshift(t), n[e].apply(n, nd([], rd(r), !1));
}
l(vr, 'logProxy');
var ae;
(function (e) {
  (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.ERROR = 30)] = 'ERROR'),
    (e[(e.WARN = 50)] = 'WARN'),
    (e[(e.INFO = 60)] = 'INFO'),
    (e[(e.DEBUG = 70)] = 'DEBUG'),
    (e[(e.VERBOSE = 80)] = 'VERBOSE'),
    (e[(e.ALL = 9999)] = 'ALL');
})(ae || (ae = {}));
function za(e, t) {
  e < ae.NONE ? (e = ae.NONE) : e > ae.ALL && (e = ae.ALL), (t = t || {});
  function r(n, i) {
    var o = t[n];
    return typeof o == 'function' && e >= i ? o.bind(t) : function () {};
  }
  return (
    l(r, '_filterFunc'),
    {
      error: r('error', ae.ERROR),
      warn: r('warn', ae.WARN),
      info: r('info', ae.INFO),
      debug: r('debug', ae.DEBUG),
      verbose: r('verbose', ae.VERBOSE),
    }
  );
}
l(za, 'createLogLevelDiagLogger');
var od = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  sd = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  ad = 'diag',
  et = (function () {
    function e() {
      function t(i) {
        return function () {
          for (var o = [], s = 0; s < arguments.length; s++)
            o[s] = arguments[s];
          var a = $e('diag');
          if (!!a) return a[i].apply(a, sd([], od(o), !1));
        };
      }
      l(t, '_logProxy');
      var r = this,
        n = l(function (i, o) {
          var s, a, u;
          if ((o === void 0 && (o = { logLevel: ae.INFO }), i === r)) {
            var c = new Error(
              'Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation',
            );
            return (
              r.error((s = c.stack) !== null && s !== void 0 ? s : c.message),
              !1
            );
          }
          typeof o == 'number' && (o = { logLevel: o });
          var p = $e('diag'),
            f = za((a = o.logLevel) !== null && a !== void 0 ? a : ae.INFO, i);
          if (p && !o.suppressOverrideMessage) {
            var d =
              (u = new Error().stack) !== null && u !== void 0
                ? u
                : '<failed to generate stacktrace>';
            p.warn('Current logger will be overwritten from ' + d),
              f.warn(
                'Current logger will overwrite one already registered from ' +
                  d,
              );
          }
          return kt('diag', f, r, !0);
        }, 'setLogger');
      (r.setLogger = n),
        (r.disable = function () {
          Lt(ad, r);
        }),
        (r.createComponentLogger = function (i) {
          return new Ya(i);
        }),
        (r.verbose = t('verbose')),
        (r.debug = t('debug')),
        (r.info = t('info')),
        (r.warn = t('warn')),
        (r.error = t('error'));
    }
    return (
      l(e, 'DiagAPI'),
      (e.instance = function () {
        return this._instance || (this._instance = new e()), this._instance;
      }),
      e
    );
  })();
function Yi(e) {
  return Symbol.for(e);
}
l(Yi, 'createContextKey');
var ld = (function () {
    function e(t) {
      var r = this;
      (r._currentContext = t ? new Map(t) : new Map()),
        (r.getValue = function (n) {
          return r._currentContext.get(n);
        }),
        (r.setValue = function (n, i) {
          var o = new e(r._currentContext);
          return o._currentContext.set(n, i), o;
        }),
        (r.deleteValue = function (n) {
          var i = new e(r._currentContext);
          return i._currentContext.delete(n), i;
        });
    }
    return l(e, 'BaseContext'), e;
  })(),
  Tr = new ld();
var ud = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  cd = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  Xa = (function () {
    function e() {}
    return (
      l(e, 'NoopContextManager'),
      (e.prototype.active = function () {
        return Tr;
      }),
      (e.prototype.with = function (t, r, n) {
        for (var i = [], o = 3; o < arguments.length; o++)
          i[o - 3] = arguments[o];
        return r.call.apply(r, cd([n], ud(i), !1));
      }),
      (e.prototype.bind = function (t, r) {
        return r;
      }),
      (e.prototype.enable = function () {
        return this;
      }),
      (e.prototype.disable = function () {
        return this;
      }),
      e
    );
  })();
var pd = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  fd = function (e, t, r) {
    if (r || arguments.length === 2)
      for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) &&
          (o || (o = Array.prototype.slice.call(t, 0, n)), (o[n] = t[n]));
    return e.concat(o || Array.prototype.slice.call(t));
  },
  zi = 'context',
  dd = new Xa(),
  $t = (function () {
    function e() {}
    return (
      l(e, 'ContextAPI'),
      (e.getInstance = function () {
        return this._instance || (this._instance = new e()), this._instance;
      }),
      (e.prototype.setGlobalContextManager = function (t) {
        return kt(zi, t, et.instance());
      }),
      (e.prototype.active = function () {
        return this._getContextManager().active();
      }),
      (e.prototype.with = function (t, r, n) {
        for (var i, o = [], s = 3; s < arguments.length; s++)
          o[s - 3] = arguments[s];
        return (i = this._getContextManager()).with.apply(
          i,
          fd([t, r, n], pd(o), !1),
        );
      }),
      (e.prototype.bind = function (t, r) {
        return this._getContextManager().bind(t, r);
      }),
      (e.prototype._getContextManager = function () {
        return $e(zi) || dd;
      }),
      (e.prototype.disable = function () {
        this._getContextManager().disable(), Lt(zi, et.instance());
      }),
      e
    );
  })();
var tt;
(function (e) {
  (e[(e.NONE = 0)] = 'NONE'), (e[(e.SAMPLED = 1)] = 'SAMPLED');
})(tt || (tt = {}));
var Xi = '0000000000000000',
  Zi = '00000000000000000000000000000000',
  Za = { traceId: Zi, spanId: Xi, traceFlags: tt.NONE };
var rt = (function () {
  function e(t) {
    t === void 0 && (t = Za), (this._spanContext = t);
  }
  return (
    l(e, 'NonRecordingSpan'),
    (e.prototype.spanContext = function () {
      return this._spanContext;
    }),
    (e.prototype.setAttribute = function (t, r) {
      return this;
    }),
    (e.prototype.setAttributes = function (t) {
      return this;
    }),
    (e.prototype.addEvent = function (t, r) {
      return this;
    }),
    (e.prototype.setStatus = function (t) {
      return this;
    }),
    (e.prototype.updateName = function (t) {
      return this;
    }),
    (e.prototype.end = function (t) {}),
    (e.prototype.isRecording = function () {
      return !1;
    }),
    (e.prototype.recordException = function (t, r) {}),
    e
  );
})();
var eo = Yi('OpenTelemetry Context Key SPAN');
function Dn(e) {
  return e.getValue(eo) || void 0;
}
l(Dn, 'getSpan');
function el() {
  return Dn($t.getInstance().active());
}
l(el, 'getActiveSpan');
function _r(e, t) {
  return e.setValue(eo, t);
}
l(_r, 'setSpan');
function tl(e) {
  return e.deleteValue(eo);
}
l(tl, 'deleteSpan');
function rl(e, t) {
  return _r(e, new rt(t));
}
l(rl, 'setSpanContext');
function Fn(e) {
  var t;
  return (t = Dn(e)) === null || t === void 0 ? void 0 : t.spanContext();
}
l(Fn, 'getSpanContext');
var md = /^([0-9a-f]{32})$/i,
  gd = /^[0-9a-f]{16}$/i;
function hd(e) {
  return md.test(e) && e !== Zi;
}
l(hd, 'isValidTraceId');
function yd(e) {
  return gd.test(e) && e !== Xi;
}
l(yd, 'isValidSpanId');
function kn(e) {
  return hd(e.traceId) && yd(e.spanId);
}
l(kn, 'isSpanContextValid');
function nl(e) {
  return new rt(e);
}
l(nl, 'wrapSpanContext');
var il = $t.getInstance(),
  Ln = (function () {
    function e() {}
    return (
      l(e, 'NoopTracer'),
      (e.prototype.startSpan = function (t, r, n) {
        var i = Boolean(r?.root);
        if (i) return new rt();
        var o = n && Fn(n);
        return bd(o) && kn(o) ? new rt(o) : new rt();
      }),
      (e.prototype.startActiveSpan = function (t, r, n, i) {
        var o, s, a;
        if (!(arguments.length < 2)) {
          arguments.length === 2
            ? (a = r)
            : arguments.length === 3
            ? ((o = r), (a = n))
            : ((o = r), (s = n), (a = i));
          var u = s ?? il.active(),
            c = this.startSpan(t, o, u),
            p = _r(u, c);
          return il.with(p, a, void 0, c);
        }
      }),
      e
    );
  })();
function bd(e) {
  return (
    typeof e == 'object' &&
    typeof e.spanId == 'string' &&
    typeof e.traceId == 'string' &&
    typeof e.traceFlags == 'number'
  );
}
l(bd, 'isSpanContext');
var Ed = new Ln(),
  ol = (function () {
    function e(t, r, n, i) {
      (this._provider = t),
        (this.name = r),
        (this.version = n),
        (this.options = i);
    }
    return (
      l(e, 'ProxyTracer'),
      (e.prototype.startSpan = function (t, r, n) {
        return this._getTracer().startSpan(t, r, n);
      }),
      (e.prototype.startActiveSpan = function (t, r, n, i) {
        var o = this._getTracer();
        return Reflect.apply(o.startActiveSpan, o, arguments);
      }),
      (e.prototype._getTracer = function () {
        if (this._delegate) return this._delegate;
        var t = this._provider.getDelegateTracer(
          this.name,
          this.version,
          this.options,
        );
        return t ? ((this._delegate = t), this._delegate) : Ed;
      }),
      e
    );
  })();
var sl = (function () {
  function e() {}
  return (
    l(e, 'NoopTracerProvider'),
    (e.prototype.getTracer = function (t, r, n) {
      return new Ln();
    }),
    e
  );
})();
var wd = new sl(),
  to = (function () {
    function e() {}
    return (
      l(e, 'ProxyTracerProvider'),
      (e.prototype.getTracer = function (t, r, n) {
        var i;
        return (i = this.getDelegateTracer(t, r, n)) !== null && i !== void 0
          ? i
          : new ol(this, t, r, n);
      }),
      (e.prototype.getDelegate = function () {
        var t;
        return (t = this._delegate) !== null && t !== void 0 ? t : wd;
      }),
      (e.prototype.setDelegate = function (t) {
        this._delegate = t;
      }),
      (e.prototype.getDelegateTracer = function (t, r, n) {
        var i;
        return (i = this._delegate) === null || i === void 0
          ? void 0
          : i.getTracer(t, r, n);
      }),
      e
    );
  })();
var Ar;
(function (e) {
  (e[(e.INTERNAL = 0)] = 'INTERNAL'),
    (e[(e.SERVER = 1)] = 'SERVER'),
    (e[(e.CLIENT = 2)] = 'CLIENT'),
    (e[(e.PRODUCER = 3)] = 'PRODUCER'),
    (e[(e.CONSUMER = 4)] = 'CONSUMER');
})(Ar || (Ar = {}));
var Pr;
(function (e) {
  (e[(e.UNSET = 0)] = 'UNSET'),
    (e[(e.OK = 1)] = 'OK'),
    (e[(e.ERROR = 2)] = 'ERROR');
})(Pr || (Pr = {}));
var jt = $t.getInstance();
var fe = et.instance();
var ro = 'trace',
  al = (function () {
    function e() {
      (this._proxyTracerProvider = new to()),
        (this.wrapSpanContext = nl),
        (this.isSpanContextValid = kn),
        (this.deleteSpan = tl),
        (this.getSpan = Dn),
        (this.getActiveSpan = el),
        (this.getSpanContext = Fn),
        (this.setSpan = _r),
        (this.setSpanContext = rl);
    }
    return (
      l(e, 'TraceAPI'),
      (e.getInstance = function () {
        return this._instance || (this._instance = new e()), this._instance;
      }),
      (e.prototype.setGlobalTracerProvider = function (t) {
        var r = kt(ro, this._proxyTracerProvider, et.instance());
        return r && this._proxyTracerProvider.setDelegate(t), r;
      }),
      (e.prototype.getTracerProvider = function () {
        return $e(ro) || this._proxyTracerProvider;
      }),
      (e.prototype.getTracer = function (t, r) {
        return this.getTracerProvider().getTracer(t, r);
      }),
      (e.prototype.disable = function () {
        Lt(ro, et.instance()), (this._proxyTracerProvider = new to());
      }),
      e
    );
  })();
var ft = al.getInstance();
var ll = function (e) {
    var t = typeof Symbol == 'function' && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length == 'number')
      return {
        next: function () {
          return (
            e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
    );
  },
  vd = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  };
function ul(e) {
  var t,
    r,
    n = {};
  if (typeof e != 'object' || e == null) return n;
  try {
    for (var i = ll(Object.entries(e)), o = i.next(); !o.done; o = i.next()) {
      var s = vd(o.value, 2),
        a = s[0],
        u = s[1];
      if (!Td(a)) {
        fe.warn('Invalid attribute key: ' + a);
        continue;
      }
      if (!no(u)) {
        fe.warn('Invalid attribute value set for key: ' + a);
        continue;
      }
      Array.isArray(u) ? (n[a] = u.slice()) : (n[a] = u);
    }
  } catch (c) {
    t = { error: c };
  } finally {
    try {
      o && !o.done && (r = i.return) && r.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return n;
}
l(ul, 'sanitizeAttributes');
function Td(e) {
  return typeof e == 'string' && e.length > 0;
}
l(Td, 'isAttributeKey');
function no(e) {
  return e == null ? !0 : Array.isArray(e) ? _d(e) : cl(e);
}
l(no, 'isAttributeValue');
function _d(e) {
  var t, r, n;
  try {
    for (var i = ll(e), o = i.next(); !o.done; o = i.next()) {
      var s = o.value;
      if (s != null) {
        if (!n) {
          if (cl(s)) {
            n = typeof s;
            continue;
          }
          return !1;
        }
        if (typeof s !== n) return !1;
      }
    }
  } catch (a) {
    t = { error: a };
  } finally {
    try {
      o && !o.done && (r = i.return) && r.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return !0;
}
l(_d, 'isHomogeneousAttributeValueArray');
function cl(e) {
  switch (typeof e) {
    case 'number':
    case 'boolean':
    case 'string':
      return !0;
  }
  return !1;
}
l(cl, 'isValidPrimitiveAttributeValue');
var pl = require('perf_hooks'),
  Bt = pl.performance;
var nt = {
  AWS_LAMBDA_INVOKED_ARN: 'aws.lambda.invoked_arn',
  DB_SYSTEM: 'db.system',
  DB_CONNECTION_STRING: 'db.connection_string',
  DB_USER: 'db.user',
  DB_JDBC_DRIVER_CLASSNAME: 'db.jdbc.driver_classname',
  DB_NAME: 'db.name',
  DB_STATEMENT: 'db.statement',
  DB_OPERATION: 'db.operation',
  DB_MSSQL_INSTANCE_NAME: 'db.mssql.instance_name',
  DB_CASSANDRA_KEYSPACE: 'db.cassandra.keyspace',
  DB_CASSANDRA_PAGE_SIZE: 'db.cassandra.page_size',
  DB_CASSANDRA_CONSISTENCY_LEVEL: 'db.cassandra.consistency_level',
  DB_CASSANDRA_TABLE: 'db.cassandra.table',
  DB_CASSANDRA_IDEMPOTENCE: 'db.cassandra.idempotence',
  DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT:
    'db.cassandra.speculative_execution_count',
  DB_CASSANDRA_COORDINATOR_ID: 'db.cassandra.coordinator.id',
  DB_CASSANDRA_COORDINATOR_DC: 'db.cassandra.coordinator.dc',
  DB_HBASE_NAMESPACE: 'db.hbase.namespace',
  DB_REDIS_DATABASE_INDEX: 'db.redis.database_index',
  DB_MONGODB_COLLECTION: 'db.mongodb.collection',
  DB_SQL_TABLE: 'db.sql.table',
  EXCEPTION_TYPE: 'exception.type',
  EXCEPTION_MESSAGE: 'exception.message',
  EXCEPTION_STACKTRACE: 'exception.stacktrace',
  EXCEPTION_ESCAPED: 'exception.escaped',
  FAAS_TRIGGER: 'faas.trigger',
  FAAS_EXECUTION: 'faas.execution',
  FAAS_DOCUMENT_COLLECTION: 'faas.document.collection',
  FAAS_DOCUMENT_OPERATION: 'faas.document.operation',
  FAAS_DOCUMENT_TIME: 'faas.document.time',
  FAAS_DOCUMENT_NAME: 'faas.document.name',
  FAAS_TIME: 'faas.time',
  FAAS_CRON: 'faas.cron',
  FAAS_COLDSTART: 'faas.coldstart',
  FAAS_INVOKED_NAME: 'faas.invoked_name',
  FAAS_INVOKED_PROVIDER: 'faas.invoked_provider',
  FAAS_INVOKED_REGION: 'faas.invoked_region',
  NET_TRANSPORT: 'net.transport',
  NET_PEER_IP: 'net.peer.ip',
  NET_PEER_PORT: 'net.peer.port',
  NET_PEER_NAME: 'net.peer.name',
  NET_HOST_IP: 'net.host.ip',
  NET_HOST_PORT: 'net.host.port',
  NET_HOST_NAME: 'net.host.name',
  NET_HOST_CONNECTION_TYPE: 'net.host.connection.type',
  NET_HOST_CONNECTION_SUBTYPE: 'net.host.connection.subtype',
  NET_HOST_CARRIER_NAME: 'net.host.carrier.name',
  NET_HOST_CARRIER_MCC: 'net.host.carrier.mcc',
  NET_HOST_CARRIER_MNC: 'net.host.carrier.mnc',
  NET_HOST_CARRIER_ICC: 'net.host.carrier.icc',
  PEER_SERVICE: 'peer.service',
  ENDUSER_ID: 'enduser.id',
  ENDUSER_ROLE: 'enduser.role',
  ENDUSER_SCOPE: 'enduser.scope',
  THREAD_ID: 'thread.id',
  THREAD_NAME: 'thread.name',
  CODE_FUNCTION: 'code.function',
  CODE_NAMESPACE: 'code.namespace',
  CODE_FILEPATH: 'code.filepath',
  CODE_LINENO: 'code.lineno',
  HTTP_METHOD: 'http.method',
  HTTP_URL: 'http.url',
  HTTP_TARGET: 'http.target',
  HTTP_HOST: 'http.host',
  HTTP_SCHEME: 'http.scheme',
  HTTP_STATUS_CODE: 'http.status_code',
  HTTP_FLAVOR: 'http.flavor',
  HTTP_USER_AGENT: 'http.user_agent',
  HTTP_REQUEST_CONTENT_LENGTH: 'http.request_content_length',
  HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED:
    'http.request_content_length_uncompressed',
  HTTP_RESPONSE_CONTENT_LENGTH: 'http.response_content_length',
  HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED:
    'http.response_content_length_uncompressed',
  HTTP_SERVER_NAME: 'http.server_name',
  HTTP_ROUTE: 'http.route',
  HTTP_CLIENT_IP: 'http.client_ip',
  AWS_DYNAMODB_TABLE_NAMES: 'aws.dynamodb.table_names',
  AWS_DYNAMODB_CONSUMED_CAPACITY: 'aws.dynamodb.consumed_capacity',
  AWS_DYNAMODB_ITEM_COLLECTION_METRICS: 'aws.dynamodb.item_collection_metrics',
  AWS_DYNAMODB_PROVISIONED_READ_CAPACITY:
    'aws.dynamodb.provisioned_read_capacity',
  AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY:
    'aws.dynamodb.provisioned_write_capacity',
  AWS_DYNAMODB_CONSISTENT_READ: 'aws.dynamodb.consistent_read',
  AWS_DYNAMODB_PROJECTION: 'aws.dynamodb.projection',
  AWS_DYNAMODB_LIMIT: 'aws.dynamodb.limit',
  AWS_DYNAMODB_ATTRIBUTES_TO_GET: 'aws.dynamodb.attributes_to_get',
  AWS_DYNAMODB_INDEX_NAME: 'aws.dynamodb.index_name',
  AWS_DYNAMODB_SELECT: 'aws.dynamodb.select',
  AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES:
    'aws.dynamodb.global_secondary_indexes',
  AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: 'aws.dynamodb.local_secondary_indexes',
  AWS_DYNAMODB_EXCLUSIVE_START_TABLE: 'aws.dynamodb.exclusive_start_table',
  AWS_DYNAMODB_TABLE_COUNT: 'aws.dynamodb.table_count',
  AWS_DYNAMODB_SCAN_FORWARD: 'aws.dynamodb.scan_forward',
  AWS_DYNAMODB_SEGMENT: 'aws.dynamodb.segment',
  AWS_DYNAMODB_TOTAL_SEGMENTS: 'aws.dynamodb.total_segments',
  AWS_DYNAMODB_COUNT: 'aws.dynamodb.count',
  AWS_DYNAMODB_SCANNED_COUNT: 'aws.dynamodb.scanned_count',
  AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: 'aws.dynamodb.attribute_definitions',
  AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES:
    'aws.dynamodb.global_secondary_index_updates',
  MESSAGING_SYSTEM: 'messaging.system',
  MESSAGING_DESTINATION: 'messaging.destination',
  MESSAGING_DESTINATION_KIND: 'messaging.destination_kind',
  MESSAGING_TEMP_DESTINATION: 'messaging.temp_destination',
  MESSAGING_PROTOCOL: 'messaging.protocol',
  MESSAGING_PROTOCOL_VERSION: 'messaging.protocol_version',
  MESSAGING_URL: 'messaging.url',
  MESSAGING_MESSAGE_ID: 'messaging.message_id',
  MESSAGING_CONVERSATION_ID: 'messaging.conversation_id',
  MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: 'messaging.message_payload_size_bytes',
  MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES:
    'messaging.message_payload_compressed_size_bytes',
  MESSAGING_OPERATION: 'messaging.operation',
  MESSAGING_CONSUMER_ID: 'messaging.consumer_id',
  MESSAGING_RABBITMQ_ROUTING_KEY: 'messaging.rabbitmq.routing_key',
  MESSAGING_KAFKA_MESSAGE_KEY: 'messaging.kafka.message_key',
  MESSAGING_KAFKA_CONSUMER_GROUP: 'messaging.kafka.consumer_group',
  MESSAGING_KAFKA_CLIENT_ID: 'messaging.kafka.client_id',
  MESSAGING_KAFKA_PARTITION: 'messaging.kafka.partition',
  MESSAGING_KAFKA_TOMBSTONE: 'messaging.kafka.tombstone',
  RPC_SYSTEM: 'rpc.system',
  RPC_SERVICE: 'rpc.service',
  RPC_METHOD: 'rpc.method',
  RPC_GRPC_STATUS_CODE: 'rpc.grpc.status_code',
  RPC_JSONRPC_VERSION: 'rpc.jsonrpc.version',
  RPC_JSONRPC_REQUEST_ID: 'rpc.jsonrpc.request_id',
  RPC_JSONRPC_ERROR_CODE: 'rpc.jsonrpc.error_code',
  RPC_JSONRPC_ERROR_MESSAGE: 'rpc.jsonrpc.error_message',
  MESSAGE_TYPE: 'message.type',
  MESSAGE_ID: 'message.id',
  MESSAGE_COMPRESSED_SIZE: 'message.compressed_size',
  MESSAGE_UNCOMPRESSED_SIZE: 'message.uncompressed_size',
};
var fl = 9,
  $n = Math.pow(10, fl);
function jn(e) {
  var t = e / 1e3,
    r = Math.trunc(t),
    n = Number((t - r).toFixed(fl)) * $n;
  return [r, n];
}
l(jn, 'numberToHrtime');
function dl() {
  var e = Bt.timeOrigin;
  if (typeof e != 'number') {
    var t = Bt;
    e = t.timing && t.timing.fetchStart;
  }
  return e;
}
l(dl, 'getTimeOrigin');
function Ad(e) {
  var t = jn(dl()),
    r = jn(typeof e == 'number' ? e : Bt.now()),
    n = t[0] + r[0],
    i = t[1] + r[1];
  return i > $n && ((i -= $n), (n += 1)), [n, i];
}
l(Ad, 'hrTime');
function Bn(e) {
  if (gl(e)) return e;
  if (typeof e == 'number') return e < dl() ? Ad(e) : jn(e);
  if (e instanceof Date) return jn(e.getTime());
  throw TypeError('Invalid input type');
}
l(Bn, 'timeInputToHrTime');
function ml(e, t) {
  var r = t[0] - e[0],
    n = t[1] - e[1];
  return n < 0 && ((r -= 1), (n += $n)), [r, n];
}
l(ml, 'hrTimeDuration');
function gl(e) {
  return (
    Array.isArray(e) &&
    e.length === 2 &&
    typeof e[0] == 'number' &&
    typeof e[1] == 'number'
  );
}
l(gl, 'isTimeInputHrTime');
function hl(e) {
  return gl(e) || typeof e == 'number' || e instanceof Date;
}
l(hl, 'isTimeInput');
var yl = 'exception';
var Pd = function (e) {
    var t = typeof Symbol == 'function' && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length == 'number')
      return {
        next: function () {
          return (
            e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
    );
  },
  Sd = function (e, t) {
    var r = typeof Symbol == 'function' && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
        o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  bl = (function () {
    function e(t, r, n, i, o, s, a, u, c) {
      a === void 0 && (a = []),
        c === void 0 && (c = Bt),
        (this.attributes = {}),
        (this.links = []),
        (this.events = []),
        (this.status = { code: Pr.UNSET }),
        (this.endTime = [0, 0]),
        (this._ended = !1),
        (this._duration = [-1, -1]),
        (this._clock = c),
        (this.name = n),
        (this._spanContext = i),
        (this.parentSpanId = s),
        (this.kind = o),
        (this.links = a),
        (this.startTime = Bn(u ?? c.now())),
        (this.resource = t.resource),
        (this.instrumentationLibrary = t.instrumentationLibrary),
        (this._spanLimits = t.getSpanLimits()),
        (this._spanProcessor = t.getActiveSpanProcessor()),
        this._spanProcessor.onStart(this, r),
        (this._attributeValueLengthLimit =
          this._spanLimits.attributeValueLengthLimit || 0);
    }
    return (
      l(e, 'Span'),
      (e.prototype.spanContext = function () {
        return this._spanContext;
      }),
      (e.prototype.setAttribute = function (t, r) {
        return r == null || this._isSpanEnded()
          ? this
          : t.length === 0
          ? (fe.warn('Invalid attribute key: ' + t), this)
          : no(r)
          ? Object.keys(this.attributes).length >=
              this._spanLimits.attributeCountLimit &&
            !Object.prototype.hasOwnProperty.call(this.attributes, t)
            ? this
            : ((this.attributes[t] = this._truncateToSize(r)), this)
          : (fe.warn('Invalid attribute value set for key: ' + t), this);
      }),
      (e.prototype.setAttributes = function (t) {
        var r, n;
        try {
          for (
            var i = Pd(Object.entries(t)), o = i.next();
            !o.done;
            o = i.next()
          ) {
            var s = Sd(o.value, 2),
              a = s[0],
              u = s[1];
            this.setAttribute(a, u);
          }
        } catch (c) {
          r = { error: c };
        } finally {
          try {
            o && !o.done && (n = i.return) && n.call(i);
          } finally {
            if (r) throw r.error;
          }
        }
        return this;
      }),
      (e.prototype.addEvent = function (t, r, n) {
        if (this._isSpanEnded()) return this;
        if (this._spanLimits.eventCountLimit === 0)
          return fe.warn('No events allowed.'), this;
        this.events.length >= this._spanLimits.eventCountLimit &&
          (fe.warn('Dropping extra events.'), this.events.shift()),
          hl(r) && (typeof n > 'u' && (n = r), (r = void 0)),
          typeof n > 'u' && (n = this._clock.now());
        var i = ul(r);
        return this.events.push({ name: t, attributes: i, time: Bn(n) }), this;
      }),
      (e.prototype.setStatus = function (t) {
        return this._isSpanEnded() ? this : ((this.status = t), this);
      }),
      (e.prototype.updateName = function (t) {
        return this._isSpanEnded() ? this : ((this.name = t), this);
      }),
      (e.prototype.end = function (t) {
        if (this._isSpanEnded()) {
          fe.error('You can only call end() on a span once.');
          return;
        }
        (this._ended = !0),
          (this.endTime = Bn(t ?? this._clock.now())),
          (this._duration = ml(this.startTime, this.endTime)),
          this._duration[0] < 0 &&
            (fe.warn(
              'Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.',
              this.startTime,
              this.endTime,
            ),
            (this.endTime = this.startTime.slice()),
            (this._duration = [0, 0])),
          this._spanProcessor.onEnd(this);
      }),
      (e.prototype.isRecording = function () {
        return this._ended === !1;
      }),
      (e.prototype.recordException = function (t, r) {
        r === void 0 && (r = this._clock.now());
        var n = {};
        typeof t == 'string'
          ? (n[nt.EXCEPTION_MESSAGE] = t)
          : t &&
            (t.code
              ? (n[nt.EXCEPTION_TYPE] = t.code.toString())
              : t.name && (n[nt.EXCEPTION_TYPE] = t.name),
            t.message && (n[nt.EXCEPTION_MESSAGE] = t.message),
            t.stack && (n[nt.EXCEPTION_STACKTRACE] = t.stack)),
          n[nt.EXCEPTION_TYPE] || n[nt.EXCEPTION_MESSAGE]
            ? this.addEvent(yl, n, r)
            : fe.warn('Failed to record an exception ' + t);
      }),
      Object.defineProperty(e.prototype, 'duration', {
        get: function () {
          return this._duration;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'ended', {
        get: function () {
          return this._ended;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype._isSpanEnded = function () {
        return (
          this._ended &&
            fe.warn(
              'Can not execute the operation on ended Span {traceId: ' +
                this._spanContext.traceId +
                ', spanId: ' +
                this._spanContext.spanId +
                '}',
            ),
          this._ended
        );
      }),
      (e.prototype._truncateToLimitUtil = function (t, r) {
        return t.length <= r ? t : t.substr(0, r);
      }),
      (e.prototype._truncateToSize = function (t) {
        var r = this,
          n = this._attributeValueLengthLimit;
        return n <= 0
          ? (fe.warn('Attribute value limit must be positive, got ' + n), t)
          : typeof t == 'string'
          ? this._truncateToLimitUtil(t, n)
          : Array.isArray(t)
          ? t.map(function (i) {
              return typeof i == 'string' ? r._truncateToLimitUtil(i, n) : i;
            })
          : t;
      }),
      e
    );
  })();
async function io(e) {
  await new Promise((r) => setTimeout(r, 0));
  let t = ft.getTracer('prisma');
  e.spans.forEach((r) => {
    let n = { traceId: r.trace_id, spanId: r.span_id, traceFlags: tt.SAMPLED },
      i = r.links?.map((s) => ({
        context: {
          traceId: s.trace_id,
          spanId: s.span_id,
          traceFlags: tt.SAMPLED,
        },
      })),
      o = new bl(
        t,
        Tr,
        r.name,
        n,
        Ar.INTERNAL,
        r.parent_span_id,
        i,
        r.start_time,
      );
    r.attributes && o.setAttributes(r.attributes), o.end(r.end_time);
  });
}
l(io, 'createSpan');
function je({ context: e, tracingConfig: t }) {
  let r = ft.getSpanContext(e ?? jt.active());
  return t?.enabled && r
    ? `00-${r.traceId}-${r.spanId}-0${r.traceFlags}`
    : '00-10-10-00';
}
l(je, 'getTraceParent');
function oo(e) {
  let t = e.includes('tracing');
  return {
    get enabled() {
      return Boolean(globalThis.PRISMA_INSTRUMENTATION && t);
    },
    get middleware() {
      return Boolean(
        globalThis.PRISMA_INSTRUMENTATION &&
          globalThis.PRISMA_INSTRUMENTATION.middleware,
      );
    },
  };
}
l(oo, 'getTracingConfig');
async function Be(e, t) {
  if (e.enabled === !1) return t();
  let r = ft.getTracer('prisma'),
    n = e.context ?? jt.active();
  if (e.active === !1) {
    let i = r.startSpan(`prisma:client:${e.name}`, e, n);
    try {
      return await t(i, n);
    } finally {
      i.end();
    }
  }
  return r.startActiveSpan(`prisma:client:${e.name}`, e, n, async (i) => {
    try {
      return await t(i, jt.active());
    } finally {
      i.end();
    }
  });
}
l(Be, 'runInChildSpan');
function Sr(e) {
  return typeof e.batchRequestIdx == 'number';
}
l(Sr, 'hasBatchIndex');
var El = M(ue());
function wl(e) {
  let t = e.e,
    r = l(
      (a) =>
        `Prisma cannot find the required \`${a}\` system library in your system`,
      'systemLibraryNotFound',
    ),
    n = t.message.includes('cannot open shared object file'),
    i = `Please refer to the documentation about Prisma's system requirements: ${yr(
      'https://pris.ly/d/system-requirements',
    )}`,
    o = `Unable to require(\`${El.default.dim(e.id)}\`).`,
    s = Rt({ message: t.message, code: t.code })
      .with({ code: 'ENOENT' }, () => 'File does not exist.')
      .when(
        ({ message: a }) => n && a.includes('libz'),
        () => `${r('libz')}. Please install it and try again.`,
      )
      .when(
        ({ message: a }) => n && a.includes('libgcc_s'),
        () => `${r('libgcc_s')}. Please install it and try again.`,
      )
      .when(
        ({ message: a }) => n && a.includes('libssl'),
        () => {
          let a = e.platformInfo.libssl
            ? `openssl-${e.platformInfo.libssl}`
            : 'openssl';
          return `${r('libssl')}. Please install ${a} and try again.`;
        },
      )
      .when(
        ({ message: a }) => a.includes('GLIBC'),
        () =>
          `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`,
      )
      .when(
        ({ message: a }) =>
          e.platformInfo.platform === 'linux' && a.includes('symbol not found'),
        () =>
          `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`,
      )
      .otherwise(
        () =>
          `The Prisma engines do not seem to be compatible with your system. ${i}`,
      );
  return `${o}
${s}

Details: ${t.message}`;
}
l(wl, 'handleLibraryLoadingErrors');
var Ut = M(ue()),
  Al = M(require('fs'));
function xl(e) {
  if (e?.kind === 'itx') return e.options.id;
}
l(xl, 'getInteractiveTransactionId');
var Re = M(ue()),
  qt = M(require('fs')),
  dt = M(require('path'));
var vl = U('prisma:client:libraryEngine:loader');
function Cd(id) {
  return eval('require')(id);
}
l(Cd, 'load');
var Cr = class {
  constructor(e) {
    this.libQueryEnginePath = null;
    this.platform = null;
    this.config = e;
  }
  async loadLibrary() {
    let e = await Qi();
    (this.platform = e.binaryTarget),
      this.libQueryEnginePath ||
        (this.libQueryEnginePath = await this.getLibQueryEnginePath()),
      vl(`loadEngine using ${this.libQueryEnginePath}`);
    try {
      return Cd(this.libQueryEnginePath);
    } catch (t) {
      let r = wl({ e: t, platformInfo: e, id: this.libQueryEnginePath });
      throw new V(r, this.config.clientVersion);
    }
  }
  async getLibQueryEnginePath() {
    let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY ?? this.config.prismaPath;
    if (e && qt.default.existsSync(e) && e.endsWith('.node')) return e;
    this.platform = this.platform ?? (await ze());
    let { enginePath: t, searchedLocations: r } =
      await this.resolveEnginePath();
    if (!qt.default.existsSync(t)) {
      let n = this.platform
          ? `
You incorrectly pinned it to ${Re.default.redBright.bold(`${this.platform}`)}
`
          : '',
        i = `Query engine library for current platform "${Re.default.bold(
          this.platform,
        )}" could not be found.${n}
This probably happens, because you built Prisma Client on a different platform.
(Prisma Client looked in "${Re.default.underline(t)}")

Searched Locations:

${r
  .map((o) => {
    let s = `  ${o}`;
    if (
      process.env.DEBUG === 'node-engine-search-locations' &&
      qt.default.existsSync(o)
    ) {
      let a = qt.default.readdirSync(o);
      s += a.map((u) => `    ${u}`).join(`
`);
    }
    return s;
  })
  .join(
    `
` +
      (process.env.DEBUG === 'node-engine-search-locations'
        ? `
`
        : ''),
  )}
`;
      throw (
        (this.config.generator
          ? ((this.platform = this.platform ?? (await ze())),
            this.config.generator.binaryTargets.find(
              (o) => o.value === this.platform,
            ) ||
            this.config.generator.binaryTargets.find(
              (o) => o.value === 'native',
            )
              ? ((i += `
You already added the platform${
                  this.config.generator.binaryTargets.length > 1 ? 's' : ''
                } ${this.config.generator.binaryTargets
                  .map((o) => `"${Re.default.bold(o.value)}"`)
                  .join(', ')} to the "${Re.default.underline(
                  'generator',
                )}" block
in the "schema.prisma" file as described in https://pris.ly/d/client-generator,
but something went wrong. That's suboptimal.

Please create an issue at https://github.com/prisma/prisma/issues/new`),
                (i += ''))
              : (i += `

To solve this problem, add the platform "${
                  this.platform
                }" to the "${Re.default.underline(
                  'binaryTargets',
                )}" attribute in the "${Re.default.underline(
                  'generator',
                )}" block in the "schema.prisma" file:
${Re.default.greenBright(this.getFixedGenerator())}

Then run "${Re.default.greenBright(
                  'prisma generate',
                )}" for your changes to take effect.
Read more about deploying Prisma Client: https://pris.ly/d/client-generator`))
          : (i += `

Read more about deploying Prisma Client: https://pris.ly/d/client-generator
`),
        new V(i, this.config.clientVersion))
      );
    }
    return (this.platform = this.platform ?? (await ze())), t;
  }
  async resolveEnginePath() {
    let searchedLocations = [],
      enginePath;
    if (this.libQueryEnginePath)
      return { enginePath: this.libQueryEnginePath, searchedLocations };
    if (
      ((this.platform = this.platform ?? (await ze())),
      __filename.includes('DefaultLibraryLoader'))
    )
      return (
        (enginePath = dt.default.join(Ma(), mr(this.platform, 'fs'))),
        { enginePath, searchedLocations }
      );
    let dirname = eval('__dirname'),
      searchLocations = [
        dt.default.resolve(dirname, '../../../.prisma/client'),
        this.config.generator?.output?.value ?? dirname,
        dt.default.resolve(dirname, '..'),
        dt.default.dirname(this.config.datamodelPath),
        this.config.cwd,
        '/tmp/prisma-engines',
      ];
    this.config.dirname && searchLocations.push(this.config.dirname);
    for (let e of searchLocations)
      if (
        (searchedLocations.push(e),
        vl(`Searching for Query Engine Library in ${e}`),
        (enginePath = dt.default.join(e, mr(this.platform, 'fs'))),
        qt.default.existsSync(enginePath))
      )
        return { enginePath, searchedLocations };
    return (
      (enginePath = dt.default.join(__dirname, mr(this.platform, 'fs'))),
      { enginePath: enginePath ?? '', searchedLocations }
    );
  }
  getFixedGenerator() {
    let e = {
      ...this.config.generator,
      binaryTargets: La(this.config.generator.binaryTargets, this.platform),
    };
    return Qa(e);
  }
};
l(Cr, 'DefaultLibraryLoader');
var Od = U('prisma:client:libraryEngine:exitHooks'),
  Or = class {
    constructor() {
      this.nextOwnerId = 1;
      this.ownerToIdMap = new WeakMap();
      this.idToListenerMap = new Map();
      this.areHooksInstalled = !1;
    }
    install() {
      this.areHooksInstalled ||
        (this.installHook('beforeExit'),
        this.installHook('exit'),
        this.installHook('SIGINT', !0),
        this.installHook('SIGUSR2', !0),
        this.installHook('SIGTERM', !0),
        (this.areHooksInstalled = !0));
    }
    setListener(t, r) {
      if (r) {
        let n = this.ownerToIdMap.get(t);
        n || ((n = this.nextOwnerId++), this.ownerToIdMap.set(t, n)),
          this.idToListenerMap.set(n, r);
      } else {
        let n = this.ownerToIdMap.get(t);
        n !== void 0 &&
          (this.ownerToIdMap.delete(t), this.idToListenerMap.delete(n));
      }
    }
    getListener(t) {
      let r = this.ownerToIdMap.get(t);
      if (r !== void 0) return this.idToListenerMap.get(r);
    }
    installHook(t, r = !1) {
      process.once(t, async (n) => {
        Od(`exit event received: ${t}`);
        for (let i of this.idToListenerMap.values()) await i();
        this.idToListenerMap.clear(),
          r && process.listenerCount(t) === 0 && process.exit(n);
      });
    }
  };
l(Or, 'ExitHooks');
var qe = U('prisma:client:libraryEngine');
function Md(e) {
  return e.item_type === 'query' && 'query' in e;
}
l(Md, 'isQueryEvent');
function Nd(e) {
  return 'level' in e ? e.level === 'error' && e.message === 'PANIC' : !1;
}
l(Nd, 'isPanicEvent');
var Tl = [...Wi, 'native'],
  _l = 0,
  so = new Or(),
  Gt = class extends Xe {
    constructor(r, n = new Cr(r)) {
      super();
      (this.datamodel = Al.default.readFileSync(r.datamodelPath, 'utf-8')),
        (this.config = r),
        (this.libraryStarted = !1),
        (this.logQueries = r.logQueries ?? !1),
        (this.logLevel = r.logLevel ?? 'error'),
        (this.libraryLoader = n),
        (this.logEmitter = r.logEmitter),
        (this.datasourceOverrides = r.datasources
          ? this.convertDatasources(r.datasources)
          : {}),
        r.enableDebugLogs && (this.logLevel = 'debug'),
        (this.libraryInstantiationPromise = this.instantiateLibrary()),
        so.install(),
        this.checkForTooManyEngines();
    }
    get beforeExitListener() {
      return so.getListener(this);
    }
    set beforeExitListener(r) {
      so.setListener(this, r);
    }
    checkForTooManyEngines() {
      _l === 10 &&
        console.warn(
          `${Ut.default.yellow(
            'warn(prisma-client)',
          )} There are already 10 instances of Prisma Client actively running.`,
        );
    }
    async transaction(r, n, i) {
      await this.start();
      let o = JSON.stringify(n),
        s;
      if (r === 'start') {
        let u = JSON.stringify({
          max_wait: i?.maxWait ?? 2e3,
          timeout: i?.timeout ?? 5e3,
          isolation_level: i?.isolationLevel,
        });
        s = await this.engine?.startTransaction(u, o);
      } else
        r === 'commit'
          ? (s = await this.engine?.commitTransaction(i.id, o))
          : r === 'rollback' &&
            (s = await this.engine?.rollbackTransaction(i.id, o));
      let a = this.parseEngineResponse(s);
      if (a.error_code)
        throw new te(a.message, {
          code: a.error_code,
          clientVersion: this.config.clientVersion,
          meta: a.meta,
        });
      return a;
    }
    async instantiateLibrary() {
      if ((qe('internalSetup'), this.libraryInstantiationPromise))
        return this.libraryInstantiationPromise;
      await Hi(),
        (this.platform = await this.getPlatform()),
        await this.loadEngine(),
        this.version();
    }
    async getPlatform() {
      if (this.platform) return this.platform;
      let r = await ze();
      if (!Tl.includes(r))
        throw new V(
          `Unknown ${Ut.default.red(
            'PRISMA_QUERY_ENGINE_LIBRARY',
          )} ${Ut.default.redBright.bold(
            r,
          )}. Possible binaryTargets: ${Ut.default.greenBright(
            Tl.join(', '),
          )} or a path to the query engine library.
You may have to run ${Ut.default.greenBright(
            'prisma generate',
          )} for your changes to take effect.`,
          this.config.clientVersion,
        );
      return r;
    }
    parseEngineResponse(r) {
      if (!r)
        throw new J('Response from the Engine was empty', {
          clientVersion: this.config.clientVersion,
        });
      try {
        return JSON.parse(r);
      } catch {
        throw new J('Unable to JSON.parse response from engine', {
          clientVersion: this.config.clientVersion,
        });
      }
    }
    convertDatasources(r) {
      let n = Object.create(null);
      for (let { name: i, url: o } of r) n[i] = o;
      return n;
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          ((this.library = await this.libraryLoader.loadLibrary()),
          (this.QueryEngineConstructor = this.library.QueryEngine));
        try {
          let r = new WeakRef(this);
          (this.engine = new this.QueryEngineConstructor(
            {
              datamodel: this.datamodel,
              env: process.env,
              logQueries: this.config.logQueries ?? !1,
              ignoreEnvVarErrors: !1,
              datasourceOverrides: this.datasourceOverrides,
              logLevel: this.logLevel,
              configDir: this.config.cwd,
            },
            (n) => {
              r.deref()?.logger(n);
            },
          )),
            _l++;
        } catch (r) {
          let n = r,
            i = this.parseInitError(n.message);
          throw typeof i == 'string'
            ? n
            : new V(i.message, this.config.clientVersion, i.error_code);
        }
      }
    }
    logger(r) {
      let n = this.parseEngineResponse(r);
      if (!!n) {
        if ('span' in n) {
          this.config.tracingConfig.enabled === !0 && io(n);
          return;
        }
        (n.level = n?.level.toLowerCase() ?? 'unknown'),
          Md(n)
            ? this.logEmitter.emit('query', {
                timestamp: new Date(),
                query: n.query,
                params: n.params,
                duration: Number(n.duration_ms),
                target: n.module_path,
              })
            : Nd(n)
            ? (this.loggerRustPanic = new pe(
                this.getErrorMessageWithLink(
                  `${n.message}: ${n.reason} in ${n.file}:${n.line}:${n.column}`,
                ),
                this.config.clientVersion,
              ))
            : this.logEmitter.emit(n.level, {
                timestamp: new Date(),
                message: n.message,
                target: n.module_path,
              });
      }
    }
    getErrorMessageWithLink(r) {
      return Ua({
        platform: this.platform,
        title: r,
        version: this.config.clientVersion,
        engineVersion: this.versionInfo?.commit,
        database: this.config.activeProvider,
        query: this.lastQuery,
      });
    }
    parseInitError(r) {
      try {
        return JSON.parse(r);
      } catch {}
      return r;
    }
    parseRequestError(r) {
      try {
        return JSON.parse(r);
      } catch {}
      return r;
    }
    on(r, n) {
      r === 'beforeExit'
        ? (this.beforeExitListener = n)
        : this.logEmitter.on(r, n);
    }
    async start() {
      if (
        (await this.libraryInstantiationPromise,
        await this.libraryStoppingPromise,
        this.libraryStartingPromise)
      )
        return (
          qe(
            `library already starting, this.libraryStarted: ${this.libraryStarted}`,
          ),
          this.libraryStartingPromise
        );
      if (this.libraryStarted) return;
      let r = l(async () => {
          qe('library starting');
          try {
            let i = {
              traceparent: je({ tracingConfig: this.config.tracingConfig }),
            };
            await this.engine?.connect(JSON.stringify(i)),
              (this.libraryStarted = !0),
              qe('library started');
          } catch (i) {
            let o = this.parseInitError(i.message);
            throw typeof o == 'string'
              ? i
              : new V(o.message, this.config.clientVersion, o.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, 'startFn'),
        n = { name: 'connect', enabled: this.config.tracingConfig.enabled };
      return (
        (this.libraryStartingPromise = Be(n, r)), this.libraryStartingPromise
      );
    }
    async stop() {
      if (
        (await this.libraryStartingPromise,
        await this.executingQueryPromise,
        this.libraryStoppingPromise)
      )
        return qe('library is already stopping'), this.libraryStoppingPromise;
      if (!this.libraryStarted) return;
      let r = l(async () => {
          await new Promise((o) => setTimeout(o, 5)), qe('library stopping');
          let i = {
            traceparent: je({ tracingConfig: this.config.tracingConfig }),
          };
          await this.engine?.disconnect(JSON.stringify(i)),
            (this.libraryStarted = !1),
            (this.libraryStoppingPromise = void 0),
            qe('library stopped');
        }, 'stopFn'),
        n = { name: 'disconnect', enabled: this.config.tracingConfig.enabled };
      return (
        (this.libraryStoppingPromise = Be(n, r)), this.libraryStoppingPromise
      );
    }
    async getConfig() {
      return (
        await this.libraryInstantiationPromise,
        this.library.getConfig({
          datamodel: this.datamodel,
          datasourceOverrides: this.datasourceOverrides,
          ignoreEnvVarErrors: !0,
          env: process.env,
        })
      );
    }
    async getDmmf() {
      return await this.start(), JSON.parse(await this.engine.dmmf());
    }
    version() {
      return (
        (this.versionInfo = this.library?.version()),
        this.versionInfo?.version ?? 'unknown'
      );
    }
    debugPanic(r) {
      return this.library?.debugPanic(r);
    }
    async request(r, { traceparent: n, interactiveTransaction: i }) {
      qe(`sending request, this.libraryStarted: ${this.libraryStarted}`);
      let o = { query: r.query, variables: {} },
        s = JSON.stringify({ traceparent: n }),
        a = JSON.stringify(o);
      try {
        await this.start(),
          (this.executingQueryPromise = this.engine?.query(a, s, i?.id)),
          (this.lastQuery = a);
        let u = this.parseEngineResponse(await this.executingQueryPromise);
        if (u.errors)
          throw u.errors.length === 1
            ? this.buildQueryError(u.errors[0])
            : new J(JSON.stringify(u.errors), {
                clientVersion: this.config.clientVersion,
              });
        if (this.loggerRustPanic) throw this.loggerRustPanic;
        return { data: u, elapsed: 0 };
      } catch (u) {
        if (u instanceof V) throw u;
        if (u.code === 'GenericFailure' && u.message?.startsWith('PANIC:'))
          throw new pe(
            this.getErrorMessageWithLink(u.message),
            this.config.clientVersion,
          );
        let c = this.parseRequestError(u.message);
        throw typeof c == 'string'
          ? u
          : new J(
              `${c.message}
${c.backtrace}`,
              { clientVersion: this.config.clientVersion },
            );
      }
    }
    async requestBatch(r, { transaction: n, traceparent: i }) {
      qe('requestBatch');
      let o = Va(r, n);
      await this.start(),
        (this.lastQuery = JSON.stringify(o)),
        (this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: i }),
          xl(n),
        ));
      let s = await this.executingQueryPromise,
        a = this.parseEngineResponse(s);
      if (a.errors)
        throw a.errors.length === 1
          ? this.buildQueryError(a.errors[0])
          : new J(JSON.stringify(a.errors), {
              clientVersion: this.config.clientVersion,
            });
      let { batchResult: u, errors: c } = a;
      if (Array.isArray(u))
        return u.map((p) =>
          p.errors && p.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(p.errors[0])
            : { data: p, elapsed: 0 },
        );
      throw c && c.length === 1
        ? new Error(c[0].error)
        : new Error(JSON.stringify(a));
    }
    buildQueryError(r) {
      return r.user_facing_error.is_panic
        ? new pe(
            this.getErrorMessageWithLink(r.user_facing_error.message),
            this.config.clientVersion,
          )
        : Ga(r, this.config.clientVersion);
    }
    async metrics(r) {
      await this.start();
      let n = await this.engine.metrics(JSON.stringify(r));
      return r.format === 'prometheus' ? n : this.parseEngineResponse(n);
    }
  };
l(Gt, 'LibraryEngine');
var de = M(ue()),
  uo = M(Cl()),
  Gn = M(require('fs')),
  Vt = M(require('path'));
function Ol(e) {
  let t = e.ignoreProcessEnv ? {} : process.env,
    r = l(
      (n) =>
        n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function (o, s) {
          let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
          if (!a) return o;
          let u = a[1],
            c,
            p;
          if (u === '\\') (p = a[0]), (c = p.replace('\\$', '$'));
          else {
            let f = a[2];
            (p = a[0].substring(u.length)),
              (c = Object.hasOwnProperty.call(t, f) ? t[f] : e.parsed[f] || ''),
              (c = r(c));
          }
          return o.replace(p, c);
        }, n) ?? n,
      'interpolate',
    );
  for (let n in e.parsed) {
    let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n];
    e.parsed[n] = r(i);
  }
  for (let n in e.parsed) t[n] = e.parsed[n];
  return e;
}
l(Ol, 'dotenvExpand');
var lo = U('prisma:tryLoadEnv');
function Mr(
  { rootEnvPath: e, schemaEnvPath: t },
  r = { conflictCheck: 'none' },
) {
  let n = Ml(e);
  r.conflictCheck !== 'none' && qd(n, t, r.conflictCheck);
  let i = null;
  return (
    Nl(n?.path, t) || (i = Ml(t)),
    !n && !i && lo('No Environment variables loaded'),
    i?.dotenvResult.error
      ? console.error(
          de.default.redBright.bold('Schema Env Error: ') +
            i.dotenvResult.error,
        )
      : {
          message: [n?.message, i?.message].filter(Boolean).join(`
`),
          parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed },
        }
  );
}
l(Mr, 'tryLoadEnvs');
function qd(e, t, r) {
  let n = e?.dotenvResult.parsed,
    i = !Nl(e?.path, t);
  if (n && t && i && Gn.default.existsSync(t)) {
    let o = uo.default.parse(Gn.default.readFileSync(t)),
      s = [];
    for (let a in o) n[a] === o[a] && s.push(a);
    if (s.length > 0) {
      let a = Vt.default.relative(process.cwd(), e.path),
        u = Vt.default.relative(process.cwd(), t);
      if (r === 'error') {
        let c = `There is a conflict between env var${
          s.length > 1 ? 's' : ''
        } in ${de.default.underline(a)} and ${de.default.underline(u)}
Conflicting env vars:
${s.map((p) => `  ${de.default.bold(p)}`).join(`
`)}

We suggest to move the contents of ${de.default.underline(
          u,
        )} to ${de.default.underline(a)} to consolidate your env vars.
`;
        throw new Error(c);
      } else if (r === 'warn') {
        let c = `Conflict for env var${s.length > 1 ? 's' : ''} ${s
          .map((p) => de.default.bold(p))
          .join(', ')} in ${de.default.underline(a)} and ${de.default.underline(
          u,
        )}
Env vars from ${de.default.underline(
          u,
        )} overwrite the ones from ${de.default.underline(a)}
      `;
        console.warn(`${de.default.yellow('warn(prisma)')} ${c}`);
      }
    }
  }
}
l(qd, 'checkForConflicts');
function Ml(e) {
  return Ud(e)
    ? (lo(`Environment variables loaded from ${e}`),
      {
        dotenvResult: Ol(
          uo.default.config({
            path: e,
            debug: process.env.DOTENV_CONFIG_DEBUG ? !0 : void 0,
          }),
        ),
        message: de.default.dim(
          `Environment variables loaded from ${Vt.default.relative(
            process.cwd(),
            e,
          )}`,
        ),
        path: e,
      })
    : (lo(`Environment variables not found at ${e}`), null);
}
l(Ml, 'loadEnv');
function Nl(e, t) {
  return e && t && Vt.default.resolve(e) === Vt.default.resolve(t);
}
l(Nl, 'pathsEqual');
function Ud(e) {
  return Boolean(e && Gn.default.existsSync(e));
}
l(Ud, 'exists');
var Rl = 'library';
function co(e) {
  let t = Gd();
  return (
    t ||
    (e?.config.engineType === 'library'
      ? 'library'
      : e?.config.engineType === 'binary'
      ? 'binary'
      : Rl)
  );
}
l(co, 'getClientEngineType');
function Gd() {
  let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
  return e === 'library' ? 'library' : e === 'binary' ? 'binary' : void 0;
}
l(Gd, 'getEngineTypeFromEnvVar');
var Kd = M(Dl()),
  Qd = M(fo());
function Rr(e) {
  return e instanceof Error;
}
l(Rr, 'isError');
var Fr = {};
Jr(Fr, {
  error: () => Jd,
  info: () => Wd,
  log: () => Hd,
  query: () => Yd,
  should: () => $l,
  tags: () => Dr,
  warn: () => mo,
});
var Ir = M(ue());
var Dr = {
    error: Ir.default.red('prisma:error'),
    warn: Ir.default.yellow('prisma:warn'),
    info: Ir.default.cyan('prisma:info'),
    query: Ir.default.blue('prisma:query'),
  },
  $l = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
function Hd(...e) {
  console.log(...e);
}
l(Hd, 'log');
function mo(e, ...t) {
  $l.warn() && console.warn(`${Dr.warn} ${e}`, ...t);
}
l(mo, 'warn');
function Wd(e, ...t) {
  console.info(`${Dr.info} ${e}`, ...t);
}
l(Wd, 'info');
function Jd(e, ...t) {
  console.error(`${Dr.error} ${e}`, ...t);
}
l(Jd, 'error');
function Yd(e, ...t) {
  console.log(`${Dr.query} ${e}`, ...t);
}
l(Yd, 'query');
function go(e, t) {
  throw new Error(t);
}
l(go, 'assertNever');
function Vn(e) {
  let t;
  return (...r) => t ?? (t = e(...r));
}
l(Vn, 'callOnce');
function ho(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
l(ho, 'hasOwnProperty');
var yo = l((e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {}), 'keyBy');
function Kn(e, t) {
  return Object.fromEntries(Object.entries(e).map(([r, n]) => [r, t(n, r)]));
}
l(Kn, 'mapObjectValues');
var jl = new Set(),
  bo = l((e, t, ...r) => {
    jl.has(e) || (jl.add(e), mo(t, ...r));
  }, 'warnOnce');
var cc = require('async_hooks'),
  pc = require('events'),
  fc = M(require('fs')),
  Hr = M(require('path'));
var Y = class {
  constructor(t, r) {
    if (t.length - 1 !== r.length)
      throw t.length === 0
        ? new TypeError('Expected at least 1 string')
        : new TypeError(
            `Expected ${t.length} strings to have ${t.length - 1} values`,
          );
    let n = r.reduce((s, a) => s + (a instanceof Y ? a.values.length : 1), 0);
    (this.values = new Array(n)),
      (this.strings = new Array(n + 1)),
      (this.strings[0] = t[0]);
    let i = 0,
      o = 0;
    for (; i < r.length; ) {
      let s = r[i++],
        a = t[i];
      if (s instanceof Y) {
        this.strings[o] += s.strings[0];
        let u = 0;
        for (; u < s.values.length; )
          (this.values[o++] = s.values[u++]), (this.strings[o] = s.strings[u]);
        this.strings[o] += a;
      } else (this.values[o++] = s), (this.strings[o] = a);
    }
  }
  get text() {
    let t = 1,
      r = this.strings[0];
    for (; t < this.strings.length; ) r += `$${t}${this.strings[t++]}`;
    return r;
  }
  get sql() {
    let t = 1,
      r = this.strings[0];
    for (; t < this.strings.length; ) r += `?${this.strings[t++]}`;
    return r;
  }
  inspect() {
    return { text: this.text, sql: this.sql, values: this.values };
  }
};
l(Y, 'Sql');
function Bl(e, t = ',', r = '', n = '') {
  if (e.length === 0)
    throw new TypeError(
      'Expected `join([])` to be called with an array of multiple elements, but got an empty array',
    );
  return new Y([r, ...Array(e.length - 1).fill(t), n], e);
}
l(Bl, 'join');
function Eo(e) {
  return new Y([e], []);
}
l(Eo, 'raw');
var ql = Eo('');
function wo(e, ...t) {
  return new Y(e, t);
}
l(wo, 'sql');
var Gl = M(Ul());
function Vl(e) {
  return { ...e, mappings: Xd(e.mappings, e.datamodel) };
}
l(Vl, 'externalToInternalDmmf');
function Xd(e, t) {
  return {
    modelOperations: e.modelOperations
      .filter((n) => {
        let i = t.models.find((o) => o.name === n.model);
        if (!i) throw new Error(`Mapping without model ${n.model}`);
        return i.fields.some((o) => o.kind !== 'object');
      })
      .map((n) => ({
        model: n.model,
        plural: (0, Gl.default)(yn(n.model)),
        findUnique: n.findUnique || n.findSingle,
        findUniqueOrThrow: n.findUniqueOrThrow,
        findFirst: n.findFirst,
        findFirstOrThrow: n.findFirstOrThrow,
        findMany: n.findMany,
        create: n.createOne || n.createSingle || n.create,
        createMany: n.createMany,
        delete: n.deleteOne || n.deleteSingle || n.delete,
        update: n.updateOne || n.updateSingle || n.update,
        deleteMany: n.deleteMany,
        updateMany: n.updateMany,
        upsert: n.upsertOne || n.upsertSingle || n.upsert,
        aggregate: n.aggregate,
        groupBy: n.groupBy,
        findRaw: n.findRaw,
        aggregateRaw: n.aggregateRaw,
      })),
    otherOperations: e.otherOperations,
  };
}
l(Xd, 'getMappings');
function Kl(e) {
  return Vl(e);
}
l(Kl, 'getPrismaClientDMMF');
var _ = M(ue());
var mt = M(er()),
  Oo = M(Er());
var Se = class {
  constructor() {
    this._map = new Map();
  }
  get(t) {
    return this._map.get(t)?.value;
  }
  set(t, r) {
    this._map.set(t, { value: r });
  }
  getOrCreate(t, r) {
    let n = this._map.get(t);
    if (n) return n.value;
    let i = r();
    return this.set(t, i), i;
  }
};
l(Se, 'Cache');
function we(e) {
  return e.replace(/^./, (t) => t.toLowerCase());
}
l(we, 'dmmfToJSModelName');
function Hl(e, t, r) {
  let n = we(r);
  return !t.result || !(t.result.$allModels || t.result[n])
    ? e
    : Zd({
        ...e,
        ...Ql(t.name, e, t.result.$allModels),
        ...Ql(t.name, e, t.result[n]),
      });
}
l(Hl, 'getComputedFields');
function Zd(e) {
  let t = new Se(),
    r = l(
      (n, i) =>
        t.getOrCreate(n, () =>
          i.has(n)
            ? [n]
            : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]),
        ),
      'resolveNeeds',
    );
  return Kn(e, (n) => ({ ...n, needs: r(n.name, new Set()) }));
}
l(Zd, 'resolveDependencies');
function Ql(e, t, r) {
  return r
    ? Kn(r, ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter((s) => n[s]) : [],
        compute: em(t, o, i),
      }))
    : {};
}
l(Ql, 'getComputedFieldsFromModel');
function em(e, t, r) {
  let n = e?.[t]?.compute;
  return n ? (i) => r({ ...i, [t]: n(i) }) : r;
}
l(em, 'composeCompute');
function Wl(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t))
    if (!!e[n.name]) for (let i of n.needs) r[i] = !0;
  return r;
}
l(Wl, 'applyComputedFieldsToSelection');
var Kt = M(ue()),
  ru = M(er());
var tu = M(require('fs'));
var it = M(ue());
var tm = it.default.rgb(246, 145, 95),
  rm = it.default.rgb(107, 139, 140),
  Qn = it.default.cyan,
  Jl = it.default.rgb(127, 155, 155),
  Yl = l((e) => e, 'identity'),
  zl = {
    keyword: Qn,
    entity: Qn,
    value: Jl,
    punctuation: rm,
    directive: Qn,
    function: Qn,
    variable: Jl,
    string: it.default.greenBright,
    boolean: tm,
    number: it.default.cyan,
    comment: it.default.grey,
  };
var Hn = {},
  nm = 0,
  R = {
    manual: Hn.Prism && Hn.Prism.manual,
    disableWorkerMessageHandler:
      Hn.Prism && Hn.Prism.disableWorkerMessageHandler,
    util: {
      encode: function (e) {
        if (e instanceof Ce) {
          let t = e;
          return new Ce(t.type, R.util.encode(t.content), t.alias);
        } else
          return Array.isArray(e)
            ? e.map(R.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ');
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      objId: function (e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++nm }), e.__id
        );
      },
      clone: l(function e(t, r) {
        let n,
          i,
          o = R.util.type(t);
        switch (((r = r || {}), o)) {
          case 'Object':
            if (((i = R.util.objId(t)), r[i])) return r[i];
            (n = {}), (r[i] = n);
            for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r));
            return n;
          case 'Array':
            return (
              (i = R.util.objId(t)),
              r[i]
                ? r[i]
                : ((n = []),
                  (r[i] = n),
                  t.forEach(function (s, a) {
                    n[a] = e(s, r);
                  }),
                  n)
            );
          default:
            return t;
        }
      }, 'deepClone'),
    },
    languages: {
      extend: function (e, t) {
        let r = R.util.clone(R.languages[e]);
        for (let n in t) r[n] = t[n];
        return r;
      },
      insertBefore: function (e, t, r, n) {
        n = n || R.languages;
        let i = n[e],
          o = {};
        for (let a in i)
          if (i.hasOwnProperty(a)) {
            if (a == t) for (let u in r) r.hasOwnProperty(u) && (o[u] = r[u]);
            r.hasOwnProperty(a) || (o[a] = i[a]);
          }
        let s = n[e];
        return (
          (n[e] = o),
          R.languages.DFS(R.languages, function (a, u) {
            u === s && a != e && (this[a] = o);
          }),
          o
        );
      },
      DFS: l(function e(t, r, n, i) {
        i = i || {};
        let o = R.util.objId;
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            r.call(t, s, t[s], n || s);
            let a = t[s],
              u = R.util.type(a);
            u === 'Object' && !i[o(a)]
              ? ((i[o(a)] = !0), e(a, r, null, i))
              : u === 'Array' && !i[o(a)] && ((i[o(a)] = !0), e(a, r, s, i));
          }
      }, 'DFS'),
    },
    plugins: {},
    highlight: function (e, t, r) {
      let n = { code: e, grammar: t, language: r };
      return (
        R.hooks.run('before-tokenize', n),
        (n.tokens = R.tokenize(n.code, n.grammar)),
        R.hooks.run('after-tokenize', n),
        Ce.stringify(R.util.encode(n.tokens), n.language)
      );
    },
    matchGrammar: function (e, t, r, n, i, o, s) {
      for (let g in r) {
        if (!r.hasOwnProperty(g) || !r[g]) continue;
        if (g == s) return;
        let w = r[g];
        w = R.util.type(w) === 'Array' ? w : [w];
        for (let y = 0; y < w.length; ++y) {
          let x = w[y],
            b = x.inside,
            E = !!x.lookbehind,
            T = !!x.greedy,
            C = 0,
            A = x.alias;
          if (T && !x.pattern.global) {
            let F = x.pattern.toString().match(/[imuy]*$/)[0];
            x.pattern = RegExp(x.pattern.source, F + 'g');
          }
          x = x.pattern || x;
          for (let F = n, B = i; F < t.length; B += t[F].length, ++F) {
            let q = t[F];
            if (t.length > e.length) return;
            if (q instanceof Ce) continue;
            if (T && F != t.length - 1) {
              x.lastIndex = B;
              var f = x.exec(e);
              if (!f) break;
              var p = f.index + (E ? f[1].length : 0),
                d = f.index + f[0].length,
                a = F,
                u = B;
              for (
                let L = t.length;
                a < L && (u < d || (!t[a].type && !t[a - 1].greedy));
                ++a
              )
                (u += t[a].length), p >= u && (++F, (B = u));
              if (t[F] instanceof Ce) continue;
              (c = a - F), (q = e.slice(B, u)), (f.index -= B);
            } else {
              x.lastIndex = 0;
              var f = x.exec(q),
                c = 1;
            }
            if (!f) {
              if (o) break;
              continue;
            }
            E && (C = f[1] ? f[1].length : 0);
            var p = f.index + C,
              f = f[0].slice(C),
              d = p + f.length,
              m = q.slice(0, p),
              h = q.slice(d);
            let z = [F, c];
            m && (++F, (B += m.length), z.push(m));
            let yt = new Ce(g, b ? R.tokenize(f, b) : f, A, f, T);
            if (
              (z.push(yt),
              h && z.push(h),
              Array.prototype.splice.apply(t, z),
              c != 1 && R.matchGrammar(e, t, r, F, B, !0, g),
              o)
            )
              break;
          }
        }
      }
    },
    tokenize: function (e, t) {
      let r = [e],
        n = t.rest;
      if (n) {
        for (let i in n) t[i] = n[i];
        delete t.rest;
      }
      return R.matchGrammar(e, r, t, 0, 0, !1), r;
    },
    hooks: {
      all: {},
      add: function (e, t) {
        let r = R.hooks.all;
        (r[e] = r[e] || []), r[e].push(t);
      },
      run: function (e, t) {
        let r = R.hooks.all[e];
        if (!(!r || !r.length)) for (var n = 0, i; (i = r[n++]); ) i(t);
      },
    },
    Token: Ce,
  };
R.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  'class-name': {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
R.languages.javascript = R.languages.extend('clike', {
  'class-name': [
    R.languages.clike['class-name'],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function:
    /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
});
R.languages.javascript['class-name'][0].pattern =
  /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
R.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern:
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0,
  },
  'function-variable': {
    pattern:
      /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: 'function',
  },
  parameter: [
    {
      pattern:
        /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
      lookbehind: !0,
      inside: R.languages.javascript,
    },
    {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
      inside: R.languages.javascript,
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
      lookbehind: !0,
      inside: R.languages.javascript,
    },
    {
      pattern:
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
      lookbehind: !0,
      inside: R.languages.javascript,
    },
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
});
R.languages.markup && R.languages.markup.tag.addInlined('script', 'javascript');
R.languages.js = R.languages.javascript;
R.languages.typescript = R.languages.extend('javascript', {
  keyword:
    /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
  builtin:
    /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
});
R.languages.ts = R.languages.typescript;
function Ce(e, t, r, n, i) {
  (this.type = e),
    (this.content = t),
    (this.alias = r),
    (this.length = (n || '').length | 0),
    (this.greedy = !!i);
}
l(Ce, 'Token');
Ce.stringify = function (e, t) {
  return typeof e == 'string'
    ? e
    : Array.isArray(e)
    ? e
        .map(function (r) {
          return Ce.stringify(r, t);
        })
        .join('')
    : im(e.type)(e.content);
};
function im(e) {
  return zl[e] || Yl;
}
l(im, 'getColorForSyntaxKind');
function Xl(e) {
  return om(e, R.languages.javascript);
}
l(Xl, 'highlightTS');
function om(e, t) {
  return R.tokenize(e, t)
    .map((n) => Ce.stringify(n))
    .join('');
}
l(om, 'highlight');
var Zl = M(fo());
function eu(e) {
  return (0, Zl.default)(e);
}
l(eu, 'dedent');
var xe = class {
  static read(t) {
    let r;
    try {
      r = tu.default.readFileSync(t, 'utf-8');
    } catch {
      return null;
    }
    return xe.fromContent(r);
  }
  static fromContent(t) {
    let r = t.split(/\r?\n/);
    return new xe(1, r);
  }
  constructor(t, r) {
    (this.firstLineNumber = t), (this.lines = r);
  }
  get lastLineNumber() {
    return this.firstLineNumber + this.lines.length - 1;
  }
  mapLineAt(t, r) {
    if (
      t < this.firstLineNumber ||
      t > this.lines.length + this.firstLineNumber
    )
      return this;
    let n = t - this.firstLineNumber,
      i = [...this.lines];
    return (i[n] = r(i[n])), new xe(this.firstLineNumber, i);
  }
  mapLines(t) {
    return new xe(
      this.firstLineNumber,
      this.lines.map((r, n) => t(r, this.firstLineNumber + n)),
    );
  }
  lineAt(t) {
    return this.lines[t - this.firstLineNumber];
  }
  prependSymbolAt(t, r) {
    return this.mapLines((n, i) => (i === t ? `${r} ${n}` : `  ${n}`));
  }
  slice(t, r) {
    let n = this.lines.slice(t - 1, r).join(`
`);
    return new xe(
      t,
      eu(n).split(`
`),
    );
  }
  highlight() {
    let t = Xl(this.toString());
    return new xe(
      this.firstLineNumber,
      t.split(`
`),
    );
  }
  toString() {
    return this.lines.join(`
`);
  }
};
l(xe, 'SourceFileSlice');
var sm = {
    red: (e) => Kt.default.red(e),
    gray: (e) => Kt.default.gray(e),
    dim: (e) => Kt.default.dim(e),
    bold: (e) => Kt.default.bold(e),
    underline: (e) => Kt.default.underline(e),
    highlightSource: (e) => e.highlight(),
  },
  am = {
    red: (e) => e,
    gray: (e) => e,
    dim: (e) => e,
    bold: (e) => e,
    underline: (e) => e,
    highlightSource: (e) => e,
  };
function lm(
  { callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i },
  o,
) {
  let s = {
    functionName: `prisma.${r}()`,
    message: t,
    isPanic: n ?? !1,
    callArguments: i,
  };
  if (!e || typeof window < 'u' || process.env.NODE_ENV === 'production')
    return s;
  let a = e.getLocation();
  if (!a || !a.lineNumber || !a.columnNumber) return s;
  let u = Math.max(1, a.lineNumber - 3),
    c = xe.read(a.fileName)?.slice(u, a.lineNumber),
    p = c?.lineAt(a.lineNumber);
  if (c && p) {
    let f = cm(p),
      d = um(p);
    if (!d) return s;
    (s.functionName = `${d.code})`),
      (s.location = a),
      n ||
        (c = c.mapLineAt(a.lineNumber, (h) => h.slice(0, d.openingBraceIndex))),
      (c = o.highlightSource(c));
    let m = String(c.lastLineNumber).length;
    if (
      ((s.contextLines = c
        .mapLines((h, g) => o.gray(String(g).padStart(m)) + ' ' + h)
        .mapLines((h) => o.dim(h))
        .prependSymbolAt(a.lineNumber, o.bold(o.red('\u2192')))),
      i)
    ) {
      let h = f + m + 1;
      (h += 2), (s.callArguments = (0, ru.default)(i, h).slice(h));
    }
  }
  return s;
}
l(lm, 'getTemplateParameters');
function um(e) {
  let t = Object.keys(Ne.ModelAction).join('|'),
    n = new RegExp(String.raw`\S+(${t})\(`).exec(e);
  return n ? { code: n[0], openingBraceIndex: n.index + n[0].length } : null;
}
l(um, 'findPrismaActionCall');
function cm(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    if (e.charAt(r) !== ' ') return t;
    t++;
  }
  return t;
}
l(cm, 'getIndent');
function pm(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s,
) {
  let a = [''],
    u = t ? ' in' : ':';
  if (
    (n
      ? (a.push(
          s.red(
            `Oops, an unknown error occurred! This is ${s.bold(
              'on us',
            )}, you did nothing wrong.`,
          ),
        ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`),
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)),
    t && a.push(s.underline(fm(t))),
    i)
  ) {
    a.push('');
    let c = [i.toString()];
    o && (c.push(o), c.push(s.dim(')'))), a.push(c.join('')), o && a.push('');
  } else a.push(''), o && a.push(o), a.push('');
  return (
    a.push(r),
    a.join(`
`)
  );
}
l(pm, 'stringifyErrorMessage');
function fm(e) {
  let t = [e.fileName];
  return (
    e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(':')
  );
}
l(fm, 'stringifyLocationInFile');
function Qt(e) {
  let t = e.showColors ? sm : am,
    r = lm(e, t);
  return pm(r, t);
}
l(Qt, 'createErrorMessageWithContext');
function iu(e) {
  return e instanceof Buffer || e instanceof Date || e instanceof RegExp;
}
l(iu, 'isSpecificValue');
function ou(e) {
  if (e instanceof Buffer) {
    let t = Buffer.alloc ? Buffer.alloc(e.length) : new Buffer(e.length);
    return e.copy(t), t;
  } else {
    if (e instanceof Date) return new Date(e.getTime());
    if (e instanceof RegExp) return new RegExp(e);
    throw new Error('Unexpected situation');
  }
}
l(ou, 'cloneSpecificValue');
function su(e) {
  let t = [];
  return (
    e.forEach(function (r, n) {
      typeof r == 'object' && r !== null
        ? Array.isArray(r)
          ? (t[n] = su(r))
          : iu(r)
          ? (t[n] = ou(r))
          : (t[n] = kr({}, r))
        : (t[n] = r);
    }),
    t
  );
}
l(su, 'deepCloneArray');
function nu(e, t) {
  return t === '__proto__' ? void 0 : e[t];
}
l(nu, 'safeGetProperty');
var kr = l(function (e, ...t) {
  if (!e || typeof e != 'object') return !1;
  if (t.length === 0) return e;
  let r, n;
  for (let i of t)
    if (!(typeof i != 'object' || i === null || Array.isArray(i))) {
      for (let o of Object.keys(i))
        if (((n = nu(e, o)), (r = nu(i, o)), r !== e))
          if (typeof r != 'object' || r === null) {
            e[o] = r;
            continue;
          } else if (Array.isArray(r)) {
            e[o] = su(r);
            continue;
          } else if (iu(r)) {
            e[o] = ou(r);
            continue;
          } else if (typeof n != 'object' || n === null || Array.isArray(n)) {
            e[o] = kr({}, r);
            continue;
          } else {
            e[o] = kr(n, r);
            continue;
          }
    }
  return e;
}, 'deepExtend');
var au = l((e) => (Array.isArray(e) ? e : e.split('.')), 'keys'),
  To = l((e, t) => au(t).reduce((r, n) => r && r[n], e), 'deepGet'),
  Wn = l(
    (e, t, r) =>
      au(t).reduceRight(
        (n, i, o, s) => Object.assign({}, To(e, s.slice(0, o)), { [i]: n }),
        r,
      ),
    'deepSet',
  );
function lu(e, t) {
  if (!e || typeof e != 'object' || typeof e.hasOwnProperty != 'function')
    return e;
  let r = {};
  for (let n in e) {
    let i = e[n];
    Object.hasOwnProperty.call(e, n) && t(n, i) && (r[n] = i);
  }
  return r;
}
l(lu, 'filterObject');
var dm = {
  '[object Date]': !0,
  '[object Uint8Array]': !0,
  '[object Decimal]': !0,
};
function uu(e) {
  return e
    ? typeof e == 'object' && !dm[Object.prototype.toString.call(e)]
    : !1;
}
l(uu, 'isObject');
function cu(e, t) {
  let r = {},
    n = Array.isArray(t) ? t : [t];
  for (let i in e)
    Object.hasOwnProperty.call(e, i) && !n.includes(i) && (r[i] = e[i]);
  return r;
}
l(cu, 'omit');
var ye = M(ue()),
  Po = M(Er());
var mm = fu(),
  gm = mu(),
  hm = gu().default,
  ym = l((e, t, r) => {
    let n = [];
    return l(function i(o, s = {}, a = '', u = []) {
      s.indent = s.indent || '	';
      let c;
      s.inlineCharacterLimit === void 0
        ? (c = {
            newLine: `
`,
            newLineOrSpace: `
`,
            pad: a,
            indent: a + s.indent,
          })
        : (c = {
            newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
            newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
            pad: '@@__STRINGIFY_OBJECT_PAD__@@',
            indent: '@@__STRINGIFY_OBJECT_INDENT__@@',
          });
      let p = l((f) => {
        if (s.inlineCharacterLimit === void 0) return f;
        let d = f
          .replace(new RegExp(c.newLine, 'g'), '')
          .replace(new RegExp(c.newLineOrSpace, 'g'), ' ')
          .replace(new RegExp(c.pad + '|' + c.indent, 'g'), '');
        return d.length <= s.inlineCharacterLimit
          ? d
          : f
              .replace(
                new RegExp(c.newLine + '|' + c.newLineOrSpace, 'g'),
                `
`,
              )
              .replace(new RegExp(c.pad, 'g'), a)
              .replace(new RegExp(c.indent, 'g'), a + s.indent);
      }, 'expandWhiteSpace');
      if (n.indexOf(o) !== -1) return '"[Circular]"';
      if (Buffer.isBuffer(o)) return `Buffer(${Buffer.length})`;
      if (
        o == null ||
        typeof o == 'number' ||
        typeof o == 'boolean' ||
        typeof o == 'function' ||
        typeof o == 'symbol' ||
        o instanceof me ||
        mm(o)
      )
        return String(o);
      if (o instanceof Date) return `new Date('${o.toISOString()}')`;
      if (o instanceof Ee) return `prisma.${yn(o.modelName)}.fields.${o.name}`;
      if (Array.isArray(o)) {
        if (o.length === 0) return '[]';
        n.push(o);
        let f =
          '[' +
          c.newLine +
          o
            .map((d, m) => {
              let h = o.length - 1 === m ? c.newLine : ',' + c.newLineOrSpace,
                g = i(d, s, a + s.indent, [...u, m]);
              return (
                s.transformValue && (g = s.transformValue(o, m, g)),
                c.indent + g + h
              );
            })
            .join('') +
          c.pad +
          ']';
        return n.pop(), p(f);
      }
      if (gm(o)) {
        let f = Object.keys(o).concat(hm(o));
        if ((s.filter && (f = f.filter((m) => s.filter(o, m))), f.length === 0))
          return '{}';
        n.push(o);
        let d =
          '{' +
          c.newLine +
          f
            .map((m, h) => {
              let g = f.length - 1 === h ? c.newLine : ',' + c.newLineOrSpace,
                w = typeof m == 'symbol',
                y = !w && /^[a-z$_][a-z$_0-9]*$/i.test(m),
                x = w || y ? m : i(m, s, void 0, [...u, m]),
                b = i(o[m], s, a + s.indent, [...u, m]);
              s.transformValue && (b = s.transformValue(o, m, b));
              let E = c.indent + String(x) + ': ' + b + g;
              return (
                s.transformLine &&
                  (E = s.transformLine({
                    obj: o,
                    indent: c.indent,
                    key: x,
                    stringifiedValue: b,
                    value: o[m],
                    eol: g,
                    originalLine: E,
                    path: u.concat(x),
                  })),
                E
              );
            })
            .join('') +
          c.pad +
          '}';
        return n.pop(), p(d);
      }
      return (
        (o = String(o).replace(/[\r\n]/g, (f) =>
          f ===
          `
`
            ? '\\n'
            : '\\r',
        )),
        s.singleQuotes === !1
          ? ((o = o.replace(/"/g, '\\"')), `"${o}"`)
          : ((o = o.replace(/\\?'/g, "\\'")), `'${o}'`)
      );
    }, 'stringifyObject')(e, t, r);
  }, 'stringifyObject'),
  Lr = ym;
var Ao = '@@__DIM_POINTER__@@';
function Jn({ ast: e, keyPaths: t, valuePaths: r, missingItems: n }) {
  let i = e;
  for (let { path: o, type: s } of n) i = Wn(i, o, s);
  return Lr(i, {
    indent: '  ',
    transformLine: ({
      indent: o,
      key: s,
      value: a,
      stringifiedValue: u,
      eol: c,
      path: p,
    }) => {
      let f = p.join('.'),
        d = t.includes(f),
        m = r.includes(f),
        h = n.find((w) => w.path === f),
        g = u;
      if (h) {
        typeof a == 'string' && (g = g.slice(1, g.length - 1));
        let w = h.isRequired ? '' : '?',
          y = h.isRequired ? '+' : '?',
          b = (h.isRequired ? ye.default.greenBright : ye.default.green)(
            wm(s + w + ': ' + g + c, o, y),
          );
        return h.isRequired || (b = ye.default.dim(b)), b;
      } else {
        let w = n.some((E) => f.startsWith(E.path)),
          y = s[s.length - 2] === '?';
        y && (s = s.slice(1, s.length - 1)),
          y &&
            typeof a == 'object' &&
            a !== null &&
            (g = g
              .split(
                `
`,
              )
              .map((E, T, C) => (T === C.length - 1 ? E + Ao : E)).join(`
`)),
          w &&
            typeof a == 'string' &&
            ((g = g.slice(1, g.length - 1)), y || (g = ye.default.bold(g))),
          (typeof a != 'object' || a === null) &&
            !m &&
            !w &&
            (g = ye.default.dim(g));
        let x = d ? ye.default.redBright(s) : s;
        g = m ? ye.default.redBright(g) : g;
        let b = o + x + ': ' + g + (w ? c : ye.default.dim(c));
        if (d || m) {
          let E = b.split(`
`),
            T = String(s).length,
            C = d ? ye.default.redBright('~'.repeat(T)) : ' '.repeat(T),
            A = m ? bm(o, s, a, u) : 0,
            F = m && hu(a),
            B = m ? '  ' + ye.default.redBright('~'.repeat(A)) : '';
          C && C.length > 0 && !F && E.splice(1, 0, o + C + B),
            C &&
              C.length > 0 &&
              F &&
              E.splice(E.length - 1, 0, o.slice(0, o.length - 2) + B),
            (b = E.join(`
`));
        }
        return b;
      }
    },
  });
}
l(Jn, 'printJsonWithErrors');
function bm(e, t, r, n) {
  return r === null
    ? 4
    : typeof r == 'string'
    ? r.length + 2
    : hu(r)
    ? Math.abs(Em(`${t}: ${(0, Po.default)(n)}`) - e.length)
    : String(r).length;
}
l(bm, 'getValueLength');
function hu(e) {
  return typeof e == 'object' && e !== null && !(e instanceof me);
}
l(hu, 'isRenderedAsObject');
function Em(e) {
  return e
    .split(
      `
`,
    )
    .reduce((t, r) => (r.length > t ? r.length : t), 0);
}
l(Em, 'getLongestLine');
function wm(e, t, r) {
  return e
    .split(
      `
`,
    )
    .map((n, i, o) =>
      i === 0 ? r + t.slice(1) + n : i < o.length - 1 ? r + n.slice(1) : n,
    )
    .map((n) =>
      (0, Po.default)(n).includes(Ao)
        ? ye.default.dim(n.replace(Ao, ''))
        : n.includes('?')
        ? ye.default.dim(n)
        : n,
    ).join(`
`);
}
l(wm, 'prefixLines');
var $r = 2,
  Yn = class {
    constructor(t, r) {
      this.type = t;
      this.children = r;
      this.printFieldError = l(({ error: t }, r, n) => {
        if (t.type === 'emptySelect') {
          let i = n
            ? ''
            : ` Available options are listed in ${_.default.greenBright.dim(
                'green',
              )}.`;
          return `The ${_.default.redBright(
            '`select`',
          )} statement for type ${_.default.bold(
            sr(t.field.outputType.type),
          )} must not be empty.${i}`;
        }
        if (t.type === 'emptyInclude') {
          if (r.length === 0)
            return `${_.default.bold(
              sr(t.field.outputType.type),
            )} does not have any relation and therefore can't have an ${_.default.redBright(
              '`include`',
            )} statement.`;
          let i = n
            ? ''
            : ` Available options are listed in ${_.default.greenBright.dim(
                'green',
              )}.`;
          return `The ${_.default.redBright(
            '`include`',
          )} statement for type ${_.default.bold(
            sr(t.field.outputType.type),
          )} must not be empty.${i}`;
        }
        if (t.type === 'noTrueSelect')
          return `The ${_.default.redBright(
            '`select`',
          )} statement for type ${_.default.bold(
            sr(t.field.outputType.type),
          )} needs ${_.default.bold('at least one truthy value')}.`;
        if (t.type === 'includeAndSelect')
          return `Please ${_.default.bold(
            'either',
          )} use ${_.default.greenBright(
            '`include`',
          )} or ${_.default.greenBright('`select`')}, but ${_.default.redBright(
            'not both',
          )} at the same time.`;
        if (t.type === 'invalidFieldName') {
          let i = t.isInclude ? 'include' : 'select',
            o = t.isIncludeScalar ? 'Invalid scalar' : 'Unknown',
            s = n
              ? ''
              : t.isInclude && r.length === 0
              ? `
This model has no relations, so you can't use ${_.default.redBright(
                  'include',
                )} with it.`
              : ` Available options are listed in ${_.default.greenBright.dim(
                  'green',
                )}.`,
            a = `${o} field ${_.default.redBright(
              `\`${t.providedName}\``,
            )} for ${_.default.bold(
              i,
            )} statement on model ${_.default.bold.white(t.modelName)}.${s}`;
          return (
            t.didYouMean &&
              (a += ` Did you mean ${_.default.greenBright(
                `\`${t.didYouMean}\``,
              )}?`),
            t.isIncludeScalar &&
              (a += `
Note, that ${_.default.bold(
                'include',
              )} statements only accept relation fields.`),
            a
          );
        }
        if (t.type === 'invalidFieldType')
          return `Invalid value ${_.default.redBright(
            `${Lr(t.providedValue)}`,
          )} of type ${_.default.redBright(
            St(t.providedValue, void 0),
          )} for field ${_.default.bold(
            `${t.fieldName}`,
          )} on model ${_.default.bold.white(
            t.modelName,
          )}. Expected either ${_.default.greenBright(
            'true',
          )} or ${_.default.greenBright('false')}.`;
      }, 'printFieldError');
      this.printArgError = l(({ error: t, path: r, id: n }, i, o) => {
        if (t.type === 'invalidName') {
          let s = `Unknown arg ${_.default.redBright(
            `\`${t.providedName}\``,
          )} in ${_.default.bold(r.join('.'))} for type ${_.default.bold(
            t.outputType ? t.outputType.name : ir(t.originalType),
          )}.`;
          return (
            t.didYouMeanField
              ? (s += `
\u2192 Did you forget to wrap it with \`${_.default.greenBright(
                  'select',
                )}\`? ${_.default.dim(
                  'e.g. ' +
                    _.default.greenBright(
                      `{ select: { ${t.providedName}: ${t.providedValue} } }`,
                    ),
                )}`)
              : t.didYouMeanArg
              ? ((s += ` Did you mean \`${_.default.greenBright(
                  t.didYouMeanArg,
                )}\`?`),
                !i &&
                  !o &&
                  (s +=
                    ` ${_.default.dim('Available args:')}
` + Ct(t.originalType, !0)))
              : t.originalType.fields.length === 0
              ? (s += ` The field ${_.default.bold(
                  t.originalType.name,
                )} has no arguments.`)
              : !i &&
                !o &&
                (s +=
                  ` Available args:

` + Ct(t.originalType, !0)),
            s
          );
        }
        if (t.type === 'invalidType') {
          let s = Lr(t.providedValue, { indent: '  ' }),
            a =
              s.split(`
`).length > 1;
          if (
            (a &&
              (s = `
${s}
`),
            t.requiredType.bestFittingType.location === 'enumTypes')
          )
            return `Argument ${_.default.bold(
              t.argName,
            )}: Provided value ${_.default.redBright(s)}${
              a ? '' : ' '
            }of type ${_.default.redBright(
              St(t.providedValue),
            )} on ${_.default.bold(
              `prisma.${this.children[0].name}`,
            )} is not a ${_.default.greenBright(
              or(
                Pt(t.requiredType.bestFittingType.type),
                t.requiredType.bestFittingType.isList,
              ),
            )}.
\u2192 Possible values: ${t.requiredType.bestFittingType.type.values
              .map((f) =>
                _.default.greenBright(
                  `${Pt(t.requiredType.bestFittingType.type)}.${f}`,
                ),
              )
              .join(', ')}`;
          let u = '.';
          Ht(t.requiredType.bestFittingType.type) &&
            (u =
              `:
` + Ct(t.requiredType.bestFittingType.type));
          let c = `${t.requiredType.inputType
              .map((f) =>
                _.default.greenBright(
                  or(Pt(f.type), t.requiredType.bestFittingType.isList),
                ),
              )
              .join(' or ')}${u}`,
            p =
              (t.requiredType.inputType.length === 2 &&
                t.requiredType.inputType.find((f) => Ht(f.type))) ||
              null;
          return (
            p &&
              (c +=
                `
` + Ct(p.type, !0)),
            `Argument ${_.default.bold(
              t.argName,
            )}: Got invalid value ${_.default.redBright(s)}${
              a ? '' : ' '
            }on ${_.default.bold(
              `prisma.${this.children[0].name}`,
            )}. Provided ${_.default.redBright(
              St(t.providedValue),
            )}, expected ${c}`
          );
        }
        if (t.type === 'invalidNullArg') {
          let s =
              r.length === 1 && r[0] === t.name
                ? ''
                : ` for ${_.default.bold(`${r.join('.')}`)}`,
            a = ` Please use ${_.default.bold.greenBright(
              'undefined',
            )} instead.`;
          return `Argument ${_.default.greenBright(
            t.name,
          )}${s} must not be ${_.default.bold('null')}.${a}`;
        }
        if (t.type === 'missingArg') {
          let s =
            r.length === 1 && r[0] === t.missingName
              ? ''
              : ` for ${_.default.bold(`${r.join('.')}`)}`;
          return `Argument ${_.default.greenBright(
            t.missingName,
          )}${s} is missing.`;
        }
        if (t.type === 'atLeastOne') {
          let s = o
              ? ''
              : ` Available args are listed in ${_.default.dim.green(
                  'green',
                )}.`,
            a = t.atLeastFields
              ? ` and at least one argument for ${t.atLeastFields
                  .map((u) => _.default.bold(u))
                  .join(', or ')}`
              : '';
          return `Argument ${_.default.bold(
            r.join('.'),
          )} of type ${_.default.bold(
            t.inputType.name,
          )} needs ${_.default.greenBright(
            'at least one',
          )} argument${_.default.bold(a)}.${s}`;
        }
        if (t.type === 'atMostOne') {
          let s = o
            ? ''
            : ` Please choose one. ${_.default.dim('Available args:')} 
${Ct(t.inputType, !0)}`;
          return `Argument ${_.default.bold(
            r.join('.'),
          )} of type ${_.default.bold(
            t.inputType.name,
          )} needs ${_.default.greenBright(
            'exactly one',
          )} argument, but you provided ${t.providedKeys
            .map((a) => _.default.redBright(a))
            .join(' and ')}.${s}`;
        }
      }, 'printArgError');
      (this.type = t), (this.children = r);
    }
    get [Symbol.toStringTag]() {
      return 'Document';
    }
    toString() {
      return `${this.type} {
${(0, mt.default)(
  this.children.map(String).join(`
`),
  $r,
)}
}`;
    }
    validate(t, r = !1, n, i, o) {
      t || (t = {});
      let s = this.children.filter((y) => y.hasInvalidChild || y.hasInvalidArg);
      if (s.length === 0) return;
      let a = [],
        u = [],
        c = t && t.select ? 'select' : t.include ? 'include' : void 0;
      for (let y of s) {
        let x = y.collectErrors(c);
        a.push(
          ...x.fieldErrors.map((b) => ({
            ...b,
            path: r ? b.path : b.path.slice(1),
          })),
        ),
          u.push(
            ...x.argErrors.map((b) => ({
              ...b,
              path: r ? b.path : b.path.slice(1),
            })),
          );
      }
      let p = this.children[0].name,
        f = r ? this.type : p,
        d = [],
        m = [],
        h = [];
      for (let y of a) {
        let x = this.normalizePath(y.path, t).join('.');
        if (y.error.type === 'invalidFieldName') {
          d.push(x);
          let b = y.error.outputType,
            { isInclude: E } = y.error;
          b.fields
            .filter((T) =>
              E ? T.outputType.location === 'outputObjectTypes' : !0,
            )
            .forEach((T) => {
              let C = x.split('.');
              h.push({
                path: `${C.slice(0, C.length - 1).join('.')}.${T.name}`,
                type: 'true',
                isRequired: !1,
              });
            });
        } else
          y.error.type === 'includeAndSelect'
            ? (d.push('select'), d.push('include'))
            : m.push(x);
        if (
          y.error.type === 'emptySelect' ||
          y.error.type === 'noTrueSelect' ||
          y.error.type === 'emptyInclude'
        ) {
          let b = this.normalizePath(y.path, t),
            E = b.slice(0, b.length - 1).join('.');
          y.error.field.outputType.type.fields
            ?.filter((C) =>
              y.error.type === 'emptyInclude'
                ? C.outputType.location === 'outputObjectTypes'
                : !0,
            )
            .forEach((C) => {
              h.push({ path: `${E}.${C.name}`, type: 'true', isRequired: !1 });
            });
        }
      }
      for (let y of u) {
        let x = this.normalizePath(y.path, t).join('.');
        if (y.error.type === 'invalidName') d.push(x);
        else if (y.error.type !== 'missingArg' && y.error.type !== 'atLeastOne')
          m.push(x);
        else if (y.error.type === 'missingArg') {
          let b =
            y.error.missingArg.inputTypes.length === 1
              ? y.error.missingArg.inputTypes[0].type
              : y.error.missingArg.inputTypes
                  .map((E) => {
                    let T = ir(E.type);
                    return T === 'Null' ? 'null' : E.isList ? T + '[]' : T;
                  })
                  .join(' | ');
          h.push({
            path: x,
            type: Di(b, !0, x.split('where.').length === 2),
            isRequired: y.error.missingArg.isRequired,
          });
        }
      }
      let g = l((y) => {
          let x = u.some(
              (q) =>
                q.error.type === 'missingArg' && q.error.missingArg.isRequired,
            ),
            b = Boolean(
              u.find(
                (q) =>
                  q.error.type === 'missingArg' &&
                  !q.error.missingArg.isRequired,
              ),
            ),
            E = b || x,
            T = '';
          x &&
            (T += `
${_.default.dim('Note: Lines with ')}${_.default.reset.greenBright(
              '+',
            )} ${_.default.dim('are required')}`),
            b &&
              (T.length === 0 &&
                (T = `
`),
              x
                ? (T += _.default.dim(
                    `, lines with ${_.default.green('?')} are optional`,
                  ))
                : (T += _.default.dim(
                    `Note: Lines with ${_.default.green('?')} are optional`,
                  )),
              (T += _.default.dim('.')));
          let A = u
            .filter(
              (q) =>
                q.error.type !== 'missingArg' || q.error.missingArg.isRequired,
            )
            .map((q) => this.printArgError(q, E, i === 'minimal')).join(`
`);
          if (
            ((A += `
${a.map((q) => this.printFieldError(q, h, i === 'minimal')).join(`
`)}`),
            i === 'minimal')
          )
            return (0, Oo.default)(A);
          let F = {
            ast: r ? { [p]: t } : t,
            keyPaths: d,
            valuePaths: m,
            missingItems: h,
          };
          n?.endsWith('aggregate') && (F = Om(F));
          let B = Qt({
            callsite: y,
            originalMethod: n || f,
            showColors: i && i === 'pretty',
            callArguments: Jn(F),
            message: `${A}${T}
`,
          });
          return process.env.NO_COLOR || i === 'colorless'
            ? (0, Oo.default)(B)
            : B;
        }, 'renderErrorStr'),
        w = new ie(g(o));
      throw (
        (process.env.NODE_ENV !== 'production' &&
          Object.defineProperty(w, 'render', { get: () => g, enumerable: !1 }),
        w)
      );
    }
    normalizePath(t, r) {
      let n = t.slice(),
        i = [],
        o,
        s = r;
      for (; (o = n.shift()) !== void 0; )
        (!Array.isArray(s) && o === 0) ||
          (o === 'select'
            ? s[o]
              ? (s = s[o])
              : (s = s.include)
            : s && s[o] && (s = s[o]),
          i.push(o));
      return i;
    }
  };
l(Yn, 'Document');
var ie = class extends Error {
  get [Symbol.toStringTag]() {
    return 'PrismaClientValidationError';
  }
};
l(ie, 'PrismaClientValidationError');
var K = class extends Error {
  constructor(t) {
    super(
      t +
        `
Read more at https://pris.ly/d/client-constructor`,
    );
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientConstructorValidationError';
  }
};
l(K, 'PrismaClientConstructorValidationError');
var re = class {
  constructor({ name: t, args: r, children: n, error: i, schemaField: o }) {
    (this.name = t),
      (this.args = r),
      (this.children = n),
      (this.error = i),
      (this.schemaField = o),
      (this.hasInvalidChild = n
        ? n.some((s) =>
            Boolean(s.error || s.hasInvalidArg || s.hasInvalidChild),
          )
        : !1),
      (this.hasInvalidArg = r ? r.hasInvalidArg : !1);
  }
  get [Symbol.toStringTag]() {
    return 'Field';
  }
  toString() {
    let t = this.name;
    return this.error
      ? t + ' # INVALID_FIELD'
      : (this.args &&
          this.args.args &&
          this.args.args.length > 0 &&
          (this.args.args.length === 1
            ? (t += `(${this.args.toString()})`)
            : (t += `(
${(0, mt.default)(this.args.toString(), $r)}
)`)),
        this.children &&
          (t += ` {
${(0, mt.default)(
  this.children.map(String).join(`
`),
  $r,
)}
}`),
        t);
  }
  collectErrors(t = 'select') {
    let r = [],
      n = [];
    if (
      (this.error && r.push({ path: [this.name], error: this.error }),
      this.children)
    )
      for (let i of this.children) {
        let o = i.collectErrors(t);
        r.push(
          ...o.fieldErrors.map((s) => ({
            ...s,
            path: [this.name, t, ...s.path],
          })),
        ),
          n.push(
            ...o.argErrors.map((s) => ({
              ...s,
              path: [this.name, t, ...s.path],
            })),
          );
      }
    return (
      this.args &&
        n.push(
          ...this.args
            .collectErrors()
            .map((i) => ({ ...i, path: [this.name, ...i.path] })),
        ),
      { fieldErrors: r, argErrors: n }
    );
  }
};
l(re, 'Field');
var ne = class {
  constructor(t = []) {
    (this.args = t),
      (this.hasInvalidArg = t ? t.some((r) => Boolean(r.hasError)) : !1);
  }
  get [Symbol.toStringTag]() {
    return 'Args';
  }
  toString() {
    return this.args.length === 0
      ? ''
      : `${this.args.map((t) => t.toString()).filter((t) => t).join(`
`)}`;
  }
  collectErrors() {
    return this.hasInvalidArg
      ? this.args.flatMap((t) => t.collectErrors())
      : [];
  }
};
l(ne, 'Args');
function So(e, t) {
  return Buffer.isBuffer(e)
    ? JSON.stringify(e.toString('base64'))
    : e instanceof Ee
    ? `{ _ref: ${JSON.stringify(e.name)}}`
    : Object.prototype.toString.call(e) === '[object BigInt]'
    ? e.toString()
    : typeof t?.type == 'string' && t.type === 'Json'
    ? e === null
      ? 'null'
      : e && e.values && e.__prismaRawParameters__
      ? JSON.stringify(e.values)
      : t?.isList && Array.isArray(e)
      ? JSON.stringify(e.map((r) => JSON.stringify(r)))
      : JSON.stringify(JSON.stringify(e))
    : e === void 0
    ? null
    : e === null
    ? 'null'
    : Pe.isDecimal(e) || (t?.type === 'Decimal' && gn(e))
    ? qs(e)
    : t?.location === 'enumTypes' && typeof e == 'string'
    ? Array.isArray(e)
      ? `[${e.join(', ')}]`
      : e
    : typeof e == 'number' && t?.type === 'Float'
    ? e.toExponential()
    : JSON.stringify(e, null, 2);
}
l(So, 'stringify');
var ve = class {
  constructor({
    key: t,
    value: r,
    isEnum: n = !1,
    error: i,
    schemaArg: o,
    inputType: s,
  }) {
    (this.inputType = s),
      (this.key = t),
      (this.value = r instanceof me ? r._getName() : r),
      (this.isEnum = n),
      (this.error = i),
      (this.schemaArg = o),
      (this.isNullable =
        o?.inputTypes.reduce((a) => a && o.isNullable, !0) || !1),
      (this.hasError =
        Boolean(i) ||
        (r instanceof ne ? r.hasInvalidArg : !1) ||
        (Array.isArray(r) &&
          r.some((a) => (a instanceof ne ? a.hasInvalidArg : !1))));
  }
  get [Symbol.toStringTag]() {
    return 'Arg';
  }
  _toString(t, r) {
    if (!(typeof t > 'u')) {
      if (t instanceof ne)
        return `${r}: {
${(0, mt.default)(t.toString(), 2)}
}`;
      if (Array.isArray(t)) {
        if (this.inputType?.type === 'Json')
          return `${r}: ${So(t, this.inputType)}`;
        let n = !t.some((i) => typeof i == 'object');
        return `${r}: [${
          n
            ? ''
            : `
`
        }${(0, mt.default)(
          t
            .map((i) =>
              i instanceof ne
                ? `{
${(0, mt.default)(i.toString(), $r)}
}`
                : So(i, this.inputType),
            )
            .join(
              `,${
                n
                  ? ' '
                  : `
`
              }`,
            ),
          n ? 0 : $r,
        )}${
          n
            ? ''
            : `
`
        }]`;
      }
      return `${r}: ${So(t, this.inputType)}`;
    }
  }
  toString() {
    return this._toString(this.value, this.key);
  }
  collectErrors() {
    if (!this.hasError) return [];
    let t = [];
    if (this.error) {
      let r =
        typeof this.inputType?.type == 'object'
          ? `${this.inputType.type.name}${this.inputType.isList ? '[]' : ''}`
          : void 0;
      t.push({ error: this.error, path: [this.key], id: r });
    }
    return Array.isArray(this.value)
      ? t.concat(
          this.value.flatMap((r, n) =>
            r?.collectErrors
              ? r
                  .collectErrors()
                  .map((i) => ({ ...i, path: [this.key, n, ...i.path] }))
              : [],
          ),
        )
      : this.value instanceof ne
      ? t.concat(
          this.value
            .collectErrors()
            .map((r) => ({ ...r, path: [this.key, ...r.path] })),
        )
      : t;
  }
};
l(ve, 'Arg');
function Zn({
  dmmf: e,
  rootTypeName: t,
  rootField: r,
  select: n,
  modelName: i,
  extensions: o,
}) {
  n || (n = {});
  let s = t === 'query' ? e.queryType : e.mutationType,
    a = {
      args: [],
      outputType: { isList: !1, type: s, location: 'outputObjectTypes' },
      name: t,
    },
    u = { modelName: i },
    c = Eu({
      dmmf: e,
      selection: { [r]: n },
      schemaField: a,
      path: [t],
      context: u,
      extensions: o,
    });
  return new Yn(t, c);
}
l(Zn, 'makeDocument');
function bu(e) {
  return e;
}
l(bu, 'transformDocument');
function Eu({
  dmmf: e,
  selection: t,
  schemaField: r,
  path: n,
  context: i,
  extensions: o,
}) {
  let s = r.outputType.type,
    a = i.modelName ? o.getAllComputedFields(i.modelName) : {};
  return (
    (t = Wl(t, a)),
    Object.entries(t).reduce((u, [c, p]) => {
      let f = s.fieldMap ? s.fieldMap[c] : s.fields.find((b) => b.name === c);
      if (!f)
        return (
          a?.[c] ||
            u.push(
              new re({
                name: c,
                children: [],
                error: {
                  type: 'invalidFieldName',
                  modelName: s.name,
                  providedName: c,
                  didYouMean: hn(
                    c,
                    s.fields.map((b) => b.name).concat(Object.keys(a ?? {})),
                  ),
                  outputType: s,
                },
              }),
            ),
          u
        );
      if (
        f.outputType.location === 'scalar' &&
        f.args.length === 0 &&
        typeof p != 'boolean'
      )
        return (
          u.push(
            new re({
              name: c,
              children: [],
              error: {
                type: 'invalidFieldType',
                modelName: s.name,
                fieldName: c,
                providedValue: p,
              },
            }),
          ),
          u
        );
      if (p === !1) return u;
      let d = {
          name: f.name,
          fields: f.args,
          constraints: { minNumFields: null, maxNumFields: null },
        },
        m = typeof p == 'object' ? cu(p, ['include', 'select']) : void 0,
        h = m
          ? Xn(m, d, i, [], typeof f == 'string' ? void 0 : f.outputType.type)
          : void 0,
        g = f.outputType.location === 'outputObjectTypes';
      if (p) {
        if (p.select && p.include)
          u.push(
            new re({
              name: c,
              children: [
                new re({
                  name: 'include',
                  args: new ne(),
                  error: { type: 'includeAndSelect', field: f },
                }),
              ],
            }),
          );
        else if (p.include) {
          let b = Object.keys(p.include);
          if (b.length === 0)
            return (
              u.push(
                new re({
                  name: c,
                  children: [
                    new re({
                      name: 'include',
                      args: new ne(),
                      error: { type: 'emptyInclude', field: f },
                    }),
                  ],
                }),
              ),
              u
            );
          if (f.outputType.location === 'outputObjectTypes') {
            let E = f.outputType.type,
              T = E.fields
                .filter((A) => A.outputType.location === 'outputObjectTypes')
                .map((A) => A.name),
              C = b.filter((A) => !T.includes(A));
            if (C.length > 0)
              return (
                u.push(
                  ...C.map(
                    (A) =>
                      new re({
                        name: A,
                        children: [
                          new re({
                            name: A,
                            args: new ne(),
                            error: {
                              type: 'invalidFieldName',
                              modelName: E.name,
                              outputType: E,
                              providedName: A,
                              didYouMean: hn(A, T) || void 0,
                              isInclude: !0,
                              isIncludeScalar: E.fields.some(
                                (F) => F.name === A,
                              ),
                            },
                          }),
                        ],
                      }),
                  ),
                ),
                u
              );
          }
        } else if (p.select) {
          let b = Object.values(p.select);
          if (b.length === 0)
            return (
              u.push(
                new re({
                  name: c,
                  children: [
                    new re({
                      name: 'select',
                      args: new ne(),
                      error: { type: 'emptySelect', field: f },
                    }),
                  ],
                }),
              ),
              u
            );
          if (b.filter((T) => T).length === 0)
            return (
              u.push(
                new re({
                  name: c,
                  children: [
                    new re({
                      name: 'select',
                      args: new ne(),
                      error: { type: 'noTrueSelect', field: f },
                    }),
                  ],
                }),
              ),
              u
            );
        }
      }
      let w = g ? vm(e, f.outputType.type) : null,
        y = w;
      p &&
        (p.select
          ? (y = p.select)
          : p.include
          ? (y = kr(w, p.include))
          : p.by &&
            Array.isArray(p.by) &&
            f.outputType.namespace === 'prisma' &&
            f.outputType.location === 'outputObjectTypes' &&
            Vs(f.outputType.type.name) &&
            (y = xm(p.by)));
      let x;
      if (y !== !1 && g) {
        let b = i.modelName;
        typeof f.outputType.type == 'object' &&
          f.outputType.namespace === 'model' &&
          f.outputType.location === 'outputObjectTypes' &&
          (b = f.outputType.type.name),
          (x = Eu({
            dmmf: e,
            selection: y,
            schemaField: f,
            path: [...n, c],
            context: { modelName: b },
            extensions: o,
          }));
      }
      return (
        u.push(new re({ name: c, args: h, children: x, schemaField: f })), u
      );
    }, [])
  );
}
l(Eu, 'selectionToFields');
function xm(e) {
  let t = Object.create(null);
  for (let r of e) t[r] = !0;
  return t;
}
l(xm, 'byToSelect');
function vm(e, t) {
  let r = Object.create(null);
  for (let n of t.fields)
    e.typeMap[n.outputType.type.name] !== void 0 && (r[n.name] = !0),
      (n.outputType.location === 'scalar' ||
        n.outputType.location === 'enumTypes') &&
        (r[n.name] = !0);
  return r;
}
l(vm, 'getDefaultSelection');
function Mo(e, t, r, n) {
  return new ve({
    key: e,
    value: t,
    isEnum: n.location === 'enumTypes',
    inputType: n,
    error: {
      type: 'invalidType',
      providedValue: t,
      argName: e,
      requiredType: { inputType: r.inputTypes, bestFittingType: n },
    },
  });
}
l(Mo, 'getInvalidTypeArg');
function wu(e, t, r) {
  let { isList: n } = t,
    i = Tm(t, r),
    o = St(e, t);
  return o === i ||
    (n && o === 'List<>') ||
    (i === 'Json' &&
      o !== 'Symbol' &&
      !(e instanceof me) &&
      !(e instanceof Ee)) ||
    (o === 'Int' && i === 'BigInt') ||
    ((o === 'Int' || o === 'Float') && i === 'Decimal') ||
    (o === 'DateTime' && i === 'String') ||
    (o === 'UUID' && i === 'String') ||
    (o === 'String' && i === 'ID') ||
    (o === 'Int' && i === 'Float') ||
    (o === 'Int' && i === 'Long') ||
    (o === 'String' && i === 'Decimal' && _m(e)) ||
    e === null
    ? !0
    : t.isList && Array.isArray(e)
    ? e.every((s) => wu(s, { ...t, isList: !1 }, r))
    : !1;
}
l(wu, 'hasCorrectScalarType');
function Tm(e, t, r = e.isList) {
  let n = Pt(e.type);
  return (
    e.location === 'fieldRefTypes' && t.modelName && (n += `<${t.modelName}>`),
    or(n, r)
  );
}
l(Tm, 'getExpectedType');
var zn = l((e) => lu(e, (t, r) => r !== void 0), 'cleanObject');
function _m(e) {
  return /^\-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(e);
}
l(_m, 'isDecimalString');
function Am(e, t, r, n) {
  let i = null,
    o = [];
  for (let s of r.inputTypes) {
    if (((i = Sm(e, t, r, s, n)), i?.collectErrors().length === 0)) return i;
    if (i && i?.collectErrors()) {
      let a = i?.collectErrors();
      a && a.length > 0 && o.push({ arg: i, errors: a });
    }
  }
  if (i?.hasError && o.length > 0) {
    let s = o.map(({ arg: a, errors: u }) => {
      let c = u.map((p) => {
        let f = 1;
        return (
          p.error.type === 'invalidType' &&
            (f = 2 * Math.exp(xu(p.error.providedValue)) + 1),
          (f += Math.log(p.path.length)),
          p.error.type === 'missingArg' &&
            a.inputType &&
            Ht(a.inputType.type) &&
            a.inputType.type.name.includes('Unchecked') &&
            (f *= 2),
          p.error.type === 'invalidName' &&
            Ht(p.error.originalType) &&
            p.error.originalType.name.includes('Unchecked') &&
            (f *= 2),
          f
        );
      });
      return { score: u.length + Pm(c), arg: a, errors: u };
    });
    return s.sort((a, u) => (a.score < u.score ? -1 : 1)), s[0].arg;
  }
  return i;
}
l(Am, 'valueToArg');
function xu(e) {
  let t = 1;
  if (!e || typeof e != 'object') return t;
  for (let r in e)
    if (
      !!Object.prototype.hasOwnProperty.call(e, r) &&
      typeof e[r] == 'object'
    ) {
      let n = xu(e[r]) + 1;
      t = Math.max(n, t);
    }
  return t;
}
l(xu, 'getDepth');
function Pm(e) {
  return e.reduce((t, r) => t + r, 0);
}
l(Pm, 'sum');
function Sm(e, t, r, n, i) {
  if (typeof t > 'u')
    return r.isRequired
      ? new ve({
          key: e,
          value: t,
          isEnum: n.location === 'enumTypes',
          inputType: n,
          error: {
            type: 'missingArg',
            missingName: e,
            missingArg: r,
            atLeastOne: !1,
            atMostOne: !1,
          },
        })
      : null;
  let { isNullable: o, isRequired: s } = r;
  if (
    t === null &&
    !o &&
    !s &&
    !(Ht(n.type)
      ? n.type.constraints.minNumFields !== null &&
        n.type.constraints.minNumFields > 0
      : !1)
  )
    return new ve({
      key: e,
      value: t,
      isEnum: n.location === 'enumTypes',
      inputType: n,
      error: {
        type: 'invalidNullArg',
        name: e,
        invalidType: r.inputTypes,
        atLeastOne: !1,
        atMostOne: !1,
      },
    });
  if (!n.isList)
    if (Ht(n.type)) {
      if (
        typeof t != 'object' ||
        Array.isArray(t) ||
        (n.location === 'inputObjectTypes' && !uu(t))
      )
        return Mo(e, t, r, n);
      {
        let p = zn(t),
          f,
          d = Object.keys(p || {}),
          m = d.length;
        return (
          (m === 0 &&
            typeof n.type.constraints.minNumFields == 'number' &&
            n.type.constraints.minNumFields > 0) ||
          n.type.constraints.fields?.some((h) => d.includes(h)) === !1
            ? (f = {
                type: 'atLeastOne',
                key: e,
                inputType: n.type,
                atLeastFields: n.type.constraints.fields,
              })
            : m > 1 &&
              typeof n.type.constraints.maxNumFields == 'number' &&
              n.type.constraints.maxNumFields < 2 &&
              (f = {
                type: 'atMostOne',
                key: e,
                inputType: n.type,
                providedKeys: d,
              }),
          new ve({
            key: e,
            value: p === null ? null : Xn(p, n.type, i, r.inputTypes),
            isEnum: n.location === 'enumTypes',
            error: f,
            inputType: n,
            schemaArg: r,
          })
        );
      }
    } else return yu(e, t, r, n, i);
  if (
    (!Array.isArray(t) && n.isList && e !== 'updateMany' && (t = [t]),
    n.location === 'enumTypes' || n.location === 'scalar')
  )
    return yu(e, t, r, n, i);
  let a = n.type,
    c = (
      typeof a.constraints?.minNumFields == 'number' &&
      a.constraints?.minNumFields > 0
        ? Array.isArray(t) &&
          t.some((p) => !p || Object.keys(zn(p)).length === 0)
        : !1
    )
      ? { inputType: a, key: e, type: 'atLeastOne' }
      : void 0;
  if (!c) {
    let p =
      typeof a.constraints?.maxNumFields == 'number' &&
      a.constraints?.maxNumFields < 2
        ? Array.isArray(t) &&
          t.find((f) => !f || Object.keys(zn(f)).length !== 1)
        : !1;
    p &&
      (c = {
        inputType: a,
        key: e,
        type: 'atMostOne',
        providedKeys: Object.keys(p),
      });
  }
  if (!Array.isArray(t))
    for (let p of r.inputTypes) {
      let f = Xn(t, p.type, i);
      if (f.collectErrors().length === 0)
        return new ve({
          key: e,
          value: f,
          isEnum: !1,
          schemaArg: r,
          inputType: p,
        });
    }
  return new ve({
    key: e,
    value: t.map((p) =>
      n.isList && typeof p != 'object'
        ? p
        : typeof p != 'object' || !t
        ? Mo(e, p, r, n)
        : Xn(p, a, i),
    ),
    isEnum: !1,
    inputType: n,
    schemaArg: r,
    error: c,
  });
}
l(Sm, 'tryInferArgs');
function Ht(e) {
  return !(typeof e == 'string' || Object.hasOwnProperty.call(e, 'values'));
}
l(Ht, 'isInputArgType');
function yu(e, t, r, n, i) {
  return wu(t, n, i)
    ? new ve({
        key: e,
        value: t,
        isEnum: n.location === 'enumTypes',
        schemaArg: r,
        inputType: n,
      })
    : Mo(e, t, r, n);
}
l(yu, 'scalarToArg');
function Xn(e, t, r, n, i) {
  t.meta?.source && (r = { modelName: t.meta.source });
  let o = zn(e),
    { fields: s, fieldMap: a } = t,
    u = s.map((d) => [d.name, void 0]),
    c = Object.entries(o || {}),
    f = Gs(c, u, (d) => d[0]).reduce((d, [m, h]) => {
      let g = a ? a[m] : s.find((y) => y.name === m);
      if (!g) {
        let y =
          typeof h == 'boolean' && i && i.fields.some((x) => x.name === m)
            ? m
            : null;
        return (
          d.push(
            new ve({
              key: m,
              value: h,
              error: {
                type: 'invalidName',
                providedName: m,
                providedValue: h,
                didYouMeanField: y,
                didYouMeanArg:
                  (!y && hn(m, [...s.map((x) => x.name), 'select'])) || void 0,
                originalType: t,
                possibilities: n,
                outputType: i,
              },
            }),
          ),
          d
        );
      }
      let w = Am(m, h, g, r);
      return w && d.push(w), d;
    }, []);
  if (
    (typeof t.constraints.minNumFields == 'number' &&
      c.length < t.constraints.minNumFields) ||
    f.find(
      (d) => d.error?.type === 'missingArg' || d.error?.type === 'atLeastOne',
    )
  ) {
    let d = t.fields.filter(
      (m) =>
        !m.isRequired && o && (typeof o[m.name] > 'u' || o[m.name] === null),
    );
    f.push(
      ...d.map((m) => {
        let h = m.inputTypes[0];
        return new ve({
          key: m.name,
          value: void 0,
          isEnum: h.location === 'enumTypes',
          error: {
            type: 'missingArg',
            missingName: m.name,
            missingArg: m,
            atLeastOne: Boolean(t.constraints.minNumFields) || !1,
            atMostOne: t.constraints.maxNumFields === 1 || !1,
          },
          inputType: h,
        });
      }),
    );
  }
  return new ne(f);
}
l(Xn, 'objectToArgs');
function ei({ document: e, path: t, data: r }) {
  let n = To(r, t);
  if (n === 'undefined') return null;
  if (typeof n != 'object') return n;
  let i = Cm(e, t);
  return No({ field: i, data: n });
}
l(ei, 'unpack');
function No({ field: e, data: t }) {
  if (!t || typeof t != 'object' || !e.children || !e.schemaField) return t;
  let r = {
    DateTime: (n) => new Date(n),
    Json: (n) => JSON.parse(n),
    Bytes: (n) => Buffer.from(n, 'base64'),
    Decimal: (n) => new Pe(n),
    BigInt: (n) => BigInt(n),
  };
  for (let n of e.children) {
    let i = n.schemaField?.outputType.type;
    if (i && typeof i == 'string') {
      let o = r[i];
      if (o)
        if (Array.isArray(t))
          for (let s of t)
            typeof s[n.name] < 'u' &&
              s[n.name] !== null &&
              (Array.isArray(s[n.name])
                ? (s[n.name] = s[n.name].map(o))
                : (s[n.name] = o(s[n.name])));
        else
          typeof t[n.name] < 'u' &&
            t[n.name] !== null &&
            (Array.isArray(t[n.name])
              ? (t[n.name] = t[n.name].map(o))
              : (t[n.name] = o(t[n.name])));
    }
    if (
      n.schemaField &&
      n.schemaField.outputType.location === 'outputObjectTypes'
    )
      if (Array.isArray(t)) for (let o of t) No({ field: n, data: o[n.name] });
      else No({ field: n, data: t[n.name] });
  }
  return t;
}
l(No, 'mapScalars');
function Cm(e, t) {
  let r = t.slice(),
    n = r.shift(),
    i = e.children.find((o) => o.name === n);
  if (!i) throw new Error(`Could not find field ${n} in document ${e}`);
  for (; r.length > 0; ) {
    let o = r.shift();
    if (!i.children)
      throw new Error(`Can't get children for field ${i} with child ${o}`);
    let s = i.children.find((a) => a.name === o);
    if (!s) throw new Error(`Can't find child ${o} of field ${i}`);
    i = s;
  }
  return i;
}
l(Cm, 'getField');
function Co(e) {
  return e
    .split('.')
    .filter((t) => t !== 'select')
    .join('.');
}
l(Co, 'removeSelectFromPath');
function Ro(e) {
  if (Object.prototype.toString.call(e) === '[object Object]') {
    let r = {};
    for (let n in e)
      if (n === 'select') for (let i in e.select) r[i] = Ro(e.select[i]);
      else r[n] = Ro(e[n]);
    return r;
  }
  return e;
}
l(Ro, 'removeSelectFromObject');
function Om({ ast: e, keyPaths: t, missingItems: r, valuePaths: n }) {
  let i = t.map(Co),
    o = n.map(Co),
    s = r.map((u) => ({
      path: Co(u.path),
      isRequired: u.isRequired,
      type: u.type,
    }));
  return { ast: Ro(e), keyPaths: i, missingItems: s, valuePaths: o };
}
l(Om, 'transformAggregatePrintJsonArgs');
function jr(e) {
  return {
    getKeys() {
      return Object.keys(e);
    },
    getPropertyValue(t) {
      return e[t];
    },
  };
}
l(jr, 'addObjectProperties');
function ot(e, t) {
  return {
    getKeys() {
      return [e];
    },
    getPropertyValue() {
      return t();
    },
  };
}
l(ot, 'addProperty');
function gt(e) {
  let t = new Se();
  return {
    getKeys() {
      return e.getKeys();
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r));
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r);
    },
  };
}
l(gt, 'cacheProperties');
var _u = require('util');
var ti = { enumerable: !0, configurable: !0, writable: !0 };
function ri(e) {
  let t = new Set(e);
  return {
    getOwnPropertyDescriptor: () => ti,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  };
}
l(ri, 'defaultProxyHandlers');
var vu = Symbol.for('nodejs.util.inspect.custom');
function st(e, t) {
  let r = Mm(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      },
      has(o, s) {
        if (n.has(s)) return !0;
        let a = r.get(s);
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
      },
      ownKeys(o) {
        let s = Tu(Reflect.ownKeys(o), r),
          a = Tu(Array.from(r.keys()), r);
        return [...new Set([...s, ...a, ...n])];
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a));
      },
      getOwnPropertyDescriptor(o, s) {
        let a = r.get(s);
        return a && a.getPropertyDescriptor
          ? { ...ti, ...a.getPropertyDescriptor(s) }
          : ti;
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      },
    });
  return (
    (i[vu] = function (o, s, a = _u.inspect) {
      let u = { ...this };
      return delete u[vu], a(u, s);
    }),
    i
  );
}
l(st, 'createCompositeProxy');
function Mm(e) {
  let t = new Map();
  for (let r of e) {
    let n = r.getKeys();
    for (let i of n) t.set(i, r);
  }
  return t;
}
l(Mm, 'mapKeysToLayers');
function Tu(e, t) {
  return e.filter((r) => t.get(r)?.has?.(r) ?? !0);
}
l(Tu, 'getExistingKeys');
function Io(e) {
  return {
    getKeys() {
      return e;
    },
    has() {
      return !1;
    },
    getPropertyValue() {},
  };
}
l(Io, 'removeProperties');
var Pu = M(require('path'));
var Br = '<unknown>';
function Au(e) {
  var t = e.split(`
`);
  return t.reduce(function (r, n) {
    var i = Im(n) || Fm(n) || $m(n) || Um(n) || Bm(n);
    return i && r.push(i), r;
  }, []);
}
l(Au, 'parse');
var Nm =
    /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  Rm = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function Im(e) {
  var t = Nm.exec(e);
  if (!t) return null;
  var r = t[2] && t[2].indexOf('native') === 0,
    n = t[2] && t[2].indexOf('eval') === 0,
    i = Rm.exec(t[2]);
  return (
    n && i != null && ((t[2] = i[1]), (t[3] = i[2]), (t[4] = i[3])),
    {
      file: r ? null : t[2],
      methodName: t[1] || Br,
      arguments: r ? [t[2]] : [],
      lineNumber: t[3] ? +t[3] : null,
      column: t[4] ? +t[4] : null,
    }
  );
}
l(Im, 'parseChrome');
var Dm =
  /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function Fm(e) {
  var t = Dm.exec(e);
  return t
    ? {
        file: t[2],
        methodName: t[1] || Br,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null;
}
l(Fm, 'parseWinjs');
var km =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
  Lm = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function $m(e) {
  var t = km.exec(e);
  if (!t) return null;
  var r = t[3] && t[3].indexOf(' > eval') > -1,
    n = Lm.exec(t[3]);
  return (
    r && n != null && ((t[3] = n[1]), (t[4] = n[2]), (t[5] = null)),
    {
      file: t[3],
      methodName: t[1] || Br,
      arguments: t[2] ? t[2].split(',') : [],
      lineNumber: t[4] ? +t[4] : null,
      column: t[5] ? +t[5] : null,
    }
  );
}
l($m, 'parseGecko');
var jm = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function Bm(e) {
  var t = jm.exec(e);
  return t
    ? {
        file: t[3],
        methodName: t[1] || Br,
        arguments: [],
        lineNumber: +t[4],
        column: t[5] ? +t[5] : null,
      }
    : null;
}
l(Bm, 'parseJSC');
var qm =
  /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function Um(e) {
  var t = qm.exec(e);
  return t
    ? {
        file: t[2],
        methodName: t[1] || Br,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null;
}
l(Um, 'parseNode');
var ni = class {
  getLocation() {
    return null;
  }
};
l(ni, 'DisabledCallSite');
var ii = class {
  constructor() {
    this._error = new Error();
  }
  getLocation() {
    let t = this._error.stack;
    if (!t) return null;
    let n = Au(t).find((i) => {
      if (!i.file) return !1;
      let o = i.file.split(Pu.default.sep).join('/');
      return (
        o !== '<anonymous>' &&
        !o.includes('@prisma') &&
        !o.includes('/packages/client/src/runtime/') &&
        !o.endsWith('/runtime/binary.js') &&
        !o.endsWith('/runtime/library.js') &&
        !o.endsWith('/runtime/data-proxy.js') &&
        !o.endsWith('/runtime/edge.js') &&
        !o.endsWith('/runtime/edge-esm.js') &&
        !o.startsWith('internal/') &&
        !i.methodName.includes('new ') &&
        !i.methodName.includes('getCallSite') &&
        !i.methodName.includes('Proxy.') &&
        i.methodName.split('.').length < 4
      );
    });
    return !n || !n.file
      ? null
      : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
  }
};
l(ii, 'EnabledCallSite');
function at(e) {
  return e === 'minimal' ? new ni() : new ii();
}
l(at, 'getCallSite');
function Ie(e) {
  let t,
    r = l((n) => {
      try {
        return n === void 0 || n?.kind === 'itx'
          ? t ?? (t = Su(e(n)))
          : Su(e(n));
      } catch (i) {
        return Promise.reject(i);
      }
    }, '_callback');
  return {
    then(n, i, o) {
      return r(o).then(n, i, o);
    },
    catch(n, i) {
      return r(i).catch(n, i);
    },
    finally(n, i) {
      return r(i).finally(n, i);
    },
    requestTransaction(n) {
      let i = r(n);
      return i.requestTransaction ? i.requestTransaction(n) : i;
    },
    [Symbol.toStringTag]: 'PrismaPromise',
  };
}
l(Ie, 'createPrismaPromise');
function Su(e) {
  return typeof e.then == 'function' ? e : Promise.resolve(e);
}
l(Su, 'valueToPromise');
var Cu = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 };
function Wt(e = {}) {
  let t = Vm(e);
  return Object.entries(t).reduce(
    (n, [i, o]) => (
      Cu[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
    ),
    { select: {} },
  );
}
l(Wt, 'desugarUserArgs');
function Vm(e = {}) {
  return typeof e._count == 'boolean'
    ? { ...e, _count: { _all: e._count } }
    : e;
}
l(Vm, 'desugarCountInUserArgs');
function oi(e = {}) {
  return (t) => (typeof e._count == 'boolean' && (t._count = t._count._all), t);
}
l(oi, 'createUnpacker');
function Ou(e, t) {
  let r = oi(e);
  return t({ action: 'aggregate', unpacker: r, argsMapper: Wt })(e);
}
l(Ou, 'aggregate');
function Km(e = {}) {
  let { select: t, ...r } = e;
  return typeof t == 'object'
    ? Wt({ ...r, _count: t })
    : Wt({ ...r, _count: { _all: !0 } });
}
l(Km, 'desugarUserArgs');
function Qm(e = {}) {
  return typeof e.select == 'object'
    ? (t) => oi(e)(t)._count
    : (t) => oi(e)(t)._count._all;
}
l(Qm, 'createUnpacker');
function Mu(e, t) {
  return t({ action: 'count', unpacker: Qm(e), argsMapper: Km })(e);
}
l(Mu, 'count');
function Hm(e = {}) {
  let t = Wt(e);
  if (Array.isArray(t.by))
    for (let r of t.by) typeof r == 'string' && (t.select[r] = !0);
  return t;
}
l(Hm, 'desugarUserArgs');
function Wm(e = {}) {
  return (t) => (
    typeof e?._count == 'boolean' &&
      t.forEach((r) => {
        r._count = r._count._all;
      }),
    t
  );
}
l(Wm, 'createUnpacker');
function Nu(e, t) {
  return t({ action: 'groupBy', unpacker: Wm(e), argsMapper: Hm })(e);
}
l(Nu, 'groupBy');
function Ru(e, t, r) {
  if (t === 'aggregate') return (n) => Ou(n, r);
  if (t === 'count') return (n) => Mu(n, r);
  if (t === 'groupBy') return (n) => Nu(n, r);
}
l(Ru, 'applyAggregates');
function Iu(e) {
  let t = e.fields.filter((n) => !n.relationName),
    r = yo(t, (n) => n.name);
  return new Proxy(
    {},
    {
      get(n, i) {
        if (i in n || typeof i == 'symbol') return n[i];
        let o = r[i];
        if (o) return new Ee(e.name, i, o.type, o.isList);
      },
      ...ri(Object.keys(r)),
    },
  );
}
l(Iu, 'applyFieldsProxy');
function Jm(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, 'select', e];
}
l(Jm, 'getNextDataPath');
function Ym(e, t, r) {
  return t === void 0 ? e ?? {} : Wn(t, r, e || !0);
}
l(Ym, 'getNextUserArgs');
function Do(e, t, r, n, i, o) {
  let a = e._baseDmmf.modelMap[t].fields.reduce(
    (u, c) => ({ ...u, [c.name]: c }),
    {},
  );
  return (u) => {
    let c = at(e._errorFormat),
      p = Jm(n, i),
      f = Ym(u, o, p),
      d = r({ dataPath: p, callsite: c })(f),
      m = zm(e, t);
    return new Proxy(d, {
      get(h, g) {
        if (!m.includes(g)) return h[g];
        let y = [a[g].type, r, g],
          x = [p, f];
        return Do(e, ...y, ...x);
      },
      ...ri([...m, ...Object.getOwnPropertyNames(d)]),
    });
  };
}
l(Do, 'applyFluent');
function zm(e, t) {
  return e._baseDmmf.modelMap[t].fields
    .filter((r) => r.kind === 'object')
    .map((r) => r.name);
}
l(zm, 'getOwnKeys');
var si = Du().version;
var Te = class extends te {
  constructor(t) {
    super(t, { code: 'P2025', clientVersion: si }),
      (this.name = 'NotFoundError');
  }
};
l(Te, 'NotFoundError');
function Fo(e, t, r, n) {
  let i;
  if (
    r &&
    typeof r == 'object' &&
    'rejectOnNotFound' in r &&
    r.rejectOnNotFound !== void 0
  )
    (i = r.rejectOnNotFound), delete r.rejectOnNotFound;
  else if (typeof n == 'boolean') i = n;
  else if (n && typeof n == 'object' && e in n) {
    let o = n[e];
    if (o && typeof o == 'object') return t in o ? o[t] : void 0;
    i = Fo(e, t, r, o);
  } else typeof n == 'function' ? (i = n) : (i = !1);
  return i;
}
l(Fo, 'getRejectOnNotFound');
var Zm = /(findUnique|findFirst)/;
function Fu(e, t, r, n) {
  if ((r ?? (r = 'record'), n && !e && Zm.exec(t)))
    throw typeof n == 'boolean' && n
      ? new Te(`No ${r} found`)
      : typeof n == 'function'
      ? n(new Te(`No ${r} found`))
      : Rr(n)
      ? n
      : new Te(`No ${r} found`);
}
l(Fu, 'throwIfNotFound');
function ku(e, t, r) {
  return e === Ne.ModelAction.findFirstOrThrow ||
    e === Ne.ModelAction.findUniqueOrThrow
    ? eg(t, r)
    : r;
}
l(ku, 'adaptErrors');
function eg(e, t) {
  return async (r) => {
    if ('rejectOnNotFound' in r.args) {
      let i = Qt({
        originalMethod: r.clientMethod,
        callsite: r.callsite,
        message: "'rejectOnNotFound' option is not supported",
      });
      throw new ie(i);
    }
    return await t(r).catch((i) => {
      throw i instanceof te && i.code === 'P2025' ? new Te(`No ${e} found`) : i;
    });
  };
}
l(eg, 'applyOrThrowWrapper');
var tg = [
    'findUnique',
    'findUniqueOrThrow',
    'findFirst',
    'findFirstOrThrow',
    'create',
    'update',
    'upsert',
    'delete',
  ],
  rg = ['aggregate', 'count', 'groupBy'];
function ko(e, t) {
  let r = [ig(e, t), ng(t)];
  e._engineConfig.previewFeatures?.includes('fieldReference') &&
    r.push(ag(e, t));
  let n = e._extensions.getAllModelExtensions(t);
  return n && r.push(jr(n)), st({}, r);
}
l(ko, 'applyModel');
function ng(e) {
  return ot('name', () => e);
}
l(ng, 'modelMetaLayer');
function ig(e, t) {
  let r = we(t),
    n = og(e, t);
  return {
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = i,
        s = l((u) => e._request(u), 'requestFn');
      s = ku(o, t, s);
      let a = l(
        (u) => (c) => {
          let p = at(e._errorFormat);
          return Ie((f) => {
            let d = {
              args: c,
              dataPath: [],
              action: o,
              model: t,
              clientMethod: `${r}.${i}`,
              jsModelName: r,
              transaction: f,
              callsite: p,
            };
            return s({ ...d, ...u });
          });
        },
        'action',
      );
      return tg.includes(o) ? Do(e, t, a) : sg(i) ? Ru(e, i, a) : a({});
    },
  };
}
l(ig, 'modelActionsLayer');
function og(e, t) {
  let r = Object.keys(e._baseDmmf.mappingsMap[t]).filter(
    (n) => n !== 'model' && n !== 'plural',
  );
  return r.push('count'), r;
}
l(og, 'getOwnKeys');
function sg(e) {
  return rg.includes(e);
}
l(sg, 'isValidAggregateName');
function ag(e, t) {
  return gt(
    ot('fields', () => {
      let r = e._baseDmmf.modelMap[t];
      return Iu(r);
    }),
  );
}
l(ag, 'fieldsPropertyLayer');
function Lu(e) {
  return e.replace(/^./, (t) => t.toUpperCase());
}
l(Lu, 'jsToDMMFModelName');
var Lo = Symbol();
function ai(e) {
  let t = [lg(e), ot(Lo, () => e)],
    r = e._extensions.getAllClientExtensions();
  return r && t.push(jr(r)), st(e, t);
}
l(ai, 'applyModelsAndClientExtensions');
function lg(e) {
  let t = Object.keys(e._baseDmmf.modelMap),
    r = t.map(we),
    n = [...new Set(t.concat(r))];
  return gt({
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = Lu(i);
      if (e._baseDmmf.modelMap[o] !== void 0) return ko(e, o);
      if (e._baseDmmf.modelMap[i] !== void 0) return ko(e, i);
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 };
    },
  });
}
l(lg, 'modelsLayer');
function $u(e) {
  return e[Lo] ? e[Lo] : e;
}
l($u, 'unapplyModelsAndClientExtensions');
function ju(e) {
  if (!this._hasPreviewFlag('clientExtensions'))
    throw new ie(
      'Extensions are not yet generally available, please add `clientExtensions` to the `previewFeatures` field in the `generator` block in the `schema.prisma` file.',
    );
  if (typeof e == 'function') return e(this);
  let t = $u(this),
    r = Object.create(t, {
      _extensions: { value: this._extensions.append(e) },
    });
  return ai(r);
}
l(ju, '$extends');
function De(e) {
  if (typeof e != 'object') return e;
  var t,
    r,
    n = Object.prototype.toString.call(e);
  if (n === '[object Object]') {
    if (e.constructor !== Object && typeof e.constructor == 'function') {
      r = new e.constructor();
      for (t in e) e.hasOwnProperty(t) && r[t] !== e[t] && (r[t] = De(e[t]));
    } else {
      r = {};
      for (t in e)
        t === '__proto__'
          ? Object.defineProperty(r, t, {
              value: De(e[t]),
              configurable: !0,
              enumerable: !0,
              writable: !0,
            })
          : (r[t] = De(e[t]));
    }
    return r;
  }
  if (n === '[object Array]') {
    for (t = e.length, r = Array(t); t--; ) r[t] = De(e[t]);
    return r;
  }
  return n === '[object Set]'
    ? ((r = new Set()),
      e.forEach(function (i) {
        r.add(De(i));
      }),
      r)
    : n === '[object Map]'
    ? ((r = new Map()),
      e.forEach(function (i, o) {
        r.set(De(o), De(i));
      }),
      r)
    : n === '[object Date]'
    ? new Date(+e)
    : n === '[object RegExp]'
    ? ((r = new RegExp(e.source, e.flags)), (r.lastIndex = e.lastIndex), r)
    : n === '[object DataView]'
    ? new e.constructor(De(e.buffer))
    : n === '[object ArrayBuffer]'
    ? e.slice(0)
    : n.slice(-6) === 'Array]'
    ? new e.constructor(e)
    : e;
}
l(De, 'klona');
function Bu(e, t, r, n = 0) {
  return Ie((i) => {
    let o = t.customDataProxyFetch ?? ((s) => s);
    return (
      i !== void 0 &&
        (t.transaction?.kind === 'batch' && t.transaction.lock.then(),
        (t.transaction = i)),
      n === r.length
        ? e._executeRequest(t)
        : r[n]({
            model: t.model,
            operation: t.action,
            args: De(t.args ?? {}),
            __internalParams: t,
            query: (s, a = t) => {
              let u = a.customDataProxyFetch ?? ((c) => c);
              return (
                (a.customDataProxyFetch = (c) => o(u(c))),
                (a.args = s),
                Bu(e, a, r, n + 1)
              );
            },
          })
    );
  });
}
l(Bu, 'iterateAndCallQueryCallbacks');
function qu(e, t) {
  let { jsModelName: r, action: n } = t;
  return r === void 0 || e._extensions.isEmpty()
    ? e._executeRequest(t)
    : Bu(e, t, e._extensions.getAllQueryCallbacks(r, n));
}
l(qu, 'applyQueryExtensions');
function Uu(e) {
  let t;
  return {
    get() {
      return t || (t = { value: e() }), t.value;
    },
  };
}
l(Uu, 'lazyProperty');
var qr = class {
  constructor(t, r) {
    this.extension = t;
    this.previous = r;
    this.computedFieldsCache = new Se();
    this.modelExtensionsCache = new Se();
    this.queryCallbacksCache = new Se();
    this.clientExtensions = Uu(() =>
      this.extension.client
        ? {
            ...this.previous?.getAllClientExtensions(),
            ...this.extension.client,
          }
        : this.previous?.getAllClientExtensions(),
    );
  }
  getAllComputedFields(t) {
    return this.computedFieldsCache.getOrCreate(t, () =>
      Hl(this.previous?.getAllComputedFields(t), this.extension, t),
    );
  }
  getAllClientExtensions() {
    return this.clientExtensions.get();
  }
  getAllModelExtensions(t) {
    return this.modelExtensionsCache.getOrCreate(t, () => {
      let r = we(t);
      return !this.extension.model ||
        !(this.extension.model[r] || this.extension.model.$allModels)
        ? this.previous?.getAllModelExtensions(t)
        : {
            ...this.previous?.getAllModelExtensions(t),
            ...this.extension.model.$allModels,
            ...this.extension.model[r],
          };
    });
  }
  getAllQueryCallbacks(t, r) {
    return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
      let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
        i = this.extension.query;
      if (!i || !(i[t] || i.$allModels)) return n;
      let o = [];
      return (
        i[t] !== void 0 &&
          (i[t][r] !== void 0 && o.push(i[t][r]),
          i[t].$allOperations !== void 0 && o.push(i[t].$allOperations)),
        i.$allModels !== void 0 &&
          (i.$allModels[r] !== void 0 && o.push(i.$allModels[r]),
          i.$allModels.$allOperations !== void 0 &&
            o.push(i.$allModels.$allOperations)),
        n.concat(o)
      );
    });
  }
};
l(qr, 'MergedExtensionsListNode');
var Ue = class {
  constructor(t) {
    this.head = t;
  }
  static empty() {
    return new Ue();
  }
  static single(t) {
    return new Ue(new qr(t));
  }
  isEmpty() {
    return this.head === void 0;
  }
  append(t) {
    return new Ue(new qr(t, this.head));
  }
  getAllComputedFields(t) {
    return this.head?.getAllComputedFields(t);
  }
  getAllClientExtensions() {
    return this.head?.getAllClientExtensions();
  }
  getAllModelExtensions(t) {
    return this.head?.getAllModelExtensions(t);
  }
  getAllQueryCallbacks(t, r) {
    return this.head?.getAllQueryCallbacks(t, r) ?? [];
  }
};
l(Ue, 'MergedExtensionsList');
var ug = {
    findUnique: 'query',
    findUniqueOrThrow: 'query',
    findFirst: 'query',
    findFirstOrThrow: 'query',
    findMany: 'query',
    count: 'query',
    create: 'mutation',
    createMany: 'mutation',
    update: 'mutation',
    updateMany: 'mutation',
    upsert: 'mutation',
    delete: 'mutation',
    deleteMany: 'mutation',
    executeRaw: 'mutation',
    queryRaw: 'mutation',
    aggregate: 'query',
    groupBy: 'query',
    runCommandRaw: 'mutation',
    findRaw: 'query',
    aggregateRaw: 'query',
  },
  Ur = class {
    constructor(t, r) {
      this.dmmf = t;
      this.errorFormat = r;
    }
    createMessage({
      action: t,
      modelName: r,
      args: n,
      extensions: i,
      clientMethod: o,
      callsite: s,
    }) {
      let a,
        u = ug[t];
      (t === 'executeRaw' || t === 'queryRaw' || t === 'runCommandRaw') &&
        (a = t);
      let c;
      if (r !== void 0) {
        if (((c = this.dmmf?.mappingsMap[r]), c === void 0))
          throw new Error(`Could not find mapping for model ${r}`);
        a = c[t === 'count' ? 'aggregate' : t];
      }
      if (u !== 'query' && u !== 'mutation')
        throw new Error(`Invalid operation ${u} for action ${t}`);
      if (this.dmmf?.rootFieldMap[a] === void 0)
        throw new Error(
          `Could not find rootField ${a} for action ${t} for model ${r} on rootType ${u}`,
        );
      let f = Zn({
        dmmf: this.dmmf,
        rootField: a,
        rootTypeName: u,
        select: n,
        modelName: r,
        extensions: i,
      });
      return f.validate(n, !1, o, this.errorFormat, s), new li(f);
    }
  };
l(Ur, 'GraphQLProtocolEncoder');
var li = class {
  constructor(t) {
    this.document = t;
  }
  isWrite() {
    return this.document.type === 'mutation';
  }
  getBatchId() {
    if (!this.getRootField().startsWith('findUnique')) return;
    let t = this.document.children[0].args?.args
        .map((n) =>
          n.value instanceof ne
            ? `${n.key}-${n.value.args.map((i) => i.key).join(',')}`
            : n.key,
        )
        .join(','),
      r = this.document.children[0].children.join(',');
    return `${this.document.children[0].name}|${t}|${r}`;
  }
  toDebugString() {
    return String(this.document);
  }
  toEngineQuery() {
    return { query: String(this.document) };
  }
  deserializeResponse(t, r) {
    let n = this.getRootField(),
      i = [];
    return (
      n && i.push(n),
      i.push(...r.filter((o) => o !== 'select' && o !== 'include')),
      ei({ document: this.document, path: i, data: t })
    );
  }
  getRootField() {
    return this.document.children[0].name;
  }
};
l(li, 'GraphQLMessage');
function Gu(e, t = () => {}) {
  let r,
    n = new Promise((i) => (r = i));
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n);
    },
  };
}
l(Gu, 'getLockCountPromise');
function Vu(e) {
  return typeof e == 'string'
    ? e
    : e.reduce((t, r) => {
        let n = typeof r == 'string' ? r : r.level;
        return n === 'query'
          ? t
          : t && (r === 'info' || t === 'info')
          ? 'info'
          : n;
      }, void 0);
}
l(Vu, 'getLogLevel');
function Qu(e, t, r) {
  let n = Ku(e, r),
    i = Ku(t, r),
    o = Object.values(i).map((a) => a[a.length - 1]),
    s = Object.keys(i);
  return (
    Object.entries(n).forEach(([a, u]) => {
      s.includes(a) || o.push(u[u.length - 1]);
    }),
    o
  );
}
l(Qu, 'mergeBy');
var Ku = l(
  (e, t) =>
    e.reduce((r, n) => {
      let i = t(n);
      return r[i] || (r[i] = []), r[i].push(n), r;
    }, {}),
  'groupBy',
);
var Gr = class {
  constructor() {
    this._middlewares = [];
  }
  use(t) {
    this._middlewares.push(t);
  }
  get(t) {
    return this._middlewares[t];
  }
  has(t) {
    return !!this._middlewares[t];
  }
  length() {
    return this._middlewares.length;
  }
};
l(Gr, 'MiddlewareHandler');
var Ju = M(Er());
function Hu({ result: e, modelName: t, select: r, extensions: n }) {
  let i = n.getAllComputedFields(t);
  if (!i) return e;
  let o = [],
    s = [];
  for (let a of Object.values(i)) {
    if (r) {
      if (!r[a.name]) continue;
      let u = a.needs.filter((c) => !r[c]);
      u.length > 0 && s.push(Io(u));
    }
    cg(e, a.needs) && o.push(pg(a, st(e, o)));
  }
  return o.length > 0 || s.length > 0 ? st(e, [...o, ...s]) : e;
}
l(Hu, 'applyResultExtensions');
function cg(e, t) {
  return t.every((r) => ho(e, r));
}
l(cg, 'areNeedsMet');
function pg(e, t) {
  return gt(ot(e.name, () => e.compute(t)));
}
l(pg, 'computedPropertyLayer');
function ui({ visitor: e, result: t, args: r, dmmf: n, model: i }) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++)
      t[s] = ui({ result: t[s], args: r, model: i, dmmf: n, visitor: e });
    return t;
  }
  let o = e(t, i, r) ?? t;
  return (
    r.include &&
      Wu({
        includeOrSelect: r.include,
        result: o,
        parentModel: i,
        dmmf: n,
        visitor: e,
      }),
    r.select &&
      Wu({
        includeOrSelect: r.select,
        result: o,
        parentModel: i,
        dmmf: n,
        visitor: e,
      }),
    o
  );
}
l(ui, 'visitQueryResult');
function Wu({
  includeOrSelect: e,
  result: t,
  parentModel: r,
  dmmf: n,
  visitor: i,
}) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null) continue;
    let a = r.fields.find((c) => c.name === o);
    if (!a || a.kind !== 'object' || !a.relationName) continue;
    let u = typeof s == 'object' ? s : {};
    t[o] = ui({
      visitor: i,
      result: t[o],
      args: u,
      model: n.getModelMap()[a.type],
      dmmf: n,
    });
  }
}
l(Wu, 'visitNested');
var Vr = class {
  constructor(t) {
    this.options = t;
    this.tickActive = !1;
    this.batches = {};
  }
  request(t) {
    let r = this.options.batchBy(t);
    return r
      ? (this.batches[r] ||
          ((this.batches[r] = []),
          this.tickActive ||
            ((this.tickActive = !0),
            process.nextTick(() => {
              this.dispatchBatches(), (this.tickActive = !1);
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        }))
      : this.options.singleLoader(t);
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t];
      delete this.batches[t],
        r.length === 1
          ? this.options
              .singleLoader(r[0].request)
              .then((n) => {
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
              })
              .catch((n) => {
                r[0].reject(n);
              })
          : this.options
              .batchLoader(r.map((n) => n.request))
              .then((n) => {
                if (n instanceof Error)
                  for (let i = 0; i < r.length; i++) r[i].reject(n);
                else
                  for (let i = 0; i < r.length; i++) {
                    let o = n[i];
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
                  }
              })
              .catch((n) => {
                for (let i = 0; i < r.length; i++) r[i].reject(n);
              });
    }
  }
  get [Symbol.toStringTag]() {
    return 'DataLoader';
  }
};
l(Vr, 'DataLoader');
var fg = U('prisma:client:request_handler'),
  Kr = class {
    constructor(t, r) {
      (this.logEmmitter = r),
        (this.client = t),
        (this.dataloader = new Vr({
          batchLoader: (n) => {
            let i = n[0].transaction,
              o = n.map((u) => u.protocolMessage.toEngineQuery()),
              s = je({
                context: n[0].otelParentCtx,
                tracingConfig: t._tracingConfig,
              }),
              a = n.some((u) => u.protocolMessage.isWrite());
            return this.client._engine.requestBatch(o, {
              traceparent: s,
              transaction: dg(i),
              containsWrite: a,
              customDataProxyFetch: n[0].customDataProxyFetch,
            });
          },
          singleLoader: (n) => {
            let i = n.transaction?.kind === 'itx' ? Yu(n.transaction) : void 0;
            return this.client._engine.request(
              n.protocolMessage.toEngineQuery(),
              {
                traceparent: je({ tracingConfig: n.tracingConfig }),
                interactiveTransaction: i,
                isWrite: n.protocolMessage.isWrite(),
                customDataProxyFetch: n.customDataProxyFetch,
              },
            );
          },
          batchBy: (n) =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : n.protocolMessage.getBatchId(),
        }));
    }
    async request({
      protocolMessage: t,
      dataPath: r = [],
      callsite: n,
      modelName: i,
      rejectOnNotFound: o,
      clientMethod: s,
      args: a,
      transaction: u,
      unpacker: c,
      extensions: p,
      otelParentCtx: f,
      otelChildCtx: d,
      customDataProxyFetch: m,
    }) {
      try {
        let h = await this.dataloader.request({
            protocolMessage: t,
            transaction: u,
            otelParentCtx: f,
            otelChildCtx: d,
            tracingConfig: this.client._tracingConfig,
            customDataProxyFetch: m,
          }),
          g = h?.data,
          w = h?.elapsed,
          y = this.unpack(t, g, r, c);
        return (
          Fu(y, s, i, o),
          i &&
            (y = this.applyResultExtensions({
              result: y,
              modelName: i,
              args: a,
              extensions: p,
            })),
          process.env.PRISMA_CLIENT_GET_TIME ? { data: y, elapsed: w } : y
        );
      } catch (h) {
        this.handleAndLogRequestError({
          error: h,
          clientMethod: s,
          callsite: n,
          transaction: u,
        });
      }
    }
    handleAndLogRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
    }) {
      try {
        this.handleRequestError({
          error: t,
          clientMethod: r,
          callsite: n,
          transaction: i,
        });
      } catch (o) {
        throw (
          (this.logEmmitter &&
            this.logEmmitter.emit('error', {
              message: o.message,
              target: r,
              timestamp: new Date(),
            }),
          o)
        );
      }
    }
    handleRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
    }) {
      if ((fg(t), mg(t, i) || t instanceof Te)) throw t;
      let o = t.message;
      throw (
        (n &&
          (o = Qt({
            callsite: n,
            originalMethod: r,
            isPanic: t.isPanic,
            showColors: this.client._errorFormat === 'pretty',
            message: o,
          })),
        (o = this.sanitizeMessage(o)),
        t.code
          ? new te(o, {
              code: t.code,
              clientVersion: this.client._clientVersion,
              meta: t.meta,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t.isPanic
          ? new pe(o, this.client._clientVersion)
          : t instanceof J
          ? new J(o, {
              clientVersion: this.client._clientVersion,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t instanceof V
          ? new V(o, this.client._clientVersion)
          : t instanceof pe
          ? new pe(o, this.client._clientVersion)
          : ((t.clientVersion = this.client._clientVersion), t))
      );
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== 'pretty'
        ? (0, Ju.default)(t)
        : t;
    }
    unpack(t, r, n, i) {
      if (!r) return r;
      r.data && (r = r.data);
      let o = t.deserializeResponse(r, n);
      return i ? i(o) : o;
    }
    applyResultExtensions({ result: t, modelName: r, args: n, extensions: i }) {
      if (i.isEmpty() || t == null) return t;
      let o = this.client._baseDmmf.getModelMap()[r];
      return o
        ? ui({
            result: t,
            args: n ?? {},
            model: o,
            dmmf: this.client._baseDmmf,
            visitor(s, a, u) {
              let c = we(a.name);
              return Hu({
                result: s,
                modelName: c,
                select: u.select,
                extensions: i,
              });
            },
          })
        : t;
    }
    get [Symbol.toStringTag]() {
      return 'RequestHandler';
    }
  };
l(Kr, 'RequestHandler');
function dg(e) {
  if (!!e) {
    if (e.kind === 'batch')
      return { kind: 'batch', options: { isolationLevel: e.isolationLevel } };
    if (e.kind === 'itx') return { kind: 'itx', options: Yu(e) };
    go(e, 'Unknown transaction kind');
  }
}
l(dg, 'getTransactionOptions');
function Yu(e) {
  return { id: e.id, payload: e.payload };
}
l(Yu, 'getItxTransactionOptions');
function mg(e, t) {
  return Sr(e) && t?.kind === 'batch' && e.batchRequestIdx !== t.index;
}
l(mg, 'isMismatchingBatchIndex');
function zu(e) {
  return e.map((t) => {
    let r = {};
    for (let n of Object.keys(t)) r[n] = Xu(t[n]);
    return r;
  });
}
l(zu, 'deserializeRawResults');
function Xu({ prisma__type: e, prisma__value: t }) {
  switch (e) {
    case 'bigint':
      return BigInt(t);
    case 'bytes':
      return Buffer.from(t, 'base64');
    case 'decimal':
      return new Pe(t);
    case 'datetime':
    case 'date':
      return new Date(t);
    case 'time':
      return new Date(`1970-01-01T${t}Z`);
    case 'array':
      return t.map(Xu);
    default:
      return t;
  }
}
l(Xu, 'deserializeValue');
var Qr = l(
  (e) => e.reduce((t, r, n) => `${t}@P${n}${r}`),
  'mssqlPreparedStatement',
);
function Oe(e) {
  try {
    return Zu(e, 'fast');
  } catch {
    return Zu(e, 'slow');
  }
}
l(Oe, 'serializeRawParameters');
function Zu(e, t) {
  return JSON.stringify(e.map((r) => gg(r, t)));
}
l(Zu, 'serializeRawParametersInternal');
function gg(e, t) {
  return typeof e == 'bigint'
    ? { prisma__type: 'bigint', prisma__value: e.toString() }
    : hg(e)
    ? { prisma__type: 'date', prisma__value: e.toJSON() }
    : Pe.isDecimal(e)
    ? { prisma__type: 'decimal', prisma__value: e.toJSON() }
    : Buffer.isBuffer(e)
    ? { prisma__type: 'bytes', prisma__value: e.toString('base64') }
    : yg(e) || ArrayBuffer.isView(e)
    ? {
        prisma__type: 'bytes',
        prisma__value: Buffer.from(e).toString('base64'),
      }
    : typeof e == 'object' && t === 'slow'
    ? tc(e)
    : e;
}
l(gg, 'encodeParameter');
function hg(e) {
  return e instanceof Date
    ? !0
    : Object.prototype.toString.call(e) === '[object Date]' &&
        typeof e.toJSON == 'function';
}
l(hg, 'isDate');
function yg(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == 'object' && e !== null
    ? e[Symbol.toStringTag] === 'ArrayBuffer' ||
      e[Symbol.toStringTag] === 'SharedArrayBuffer'
    : !1;
}
l(yg, 'isArrayBufferLike');
function tc(e) {
  if (typeof e != 'object' || e === null) return e;
  if (typeof e.toJSON == 'function') return e.toJSON();
  if (Array.isArray(e)) return e.map(ec);
  let t = {};
  for (let r of Object.keys(e)) t[r] = ec(e[r]);
  return t;
}
l(tc, 'preprocessObject');
function ec(e) {
  return typeof e == 'bigint' ? e.toString() : tc(e);
}
l(ec, 'preprocessValueInObject');
var oc = M(Ni());
var rc = [
    'datasources',
    'errorFormat',
    'log',
    '__internal',
    'rejectOnNotFound',
  ],
  nc = ['pretty', 'colorless', 'minimal'],
  ic = ['info', 'query', 'warn', 'error'],
  bg = {
    datasources: (e, t) => {
      if (!!e) {
        if (typeof e != 'object' || Array.isArray(e))
          throw new K(
            `Invalid value ${JSON.stringify(
              e,
            )} for "datasources" provided to PrismaClient constructor`,
          );
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = Jt(r, t) || `Available datasources: ${t.join(', ')}`;
            throw new K(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`,
            );
          }
          if (typeof n != 'object' || Array.isArray(n))
            throw new K(`Invalid value ${JSON.stringify(
              e,
            )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == 'object')
            for (let [i, o] of Object.entries(n)) {
              if (i !== 'url')
                throw new K(`Invalid value ${JSON.stringify(
                  e,
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if (typeof o != 'string')
                throw new K(`Invalid value ${JSON.stringify(
                  o,
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
        }
      }
    },
    errorFormat: (e) => {
      if (!!e) {
        if (typeof e != 'string')
          throw new K(
            `Invalid value ${JSON.stringify(
              e,
            )} for "errorFormat" provided to PrismaClient constructor.`,
          );
        if (!nc.includes(e)) {
          let t = Jt(e, nc);
          throw new K(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`,
          );
        }
      }
    },
    log: (e) => {
      if (!e) return;
      if (!Array.isArray(e))
        throw new K(
          `Invalid value ${JSON.stringify(
            e,
          )} for "log" provided to PrismaClient constructor.`,
        );
      function t(r) {
        if (typeof r == 'string' && !ic.includes(r)) {
          let n = Jt(r, ic);
          throw new K(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`,
          );
        }
      }
      l(t, 'validateLogLevel');
      for (let r of e) {
        t(r);
        let n = {
          level: t,
          emit: (i) => {
            let o = ['stdout', 'event'];
            if (!o.includes(i)) {
              let s = Jt(i, o);
              throw new K(
                `Invalid value ${JSON.stringify(
                  i,
                )} for "emit" in logLevel provided to PrismaClient constructor.${s}`,
              );
            }
          },
        };
        if (r && typeof r == 'object')
          for (let [i, o] of Object.entries(r))
            if (n[i]) n[i](o);
            else
              throw new K(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`,
              );
      }
    },
    __internal: (e) => {
      if (!e) return;
      let t = ['debug', 'hooks', 'engine', 'measurePerformance'];
      if (typeof e != 'object')
        throw new K(
          `Invalid value ${JSON.stringify(
            e,
          )} for "__internal" to PrismaClient constructor`,
        );
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = Jt(r, t);
          throw new K(
            `Invalid property ${JSON.stringify(
              r,
            )} for "__internal" provided to PrismaClient constructor.${n}`,
          );
        }
    },
    rejectOnNotFound: (e) => {
      if (!!e) {
        if (
          Rr(e) ||
          typeof e == 'boolean' ||
          typeof e == 'object' ||
          typeof e == 'function'
        )
          return e;
        throw new K(
          `Invalid rejectOnNotFound expected a boolean/Error/{[modelName: Error | boolean]} but received ${JSON.stringify(
            e,
          )}`,
        );
      }
    },
  };
function sc(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!rc.includes(r)) {
      let i = Jt(r, rc);
      throw new K(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`,
      );
    }
    bg[r](n, t);
  }
}
l(sc, 'validatePrismaClientOptions');
function Jt(e, t) {
  if (t.length === 0 || typeof e != 'string') return '';
  let r = Eg(e, t);
  return r ? ` Did you mean "${r}"?` : '';
}
l(Jt, 'getDidYouMean');
function Eg(e, t) {
  if (t.length === 0) return null;
  let r = t.map((i) => ({ value: i, distance: (0, oc.default)(e, i) }));
  r.sort((i, o) => (i.distance < o.distance ? -1 : 1));
  let n = r[0];
  return n.distance < 3 ? n.value : null;
}
l(Eg, 'getAlternative');
function ac(e) {
  return e.length === 0
    ? Promise.resolve([])
    : new Promise((t, r) => {
        let n = new Array(e.length),
          i = null,
          o = !1,
          s = 0,
          a = l(() => {
            o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)));
          }, 'settleOnePromise'),
          u = l((c) => {
            o || ((o = !0), r(c));
          }, 'immediatelyReject');
        for (let c = 0; c < e.length; c++)
          e[c].then(
            (p) => {
              (n[c] = p), a();
            },
            (p) => {
              if (!Sr(p)) {
                u(p);
                return;
              }
              p.batchRequestIdx === c ? u(p) : (i || (i = p), a());
            },
          );
      });
}
l(ac, 'waitForBatch');
var oe = U('prisma:client'),
  wg = /^(\s*alter\s)/i;
typeof globalThis == 'object' && (globalThis.NODE_CLIENT = !0);
function lc(e) {
  return Array.isArray(e);
}
l(lc, 'isReadonlyArray');
function $o(e, t, r) {
  if (t.length > 0 && wg.exec(e))
    throw new Error(`Running ALTER using ${r} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
l($o, 'checkAlter');
var xg = Symbol.for('prisma.client.transaction.id'),
  vg = {
    id: 0,
    nextId() {
      return ++this.id;
    },
  };
function dc(e) {
  class t {
    constructor(n) {
      this._middlewares = new Gr();
      this._getDmmf = Vn(async (n) => {
        try {
          let i = await this._engine.getDmmf();
          return new Le(Kl(i));
        } catch (i) {
          this._fetcher.handleAndLogRequestError({ ...n, error: i });
        }
      });
      this._getProtocolEncoder = Vn(
        async (n) => (
          this._dmmf === void 0 && (this._dmmf = await this._getDmmf(n)),
          new Ur(this._dmmf, this._errorFormat)
        ),
      );
      this.$extends = ju;
      n && sc(n, e.datasourceNames);
      let i = new pc.EventEmitter().on('error', (a) => {});
      (this._extensions = Ue.empty()),
        (this._previewFeatures = e.generator?.previewFeatures ?? []),
        (this._rejectOnNotFound = n?.rejectOnNotFound),
        (this._clientVersion = e.clientVersion ?? si),
        (this._activeProvider = e.activeProvider),
        (this._dataProxy = e.dataProxy),
        (this._tracingConfig = oo(this._previewFeatures)),
        (this._clientEngineType = co(e.generator));
      let o = {
          rootEnvPath:
            e.relativeEnvPaths.rootEnvPath &&
            Hr.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath:
            e.relativeEnvPaths.schemaEnvPath &&
            Hr.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        s = Mr(o, { conflictCheck: 'none' });
      try {
        let a = n ?? {},
          u = a.__internal ?? {},
          c = u.debug === !0;
        c && U.enable('prisma:client');
        let p = Hr.default.resolve(e.dirname, e.relativePath);
        fc.default.existsSync(p) || (p = e.dirname),
          oe('dirname', e.dirname),
          oe('relativePath', e.relativePath),
          oe('cwd', p);
        let f = a.datasources || {},
          d = Object.entries(f)
            .filter(([g, w]) => w && w.url)
            .map(([g, { url: w }]) => ({ name: g, url: w })),
          m = Qu([], d, (g) => g.name),
          h = u.engine || {};
        if (
          (a.errorFormat
            ? (this._errorFormat = a.errorFormat)
            : process.env.NODE_ENV === 'production'
            ? (this._errorFormat = 'minimal')
            : process.env.NO_COLOR
            ? (this._errorFormat = 'colorless')
            : (this._errorFormat = 'colorless'),
          (this._baseDmmf = new Je(e.document)),
          this._dataProxy)
        ) {
          let g = e.document;
          this._dmmf = new Le(g);
        }
        if (
          ((this._engineConfig = {
            cwd: p,
            dirname: e.dirname,
            enableDebugLogs: c,
            allowTriggerPanic: h.allowTriggerPanic,
            datamodelPath: Hr.default.join(
              e.dirname,
              e.filename ?? 'schema.prisma',
            ),
            prismaPath: h.binaryPath ?? void 0,
            engineEndpoint: h.endpoint,
            datasources: m,
            generator: e.generator,
            showColors: this._errorFormat === 'pretty',
            logLevel: a.log && Vu(a.log),
            logQueries:
              a.log &&
              Boolean(
                typeof a.log == 'string'
                  ? a.log === 'query'
                  : a.log.find((g) =>
                      typeof g == 'string'
                        ? g === 'query'
                        : g.level === 'query',
                    ),
              ),
            env: s?.parsed ?? e.injectableEdgeEnv?.parsed ?? {},
            flags: [],
            clientVersion: e.clientVersion,
            previewFeatures: this._previewFeatures,
            activeProvider: e.activeProvider,
            inlineSchema: e.inlineSchema,
            inlineDatasources: e.inlineDatasources,
            inlineSchemaHash: e.inlineSchemaHash,
            tracingConfig: this._tracingConfig,
            logEmitter: i,
          }),
          oe('clientVersion', e.clientVersion),
          oe(
            'clientEngineType',
            this._dataProxy ? 'dataproxy' : this._clientEngineType,
          ),
          this._dataProxy && oe('using Data Proxy with Node.js runtime'),
          (this._engine = this.getEngine()),
          this._getActiveProvider(),
          (this._fetcher = new Kr(this, i)),
          a.log)
        )
          for (let g of a.log) {
            let w =
              typeof g == 'string' ? g : g.emit === 'stdout' ? g.level : null;
            w &&
              this.$on(w, (y) => {
                Fr.log(`${Fr.tags[w] ?? ''}`, y.message || y.query);
              });
          }
        this._metrics = new lt(this._engine);
      } catch (a) {
        throw ((a.clientVersion = this._clientVersion), a);
      }
      return ai(this);
    }
    get [Symbol.toStringTag]() {
      return 'PrismaClient';
    }
    getEngine() {
      if ((this._dataProxy, this._clientEngineType === 'library'))
        return new Gt(this._engineConfig);
      throw (
        (this._clientEngineType,
        'binary',
        new ie('Invalid client engine type, please use `library` or `binary`'))
      );
    }
    $use(n) {
      this._middlewares.use(n);
    }
    $on(n, i) {
      n === 'beforeExit'
        ? this._engine.on('beforeExit', i)
        : this._engine.on(n, (o) => {
            let s = o.fields;
            return i(
              n === 'query'
                ? {
                    timestamp: o.timestamp,
                    query: s?.query ?? o.query,
                    params: s?.params ?? o.params,
                    duration: s?.duration_ms ?? o.duration,
                    target: o.target,
                  }
                : {
                    timestamp: o.timestamp,
                    message: s?.message ?? o.message,
                    target: o.target,
                  },
            );
          });
    }
    $connect() {
      try {
        return this._engine.start();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      }
    }
    async _runDisconnect() {
      await this._engine.stop(),
        delete this._connectionPromise,
        (this._engine = this.getEngine()),
        delete this._disconnectionPromise,
        delete this._getConfigPromise;
    }
    async $disconnect() {
      try {
        await this._engine.stop();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      } finally {
        Zs(), this._dataProxy || (this._dmmf = void 0);
      }
    }
    async _getActiveProvider() {
      try {
        let n = await this._engine.getConfig();
        this._activeProvider = n.datasources[0].activeProvider;
      } catch {}
    }
    $executeRawInternal(n, i, ...o) {
      let s = '',
        a;
      if (typeof i == 'string')
        (s = i),
          (a = { values: Oe(o || []), __prismaRawParameters__: !0 }),
          $o(s, o, 'prisma.$executeRawUnsafe(<SQL>, [...values])');
      else if (lc(i))
        switch (this._activeProvider) {
          case 'sqlite':
          case 'mysql': {
            let c = new Y(i, o);
            (s = c.sql),
              (a = { values: Oe(c.values), __prismaRawParameters__: !0 });
            break;
          }
          case 'cockroachdb':
          case 'postgresql': {
            let c = new Y(i, o);
            (s = c.text),
              $o(s, c.values, 'prisma.$executeRaw`<SQL>`'),
              (a = { values: Oe(c.values), __prismaRawParameters__: !0 });
            break;
          }
          case 'sqlserver': {
            (s = Qr(i)), (a = { values: Oe(o), __prismaRawParameters__: !0 });
            break;
          }
          default:
            throw new Error(
              `The ${this._activeProvider} provider does not support $executeRaw`,
            );
        }
      else {
        switch (this._activeProvider) {
          case 'sqlite':
          case 'mysql':
            s = i.sql;
            break;
          case 'cockroachdb':
          case 'postgresql':
            (s = i.text), $o(s, i.values, 'prisma.$executeRaw(sql`<SQL>`)');
            break;
          case 'sqlserver':
            s = Qr(i.strings);
            break;
          default:
            throw new Error(
              `The ${this._activeProvider} provider does not support $executeRaw`,
            );
        }
        a = { values: Oe(i.values), __prismaRawParameters__: !0 };
      }
      a?.values
        ? oe(`prisma.$executeRaw(${s}, ${a.values})`)
        : oe(`prisma.$executeRaw(${s})`);
      let u = { query: s, parameters: a };
      return (
        oe('Prisma Client call:'),
        this._request({
          args: u,
          clientMethod: '$executeRaw',
          dataPath: [],
          action: 'executeRaw',
          callsite: at(this._errorFormat),
          transaction: n,
        })
      );
    }
    $executeRaw(n, ...i) {
      return Ie((o) => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$executeRawInternal(o, n, ...i);
        throw new ie(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
        );
      });
    }
    $executeRawUnsafe(n, ...i) {
      return Ie((o) => this.$executeRawInternal(o, n, ...i));
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== 'mongodb')
        throw new ie(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
        );
      return Ie((i) =>
        this._request({
          args: { command: n },
          clientMethod: '$runCommandRaw',
          dataPath: [],
          action: 'runCommandRaw',
          callsite: at(this._errorFormat),
          transaction: i,
        }),
      );
    }
    async $queryRawInternal(n, i, ...o) {
      let s = '',
        a;
      if (typeof i == 'string')
        (s = i), (a = { values: Oe(o || []), __prismaRawParameters__: !0 });
      else if (lc(i))
        switch (this._activeProvider) {
          case 'sqlite':
          case 'mysql': {
            let c = new Y(i, o);
            (s = c.sql),
              (a = { values: Oe(c.values), __prismaRawParameters__: !0 });
            break;
          }
          case 'cockroachdb':
          case 'postgresql': {
            let c = new Y(i, o);
            (s = c.text),
              (a = { values: Oe(c.values), __prismaRawParameters__: !0 });
            break;
          }
          case 'sqlserver': {
            let c = new Y(i, o);
            (s = Qr(c.strings)),
              (a = { values: Oe(c.values), __prismaRawParameters__: !0 });
            break;
          }
          default:
            throw new Error(
              `The ${this._activeProvider} provider does not support $queryRaw`,
            );
        }
      else {
        switch (this._activeProvider) {
          case 'sqlite':
          case 'mysql':
            s = i.sql;
            break;
          case 'cockroachdb':
          case 'postgresql':
            s = i.text;
            break;
          case 'sqlserver':
            s = Qr(i.strings);
            break;
          default:
            throw new Error(
              `The ${this._activeProvider} provider does not support $queryRaw`,
            );
        }
        a = { values: Oe(i.values), __prismaRawParameters__: !0 };
      }
      a?.values
        ? oe(`prisma.queryRaw(${s}, ${a.values})`)
        : oe(`prisma.queryRaw(${s})`);
      let u = { query: s, parameters: a };
      return (
        oe('Prisma Client call:'),
        this._request({
          args: u,
          clientMethod: '$queryRaw',
          dataPath: [],
          action: 'queryRaw',
          callsite: at(this._errorFormat),
          transaction: n,
        }).then(zu)
      );
    }
    $queryRaw(n, ...i) {
      return Ie((o) => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$queryRawInternal(o, n, ...i);
        throw new ie(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
        );
      });
    }
    $queryRawUnsafe(n, ...i) {
      return Ie((o) => this.$queryRawInternal(o, n, ...i));
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = vg.nextId(),
        s = Gu(n.length),
        a = n.map((u, c) => {
          if (u?.[Symbol.toStringTag] !== 'PrismaPromise')
            throw new Error(
              'All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.',
            );
          let p = i?.isolationLevel,
            f = { kind: 'batch', id: o, index: c, isolationLevel: p, lock: s };
          return u.requestTransaction?.(f) ?? u;
        });
      return ac(a);
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: je({ tracingConfig: this._tracingConfig }) },
        s = await this._engine.transaction('start', o, i),
        a;
      try {
        let u = { kind: 'itx', ...s };
        (a = await n(jo(this, u))),
          await this._engine.transaction('commit', o, s);
      } catch (u) {
        throw (
          (await this._engine.transaction('rollback', o, s).catch(() => {}), u)
        );
      }
      return a;
    }
    $transaction(n, i) {
      let o;
      typeof n == 'function'
        ? (o = l(
            () => this._transactionWithCallback({ callback: n, options: i }),
            'callback',
          ))
        : (o = l(
            () => this._transactionWithArray({ promises: n, options: i }),
            'callback',
          ));
      let s = {
        name: 'transaction',
        enabled: this._tracingConfig.enabled,
        attributes: { method: '$transaction' },
      };
      return Be(s, o);
    }
    async _request(n) {
      n.otelParentCtx = An.active();
      let i = {
          args: n.args,
          dataPath: n.dataPath,
          runInTransaction: Boolean(n.transaction),
          action: n.action,
          model: n.model,
        },
        o = {
          middleware: {
            name: 'middleware',
            enabled: this._tracingConfig.middleware,
            attributes: { method: '$use' },
            active: !1,
          },
          operation: {
            name: 'operation',
            enabled: this._tracingConfig.enabled,
            attributes: {
              method: i.action,
              model: i.model,
              name: `${i.model}.${i.action}`,
            },
          },
        },
        s = -1,
        a = l((u) => {
          let c = this._middlewares.get(++s);
          if (c) return Be(o.middleware, (m) => c(u, (h) => (m?.end(), a(h))));
          let { runInTransaction: p, ...f } = u,
            d = { ...n, ...f };
          return p || (d.transaction = void 0), qu(this, d);
        }, 'consumer');
      return await Be(o.operation, () =>
        new cc.AsyncResource('prisma-client-request').runInAsyncScope(() =>
          a(i),
        ),
      );
    }
    async _executeRequest({
      args: n,
      clientMethod: i,
      dataPath: o,
      callsite: s,
      action: a,
      model: u,
      argsMapper: c,
      transaction: p,
      unpacker: f,
      otelParentCtx: d,
      customDataProxyFetch: m,
    }) {
      try {
        let h = await this._getProtocolEncoder({
          clientMethod: i,
          callsite: s,
        });
        n = c ? c(n) : n;
        let g = { name: 'serialize', enabled: this._tracingConfig.enabled },
          w;
        u && ((w = Fo(a, u, n, this._rejectOnNotFound)), _g(w, u, a));
        let y = await Be(g, () =>
          h.createMessage({
            modelName: u,
            action: a,
            args: n,
            clientMethod: i,
            callsite: s,
            extensions: this._extensions,
          }),
        );
        return (
          U.enabled('prisma:client') &&
            (oe('Prisma Client call:'),
            oe(
              `prisma.${i}(${Jn({
                ast: n,
                keyPaths: [],
                valuePaths: [],
                missingItems: [],
              })})`,
            ),
            oe('Generated request:'),
            oe(
              y.toDebugString() +
                `
`,
            )),
          p?.kind === 'batch' && (await p.lock),
          this._fetcher.request({
            protocolMessage: y,
            modelName: u,
            clientMethod: i,
            dataPath: o,
            rejectOnNotFound: w,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: p,
            unpacker: f,
            otelParentCtx: d,
            otelChildCtx: An.active(),
            customDataProxyFetch: m,
          })
        );
      } catch (h) {
        throw ((h.clientVersion = this._clientVersion), h);
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag('metrics'))
        throw new ie(
          '`metrics` preview feature must be enabled in order to access metrics API',
        );
      return this._metrics;
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n);
    }
  }
  return l(t, 'PrismaClient'), t;
}
l(dc, 'getPrismaClient');
var uc = ['$connect', '$disconnect', '$on', '$transaction', '$use', '$extends'];
function jo(e, t) {
  return typeof e != 'object'
    ? e
    : new Proxy(e, {
        get: (r, n) => {
          if (!uc.includes(n))
            return n === xg
              ? t?.id
              : typeof r[n] == 'function'
              ? (...i) =>
                  n === 'then'
                    ? r[n](i[0], i[1], t)
                    : n === 'catch' || n === 'finally'
                    ? r[n](i[0], t)
                    : jo(r[n](...i), t)
              : jo(r[n], t);
        },
        has(r, n) {
          return uc.includes(n) ? !1 : Reflect.has(r, n);
        },
      });
}
l(jo, 'transactionProxy');
var Tg = { findUnique: 'findUniqueOrThrow', findFirst: 'findFirstOrThrow' };
function _g(e, t, r) {
  if (e) {
    let n = Tg[r],
      i = t ? `prisma.${we(t)}.${n}` : `prisma.${n}`,
      o = `rejectOnNotFound.${t ?? ''}.${r}`;
    bo(
      o,
      `\`rejectOnNotFound\` option is deprecated and will be removed in Prisma 5. Please use \`${i}\` method instead`,
    );
  }
}
l(_g, 'warnAboutRejectOnNotFound');
var Ag = new Set([
  'toJSON',
  'asymmetricMatch',
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
]);
function mc(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r];
      if (!Ag.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
    },
  });
}
l(mc, 'makeStrictEnum');
var ht = M(require('fs')),
  hc = M(require('path')),
  ci = require('util');
var sP = (0, ci.promisify)(ht.default.readdir),
  aP = (0, ci.promisify)(ht.default.realpath),
  lP = (0, ci.promisify)(ht.default.stat),
  Pg = ht.default.readdirSync,
  Sg = ht.default.realpathSync,
  Cg = ht.default.statSync;
function gc(e) {
  return e.isFile()
    ? 'f'
    : e.isDirectory()
    ? 'd'
    : e.isSymbolicLink()
    ? 'l'
    : void 0;
}
l(gc, 'direntToType');
function Og(e, t) {
  for (let r of t)
    if (typeof r == 'string') {
      if (e.includes(r)) return !0;
    } else if (r.exec(e)) return !0;
  return !1;
}
l(Og, 'isMatched');
function Bo(
  e,
  t,
  r = ['f', 'd', 'l'],
  n = [],
  i = 1 / 0,
  o = () => !0,
  s = [],
  a = {},
) {
  try {
    let u = Sg(e);
    if (a[u] || i - s.length <= 0 || gc(Cg(u)) !== 'd') return s;
    let c = Pg(e, { withFileTypes: !0 });
    a[u] = !0;
    for (let p of c) {
      let f = p.name,
        d = gc(p),
        m = hc.default.join(e, p.name);
      if (d && r.includes(d) && Og(m, t)) {
        let h = o(e, f, d);
        typeof h == 'string' ? s.push(h) : h === !0 && s.push(m);
      }
      n.includes(d) && Bo(m, t, r, n, i, o, s, a);
    }
  } catch {}
  return s;
}
l(Bo, 'findSync');
function yc(e) {
  Mr(e, { conflictCheck: 'warn' });
}
l(yc, 'warnEnvConflicts');
var Mg = bc.decompressFromBase64;
0 &&
  (module.exports = {
    DMMF,
    DMMFClass,
    Debug,
    Decimal,
    Engine,
    Extensions,
    MetricsClient,
    NotFoundError,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Sql,
    Types,
    decompressFromBase64,
    empty,
    findSync,
    getPrismaClient,
    join,
    makeDocument,
    makeStrictEnum,
    objectEnumValues,
    raw,
    sqltag,
    transformDocument,
    unpack,
    warnEnvConflicts,
  });
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
//# sourceMappingURL=library.js.map

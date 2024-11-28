/* Partytown 0.10.2 - MIT builder.io */
const t = { preserveBehavior: !1 },
  e = (e) => {
    if ('string' == typeof e) return [e, t];
    const [n, r = t] = e;
    return [n, { ...t, ...r }];
  },
  n = Object.freeze(
    ((t) => {
      const e = new Set();
      let n = [];
      do {
        Object.getOwnPropertyNames(n).forEach((t) => {
          'function' == typeof n[t] && e.add(t);
        });
      } while ((n = Object.getPrototypeOf(n)) !== Object.prototype);
      return Array.from(e);
    })()
  );
!(function (t, r, o, i, a, s, c, d, l, p, u = t, f) {
  function h() {
    f ||
      ((f = 1),
      '/' == (c = (s.lib || '/~partytown/') + (s.debug ? 'debug/' : ''))[0] &&
        ((l = r.querySelectorAll('script[type="text/partytown"]')),
        i != t
          ? i.dispatchEvent(new CustomEvent('pt1', { detail: t }))
          : ((d = setTimeout(v, 1e4)),
            r.addEventListener('pt0', w),
            a
              ? y(1)
              : o.serviceWorker
                ? o.serviceWorker
                    .register(c + (s.swPath || 'partytown-sw.js'), { scope: c })
                    .then(function (t) {
                      t.active
                        ? y()
                        : t.installing &&
                          t.installing.addEventListener(
                            'statechange',
                            function (t) {
                              'activated' == t.target.state && y();
                            }
                          );
                    }, console.error)
                : v())));
  }
  function y(e) {
    (p = r.createElement(e ? 'script' : 'iframe')),
      (t._pttab = Date.now()),
      e ||
        ((p.style.display = 'block'),
        (p.style.width = '0'),
        (p.style.height = '0'),
        (p.style.border = '0'),
        (p.style.visibility = 'hidden'),
        p.setAttribute('aria-hidden', !0)),
      (p.src =
        c +
        'partytown-' +
        (e ? 'atomics.js?v=0.10.2' : 'sandbox-sw.html?' + t._pttab)),
      r.querySelector(s.sandboxParent || 'body').appendChild(p);
  }
  function v(n, o) {
    for (
      w(),
        i == t &&
          (s.forward || []).map(function (n) {
            const [r] = e(n);
            delete t[r.split('.')[0]];
          }),
        n = 0;
      n < l.length;
      n++
    )
      ((o = r.createElement('script')).innerHTML = l[n].innerHTML),
        (o.nonce = s.nonce),
        r.head.appendChild(o);
    p && p.parentNode.removeChild(p);
  }
  function w() {
    clearTimeout(d);
  }
  (s = t.partytown || {}),
    i == t &&
      (s.forward || []).map(function (r) {
        const [o, { preserveBehavior: i }] = e(r);
        (u = t),
          o.split('.').map(function (e, r, o) {
            var a;
            u = u[o[r]] =
              r + 1 < o.length
                ? u[o[r]] || ((a = o[r + 1]), n.includes(a) ? [] : {})
                : (() => {
                    let e = null;
                    if (i) {
                      const { methodOrProperty: n, thisObject: r } = ((
                        t,
                        e
                      ) => {
                        let n = t;
                        for (let t = 0; t < e.length - 1; t += 1) n = n[e[t]];
                        return {
                          thisObject: n,
                          methodOrProperty:
                            e.length > 0 ? n[e[e.length - 1]] : void 0,
                        };
                      })(t, o);
                      'function' == typeof n &&
                        (e = (...t) => n.apply(r, ...t));
                    }
                    return function () {
                      let n;
                      return (
                        e && (n = e(arguments)),
                        (t._ptf = t._ptf || []).push(o, arguments),
                        n
                      );
                    };
                  })();
          });
      }),
    'complete' == r.readyState
      ? h()
      : (t.addEventListener('DOMContentLoaded', h),
        t.addEventListener('load', h));
})(window, document, navigator, top, window.crossOriginIsolated);

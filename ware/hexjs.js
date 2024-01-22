/*/ HEXJS (x6)/*/
/*/ 0.5.0 /*/

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")  module.exports = factory();
  else if (typeof define === "function" && define.amd) define("x6", [], factory);
  else if (typeof exports === "object") exports["x6"] = factory();
  else root["x6"] = factory();
})( typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this, () => {
  return (() => {
    "use strict";

    /*/ <-- Modules Function Registry /*/
    const ms = {}; /*/ ModuleS /*/
    ms.legacy = (v) => {
      const { m, es, req } = v; /*/ Module, ExpotrS, REQuire /*/

      req.d(es, {
        cxyo: /*/ Mouse & Touch client x, y /*/ () => im.cxyo, 
        geto: /*/ Get server file xml, json, svg /*/ () => im.geto,
        // Play: (/*/ Imported Module /*/) => im.Play,
        // Page: (/*/ Imported Module /*/) => im.Page,
        // Part: (/*/ Imported Module /*/) => im.Part,
        // Pack: (/*/ Imported Module /*/) => im.Pack,
        // Plot: (/*/ Imported Module /*/) => im.Plot,
        // Plan: (/*/ Imported Module /*/) => im.Plan,
      });
      const im /*/ Imported Module /*/ = req("commom"); 

      const globalObject = typeof req.g !== "undefined" ? req.g : typeof window !== "undefined" ? window : undefined;
      if (typeof globalObject !== "undefined") {
        globalObject.x6 = globalObject.x6 || {};
        const HEXGLOBAL = globalObject.x6;
        for (let key in im) { if (!HEXGLOBAL[key]) HEXGLOBAL[key] = im[key]; }
      }
    };
  
    /*/ <-- Modules Function Structure /*/
    ms.commom = (v) => {
      const { m, es, req } = v; /*/ Module, ExpotrS, REQuire /*/

      req.r(es);
      req.d(es, {
        cxyo: () => cxyo,
        geto: () => geto,
        // Page: () => Page,
        // Part: () => Part,
        // Pack: () => Pack,
        // Plot: () => Plot,
        // Plan: () => Plan,
      });

      /*/ <-- Mouse & Touch client x, y /*/
      const cxyo = function () {
        this.wh = { 
          w: window.innerWidth || document.body.clientWidth, 
          h: window.innerHeight || document.body.clientHeight, 
          r: window.devicePixelRatio || 1 
        }; 
        this.mob = navigator.userAgentData.mobile;
        this.type = { start: '', move: '', end: '' };
        this.xya = [ /*/{ x: 0, y: 0 } /*/ ];
        this.popu = () => this.xya.length > 0 ? this.xya.pop() : null;
        
        this.eventu = v => {
          const { b, n } = v; /*/ b: boolean, n: number /*/

          const addue = e => addu({ e: e });
          const addu = v => {
            const { e } = v;
            if(this.mob && !e.touches.length) return;

            if(this.xya.length > n && n) this.popu();
            this.xya.unshift({ x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY });
          }

          if(b){
            this.type.start = this.mob ? 'touchstart' : 'mousedown';
            this.type.move = this.mob ? 'touchmove' :'mousemove';
            this.type.end = this.mob ? 'touchend' : 'mouseup';

            document.addEventListener(this.type.start, addue);
            document.addEventListener(this.type.move, addue);
            document.addEventListener(this.type.end, addue);

          } else {
            document.removeEventListener(this.type.start, addue);
            document.removeEventListener(this.type.move, addue);
            document.removeEventListener(this.type.end, addue);
          }
        }
      };
      /*/ --> Mouse & Touch client x, y /*/

      /*/ <-- Get server file /*/
      const geto = function () {
        const mineu = {
          'xml': v => {
            const { d } = v; /*/ s: XMLDocument /*/

            [].forEach.call(d.querySelectorAll('svg'), e => {
              console.log(e);
            });
          },
          'json': v => {},
          'svg+xml': v => {},
          'html': v => {},
          'plain': v => {}
        }

        const mimeu = {
          'xml': 'application/xml',
          'json': 'application/json',
          'svg+xml': 'image/svg+xml',
          'html': 'text/html',
          'plain': 'text/plain' 
        }

        this.file = async(v) => {
          const { u, n, m } = v; /*/ u: string, n: string, m: string /*/

          v.m = '';
          v.r = await fetch ([u, n].join('/') /*/ url /*/);
          v.d = await v.r.text().then(e => {
            return new DOMParser().parseFromString(e, mimeu[m]);
          });
         
          mineu['svg+xml']({ d: v.d });
        }
      };
      /*/ --> get server file /*/
      

    };
    /*/ --> Modules Function Structure /*/

    /*/ <-- Modules Function Define /*/
    let mc = {}; /*/ Modules Cache /*/
    const req = (id) => {
      /*/ REQuire /*/
      // let cachedModule = mc[id];
      // if (cachedModule !== undefined) return cachedModule.exports;

      let m = (mc[id] = { es: {} }); /*/ Module, ExpotrS /*/
      ms[id]({ m: m, es: m.es, req: req });

      return m.es;
    };

    (() => {
      req.d = (es, def) => {
        for (var key in def) {
          if (req.o(def, key) && !req.o(es, key)) {
            Object.defineProperty(es, key, {
              enumerable: true,
              get: def[key],
            });
          }
        }
      };
    })();

    (() => {
      req.g = (function () {
        if (typeof globalThis === "object") return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if (typeof window === "object") return window;
        }
      })();
    })();

    (() => {
      req.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();

    (() => {
      req.r = (es) => {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(es, Symbol.toStringTag, {
            value: "Module",
          });
        }
        // Object.defineProperty(es, '_esModule', { value: true });
      };
    })();

    let es = {}; /*/ ExportS /*/
    (() => {
      req.r(es);
      req.d(es, {
        core: (/*/ Imported Module Legacy /*/) => iml,
        default: (/*/ Default Export /*/) => de,
      });

      const iml = req("legacy");
      const de = iml;
    })();
   
    es = es["default"];
    /*/ --> Modules Function Define /*/

    return es;
    })();}
);

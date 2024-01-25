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
        cxyy: /*/ Mouse & Touch client x, y /*/ () => im.cxyy, 
        gety: /*/ Get server file xml, json, svg /*/ () => im.gety,
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
        cxyy: () => cxyy,
        gety: () => gety,
        // Part: () => Part,
        // Pack: () => Pack,
        // Plot: () => Plot,
        // Plan: () => Plan,
      });

      /*/ <-- Utile /*/
      const crtelu = v => {
        const { e, i, c } = v; /*/ e: string, i: string, c: element /*/

        v.e = document.createElement(e /*/ e: Element Type /*/); 
        v.e.setAttribute('id', i /*/ i: Id /*/); 
        document.body.insertBefore(v.e, c /*/ c: Current Element /*/ || document.body.firstChild);
      }
      /*/ --> Utile /*/

      /*/ <-- Set Page /*/
      const pagey = function () {
        this.rc = { r: 0, c: 0, dr: 0, dc: 0 };
        this.sceneo = {};
        this.sceneu = v => {
          const { e, r, c } = v;

          this.rc.r = r;
          this.rc.c = c;
        };
        this.itemo = {};
        this.itemu = v => {
          // console.log(v);
        };
      };
      const pagei = new pagey();
      /*/ --> Set Page /*/

      /*/ <-- Mouse & Touch client x, y /*/
      const cxyy = function () {
        const mob = navigator.userAgentData.mobile;
        const type = { start: '', move: '', end: '' };
        type.start = mob ? 'touchstart' : 'mousedown';
        type.move = mob ? 'touchmove' :'mousemove';
        type.end = mob ? 'touchend' : 'mouseup';

        this.wh = { 
          w: window.innerWidth || document.body.clientWidth, 
          h: window.innerHeight || document.body.clientHeight, 
          r: window.devicePixelRatio || 1 
        };
        this.xya = [ /*/{ x: 0, y: 0 } /*/ ];
        this.eventu = v => {
          const { b, n } = v; /*/ b: boolean, n: number /*/

          const addue = e => addu({ e: e });
          const addu = v => {
            const { e } = v;
            
            if(this.xya.length > n && n /*/ n: Array Length /*/) this.xya.pop();
            if(mob) this.xya.unshift({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            else this.xya.unshift({ x: e.clientX , y: e.clientY });
          }

          if(b){ /*/ b: true - addEventListener /*/
            document.addEventListener(type.start, addue);
            document.addEventListener(type.move, addue);
            document.addEventListener(type.end, addue);
            
          } else { /*/ b: false - removeEventListener /*/
            document.removeEventListener(type.start, addue);
            document.removeEventListener(type.move, addue);
            document.removeEventListener(type.end, addue);
          }
        }
      };
      /*/ --> Mouse & Touch client x, y /*/

      /*/ <-- Get server file /*/
      const gety = function () {
        const mineo = {
          'xmlu': v => {
            const { d, i } = v; /*/ d: XMLDocument /*/

            crtelu({ e:'div', i: i, c: document.body.firstChild });
            [].forEach.call(d.querySelectorAll('row'), (e, r) => {
              [].forEach.call(e.querySelectorAll('column'), (e, c) => {
                [].forEach.call(e.querySelectorAll('scene'), e => pagei.sceneu({ e: e, r: r, c: c }));
                [].forEach.call(e.querySelectorAll('item'), e => pagei.itemu({ e: e, r: r, c: c }));
              });
            });
          },

          'jsonu': v => {},

          'svgu': v => {
            const { d, n } = v; /*/ d: XMLDocument /*/

            [].forEach.call(d.querySelectorAll('svg'), e => {
              // console.log(e);
            });
          },

          'htmlu': v => {},

          'txtu': v => {}
        }

        const mimeo = {
          'xml': 'application/xml',
          'json': 'application/json',
          'svg': 'image/svg+xml',
          'html': 'text/html',
          'txt': 'text/plain' 
        }

        this.fileu = async v => {
          const { p, i, x } = v; /*/ p: string, i: string, x: string /*/

          v.f = await fetch ([p /*/ path /*/, i + '.' + x /*/ id & extension /*/].join('/') /*/ url /*/ , { cache: 'default' });
          v.d = await v.f.text().then(e => {
            return new DOMParser().parseFromString(e, mimeo[x]);
          });
         
          mineo[x + 'u']({ d: v.d, i: i });
        }
      };
      /*/ --> get server file /*/

      // /*/ <-- set page /*/
      // const pageo = function () {
      //   const scene = []
      // }
      // /*/ --> set page /*/

    };
    /*/ --> Modules Function Structure /*/

   

    /*/ <-- Modules Function Define /*/
    const mc = {}; /*/ Modules Cache /*/
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

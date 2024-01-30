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
        const { p, e, i, c } = v; /*/ p: element, e: string, i: string, c: element /*/

        v.e = document.createElement(e /*/ e: Element Type /*/); 
        if(i.length) v.e.setAttribute('class', i /*/ i: Id /*/); 
        p.insertBefore(v.e, c /*/ p: Parent Element, c: Current Element /*/);

        if(e ==='svg'){
          // console.log(document.body.clientWidth, document.body.clientHeight);
          if(pagei !== undefined) { 
            pagei.who.w = document.body.clientWidth; 
            pagei.who.h = document.body.clientHeight; 
          }
          v.e.setAttribute('viewBox', `0 0 ${document.body.clientWidth} ${document.body.clientHeight}`);
          v.e.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        return v.e;
      }

      const mimeo = {
        'xml': 'application/xml',
        'json': 'application/json',
        'svg': 'image/svg+xml',
        'html': 'text/html',
        'txt': 'text/plain' 
      }

      const getfileu = async v => {
        const { p, i, x } = v; /*/ p: string, i: string, x: string /*/

        v.f = await fetch ([p /*/ path /*/, i + '.' + x /*/ id & extension /*/].join('/') /*/ url /*/ , { cache: 'default' });
        v.d = await v.f.text().then(e => {
          return new DOMParser().parseFromString(e, mimeo[x]);
        });
       
        return v.d;
      }
      /*/ --> Utile /*/

      /*/ <-- Set Page /*/
      const pagey = function (v) {
        const {} = v;

        this.xmlo = {};
        this.who = { w: 0, h: 0 };
        this.rco = { r: 0, c: 0, dr: 0, dc: 0 };
        this.cells = {};

        this.sceneo = { row: [[],[]], column: [[],[],[]], b: 1 };
        this.itemo = { row: [[],[]], column: [[],[],[]], b: 1 };
        this.set = { scene: { row: [0, 0], column: [0, 0, 0] }, item: { row: [0, 0], column: [0, 0, 0] }};

        this.sceneu = async v => {
          const { e, po } = v;
          
          v.d = await getfileu({ p: e.getAttribute('p'), i: e.getAttribute('i'), x: e.getAttribute('x') });
          await this.sceneo[po.i][po.n].push(v.d.documentElement.innerHTML);
          await this.setu({ po: po });
        };
        
        this.itemu = async v => {
          const { e, po } = v;
          console.log(po);
          v.d = await getfileu({ p: e.getAttribute('p'), i: e.getAttribute('i'), x: e.getAttribute('x') });
          await this.itemo[po.i][po.n].push(v.d.documentElement.innerHTML);
          await this.setu({ po: po });
        };

        this.setu = v => {
          const { po } = v;

          if(this.sceneo[po.i][po.n].length === this.set.scene[po.i][po.n] && this.itemo[po.i][po.n].length === this.set.item[po.i][po.n]){
            this.set.scene[po.i][po.n] = 0;
            this.set.item[po.i][po.n] = 0;
          } else {
            return;
          }

          v.a = ['<svg>'];
          [].forEach.call(this.sceneo[po.i][po.n], e => v.a.push(e));
          [].forEach.call(this.itemo[po.i][po.n], e => v.a.push(e));
          v.a.push('</svg>');

          v.p = document.querySelector('div');
          v.e = new DOMParser().parseFromString(v.a.join(''), 'text/html').body.childNodes[0];
          v.p.insertAdjacentHTML('beforeend', v.e.outerHTML);
        };

        this.getu = v => {
          const { dr, dc, i  } = v; /*/ dr: number, dc: number, i: string /*/

          v.s = this.xmlo[i].querySelector('cells'); /*/ XMLDocument id /*/
          this.cells[i] = { 
            row: { fix: v.s.getAttribute('row') }, 
            column: { fix: v.s.getAttribute('column') }
          };

          this.rco.dr /*/ Row num /*/ = this.cells[i].row.fix === 'first' ? this.rco.dr = 0 : this.rco.dr + dr;
          this.rco.dc /*/ Column num /*/ = this.cells[i].column.fix === 'first' ? this.rco.dc = 0 : this.rco.dc + dc;

          v.rea = this.xmlo[i].querySelectorAll('row');
          [].forEach.call([[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]], (e, i) => { /*/ top, bottom, left, right, center /*/
            this.rco.dr = this.rco.dr + e[0] < 0 ? v.rea.length - 1 : (this.rco.dr + e[0])%v.rea.length;
            v.cea = v.rea[this.rco.dr].querySelectorAll('column');
            this.rco.dc = this.rco.dc + e[1] < 0 ? v.cea.length - 1 : (this.rco.dc + e[1])%v.cea.length;
            v.e = v.cea[this.rco.dc];
            
            v.scenea = v.e.querySelectorAll('scene');
            v.itema = v.e.querySelectorAll('item');

            if(Math.round((i + 1)/2) - 1){
              this.set.scene.column[i - 2] = v.scenea.length;
              this.set.item.column[i - 2] = v.itema.length;
              [].forEach.call(v.scenea, e => this.sceneu({ e: e, po: { i:'column', n: i - 2 }}));
              [].forEach.call(v.itema, e => this.itemu({ e: e, po: { i:'column', n: i - 2 }}));

            } else {
              this.set.scene.row[i] = v.scenea.length;
              this.set.item.row[i] = v.itema.length;
              [].forEach.call(v.scenea, e => this.sceneu({ e: e, po: { i:'row', n: i }}));
              [].forEach.call(v.itema, e => this.itemu({ e: e, po: { i:'row', n: i }}));
            }
          });
        }
      };
      const pagei = new pagey({});
      /*/ --> Set Page /*/

      /*/ <-- Mouse & Touch client x, y /*/
      const cxyy = function (v) {
        const {} = v;

        v.touch = false;
        if ("maxTouchPoints" in navigator) {
          v.touch = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
          v.touch = navigator.msMaxTouchPoints > 0;
        } else {
          v.mq = matchMedia?.("(pointer:coarse)");
          if (v.mq?.media === "(pointer:coarse)") {
            v.touch = !!v.mq.matches;
          } else if ("orientation" in window) {
            v.touch = true;
          } else {
            v.ua = navigator.userAgent;
            v.touch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(v.ua) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(v.ua);
          }
        }

        const mob = v.touch;
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

          const addue = e => { e.preventDefault(); addu({ e: e }); };
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
      const gety = function (v) {
        const {} = v;

        const mineo = {
          'xmlu': v => {
            const { d, i } = v; /*/ d: XMLDocument /*/

            v.e = crtelu({ p: document.body, e:'div', i: i, c: document.body.firstChild });
            // [].forEach.call(['row column', 'column', 'column', 'row', 'row'], e => {
            //   crtelu({ p: v.e, e:'svg', i: e, c: v.e.firstChild });
            // });

            pagei.xmlo[i] = d;
            pagei.getu({ dr: 0, dc: 0, i: i });
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

        this.fileu = async v => {
          const { p, i, x } = v; /*/ p: string, i: string, x: string /*/

          v.d = await getfileu({ p: p, i: i, x: x });
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

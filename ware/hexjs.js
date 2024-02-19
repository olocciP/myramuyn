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
        gety: /*/ Get /*/ () => im.gety,
        sety: /*/ Set /*/ () => im.sety,
        helpy: /*/ Helper /*/ () => im.helpy,
        // Play: (/*/ Imported Module /*/) => im.Play,
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
        sety: () => sety,
        helpy: () => helpy,
        // Part: () => Part,
        // Pack: () => Pack,
        // Plot: () => Plot,
        // Plan: () => Plan,
      });

      /*/ <-- Utility /*/
      const roundu = v => Math.round(v.n*100)/100;
      
      const dxyu = v => { /*/ Distance and Angle between two points /*/
        const { sxy, exy } = v;

        v.dy = exy.y - sxy.y;
        v.dx = exy.x - sxy.x;
        v.l = Math.sqrt(v.dx*v.dx + v.dy*v.dy);
        v.a = Math.atan2(v.dy, v.dx)*180/Math.PI; /*/ angle in degree, 9 o'clock is 0 /*/
        //if (v.da < 0) v.da += 360; 

        return { l: roundu({ n:v.l }), a: roundu({ n:v.a }) } ;
      }

      const cardinalu = v => { /*/ Cardinal Directions 4 or 8 /*/
        const { a, d } = v;

        v.a = Math.floor(((a < 0 ? a + 360 : a)/(360/d) + 0.5));
        v.c = d > 4  ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] : ['W', 'N', 'E', 'S'];

        return { a: v.c[v.a%d] };
      };

      const crtelu = v => { /*/ Create Element /*/
        const { p, e, i, c } = v; /*/ p: element, e: string, i: string, c: element /*/

        v.e = document.createElement(e /*/ e: Element Type /*/); 
        if(i.length) v.e.setAttribute('class', i /*/ i: Id /*/); 
        p.insertBefore(v.e, c /*/ p: Parent Element, c: Current Element /*/);

        if(e ==='svg'){
          v.e.setAttribute('viewBox', `0 0 ${pagei.who.w} ${pagei.who.h}`);
          v.e.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }

        return v.e;
      }

      const mimeo = { /*/ Mime Type /*/
        'xml': 'application/xml',
        'json': 'application/json',
        'svg': 'image/svg+xml',
        'html': 'text/html',
        'txt': 'text/plain' 
      }

      const getfileu = async v => { /*/ Get network file /*/
        const { p, i, x } = v; /*/ p: string, i: string, x: string /*/

        v.f = await fetch ([p /*/ path /*/, i + '.' + x /*/ id & extension /*/].join('/') /*/ url /*/ , { cache: 'default' });
        v.d = await v.f.text().then(e => {
          return new DOMParser().parseFromString(e, mimeo[x]);
        });
       
        return v.d;
      }
      /*/ --> Utility /*/

      /*/ <-- Set Page /*/
      const pagey = function (v) {
        const {} = v;

        /*/ XML Object /*/
        this.xmlo = {}; 
        /*/ Page Objects /*/
        this.who = { w: 0, h: 0, r: 1/3 }; /*/ w: Width, h: Height, r: Ratio /*/
        this.cro = { r: 0, c: 0, dr: 0, dc: 0 }; /*/ c: Column, r: Row, dc: Derivative Column, dr: Delta Row /*/
        this.pa = {}; /*/ each page : Page Array /*/
        /*/ Element Objects /*/
        this.eo = {}; /*/ e: Element Object, i: class name /*/
        this.sceneo = { column: [[],[],[]], row: [[],[]], b: 1 };
        this.itemo = { column: [[],[],[]], row: [[],[]], b: 1 };
        this.seto = { scene: { column: [0, 0, 0], row: [0, 0] }, item: { column: [0, 0, 0], row: [0, 0] }}; /*/ scene, item length ??? /*/
        this.xya = [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]]; /*/ top, bottom, left, right, center /*/
        /*/ Transition Object /*/
        this.tro = { la: [], d: { x: 0, y: 0 }, r: 8, t: 0 }; /*/ la: Length per page, d: Direction, r: Ratio, t: transition length /*/

        this.sceneu = async v => {
          const { x, eo } = v;
          
          v.d = await getfileu({ p: x.getAttribute('p'), i: x.getAttribute('i'), x: x.getAttribute('x') }); /*/ path, index, extension /*/
          await this.sceneo[eo.i][eo.n].push(v.d.documentElement.innerHTML);
          await this.setu({ eo: eo });
        };
        
        this.itemu = async v => {
          const { x, eo } = v;

          v.d = await getfileu({ p: x.getAttribute('p'), i: x.getAttribute('i'), x: x.getAttribute('x') });
          await this.itemo[eo.i][eo.n].push(v.d.documentElement.innerHTML);
          await this.setu({ eo: eo });
        };

        this.btna = [];

        this.setu = v => {
          const { eo } = v; /*/ i: column or row, n: column or row Number, c: element Counter /*/

          if(this.sceneo[eo.i][eo.n].length === this.seto.scene[eo.i][eo.n] && this.itemo[eo.i][eo.n].length === this.seto.item[eo.i][eo.n]){
            this.seto.scene[eo.i][eo.n] = 0;
            this.seto.item[eo.i][eo.n] = 0;
          } else {
            return;
          }

          this.who.w = this.who.w !== document.body.clientWidth ? document.body.clientWidth : this.who.w;
          this.who.h = this.who.h !== document.body.clientHeight ? document.body.clientHeight : this.who.h;
          v.a = [`<svg transform="matrix(${this.who.r} 0 0 ${this.who.r} ${this.who.w*this.who.r*this.xya[eo.c][0]} ${this.who.h*this.who.r*this.xya[eo.c][1]})">`];
          this.tro.t = this.who.w > this.who.h ? this.who.w*0.05 : this.who.h*0.05;

          [].forEach.call(this.sceneo[eo.i][eo.n], e => v.a.push(e));
          [].forEach.call(this.itemo[eo.i][eo.n], e => v.a.push(e));
          v.a.push('</svg>');

          v.p = document.querySelector('div');
          v.e = new DOMParser().parseFromString(v.a.join(''), 'text/html').body.childNodes[0];
          v.p.insertAdjacentHTML('beforeend', v.e.outerHTML);
        };

        this.getu = v => {
          const { dc, dr, i } = v; /*/ dr: number, dc: number, i: string /*/

          v.s = this.xmlo[i].querySelector('pa'); /*/ i: xmldocument Id /*/
          this.pa[i] = { 
            column: { fix: v.s.getAttribute('column') },
            row: { fix: v.s.getAttribute('row') }
          };

          this.cro.dc /*/ Column num /*/ = this.pa[i].column.fix === 'first' ? 0 : this.cro.dc + dc;
          this.cro.dr /*/ Row num /*/ = this.pa[i].row.fix === 'first' ? 0 : this.cro.dr + dr;
          
          v.rea = this.xmlo[i].querySelectorAll('row');
          [].forEach.call(this.xya, (e, i) => {
            v.dr = this.cro.dr + e[0] < 0 ? v.rea.length - 1 : (this.cro.dr + e[0])%v.rea.length;
            v.cea = v.rea[v.dr].querySelectorAll('column');
            v.dc = this.cro.dc + e[1] < 0 ? v.cea.length - 1 : (this.cro.dc + e[1])%v.cea.length;
            v.e = v.cea[v.dc];

            if(i === this.xya.length - 1){
              this.cro.dc = v.dc;
              this.cro.dr = v.dr;
            }
            
            v.scenea = v.e.querySelectorAll('scene');
            v.itema = v.e.querySelectorAll('item');

            if(Math.round((i + 1)*0.5) - 1){ /*/ 0, 0, 1, 1, 2 /*/
              this.seto.scene.column[i - 2] = v.scenea.length;  /*/ 1, 2, 3 /*/
              this.seto.item.column[i - 2] = v.itema.length;
              [].forEach.call(v.scenea, e => this.sceneu({ x: e, eo: { i:'column', n: i - 2, c: i }})); /*/ Load each svg file on server /*/
              [].forEach.call(v.itema, e => this.itemu({ x: e, eo: { i:'column', n: i - 2, c: i  }}));

            } else {
              this.seto.scene.row[i] = v.scenea.length; /*/ 1, 2 /*/
              this.seto.item.row[i] = v.itema.length;
              [].forEach.call(v.scenea, e => this.sceneu({ x: e, eo: { i:'row', n: i, c: i }}));
              [].forEach.call(v.itema, e => this.itemu({ x: e, eo: { i:'row', n: i, c: i }}));
            }
          });
        }

        this.trans = v => {
          const { l, a, n } = v; /*/ l: number, a: number, n: number /*/
  
          v.n = !n ? parseInt(l/(this.tro.t)): n; /*/ t: move pages by touch(mouse) length /*/
          if(v.n && !this.tro.la.length) {
            v.c = cardinalu({ a: a, d: 4 }).a;

            for(let i = 0; i < v.n; i++){ 
              this.tro.la.push(this.who.w*this.who.r);
              this.tro.d.x = v.c === 'W' ? -1 : v.c === 'E' ? 1 : 0;
              this.tro.d.y = v.c === 'N' ? -1 : v.c === 'S' ? 1 : 0;
            }
          }
        }

        this.slideu = v => {
          const {} = v;

          [].forEach.call(pagei.eo.e.querySelectorAll('svg'), e => {
            // e.classListgetAttribute
            v.ma = e.getAttribute('transform').match(/[+-]?\d*\.?\d+/g);
            v.ma[4] = (parseFloat(v.ma[4]) + this.tro.r*this.tro.d.x).toString();

            
            e.setAttribute('transform', `matrix(${v.ma.join(' ')})`);
          });
          this.tro.la[0] -= this.tro.la[0] > this.tro.r ? this.tro.r : this.tro.la[0];
          if(!this.tro.la[0]) { 
            this.tro.la.shift();
            this.getu({ dc: this.tro.d.x, dr: 0, i: this.eo.i });
          } 
        }

        this.frameu = e => {
          if(this.tro.la.length) this.slideu({});

          window.requestAnimationFrame(this.frameu);
        }
        window.requestAnimationFrame(this.frameu);
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

        this.mob = v.touch;
        this.type = { start: '', move: '', end: '' };
        this.type.start = this.mob ? 'touchstart' : 'mousedown';
        this.type.move = this.mob ? 'touchmove' :'mousemove';
        this.type.end = this.mob ? 'touchend' : 'mouseup';

        this.wh = { 
          w: window.innerWidth || document.body.clientWidth, 
          h: window.innerHeight || document.body.clientHeight, 
          r: window.devicePixelRatio || 1 
        };
        this.xya = [ /*/{ x: 0, y: 0 } /*/ ];
        this.eventu = v => {
          const { b, n, f } = v; /*/ b: boolean, n: number, f: function /*/

          const semue = e => { e.preventDefault(); semu({ e: e }); };
          const semu = v => {
            const { e } = v;

            if(e.type === this.type.end) {
              this.xya = [];
              v.type = 'e';
              f({ xya: this.xya, t: v.type });
            } else {
              v.type = e.type === this.type.start ? 's' : 'm';
              if(this.xya.length && v.type === 'm' || v.type === 's'){
                if(this.xya.length > n && n /*/ n: Array Length /*/) this.xya.pop();
                this.xya.unshift({ x: this.mob ? e.touches[0].clientX : e.clientX, y: this.mob ? e.touches[0].clientY : e.clientY });
                f({ xya: this.xya, t: v.type });
              }
            }
          }

          if(b){ /*/ b: true - addEventListener /*/
            document.addEventListener(this.type.start, semue, { passive: false });
            document.addEventListener(this.type.end, semue, { passive: false });
            document.addEventListener(this.type.move, semue, { passive: false });
            
          } else { /*/ b: false - removeEventListener /*/
            document.removeEventListener(this.type.start, semue, { passive: false });
            document.removeEventListener(this.type.end, semue, { passive: false });
            document.removeEventListener(this.type.move, semue, { passive: false });
          }
        };
      };
      /*/ --> Mouse & Touch client x, y /*/

      /*/ <-- Get /*/
      const gety = function (v) {
        const {} = v;

        const mineo = {
          'xmlu': v => {
            const { d, i } = v; /*/ d: XMLDocument i: string/*/

            v.e = crtelu({ p: document.body, e:'div', i: i, c: document.body.firstChild });
            // [].forEach.call(['row column', 'column', 'column', 'row', 'row'], e => {
            //   crtelu({ p: v.e, e:'svg', i: e, c: v.e.firstChild });
            // });

            pagei.eo.i = i;
            pagei.eo.e = v.e;
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

          'txtu': v => {},
          
          'load': async v => {
            const { f } = v; /*/ { f: object } /*/

            v.fonts = {};
            v.fonts[f.n] = new FontFace('PlayTangram M', `url(/fonts/${f.n + f.t})`); /*/ { n: 'PlayTangram', t: '.ttf' } /*/
            console.log('Font loaded: ' + f.n);
            v.fonts[f.n.toLocaleLowerCase()]
              .load()
              .then(e => document.fonts.add(e))
              .catch(e => console.log(`/*/ Failed to load font: ${e} /*/`));
              // .then(function (loadedFont) {
              //   document.fonts.add(loadedFont);
              // })
              // .catch(e => 
              //   console.log('/// Failed to load font: ' + err);
              // });
          }
        }

        this.fileu = async v => {
          const { p, i, x } = v; /*/ p: string, i: string, x: string /*/

          v.d = await getfileu({ p: p, i: i, x: x });
          mineo[x + 'u']({ d: v.d, i: i });
        }
      };
      /*/ --> Get /*/

      /*/ <-- Set /*/
      const sety = function (v) {
        this.p = {
          trans: v => pagei.trans(v),
        };
      }
      /*/ --> Set /*/

      /*/ <-- Helper /*/
      const helpy = function (v) {
        const {} = v;

        this.m = { /*/ math /*/ 
          d: v => dxyu(v),
          r: v => roundu(v),
        };

        this.c = { /*/ cursor /*/
          on: false,
          xy: v => {
            const { xy } = v; /*/ { xy: object } /*/
  
          },
        };
      }
      /*/ --> Helper /*/
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

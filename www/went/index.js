const hi = new x6.helpy({});
const cxyi = new x6.cxyy({});
const geti = new x6.gety({ r: 1/3 });
const seti = new x6.sety({});

const eventy = function (v) {
  this.xya = [];
  this.btna = [];

  this.btnu = v => {
    const {} = v;

    v.b = false;
    [].forEach.call(this.btna, e => {
      
    });

    return { b: v.b };
  };

  this.trans = v => {
    const {} = v;

    const { l, a } = hi.m.d({ sxy: this.xya[this.xya.length - 1], exy: this.xya[0] });
    seti.p.trans({ l: l, a: a, n: 0 }); /*/ 0 is 1/20th of the width. /*/
  };

  this.dxyu = v => {
    const { t } = v;

    if(t === 'e') {
      if(!this.btnu({}).b) this.trans({});
    } else {

    }
  };

  this.xyu = v => {
    const { xya, t } = v; /*/ { xya: array, t: string } /*/

    if(t === 'e' || t === 'm') this.dxyu({ t: t });
    if(t === 's' || t === 'e') this.xya = [];
    if(t === 's' || t === 'm') this.xya.push(xya[0])
  };
};
const ei = new eventy({});

cxyi.eventu({ b: true, n: 2, f: ei.xyu });

geti.fileu({  p: 'www/went', i: 'index', x: 'xml' });
geti.fileu({  p: 'www/ware/item', i: 'logo', x: 'svg' });


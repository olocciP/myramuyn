const hi = new x6.helpy({});

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

  this.flipu = v => {
    const {} = v;

    const { l, a } = hi.m.d({ sxy: this.xya[this.xya.length - 1], exy: this.xya[0] });
    console.log(l, a);
  };

  this.dxyu = v => {
    const { t } = v;

    if(t === 'e') {
      if(!this.btnu({}).b) this.flipu({});
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

const cxyi = new x6.cxyy({}); /*/ client x, y /*/
cxyi.eventu({ b: true, n: 2, f: ei.xyu });

const geti = new x6.gety({});
geti.fileu({  p: '/ware/page', i: 'index', x: 'xml' });
geti.fileu({  p: '/ware/item', i: 'logo', x: 'svg' });


const frameu = e => {
  // console.log(ei.xya);

  window.requestAnimationFrame(frameu);
}
window.requestAnimationFrame(frameu);
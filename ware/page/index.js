const eventy = function (v) {
  this.xya = [];
  this.dxyu = v => {
    };

  this.xyu = v => {
    const { xya, t } = v; /*/ { xya: array, t: string } /*/

    if(t === 'e') this.dxyu();
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
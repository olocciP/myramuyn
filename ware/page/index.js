const cxyi = new x6.cxyy({}); /*/ client x, y /*/
cxyi.eventu({ b: true, n: 2 });

const geti = new x6.gety({});
geti.fileu({  p: '/ware/page', i: 'index', x: 'xml' });
geti.fileu({  p: '/ware/item', i: 'logo', x: 'svg' });

const o = {
  xya: [],
}

const frameu = e => {
  if(o.xya.length === 0 && cxyi.xya.length) o.xya.push(cxyi.xya[0]);
  
  window.requestAnimationFrame(frameu);
}
window.requestAnimationFrame(frameu);
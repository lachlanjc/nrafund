const { createElement: h } = require('react')
const theme = require('./theme').default

const width = 512
const widthIcon = 0.9 * width
const padding = 0.05 * width

module.exports = props =>
  h(
    'div',
    {
      style: {
        boxSizing: 'border-box',
        margin: 0,
        padding,
        width,
        height: width,
        backgroundColor: '#782222',
        backgroundImage: 'linear-gradient(to bottom right, #ff4949 33%, #a72f2f)'
      }
    },
    h(
      'svg',
      {
        viewBox: '0 0 1024 1024',
        fill: '#fff',
        style: { width: widthIcon }
      },
      h('path', {
        d: 'M830.123907,452.160004 L849.5559,452.173387 C849.5559,452.173387 853.782496,416.639254 849.559998,388.492841 C845.3375,360.346429 840.881526,350.907198 831.659925,332.882034 C831.659912,332.882037 820,313 803.557155,296.708352 C783.779784,279.875774 755.986035,268.687381 717.012982,268.687381 L177.434337,268.687381 L172.880815,268.687381 L172.880815,253 L145.61422,253 L145.61422,268.687381 L128,268.687381 L128,390.914437 C128,390.914437 132.735299,452.173387 217.643475,452.173387 L457.016911,452.173387 L457.016911,540.744376 C457.016911,552.32359 466.414798,561.730565 478.012189,561.730565 L637.712636,561.730565 L692.69118,742.871643 C699,761 699,770.183655 730,770.200012 C734,770.200012 720.221352,770.183683 746.551794,770.183683 L860.562516,770.183683 C889.883194,770.183683 896,754.710079 896,735.85504 C896,717 812.609664,499.635439 812.609664,477.867608 C812.609664,456.090687 830.123907,452.173387 830.123907,452.160004 Z M200.31101,408.9831 C181.188038,408.9831 184.914472,384.743098 184.914472,384.743098 L573.990603,384.743098 C589.39623,384.743098 587.533012,408.9831 587.533012,408.9831 L200.31101,408.9831 L200.31101,408.9831 Z M766.750912,739.885795 C766.750912,739.885795 680.644437,466.182771 677.461755,455.607874 C673.021716,440.855239 650.347179,449.625359 650.347179,449.625359 C650.347179,449.625359 734.942206,718.306395 739.101959,732.127742 C744.613371,750.440157 766.750912,739.885795 766.750912,739.885795 Z M487.164677,515.949952 L487.164677,452.173387 L564.001941,452.173387 C559.502953,484.9751 544,491.86901 540,496.457491 L556,511.949053 C577.172606,487.954449 582.861336,473.095954 588,452.164298 L604.456479,452.164298 L628.560149,531.573711 L502.799988,531.577517 C490.799988,531.577517 487.159973,527.937502 487.164677,515.949952 Z'
      })
    )
  )
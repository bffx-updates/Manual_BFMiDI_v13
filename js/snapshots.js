/* BFMiDi · Manual — PRINTS do editor (v14.5).
   Gerado por tools/capture_shots.mjs. NAO editar a mao: quando a tela
   do editor mudar, rode a captura de novo.
   { img, light?, w, h, kind?, hot: { seletor: [x, y, w, h] em fracao } } */
/* eslint-disable */
"use strict";

const MN_SHOTS = {
 "preset-tela": {
  "img": "img/shots/preset-tela.webp",
  "w": 1280,
  "h": 900,
  "hot": {
   ".bf-bank-tile": [
    0.0281,
    0.0422,
    0.1261,
    0.1534
   ],
   ".bf-bank-keys": [
    0.1605,
    0.0422,
    0.1645,
    0.1534
   ],
   ".bf-bank-name-pill": [
    0.0281,
    0.2045,
    0.2969,
    0.0467
   ],
   ".bf-studio-np-pill-l.is-pc": [
    0.3563,
    0.1456,
    0.0391,
    0.0489
   ],
   ".bf-studio-np-ch-row": [
    0.3555,
    0.2067,
    0.2891,
    0.0511
   ],
   ".bf-save": [
    0.6641,
    0.9044,
    0.0469,
    0.0667
   ],
   ".bf-bank-console": [
    0.0187,
    0.0289,
    0.3156,
    0.8489
   ],
   ".bf-swlist": [
    0.0281,
    0.329,
    0.2969,
    0.5355
   ],
   ".bf-bank-center-stack": [
    0.3422,
    0.0289,
    0.3156,
    0.8489
   ],
   ".bf-bank-slot-display": [
    0.6656,
    0.0289,
    0.3156,
    0.8489
   ],
   ".bf-tabbar": [
    0.2813,
    0.8933,
    0.4375,
    0.0889
   ]
  }
 },
 "preset-console": {
  "img": "img/shots/preset-console.webp",
  "w": 404,
  "h": 764,
  "hot": {
   ".bf-bank-tile": [
    0.0297,
    0.0157,
    0.3995,
    0.1807
   ],
   ".bf-bank-keys": [
    0.449,
    0.0157,
    0.5213,
    0.1807
   ],
   ".bf-bank-name-pill": [
    0.0297,
    0.2069,
    0.9406,
    0.055
   ],
   ".bf-mobile-home-mode": [
    0.0297,
    0.2723,
    0.9406,
    0.055
   ],
   ".bf-mobile-home-layer": [
    0.6699,
    0.2723,
    0.3004,
    0.055
   ]
  }
 },
 "preset-principal": {
  "img": "img/shots/preset-principal.webp",
  "w": 404,
  "h": 813,
  "hot": {
   ".bf-studio-np-pill-l.is-pc": [
    0.0446,
    0.1292,
    0.1238,
    0.0541
   ],
   ".bf-studio-np-ch-row": [
    0.0421,
    0.1968,
    0.9158,
    0.0566
   ],
   ".bf-studio-np-extras-btn": [
    0.75,
    0.1968,
    0.2079,
    0.0566
   ],
   ".bf-np-shortcut.is-accent": [
    0.0668,
    0.2952,
    0.8663,
    0.1033
   ],
   ".bf-np-shortcut.is-device": [
    0.0668,
    0.4108,
    0.2723,
    0.1009
   ],
   ".bf-np-shortcut:not(.is-accent):not(.is-device)": [
    0.6609,
    0.4108,
    0.2723,
    0.1009
   ]
  }
 },
 "preset-display": {
  "img": "img/shots/preset-display.webp",
  "w": 388,
  "h": 859,
  "hot": {
   ".bf-grid-screen": [
    0.0361,
    0.0163,
    0.9278,
    0.3702
   ],
   ".bf-grid-nome": [
    0.0361,
    0.3981,
    0.9278,
    0.2061
   ],
   ".bf-grid-aparencia": [
    0.0361,
    0.6042,
    0.9278,
    0.1537
   ],
   ".bf-grid-cores": [
    0.0361,
    0.7579,
    0.9278,
    0.2251
   ]
  }
 },
 "preset-tabbar": {
  "img": "img/shots/preset-tabbar.webp",
  "w": 576,
  "h": 96,
  "hot": {
   ".bf-tabbar-conn": [
    0.0313,
    0.1875,
    0.1042,
    0.625
   ],
   ".bf-nav-settings": [
    0.1563,
    0.1875,
    0.1042,
    0.625
   ],
   ".bf-nav-home": [
    0.2813,
    0.1875,
    0.4375,
    0.625
   ],
   ".bf-tabbar-plus": [
    0.7396,
    0.1875,
    0.1042,
    0.625
   ],
   ".bf-save": [
    0.8646,
    0.1875,
    0.1042,
    0.625
   ]
  }
 },
 "preset-extras": {
  "img": "img/shots/preset-extras.webp",
  "w": 404,
  "h": 764,
  "hot": {}
 },
 "preset-bancos": {
  "img": "img/shots/preset-bancos.webp",
  "w": 420,
  "h": 396,
  "hot": {}
 },
 "preset-acoes": {
  "img": "img/shots/preset-acoes.webp",
  "w": 576,
  "h": 290,
  "hot": {}
 },
 "preset-posicionar": {
  "img": "img/shots/preset-posicionar.webp",
  "w": 420,
  "h": 559,
  "hot": {}
 },
 "live-tela": {
  "img": "img/shots/live-tela.webp",
  "w": 1280,
  "h": 900,
  "hot": {
   ".bf-bank-tile": [
    0.0281,
    0.0422,
    0.1261,
    0.1534
   ],
   ".bf-bank-keys": [
    0.1605,
    0.0422,
    0.1645,
    0.1534
   ],
   ".bf-sw-mode-field": [
    0.3602,
    0.0544,
    0.2797,
    0.0711
   ],
   ".bf-sw-display-card": [
    0.6656,
    0.0289,
    0.3156,
    0.8489
   ]
  }
 },
 "live-display": {
  "img": "img/shots/live-display.webp",
  "w": 386,
  "h": 519,
  "hot": {
   ".bf-sw-disp-group-preview": [
    0.0596,
    0.0443,
    0.8808,
    0.2987
   ],
   ".bf-sw-disp-colors": [
    0.0596,
    0.3622,
    0.8808,
    0.2062
   ],
   ".bf-sw-disp-name-row": [
    0.0881,
    0.6127,
    0.8238,
    0.1676
   ],
   ".bf-sw-disp-font": [
    0.0881,
    0.7996,
    0.8238,
    0.131
   ]
  }
 },
 "sw-picker": {
  "img": "img/shots/sw-picker.webp",
  "w": 440,
  "h": 596,
  "hot": {}
 },
 "sw-stomp": {
  "img": "img/shots/sw-stomp.webp",
  "w": 404,
  "h": 471,
  "hot": {
   ".bf-sw-fx2-tabs": [
    0.0569,
    0.242,
    0.8861,
    0.0977
   ],
   ".bf-typebtn-row": [
    0.0619,
    0.3737,
    0.8762,
    0.1359
   ],
   ".bf-sw-fx1-chrow": [
    0.0619,
    0.5435,
    0.8762,
    0.1359
   ],
   ".bf-sw-opt-card": [
    0.0619,
    0.7134,
    0.8762,
    0.2293
   ]
  }
 },
 "sw-spin": {
  "img": "img/shots/sw-spin.webp",
  "w": 404,
  "h": 1181,
  "hot": {}
 },
 "sw-ramp": {
  "img": "img/shots/sw-ramp.webp",
  "w": 404,
  "h": 1028,
  "hot": {}
 },
 "sw-momentary": {
  "img": "img/shots/sw-momentary.webp",
  "w": 404,
  "h": 834,
  "hot": {}
 },
 "sw-macros": {
  "img": "img/shots/sw-macros.webp",
  "w": 404,
  "h": 601,
  "hot": {}
 },
 "sw-tap": {
  "img": "img/shots/sw-tap.webp",
  "w": 404,
  "h": 839,
  "hot": {}
 },
 "sw-single": {
  "img": "img/shots/sw-single.webp",
  "w": 404,
  "h": 757,
  "hot": {}
 },
 "sw-steps": {
  "img": "img/shots/sw-steps.webp",
  "w": 404,
  "h": 1348,
  "hot": {}
 },
 "sw-control": {
  "img": "img/shots/sw-control.webp",
  "w": 404,
  "h": 491,
  "hot": {}
 },
 "sw-mute": {
  "img": "img/shots/sw-mute.webp",
  "w": 404,
  "h": 335,
  "hot": {}
 },
 "sw-custom": {
  "img": "img/shots/sw-custom.webp",
  "w": 404,
  "h": 727,
  "hot": {}
 },
 "preset-atalhos": {
  "img": "img/shots/preset-atalhos.webp",
  "w": 386,
  "h": 580,
  "hot": {
   ".bf-np-shortcut.is-gp5": [
    0.0466,
    0.1931,
    0.285,
    0.1414
   ],
   ".bf-np-shortcut.is-tonex": [
    0.3575,
    0.1931,
    0.285,
    0.1414
   ]
  }
 },
 "deved-gp5": {
  "img": "img/shots/deved-gp5.webp",
  "w": 1180,
  "h": 800,
  "hot": {
   ".bf-deved-lcd": [
    0.0186,
    0.095,
    0.2458,
    0.0675
   ],
   ".bf-deved-chain": [
    0.0186,
    0.1775,
    0.2458,
    0.5687
   ],
   ".bf-deved-block-head": [
    0.2966,
    0.2425,
    0.6661,
    0.06
   ],
   ".bf-deved-savename": [
    0.0186,
    0.7775,
    0.2458,
    0.055
   ],
   ".bf-deved-actions": [
    0.0186,
    0.845,
    0.2458,
    0.13
   ]
  }
 },
 "deved-tonex": {
  "img": "img/shots/deved-tonex.webp",
  "w": 1180,
  "h": 800,
  "hot": {}
 },
 "stage-1": {
  "img": "img/shots/stage-1.webp",
  "w": 1280,
  "h": 900,
  "hot": {
   ".bf-stage-name-big": [
    0.0507,
    0.1499,
    0.4186,
    0.2867
   ],
   ".bf-stage-img": [
    0.5,
    0.022,
    0.48,
    0.5279
   ],
   ".bf-stage-sws": [
    0.02,
    0.5719,
    0.96,
    0.2264
   ],
   ".bf-stage-fsw": [
    0.02,
    0.8203,
    0.96,
    0.1577
   ],
   ".bf-stage-handle": [
    0.4641,
    0,
    0.0719,
    0.0289
   ]
  }
 },
 "stage-1-barra": {
  "img": "img/shots/stage-1-barra.webp",
  "w": 1280,
  "h": 900,
  "hot": {
   ".bf-stage-top .bf-stage-pill:first-child": [
    0.2051,
    0.0153,
    0.0725,
    0.0467
   ],
   ".bf-stage-view": [
    0.2839,
    0.0153,
    0.0976,
    0.0467
   ],
   ".bf-stage-pill.is-tag": [
    0.3877,
    0.0153,
    0.0832,
    0.0467
   ],
   ".bf-stage-top button[aria-haspopup='dialog']": [
    0.4772,
    0.0153,
    0.1447,
    0.0467
   ],
   ".bf-stage-status": [
    0.6281,
    0.0153,
    0.1667,
    0.0467
   ]
  }
 },
 "stage-set-p1": {
  "img": "img/shots/stage-set-p1.webp",
  "w": 760,
  "h": 849,
  "hot": {}
 },
 "stage-set-geral": {
  "img": "img/shots/stage-set-geral.webp",
  "w": 760,
  "h": 674,
  "hot": {}
 },
 "stage-set-visual": {
  "img": "img/shots/stage-set-visual.webp",
  "w": 760,
  "h": 849,
  "hot": {}
 },
 "stage-set-p2": {
  "img": "img/shots/stage-set-p2.webp",
  "w": 760,
  "h": 784,
  "hot": {}
 },
 "stage-2": {
  "img": "img/shots/stage-2.webp",
  "w": 1280,
  "h": 900,
  "hot": {
   ".bf-stage-head": [
    0.02,
    0.022,
    0.96,
    0.2084
   ],
   ".bf-stage-chain": [
    0.02,
    0.2524,
    0.96,
    0.2795
   ],
   ".bf-stage-model": [
    0.02,
    0.5635,
    0.2496,
    0.2252
   ],
   ".bf-stage-knobs": [
    0.3358,
    0.5635,
    0.5779,
    0.2252
   ],
   ".bf-stage-fsw": [
    0.02,
    0.8203,
    0.96,
    0.1577
   ]
  }
 },
 "deved-nano": {
  "img": "img/shots/deved-nano.webp",
  "w": 1180,
  "h": 800,
  "hot": {}
 },
 "stage-2-nano": {
  "img": "img/shots/stage-2-nano.webp",
  "w": 1280,
  "h": 900,
  "hot": {}
 },
 "stage-set-img": {
  "img": "img/shots/stage-set-img.webp",
  "w": 760,
  "h": 849,
  "hot": {}
 },
 "stage-land": {
  "img": "img/shots/stage-land.webp",
  "w": 844,
  "h": 390,
  "hot": {},
  "kind": "landscape"
 },
 "connect-popup": {
  "img": "img/shots/connect-popup.webp",
  "w": 420,
  "h": 586,
  "hot": {
   ".bf-cx-radar": [
    0.3214,
    0.1713,
    0.3571,
    0.256
   ],
   ".bf-cx-opt:nth-child(1)": [
    0.0548,
    0.5609,
    0.281,
    0.3072
   ],
   ".bf-cx-opt:nth-child(2)": [
    0.3595,
    0.5609,
    0.281,
    0.3072
   ],
   ".bf-cx-opt:nth-child(3)": [
    0.6643,
    0.5609,
    0.281,
    0.3072
   ],
   ".bf-cx-help-toggle": [
    0.3087,
    0.8988,
    0.3826,
    0.0751
   ]
  }
 },
 "tabbar-offline": {
  "img": "img/shots/tabbar-offline.webp",
  "w": 576,
  "h": 96,
  "hot": {
   ".bf-tabbar-conn": [
    0.0313,
    0.1875,
    0.1042,
    0.625
   ]
  }
 },
 "phone-preset": {
  "img": "img/shots/phone-preset.webp",
  "w": 390,
  "h": 844,
  "hot": {
   ".bf-bank-console": [
    0.0308,
    0.0071,
    0.9385,
    0.2956
   ],
   ".bf-studio-np-headbar": [
    0.0744,
    0.3418,
    0.8513,
    0.0699
   ],
   ".bf-np-shortcuts": [
    0.0744,
    0.5752,
    0.8513,
    0.4481
   ],
   ".bf-tabbar": [
    0.0359,
    0.9076,
    0.9282,
    0.0806
   ]
  },
  "kind": "phone"
 },
 "ked": {
  "img": "img/shots/ked.webp",
  "w": 1180,
  "h": 800,
  "hot": {
   ".bf-deved-lcd": [
    0.0186,
    0.095,
    0.2458,
    0.0757
   ],
   ".bf-ked-notes": [
    0.0186,
    0.1857,
    0.2458,
    0.0833
   ],
   ".bf-deved-chain": [
    0.0186,
    0.2839,
    0.2458,
    0.5298
   ],
   ".bf-deved-actions": [
    0.0186,
    0.845,
    0.2458,
    0.13
   ]
  }
 },
 "stage-kemper": {
  "img": "img/shots/stage-kemper.webp",
  "w": 1280,
  "h": 900,
  "hot": {}
 },
 "cfg-kemper": {
  "img": "img/shots/cfg-kemper.webp",
  "w": 668,
  "h": 1046,
  "hot": {}
 },
 "cfg-menu": {
  "img": "img/shots/cfg-menu.webp",
  "w": 600,
  "h": 675,
  "hot": {}
 },
 "cfg-amigavel": {
  "img": "img/shots/cfg-amigavel.webp",
  "w": 696,
  "h": 802,
  "hot": {}
 },
 "cfg-footswitches": {
  "img": "img/shots/cfg-footswitches.webp",
  "w": 696,
  "h": 1134,
  "hot": {}
 },
 "cfg-exp": {
  "img": "img/shots/cfg-exp.webp",
  "w": 668,
  "h": 724,
  "hot": {}
 },
 "cfg-bancos": {
  "img": "img/shots/cfg-bancos.webp",
  "w": 696,
  "h": 1449,
  "hot": {}
 },
 "cfg-tela": {
  "img": "img/shots/cfg-tela.webp",
  "w": 696,
  "h": 1313,
  "hot": {}
 },
 "cfg-leds": {
  "img": "img/shots/cfg-leds.webp",
  "w": 696,
  "h": 1105,
  "hot": {}
 },
 "cfg-imagens-galeria": {
  "img": "img/shots/cfg-imagens-galeria.webp",
  "w": 696,
  "h": 722,
  "hot": {}
 },
 "cfg-hardware": {
  "img": "img/shots/cfg-hardware.webp",
  "w": 696,
  "h": 1095,
  "hot": {}
 },
 "cfg-wifi": {
  "img": "img/shots/cfg-wifi.webp",
  "w": 696,
  "h": 1016,
  "hot": {
   ".bf-wifi-state-grid, [class*='wifi-state']": [
    0.0503,
    0.2269,
    0.8994,
    0.1142
   ]
  }
 },
 "cfg-host": {
  "img": "img/shots/cfg-host.webp",
  "w": 696,
  "h": 2255,
  "hot": {}
 },
 "cfg-bluetooth": {
  "img": "img/shots/cfg-bluetooth.webp",
  "w": 696,
  "h": 992,
  "hot": {}
 },
 "cfg-editor": {
  "img": "img/shots/cfg-editor.webp",
  "w": 696,
  "h": 1624,
  "hot": {}
 },
 "cfg-atualizar": {
  "img": "img/shots/cfg-atualizar.webp",
  "w": 696,
  "h": 669,
  "hot": {}
 },
 "cfg-atualizar-host": {
  "img": "img/shots/cfg-atualizar-host.webp",
  "w": 696,
  "h": 1008,
  "hot": {}
 },
 "cfg-backup": {
  "img": "img/shots/cfg-backup.webp",
  "w": 696,
  "h": 1224,
  "hot": {}
 },
 "cfg-testes": {
  "img": "img/shots/cfg-testes.webp",
  "w": 696,
  "h": 1507,
  "hot": {}
 },
 "cfg-restaurar": {
  "img": "img/shots/cfg-restaurar.webp",
  "w": 696,
  "h": 237,
  "hot": {}
 }
};

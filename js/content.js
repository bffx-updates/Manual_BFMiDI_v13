/* BFMiDi · Manual do Usuário — conteúdo (v14.5)
   ------------------------------------------------------------------
   Escrito PARA a versão atual: descreve a controladora como ela é hoje,
   sem comparar com versões anteriores.

   As prévias são PRINTS da tela real do editor: cada card aponta um
   `shot`, que é uma imagem em img/shots/ tirada por
   tools/capture_shots.mjs contra o pedal simulado (tools/mock_pedal.mjs).
   Os marcadores numerados (`hot`) são seletores CSS medidos na própria
   captura. Mudou a tela? Rode a captura de novo — não redesenhe nada.

   Campos com `desc` aceitam HTML simples (p, br, strong, em, code,
   span.range, a). Toda string visível é uma lang-map {pt, en, es}. */

/* eslint-disable */
"use strict";

const MN_ICONS = {
  home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  intro: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
  conexao: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9c5.5-5.3 14.5-5.3 20 0"/><path d="M5.5 12.5c3.6-3.4 9.4-3.4 13 0"/><path d="M9 16c1.7-1.6 4.3-1.6 6 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></svg>',
  preset: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  modos: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><circle cx="12" cy="14" r="2.5"/><path d="M9 3h6M12 3v4"/></svg>',
  global: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9z"/></svg>',
  system: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.01a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.01a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/></svg>',
  avancado: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5L13 2z"/></svg>',
  primeiro: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none"/></svg>',
  plug: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7V3M15 7V3"/><path d="M6 7h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6z"/><path d="M12 17v4"/></svg>',
  palco: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><path d="M5 20l2-7h10l2 7"/><path d="M12 3v6"/><path d="M8.5 5.5L12 9l3.5-3.5"/></svg>',
  editores: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7"/><path d="M12 13l3.5-3.5"/><path d="M12 3v1.5M3.5 13H5M19 13h1.5M6 7l1 1M18 7l-1 1"/></svg>'
};

const MN_CONTENT = {
 "title": {
  "pt": "Manual do Usuário",
  "en": "User Manual",
  "es": "Manual del Usuario"
 },
 "tagline": {
  "pt": "Tudo o que você precisa para configurar e tocar com a sua controladora BFMiDi (versão 14.5) — do primeiro acesso ao editor até os footswitches, o Modo Palco e os editores de preset da Valeton GP-5, IK TONEX ONE, Neural DSP Nano Cortex e Kemper Player. Os prints deste manual são da tela real do editor; os números neles casam com a lista de campos logo abaixo.",
  "en": "Everything you need to set up and play with your BFMiDi controller (version 14.5) — from first access to the editor through the footswitches, Stage Mode and the preset editors for the Valeton GP-5, IK TONEX ONE, Neural DSP Nano Cortex and Kemper Player. The screenshots in this manual are the editor's real screen; their numbers match the field list right below.",
  "es": "Todo lo que necesitas para configurar y tocar con tu controladora BFMiDi (versión 14.5) — desde el primer acceso al editor hasta los footswitches, el Modo Escenario y los editores de preset de la Valeton GP-5, IK TONEX ONE, Neural DSP Nano Cortex y Kemper Player. Las capturas de este manual son la pantalla real del editor; sus números coinciden con la lista de campos justo abajo."
 },
 "sections": [
  {
   "id": "acesso",
   "icon": "conexao",
   "page": 1,
   "title": {
    "pt": "Conectar ao editor",
    "en": "Connecting to the editor",
    "es": "Conectarse al editor"
   },
   "summary": {
    "pt": "Pelo aplicativo, pelo Wi-Fi da controladora, pela sua rede de casa ou por um cabo USB — e até sem pedal nenhum, no modo offline.",
    "en": "Through the app, the controller's Wi-Fi, your home network or a USB cable — and even with no pedal at all, in offline mode.",
    "es": "Por la aplicación, por el Wi-Fi de la controladora, por tu red de casa o con un cable USB — e incluso sin ningún pedal, en el modo offline."
   },
   "intro": {
    "pt": "<p>O editor é o mesmo em todo lugar: no celular, no tablet e no computador, dentro dos aplicativos BFMiDi ou no navegador. O que muda é o caminho até a controladora.</p><p>O jeito mais simples é instalar o aplicativo do seu aparelho: ele abre na hora, procura o pedal sozinho e, se não achar, deixa você editar mesmo assim, numa cópia guardada no próprio aparelho.</p>",
    "en": "<p>The editor is the same everywhere: on your phone, tablet and computer, inside the BFMiDi apps or in the browser. What changes is the path to the controller.</p><p>The simplest way is to install the app for your device: it opens right away, looks for the pedal on its own and, if it can't find one, lets you edit anyway, on a copy stored on the device itself.</p>",
    "es": "<p>El editor es el mismo en todas partes: en el celular, en la tablet y en la computadora, dentro de las aplicaciones BFMiDi o en el navegador. Lo que cambia es el camino hasta la controladora.</p><p>Lo más sencillo es instalar la aplicación de tu dispositivo: abre al instante, busca el pedal sola y, si no lo encuentra, te deja editar de todos modos, en una copia guardada en el propio dispositivo.</p>"
   },
   "cards": [
    {
     "id": "acesso-apps",
     "title": {
      "pt": "Os aplicativos BFMiDi",
      "en": "The BFMiDi apps",
      "es": "Las aplicaciones BFMiDi"
     },
     "chip": {
      "pt": "recomendado",
      "en": "recommended",
      "es": "recomendado"
     },
     "purpose": {
      "pt": "Há aplicativo oficial para Android, iPhone/iPad, Mac e Windows. É o mesmo editor do navegador, embutido — por isso abre na hora, em tela cheia, e se atualiza pela loja.",
      "en": "There's an official app for Android, iPhone/iPad, Mac and Windows. It's the same editor as in the browser, built in — so it opens instantly, in full screen, and updates through the store.",
      "es": "Hay aplicación oficial para Android, iPhone/iPad, Mac y Windows. Es el mismo editor del navegador, integrado — por eso abre al instante, en pantalla completa, y se actualiza por la tienda."
     },
     "howto": [
      {
       "pt": "<strong>Android</strong> (7 ou mais recente): <a href=\"https://play.google.com/store/apps/details?id=com.bffx.bfmidi\" target=\"_blank\" rel=\"noopener\">BFMiDi no Google Play</a>.",
       "en": "<strong>Android</strong> (7 or later): <a href=\"https://play.google.com/store/apps/details?id=com.bffx.bfmidi\" target=\"_blank\" rel=\"noopener\">BFMiDi on Google Play</a>.",
       "es": "<strong>Android</strong> (7 o más reciente): <a href=\"https://play.google.com/store/apps/details?id=com.bffx.bfmidi\" target=\"_blank\" rel=\"noopener\">BFMiDi en Google Play</a>."
      },
      {
       "pt": "<strong>iPhone, iPad</strong> (iOS/iPadOS 17+) <strong>e Mac</strong> (macOS 14+): <a href=\"https://apps.apple.com/br/app/bfmidi-editor/id6810756556\" target=\"_blank\" rel=\"noopener\">BFMiDi Editor na App Store</a>.",
       "en": "<strong>iPhone, iPad</strong> (iOS/iPadOS 17+) <strong>and Mac</strong> (macOS 14+): <a href=\"https://apps.apple.com/br/app/bfmidi-editor/id6810756556\" target=\"_blank\" rel=\"noopener\">BFMiDi Editor on the App Store</a>.",
       "es": "<strong>iPhone, iPad</strong> (iOS/iPadOS 17+) <strong>y Mac</strong> (macOS 14+): <a href=\"https://apps.apple.com/br/app/bfmidi-editor/id6810756556\" target=\"_blank\" rel=\"noopener\">BFMiDi Editor en la App Store</a>."
      },
      {
       "pt": "<strong>Windows 10 e 11</strong> (64 bits): baixe o instalador na <a href=\"https://bffx-updates.github.io/Download_Apps/\" target=\"_blank\" rel=\"noopener\">página de downloads</a>.",
       "en": "<strong>Windows 10 and 11</strong> (64-bit): download the installer from the <a href=\"https://bffx-updates.github.io/Download_Apps/\" target=\"_blank\" rel=\"noopener\">downloads page</a>.",
       "es": "<strong>Windows 10 y 11</strong> (64 bits): descarga el instalador en la <a href=\"https://bffx-updates.github.io/Download_Apps/\" target=\"_blank\" rel=\"noopener\">página de descargas</a>."
      },
      {
       "pt": "Abra o aplicativo. Ele mostra o editor na hora e, em paralelo, procura a controladora na sua rede e na rede dela. Achou, conecta sozinho.",
       "en": "Open the app. It shows the editor right away and, at the same time, looks for the controller on your network and on the controller's own network. Once it finds it, it connects by itself.",
       "es": "Abre la aplicación. Muestra el editor al instante y, al mismo tiempo, busca la controladora en tu red y en la red de ella. Cuando la encuentra, se conecta sola."
      }
     ],
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "Abre antes de achar o pedal",
        "en": "Opens before finding the pedal",
        "es": "Abre antes de encontrar el pedal"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>O aplicativo não espera a conexão para mostrar o editor: ele abre no <strong>modo offline</strong> (uma cópia guardada no aparelho) e troca para o pedal de verdade assim que o encontra. Você percebe a troca pelo indicador de conexão, no primeiro botão da barra de baixo.</p>",
        "en": "<p>The app doesn't wait for the connection to show the editor: it opens in <strong>offline mode</strong> (a copy stored on the device) and switches to the real pedal as soon as it finds it. You'll see the switch in the connection indicator, the first button on the bottom bar.</p>",
        "es": "<p>La aplicación no espera la conexión para mostrar el editor: abre en el <strong>modo offline</strong> (una copia guardada en el dispositivo) y cambia al pedal real en cuanto lo encuentra. Notas el cambio en el indicador de conexión, el primer botón de la barra inferior.</p>"
       }
      },
      {
       "name": {
        "pt": "Rede de casa primeiro",
        "en": "Home network first",
        "es": "Primero la red de casa"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>Se a controladora estiver na sua rede de casa (modo STA), o aplicativo prefere esse caminho — você continua com internet no celular. Sem rede de casa, ele usa o Wi-Fi da própria controladora (modo AP).</p><p>O aplicativo também entra sozinho na rede <strong>BFMIDI_WIFI</strong> quando você pede, na janela <strong>Conectar ao pedal</strong>.</p>",
        "en": "<p>If the controller is on your home network (STA mode), the app prefers that path — your phone keeps its internet connection. Without a home network, it uses the controller's own Wi-Fi (AP mode).</p><p>The app can also join the <strong>BFMIDI_WIFI</strong> network by itself when you ask, in the <strong>Conectar ao pedal</strong> (Connect to the pedal) window.</p>",
        "es": "<p>Si la controladora está en tu red de casa (modo STA), la aplicación prefiere ese camino — sigues con internet en el celular. Sin red de casa, usa el Wi-Fi de la propia controladora (modo AP).</p><p>La aplicación también entra sola en la red <strong>BFMIDI_WIFI</strong> cuando se lo pides, en la ventana <strong>Conectar ao pedal</strong> (Conectar al pedal).</p>"
       }
      },
      {
       "name": {
        "pt": "Cabo USB nos apps de computador",
        "en": "USB cable in the desktop apps",
        "es": "Cable USB en las aplicaciones de computadora"
       },
       "type": {
        "pt": "Mac e Windows",
        "en": "Mac and Windows",
        "es": "Mac y Windows"
       },
       "desc": {
        "pt": "<p>Os aplicativos de Mac e Windows também conectam pelo <strong>cabo USB</strong> e são o caminho mais confortável para <strong>atualizar</strong> a controladora e o USB Host. No aplicativo de Android e no iPhone/iPad, a conexão é pelo Wi-Fi.</p>",
        "en": "<p>The Mac and Windows apps also connect over the <strong>USB cable</strong> and are the most comfortable way to <strong>update</strong> the controller and the USB Host. In the Android app and on iPhone/iPad, the connection is over Wi-Fi.</p>",
        "es": "<p>Las aplicaciones de Mac y Windows también se conectan por el <strong>cable USB</strong> y son el camino más cómodo para <strong>actualizar</strong> la controladora y el USB Host. En la aplicación de Android y en iPhone/iPad, la conexión es por Wi-Fi.</p>"
       }
      },
      {
       "name": {
        "pt": "Atualizações do aplicativo",
        "en": "App updates",
        "es": "Actualizaciones de la aplicación"
       },
       "type": {
        "pt": "manutenção",
        "en": "maintenance",
        "es": "mantenimiento"
       },
       "desc": {
        "pt": "<p>Android, iPhone, iPad e Mac atualizam pela própria loja. No Windows, baixe o instalador novo na página de downloads e instale por cima — nada se perde.</p><p>O <em>firmware</em> da controladora é outra coisa: ele se atualiza em <strong>CONFIGURAÇÕES › ATUALIZAR</strong>.</p>",
        "en": "<p>Android, iPhone, iPad and Mac update through their own store. On Windows, download the new installer from the downloads page and install it over the old one — nothing is lost.</p><p>The controller's <em>firmware</em> is a different thing: it's updated in <strong>SETTINGS › UPDATES</strong>.</p>",
        "es": "<p>Android, iPhone, iPad y Mac se actualizan por su propia tienda. En Windows, descarga el instalador nuevo en la página de descargas e instálalo encima — no se pierde nada.</p><p>El <em>firmware</em> de la controladora es otra cosa: se actualiza en <strong>CONFIGURACIÓN › ACTUALIZAR</strong>.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Prefere não instalar nada? O navegador continua funcionando: veja os dois cards seguintes.",
       "en": "Rather not install anything? The browser still works: see the next two cards.",
       "es": "¿Prefieres no instalar nada? El navegador sigue funcionando: mira las dos tarjetas siguientes."
      }
     ]
    },
    {
     "id": "acesso-janela",
     "title": {
      "pt": "A janela Conectar ao pedal",
      "en": "The Conectar ao pedal (Connect to the pedal) window",
      "es": "La ventana Conectar ao pedal (Conectar al pedal)"
     },
     "purpose": {
      "pt": "Quando o editor não encontra a controladora, esta janela abre sozinha depois de alguns segundos e oferece os caminhos possíveis naquele aparelho.",
      "en": "When the editor can't find the controller, this window opens by itself after a few seconds and offers the paths available on that device.",
      "es": "Cuando el editor no encuentra la controladora, esta ventana se abre sola después de unos segundos y ofrece los caminos posibles en ese dispositivo."
     },
     "howto": [
      {
       "pt": "Ligue a controladora e espere: enquanto o radar gira, o editor está procurando.",
       "en": "Turn the controller on and wait: while the radar spins, the editor is searching.",
       "es": "Enciende la controladora y espera: mientras el radar gira, el editor está buscando."
      },
      {
       "pt": "Escolha um caminho: <strong>WI-FI</strong> (entrar na rede do pedal), <strong>USB</strong> (pelo cabo — só no computador) ou <strong>OFFLINE</strong> (editar sem pedal).",
       "en": "Choose a path: <strong>WI-FI</strong> (join the pedal's network), <strong>USB</strong> (over the cable — computer only) or <strong>OFFLINE</strong> (edit without a pedal).",
       "es": "Elige un camino: <strong>WI-FI</strong> (entrar en la red del pedal), <strong>USB</strong> (por cable — solo en la computadora) u <strong>OFFLINE</strong> (editar sin pedal)."
      },
      {
       "pt": "Na dúvida, toque em <strong>Como conectar?</strong>, no rodapé da janela, para ver o passo a passo.",
       "en": "Not sure? Tap <strong>Como conectar?</strong> (How to connect?), at the bottom of the window, to see the step-by-step.",
       "es": "¿Tienes dudas? Toca <strong>Como conectar?</strong> (¿Cómo conectar?), al pie de la ventana, para ver el paso a paso."
      }
     ],
     "shot": "connect-popup",
     "mockTitle": {
      "pt": "CONECTAR AO PEDAL",
      "en": "CONECTAR AO PEDAL",
      "es": "CONECTAR AO PEDAL"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-cx-radar",
       "at": "c",
       "label": {
        "pt": "procurando o pedal",
        "en": "searching for the pedal",
        "es": "buscando el pedal"
       }
      },
      {
       "n": 2,
       "sel": ".bf-cx-opt:nth-child(1)",
       "label": {
        "pt": "Wi-Fi",
        "en": "Wi-Fi",
        "es": "Wi-Fi"
       }
      },
      {
       "n": 3,
       "sel": ".bf-cx-opt:nth-child(2)",
       "label": {
        "pt": "cabo USB",
        "en": "USB cable",
        "es": "cable USB"
       }
      },
      {
       "n": 4,
       "sel": ".bf-cx-opt:nth-child(3)",
       "label": {
        "pt": "offline",
        "en": "offline",
        "es": "offline"
       }
      },
      {
       "n": 5,
       "sel": ".bf-cx-help-toggle",
       "label": {
        "pt": "como conectar",
        "en": "how to connect",
        "es": "cómo conectar"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "O radar",
        "en": "The radar",
        "es": "El radar"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Gira enquanto o editor procura a controladora, fecha em verde quando conecta e fica vermelho se a tentativa falhar. Conectou, a janela fecha sozinha.</p>",
        "en": "<p>It spins while the editor looks for the controller, closes in green when it connects and turns red if the attempt fails. Once connected, the window closes by itself.</p>",
        "es": "<p>Gira mientras el editor busca la controladora, se cierra en verde cuando conecta y se pone rojo si el intento falla. Al conectar, la ventana se cierra sola.</p>"
       }
      },
      {
       "name": {
        "pt": "WI-FI — Conectar à rede do pedal",
        "en": "WI-FI — Conectar à rede do pedal (join the pedal's network)",
        "es": "WI-FI — Conectar à rede do pedal (entrar en la red del pedal)"
       },
       "type": {
        "pt": "caminho",
        "en": "path",
        "es": "camino"
       },
       "desc": {
        "pt": "<p>Nos aplicativos, este cartão entra sozinho na rede <strong>BFMIDI_WIFI</strong> (o sistema pede permissão na primeira vez). No navegador, ele mostra a rede e a senha para você entrar pelos ajustes do aparelho.</p>",
        "en": "<p>In the apps, this card joins the <strong>BFMIDI_WIFI</strong> network by itself (the system asks for permission the first time). In the browser, it shows the network and password so you can join through your device's settings.</p>",
        "es": "<p>En las aplicaciones, esta tarjeta entra sola en la red <strong>BFMIDI_WIFI</strong> (el sistema pide permiso la primera vez). En el navegador, muestra la red y la contraseña para que entres desde los ajustes del dispositivo.</p>"
       }
      },
      {
       "name": {
        "pt": "USB — Conectar pelo cabo",
        "en": "USB — Conectar pelo cabo (connect over the cable)",
        "es": "USB — Conectar pelo cabo (conectar por cable)"
       },
       "type": {
        "pt": "caminho",
        "en": "path",
        "es": "camino"
       },
       "desc": {
        "pt": "<p>Só aparece onde existe acesso à porta USB: no Chrome ou Edge do computador e nos aplicativos de Mac e Windows. O navegador pede para você autorizar a porta da controladora.</p>",
        "en": "<p>It only appears where USB port access exists: in Chrome or Edge on a computer and in the Mac and Windows apps. The browser asks you to authorize the controller's port.</p>",
        "es": "<p>Solo aparece donde hay acceso al puerto USB: en Chrome o Edge en la computadora y en las aplicaciones de Mac y Windows. El navegador te pide autorizar el puerto de la controladora.</p>"
       }
      },
      {
       "name": {
        "pt": "OFFLINE — Usar sem conexão",
        "en": "OFFLINE — Usar sem conexão (use without a connection)",
        "es": "OFFLINE — Usar sem conexão (usar sin conexión)"
       },
       "type": {
        "pt": "caminho",
        "en": "path",
        "es": "camino"
       },
       "desc": {
        "pt": "<p>Fecha a janela e deixa você editar uma cópia guardada no aparelho. Veja o card <strong>Sem pedal: o modo offline</strong>.</p>",
        "en": "<p>Closes the window and lets you edit a copy stored on the device. See the <strong>No pedal: offline mode</strong> card.</p>",
        "es": "<p>Cierra la ventana y te deja editar una copia guardada en el dispositivo. Mira la tarjeta <strong>Sin pedal: el modo offline</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Reabrir a janela",
        "en": "Reopening the window",
        "es": "Volver a abrir la ventana"
       },
       "type": {
        "pt": "atalho",
        "en": "shortcut",
        "es": "atajo"
       },
       "desc": {
        "pt": "<p>Fechou sem querer? Toque no primeiro botão da barra de baixo (o indicador de conexão): ele abre esta janela de novo.</p>",
        "en": "<p>Closed it by accident? Tap the first button on the bottom bar (the connection indicator): it opens this window again.</p>",
        "es": "<p>¿La cerraste sin querer? Toca el primer botón de la barra inferior (el indicador de conexión): vuelve a abrir esta ventana.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Durante uma atualização a janela não abre, mesmo que a conexão caia — a queda faz parte da gravação.",
       "en": "During an update the window doesn't open, even if the connection drops — the drop is part of the flashing process.",
       "es": "Durante una actualización la ventana no se abre, aunque se caiga la conexión — la caída es parte de la grabación."
      }
     ]
    },
    {
     "id": "acesso-wifi",
     "title": {
      "pt": "Pelo Wi-Fi da controladora",
      "en": "Over the controller's Wi-Fi",
      "es": "Por el Wi-Fi de la controladora"
     },
     "purpose": {
      "pt": "A controladora cria a própria rede Wi-Fi. É o caminho que funciona em qualquer lugar, sem roteador e sem internet.",
      "en": "The controller creates its own Wi-Fi network. It's the path that works anywhere, with no router and no internet.",
      "es": "La controladora crea su propia red Wi-Fi. Es el camino que funciona en cualquier lugar, sin router y sin internet."
     },
     "howto": [
      {
       "pt": "<strong>Ligue a controladora.</strong> O Wi-Fi sobe sozinho e fica no ar por <span class=\"range\">90 segundos</span> esperando alguém conectar.",
       "en": "<strong>Turn the controller on.</strong> The Wi-Fi comes up by itself and stays on for <span class=\"range\">90 seconds</span> waiting for someone to connect.",
       "es": "<strong>Enciende la controladora.</strong> El Wi-Fi se activa solo y queda al aire durante <span class=\"range\">90 segundos</span> esperando que alguien se conecte."
      },
      {
       "pt": "No celular, abra <strong>Ajustes › Wi-Fi</strong> e entre na rede <strong>BFMIDI_WIFI</strong>. A senha é <code>bfmidi@editor</code> — a mesma em todas as controladoras.",
       "en": "On your phone, open <strong>Settings › Wi-Fi</strong> and join the <strong>BFMIDI_WIFI</strong> network. The password is <code>bfmidi@editor</code> — the same on every controller.",
       "es": "En el celular, abre <strong>Ajustes › Wi-Fi</strong> y entra en la red <strong>BFMIDI_WIFI</strong>. La contraseña es <code>bfmidi@editor</code> — la misma en todas las controladoras."
      },
      {
       "pt": "Se o aparelho avisar que a rede <em>“não tem internet”</em>, está certo: <strong>continue conectado</strong>. O editor mora no pedal.",
       "en": "If your device warns that the network <em>“has no internet”</em>, that's expected: <strong>stay connected</strong>. The editor lives in the pedal.",
       "es": "Si el dispositivo avisa que la red <em>“no tiene internet”</em>, es normal: <strong>sigue conectado</strong>. El editor vive en el pedal."
      },
      {
       "pt": "Abra o aplicativo, ou o navegador no endereço <code>http://192.168.4.1</code> (ou <code>http://bfmidi.local</code>).",
       "en": "Open the app, or open the browser at <code>http://192.168.4.1</code> (or <code>http://bfmidi.local</code>).",
       "es": "Abre la aplicación, o el navegador en la dirección <code>http://192.168.4.1</code> (o <code>http://bfmidi.local</code>)."
      }
     ],
     "shot": "cfg-wifi",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › WIFI",
      "en": "SETTINGS › WIFI",
      "es": "CONFIGURACIÓN › WIFI"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-wifi-state-grid, [class*='wifi-state']",
       "label": {
        "pt": "estado da conexão",
        "en": "connection status",
        "es": "estado de la conexión"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Rede BFMIDI_WIFI, senha bfmidi@editor",
        "en": "BFMIDI_WIFI network, password bfmidi@editor",
        "es": "Red BFMIDI_WIFI, contraseña bfmidi@editor"
       },
       "type": {
        "pt": "Wi-Fi",
        "en": "Wi-Fi",
        "es": "Wi-Fi"
       },
       "desc": {
        "pt": "<p>Nome e senha são <strong>fixos e iguais em todas as unidades</strong> — estão impressos aqui de propósito, para você nunca depender de ler a tela do pedal.</p><p>Com duas controladoras ligadas no mesmo lugar, as duas redes têm o mesmo nome; desligue uma enquanto configura a outra, ou coloque as duas na sua rede de casa.</p>",
        "en": "<p>The name and password are <strong>fixed and the same on every unit</strong> — they're printed here on purpose, so you never have to rely on reading the pedal's display.</p><p>With two controllers turned on in the same place, both networks have the same name; turn one off while you set up the other, or put both on your home network.</p>",
        "es": "<p>El nombre y la contraseña son <strong>fijos e iguales en todas las unidades</strong> — están impresos aquí a propósito, para que nunca dependas de leer la pantalla del pedal.</p><p>Con dos controladoras encendidas en el mismo lugar, las dos redes tienen el mismo nombre; apaga una mientras configuras la otra, o pon las dos en tu red de casa.</p>"
       }
      },
      {
       "name": {
        "pt": "Os endereços",
        "en": "The addresses",
        "es": "Las direcciones"
       },
       "type": {
        "pt": "navegador",
        "en": "browser",
        "es": "navegador"
       },
       "desc": {
        "pt": "<p><code>http://192.168.4.1</code> funciona sempre na rede do pedal. <code>http://bfmidi.local</code> funciona na rede do pedal <em>e</em> na sua rede de casa.</p><p>Digite <strong>com o <code>http://</code> na frente</strong>: sem ele, o Safari e o Chrome fazem uma busca no Google em vez de abrir o editor.</p>",
        "en": "<p><code>http://192.168.4.1</code> always works on the pedal's network. <code>http://bfmidi.local</code> works on the pedal's network <em>and</em> on your home network.</p><p>Type it <strong>with <code>http://</code> in front</strong>: without it, Safari and Chrome run a Google search instead of opening the editor.</p>",
        "es": "<p><code>http://192.168.4.1</code> funciona siempre en la red del pedal. <code>http://bfmidi.local</code> funciona en la red del pedal <em>y</em> en tu red de casa.</p><p>Escríbela <strong>con el <code>http://</code> adelante</strong>: sin él, Safari y Chrome hacen una búsqueda en Google en lugar de abrir el editor.</p>"
       }
      },
      {
       "name": {
        "pt": "Usar a sua rede de casa",
        "en": "Using your home network",
        "es": "Usar tu red de casa"
       },
       "type": {
        "pt": "opcional",
        "en": "optional",
        "es": "opcional"
       },
       "desc": {
        "pt": "<p>Em <strong>CONFIGURAÇÕES › WIFI</strong>, toque em <strong>BUSCAR</strong>, escolha a rede, digite a senha e <strong>CONECTAR</strong>. A partir daí o pedal fica alcançável em <code>http://bfmidi.local</code> de qualquer aparelho da casa, e você não perde a internet enquanto edita.</p><p>Só redes de <strong>2,4 GHz</strong> aparecem: é limitação do chip.</p>",
        "en": "<p>In <strong>SETTINGS › WIFI</strong>, tap <strong>SCAN</strong>, choose the network, type the password and tap <strong>CONNECT</strong>. From then on the pedal can be reached at <code>http://bfmidi.local</code> from any device in the house, and you keep your internet while you edit.</p><p>Only <strong>2.4 GHz</strong> networks show up: it's a limitation of the chip.</p>",
        "es": "<p>En <strong>CONFIGURACIÓN › WIFI</strong>, toca <strong>BUSCAR</strong>, elige la red, escribe la contraseña y toca <strong>CONECTAR</strong>. A partir de ahí el pedal queda accesible en <code>http://bfmidi.local</code> desde cualquier dispositivo de la casa, y no pierdes internet mientras editas.</p><p>Solo aparecen redes de <strong>2,4 GHz</strong>: es una limitación del chip.</p>"
       }
      },
      {
       "name": {
        "pt": "O Wi-Fi desligou sozinho",
        "en": "The Wi-Fi turned itself off",
        "es": "El Wi-Fi se apagó solo"
       },
       "type": {
        "pt": "socorro",
        "en": "help",
        "es": "ayuda"
       },
       "desc": {
        "pt": "<p>Sem ninguém conectado, o rádio desliga depois de <span class=\"range\">90 segundos</span>. Para trazer de volta: desligue e ligue a controladora, ou use um <strong>combo</strong> de footswitches configurado com <strong>LIGAR/DESLIGAR WI-FI</strong> (em CONFIGURAÇÕES › BANCOS). Ao ligar pelo combo, a tela do pedal mostra a rede, a senha e o endereço por alguns segundos.</p>",
        "en": "<p>With nobody connected, the radio turns off after <span class=\"range\">90 seconds</span>. To bring it back: turn the controller off and on again, or use a footswitch <strong>combo</strong> set to <strong>WI-FI ON/OFF</strong> (in SETTINGS › BANKS). When you turn it on with the combo, the pedal's display shows the network, the password and the address for a few seconds.</p>",
        "es": "<p>Sin nadie conectado, la radio se apaga después de <span class=\"range\">90 segundos</span>. Para recuperarla: apaga y enciende la controladora, o usa un <strong>combo</strong> de footswitches configurado con <strong>ENCENDER/APAGAR WI-FI</strong> (en CONFIGURACIÓN › BANCOS). Al encenderlo con el combo, la pantalla del pedal muestra la red, la contraseña y la dirección durante unos segundos.</p>"
       }
      },
      {
       "name": {
        "pt": "Mac: permissão de Rede local",
        "en": "Mac: Local Network permission",
        "es": "Mac: permiso de Red local"
       },
       "type": {
        "pt": "socorro",
        "en": "help",
        "es": "ayuda"
       },
       "desc": {
        "pt": "<p>No macOS 15 ou mais recente, o navegador precisa de permissão de <strong>Rede local</strong> (Ajustes do Sistema › Privacidade e Segurança › Rede local). Sem ela, o Mac entra no Wi-Fi do pedal mas a página fica carregando para sempre. No aplicativo de Mac, o sistema pede a mesma permissão na primeira vez: responda <strong>Permitir</strong>.</p>",
        "en": "<p>On macOS 15 or later, the browser needs <strong>Local Network</strong> permission (System Settings › Privacy & Security › Local Network). Without it, the Mac joins the pedal's Wi-Fi but the page keeps loading forever. In the Mac app, the system asks for the same permission the first time: answer <strong>Allow</strong>.</p>",
        "es": "<p>En macOS 15 o más reciente, el navegador necesita el permiso de <strong>Red local</strong> (Ajustes del Sistema › Privacidad y seguridad › Red local). Sin él, la Mac entra en el Wi-Fi del pedal pero la página se queda cargando para siempre. En la aplicación de Mac, el sistema pide el mismo permiso la primera vez: responde <strong>Permitir</strong>.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "A senha do Wi-Fi do pedal não é a senha da sua rede de casa e não muda.",
       "en": "The pedal's Wi-Fi password isn't your home network's password, and it never changes.",
       "es": "La contraseña del Wi-Fi del pedal no es la de tu red de casa y no cambia."
      }
     ]
    },
    {
     "id": "acesso-usb",
     "title": {
      "pt": "Pelo cabo USB (computador)",
      "en": "Over the USB cable (computer)",
      "es": "Por el cable USB (computadora)"
     },
     "purpose": {
      "pt": "No computador dá para falar com a controladora pelo cabo, sem rádio nenhum: é o caminho mais estável para mexer em muita coisa e para atualizar.",
      "en": "On a computer you can talk to the controller over the cable, with no radio at all: it's the most stable path for making lots of changes and for updating.",
      "es": "En la computadora puedes hablar con la controladora por cable, sin radio alguna: es el camino más estable para cambiar muchas cosas y para actualizar."
     },
     "howto": [
      {
       "pt": "Use o <strong>aplicativo de Mac ou de Windows</strong>, ou abra o <a href=\"https://bffx-updates.github.io/Editor_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">editor online</a> no <strong>Chrome</strong> ou no <strong>Edge</strong>.",
       "en": "Use the <strong>Mac or Windows app</strong>, or open the <a href=\"https://bffx-updates.github.io/Editor_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">online editor</a> in <strong>Chrome</strong> or <strong>Edge</strong>.",
       "es": "Usa la <strong>aplicación de Mac o de Windows</strong>, o abre el <a href=\"https://bffx-updates.github.io/Editor_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">editor online</a> en <strong>Chrome</strong> o en <strong>Edge</strong>."
      },
      {
       "pt": "Ligue o cabo USB na porta <strong>DEVICE</strong> da controladora.",
       "en": "Plug the USB cable into the controller's <strong>DEVICE</strong> port.",
       "es": "Conecta el cable USB en el puerto <strong>DEVICE</strong> de la controladora."
      },
      {
       "pt": "Na janela <strong>Conectar ao pedal</strong>, escolha <strong>USB</strong> e autorize a porta da controladora. Na primeira vez o editor recarrega a página uma vez — é normal.",
       "en": "In the <strong>Conectar ao pedal</strong> window, choose <strong>USB</strong> and authorize the controller's port. The first time, the editor reloads the page once — that's normal.",
       "es": "En la ventana <strong>Conectar ao pedal</strong>, elige <strong>USB</strong> y autoriza el puerto de la controladora. La primera vez el editor recarga la página una vez — es normal."
      }
     ],
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "Onde o cabo não existe",
        "en": "Where the cable isn't available",
        "es": "Donde el cable no está disponible"
       },
       "type": {
        "pt": "limitação",
        "en": "limitation",
        "es": "limitación"
       },
       "desc": {
        "pt": "<p>O editor aberto pelo próprio pedal (<code>192.168.4.1</code> ou <code>bfmidi.local</code>) não oferece USB — ali você já está conectado pelo Wi-Fi. O Safari também não dá acesso à porta USB, e no celular e no tablet a conexão é sempre por Wi-Fi.</p>",
        "en": "<p>The editor opened from the pedal itself (<code>192.168.4.1</code> or <code>bfmidi.local</code>) doesn't offer USB — there you're already connected over Wi-Fi. Safari doesn't give access to the USB port either, and on phones and tablets the connection is always over Wi-Fi.</p>",
        "es": "<p>El editor abierto desde el propio pedal (<code>192.168.4.1</code> o <code>bfmidi.local</code>) no ofrece USB — ahí ya estás conectado por Wi-Fi. Safari tampoco da acceso al puerto USB, y en el celular y en la tablet la conexión es siempre por Wi-Fi.</p>"
       }
      },
      {
       "name": {
        "pt": "O editor online",
        "en": "The online editor",
        "es": "El editor online"
       },
       "type": {
        "pt": "endereço",
        "en": "address",
        "es": "dirección"
       },
       "desc": {
        "pt": "<p>O endereço <code>https://bffx-updates.github.io/Editor_BFMiDi_v14/</code> funciona <strong>só pelo cabo</strong>: por ser um site seguro (https), o navegador não deixa ele falar com o Wi-Fi local do pedal.</p>",
        "en": "<p>The address <code>https://bffx-updates.github.io/Editor_BFMiDi_v14/</code> works <strong>over the cable only</strong>: because it's a secure site (https), the browser won't let it talk to the pedal over the local Wi-Fi.</p>",
        "es": "<p>La dirección <code>https://bffx-updates.github.io/Editor_BFMiDi_v14/</code> funciona <strong>solo por cable</strong>: como es un sitio seguro (https), el navegador no lo deja hablar con el pedal por el Wi-Fi local.</p>"
       }
      },
      {
       "name": {
        "pt": "Quando o cabo é melhor",
        "en": "When the cable is better",
        "es": "Cuándo conviene el cable"
       },
       "type": {
        "pt": "quando usar",
        "en": "when to use",
        "es": "cuándo usar"
       },
       "desc": {
        "pt": "<p>Wi-Fi da casa instável, muitas mudanças de uma vez, envio de muitas imagens e ícones, e sempre que for <strong>atualizar</strong> uma controladora S2 ou o USB Host.</p>",
        "en": "<p>Unstable home Wi-Fi, lots of changes at once, uploading many images and icons, and whenever you <strong>update</strong> an S2 controller or the USB Host.</p>",
        "es": "<p>Wi-Fi de casa inestable, muchos cambios a la vez, envío de muchas imágenes e íconos, y siempre que vayas a <strong>actualizar</strong> una controladora S2 o el USB Host.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Conectado pelo cabo, o primeiro botão da barra de baixo mostra <strong>USB</strong> em azul.",
       "en": "When connected over the cable, the first button on the bottom bar shows <strong>USB</strong> in blue.",
       "es": "Conectado por cable, el primer botón de la barra inferior muestra <strong>USB</strong> en azul."
      }
     ]
    },
    {
     "id": "acesso-offline",
     "title": {
      "pt": "Sem pedal: o modo offline",
      "en": "No pedal: offline mode",
      "es": "Sin pedal: el modo offline"
     },
     "purpose": {
      "pt": "Dá para abrir o editor e montar presets longe da controladora. O editor trabalha numa cópia guardada no próprio aparelho, que responde como se fosse o pedal.",
      "en": "You can open the editor and build presets away from the controller. The editor works on a copy stored on the device itself, which responds as if it were the pedal.",
      "es": "Puedes abrir el editor y armar presets lejos de la controladora. El editor trabaja sobre una copia guardada en el propio dispositivo, que responde como si fuera el pedal."
     },
     "howto": [
      {
       "pt": "Nos aplicativos, o modo offline é automático: eles abrem nele e trocam para o pedal quando o encontram.",
       "en": "In the apps, offline mode is automatic: they open in it and switch to the pedal when they find it.",
       "es": "En las aplicaciones, el modo offline es automático: abren en él y cambian al pedal cuando lo encuentran."
      },
      {
       "pt": "No navegador, escolha <strong>OFFLINE</strong> na janela <strong>Conectar ao pedal</strong>.",
       "en": "In the browser, choose <strong>OFFLINE</strong> in the <strong>Conectar ao pedal</strong> window.",
       "es": "En el navegador, elige <strong>OFFLINE</strong> en la ventana <strong>Conectar ao pedal</strong>."
      },
      {
       "pt": "Para levar o trabalho para a controladora: <strong>BACKUP › FAZER CÓPIA</strong> no modo offline, conecte no pedal e use <strong>RESTAURAR</strong> com o mesmo arquivo.",
       "en": "To bring your work to the controller: <strong>BACKUP › BACK UP</strong> in offline mode, connect to the pedal and use <strong>RESTORE</strong> with the same file.",
       "es": "Para llevar el trabajo a la controladora: <strong>BACKUP › HACER COPIA</strong> en el modo offline, conéctate al pedal y usa <strong>RESTAURAR</strong> con el mismo archivo."
      }
     ],
     "shot": "tabbar-offline",
     "mockTitle": {
      "pt": "BARRA DE BAIXO — SEM PEDAL",
      "en": "BOTTOM BAR — NO PEDAL",
      "es": "BARRA INFERIOR — SIN PEDAL"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-tabbar-conn",
       "at": "c",
       "label": {
        "pt": "indicador OFFLINE",
        "en": "OFFLINE indicator",
        "es": "indicador OFFLINE"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "O que fica guardado",
        "en": "What gets stored",
        "es": "Qué se guarda"
       },
       "type": {
        "pt": "cópia local",
        "en": "local copy",
        "es": "copia local"
       },
       "desc": {
        "pt": "<p>A cópia começa com o pacote de fábrica e guarda tudo o que você editar: presets, configurações e imagens. Ela fica <strong>só neste aparelho</strong> — não vai para a controladora sozinha.</p>",
        "en": "<p>The copy starts with the factory pack and keeps everything you edit: presets, settings and images. It stays <strong>on this device only</strong> — it doesn't go to the controller by itself.</p>",
        "es": "<p>La copia empieza con el paquete de fábrica y guarda todo lo que edites: presets, configuraciones e imágenes. Queda <strong>solo en este dispositivo</strong> — no pasa a la controladora por sí sola.</p>"
       }
      },
      {
       "name": {
        "pt": "Indicador OFFLINE",
        "en": "OFFLINE indicator",
        "es": "Indicador OFFLINE"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>O primeiro botão da barra de baixo fica com o Wi-Fi riscado em vermelho. Tocar nele abre a janela de conexão.</p>",
        "en": "<p>The first button on the bottom bar shows the Wi-Fi icon crossed out in red. Tapping it opens the connection window.</p>",
        "es": "<p>El primer botón de la barra inferior muestra el Wi-Fi tachado en rojo. Al tocarlo se abre la ventana de conexión.</p>"
       }
      },
      {
       "name": {
        "pt": "Zerar a cópia",
        "en": "Resetting the copy",
        "es": "Reiniciar la copia"
       },
       "type": {
        "pt": "manutenção",
        "en": "maintenance",
        "es": "mantenimiento"
       },
       "desc": {
        "pt": "<p>Em <strong>CONFIGURAÇÕES › RESTAURAR</strong>, o card <strong>MODO OFFLINE</strong> tem o botão <strong>ZERAR CÓPIA LOCAL</strong>: volta a cópia ao pacote de fábrica. A controladora não é tocada.</p>",
        "en": "<p>In <strong>SETTINGS › FACTORY RESET</strong>, the <strong>OFFLINE MODE</strong> card has the <strong>RESET LOCAL COPY</strong> button: it takes the copy back to the factory pack. The controller isn't touched.</p>",
        "es": "<p>En <strong>CONFIGURACIÓN › RESTAURAR</strong>, la tarjeta <strong>MODO OFFLINE</strong> tiene el botón <strong>REINICIAR COPIA LOCAL</strong>: devuelve la copia al paquete de fábrica. La controladora no se toca.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "O que depende do hardware (testes, atualização, aparelhos USB, editores de preset) fica indisponível no modo offline e diz o motivo na tela.",
       "en": "Anything that depends on the hardware (tests, updates, USB devices, preset editors) is unavailable in offline mode, and the screen says why.",
       "es": "Lo que depende del hardware (pruebas, actualización, dispositivos USB, editores de preset) no está disponible en el modo offline, y la pantalla indica el motivo."
      }
     ]
    }
   ]
  },
  {
   "id": "primeiros",
   "icon": "primeiro",
   "page": 1,
   "title": {
    "pt": "Primeiros passos",
    "en": "Getting started",
    "es": "Primeros pasos"
   },
   "summary": {
    "pt": "Os ajustes que valem a pena fazer uma vez, logo no começo, antes de montar o repertório.",
    "en": "The settings worth making once, right at the start, before you build your setlist.",
    "es": "Los ajustes que vale la pena hacer una vez, al principio, antes de armar el repertorio."
   },
   "intro": {
    "pt": "<p>A controladora sai de fábrica pronta para ligar e tocar, mas cinco minutos de ajuste no começo poupam muito trabalho depois — principalmente dizer qual é a sua placa e qual é a sua pedaleira.</p>",
    "en": "<p>The controller leaves the factory ready to plug in and play, but five minutes of setup at the start save a lot of work later — especially telling it which controller model you have and which effects unit you use.</p>",
    "es": "<p>La controladora sale de fábrica lista para encender y tocar, pero cinco minutos de ajuste al principio ahorran mucho trabajo después — sobre todo indicar cuál es tu placa y cuál es tu pedalera.</p>"
   },
   "cards": [
    {
     "id": "primeiros-checklist",
     "title": {
      "pt": "Cinco ajustes antes de tocar",
      "en": "Five settings before you play",
      "es": "Cinco ajustes antes de tocar"
     },
     "purpose": {
      "pt": "Na ordem: conferir a placa, dizer qual é o seu aparelho, montar o primeiro preset, configurar um footswitch no LIVE e escolher os seus atalhos.",
      "en": "In order: check the model, tell it which gear you use, build your first preset, set up a footswitch in LIVE and choose your shortcuts.",
      "es": "En orden: revisar el modelo, indicar cuál es tu equipo, armar el primer preset, configurar un footswitch en LIVE y elegir tus atajos."
     },
     "howto": [
      {
       "pt": "<strong>Confira o modelo</strong> em <strong>CONFIGURAÇÕES › HARDWARE</strong>. Ele tem que ser o que está escrito na sua controladora.",
       "en": "<strong>Check the model</strong> in <strong>SETTINGS › HARDWARE</strong>. It must match what's written on your controller.",
       "es": "<strong>Revisa el modelo</strong> en <strong>CONFIGURACIÓN › HARDWARE</strong>. Tiene que ser el que está escrito en tu controladora."
      },
      {
       "pt": "<strong>Diga qual é o seu aparelho</strong> em <strong>CONFIGURAÇÕES › MODO AMIGÁVEL</strong>: a partir daí os comandos aparecem pelo nome (“Delay”, “Reverb”) em vez de números.",
       "en": "<strong>Tell it which gear you use</strong> in <strong>SETTINGS › FRIENDLY MODE</strong>: from then on, commands show up by name (“Delay”, “Reverb”) instead of numbers.",
       "es": "<strong>Indica cuál es tu equipo</strong> en <strong>CONFIGURACIÓN › MODO AMIGABLE</strong>: a partir de ahí los comandos aparecen por nombre (“Delay”, “Reverb”) en lugar de números."
      },
      {
       "pt": "<strong>Monte o primeiro preset</strong>: o próximo tópico mostra o caminho.",
       "en": "<strong>Build your first preset</strong>: the next topic shows you how.",
       "es": "<strong>Arma el primer preset</strong>: el próximo tema muestra el camino."
      },
      {
       "pt": "<strong>Configure um footswitch no modo LIVE</strong>, por exemplo para ligar e desligar o drive.",
       "en": "<strong>Set up a footswitch in LIVE mode</strong>, for example to turn the drive on and off.",
       "es": "<strong>Configura un footswitch en el modo LIVE</strong>, por ejemplo para encender y apagar el drive."
      },
      {
       "pt": "<strong>Escolha os seus atalhos</strong> em <strong>CONFIGURAÇÕES › EDITOR › ATALHOS</strong>: eles aparecem como botões no card PRINCIPAL.",
       "en": "<strong>Choose your shortcuts</strong> in <strong>SETTINGS › EDITOR › SHORTCUTS</strong>: they appear as buttons on the MAIN card.",
       "es": "<strong>Elige tus atajos</strong> en <strong>CONFIGURACIÓN › EDITOR › ATAJOS</strong>: aparecen como botones en la tarjeta PRINCIPAL."
      }
     ],
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "Por que o modelo importa",
        "en": "Why the model matters",
        "es": "Por qué importa el modelo"
       },
       "type": {
        "pt": "atenção",
        "en": "attention",
        "es": "atención"
       },
       "desc": {
        "pt": "<p>O modelo diz à controladora quais pinos existem: tela, LEDs e footswitches. Modelo errado deixa a tela apagada ou footswitches sem resposta.</p><p>Nas placas <strong>S3</strong>, uma unidade zerada sobe como <strong>BFMIDI-S3 8SW+</strong>: se a sua é NANO+, MICRO ou 6SW+, troque o modelo antes de qualquer outra coisa.</p>",
        "en": "<p>The model tells the controller which pins exist: display, LEDs and footswitches. The wrong model leaves the display dark or footswitches unresponsive.</p><p>On <strong>S3</strong> boards, a blank unit starts up as <strong>BFMIDI-S3 8SW+</strong>: if yours is a NANO+, MICRO or 6SW+, change the model before anything else.</p>",
        "es": "<p>El modelo le dice a la controladora qué pines existen: pantalla, LEDs y footswitches. Un modelo equivocado deja la pantalla apagada o footswitches sin respuesta.</p><p>En las placas <strong>S3</strong>, una unidad en blanco arranca como <strong>BFMIDI-S3 8SW+</strong>: si la tuya es NANO+, MICRO o 6SW+, cambia el modelo antes que cualquier otra cosa.</p>"
       }
      },
      {
       "name": {
        "pt": "O salvamento é automático",
        "en": "Saving is automatic",
        "es": "El guardado es automático"
       },
       "type": {
        "pt": "padrão",
        "en": "default",
        "es": "predeterminado"
       },
       "desc": {
        "pt": "<p>O editor grava sozinho menos de um segundo depois de cada alteração. O botão de salvar, à direita da barra de baixo, muda de cor para mostrar o estado. Se preferir salvar na mão, desligue em <strong>CONFIGURAÇÕES › EDITOR</strong>.</p>",
        "en": "<p>The editor saves by itself less than a second after each change. The save button, on the right of the bottom bar, changes color to show the status. If you'd rather save manually, turn it off in <strong>SETTINGS › EDITOR</strong>.</p>",
        "es": "<p>El editor guarda solo menos de un segundo después de cada cambio. El botón de guardar, a la derecha de la barra inferior, cambia de color para mostrar el estado. Si prefieres guardar a mano, desactívalo en <strong>CONFIGURACIÓN › EDITOR</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Experimente sem pedal",
        "en": "Try it without a pedal",
        "es": "Pruébalo sin pedal"
       },
       "type": {
        "pt": "dica",
        "en": "tip",
        "es": "consejo"
       },
       "desc": {
        "pt": "<p>Os aplicativos abrem no modo offline: dá para conhecer o editor e montar presets antes mesmo de ligar a controladora.</p>",
        "en": "<p>The apps open in offline mode: you can get to know the editor and build presets even before turning the controller on.</p>",
        "es": "<p>Las aplicaciones abren en el modo offline: puedes conocer el editor y armar presets incluso antes de encender la controladora.</p>"
       }
      }
     ]
    }
   ]
  },
  {
   "id": "primeiro-preset",
   "icon": "preset",
   "page": 1,
   "title": {
    "pt": "Meu primeiro preset",
    "en": "My first preset",
    "es": "Mi primer preset"
   },
   "summary": {
    "pt": "O que é um preset, como dizer qual som a pedaleira deve carregar e testar com o pé.",
    "en": "What a preset is, how to tell your effects unit which sound to load, and how to test it with your foot.",
    "es": "Qué es un preset, cómo indicarle a la pedalera qué sonido cargar y cómo probarlo con el pie."
   },
   "intro": {
    "pt": "<p>Pense assim: a sua pedaleira já tem vários sons salvos; a BFMiDi é o controle remoto que, com um toque do pé, manda ela pular para o som que você quiser. Um preset da BFMiDi é um desses atalhos.</p><p>São <strong>10 bancos (A a J) com 6 presets cada</strong> — 60 atalhos no total.</p>",
    "en": "<p>Think of it this way: your effects unit already has lots of saved sounds; the BFMiDi is the remote control that, with a tap of your foot, makes it jump to the sound you want. A BFMiDi preset is one of those shortcuts.</p><p>There are <strong>10 banks (A to J) with 6 presets each</strong> — 60 shortcuts in total.</p>",
    "es": "<p>Piénsalo así: tu pedalera ya tiene varios sonidos guardados; la BFMiDi es el control remoto que, con un toque del pie, la hace saltar al sonido que quieras. Un preset de la BFMiDi es uno de esos atajos.</p><p>Son <strong>10 bancos (A a J) con 6 presets cada uno</strong> — 60 atajos en total.</p>"
   },
   "cards": [
    {
     "id": "pp-passos",
     "title": {
      "pt": "Os quatro passos",
      "en": "The four steps",
      "es": "Los cuatro pasos"
     },
     "purpose": {
      "pt": "Escolher o preset, dizer qual som ele chama, dar um nome e pisar. O salvamento é automático.",
      "en": "Choose the preset, say which sound it calls, give it a name and step on it. Saving is automatic.",
      "es": "Elegir el preset, indicar qué sonido llama, ponerle un nombre y pisar. El guardado es automático."
     },
     "howto": [
      {
       "pt": "No console, à esquerda, toque no mostrador <strong>A1</strong> para escolher o banco e numa das teclas <strong>1 a 6</strong> para escolher o preset. A controladora vai junto.",
       "en": "On the console, on the left, tap the <strong>A1</strong> readout to choose the bank and one of the keys <strong>1 to 6</strong> to choose the preset. The controller follows along.",
       "es": "En la consola, a la izquierda, toca el visor <strong>A1</strong> para elegir el banco y una de las teclas <strong>1 a 6</strong> para elegir el preset. La controladora acompaña."
      },
      {
       "pt": "No card <strong>PRINCIPAL</strong>, escolha o <strong>PC</strong> (o som da sua pedaleira) e confira o <strong>CANAL</strong>. Na dúvida, canal 1.",
       "en": "On the <strong>MAIN</strong> card, choose the <strong>PC</strong> (the sound on your effects unit) and check the <strong>CHANNEL</strong>. If in doubt, channel 1.",
       "es": "En la tarjeta <strong>PRINCIPAL</strong>, elige el <strong>PC</strong> (el sonido de tu pedalera) y revisa el <strong>CANAL</strong>. En caso de duda, canal 1."
      },
      {
       "pt": "Escreva o nome na <strong>pílula do nome</strong>, logo abaixo das teclas — é o que aparece na tela da controladora.",
       "en": "Type the name in the <strong>name pill</strong>, right below the keys — it's what shows on the controller's display.",
       "es": "Escribe el nombre en la <strong>píldora del nombre</strong>, justo debajo de las teclas — es lo que aparece en la pantalla de la controladora."
      },
      {
       "pt": "Pise no footswitch do preset: a pedaleira pula para o som escolhido.",
       "en": "Step on the preset's footswitch: your effects unit jumps to the chosen sound.",
       "es": "Pisa el footswitch del preset: la pedalera salta al sonido elegido."
      }
     ],
     "shot": "preset-tela",
     "mockTitle": {
      "pt": "TELA PRESET",
      "en": "PRESET SCREEN",
      "es": "PANTALLA PRESET"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-bank-tile",
       "label": {
        "pt": "banco",
        "en": "bank",
        "es": "banco"
       }
      },
      {
       "n": 2,
       "sel": ".bf-bank-keys",
       "label": {
        "pt": "presets 1 a 6",
        "en": "presets 1 to 6",
        "es": "presets 1 a 6"
       }
      },
      {
       "n": 3,
       "sel": ".bf-bank-name-pill",
       "label": {
        "pt": "nome",
        "en": "name",
        "es": "nombre"
       }
      },
      {
       "n": 4,
       "sel": ".bf-studio-np-pill-l.is-pc",
       "label": {
        "pt": "PC",
        "en": "PC",
        "es": "PC"
       }
      },
      {
       "n": 5,
       "sel": ".bf-studio-np-ch-row",
       "label": {
        "pt": "canal",
        "en": "channel",
        "es": "canal"
       }
      },
      {
       "n": 6,
       "sel": ".bf-save",
       "at": "c",
       "label": {
        "pt": "salvar",
        "en": "save",
        "es": "guardar"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "PC — o som da pedaleira",
        "en": "PC — the effects unit's sound",
        "es": "PC — el sonido de la pedalera"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>PC quer dizer <em>Program Change</em>: é o número do som na sua pedaleira. Com o Modo Amigável ligado, a lista mostra o nome que a pedaleira usa (por exemplo <em>A01-1</em>) em vez do número.</p><p>Acima de 127 a BFMiDi manda junto o <strong>Bank Select</strong> que cada aparelho espera — você só escolhe o som.</p>",
        "en": "<p>PC stands for <em>Program Change</em>: it's the number of the sound on your effects unit. With Friendly Mode on, the list shows the name your effects unit uses (for example <em>A01-1</em>) instead of the number.</p><p>Above 127, the BFMiDi also sends the <strong>Bank Select</strong> each device expects — you just choose the sound.</p>",
        "es": "<p>PC significa <em>Program Change</em>: es el número del sonido en tu pedalera. Con el Modo Amigable activado, la lista muestra el nombre que usa la pedalera (por ejemplo <em>A01-1</em>) en lugar del número.</p><p>Por encima de 127 la BFMiDi envía también el <strong>Bank Select</strong> que espera cada aparato — tú solo eliges el sonido.</p>"
       }
      },
      {
       "name": {
        "pt": "CANAL",
        "en": "CHANNEL",
        "es": "CANAL"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>O canal MIDI é “qual aparelho escuta”. A maioria vem no canal 1. Com mais de um aparelho na corrente, cada um fica num canal.</p><p><strong>OFF</strong> quer dizer que o preset não manda PC nenhum — útil quando ele só serve para preparar o modo LIVE.</p>",
        "en": "<p>The MIDI channel is “which device listens”. Most come set to channel 1. With more than one device in the chain, each one goes on its own channel.</p><p><strong>OFF</strong> means the preset doesn't send any PC — useful when it's only there to set up LIVE mode.</p>",
        "es": "<p>El canal MIDI es “qué aparato escucha”. La mayoría viene en el canal 1. Con más de un aparato en la cadena, cada uno va en un canal.</p><p><strong>OFF</strong> significa que el preset no envía ningún PC — útil cuando solo sirve para preparar el modo LIVE.</p>"
       }
      },
      {
       "name": {
        "pt": "Nome do preset",
        "en": "Preset name",
        "es": "Nombre del preset"
       },
       "type": {
        "pt": "texto",
        "en": "text",
        "es": "texto"
       },
       "desc": {
        "pt": "<p>Até 16 caracteres. Serve de etiqueta para a tela da controladora; a pedaleira não vê esse nome. Normalmente é o nome da música.</p>",
        "en": "<p>Up to 16 characters. It works as a label for the controller's display; your effects unit doesn't see this name. Usually it's the song's name.</p>",
        "es": "<p>Hasta 16 caracteres. Sirve de etiqueta para la pantalla de la controladora; la pedalera no ve ese nombre. Normalmente es el nombre de la canción.</p>"
       }
      },
      {
       "name": {
        "pt": "Pisou de novo e mudou de banco?",
        "en": "Stepped on it again and the bank changed?",
        "es": "¿Pisaste de nuevo y cambió el banco?"
       },
       "type": {
        "pt": "atenção",
        "en": "attention",
        "es": "atención"
       },
       "desc": {
        "pt": "<p>De fábrica, pisar outra vez no footswitch do preset que <em>já está tocando</em> sobe um banco (A1 → B1). É o <strong>RECLICK</strong>, configurável em <strong>CONFIGURAÇÕES › BANCOS › CHAMADA DE PRESETS</strong>. E segurar o footswitch do preset ativo entra no modo LIVE.</p>",
        "en": "<p>By default, stepping again on the footswitch of the preset that's <em>already playing</em> moves up one bank (A1 → B1). That's <strong>RECLICK</strong>, configurable in <strong>SETTINGS › BANKS › PRESET CALL</strong>. And holding the active preset's footswitch enters LIVE mode.</p>",
        "es": "<p>De fábrica, pisar otra vez el footswitch del preset que <em>ya está sonando</em> sube un banco (A1 → B1). Es el <strong>RECLICK</strong>, configurable en <strong>CONFIGURACIÓN › BANCOS › LLAMADA DE PRESETS</strong>. Y mantener pisado el footswitch del preset activo entra en el modo LIVE.</p>"
       }
      },
      {
       "name": {
        "pt": "Não trocou o som?",
        "en": "The sound didn't change?",
        "es": "¿No cambió el sonido?"
       },
       "type": {
        "pt": "socorro",
        "en": "help",
        "es": "ayuda"
       },
       "desc": {
        "pt": "<p>Confira nesta ordem: (1) o cabo vai da BFMiDi para a pedaleira (MIDI OUT → MIDI IN); (2) o canal do preset é o que a pedaleira escuta; (3) o PC existe na pedaleira.</p><p>Ainda nada? Use o <strong>DISPARO MIDI</strong> em <strong>CONFIGURAÇÕES › TESTES</strong>: ele manda um comando na hora e mostra se a pedaleira responde.</p>",
        "en": "<p>Check in this order: (1) the cable goes from the BFMiDi to the effects unit (MIDI OUT → MIDI IN); (2) the preset's channel is the one the effects unit listens to; (3) the PC exists on the effects unit.</p><p>Still nothing? Use <strong>MIDI SEND</strong> in <strong>SETTINGS › TESTS</strong>: it sends a command right away and shows whether the effects unit responds.</p>",
        "es": "<p>Revisa en este orden: (1) el cable va de la BFMiDi a la pedalera (MIDI OUT → MIDI IN); (2) el canal del preset es el que escucha la pedalera; (3) el PC existe en la pedalera.</p><p>¿Todavía nada? Usa el <strong>DISPARO MIDI</strong> en <strong>CONFIGURACIÓN › PRUEBAS</strong>: envía un comando al instante y muestra si la pedalera responde.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "O botão de salvar (o disquete, à direita da barra de baixo) fica verde quando tudo está gravado.",
       "en": "The save button (the floppy disk, on the right of the bottom bar) turns green when everything is saved.",
       "es": "El botón de guardar (el disquete, a la derecha de la barra inferior) se pone verde cuando todo está guardado."
      },
      {
       "pt": "Repita para os presets 2, 3, 4… e depois para os outros bancos. Um banco costuma ser um show; um preset, uma música.",
       "en": "Repeat for presets 2, 3, 4… and then for the other banks. A bank is usually a show; a preset, a song.",
       "es": "Repite con los presets 2, 3, 4… y después con los otros bancos. Un banco suele ser un show; un preset, una canción."
      }
     ]
    }
   ]
  },
  {
   "id": "conexoes",
   "icon": "plug",
   "page": 1,
   "title": {
    "pt": "Hardware",
    "en": "Hardware",
    "es": "Hardware"
   },
   "summary": {
    "pt": "As conexões físicas de cada modelo: portas USB, MIDI, expressão, footswitches externos e alimentação.",
    "en": "Each model's physical connections: USB and MIDI ports, expression, external footswitches and power.",
    "es": "Las conexiones físicas de cada modelo: puertos USB, MIDI, expresión, footswitches externos y alimentación."
   },
   "cards": [
    {
     "id": "conexoes-fisicas",
     "title": {
      "pt": "O que liga onde",
      "en": "What plugs in where",
      "es": "Qué se conecta dónde"
     },
     "mockType": "connections-hardware",
     "mockTitle": {
      "pt": "CONEXÕES FÍSICAS",
      "en": "PHYSICAL CONNECTIONS",
      "es": "CONEXIONES FÍSICAS"
     },
     "purpose": {
      "pt": "Escolha a família e o modelo da sua controladora para ver o painel e as portas. As portas variam conforme a versão.",
      "en": "Choose your controller's family and model to see its panel and ports. The ports vary by version.",
      "es": "Elige la familia y el modelo de tu controladora para ver el panel y los puertos. Los puertos varían según la versión."
     },
     "fields": [
      {
       "name": {
        "pt": "Modelo da controladora",
        "en": "Controller model",
        "es": "Modelo de la controladora"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>Escolha a família e a variante da sua BFMiDi. A família <strong>S3</strong> é a linha atual, com processador novo e mais memória para imagens e ícones: <strong>8SW+</strong>, <strong>NANO+</strong>, <strong>MICRO</strong> e <strong>6SW+</strong>.</p><p>No editor, o mesmo seletor fica em <strong>CONFIGURAÇÕES › HARDWARE</strong>, e ele só oferece os modelos do processador do pedal conectado.</p>",
        "en": "<p>Choose your BFMiDi's family and variant. The <strong>S3</strong> family is the current line, with a new processor and more memory for images and icons: <strong>8SW+</strong>, <strong>NANO+</strong>, <strong>MICRO</strong> and <strong>6SW+</strong>.</p><p>In the editor, the same selector is in <strong>SETTINGS › HARDWARE</strong>, and it only offers the models for the processor of the connected pedal.</p>",
        "es": "<p>Elige la familia y la variante de tu BFMiDi. La familia <strong>S3</strong> es la línea actual, con procesador nuevo y más memoria para imágenes e íconos: <strong>8SW+</strong>, <strong>NANO+</strong>, <strong>MICRO</strong> y <strong>6SW+</strong>.</p><p>En el editor, el mismo selector está en <strong>CONFIGURACIÓN › HARDWARE</strong>, y solo ofrece los modelos del procesador del pedal conectado.</p>"
       }
      },
      {
       "name": {
        "pt": "Vista de cima",
        "en": "Top view",
        "es": "Vista superior"
       },
       "type": {
        "pt": "imagem",
        "en": "image",
        "es": "imagen"
       },
       "desc": {
        "pt": "<p>A posição dos footswitches (1 a 6, LIVE e GLOBAL, quando existem), da tela e dos rótulos das portas.</p>",
        "en": "<p>Where the footswitches (1 to 6, LIVE and GLOBAL, when present), the display and the port labels are.</p>",
        "es": "<p>La posición de los footswitches (1 a 6, LIVE y GLOBAL, cuando existen), de la pantalla y de las etiquetas de los puertos.</p>"
       }
      },
      {
       "name": {
        "pt": "Vista de trás",
        "en": "Rear view",
        "es": "Vista trasera"
       },
       "type": {
        "pt": "imagem",
        "en": "image",
        "es": "imagen"
       },
       "desc": {
        "pt": "<p>O painel com as portas físicas daquele modelo. Cada tipo de porta está explicado nos itens abaixo.</p>",
        "en": "<p>The panel with that model's physical ports. Each port type is explained in the items below.</p>",
        "es": "<p>El panel con los puertos físicos de ese modelo. Cada tipo de puerto se explica en los puntos de abajo.</p>"
       }
      },
      {
       "name": {
        "pt": "USB DEVICE",
        "en": "USB DEVICE",
        "es": "USB DEVICE"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>A porta USB principal. Ligada no computador, a controladora aparece como aparelho MIDI USB, abre o editor pelo cabo e recebe atualizações. Ligada na porta USB de um <strong>Kemper Player</strong>, é por ela que funcionam o nome do rig, o afinador e o editor do Kemper.</p><p>Nas placas S3 ela é USB-B (o conector quadrado).</p>",
        "en": "<p>The main USB port. Plugged into a computer, the controller shows up as a USB MIDI device, opens the editor over the cable and receives updates. Plugged into the USB port of a <strong>Kemper Player</strong>, it's what makes the rig name, the tuner and the Kemper editor work.</p><p>On S3 boards it's USB-B (the square connector).</p>",
        "es": "<p>El puerto USB principal. Conectada a la computadora, la controladora aparece como dispositivo MIDI USB, abre el editor por cable y recibe actualizaciones. Conectada al puerto USB de un <strong>Kemper Player</strong>, es por él que funcionan el nombre del rig, el afinador y el editor del Kemper.</p><p>En las placas S3 es USB-B (el conector cuadrado).</p>"
       }
      },
      {
       "name": {
        "pt": "USB HOST",
        "en": "USB HOST",
        "es": "USB HOST"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>O inverso da DEVICE: aqui você pluga aparelhos <em>na</em> controladora — pedaleiras USB como a Valeton GP-5, a IK TONEX ONE e a Neural DSP Nano Cortex, teclados MIDI, outra BFMiDi.</p><p>Nas BFMIDI-3 e S3 ela reconhece sozinha o que foi plugado e ainda traz o <strong>Bluetooth</strong>. Configuração em <strong>CONFIGURAÇÕES › HOST</strong>.</p>",
        "en": "<p>The opposite of DEVICE: here you plug devices <em>into</em> the controller — USB effects units like the Valeton GP-5, the IK TONEX ONE and the Neural DSP Nano Cortex, MIDI keyboards, another BFMiDi.</p><p>On the BFMIDI-3 and S3, it recognizes what was plugged in by itself and also includes <strong>Bluetooth</strong>. Setup in <strong>SETTINGS › HOST</strong>.</p>",
        "es": "<p>Lo contrario de DEVICE: aquí conectas aparatos <em>a</em> la controladora — pedaleras USB como la Valeton GP-5, la IK TONEX ONE y la Neural DSP Nano Cortex, teclados MIDI, otra BFMiDi.</p><p>En las BFMIDI-3 y S3 reconoce sola lo que se conectó y además trae <strong>Bluetooth</strong>. Configuración en <strong>CONFIGURACIÓN › HOST</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "MIDI TRS e MIDI DIN5",
        "en": "MIDI TRS and MIDI DIN5",
        "es": "MIDI TRS y MIDI DIN5"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>Saídas MIDI para pedaleiras e equipamentos tradicionais: minijack (TRS) e o clássico conector de 5 pinos. As duas levam o mesmo sinal — use o cabo ou adaptador do seu aparelho.</p>",
        "en": "<p>MIDI outputs for effects units and traditional gear: a mini jack (TRS) and the classic 5-pin connector. Both carry the same signal — use the cable or adapter that fits your device.</p>",
        "es": "<p>Salidas MIDI para pedaleras y equipos tradicionales: minijack (TRS) y el clásico conector de 5 pines. Las dos llevan la misma señal — usa el cable o adaptador de tu aparato.</p>"
       }
      },
      {
       "name": {
        "pt": "EXP (pedal de expressão)",
        "en": "EXP (expression pedal)",
        "es": "EXP (pedal de expresión)"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>Nos modelos “+”. Entrada para um pedal de expressão (TRS): o movimento vira um CC contínuo. Configuração, calibração e faixa de saída em <strong>CONFIGURAÇÕES › FOOTSWITCHES</strong>.</p>",
        "en": "<p>On the “+” models. Input for an expression pedal (TRS): the movement becomes a continuous CC. Setup, calibration and output range in <strong>SETTINGS › FOOTSWITCHES</strong>.</p>",
        "es": "<p>En los modelos “+”. Entrada para un pedal de expresión (TRS): el movimiento se convierte en un CC continuo. Configuración, calibración y rango de salida en <strong>CONFIGURACIÓN › FOOTSWITCHES</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "2SW (dois footswitches externos)",
        "en": "2SW (two external footswitches)",
        "es": "2SW (dos footswitches externos)"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>Nos modelos “+”. Entrada para um pedal duplo (dois footswitches simples, sem LED). Cada botão ganha uma função própria em <strong>CONFIGURAÇÕES › FOOTSWITCHES</strong>, e pode ter um indicador na tela.</p>",
        "en": "<p>On the “+” models. Input for a dual pedal (two simple footswitches, no LEDs). Each button gets its own function in <strong>SETTINGS › FOOTSWITCHES</strong>, and can have an indicator on the display.</p>",
        "es": "<p>En los modelos “+”. Entrada para un pedal doble (dos footswitches simples, sin LED). Cada botón recibe su propia función en <strong>CONFIGURACIÓN › FOOTSWITCHES</strong>, y puede tener un indicador en la pantalla.</p>"
       }
      },
      {
       "name": {
        "pt": "9V (alimentação)",
        "en": "9V (power)",
        "es": "9V (alimentación)"
       },
       "type": {
        "pt": "porta",
        "en": "port",
        "es": "puerto"
       },
       "desc": {
        "pt": "<p>Fonte de 9 V de pedal (centro negativo). A fonte é obrigatória para atualizar o USB Host, porque nessa hora o cabo USB sai da porta DEVICE.</p>",
        "en": "<p>A standard 9 V pedal power supply (center negative). The power supply is required to update the USB Host, because at that point the USB cable comes out of the DEVICE port.</p>",
        "es": "<p>Fuente de 9 V de pedal (centro negativo). La fuente es obligatoria para actualizar el USB Host, porque en ese momento el cable USB sale del puerto DEVICE.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "As portas variam por modelo: USB HOST com Bluetooth nas BFMIDI-3 e S3; EXP e 2SW só nas variantes “+”.",
       "en": "Ports vary by model: USB HOST with Bluetooth on the BFMIDI-3 and S3; EXP and 2SW only on the “+” variants.",
       "es": "Los puertos varían según el modelo: USB HOST con Bluetooth en las BFMIDI-3 y S3; EXP y 2SW solo en las variantes “+”."
      }
     ]
    }
   ]
  },
  {
   "id": "tela-editor",
   "icon": "preset",
   "page": 2,
   "title": {
    "pt": "A tela do editor",
    "en": "The editor screen",
    "es": "La pantalla del editor"
   },
   "summary": {
    "pt": "O console onde você escolhe banco e preset, o card PRINCIPAL com o que o preset manda, a tela do pedal e a barra de baixo.",
    "en": "The console where you pick the bank and preset, the MAIN card with what the preset sends, the pedal screen and the bottom bar.",
    "es": "La consola donde eliges banco y preset, la tarjeta PRINCIPAL con lo que envía el preset, la pantalla del pedal y la barra inferior."
   },
   "intro": {
    "pt": "<p>É a tela onde você passa a maior parte do tempo. No computador ela tem três colunas lado a lado; no celular as mesmas peças aparecem uma embaixo da outra, e a tela do pedal fica atrás do botão <strong>DISPLAY</strong>.</p>",
    "en": "<p>This is where you'll spend most of your time. On a computer it has three columns side by side; on a phone the same pieces are stacked one below the other, and the pedal screen sits behind the <strong>DISPLAY</strong> button.</p>",
    "es": "<p>Es la pantalla donde pasas la mayor parte del tiempo. En la computadora tiene tres columnas lado a lado; en el celular las mismas piezas aparecen una debajo de otra, y la pantalla del pedal queda detrás del botón <strong>DISPLAY</strong>.</p>"
   },
   "cards": [
    {
     "id": "tela-geral",
     "title": {
      "pt": "Visão geral (computador e tablet)",
      "en": "Overview (computer and tablet)",
      "es": "Vista general (computadora y tablet)"
     },
     "purpose": {
      "pt": "A partir de uma janela larga — computador, apps de Mac e Windows, tablet deitado — o editor mostra três colunas: o console, o card do meio e a tela do pedal.",
      "en": "In a wide window — a computer, the Mac and Windows apps, a tablet in landscape — the editor shows three columns: the console, the middle card and the pedal screen.",
      "es": "En una ventana ancha — computadora, apps de Mac y Windows, tablet en horizontal — el editor muestra tres columnas: la consola, la tarjeta del medio y la pantalla del pedal."
     },
     "shot": "preset-tela",
     "mockTitle": {
      "pt": "TELA PRESET — COMPUTADOR",
      "en": "PRESET SCREEN — COMPUTER",
      "es": "PANTALLA PRESET — COMPUTADORA"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-bank-console",
       "label": {
        "pt": "console",
        "en": "console",
        "es": "consola"
       }
      },
      {
       "n": 2,
       "sel": ".bf-swlist",
       "label": {
        "pt": "lista dos footswitches",
        "en": "footswitch list",
        "es": "lista de footswitches"
       }
      },
      {
       "n": 3,
       "sel": ".bf-bank-center-stack",
       "label": {
        "pt": "card PRINCIPAL",
        "en": "MAIN card",
        "es": "tarjeta PRINCIPAL"
       }
      },
      {
       "n": 4,
       "sel": ".bf-bank-slot-display",
       "label": {
        "pt": "tela do pedal",
        "en": "pedal screen",
        "es": "pantalla del pedal"
       }
      },
      {
       "n": 5,
       "sel": ".bf-tabbar",
       "label": {
        "pt": "barra de baixo",
        "en": "bottom bar",
        "es": "barra inferior"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Coluna 1 — o console",
        "en": "Column 1 — the console",
        "es": "Columna 1 — la consola"
       },
       "type": {
        "pt": "navegação",
        "en": "navigation",
        "es": "navegación"
       },
       "desc": {
        "pt": "<p>O mostrador do banco, as teclas dos seis presets, o nome do preset e a barra <strong>PRESET | LIVE | LAYER</strong>.</p>",
        "en": "<p>The bank readout, the keys for the six presets, the preset name and the <strong>PRESET | LIVE | LAYER</strong> bar.</p>",
        "es": "<p>El visor del banco, las teclas de los seis presets, el nombre del preset y la barra <strong>PRESET | LIVE | LAYER</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "A lista dos footswitches",
        "en": "The footswitch list",
        "es": "La lista de footswitches"
       },
       "type": {
        "pt": "resumo",
        "en": "summary",
        "es": "resumen"
       },
       "desc": {
        "pt": "<p>Só no computador: uma linha por footswitch com o ícone que ele mostra na tela, o modo, o comando MIDI (com o nome amigável) e o canal. A barra colorida é a cor do LED.</p><p>Tocar numa linha leva direto ao modo LIVE, com aquele footswitch aberto para editar.</p>",
        "en": "<p>Computer only: one row per footswitch with the icon it shows on the screen, the mode, the MIDI command (with its friendly name) and the channel. The colored bar is the LED color.</p><p>Tapping a row takes you straight to LIVE mode, with that footswitch open for editing.</p>",
        "es": "<p>Solo en la computadora: una fila por footswitch con el ícono que muestra en la pantalla, el modo, el comando MIDI (con su nombre amigable) y el canal. La barra de color es el color del LED.</p><p>Tocar una fila te lleva directo al modo LIVE, con ese footswitch abierto para editar.</p>"
       }
      },
      {
       "name": {
        "pt": "Coluna 2 — o card do meio",
        "en": "Column 2 — the middle card",
        "es": "Columna 2 — la tarjeta del medio"
       },
       "type": {
        "pt": "edição",
        "en": "editing",
        "es": "edición"
       },
       "desc": {
        "pt": "<p>No modo PRESET é o card <strong>PRINCIPAL</strong> (o que o preset manda e os atalhos). No modo LIVE vira o card do footswitch escolhido.</p>",
        "en": "<p>In PRESET mode it's the <strong>MAIN</strong> card (what the preset sends, plus the shortcuts). In LIVE mode it becomes the card for the selected footswitch.</p>",
        "es": "<p>En el modo PRESET es la tarjeta <strong>PRINCIPAL</strong> (lo que envía el preset y los atajos). En el modo LIVE pasa a ser la tarjeta del footswitch elegido.</p>"
       }
      },
      {
       "name": {
        "pt": "Coluna 3 — a tela do pedal",
        "en": "Column 3 — the pedal screen",
        "es": "Columna 3 — la pantalla del pedal"
       },
       "type": {
        "pt": "visual",
        "en": "visual",
        "es": "visual"
       },
       "desc": {
        "pt": "<p>A prévia fiel do que a controladora vai mostrar, com os ajustes de aparência logo abaixo. Quando você abre um atalho do card PRINCIPAL, a configuração aparece aqui, sem sair da tela.</p>",
        "en": "<p>An accurate preview of what the controller will show, with the appearance settings right below it. When you open a shortcut from the MAIN card, its settings appear here, without leaving the screen.</p>",
        "es": "<p>La vista previa fiel de lo que mostrará la controladora, con los ajustes de apariencia justo debajo. Cuando abres un atajo de la tarjeta PRINCIPAL, la configuración aparece aquí, sin salir de la pantalla.</p>"
       }
      },
      {
       "name": {
        "pt": "Barra de baixo",
        "en": "Bottom bar",
        "es": "Barra inferior"
       },
       "type": {
        "pt": "navegação",
        "en": "navigation",
        "es": "navegación"
       },
       "desc": {
        "pt": "<p>Conexão, configurações, início, copiar/colar e salvar. Detalhes no card <strong>A barra de baixo</strong>.</p>",
        "en": "<p>Connection, settings, home, copy/paste and save. Details in the card <strong>The bottom bar</strong>.</p>",
        "es": "<p>Conexión, configuración, inicio, copiar/pegar y guardar. Detalles en la tarjeta <strong>La barra inferior</strong>.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Os prints deste manual são da tela real do editor na versão 14.5. Toque num print para vê-lo em tamanho real.",
       "en": "The screenshots in this manual come from the real editor screen in version 14.5. Tap a screenshot to see it at full size.",
       "es": "Las capturas de este manual son de la pantalla real del editor en la versión 14.5. Toca una captura para verla en tamaño real."
      }
     ]
    },
    {
     "id": "tela-celular",
     "title": {
      "pt": "No celular",
      "en": "On a phone",
      "es": "En el celular"
     },
     "purpose": {
      "pt": "No celular as peças vêm empilhadas: o console em cima e o card PRINCIPAL embaixo. Os dois discos no alto do card trocam entre a configuração e a tela do pedal.",
      "en": "On a phone the pieces are stacked: the console on top and the MAIN card below. The two round buttons at the top of the card switch between the settings and the pedal screen.",
      "es": "En el celular las piezas vienen apiladas: la consola arriba y la tarjeta PRINCIPAL abajo. Los dos botones redondos de arriba de la tarjeta alternan entre la configuración y la pantalla del pedal."
     },
     "shot": "phone-preset",
     "mockTitle": {
      "pt": "TELA PRESET — CELULAR",
      "en": "PRESET SCREEN — PHONE",
      "es": "PANTALLA PRESET — CELULAR"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-bank-console",
       "label": {
        "pt": "console",
        "en": "console",
        "es": "consola"
       }
      },
      {
       "n": 2,
       "sel": ".bf-studio-np-headbar",
       "at": "tr",
       "label": {
        "pt": "CONFIG e DISPLAY",
        "en": "CONFIG and DISPLAY",
        "es": "CONFIG y DISPLAY"
       }
      },
      {
       "n": 3,
       "sel": ".bf-np-shortcuts",
       "label": {
        "pt": "atalhos",
        "en": "shortcuts",
        "es": "atajos"
       }
      },
      {
       "n": 4,
       "sel": ".bf-tabbar",
       "label": {
        "pt": "barra de baixo",
        "en": "bottom bar",
        "es": "barra inferior"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "CONFIG e DISPLAY",
        "en": "CONFIG and DISPLAY",
        "es": "CONFIG y DISPLAY"
       },
       "type": {
        "pt": "discos",
        "en": "round buttons",
        "es": "botones redondos"
       },
       "desc": {
        "pt": "<p><strong>CONFIG</strong> mostra o que o preset manda (PC, canal, extras) e os atalhos. <strong>DISPLAY</strong> troca o conteúdo do card pela prévia da tela do pedal; o botão <strong>CONFIGS</strong> embaixo da prévia abre a janela com posição do nome, layout, fonte e cores.</p>",
        "en": "<p><strong>CONFIG</strong> shows what the preset sends (PC, channel, extras) and the shortcuts. <strong>DISPLAY</strong> replaces the card's content with the preview of the pedal screen; the <strong>SETTINGS</strong> button below the preview opens the window with the name position, layout, font and colors.</p>",
        "es": "<p><strong>CONFIG</strong> muestra lo que envía el preset (PC, canal, extras) y los atajos. <strong>DISPLAY</strong> cambia el contenido de la tarjeta por la vista previa de la pantalla del pedal; el botón <strong>AJUSTES</strong> debajo de la vista previa abre la ventana con la posición del nombre, el layout, la fuente y los colores.</p>"
       }
      },
      {
       "name": {
        "pt": "No modo LIVE",
        "en": "In LIVE mode",
        "es": "En el modo LIVE"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>O card do footswitch tem os mesmos dois discos: um para a configuração do modo, outro para a aparência do ícone na tela.</p>",
        "en": "<p>The footswitch card has the same two round buttons: one for the mode settings, the other for how the icon looks on the screen.</p>",
        "es": "<p>La tarjeta del footswitch tiene los mismos dos botones redondos: uno para la configuración del modo y otro para la apariencia del ícono en la pantalla.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-console",
     "title": {
      "pt": "O console: banco, preset, nome e modo",
      "en": "The console: bank, preset, name and mode",
      "es": "La consola: banco, preset, nombre y modo"
     },
     "purpose": {
      "pt": "O console é o mapa da controladora: dez bancos, seis presets em cada um. É por ele que você anda pelo repertório e troca entre PRESET e LIVE.",
      "en": "The console is the controller's map: ten banks, six presets in each. It's how you move through your setlist and switch between PRESET and LIVE.",
      "es": "La consola es el mapa de la controladora: diez bancos, seis presets en cada uno. Con ella recorres tu repertorio y cambias entre PRESET y LIVE."
     },
     "howto": [
      {
       "pt": "Toque no mostrador <strong>A1 · SET BANK</strong> para escolher outro banco.",
       "en": "Tap the <strong>A1 · SET BANK</strong> readout to pick another bank.",
       "es": "Toca el visor <strong>A1 · SET BANK</strong> para elegir otro banco."
      },
      {
       "pt": "Toque numa das teclas <strong>1 a 6</strong> para escolher o preset. A controladora vai junto.",
       "en": "Tap one of the <strong>1 to 6</strong> keys to pick the preset. The controller follows along.",
       "es": "Toca una de las teclas <strong>1 a 6</strong> para elegir el preset. La controladora cambia junto."
      },
      {
       "pt": "Use a barra de baixo do console para trocar entre <strong>PRESET</strong> e <strong>LIVE</strong>.",
       "en": "Use the bar at the bottom of the console to switch between <strong>PRESET</strong> and <strong>LIVE</strong>.",
       "es": "Usa la barra de abajo de la consola para cambiar entre <strong>PRESET</strong> y <strong>LIVE</strong>."
      }
     ],
     "shot": "preset-console",
     "mockTitle": {
      "pt": "CONSOLE",
      "en": "CONSOLE",
      "es": "CONSOLA"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-bank-tile",
       "label": {
        "pt": "banco",
        "en": "bank",
        "es": "banco"
       }
      },
      {
       "n": 2,
       "sel": ".bf-bank-keys",
       "label": {
        "pt": "presets",
        "en": "presets",
        "es": "presets"
       }
      },
      {
       "n": 3,
       "sel": ".bf-bank-name-pill",
       "label": {
        "pt": "nome",
        "en": "name",
        "es": "nombre"
       }
      },
      {
       "n": 4,
       "sel": ".bf-mobile-home-mode",
       "label": {
        "pt": "PRESET | LIVE",
        "en": "PRESET | LIVE",
        "es": "PRESET | LIVE"
       }
      },
      {
       "n": 5,
       "sel": ".bf-mobile-home-layer",
       "label": {
        "pt": "layer",
        "en": "layer",
        "es": "layer"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "O mostrador",
        "en": "The readout",
        "es": "El visor"
       },
       "type": {
        "pt": "banco",
        "en": "bank",
        "es": "banco"
       },
       "desc": {
        "pt": "<p>Mostra o banco e o preset ativos (A1). Tocar abre <strong>ESCOLHER BANCO</strong>, a grade com as dez letras. Bancos desligados em <strong>CONFIGURAÇÕES › BANCOS</strong> aparecem apagados.</p><p>No modo LIVE o mostrador vira <strong>FX · SWITCH n</strong> e as teclas escolhem o footswitch que você está editando.</p>",
        "en": "<p>Shows the active bank and preset (A1). Tapping it opens <strong>CHOOSE BANK</strong>, the grid with the ten letters. Banks turned off in <strong>SETTINGS › BANKS</strong> appear dimmed.</p><p>In LIVE mode the readout becomes <strong>FX · SWITCH n</strong> and the keys pick the footswitch you're editing.</p>",
        "es": "<p>Muestra el banco y el preset activos (A1). Al tocarlo se abre <strong>ELEGIR BANCO</strong>, la cuadrícula con las diez letras. Los bancos desactivados en <strong>CONFIGURACIÓN › BANCOS</strong> aparecen apagados.</p><p>En el modo LIVE el visor pasa a <strong>FX · SWITCH n</strong> y las teclas eligen el footswitch que estás editando.</p>"
       }
      },
      {
       "name": {
        "pt": "As teclas 1 a 6",
        "en": "Keys 1 to 6",
        "es": "Las teclas 1 a 6"
       },
       "type": {
        "pt": "preset",
        "en": "preset",
        "es": "preset"
       },
       "desc": {
        "pt": "<p>A tecla acesa é o preset em edição — e o que a controladora está tocando. Nas placas de quatro footswitches as teclas 5 e 6 ficam apagadas: esses presets existem na memória, mas o pé não os alcança.</p>",
        "en": "<p>The lit key is the preset you're editing — and the one the controller is playing. On four-footswitch boards keys 5 and 6 stay dimmed: those presets exist in memory, but your foot can't reach them.</p>",
        "es": "<p>La tecla encendida es el preset en edición — y el que está sonando en la controladora. En las placas de cuatro footswitches las teclas 5 y 6 quedan apagadas: esos presets existen en la memoria, pero el pie no los alcanza.</p>"
       }
      },
      {
       "name": {
        "pt": "A pílula do nome",
        "en": "The name pill",
        "es": "La píldora del nombre"
       },
       "type": {
        "pt": "texto",
        "en": "text",
        "es": "texto"
       },
       "desc": {
        "pt": "<p>É o campo do nome do preset (até 16 caracteres) — toque e escreva.</p>",
        "en": "<p>This is the preset name field (up to 16 characters) — tap it and type.</p>",
        "es": "<p>Es el campo del nombre del preset (hasta 16 caracteres) — tócalo y escribe.</p>"
       }
      },
      {
       "name": {
        "pt": "PRESET | LIVE",
        "en": "PRESET | LIVE",
        "es": "PRESET | LIVE"
       },
       "type": {
        "pt": "modo",
        "en": "mode",
        "es": "modo"
       },
       "desc": {
        "pt": "<p>A chave mais importante da tela. Em <strong>PRESET</strong> você edita o que o preset chama; em <strong>LIVE</strong>, o que cada footswitch faz dentro dele. A chave troca o modo da controladora de verdade, e o pedal muda de tela junto.</p>",
        "en": "<p>The most important switch on the screen. In <strong>PRESET</strong> you edit what the preset calls up; in <strong>LIVE</strong>, what each footswitch does inside it. The switch really changes the controller's mode, and the pedal changes screens along with it.</p>",
        "es": "<p>El interruptor más importante de la pantalla. En <strong>PRESET</strong> editas lo que el preset llama; en <strong>LIVE</strong>, lo que hace cada footswitch dentro de él. El interruptor cambia de verdad el modo de la controladora, y el pedal cambia de pantalla junto.</p>"
       }
      },
      {
       "name": {
        "pt": "SINGLE LAYER / DUAL LAYER",
        "en": "SINGLE LAYER / DUAL LAYER",
        "es": "SINGLE LAYER / DUAL LAYER"
       },
       "type": {
        "pt": "layer",
        "en": "layer",
        "es": "layer"
       },
       "desc": {
        "pt": "<p>No modo PRESET, liga ou desliga a <strong>segunda camada</strong> de funções do LIVE neste preset (os seis pés ganham uma segunda página). No modo LIVE, o mesmo botão vira <strong>LAYER 1 / LAYER 2</strong> e escolhe qual camada você está editando.</p>",
        "en": "<p>In PRESET mode, it turns the <strong>second layer</strong> of LIVE functions on or off for this preset (the six footswitches get a second page). In LIVE mode, the same button becomes <strong>LAYER 1 / LAYER 2</strong> and picks which layer you're editing.</p>",
        "es": "<p>En el modo PRESET, activa o desactiva la <strong>segunda capa</strong> de funciones del LIVE en este preset (los seis footswitches ganan una segunda página). En el modo LIVE, el mismo botón pasa a <strong>LAYER 1 / LAYER 2</strong> y elige qué capa estás editando.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-bancos",
     "title": {
      "pt": "Escolher o banco",
      "en": "Choosing the bank",
      "es": "Elegir el banco"
     },
     "purpose": {
      "pt": "A grade com as dez letras abre ao tocar no mostrador. Um toque na letra leva direto ao banco, sem passar pelos do meio.",
      "en": "The grid with the ten letters opens when you tap the readout. One tap on a letter takes you straight to that bank, without stepping through the ones in between.",
      "es": "La cuadrícula con las diez letras se abre al tocar el visor. Un toque en la letra te lleva directo al banco, sin pasar por los del medio."
     },
     "shot": "preset-bancos",
     "mockTitle": {
      "pt": "ESCOLHER BANCO",
      "en": "CHOOSE BANK",
      "es": "ELEGIR BANCO"
     },
     "fields": [
      {
       "name": {
        "pt": "Letras apagadas",
        "en": "Dimmed letters",
        "es": "Letras apagadas"
       },
       "type": {
        "pt": "bancos desligados",
        "en": "banks turned off",
        "es": "bancos desactivados"
       },
       "desc": {
        "pt": "<p>São os bancos desligados em <strong>CONFIGURAÇÕES › BANCOS › BANCOS ATIVOS</strong>. Desligar os que você não usa faz a navegação pelo pé pular direto por cima deles.</p>",
        "en": "<p>These are the banks turned off in <strong>SETTINGS › BANKS › ACTIVE BANKS</strong>. Turning off the ones you don't use makes footswitch navigation skip right over them.</p>",
        "es": "<p>Son los bancos desactivados en <strong>CONFIGURACIÓN › BANCOS › BANCOS ACTIVOS</strong>. Desactivar los que no usas hace que la navegación con el pie los salte directamente.</p>"
       }
      },
      {
       "name": {
        "pt": "Bancos e repertório",
        "en": "Banks and setlist",
        "es": "Bancos y repertorio"
       },
       "type": {
        "pt": "dica",
        "en": "tip",
        "es": "consejo"
       },
       "desc": {
        "pt": "<p>Um banco costuma ser um show, um set ou uma banda; os seis presets dentro dele, as músicas.</p>",
        "en": "<p>A bank is usually a show, a set or a band; the six presets inside it, the songs.</p>",
        "es": "<p>Un banco suele ser un show, un set o una banda; los seis presets dentro de él, las canciones.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-principal",
     "title": {
      "pt": "O card PRINCIPAL",
      "en": "The MAIN card",
      "es": "La tarjeta PRINCIPAL"
     },
     "purpose": {
      "pt": "O que o preset manda quando é chamado — PC, canal e envios extras — e a fileira de atalhos para o resto do editor.",
      "en": "What the preset sends when it's called up — PC, channel and extra messages — and the row of shortcuts to the rest of the editor.",
      "es": "Lo que envía el preset cuando se llama — PC, canal y envíos extra — y la fila de atajos al resto del editor."
     },
     "shot": "preset-principal",
     "mockTitle": {
      "pt": "CARD PRINCIPAL",
      "en": "MAIN CARD",
      "es": "TARJETA PRINCIPAL"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-studio-np-pill-l.is-pc",
       "label": {
        "pt": "PC",
        "en": "PC",
        "es": "PC"
       }
      },
      {
       "n": 2,
       "sel": ".bf-studio-np-ch-row",
       "label": {
        "pt": "CANAL",
        "en": "CHANNEL",
        "es": "CANAL"
       }
      },
      {
       "n": 3,
       "sel": ".bf-studio-np-extras-btn",
       "at": "tr",
       "label": {
        "pt": "EXTRAS",
        "en": "EXTRAS",
        "es": "EXTRAS"
       }
      },
      {
       "n": 4,
       "sel": ".bf-np-shortcut.is-accent",
       "label": {
        "pt": "MODO PALCO",
        "en": "STAGE MODE",
        "es": "MODO ESCENARIO"
       }
      },
      {
       "n": 5,
       "sel": ".bf-np-shortcut.is-device",
       "label": {
        "pt": "editores dos aparelhos",
        "en": "device editors",
        "es": "editores de los equipos"
       }
      },
      {
       "n": 6,
       "sel": ".bf-np-shortcut:not(.is-accent):not(.is-device)",
       "label": {
        "pt": "atalhos",
        "en": "shortcuts",
        "es": "atajos"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "PC",
        "en": "PC",
        "es": "PC"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>O som que a pedaleira carrega quando o preset é chamado. Vai até 600: acima de 127 a BFMiDi manda junto o <em>Bank Select</em> no formato do aparelho escolhido no Modo Amigável.</p>",
        "en": "<p>The sound your multi-effects unit loads when the preset is called up. It goes up to 600: above 127 the BFMiDi also sends <em>Bank Select</em> in the format of the device chosen in Friendly Mode.</p>",
        "es": "<p>El sonido que carga la pedalera cuando se llama el preset. Llega hasta 600: por encima de 127 la BFMiDi envía también el <em>Bank Select</em> en el formato del equipo elegido en el Modo Amigable.</p>"
       }
      },
      {
       "name": {
        "pt": "CANAL",
        "en": "CHANNEL",
        "es": "CANAL"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>O canal MIDI do aparelho que recebe o PC. O nome do aparelho aparece ao lado do número quando o canal está no Modo Amigável. <strong>OFF</strong> = o preset não manda PC.</p>",
        "en": "<p>The MIDI channel of the device that receives the PC. The device name appears next to the number when the channel is set up in Friendly Mode. <strong>OFF</strong> = the preset doesn't send a PC.</p>",
        "es": "<p>El canal MIDI del equipo que recibe el PC. El nombre del equipo aparece junto al número cuando el canal está en el Modo Amigable. <strong>OFF</strong> = el preset no envía PC.</p>"
       }
      },
      {
       "name": {
        "pt": "EXTRAS",
        "en": "EXTRAS",
        "es": "EXTRAS"
       },
       "type": {
        "pt": "botão",
        "en": "button",
        "es": "botón"
       },
       "desc": {
        "pt": "<p>Cada toque acrescenta um envio extra: uma mensagem a mais que sai junto com o PC (começa como PC no canal 1). Com pelo menos um extra, a lista aparece embaixo do CANAL. Veja o card seguinte.</p>",
        "en": "<p>Each tap adds an extra message that goes out together with the PC (it starts as a PC on channel 1). Once there is at least one extra, the list shows up below CHANNEL. See the next card.</p>",
        "es": "<p>Cada toque agrega un envío extra: un mensaje más que sale junto con el PC (empieza como PC en el canal 1). Con al menos un extra, la lista aparece debajo de CANAL. Mira la tarjeta siguiente.</p>"
       }
      },
      {
       "name": {
        "pt": "MODO PALCO",
        "en": "STAGE MODE",
        "es": "MODO ESCENARIO"
       },
       "type": {
        "pt": "atalho",
        "en": "shortcut",
        "es": "atajo"
       },
       "desc": {
        "pt": "<p>Sempre o primeiro da fileira: abre a tela cheia de palco. Tem um tópico só para ele neste manual.</p>",
        "en": "<p>Always the first in the row: opens the full-screen stage view. It has its own topic in this manual.</p>",
        "es": "<p>Siempre el primero de la fila: abre la pantalla completa de escenario. Tiene su propio tema en este manual.</p>"
       }
      },
      {
       "name": {
        "pt": "Editores dos aparelhos",
        "en": "Device editors",
        "es": "Editores de los equipos"
       },
       "type": {
        "pt": "atalhos automáticos",
        "en": "automatic shortcuts",
        "es": "atajos automáticos"
       },
       "desc": {
        "pt": "<p>Quando uma <strong>Valeton GP-5</strong>, uma <strong>IK TONEX ONE</strong> ou uma <strong>Neural DSP Nano Cortex</strong> está plugada no USB Host — ou quando o Modo Amigável está em <strong>KEMPER PLAYER</strong> —, aparece um botão com a cor do aparelho que abre o editor de preset dele. Esses botões não ocupam o lugar dos seus atalhos.</p>",
        "en": "<p>When a <strong>Valeton GP-5</strong>, an <strong>IK TONEX ONE</strong> or a <strong>Neural DSP Nano Cortex</strong> is plugged into the USB Host — or when Friendly Mode is set to <strong>KEMPER PLAYER</strong> — a button in the device's color appears that opens its preset editor. These buttons don't take the place of your shortcuts.</p>",
        "es": "<p>Cuando una <strong>Valeton GP-5</strong>, una <strong>IK TONEX ONE</strong> o una <strong>Neural DSP Nano Cortex</strong> está conectada al USB Host — o cuando el Modo Amigable está en <strong>KEMPER PLAYER</strong> —, aparece un botón con el color del equipo que abre su editor de presets. Estos botones no ocupan el lugar de tus atajos.</p>"
       }
      },
      {
       "name": {
        "pt": "Os seus atalhos",
        "en": "Your shortcuts",
        "es": "Tus atajos"
       },
       "type": {
        "pt": "atalhos",
        "en": "shortcuts",
        "es": "atajos"
       },
       "desc": {
        "pt": "<p>Botões para as telas de configuração que você mais usa. Você escolhe quais aparecem em <strong>CONFIGURAÇÕES › EDITOR › ATALHOS</strong>. No computador o atalho abre a configuração na terceira coluna, ao lado do preset; no celular ele leva à tela de configuração.</p>",
        "en": "<p>Buttons for the settings screens you use most. You choose which ones appear in <strong>SETTINGS › EDITOR › SHORTCUTS</strong>. On a computer the shortcut opens the settings in the third column, next to the preset; on a phone it takes you to the settings screen.</p>",
        "es": "<p>Botones para las pantallas de configuración que más usas. Eliges cuáles aparecen en <strong>CONFIGURACIÓN › EDITOR › ATAJOS</strong>. En la computadora el atajo abre la configuración en la tercera columna, junto al preset; en el celular te lleva a la pantalla de configuración.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Os atalhos só aparecem no modo PRESET. No modo LIVE o card do meio é o do footswitch.",
       "en": "Shortcuts only appear in PRESET mode. In LIVE mode the middle card is the footswitch card.",
       "es": "Los atajos solo aparecen en el modo PRESET. En el modo LIVE la tarjeta del medio es la del footswitch."
      }
     ]
    },
    {
     "id": "tela-extras",
     "title": {
      "pt": "Envios extras",
      "en": "Extra messages",
      "es": "Envíos extra"
     },
     "purpose": {
      "pt": "Além do PC principal, o preset pode mandar até mais 12 mensagens ao ser chamado — e é assim que você prepara a cena inteira num toque.",
      "en": "Besides the main PC, the preset can send up to 12 more messages when it's called up — that's how you set up the whole scene in one tap.",
      "es": "Además del PC principal, el preset puede enviar hasta 12 mensajes más al ser llamado — y así preparas toda la escena con un solo toque."
     },
     "howto": [
      {
       "pt": "Toque em <strong>EXTRAS</strong>, ao lado do CANAL: cada toque acrescenta uma linha, que começa como PC no canal 1.",
       "en": "Tap <strong>EXTRAS</strong>, next to CHANNEL: each tap adds a line, which starts as a PC on channel 1.",
       "es": "Toca <strong>EXTRAS</strong>, junto a CANAL: cada toque agrega una línea, que empieza como PC en el canal 1."
      },
      {
       "pt": "Em cada linha, o disco ao lado do número troca entre PC e CC.",
       "en": "On each line, the round button next to the number switches between PC and CC.",
       "es": "En cada línea, el botón redondo junto al número cambia entre PC y CC."
      },
      {
       "pt": "Escolha número, valor (no CC) e canal de cada linha.",
       "en": "Choose the number, value (for a CC) and channel of each line.",
       "es": "Elige número, valor (en el CC) y canal de cada línea."
      }
     ],
     "shot": "preset-extras",
     "mockTitle": {
      "pt": "ENVIOS EXTRAS ABERTOS",
      "en": "EXTRA MESSAGES OPEN",
      "es": "ENVÍOS EXTRA ABIERTOS"
     },
     "fields": [
      {
       "name": {
        "pt": "Até 12 envios",
        "en": "Up to 12 messages",
        "es": "Hasta 12 envíos"
       },
       "type": {
        "pt": "lista",
        "en": "list",
        "es": "lista"
       },
       "desc": {
        "pt": "<p>Cada linha é um PC ou um CC, com o seu canal. Trocar o som da pedaleira, ligar o delay, ajustar o volume de outro aparelho e mudar a cena da mesa — tudo no mesmo preset.</p>",
        "en": "<p>Each row is a PC or a CC, with its own channel. Change the sound on your multi-effects unit, turn on the delay, set the volume of another device and change the mixer scene — all in the same preset.</p>",
        "es": "<p>Cada fila es un PC o un CC, con su propio canal. Cambiar el sonido de la pedalera, activar el delay, ajustar el volumen de otro equipo y cambiar la escena de la mezcladora — todo en el mismo preset.</p>"
       }
      },
      {
       "name": {
        "pt": "Valor EXP — o pedal de expressão neste preset",
        "en": "EXP value — the expression pedal in this preset",
        "es": "Valor EXP — el pedal de expresión en este preset"
       },
       "type": {
        "pt": "valor especial",
        "en": "special value",
        "es": "valor especial"
       },
       "desc": {
        "pt": "<p>Nas placas com entrada de expressão, a lista de valores de uma linha CC termina com <strong>EXP (PEDAL DE EXPRESSÃO)</strong>. Essa linha não manda MIDI: ela diz para onde o pedal de expressão aponta enquanto este preset estiver ativo.</p><p>O destino do preset substitui o CC e o canal do card de expressão (que viram só o padrão) e funciona mesmo com aquele card desligado. Pode ter mais de uma linha EXP, para o mesmo pedal controlar dois destinos.</p>",
        "en": "<p>On boards with an expression input, the value list of a CC row ends with <strong>EXP (PEDAL DE EXPRESSÃO)</strong> (expression pedal). That row doesn't send MIDI: it tells the expression pedal where to point while this preset is active.</p><p>The preset's target replaces the CC and channel from the expression card (which become just the default) and works even with that card turned off. You can have more than one EXP row, so the same pedal controls two targets.</p>",
        "es": "<p>En las placas con entrada de expresión, la lista de valores de una fila CC termina con <strong>EXP (PEDAL DE EXPRESSÃO)</strong> (pedal de expresión). Esa fila no envía MIDI: indica hacia dónde apunta el pedal de expresión mientras este preset esté activo.</p><p>El destino del preset reemplaza el CC y el canal de la tarjeta de expresión (que pasan a ser solo el valor predeterminado) y funciona aun con esa tarjeta desactivada. Puede haber más de una fila EXP, para que el mismo pedal controle dos destinos.</p>"
       }
      },
      {
       "name": {
        "pt": "A ordem do envio",
        "en": "The sending order",
        "es": "El orden de envío"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>Ao chamar o preset, sai primeiro o PC e os extras; depois o estado inicial dos footswitches do LIVE; e só então o LED e a tela. Aparelhos lentos que perdem as primeiras mensagens podem ganhar uma pausa em <strong>CONFIGURAÇÕES › HARDWARE › TEMPOS DE DISPARO</strong>.</p>",
        "en": "<p>When the preset is called up, the PC and the extras go out first; then the initial state of the LIVE footswitches; and only then the LED and the screen. Slow devices that miss the first messages can get a pause in <strong>SETTINGS › HARDWARE › SEND TIMING</strong>.</p>",
        "es": "<p>Al llamar el preset, salen primero el PC y los extras; después el estado inicial de los footswitches del LIVE; y solo entonces el LED y la pantalla. A los equipos lentos que pierden los primeros mensajes puedes darles una pausa en <strong>CONFIGURACIÓN › HARDWARE › TIEMPOS DE ENVÍO</strong>.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-display",
     "title": {
      "pt": "A tela do pedal e a aparência do preset",
      "en": "The pedal screen and the preset's look",
      "es": "La pantalla del pedal y la apariencia del preset"
     },
     "purpose": {
      "pt": "Ver, antes de pisar, exatamente o que a controladora vai mostrar — chamando o preset e tocando em LIVE — e ajustar nome e cores.",
      "en": "See exactly what the controller will show before you step on anything — when calling up the preset and when playing in LIVE — and adjust the name and colors.",
      "es": "Ver, antes de pisar, exactamente lo que mostrará la controladora — al llamar el preset y al tocar en LIVE — y ajustar el nombre y los colores."
     },
     "howto": [
      {
       "pt": "Use as abas <strong>PRESET</strong> e <strong>LIVE</strong> no alto da prévia para ver as duas telas.",
       "en": "Use the <strong>PRESET</strong> and <strong>LIVE</strong> tabs at the top of the preview to see both screens.",
       "es": "Usa las pestañas <strong>PRESET</strong> y <strong>LIVE</strong> arriba de la vista previa para ver las dos pantallas."
      },
      {
       "pt": "Toque na prévia (ou em <strong>POSICIONAR</strong>) para mover o nome e escolher o layout.",
       "en": "Tap the preview (or <strong>POSITION</strong>) to move the name and choose the layout.",
       "es": "Toca la vista previa (o <strong>POSICIONAR</strong>) para mover el nombre y elegir el layout."
      },
      {
       "pt": "Ajuste fonte, estilo e cores nos blocos abaixo da prévia: a prévia muda enquanto você mexe.",
       "en": "Adjust the font, style and colors in the blocks below the preview: the preview updates as you go.",
       "es": "Ajusta la fuente, el estilo y los colores en los bloques debajo de la vista previa: la vista previa cambia mientras ajustas."
      }
     ],
     "shot": "preset-display",
     "mockTitle": {
      "pt": "TELA DO PEDAL — PRESET",
      "en": "PEDAL SCREEN — PRESET",
      "es": "PANTALLA DEL PEDAL — PRESET"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-grid-screen",
       "label": {
        "pt": "prévia",
        "en": "preview",
        "es": "vista previa"
       }
      },
      {
       "n": 2,
       "sel": ".bf-grid-nome",
       "label": {
        "pt": "PRESET",
        "en": "PRESET",
        "es": "PRESET"
       }
      },
      {
       "n": 3,
       "sel": ".bf-grid-aparencia",
       "label": {
        "pt": "APARÊNCIA",
        "en": "APPEARANCE",
        "es": "APARIENCIA"
       }
      },
      {
       "n": 4,
       "sel": ".bf-grid-cores",
       "label": {
        "pt": "CORES DA TELA",
        "en": "SCREEN COLORS",
        "es": "COLORES DE PANTALLA"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "A prévia",
        "en": "The preview",
        "es": "La vista previa"
       },
       "type": {
        "pt": "visual",
        "en": "visual",
        "es": "visual"
       },
       "desc": {
        "pt": "<p>Desenha o que a controladora mostra, com fundo, nome e ícones. Footswitches cuja função não tem canal MIDI <strong>não aparecem</strong> — igual à tela do pedal.</p>",
        "en": "<p>Draws what the controller shows, with the background, name and icons. Footswitches whose function has no MIDI channel <strong>don't appear</strong> — just like on the pedal screen.</p>",
        "es": "<p>Dibuja lo que muestra la controladora, con el fondo, el nombre y los íconos. Los footswitches cuya función no tiene canal MIDI <strong>no aparecen</strong> — igual que en la pantalla del pedal.</p>"
       }
      },
      {
       "name": {
        "pt": "PRESET — nome do preset",
        "en": "PRESET — preset name",
        "es": "PRESET — nombre del preset"
       },
       "type": {
        "pt": "texto",
        "en": "text",
        "es": "texto"
       },
       "desc": {
        "pt": "<p><strong>TAMANHO DA FONTE</strong> (− / +) e <strong>ESTILO</strong> (B = negrito) do nome na tela. <strong>SW EXTERNOS</strong> decide se os indicadores dos footswitches externos (ESW1 e ESW2) aparecem neste preset.</p>",
        "en": "<p><strong>FONT SIZE</strong> (− / +) and <strong>STYLE</strong> (B = bold) of the name on the screen. <strong>EXT. SWITCHES</strong> decides whether the external footswitch indicators (ESW1 and ESW2) appear in this preset.</p>",
        "es": "<p><strong>TAMAÑO DE FUENTE</strong> (− / +) y <strong>ESTILO</strong> (B = negrita) del nombre en la pantalla. <strong>SW EXTERNOS</strong> decide si los indicadores de los footswitches externos (ESW1 y ESW2) aparecen en este preset.</p>"
       }
      },
      {
       "name": {
        "pt": "APARÊNCIA",
        "en": "APPEARANCE",
        "es": "APARIENCIA"
       },
       "type": {
        "pt": "cores do nome",
        "en": "name colors",
        "es": "colores del nombre"
       },
       "desc": {
        "pt": "<p>As cores do nome: <strong>NOME</strong> (o texto), <strong>CONTORNO</strong> e <strong>TAG</strong> (a etiqueta do banco/preset).</p>",
        "en": "<p>The name colors: <strong>NAME</strong> (the text), <strong>OUTLINE</strong> and <strong>TAG</strong> (the bank/preset label).</p>",
        "es": "<p>Los colores del nombre: <strong>NOMBRE</strong> (el texto), <strong>CONTORNO</strong> y <strong>TAG</strong> (la etiqueta del banco/preset).</p>"
       }
      },
      {
       "name": {
        "pt": "CORES DA TELA",
        "en": "SCREEN COLORS",
        "es": "COLORES DE PANTALLA"
       },
       "type": {
        "pt": "fundos",
        "en": "backgrounds",
        "es": "fondos"
       },
       "desc": {
        "pt": "<p>Os dois fundos de tela cheia: um para a tela de <strong>PRESET</strong>, outro para a de <strong>LIVE</strong>. Cada um pode ser uma cor, um degradê ou uma imagem que você enviou em <strong>CONFIGURAÇÕES › IMAGENS</strong>.</p>",
        "en": "<p>The two full-screen backgrounds: one for the <strong>PRESET</strong> screen, the other for the <strong>LIVE</strong> screen. Each can be a color, a gradient or an image you uploaded in <strong>SETTINGS › IMAGES</strong>.</p>",
        "es": "<p>Los dos fondos de pantalla completa: uno para la pantalla de <strong>PRESET</strong> y otro para la de <strong>LIVE</strong>. Cada uno puede ser un color, un degradado o una imagen que subiste en <strong>CONFIGURACIÓN › IMÁGENES</strong>.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-posicionar",
     "title": {
      "pt": "Posição do nome e layout por preset",
      "en": "Name position and per-preset layout",
      "es": "Posición del nombre y layout por preset"
     },
     "purpose": {
      "pt": "Arraste o nome para onde quiser na tela e escolha o arranjo dos ícones — só para este preset, se quiser.",
      "en": "Drag the name anywhere you like on the screen and choose how the icons are arranged — just for this preset, if you want.",
      "es": "Arrastra el nombre a donde quieras en la pantalla y elige la disposición de los íconos — solo para este preset, si quieres."
     },
     "howto": [
      {
       "pt": "Arraste o nome na prévia. A posição aparece embaixo em porcentagem (X e Y).",
       "en": "Drag the name in the preview. The position shows below as a percentage (X and Y).",
       "es": "Arrastra el nombre en la vista previa. La posición aparece abajo en porcentaje (X e Y)."
      },
      {
       "pt": "Escolha o layout da tela: <strong>GLOBAL</strong> segue o padrão do aparelho; os outros valem só para este preset.",
       "en": "Choose the screen layout: <strong>GLOBAL</strong> follows the unit's default; the others apply only to this preset.",
       "es": "Elige el layout de la pantalla: <strong>GLOBAL</strong> sigue el predeterminado del equipo; los demás valen solo para este preset."
      },
      {
       "pt": "Toque em <strong>APLICAR</strong>. Nada muda antes disso.",
       "en": "Tap <strong>APPLY</strong>. Nothing changes until you do.",
       "es": "Toca <strong>APLICAR</strong>. Nada cambia antes de eso."
      }
     ],
     "shot": "preset-posicionar",
     "mockTitle": {
      "pt": "POSIÇÃO DO NOME · PRESET",
      "en": "NAME POSITION · PRESET",
      "es": "POSICIÓN DEL NOMBRE · PRESET"
     },
     "fields": [
      {
       "name": {
        "pt": "Os layouts",
        "en": "The layouts",
        "es": "Los layouts"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>GLOBAL</strong> herda o layout de <strong>CONFIGURAÇÕES › TELA</strong>. <strong>L1 a L4</strong> são arranjos fixos de ícones e <strong>Custom</strong> deixa você arrastar cada ícone e escolher o tamanho. Na tela PRESET existem ainda <strong>Nenhum</strong> (só o nome grande) e <strong>Lista</strong> (os presets em sequência).</p><p>Arrastar um ícone num layout L1–L4 converte a tela para Custom.</p>",
        "en": "<p><strong>GLOBAL</strong> inherits the layout from <strong>SETTINGS › DISPLAY</strong>. <strong>L1 to L4</strong> are fixed icon arrangements and <strong>Custom</strong> lets you drag each icon and choose its size. The PRESET screen also has <strong>Nenhum</strong> (None — just the big name) and <strong>Lista</strong> (List — the presets in sequence).</p><p>Dragging an icon in an L1–L4 layout turns the screen into Custom.</p>",
        "es": "<p><strong>GLOBAL</strong> hereda el layout de <strong>CONFIGURACIÓN › PANTALLA</strong>. <strong>L1 a L4</strong> son arreglos fijos de íconos y <strong>Custom</strong> te deja arrastrar cada ícono y elegir el tamaño. En la pantalla PRESET existen además <strong>Nenhum</strong> (Ninguno — solo el nombre grande) y <strong>Lista</strong> (los presets en secuencia).</p><p>Arrastrar un ícono en un layout L1–L4 convierte la pantalla en Custom.</p>"
       }
      },
      {
       "name": {
        "pt": "Por que por preset",
        "en": "Why per preset",
        "es": "Por qué por preset"
       },
       "type": {
        "pt": "uso",
        "en": "use",
        "es": "uso"
       },
       "desc": {
        "pt": "<p>Uma música que precisa de quatro efeitos grandes pode ter o seu layout enquanto as outras usam a lista. Quem não mexe aqui continua seguindo o global.</p>",
        "en": "<p>A song that needs four big effects can have its own layout while the others use the list. If you don't change anything here, the preset keeps following the global layout.</p>",
        "es": "<p>Una canción que necesita cuatro efectos grandes puede tener su propio layout mientras las demás usan la lista. Si no cambias nada aquí, el preset sigue el layout global.</p>"
       }
      },
      {
       "name": {
        "pt": "Centralizar",
        "en": "Center",
        "es": "Centrar"
       },
       "type": {
        "pt": "atalho",
        "en": "shortcut",
        "es": "atajo"
       },
       "desc": {
        "pt": "<p>Devolve o nome ao centro da tela.</p>",
        "en": "<p>Moves the name back to the center of the screen.</p>",
        "es": "<p>Devuelve el nombre al centro de la pantalla.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-barra",
     "title": {
      "pt": "A barra de baixo",
      "en": "The bottom bar",
      "es": "La barra inferior"
     },
     "purpose": {
      "pt": "Cinco botões que valem para o editor inteiro: conexão, configurações, início, copiar/colar e salvar.",
      "en": "Five buttons that work across the whole editor: connection, settings, home, copy/paste and save.",
      "es": "Cinco botones que valen para todo el editor: conexión, configuración, inicio, copiar/pegar y guardar."
     },
     "shot": "preset-tabbar",
     "mockTitle": {
      "pt": "BARRA DE BAIXO",
      "en": "BOTTOM BAR",
      "es": "BARRA INFERIOR"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-tabbar-conn",
       "at": "c",
       "label": {
        "pt": "conexão",
        "en": "connection",
        "es": "conexión"
       }
      },
      {
       "n": 2,
       "sel": ".bf-nav-settings",
       "at": "c",
       "label": {
        "pt": "configurações",
        "en": "settings",
        "es": "configuración"
       }
      },
      {
       "n": 3,
       "sel": ".bf-nav-home",
       "at": "c",
       "label": {
        "pt": "início",
        "en": "home",
        "es": "inicio"
       }
      },
      {
       "n": 4,
       "sel": ".bf-tabbar-plus",
       "at": "c",
       "label": {
        "pt": "copiar e colar",
        "en": "copy and paste",
        "es": "copiar y pegar"
       }
      },
      {
       "n": 5,
       "sel": ".bf-save",
       "at": "c",
       "label": {
        "pt": "salvar",
        "en": "save",
        "es": "guardar"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Conexão",
        "en": "Connection",
        "es": "Conexión"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>A cor diz como você está ligado: <strong>STA</strong> verde (rede de casa), <strong>AP</strong> amarelo (Wi-Fi do pedal), <strong>USB</strong> azul (cabo) e <strong>OFFLINE</strong> com o Wi-Fi riscado em vermelho. Tocar abre a janela <strong>Conectar ao pedal</strong>.</p>",
        "en": "<p>The color tells you how you're connected: green <strong>STA</strong> (home network), yellow <strong>AP</strong> (the pedal's Wi-Fi), blue <strong>USB</strong> (cable) and <strong>OFFLINE</strong> with the Wi-Fi icon crossed out in red. Tapping it opens the <strong>Conectar ao pedal</strong> (Connect to the pedal) window.</p>",
        "es": "<p>El color indica cómo estás conectado: <strong>STA</strong> verde (red de casa), <strong>AP</strong> amarillo (Wi-Fi del pedal), <strong>USB</strong> azul (cable) y <strong>OFFLINE</strong> con el Wi-Fi tachado en rojo. Al tocarlo se abre la ventana <strong>Conectar ao pedal</strong> (Conectar al pedal).</p>"
       }
      },
      {
       "name": {
        "pt": "Configurações",
        "en": "Settings",
        "es": "Configuración"
       },
       "type": {
        "pt": "navegação",
        "en": "navigation",
        "es": "navegación"
       },
       "desc": {
        "pt": "<p>A engrenagem abre o menu com os quinze destinos de configuração, de MODO AMIGÁVEL a RESTAURAR.</p>",
        "en": "<p>The gear opens the menu with the fifteen settings destinations, from FRIENDLY MODE to FACTORY RESET.</p>",
        "es": "<p>El engranaje abre el menú con los quince destinos de configuración, de MODO AMIGABLE a RESTAURAR.</p>"
       }
      },
      {
       "name": {
        "pt": "Início",
        "en": "Home",
        "es": "Inicio"
       },
       "type": {
        "pt": "navegação",
        "en": "navigation",
        "es": "navegación"
       },
       "desc": {
        "pt": "<p>A pílula laranja volta para a tela do preset, venha de onde vier.</p>",
        "en": "<p>The orange pill takes you back to the preset screen, wherever you are.</p>",
        "es": "<p>La píldora naranja te devuelve a la pantalla del preset, vengas de donde vengas.</p>"
       }
      },
      {
       "name": {
        "pt": "Copiar e colar",
        "en": "Copy and paste",
        "es": "Copiar y pegar"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p>O botão de controles deslizantes abre o menu para copiar e colar <strong>preset</strong>, <strong>layer</strong> e <strong>banco</strong> — e, no modo LIVE, a configuração de um footswitch para outro.</p>",
        "en": "<p>The sliders button opens the menu to copy and paste a <strong>preset</strong>, a <strong>layer</strong> or a <strong>bank</strong> — and, in LIVE mode, the settings from one footswitch to another.</p>",
        "es": "<p>El botón de controles deslizantes abre el menú para copiar y pegar <strong>preset</strong>, <strong>layer</strong> y <strong>banco</strong> — y, en el modo LIVE, la configuración de un footswitch a otro.</p>"
       }
      },
      {
       "name": {
        "pt": "Salvar",
        "en": "Save",
        "es": "Guardar"
       },
       "type": {
        "pt": "status e ação",
        "en": "status and action",
        "es": "estado y acción"
       },
       "desc": {
        "pt": "<p>Com o salvamento automático (o padrão), o editor grava sozinho menos de um segundo depois de cada mudança, e o disquete muda de cor: <strong>vermelho</strong> = há alteração pendente, <strong>laranja</strong> = gravando, <strong>verde</strong> = tudo gravado. Com o salvamento automático desligado, toque nele para gravar.</p>",
        "en": "<p>With auto save on (the default), the editor saves on its own less than a second after each change, and the floppy disk changes color: <strong>red</strong> = there's a pending change, <strong>orange</strong> = saving, <strong>green</strong> = everything saved. With auto save turned off, tap it to save.</p>",
        "es": "<p>Con el guardado automático (el predeterminado), el editor guarda solo menos de un segundo después de cada cambio, y el disquete cambia de color: <strong>rojo</strong> = hay un cambio pendiente, <strong>naranja</strong> = guardando, <strong>verde</strong> = todo guardado. Con el guardado automático desactivado, tócalo para guardar.</p>"
       }
      }
     ]
    },
    {
     "id": "tela-acoes",
     "title": {
      "pt": "Copiar e colar",
      "en": "Copy and paste",
      "es": "Copiar y pegar"
     },
     "purpose": {
      "pt": "Evita reconfigurar do zero uma música parecida com outra: copie, vá ao destino e cole.",
      "en": "Saves you from setting up a song from scratch when it's similar to another one: copy, go to the destination and paste.",
      "es": "Evita configurar desde cero una canción parecida a otra: copia, ve al destino y pega."
     },
     "howto": [
      {
       "pt": "No preset de origem, toque no botão de controles deslizantes da barra de baixo e escolha <strong>COPIAR PRESET</strong>, <strong>COPIAR LAYER</strong> ou <strong>COPIAR BANCO</strong>.",
       "en": "In the source preset, tap the sliders button on the bottom bar and choose <strong>COPY PRESET</strong>, <strong>COPY LAYER</strong> or <strong>COPY BANK</strong>.",
       "es": "En el preset de origen, toca el botón de controles deslizantes de la barra inferior y elige <strong>COPIAR PRESET</strong>, <strong>COPIAR LAYER</strong> o <strong>COPIAR BANCO</strong>."
      },
      {
       "pt": "Vá ao destino e abra o mesmo menu: agora ele oferece <strong>COLAR</strong>.",
       "en": "Go to the destination and open the same menu: now it offers <strong>PASTE</strong>.",
       "es": "Ve al destino y abre el mismo menú: ahora ofrece <strong>PEGAR</strong>."
      }
     ],
     "shot": "preset-acoes",
     "mockTitle": {
      "pt": "MENU COPIAR E COLAR",
      "en": "COPY AND PASTE MENU",
      "es": "MENÚ COPIAR Y PEGAR"
     },
     "fields": [
      {
       "name": {
        "pt": "Preset, layer ou banco",
        "en": "Preset, layer or bank",
        "es": "Preset, layer o banco"
       },
       "type": {
        "pt": "recorte",
        "en": "scope",
        "es": "alcance"
       },
       "desc": {
        "pt": "<p><strong>Preset</strong> leva tudo o que ele manda e os footswitches do LIVE. <strong>Layer</strong> leva só os seis footswitches de uma camada (L1 ou L2). <strong>Banco</strong> leva os seis presets de uma letra.</p>",
        "en": "<p><strong>Preset</strong> takes everything it sends plus the LIVE footswitches. <strong>Layer</strong> takes only the six footswitches of one layer (L1 or L2). <strong>Bank</strong> takes the six presets of one letter.</p>",
        "es": "<p><strong>Preset</strong> lleva todo lo que envía y los footswitches del LIVE. <strong>Layer</strong> lleva solo los seis footswitches de una capa (L1 o L2). <strong>Banco</strong> lleva los seis presets de una letra.</p>"
       }
      },
      {
       "name": {
        "pt": "Footswitch",
        "en": "Footswitch",
        "es": "Footswitch"
       },
       "type": {
        "pt": "modo LIVE",
        "en": "LIVE mode",
        "es": "modo LIVE"
       },
       "desc": {
        "pt": "<p>No modo LIVE o menu copia e cola a configuração de um footswitch — modo, comandos e aparência — para outro.</p>",
        "en": "<p>In LIVE mode the menu copies and pastes a footswitch's settings — mode, commands and look — to another footswitch.</p>",
        "es": "<p>En el modo LIVE el menú copia y pega la configuración de un footswitch — modo, comandos y apariencia — a otro.</p>"
       }
      }
     ]
    }
   ]
  },
  {
   "id": "modo-live",
   "icon": "modos",
   "page": 3,
   "title": {
    "pt": "O modo LIVE",
    "en": "LIVE mode",
    "es": "El modo LIVE"
   },
   "summary": {
    "pt": "Dentro de cada preset, os footswitches viram pedais de efeito. É aqui que a controladora deixa de ser só um seletor de sons.",
    "en": "Inside each preset, the footswitches become effect pedals. This is where the controller stops being just a sound selector.",
    "es": "Dentro de cada preset, los footswitches se convierten en pedales de efecto. Aquí es donde la controladora deja de ser solo un selector de sonidos."
   },
   "intro": {
    "pt": "<p>Existem dois momentos na controladora. No modo <strong>PRESET</strong>, pisar num footswitch chama uma música. No modo <strong>LIVE</strong>, você já está dentro de uma música e cada footswitch controla alguma coisa dela: liga o drive, bate o tempo do delay, sobe o volume do solo.</p><p>O modo LIVE é configurado por preset: os mesmos pés fazem coisas diferentes em cada música. E cada preset ainda pode ter duas camadas (L1 e L2) — doze funções por música numa placa de seis footswitches.</p>",
    "en": "<p>The controller works in two modes. In <strong>PRESET</strong> mode, stepping on a footswitch calls up a song. In <strong>LIVE</strong> mode, you're already inside a song and each footswitch controls something in it: turns on the drive, taps the delay time, raises the volume for the solo.</p><p>LIVE mode is set up per preset: the same footswitches do different things in each song. And each preset can also have two layers (L1 and L2) — twelve functions per song on a six-footswitch board.</p>",
    "es": "<p>La controladora tiene dos momentos. En el modo <strong>PRESET</strong>, pisar un footswitch llama una canción. En el modo <strong>LIVE</strong>, ya estás dentro de una canción y cada footswitch controla algo de ella: enciende el drive, marca el tempo del delay, sube el volumen para el solo.</p><p>El modo LIVE se configura por preset: los mismos footswitches hacen cosas distintas en cada canción. Y además cada preset puede tener dos capas (L1 y L2) — doce funciones por canción en una placa de seis footswitches.</p>"
   },
   "cards": [
    {
     "id": "live-visao",
     "title": {
      "pt": "Como configurar um footswitch",
      "en": "How to set up a footswitch",
      "es": "Cómo configurar un footswitch"
     },
     "purpose": {
      "pt": "Passar para LIVE, escolher o footswitch e dizer o que ele faz. Sempre nessa ordem.",
      "en": "Switch to LIVE, pick the footswitch and tell it what to do. Always in that order.",
      "es": "Pasar a LIVE, elegir el footswitch y decirle qué hace. Siempre en ese orden."
     },
     "howto": [
      {
       "pt": "Na barra do console, toque em <strong>LIVE</strong>. (No computador, tocar num footswitch da lista também leva ao LIVE.)",
       "en": "On the console bar, tap <strong>LIVE</strong>. (On a computer, clicking a footswitch in the list also takes you to LIVE.)",
       "es": "En la barra de la consola, toca <strong>LIVE</strong>. (En la computadora, tocar un footswitch de la lista también te lleva a LIVE.)"
      },
      {
       "pt": "Nas teclas <strong>1 a 6</strong>, escolha o footswitch. O mostrador vira <strong>FX · SWITCH n</strong>.",
       "en": "Use keys <strong>1 to 6</strong> to pick the footswitch. The readout changes to <strong>FX · SWITCH n</strong>.",
       "es": "Con las teclas <strong>1 a 6</strong>, elige el footswitch. El visor cambia a <strong>FX · SWITCH n</strong>."
      },
      {
       "pt": "No alto do card do meio, toque no nome do modo e escolha um dos dez modos.",
       "en": "At the top of the middle card, tap the mode name and choose one of the ten modes.",
       "es": "Arriba de la tarjeta del medio, toca el nombre del modo y elige uno de los diez modos."
      },
      {
       "pt": "Preencha os campos do modo. Na terceira coluna (no celular, no disco <strong>DISPLAY</strong>) ajuste o ícone e as cores na tela.",
       "en": "Fill in the mode's fields. In the third column (on a phone, the round <strong>DISPLAY</strong> button), set the icon and the screen colors.",
       "es": "Completa los campos del modo. En la tercera columna (en el celular, en el botón redondo <strong>DISPLAY</strong>) ajusta el ícono y los colores en pantalla."
      }
     ],
     "shot": "live-tela",
     "mockTitle": {
      "pt": "TELA DO MODO LIVE — COMPUTADOR",
      "en": "LIVE MODE SCREEN — COMPUTER",
      "es": "PANTALLA DEL MODO LIVE — COMPUTADORA"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-bank-tile",
       "label": {
        "pt": "FX · SWITCH",
        "en": "FX · SWITCH",
        "es": "FX · SWITCH"
       }
      },
      {
       "n": 2,
       "sel": ".bf-bank-keys",
       "label": {
        "pt": "footswitches",
        "en": "footswitches",
        "es": "footswitches"
       }
      },
      {
       "n": 3,
       "sel": ".bf-sw-mode-field",
       "label": {
        "pt": "modo",
        "en": "mode",
        "es": "modo"
       }
      },
      {
       "n": 4,
       "sel": ".bf-sw-display-card",
       "label": {
        "pt": "aparência na tela",
        "en": "on-screen look",
        "es": "apariencia en pantalla"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Escolher o footswitch",
        "en": "Choosing the footswitch",
        "es": "Elegir el footswitch"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>No LIVE as teclas do console deixam de ser presets e passam a ser os footswitches deste preset. A tecla acesa é a que você está configurando.</p>",
        "en": "<p>In LIVE, the console keys stop being presets and become this preset's footswitches. The lit key is the one you're setting up.</p>",
        "es": "<p>En LIVE, las teclas de la consola dejan de ser presets y pasan a ser los footswitches de este preset. La tecla encendida es la que estás configurando.</p>"
       }
      },
      {
       "name": {
        "pt": "L1 e L2 — as duas camadas",
        "en": "L1 and L2 — the two layers",
        "es": "L1 y L2 — las dos capas"
       },
       "type": {
        "pt": "camadas",
        "en": "layers",
        "es": "capas"
       },
       "desc": {
        "pt": "<p>Ligue a segunda camada no botão <strong>SINGLE LAYER / DUAL LAYER</strong> da barra do console (no modo PRESET). No LIVE, o mesmo botão escolhe se você edita a <strong>LAYER 1</strong> ou a <strong>LAYER 2</strong>.</p><p>No palco, você troca de camada com o botão LIVE nas placas que têm um, ou com um footswitch configurado com o comando <strong>» TO LAYER</strong>.</p>",
        "en": "<p>Turn on the second layer with the <strong>SINGLE LAYER / DUAL LAYER</strong> button on the console bar (in PRESET mode). In LIVE, the same button picks whether you're editing <strong>LAYER 1</strong> or <strong>LAYER 2</strong>.</p><p>On stage, you switch layers with the LIVE button on boards that have one, or with a footswitch set to the <strong>» TO LAYER</strong> command.</p>",
        "es": "<p>Activa la segunda capa con el botón <strong>SINGLE LAYER / DUAL LAYER</strong> de la barra de la consola (en el modo PRESET). En LIVE, el mismo botón elige si editas la <strong>LAYER 1</strong> o la <strong>LAYER 2</strong>.</p><p>En el escenario, cambias de capa con el botón LIVE en las placas que lo tienen, o con un footswitch configurado con el comando <strong>» TO LAYER</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Entrar e sair do LIVE com o pé",
        "en": "Entering and leaving LIVE with your foot",
        "es": "Entrar y salir de LIVE con el pie"
       },
       "type": {
        "pt": "no palco",
        "en": "on stage",
        "es": "en el escenario"
       },
       "desc": {
        "pt": "<p>De fábrica, <strong>segurar o footswitch do preset que está tocando</strong> entra no LIVE (CONFIGURAÇÕES › BANCOS › CHAMADA DE PRESETS › CLICK LONGO).</p><p>Placas com botão <strong>LIVE MODE</strong>: um toque entra (e alterna a camada), segurar sai. Placas sem esse botão: use um combo de dois footswitches com a ação <strong>SW_LIVE</strong> — e, dentro do LIVE, <strong>segurar o combo meio segundo</strong> sai direto para o modo PRESET. Também dá para deixar um footswitch com o comando <strong>» OUT LIVE MODE</strong>.</p>",
        "en": "<p>Out of the box, <strong>holding the footswitch of the preset that's playing</strong> enters LIVE (SETTINGS › BANKS › PRESET CALL › LONG CLICK).</p><p>Boards with a <strong>LIVE MODE</strong> button: one tap enters (and switches the layer), holding exits. Boards without that button: use a two-footswitch combo with the <strong>SW_LIVE</strong> action — and, inside LIVE, <strong>holding the combo for half a second</strong> goes straight back to PRESET mode. You can also set a footswitch to the <strong>» OUT LIVE MODE</strong> command.</p>",
        "es": "<p>De fábrica, <strong>mantener pisado el footswitch del preset que está sonando</strong> entra en LIVE (CONFIGURACIÓN › BANCOS › LLAMADA DE PRESETS › CLICK LARGO).</p><p>Placas con botón <strong>LIVE MODE</strong>: un toque entra (y alterna la capa), mantenerlo sale. Placas sin ese botón: usa un combo de dos footswitches con la acción <strong>SW_LIVE</strong> — y, dentro de LIVE, <strong>mantener el combo medio segundo</strong> sale directo al modo PRESET. También puedes dejar un footswitch con el comando <strong>» OUT LIVE MODE</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Sem canal, sem ícone",
        "en": "No channel, no icon",
        "es": "Sin canal, sin ícono"
       },
       "type": {
        "pt": "tela do pedal",
        "en": "pedal screen",
        "es": "pantalla del pedal"
       },
       "desc": {
        "pt": "<p>Um footswitch cuja função não tem canal MIDI <strong>não aparece na tela da controladora</strong> (nem na prévia do editor). Por isso, com o pacote de fábrica — footswitches em STOMP com canal OFF — a tela LIVE começa vazia: ela vai se preenchendo conforme você dá canal aos footswitches.</p><p>As exceções são o FAVORITO, que navega em vez de mandar MIDI, e o MUTE, que nunca aparece.</p>",
        "en": "<p>A footswitch whose function has no MIDI channel <strong>doesn't show up on the controller's screen</strong> (or in the editor preview). That's why, with the factory pack — footswitches in STOMP with the channel OFF — the LIVE screen starts out empty: it fills in as you give the footswitches a channel.</p><p>The exceptions are FAVORITE, which navigates instead of sending MIDI, and MUTE, which never shows up.</p>",
        "es": "<p>Un footswitch cuya función no tiene canal MIDI <strong>no aparece en la pantalla de la controladora</strong> (ni en la vista previa del editor). Por eso, con el paquete de fábrica — footswitches en STOMP con canal OFF — la pantalla LIVE empieza vacía: se va llenando a medida que les das canal a los footswitches.</p><p>Las excepciones son el FAVORITO, que navega en vez de enviar MIDI, y el MUTE, que nunca aparece.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Configurar o LIVE é opcional: um preset que só chama o som já é útil e já toca.",
       "en": "Setting up LIVE is optional: a preset that just calls up the sound is already useful and ready to play.",
       "es": "Configurar LIVE es opcional: un preset que solo llama el sonido ya es útil y ya suena."
      }
     ]
    },
    {
     "id": "live-picker",
     "title": {
      "pt": "Os dez modos de operação",
      "en": "The ten operating modes",
      "es": "Los diez modos de operación"
     },
     "purpose": {
      "pt": "Cada footswitch roda um modo. O modo decide o que acontece quando você pisa — e muda todos os outros campos.",
      "en": "Each footswitch runs one mode. The mode decides what happens when you step on it — and changes all the other fields.",
      "es": "Cada footswitch funciona en un modo. El modo decide qué pasa cuando lo pisas — y cambia todos los demás campos."
     },
     "howto": [
      {
       "pt": "Toque no nome do modo, no alto do card do footswitch, para abrir esta lista.",
       "en": "Tap the mode name at the top of the footswitch card to open this list.",
       "es": "Toca el nombre del modo, arriba de la tarjeta del footswitch, para abrir esta lista."
      }
     ],
     "shot": "sw-picker",
     "mockTitle": {
      "pt": "MODO LIVE · SWITCH 1",
      "en": "LIVE MODE · SWITCH 1",
      "es": "MODO LIVE · SWITCH 1"
     },
     "fields": [
      {
       "name": {
        "pt": "Qual modo escolher",
        "en": "Which mode to choose",
        "es": "Qué modo elegir"
       },
       "type": {
        "pt": "resumo",
        "en": "summary",
        "es": "resumen"
       },
       "desc": {
        "pt": "<p><strong>STOMP</strong> — liga e desliga um efeito. O que a maioria das pessoas usa.<br><strong>SPIN</strong> — cicla entre três valores.<br><strong>RAMP</strong> — varre suavemente de um valor a outro.<br><strong>MOMENT</strong> (momentary) — vale só enquanto o pé está em cima.<br><strong>MACROS</strong> — vários comandos num toque.<br><strong>TAP TEMPO</strong> — bater o tempo com o pé.<br><strong>SINGLE</strong> — um comando fixo por gesto.<br><strong>STEPS</strong> — sequenciador de quatro valores em loop.<br><strong>CONTROL</strong> — seletor A/B entre dois destinos.<br><strong>MUTE</strong> — o footswitch fica sem função.</p>",
        "en": "<p><strong>STOMP</strong> — turns an effect on and off. What most people use.<br><strong>SPIN</strong> — cycles through three values.<br><strong>RAMP</strong> — sweeps smoothly from one value to another.<br><strong>MOMENT</strong> (momentary) — works only while your foot is on it.<br><strong>MACROS</strong> — several commands in one press.<br><strong>TAP TEMPO</strong> — tap the tempo with your foot.<br><strong>SINGLE</strong> — one fixed command per gesture.<br><strong>STEPS</strong> — four-value sequencer in a loop.<br><strong>CONTROL</strong> — A/B selector between two targets.<br><strong>MUTE</strong> — the footswitch has no function.</p>",
        "es": "<p><strong>STOMP</strong> — enciende y apaga un efecto. Lo que usa la mayoría.<br><strong>SPIN</strong> — recorre en ciclo tres valores.<br><strong>RAMP</strong> — barre suavemente de un valor a otro.<br><strong>MOMENT</strong> (momentary) — actúa solo mientras el pie está encima.<br><strong>MACROS</strong> — varios comandos en un toque.<br><strong>TAP TEMPO</strong> — marcar el tempo con el pie.<br><strong>SINGLE</strong> — un comando fijo por gesto.<br><strong>STEPS</strong> — secuenciador de cuatro valores en loop.<br><strong>CONTROL</strong> — selector A/B entre dos destinos.<br><strong>MUTE</strong> — el footswitch queda sin función.</p>"
       }
      },
      {
       "name": {
        "pt": "Trocar de modo apaga o que eu tinha?",
        "en": "Does changing modes erase what I had?",
        "es": "¿Cambiar de modo borra lo que tenía?"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>Não. Os parâmetros de cada modo ficam guardados separadamente: se você experimentar o SPIN e voltar para o STOMP, o STOMP continua como estava.</p>",
        "en": "<p>No. Each mode's parameters are stored separately: if you try SPIN and go back to STOMP, STOMP is just as you left it.</p>",
        "es": "<p>No. Los parámetros de cada modo se guardan por separado: si pruebas el SPIN y vuelves al STOMP, el STOMP sigue como estaba.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "STEPS e CONTROL valem para os footswitches do preset. O SW GLOBAL e os footswitches externos usam os outros oito modos.",
       "en": "STEPS and CONTROL are for the preset's footswitches. SW GLOBAL and the external footswitches use the other eight modes.",
       "es": "STEPS y CONTROL valen para los footswitches del preset. El SW GLOBAL y los footswitches externos usan los otros ocho modos."
      }
     ]
    },
    {
     "id": "sw-stomp",
     "title": {
      "pt": "STOMP — liga e desliga",
      "en": "STOMP — on and off",
      "es": "STOMP — enciende y apaga"
     },
     "purpose": {
      "pt": "O modo clássico: o pé liga e desliga um efeito, como um pedal de verdade. Um mesmo STOMP pode ter até três seções, cada uma num gesto do pé.",
      "en": "The classic mode: your foot turns an effect on and off, like a real pedal. A single STOMP can have up to three sections, each on a different foot gesture.",
      "es": "El modo clásico: el pie enciende y apaga un efecto, como un pedal de verdad. Un mismo STOMP puede tener hasta tres secciones, cada una en un gesto del pie."
     },
     "howto": [
      {
       "pt": "Na aba <strong>CLICK CURTO</strong>, escolha o CC e o CANAL do efeito.",
       "en": "On the <strong>SHORT CLICK</strong> tab, choose the effect's CC and CHANNEL.",
       "es": "En la pestaña <strong>CLIC CORTO</strong>, elige el CC y el CANAL del efecto."
      },
      {
       "pt": "Quer mais funções no mesmo pé? Configure também <strong>CLICK LONGO</strong> e <strong>RECLICK</strong>.",
       "en": "Want more functions on the same footswitch? Also set up <strong>LONG CLICK</strong> and <strong>RECLICK</strong>.",
       "es": "¿Quieres más funciones en el mismo pie? Configura también <strong>CLIC LARGO</strong> y <strong>RECLICK</strong>."
      },
      {
       "pt": "Ajuste a cor do LED e o comportamento na faixa de opções, embaixo.",
       "en": "Set the LED color and the behavior in the options strip below.",
       "es": "Ajusta el color del LED y el comportamiento en la franja de opciones, abajo."
      }
     ],
     "shot": "sw-stomp",
     "mockTitle": {
      "pt": "SW — MODO STOMP",
      "en": "SW — STOMP MODE",
      "es": "SW — MODO STOMP"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-sw-fx2-tabs",
       "label": {
        "pt": "gestos",
        "en": "gestures",
        "es": "gestos"
       }
      },
      {
       "n": 2,
       "sel": ".bf-typebtn-row",
       "label": {
        "pt": "CC ou PC",
        "en": "CC or PC",
        "es": "CC o PC"
       }
      },
      {
       "n": 3,
       "sel": ".bf-sw-fx1-chrow",
       "label": {
        "pt": "canal, CUSTOM e FAVORITO",
        "en": "channel, CUSTOM and FAVORITE",
        "es": "canal, CUSTOM y FAVORITO"
       }
      },
      {
       "n": 4,
       "sel": ".bf-sw-opt-card",
       "label": {
        "pt": "opções",
        "en": "options",
        "es": "opciones"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "CLICK CURTO / CLICK LONGO / RECLICK",
        "en": "SHORT CLICK / LONG CLICK / RECLICK",
        "es": "CLIC CORTO / CLIC LARGO / RECLICK"
       },
       "type": {
        "pt": "seções",
        "en": "sections",
        "es": "secciones"
       },
       "desc": {
        "pt": "<p>Três funções no mesmo footswitch: toque rápido, toque segurado e toque duplo. O comportamento se adapta ao que você preencher: só a primeira seção = stomp clássico; duas ou três seções = dois ou três efeitos no mesmo pé.</p><p>Com o RECLICK preenchido, o clique curto espera um instante (cerca de um terço de segundo) para saber se vem um segundo toque.</p>",
        "en": "<p>Three functions on the same footswitch: quick press, held press and double press. The behavior adapts to what you fill in: only the first section = classic stomp; two or three sections = two or three effects on the same footswitch.</p><p>With RECLICK filled in, the short click waits a moment (about a third of a second) to see whether a second press is coming.</p>",
        "es": "<p>Tres funciones en el mismo footswitch: toque rápido, toque mantenido y doble toque. El comportamiento se adapta a lo que completes: solo la primera sección = stomp clásico; dos o tres secciones = dos o tres efectos en el mismo pie.</p><p>Con el RECLICK completado, el clic corto espera un instante (cerca de un tercio de segundo) para saber si viene un segundo toque.</p>"
       }
      },
      {
       "name": {
        "pt": "CC ou PC",
        "en": "CC or PC",
        "es": "CC o PC"
       },
       "type": {
        "pt": "disco",
        "en": "round button",
        "es": "botón redondo"
       },
       "desc": {
        "pt": "<p>O disco ao lado do número troca o tipo da mensagem: <strong>CC</strong> (o normal para ligar e desligar efeitos) ou <strong>PC</strong> (para chamar um som). Com o Modo Amigável, a lista mostra o nome de cada comando.</p>",
        "en": "<p>The round button next to the number switches the message type: <strong>CC</strong> (the usual choice for turning effects on and off) or <strong>PC</strong> (to call up a sound). With Friendly Mode, the list shows the name of each command.</p>",
        "es": "<p>El botón redondo junto al número cambia el tipo de mensaje: <strong>CC</strong> (lo normal para encender y apagar efectos) o <strong>PC</strong> (para llamar un sonido). Con el Modo Amigable, la lista muestra el nombre de cada comando.</p>"
       }
      },
      {
       "name": {
        "pt": "CUSTOM — valores próprios",
        "en": "CUSTOM — your own values",
        "es": "CUSTOM — valores propios"
       },
       "type": {
        "pt": "disco",
        "en": "round button",
        "es": "botón redondo"
       },
       "desc": {
        "pt": "<p>Normalmente ligado manda 127 e desligado manda 0. O disco de controles ao lado do CANAL abre <strong>VALORES CUSTOM</strong> para escolher outros valores — veja o card seguinte.</p>",
        "en": "<p>Normally, on sends 127 and off sends 0. The controls button next to CHANNEL opens <strong>CUSTOM VALUES</strong> so you can pick other values — see the next card.</p>",
        "es": "<p>Normalmente, encendido envía 127 y apagado envía 0. El botón de controles junto a CANAL abre <strong>VALORES CUSTOM</strong> para elegir otros valores — mira la tarjeta siguiente.</p>"
       }
      },
      {
       "name": {
        "pt": "FAVORITO",
        "en": "FAVORITE",
        "es": "FAVORITO"
       },
       "type": {
        "pt": "disco",
        "en": "round button",
        "es": "botón redondo"
       },
       "desc": {
        "pt": "<p>A estrela transforma a seção num atalho: em vez de mandar MIDI, pisar leva a outro banco e preset, chegando no modo PRESET ou LIVE (e, no LIVE, na layer 1 ou 2). Serve para “pular para a próxima música” sem sair do LIVE.</p>",
        "en": "<p>The star turns the section into a shortcut: instead of sending MIDI, stepping on it takes you to another bank and preset, landing in PRESET or LIVE mode (and, in LIVE, on layer 1 or 2). Use it to “jump to the next song” without leaving LIVE.</p>",
        "es": "<p>La estrella convierte la sección en un atajo: en vez de enviar MIDI, pisar te lleva a otro banco y preset, llegando al modo PRESET o LIVE (y, en LIVE, a la layer 1 o 2). Sirve para “saltar a la siguiente canción” sin salir de LIVE.</p>"
       }
      },
      {
       "name": {
        "pt": "Opções",
        "en": "Options",
        "es": "Opciones"
       },
       "type": {
        "pt": "faixa",
        "en": "strip",
        "es": "franja"
       },
       "desc": {
        "pt": "<p><strong>LED</strong> — a cor do anel deste footswitch.<br><strong>DISPARA</strong> — manda o comando já na chamada do preset, sem esperar você pisar.<br><strong>COMEÇA</strong> — o efeito entra ligado ou desligado.<br><strong>INVERTE</strong> — o LED acende no desligado em vez de no ligado.<br>Nas abas CLICK LONGO e RECLICK há ainda <strong>VOLTA</strong>: ao desligar, a tela volta a mostrar o ícone do clique curto.</p>",
        "en": "<p><strong>LED</strong> — the ring color for this footswitch.<br><strong>FIRES</strong> — sends the command as soon as the preset is called, without waiting for you to step on it.<br><strong>STARTS</strong> — the effect starts on or off.<br><strong>INVERT</strong> — the LED lights when off instead of when on.<br>The LONG CLICK and RECLICK tabs also have <strong>BACK</strong>: when turned off, the screen goes back to showing the short-click icon.</p>",
        "es": "<p><strong>LED</strong> — el color del anillo de este footswitch.<br><strong>DISPARA</strong> — envía el comando ya al llamar el preset, sin esperar a que pises.<br><strong>EMPIEZA</strong> — el efecto arranca encendido o apagado.<br><strong>INVIERTE</strong> — el LED se enciende en apagado en vez de en encendido.<br>En las pestañas CLIC LARGO y RECLICK también está <strong>VUELVE</strong>: al apagar, la pantalla vuelve a mostrar el ícono del clic corto.</p>"
       }
      },
      {
       "name": {
        "pt": "ANEL ÚNICO",
        "en": "SINGLE RING",
        "es": "ANILLO ÚNICO"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Com duas ou três seções, o anel de LED se reparte — uma cor por seção. Ligando o <strong>ANEL ÚNICO</strong> (só na aba CLICK CURTO), os três LEDs acendem juntos, na cor da última seção que você tocou.</p>",
        "en": "<p>With two or three sections, the LED ring is split — one color per section. Turning on <strong>SINGLE RING</strong> (only on the SHORT CLICK tab) lights all three LEDs together, in the color of the last section you triggered.</p>",
        "es": "<p>Con dos o tres secciones, el anillo de LED se reparte — un color por sección. Al activar <strong>ANILLO ÚNICO</strong> (solo en la pestaña CLIC CORTO), los tres LEDs se encienden juntos, en el color de la última sección que tocaste.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Na dúvida, comece só com o CLICK CURTO. As outras seções podem ser acrescentadas depois, sem refazer nada.",
       "en": "When in doubt, start with just SHORT CLICK. You can add the other sections later without redoing anything.",
       "es": "Si tienes dudas, empieza solo con el CLIC CORTO. Las otras secciones se pueden agregar después, sin rehacer nada."
      }
     ]
    },
    {
     "id": "sw-custom",
     "title": {
      "pt": "Valores custom",
      "en": "Custom values",
      "es": "Valores custom"
     },
     "purpose": {
      "pt": "Para aparelhos que não usam 127 para ligar e 0 para desligar. Cada valor tem campo, porcentagem e slider — os três mexem no mesmo número.",
      "en": "For devices that don't use 127 for on and 0 for off. Each value has a field, a percentage and a slider — all three change the same number.",
      "es": "Para equipos que no usan 127 para encender y 0 para apagar. Cada valor tiene campo, porcentaje y slider — los tres cambian el mismo número."
     },
     "howto": [
      {
       "pt": "Toque no disco de controles ao lado do CANAL.",
       "en": "Tap the controls button next to CHANNEL.",
       "es": "Toca el botón de controles junto a CANAL."
      },
      {
       "pt": "Ajuste o <strong>VALOR OFF</strong> (em cima) e o <strong>VALOR ON</strong> (embaixo): digitando, arrastando o slider ou arrastando o próprio número.",
       "en": "Set <strong>VALUE OFF</strong> (top) and <strong>VALUE ON</strong> (bottom) by typing, dragging the slider or dragging the number itself.",
       "es": "Ajusta el <strong>VALOR OFF</strong> (arriba) y el <strong>VALOR ON</strong> (abajo): escribiendo, arrastrando el slider o arrastrando el propio número."
      }
     ],
     "shot": "sw-custom",
     "mockTitle": {
      "pt": "VALORES CUSTOM",
      "en": "CUSTOM VALUES",
      "es": "VALORES CUSTOM"
     },
     "fields": [
      {
       "name": {
        "pt": "Quando usar",
        "en": "When to use it",
        "es": "Cuándo usarlo"
       },
       "type": {
        "pt": "uso",
        "en": "use",
        "es": "uso"
       },
       "desc": {
        "pt": "<p>Aparelhos que ligam com 64, parâmetros que você quer em 30% e 80%, ou um volume que sobe só até onde o solo pede. Os mesmos valores custom existem em MACROS, MOMENTARY, SPIN, RAMP, TAP TEMPO e SINGLE.</p>",
        "en": "<p>Devices that turn on at 64, parameters you want at 30% and 80%, or a volume that only goes as high as the solo needs. The same custom values exist in MACROS, MOMENTARY, SPIN, RAMP, TAP TEMPO and SINGLE.</p>",
        "es": "<p>Equipos que encienden con 64, parámetros que quieres en 30% y 80%, o un volumen que sube solo hasta donde el solo lo pide. Los mismos valores custom existen en MACROS, MOMENTARY, SPIN, RAMP, TAP TEMPO y SINGLE.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-tap",
     "title": {
      "pt": "TAP TEMPO — bater o tempo com o pé",
      "en": "TAP TEMPO — tap the tempo with your foot",
      "es": "TAP TEMPO — marca el tempo con el pie"
     },
     "purpose": {
      "pt": "Você bate o tempo da música com o pé e a controladora manda o andamento para o delay — ou para até três destinos.",
      "en": "You tap the song's tempo with your foot and the controller sends it to the delay — or to up to three targets.",
      "es": "Marcas el tempo de la canción con el pie y la controladora lo envía al delay — o hasta a tres destinos."
     },
     "howto": [
      {
       "pt": "Escolha o CC de tap do seu aparelho e o canal. <strong>ADICIONAR TAP</strong> acrescenta até três destinos.",
       "en": "Choose your device's tap CC and the channel. <strong>ADD TAP</strong> adds up to three targets.",
       "es": "Elige el CC de tap de tu equipo y el canal. <strong>AÑADIR TAP</strong> agrega hasta tres destinos."
      },
      {
       "pt": "Para cada um, escolha <strong>MODO 1</strong> (manda CC + 127) ou <strong>MODO 2</strong> (CC + 127 seguido de CC + 0) — depende do que o seu aparelho espera.",
       "en": "For each one, choose <strong>MODE 1</strong> (sends CC + 127) or <strong>MODE 2</strong> (CC + 127 followed by CC + 0) — it depends on what your device expects.",
       "es": "Para cada uno, elige <strong>MODO 1</strong> (envía CC + 127) o <strong>MODO 2</strong> (CC + 127 seguido de CC + 0) — depende de lo que espera tu equipo."
      },
      {
       "pt": "Bata o tempo com o pé no ritmo da música. O LED pisca no tempo batido.",
       "en": "Tap the tempo with your foot in time with the song. The LED blinks at the tapped tempo.",
       "es": "Marca el tempo con el pie al ritmo de la canción. El LED parpadea al tempo marcado."
      }
     ],
     "shot": "sw-tap",
     "mockTitle": {
      "pt": "SW — MODO TAP TEMPO",
      "en": "SW — TAP TEMPO MODE",
      "es": "SW — MODO TAP TEMPO"
     },
     "fields": [
      {
       "name": {
        "pt": "SEGURAR",
        "en": "LONG PRESS",
        "es": "MANTENER"
       },
       "type": {
        "pt": "gesto",
        "en": "gesture",
        "es": "gesto"
       },
       "desc": {
        "pt": "<p>Segurar o footswitch pode mandar outro comando, com CC, canal e valores próprios — por exemplo, ligar o afinador. Sem canal no SEGURAR, segurar não muda o ícone da tela.</p>",
        "en": "<p>Holding the footswitch can send another command, with its own CC, channel and values — for example, turning on the tuner. With no channel on LONG PRESS, holding doesn't change the icon on the screen.</p>",
        "es": "<p>Mantener pisado el footswitch puede enviar otro comando, con CC, canal y valores propios — por ejemplo, encender el afinador. Sin canal en MANTENER, mantenerlo pisado no cambia el ícono de la pantalla.</p>"
       }
      },
      {
       "name": {
        "pt": "O BPM na tela",
        "en": "BPM on the screen",
        "es": "El BPM en la pantalla"
       },
       "type": {
        "pt": "visual",
        "en": "visual",
        "es": "visual"
       },
       "desc": {
        "pt": "<p>Ao bater o tempo, a controladora mostra o BPM num card temporário. O tempo que ele fica e se mostra a média ou os dois últimos toques se ajusta em <strong>CONFIGURAÇÕES › TELA</strong>. Desligar o card não apaga o tempo.</p>",
        "en": "<p>When you tap the tempo, the controller shows the BPM on a temporary card. How long it stays up, and whether it shows the average or the last two taps, is set in <strong>SETTINGS › DISPLAY</strong>. Turning the card off doesn't erase the tempo.</p>",
        "es": "<p>Al marcar el tempo, la controladora muestra el BPM en una tarjeta temporal. Cuánto tiempo se queda y si muestra el promedio o los dos últimos toques se ajusta en <strong>CONFIGURACIÓN › PANTALLA</strong>. Apagar la tarjeta no borra el tempo.</p>"
       }
      },
      {
       "name": {
        "pt": "Quem mais usa a batida",
        "en": "What else uses the beat",
        "es": "Quién más usa el pulso"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>O STEPS em <strong>SYNC TAP</strong> segue o tempo batido, e o <strong>MODO PALCO</strong> mostra o BPM na barra de cima. Com uma Valeton GP-5 plugada no USB Host e no Modo Amigável, um destino <strong>CC 119</strong> manda o tempo do delay em milissegundos direto para ela.</p>",
        "en": "<p>STEPS in <strong>SYNC TAP</strong> follows the tapped tempo, and <strong>STAGE MODE</strong> shows the BPM on the top bar. With a Valeton GP-5 plugged into the USB Host and set up in Friendly Mode, a <strong>CC 119</strong> target sends the delay time in milliseconds straight to it.</p>",
        "es": "<p>El STEPS en <strong>SYNC TAP</strong> sigue el tempo marcado, y el <strong>MODO ESCENARIO</strong> muestra el BPM en la barra de arriba. Con una Valeton GP-5 conectada al USB Host y en el Modo Amigable, un destino <strong>CC 119</strong> le envía directamente el tiempo del delay en milisegundos.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-single",
     "title": {
      "pt": "SINGLE — um comando por gesto",
      "en": "SINGLE — one command per gesture",
      "es": "SINGLE — un comando por gesto"
     },
     "purpose": {
      "pt": "Cada gesto manda sempre a mesma coisa. Sem liga/desliga — é um botão de comando puro, com até quatro mensagens por gesto.",
      "en": "Each gesture always sends the same thing. No on/off — it's a pure command button, with up to four messages per gesture.",
      "es": "Cada gesto envía siempre lo mismo. Sin encendido/apagado — es un botón de comando puro, con hasta cuatro mensajes por gesto."
     },
     "howto": [
      {
       "pt": "Escolha a aba do gesto: <strong>CLICK CURTO</strong>, <strong>CLICK LONGO</strong> ou <strong>RECLICK</strong>.",
       "en": "Choose the gesture tab: <strong>SHORT CLICK</strong>, <strong>LONG CLICK</strong> or <strong>RECLICK</strong>.",
       "es": "Elige la pestaña del gesto: <strong>CLIC CORTO</strong>, <strong>CLIC LARGO</strong> o <strong>RECLICK</strong>."
      },
      {
       "pt": "Preencha até quatro slots, cada um CC ou PC, com valor e canal.",
       "en": "Fill in up to four slots, each one CC or PC, with a value and a channel.",
       "es": "Completa hasta cuatro slots, cada uno CC o PC, con valor y canal."
      }
     ],
     "shot": "sw-single",
     "mockTitle": {
      "pt": "SW — MODO SINGLE",
      "en": "SW — SINGLE MODE",
      "es": "SW — MODO SINGLE"
     },
     "fields": [
      {
       "name": {
        "pt": "Quando usar",
        "en": "When to use it",
        "es": "Cuándo usarlo"
       },
       "type": {
        "pt": "uso",
        "en": "use",
        "es": "uso"
       },
       "desc": {
        "pt": "<p>Para comandos que não têm dois estados: chamar uma cena, disparar um sample, avançar a partitura, zerar um looper. E para os comandos de navegação da própria controladora (trocar banco ou preset sem sair do LIVE), que ficam no fim da lista de CC, marcados com <strong>»</strong>.</p>",
        "en": "<p>For commands that don't have two states: calling up a scene, firing a sample, advancing the sheet music, clearing a looper. And for the controller's own navigation commands (changing bank or preset without leaving LIVE), which are at the end of the CC list, marked with <strong>»</strong>.</p>",
        "es": "<p>Para comandos que no tienen dos estados: llamar una escena, disparar un sample, avanzar la partitura, borrar un looper. Y para los comandos de navegación de la propia controladora (cambiar de banco o preset sin salir de LIVE), que están al final de la lista de CC, marcados con <strong>»</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Os SINGLE andam em grupo",
        "en": "SINGLEs work as a group",
        "es": "Los SINGLE funcionan en grupo"
       },
       "type": {
        "pt": "LED e tela",
        "en": "LED and screen",
        "es": "LED y pantalla"
       },
       "desc": {
        "pt": "<p>Só o último SINGLE pisado fica aceso, como botões de rádio. Na tela, os que não foram os últimos usam as cores de <strong>INATIVO</strong>.</p>",
        "en": "<p>Only the last SINGLE you stepped on stays lit, like radio buttons. On the screen, the ones that weren't the last use the <strong>INACTIVE</strong> colors.</p>",
        "es": "<p>Solo el último SINGLE pisado queda encendido, como botones de radio. En la pantalla, los que no fueron los últimos usan los colores de <strong>INACTIVO</strong>.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-momentary",
     "title": {
      "pt": "MOMENTARY — só enquanto o pé está em cima",
      "en": "MOMENTARY — only while your foot is down",
      "es": "MOMENTARY — solo mientras el pie está encima"
     },
     "purpose": {
      "pt": "Liga ao pisar e desliga ao soltar: é um botão de campainha, não um interruptor. Até quatro mensagens por toque.",
      "en": "On when you press, off when you let go: it's a doorbell button, not a switch. Up to four messages per press.",
      "es": "Enciende al pisar y apaga al soltar: es un botón de timbre, no un interruptor. Hasta cuatro mensajes por toque."
     },
     "howto": [
      {
       "pt": "Preencha até quatro slots com CC e canal; use os valores custom se o aparelho não usar 127/0.",
       "en": "Fill in up to four slots with CC and channel; use custom values if the device doesn't use 127/0.",
       "es": "Completa hasta cuatro slots con CC y canal; usa los valores custom si el equipo no usa 127/0."
      },
      {
       "pt": "Se quiser, ajuste o comportamento do LED em <strong>TRAVA</strong> e <strong>Fade do LED</strong>.",
       "en": "If you like, adjust the LED behavior in <strong>LATCH</strong> and <strong>LED fade</strong>.",
       "es": "Si quieres, ajusta el comportamiento del LED en <strong>TRABA</strong> y <strong>Fade del LED</strong>."
      }
     ],
     "shot": "sw-momentary",
     "mockTitle": {
      "pt": "SW — MODO MOMENTARY",
      "en": "SW — MOMENTARY MODE",
      "es": "SW — MODO MOMENTARY"
     },
     "fields": [
      {
       "name": {
        "pt": "Para que serve",
        "en": "What it's for",
        "es": "Para qué sirve"
       },
       "type": {
        "pt": "uso",
        "en": "use",
        "es": "uso"
       },
       "desc": {
        "pt": "<p>Efeitos que você quer durante um trecho: um kill switch, um freeze, um boost de duas notas. Soltou o pé, acabou.</p>",
        "en": "<p>Effects you want for just one passage: a kill switch, a freeze, a two-note boost. Lift your foot and it's over.</p>",
        "es": "<p>Efectos que quieres durante un pasaje: un kill switch, un freeze, un boost de dos notas. Levantas el pie y se acabó.</p>"
       }
      },
      {
       "name": {
        "pt": "TRAVA e COMEÇA",
        "en": "LATCH and STARTS",
        "es": "TRABA y EMPIEZA"
       },
       "type": {
        "pt": "LED",
        "en": "LED",
        "es": "LED"
       },
       "desc": {
        "pt": "<p><strong>TRAVA</strong> faz o LED ficar aceso até o próximo toque, simulando um liga/desliga — útil quando o aparelho alterna sozinho a cada pulso. Com a trava, <strong>COMEÇA</strong> decide se o LED já nasce aceso ao chamar o preset (só o LED, sem MIDI).</p>",
        "en": "<p><strong>LATCH</strong> keeps the LED lit until the next press, simulating an on/off — useful when the device toggles by itself on each pulse. With latch on, <strong>STARTS</strong> decides whether the LED is already lit when the preset is called (just the LED, no MIDI).</p>",
        "es": "<p><strong>TRABA</strong> hace que el LED quede encendido hasta el siguiente toque, simulando un encendido/apagado — útil cuando el equipo alterna solo con cada pulso. Con la traba, <strong>EMPIEZA</strong> decide si el LED ya arranca encendido al llamar el preset (solo el LED, sin MIDI).</p>"
       }
      },
      {
       "name": {
        "pt": "Fade do LED",
        "en": "LED fade",
        "es": "Fade del LED"
       },
       "type": {
        "pt": "LED",
        "en": "LED",
        "es": "LED"
       },
       "desc": {
        "pt": "<p><strong>FADE ON</strong> e <strong>FADE OFF</strong> (em milissegundos) fazem o LED acender e apagar devagar; a animação pode ser <strong>JUNTOS</strong> (os três LEDs ao mesmo tempo) ou <strong>BARRA</strong> (enchendo em sequência). Só o LED: o MIDI e a tela trocam na hora.</p>",
        "en": "<p><strong>FADE ON</strong> and <strong>FADE OFF</strong> (in milliseconds) make the LED light up and go dark slowly; the animation can be <strong>TOGETHER</strong> (all three LEDs at once) or <strong>BAR</strong> (filling up in sequence). Only the LED: MIDI and the screen change instantly.</p>",
        "es": "<p><strong>FADE ON</strong> y <strong>FADE OFF</strong> (en milisegundos) hacen que el LED se encienda y se apague despacio; la animación puede ser <strong>JUNTOS</strong> (los tres LEDs al mismo tiempo) o <strong>BARRA</strong> (llenándose en secuencia). Solo el LED: el MIDI y la pantalla cambian al instante.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-macros",
     "title": {
      "pt": "MACROS — vários comandos num toque",
      "en": "MACROS — several commands in one press",
      "es": "MACROS — varios comandos en un toque"
     },
     "purpose": {
      "pt": "Um pé manda várias mensagens de uma vez — e manda os valores de desligado quando você pisa de novo.",
      "en": "One footswitch sends several messages at once — and sends the off values when you step on it again.",
      "es": "Un pie envía varios mensajes a la vez — y envía los valores de apagado cuando vuelves a pisar."
     },
     "howto": [
      {
       "pt": "Preencha até quatro slots com os comandos que devem sair juntos, cada um com o seu valor ON e OFF.",
       "en": "Fill in up to four slots with the commands that should go out together, each with its own ON and OFF value.",
       "es": "Completa hasta cuatro slots con los comandos que deben salir juntos, cada uno con su valor ON y OFF."
      },
      {
       "pt": "Se quiser, use as três seções de gesto, como no STOMP.",
       "en": "If you like, use the three gesture sections, just like in STOMP.",
       "es": "Si quieres, usa las tres secciones de gesto, como en el STOMP."
      }
     ],
     "shot": "sw-macros",
     "mockTitle": {
      "pt": "SW — MODO MACROS",
      "en": "SW — MACROS MODE",
      "es": "SW — MODO MACROS"
     },
     "fields": [
      {
       "name": {
        "pt": "O caso típico",
        "en": "The typical case",
        "es": "El caso típico"
       },
       "type": {
        "pt": "exemplo",
        "en": "example",
        "es": "ejemplo"
       },
       "desc": {
        "pt": "<p>O “pedalzão do refrão”: um toque liga o drive, sobe o delay, tira o chorus e aumenta o volume — quatro mensagens, um pé só. Ao desligar, tudo volta como estava.</p>",
        "en": "<p>The “big refrain pedal”: one press turns on the drive, raises the delay, cuts the chorus effect and turns up the volume — four messages, a single footswitch. Turn it off and everything goes back to how it was.</p>",
        "es": "<p>El “pedalazo del estribillo”: un toque enciende el drive, sube el delay, quita el chorus y aumenta el volumen — cuatro mensajes, un solo pie. Al apagarlo, todo vuelve a como estaba.</p>"
       }
      },
      {
       "name": {
        "pt": "Diferenças para o STOMP",
        "en": "Differences from STOMP",
        "es": "Diferencias con el STOMP"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>MACROS tem ANEL ÚNICO e VOLTA, como o STOMP, mas não tem FAVORITO.</p>",
        "en": "<p>MACROS has SINGLE RING and BACK, like STOMP, but no FAVORITE.</p>",
        "es": "<p>MACROS tiene ANILLO ÚNICO y VUELVE, como el STOMP, pero no tiene FAVORITO.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-spin",
     "title": {
      "pt": "SPIN — ciclar entre três valores",
      "en": "SPIN — cycle through three values",
      "es": "SPIN — recorre tres valores en ciclo"
     },
     "purpose": {
      "pt": "Cada toque avança para o próximo de três valores, em ciclo. O anel de LED mostra em qual você está.",
      "en": "Each press moves on to the next of three values, in a cycle. The LED ring shows which one you're on.",
      "es": "Cada toque avanza al siguiente de tres valores, en ciclo. El anillo de LED muestra en cuál estás."
     },
     "howto": [
      {
       "pt": "Escolha o CC e o canal e defina os três valores. Até três slots mandam juntos a cada toque.",
       "en": "Choose the CC and channel and set the three values. Up to three slots send together on each press.",
       "es": "Elige el CC y el canal y define los tres valores. Hasta tres slots envían juntos con cada toque."
      },
      {
       "pt": "Se quiser, use o <strong>SEGURAR</strong> para mandar um comando diferente ao segurar o pé.",
       "en": "If you like, use <strong>LONG PRESS</strong> to send a different command when you hold the footswitch down.",
       "es": "Si quieres, usa <strong>MANTENER</strong> para enviar un comando distinto al mantener pisado el footswitch."
      }
     ],
     "shot": "sw-spin",
     "mockTitle": {
      "pt": "SW — MODO SPIN",
      "en": "SW — SPIN MODE",
      "es": "SW — MODO SPIN"
     },
     "fields": [
      {
       "name": {
        "pt": "Os três estados",
        "en": "The three states",
        "es": "Los tres estados"
       },
       "type": {
        "pt": "ciclo",
        "en": "cycle",
        "es": "ciclo"
       },
       "desc": {
        "pt": "<p>Cada toque cicla 1 → 2 → 3 → 1. Serve para três níveis de ganho, três tempos de delay, três posições de um parâmetro.</p>",
        "en": "<p>Each press cycles 1 → 2 → 3 → 1. Great for three gain levels, three delay times, three positions of a parameter.</p>",
        "es": "<p>Cada toque recorre 1 → 2 → 3 → 1. Sirve para tres niveles de ganancia, tres tiempos de delay, tres posiciones de un parámetro.</p>"
       }
      },
      {
       "name": {
        "pt": "3 CORES",
        "en": "3 COLORS",
        "es": "3 COLORES"
       },
       "type": {
        "pt": "LED",
        "en": "LED",
        "es": "LED"
       },
       "desc": {
        "pt": "<p>Normalmente o anel acende um LED por posição, na mesma cor. Ligando <strong>3 CORES</strong>, os três LEDs acendem juntos e cada posição tem a sua cor — mais fácil de ler de longe.</p>",
        "en": "<p>Normally the ring lights one LED per position, all in the same color. With <strong>3 COLORS</strong> on, all three LEDs light together and each position has its own color — easier to read from a distance.</p>",
        "es": "<p>Normalmente el anillo enciende un LED por posición, en el mismo color. Al activar <strong>3 COLORES</strong>, los tres LEDs se encienden juntos y cada posición tiene su propio color — más fácil de leer de lejos.</p>"
       }
      },
      {
       "name": {
        "pt": "Na chamada do preset",
        "en": "When the preset is called",
        "es": "Al llamar el preset"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>Com o disparo ligado, o SPIN já entra na posição 1 mandando o primeiro valor. Desligado, o LED pisca esperando o primeiro toque.</p>",
        "en": "<p>With firing turned on, SPIN starts at position 1 and sends the first value right away. With it off, the LED blinks while it waits for the first press.</p>",
        "es": "<p>Con el disparo activado, el SPIN ya entra en la posición 1 enviando el primer valor. Desactivado, el LED parpadea esperando el primer toque.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-ramp",
     "title": {
      "pt": "RAMP — varrer suavemente",
      "en": "RAMP — sweep smoothly",
      "es": "RAMP — barrido suave"
     },
     "purpose": {
      "pt": "Em vez de saltar de um valor a outro, a controladora percorre o caminho inteiro — como se você girasse o knob com a mão.",
      "en": "Instead of jumping from one value to another, the controller travels the whole way — as if you were turning the knob by hand.",
      "es": "En vez de saltar de un valor a otro, la controladora recorre todo el camino — como si giraras la perilla con la mano."
     },
     "howto": [
      {
       "pt": "Defina a faixa (mínimo e máximo) e os tempos de <strong>SUBIDA</strong> e <strong>DESCIDA</strong>.",
       "en": "Set the range (minimum and maximum) and the <strong>RISE</strong> and <strong>FALL</strong> times.",
       "es": "Define el rango (mínimo y máximo) y los tiempos de <strong>SUBIDA</strong> y <strong>BAJADA</strong>."
      },
      {
       "pt": "Escolha a <strong>CURVA</strong> e o <strong>COMPORTAMENTO</strong>.",
       "en": "Choose the <strong>CURVE</strong> and the <strong>BEHAVIOR</strong>.",
       "es": "Elige la <strong>CURVA</strong> y el <strong>COMPORTAMIENTO</strong>."
      }
     ],
     "shot": "sw-ramp",
     "mockTitle": {
      "pt": "SW — MODO RAMP",
      "en": "SW — RAMP MODE",
      "es": "SW — MODO RAMP"
     },
     "fields": [
      {
       "name": {
        "pt": "TOGGLE, HOLD e LOOP",
        "en": "TOGGLE, HOLD and LOOP",
        "es": "TOGGLE, HOLD y LOOP"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p><strong>TOGGLE</strong>: cada toque inverte o sentido. <strong>HOLD</strong>: sobe enquanto o pé está em cima e volta ao soltar. <strong>LOOP</strong>: vai e volta sozinho, sem parar.</p>",
        "en": "<p><strong>TOGGLE</strong>: each press reverses the direction. <strong>HOLD</strong>: rises while your foot is down and comes back when you let go. <strong>LOOP</strong>: goes back and forth by itself, nonstop.</p>",
        "es": "<p><strong>TOGGLE</strong>: cada toque invierte el sentido. <strong>HOLD</strong>: sube mientras el pie está encima y vuelve al soltar. <strong>LOOP</strong>: va y vuelve solo, sin parar.</p>"
       }
      },
      {
       "name": {
        "pt": "A curva",
        "en": "The curve",
        "es": "La curva"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>LINEAR</strong> em velocidade constante, <strong>EXP</strong> devagar no começo, <strong>LOG</strong> rápido no começo, <strong>SINE</strong> suave nas duas pontas. Faz diferença real em volume e filtro.</p>",
        "en": "<p><strong>LINEAR</strong> at constant speed, <strong>EXP</strong> slow at the start, <strong>LOG</strong> fast at the start, <strong>SINE</strong> smooth at both ends. It makes a real difference on volume and filter.</p>",
        "es": "<p><strong>LINEAR</strong> a velocidad constante, <strong>EXP</strong> lento al principio, <strong>LOG</strong> rápido al principio, <strong>SINE</strong> suave en los dos extremos. Marca una diferencia real en volumen y filtro.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "A RAMP só funciona dentro do modo LIVE — ela não dispara na chamada do preset.",
       "en": "RAMP only works inside LIVE mode — it doesn't fire when the preset is called.",
       "es": "El RAMP solo funciona dentro del modo LIVE — no se dispara al llamar el preset."
      }
     ]
    },
    {
     "id": "sw-steps",
     "title": {
      "pt": "STEPS — sequenciador de CC",
      "en": "STEPS — CC sequencer",
      "es": "STEPS — secuenciador de CC"
     },
     "purpose": {
      "pt": "Ligado, o footswitch varre quatro valores num mesmo CC, em loop, sozinho — como se você girasse um knob no ritmo da música.",
      "en": "When it's on, the footswitch steps through four values on the same CC, in a loop, by itself — as if you were turning a knob in time with the song.",
      "es": "Encendido, el footswitch recorre cuatro valores en un mismo CC, en loop, solo — como si giraras una perilla al ritmo de la canción."
     },
     "howto": [
      {
       "pt": "Em <strong>SEQUÊNCIA</strong>, escolha o CC e o canal e preencha os quatro valores.",
       "en": "In <strong>SEQUENCE</strong>, choose the CC and channel and fill in the four values.",
       "es": "En <strong>SECUENCIA</strong>, elige el CC y el canal y completa los cuatro valores."
      },
      {
       "pt": "Escolha o ritmo: <strong>MANUAL</strong> (um tempo em milissegundos por step) ou <strong>SYNC TAP</strong> (uma figura musical por step, sobre a batida).",
       "en": "Choose the timing: <strong>MANUAL</strong> (a time in milliseconds per step) or <strong>SYNC TAP</strong> (a note value per step, based on the beat).",
       "es": "Elige el ritmo: <strong>MANUAL</strong> (un tiempo en milisegundos por step) o <strong>SYNC TAP</strong> (una figura musical por step, sobre el pulso)."
      },
      {
       "pt": "Se quiser, preencha <strong>LIGAR EFEITO</strong>: um segundo CC que recebe ON ao começar e OFF ao parar.",
       "en": "If you like, fill in <strong>TURN EFFECT ON</strong>: a second CC that gets ON when the sequence starts and OFF when it stops.",
       "es": "Si quieres, completa <strong>ENCENDER EFECTO</strong>: un segundo CC que recibe ON al empezar y OFF al parar."
      },
      {
       "pt": "Escolha como o footswitch aciona: <strong>ON/OFF</strong> ou <strong>MOMENTÂNEO</strong>.",
       "en": "Choose how the footswitch triggers it: <strong>ON/OFF</strong> or <strong>MOMENTARY</strong>.",
       "es": "Elige cómo lo acciona el footswitch: <strong>ON/OFF</strong> o <strong>MOMENTÁNEO</strong>."
      }
     ],
     "shot": "sw-steps",
     "mockTitle": {
      "pt": "SW — MODO STEPS",
      "en": "SW — STEPS MODE",
      "es": "SW — MODO STEPS"
     },
     "fields": [
      {
       "name": {
        "pt": "Os quatro valores",
        "en": "The four values",
        "es": "Los cuatro valores"
       },
       "type": {
        "pt": "sequência",
        "en": "sequence",
        "es": "secuencia"
       },
       "desc": {
        "pt": "<p>A sequência percorre os valores em ordem, em loop. Ao ligar, o primeiro step sai na hora; ao desligar, para imediatamente. Religar recomeça do primeiro.</p>",
        "en": "<p>The sequence goes through the values in order, in a loop. When you turn it on, the first step goes out right away; when you turn it off, it stops immediately. Turning it back on starts over from the first one.</p>",
        "es": "<p>La secuencia recorre los valores en orden, en loop. Al encenderla, el primer step sale al instante; al apagarla, se detiene de inmediato. Volver a encenderla empieza de nuevo desde el primero.</p>"
       }
      },
      {
       "name": {
        "pt": "MANUAL × SYNC TAP",
        "en": "MANUAL × SYNC TAP",
        "es": "MANUAL × SYNC TAP"
       },
       "type": {
        "pt": "ritmo",
        "en": "timing",
        "es": "ritmo"
       },
       "desc": {
        "pt": "<p>No <strong>MANUAL</strong>, cada step tem o seu tempo (até 2 s) — dá para fazer ritmos irregulares.</p><p>No <strong>SYNC TAP</strong>, cada step recebe uma figura musical sobre a batida. A batida pode vir do <strong>Tap</strong> (bateu um tempo novo, a sequência acompanha) ou de um <strong>BPM fixo</strong> (20 a 300) — com BPM fixo este footswitch ignora o tap, o que permite ritmo fixo aqui enquanto outro pé bate o tempo do delay.</p>",
        "en": "<p>In <strong>MANUAL</strong>, each step has its own time (up to 2 s) — so you can make irregular rhythms.</p><p>In <strong>SYNC TAP</strong>, each step gets a note value based on the beat. The beat can come from <strong>Tap</strong> (tap a new tempo and the sequence follows) or from a <strong>Fixed BPM</strong> (20 to 300) — with a fixed BPM this footswitch ignores the tap, so you can keep a fixed rhythm here while another footswitch taps the delay tempo.</p>",
        "es": "<p>En <strong>MANUAL</strong>, cada step tiene su propio tiempo (hasta 2 s) — puedes hacer ritmos irregulares.</p><p>En <strong>SYNC TAP</strong>, cada step recibe una figura musical sobre el pulso. El pulso puede venir del <strong>Tap</strong> (marcas un tempo nuevo y la secuencia lo sigue) o de un <strong>BPM fijo</strong> (20 a 300) — con BPM fijo este footswitch ignora el tap, lo que permite un ritmo fijo aquí mientras otro pie marca el tempo del delay.</p>"
       }
      },
      {
       "name": {
        "pt": "ON/OFF × MOMENTÂNEO",
        "en": "ON/OFF × MOMENTARY",
        "es": "ON/OFF × MOMENTÁNEO"
       },
       "type": {
        "pt": "acionamento",
        "en": "triggering",
        "es": "accionamiento"
       },
       "desc": {
        "pt": "<p><strong>ON/OFF</strong>: um toque liga, outro desliga, e a sequência continua com o pé fora. <strong>MOMENTÂNEO</strong>: roda só enquanto o footswitch está pisado; soltou, para e manda o OFF do efeito.</p>",
        "en": "<p><strong>ON/OFF</strong>: one press turns it on, another turns it off, and the sequence keeps running with your foot off. <strong>MOMENTARY</strong>: runs only while the footswitch is held down; let go and it stops and sends the effect's OFF.</p>",
        "es": "<p><strong>ON/OFF</strong>: un toque enciende, otro apaga, y la secuencia sigue con el pie afuera. <strong>MOMENTÁNEO</strong>: funciona solo mientras el footswitch está pisado; al soltarlo, se detiene y envía el OFF del efecto.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Como a RAMP, o STEPS só opera no modo LIVE (ou no HÍBRIDO). Trocar de preset também para a sequência.",
       "en": "Like RAMP, STEPS only runs in LIVE mode (or in HYBRID). Changing presets also stops the sequence.",
       "es": "Como RAMP, STEPS solo funciona en el modo LIVE (o en el HÍBRIDO). Cambiar de preset también detiene la secuencia."
      },
      {
       "pt": "O LED pisca no ritmo da sequência.",
       "en": "The LED blinks in time with the sequence.",
       "es": "El LED parpadea al ritmo de la secuencia."
      }
     ]
    },
    {
     "id": "sw-control",
     "title": {
      "pt": "CONTROL — seletor A/B",
      "en": "CONTROL — A/B selector",
      "es": "CONTROL — selector A/B"
     },
     "purpose": {
      "pt": "Um clique revezando dois destinos: quem entra recebe 127, quem sai recebe 0. Nunca ficam os dois ligados nem os dois desligados.",
      "en": "One click alternates between two targets: the one coming in gets 127, the one going out gets 0. They're never both on or both off.",
      "es": "Un clic alterna entre dos destinos: el que entra recibe 127, el que sale recibe 0. Nunca quedan los dos encendidos ni los dos apagados."
     },
     "howto": [
      {
       "pt": "Na aba <strong>FX 1</strong>, escolha o CC, o canal e a cor do LED do primeiro destino.",
       "en": "On the <strong>FX 1</strong> tab, choose the CC, the channel and the LED color for the first target.",
       "es": "En la pestaña <strong>FX 1</strong>, elige el CC, el canal y el color del LED del primer destino."
      },
      {
       "pt": "Na aba <strong>FX 2</strong>, faça o mesmo para o segundo.",
       "en": "On the <strong>FX 2</strong> tab, do the same for the second one.",
       "es": "En la pestaña <strong>FX 2</strong>, haz lo mismo para el segundo."
      },
      {
       "pt": "Em <strong>COMEÇA EM</strong>, escolha qual dos dois entra ativo quando o preset é chamado.",
       "en": "In <strong>STARTS ON</strong>, choose which of the two is active when the preset is called.",
       "es": "En <strong>EMPIEZA EN</strong>, elige cuál de los dos entra activo cuando se llama el preset."
      }
     ],
     "shot": "sw-control",
     "mockTitle": {
      "pt": "SW — MODO CONTROL",
      "en": "SW — CONTROL MODE",
      "es": "SW — MODO CONTROL"
     },
     "fields": [
      {
       "name": {
        "pt": "CONTROL ou STOMP de duas seções?",
        "en": "CONTROL or a two-section STOMP?",
        "es": "¿CONTROL o STOMP de dos secciones?"
       },
       "type": {
        "pt": "conceito",
        "en": "concept",
        "es": "concepto"
       },
       "desc": {
        "pt": "<p>Use CONTROL quando os dois efeitos são alternativas: dois amplificadores, dois canais, duas cabines. Use um STOMP de duas seções quando eles são independentes e podem estar ligados juntos.</p>",
        "en": "<p>Use CONTROL when the two effects are alternatives: two amps, two channels, two cabs. Use a two-section STOMP when they're independent and can be on at the same time.</p>",
        "es": "<p>Usa CONTROL cuando los dos efectos son alternativas: dos amplificadores, dos canales, dos gabinetes. Usa un STOMP de dos secciones cuando son independientes y pueden estar encendidos juntos.</p>"
       }
      },
      {
       "name": {
        "pt": "As cores e a tela",
        "en": "Colors and the screen",
        "es": "Los colores y la pantalla"
       },
       "type": {
        "pt": "visual",
        "en": "visual",
        "es": "visual"
       },
       "desc": {
        "pt": "<p>Cada destino tem a sua cor de LED e o seu ícone e cor de nome na tela. Como não existe “desligado”, o anel nunca apaga — ele troca de cor.</p>",
        "en": "<p>Each target has its own LED color, plus its own icon and name color on the screen. Since there's no “off”, the ring never goes dark — it changes color.</p>",
        "es": "<p>Cada destino tiene su propio color de LED y su propio ícono y color de nombre en la pantalla. Como no existe “apagado”, el anillo nunca se apaga — cambia de color.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Os valores são fixos (127 e 0). Para valores próprios, use o STOMP.",
       "en": "The values are fixed (127 and 0). For your own values, use STOMP.",
       "es": "Los valores son fijos (127 y 0). Para valores propios, usa el STOMP."
      },
      {
       "pt": "O 0 do destino que sai vai primeiro: assim os dois nunca ficam ligados ao mesmo tempo, nem por um instante.",
       "en": "The 0 for the outgoing target goes first: that way the two are never on at the same time, not even for an instant.",
       "es": "El 0 del destino que sale va primero: así los dos nunca quedan encendidos al mismo tiempo, ni por un instante."
      }
     ]
    },
    {
     "id": "sw-mute",
     "title": {
      "pt": "MUTE — footswitch sem função",
      "en": "MUTE — footswitch with no function",
      "es": "MUTE — footswitch sin función"
     },
     "purpose": {
      "pt": "O modo de quem não quer nada naquele pé: não manda MIDI, não acende LED, não aparece na tela.",
      "en": "The mode for when you want nothing on that footswitch: it sends no MIDI, lights no LED and doesn't show up on the screen.",
      "es": "El modo para cuando no quieres nada en ese pie: no envía MIDI, no enciende LED, no aparece en la pantalla."
     },
     "shot": "sw-mute",
     "mockTitle": {
      "pt": "SW — MODO MUTE",
      "en": "SW — MUTE MODE",
      "es": "SW — MODO MUTE"
     },
     "fields": [
      {
       "name": {
        "pt": "Por que existe",
        "en": "Why it exists",
        "es": "Por qué existe"
       },
       "type": {
        "pt": "uso",
        "en": "use",
        "es": "uso"
       },
       "desc": {
        "pt": "<p>É a forma de desativar um pé que estava em uso, sem apagar o resto do preset — e o modo de um footswitch que você ainda não quer usar.</p>",
        "en": "<p>It's the way to disable a footswitch that was in use without erasing the rest of the preset — and the mode for a footswitch you don't want to use yet.</p>",
        "es": "<p>Es la forma de desactivar un pie que estaba en uso, sin borrar el resto del preset — y el modo de un footswitch que todavía no quieres usar.</p>"
       }
      }
     ]
    },
    {
     "id": "sw-display",
     "title": {
      "pt": "A aparência de cada footswitch",
      "en": "How each footswitch looks",
      "es": "La apariencia de cada footswitch"
     },
     "purpose": {
      "pt": "Ícone, sigla e cores do quadradinho que representa o footswitch na tela da controladora — ligado e desligado.",
      "en": "Icon, label and colors of the little tile that represents the footswitch on the controller's screen — on and off.",
      "es": "Ícono, sigla y colores del cuadrito que representa al footswitch en la pantalla de la controladora — encendido y apagado."
     },
     "howto": [
      {
       "pt": "No computador, use a terceira coluna; no celular, o disco <strong>DISPLAY</strong> do card do footswitch.",
       "en": "On a computer, use the third column; on a phone, the round <strong>DISPLAY</strong> button on the footswitch card.",
       "es": "En la computadora, usa la tercera columna; en el celular, el botón redondo <strong>DISPLAY</strong> de la tarjeta del footswitch."
      },
      {
       "pt": "Toque em <strong>PRÉVIA ON</strong> ou <strong>PRÉVIA OFF</strong> para escolher o ícone (ou a opção <strong>TEXTO</strong>).",
       "en": "Tap <strong>PREVIEW ON</strong> or <strong>PREVIEW OFF</strong> to choose the icon (or the <strong>TEXT</strong> option).",
       "es": "Toca <strong>VISTA ON</strong> o <strong>VISTA OFF</strong> para elegir el ícono (o la opción <strong>TEXTO</strong>)."
      },
      {
       "pt": "Ajuste <strong>FUNDO</strong> e <strong>BORDA</strong> (cada um com OFF e ON), a sigla e a cor do nome.",
       "en": "Adjust <strong>BACK</strong> and <strong>BORDER</strong> (each with OFF and ON), the label and the name color.",
       "es": "Ajusta <strong>FONDO</strong> y <strong>BORDE</strong> (cada uno con OFF y ON), la sigla y el color del nombre."
      }
     ],
     "shot": "live-display",
     "mockTitle": {
      "pt": "APARÊNCIA DO FOOTSWITCH",
      "en": "FOOTSWITCH APPEARANCE",
      "es": "APARIENCIA DEL FOOTSWITCH"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-sw-disp-group-preview",
       "label": {
        "pt": "prévias e ícone",
        "en": "previews and icon",
        "es": "vistas e ícono"
       }
      },
      {
       "n": 2,
       "sel": ".bf-sw-disp-colors",
       "label": {
        "pt": "fundo e borda",
        "en": "background and border",
        "es": "fondo y borde"
       }
      },
      {
       "n": 3,
       "sel": ".bf-sw-disp-name-row",
       "label": {
        "pt": "sigla e cor do nome",
        "en": "label and name color",
        "es": "sigla y color del nombre"
       }
      },
      {
       "n": 4,
       "sel": ".bf-sw-disp-font",
       "label": {
        "pt": "tamanho da fonte",
        "en": "font size",
        "es": "tamaño de fuente"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Ícone e sigla",
        "en": "Icon and label",
        "es": "Ícono y sigla"
       },
       "type": {
        "pt": "conteúdo",
        "en": "content",
        "es": "contenido"
       },
       "desc": {
        "pt": "<p>O ícone vem de uma biblioteca embutida (pedais, efeitos, símbolos) ou das imagens que você enviou em <strong>CONFIGURAÇÕES › IMAGENS</strong>. A sigla é o texto curto — “DRIVE”, “DLY”, “SOLO” —, com até 8 caracteres (6 por estado no SPIN, no SINGLE e no CONTROL).</p><p>Ícones coloridos (fotos de pedais) aparecem como são; os de traço levam a cor que você escolher.</p>",
        "en": "<p>The icon comes from a built-in library (pedals, effects, symbols) or from the images you uploaded in <strong>SETTINGS › IMAGES</strong>. The label is the short text — “DRIVE”, “DLY”, “SOLO” —, up to 8 characters (6 per state in SPIN, SINGLE and CONTROL).</p><p>Color icons (pedal photos) show as they are; line icons take the color you choose.</p>",
        "es": "<p>El ícono viene de una biblioteca integrada (pedales, efectos, símbolos) o de las imágenes que subiste en <strong>CONFIGURACIÓN › IMÁGENES</strong>. La sigla es el texto corto — “DRIVE”, “DLY”, “SOLO” —, de hasta 8 caracteres (6 por estado en SPIN, SINGLE y CONTROL).</p><p>Los íconos a color (fotos de pedales) se ven tal cual; los de trazo toman el color que elijas.</p>"
       }
      },
      {
       "name": {
        "pt": "TAMANHO DA FONTE",
        "en": "FONT SIZE",
        "es": "TAMAÑO DE FUENTE"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>AUTO</strong> deixa a controladora escolher pelo espaço; ou fixe em 9, 12, 18 ou 24 pt. Se o texto não couber, a controladora desce um degrau por vez até caber. O tamanho é do footswitch inteiro, não de cada estado.</p>",
        "en": "<p><strong>AUTO</strong> lets the controller choose based on the available space; or set it to 9, 12, 18 or 24 pt. If the text doesn't fit, the controller steps down one size at a time until it does. The size applies to the whole footswitch, not to each state.</p>",
        "es": "<p><strong>AUTO</strong> deja que la controladora elija según el espacio; o fíjalo en 9, 12, 18 o 24 pt. Si el texto no cabe, la controladora baja un escalón a la vez hasta que quepa. El tamaño es del footswitch entero, no de cada estado.</p>"
       }
      },
      {
       "name": {
        "pt": "Cores OFF e ON",
        "en": "OFF and ON colors",
        "es": "Colores OFF y ON"
       },
       "type": {
        "pt": "cores",
        "en": "colors",
        "es": "colores"
       },
       "desc": {
        "pt": "<p>Fundo, borda e cor do nome, cada um com um valor para desligado e outro para ligado. Bem escolhidas, deixam o estado do efeito legível de longe.</p>",
        "en": "<p>Background, border and name color, each with one value for off and another for on. Well chosen, they make the effect's state readable from a distance.</p>",
        "es": "<p>Fondo, borde y color del nombre, cada uno con un valor para apagado y otro para encendido. Bien elegidos, hacen que el estado del efecto se lea de lejos.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Nos modos com abas (seções do STOMP e MACROS, FX 1/FX 2 do CONTROL, posições do SPIN, gestos do SINGLE), a aba escolhida no card do modo é a mesma aqui — cada seção tem o seu ícone e as suas cores.",
       "en": "In modes with tabs (STOMP and MACROS sections, CONTROL's FX 1/FX 2, SPIN positions, SINGLE gestures), the tab you pick on the mode card is the same one here — each section has its own icon and colors.",
       "es": "En los modos con pestañas (secciones del STOMP y MACROS, FX 1/FX 2 del CONTROL, posiciones del SPIN, gestos del SINGLE), la pestaña elegida en la tarjeta del modo es la misma aquí — cada sección tiene su propio ícono y sus propios colores."
      }
     ]
    }
   ]
  },
  {
   "id": "palco",
   "icon": "palco",
   "page": 4,
   "title": {
    "pt": "Modo Palco",
    "en": "Stage Mode",
    "es": "Modo Escenario"
   },
   "summary": {
    "pt": "Uma tela cheia, deitada e de letra grande para deixar o celular ou o tablet na estante durante o show: o preset que está tocando, os footswitches e o aparelho plugado.",
    "en": "A full-screen landscape view with big lettering, so you can leave your phone or tablet on the stand during the show: the preset that's playing, the footswitches and the plugged-in device.",
    "es": "Una pantalla completa, en horizontal y con letras grandes para dejar el celular o la tablet en el atril durante el show: el preset que está sonando, los footswitches y el aparato conectado."
   },
   "intro": {
    "pt": "<p>O <strong>MODO PALCO</strong> transforma o editor num painel para o show. São duas telas: o <strong>PALCO 1</strong> mostra a BFMiDi — o nome do preset em letra enorme, a imagem de fundo e os footswitches, que você pode ligar e desligar com o dedo — e o <strong>PALCO 2</strong> mostra o aparelho plugado na controladora — a cadeia de efeitos e os knobs da GP-5, da TONEX ONE ou da Nano Cortex, editáveis ao vivo.</p><p>As configurações do palco (cores, fonte, imagens) ficam só no aparelho onde você abriu: nada disso vai para a controladora.</p>",
    "en": "<p><strong>STAGE MODE</strong> turns the editor into a panel for the show. There are two screens: <strong>STAGE 1</strong> shows the BFMiDi — the preset name in huge letters, the background image and the footswitches, which you can turn on and off with your finger — and <strong>STAGE 2</strong> shows the device plugged into the controller — the effect chain and the knobs of the GP-5, the TONEX ONE or the Nano Cortex, editable live.</p><p>The stage settings (colors, font, images) stay only on the device where you opened it: none of it goes to the controller.</p>",
    "es": "<p>El <strong>MODO ESCENARIO</strong> convierte el editor en un panel para el show. Son dos pantallas: el <strong>ESCENARIO 1</strong> muestra la BFMiDi — el nombre del preset en letras enormes, la imagen de fondo y los footswitches, que puedes encender y apagar con el dedo — y el <strong>ESCENARIO 2</strong> muestra el aparato conectado a la controladora — la cadena de efectos y los knobs de la GP-5, la TONEX ONE o la Nano Cortex, editables en vivo.</p><p>La configuración del escenario (colores, fuente, imágenes) queda solo en el aparato donde lo abriste: nada de esto va a la controladora.</p>"
   },
   "cards": [
    {
     "id": "palco-abrir",
     "title": {
      "pt": "Abrir o Modo Palco e o PALCO 1",
      "en": "Opening Stage Mode and STAGE 1",
      "es": "Abrir el Modo Escenario y el ESCENARIO 1"
     },
     "purpose": {
      "pt": "O PALCO 1 é o painel genérico: o preset da BFMiDi em letra grande, a imagem do preset e os ícones dos footswitches — iguais aos da tela da controladora.",
      "en": "STAGE 1 is the general-purpose panel: the BFMiDi preset in big letters, the preset image and the footswitch icons — the same ones shown on the controller's screen.",
      "es": "El ESCENARIO 1 es el panel general: el preset de la BFMiDi en letras grandes, la imagen del preset y los íconos de los footswitches — iguales a los de la pantalla de la controladora."
     },
     "howto": [
      {
       "pt": "Na tela PRESET, toque em <strong>MODO PALCO</strong> — é sempre o primeiro botão da fileira de atalhos do card PRINCIPAL.",
       "en": "On the PRESET screen, tap <strong>STAGE MODE</strong> — it's always the first button in the shortcut row of the MAIN card.",
       "es": "En la pantalla PRESET, toca <strong>MODO ESCENARIO</strong> — siempre es el primer botón de la fila de atajos de la tarjeta PRINCIPAL."
      },
      {
       "pt": "O palco abre sempre no <strong>PALCO 1</strong>. No celular ele ocupa a tela inteira e fica deitado.",
       "en": "The stage always opens on <strong>STAGE 1</strong>. On a phone it fills the whole screen in landscape.",
       "es": "El escenario siempre abre en el <strong>ESCENARIO 1</strong>. En el celular ocupa toda la pantalla y queda en horizontal."
      },
      {
       "pt": "Toque num ícone de footswitch para ligar ou desligar o efeito; toque num preset da fileira de baixo para trocar de música.",
       "en": "Tap a footswitch icon to turn the effect on or off; tap a preset in the bottom row to switch songs.",
       "es": "Toca un ícono de footswitch para encender o apagar el efecto; toca un preset de la fila de abajo para cambiar de canción."
      }
     ],
     "shot": "stage-1",
     "mockTitle": {
      "pt": "PALCO 1",
      "en": "STAGE 1",
      "es": "ESCENARIO 1"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-stage-name-big",
       "label": {
        "pt": "nome do preset",
        "en": "preset name",
        "es": "nombre del preset"
       }
      },
      {
       "n": 2,
       "sel": ".bf-stage-img",
       "label": {
        "pt": "imagem",
        "en": "image",
        "es": "imagen"
       }
      },
      {
       "n": 3,
       "sel": ".bf-stage-sws",
       "label": {
        "pt": "footswitches",
        "en": "footswitches",
        "es": "footswitches"
       }
      },
      {
       "n": 4,
       "sel": ".bf-stage-fsw",
       "label": {
        "pt": "presets do banco",
        "en": "bank presets",
        "es": "presets del banco"
       }
      },
      {
       "n": 5,
       "sel": ".bf-stage-handle",
       "at": "c",
       "label": {
        "pt": "barra de controles",
        "en": "control bar",
        "es": "barra de controles"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "O letreiro",
        "en": "The marquee",
        "es": "El letrero"
       },
       "type": {
        "pt": "nome do preset",
        "en": "preset name",
        "es": "nombre del preset"
       },
       "desc": {
        "pt": "<p>O nome do preset no maior tamanho que cabe, em até duas linhas. Em cima, o banco e o preset (<strong>A1</strong>) e se a controladora está em <strong>MODO PRESET</strong> ou <strong>MODO LIVE</strong>; embaixo, o aparelho do Modo Amigável.</p>",
        "en": "<p>The preset name at the largest size that fits, on up to two lines. Above it, the bank and preset (<strong>A1</strong>) and whether the controller is in <strong>PRESET MODE</strong> or <strong>LIVE MODE</strong>; below it, the Friendly Mode device.</p>",
        "es": "<p>El nombre del preset en el mayor tamaño que cabe, en hasta dos líneas. Arriba, el banco y el preset (<strong>A1</strong>) y si la controladora está en <strong>MODO PRESET</strong> o <strong>MODO LIVE</strong>; abajo, el aparato del Modo Amigable.</p>"
       }
      },
      {
       "name": {
        "pt": "A imagem",
        "en": "The image",
        "es": "La imagen"
       },
       "type": {
        "pt": "fundo",
        "en": "background",
        "es": "fondo"
       },
       "desc": {
        "pt": "<p>Por padrão é o <strong>mesmo fundo da tela da controladora</strong> naquele preset (o de PRESET ou o de LIVE, conforme o modo). Nos aplicativos você também pode usar a galeria do app ou uma foto sua — veja <strong>As imagens do palco</strong>.</p>",
        "en": "<p>By default it's the <strong>same background as the controller's screen</strong> for that preset (the PRESET one or the LIVE one, depending on the mode). In the apps you can also use the app gallery or one of your own photos — see <strong>Stage images</strong>.</p>",
        "es": "<p>Por defecto es el <strong>mismo fondo de la pantalla de la controladora</strong> en ese preset (el de PRESET o el de LIVE, según el modo). En las apps también puedes usar la galería de la app o una foto tuya — mira <strong>Las imágenes del escenario</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Os footswitches",
        "en": "The footswitches",
        "es": "Los footswitches"
       },
       "type": {
        "pt": "ícones",
        "en": "icons",
        "es": "íconos"
       },
       "desc": {
        "pt": "<p>Os mesmos ícones da tela do pedal, com o número e uma barrinha na cor do LED. Footswitches sem canal MIDI ficam em branco, como na controladora.</p><p><strong>Tocar no ícone</strong> faz o mesmo que um clique curto no pé: liga ou desliga o efeito e manda o MIDI. Vale para os modos de liga/desliga — STOMP, MACROS, CONTROL e STEPS (este no LIVE ou no HÍBRIDO); nos outros aparece o aviso “Este modo não liga/desliga”.</p>",
        "en": "<p>The same icons as on the pedal screen, with the number and a small bar in the LED color. Footswitches with no MIDI channel stay blank, just like on the controller.</p><p><strong>Tapping the icon</strong> does the same as a short click with your foot: it turns the effect on or off and sends the MIDI. This works for the on/off modes — STOMP, MACROS, CONTROL and STEPS (the last one only in LIVE); in the other modes you'll see the message “This mode has no on/off”.</p>",
        "es": "<p>Los mismos íconos de la pantalla del pedal, con el número y una barrita en el color del LED. Los footswitches sin canal MIDI quedan en blanco, como en la controladora.</p><p><strong>Tocar el ícono</strong> hace lo mismo que un clic corto con el pie: enciende o apaga el efecto y envía el MIDI. Vale para los modos de encendido/apagado — STOMP, MACROS, CONTROL y STEPS (este en LIVE o en el HÍBRIDO); en los demás aparece el aviso “Este modo no enciende/apaga”.</p>"
       }
      },
      {
       "name": {
        "pt": "Presets do banco",
        "en": "Bank presets",
        "es": "Presets del banco"
       },
       "type": {
        "pt": "fileira",
        "en": "row",
        "es": "fila"
       },
       "desc": {
        "pt": "<p>Os seis presets do banco atual, com número e nome. Tocar chama o preset na controladora, exatamente como pisar no footswitch dele.</p>",
        "en": "<p>The six presets of the current bank, with number and name. Tapping one calls that preset on the controller, exactly like stepping on its footswitch.</p>",
        "es": "<p>Los seis presets del banco actual, con número y nombre. Tocar uno llama ese preset en la controladora, exactamente como pisar su footswitch.</p>"
       }
      },
      {
       "name": {
        "pt": "A alcinha do topo",
        "en": "The top handle",
        "es": "La lengüeta superior"
       },
       "type": {
        "pt": "barra escondida",
        "en": "hidden bar",
        "es": "barra oculta"
       },
       "desc": {
        "pt": "<p>A barra de controles fica escondida para não roubar espaço. Toque na alcinha do topo — ou em qualquer área vazia da tela — para mostrá-la. Ela some sozinha depois de alguns segundos.</p>",
        "en": "<p>The control bar stays hidden so it doesn't take up space. Tap the handle at the top — or any empty area of the screen — to show it. It hides again on its own after a few seconds.</p>",
        "es": "<p>La barra de controles queda oculta para no robar espacio. Toca la lengüeta de arriba — o cualquier área vacía de la pantalla — para mostrarla. Se oculta sola después de unos segundos.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Ligar e desligar footswitches pelo palco exige a controladora atualizada. Com firmware antigo o ícone avisa “Atualize a controladora para usar”.",
       "en": "Turning footswitches on and off from the stage requires an up-to-date controller. With older firmware the icon shows “Update the controller to use this”.",
       "es": "Encender y apagar footswitches desde el escenario requiere la controladora actualizada. Con firmware antiguo el ícono avisa “Actualice la controladora para usarlo”."
      },
      {
       "pt": "Sem pedal conectado o palco mostra a marca <strong>OFFLINE</strong>; a conexão na barra de cima vira um botão que abre a janela de conexão.",
       "en": "With no pedal connected, the stage shows the <strong>OFFLINE</strong> tag; the connection item in the top bar becomes a button that opens the connection window.",
       "es": "Sin pedal conectado, el escenario muestra la etiqueta <strong>OFFLINE</strong>; la conexión en la barra de arriba se convierte en un botón que abre la ventana de conexión."
      }
     ]
    },
    {
     "id": "palco-barra",
     "title": {
      "pt": "A barra de controles",
      "en": "The control bar",
      "es": "La barra de controles"
     },
     "purpose": {
      "pt": "Sair, trocar entre PALCO 1 e PALCO 2, ver o preset, abrir as configurações e acompanhar a conexão e o BPM.",
      "en": "Exit, switch between STAGE 1 and STAGE 2, see the preset, open the settings and keep an eye on the connection and the BPM.",
      "es": "Salir, cambiar entre ESCENARIO 1 y ESCENARIO 2, ver el preset, abrir los ajustes y seguir la conexión y el BPM."
     },
     "shot": "stage-1-barra",
     "mockTitle": {
      "pt": "PALCO 1 — BARRA ABERTA",
      "en": "STAGE 1 — BAR OPEN",
      "es": "ESCENARIO 1 — BARRA ABIERTA"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-stage-top .bf-stage-pill:first-child",
       "at": "c",
       "label": {
        "pt": "SAIR",
        "en": "EXIT",
        "es": "SALIR"
       }
      },
      {
       "n": 2,
       "sel": ".bf-stage-view",
       "at": "c",
       "label": {
        "pt": "PALCO 1 / 2",
        "en": "STAGE 1 / 2",
        "es": "ESCENARIO 1 / 2"
       }
      },
      {
       "n": 3,
       "sel": ".bf-stage-pill.is-tag",
       "at": "c",
       "label": {
        "pt": "preset",
        "en": "preset",
        "es": "preset"
       }
      },
      {
       "n": 4,
       "sel": ".bf-stage-top button[aria-haspopup='dialog']",
       "at": "c",
       "label": {
        "pt": "configurações",
        "en": "settings",
        "es": "ajustes"
       }
      },
      {
       "n": 5,
       "sel": ".bf-stage-status",
       "at": "c",
       "label": {
        "pt": "conexão e BPM",
        "en": "connection and BPM",
        "es": "conexión y BPM"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "SAIR",
        "en": "EXIT",
        "es": "SALIR"
       },
       "type": {
        "pt": "botão",
        "en": "button",
        "es": "botón"
       },
       "desc": {
        "pt": "<p>Fecha o palco e volta ao editor. O ESC do teclado faz o mesmo.</p>",
        "en": "<p>Closes the stage and goes back to the editor. The ESC key on the keyboard does the same.</p>",
        "es": "<p>Cierra el escenario y vuelve al editor. La tecla ESC del teclado hace lo mismo.</p>"
       }
      },
      {
       "name": {
        "pt": "PALCO 1 / PALCO 2",
        "en": "STAGE 1 / STAGE 2",
        "es": "ESCENARIO 1 / ESCENARIO 2"
       },
       "type": {
        "pt": "botão",
        "en": "button",
        "es": "botón"
       },
       "desc": {
        "pt": "<p>Um botão só, que alterna entre as duas telas; os dois pontinhos dizem em qual você está.</p>",
        "en": "<p>A single button that toggles between the two screens; the two little dots tell you which one you're on.</p>",
        "es": "<p>Un solo botón, que alterna entre las dos pantallas; los dos puntitos indican en cuál estás.</p>"
       }
      },
      {
       "name": {
        "pt": "PRESET A1",
        "en": "PRESET A1",
        "es": "PRESET A1"
       },
       "type": {
        "pt": "informação",
        "en": "info",
        "es": "información"
       },
       "desc": {
        "pt": "<p>O banco e o preset que estão tocando na controladora.</p>",
        "en": "<p>The bank and preset currently playing on the controller.</p>",
        "es": "<p>El banco y el preset que están sonando en la controladora.</p>"
       }
      },
      {
       "name": {
        "pt": "CONFIGURAÇÕES",
        "en": "SETTINGS",
        "es": "AJUSTES"
       },
       "type": {
        "pt": "botão",
        "en": "button",
        "es": "botón"
       },
       "desc": {
        "pt": "<p>Abre as configurações do palco, em quatro abas. Veja os cards seguintes.</p>",
        "en": "<p>Opens the stage settings, in four tabs. See the following cards.</p>",
        "es": "<p>Abre la configuración del escenario, en cuatro pestañas. Mira las tarjetas siguientes.</p>"
       }
      },
      {
       "name": {
        "pt": "Conexão, BPM e relógio",
        "en": "Connection, BPM and clock",
        "es": "Conexión, BPM y reloj"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Como você está conectado (STA, AP ou USB), o BPM do último TAP TEMPO batido na BFMiDi e, se você ligar, o relógio. Sem pedal, a conexão vira o botão <strong>OFFLINE</strong>.</p>",
        "en": "<p>How you're connected (STA, AP or USB), the BPM of the last TAP TEMPO tapped on the BFMiDi and, if you turn it on, the clock. With no pedal, the connection turns into the <strong>OFFLINE</strong> button.</p>",
        "es": "<p>Cómo estás conectado (STA, AP o USB), el BPM del último TAP TEMPO marcado en la BFMiDi y, si lo activas, el reloj. Sin pedal, la conexión se convierte en el botón <strong>OFFLINE</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "No PALCO 2",
        "en": "On STAGE 2",
        "es": "En el ESCENARIO 2"
       },
       "type": {
        "pt": "extras",
        "en": "extras",
        "es": "extras"
       },
       "desc": {
        "pt": "<p>Aparecem também o seletor do aparelho (<strong>GP-5</strong>, <strong>TONEX</strong>, <strong>NANO CORTEX</strong>, <strong>KEMPER</strong>) e o botão <strong>EDITOR</strong>, que abre o editor de preset completo por cima do palco.</p>",
        "en": "<p>You'll also see the device selector (<strong>GP-5</strong>, <strong>TONEX</strong>, <strong>NANO CORTEX</strong>, <strong>KEMPER</strong>) and the <strong>EDITOR</strong> button, which opens the full preset editor on top of the stage.</p>",
        "es": "<p>También aparecen el selector de aparato (<strong>GP-5</strong>, <strong>TONEX</strong>, <strong>NANO CORTEX</strong>, <strong>KEMPER</strong>) y el botón <strong>EDITOR</strong>, que abre el editor de preset completo encima del escenario.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-2",
     "title": {
      "pt": "PALCO 2 — o aparelho plugado",
      "en": "STAGE 2 — the plugged-in device",
      "es": "ESCENARIO 2 — el aparato conectado"
     },
     "purpose": {
      "pt": "Mostra o preset do aparelho ligado no USB Host da controladora, com a cadeia de efeitos e os knobs — e deixa você mexer neles ao vivo.",
      "en": "Shows the preset of the device connected to the controller's USB Host, with the effect chain and the knobs — and lets you tweak them live.",
      "es": "Muestra el preset del aparato conectado al USB Host de la controladora, con la cadena de efectos y los knobs — y te deja ajustarlos en vivo."
     },
     "howto": [
      {
       "pt": "Abra a barra de controles e toque em <strong>PALCO 1</strong> para trocar para o <strong>PALCO 2</strong>.",
       "en": "Open the control bar and tap <strong>STAGE 1</strong> to switch to <strong>STAGE 2</strong>.",
       "es": "Abre la barra de controles y toca <strong>ESCENARIO 1</strong> para cambiar al <strong>ESCENARIO 2</strong>."
      },
      {
       "pt": "<strong>Toque</strong> num bloco da cadeia para ver os knobs dele.",
       "en": "<strong>Tap</strong> a block in the chain to see its knobs.",
       "es": "<strong>Toca</strong> un bloque de la cadena para ver sus knobs."
      },
      {
       "pt": "<strong>Segure</strong> o bloco por meio segundo para ligar ou desligar o efeito.",
       "en": "<strong>Hold</strong> the block for half a second to turn the effect on or off.",
       "es": "<strong>Mantén presionado</strong> el bloque medio segundo para encender o apagar el efecto."
      },
      {
       "pt": "Arraste um knob para cima ou para baixo para mudar o valor. O som muda na hora.",
       "en": "Drag a knob up or down to change the value. The sound changes right away.",
       "es": "Arrastra un knob hacia arriba o hacia abajo para cambiar el valor. El sonido cambia al instante."
      }
     ],
     "shot": "stage-2",
     "mockTitle": {
      "pt": "PALCO 2 — VALETON GP-5",
      "en": "STAGE 2 — VALETON GP-5",
      "es": "ESCENARIO 2 — VALETON GP-5"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-stage-head",
       "label": {
        "pt": "preset do aparelho",
        "en": "device preset",
        "es": "preset del aparato"
       }
      },
      {
       "n": 2,
       "sel": ".bf-stage-chain",
       "label": {
        "pt": "cadeia",
        "en": "chain",
        "es": "cadena"
       }
      },
      {
       "n": 3,
       "sel": ".bf-stage-model",
       "label": {
        "pt": "modelo do bloco",
        "en": "block model",
        "es": "modelo del bloque"
       }
      },
      {
       "n": 4,
       "sel": ".bf-stage-knobs",
       "label": {
        "pt": "knobs",
        "en": "knobs",
        "es": "knobs"
       }
      },
      {
       "n": 5,
       "sel": ".bf-stage-fsw",
       "label": {
        "pt": "presets da BFMiDi",
        "en": "BFMiDi presets",
        "es": "presets de la BFMiDi"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Quais aparelhos",
        "en": "Which devices",
        "es": "Qué aparatos"
       },
       "type": {
        "pt": "compatibilidade",
        "en": "compatibility",
        "es": "compatibilidad"
       },
       "desc": {
        "pt": "<p><strong>Valeton GP-5</strong>, <strong>IK TONEX ONE</strong> e <strong>Neural DSP Nano Cortex</strong> plugadas no USB Host da controladora. O palco abre no primeiro aparelho conectado; os outros aparecem no seletor como “não conectado”. O <strong>Kemper Player</strong> tem uma tela própria (card seguinte).</p>",
        "en": "<p><strong>Valeton GP-5</strong>, <strong>IK TONEX ONE</strong> and <strong>Neural DSP Nano Cortex</strong> plugged into the controller's USB Host. The stage opens on the first connected device; the others appear in the selector as “not connected”. The <strong>Kemper Player</strong> has its own screen (next card).</p>",
        "es": "<p><strong>Valeton GP-5</strong>, <strong>IK TONEX ONE</strong> y <strong>Neural DSP Nano Cortex</strong> conectadas al USB Host de la controladora. El escenario abre en el primer aparato conectado; los demás aparecen en el selector como “no conectado”. El <strong>Kemper Player</strong> tiene su propia pantalla (tarjeta siguiente).</p>"
       }
      },
      {
       "name": {
        "pt": "O cabeçalho",
        "en": "The header",
        "es": "El encabezado"
       },
       "type": {
        "pt": "preset do aparelho",
        "en": "device preset",
        "es": "preset del aparato"
       },
       "desc": {
        "pt": "<p>Número e nome do preset do aparelho e, embaixo, qual preset da BFMiDi está tocando. Com edição feita aparece <strong>EDITADO, NÃO SALVO</strong>. O disquete (GP-5 e Nano Cortex) grava a edição no aparelho; a TONEX ONE grava sozinha.</p>",
        "en": "<p>The device preset's number and name and, below them, which BFMiDi preset is playing. Once you've edited something, <strong>EDITED, NOT SAVED</strong> appears. The floppy-disk icon (GP-5 and Nano Cortex) saves the edit to the device; the TONEX ONE saves on its own.</p>",
        "es": "<p>Número y nombre del preset del aparato y, abajo, qué preset de la BFMiDi está sonando. Cuando editas algo aparece <strong>EDITADO, SIN GUARDAR</strong>. El disquete (GP-5 y Nano Cortex) graba la edición en el aparato; la TONEX ONE graba sola.</p>"
       }
      },
      {
       "name": {
        "pt": "A cadeia de efeitos",
        "en": "The effect chain",
        "es": "La cadena de efectos"
       },
       "type": {
        "pt": "blocos",
        "en": "blocks",
        "es": "bloques"
       },
       "desc": {
        "pt": "<p>Cada bloco tem o LED de ligado, o ícone e a sigla, na cor da categoria. Na GP-5 a cadeia segue a ordem real do patch. Tocar mostra os knobs; <strong>segurar</strong> liga e desliga — de propósito, para um toque sem querer no palco não desligar o efeito.</p>",
        "en": "<p>Each block has its on LED, icon and short label, in the category color. On the GP-5 the chain follows the patch's real order. Tapping shows the knobs; <strong>holding</strong> turns it on and off — on purpose, so an accidental tap on stage doesn't turn the effect off.</p>",
        "es": "<p>Cada bloque tiene el LED de encendido, el ícono y la sigla, en el color de la categoría. En la GP-5 la cadena sigue el orden real del patch. Tocar muestra los knobs; <strong>mantener presionado</strong> enciende y apaga — a propósito, para que un toque accidental en el escenario no apague el efecto.</p>"
       }
      },
      {
       "name": {
        "pt": "O modelo e os knobs",
        "en": "The model and the knobs",
        "es": "El modelo y los knobs"
       },
       "type": {
        "pt": "edição ao vivo",
        "en": "live editing",
        "es": "edición en vivo"
       },
       "desc": {
        "pt": "<p>Tocar no nome do modelo abre a lista para trocar o amplificador, o drive ou o delay. Os knobs se arrastam na vertical; liga/desliga vira chave, e listas avançam a cada toque. As setas aparecem quando há mais knobs do que cabem.</p>",
        "en": "<p>Tapping the model name opens the list to change the amp, drive or delay. Knobs are dragged vertically; on/off settings become a switch, and lists step forward with each tap. The arrows show up when there are more knobs than fit on screen.</p>",
        "es": "<p>Tocar el nombre del modelo abre la lista para cambiar el amplificador, el drive o el delay. Los knobs se arrastran en vertical; lo que enciende/apaga se vuelve un interruptor, y las listas avanzan con cada toque. Las flechas aparecen cuando hay más knobs de los que caben.</p>"
       }
      },
      {
       "name": {
        "pt": "Trocar o preset do aparelho",
        "en": "Changing the device preset",
        "es": "Cambiar el preset del aparato"
       },
       "type": {
        "pt": "como funciona",
        "en": "how it works",
        "es": "cómo funciona"
       },
       "desc": {
        "pt": "<p>O palco mostra e edita o preset que já está tocando no aparelho; quem troca o preset é a própria BFMiDi, pelo PC de cada preset. Pise ou toque num preset da fileira de baixo e o palco relê o aparelho.</p>",
        "en": "<p>The stage shows and edits the preset that's already playing on the device; the BFMiDi itself is what changes the preset, through each preset's PC. Step on or tap a preset in the bottom row and the stage reads the device again.</p>",
        "es": "<p>El escenario muestra y edita el preset que ya está sonando en el aparato; quien cambia el preset es la propia BFMiDi, mediante el PC de cada preset. Pisa o toca un preset de la fila de abajo y el escenario vuelve a leer el aparato.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "No modo offline o PALCO 2 avisa que precisa do pedal e oferece <strong>CONECTAR AO PEDAL</strong>.",
       "en": "In offline mode, STAGE 2 tells you it needs the pedal and offers <strong>CONNECT TO THE PEDAL</strong>.",
       "es": "En el modo offline, el ESCENARIO 2 avisa que necesita el pedal y ofrece <strong>CONECTAR AL PEDAL</strong>."
      }
     ]
    },
    {
     "id": "palco-nano",
     "title": {
      "pt": "PALCO 2 com a Nano Cortex",
      "en": "STAGE 2 with the Nano Cortex",
      "es": "ESCENARIO 2 con la Nano Cortex"
     },
     "purpose": {
      "pt": "Com a Neural DSP Nano Cortex, os slots de efeito mudam de cor conforme o efeito carregado, e o preset aparece no formato da Nano (A1 a H8).",
      "en": "With the Neural DSP Nano Cortex, the effect slots change color according to the loaded effect, and the preset is shown in the Nano's format (A1 to H8).",
      "es": "Con la Neural DSP Nano Cortex, los slots de efecto cambian de color según el efecto cargado, y el preset aparece en el formato de la Nano (A1 a H8)."
     },
     "shot": "stage-2-nano",
     "mockTitle": {
      "pt": "PALCO 2 — NANO CORTEX",
      "en": "STAGE 2 — NANO CORTEX",
      "es": "ESCENARIO 2 — NANO CORTEX"
     },
     "fields": [
      {
       "name": {
        "pt": "Visual do aparelho",
        "en": "Device look",
        "es": "Aspecto del aparato"
       },
       "type": {
        "pt": "tema",
        "en": "theme",
        "es": "tema"
       },
       "desc": {
        "pt": "<p>Com a opção <strong>Visual do aparelho</strong> ligada (padrão), o PALCO 2 veste as cores e o estilo de cada pedal: a tela azul da GP-5, o preto com âmbar da TONEX, o grafite da Nano Cortex e o verde do Kemper.</p>",
        "en": "<p>With the <strong>Device look</strong> option on (default), STAGE 2 takes on each pedal's colors and style: the blue screen of the GP-5, the black and amber of the TONEX, the graphite of the Nano Cortex and the green of the Kemper.</p>",
        "es": "<p>Con la opción <strong>Aspecto del aparato</strong> encendida (predeterminado), el ESCENARIO 2 adopta los colores y el estilo de cada pedal: la pantalla azul de la GP-5, el negro con ámbar de la TONEX, el grafito de la Nano Cortex y el verde del Kemper.</p>"
       }
      },
      {
       "name": {
        "pt": "Cortex Cloud",
        "en": "Cortex Cloud",
        "es": "Cortex Cloud"
       },
       "type": {
        "pt": "limitação",
        "en": "limitation",
        "es": "limitación"
       },
       "desc": {
        "pt": "<p>Enquanto o app Cortex Cloud estiver conectado à Nano por Bluetooth, a Nano recusa a edição pelo USB. Desconecte o Cortex Cloud para editar pelo palco ou pelo editor.</p>",
        "en": "<p>While the Cortex Cloud app is connected to the Nano over Bluetooth, the Nano refuses editing over USB. Disconnect Cortex Cloud to edit from the stage or the editor.</p>",
        "es": "<p>Mientras la app Cortex Cloud esté conectada a la Nano por Bluetooth, la Nano rechaza la edición por USB. Desconecta Cortex Cloud para editar desde el escenario o desde el editor.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-kemper",
     "title": {
      "pt": "PALCO 2 com o Kemper Player",
      "en": "STAGE 2 with the Kemper Player",
      "es": "ESCENARIO 2 con el Kemper Player"
     },
     "purpose": {
      "pt": "Com o Modo Amigável em KEMPER PLAYER, o PALCO 2 mostra o nome do rig em letra grande e os footswitches da BFMiDi como botões de stomp do Kemper.",
      "en": "With Friendly Mode set to KEMPER PLAYER, STAGE 2 shows the rig name in big letters and the BFMiDi footswitches as Kemper stomp buttons.",
      "es": "Con el Modo Amigable en KEMPER PLAYER, el ESCENARIO 2 muestra el nombre del rig en letras grandes y los footswitches de la BFMiDi como botones de stomp del Kemper."
     },
     "shot": "stage-kemper",
     "mockTitle": {
      "pt": "PALCO 2 — KEMPER PLAYER",
      "en": "STAGE 2 — KEMPER PLAYER",
      "es": "ESCENARIO 2 — KEMPER PLAYER"
     },
     "fields": [
      {
       "name": {
        "pt": "O nome do rig",
        "en": "The rig name",
        "es": "El nombre del rig"
       },
       "type": {
        "pt": "letreiro",
        "en": "marquee",
        "es": "letrero"
       },
       "desc": {
        "pt": "<p>Vem do <strong>GET NAMES</strong> do Kemper. Ligue-o em <strong>CONFIGURAÇÕES › MODO AMIGÁVEL</strong>, no card do Kemper Player.</p>",
        "en": "<p>It comes from the Kemper's <strong>GET NAMES</strong>. Turn it on in <strong>SETTINGS › FRIENDLY MODE</strong>, in the Kemper Player card.</p>",
        "es": "<p>Viene del <strong>GET NAMES</strong> del Kemper. Actívalo en <strong>CONFIGURACIÓN › MODO AMIGABLE</strong>, en la tarjeta del Kemper Player.</p>"
       }
      },
      {
       "name": {
        "pt": "Os stomps",
        "en": "The stomps",
        "es": "Los stomps"
       },
       "type": {
        "pt": "footswitches",
        "en": "footswitches",
        "es": "footswitches"
       },
       "desc": {
        "pt": "<p>Cada footswitch da BFMiDi vira um botão no padrão do Kemper, com ícone e os dois LEDs (estado e categoria). Comandos como Delay, Reverb e Wah ganham a cor da categoria do Kemper; STOMP A a D, EFFECT X e MOD mostram o nome do slot. Tocar liga e desliga, como no PALCO 1.</p>",
        "en": "<p>Each BFMiDi footswitch becomes a Kemper-style button, with an icon and the two LEDs (state and category). Commands like Delay, Reverb and Wah get the Kemper category color; STOMP A to D, EFFECT X and MOD show the slot name. Tapping turns it on and off, just like on STAGE 1.</p>",
        "es": "<p>Cada footswitch de la BFMiDi se convierte en un botón al estilo Kemper, con ícono y los dos LEDs (estado y categoría). Comandos como Delay, Reverb y Wah toman el color de la categoría del Kemper; STOMP A a D, EFFECT X y MOD muestran el nombre del slot. Tocar enciende y apaga, como en el ESCENARIO 1.</p>"
       }
      },
      {
       "name": {
        "pt": "EDITAR RIG",
        "en": "EDIT RIG",
        "es": "EDITAR RIG"
       },
       "type": {
        "pt": "botão",
        "en": "button",
        "es": "botón"
       },
       "desc": {
        "pt": "<p>Abre o editor do Kemper por cima do palco. Enquanto ele estiver aberto, os footswitches da controladora ficam pausados — o botão avisa isso.</p>",
        "en": "<p>Opens the Kemper editor on top of the stage. While it's open, the controller's footswitches are paused — the button warns you about this.</p>",
        "es": "<p>Abre el editor del Kemper encima del escenario. Mientras esté abierto, los footswitches de la controladora quedan en pausa — el botón lo avisa.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-geral",
     "title": {
      "pt": "Configurações do palco — GERAL",
      "en": "Stage settings — GENERAL",
      "es": "Configuración del escenario — GENERAL"
     },
     "purpose": {
      "pt": "O que aparece nos dois palcos e como a tela se comporta.",
      "en": "What appears on both stages and how the screen behaves.",
      "es": "Lo que aparece en los dos escenarios y cómo se comporta la pantalla."
     },
     "shot": "stage-set-geral",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES DO PALCO — GERAL",
      "en": "STAGE SETTINGS — GENERAL",
      "es": "CONFIGURACIÓN DEL ESCENARIO — GENERAL"
     },
     "fields": [
      {
       "name": {
        "pt": "Presets da BFMIDI embaixo",
        "en": "BFMIDI presets at the bottom",
        "es": "Presets de la BFMIDI abajo"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>A fileira para trocar de preset, nos dois palcos. Os botões podem mostrar <strong>NÚMERO + NOME</strong> ou <strong>SÓ NÚMERO</strong>.</p>",
        "en": "<p>The row to change presets, on both stages. The buttons can show <strong>NUMBER + NAME</strong> or <strong>NUMBER ONLY</strong>.</p>",
        "es": "<p>La fila para cambiar de preset, en los dos escenarios. Los botones pueden mostrar <strong>NÚMERO + NOMBRE</strong> o <strong>SOLO NÚMERO</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Conexão, BPM e relógio",
        "en": "Connection, BPM and clock",
        "es": "Conexión, BPM y reloj"
       },
       "type": {
        "pt": "interruptores",
        "en": "switches",
        "es": "interruptores"
       },
       "desc": {
        "pt": "<p>O que a barra de cima mostra. O relógio vem desligado.</p>",
        "en": "<p>What the top bar shows. The clock is off by default.</p>",
        "es": "<p>Lo que muestra la barra de arriba. El reloj viene apagado.</p>"
       }
      },
      {
       "name": {
        "pt": "Manter a tela acesa",
        "en": "Keep the screen on",
        "es": "Mantener la pantalla encendida"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Pede ao celular ou ao tablet para não apagar a tela enquanto o palco estiver aberto (nos aparelhos e navegadores que permitem). Ligado por padrão.</p>",
        "en": "<p>Asks the phone or tablet not to turn the screen off while the stage is open (on devices and browsers that allow it). On by default.</p>",
        "es": "<p>Le pide al celular o a la tablet que no apague la pantalla mientras el escenario esté abierto (en los equipos y navegadores que lo permiten). Activado por defecto.</p>"
       }
      },
      {
       "name": {
        "pt": "Vibrar ao tocar",
        "en": "Vibrate on touch",
        "es": "Vibrar al tocar"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Uma vibração curta confirma o toque, nos aparelhos que vibram.</p>",
        "en": "<p>A short vibration confirms each tap, on devices that can vibrate.</p>",
        "es": "<p>Una vibración corta confirma el toque, en los aparatos que vibran.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Tudo nas configurações do palco fica salvo só neste aplicativo, neste aparelho. <strong>RESTAURAR PADRÃO</strong> volta os ajustes de fábrica sem apagar as imagens escolhidas.",
       "en": "Everything in the stage settings is saved only in this app, on this device. <strong>RESTORE DEFAULTS</strong> brings back the factory settings without erasing the images you chose.",
       "es": "Todo en la configuración del escenario se guarda solo en esta app, en este aparato. <strong>RESTAURAR PREDETERMINADO</strong> vuelve a los ajustes de fábrica sin borrar las imágenes elegidas."
      }
     ]
    },
    {
     "id": "palco-visual",
     "title": {
      "pt": "Configurações do palco — VISUAL",
      "en": "Stage settings — VISUAL",
      "es": "Configuración del escenario — VISUAL"
     },
     "purpose": {
      "pt": "A cara do palco: fundo, cor de destaque, fonte, tamanho dos textos, cantos e painéis.",
      "en": "The stage's look: background, accent color, font, text size, corners and panels.",
      "es": "El aspecto del escenario: fondo, color de acento, fuente, tamaño de los textos, esquinas y paneles."
     },
     "shot": "stage-set-visual",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES DO PALCO — VISUAL",
      "en": "STAGE SETTINGS — VISUAL",
      "es": "CONFIGURACIÓN DEL ESCENARIO — VISUAL"
     },
     "fields": [
      {
       "name": {
        "pt": "Fundo e cor de destaque",
        "en": "Background and accent color",
        "es": "Fondo y color de acento"
       },
       "type": {
        "pt": "cores",
        "en": "colors",
        "es": "colores"
       },
       "desc": {
        "pt": "<p>Oito fundos (Carvão, Preto, Azul noite, Vinho, Floresta, Roxo, Holofote, Aço) e nove cores de destaque.</p>",
        "en": "<p>Eight backgrounds (Charcoal, Black, Night blue, Wine, Forest, Purple, Spotlight, Steel) and nine accent colors.</p>",
        "es": "<p>Ocho fondos (Carbón, Negro, Azul noche, Vino, Bosque, Morado, Reflector, Acero) y nueve colores de acento.</p>"
       }
      },
      {
       "name": {
        "pt": "Fonte, peso e tamanho",
        "en": "Font, weight and size",
        "es": "Fuente, peso y tamaño"
       },
       "type": {
        "pt": "texto",
        "en": "text",
        "es": "texto"
       },
       "desc": {
        "pt": "<p>Fonte <strong>Padrão</strong>, <strong>Arredondada</strong>, <strong>Estreita</strong>, <strong>Mono</strong> ou <strong>Serifada</strong> — todas do próprio sistema, para o palco abrir sem internet. Peso dos títulos, tamanho dos textos (P, M, G, GG) e nomes em maiúsculas.</p>",
        "en": "<p><strong>Default</strong>, <strong>Rounded</strong>, <strong>Condensed</strong>, <strong>Mono</strong> or <strong>Serif</strong> font — all built into the system, so the stage opens without internet. Title weight, text size (P, M, G, GG — small to extra large) and names in uppercase.</p>",
        "es": "<p>Fuente <strong>Estándar</strong>, <strong>Redondeada</strong>, <strong>Estrecha</strong>, <strong>Mono</strong> o <strong>Serifa</strong> — todas del propio sistema, para que el escenario abra sin internet. Peso de los títulos, tamaño de los textos (P, M, G, GG) y nombres en mayúsculas.</p>"
       }
      },
      {
       "name": {
        "pt": "Cantos, contorno, espaçamento e painéis",
        "en": "Corners, outline, spacing and panels",
        "es": "Esquinas, contorno, espaciado y paneles"
       },
       "type": {
        "pt": "estilo",
        "en": "style",
        "es": "estilo"
       },
       "desc": {
        "pt": "<p>Cantos retos, suaves ou redondos; contorno dos painéis; espaçamento justo, normal ou amplo; painéis sólidos ou de vidro; e o brilho nos itens ativos.</p>",
        "en": "<p>Square, soft or round corners; panel outline; compact, normal or wide spacing; solid or glass panels; and the glow on active items.</p>",
        "es": "<p>Esquinas rectas, suaves o redondas; contorno de los paneles; espaciado justo, normal o amplio; paneles sólidos o de vidrio; y el brillo en los elementos activos.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-p1",
     "title": {
      "pt": "Configurações do palco — PALCO 1",
      "en": "Stage settings — STAGE 1",
      "es": "Configuración del escenario — ESCENARIO 1"
     },
     "purpose": {
      "pt": "Como o PALCO 1 arruma o nome, a imagem e os footswitches.",
      "en": "How STAGE 1 arranges the name, the image and the footswitches.",
      "es": "Cómo el ESCENARIO 1 organiza el nombre, la imagen y los footswitches."
     },
     "shot": "stage-set-p1",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES DO PALCO — PALCO 1",
      "en": "STAGE SETTINGS — STAGE 1",
      "es": "CONFIGURACIÓN DEL ESCENARIO — ESCENARIO 1"
     },
     "fields": [
      {
       "name": {
        "pt": "Mostrar a imagem e Layout do topo",
        "en": "Show the image and Top layout",
        "es": "Mostrar la imagen y Diseño de arriba"
       },
       "type": {
        "pt": "imagem",
        "en": "image",
        "es": "imagen"
       },
       "desc": {
        "pt": "<p>Com a imagem ligada, escolha <strong>LADO A LADO</strong> (nome de um lado, imagem do outro — com o lado da imagem e o espaço do nome em 35, 50 ou 65%) ou <strong>NOME SOBRE A IMAGEM</strong>.</p>",
        "en": "<p>With the image on, choose <strong>SIDE BY SIDE</strong> (name on one side, image on the other — with a choice of image side and a name width of 35, 50 or 65%) or <strong>NAME OVER IMAGE</strong>.</p>",
        "es": "<p>Con la imagen encendida, elige <strong>LADO A LADO</strong> (nombre de un lado, imagen del otro — con el lado de la imagen y el espacio del nombre en 35, 50 o 65%) o <strong>NOMBRE SOBRE LA IMAGEN</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Footswitches",
        "en": "Footswitches",
        "es": "Footswitches"
       },
       "type": {
        "pt": "arranjo",
        "en": "arrangement",
        "es": "disposición"
       },
       "desc": {
        "pt": "<p><strong>UMA LINHA</strong> (em ordem, 1 a 6) ou <strong>COMO NO PEDAL</strong> (duas fileiras, imitando a controladora).</p>",
        "en": "<p><strong>ONE ROW</strong> (in order, 1 to 6) or <strong>LIKE THE PEDAL</strong> (two rows, mirroring the controller).</p>",
        "es": "<p><strong>UNA FILA</strong> (en orden, 1 a 6) o <strong>COMO EN EL PEDAL</strong> (dos filas, imitando la controladora).</p>"
       }
      },
      {
       "name": {
        "pt": "O que mostrar",
        "en": "What to show",
        "es": "Qué mostrar"
       },
       "type": {
        "pt": "interruptores",
        "en": "switches",
        "es": "interruptores"
       },
       "desc": {
        "pt": "<p><strong>MODO PRESET / LIVE</strong>, o modo amigável, o tamanho dos ícones (P, M, G), o número dos footswitches e a barra do LED.</p>",
        "en": "<p><strong>PRESET / LIVE MODE</strong>, the friendly mode, the icon size (P, M, G — small, medium, large), the footswitch numbers and the LED bar.</p>",
        "es": "<p><strong>MODO PRESET / LIVE</strong>, el modo amigable, el tamaño de los íconos (P, M, G), el número de los footswitches y la barra del LED.</p>"
       }
      },
      {
       "name": {
        "pt": "Escurecer os desligados",
        "en": "Dim the ones that are off",
        "es": "Oscurecer los apagados"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Deixa os footswitches desligados mais apagados, para o que está ligado saltar aos olhos.</p>",
        "en": "<p>Makes the footswitches that are off dimmer, so the ones that are on stand out.</p>",
        "es": "<p>Deja los footswitches apagados más tenues, para que lo que está encendido salte a la vista.</p>"
       }
      },
      {
       "name": {
        "pt": "Tocar no ícone liga/desliga",
        "en": "Tap the icon to turn on/off",
        "es": "Tocar el ícono enciende/apaga"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Desligado, os ícones só mostram o estado e não respondem ao toque — útil quando o celular fica ao alcance de outras pessoas no palco.</p>",
        "en": "<p>When off, the icons only show the state and don't respond to touch — useful when the phone is within reach of other people on stage.</p>",
        "es": "<p>Apagado, los íconos solo muestran el estado y no responden al toque — útil cuando el celular queda al alcance de otras personas en el escenario.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-imagens",
     "title": {
      "pt": "As imagens do palco",
      "en": "Stage images",
      "es": "Las imágenes del escenario"
     },
     "purpose": {
      "pt": "Nos aplicativos, o fundo do PALCO 1 pode ser a imagem da controladora, uma imagem da galeria do app ou uma foto sua. O recorte vale em qualquer caso.",
      "en": "In the apps, the STAGE 1 background can be the controller's image, an image from the app gallery or one of your own photos. Cropping works in every case.",
      "es": "En las apps, el fondo del ESCENARIO 1 puede ser la imagen de la controladora, una imagen de la galería de la app o una foto tuya. El recorte vale en cualquier caso."
     },
     "howto": [
      {
       "pt": "Em <strong>CONFIGURAÇÕES › PALCO 1</strong>, desça até <strong>Imagem do palco</strong>.",
       "en": "In <strong>SETTINGS › STAGE 1</strong>, scroll down to <strong>Stage image</strong>.",
       "es": "En <strong>AJUSTES › ESCENARIO 1</strong>, baja hasta <strong>Imagen del escenario</strong>."
      },
      {
       "pt": "Escolha se vale para <strong>TODOS OS PRESETS</strong> ou <strong>SÓ O A1</strong> (o preset atual).",
       "en": "Choose whether it applies to <strong>ALL PRESETS</strong> or <strong>ONLY A1</strong> (the current preset).",
       "es": "Elige si vale para <strong>TODOS LOS PRESETS</strong> o <strong>SOLO A1</strong> (el preset actual)."
      },
      {
       "pt": "Toque em <strong>Do display</strong>, numa imagem da galeria ou em <strong>ENVIAR FOTO</strong>.",
       "en": "Tap <strong>From display</strong>, an image from the gallery or <strong>UPLOAD PHOTO</strong>.",
       "es": "Toca <strong>Del display</strong>, una imagen de la galería o <strong>SUBIR FOTO</strong>."
      },
      {
       "pt": "Em <strong>RECORTE DA IMAGEM</strong>, arraste para escolher a parte que aparece e ajuste o <strong>ZOOM</strong>.",
       "en": "In <strong>IMAGE CROP</strong>, drag to choose which part shows and adjust the <strong>ZOOM</strong>.",
       "es": "En <strong>RECORTE DE LA IMAGEN</strong>, arrastra para elegir la parte que aparece y ajusta el <strong>ZOOM</strong>."
      }
     ],
     "shot": "stage-set-img",
     "mockTitle": {
      "pt": "IMAGEM DO PALCO E RECORTE",
      "en": "STAGE IMAGE AND CROP",
      "es": "IMAGEN DEL ESCENARIO Y RECORTE"
     },
     "fields": [
      {
       "name": {
        "pt": "Fotos suas",
        "en": "Your photos",
        "es": "Tus fotos"
       },
       "type": {
        "pt": "apps",
        "en": "apps",
        "es": "apps"
       },
       "desc": {
        "pt": "<p>As fotos enviadas são reduzidas e guardadas só no aplicativo, neste aparelho — <strong>nunca vão para a controladora</strong> e não ocupam a memória de imagens dela. O X no canto apaga a foto.</p>",
        "en": "<p>Uploaded photos are scaled down and stored only in the app, on this device — <strong>they never go to the controller</strong> and don't use up its image memory. The X in the corner deletes the photo.</p>",
        "es": "<p>Las fotos subidas se reducen y se guardan solo en la app, en este aparato — <strong>nunca van a la controladora</strong> y no ocupan su memoria de imágenes. La X de la esquina borra la foto.</p>"
       }
      },
      {
       "name": {
        "pt": "Galeria do app",
        "en": "App gallery",
        "es": "Galería de la app"
       },
       "type": {
        "pt": "apps",
        "en": "apps",
        "es": "apps"
       },
       "desc": {
        "pt": "<p>Fundos prontos (aço, luzes, fumaça, galáxia, holofotes, neon, pôr do sol, tablado) que vêm dentro dos aplicativos.</p>",
        "en": "<p>Ready-made backgrounds (steel, lights, smoke, galaxy, spotlights, neon, sunset, stage floor) that come built into the apps.</p>",
        "es": "<p>Fondos listos (acero, luces, humo, galaxia, reflectores, neón, atardecer, tarima) que vienen dentro de las apps.</p>"
       }
      },
      {
       "name": {
        "pt": "No navegador",
        "en": "In the browser",
        "es": "En el navegador"
       },
       "type": {
        "pt": "limitação",
        "en": "limitation",
        "es": "limitación"
       },
       "desc": {
        "pt": "<p>Aberto pela controladora ou pelo site, o palco usa só a imagem da tela da controladora — o recorte continua disponível.</p>",
        "en": "<p>When opened from the controller or from the website, the stage only uses the controller's screen image — cropping is still available.</p>",
        "es": "<p>Abierto desde la controladora o desde el sitio web, el escenario usa solo la imagen de la pantalla de la controladora — el recorte sigue disponible.</p>"
       }
      },
      {
       "name": {
        "pt": "Recorte",
        "en": "Crop",
        "es": "Recorte"
       },
       "type": {
        "pt": "ajuste",
        "en": "adjustment",
        "es": "ajuste"
       },
       "desc": {
        "pt": "<p>Cada imagem guarda o seu enquadramento: arraste para escolher o ponto, use o zoom (100 a 300%) e <strong>CENTRALIZAR</strong> para voltar ao meio.</p>",
        "en": "<p>Each image keeps its own framing: drag to choose the focus point, use the zoom (100 to 300%) and <strong>CENTER</strong> to go back to the middle.</p>",
        "es": "<p>Cada imagen guarda su propio encuadre: arrastra para elegir el punto, usa el zoom (100 a 300%) y <strong>CENTRAR</strong> para volver al centro.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-p2",
     "title": {
      "pt": "Configurações do palco — PALCO 2",
      "en": "Stage settings — STAGE 2",
      "es": "Configuración del escenario — ESCENARIO 2"
     },
     "purpose": {
      "pt": "Como o PALCO 2 mostra a cadeia e os knobs do aparelho.",
      "en": "How STAGE 2 shows the device's chain and knobs.",
      "es": "Cómo el ESCENARIO 2 muestra la cadena y los knobs del aparato."
     },
     "shot": "stage-set-p2",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES DO PALCO — PALCO 2",
      "en": "STAGE SETTINGS — STAGE 2",
      "es": "CONFIGURACIÓN DEL ESCENARIO — ESCENARIO 2"
     },
     "fields": [
      {
       "name": {
        "pt": "Visual do aparelho",
        "en": "Device look",
        "es": "Aspecto del aparato"
       },
       "type": {
        "pt": "tema",
        "en": "theme",
        "es": "tema"
       },
       "desc": {
        "pt": "<p>Ligado, cada aparelho usa as suas cores e o seu estilo. Desligado, o PALCO 2 segue a aba VISUAL.</p>",
        "en": "<p>When on, each device uses its own colors and style. When off, STAGE 2 follows the VISUAL tab.</p>",
        "es": "<p>Encendido, cada aparato usa sus propios colores y su estilo. Apagado, el ESCENARIO 2 sigue la pestaña VISUAL.</p>"
       }
      },
      {
       "name": {
        "pt": "Cadeia, siglas e cor dos blocos",
        "en": "Chain, labels and block color",
        "es": "Cadena, siglas y color de los bloques"
       },
       "type": {
        "pt": "cadeia",
        "en": "chain",
        "es": "cadena"
       },
       "desc": {
        "pt": "<p>Mostrar ou não a cadeia de efeitos, as siglas nos blocos e se os blocos usam a cor do aparelho ou a cor de destaque.</p>",
        "en": "<p>Whether to show the effect chain and the labels on the blocks, and whether the blocks use the device color or the accent color.</p>",
        "es": "<p>Mostrar o no la cadena de efectos y las siglas en los bloques, y si los bloques usan el color del aparato o el color de acento.</p>"
       }
      },
      {
       "name": {
        "pt": "Knobs",
        "en": "Knobs",
        "es": "Knobs"
       },
       "type": {
        "pt": "tamanho e arranjo",
        "en": "size and arrangement",
        "es": "tamaño y disposición"
       },
       "desc": {
        "pt": "<p>Tamanho (P, M, G) e arranjo: <strong>EM LINHA</strong> (com setas para os que não cabem) ou <strong>TODOS À VISTA</strong>.</p>",
        "en": "<p>Size (P, M, G — small, medium, large) and arrangement: <strong>IN A ROW</strong> (with arrows for the ones that don't fit) or <strong>ALL VISIBLE</strong>.</p>",
        "es": "<p>Tamaño (P, M, G) y disposición: <strong>EN FILA</strong> (con flechas para los que no caben) o <strong>TODOS A LA VISTA</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Segurar para ligar/desligar",
        "en": "Hold to turn on/off",
        "es": "Mantener para encender/apagar"
       },
       "type": {
        "pt": "tempo",
        "en": "time",
        "es": "tiempo"
       },
       "desc": {
        "pt": "<p>Quanto tempo o dedo precisa ficar no bloco para ligar ou desligar o efeito: 0,3 s, 0,45 s (padrão), 0,7 s ou 1 s.</p>",
        "en": "<p>How long your finger has to stay on the block to turn the effect on or off: 0.3 s, 0.45 s (default), 0.7 s or 1 s.</p>",
        "es": "<p>Cuánto tiempo debe quedar el dedo en el bloque para encender o apagar el efecto: 0,3 s, 0,45 s (predeterminado), 0,7 s o 1 s.</p>"
       }
      },
      {
       "name": {
        "pt": "Botão de salvar",
        "en": "Save button",
        "es": "Botón de guardar"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Mostra ou esconde o disquete do cabeçalho — quem não quer correr o risco de gravar no palco pode tirá-lo.</p>",
        "en": "<p>Shows or hides the floppy-disk icon in the header — if you don't want to risk saving on stage, you can remove it.</p>",
        "es": "<p>Muestra u oculta el disquete del encabezado — si no quieres arriesgarte a grabar en el escenario, puedes quitarlo.</p>"
       }
      }
     ]
    },
    {
     "id": "palco-celular",
     "title": {
      "pt": "No celular e no tablet",
      "en": "On phones and tablets",
      "es": "En el celular y la tablet"
     },
     "purpose": {
      "pt": "No celular o palco ocupa a tela inteira e fica deitado, mesmo com a rotação automática desligada.",
      "en": "On a phone the stage fills the whole screen in landscape, even with auto-rotate turned off.",
      "es": "En el celular el escenario ocupa toda la pantalla y queda en horizontal, incluso con la rotación automática desactivada."
     },
     "shot": "stage-land",
     "mockTitle": {
      "pt": "PALCO 1 — CELULAR DEITADO",
      "en": "STAGE 1 — PHONE IN LANDSCAPE",
      "es": "ESCENARIO 1 — CELULAR EN HORIZONTAL"
     },
     "fields": [
      {
       "name": {
        "pt": "Tela cheia",
        "en": "Full screen",
        "es": "Pantalla completa"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>No aplicativo de Android o palco esconde as barras do sistema e trava a tela deitada; deslizar da borda mostra as barras por um instante. No navegador o palco pede tela cheia e tenta travar a tela deitada.</p>",
        "en": "<p>In the Android app the stage hides the system bars and locks the screen in landscape; swiping in from the edge shows the bars for a moment. In the browser the stage asks for full screen and tries to lock the screen in landscape.</p>",
        "es": "<p>En la app de Android el escenario oculta las barras del sistema y bloquea la pantalla en horizontal; deslizar desde el borde muestra las barras por un instante. En el navegador el escenario pide pantalla completa e intenta bloquear la pantalla en horizontal.</p>"
       }
      },
      {
       "name": {
        "pt": "Onde não dá para girar",
        "en": "Where it can't rotate",
        "es": "Donde no se puede girar"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>Se o aparelho não deixa travar a orientação (iPhone, por exemplo) e você está segurando em pé, o palco é desenhado girado 90° — basta virar o aparelho. Os arrastos dos knobs acompanham.</p>",
        "en": "<p>If the device doesn't allow locking the orientation (an iPhone, for example) and you're holding it upright, the stage is drawn rotated 90° — just turn the device sideways. Knob drags follow along.</p>",
        "es": "<p>Si el aparato no permite bloquear la orientación (iPhone, por ejemplo) y lo sostienes en vertical, el escenario se dibuja girado 90° — solo gira el aparato. Los arrastres de los knobs se ajustan solos.</p>"
       }
      },
      {
       "name": {
        "pt": "Tela sempre acesa",
        "en": "Screen always on",
        "es": "Pantalla siempre encendida"
       },
       "type": {
        "pt": "comportamento",
        "en": "behavior",
        "es": "comportamiento"
       },
       "desc": {
        "pt": "<p>Com <strong>Manter a tela acesa</strong> ligado (padrão), o aparelho não apaga a tela no meio da música.</p>",
        "en": "<p>With <strong>Keep the screen on</strong> enabled (default), the device won't turn off the screen in the middle of a song.</p>",
        "es": "<p>Con <strong>Mantener la pantalla encendida</strong> activado (predeterminado), el aparato no apaga la pantalla en medio de la canción.</p>"
       }
      }
     ]
    }
   ]
  },
  {
   "id": "editores",
   "icon": "editores",
   "page": 4,
   "title": {
    "pt": "Editores de preset dos aparelhos",
    "en": "Device preset editors",
    "es": "Editores de preset de los aparatos"
   },
   "summary": {
    "pt": "Edite ao vivo o timbre da Valeton GP-5, da IK TONEX ONE, da Neural DSP Nano Cortex e do Kemper Player — pela própria BFMiDi, sem o computador do fabricante.",
    "en": "Edit the tone of the Valeton GP-5, the IK TONEX ONE, the Neural DSP Nano Cortex and the Kemper Player live — right from the BFMiDi, without the manufacturer's computer software.",
    "es": "Edita en vivo el sonido de la Valeton GP-5, la IK TONEX ONE, la Neural DSP Nano Cortex y el Kemper Player — desde la propia BFMiDi, sin el software de computadora del fabricante."
   },
   "intro": {
    "pt": "<p>Com o aparelho ligado na controladora, o editor da BFMiDi mostra o <strong>preset que está tocando no aparelho</strong> — blocos, modelos e parâmetros — e manda cada ajuste na hora, como os apps dos fabricantes.</p><p>A GP-5, a TONEX ONE e a Nano Cortex se ligam na porta <strong>USB HOST</strong> da controladora (BFMIDI-3 e BFMIDI-S3). O Kemper Player é ligado no contrário: a porta <strong>DEVICE</strong> da controladora na porta USB do Player.</p>",
    "en": "<p>With the device connected to the controller, the BFMiDi editor shows the <strong>preset playing on the device</strong> — blocks, models and parameters — and sends each change instantly, just like the manufacturers' apps.</p><p>The GP-5, the TONEX ONE and the Nano Cortex plug into the controller's <strong>USB HOST</strong> port (BFMIDI-3 and BFMIDI-S3). The Kemper Player connects the other way around: the controller's <strong>DEVICE</strong> port goes into the Player's USB port.</p>",
    "es": "<p>Con el aparato conectado a la controladora, el editor de la BFMiDi muestra el <strong>preset que está sonando en el aparato</strong> — bloques, modelos y parámetros — y envía cada ajuste al instante, como las apps de los fabricantes.</p><p>La GP-5, la TONEX ONE y la Nano Cortex se conectan al puerto <strong>USB HOST</strong> de la controladora (BFMIDI-3 y BFMIDI-S3). El Kemper Player se conecta al revés: el puerto <strong>DEVICE</strong> de la controladora va al puerto USB del Player.</p>"
   },
   "cards": [
    {
     "id": "ed-abrir",
     "title": {
      "pt": "Onde abrir",
      "en": "Where to open it",
      "es": "Dónde abrirlo"
     },
     "purpose": {
      "pt": "Aparelho plugado e reconhecido, o editor dele aparece sozinho como um botão colorido no card PRINCIPAL.",
      "en": "Once the device is plugged in and recognized, its editor shows up on its own as a colored button in the MAIN card.",
      "es": "Con el aparato conectado y reconocido, su editor aparece solo como un botón de color en la tarjeta PRINCIPAL."
     },
     "howto": [
      {
       "pt": "Plugue o aparelho e espere alguns segundos.",
       "en": "Plug in the device and wait a few seconds.",
       "es": "Conecta el aparato y espera unos segundos."
      },
      {
       "pt": "Na tela PRESET, toque no botão do aparelho na fileira de atalhos (<strong>GP-5</strong>, <strong>TONEX ONE</strong>, <strong>NANO CORTEX</strong> ou <strong>KEMPER</strong>).",
       "en": "On the PRESET screen, tap the device's button in the shortcut row (<strong>GP-5</strong>, <strong>TONEX ONE</strong>, <strong>NANO CORTEX</strong> or <strong>KEMPER</strong>).",
       "es": "En la pantalla PRESET, toca el botón del aparato en la fila de atajos (<strong>GP-5</strong>, <strong>TONEX ONE</strong>, <strong>NANO CORTEX</strong> o <strong>KEMPER</strong>)."
      },
      {
       "pt": "Ou: <strong>CONFIGURAÇÕES › HOST</strong> → card do aparelho → <strong>EDITAR PRESET</strong>. No Modo Palco, o botão <strong>EDITOR</strong> do PALCO 2.",
       "en": "Or: <strong>SETTINGS › HOST</strong> → the device's card → <strong>EDIT PRESET</strong>. In Stage Mode, the <strong>EDITOR</strong> button on STAGE 2.",
       "es": "O: <strong>CONFIGURACIÓN › HOST</strong> → tarjeta del aparato → <strong>EDITAR PRESET</strong>. En el Modo Escenario, el botón <strong>EDITOR</strong> del ESCENARIO 2."
      }
     ],
     "shot": "preset-atalhos",
     "mockTitle": {
      "pt": "ATALHOS COM OS APARELHOS PLUGADOS",
      "en": "SHORTCUTS WITH THE DEVICES PLUGGED IN",
      "es": "ATAJOS CON LOS APARATOS CONECTADOS"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-np-shortcut.is-gp5",
       "at": "c",
       "label": {
        "pt": "GP-5",
        "en": "GP-5",
        "es": "GP-5"
       }
      },
      {
       "n": 2,
       "sel": ".bf-np-shortcut.is-tonex",
       "at": "c",
       "label": {
        "pt": "TONEX ONE",
        "en": "TONEX ONE",
        "es": "TONEX ONE"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Os botões dos aparelhos",
        "en": "The device buttons",
        "es": "Los botones de los aparatos"
       },
       "type": {
        "pt": "atalhos automáticos",
        "en": "automatic shortcuts",
        "es": "atajos automáticos"
       },
       "desc": {
        "pt": "<p>Aparecem antes dos seus atalhos, na cor de cada marca, e não tiram nenhum deles do lugar. Com duas TONEX ONE no hub, os botões viram <strong>TONEX 1</strong> e <strong>TONEX 2</strong> (a 1 é a da porta de menor número).</p>",
        "en": "<p>They appear before your own shortcuts, in each brand's color, and don't push any of them out. With two TONEX ONE units on the hub, the buttons become <strong>TONEX 1</strong> and <strong>TONEX 2</strong> (1 is the one on the lowest-numbered port).</p>",
        "es": "<p>Aparecen antes de tus atajos, en el color de cada marca, y no quitan ninguno de su lugar. Con dos TONEX ONE en el hub, los botones pasan a ser <strong>TONEX 1</strong> y <strong>TONEX 2</strong> (la 1 es la del puerto de menor número).</p>"
       }
      },
      {
       "name": {
        "pt": "Requisitos",
        "en": "Requirements",
        "es": "Requisitos"
       },
       "type": {
        "pt": "antes de tudo",
        "en": "first things first",
        "es": "antes que nada"
       },
       "desc": {
        "pt": "<p>Controladora com USB Host (BFMIDI-3 ou BFMIDI-S3), firmware da controladora e do USB Host atualizados, e o editor conectado à controladora (o modo offline não alcança o aparelho). Com USB Host antigo, o botão <strong>EDITAR PRESET</strong> fica apagado e diz para atualizar.</p>",
        "en": "<p>A controller with USB Host (BFMIDI-3 or BFMIDI-S3), up-to-date controller and USB Host firmware, and the editor connected to the controller (offline mode can't reach the device). With an older USB Host, the <strong>EDIT PRESET</strong> button is grayed out and tells you to update.</p>",
        "es": "<p>Controladora con USB Host (BFMIDI-3 o BFMIDI-S3), firmware de la controladora y del USB Host actualizados, y el editor conectado a la controladora (el modo offline no llega al aparato). Con un USB Host antiguo, el botón <strong>EDITAR PRESET</strong> queda deshabilitado e indica que actualices.</p>"
       }
      },
      {
       "name": {
        "pt": "Dois aparelhos ao mesmo tempo",
        "en": "Two devices at once",
        "es": "Dos aparatos a la vez"
       },
       "type": {
        "pt": "limite",
        "en": "limit",
        "es": "límite"
       },
       "desc": {
        "pt": "<p>Num hub USB cabem dois aparelhos — por exemplo GP-5 + TONEX ONE. A <strong>Nano Cortex</strong> precisa de mais canais USB e funciona <strong>sozinha</strong> no USB Host.</p>",
        "en": "<p>A USB hub fits two devices — for example GP-5 + TONEX ONE. The <strong>Nano Cortex</strong> needs more USB channels and works <strong>on its own</strong> on the USB Host.</p>",
        "es": "<p>En un hub USB caben dos aparatos — por ejemplo GP-5 + TONEX ONE. La <strong>Nano Cortex</strong> necesita más canales USB y funciona <strong>sola</strong> en el USB Host.</p>"
       }
      }
     ]
    },
    {
     "id": "ed-gp5",
     "title": {
      "pt": "Valeton GP-5",
      "en": "Valeton GP-5",
      "es": "Valeton GP-5"
     },
     "purpose": {
      "pt": "Os dez blocos do patch da GP-5 — noise gate, pré, drive, amp, cab, EQ, modulação, delay, reverb e NS — com troca de modelo e todos os parâmetros. A edição só fica gravada quando você salva.",
      "en": "The ten blocks of the GP-5 patch — noise gate, pre, drive, amp, cab, EQ, modulation, delay, reverb and NS — with model switching and every parameter. The edit is only stored when you save.",
      "es": "Los diez bloques del patch de la GP-5 — noise gate, pre, drive, amp, cab, EQ, modulación, delay, reverb y NS — con cambio de modelo y todos los parámetros. La edición solo queda grabada cuando guardas."
     },
     "howto": [
      {
       "pt": "Toque num bloco da cadeia (a lista à esquerda no computador; no celular, a fileira no alto) para ir até ele.",
       "en": "Tap a block in the chain (the list on the left on a computer; the row at the top on a phone) to jump to it.",
       "es": "Toca un bloque de la cadena (la lista a la izquierda en la computadora; en el celular, la fila de arriba) para ir hasta él."
      },
      {
       "pt": "Ligue ou desligue o bloco pela chave à direita do nome; toque no nome do modelo para trocá-lo.",
       "en": "Turn the block on or off with the switch to the right of its name; tap the model name to change it.",
       "es": "Enciende o apaga el bloque con el interruptor a la derecha del nombre; toca el nombre del modelo para cambiarlo."
      },
      {
       "pt": "Ajuste os parâmetros pelo slider ou digitando o valor.",
       "en": "Adjust the parameters with the slider or by typing the value.",
       "es": "Ajusta los parámetros con el slider o escribiendo el valor."
      },
      {
       "pt": "Quando o som estiver bom, toque em <strong>SALVAR NO PEDAL</strong>. Para voltar ao que estava gravado, <strong>DESCARTAR</strong>.",
       "en": "When it sounds right, tap <strong>SAVE TO PEDAL</strong>. To go back to what was stored, tap <strong>DISCARD</strong>.",
       "es": "Cuando el sonido esté bien, toca <strong>GUARDAR EN EL PEDAL</strong>. Para volver a lo que estaba grabado, <strong>DESCARTAR</strong>."
      }
     ],
     "shot": "deved-gp5",
     "mockTitle": {
      "pt": "EDITOR DE PRESET — VALETON GP-5",
      "en": "PRESET EDITOR — VALETON GP-5",
      "es": "EDITOR DE PRESET — VALETON GP-5"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-deved-lcd",
       "label": {
        "pt": "preset",
        "en": "preset",
        "es": "preset"
       }
      },
      {
       "n": 2,
       "sel": ".bf-deved-chain",
       "label": {
        "pt": "cadeia",
        "en": "chain",
        "es": "cadena"
       }
      },
      {
       "n": 3,
       "sel": ".bf-deved-block-head",
       "label": {
        "pt": "bloco",
        "en": "block",
        "es": "bloque"
       }
      },
      {
       "n": 4,
       "sel": ".bf-deved-savename",
       "label": {
        "pt": "nome",
        "en": "name",
        "es": "nombre"
       }
      },
      {
       "n": 5,
       "sel": ".bf-deved-actions",
       "label": {
        "pt": "salvar e descartar",
        "en": "save and discard",
        "es": "guardar y descartar"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Volume do patch",
        "en": "Patch volume",
        "es": "Volumen del patch"
       },
       "type": {
        "pt": "parâmetro",
        "en": "parameter",
        "es": "parámetro"
       },
       "desc": {
        "pt": "<p>O volume geral do preset, no topo, de 0 a 100.</p>",
        "en": "<p>The preset's overall volume, at the top, from 0 to 100.</p>",
        "es": "<p>El volumen general del preset, arriba, de 0 a 100.</p>"
       }
      },
      {
       "name": {
        "pt": "Os blocos",
        "en": "The blocks",
        "es": "Los bloques"
       },
       "type": {
        "pt": "cadeia",
        "en": "chain",
        "es": "cadena"
       },
       "desc": {
        "pt": "<p>Cada bloco tem a cor da categoria, o modelo em destaque e os parâmetros agrupados por função (GAIN, TONE, OUTPUT, TIME, FEEDBACK…). O knob é só indicador: quem mexe é o slider embaixo dele ou a caixa de valor.</p>",
        "en": "<p>Each block has its category color, the model highlighted and the parameters grouped by function (GAIN, TONE, OUTPUT, TIME, FEEDBACK…). The knob is just an indicator: you change the value with the slider below it or the value box.</p>",
        "es": "<p>Cada bloque tiene el color de la categoría, el modelo destacado y los parámetros agrupados por función (GAIN, TONE, OUTPUT, TIME, FEEDBACK…). El knob es solo un indicador: el valor se cambia con el slider que está debajo o con la casilla de valor.</p>"
       }
      },
      {
       "name": {
        "pt": "NOME",
        "en": "NAME",
        "es": "NOMBRE"
       },
       "type": {
        "pt": "texto",
        "en": "text",
        "es": "texto"
       },
       "desc": {
        "pt": "<p>Até 10 caracteres, como na GP-5. Nome maior é cortado ao salvar — o editor avisa.</p>",
        "en": "<p>Up to 10 characters, as on the GP-5. A longer name gets cut when saving — the editor warns you.</p>",
        "es": "<p>Hasta 10 caracteres, como en la GP-5. Un nombre más largo se corta al guardar — el editor avisa.</p>"
       }
      },
      {
       "name": {
        "pt": "SALVAR NO PEDAL e DESCARTAR",
        "en": "SAVE TO PEDAL and DISCARD",
        "es": "GUARDAR EN EL PEDAL y DESCARTAR"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p>A GP-5 só grava com <strong>SALVAR NO PEDAL</strong>; o editor confirma com “Preset salvo no pedal.”. Trocar de preset antes disso perde a edição. <strong>DESCARTAR</strong> recarrega o preset gravado.</p><p>Fechar com edição pendente pergunta o que fazer: salvar, descartar, <strong>FECHAR SEM SALVAR</strong> (a edição continua tocando até a próxima troca de preset) ou continuar editando.</p>",
        "en": "<p>The GP-5 only stores with <strong>SAVE TO PEDAL</strong>; the editor confirms with “Preset saved to the pedal.”. Changing presets before that loses the edit. <strong>DISCARD</strong> reloads the stored preset.</p><p>Closing with an unsaved edit asks what to do: save, discard, <strong>CLOSE WITHOUT SAVING</strong> (the edit keeps playing until the next preset change) or keep editing.</p>",
        "es": "<p>La GP-5 solo graba con <strong>GUARDAR EN EL PEDAL</strong>; el editor lo confirma con “Preset guardado en el pedal.”. Cambiar de preset antes de eso pierde la edición. <strong>DESCARTAR</strong> recarga el preset grabado.</p><p>Cerrar con una edición pendiente pregunta qué hacer: guardar, descartar, <strong>CERRAR SIN GUARDAR</strong> (la edición sigue sonando hasta el próximo cambio de preset) o seguir editando.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Com o <strong>Modo transmissão</strong> do USB Host ligado (CONFIGURAÇÕES › HOST), o editor da GP-5 fica indisponível: sem ele o host não consegue ler o preset.",
       "en": "With the USB Host's <strong>Transmit-only mode</strong> on (SETTINGS › HOST), the GP-5 editor is unavailable: in that mode the host can't read the preset.",
       "es": "Con el <strong>Modo transmisión</strong> del USB Host activado (CONFIGURACIÓN › HOST), el editor de la GP-5 no está disponible: en ese modo el host no puede leer el preset."
      }
     ]
    },
    {
     "id": "ed-tonex",
     "title": {
      "pt": "IK TONEX ONE",
      "en": "IK TONEX ONE",
      "es": "IK TONEX ONE"
     },
     "purpose": {
      "pt": "O preset que está tocando na TONEX ONE: amp, cabine, noise gate, compressor, EQ, modulação, delay e reverb. A TONEX grava sozinha cada ajuste.",
      "en": "The preset playing on the TONEX ONE: amp, cabinet, noise gate, compressor, EQ, modulation, delay and reverb. The TONEX saves every change on its own.",
      "es": "El preset que está sonando en la TONEX ONE: amp, gabinete, noise gate, compresor, EQ, modulación, delay y reverb. La TONEX graba sola cada ajuste."
     },
     "shot": "deved-tonex",
     "mockTitle": {
      "pt": "EDITOR DE PRESET — IK TONEX ONE",
      "en": "PRESET EDITOR — IK TONEX ONE",
      "es": "EDITOR DE PRESET — IK TONEX ONE"
     },
     "fields": [
      {
       "name": {
        "pt": "Grava sozinha",
        "en": "Saves on its own",
        "es": "Graba sola"
       },
       "type": {
        "pt": "atenção",
        "en": "heads-up",
        "es": "atención"
       },
       "desc": {
        "pt": "<p>A TONEX ONE não tem “salvar”: cada mudança já fica no pedal. Por isso existe o <strong>VOLTAR AO ORIGINAL</strong>, que devolve o preset ao que era quando você abriu o editor.</p>",
        "en": "<p>The TONEX ONE has no “save”: every change is already stored in the pedal. That's why there's <strong>REVERT TO ORIGINAL</strong>, which takes the preset back to how it was when you opened the editor.</p>",
        "es": "<p>La TONEX ONE no tiene “guardar”: cada cambio ya queda en el pedal. Por eso existe <strong>VOLVER AL ORIGINAL</strong>, que devuelve el preset a como estaba cuando abriste el editor.</p>"
       }
      },
      {
       "name": {
        "pt": "Os blocos",
        "en": "The blocks",
        "es": "Los bloques"
       },
       "type": {
        "pt": "cadeia",
        "en": "chain",
        "es": "cadena"
       },
       "desc": {
        "pt": "<p><strong>AMP</strong> (gain, presence, depth, volume, mix), <strong>CAB</strong> (tone model, VIR ou desligada), <strong>NOISE GATE</strong>, <strong>COMPRESSOR</strong>, <strong>EQ</strong> de três bandas e os efeitos de <strong>MODULATION</strong>, <strong>DELAY</strong> e <strong>REVERB</strong> — alguns com a posição na cadeia (antes ou depois do amp).</p>",
        "en": "<p><strong>AMP</strong> (gain, presence, depth, volume, mix), <strong>CAB</strong> (tone model, VIR or off), <strong>NOISE GATE</strong>, <strong>COMPRESSOR</strong>, a three-band <strong>EQ</strong> and the <strong>MODULATION</strong>, <strong>DELAY</strong> and <strong>REVERB</strong> effects — some with their position in the chain (before or after the amp).</p>",
        "es": "<p><strong>AMP</strong> (gain, presence, depth, volume, mix), <strong>CAB</strong> (tone model, VIR o apagado), <strong>NOISE GATE</strong>, <strong>COMPRESSOR</strong>, <strong>EQ</strong> de tres bandas y los efectos de <strong>MODULATION</strong>, <strong>DELAY</strong> y <strong>REVERB</strong> — algunos con su posición en la cadena (antes o después del amp).</p>"
       }
      },
      {
       "name": {
        "pt": "Duas TONEX",
        "en": "Two TONEX units",
        "es": "Dos TONEX"
       },
       "type": {
        "pt": "hub",
        "en": "hub",
        "es": "hub"
       },
       "desc": {
        "pt": "<p>Com duas TONEX ONE plugadas, cada uma tem o seu editor e o seu canal MIDI (CONFIGURAÇÕES › HOST). A TONEX 1 é a que está na porta de menor número do hub.</p>",
        "en": "<p>With two TONEX ONE units plugged in, each one has its own editor and its own MIDI channel (SETTINGS › HOST). TONEX 1 is the one on the hub's lowest-numbered port.</p>",
        "es": "<p>Con dos TONEX ONE conectadas, cada una tiene su propio editor y su propio canal MIDI (CONFIGURACIÓN › HOST). La TONEX 1 es la que está en el puerto de menor número del hub.</p>"
       }
      }
     ]
    },
    {
     "id": "ed-nano",
     "title": {
      "pt": "Neural DSP Nano Cortex",
      "en": "Neural DSP Nano Cortex",
      "es": "Neural DSP Nano Cortex"
     },
     "purpose": {
      "pt": "Gate, dois efeitos antes da captura, a captura (com gain, nível e EQ) e três efeitos depois — trocando modelos e ajustando cada parâmetro.",
      "en": "Gate, two effects before the capture, the capture itself (with gain, level and EQ) and three effects after it — switching models and adjusting every parameter.",
      "es": "Gate, dos efectos antes de la captura, la captura (con gain, nivel y EQ) y tres efectos después — cambiando modelos y ajustando cada parámetro."
     },
     "shot": "deved-nano",
     "mockTitle": {
      "pt": "EDITOR DE PRESET — NANO CORTEX",
      "en": "PRESET EDITOR — NANO CORTEX",
      "es": "EDITOR DE PRESET — NANO CORTEX"
     },
     "fields": [
      {
       "name": {
        "pt": "A cadeia",
        "en": "The chain",
        "es": "La cadena"
       },
       "type": {
        "pt": "blocos",
        "en": "blocks",
        "es": "bloques"
       },
       "desc": {
        "pt": "<p><strong>GATE</strong> (redução em %) → <strong>PRE FX 1</strong> e <strong>2</strong> → <strong>CAPTURA</strong> (slot 1 a 25, com gain, level, bass, mid, treble e volume) → <strong>POST FX 1</strong>, <strong>2</strong> e <strong>3</strong>. A cor de cada slot de efeito segue o tipo do efeito carregado.</p>",
        "en": "<p><strong>GATE</strong> (reduction in %) → <strong>PRE FX 1</strong> and <strong>2</strong> → <strong>CAPTURE</strong> (slot 1 to 25, with gain, level, bass, mid, treble and volume) → <strong>POST FX 1</strong>, <strong>2</strong> and <strong>3</strong>. Each effect slot's color follows the type of effect loaded in it.</p>",
        "es": "<p><strong>GATE</strong> (reducción en %) → <strong>PRE FX 1</strong> y <strong>2</strong> → <strong>CAPTURA</strong> (slot 1 a 25, con gain, level, bass, mid, treble y volume) → <strong>POST FX 1</strong>, <strong>2</strong> y <strong>3</strong>. El color de cada slot de efecto sigue el tipo del efecto cargado.</p>"
       }
      },
      {
       "name": {
        "pt": "Salvar",
        "en": "Saving",
        "es": "Guardar"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p>Como na GP-5: <strong>SALVAR NO PEDAL</strong> grava, <strong>DESCARTAR</strong> volta ao gravado. O nome aceita até 32 caracteres (mínimo 4).</p>",
        "en": "<p>Same as the GP-5: <strong>SAVE TO PEDAL</strong> stores, <strong>DISCARD</strong> goes back to what's stored. The name takes up to 32 characters (minimum 4).</p>",
        "es": "<p>Como en la GP-5: <strong>GUARDAR EN EL PEDAL</strong> graba, <strong>DESCARTAR</strong> vuelve a lo grabado. El nombre acepta hasta 32 caracteres (mínimo 4).</p>"
       }
      },
      {
       "name": {
        "pt": "Cortex Cloud por Bluetooth",
        "en": "Cortex Cloud over Bluetooth",
        "es": "Cortex Cloud por Bluetooth"
       },
       "type": {
        "pt": "limitação",
        "en": "limitation",
        "es": "limitación"
       },
       "desc": {
        "pt": "<p>Enquanto o app Cortex Cloud estiver conectado à Nano por Bluetooth, a Nano não aceita edição pelo USB. Desconecte o Cortex Cloud e o editor volta a ler o preset.</p>",
        "en": "<p>While the Cortex Cloud app is connected to the Nano over Bluetooth, the Nano won't accept editing over USB. Disconnect Cortex Cloud and the editor reads the preset again.</p>",
        "es": "<p>Mientras la app Cortex Cloud esté conectada a la Nano por Bluetooth, la Nano no acepta edición por USB. Desconecta Cortex Cloud y el editor vuelve a leer el preset.</p>"
       }
      },
      {
       "name": {
        "pt": "Sozinha no USB Host",
        "en": "Alone on the USB Host",
        "es": "Sola en el USB Host"
       },
       "type": {
        "pt": "limitação",
        "en": "limitation",
        "es": "limitación"
       },
       "desc": {
        "pt": "<p>A Nano Cortex usa mais canais USB que os outros aparelhos e não cabe num hub junto com outro. Ligue-a sozinha na porta USB HOST.</p>",
        "en": "<p>The Nano Cortex uses more USB channels than the other devices and doesn't fit on a hub together with another one. Plug it into the USB HOST port on its own.</p>",
        "es": "<p>La Nano Cortex usa más canales USB que los otros aparatos y no cabe en un hub junto con otro. Conéctala sola al puerto USB HOST.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "A Nano Cortex também mostra o afinador e o nome do preset na tela da controladora — veja <strong>Integrações com aparelhos</strong>.",
       "en": "The Nano Cortex also shows the tuner and the preset name on the controller's screen — see <strong>Device integrations</strong>.",
       "es": "La Nano Cortex también muestra el afinador y el nombre del preset en la pantalla de la controladora — mira <strong>Integraciones con equipos</strong>."
      }
     ]
    },
    {
     "id": "ed-kemper",
     "title": {
      "pt": "Kemper Player — EDITAR RIG",
      "en": "Kemper Player — EDIT RIG",
      "es": "Kemper Player — EDITAR RIG"
     },
     "purpose": {
      "pt": "Edite ao vivo o rig que está tocando no Kemper Player: stomps, amp, EQ, cabine, efeitos e os Fixed FX — pelo mesmo cabo USB da controladora.",
      "en": "Edit the rig playing on the Kemper Player live: stomps, amp, EQ, cabinet, effects and the Fixed FX — over the controller's own USB cable.",
      "es": "Edita en vivo el rig que está sonando en el Kemper Player: stomps, amp, EQ, gabinete, efectos y los Fixed FX — por el mismo cable USB de la controladora."
     },
     "howto": [
      {
       "pt": "Ligue a porta <strong>DEVICE</strong> da controladora na porta USB do Kemper Player e escolha <strong>KEMPER PLAYER</strong> em <strong>CONFIGURAÇÕES › MODO AMIGÁVEL</strong>.",
       "en": "Connect the controller's <strong>DEVICE</strong> port to the Kemper Player's USB port and choose <strong>KEMPER PLAYER</strong> in <strong>SETTINGS › FRIENDLY MODE</strong>.",
       "es": "Conecta el puerto <strong>DEVICE</strong> de la controladora al puerto USB del Kemper Player y elige <strong>KEMPER PLAYER</strong> en <strong>CONFIGURACIÓN › MODO AMIGABLE</strong>."
      },
      {
       "pt": "Conecte o editor à controladora pelo <strong>Wi-Fi</strong> (o cabo USB dela está ocupado com o Player).",
       "en": "Connect the editor to the controller over <strong>Wi-Fi</strong> (its USB cable is busy with the Player).",
       "es": "Conecta el editor a la controladora por <strong>Wi-Fi</strong> (su cable USB está ocupado con el Player)."
      },
      {
       "pt": "Toque no botão <strong>KEMPER</strong> do card PRINCIPAL ou em <strong>EDITAR RIG</strong>, no card do Kemper Player.",
       "en": "Tap the <strong>KEMPER</strong> button in the MAIN card, or <strong>EDIT RIG</strong> in the Kemper Player card.",
       "es": "Toca el botón <strong>KEMPER</strong> de la tarjeta PRINCIPAL o <strong>EDITAR RIG</strong>, en la tarjeta del Kemper Player."
      }
     ],
     "shot": "ked",
     "mockTitle": {
      "pt": "EDITOR DE RIG — KEMPER PLAYER",
      "en": "RIG EDITOR — KEMPER PLAYER",
      "es": "EDITOR DE RIG — KEMPER PLAYER"
     },
     "hot": [
      {
       "n": 1,
       "sel": ".bf-deved-lcd",
       "label": {
        "pt": "rig atual",
        "en": "current rig",
        "es": "rig actual"
       }
      },
      {
       "n": 2,
       "sel": ".bf-ked-notes",
       "label": {
        "pt": "aviso de pausa",
        "en": "pause notice",
        "es": "aviso de pausa"
       }
      },
      {
       "n": 3,
       "sel": ".bf-deved-chain",
       "label": {
        "pt": "módulos",
        "en": "modules",
        "es": "módulos"
       }
      },
      {
       "n": 4,
       "sel": ".bf-deved-actions",
       "label": {
        "pt": "RELER e VOLTAR",
        "en": "RE-READ and REVERT",
        "es": "RELEER y VOLVER"
       }
      }
     ],
     "fields": [
      {
       "name": {
        "pt": "Footswitches pausados",
        "en": "Footswitches paused",
        "es": "Footswitches en pausa"
       },
       "type": {
        "pt": "modo exclusivo",
        "en": "exclusive mode",
        "es": "modo exclusivo"
       },
       "desc": {
        "pt": "<p>Com o editor aberto, a controladora dedica a USB ao Kemper: footswitches, afinador e SEGUIR O KEMPER ficam parados. Para sair: feche o editor, <strong>segure qualquer footswitch por 2 segundos</strong>, ou deixe o editor 20 segundos sem falar com a controladora (aba em segundo plano, conexão perdida). Nenhuma das saídas troca o rig nem manda PC ou CC.</p>",
        "en": "<p>With the editor open, the controller dedicates its USB to the Kemper: footswitches, tuner and FOLLOW THE KEMPER are paused. To leave: close the editor, <strong>hold any footswitch for 2 seconds</strong>, or let the editor go 20 seconds without talking to the controller (tab in the background, connection lost). None of these exits changes the rig or sends a PC or CC.</p>",
        "es": "<p>Con el editor abierto, la controladora dedica el USB al Kemper: footswitches, afinador y SEGUIR EL KEMPER quedan detenidos. Para salir: cierra el editor, <strong>mantén cualquier footswitch durante 2 segundos</strong>, o deja el editor 20 segundos sin hablar con la controladora (pestaña en segundo plano, conexión perdida). Ninguna de las salidas cambia el rig ni envía PC o CC.</p>"
       }
      },
      {
       "name": {
        "pt": "Salvar no Player",
        "en": "Saving on the Player",
        "es": "Guardar en el Player"
       },
       "type": {
        "pt": "atenção",
        "en": "heads-up",
        "es": "atención"
       },
       "desc": {
        "pt": "<p>O Kemper não aceita “salvar” por MIDI. Para guardar a edição, no Player: <strong>segure o botão do rig até os LEDs piscarem e aperte o mesmo botão</strong>. Trocar de rig antes disso descarta a edição.</p>",
        "en": "<p>The Kemper doesn't accept “save” over MIDI. To keep the edit, on the Player: <strong>hold the rig button until the LEDs blink, then press the same button</strong>. Changing rigs before that discards the edit.</p>",
        "es": "<p>El Kemper no acepta “guardar” por MIDI. Para guardar la edición, en el Player: <strong>mantén presionado el botón del rig hasta que los LEDs parpadeen y pulsa el mismo botón</strong>. Cambiar de rig antes de eso descarta la edición.</p>"
       }
      },
      {
       "name": {
        "pt": "RELER e VOLTAR AO ORIGINAL",
        "en": "RE-READ and REVERT TO ORIGINAL",
        "es": "RELEER y VOLVER AL ORIGINAL"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p>Knob girado no próprio Player não aparece no editor sozinho — toque em <strong>RELER</strong>. <strong>VOLTAR AO ORIGINAL</strong> desfaz o que você mexeu desde que abriu. Trocou de rig no Player? O editor percebe e relê.</p>",
        "en": "<p>A knob turned on the Player itself doesn't show up in the editor on its own — tap <strong>RE-READ</strong>. <strong>REVERT TO ORIGINAL</strong> undoes whatever you changed since you opened it. Changed rigs on the Player? The editor notices and reads it again.</p>",
        "es": "<p>Un knob girado en el propio Player no aparece solo en el editor — toca <strong>RELEER</strong>. <strong>VOLVER AL ORIGINAL</strong> deshace lo que cambiaste desde que lo abriste. ¿Cambiaste de rig en el Player? El editor lo detecta y vuelve a leer.</p>"
       }
      },
      {
       "name": {
        "pt": "Nível do Player",
        "en": "Player level",
        "es": "Nivel del Player"
       },
       "type": {
        "pt": "ajuste",
        "en": "setting",
        "es": "ajuste"
       },
       "desc": {
        "pt": "<p>Em <strong>CONFIGURAÇÕES › MODO AMIGÁVEL</strong>, card do Kemper Player, escolha o <strong>NÍVEL DO PLAYER</strong> (I, II ou III) igual ao do seu Player: o nível III mostra também os módulos C, D, X e MOD.</p>",
        "en": "<p>In <strong>SETTINGS › FRIENDLY MODE</strong>, Kemper Player card, set the <strong>PLAYER LEVEL</strong> (I, II or III) to match your Player: level III also shows modules C, D, X and MOD.</p>",
        "es": "<p>En <strong>CONFIGURACIÓN › MODO AMIGABLE</strong>, tarjeta del Kemper Player, elige el <strong>NIVEL DEL PLAYER</strong> (I, II o III) igual al de tu Player: el nivel III también muestra los módulos C, D, X y MOD.</p>"
       }
      },
      {
       "name": {
        "pt": "Valores com o texto do Kemper",
        "en": "Values in the Kemper's own text",
        "es": "Valores con el texto del Kemper"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>A caixa de valor mostra o texto que o próprio Kemper usa (“2.5 dB”, “361 ms”). Enquanto ele não chega, aparece uma estimativa em itálico.</p>",
        "en": "<p>The value box shows the text the Kemper itself uses (“2.5 dB”, “361 ms”). Until it arrives, an estimate is shown in italics.</p>",
        "es": "<p>La casilla de valor muestra el texto que usa el propio Kemper (“2.5 dB”, “361 ms”). Mientras no llega, aparece una estimación en cursiva.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "O editor do Kemper não abre pelo editor online (site https) nem com o editor ligado pelo cabo no computador: a tela explica o que falta e oferece o caminho.",
       "en": "The Kemper editor doesn't open from the online editor (https website) or with the editor connected to the computer by cable: the screen explains what's missing and shows you the way.",
       "es": "El editor del Kemper no abre desde el editor online (sitio https) ni con el editor conectado por cable a la computadora: la pantalla explica lo que falta y te indica el camino."
      }
     ]
    },
    {
     "id": "ed-dicas",
     "title": {
      "pt": "Quando o editor não abre",
      "en": "When the editor won't open",
      "es": "Cuando el editor no abre"
     },
     "purpose": {
      "pt": "Um roteiro curto, do mais comum ao mais raro.",
      "en": "A short checklist, from the most common case to the rarest.",
      "es": "Una guía corta, de lo más común a lo más raro."
     },
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "O botão do aparelho não aparece",
        "en": "The device button doesn't appear",
        "es": "El botón del aparato no aparece"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>Confira: (1) a tela PRESET está em modo PRESET (os atalhos não aparecem no LIVE); (2) o editor está conectado à controladora, não no modo offline; (3) o aparelho aparece em <strong>CONFIGURAÇÕES › HOST</strong> como conectado; (4) o modelo da placa é BFMIDI-3 ou BFMIDI-S3; (5) na GP-5, o <strong>Modo transmissão</strong> está desligado.</p>",
        "en": "<p>Check: (1) the PRESET screen is in PRESET mode (shortcuts don’t show in LIVE); (2) the editor is connected to the controller, not in offline mode; (3) the device shows up as connected in <strong>SETTINGS › HOST</strong>; (4) the board model is BFMIDI-3 or BFMIDI-S3; (5) for the GP-5, <strong>Transmit-only mode</strong> is off.</p>",
        "es": "<p>Revisa: (1) la pantalla PRESET está en modo PRESET (los atajos no aparecen en LIVE); (2) el editor está conectado a la controladora, no en el modo offline; (3) el equipo aparece como conectado en <strong>CONFIGURACIÓN › HOST</strong>; (4) el modelo de la placa es BFMIDI-3 o BFMIDI-S3; (5) en la GP-5, el <strong>Modo transmisión</strong> está apagado.</p>"
       }
      },
      {
       "name": {
        "pt": "Fica “lendo” e não carrega",
        "en": "It stays on “reading” and won't load",
        "es": "Se queda “leyendo” y no carga"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>Atualize o USB Host (<strong>CONFIGURAÇÕES › ATUALIZAR › USB HOST</strong>). Na Nano Cortex, desconecte o Cortex Cloud.</p>",
        "en": "<p>Update the USB Host (<strong>SETTINGS › UPDATES › USB HOST</strong>). On the Nano Cortex, disconnect Cortex Cloud.</p>",
        "es": "<p>Actualiza el USB Host (<strong>CONFIGURACIÓN › ACTUALIZAR › USB HOST</strong>). En la Nano Cortex, desconecta Cortex Cloud.</p>"
       }
      },
      {
       "name": {
        "pt": "O preset mudou sozinho no editor",
        "en": "The preset changed by itself in the editor",
        "es": "El preset cambió solo en el editor"
       },
       "type": {
        "pt": "normal",
        "en": "normal",
        "es": "normal"
       },
       "desc": {
        "pt": "<p>Se você troca de preset (pela BFMiDi ou no aparelho), o editor relê o preset novo e avisa. Na GP-5 e na Nano, uma edição não salva se perde nessa troca.</p>",
        "en": "<p>If you change presets (from the BFMiDi or on the device), the editor reads the new preset and lets you know. On the GP-5 and the Nano, an unsaved edit is lost when that happens.</p>",
        "es": "<p>Si cambias de preset (desde la BFMiDi o en el aparato), el editor lee el preset nuevo y avisa. En la GP-5 y la Nano, una edición sin guardar se pierde con ese cambio.</p>"
       }
      }
     ]
    }
   ]
  },
  {
   "id": "configuracoes",
   "icon": "system",
   "page": 5,
   "title": {
    "pt": "Configurações",
    "en": "Settings",
    "es": "Configuración"
   },
   "summary": {
    "pt": "Quinze destinos, do Modo Amigável à restauração de fábrica. O que está aqui vale para a controladora inteira — não para um preset.",
    "en": "Fifteen destinations, from Friendly Mode to factory reset. What's here applies to the whole controller — not to a single preset.",
    "es": "Quince destinos, del Modo Amigable a la restauración de fábrica. Lo que está aquí vale para toda la controladora — no para un preset."
   },
   "intro": {
    "pt": "<p>A engrenagem da barra de baixo abre o menu <strong>CONFIGURAÇÕES</strong>, e cada quadrado leva a uma tela. Os mesmos destinos podem virar atalhos no card PRINCIPAL (<strong>CONFIGURAÇÕES › EDITOR › ATALHOS</strong>).</p><p>Quase tudo aqui fica guardado numa memória protegida da controladora, que sobrevive às atualizações. As exceções são as preferências do próprio editor (tema, idioma, salvamento automático, atalhos e o nível do Kemper Player), que ficam no aparelho onde você abriu.</p>",
    "en": "<p>The gear on the bottom bar opens the <strong>SETTINGS</strong> menu, and each square takes you to a screen. The same destinations can become shortcuts on the MAIN card (<strong>SETTINGS › EDITOR › SHORTCUTS</strong>).</p><p>Almost everything here is stored in a protected memory on the controller that survives updates. The exceptions are the editor's own preferences (theme, language, auto save, shortcuts and the Kemper Player level), which stay on the device where you opened the editor.</p>",
    "es": "<p>El engranaje de la barra inferior abre el menú <strong>CONFIGURACIÓN</strong>, y cada cuadro te lleva a una pantalla. Los mismos destinos pueden convertirse en atajos en la tarjeta PRINCIPAL (<strong>CONFIGURACIÓN › EDITOR › ATAJOS</strong>).</p><p>Casi todo aquí se guarda en una memoria protegida de la controladora, que sobrevive a las actualizaciones. Las excepciones son las preferencias del propio editor (tema, idioma, guardado automático, atajos y el nivel del Kemper Player), que quedan en el dispositivo donde lo abriste.</p>"
   },
   "cards": [
    {
     "id": "cfg-menu",
     "title": {
      "pt": "O menu de configurações",
      "en": "The settings menu",
      "es": "El menú de configuración"
     },
     "purpose": {
      "pt": "Saber onde procurar cada coisa. O menu mostra os quinze destinos em três linhas de cinco; aqui eles estão agrupados por assunto.",
      "en": "Know where to look for each thing. The menu shows the fifteen destinations in three rows of five; here they are grouped by topic.",
      "es": "Saber dónde buscar cada cosa. El menú muestra los quince destinos en tres filas de cinco; aquí están agrupados por tema."
     },
     "howto": [
      {
       "pt": "Toque na engrenagem, na barra de baixo, em qualquer tela.",
       "en": "Tap the gear on the bottom bar, on any screen.",
       "es": "Toca el engranaje de la barra inferior, en cualquier pantalla."
      }
     ],
     "shot": "cfg-menu",
     "mockTitle": {
      "pt": "MENU DE CONFIGURAÇÕES",
      "en": "SETTINGS MENU",
      "es": "MENÚ DE CONFIGURACIÓN"
     },
     "fields": [
      {
       "name": {
        "pt": "Som e comportamento",
        "en": "Sound and behavior",
        "es": "Sonido y comportamiento"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p><strong>MODO AMIGÁVEL</strong> — qual é o seu aparelho, para o editor falar por nomes.<br><strong>FOOTSWITCHES</strong> — o que não pertence a preset: modo de operação, SW GLOBAL, expressão e footswitches externos.<br><strong>BANCOS</strong> — como a controladora liga, como o pé navega e os combos.</p>",
        "en": "<p><strong>FRIENDLY MODE</strong> — which device you have, so the editor can speak in names.<br><strong>FOOTSWITCHES</strong> — what doesn't belong to a preset: operating mode, SW GLOBAL, expression and external footswitches.<br><strong>BANKS</strong> — how the controller starts up, how your foot navigates, and the combos.</p>",
        "es": "<p><strong>MODO AMIGABLE</strong> — cuál es tu equipo, para que el editor hable con nombres.<br><strong>FOOTSWITCHES</strong> — lo que no pertenece a un preset: modo de operación, SW GLOBAL, expresión y footswitches externos.<br><strong>BANCOS</strong> — cómo arranca la controladora, cómo navega el pie y los combos.</p>"
       }
      },
      {
       "name": {
        "pt": "Aparência",
        "en": "Appearance",
        "es": "Apariencia"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p><strong>TELA</strong> — layouts e o card de BPM. <strong>LEDS</strong> — brilho e cores dos anéis. <strong>IMAGENS</strong> — os seus fundos e ícones.</p>",
        "en": "<p><strong>DISPLAY</strong> — layouts and the BPM card. <strong>LEDS</strong> — brightness and ring colors. <strong>IMAGES</strong> — your own backgrounds and icons.</p>",
        "es": "<p><strong>PANTALLA</strong> — layouts y la tarjeta de BPM. <strong>LEDS</strong> — brillo y colores de los anillos. <strong>IMÁGENES</strong> — tus propios fondos e íconos.</p>"
       }
      },
      {
       "name": {
        "pt": "Máquina e conexões",
        "en": "Machine and connections",
        "es": "Máquina y conexiones"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p><strong>HARDWARE</strong> — modelo, tempos de disparo e memória. <strong>WIFI</strong>, <strong>HOST</strong> (USB Host e os aparelhos plugados) e <strong>BLUETOOTH</strong> — as três abas da tela de conexões.</p>",
        "en": "<p><strong>HARDWARE</strong> — model, send timing and memory. <strong>WIFI</strong>, <strong>HOST</strong> (the USB Host and the devices plugged into it) and <strong>BLUETOOTH</strong> — the three tabs of the connections screen.</p>",
        "es": "<p><strong>HARDWARE</strong> — modelo, tiempos de envío y memoria. <strong>WIFI</strong>, <strong>HOST</strong> (el USB Host y los equipos conectados) y <strong>BLUETOOTH</strong> — las tres pestañas de la pantalla de conexiones.</p>"
       }
      },
      {
       "name": {
        "pt": "Manutenção",
        "en": "Maintenance",
        "es": "Mantenimiento"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p><strong>EDITOR</strong> — tema, salvamento automático, atalhos e idioma. <strong>ATUALIZAR</strong> — firmware da controladora e do USB Host. <strong>BACKUP</strong> — cópias em arquivo. <strong>TESTES</strong> — diagnóstico e monitor MIDI. <strong>RESTAURAR</strong> — apagar e voltar ao padrão (por isso em vermelho).</p>",
        "en": "<p><strong>EDITOR</strong> — theme, auto save, shortcuts and language. <strong>UPDATES</strong> — firmware for the controller and the USB Host. <strong>BACKUP</strong> — copies to a file. <strong>TESTS</strong> — diagnostics and MIDI monitor. <strong>FACTORY RESET</strong> — erase and go back to defaults (that's why it's in red).</p>",
        "es": "<p><strong>EDITOR</strong> — tema, guardado automático, atajos e idioma. <strong>ACTUALIZAR</strong> — firmware de la controladora y del USB Host. <strong>BACKUP</strong> — copias en archivo. <strong>PRUEBAS</strong> — diagnóstico y monitor MIDI. <strong>RESTAURAR</strong> — borrar y volver a los valores de fábrica (por eso está en rojo).</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-amigavel",
     "title": {
      "pt": "MODO AMIGÁVEL — MIDI com nomes",
      "en": "FRIENDLY MODE — MIDI with names",
      "es": "MODO AMIGABLE — MIDI con nombres"
     },
     "purpose": {
      "pt": "Dizer qual aparelho está em cada canal, para o editor mostrar “Delay”, “Reverb” e o nome dos sons em vez de números.",
      "en": "Tell the editor which device is on each channel, so it shows “Delay”, “Reverb” and the names of your sounds instead of numbers.",
      "es": "Indicar qué equipo está en cada canal, para que el editor muestre “Delay”, “Reverb” y el nombre de los sonidos en lugar de números."
     },
     "howto": [
      {
       "pt": "Na linha <strong>CH 1</strong>, escolha o seu aparelho na lista (ela é organizada por marca e tem busca).",
       "en": "On the <strong>CH 1</strong> row, choose your device from the list (it's organized by brand and has a search).",
       "es": "En la fila <strong>CH 1</strong>, elige tu equipo en la lista (está organizada por marca y tiene búsqueda)."
      },
      {
       "pt": "Tem mais de um aparelho? Toque em <strong>+ CANAL</strong> e mapeie cada canal.",
       "en": "Have more than one device? Tap <strong>+ CHANNEL</strong> and map each channel.",
       "es": "¿Tienes más de un equipo? Toca <strong>+ CANAL</strong> y asigna cada canal."
      },
      {
       "pt": "A partir daí, todo seletor de PC e CC do editor mostra os nomes daquele aparelho, conforme o canal do comando.",
       "en": "From then on, every PC and CC selector in the editor shows that device's names, based on the command's channel.",
       "es": "A partir de ahí, todos los selectores de PC y CC del editor muestran los nombres de ese equipo, según el canal del comando."
      }
     ],
     "shot": "cfg-amigavel",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › MODO AMIGÁVEL",
      "en": "SETTINGS › FRIENDLY MODE",
      "es": "CONFIGURACIÓN › MODO AMIGABLE"
     },
     "fields": [
      {
       "name": {
        "pt": "Um aparelho por canal",
        "en": "One device per channel",
        "es": "Un equipo por canal"
       },
       "type": {
        "pt": "mapa",
        "en": "map",
        "es": "mapa"
       },
       "desc": {
        "pt": "<p>Cada linha é um canal MIDI (CH 1 a CH 16) com o aparelho que escuta nele. <strong>GLOBAL</strong> quer dizer “sem aparelho”: os comandos aparecem só por número.</p>",
        "en": "<p>Each row is a MIDI channel (CH 1 to CH 16) with the device that listens on it. <strong>GLOBAL</strong> means “no device”: commands show up by number only.</p>",
        "es": "<p>Cada fila es un canal MIDI (CH 1 a CH 16) con el equipo que escucha en él. <strong>GLOBAL</strong> significa “sin equipo”: los comandos aparecen solo por número.</p>"
       }
      },
      {
       "name": {
        "pt": "A lista de aparelhos",
        "en": "The device list",
        "es": "La lista de equipos"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>Organizada por marca (Valeton, Hotone, Line 6, Fractal, IK, Neural DSP, Kemper, BOSS, Strymon…), com busca por marca ou modelo. Os aparelhos que você mesmo cadastrou (<strong>USER 1</strong> a <strong>3</strong>) ficam logo abaixo de GLOBAL.</p>",
        "en": "<p>Organized by brand (Valeton, Hotone, Line 6, Fractal, IK, Neural DSP, Kemper, BOSS, Strymon…), with search by brand or model. The devices you registered yourself (<strong>USER 1</strong> to <strong>3</strong>) are right below GLOBAL.</p>",
        "es": "<p>Organizada por marca (Valeton, Hotone, Line 6, Fractal, IK, Neural DSP, Kemper, BOSS, Strymon…), con búsqueda por marca o modelo. Los equipos que registraste tú mismo (<strong>USER 1</strong> a <strong>3</strong>) quedan justo debajo de GLOBAL.</p>"
       }
      },
      {
       "name": {
        "pt": "CC no LIVE",
        "en": "LIVE CC",
        "es": "CC en LIVE"
       },
       "type": {
        "pt": "engrenagem",
        "en": "gear",
        "es": "engranaje"
       },
       "desc": {
        "pt": "<p>A engrenagem no fim de cada linha manda um CC naquele canal <strong>AO ENTRAR</strong> e <strong>AO SAIR</strong> do modo LIVE (valores ajustáveis). Serve para aparelhos com “modo cena” e “modo stomp” acompanharem a controladora.</p>",
        "en": "<p>The gear at the end of each row sends a CC on that channel when entering (<strong>ON ENTER</strong>) and leaving (<strong>ON EXIT</strong>) LIVE mode (adjustable values). It lets devices with a “scene mode” and a “stomp mode” follow the controller.</p>",
        "es": "<p>El engranaje al final de cada fila envía un CC en ese canal <strong>AL ENTRAR</strong> y <strong>AL SALIR</strong> del modo LIVE (valores ajustables). Sirve para que los equipos con “modo escena” y “modo stomp” acompañen a la controladora.</p>"
       }
      },
      {
       "name": {
        "pt": "Omitir PC/CC sem nome",
        "en": "Omit unnamed PC/CC",
        "es": "Omitir PC/CC sin nombre"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Esconde dos seletores os números que o aparelho não usa: a lista fica só com o que existe.</p>",
        "en": "<p>Hides the numbers the device doesn't use from the selectors: the list keeps only what actually exists.</p>",
        "es": "<p>Oculta de los selectores los números que el equipo no usa: la lista queda solo con lo que existe.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Não achou o seu aparelho? Cadastre-o no card <strong>APARELHO PERSONALIZADO</strong>, logo abaixo.",
       "en": "Can't find your device? Register it on the <strong>CUSTOM DEVICE</strong> card, just below.",
       "es": "¿No encuentras tu equipo? Regístralo en la tarjeta <strong>APARATO PERSONALIZADO</strong>, justo debajo."
      }
     ]
    },
    {
     "id": "cfg-user",
     "title": {
      "pt": "Aparelho personalizado (USER 1, 2 e 3)",
      "en": "Custom device (USER 1, 2 and 3)",
      "es": "Aparato personalizado (USER 1, 2 y 3)"
     },
     "purpose": {
      "pt": "Para equipamento fora da lista: dê um nome ao aparelho e aos comandos e presets dele, e o editor passa a usar esses nomes.",
      "en": "For gear that isn't on the list: give a name to the device, its commands and its presets, and the editor starts using those names.",
      "es": "Para equipos que no están en la lista: ponle nombre al equipo, a sus comandos y a sus presets, y el editor pasa a usar esos nombres."
     },
     "howto": [
      {
       "pt": "No card <strong>APARELHO PERSONALIZADO</strong>, escolha <strong>USER 1</strong>, <strong>2</strong> ou <strong>3</strong> e escreva o nome do aparelho.",
       "en": "On the <strong>CUSTOM DEVICE</strong> card, choose <strong>USER 1</strong>, <strong>2</strong> or <strong>3</strong> and type the device's name.",
       "es": "En la tarjeta <strong>APARATO PERSONALIZADO</strong>, elige <strong>USER 1</strong>, <strong>2</strong> o <strong>3</strong> y escribe el nombre del equipo."
      },
      {
       "pt": "Na aba <strong>COMANDOS (CC)</strong>, toque em <strong>+ ADICIONAR</strong> e diga o número e o que ele faz. Faça o mesmo em <strong>PRESETS (PC)</strong>.",
       "en": "On the <strong>COMMANDS (CC)</strong> tab, tap <strong>+ ADD</strong> and enter the number and what it does. Do the same in <strong>PRESETS (PC)</strong>.",
       "es": "En la pestaña <strong>COMANDOS (CC)</strong>, toca <strong>+ AÑADIR</strong> e indica el número y lo que hace. Haz lo mismo en <strong>PRESETS (PC)</strong>."
      },
      {
       "pt": "Escolha esse USER num canal do Modo Amigável. Pronto: os nomes aparecem nos seletores.",
       "en": "Choose that USER on a Friendly Mode channel. Done: the names show up in the selectors.",
       "es": "Elige ese USER en un canal del Modo Amigable. Listo: los nombres aparecen en los selectores."
      }
     ],
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "Limites",
        "en": "Limits",
        "es": "Límites"
       },
       "type": {
        "pt": "detalhe",
        "en": "detail",
        "es": "detalle"
       },
       "desc": {
        "pt": "<p>Nome do aparelho até 24 caracteres; até 32 nomes por lista, de até 20 caracteres. Número repetido não é aceito.</p>",
        "en": "<p>Device name up to 24 characters; up to 32 names per list, up to 20 characters each. Duplicate numbers aren't accepted.</p>",
        "es": "<p>Nombre del equipo de hasta 24 caracteres; hasta 32 nombres por lista, de hasta 20 caracteres cada uno. No se aceptan números repetidos.</p>"
       }
      },
      {
       "name": {
        "pt": "Onde fica guardado",
        "en": "Where it's stored",
        "es": "Dónde se guarda"
       },
       "type": {
        "pt": "memória",
        "en": "memory",
        "es": "memoria"
       },
       "desc": {
        "pt": "<p>Na memória da controladora, salvo pelo botão de salvar (ou pelo salvamento automático). Vai junto no backup completo quando você inclui as configurações globais.</p>",
        "en": "<p>In the controller's memory, saved with the save button (or by auto save). It's included in the full backup when you include the global settings.</p>",
        "es": "<p>En la memoria de la controladora, guardado con el botón de guardar (o por el guardado automático). Va incluido en el backup completo cuando incluyes la configuración global.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-kemper",
     "title": {
      "pt": "Kemper Player e Nano Cortex no Modo Amigável",
      "en": "Kemper Player and Nano Cortex in Friendly Mode",
      "es": "Kemper Player y Nano Cortex en el Modo Amigable"
     },
     "purpose": {
      "pt": "Escolhendo KEMPER PLAYER ou NANO CORTEX num canal, aparece um card extra com recursos que só existem para eles.",
      "en": "When you choose KEMPER PLAYER or NANO CORTEX on a channel, an extra card appears with features that only exist for them.",
      "es": "Al elegir KEMPER PLAYER o NANO CORTEX en un canal, aparece una tarjeta extra con funciones que solo existen para ellos."
     },
     "shot": "cfg-kemper",
     "mockTitle": {
      "pt": "CARD KEMPER PLAYER",
      "en": "KEMPER PLAYER CARD",
      "es": "TARJETA KEMPER PLAYER"
     },
     "fields": [
      {
       "name": {
        "pt": "EDITAR RIG e NÍVEL DO PLAYER",
        "en": "EDIT RIG and PLAYER LEVEL",
        "es": "EDITAR RIG y NIVEL DEL PLAYER"
       },
       "type": {
        "pt": "Kemper",
        "en": "Kemper",
        "es": "Kemper"
       },
       "desc": {
        "pt": "<p>Abre o editor do rig que está tocando (veja <strong>Editores de preset dos aparelhos</strong>). O nível do Player (I, II ou III) decide quais módulos o editor mostra.</p>",
        "en": "<p>Opens the editor for the rig that's playing (see <strong>Device preset editors</strong>). The Player level (I, II or III) decides which modules the editor shows.</p>",
        "es": "<p>Abre el editor del rig que está sonando (mira <strong>Editores de preset de los aparatos</strong>). El nivel del Player (I, II o III) decide qué módulos muestra el editor.</p>"
       }
      },
      {
       "name": {
        "pt": "GET NAMES",
        "en": "GET NAMES",
        "es": "GET NAMES"
       },
       "type": {
        "pt": "nome na tela",
        "en": "on-screen name",
        "es": "nombre en pantalla"
       },
       "desc": {
        "pt": "<p>Mostra na tela da controladora o nome do rig do Kemper (ou do preset da Nano Cortex) em vez do nome do preset da BFMiDi. Na Nano, o Cortex Cloud precisa estar desconectado.</p>",
        "en": "<p>Shows the Kemper rig name (or the Nano Cortex preset name) on the controller's screen instead of the BFMiDi preset name. On the Nano, Cortex Cloud must be disconnected.</p>",
        "es": "<p>Muestra en la pantalla de la controladora el nombre del rig del Kemper (o del preset de la Nano Cortex) en lugar del nombre del preset de la BFMiDi. En la Nano, Cortex Cloud tiene que estar desconectado.</p>"
       }
      },
      {
       "name": {
        "pt": "SEGUIR O KEMPER",
        "en": "FOLLOW THE KEMPER",
        "es": "SEGUIR EL KEMPER"
       },
       "type": {
        "pt": "Kemper",
        "en": "Kemper",
        "es": "Kemper"
       },
       "desc": {
        "pt": "<p>Quando você troca o rig no próprio Kemper, a controladora pula para o preset que casa.</p>",
        "en": "<p>When you change the rig on the Kemper itself, the controller jumps to the matching preset.</p>",
        "es": "<p>Cuando cambias el rig en el propio Kemper, la controladora salta al preset que coincide.</p>"
       }
      },
      {
       "name": {
        "pt": "Afinador na tela",
        "en": "On-screen tuner",
        "es": "Afinador en pantalla"
       },
       "type": {
        "pt": "afinador",
        "en": "tuner",
        "es": "afinador"
       },
       "desc": {
        "pt": "<p>Estilo (<strong>ARCO</strong>, <strong>BARRA</strong> ou <strong>LEDS</strong>), velocidade de resposta e as cores do indicador (afinado, perto, longe). O afinador abre com um footswitch que manda o comando de afinador do aparelho (CC 31 no Kemper, CC 43 na Nano Cortex).</p>",
        "en": "<p>Style (<strong>ARC</strong>, <strong>BAR</strong> or <strong>LEDS</strong>), response speed and the indicator colors (in tune, close, far). The tuner opens with a footswitch that sends the device's tuner command (CC 31 on the Kemper, CC 43 on the Nano Cortex).</p>",
        "es": "<p>Estilo (<strong>ARCO</strong>, <strong>BARRA</strong> o <strong>LEDS</strong>), velocidad de respuesta y los colores del indicador (afinado, cerca, lejos). El afinador se abre con un footswitch que envía el comando de afinador del equipo (CC 31 en el Kemper, CC 43 en la Nano Cortex).</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-footswitches",
     "title": {
      "pt": "FOOTSWITCHES — o que vale em qualquer preset",
      "en": "FOOTSWITCHES — what applies in any preset",
      "es": "FOOTSWITCHES — lo que vale en cualquier preset"
     },
     "purpose": {
      "pt": "Os controles que não pertencem a preset nenhum: o modo de operação, o botão LIVE, o SW GLOBAL, o pedal de expressão e os footswitches externos.",
      "en": "The controls that don't belong to any preset: the operating mode, the LIVE button, the SW GLOBAL, the expression pedal and the external footswitches.",
      "es": "Los controles que no pertenecen a ningún preset: el modo de operación, el botón LIVE, el SW GLOBAL, el pedal de expresión y los footswitches externos."
     },
     "shot": "cfg-footswitches",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › FOOTSWITCHES",
      "en": "SETTINGS › FOOTSWITCHES",
      "es": "CONFIGURACIÓN › FOOTSWITCHES"
     },
     "fields": [
      {
       "name": {
        "pt": "MODO DE OPERAÇÃO",
        "en": "OPERATING MODE",
        "es": "MODO DE OPERACIÓN"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>PRESET–LIVE</strong> é o padrão: no modo PRESET os pés escolhem presets; no LIVE, controlam funções. No <strong>HÍBRIDO</strong> a controladora divide os footswitches: uma parte sempre chama presets e a outra sempre controla efeitos, sem trocar de modo.</p>",
        "en": "<p><strong>PRESET–LIVE</strong> is the default: in PRESET mode your feet pick presets; in LIVE, they control functions. In <strong>HYBRID</strong> the controller splits the footswitches: some always call presets and the rest always control effects, with no mode switching.</p>",
        "es": "<p><strong>PRESET–LIVE</strong> es el predeterminado: en el modo PRESET los pies eligen presets; en LIVE, controlan funciones. En <strong>HÍBRIDO</strong> la controladora divide los footswitches: una parte siempre llama presets y la otra siempre controla efectos, sin cambiar de modo.</p>"
       }
      },
      {
       "name": {
        "pt": "BOTÃO LIVE",
        "en": "LIVE BUTTON",
        "es": "BOTÓN LIVE"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Nas placas com botão LIVE dedicado, <strong>Usar como SW GLOBAL 2</strong> aposenta a função de LIVE desse botão e o transforma num segundo SW GLOBAL.</p>",
        "en": "<p>On boards with a dedicated LIVE button, <strong>Use as GLOBAL SW 2</strong> retires that button's LIVE function and turns it into a second SW GLOBAL.</p>",
        "es": "<p>En las placas con botón LIVE dedicado, <strong>Usar como SW GLOBAL 2</strong> retira la función de LIVE de ese botón y lo convierte en un segundo SW GLOBAL.</p>"
       }
      },
      {
       "name": {
        "pt": "SW6 = SW GLOBAL",
        "en": "SW6 = GLOBAL SW",
        "es": "SW6 = SW GLOBAL"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Nas placas NANO e 6SW+ (que não têm SW GLOBAL dedicado) e na BFMIDI-2 6S, transforma o SW6 num SW GLOBAL. Ele deixa de chamar o preset 6 e sai também da chamada de presets e dos combos. Reinicia a controladora ao salvar.</p>",
        "en": "<p>On the NANO and 6SW+ boards (which have no dedicated GLOBAL SW) and on the BFMIDI-2 6S, turns SW6 into a GLOBAL SW. It stops calling preset 6 and is also removed from preset call and from the combos. The controller restarts when you save.</p>",
        "es": "<p>En las placas NANO y 6SW+ (que no tienen SW GLOBAL dedicado) y en la BFMIDI-2 6S, convierte el SW6 en un SW GLOBAL. Deja de llamar al preset 6 y también sale de la llamada de presets y de los combos. Reinicia la controladora al guardar.</p>"
       }
      },
      {
       "name": {
        "pt": "SW GLOBAL",
        "en": "SW GLOBAL",
        "es": "SW GLOBAL"
       },
       "type": {
        "pt": "editor",
        "en": "editor",
        "es": "editor"
       },
       "desc": {
        "pt": "<p>Um footswitch que vale em qualquer banco, preset ou modo, com os modos dos footswitches do preset — menos STEPS e CONTROL. O uso clássico é o tap tempo geral, o afinador ou um mute. Toque em <strong>EDITAR</strong> para abrir.</p><p><strong>RESET AO TROCAR PRESET</strong> devolve o LED e a tela ao estado inicial a cada troca de preset, sem mandar MIDI.</p>",
        "en": "<p>A footswitch that works in any bank, preset or mode, with the same modes as the preset footswitches — except STEPS and CONTROL. The classic use is a global tap tempo, the tuner or a mute. Tap <strong>EDIT</strong> to open it.</p><p><strong>RESET ON PRESET CHANGE</strong> returns the LED and the screen to their initial state on every preset change, without sending MIDI.</p>",
        "es": "<p>Un footswitch que vale en cualquier banco, preset o modo, con los modos de los footswitches del preset — menos STEPS y CONTROL. El uso clásico es el tap tempo general, el afinador o un mute. Toca <strong>EDITAR</strong> para abrirlo.</p><p><strong>RESET AL CAMBIAR PRESET</strong> devuelve el LED y la pantalla al estado inicial en cada cambio de preset, sin enviar MIDI.</p>"
       }
      },
      {
       "name": {
        "pt": "EXTERNAL SW1 e SW2",
        "en": "EXTERNAL SW1 and SW2",
        "es": "EXTERNAL SW1 y SW2"
       },
       "type": {
        "pt": "editores",
        "en": "editors",
        "es": "editores"
       },
       "desc": {
        "pt": "<p>Os dois footswitches externos (entrada 2SW), sem LED, com os mesmos modos do SW GLOBAL e valendo em qualquer preset. Cada um pode ter um <strong>indicador na tela</strong> (sigla, cores e posição) e o mesmo reset ao trocar de preset. Também têm dois comandos exclusivos para navegar bancos em prévia.</p>",
        "en": "<p>The two external footswitches (2SW input), with no LED, with the same modes as the GLOBAL SW and working in any preset. Each one can have an <strong>on-screen indicator</strong> (label, colors and position) and the same reset on preset change. They also have two exclusive commands for browsing banks in preview.</p>",
        "es": "<p>Los dos footswitches externos (entrada 2SW), sin LED, con los mismos modos del SW GLOBAL y válidos en cualquier preset. Cada uno puede tener un <strong>indicador en pantalla</strong> (sigla, colores y posición) y el mismo reset al cambiar de preset. También tienen dos comandos exclusivos para recorrer bancos en vista previa.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Os cards que dependem de hardware (botão LIVE, expressão, footswitches externos) só aparecem nos modelos que têm essas entradas.",
       "en": "The cards that depend on hardware (LIVE button, expression, external footswitches) only show up on models that have those inputs.",
       "es": "Las tarjetas que dependen del hardware (botón LIVE, expresión, footswitches externos) solo aparecen en los modelos que tienen esas entradas."
      }
     ]
    },
    {
     "id": "cfg-exp",
     "title": {
      "pt": "Expressão externa",
      "en": "External expression",
      "es": "Expresión externa"
     },
     "purpose": {
      "pt": "O pedal de expressão: qual CC ele controla, a calibração do seu pedal e a faixa de saída.",
      "en": "The expression pedal: which CC it controls, the calibration for your pedal and the output range.",
      "es": "El pedal de expresión: qué CC controla, la calibración de tu pedal y el rango de salida."
     },
     "howto": [
      {
       "pt": "Ligue a chave do card e toque em <strong>EDITAR</strong>.",
       "en": "Turn on the card's switch and tap <strong>EDIT</strong>.",
       "es": "Activa el interruptor de la tarjeta y toca <strong>EDITAR</strong>."
      },
      {
       "pt": "Escolha o CC e o canal (volume, wah, mix do delay…).",
       "en": "Choose the CC and the channel (volume, wah, delay mix…).",
       "es": "Elige el CC y el canal (volumen, wah, mix del delay…)."
      },
      {
       "pt": "Em <strong>CALIBRAÇÃO</strong>, pise até o fim de cada lado e capture o mínimo e o máximo.",
       "en": "In <strong>CALIBRATION</strong>, rock the pedal all the way to each end and capture the minimum and the maximum.",
       "es": "En <strong>CALIBRACIÓN</strong>, lleva el pedal hasta el final de cada lado y captura el mínimo y el máximo."
      }
     ],
     "shot": "cfg-exp",
     "mockTitle": {
      "pt": "EXPRESSÃO EXTERNA — ABERTO",
      "en": "EXTERNAL EXPRESSION — OPEN",
      "es": "EXPRESIÓN EXTERNA — ABIERTA"
     },
     "fields": [
      {
       "name": {
        "pt": "LEITURA AO VIVO",
        "en": "LIVE READING",
        "es": "LECTURA EN VIVO"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Mostra o valor saindo em tempo real, já com a calibração e a faixa aplicadas.</p>",
        "en": "<p>Shows the value going out in real time, with the calibration and the range already applied.</p>",
        "es": "<p>Muestra el valor que sale en tiempo real, ya con la calibración y el rango aplicados.</p>"
       }
      },
      {
       "name": {
        "pt": "FAIXA DE SAÍDA",
        "en": "OUTPUT RANGE",
        "es": "RANGO DE SALIDA"
       },
       "type": {
        "pt": "porcentagem",
        "en": "percentage",
        "es": "porcentaje"
       },
       "desc": {
        "pt": "<p><strong>MÍN</strong> e <strong>MÁX</strong> em porcentagem: o pedal recolhido manda o mínimo e na ponta manda o máximo (50% = 64). Mínimo maior que o máximo <strong>inverte</strong> o sentido. Vale também para os destinos EXP dos presets.</p>",
        "en": "<p><strong>MIN</strong> and <strong>MAX</strong> in percent: heel down sends the minimum and toe down sends the maximum (50% = 64). A minimum higher than the maximum <strong>reverses</strong> the direction. It also applies to the presets' EXP targets.</p>",
        "es": "<p><strong>MÍN</strong> y <strong>MÁX</strong> en porcentaje: con el pedal atrás envía el mínimo y con la punta abajo envía el máximo (50% = 64). Un mínimo mayor que el máximo <strong>invierte</strong> el sentido. Vale también para los destinos EXP de los presets.</p>"
       }
      },
      {
       "name": {
        "pt": "O padrão e o preset",
        "en": "The default and the preset",
        "es": "El predeterminado y el preset"
       },
       "type": {
        "pt": "destino",
        "en": "target",
        "es": "destino"
       },
       "desc": {
        "pt": "<p>O CC e o canal deste card são o padrão. Um preset com uma linha <strong>EXP</strong> nos envios extras tem o seu próprio destino — e liga o pedal mesmo com este card desligado.</p>",
        "en": "<p>This card's CC and channel are the default. A preset with an <strong>EXP</strong> row in its extra messages has its own target — and turns the pedal on even with this card turned off.</p>",
        "es": "<p>El CC y el canal de esta tarjeta son el predeterminado. Un preset con una fila <strong>EXP</strong> en los envíos extra tiene su propio destino — y activa el pedal incluso con esta tarjeta desactivada.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-bancos",
     "title": {
      "pt": "BANCOS — ligar, navegar e combos",
      "en": "BANKS — startup, navigation and combos",
      "es": "BANCOS — arranque, navegación y combos"
     },
     "purpose": {
      "pt": "Como a controladora acorda, o que cada footswitch faz no modo PRESET e quais pares de pés disparam atalhos.",
      "en": "How the controller wakes up, what each footswitch does in PRESET mode and which footswitch pairs trigger shortcuts.",
      "es": "Cómo arranca la controladora, qué hace cada footswitch en el modo PRESET y qué pares de footswitches disparan atajos."
     },
     "shot": "cfg-bancos",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › BANCOS",
      "en": "SETTINGS › BANKS",
      "es": "CONFIGURACIÓN › BANCOS"
     },
     "fields": [
      {
       "name": {
        "pt": "INÍCIO AUTOMÁTICO",
        "en": "AUTO START",
        "es": "INICIO AUTOMÁTICO"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p>Com <strong>INICIAR COM PRESET</strong> ligado, a controladora acorda no banco e preset escolhidos, no modo PRESET ou LIVE, mandando todo o MIDI dele. Você liga a fonte e está pronto para tocar.</p>",
        "en": "<p>With <strong>START WITH PRESET</strong> on, the controller wakes up in the chosen bank and preset, in PRESET or LIVE mode, sending all of its MIDI. You plug in the power and you're ready to play.</p>",
        "es": "<p>Con <strong>INICIAR CON PRESET</strong> activado, la controladora arranca en el banco y el preset elegidos, en el modo PRESET o LIVE, enviando todo su MIDI. Conectas la fuente y estás listo para tocar.</p>"
       }
      },
      {
       "name": {
        "pt": "CHAMADA DE PRESETS",
        "en": "PRESET CALL",
        "es": "LLAMADA DE PRESETS"
       },
       "type": {
        "pt": "três abas",
        "en": "three tabs",
        "es": "tres pestañas"
       },
       "desc": {
        "pt": "<p>Para cada footswitch e cada gesto, uma ação. <strong>CLICK CURTO</strong> e <strong>CLICK LONGO</strong> valem em qualquer footswitch. O <strong>RECLICK</strong> é pisar de novo no footswitch do preset que <em>já está tocando</em> (só nos footswitches cujo clique curto é CHAMAR PRESET).</p><p>De fábrica: curto = <strong>CHAMAR PRESET</strong>, longo = <strong>ENTRAR EM MODO LIVE</strong> e reclick = <strong>SUBIR BANCO</strong>.</p>",
        "en": "<p>For each footswitch and each gesture, one action. <strong>SHORT CLICK</strong> and <strong>LONG CLICK</strong> work on any footswitch. <strong>RECLICK</strong> means stepping again on the footswitch of the preset that's <em>already playing</em> (only on footswitches whose short click is CALL PRESET).</p><p>Factory defaults: short = <strong>CALL PRESET</strong>, long = <strong>ENTER LIVE MODE</strong> and reclick = <strong>BANK UP</strong>.</p>",
        "es": "<p>Para cada footswitch y cada gesto, una acción. <strong>CLICK CORTO</strong> y <strong>CLICK LARGO</strong> valen en cualquier footswitch. El <strong>RECLICK</strong> es pisar de nuevo el footswitch del preset que <em>ya está sonando</em> (solo en los footswitches cuyo clic corto es LLAMAR PRESET).</p><p>De fábrica: corto = <strong>LLAMAR PRESET</strong>, largo = <strong>ENTRAR EN MODO LIVE</strong> y reclick = <strong>SUBIR BANCO</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "As ações",
        "en": "The actions",
        "es": "Las acciones"
       },
       "type": {
        "pt": "lista",
        "en": "list",
        "es": "lista"
       },
       "desc": {
        "pt": "<p><strong>CHAMAR PRESET</strong>, <strong>STANDBY</strong> (mostra o destino na tela sem trocar o som, e você confirma depois), <strong>SUBIR/DESCER BANCO</strong> (também em versão standby), <strong>SUBIR/DESCER PRESET</strong>, <strong>ENTRAR EM MODO LIVE</strong> (só no footswitch do preset ativo) e <strong>NENHUM</strong>. No clique longo e no reclick existe ainda o <strong>FAVORITO</strong>: ir direto para um banco e preset fixos, chegando em PRESET ou LIVE.</p><p>Pelo menos um footswitch precisa chamar preset (CHAMAR PRESET ou STANDBY) — senão não sobraria como trocar de preset com o pé.</p>",
        "en": "<p><strong>CALL PRESET</strong>, <strong>STANDBY</strong> (shows the destination on screen without changing the sound, and you confirm afterward), <strong>BANK UP/DOWN</strong> (also in a standby version), <strong>PRESET UP/DOWN</strong>, <strong>ENTER LIVE MODE</strong> (only on the active preset's footswitch) and <strong>NONE</strong>. On long click and reclick there's also <strong>FAVORITE</strong>: go straight to a fixed bank and preset, arriving in PRESET or LIVE.</p><p>At least one footswitch must call a preset (CALL PRESET or STANDBY) — otherwise there'd be no way left to change presets with your foot.</p>",
        "es": "<p><strong>LLAMAR PRESET</strong>, <strong>STANDBY</strong> (muestra el destino en pantalla sin cambiar el sonido, y confirmas después), <strong>SUBIR/BAJAR BANCO</strong> (también en versión standby), <strong>SUBIR/BAJAR PRESET</strong>, <strong>ENTRAR EN MODO LIVE</strong> (solo en el footswitch del preset activo) y <strong>NINGUNO</strong>. En el clic largo y en el reclick existe además el <strong>FAVORITO</strong>: ir directo a un banco y preset fijos, llegando en PRESET o en LIVE.</p><p>Al menos un footswitch tiene que llamar preset (LLAMAR PRESET o STANDBY) — si no, no quedaría forma de cambiar de preset con el pie.</p>"
       }
      },
      {
       "name": {
        "pt": "STANDBY — passear sem trocar o som",
        "en": "STANDBY — browse without changing the sound",
        "es": "STANDBY — recorrer sin cambiar el sonido"
       },
       "type": {
        "pt": "ação",
        "en": "action",
        "es": "acción"
       },
       "desc": {
        "pt": "<p>Com STANDBY você anda pelos bancos e presets enquanto a música toca, vendo na tela para onde vai, e o som só troca quando você confirma. É como procurar a próxima música no meio da anterior, sem ninguém ouvir.</p>",
        "en": "<p>With STANDBY you move through banks and presets while the song plays, seeing on screen where you're headed, and the sound only changes when you confirm. It's like finding the next song in the middle of the current one, without anyone hearing it.</p>",
        "es": "<p>Con STANDBY recorres bancos y presets mientras suena la música, viendo en pantalla a dónde vas, y el sonido solo cambia cuando confirmas. Es como buscar la siguiente canción en medio de la anterior, sin que nadie lo escuche.</p>"
       }
      },
      {
       "name": {
        "pt": "COMBOS DE FOOTSWITCH",
        "en": "FOOTSWITCH COMBOS",
        "es": "COMBOS DE FOOTSWITCH"
       },
       "type": {
        "pt": "pares",
        "en": "pairs",
        "es": "pares"
       },
       "desc": {
        "pt": "<p>Pisar dois footswitches juntos dispara uma ação. São dez pares — 1+2, 1+3, 1+4, 2+3, 2+4, 2+5, 3+4, 3+6, 4+5 e 5+6 — e cada um recebe uma ação: navegação, STANDBY, <strong>LIGAR/DESLIGAR WI-FI</strong> ou <strong>SW_LIVE</strong> (entra e sai do LIVE).</p><p>Combos valem no modo PRESET; o SW_LIVE continua valendo dentro do LIVE. E dentro do LIVE, <strong>segurar o par do SW_LIVE meio segundo</strong> sai direto para o modo PRESET — mesmo com a layer 2 ligada.</p>",
        "en": "<p>Stepping on two footswitches together triggers an action. There are ten pairs — 1+2, 1+3, 1+4, 2+3, 2+4, 2+5, 3+4, 3+6, 4+5 and 5+6 — and each one gets an action: navigation, STANDBY, <strong>WI-FI ON/OFF</strong> or <strong>SW_LIVE</strong> (enters and exits LIVE).</p><p>Combos work in PRESET mode; SW_LIVE keeps working inside LIVE. And inside LIVE, <strong>holding the SW_LIVE pair for half a second</strong> goes straight back to PRESET mode — even with layer 2 on.</p>",
        "es": "<p>Pisar dos footswitches juntos dispara una acción. Son diez pares — 1+2, 1+3, 1+4, 2+3, 2+4, 2+5, 3+4, 3+6, 4+5 y 5+6 — y cada uno recibe una acción: navegación, STANDBY, <strong>ENCENDER/APAGAR WI-FI</strong> o <strong>SW_LIVE</strong> (entra y sale del LIVE).</p><p>Los combos valen en el modo PRESET; el SW_LIVE sigue valiendo dentro del LIVE. Y dentro del LIVE, <strong>mantener el par del SW_LIVE medio segundo</strong> sale directo al modo PRESET — incluso con la capa 2 activada.</p>"
       }
      },
      {
       "name": {
        "pt": "BANCOS ATIVOS",
        "en": "ACTIVE BANKS",
        "es": "BANCOS ACTIVOS"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>Desligue as letras que você não usa: a navegação passa a pulá-las. Pelo menos uma precisa continuar ligada.</p>",
        "en": "<p>Turn off the letters you don't use: navigation then skips over them. At least one has to stay on.</p>",
        "es": "<p>Desactiva las letras que no usas: la navegación pasa a saltarlas. Al menos una tiene que seguir activada.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Um footswitch que participa de um combo ativo ganha um clique longo um pouco mais lento — é a folga para você montar o par com os dois pés.",
       "en": "A footswitch that's part of an active combo gets a slightly slower long click — that's the slack that lets you land the pair with both feet.",
       "es": "Un footswitch que participa en un combo activo tiene un clic largo un poco más lento — es el margen para que armes el par con los dos pies."
      },
      {
       "pt": "Os combos vêm vazios de fábrica: o LIGAR/DESLIGAR WI-FI, por exemplo, precisa ser configurado aqui.",
       "en": "Combos come empty from the factory: WI-FI ON/OFF, for example, has to be set up here.",
       "es": "Los combos vienen vacíos de fábrica: ENCENDER/APAGAR WI-FI, por ejemplo, tiene que configurarse aquí."
      }
     ]
    },
    {
     "id": "cfg-tela",
     "title": {
      "pt": "TELA — layouts, nomes e BPM",
      "en": "DISPLAY — layouts, names and BPM",
      "es": "PANTALLA — layouts, nombres y BPM"
     },
     "purpose": {
      "pt": "A aparência padrão da tela da controladora: o que aparece em cada modo, o arranjo dos ícones e o card de BPM.",
      "en": "The default look of the controller's screen: what shows up in each mode, how the icons are arranged and the BPM card.",
      "es": "La apariencia predeterminada de la pantalla de la controladora: qué aparece en cada modo, la disposición de los íconos y la tarjeta de BPM."
     },
     "shot": "cfg-tela",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › TELA",
      "en": "SETTINGS › DISPLAY",
      "es": "CONFIGURACIÓN › PANTALLA"
     },
     "fields": [
      {
       "name": {
        "pt": "GIG VIEW",
        "en": "GIG VIEW",
        "es": "GIG VIEW"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>PADRÃO</strong> (as duas telas), <strong>SÓ PRESET</strong> ou <strong>SÓ LIVE</strong>. Mais os interruptores que mostram ou escondem o nome do preset no LIVE e no BANK.</p>",
        "en": "<p><strong>DEFAULT</strong> (both screens), <strong>ONLY PRESET</strong> or <strong>ONLY LIVE</strong>. Plus the switches that show or hide the preset name in LIVE and in BANK.</p>",
        "es": "<p><strong>ESTÁNDAR</strong> (las dos pantallas), <strong>SOLO PRESET</strong> o <strong>SOLO LIVE</strong>. Además de los interruptores que muestran u ocultan el nombre del preset en LIVE y en BANK.</p>"
       }
      },
      {
       "name": {
        "pt": "LAYOUT DO MODO LIVE e DO MODO PRESET",
        "en": "LIVE MODE and PRESET MODE LAYOUT",
        "es": "LAYOUT DEL MODO LIVE y DEL MODO PRESET"
       },
       "type": {
        "pt": "layout",
        "en": "layout",
        "es": "layout"
       },
       "desc": {
        "pt": "<p><strong>L1 a L4</strong> são arranjos fixos e <strong>CUSTOM</strong> deixa você arrastar cada ícone e escolher o tamanho (até a altura inteira da tela). No PRESET existem ainda <strong>NENHUM</strong> (só o nome grande) e <strong>LISTA</strong> (os presets em sequência). Estes são os valores globais: um preset pode ter o seu próprio layout.</p>",
        "en": "<p><strong>L1 to L4</strong> are fixed arrangements and <strong>CUSTOM</strong> lets you drag each icon and choose its size (up to the full screen height). PRESET also has <strong>NONE</strong> (just the big name) and <strong>LIST</strong> (the presets in sequence). These are the global values: a preset can have its own layout.</p>",
        "es": "<p><strong>L1 a L4</strong> son arreglos fijos y <strong>CUSTOM</strong> te deja arrastrar cada ícono y elegir el tamaño (hasta la altura completa de la pantalla). En PRESET existen además <strong>NINGUNO</strong> (solo el nombre grande) y <strong>LISTA</strong> (los presets en secuencia). Estos son los valores globales: un preset puede tener su propio layout.</p>"
       }
      },
      {
       "name": {
        "pt": "Somente atual (CUSTOM do LIVE)",
        "en": "Current only (LIVE CUSTOM)",
        "es": "Sólo el actual (CUSTOM del LIVE)"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Com o layout CUSTOM no LIVE, <strong>Somente atual</strong> mostra um ícone só: o do último footswitch pisado, numa posição e tamanho compartilhados. A lista <strong>Ícones visíveis</strong> continua decidindo quais podem aparecer.</p>",
        "en": "<p>With the CUSTOM layout in LIVE, <strong>Current only</strong> shows a single icon: the one for the last footswitch you stepped on, in a shared position and size. The <strong>Visible icons</strong> list still decides which ones can appear.</p>",
        "es": "<p>Con el layout CUSTOM en LIVE, <strong>Sólo el actual</strong> muestra un solo ícono: el del último footswitch pisado, en una posición y un tamaño compartidos. La lista <strong>Iconos visibles</strong> sigue decidiendo cuáles pueden aparecer.</p>"
       }
      },
      {
       "name": {
        "pt": "Formato do ícone e nomes do banco",
        "en": "Icon shape and bank names",
        "es": "Forma del ícono y nombres del banco"
       },
       "type": {
        "pt": "estilo",
        "en": "style",
        "es": "estilo"
       },
       "desc": {
        "pt": "<p>Ícones <strong>PADRÃO</strong>, <strong>CÍRCULO</strong> ou <strong>OCTÓGONO</strong>, separados para cada tela. <strong>Mostrar nomes dos presets do banco</strong> troca os ícones da tela PRESET pelos nomes das músicas, com cores e tamanho ajustáveis.</p>",
        "en": "<p><strong>DEFAULT</strong>, <strong>CIRCLE</strong> or <strong>OCTAGON</strong> icons, set separately for each screen. <strong>Show bank preset names</strong> replaces the icons on the PRESET screen with the song names, with adjustable colors and size.</p>",
        "es": "<p>Íconos <strong>ESTÁNDAR</strong>, <strong>CÍRCULO</strong> u <strong>OCTÓGONO</strong>, por separado para cada pantalla. <strong>Mostrar nombres de presets del banco</strong> cambia los íconos de la pantalla PRESET por los nombres de las canciones, con colores y tamaño ajustables.</p>"
       }
      },
      {
       "name": {
        "pt": "BPM NO DISPLAY",
        "en": "BPM ON DISPLAY",
        "es": "BPM EN PANTALLA"
       },
       "type": {
        "pt": "grupo",
        "en": "group",
        "es": "grupo"
       },
       "desc": {
        "pt": "<p>Por quanto tempo o card de BPM fica na tela ao bater o tap tempo (<strong>OFF</strong>, 2, 5 ou 10 s) e se o número é o <strong>ABSOLUTO</strong> (dois últimos toques) ou o <strong>MÉDIO</strong> (média da sequência). OFF só esconde o card; o tempo continua valendo.</p>",
        "en": "<p>How long the BPM card stays on screen when you tap the tempo (<strong>OFF</strong>, 2, 5 or 10 s) and whether the number is the <strong>ABSOLUTE</strong> (last two taps) or the <strong>AVERAGE</strong> (average of the sequence). OFF only hides the card; the tempo still applies.</p>",
        "es": "<p>Cuánto tiempo queda la tarjeta de BPM en pantalla al marcar el tap tempo (<strong>OFF</strong>, 2, 5 o 10 s) y si el número es el <strong>ABSOLUTO</strong> (los dos últimos toques) o el <strong>PROMEDIO</strong> (promedio de la secuencia). OFF solo oculta la tarjeta; el tempo sigue valiendo.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-leds",
     "title": {
      "pt": "LEDS — brilho e cores dos anéis",
      "en": "LEDS — brightness and ring colors",
      "es": "LEDS — brillo y colores de los anillos"
     },
     "purpose": {
      "pt": "Os anéis em volta dos footswitches são o que você lê com o canto do olho no palco.",
      "en": "The rings around the footswitches are what you read out of the corner of your eye on stage.",
      "es": "Los anillos alrededor de los footswitches son lo que lees con el rabillo del ojo en el escenario."
     },
     "shot": "cfg-leds",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › LEDS",
      "en": "SETTINGS › LEDS",
      "es": "CONFIGURACIÓN › LEDS"
     },
     "fields": [
      {
       "name": {
        "pt": "Brilho dos LEDs",
        "en": "LED Brightness",
        "es": "Brillo de LEDs"
       },
       "type": {
        "pt": "faixa",
        "en": "slider",
        "es": "deslizador"
       },
       "desc": {
        "pt": "<p>Vale para todos os anéis. Palco escuro pede brilho baixo; luz do dia, alto.</p>",
        "en": "<p>Applies to all the rings. A dark stage calls for low brightness; daylight, high.</p>",
        "es": "<p>Vale para todos los anillos. Un escenario oscuro pide brillo bajo; la luz del día, alto.</p>"
       }
      },
      {
       "name": {
        "pt": "BANCOS & PRESETS",
        "en": "BANKS & PRESETS",
        "es": "BANCOS Y PRESETS"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>O que a cor significa no modo PRESET. <strong>POR LETRA</strong>: cada banco tem a sua cor. <strong>POR SWITCH</strong>: cada footswitch tem a sua.</p>",
        "en": "<p>What the color means in PRESET mode. <strong>BY LETTER</strong>: each bank has its own color. <strong>BY SWITCH</strong>: each footswitch has its own.</p>",
        "es": "<p>Lo que significa el color en el modo PRESET. <strong>POR LETRA</strong>: cada banco tiene su color. <strong>POR SWITCH</strong>: cada footswitch tiene el suyo.</p>"
       }
      },
      {
       "name": {
        "pt": "Prévia do LED no LIVE",
        "en": "LED Preview Live Mode",
        "es": "Vista previa del LED en LIVE"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Deixa os footswitches desligados com um brilho fraquinho (ajustável) em vez de apagados, para você enxergar onde estão os efeitos no escuro.</p>",
        "en": "<p>Gives the footswitches that are off a faint glow (adjustable) instead of leaving them dark, so you can see where your effects are in the dark.</p>",
        "es": "<p>Deja los footswitches apagados con un brillo tenue (ajustable) en lugar de totalmente apagados, para que veas dónde están los efectos en la oscuridad.</p>"
       }
      },
      {
       "name": {
        "pt": "LEDS DEDICADOS",
        "en": "DEDICATED LEDS",
        "es": "LEDS DEDICADOS"
       },
       "type": {
        "pt": "cores",
        "en": "colors",
        "es": "colores"
       },
       "desc": {
        "pt": "<p>As cores que avisam <strong>MODO LIVE</strong> e <strong>LAYER 2</strong>. Escolha cores bem diferentes: é o aviso de que todos os pés mudaram de função.</p>",
        "en": "<p>The colors that signal <strong>LIVE MODE</strong> and <strong>LAYER 2</strong>. Pick very different colors: they warn you that every footswitch has changed function.</p>",
        "es": "<p>Los colores que avisan <strong>MODO LIVE</strong> y <strong>LAYER 2</strong>. Elige colores bien distintos: es el aviso de que todos los footswitches cambiaron de función.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-imagens",
     "title": {
      "pt": "IMAGENS — fundos e ícones seus",
      "en": "IMAGES — your own backgrounds and icons",
      "es": "IMÁGENES — tus propios fondos e íconos"
     },
     "purpose": {
      "pt": "Envie as suas imagens de fundo e os seus ícones para a tela da controladora.",
      "en": "Upload your own background images and icons to the controller's screen.",
      "es": "Sube tus propias imágenes de fondo e íconos a la pantalla de la controladora."
     },
     "howto": [
      {
       "pt": "Toque em <strong>FUNDO BANK</strong> (imagens de tela cheia) ou <strong>ÍCONES SW</strong> (os desenhos dos footswitches).",
       "en": "Tap <strong>BANK BACKGROUND</strong> (full-screen images) or <strong>SW ICONS</strong> (the footswitch artwork).",
       "es": "Toca <strong>FONDO BANK</strong> (imágenes de pantalla completa) o <strong>ÍCONOS SW</strong> (los dibujos de los footswitches)."
      },
      {
       "pt": "Toque no <strong>+</strong> e escolha um arquivo. Ajuste o recorte e salve.",
       "en": "Tap the <strong>+</strong> and choose a file. Adjust the crop and save.",
       "es": "Toca el <strong>+</strong> y elige un archivo. Ajusta el recorte y guarda."
      },
      {
       "pt": "Depois escolha a imagem em <strong>CORES DA TELA</strong> (fundo do preset) ou no ícone de um footswitch.",
       "en": "Then pick the image in <strong>SCREEN COLORS</strong> (preset background) or in a footswitch's icon.",
       "es": "Después elige la imagen en <strong>COLORES DE PANTALLA</strong> (fondo del preset) o en el ícono de un footswitch."
      }
     ],
     "shot": "cfg-imagens-galeria",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › IMAGENS",
      "en": "SETTINGS › IMAGES",
      "es": "CONFIGURACIÓN › IMÁGENES"
     },
     "fields": [
      {
       "name": {
        "pt": "Memória compartilhada",
        "en": "Shared memory",
        "es": "Memoria compartida"
       },
       "type": {
        "pt": "barra",
        "en": "bar",
        "es": "barra"
       },
       "desc": {
        "pt": "<p>Imagens e ícones dividem a mesma memória: cerca de 2,4 MB nas placas S3 e cerca de 490 KB nas anteriores. A barra mostra quanto está usado — e apagar um ícone libera espaço para um fundo, e vice-versa.</p><p>Cabem até 40 imagens e 60 ícones; cada imagem pode ter até 50 KB e cada ícone até 30 KB.</p>",
        "en": "<p>Images and icons share the same memory: about 2.4 MB on S3 boards and about 490 KB on earlier ones. The bar shows how much is in use — and deleting an icon frees up room for a background, and vice versa.</p><p>Up to 40 images and 60 icons fit; each image can be up to 50 KB and each icon up to 30 KB.</p>",
        "es": "<p>Las imágenes y los íconos comparten la misma memoria: unos 2,4 MB en las placas S3 y unos 490 KB en las anteriores. La barra muestra cuánto está en uso — y borrar un ícono libera espacio para un fondo, y viceversa.</p><p>Caben hasta 40 imágenes y 60 íconos; cada imagen puede tener hasta 50 KB y cada ícono hasta 30 KB.</p>"
       }
      },
      {
       "name": {
        "pt": "O editor de imagem",
        "en": "The image editor",
        "es": "El editor de imagen"
       },
       "type": {
        "pt": "ferramenta",
        "en": "tool",
        "es": "herramienta"
       },
       "desc": {
        "pt": "<p>Antes de gravar você recorta, dá zoom, ajusta brilho e contraste e pode escrever um texto por cima. Vale escurecer um pouco os fundos: imagem clara demais come a legibilidade do nome do preset.</p>",
        "en": "<p>Before saving, you crop, zoom, adjust brightness and contrast, and can write text on top. It's worth darkening backgrounds a little: an image that's too bright hurts the readability of the preset name.</p>",
        "es": "<p>Antes de grabar, recortas, haces zoom, ajustas brillo y contraste y puedes escribir un texto encima. Vale la pena oscurecer un poco los fondos: una imagen demasiado clara le quita legibilidad al nombre del preset.</p>"
       }
      },
      {
       "name": {
        "pt": "Em lote",
        "en": "In batches",
        "es": "En lote"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p><strong>Carregar em lote</strong> manda várias imagens de uma vez; <strong>Selecionar</strong> permite apagar várias. Pelo cabo USB o envio é mais rápido e estável que pelo Wi-Fi.</p>",
        "en": "<p><strong>Batch upload</strong> sends several images at once; <strong>Select</strong> lets you delete several. Over the USB cable, uploading is faster and more stable than over Wi-Fi.</p>",
        "es": "<p><strong>Subir en lote</strong> envía varias imágenes de una vez; <strong>Seleccionar</strong> permite borrar varias. Por el cable USB el envío es más rápido y estable que por Wi-Fi.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-hardware",
     "title": {
      "pt": "HARDWARE — modelo, tempos de disparo e memória",
      "en": "HARDWARE — model, send timing and memory",
      "es": "HARDWARE — modelo, tiempos de envío y memoria"
     },
     "purpose": {
      "pt": "Dizer à controladora qual placa ela é, ajustar o ritmo do envio MIDI e acompanhar a memória.",
      "en": "Tell the controller which board it is, adjust the pace of MIDI sending and keep an eye on memory.",
      "es": "Decirle a la controladora qué placa es, ajustar el ritmo del envío MIDI y seguir el uso de la memoria."
     },
     "shot": "cfg-hardware",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › HARDWARE",
      "en": "SETTINGS › HARDWARE",
      "es": "CONFIGURACIÓN › HARDWARE"
     },
     "fields": [
      {
       "name": {
        "pt": "MODELO",
        "en": "MODEL",
        "es": "MODELO"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>Primeiro a família (<strong>1</strong>, <strong>2</strong>, <strong>3</strong> ou <strong>3 S3</strong>), depois a variante (NANO, MICRO, 6SW+, 7S, 8SW+…). Não é enfeite: é o que diz à controladora quais pinos existem. O editor só oferece os modelos do processador do pedal conectado. Trocar o modelo reinicia a controladora.</p>",
        "en": "<p>First the family (<strong>1</strong>, <strong>2</strong>, <strong>3</strong> or <strong>3 S3</strong>), then the variant (NANO, MICRO, 6SW+, 7S, 8SW+…). It's not decoration: it's what tells the controller which pins exist. The editor only offers the models for the connected pedal's processor. Changing the model restarts the controller.</p>",
        "es": "<p>Primero la familia (<strong>1</strong>, <strong>2</strong>, <strong>3</strong> o <strong>3 S3</strong>), después la variante (NANO, MICRO, 6SW+, 7S, 8SW+…). No es un adorno: es lo que le dice a la controladora qué pines existen. El editor solo ofrece los modelos del procesador del pedal conectado. Cambiar el modelo reinicia la controladora.</p>"
       }
      },
      {
       "name": {
        "pt": "TEMPOS DE DISPARO",
        "en": "SEND TIMING",
        "es": "TIEMPOS DE ENVÍO"
       },
       "type": {
        "pt": "pausas",
        "en": "pauses",
        "es": "pausas"
       },
       "desc": {
        "pt": "<p>Para aparelhos que perdem mensagens chegando rápido demais. <strong>Pausa entre HEADER e LIVE</strong>: espera entre o PC/extras do preset e o estado inicial dos footswitches. <strong>Pausa por canal</strong>: intervalo mínimo entre duas mensagens para um canal (um Bank Select + PC conta como uma só).</p><p>Use o mínimo que resolver: durante a pausa a controladora espera, e um pedal de expressão nesse canal fica “degrau”.</p>",
        "en": "<p>For devices that miss messages arriving too fast. <strong>Pause between HEADER and LIVE</strong>: a wait between the preset's PC/extras and the initial state of the footswitches. <strong>Per-channel pause</strong>: the minimum interval between two messages to one channel (a Bank Select + PC counts as one).</p><p>Use the smallest value that fixes it: during the pause the controller waits, and an expression pedal on that channel becomes “steppy”.</p>",
        "es": "<p>Para equipos que pierden mensajes que llegan demasiado rápido. <strong>Pausa entre HEADER y LIVE</strong>: espera entre el PC/extras del preset y el estado inicial de los footswitches. <strong>Pausa por canal</strong>: intervalo mínimo entre dos mensajes para un canal (un Bank Select + PC cuenta como uno solo).</p><p>Usa el mínimo que lo resuelva: durante la pausa la controladora espera, y un pedal de expresión en ese canal queda “escalonado”.</p>"
       }
      },
      {
       "name": {
        "pt": "STORAGE",
        "en": "STORAGE",
        "es": "STORAGE"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Quanto da memória está em uso: <strong>Presets</strong>, <strong>Imagens e ícones</strong> (uma barra só, com o detalhe embaixo) e <strong>Globais</strong>.</p>",
        "en": "<p>How much memory is in use: <strong>Presets</strong>, <strong>Images and icons</strong> (a single bar, with the breakdown below) and <strong>Globals</strong>.</p>",
        "es": "<p>Cuánta memoria está en uso: <strong>Presets</strong>, <strong>Imágenes e íconos</strong> (una sola barra, con el detalle debajo) y <strong>Globales</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Cards especiais",
        "en": "Special cards",
        "es": "Tarjetas especiales"
       },
       "type": {
        "pt": "por modelo",
        "en": "per model",
        "es": "por modelo"
       },
       "desc": {
        "pt": "<p>Nas placas MICRO, <strong>REMAPPING</strong> gira a tela e reorganiza os quatro footswitches. Na BFMIDI-1 7S, <strong>INVERTER TELA</strong> gira a tela 180°. Os dois reiniciam a controladora.</p>",
        "en": "<p>On MICRO boards, <strong>REMAPPING</strong> rotates the screen and rearranges the four footswitches. On the BFMIDI-1 7S, <strong>INVERT SCREEN</strong> rotates the screen 180°. Both restart the controller.</p>",
        "es": "<p>En las placas MICRO, <strong>REMAPPING</strong> gira la pantalla y reorganiza los cuatro footswitches. En la BFMIDI-1 7S, <strong>INVERTIR PANTALLA</strong> gira la pantalla 180°. Las dos reinician la controladora.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-wifi",
     "title": {
      "pt": "WIFI — rede e conexão",
      "en": "WIFI — network and connection",
      "es": "WIFI — red y conexión"
     },
     "purpose": {
      "pt": "Ver como você está conectado e, se quiser, colocar a controladora na sua rede de casa.",
      "en": "See how you're connected and, if you like, put the controller on your home network.",
      "es": "Ver cómo estás conectado y, si quieres, poner la controladora en tu red de casa."
     },
     "howto": [
      {
       "pt": "Conectado pela rede do pedal (AP) ou pelo cabo, toque em <strong>BUSCAR</strong>.",
       "en": "While connected through the pedal's network (AP) or the cable, tap <strong>SCAN</strong>.",
       "es": "Conectado por la red del pedal (AP) o por el cable, toca <strong>BUSCAR</strong>."
      },
      {
       "pt": "Escolha a sua rede, digite a senha e toque em <strong>CONECTAR</strong>. A tentativa acontece sem travar o pedal.",
       "en": "Choose your network, type the password and tap <strong>CONNECT</strong>. The attempt happens without freezing the pedal.",
       "es": "Elige tu red, escribe la contraseña y toca <strong>CONECTAR</strong>. El intento ocurre sin bloquear el pedal."
      }
     ],
     "shot": "cfg-wifi",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › WIFI",
      "en": "SETTINGS › WIFI",
      "es": "CONFIGURACIÓN › WIFI"
     },
     "fields": [
      {
       "name": {
        "pt": "ESTADO DA CONEXÃO",
        "en": "CONNECTION STATE",
        "es": "ESTADO DE LA CONEXIÓN"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Quatro quadrados — <strong>OFF</strong>, <strong>AP</strong>, <strong>STA</strong> e <strong>USB</strong> — com o seu em destaque. Na rede de casa, o card mostra a rede e o endereço.</p>",
        "en": "<p>Four squares — <strong>OFF</strong>, <strong>AP</strong>, <strong>STA</strong> and <strong>USB</strong> — with yours highlighted. On your home network, the card shows the network and the address.</p>",
        "es": "<p>Cuatro cuadros — <strong>OFF</strong>, <strong>AP</strong>, <strong>STA</strong> y <strong>USB</strong> — con el tuyo resaltado. En la red de casa, la tarjeta muestra la red y la dirección.</p>"
       }
      },
      {
       "name": {
        "pt": "A rede do pedal",
        "en": "The pedal's network",
        "es": "La red del pedal"
       },
       "type": {
        "pt": "fixa",
        "en": "fixed",
        "es": "fija"
       },
       "desc": {
        "pt": "<p><strong>BFMIDI_WIFI</strong>, senha <code>bfmidi@editor</code>, endereço <code>http://192.168.4.1</code> ou <code>http://bfmidi.local</code>. É igual em todas as unidades.</p>",
        "en": "<p><strong>BFMIDI_WIFI</strong>, password <code>bfmidi@editor</code>, address <code>http://192.168.4.1</code> or <code>http://bfmidi.local</code>. It's the same on every unit.</p>",
        "es": "<p><strong>BFMIDI_WIFI</strong>, contraseña <code>bfmidi@editor</code>, dirección <code>http://192.168.4.1</code> o <code>http://bfmidi.local</code>. Es igual en todas las unidades.</p>"
       }
      },
      {
       "name": {
        "pt": "BUSCAR e CONECTAR",
        "en": "SCAN and CONNECT",
        "es": "BUSCAR y CONECTAR"
       },
       "type": {
        "pt": "ações",
        "en": "actions",
        "es": "acciones"
       },
       "desc": {
        "pt": "<p>O BUSCAR só funciona pela rede do pedal ou pelo cabo — na rede de casa ele derrubaria a própria conexão. Só redes de 2,4 GHz aparecem; redes ocultas podem ser digitadas à mão. A senha só é guardada depois de conectar de verdade: se falhar, a configuração anterior continua.</p>",
        "en": "<p>SCAN only works through the pedal's network or the cable — on your home network it would drop its own connection. Only 2.4 GHz networks show up; hidden networks can be typed in by hand. The password is only stored after it actually connects: if it fails, the previous setup stays.</p>",
        "es": "<p>BUSCAR solo funciona por la red del pedal o por el cable — en la red de casa tumbaría su propia conexión. Solo aparecen redes de 2,4 GHz; las redes ocultas se pueden escribir a mano. La contraseña solo se guarda después de conectar de verdad: si falla, la configuración anterior se mantiene.</p>"
       }
      },
      {
       "name": {
        "pt": "Por que usar a sua rede",
        "en": "Why use your own network",
        "es": "Por qué usar tu red"
       },
       "type": {
        "pt": "vantagem",
        "en": "advantage",
        "es": "ventaja"
       },
       "desc": {
        "pt": "<p>O celular não precisa trocar de rede para editar, e você continua com internet. Nas placas S3 é também o caminho para atualizar sem cabo.</p>",
        "en": "<p>Your phone doesn't have to switch networks to edit, and you keep your internet connection. On S3 boards it's also the way to update without a cable.</p>",
        "es": "<p>El celular no necesita cambiar de red para editar, y sigues con internet. En las placas S3 es también el camino para actualizar sin cable.</p>"
       }
      },
      {
       "name": {
        "pt": "WPA antigo (TKIP)",
        "en": "Legacy WPA (TKIP)",
        "es": "WPA antiguo (TKIP)"
       },
       "type": {
        "pt": "compatibilidade",
        "en": "compatibility",
        "es": "compatibilidad"
       },
       "desc": {
        "pt": "<p>Deixe desligado em redes atuais. Ligue só se um roteador antigo realmente não conectar.</p>",
        "en": "<p>Leave it off on current networks. Only turn it on if an old router really won't connect.</p>",
        "es": "<p>Déjalo desactivado en redes actuales. Actívalo solo si un router antiguo realmente no conecta.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "A senha da sua rede fica na memória protegida da controladora e sobrevive às atualizações.",
       "en": "Your network's password is kept in the controller's protected memory and survives updates.",
       "es": "La contraseña de tu red queda en la memoria protegida de la controladora y sobrevive a las actualizaciones."
      }
     ]
    },
    {
     "id": "cfg-host",
     "title": {
      "pt": "HOST — o USB Host e os aparelhos plugados",
      "en": "HOST — the USB Host and plugged-in devices",
      "es": "HOST — el USB Host y los equipos conectados"
     },
     "purpose": {
      "pt": "Os aparelhos ligados na porta USB HOST da controladora: um card para cada um, com o canal MIDI e o editor de preset.",
      "en": "The devices connected to the controller's USB HOST port: one card for each, with its MIDI channel and the preset editor.",
      "es": "Los equipos conectados al puerto USB HOST de la controladora: una tarjeta para cada uno, con el canal MIDI y el editor de preset."
     },
     "shot": "cfg-host",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › HOST",
      "en": "SETTINGS › HOST",
      "es": "CONFIGURACIÓN › HOST"
     },
     "fields": [
      {
       "name": {
        "pt": "USB HOST",
        "en": "USB HOST",
        "es": "USB HOST"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p>Quantos aparelhos estão conectados, se o módulo está respondendo e a versão do firmware dele (com aviso quando está antigo).</p>",
        "en": "<p>How many devices are connected, whether the module is responding and its firmware version (with a warning when it's outdated).</p>",
        "es": "<p>Cuántos equipos están conectados, si el módulo está respondiendo y la versión de su firmware (con un aviso cuando está desactualizado).</p>"
       }
      },
      {
       "name": {
        "pt": "Detecção automática",
        "en": "Automatic detection",
        "es": "Detección automática"
       },
       "type": {
        "pt": "modo",
        "en": "mode",
        "es": "modo"
       },
       "desc": {
        "pt": "<p>O USB Host reconhece sozinho o que foi plugado: pedais MIDI USB comuns e a IK TONEX ONE funcionam juntos, até <strong>dois aparelhos</strong> num hub. Não há modo para escolher.</p>",
        "en": "<p>The USB Host recognizes what you plugged in on its own: regular USB MIDI pedals and the IK TONEX ONE work together, up to <strong>two devices</strong> on a hub. There's no mode to choose.</p>",
        "es": "<p>El USB Host reconoce solo lo que conectaste: los pedales MIDI USB comunes y la IK TONEX ONE funcionan juntos, hasta <strong>dos equipos</strong> en un hub. No hay modo que elegir.</p>"
       }
      },
      {
       "name": {
        "pt": "Um card por aparelho",
        "en": "One card per device",
        "es": "Una tarjeta por equipo"
       },
       "type": {
        "pt": "aparelhos",
        "en": "devices",
        "es": "equipos"
       },
       "desc": {
        "pt": "<p>Fabricante, produto, porta do hub, ID USB, status e o <strong>canal</strong> que aquele aparelho escuta. Cada TONEX ONE tem o seu canal; os pedais MIDI comuns dividem um filtro. GP-5, TONEX ONE e Nano Cortex ganham o botão <strong>EDITAR PRESET</strong>.</p>",
        "en": "<p>Manufacturer, product, hub port, USB ID, status and the <strong>channel</strong> that device listens on. Each TONEX ONE has its own channel; regular MIDI pedals share one filter. GP-5, TONEX ONE and Nano Cortex get the <strong>EDIT PRESET</strong> button.</p>",
        "es": "<p>Fabricante, producto, puerto del hub, ID USB, estado y el <strong>canal</strong> que escucha ese equipo. Cada TONEX ONE tiene su propio canal; los pedales MIDI comunes comparten un filtro. GP-5, TONEX ONE y Nano Cortex tienen el botón <strong>EDITAR PRESET</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Traduzir Boss MS-3",
        "en": "Translate Boss MS-3",
        "es": "Traducir Boss MS-3"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>O MS-3 (e a Katana) não entendem CC de parâmetro comum: o host converte para o formato da Boss. Ligue só com eles plugados.</p>",
        "en": "<p>The MS-3 (and the Katana) don't understand regular parameter CCs: the host converts them to Boss's format. Only turn it on with them plugged in.</p>",
        "es": "<p>El MS-3 (y el Katana) no entienden los CC de parámetro comunes: el host los convierte al formato de Boss. Actívalo solo con ellos conectados.</p>"
       }
      },
      {
       "name": {
        "pt": "Modo transmissão (mais pedais)",
        "en": "Transmit-only mode (more pedals)",
        "es": "Modo transmisión (más pedales)"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Deixa o host mandar MIDI para até <strong>quatro</strong> pedais num hub, em vez de dois — em troca, nada volta dos pedais: afinador, nome do rig, SEGUIR O KEMPER e o editor da GP-5 param de funcionar. Com uma TONEX ONE plugada o limite continua dois.</p>",
        "en": "<p>Lets the host send MIDI to up to <strong>four</strong> pedals on a hub, instead of two — in exchange, nothing comes back from the pedals: the tuner, the rig name, FOLLOW THE KEMPER and the GP-5 editor stop working. With a TONEX ONE plugged in, the limit stays at two.</p>",
        "es": "<p>Permite que el host envíe MIDI a hasta <strong>cuatro</strong> pedales en un hub, en lugar de dos — a cambio, nada vuelve de los pedales: el afinador, el nombre del rig, SEGUIR EL KEMPER y el editor de la GP-5 dejan de funcionar. Con una TONEX ONE conectada, el límite sigue siendo dos.</p>"
       }
      },
      {
       "name": {
        "pt": "MIDI BFMIDI (host → controladora)",
        "en": "BFMiDi MIDI (host → controller)",
        "es": "MIDI BFMiDi (host → controladora)"
       },
       "type": {
        "pt": "interruptores",
        "en": "switches",
        "es": "interruptores"
       },
       "desc": {
        "pt": "<p><strong>Habilitar MIDI reverso</strong> repete o MIDI que chega dos aparelhos plugados nas saídas da controladora (USB DEVICE e DIN5), como um thru/merge. <strong>MIDI Control Host BFMIDI</strong> deixa um aparelho plugado comandar a BFMiDi (chamar presets e bancos, entrar no LIVE).</p>",
        "en": "<p><strong>Enable reverse MIDI</strong> repeats the MIDI coming from the plugged-in devices on the controller’s outputs (USB DEVICE and DIN5), like a thru/merge. <strong>BFMIDI MIDI Control Host</strong> lets a plugged-in device control the BFMiDi (call presets and banks, enter LIVE).</p>",
        "es": "<p><strong>Habilitar MIDI reverso</strong> repite el MIDI que llega de los equipos conectados en las salidas de la controladora (USB DEVICE y DIN5), como un thru/merge. <strong>MIDI Control Host BFMIDI</strong> deja que un equipo conectado controle la BFMiDi (llamar presets y bancos, entrar en LIVE).</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "A tela HOST só funciona nos modelos com USB Host: BFMIDI-3 e BFMIDI-S3.",
       "en": "The HOST screen only works on models with USB Host: BFMIDI-3 and BFMIDI-S3.",
       "es": "La pantalla HOST solo funciona en los modelos con USB Host: BFMIDI-3 y BFMIDI-S3."
      },
      {
       "pt": "A Nano Cortex funciona sozinha no USB Host: ela não cabe num hub junto com outro aparelho.",
       "en": "The Nano Cortex works on its own on the USB Host: it doesn't fit on a hub alongside another device.",
       "es": "La Nano Cortex funciona sola en el USB Host: no cabe en un hub junto con otro equipo."
      }
     ]
    },
    {
     "id": "cfg-bluetooth",
     "title": {
      "pt": "BLUETOOTH — sem fio",
      "en": "BLUETOOTH — wireless",
      "es": "BLUETOOTH — inalámbrico"
     },
     "purpose": {
      "pt": "O Bluetooth mora no módulo USB Host e tem três funções — a diferença entre elas é quem procura quem.",
      "en": "Bluetooth lives in the USB Host module and has three functions — the difference between them is who looks for whom.",
      "es": "El Bluetooth vive en el módulo USB Host y tiene tres funciones — la diferencia entre ellas es quién busca a quién."
     },
     "shot": "cfg-bluetooth",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › BLUETOOTH",
      "en": "SETTINGS › BLUETOOTH",
      "es": "CONFIGURACIÓN › BLUETOOTH"
     },
     "fields": [
      {
       "name": {
        "pt": "TECLADO",
        "en": "KEYBOARD",
        "es": "TECLADO"
       },
       "type": {
        "pt": "função",
        "en": "function",
        "es": "función"
       },
       "desc": {
        "pt": "<p>A controladora vira um teclado Bluetooth: os CCs viram teclas e atalhos, para controlar programas que não entendem MIDI (partitura, gravador, slides).</p>",
        "en": "<p>The controller becomes a Bluetooth keyboard: CCs become keys and shortcuts, to control programs that don't understand MIDI (sheet music, recorders, slides).</p>",
        "es": "<p>La controladora se convierte en un teclado Bluetooth: los CC se convierten en teclas y atajos, para controlar programas que no entienden MIDI (partituras, grabadores, diapositivas).</p>"
       }
      },
      {
       "name": {
        "pt": "MIDI",
        "en": "MIDI",
        "es": "MIDI"
       },
       "type": {
        "pt": "função",
        "en": "function",
        "es": "función"
       },
       "desc": {
        "pt": "<p>Vira uma interface MIDI sem fio chamada BFMiDi e espera: use quando quem procura é o outro aparelho (celular, tablet, computador).</p>",
        "en": "<p>It becomes a wireless MIDI interface called BFMiDi and waits: use it when the other device is the one doing the searching (phone, tablet, computer).</p>",
        "es": "<p>Se convierte en una interfaz MIDI inalámbrica llamada BFMiDi y espera: úsala cuando quien busca es el otro equipo (celular, tablet, computadora).</p>"
       }
      },
      {
       "name": {
        "pt": "PEDAL",
        "en": "PEDAL",
        "es": "PEDAL"
       },
       "type": {
        "pt": "função",
        "en": "function",
        "es": "función"
       },
       "desc": {
        "pt": "<p>A controladora procura um pedal Bluetooth MIDI que esteja anunciando e conecta nele, para ganhar footswitches sem fio.</p>",
        "en": "<p>The controller looks for a Bluetooth MIDI pedal that's advertising and connects to it, so you get wireless footswitches.</p>",
        "es": "<p>La controladora busca un pedal Bluetooth MIDI que se esté anunciando y se conecta a él, para sumar footswitches inalámbricos.</p>"
       }
      },
      {
       "name": {
        "pt": "Filtro MIDI do Bluetooth",
        "en": "Bluetooth MIDI filter",
        "es": "Filtro MIDI del Bluetooth"
       },
       "type": {
        "pt": "canal",
        "en": "channel",
        "es": "canal"
       },
       "desc": {
        "pt": "<p>O Bluetooth tem o próprio filtro de canal (OMNI deixa passar todos), separado do filtro dos aparelhos USB.</p>",
        "en": "<p>Bluetooth has its own channel filter (OMNI lets everything through), separate from the USB devices' filter.</p>",
        "es": "<p>El Bluetooth tiene su propio filtro de canal (OMNI deja pasar todos), separado del filtro de los equipos USB.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-editor",
     "title": {
      "pt": "EDITOR — tema, salvamento, atalhos e idioma",
      "en": "EDITOR — theme, saving, shortcuts and language",
      "es": "EDITOR — tema, guardado, atajos e idioma"
     },
     "purpose": {
      "pt": "Ajustes do editor, não da controladora: eles ficam no aparelho onde você abriu.",
      "en": "Settings for the editor, not the controller: they stay on the device where you opened it.",
      "es": "Ajustes del editor, no de la controladora: quedan en el dispositivo donde lo abriste."
     },
     "shot": "cfg-editor",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › EDITOR",
      "en": "SETTINGS › EDITOR",
      "es": "CONFIGURACIÓN › EDITOR"
     },
     "fields": [
      {
       "name": {
        "pt": "TEMA",
        "en": "THEME",
        "es": "TEMA"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p><strong>CLARO</strong> ou <strong>ESCURO</strong>.</p>",
        "en": "<p><strong>LIGHT</strong> or <strong>DARK</strong>.</p>",
        "es": "<p><strong>CLARO</strong> u <strong>OSCURO</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "SALVAMENTO AUTOMÁTICO",
        "en": "AUTO SAVE",
        "es": "GUARDADO AUTOMÁTICO"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>Ligado (o padrão), o editor grava sozinho menos de um segundo depois de cada alteração. Desligado, nada é gravado até você tocar em salvar — e sair do preset descarta a alteração.</p>",
        "en": "<p>On (the default), the editor saves on its own less than a second after each change. Off, nothing is saved until you tap save — and leaving the preset discards the change.</p>",
        "es": "<p>Activado (el predeterminado), el editor graba solo menos de un segundo después de cada cambio. Desactivado, nada se graba hasta que tocas guardar — y salir del preset descarta el cambio.</p>"
       }
      },
      {
       "name": {
        "pt": "ATALHOS",
        "en": "SHORTCUTS",
        "es": "ATAJOS"
       },
       "type": {
        "pt": "interruptores",
        "en": "switches",
        "es": "interruptores"
       },
       "desc": {
        "pt": "<p>Um interruptor para cada destino do menu: os ligados viram botões no card PRINCIPAL. O MODO PALCO e os editores dos aparelhos plugados aparecem sempre, antes dos seus atalhos.</p>",
        "en": "<p>One switch for each menu destination: the ones that are on become buttons on the MAIN card. STAGE MODE and the editors for plugged-in devices always appear, before your shortcuts.</p>",
        "es": "<p>Un interruptor para cada destino del menú: los activados se convierten en botones en la tarjeta PRINCIPAL. El MODO ESCENARIO y los editores de los equipos conectados aparecen siempre, antes de tus atajos.</p>"
       }
      },
      {
       "name": {
        "pt": "IDIOMA DA INTERFACE",
        "en": "INTERFACE LANGUAGE",
        "es": "IDIOMA DE LA INTERFAZ"
       },
       "type": {
        "pt": "seleção",
        "en": "selection",
        "es": "selección"
       },
       "desc": {
        "pt": "<p>Português, English ou Español. A tela da controladora permanece em inglês.</p>",
        "en": "<p>Português, English or Español. The controller's screen stays in English.</p>",
        "es": "<p>Português, English o Español. La pantalla de la controladora permanece en inglés.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-atualizar",
     "title": {
      "pt": "ATUALIZAR — a controladora",
      "en": "UPDATES — the controller",
      "es": "ACTUALIZAR — la controladora"
     },
     "purpose": {
      "pt": "Manter a BFMiDi em dia. A tela verifica sozinha ao abrir e, havendo novidade, um botão resolve tudo.",
      "en": "Keep the BFMiDi up to date. The screen checks on its own when it opens and, if there's something new, one button takes care of everything.",
      "es": "Mantener la BFMiDi al día. La pantalla verifica sola al abrirse y, si hay novedades, un botón resuelve todo."
     },
     "howto": [
      {
       "pt": "Abra <strong>CONFIGURAÇÕES › ATUALIZAR</strong>. A verificação começa sozinha.",
       "en": "Open <strong>SETTINGS › UPDATES</strong>. The check starts on its own.",
       "es": "Abre <strong>CONFIGURACIÓN › ACTUALIZAR</strong>. La verificación empieza sola."
      },
      {
       "pt": "Havendo versão nova, toque em <strong>ATUALIZAR A BFMiDi</strong> (ou <strong>ATUALIZAR TUDO</strong>, nas placas sem USB Host) e siga a tela.",
       "en": "If there's a new version, tap <strong>UPDATE THE BFMiDi</strong> (or <strong>UPDATE EVERYTHING</strong>, on boards without USB Host) and follow the screen.",
       "es": "Si hay una versión nueva, toca <strong>ACTUALIZAR LA BFMiDi</strong> (o <strong>ACTUALIZAR TODO</strong>, en las placas sin USB Host) y sigue la pantalla."
      },
      {
       "pt": "Pelo cabo, o navegador pode pedir para autorizar a porta da controladora no meio da gravação — o card pisca avisando e mostra qual escolher. Não tire o cabo até o fim.",
       "en": "Over the cable, the browser may ask you to authorize the controller's port in the middle of flashing — the card blinks to warn you and shows which one to choose. Don't unplug the cable until it's done.",
       "es": "Por cable, el navegador puede pedirte que autorices el puerto de la controladora en medio de la grabación — la tarjeta parpadea para avisarte y muestra cuál elegir. No quites el cable hasta el final."
      }
     ],
     "shot": "cfg-atualizar",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › ATUALIZAR — ABA 1",
      "en": "SETTINGS › UPDATES — TAB 1",
      "es": "CONFIGURACIÓN › ACTUALIZAR — PESTAÑA 1"
     },
     "fields": [
      {
       "name": {
        "pt": "As duas abas",
        "en": "The two tabs",
        "es": "Las dos pestañas"
       },
       "type": {
        "pt": "placas com USB Host",
        "en": "boards with USB Host",
        "es": "placas con USB Host"
       },
       "desc": {
        "pt": "<p><strong>1 BFMiDi</strong> é a controladora; <strong>2 USB HOST</strong> é o módulo USB Host. São atualizações separadas, feitas nessa ordem.</p>",
        "en": "<p><strong>1 BFMiDi</strong> is the controller; <strong>2 USB HOST</strong> is the USB Host module. They're separate updates, done in that order.</p>",
        "es": "<p><strong>1 BFMiDi</strong> es la controladora; <strong>2 USB HOST</strong> es el módulo USB Host. Son actualizaciones separadas, hechas en ese orden.</p>"
       }
      },
      {
       "name": {
        "pt": "Pelo cabo ou pela rede",
        "en": "By cable or over the network",
        "es": "Por cable o por la red"
       },
       "type": {
        "pt": "caminho",
        "en": "path",
        "es": "camino"
       },
       "desc": {
        "pt": "<p><strong>Pelo cabo</strong> (Chrome ou Edge no computador, ou os apps de Mac e Windows) funciona em qualquer modelo. <strong>Pela rede</strong> (OTA) funciona nas placas S3 com o pedal na sua rede de casa.</p>",
        "en": "<p><strong>By cable</strong> (Chrome or Edge on a computer, or the Mac and Windows apps) works on any model. <strong>Over the network</strong> (OTA) works on S3 boards with the pedal on your home network.</p>",
        "es": "<p><strong>Por cable</strong> (Chrome o Edge en la computadora, o las apps de Mac y Windows) funciona en cualquier modelo. <strong>Por la red</strong> (OTA) funciona en las placas S3 con el pedal en tu red de casa.</p>"
       }
      },
      {
       "name": {
        "pt": "BACKUP AUTOMÁTICO",
        "en": "AUTOMATIC BACKUP",
        "es": "COPIA AUTOMÁTICA"
       },
       "type": {
        "pt": "interruptor",
        "en": "switch",
        "es": "interruptor"
       },
       "desc": {
        "pt": "<p>A gravação por cabo substitui a memória do pedal. Com o backup automático (ligado por padrão), o editor guarda os seus presets, imagens, ícones e aparelhos personalizados antes de gravar e devolve tudo depois. Desligado, a controladora volta com o pacote de fábrica. Pela rede nada é apagado.</p>",
        "en": "<p>Flashing by cable replaces the pedal's memory. With automatic backup (on by default), the editor saves your presets, images, icons and custom devices before flashing and puts everything back afterward. When it's off, the controller comes back with the factory package. Over the network nothing is erased.</p>",
        "es": "<p>La grabación por cable reemplaza la memoria del pedal. Con la copia automática (activada por defecto), el editor guarda tus presets, imágenes, íconos y aparatos personalizados antes de grabar y devuelve todo después. Desactivada, la controladora vuelve con el paquete de fábrica. Por la red no se borra nada.</p>"
       }
      },
      {
       "name": {
        "pt": "Estados e botões",
        "en": "States and buttons",
        "es": "Estados y botones"
       },
       "type": {
        "pt": "status",
        "en": "status",
        "es": "estado"
       },
       "desc": {
        "pt": "<p><strong>BFMiDi atualizada</strong> (ou <strong>Equipamento atualizado</strong>, nas placas sem USB Host), <strong>Atualização disponível</strong> ou <strong>Sem verificação</strong> (sem internet). <strong>VERIFICAR DE NOVO</strong> refaz a consulta; <strong>FORCE UPDATE</strong> reinstala a versão atual. Quem baixa da internet é o seu aparelho, não o pedal; um computador que já atualizou antes guarda uma cópia e consegue atualizar até sem internet.</p>",
        "en": "<p><strong>BFMiDi up to date</strong> (or <strong>Equipment up to date</strong>, on boards without a USB Host), <strong>Update available</strong> or <strong>Not checked</strong> (no internet). <strong>CHECK AGAIN</strong> runs the check again; <strong>FORCE UPDATE</strong> reinstalls the current version. Your device does the downloading, not the pedal; a computer that has updated before keeps a copy and can update even without internet.</p>",
        "es": "<p><strong>BFMiDi actualizada</strong> (o <strong>Equipo actualizado</strong>, en las placas sin USB Host), <strong>Actualización disponible</strong> o <strong>Sin verificación</strong> (sin internet). <strong>VERIFICAR DE NUEVO</strong> repite la consulta; <strong>FORCE UPDATE</strong> reinstala la versión actual. Quien descarga de internet es tu dispositivo, no el pedal; una computadora que ya actualizó antes guarda una copia y puede actualizar incluso sin internet.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Também dá para atualizar pelo site de atualização (<a href=\"https://bffx-updates.github.io/Update_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">Update BFMiDi</a>), com o mesmo backup automático.",
       "en": "You can also update through the update site (<a href=\"https://bffx-updates.github.io/Update_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">Update BFMiDi</a>), with the same automatic backup.",
       "es": "También puedes actualizar desde el sitio de actualización (<a href=\"https://bffx-updates.github.io/Update_BFMiDi_v14/\" target=\"_blank\" rel=\"noopener\">Update BFMiDi</a>), con la misma copia automática."
      }
     ]
    },
    {
     "id": "cfg-atualizar-host",
     "title": {
      "pt": "ATUALIZAR — o USB Host",
      "en": "UPDATES — the USB Host",
      "es": "ACTUALIZAR — el USB Host"
     },
     "purpose": {
      "pt": "O módulo USB Host tem firmware próprio. Ele se atualiza com o cabo do computador ligado direto na porta HOST, com a controladora na fonte de 9 V — um assistente guia passo a passo.",
      "en": "The USB Host module has its own firmware. It's updated with the computer's cable plugged straight into the HOST port and the controller on its 9 V power supply — a wizard guides you step by step.",
      "es": "El módulo USB Host tiene su propio firmware. Se actualiza con el cable de la computadora conectado directo al puerto HOST y la controladora en la fuente de 9 V — un asistente te guía paso a paso."
     },
     "howto": [
      {
       "pt": "Atualize primeiro a controladora (aba 1).",
       "en": "Update the controller first (tab 1).",
       "es": "Actualiza primero la controladora (pestaña 1)."
      },
      {
       "pt": "Na aba <strong>2 USB HOST</strong>, ligue a fonte de 9 V na controladora e toque em <strong>ATUALIZAR USB HOST</strong>.",
       "en": "On the <strong>2 USB HOST</strong> tab, plug the 9 V power supply into the controller and tap <strong>UPDATE USB HOST</strong>.",
       "es": "En la pestaña <strong>2 USB HOST</strong>, conecta la fuente de 9 V a la controladora y toca <strong>ACTUALIZAR USB HOST</strong>."
      },
      {
       "pt": "Siga o assistente: ele pede para tirar o cabo da porta DEVICE, ligar o computador na porta HOST, grava e confere.",
       "en": "Follow the wizard: it asks you to unplug the cable from the DEVICE port and connect the computer to the HOST port, then it flashes and checks.",
       "es": "Sigue el asistente: te pide sacar el cable del puerto DEVICE y conectar la computadora al puerto HOST, y luego graba y verifica."
      },
      {
       "pt": "No fim, volte o cabo para a porta DEVICE.",
       "en": "At the end, put the cable back in the DEVICE port.",
       "es": "Al final, vuelve a poner el cable en el puerto DEVICE."
      }
     ],
     "shot": "cfg-atualizar-host",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › ATUALIZAR — ABA 2",
      "en": "SETTINGS › UPDATES — TAB 2",
      "es": "CONFIGURACIÓN › ACTUALIZAR — PESTAÑA 2"
     },
     "fields": [
      {
       "name": {
        "pt": "Por que a fonte de 9 V",
        "en": "Why the 9 V power supply",
        "es": "Por qué la fuente de 9 V"
       },
       "type": {
        "pt": "obrigatório",
        "en": "required",
        "es": "obligatorio"
       },
       "desc": {
        "pt": "<p>Nesta atualização o cabo USB sai da porta DEVICE e vai para a HOST. Sem a fonte, a BFMiDi desliga no meio.</p>",
        "en": "<p>In this update the USB cable comes out of the DEVICE port and goes into HOST. Without the power supply, the BFMiDi turns off halfway through.</p>",
        "es": "<p>En esta actualización el cable USB sale del puerto DEVICE y va al HOST. Sin la fuente, la BFMiDi se apaga a mitad del proceso.</p>"
       }
      },
      {
       "name": {
        "pt": "O que precisa",
        "en": "What you need",
        "es": "Lo que necesitas"
       },
       "type": {
        "pt": "lista",
        "en": "list",
        "es": "lista"
       },
       "desc": {
        "pt": "<p>Fonte 9 V de pedal, um cabo USB com ponta USB-C para a porta HOST (de preferência com a ponta retangular no computador), Chrome ou Edge no computador (ou o app BFMiDi de Windows/Mac) e uns 3 minutos. Seus presets não são apagados.</p>",
        "en": "<p>A 9 V pedal power supply, a USB cable with a USB-C end for the HOST port (ideally with the rectangular end on the computer side), Chrome or Edge on the computer (or the BFMiDi app for Windows/Mac) and about 3 minutes. Your presets aren't erased.</p>",
        "es": "<p>Fuente de 9 V de pedal, un cable USB con punta USB-C para el puerto HOST (de preferencia con la punta rectangular en la computadora), Chrome o Edge en la computadora (o la app BFMiDi de Windows/Mac) y unos 3 minutos. Tus presets no se borran.</p>"
       }
      },
      {
       "name": {
        "pt": "Se parar no meio",
        "en": "If it stops halfway",
        "es": "Si se detiene a mitad de camino"
       },
       "type": {
        "pt": "socorro",
        "en": "rescue",
        "es": "rescate"
       },
       "desc": {
        "pt": "<p>O assistente sempre diz o que aconteceu — se nada mudou ou se o firmware ficou incompleto. Com a gravação incompleta, a aba oferece <strong>RECUPERAR</strong>; não desligue a controladora antes de tentar de novo.</p>",
        "en": "<p>The wizard always tells you what happened — whether nothing changed or the firmware was left incomplete. If the flash is incomplete, the tab offers <strong>RECOVER</strong>; don't turn off the controller before trying again.</p>",
        "es": "<p>El asistente siempre dice qué pasó — si nada cambió o si el firmware quedó incompleto. Con la grabación incompleta, la pestaña ofrece <strong>RECUPERAR</strong>; no apagues la controladora antes de intentarlo de nuevo.</p>"
       }
      }
     ]
    },
    {
     "id": "cfg-backup",
     "title": {
      "pt": "BACKUP — cópia e restauração",
      "en": "BACKUP — copy and restore",
      "es": "BACKUP — copia y restauración"
     },
     "purpose": {
      "pt": "Guardar o seu trabalho num arquivo — o pedal inteiro, um banco ou um preset — e trazer de volta quando precisar.",
      "en": "Save your work to a file — the whole pedal, a bank or a preset — and bring it back when you need it.",
      "es": "Guardar tu trabajo en un archivo — el pedal entero, un banco o un preset — y traerlo de vuelta cuando lo necesites."
     },
     "shot": "cfg-backup",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › BACKUP",
      "en": "SETTINGS › BACKUP",
      "es": "CONFIGURACIÓN › BACKUP"
     },
     "fields": [
      {
       "name": {
        "pt": "BACKUP COMPLETO",
        "en": "FULL BACKUP",
        "es": "BACKUP COMPLETO"
       },
       "type": {
        "pt": "arquivo",
        "en": "file",
        "es": "archivo"
       },
       "desc": {
        "pt": "<p>Todos os presets. Escolha incluir imagens e ícones (o arquivo fica bem maior, mas é a cópia de verdade) e as configurações globais (placa, cores, controles, aparelhos personalizados). <strong>FAZER CÓPIA</strong> baixa o arquivo; <strong>RESTAURAR</strong> traz de volta.</p>",
        "en": "<p>All the presets. Choose whether to include images and icons (the file gets much bigger, but it's the real copy) and the global settings (board, colors, controls, custom devices). <strong>BACK UP</strong> downloads the file; <strong>RESTORE</strong> brings it back.</p>",
        "es": "<p>Todos los presets. Elige si incluir imágenes e íconos (el archivo queda bastante más grande, pero es la copia de verdad) y la configuración global (placa, colores, controles, aparatos personalizados). <strong>HACER COPIA</strong> descarga el archivo; <strong>RESTAURAR</strong> lo trae de vuelta.</p>"
       }
      },
      {
       "name": {
        "pt": "EXPORTAR PERFORMANCE",
        "en": "EXPORT PERFORMANCE",
        "es": "EXPORTAR PERFORMANCE"
       },
       "type": {
        "pt": "um banco",
        "en": "one bank",
        "es": "un banco"
       },
       "desc": {
        "pt": "<p>Exporta ou importa um banco inteiro — os seis presets de um show — levando só as imagens e ícones que ele usa. Ao importar você escolhe o banco de destino, que é substituído.</p>",
        "en": "<p>Exports or imports a whole bank — the six presets of a show — taking along only the images and icons it uses. When importing, you choose the destination bank, which gets replaced.</p>",
        "es": "<p>Exporta o importa un banco entero — los seis presets de un show — llevando solo las imágenes e íconos que usa. Al importar, eliges el banco de destino, que se reemplaza.</p>"
       }
      },
      {
       "name": {
        "pt": "PRESET ÚNICO",
        "en": "SINGLE PRESET",
        "es": "PRESET ÚNICO"
       },
       "type": {
        "pt": "um preset",
        "en": "one preset",
        "es": "un preset"
       },
       "desc": {
        "pt": "<p>Exporta ou importa um preset só (sem imagens), para levar uma música de um pedal para outro.</p>",
        "en": "<p>Exports or imports a single preset (no images), to take a song from one pedal to another.</p>",
        "es": "<p>Exporta o importa un solo preset (sin imágenes), para llevar una canción de un pedal a otro.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Guarde os arquivos fora do celular (nuvem, computador). Um backup que mora só no aparelho que pode quebrar não é um backup.",
       "en": "Keep your files somewhere other than your phone (cloud, computer). A backup that lives only on the device that can break isn't a backup.",
       "es": "Guarda los archivos fuera del celular (nube, computadora). Un backup que vive solo en el aparato que se puede romper no es un backup."
      }
     ]
    },
    {
     "id": "cfg-testes",
     "title": {
      "pt": "TESTES — diagnóstico e monitor MIDI",
      "en": "TESTS — diagnostics and MIDI monitor",
      "es": "PRUEBAS — diagnóstico y monitor MIDI"
     },
     "purpose": {
      "pt": "Descobrir se o problema é o cabo, o canal ou o comando — sem montar preset nenhum.",
      "en": "Find out whether the problem is the cable, the channel or the command — without setting up any preset.",
      "es": "Descubrir si el problema es el cable, el canal o el comando — sin armar ningún preset."
     },
     "shot": "cfg-testes",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › TESTES",
      "en": "SETTINGS › TESTS",
      "es": "CONFIGURACIÓN › PRUEBAS"
     },
     "fields": [
      {
       "name": {
        "pt": "TESTE DE HARDWARE",
        "en": "HARD TEST",
        "es": "PRUEBA DE HARDWARE"
       },
       "type": {
        "pt": "diagnóstico",
        "en": "diagnostics",
        "es": "diagnóstico"
       },
       "desc": {
        "pt": "<p>Três testes de dez segundos: <strong>LEDS</strong>, <strong>DISPLAY</strong> e <strong>MIDI</strong>. Se os LEDs acendem no teste, o problema está na configuração, não no hardware.</p>",
        "en": "<p>Three ten-second tests: <strong>LEDS</strong>, <strong>DISPLAY</strong> and <strong>MIDI</strong>. If the LEDs light up in the test, the problem is in the setup, not the hardware.</p>",
        "es": "<p>Tres pruebas de diez segundos: <strong>LEDS</strong>, <strong>DISPLAY</strong> y <strong>MIDI</strong>. Si los LEDs se encienden en la prueba, el problema está en la configuración, no en el hardware.</p>"
       }
      },
      {
       "name": {
        "pt": "DISPARO MIDI",
        "en": "MIDI SEND",
        "es": "DISPARO MIDI"
       },
       "type": {
        "pt": "ferramenta",
        "en": "tool",
        "es": "herramienta"
       },
       "desc": {
        "pt": "<p>Manda um <strong>PC</strong> ou um <strong>CC</strong> na hora, no canal escolhido. Com <strong>DISPARO AUTOMÁTICO</strong>, cada + ou − já manda — é a forma mais rápida de descobrir a que número o seu aparelho responde.</p>",
        "en": "<p>Sends a <strong>PC</strong> or a <strong>CC</strong> right away, on the chosen channel. With <strong>AUTO SEND</strong>, every + or − sends immediately — it's the fastest way to find out which number your device responds to.</p>",
        "es": "<p>Envía un <strong>PC</strong> o un <strong>CC</strong> al instante, en el canal elegido. Con <strong>DISPARO AUTOMÁTICO</strong>, cada + o − ya envía — es la forma más rápida de descubrir a qué número responde tu equipo.</p>"
       }
      },
      {
       "name": {
        "pt": "MONITOR MIDI",
        "en": "MONITOR MIDI",
        "es": "MONITOR MIDI"
       },
       "type": {
        "pt": "diagnóstico",
        "en": "diagnostics",
        "es": "diagnóstico"
       },
       "desc": {
        "pt": "<p>Mostra o que a controladora manda na <strong>chamada de preset</strong> e nos <strong>disparos ao vivo</strong> do LIVE, em ordem, com a opção de copiar.</p>",
        "en": "<p>Shows what the controller sends on <strong>preset recall</strong> and on LIVE's <strong>live triggers</strong>, in order, with an option to copy.</p>",
        "es": "<p>Muestra lo que envía la controladora en la <strong>llamada de preset</strong> y en los <strong>disparos en vivo</strong> del LIVE, en orden, con la opción de copiar.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Se o disparo manual funciona e o preset não, o problema está no preset (canal ou valor) — não no cabo nem no aparelho.",
       "en": "If the manual send works and the preset doesn't, the problem is in the preset (channel or value) — not the cable or the device.",
       "es": "Si el disparo manual funciona y el preset no, el problema está en el preset (canal o valor) — no en el cable ni en el equipo."
      }
     ]
    },
    {
     "id": "cfg-restaurar",
     "title": {
      "pt": "RESTAURAR — apagar e voltar ao padrão",
      "en": "FACTORY RESET — erase and go back to defaults",
      "es": "RESTAURAR — borrar y volver a los valores de fábrica"
     },
     "purpose": {
      "pt": "Apagar os presets ou as configurações globais e recomeçar. É o item vermelho do menu, e por um bom motivo.",
      "en": "Erase the presets or the global settings and start over. It's the red item on the menu, and for good reason.",
      "es": "Borrar los presets o la configuración global y empezar de nuevo. Es el ítem rojo del menú, y por una buena razón."
     },
     "howto": [
      {
       "pt": "Faça um backup completo antes. Não há como desfazer.",
       "en": "Make a full backup first. There's no undo.",
       "es": "Haz un backup completo antes. No hay forma de deshacerlo."
      }
     ],
     "shot": "cfg-restaurar",
     "mockTitle": {
      "pt": "CONFIGURAÇÕES › RESTAURAR",
      "en": "SETTINGS › FACTORY RESET",
      "es": "CONFIGURACIÓN › RESTAURAR"
     },
     "fields": [
      {
       "name": {
        "pt": "APAGAR TODOS OS PRESETS",
        "en": "ERASE ALL PRESETS",
        "es": "BORRAR TODOS LOS PRESETS"
       },
       "type": {
        "pt": "irreversível",
        "en": "irreversible",
        "es": "irreversible"
       },
       "desc": {
        "pt": "<p>Os 60 presets voltam ao padrão em branco: footswitches em STOMP sem canal (por isso não aparecem na tela) e a layer 2 desligada. Imagens, ícones e aparelhos personalizados não são apagados.</p>",
        "en": "<p>All 60 presets go back to a blank default: footswitches in STOMP with no channel (so they don’t show on the screen) and layer 2 off. Images, icons and custom devices are not erased.</p>",
        "es": "<p>Los 60 presets vuelven al estado en blanco: footswitches en STOMP sin canal (por eso no aparecen en la pantalla) y la capa 2 apagada. Las imágenes, los íconos y los equipos personalizados no se borran.</p>"
       }
      },
      {
       "name": {
        "pt": "APAGAR CONFIG GLOBAL",
        "en": "ERASE GLOBAL CONFIG",
        "es": "BORRAR CONFIG GLOBAL"
       },
       "type": {
        "pt": "irreversível",
        "en": "irreversible",
        "es": "irreversible"
       },
       "desc": {
        "pt": "<p>Volta cores, brilho, início automático, bancos, combos e controles ao padrão — e também o <strong>modelo da placa</strong>. Confira o modelo em <strong>HARDWARE</strong> logo depois. A rede Wi-Fi de casa não é apagada.</p>",
        "en": "<p>Resets colors, brightness, auto start, banks, combos and controls to the defaults — and also the <strong>board model</strong>. Check the model in <strong>HARDWARE</strong> right afterward. Your home Wi-Fi network isn't erased.</p>",
        "es": "<p>Devuelve colores, brillo, inicio automático, bancos, combos y controles a los valores de fábrica — y también el <strong>modelo de la placa</strong>. Revisa el modelo en <strong>HARDWARE</strong> justo después. La red Wi-Fi de casa no se borra.</p>"
       }
      },
      {
       "name": {
        "pt": "MODO OFFLINE",
        "en": "OFFLINE MODE",
        "es": "MODO OFFLINE"
       },
       "type": {
        "pt": "cópia local",
        "en": "local copy",
        "es": "copia local"
       },
       "desc": {
        "pt": "<p>No modo offline aparece também <strong>ZERAR CÓPIA LOCAL</strong>, que volta a cópia guardada no aparelho ao pacote de fábrica sem tocar na controladora.</p>",
        "en": "<p>In offline mode, <strong>RESET LOCAL COPY</strong> also appears; it returns the copy stored on your device to the factory package without touching the controller.</p>",
        "es": "<p>En el modo offline aparece también <strong>REINICIAR COPIA LOCAL</strong>, que devuelve la copia guardada en el dispositivo al paquete de fábrica sin tocar la controladora.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Não é preciso restaurar antes de atualizar.",
       "en": "You don't need to reset before updating.",
       "es": "No hace falta restaurar antes de actualizar."
      }
     ]
    }
   ]
  },
  {
   "id": "avancado",
   "icon": "avancado",
   "page": 6,
   "title": {
    "pt": "Recursos avançados",
    "en": "Advanced features",
    "es": "Funciones avanzadas"
   },
   "summary": {
    "pt": "Comandos que a controladora manda para ela mesma, as integrações com aparelhos específicos e o que fazer quando algo não responde.",
    "en": "Commands the controller sends to itself, integrations with specific devices, and what to do when something doesn't respond.",
    "es": "Comandos que la controladora se envía a sí misma, las integraciones con equipos específicos y qué hacer cuando algo no responde."
   },
   "intro": {
    "pt": "<p>Nada nesta página é necessário para tocar. São recursos para quem já domina o básico e quer arrancar mais da controladora — ou precisa resolver um problema específico.</p>",
    "en": "<p>Nothing on this page is required to play. These features are for those who have already mastered the basics and want to get more out of the controller — or need to solve a specific problem.</p>",
    "es": "<p>Nada en esta página es necesario para tocar. Son funciones para quien ya domina lo básico y quiere sacarle más provecho a la controladora — o necesita resolver un problema específico.</p>"
   },
   "cards": [
    {
     "id": "adv-comandos",
     "title": {
      "pt": "Comandos de navegação (a controladora falando com ela mesma)",
      "en": "Navigation commands (the controller talking to itself)",
      "es": "Comandos de navegación (la controladora hablando consigo misma)"
     },
     "purpose": {
      "pt": "Além de mandar MIDI para fora, um footswitch pode mandar um comando para a própria controladora — trocar de banco, de preset ou de camada sem sair do LIVE.",
      "en": "Besides sending MIDI out, a footswitch can send a command to the controller itself — change bank, preset or layer without leaving LIVE.",
      "es": "Además de enviar MIDI hacia afuera, un footswitch puede enviarle un comando a la propia controladora — cambiar de banco, de preset o de capa sin salir del LIVE."
     },
     "howto": [
      {
       "pt": "Em qualquer lista de CC de um footswitch (STOMP, SINGLE, MACROS, MOMENTARY, SPIN, TAP TEMPO), role até o fim: os comandos de navegação vêm depois dos CCs normais, marcados com <strong>»</strong>.",
       "en": "In any footswitch CC list (STOMP, SINGLE, MACROS, MOMENTARY, SPIN, TAP TEMPO), scroll to the end: the navigation commands come after the regular CCs, marked with <strong>»</strong>.",
       "es": "En cualquier lista de CC de un footswitch (STOMP, SINGLE, MACROS, MOMENTARY, SPIN, TAP TEMPO), desplázate hasta el final: los comandos de navegación vienen después de los CC normales, marcados con <strong>»</strong>."
      }
     ],
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "» UP BANK e » DOWN BANK",
        "en": "» UP BANK and » DOWN BANK",
        "es": "» UP BANK y » DOWN BANK"
       },
       "type": {
        "pt": "comando",
        "en": "command",
        "es": "comando"
       },
       "desc": {
        "pt": "<p>Sobem e descem uma letra, chamando o preset do banco novo. Bancos desligados em BANCOS ATIVOS são pulados.</p>",
        "en": "<p>Move up or down one letter, calling up the preset in the new bank. Banks turned off in ACTIVE BANKS are skipped.</p>",
        "es": "<p>Suben y bajan una letra, llamando el preset del banco nuevo. Los bancos desactivados en BANCOS ACTIVOS se saltan.</p>"
       }
      },
      {
       "name": {
        "pt": "» UP PRESET e » DOWN PRESET",
        "en": "» UP PRESET and » DOWN PRESET",
        "es": "» UP PRESET y » DOWN PRESET"
       },
       "type": {
        "pt": "comando",
        "en": "command",
        "es": "comando"
       },
       "desc": {
        "pt": "<p>Andam para o preset vizinho dentro do banco, em ciclo (nas placas de quatro footswitches, só entre os quatro). É o “próxima música” com o pé, sem sair do LIVE.</p>",
        "en": "<p>Step to the neighboring preset within the bank, cycling around (on four-footswitch boards, only among those four). It's “next song” with your foot, without leaving LIVE.</p>",
        "es": "<p>Pasan al preset vecino dentro del banco, en ciclo (en las placas de cuatro footswitches, solo entre esos cuatro). Es la “próxima canción” con el pie, sin salir del LIVE.</p>"
       }
      },
      {
       "name": {
        "pt": "» OUT LIVE MODE e » SW_LIVE",
        "en": "» OUT LIVE MODE and » SW_LIVE",
        "es": "» OUT LIVE MODE y » SW_LIVE"
       },
       "type": {
        "pt": "comando",
        "en": "command",
        "es": "comando"
       },
       "desc": {
        "pt": "<p>OUT LIVE MODE sai do LIVE e volta à navegação de presets; SW_LIVE é o interruptor: entra e sai. Nas placas sem botão LIVE, ter um destes num footswitch é o que garante a volta.</p>",
        "en": "<p>OUT LIVE MODE leaves LIVE and goes back to preset navigation; SW_LIVE is the toggle: it goes in and out. On boards without a LIVE button, having one of these on a footswitch is what guarantees your way back.</p>",
        "es": "<p>OUT LIVE MODE sale del LIVE y vuelve a la navegación de presets; SW_LIVE es el interruptor: entra y sale. En las placas sin botón LIVE, tener uno de estos en un footswitch es lo que garantiza la vuelta.</p>"
       }
      },
      {
       "name": {
        "pt": "» TO LAYER",
        "en": "» TO LAYER",
        "es": "» TO LAYER"
       },
       "type": {
        "pt": "comando",
        "en": "command",
        "es": "comando"
       },
       "desc": {
        "pt": "<p>Alterna entre a Layer 1 e a Layer 2 do preset. Só faz sentido dentro do LIVE, com a Layer 2 ligada.</p>",
        "en": "<p>Switches between the preset's Layer 1 and Layer 2. It only makes sense inside LIVE, with Layer 2 turned on.</p>",
        "es": "<p>Alterna entre la Layer 1 y la Layer 2 del preset. Solo tiene sentido dentro del LIVE, con la Layer 2 activada.</p>"
       }
      },
      {
       "name": {
        "pt": "Navegação em prévia (footswitches externos)",
        "en": "Preview navigation (external footswitches)",
        "es": "Navegación en vista previa (footswitches externos)"
       },
       "type": {
        "pt": "comando",
        "en": "command",
        "es": "comando"
       },
       "desc": {
        "pt": "<p>Os footswitches externos têm dois comandos exclusivos — <strong>» UP BANK STANDBY</strong> e <strong>» DOWN BANK STANDBY</strong> —: sobem e descem banco em prévia, sem trocar o som, esperando um footswitch do preset confirmar.</p>",
        "en": "<p>The external footswitches have two commands of their own, <strong>» UP BANK STANDBY</strong> and <strong>» DOWN BANK STANDBY</strong>: they move up and down through banks in preview, without changing the sound, and wait for a preset footswitch to confirm.</p>",
        "es": "<p>Los footswitches externos tienen dos comandos exclusivos, <strong>» UP BANK STANDBY</strong> y <strong>» DOWN BANK STANDBY</strong>: suben y bajan de banco en vista previa, sin cambiar el sonido, y esperan a que un footswitch del preset confirme.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Estes comandos não saem pelo cabo MIDI: são consumidos pela própria controladora. RAMP e STEPS não os oferecem.",
       "en": "These commands don't go out over the MIDI cable: the controller itself uses them. RAMP and STEPS don't offer them.",
       "es": "Estos comandos no salen por el cable MIDI: los consume la propia controladora. RAMP y STEPS no los ofrecen."
      }
     ]
    },
    {
     "id": "adv-integracoes",
     "title": {
      "pt": "Integrações com aparelhos",
      "en": "Device integrations",
      "es": "Integraciones con equipos"
     },
     "purpose": {
      "pt": "Alguns aparelhos conversam com a controladora além do MIDI comum. Escolha o aparelho no Modo Amigável para ligar esses recursos.",
      "en": "Some devices talk to the controller beyond regular MIDI. Choose the device in Friendly Mode to turn these features on.",
      "es": "Algunos equipos se comunican con la controladora más allá del MIDI común. Elige el equipo en el Modo Amigable para activar estas funciones."
     },
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "Kemper Player",
        "en": "Kemper Player",
        "es": "Kemper Player"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>Pela porta DEVICE da controladora ligada no USB do Player: o <strong>nome do rig</strong> na tela (GET NAMES), o <strong>afinador</strong> na tela da controladora (um footswitch mandando CC 31), o <strong>SEGUIR O KEMPER</strong> e o <strong>editor do rig</strong> (EDITAR RIG). A lista de comandos ganha os parâmetros internos do Kemper por nome (marcados com ◆), e valores como o Transpose aparecem em notas musicais.</p>",
        "en": "<p>With the controller's DEVICE port connected to the Player's USB: the <strong>rig name</strong> on the screen (GET NAMES), the <strong>tuner</strong> on the controller's screen (a footswitch sending CC 31), <strong>FOLLOW THE KEMPER</strong> and the <strong>rig editor</strong> (EDIT RIG). The command list gains the Kemper's internal parameters by name (marked with ◆), and values such as Transpose show up as musical notes.</p>",
        "es": "<p>Con el puerto DEVICE de la controladora conectado al USB del Player: el <strong>nombre del rig</strong> en la pantalla (GET NAMES), el <strong>afinador</strong> en la pantalla de la controladora (un footswitch enviando CC 31), el <strong>SEGUIR EL KEMPER</strong> y el <strong>editor del rig</strong> (EDITAR RIG). La lista de comandos incorpora los parámetros internos del Kemper por nombre (marcados con ◆), y valores como el Transpose aparecen como notas musicales.</p>"
       }
      },
      {
       "name": {
        "pt": "Valeton GP-5",
        "en": "Valeton GP-5",
        "es": "Valeton GP-5"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>Plugada no USB Host: a lista de comandos ganha os <strong>parâmetros internos</strong> da GP-5 por nome — o mesmo que girar os knobs dela pela controladora. No TAP TEMPO, um destino <strong>CC 119</strong> manda o tempo do delay em milissegundos (até 1 s), acertando na primeira batida. E o <strong>editor de preset</strong> completo.</p>",
        "en": "<p>Plugged into the USB Host: the command list gains the GP-5's <strong>internal parameters</strong> by name — the same as turning its knobs from the controller. In TAP TEMPO, a <strong>CC 119</strong> target sends the delay time in milliseconds (up to 1 s), so the tempo is right from the first beat. Plus the full <strong>preset editor</strong>.</p>",
        "es": "<p>Conectada al USB Host: la lista de comandos incorpora los <strong>parámetros internos</strong> de la GP-5 por nombre — lo mismo que girar sus knobs desde la controladora. En el TAP TEMPO, un destino <strong>CC 119</strong> envía el tiempo del delay en milisegundos (hasta 1 s), así el tempo queda exacto desde el primer golpe. Y el <strong>editor de preset</strong> completo.</p>"
       }
      },
      {
       "name": {
        "pt": "IK TONEX ONE",
        "en": "IK TONEX ONE",
        "es": "IK TONEX ONE"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>Plugada no USB Host, é reconhecida sozinha: troca de preset pelo PC de cada preset da BFMiDi, canal próprio para cada TONEX (até duas no hub) e o <strong>editor de preset</strong>.</p>",
        "en": "<p>Plugged into the USB Host, it's recognized automatically: preset changes through each BFMiDi preset's PC, a channel of its own for each TONEX (up to two on a hub) and the <strong>preset editor</strong>.</p>",
        "es": "<p>Conectada al USB Host, se reconoce sola: cambio de preset por el PC de cada preset de la BFMiDi, canal propio para cada TONEX (hasta dos en el hub) y el <strong>editor de preset</strong>.</p>"
       }
      },
      {
       "name": {
        "pt": "Neural DSP Nano Cortex",
        "en": "Neural DSP Nano Cortex",
        "es": "Neural DSP Nano Cortex"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>Plugada sozinha no USB Host: o <strong>afinador</strong> na tela da controladora (um footswitch mandando CC 43 no canal da Nano), o <strong>nome do preset</strong> da Nano na tela (GET NAMES, ligado no card do Modo Amigável) e o <strong>editor de preset</strong>. Com o Cortex Cloud conectado por Bluetooth, a Nano recusa a conversa pelo USB.</p>",
        "en": "<p>Plugged into the USB Host on its own: the <strong>tuner</strong> on the controller's screen (a footswitch sending CC 43 on the Nano's channel), the Nano's <strong>preset name</strong> on the screen (GET NAMES, turned on in the Friendly Mode card) and the <strong>preset editor</strong>. With Cortex Cloud connected over Bluetooth, the Nano refuses to talk over USB.</p>",
        "es": "<p>Conectada sola al USB Host: el <strong>afinador</strong> en la pantalla de la controladora (un footswitch enviando CC 43 en el canal de la Nano), el <strong>nombre del preset</strong> de la Nano en la pantalla (GET NAMES, activado en la tarjeta del Modo Amigable) y el <strong>editor de preset</strong>. Con el Cortex Cloud conectado por Bluetooth, la Nano rechaza la comunicación por USB.</p>"
       }
      },
      {
       "name": {
        "pt": "BOSS MS-3 e Katana",
        "en": "BOSS MS-3 and Katana",
        "es": "BOSS MS-3 y Katana"
       },
       "type": {
        "pt": "integração",
        "en": "integration",
        "es": "integración"
       },
       "desc": {
        "pt": "<p>Com <strong>Traduzir Boss MS-3</strong> ligado (CONFIGURAÇÕES › HOST), o USB Host converte os comandos para o formato próprio da Boss.</p>",
        "en": "<p>With <strong>Translate Boss MS-3</strong> turned on (SETTINGS › HOST), the USB Host converts commands into Boss's own format.</p>",
        "es": "<p>Con <strong>Traducir Boss MS-3</strong> activado (CONFIGURACIÓN › HOST), el USB Host convierte los comandos al formato propio de Boss.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Os editores de preset estão explicados no capítulo <strong>Editores de preset dos aparelhos</strong>.",
       "en": "The preset editors are explained in the <strong>Device preset editors</strong> chapter.",
       "es": "Los editores de preset se explican en el capítulo <strong>Editores de preset de los aparatos</strong>."
      }
     ]
    },
    {
     "id": "adv-socorro",
     "title": {
      "pt": "Quando alguma coisa não responde",
      "en": "When something doesn't respond",
      "es": "Cuando algo no responde"
     },
     "purpose": {
      "pt": "Um roteiro curto para achar o problema na ordem certa, do mais provável ao mais raro.",
      "en": "A short checklist to find the problem in the right order, from the most likely to the rarest.",
      "es": "Una guía corta para encontrar el problema en el orden correcto, de lo más probable a lo más raro."
     },
     "noMock": true,
     "fields": [
      {
       "name": {
        "pt": "A pedaleira não troca de som",
        "en": "The effects unit doesn't change sound",
        "es": "La pedalera no cambia de sonido"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>1. O cabo vai da BFMiDi para a pedaleira (MIDI OUT → MIDI IN)?<br>2. O canal do preset é o que a pedaleira escuta?<br>3. Use o <strong>DISPARO MIDI</strong> em CONFIGURAÇÕES › TESTES: se ali funciona, o problema está no preset; se nem ali, no cabo ou no aparelho.<br>4. A pedaleira perde as primeiras mensagens depois de trocar de preset? Use os <strong>TEMPOS DE DISPARO</strong> em CONFIGURAÇÕES › HARDWARE.</p>",
        "en": "<p>1. Does the cable go from the BFMiDi to the effects unit (MIDI OUT → MIDI IN)?<br>2. Is the preset's channel the one the effects unit listens to?<br>3. Use <strong>MIDI SEND</strong> in SETTINGS › TESTS: if it works there, the problem is in the preset; if it doesn't work even there, it's the cable or the device.<br>4. Does the effects unit miss the first messages after a preset change? Use <strong>SEND TIMING</strong> in SETTINGS › HARDWARE.</p>",
        "es": "<p>1. ¿El cable va de la BFMiDi a la pedalera (MIDI OUT → MIDI IN)?<br>2. ¿El canal del preset es el que escucha la pedalera?<br>3. Usa el <strong>DISPARO MIDI</strong> en CONFIGURACIÓN › PRUEBAS: si ahí funciona, el problema está en el preset; si ni ahí funciona, está en el cable o en el equipo.<br>4. ¿La pedalera pierde los primeros mensajes después de cambiar de preset? Usa los <strong>TIEMPOS DE ENVÍO</strong> en CONFIGURACIÓN › HARDWARE.</p>"
       }
      },
      {
       "name": {
        "pt": "Não consigo abrir o editor",
        "en": "I can't open the editor",
        "es": "No puedo abrir el editor"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>1. O Wi-Fi do pedal desliga sozinho 90 segundos depois de ligar se ninguém conectar: desligue e ligue a controladora.<br>2. A rede é <strong>BFMIDI_WIFI</strong>, senha <code>bfmidi@editor</code>.<br>3. Digite o endereço <strong>com</strong> <code>http://</code> (<code>http://192.168.4.1</code> ou <code>http://bfmidi.local</code>) — sem ele o navegador pesquisa no Google.<br>4. No Mac (macOS 15+), dê ao navegador a permissão de <strong>Rede local</strong>.<br>5. Último recurso: cabo USB + Chrome/Edge, ou os aplicativos de Mac e Windows.</p>",
        "en": "<p>1. The pedal's Wi-Fi turns itself off 90 seconds after power-up if nobody connects: turn the controller off and on again.<br>2. The network is <strong>BFMIDI_WIFI</strong>, password <code>bfmidi@editor</code>.<br>3. Type the address <strong>with</strong> <code>http://</code> (<code>http://192.168.4.1</code> or <code>http://bfmidi.local</code>) — without it, the browser searches Google.<br>4. On a Mac (macOS 15+), give the browser <strong>Local Network</strong> permission.<br>5. Last resort: USB cable + Chrome/Edge, or the Mac and Windows apps.</p>",
        "es": "<p>1. El Wi-Fi del pedal se apaga solo 90 segundos después de encenderlo si nadie se conecta: apaga y enciende la controladora.<br>2. La red es <strong>BFMIDI_WIFI</strong>, contraseña <code>bfmidi@editor</code>.<br>3. Escribe la dirección <strong>con</strong> <code>http://</code> (<code>http://192.168.4.1</code> o <code>http://bfmidi.local</code>) — sin eso, el navegador busca en Google.<br>4. En la Mac (macOS 15+), dale al navegador el permiso de <strong>Red local</strong>.<br>5. Último recurso: cable USB + Chrome/Edge, o las aplicaciones de Mac y Windows.</p>"
       }
      },
      {
       "name": {
        "pt": "Um footswitch não faz nada",
        "en": "A footswitch does nothing",
        "es": "Un footswitch no hace nada"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>Confira se ele não está em MUTE e se você está no modo certo (PRESET × LIVE). No modo PRESET, veja a <strong>CHAMADA DE PRESETS</strong>: o gesto pode estar em NENHUM, e ENTRAR EM MODO LIVE só funciona no footswitch do preset ativo. O editor do Kemper aberto pausa os footswitches (segure um por 2 s para sair). Confira também o modelo em HARDWARE.</p>",
        "en": "<p>Check that it isn't set to MUTE and that you're in the right mode (PRESET × LIVE). In PRESET mode, look at <strong>PRESET CALL</strong>: the gesture may be set to NONE, and ENTER LIVE MODE only works on the active preset's footswitch. An open Kemper editor pauses the footswitches (hold one for 2 s to exit). Also check the model in HARDWARE.</p>",
        "es": "<p>Verifica que no esté en MUTE y que estés en el modo correcto (PRESET × LIVE). En el modo PRESET, revisa la <strong>LLAMADA DE PRESETS</strong>: el gesto puede estar en NINGUNO, y ENTRAR EN MODO LIVE solo funciona en el footswitch del preset activo. El editor del Kemper abierto pausa los footswitches (mantén uno presionado 2 s para salir). Revisa también el modelo en HARDWARE.</p>"
       }
      },
      {
       "name": {
        "pt": "O ícone do footswitch sumiu da tela",
        "en": "The footswitch icon disappeared from the screen",
        "es": "El ícono del footswitch desapareció de la pantalla"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>A função dele não tem canal MIDI: footswitch sem canal não aparece na tela da controladora. Dê um canal ao comando (ou use o FAVORITO, que aparece mesmo sem canal).</p>",
        "en": "<p>Its function has no MIDI channel: a footswitch without a channel doesn't show up on the controller's screen. Give the command a channel (or use FAVORITE, which shows up even without a channel).</p>",
        "es": "<p>Su función no tiene canal MIDI: un footswitch sin canal no aparece en la pantalla de la controladora. Asígnale un canal al comando (o usa el FAVORITO, que aparece incluso sin canal).</p>"
       }
      },
      {
       "name": {
        "pt": "Não consigo enviar imagens",
        "en": "I can't upload images",
        "es": "No puedo enviar imágenes"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>Veja a barra de memória em CONFIGURAÇÕES › IMAGENS: imagens e ícones dividem o mesmo espaço. Apague o que não usa, confira o tamanho do arquivo (até 50 KB por imagem, 30 KB por ícone) e prefira o cabo USB.</p>",
        "en": "<p>Check the memory bar in SETTINGS › IMAGES: images and icons share the same space. Delete what you don't use, check the file size (up to 50 KB per image, 30 KB per icon) and use the USB cable when you can.</p>",
        "es": "<p>Mira la barra de memoria en CONFIGURACIÓN › IMÁGENES: las imágenes y los íconos comparten el mismo espacio. Borra lo que no usas, revisa el tamaño del archivo (hasta 50 KB por imagen, 30 KB por ícono) y prefiere el cable USB.</p>"
       }
      },
      {
       "name": {
        "pt": "A tela do pedal ficou apagada depois de mexer no modelo",
        "en": "The pedal's screen went dark after changing the model",
        "es": "La pantalla del pedal quedó apagada después de cambiar el modelo"
       },
       "type": {
        "pt": "roteiro",
        "en": "checklist",
        "es": "guía"
       },
       "desc": {
        "pt": "<p>Modelo errado deixa a tela e os footswitches sem resposta. Conecte pelo Wi-Fi ou pelo cabo e escolha o modelo certo em CONFIGURAÇÕES › HARDWARE — inclusive depois de <strong>APAGAR CONFIG GLOBAL</strong>, que volta o modelo ao padrão.</p>",
        "en": "<p>The wrong model leaves the screen and the footswitches unresponsive. Connect over Wi-Fi or the cable and choose the right model in SETTINGS › HARDWARE — including after <strong>ERASE GLOBAL CONFIG</strong>, which resets the model to the default.</p>",
        "es": "<p>Un modelo equivocado deja la pantalla y los footswitches sin respuesta. Conéctate por Wi-Fi o por cable y elige el modelo correcto en CONFIGURACIÓN › HARDWARE — incluso después de <strong>BORRAR CONFIG GLOBAL</strong>, que devuelve el modelo al predeterminado.</p>"
       }
      }
     ],
     "notes": [
      {
       "pt": "Antes de mexer em qualquer coisa grande, faça um backup. É o que transforma um erro em cinco minutos perdidos, e não numa noite.",
       "en": "Before changing anything big, make a backup. It's what turns a mistake into five lost minutes instead of a lost night.",
       "es": "Antes de cambiar algo importante, haz un backup. Es lo que convierte un error en cinco minutos perdidos, y no en una noche."
      }
     ]
    }
   ]
  }
 ]
};

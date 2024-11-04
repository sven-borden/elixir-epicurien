import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        appTheme: {
          text: "#0e0a0f",
          background: "#fcf9fc",
          primary: "#a939c8",
          secondary: "#d47eed",
          accent: "#d44df9",
        },
      },
      keyframes: {
        wave1: {
          '0%, 100%': { d: 'path("M 0,700 L 0,105 C 114.19138755980862,86.03349282296651 228.38277511961724,67.066985645933 328,79 C 427.61722488038276,90.933014354067 512.6602870813397,133.76555023923447 611,143 C 709.3397129186603,152.23444976076553 820.9760765550241,127.87081339712918 913,103 C 1005.0239234449759,78.12918660287082 1077.4354066985645,52.75119617224881 1162,53 C 1246.5645933014355,53.24880382775119 1343.2822966507179,79.1244019138756 1440,105 L 1440,700 L 0,700 Z")' },
          '25%': { d: 'path("M 0,700 L 0,105 C 84.99521531100478,88.0909090909091 169.99043062200957,71.18181818181817 276,77 C 382.00956937799043,82.81818181818183 509.03349282296654,111.36363636363635 594,116 C 678.9665071770335,120.63636363636365 721.8755980861245,101.36363636363636 824,94 C 926.1244019138755,86.63636363636364 1087.4641148325359,91.18181818181817 1200,95 C 1312.5358851674641,98.81818181818183 1376.267942583732,101.9090909090909 1440,105 L 1440,700 L 0,700 Z")' },
          '75%': { d: 'path("M 0,700 L 0,105 C 88,99.23923444976077 176,93.47846889952153 263,90 C 350,86.52153110047847 436,85.32535885167465 542,88 C 648,90.67464114832535 774,97.22009569377991 888,90 C 1002,82.77990430622009 1104,61.794258373205736 1194,62 C 1284,62.205741626794264 1362,83.60287081339713 1440,105 L 1440,700 L 0,700 Z")' },
          '50%': { d: 'path("M 0,700 L 0,105 C 65.34928229665073,120.2535885167464 130.69856459330146,135.5071770334928 248,145 C 365.30143540669854,154.4928229665072 534.555023923445,158.22488038277513 627,156 C 719.444976076555,153.77511961722487 735.0813397129186,145.5933014354067 816,138 C 896.9186602870814,130.4066985645933 1043.1196172248806,123.40191387559808 1158,118 C 1272.8803827751194,112.59808612440192 1356.4401913875597,108.79904306220095 1440,105 L 1440,700 L 0,700 Z")' }
        },
        wave2: {
          '0%, 100%': { d: 'path("M 0,700 L 0,245 C 88.23923444976077,243.755980861244 176.47846889952154,242.51196172248802 267,230 C 357.52153110047846,217.48803827751198 450.32535885167465,193.70813397129186 562,193 C 673.6746411483253,192.29186602870814 804.22009569378,214.6555023923445 901,239 C 997.77990430622,263.3444976076555 1060.7942583732056,289.66985645933016 1145,291 C 1229.2057416267944,292.33014354066984 1334.6028708133972,268.6650717703349 1440,245 L 1440,700 L 0,700 Z")' },
          '25%': { d: 'path("M 0,700 L 0,245 C 96.34449760765551,240.80861244019138 192.68899521531102,236.61722488038276 299,251 C 405.311004784689,265.38277511961724 521.5885167464114,298.3397129186603 607,285 C 692.4114832535886,271.6602870813397 746.9569377990432,212.02392344497605 838,202 C 929.0430622009568,191.97607655502395 1056.583732057416,231.56459330143542 1163,247 C 1269.416267942584,262.4354066985646 1354.708133971292,253.7177033492823 1440,245 L 1440,700 L 0,700 Z")' },
          '75%': { d: 'path("M 0,700 L 0,245 C 73.80861244019138,244.73205741626793 147.61722488038276,244.46411483253587 237,253 C 326.38277511961724,261.53588516746413 431.3397129186603,278.8755980861244 551,271 C 670.6602870813397,263.1244019138756 805.023923444976,230.0334928229665 912,229 C 1018.976076555024,227.9665071770335 1098.5645933014355,258.99043062200957 1182,267 C 1265.4354066985645,275.00956937799043 1352.7177033492821,260.0047846889952 1440,245 L 1440,700 L 0,700 Z")' },
          '50%': { d: 'path("M 0,700 L 0,245 C 85.01435406698562,259.51674641148327 170.02870813397124,274.0334928229665 274,269 C 377.97129186602876,263.9665071770335 500.8995215311005,239.38277511961726 611,223 C 721.1004784688995,206.61722488038274 818.3732057416267,198.43540669856458 902,205 C 985.6267942583733,211.56459330143542 1055.6076555023924,232.8755980861244 1143,242 C 1230.3923444976076,251.1244019138756 1335.1961722488038,248.0622009569378 1440,245 L 1440,700 L 0,700 Z"))' }
        },
        wave3: {
          '0%, 100%': { d: 'path("M 0,700 L 0,385 C 102.69856459330146,394.1483253588517 205.3971291866029,403.29665071770336 317,396 C 428.6028708133971,388.70334928229664 549.1100478468899,364.96172248803833 622,363 C 694.8899521531101,361.03827751196167 720.1626794258374,380.85645933014354 817,381 C 913.8373205741626,381.14354066985646 1082.2392344497607,361.6124401913875 1198,359 C 1313.7607655502393,356.3875598086125 1376.8803827751196,370.6937799043062 1440,385 L 1440,700 L 0,700 Z")' },
          '25%': { d: 'path("M 0,700 L 0,385 C 73.33014354066987,392.6842105263158 146.66028708133973,400.36842105263156 253,393 C 359.33971291866027,385.63157894736844 498.68899521531114,363.2105263157895 601,355 C 703.3110047846889,346.7894736842105 768.5837320574161,352.7894736842106 865,351 C 961.4162679425839,349.2105263157894 1088.976076555024,339.6315789473684 1190,344 C 1291.023923444976,348.3684210526316 1365.511961722488,366.68421052631584 1440,385 L 1440,700 L 0,700 Z")' },
          '75%': { d: 'path("M 0,700 L 0,385 C 101.01435406698562,406.9617224880383 202.02870813397124,428.92344497607655 300,413 C 397.97129186602876,397.07655502392345 492.8995215311005,343.2679425837321 592,346 C 691.1004784688995,348.7320574162679 794.3732057416269,408.0047846889952 884,411 C 973.6267942583731,413.9952153110048 1049.6076555023924,360.71291866028713 1140,347 C 1230.3923444976076,333.28708133971287 1335.1961722488038,359.1435406698564 1440,385 L 1440,700 L 0,700 Z")' },
          '50%': { d: 'path("M 0,700 L 0,385 C 95.98086124401911,358.88516746411483 191.96172248803822,332.77033492822966 283,339 C 374.0382775119618,345.22966507177034 460.13397129186603,383.8038277511962 545,406 C 629.866028708134,428.1961722488038 713.5023923444977,434.0143540669857 826,435 C 938.4976076555023,435.9856459330143 1079.8564593301437,432.1387559808612 1187,423 C 1294.1435406698563,413.8612440191388 1367.0717703349283,399.4306220095694 1440,385 L 1440,700 L 0,700 Z"))' }
        },
        wave4: {
          '0%, 100%': { d: 'path("M 0,700 L 0,525 C 66.87081339712918,512.7607655502393 133.74162679425837,500.52153110047846 242,496 C 350.25837320574163,491.47846889952154 499.9043062200957,494.67464114832535 594,493 C 688.0956937799043,491.32535885167465 726.6411483253588,484.77990430622003 820,483 C 913.3588516746412,481.22009569377997 1061.531100478469,484.2057416267943 1174,492 C 1286.468899521531,499.7942583732057 1363.2344497607655,512.3971291866028 1440,525 L 1440,700 L 0,700 Z")' },
          '25%': { d: 'path("M 0,700 L 0,525 C 67.10047846889952,540.2535885167464 134.20095693779905,555.5071770334928 239,547 C 343.79904306220095,538.4928229665072 486.2966507177033,506.2248803827751 609,509 C 731.7033492822967,511.7751196172249 834.6124401913877,549.5933014354067 908,555 C 981.3875598086123,560.4066985645933 1025.2535885167463,533.4019138755981 1109,523 C 1192.7464114832537,512.5980861244019 1316.3732057416269,518.799043062201 1440,525 L 1440,700 L 0,700 Z")' },
          '75%': { d: 'path("M 0,700 L 0,525 C 77.41626794258374,521.7559808612441 154.8325358851675,518.5119617224881 266,509 C 377.1674641148325,499.4880382775119 522.0861244019139,483.70813397129183 618,484 C 713.9138755980861,484.29186602870817 760.822966507177,500.6555023923445 847,519 C 933.177033492823,537.3444976076555 1058.622009569378,557.6698564593302 1164,559 C 1269.377990430622,560.3301435406698 1354.688995215311,542.6650717703349 1440,525 L 1440,700 L 0,700 Z")' },
          '50%': { d: 'path("M 0,700 L 0,525 C 90.93779904306217,538.6172248803828 181.87559808612434,552.2344497607655 267,554 C 352.12440191387566,555.7655502392345 431.43540669856463,545.6794258373207 547,540 C 662.5645933014354,534.3205741626793 814.3827751196171,533.0478468899521 909,526 C 1003.6172248803829,518.9521531100479 1041.0334928229665,506.12918660287085 1120,505 C 1198.9665071770335,503.87081339712915 1319.4832535885166,514.4354066985645 1440,525 L 1440,700 L 0,700 Z"))' }
        },
      }
    },
  },
  plugins: [],
}) satisfies Config;

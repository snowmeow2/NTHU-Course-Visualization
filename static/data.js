const GPA_dict = {
    'A+': 4.3,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1,
    'E': 0,
    'X': 0,
    "二退": 0,
    "通過": 4.3,
    "不通過": 0,
    "成績未到": 0,
};

const score_color = {
    'A+': "rgb(127, 16, 132)",
    'A': "rgb(20, 16, 132)",
    'A-': "rgb(30, 65, 135)",
    'B+': "rgb(20, 110, 42)",
    'B': "rgb(120, 125, 49)",
    'B-': "rgb(91, 110, 24)",
    'C+': "rgb(218, 222, 0)",
    'C': "rgb(214, 143, 19)",
    'C-': "rgb(194, 102, 21)",
    'D': "rgb(201, 37, 0)",
    'E': "rgb(201, 37, 0)",
    'X': "rgb(201, 37, 0)",
    "二退": "#6c757d",
    "通過": "rgb(20, 16, 132)",
    "不通過": "rgb(201, 37, 0)",
    "成績未到": "#6c757d",
};

const semester_dict = {
    '10': '上學期',
    '20': '下學期',
    '30': '暑期'
}

const GPA_ABC_func = function (score) {
    if (score >= 90) {
        return 'A+'
    } else if (score >= 85) {
        return 'A'
    } else if (score >= 80) {
        return 'A-'
    } else if (score >= 77) {
        return 'B+'
    } else if (score >= 73) {
        return 'B'
    } else if (score >= 70) {
        return 'B-'
    } else if (score >= 67) {
        return 'C+'
    } else if (score >= 63) {
        return 'C'
    } else if (score >= 60) {
        return 'C-'
    } else if (score >= 50) {
        return 'D'
    } else if (score > 0) {
        return 'E'
    } else if (score == 0) {
        return 'X'
    }
}

const GPA_PER_dict = {
    4.3: 100.0,
    4.29: 99.63,
    4.28: 99.27,
    4.27: 98.9,
    4.26: 98.53,
    4.25: 98.17,
    4.24: 97.8,
    4.23: 97.43,
    4.22: 97.07,
    4.21: 96.7,
    4.2: 96.33,
    4.19: 95.97,
    4.18: 95.6,
    4.17: 95.23,
    4.16: 94.87,
    4.15: 94.5,
    4.14: 94.13,
    4.13: 93.77,
    4.12: 93.4,
    4.11: 93.03,
    4.1: 92.67,
    4.09: 92.3,
    4.08: 91.93,
    4.07: 91.57,
    4.06: 91.2,
    4.05: 90.83,
    4.04: 90.47,
    4.03: 90.1,
    4.02: 89.73,
    4.01: 89.37,
    4.0: 89.0,
    3.99: 88.83,
    3.98: 88.67,
    3.97: 88.5,
    3.96: 88.33,
    3.95: 88.17,
    3.94: 88.0,
    3.93: 87.83,
    3.92: 87.67,
    3.91: 87.5,
    3.9: 87.33,
    3.89: 87.17,
    3.88: 87.0,
    3.87: 86.83,
    3.86: 86.67,
    3.85: 86.5,
    3.84: 86.33,
    3.83: 86.17,
    3.82: 86.0,
    3.81: 85.83,
    3.8: 85.67,
    3.79: 85.5,
    3.78: 85.33,
    3.77: 85.17,
    3.76: 85.0,
    3.75: 84.83,
    3.74: 84.67,
    3.73: 84.5,
    3.72: 84.33,
    3.71: 84.17,
    3.7: 84.0,
    3.69: 83.88,
    3.68: 83.75,
    3.67: 83.63,
    3.66: 83.5,
    3.65: 83.38,
    3.64: 83.25,
    3.63: 83.13,
    3.62: 83.0,
    3.61: 82.88,
    3.6: 82.75,
    3.59: 82.63,
    3.58: 82.5,
    3.57: 82.38,
    3.56: 82.25,
    3.55: 82.13,
    3.54: 82.0,
    3.53: 81.88,
    3.52: 81.75,
    3.51: 81.63,
    3.5: 81.5,
    3.49: 81.38,
    3.48: 81.25,
    3.47: 81.13,
    3.46: 81.0,
    3.45: 80.88,
    3.44: 80.75,
    3.43: 80.63,
    3.42: 80.5,
    3.41: 80.38,
    3.4: 80.25,
    3.39: 80.13,
    3.38: 80.0,
    3.37: 79.88,
    3.36: 79.75,
    3.35: 79.63,
    3.34: 79.5,
    3.33: 79.38,
    3.32: 79.25,
    3.31: 79.13,
    3.3: 79.0,
    3.29: 78.9,
    3.28: 78.8,
    3.27: 78.7,
    3.26: 78.6,
    3.25: 78.5,
    3.24: 78.4,
    3.23: 78.3,
    3.22: 78.2,
    3.21: 78.1,
    3.2: 78.0,
    3.19: 77.9,
    3.18: 77.8,
    3.17: 77.7,
    3.16: 77.6,
    3.15: 77.5,
    3.14: 77.4,
    3.13: 77.3,
    3.12: 77.2,
    3.11: 77.1,
    3.1: 77.0,
    3.09: 76.9,
    3.08: 76.8,
    3.07: 76.7,
    3.06: 76.6,
    3.05: 76.5,
    3.04: 76.4,
    3.03: 76.3,
    3.02: 76.2,
    3.01: 76.1,
    3.0: 76.0,
    2.99: 75.87,
    2.98: 75.73,
    2.97: 75.6,
    2.96: 75.47,
    2.95: 75.33,
    2.94: 75.2,
    2.93: 75.07,
    2.92: 74.93,
    2.91: 74.8,
    2.9: 74.67,
    2.89: 74.53,
    2.88: 74.4,
    2.87: 74.27,
    2.86: 74.13,
    2.85: 74.0,
    2.84: 73.87,
    2.83: 73.73,
    2.82: 73.6,
    2.81: 73.47,
    2.8: 73.33,
    2.79: 73.2,
    2.78: 73.07,
    2.77: 72.93,
    2.76: 72.8,
    2.75: 72.67,
    2.74: 72.53,
    2.73: 72.4,
    2.72: 72.27,
    2.71: 72.13,
    2.7: 72.0,
    2.69: 71.93,
    2.68: 71.85,
    2.67: 71.78,
    2.66: 71.7,
    2.65: 71.63,
    2.64: 71.55,
    2.63: 71.48,
    2.62: 71.4,
    2.61: 71.33,
    2.6: 71.25,
    2.59: 71.18,
    2.58: 71.1,
    2.57: 71.03,
    2.56: 70.95,
    2.55: 70.88,
    2.54: 70.8,
    2.53: 70.73,
    2.52: 70.65,
    2.51: 70.58,
    2.5: 70.5,
    2.49: 70.43,
    2.48: 70.35,
    2.47: 70.28,
    2.46: 70.2,
    2.45: 70.13,
    2.44: 70.05,
    2.43: 69.98,
    2.42: 69.9,
    2.41: 69.83,
    2.4: 69.75,
    2.39: 69.68,
    2.38: 69.6,
    2.37: 69.53,
    2.36: 69.45,
    2.35: 69.38,
    2.34: 69.3,
    2.33: 69.23,
    2.32: 69.15,
    2.31: 69.08,
    2.3: 69.0,
    2.29: 68.9,
    2.28: 68.8,
    2.27: 68.7,
    2.26: 68.6,
    2.25: 68.5,
    2.24: 68.4,
    2.23: 68.3,
    2.22: 68.2,
    2.21: 68.1,
    2.2: 68.0,
    2.19: 67.9,
    2.18: 67.8,
    2.17: 67.7,
    2.16: 67.6,
    2.15: 67.5,
    2.14: 67.4,
    2.13: 67.3,
    2.12: 67.2,
    2.11: 67.1,
    2.1: 67.0,
    2.09: 66.9,
    2.08: 66.8,
    2.07: 66.7,
    2.06: 66.6,
    2.05: 66.5,
    2.04: 66.4,
    2.03: 66.3,
    2.02: 66.2,
    2.01: 66.1,
    2.0: 66.0,
    1.99: 65.8,
    1.98: 65.6,
    1.97: 65.4,
    1.96: 65.2,
    1.95: 65.0,
    1.94: 64.8,
    1.93: 64.6,
    1.92: 64.4,
    1.91: 64.2,
    1.9: 64.0,
    1.89: 63.8,
    1.88: 63.6,
    1.87: 63.4,
    1.86: 63.2,
    1.85: 63.0,
    1.84: 62.8,
    1.83: 62.6,
    1.82: 62.4,
    1.81: 62.2,
    1.8: 62.0,
    1.79: 61.8,
    1.78: 61.6,
    1.77: 61.4,
    1.76: 61.2,
    1.75: 61.0,
    1.74: 60.8,
    1.73: 60.6,
    1.72: 60.4,
    1.71: 60.2,
    1.7: 60.0,
    1.69: 59.86,
    1.68: 59.71,
    1.67: 59.57,
    1.66: 59.43,
    1.65: 59.29,
    1.64: 59.14,
    1.63: 59.0,
    1.62: 58.86,
    1.61: 58.71,
    1.6: 58.57,
    1.59: 58.43,
    1.58: 58.29,
    1.57: 58.14,
    1.56: 58.0,
    1.55: 57.86,
    1.54: 57.71,
    1.53: 57.57,
    1.52: 57.43,
    1.51: 57.29,
    1.5: 57.14,
    1.49: 57.0,
    1.48: 56.86,
    1.47: 56.71,
    1.46: 56.57,
    1.45: 56.43,
    1.44: 56.29,
    1.43: 56.14,
    1.42: 56.0,
    1.41: 55.86,
    1.4: 55.71,
    1.39: 55.57,
    1.38: 55.43,
    1.37: 55.29,
    1.36: 55.14,
    1.35: 55.0,
    1.34: 54.86,
    1.33: 54.71,
    1.32: 54.57,
    1.31: 54.43,
    1.3: 54.29,
    1.29: 54.14,
    1.28: 54.0,
    1.27: 53.86,
    1.26: 53.71,
    1.25: 53.57,
    1.24: 53.43,
    1.23: 53.29,
    1.22: 53.14,
    1.21: 53.0,
    1.2: 52.86,
    1.19: 52.71,
    1.18: 52.57,
    1.17: 52.43,
    1.16: 52.29,
    1.15: 52.14,
    1.14: 52.0,
    1.13: 51.86,
    1.12: 51.71,
    1.11: 51.57,
    1.1: 51.43,
    1.09: 51.29,
    1.08: 51.14,
    1.07: 51.0,
    1.06: 50.86,
    1.05: 50.71,
    1.04: 50.57,
    1.03: 50.43,
    1.02: 50.29,
    1.01: 50.14,
    1.0: 50.0,
    0.99: 49.5,
    0.98: 49.0,
    0.97: 48.5,
    0.96: 48.0,
    0.95: 47.5,
    0.94: 47.0,
    0.93: 46.5,
    0.92: 46.0,
    0.91: 45.5,
    0.9: 45.0,
    0.89: 44.5,
    0.88: 44.0,
    0.87: 43.5,
    0.86: 43.0,
    0.85: 42.5,
    0.84: 42.0,
    0.83: 41.5,
    0.82: 41.0,
    0.81: 40.5,
    0.8: 40.0,
    0.79: 39.5,
    0.78: 39.0,
    0.77: 38.5,
    0.76: 38.0,
    0.75: 37.5,
    0.74: 37.0,
    0.73: 36.5,
    0.72: 36.0,
    0.71: 35.5,
    0.7: 35.0,
    0.69: 34.5,
    0.68: 34.0,
    0.67: 33.5,
    0.66: 33.0,
    0.65: 32.5,
    0.64: 32.0,
    0.63: 31.5,
    0.62: 31.0,
    0.61: 30.5,
    0.6: 30.0,
    0.59: 29.5,
    0.58: 29.0,
    0.57: 28.5,
    0.56: 28.0,
    0.55: 27.5,
    0.54: 27.0,
    0.53: 26.5,
    0.52: 26.0,
    0.51: 25.5,
    0.5: 25.0,
    0.49: 24.5,
    0.48: 24.0,
    0.47: 23.5,
    0.46: 23.0,
    0.45: 22.5,
    0.44: 22.0,
    0.43: 21.5,
    0.42: 21.0,
    0.41: 20.5,
    0.4: 20.0,
    0.39: 19.5,
    0.38: 19.0,
    0.37: 18.5,
    0.36: 18.0,
    0.35: 17.5,
    0.34: 17.0,
    0.33: 16.5,
    0.32: 16.0,
    0.31: 15.5,
    0.3: 15.0,
    0.29: 14.5,
    0.28: 14.0,
    0.27: 13.5,
    0.26: 13.0,
    0.25: 12.5,
    0.24: 12.0,
    0.23: 11.5,
    0.22: 11.0,
    0.21: 10.5,
    0.2: 10.0,
    0.19: 9.5,
    0.18: 9.0,
    0.17: 8.5,
    0.16: 8.0,
    0.15: 7.5,
    0.14: 7.0,
    0.13: 6.5,
    0.12: 6.0,
    0.11: 5.5,
    0.1: 5.0,
    0.09: 4.5,
    0.08: 4.0,
    0.07: 3.5,
    0.06: 3.0,
    0.05: 2.5,
    0.04: 2.0,
    0.03: 1.5,
    0.02: 1.0,
    0.01: 0.5,
    0.0: 0.0
}

const departs_ZH_name = {
    "AES": "分析與環境科學研究所",
    "AIIM": "AI智慧製造與智慧物聯網產業碩士專班",
    "AMEV": "電動載具先進智慧製造技術產業碩士專班",
    "ANTH": "人類學研究所",
    "ASTR": "天文研究所",
    "BAI": "智慧生醫博士學位學程",
    "BME": "生物醫學工程研究所",
    "BMES": "生醫工程與環境科學系",
    "CHE": "化學工程學系",
    "CHEM": "化學系",
    "CL": "中國文學系",
    "CLC": "華語中心",
    "COM": "通訊工程研究所",
    "CS": "資訊工程學系",
    "DMS": "醫學科學系",
    "E": "工學院",
    "ECON": "經濟學系",
    "EE": "電機工程學系",
    "EECS": "電機資訊學院學士班",
    "EMBA": "高階經營管理碩士在職專班",
    "EMD": "高階經營管理雙聯碩士在職專班",
    "EMIM": "智慧製造跨院高階主管碩士在職學位學程",
    "EMM": "高階經營管理亞太地區馬來西亞境外碩士在職專班",
    "EMS": "高階經營管理深圳境外碩士在職專班",
    "ENE": "電子工程研究所",
    "ESS": "工程與系統科學系",
    "EST": "環境科技博士學位學程",
    "FL": "外國語文學系",
    "GE": "通識教育中心",
    "GEC": "通識教育中心",
    "GLLB": "學士後法律學士學位學程",
    "GOM": "全球營運管理碩士雙聯學位學程",
    "GPTS": "台灣研究教師在職進修碩士學位班",
    "HIS": "歷史研究所",
    "HSS": "人文社會學院學士班",
    "IACS": "亞際文化研究國際碩士學位學程",
    "IBP": "清華學院國際學士班",
    "ICMS": "計算與建模科學研究所",
    "IEEM": "工業工程與工程管理學系",
    "IEM": "工業工程與工程管理學系碩士在職專班",
    "IIS": "資訊安全研究所",
    "ILS": "學習科學研究所",
    "IMBA": "國際專業管理碩士班",
    "IMCT": "資通訊科技產品智慧設計控制與熱流產業碩士專班",
    "IMIC": "動力機械工程學系資通訊科技產品智慧設計與控制產業碩士專班",
    "IMIE": "智慧生產與智能馬達電控產業碩士專班",
    "IMII": "AI智慧製造與工業物聯網產業碩士專班",
    "IMS": "跨院國際碩士學位學程",
    "IPE": "工學院學士班",
    "IPHD": "跨院國際博士班學位學程",
    "IPIM": "智慧生產與製造產業碩士專班",
    "IPNS": "原子科學院學士班",
    "IPT": "光電工程研究所",
    "IPTH": "清華學院學士班",
    "ISA": "資訊系統與應用研究所",
    "ISS": "服務科學研究所",
    "ITME": "動力機械工程學系資通訊熱流與電聲科技產業碩士專班",
    "JAC": "藝術學院",
    "JAD": "藝術與設計學系",
    "JADN": "藝術與設計學系美勞教師碩士在職專班",
    "JITA": "藝術學院學士班",
    "JMU": "音樂學系",
    "JMUN": "音樂學系音樂碩士在職專班",
    "KCSN": "學前特殊教育碩士在職學位學程",
    "KEC": "環境與文化資源學系",
    "KECN": "環境與文化資源學系社區與社會學習領域碩士在職專班",
    "KEE": "幼兒教育學系",
    "KEEN": "幼兒教育學系碩士在職專班",
    "KEL": "教育與學習科技學系",
    "KELN": "教育與學習科技學系碩士在職專班",
    "KENI": "英語教學系",
    "KHCT": "竹師教育學院",
    "KIPE": "竹師教育學院學士班",
    "KLST": "學習科學與科技研究所",
    "KMS": "數理教育研究所",
    "KMSN": "數理教育研究所碩士在職專班",
    "KPC": "教育心理與諮商學系",
    "KPCN": "教育心理與諮商學系教育心理與諮商碩士在職專班",
    "KSEN": "竹師教育學院跨領域STEAM教育碩士在職專班",
    "KSPE": "特殊教育學系",
    "KSS": "運動科學系",
    "KSSN": "運動科學系碩士在職專班",
    "KTLT": "臺灣語言研究與教學研究所",
    "KWEN": "華德福教育碩士在職學位學程",
    "LANG": "英語教育中心",
    "LE": "語文中心",
    "LING": "語言學研究所",
    "LS": "生命科學系",
    "LSBI": "生技產業博士學位學程",
    "LSBS": "生物資訊與結構生物研究所",
    "LSBT": "生物科技研究所",
    "LSC": "生科院",
    "LSIN": "跨領域神經科學博士學位學程",
    "LSIP": "生命科學院學士班",
    "LSMC": "分子與細胞生物研究所",
    "LSMM": "分子醫學研究所",
    "LSSN": "系統神經科學研究所",
    "LST": "科技法律研究所",
    "MATH": "數學系",
    "MBA": "經營管理碩士在職專班",
    "MFB": "財務金融碩士在職專班",
    "MI": "軍訓室",
    "MPM": "公共政策與管理碩士在職專班",
    "MS": "材料科學工程學系",
    "NEMS": "奈米工程與微系統研究所",
    "NES": "核子工程與科學研究所",
    "NUCL": "原科院",
    "PE": "體育室",
    "PFMI": "前瞻功能材料產業博士學位學程",
    "PHIL": "哲學研究所",
    "PHYS": "物理學系",
    "PME": "動力機械工程學系",
    "QF": "計量財務金融學系",
    "RDDM": "半導體元件及製程產業研發碩士專班",
    "RDIC": "積體電路設計產業研發碩士專班",
    "RDPE": "產業研發碩士電力電子",
    "PMED": "精準醫療博士學位學程",
    "S": "理學院",
    "SCI": "理學院學士班",
    "SL": "華文文學研究所",
    "SLS": "先進光源科技學位學程",
    "SNHC": "社群網路與人智計算國際研究生博士學位學程",
    "SOC": "社會學研究所",
    "STAT": "統計學研究所",
    "TE": "師資培育中心",
    "TEE": "師資培育中心",
    "TEG": "師資培育中心",
    "THC": "清華學院",
    "TIGP": "國際研究生學程",
    "TL": "台灣文學研究所",
    "TM": "科技管理研究所",
    "TSE": "台北政經學院",
    "UPMT": "科技管理學院學士班",
    "UPPP": "光電博士學位學程",
    "VA": "合校過渡單位",
    "VGE": "合校過渡單位",
    "ZY": "服務學習"
}
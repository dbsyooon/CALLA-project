#!/usr/bin/env python
# coding: utf-8

#!/usr/bin/env python
# coding: utf-8


#!pip install -U sentence-transformers
#!pip install konlpy
#!pip install transformers torch



import re
import pandas as pd
from soynlp.tokenizer import RegexTokenizer
from sentence_transformers import SentenceTransformer, util
import torch


df = pd.read_csv("../../summary1.csv", encoding="utf-8-sig")   #지금 이 경로는 내 local 경로


attributes = [
    "1주일간 걷기 일수","1차 수축기 혈압","1차 이완기 혈압","2차 수축기 혈압","2차 이완기 혈압",
    "3차 수축기 혈압","3차 이완기 혈압","60초 맥박수","ALT(SGPT)","AST(SGOT)",
    "n-3계 지방산 섭취량(g)","n-6계 지방산 섭취량(g)","걷기 지속 시간(분)","걷기 지속 시간(시간)",
    "고혈압 진단시기","공복시간","공복혈당","나이아신 섭취량(mg)","나트륨 섭취량(mg)",
    "다가불포화지방산 섭취량(g)","단백질 섭취량(g)","단일불포화지방산 섭취량(g)","당 섭취량(g)",
    "당화혈색소","레티놀 섭취량(μg)","리보플라빈 섭취량(mg)","마그네슘 섭취량(mg)",
    "모유수유 자녀수","모유수유기간(연)","모유수유기간(월 환산)","모유수유기간(월)","물 섭취량(컵)",
    "베타카로틴 섭취량(μg)","비타민A(레티놀 활성 당량) 섭취량(μgRAE)","비타민C 섭취량(mg)",
    "비타민D 섭취량(μg)","비타민E 섭취량(mg α-TE)","수분 섭취량(g)","식이섬유 섭취량(g)",
    "신장","아연 섭취량(mg)","엽산 섭취량(μgDFE)","요나트륨","요비중","요산","요칼륨",
    "월평균 가구총소득","이상지질혈증 진단시기","이유보충식 시작시기(개월)","인 섭취량(mg)",
    "일반우유(생우유) 시작시기(개월)","중성지방","지방 섭취량(g)","철 섭취량(mg)","체중",
    "체질량지수","총콜레스테롤","최종 수축기 혈압(2,3차 평균)","최종 이완기 혈압(2,3차 평균)",
    "칼륨 섭취량(mg)","칼슘 섭취량(mg)","콜레스테롤 섭취량(mg)","탄수화물 섭취량(g)",
    "티아민 섭취량(mg)","평소 하루 앉아서 보내는 시간(분)","평소 하루 앉아서 보내는 시간(시간)",
    "포화지방산 섭취량(g)","허리둘레","헤마토크리트","헤모글로빈","혈중요소질소","혈중크레아티닌"
]


model = SentenceTransformer("snunlp/KR-SBERT-V40K-klueNLI-augSTS")
attribute_embeddings = [model.encode(attr, convert_to_tensor=True) for attr in attributes]


def extract_info(user_input):
    from soynlp.tokenizer import RegexTokenizer
    tokenizer = RegexTokenizer()
    tokens = tokenizer.tokenize(user_input)

    
    age_match = re.search(r"(\d{1,3})\s*(살|세)", user_input)
    age = int(age_match.group(1)) if age_match else None

    
    gender = None
    if "남" in user_input:
        gender = "남성"
    elif "여" in user_input:
        gender = "여성"

    
    numbers = re.findall(r"(\d+\.?\d*)", user_input)
    value = None
    if numbers:
        age_pos = None
        for match in re.finditer(r"(\d{1,3})\s*(살|세)", user_input):
            age_pos = match.end()  
        if age_pos:
            post_age_numbers = [float(n) for n in numbers if user_input.find(n) > age_pos]
            if post_age_numbers:
                value = post_age_numbers[-1]
        else:
            value = float(numbers[-1])


    best_score = -1
    best_attr = None
    for token in tokens:
        qvec = model.encode(token, convert_to_tensor=True)
        sims = [util.pytorch_cos_sim(qvec, emb).item() for emb in attribute_embeddings]
        score = max(sims)
        if score > best_score:
            best_score = score
            best_attr = attributes[sims.index(score)]

    return {
        "age": age,
        "gender": gender,
        "attribute_input": tokens,
        "matched_attribute": best_attr,
        "value": value
    }


def get_statistics(df, age, gender, matched_attribute):
    df['연령대'] = df['연령대'].astype(int)
    target_age = min(df['연령대'].unique(), key=lambda x: abs(x - (age // 10) * 10))

    subset = df[(df['연령대'] == target_age) &
                (df['성별'] == gender) &
                (df['속성'] == matched_attribute)]

    if subset.empty:
        print("해당 조건에 맞는 데이터가 존재X.")
        return None

    row = subset.iloc[0]
    stats = {
        "연령대": target_age,
        "성별": gender,
        "속성": matched_attribute,
        "count": row["count"],
        "mean": row["mean"],
        "std": row["std"],
        "25%": row["25%"],
        "50%": row["50%"],
        "75%": row["75%"]
    }
    return stats


def analyze_user_input(user_input, df):
    info = extract_info(user_input)

    age = info.get("age")
    gender = info.get("gender")
    matched_attribute = info.get("matched_attribute")
    value = info.get("value")

    #print("📥 추출된 정보:", info)

    stats = get_statistics(df, age, gender, matched_attribute)
    if stats is None:
        print("해당 조건의 통계 데이터 X")
        return None

    stats["user_value"] = value
    return stats, info



def generate_statistical_response(stats):
    mean = stats["mean"]
    std = stats["std"]
    q25 = stats["25%"]
    q50 = stats["50%"]
    q75 = stats["75%"]
    val = stats["user_value"]
    count = int(stats["count"]) if not pd.isna(stats["count"]) else "N/A"

    # 1️⃣ 기본 통계 계산
    diff = val - mean
    z = diff / std if std != 0 else 0
    range_1sigma = (mean - std, mean + std)
    range_2sigma = (mean - 2 * std, mean + 2 * std)

    
    if abs(z) <= 1:
        z_level = "평균적인 수준이에요."
    elif abs(z) <= 2:
        z_level = "평균에서 약간 벗어난 수준이에요."
    else:
        z_level = "통계적으로 매우 드문 수준이에요 (이상치로 볼 수 있습니다)."

    # 3️⃣ 분위수 기반 판정
    if val < q25:
        q_level = "하위 25% 이하에 속합니다."
    elif val < q50:
        q_level = "평균 이하 수준이에요."
    elif val < q75:
        q_level = "평균 이상 수준이에요."
    else:
        q_level = "상위 25% 이상에 속합니다."


    disease_thresholds = {
        "공복혈당": {"disease": "당뇨병", "threshold": 126, "compare": ">=", "unit": "mg/dL"},
        "당화혈색소": {"disease": "당뇨병", "threshold": 6.5, "compare": ">=", "unit": "%"},
        "총콜레스테롤": {"disease": "고지혈증", "threshold": 240, "compare": ">=", "unit": "mg/dL"},
        "중성지방": {"disease": "고지혈증", "threshold": 200, "compare": ">=", "unit": "mg/dL"},
        "요산": {"disease": "통풍", "threshold": 7.0, "compare": ">=", "unit": "mg/dL"},
        "헤모글로빈": {"disease": "빈혈", "threshold": 12.0, "compare": "<", "unit": "g/dL"},
        "1차 수축기 혈압": {"disease": "고혈압", "threshold": 140, "compare": ">=", "unit": "mmHg"},
        "2차 수축기 혈압": {"disease": "고혈압", "threshold": 140, "compare": ">=", "unit": "mmHg"},
        "3차 수축기 혈압": {"disease": "고혈압", "threshold": 140, "compare": ">=", "unit": "mmHg"},
        "최종 수축기 혈압(2,3차 평균)": {"disease": "고혈압", "threshold": 140, "compare": ">=", "unit": "mmHg"},
        "최종 이완기 혈압(2,3차 평균)": {"disease": "고혈압", "threshold": 90, "compare": ">=", "unit": "mmHg"}
    }

   
    disease_comment = ""
    attr = stats["속성"]

    if attr in disease_thresholds:
        crit = disease_thresholds[attr]
        disease_name = crit["disease"]
        unit = crit["unit"]
        threshold = crit["threshold"]

        if crit["compare"] == ">=" and val >= threshold:
            disease_comment = f"⚠️ 또한 이 수치는 {disease_name} 진단 기준({threshold}{unit})을 초과하여 {disease_name} 위험이 있을 수 있습니다."
        elif crit["compare"] == "<" and val < threshold:
            disease_comment = f"⚠️ 또한 이 수치는 {disease_name} 진단 기준({threshold}{unit})보다 낮아 {disease_name} 가능성이 있습니다."

    
    explanation = (
        f"📊 국민건강영양조사(KNHANES) 데이터 기반으로, "
        f"{stats['연령대']}대 {stats['성별']} {count}명을 기준으로 분석한 결과입니다.\n\n"
        f"해당 연령·성별 집단의 '{attr}' 평균은 {mean:.2f}, 표준편차는 {std:.2f}입니다.\n"
        f"➡️ ±1σ (정상 범위 약 68%): {range_1sigma[0]:.2f} ~ {range_1sigma[1]:.2f}\n"
        f"➡️ ±2σ (확장 정상 범위 약 95%): {range_2sigma[0]:.2f} ~ {range_2sigma[1]:.2f}\n\n"
        f"당신의 측정값은 {val:.2f}로, 평균보다 {abs(diff):.2f}만큼 "
        f"{'높' if diff > 0 else '낮'}습니다.\n"
        f"이는 표준편차 기준 약 {abs(z):.1f}배 차이로 {z_level}\n"
        f"또한 분위수 기준으로 보면 {q_level}\n\n"
        f"{disease_comment if disease_comment else '현재 수치는 통계적으로 정상 범위 내에 있습니다.'}\n\n"
        f"이 해석은 표준정규분포의 ±1σ(68%) 및 ±2σ(95%) 구간을 기준으로 산출되었습니다."
    )

    
    explanation = explanation.replace("\\n", "\n")

    #print(explanation)
    return explanation


user_input = "나는 26살 남성인데 당혈색소 6.9야 어떤편이야?" # 이 부분을 웹에서 input으로 실제로 받아야함
result, user = analyze_user_input(user_input, df)
response = generate_statistical_response(result)             #웹에서 이 문장을 출력시켜야함

print(response)






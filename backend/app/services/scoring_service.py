from typing import Dict, Tuple
import numpy as np
import pandas as pd
from ..schemas.assessment import PsychometricScoresSchema, SeverityCategorySchema

# Official DASS-21 Item Index Classifications (Lovibond & Lovibond, 1995)
DASS21_SUBGROUPS = {
    "depression": [3, 5, 10, 13, 16, 17, 21],
    "anxiety": [2, 4, 7, 9, 15, 19, 20],
    "stress": [1, 6, 8, 11, 12, 14, 18],
}

def calculate_psychometric_scores(
    phq9: Dict[str, int],
    gad7: Dict[str, int],
    dass21: Dict[str, int]
) -> PsychometricScoresSchema:
    """
    Computes standard psychometric battery total scores using NumPy/Pandas.
    Does not invent scoring rules or alter standard clinical sum mechanics.
    """
    # PHQ-9 sum
    phq9_vals = np.array([phq9.get(str(i), 0) for i in range(1, 10)], dtype=int)
    phq9_total = int(np.sum(phq9_vals))

    # GAD-7 sum
    gad7_vals = np.array([gad7.get(str(i), 0) for i in range(1, 8)], dtype=int)
    gad7_total = int(np.sum(gad7_vals))

    # DASS-21 subscale sums
    dass_series = pd.Series({int(k): v for k, v in dass21.items()})
    
    dass21_dep = int(dass_series.reindex(DASS21_SUBGROUPS["depression"]).fillna(0).sum())
    dass21_anx = int(dass_series.reindex(DASS21_SUBGROUPS["anxiety"]).fillna(0).sum())
    dass21_str = int(dass_series.reindex(DASS21_SUBGROUPS["stress"]).fillna(0).sum())

    return PsychometricScoresSchema(
        phq9_total=phq9_total,
        gad7_total=gad7_total,
        dass21_depression=dass21_dep,
        dass21_anxiety=dass21_anx,
        dass21_stress=dass21_str,
    )

def get_preliminary_severity_summaries(scores: PsychometricScoresSchema) -> list[SeverityCategorySchema]:
    """
    Assigns published psychometric preliminary screening benchmark categories.
    These are descriptive preliminary screening categories, NOT AI model predictions.
    """
    # 1. Depression (PHQ-9 Standard Cutoffs: 0-4 None, 5-9 Mild, 10-14 Moderate, 15-19 Moderately Severe, 20-27 Severe)
    if scores.phq9_total >= 20:
        dep_sev = "Severe"
    elif scores.phq9_total >= 15:
        dep_sev = "Moderately Severe"
    elif scores.phq9_total >= 10:
        dep_sev = "Moderate"
    elif scores.phq9_total >= 5:
        dep_sev = "Mild"
    else:
        dep_sev = "Normal / Minimal"

    # 2. Anxiety (GAD-7 Standard Cutoffs: 0-4 Minimal, 5-9 Mild, 10-14 Moderate, 15-21 Severe)
    if scores.gad7_total >= 15:
        anx_sev = "Severe"
    elif scores.gad7_total >= 10:
        anx_sev = "Moderate"
    elif scores.gad7_total >= 5:
        anx_sev = "Mild"
    else:
        anx_sev = "Normal / Minimal"

    # 3. Stress (DASS-21 Stress Subscale Standard Cutoffs: 0-7 Normal, 8-9 Mild, 10-12 Moderate, 13-16 Severe, 17+ Extremely Severe)
    if scores.dass21_stress >= 17:
        str_sev = "Extremely Severe"
    elif scores.dass21_stress >= 13:
        str_sev = "Severe"
    elif scores.dass21_stress >= 10:
        str_sev = "Moderate"
    elif scores.dass21_stress >= 8:
        str_sev = "Mild"
    else:
        str_sev = "Normal / Minimal"

    return [
        SeverityCategorySchema(
            condition="Depression",
            score=scores.phq9_total,
            max_score=27,
            preliminary_severity=dep_sev,
            scale_used="PHQ-9 Screening Scale",
            benchmark="Cutoff: 0-4 Normal, 5-9 Mild, 10-14 Moderate, 15-19 Mod. Severe, 20-27 Severe",
        ),
        SeverityCategorySchema(
            condition="Anxiety",
            score=scores.gad7_total,
            max_score=21,
            preliminary_severity=anx_sev,
            scale_used="GAD-7 Screening Scale",
            benchmark="Cutoff: 0-4 Minimal, 5-9 Mild, 10-14 Moderate, 15-21 Severe",
        ),
        SeverityCategorySchema(
            condition="Stress",
            score=scores.dass21_stress,
            max_score=21,
            preliminary_severity=str_sev,
            scale_used="DASS-21 Stress Subscale",
            benchmark="Cutoff: 0-7 Normal, 8-9 Mild, 10-12 Moderate, 13-16 Severe, 17+ Ext. Severe",
        ),
    ]

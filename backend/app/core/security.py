import re

def sanitize_string(text: str, max_length: int = 100) -> str:
    """Strip malicious control characters and limit length."""
    if not text:
        return ""
    # Strip HTML tags or script elements
    cleaned = re.sub(r"<[^>]*>", "", text)
    # Strip dangerous characters
    cleaned = re.sub(r"[\r\n\t]", " ", cleaned).strip()
    return cleaned[:max_length]

def generate_anonymized_assessment_id() -> str:
    """Generate non-identifiable, sequential or timestamped research assessment IDs."""
    import time
    import random
    ts = int(time.time())
    rand_suffix = random.randint(1000, 9999)
    return f"ASM-{ts}-{rand_suffix}"

import os
import json

# 이미지 생성 프롬프트 정의
image_prompts = [
    {
        "path": "/home/ubuntu/lineage-proxy-service/client/public/images/hero-bg.jpg",
        "prompt": "Dark fantasy cinematic background, abyss black and dark grey smoke, subtle golden particles floating, epic atmosphere, lineage style, heavy and serious mood, 8k resolution, highly detailed texture, no text",
        "aspect_ratio": "landscape"
    },
    {
        "path": "/home/ubuntu/lineage-proxy-service/client/public/images/sword-loading.jpg",
        "prompt": "A legendary medieval sword glowing with red aura, stuck in dark ground, cinematic lighting, dramatic shadows, loading bar concept, dark fantasy style, photorealistic, 8k",
        "aspect_ratio": "landscape"
    },
    {
        "path": "/home/ubuntu/lineage-proxy-service/client/public/images/trusted-illustration.jpg",
        "prompt": "3D illustration of a blue chat bubble with 5 golden stars, glowing effect, dark blue background, cyber security theme, high tech style, sleek and modern, 8k",
        "aspect_ratio": "landscape"
    },
    {
        "path": "/home/ubuntu/lineage-proxy-service/client/public/images/security-illustration.jpg",
        "prompt": "3D illustration of cyber security shield and lock, digital data flow, dark blue and cyan color scheme, high tech protection concept, isometric view, sleek and modern, 8k",
        "aspect_ratio": "landscape"
    },
    {
        "path": "/home/ubuntu/lineage-proxy-service/client/public/images/live-status.jpg",
        "prompt": "Futuristic digital dashboard interface, dark blue technology background, data visualization, cybernetic lines and nodes, abstract tech pattern, 8k",
        "aspect_ratio": "landscape"
    }
]

# JSON 파일로 저장 (실제 도구 호출을 위해)
with open('/home/ubuntu/lineage-proxy-service/asset_prompts.json', 'w') as f:
    json.dump(image_prompts, f, indent=2)

print("Asset prompts saved to asset_prompts.json")

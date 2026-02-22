import cv2
import os

# Define input and output directories
input_dir = 'images_tuloan/done'
output_dir = 'images_tuloan/prewedding'
thumb_dir = 'images_tuloan/prewedding_thumb'

os.makedirs(output_dir, exist_ok=True)
os.makedirs(thumb_dir, exist_ok=True)

MAX_SIZE = 600  # max width or height

def resize_keep_ratio(image, max_size):
    h, w = image.shape[:2]
    scale = max_size / max(h, w)

    # Nếu ảnh nhỏ hơn max_size thì giữ nguyên
    if scale >= 1:
        return image

    new_w = int(w * scale)
    new_h = int(h * scale)
    return cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)

# Process images
for idx, filename in enumerate(os.listdir(input_dir), start=1):
    input_path = os.path.join(input_dir, filename)

    image = cv2.imread(input_path)
    if image is None:
        continue

    # Resize giữ tỉ lệ cho ảnh chính
    resized = resize_keep_ratio(image, MAX_SIZE)
    output_path = os.path.join(output_dir, f'image{idx}.jpg')
    cv2.imwrite(output_path, resized)

    # Resize giữ tỉ lệ cho thumbnail (cũng max 600)
    thumb = resize_keep_ratio(image, MAX_SIZE)
    thumb_path = os.path.join(thumb_dir, f'thumb{idx}.jpg')
    cv2.imwrite(thumb_path, thumb)
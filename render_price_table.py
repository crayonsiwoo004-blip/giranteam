from html2image import Html2Image
import os

hti = Html2Image(output_path='/home/ubuntu/giranteam', size=(800, 1200))

html_file_path = '/home/ubuntu/giranteam/price_table_image.html'
output_image_path = 'price_table.png'

# HTML 파일이 존재하는지 확인
if not os.path.exists(html_file_path):
    print(f"Error: HTML file not found at {html_file_path}")
else:
    try:
        hti.screenshot(html_file=html_file_path, save_as=output_image_path)
        print(f"Successfully rendered {html_file_path} to {output_image_path}")
    except Exception as e:
        print(f"Error rendering HTML to image: {e}")

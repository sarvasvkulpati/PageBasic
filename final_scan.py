from scan import DocScanner

def final_scanner():
    im_file_path = 'img.jpg'

    scanner = DocScanner(False)

    get_ext = lambda f: os.path.splitext(f)[1].lower()

    if im_file_path:
        scanner.scan(im_file_path)

final_scanner()
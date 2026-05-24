import re,sys
text = open('index.html','r',encoding='utf-8').read()
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', text, flags=re.IGNORECASE)
print('script count', len(scripts))
for i,s in enumerate(scripts,1):
    try:
        compile(s, f'script{i}.js', 'exec')
        print(f'script{i}: ok')
    except Exception as e:
        print(f'script{i}: {e}')
        if hasattr(e, 'lineno'):
            lines = s.splitlines()
            for j in range(max(0, e.lineno-3), min(len(lines), e.lineno+2)):
                print(f'{j+1}: {lines[j]}')
        sys.exit(1)

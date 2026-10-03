"""Import approved Romanian About prose without importing document instructions.

Run with a local PDF path and a Python runtime providing pypdf. This is a content
provenance helper, not a build dependency. Translations are reviewed separately.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path
from pypdf import PdfReader

reader = PdfReader(sys.argv[1])
pages = []
for page in reader.pages[12:19]:
    text = unicodedata.normalize('NFKC', ' '.join(page.extract_text().split()))
    text = re.sub(r'valeriastanculea.ro \| Dosar Master pentru implementare IT\s*', '', text)
    text = re.sub(r'Dosar Master v1.0 • pagina \d+', '', text)
    pages.append(text)
text = ' '.join(pages)

def paragraphs(value):
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-ZĂÂÎȘȚ])', value.strip())
    return [' '.join(sentences[i:i+2]) for i in range(0, len(sentences), 2)]

titles = ['Despre mine', 'Ce mă definește profesional', 'Cum lucrez', 'Misiunea mea',
          'Valorile care îmi ghidează munca', 'Pregătire și experiență profesională',
          'Dincolo de activitatea clinică']
ids = ['despre-mine', 'identitate', 'cum-lucrez', 'misiune', 'valori', 'pregatire', 'dincolo']
sections = []
for index in [0, 1, 2, 3, 6]:
    match = re.search(r'Secțiunea '+str(index+1)+r' — '+re.escape(titles[index])+r' CONȚINUT PUBLIC (.*?) Sursă:', text)
    if not match:
        raise ValueError(f'Missing source section {index+1}')
    body = re.sub(r'\[Vezi serviciile\] \[Contactează-mă\]', '', match[1]).strip()
    sections.append({'id': ids[index], 'title': titles[index], 'paragraphs': paragraphs(body)})

professional = text.split('Pregătirea mea profesională s-a construit', 1)[1].split('Ce spun colegii despre colaborarea cu mine', 1)[0]
professional = 'Pregătirea mea profesională s-a construit'+professional
professional = re.sub(r'Sursă: Sectiunea_6_Pregatire_si_experienta_profesionala.docx', '', professional)
professional = professional.replace('[Vezi toate cursurile și formările]', '')
headings = ['Studii academice și formări de lungă durată', 'Experiență profesională',
 'Practică și experiențe formative', 'În perioada facultății am fost implicată și în activități academice și sociale:',
 'Supervizare și intervizare colegială', 'Supervizare profesională', 'Participare la grupuri de intervizare',
 'Facilitarea și co-crearea unor spații de intervizare', 'Formare profesională continuă', 'Afilieri și roluri profesionale']
parts = re.split('('+ '|'.join(map(re.escape, headings))+')', professional)
groups = []
for index in range(1, len(parts), 2):
    chunk = parts[index+1].strip()
    split = chunk.split('●')
    groups.append({'title': parts[index], 'paragraphs': paragraphs(split[0]) if split[0].strip() else [],
                   'items': [item.strip().rstrip(';') for item in split[1:]], 'continuation': []})
experience = groups[1]
first, remaining = experience['items'][6].split('. În ianuarie', 1)
last, closing = experience['items'][12].split('. Experiența mea', 1)
private_items = experience['items'][7:12] + [last + '.']
experience['items'] = experience['items'][:6] + [first + '.']
experience['continuation'] = [
    {'paragraphs': ['În ianuarie' + remaining], 'items': private_items},
    {'paragraphs': ['Experiența mea' + closing], 'items': []},
]
groups[3]['paragraphs'].insert(0, groups[3]['title'])
groups[3]['title'] = 'Activități academice și sociale'
first, remaining = groups[7]['items'][-1].split('. ', 1)
groups[7]['items'][-1] = first + '.'
groups[7]['continuation'] = [{'paragraphs': [remaining], 'items': []}]
professional_section = {'id': 'pregatire', 'title': titles[5], 'paragraphs': paragraphs(parts[0]), 'groups': groups}
result = {'sections': sections, 'professional': professional_section}
destination = Path('src/locales/ro/master-about.json')
destination.write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'Imported {len(sections)} prose sections and {len(groups)} professional groups.')

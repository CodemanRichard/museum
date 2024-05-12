import pandas as pd

df = pd.read_excel('博物馆数据精选.xlsx')

libraries = set()

num_rows = df.shape[0]

for i in range(num_rows):
    libraries.add(df.iloc[i]['博物馆'])

for library in libraries:
    print(library)
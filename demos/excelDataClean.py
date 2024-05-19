import pandas as pd
import http.client, urllib.parse
import json

conn = http.client.HTTPConnection('api.positionstack.com')

# 读取Excel文件到DataFrame
file_path = '博物馆数据精选.xlsx'
sheet_name = 'Sheet1'
print('Opening Excel file...')
df = pd.read_excel(file_path, sheet_name=sheet_name)

# 指定要修改的列名
# target_column = 'test'

print('Modifying DataFrame...')
# 遍历DataFrame的每一行，并修改目标列中的值
for index, row in df.iterrows():
    print(f"Processing row {index+2}...") # 从第二行开始，因为第一行是标题行
    # 修改列中的值，可以根据需要进行更复杂的操作
    # df.at[index, target_column] = f"New Value {index+2}"
    source = row['来源地']
    idx = source.find('(')
    if idx != -1:
        source = source[:idx]
    if source=='——' or source=='':
        df.at[index, 'latitude'] = '——'
        df.at[index, 'longitude'] = '——'
        df.at[index, 'country'] = '——'
        continue
    params = urllib.parse.urlencode({
        'access_key': 'a4396d9352f38056502efc54aa52d2a4',
        'query': source,
        'limit': 1,
    })
    conn.request('GET', '/v1/forward?{}'.format(params))
    res = conn.getresponse()
    data = res.read()
    data = data.decode('utf-8')
    data = json.loads(data)
    try:
        latitude = data["data"][0]["latitude"]
        longitude = data["data"][0]["longitude"]
        country = data["data"][0]["country"]
        df.at[index, 'latitude'] = latitude
        df.at[index, 'longitude'] = longitude
        df.at[index, 'country'] = country
    except:
        print("Problem source: ", source)
        print("Problem data: ", data)
        df.at[index, 'latitude'] = '——'
        df.at[index, 'longitude'] = '——'
        df.at[index, 'country'] = '——'
        continue

print('Writing DataFrame back to Excel file...')
# 将修改后的DataFrame写回到Excel文件
with pd.ExcelWriter(file_path, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
    df.to_excel(writer, sheet_name=sheet_name, index=False)

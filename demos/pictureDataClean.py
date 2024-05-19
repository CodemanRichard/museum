# 用于对图片数据进行数据清洗

import pandas as pd
from tqdm import tqdm

import os

repetitive_ids = {1440, 2185, 2208, 3201, 3228, 654, 3156, 6359, 100, 106, 1331, 1333, 153, 154,
                  155, 1617, 167, 173, 178, 208, 2122, 2128, 2247, 2286, 2288, 230, 294, 30,
                  3275, 3278, 3370, 5936, 5939, 5940, 5948, 633, 654, 7204, 244, 245, 42,
                  2842, 2843, 2844, 3336, 3352}

# df = pd.read_excel('博物馆数据精选.xlsx')
# for index, row in df.iterrows():
#     id_value = row['ID']

def get_repetitive_ids():
    repetitive_ids_1 = set()
    for index, row in df.iterrows():
        id_value = row['ID']
        if id_value in repetitive_ids_1:
            if id_value not in repetitive_ids:
                print(f'漏网之鱼：{id_value}')
        else:
            repetitive_ids_1.add(id_value)

def rename_files(directory):
    for filename in os.listdir(directory):
        # 检查是否是文件
        if os.path.isfile(os.path.join(directory, filename)):
            # 找到第一个下划线的位置
            underscore_index = filename.find('_')
            if underscore_index != -1:
                # 只保留第一个下划线前面的部分
                new_name = filename[:underscore_index] + os.path.splitext(filename)[1]
                # 获取旧文件的完整路径
                old_file = os.path.join(directory, filename)
                # 获取新文件的完整路径
                new_file = os.path.join(directory, new_name)
                # 重命名文件
                os.rename(old_file, new_file)
                print(f'Renamed "{filename}" to "{new_name}"')

# 设置要重命名文件的目录
directory = './pictures'  # 当前目录
rename_files(directory)
# get_repetitive_ids()
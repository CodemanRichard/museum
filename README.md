# 可视化课程设计

此次参加 [ChinaVis 2024](https://chinavis.org/2024/challenge.html) 的数字人文赛道。

## 环境配置

`pip install flask`

`pip install flask-cors`

`pip install pandas`

`pip install openpyxl`

## 运行方式

1. 运行`npm --legacy-peer-deps install`确定已安装所有依赖

2. 运行`python server.py`打开后端服务器

3. 运行`npm start`打开前端应用

## 成员分工

- 张天瑞：页面设计，地图，藏品信息

- 胡基宸：

1. 馆藏最多的前几个国家，和总馆藏数量的统计视图（使用“来源地”数据）

2. 关键词词云（使用到“Metadata”字段，Metadata有中文和英文版，可以都做一下）

- 张鹤龄：展示生产年代的图（各个年代的热度）（使用“起始年”数据）

- 郑利勤：来源地热度图，结合地图展示（使用”来源地“数据）

## 注意事项

- 请将解压后的数据文件夹中的数据移动到`data`文件夹中，且不要修改文件夹中任何文件的名称。文件路径为`museum/data/博物馆数据精选.xlsx`和`museum/data/pictures`

- 每张图都是点击按钮，弹出视窗，根据选中的博物馆（或者”全部“）来进行绘制。图表应紧凑、大小适中，弹窗比图标略大一些即可，不要太挤也不要太空。选中博物馆的组件可以商量一下然后使用统一的样式

- 如果有需要访问本地文件的情况，请自行向后端添加代码与接口，可参考[library](https://github.com/CodemanRichard/library)项目中的`server.py`以及前端中的接口调用

- 依然使用react框架，组件名称自定

## 参考资料

[各种词云](https://zhuanlan.zhihu.com/p/640814001)

[根据地名获取经纬度的api](https://positionstack.com/)

[图表样式的参考视频](https://www.bilibili.com/video/BV19p4y1w7dH/?vd_source=60f6847f59e6e86038eb1f8d8f799383)

[数据下载](https://jbox.sjtu.edu.cn/l/21OYOI)

[好看的组件](https://ant.design/index-cn)

关于弹窗和地图的实现可以参考`./demo`中的文件

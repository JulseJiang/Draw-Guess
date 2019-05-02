﻿# Draw-Guess
这是一款基于html5的你画我猜小游戏，也可以作为远程会议的白板插件使用。

## 主要模块是
画板，聊天面板
## 已完成部分功能描述
各用户可以在一个白板上互动，一起绘画，能切换画笔色彩，还有一键清屏的功能。
可以使用鼠标控制，也可以触摸控制。
## 预期使用场景

### 使用场景一：你画我猜小游戏
      步骤描述：<br>
1. 确定题目（系统出题或者自主出题）<br>
                      2. 用户作画（个人作画或群体协同作画）<br>
                      3.其他用户在聊天面板闲聊或者猜答案<br>
                      4.出现正确答案时，提示挑战成功<br>

### 使用场景二：互联网稿纸--网络课程传授知识，便于公式的书写，互动教学，书法领域等。

      步骤描述：1.主讲人公布草稿纸地址
  	      2.听课人进入该地址
	      3.主讲人主讲时可以随时开启或关闭互动模式（画板或者聊天面板是否允许听客人使用）
	      4.听课人可以随时保存当前稿纸图片，也可以分享给他人
	      5.自动保存每一次清屏前的画面到聊天记录中

* 使用场景三：私人定制小游戏-抽取游戏共性，然后组合创造更有意思的小游戏
      步骤描述：1.为游戏画背景（如棋盘，太空）
	      2.绘制游戏主人公（如黑棋，飞机）
           	      3.绘制游戏对手（如白棋，障碍物）
 	      4.添加游戏算法
	      5.制定移动，消除规则
	      6.多人游戏（webSocket)
                      7.单机游戏（机器学习多人游戏的策略之后）
         	      8.内嵌到其他平台

主要技能：websocket通讯机制，canvas绘图原理，node.js搭建服务器，机器学习。
##########################################
目前完成的功能：
       鼠标、触屏控制画笔
       画笔切换颜色
       设定画笔形状为铅笔
       多人协作绘画
       清屏操作
待完成的功能：
       将node.js搭建的服务器部署到云端...

       

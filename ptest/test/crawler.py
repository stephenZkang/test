#coding=utf-8
'''
Created on 2016-8-19
实现简单的爬虫功能
    主要用到的包有正则re、请求urllib
@author: qiao123
'''
import urllib
import re

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html

def getImage(html):
    reg = r'src="(.+?\.jpg)"'
    imgre = re.compile(reg)
    imglist = re.findall(imgre,html)
    x = 0
    for key in imglist:
        urllib.urlretrieve(key, '%s.jpg' % x)
        x+=1

        
url = 'http://tieba.baidu.com/p/4745979872'
html = getHtml(url)
print html
print getImage(html)

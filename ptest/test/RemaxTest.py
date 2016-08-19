#coding=utf-8
'''
Created on 2016-8-19

@author: qiao123
'''
import re
from audioop import lin2adpcm
from _ast import Num

# re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None；而re.search匹配整个字符串，直到找到一个匹配

c = 'www.baidu.com'
print re.match('www',c,).span() #在起始位置匹配
print re.match('com',c, 0)

print re.search('www', c).span()
print re.search('com', c).span()

line= 'Cats are smarter than dogs'

searchObj = re.search(r'(.*) are (.*?) .*', line, re.M|re.I)
if searchObj:
    print 'searchObj.group():',searchObj.group()
    print 'searchObj.group(1):',searchObj.group(1)
    print 'searchObj.group(2):',searchObj.group(2)
else:
    print 'Nothing found'
    
    
phone = '2004-959-559 #This is Phone Number'
num = re.sub(r'#.*$', '', phone)
print 'Phone Num:',num
num = re.sub(r'\D', '', phone)
print 'Phone Num:',num

    

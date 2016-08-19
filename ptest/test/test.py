#!D:\software\python\python.exe
#coding=utf-8
'''
Created on 2016-8-19

@author: qiao123
'''
import os

print 'Content-type:text/html'
print
print '<meta charset=\"utf-8\">'
print '<b>环境变量</b>'
print '<ul>'

for key in os.environ.keys():
    print "<li><span style='color:green'>%30s</span>:%s</li>"%(key,os.environ[key])

print '</ul>'

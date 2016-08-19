#!D:\software\python\python.exe
#coding=utf-8
'''
PYTHON CGI可以放到apache下运行
    hello.py 必须以[#!D:\software\python\python.exe]开头
    Apache下必须配置CGI
        1、ScriptAlias /cgi-bin/ "D:/software/Apache2.2/cgi-bin/"
        2、<Directory "D:/software/Apache2.2/cgi-bin">
                AllowOverride None
                Options +ExecCGI
                Order allow,deny
                Allow from all
            </Directory>
        3、<IfModule mime_module>中放开 AddHandler cgi-script .cgi .pl .py
        4、hello.py放到Apache的cgi-bin目录下
        5、访问地址：http://localhost:/cgi-bin/hello.py
        
Created on 2016-8-19

@author: qiao123
'''

print "Content-type:text/html"
print                               # 空行，告诉服务器结束头部
print '<html>'
print '<head>'
print '<meta charset="utf-8">'
print '<title>Hello Word - 我的第一个 CGI 程序！</title>'
print '</head>'
print '<body>'
print '<h2>Hello Word! <br/>我是来自菜鸟教程的第一CGI程序</h2>'
print '</body>'
print '</html>'

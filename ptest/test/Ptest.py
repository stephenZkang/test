#coding=utf-8
'''
Created on 2016-8-9

@author: qiao123
'''
# print "hello,world,中国";
# 
# i = ['a','b']
# l = [1,2]
# 
# print dict([i,l])
# 
# if 1==1:
#     print 'hello,world'
#     
# i = [1,2,3,4]

# for v in i:
#     if v == 1:
#         print 'hello world'
#     elif v ==2:
#         print 'yes or no'
#     elif v ==3:
#         print 'very good'
#     else:
#         print 'pretty girl'


#命令行输入 如：hello world
#s = raw_input("请输入:")
#print s

#输入表达式    如：1+2 结果为3
#s = input("欢迎：")
#print s

#打开关闭文件
# fo = open("d://log.txt","r")
# print "文件名",fo.name
# 
# #读文件
# s = fo.read(20)
# print s
# 
# fo.close()

#异常处理
# try:
#     nfile = open("d://log.txt","r")
# 
#     s = nfile.read(10)
#     print s
# except IOError:
#     print "读文件失败"
# else:
#     nfile.close()
    
    
#文件夹操作
# import os
# 
# f = os._exists("d:/test")
# if f:
#     os.rmdir("d://test")
#     
# if f:
#     os.mkdir("d:/test")

#创建函数

# def add(a,b):
#     "加法"
#     ++a
#     s = a+b
#     return s
# 
# print add(1,2)
# 
# def reduc(a,b):
#     "减法"
#     s = add(a,b)-a
#     return s
# 
# print reduc(2,3)
# 
# a = 2;b =3
# 
# print add(a, b)
# print a

# PYTHON 全是引用传值
# def changeme(mylist):
#     tmp = []
#     tmp.append(mylist)
#     tmp.append([1,2,3,4])
#     print "函数内取值：",tmp
#     return
# 
# mylist = [1,2,3,4]
# changeme(mylist)
# print mylist

print 2>>1
print 2<<1
print 20<<2
print 20>>1
print 30>>1

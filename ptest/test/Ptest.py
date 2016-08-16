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
try:
    nfile = open("d://log.txt","r")

    s = nfile.read(10)
    print s
except IOError:
    print "读文件失败"
else:
    nfile.close()
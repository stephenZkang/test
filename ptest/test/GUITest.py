#coding=utf-8
'''
Created on 2016-8-19
GUI编程
    主要使用的包有Tkinter、WXPYTHON PYQT
    Tkinter可以直接使用
    
@author: qiao123
'''
import Tkinter

#top = Tkinter.Tk()
#top.mainloop()

root = Tkinter.Tk()
li = ['Java','C','Python','SQL']
move = ['CSS','JQuery','Bootstrap']

# listb = Tkinter.Listbox(root)
# lista = Tkinter.Listbox(root)
# for key in li:
#     listb.insert(0,key)
# 
# for key in move:
#     lista.insert(0,key)
# 
# listb.grid()
# lista.grid()

btn = Tkinter.Button(root,text='保存',width=20,bg='white')
btn.pack()
root.mainloop()

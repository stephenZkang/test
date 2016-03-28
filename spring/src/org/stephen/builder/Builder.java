package org.stephen.builder;

import java.util.ArrayList;
import java.util.List;

import org.stephen.factory.MailSender;
import org.stephen.factory.Sender;
import org.stephen.factory.SmsSender;

/**
 * ������ģʽ
 * @author qiao123
 *	������ģʽ���ܶ๦�ܼ��ɵ�һ�����
 *	�������Դ�����Ƚϸ��ӵĶ���������
 *	�빤��ģʽ��������ǣ�����ģʽ��ע��
 *	�Ǵ���������Ʒ����������ģʽ���ע
 *	�������϶��󣬶�����֡�
 *	��ˣ���ѡ�񹤳�ģʽ���ǽ�����ģʽ����ʵ���������
 */
public class Builder {
	
	private List<Sender> senders = new ArrayList<Sender>();
	
	public void productMail(int count){
		for (int i = 0; i < count; i++) {
			senders.add(new MailSender());
		}
	}
	
	
	public void productSmS(int count){
		for (int i = 0; i < count; i++) {
			senders.add(new SmsSender());
		}
	}
}

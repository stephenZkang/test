package org.stephen.composite;

/**
 * 组合模式
 * @author qiao123
 *	将多个对象组合在一起进行操作，常用于表示树形结构中，例如二叉树，数等
 */
public class Tree {
	TreeNode root =null;

	public Tree(String name) {
		root = new TreeNode(name);
	}
	
	public static void main(String[] args) {
		Tree tree = new Tree("A");
		TreeNode node = new TreeNode("B");
		TreeNode node2 = new TreeNode("C");
		tree.root.add(node);
		node.add(node2);
		System.out.println("build tree finished");
	}
	
}

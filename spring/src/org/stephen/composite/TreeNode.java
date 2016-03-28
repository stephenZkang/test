package org.stephen.composite;

import java.util.Enumeration;
import java.util.Vector;

public class TreeNode {
	private String name;
	
	private TreeNode parent;
	
	private Vector<TreeNode> children = new Vector<TreeNode>();
	public TreeNode(String name) {
		this.name = name;
	}
	
	public void add(TreeNode node){
		children.add(node);
	}
	
	public void delete(TreeNode node){
		children.remove(node);
	}
	
	public Enumeration<TreeNode> getChildRen(){
		return children.elements();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TreeNode getParent() {
		return parent;
	}

	public void setParent(TreeNode parent) {
		this.parent = parent;
	}

	
}

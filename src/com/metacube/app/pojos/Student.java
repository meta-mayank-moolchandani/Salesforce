package com.metacube.app.pojos;

public class Student {
	private String First_Name__c;
	private String Last_Name__c;
	private String email__c;
	private String Class__c;

	public String getClass__c() {
		return Class__c;
	}
	public void setClass__c(String class__c) {
		Class__c = class__c;
	}


	public String getFirst_Name__c() {
		return First_Name__c;
	}
	public void setFirst_Name__c(String first_Name__c) {
		First_Name__c = first_Name__c;
	}
	public String getLast_Name__c() {
		return Last_Name__c;
	}
	public void setLast_Name__c(String last_Name__c) {
		Last_Name__c = last_Name__c;
	}
	public String getEmail__c() {
		return email__c;
	}
	public void setEmail__c(String email__c) {
		this.email__c = email__c;
	}
	
	@Override
	public String toString() {
		return "Student [First_Name__c=" + First_Name__c + ", Last_Name__c="
				+ Last_Name__c + ", email__c=" + email__c + "]";
	}

}

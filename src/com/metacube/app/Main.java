package com.metacube.app;

import java.util.Scanner;

import com.metacube.app.pojos.Contact;
import com.metacube.app.pojos.Student;
import com.metacube.app.service.ContactService;
import com.metacube.app.service.StudentService;
import com.metacube.service.impl.ContactServiceImpl;
import com.metacube.service.impl.StudentServiceImpl;

public class Main {

	public static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {
		ContactService contactService = new ContactServiceImpl();
		StudentService studentService = new StudentServiceImpl();

		do {
			System.out.println("Enter Your choice");
			System.out.println("1. Get Contacts By Id ");
			System.out.println("2. Insert Student ");
			System.out.println("3. Exit");

			int choice = sc.nextInt();

			switch (choice) {
			case 1:
				// 0037F00001EbKrHQAV
				System.out.println("Enter contact id: ");
				String id = sc.next().trim();
				if (id.length() != 18) {
					System.out.println("Invalid Id");
				} else {
					Contact con = contactService
							.getContactById(id);
					System.out.println("-----------data----------");
					System.out.println("Name: " + con.getName() + "\n"
							+ "Email: " + con.getEmail() + "\n"
							+ "Experience: " + con.getExperience__c() + "\n");
				}
				break;
			case 2:
				Student student = new Student();
				System.out.println("--------Enter Details:-------");
				System.out.println("First Name: ");
				String firstName = sc.next().trim();
				System.out.println("First Name: ");
				String lastName = sc.next().trim();
				System.out.println("email: ");
				String email = sc.next().trim();
				System.out.println("class id: ");
				// String classId = sc.next().trim();
				student.setFirst_Name__c(firstName);
				student.setLast_Name__c(lastName);
				student.setEmail__c(email);
				student.setClass__c("a0G7F00000Dhz2VUAR");
				if (studentService.insertStudent(student)) {
					System.out.println("Student Insertion Successful");
				} else {
					System.out.println("Error");
				}

				break;
			case 3:
				System.exit(1);
				break;

			}

		} while (true);
	}
}
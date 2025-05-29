
package com.cms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "course")
@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
public class Course {
	@Id
	private String courseId;
	private String courseName;
	private Integer fees;
	private Integer duration;
	private String courseType;
	private float rating;
	public String getCourseId() {
		return courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public Integer getFees() {
		return fees;
	}
	public void setFees(Integer fees) {
		this.fees = fees;
	}
	public Integer getDuration() {
		return duration;
	}
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	public String getCourseType() {
		return courseType;
	}
	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
	public Course(String courseId, String courseName, Integer fees, Integer duration, String courseType, float rating) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.fees = fees;
		this.duration = duration;
		this.courseType = courseType;
		this.rating = rating;
	}
	public Course() {
		super();
		// TODO Auto-generated constructor stub
	}	
	
	
	
	
}

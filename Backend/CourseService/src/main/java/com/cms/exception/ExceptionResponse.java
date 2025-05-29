package com.cms.exception;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
public class ExceptionResponse {
	private LocalDate timestamp;
	private String message;
	private String details;
	private String httpCodeMessage;
	public LocalDate getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDate timestamp) {
		this.timestamp = timestamp;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getHttpCodeMessage() {
		return httpCodeMessage;
	}
	public void setHttpCodeMessage(String httpCodeMessage) {
		this.httpCodeMessage = httpCodeMessage;
	}
	public ExceptionResponse(LocalDate timestamp, String message, String details, String httpCodeMessage) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
		this.httpCodeMessage = httpCodeMessage;
	}
	
	
}

package com.cms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@NoArgsConstructor
//@AllArgsConstructor
@Document(collection = "course_sequences")
@Getter
@Setter
public class DatabaseSequence {
    @Id
    private String id;
    private long seq;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public long getSeq() {
		return seq;
	}
	public void setSeq(long seq) {
		this.seq = seq;
	}
	public DatabaseSequence(String id, long seq) {
		super();
		this.id = id;
		this.seq = seq;
	}
	@Override
	public String toString() {
		return "DatabaseSequence [id=" + id + ", seq=" + seq + "]";
	}
    
    
}
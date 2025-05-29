package com.cms.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cms.model.Associate;

//@Service
@FeignClient(name="associateapp", url="http://localhost:9092/associate")
public interface ServiceProxy {
	
	@GetMapping("/viewByAssociateId/{associateId}")
	public ResponseEntity<Associate> viewByAssociateId(@PathVariable String associateId);
}